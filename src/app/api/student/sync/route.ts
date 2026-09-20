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
    const { profile, signature, student, topicId, topicTitle, misconceptions = [] } = body;

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
