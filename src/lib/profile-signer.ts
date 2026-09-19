// ============================================================================
// SERVER-SIDE CRYPTOGRAPHIC PROFILE SIGNER
// Uses HMAC-SHA256 with timing-safe comparison to prevent score tampering
// and classmate identity spoofing.
// ============================================================================

import crypto from "crypto";
import { StudentIRTProfile } from "@/lib/irt-engine";

const PROFILE_SIGN_SECRET = process.env.PROFILE_SIGN_SECRET || "pragati-cbse-student-profile-hmac-salt-2026";

export interface StudentIdentity {
  studentId?: string;
  rollNo?: string;
  section?: string;
}

/**
 * Generate cryptographic HMAC-SHA256 signature binding student identity
 * (studentId, rollNo, section), theta, standard error, attempts, correct count,
 * and item-by-item history with correctness.
 */
export function signProfile(profile: StudentIRTProfile, identity?: StudentIdentity): string {
  const roll = String(identity?.rollNo ?? profile.rollNo ?? "0").trim();
  const sec = String(identity?.section ?? profile.section ?? "A").trim().toUpperCase();
  const stdId = String(identity?.studentId ?? profile.studentId ?? "std_anon").trim();
  const historyStr = (profile.history || []).map((h) => `${h.itemId}_${h.correct}`).join(",");
  const payload = `${stdId}:${roll}:${sec}:${profile.theta.toFixed(4)}:${profile.standardError.toFixed(4)}:${profile.itemsAttempted}:${profile.correctCount}:${historyStr}`;
  return crypto.createHmac("sha256", PROFILE_SIGN_SECRET).update(payload).digest("hex");
}

/**
 * Verify profile signature using timing-safe comparison with student identity validation
 */
export function verifyProfileSignature(
  profile: StudentIRTProfile,
  signature: string | undefined,
  identity?: StudentIdentity
): boolean {
  if (!signature) return false;
  const expected = signProfile(profile, identity);
  if (signature.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
