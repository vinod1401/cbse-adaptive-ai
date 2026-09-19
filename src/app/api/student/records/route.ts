// ============================================================================
// SERVER-AUTHORITATIVE STUDENT RECORDS API (Teacher Dashboard)
// ============================================================================

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { getAllStudentRecords } from "@/lib/student-records-store";

const AUTH_SECRET = process.env.AUTH_SECRET || "pragati-cbse-teacher-admin-secret-2026";
const ADMIN_COOKIE_NAME = "pragati_admin_session";

function verifyAdminSession(token: string | undefined): boolean {
  if (!token || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  const expected = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("base64url");
  if (signature.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return !!data.admin && Date.now() - data.iat < 1000 * 60 * 60 * 24;
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthed = verifyAdminSession(token);

    if (!isAuthed) {
      return NextResponse.json(
        { error: "Unauthorized: Teacher PIN authentication required." },
        { status: 401 }
      );
    }

    const records = await getAllStudentRecords();
    return NextResponse.json({ records });
  } catch (error) {
    console.error("Student Records Fetch Error:", error);
    return NextResponse.json({ error: "Failed to retrieve student records." }, { status: 500 });
  }
}
