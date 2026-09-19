// ============================================================================
// SERVER-SIDE ADAPTIVE IRT API (Anti-Cheat & Psychometric Calibration)
// Features:
// - Cryptographic HMAC-SHA256 Profile Signatures against score tampering
// - Server-Authoritative HTTP-Only Session Cookie
// - Server-Side Single-Use Tracking (Eliminates curl / captured cookie replay attacks)
// - Server-Side Option Shuffling & Answer Key Stripping
// ============================================================================

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import {
  StudentIRTProfile,
  INITIAL_THETA,
  INITIAL_SE,
  updateStudentAbility,
  selectNextOptimalItem,
  thetaToMasteryPercentage,
  getMasteryTier,
} from "@/lib/irt-engine";
import { generateDynamicAdaptiveQuestion } from "@/lib/gemini";
import { getTopicById, CONCEPT_BANK } from "@/lib/question-bank";
import { signProfile, verifyProfileSignature } from "@/lib/profile-signer";
import {
  recordSessionStart,
  isItemConsumed,
  consumeItem,
  getActiveItem,
} from "@/lib/server-session-store";

const PROFILE_SIGN_SECRET = process.env.PROFILE_SIGN_SECRET || "pragati-cbse-student-profile-hmac-salt-2026";
const SESSION_COOKIE_NAME = "pragati_adaptive_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 4; // 4 hours

interface AdaptiveSessionState {
  sessionId: string;
  topicId: string;
  activeItemId: string;
  gradedItemIds: string[];
  createdAt: number;
}

// Server-Authoritative Session Cookie Signing
function signSession(data: AdaptiveSessionState): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  const signature = crypto.createHmac("sha256", PROFILE_SIGN_SECRET).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function verifySession(token: string | undefined): AdaptiveSessionState | null {
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  const expectedSig = crypto.createHmac("sha256", PROFILE_SIGN_SECRET).update(payload).digest("base64url");
  if (signature.length !== expectedSig.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

// Fisher-Yates server-side option shuffling
function shuffleOptions<T>(array: T[]): T[] {
  if (!array || !Array.isArray(array)) return array;
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, topicId, selectedAnswer, selectedOption, itemId, questionId, currentProfile, seenIds = [] } = body;

    const answer = selectedAnswer !== undefined ? selectedAnswer : selectedOption;
    const targetItemId = itemId || questionId;

    const topic = getTopicById(topicId) || CONCEPT_BANK[0];
    const seenSet = new Set<string>(seenIds);

    if (action === "start") {
      const profile: StudentIRTProfile = currentProfile || {
        theta: INITIAL_THETA,
        standardError: INITIAL_SE,
        itemsAttempted: 0,
        correctCount: 0,
        history: [],
      };

      const initialItem = selectNextOptimalItem(profile.theta, topic.items, seenSet);

      if (!initialItem) {
        return NextResponse.json({ error: "No questions available" }, { status: 404 });
      }

      // Initialize session state
      const sessionState: AdaptiveSessionState = {
        sessionId: crypto.randomUUID(),
        topicId: topic.id,
        activeItemId: initialItem.id,
        gradedItemIds: [],
        createdAt: Date.now(),
      };

      // CRITICAL: Register session in authoritative server-side store
      await recordSessionStart(sessionState.sessionId, topic.id, initialItem.id);

      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, signSession(sessionState), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: SESSION_MAX_AGE_SECONDS,
      });

      // STRICT SECURITY: Strip correctAnswer from client payload
      const safeItem = {
        id: initialItem.id,
        topicId: initialItem.topicId,
        difficulty: initialItem.difficulty,
        text: initialItem.text,
        options: shuffleOptions(initialItem.options),
        microTheory: initialItem.microTheory || topic.microTheory,
      };

      return NextResponse.json({
        topic: { id: topic.id, title: topic.title, chapter: topic.chapter, subject: topic.subject },
        item: safeItem,
        profile,
        signature: signProfile(profile),
        masteryPct: thetaToMasteryPercentage(profile.theta),
        tier: getMasteryTier(profile.theta),
      });
    }

    if (action === "submit" || action === "grade") {
      const cookieStore = await cookies();
      const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
      const session = verifySession(sessionToken);

      // Require active server session
      if (!session) {
        return NextResponse.json(
          { error: "No active adaptive test session found. Please start a new session from the topic menu." },
          { status: 403 }
        );
      }

      // Anti-Cheat (Finding 4 Replay Defense): Check server-authoritative single-use ledger.
      // Defeats curl/automated replays where the attacker resubmits captured cookies.
      const alreadyConsumedOnServer = await isItemConsumed(session.sessionId, targetItemId);
      if (alreadyConsumedOnServer || session.gradedItemIds.includes(targetItemId)) {
        return NextResponse.json(
          {
            error: "Item already evaluated and consumed for this session. Replay attempt rejected.",
            isDuplicate: true,
          },
          { status: 409 }
        );
      }

      // Anti-Cheat: Ensure submitted question matches the active question for this session
      const serverActiveItem = await getActiveItem(session.sessionId);
      if (
        (serverActiveItem && serverActiveItem !== targetItemId) ||
        (session.activeItemId && session.activeItemId !== targetItemId)
      ) {
        return NextResponse.json(
          { error: "Invalid submission: Target question is not the active question for this session." },
          { status: 403 }
        );
      }

      const currentItem = topic.items.find((it) => it.id === targetItemId);
      if (!currentItem) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }

      const profile: StudentIRTProfile = currentProfile || {
        theta: INITIAL_THETA,
        standardError: INITIAL_SE,
        itemsAttempted: 0,
        correctCount: 0,
        history: [],
      };

      // Anti-Cheat (Finding 2): Cryptographic signature verification on EVERY submit (including item #1)
      const isValidSig = verifyProfileSignature(profile, body.signature);
      if (!isValidSig) {
        return NextResponse.json(
          { error: "Security violation: Student profile signature mismatch or tampered ability parameters." },
          { status: 403 }
        );
      }

      const isCorrect = answer === currentItem.correctAnswer;

      const updatedProfile = updateStudentAbility(
        profile,
        currentItem,
        isCorrect,
        body.timeTakenSeconds
      );

      seenSet.add(currentItem.id);
      let nextItem = selectNextOptimalItem(updatedProfile.theta, topic.items, seenSet);

      // Infinite AI Practice Fallback: If pre-calibrated bank exhausted, generate on-the-fly
      if (!nextItem) {
        try {
          const dynItem = await generateDynamicAdaptiveQuestion({
            topicId: topic.id,
            topicTitle: topic.title,
            subject: topic.subject,
            chapter: topic.chapter,
            targetDifficulty: updatedProfile.theta,
            subtopics: topic.subtopics,
          });
          if (dynItem) {
            topic.items.push(dynItem);
            nextItem = dynItem;
          }
        } catch (e) {
          console.warn("Dynamic item fallback notice:", e);
        }
      }

      // CRITICAL REPLAY DEFENSE: Consume item immediately in authoritative server store
      await consumeItem(session.sessionId, targetItemId, nextItem ? nextItem.id : "");

      // Update server session cookie state
      session.gradedItemIds.push(targetItemId);
      session.activeItemId = nextItem ? nextItem.id : "";
      cookieStore.set(SESSION_COOKIE_NAME, signSession(session), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: SESSION_MAX_AGE_SECONDS,
      });

      const safeNextItem = nextItem
        ? {
            id: nextItem.id,
            topicId: nextItem.topicId,
            difficulty: nextItem.difficulty,
            text: nextItem.text,
            options: shuffleOptions(nextItem.options),
            microTheory: nextItem.microTheory || topic.microTheory,
          }
        : null;

      let misconception: any = null;
      if (!isCorrect && currentItem.misconceptions && answer) {
        const rawM = currentItem.misconceptions[answer];
        if (typeof rawM === "string") {
          misconception = { label: rawM, remedialHint: rawM };
        } else if (rawM) {
          misconception = rawM;
        }
      }

      return NextResponse.json({
        isCorrect,
        explanation: currentItem.explanation,
        correctAnswer: currentItem.correctAnswer,
        misconception,
        profile: updatedProfile,
        signature: signProfile(updatedProfile),
        masteryPct: thetaToMasteryPercentage(updatedProfile.theta),
        tier: getMasteryTier(updatedProfile.theta),
        nextItem: safeNextItem,
        isComplete: safeNextItem === null,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Adaptive API Error:", error);
    return NextResponse.json({ error: "Server processing error" }, { status: 500 });
  }
}
