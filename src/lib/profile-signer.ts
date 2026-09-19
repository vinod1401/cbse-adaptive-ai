// ============================================================================
// SERVER-SIDE CRYPTOGRAPHIC PROFILE SIGNER
// Uses HMAC-SHA256 with timing-safe comparison to prevent score tampering.
// ============================================================================

import crypto from "crypto";
import { StudentIRTProfile } from "@/lib/irt-engine";

const PROFILE_SIGN_SECRET = process.env.PROFILE_SIGN_SECRET || "pragati-cbse-student-profile-hmac-salt-2026";

/**
 * Generate cryptographic HMAC-SHA256 signature binding theta, standard error,
 * attempts, correct count, and item-by-item history with correctness.
 */
export function signProfile(profile: StudentIRTProfile): string {
  const historyStr = (profile.history || []).map((h) => `${h.itemId}_${h.correct}`).join(",");
  const payload = `${profile.theta.toFixed(4)}:${profile.standardError.toFixed(4)}:${profile.itemsAttempted}:${profile.correctCount}:${historyStr}`;
  return crypto.createHmac("sha256", PROFILE_SIGN_SECRET).update(payload).digest("hex");
}

/**
 * Verify profile signature using timing-safe comparison
 */
export function verifyProfileSignature(profile: StudentIRTProfile, signature: string | undefined): boolean {
  if (!signature) return false;
  const expected = signProfile(profile);
  if (signature.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
