// ============================================================================
// SERVER-AUTHORITATIVE STUDENT RECORDS API (Teacher Dashboard)
// Protected by shared admin session verification
// ============================================================================

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";
import {
  getAllStudentRecords,
  saveStudentRecord,
  deleteStudentRecord,
  clearAllStudentRecords,
  resetToBaselineRoster,
} from "@/lib/student-records-store";
import { StudentPerformanceRecord } from "@/lib/student-session";

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

export async function POST(request: Request) {
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
    const { studentName, rollNo, section = "8-A", topicId = "rational-numbers", topicTitle = "Operations on Rational Numbers" } = body;

    if (!studentName || !rollNo) {
      return NextResponse.json(
        { error: "Student Name and Roll Number are required." },
        { status: 400 }
      );
    }

    const sanitizedRoll = String(rollNo).trim().replace(/[^a-zA-Z0-9_-]/g, "");
    const sanitizedSection = String(section).trim().toUpperCase().replace(/[^a-zA-Z0-9_-]/g, "");
    const sanitizedTopic = String(topicId).trim().toLowerCase().replace(/[^a-zA-Z0-9_-]/g, "");
    const docId = `${sanitizedRoll}_${sanitizedSection}_${sanitizedTopic}`;

    const newRecord: StudentPerformanceRecord = {
      id: docId,
      studentId: `std_${sanitizedRoll}_${sanitizedSection}`,
      studentName: String(studentName).trim().slice(0, 50),
      rollNo: sanitizedRoll,
      section: sanitizedSection,
      topicId: sanitizedTopic,
      topicTitle: String(topicTitle).slice(0, 100),
      theta: -2.0,
      masteryPct: 15,
      tier: { label: "Foundation", badge: "🟢 Level 1: Foundation" },
      questionsAttempted: 0,
      correctAnswers: 0,
      accuracyPct: 0,
      lastActive: "Just registered",
      flaggedMisconceptions: [],
    };

    await saveStudentRecord(newRecord);
    const updatedRecords = await getAllStudentRecords();

    return NextResponse.json({
      success: true,
      record: newRecord,
      records: updatedRecords,
    });
  } catch (error) {
    console.error("Student Record Creation Error:", error);
    return NextResponse.json(
      { error: "Failed to add student record." },
      { status: 500 }
    );
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
    const { id, ids, all, resetBaseline } = body;

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

    // 3. Delete multiple or single student records
    if (Array.isArray(ids) && ids.length > 0) {
      for (const recId of ids) {
        if (typeof recId === "string") {
          await deleteStudentRecord(recId);
        }
      }
      const updatedRecords = await getAllStudentRecords();
      return NextResponse.json({
        success: true,
        message: `${ids.length} records removed successfully.`,
        records: updatedRecords,
      });
    }

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Record ID or IDs array is required for deletion." },
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

