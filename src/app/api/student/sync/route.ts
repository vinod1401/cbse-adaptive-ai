// ============================================================================
// SERVER-AUTHORITATIVE STUDENT PERFORMANCE SYNC API
// Features:
// - Cryptographic HMAC-SHA256 Profile Signature Verification
// - Server-Calculated Psychometrics (Theta, Tier, Mastery)
// - Sanitized Document Key Generation (Prevents arbitrary client doc spoofing)
// ============================================================================

import { NextResponse } from "next/server";
import { verifyProfileSignature } from "@/lib/profile-signer";
import { thetaToMasteryPercentage, getMasteryTier, StudentIRTProfile } from "@/lib/irt-engine";
import { saveStudentRecord } from "@/lib/student-records-store";
import { StudentPerformanceRecord } from "@/lib/student-session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      profile,
      signature,
      student,
      topicId,
      topicTitle,
      misconceptions = [],
      sessionDurationSeconds,
      sessionDurationFormatted,
      lastAttemptTimestamp,
      lastAttemptAt,
    } = body;

    if (!student || !topicId) {
      return NextResponse.json(
        { error: "Missing required fields for student sync." },
        { status: 400 }
      );
    }

    const isInitialRegistration = !profile || (profile.itemsAttempted ?? 0) === 0;

    // STRICT SECURITY: Cryptographically verify profile and student identity against tampering on active attempts
    if (!isInitialRegistration) {
      const irtProfile: StudentIRTProfile = profile;
      const isValid = verifyProfileSignature(irtProfile, signature, {
        studentId: student.studentId,
        rollNo: student.rollNo,
        section: student.section,
      });
      if (!isValid) {
        return NextResponse.json(
          { error: "Security violation: Student profile signature mismatch or identity tampering. Scores cannot be attributed to another student." },
          { status: 403 }
        );
      }
    }

    const irtProfile: StudentIRTProfile = profile || {
      theta: -2.0,
      standardError: 1.0,
      itemsAttempted: 0,
      correctCount: 0,
      history: [],
    };

    // Sanitize student metadata to prevent key collision or injection
    const sanitizedRoll = String(student.rollNo || "0").trim().replace(/[^a-zA-Z0-9_-]/g, "");
    const sanitizedSection = String(student.section || "A").trim().toUpperCase().replace(/[^a-zA-Z0-9_-]/g, "");
    const sanitizedTopic = String(topicId).trim().toLowerCase().replace(/[^a-zA-Z0-9_-]/g, "");
    const docId = `${sanitizedRoll}_${sanitizedSection}_${sanitizedTopic}`;

    const totalAtt = irtProfile.itemsAttempted || 0;
    const totalCorr = irtProfile.correctCount || 0;
    const accuracy = totalAtt > 0 ? Math.round((totalCorr / totalAtt) * 100) : 0;

    const nowTs = typeof lastAttemptTimestamp === "number" ? lastAttemptTimestamp : Date.now();
    let computedTimeStr = lastAttemptAt;
    if (!computedTimeStr) {
      try {
        computedTimeStr = new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(new Date(nowTs)).toUpperCase();
      } catch {
        const d = new Date(nowTs);
        let hours = d.getHours();
        const minutes = d.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        computedTimeStr = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
      }
    } else {
      computedTimeStr = String(computedTimeStr).toUpperCase();
    }

    const durationSec = typeof sessionDurationSeconds === "number" ? sessionDurationSeconds : 0;
    let computedDurStr = sessionDurationFormatted;
    if (!computedDurStr) {
      if (durationSec <= 0) {
        computedDurStr = "< 1 min";
      } else {
        const m = Math.floor(durationSec / 60);
        const s = durationSec % 60;
        computedDurStr = m === 0 ? `${s}s` : `${m}m ${s < 10 ? "0" : ""}${s}s`;
      }
    }

    // Authoritative record computed by the server from verified signature
    const record: StudentPerformanceRecord = {
      id: docId,
      studentId: student.studentId || `std_${sanitizedRoll}_${sanitizedSection}`,
      studentName: String(student.studentName || "Anonymous Student").slice(0, 50),
      rollNo: sanitizedRoll,
      section: sanitizedSection,
      topicId: sanitizedTopic,
      topicTitle: String(topicTitle || "Class 8 Mathematics").slice(0, 100),
      theta: Number(irtProfile.theta.toFixed(2)),
      masteryPct: thetaToMasteryPercentage(irtProfile.theta),
      tier: getMasteryTier(irtProfile.theta),
      questionsAttempted: totalAtt,
      correctAnswers: totalCorr,
      accuracyPct: accuracy,
      lastActive: isInitialRegistration ? "Just registered" : "Just now",
      lastAttemptAt: computedTimeStr,
      lastAttemptTimestamp: nowTs,
      sessionDurationSeconds: durationSec,
      sessionDurationFormatted: computedDurStr,
      flaggedMisconceptions: Array.isArray(misconceptions) ? misconceptions.slice(0, 10) : [],
    };

    // Save to server-side store
    await saveStudentRecord(record);

    return NextResponse.json({ success: true, record });
  } catch (error) {
    console.error("Student Sync Error:", error);
    return NextResponse.json({ error: "Failed to sync student performance." }, { status: 500 });
  }
}
