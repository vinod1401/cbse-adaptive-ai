// ============================================================================
// SERVER-SIDE ADAPTIVE IRT API (Anti-Cheat & Psychometric Calibration)
// ============================================================================

import { NextResponse } from "next/server";
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
        masteryPct: thetaToMasteryPercentage(profile.theta),
        tier: getMasteryTier(profile.theta),
      });
    }

    if (action === "submit" || action === "grade") {
      const currentItem = topic.items.find((it) => it.id === targetItemId);
      if (!currentItem) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }

      const isCorrect = answer === currentItem.correctAnswer;
      const profile: StudentIRTProfile = currentProfile || {
        theta: INITIAL_THETA,
        standardError: INITIAL_SE,
        itemsAttempted: 0,
        correctCount: 0,
        history: [],
      };

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
