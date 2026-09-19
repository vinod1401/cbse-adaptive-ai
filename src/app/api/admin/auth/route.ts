// ============================================================================
// SERVER-SIDE TEACHER / ADMIN AUTHENTICATION API
// Cryptographic HMAC-SHA256 Token with HTTP-Only Cookie Protection
// ============================================================================

import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";

const AUTH_SECRET = process.env.AUTH_SECRET || "pragati-cbse-adaptive-admin-secret-key-2026";
const DEFAULT_TEACHER_PIN = process.env.TEACHER_ADMIN_PIN || "1234";
const COOKIE_NAME = "pragati_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

// Sign an admin session token
function createSignedToken(): string {
  const payload = {
    role: "teacher_admin",
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", AUTH_SECRET).update(data).digest("base64url");
  return `${data}.${signature}`;
}

// Verify an admin session token
function verifySignedToken(token: string): boolean {
  if (!token || !token.includes(".")) return false;
  const [data, signature] = token.split(".");
  const expectedSignature = crypto.createHmac("sha256", AUTH_SECRET).update(data).digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (payload.expiresAt < Date.now()) {
      return false; // Expired
    }
    return payload.role === "teacher_admin";
  } catch {
    return false;
  }
}

// GET: Verify authentication state
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (token && verifySignedToken(token)) {
      return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

// POST: Authenticate with Teacher PIN
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin } = body;

    if (!pin || typeof pin !== "string") {
      return NextResponse.json({ success: false, error: "PIN is required" }, { status: 400 });
    }

    // Secure timing-safe string comparison
    const targetPin = process.env.TEACHER_ADMIN_PIN || DEFAULT_TEACHER_PIN;
    const bufA = Buffer.from(pin.trim());
    const bufB = Buffer.from(targetPin.trim());

    const isMatch = bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);

    if (!isMatch) {
      return NextResponse.json({ success: false, error: "Invalid Teacher PIN" }, { status: 401 });
    }

    const token = createSignedToken();
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return NextResponse.json({ success: true, message: "Teacher session authenticated" });
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json({ success: false, error: "Server authentication error" }, { status: 500 });
  }
}

// DELETE: Logout / Lock session
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
