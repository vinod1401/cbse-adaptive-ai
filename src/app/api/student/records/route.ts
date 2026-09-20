// ============================================================================
// SERVER-AUTHORITATIVE STUDENT RECORDS API (Teacher Dashboard)
// Protected by shared admin session verification
// ============================================================================

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";
import {
  getAllStudentRecords,
  deleteStudentRecord,
  clearAllStudentRecords,
  resetToBaselineRoster,
} from "@/lib/student-records-store";

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

export async function DELETE(request: Request) {
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

    const body = await request.json().catch(() => ({}));
    const { id, all, resetBaseline } = body;

    // 1. Reset to baseline demo data
    if (resetBaseline) {
      await resetToBaselineRoster();
      const records = await getAllStudentRecords();
      return NextResponse.json({
        success: true,
        message: "Student records reset to default CBSE benchmark roster.",
        records,
      });
    }

    // 2. Clear all old student data
    if (all) {
      await clearAllStudentRecords();
      return NextResponse.json({
        success: true,
        message: "All student records cleared successfully.",
        records: [],
      });
    }

    // 3. Delete individual student record
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Record ID is required for single deletion." },
        { status: 400 }
      );
    }

    await deleteStudentRecord(id);
    const updatedRecords = await getAllStudentRecords();
    return NextResponse.json({
      success: true,
      message: `Record ${id} removed successfully.`,
      records: updatedRecords,
    });
  } catch (error) {
    console.error("Student Record Deletion Error:", error);
    return NextResponse.json(
      { error: "Failed to delete student record." },
      { status: 500 }
    );
  }
}

