// ============================================================================
// SHARED TEACHER / ADMIN AUTHENTICATION HELPER
// Single source of truth for admin session tokens, cookies, and verification.
// ============================================================================

import crypto from "crypto";

export const AUTH_SECRET = process.env.AUTH_SECRET || "pragati-cbse-adaptive-admin-secret-key-2026";
export const ADMIN_COOKIE_NAME = "pragati_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

export interface AdminTokenPayload {
  role: "teacher_admin";
  issuedAt: number;
  expiresAt: number;
}

/**
 * Generate HMAC-signed admin session token
 */
export function createSignedAdminToken(): string {
  const payload: AdminTokenPayload = {
    role: "teacher_admin",
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", AUTH_SECRET).update(data).digest("base64url");
  return `${data}.${signature}`;
}

/**
 * Verify HMAC-signed admin session token with timing-safe comparison
 */
export function verifyAdminToken(token: string | undefined): boolean {
  if (!token || !token.includes(".")) return false;
  const [data, signature] = token.split(".");
  const expectedSignature = crypto.createHmac("sha256", AUTH_SECRET).update(data).digest("base64url");

  if (signature.length !== expectedSignature.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return false;
  }

  try {
    const payload: AdminTokenPayload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (!payload.expiresAt || payload.expiresAt < Date.now()) {
      return false; // Expired
    }
    return payload.role === "teacher_admin";
  } catch {
    return false;
  }
}
