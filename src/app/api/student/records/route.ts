// ============================================================================
// SERVER-AUTHORITATIVE STUDENT RECORDS API (Teacher Dashboard)
// Protected by shared admin session verification
// ============================================================================

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";
import { getAllStudentRecords } from "@/lib/student-records-store";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthed = verifyAdminToken(token);

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
