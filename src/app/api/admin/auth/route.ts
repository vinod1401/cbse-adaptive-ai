// ============================================================================
// SERVER-SIDE TEACHER / ADMIN AUTHENTICATION API
// Cryptographic HMAC-SHA256 Token with HTTP-Only Cookie Protection
// ============================================================================

import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSignedAdminToken,
  verifyAdminToken,
} from "@/lib/admin-auth";

const DEFAULT_TEACHER_PIN = process.env.TEACHER_ADMIN_PIN || "1234";

// GET: Verify authentication state
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (token && verifyAdminToken(token)) {
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

    const token = createSignedAdminToken();
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
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
    cookieStore.delete(ADMIN_COOKIE_NAME);
    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
