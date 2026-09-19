// ============================================================================
// SERVER-SIDE STUDENT RECORDS STORE
// Stores authenticated, server-verified student performance records.
// ============================================================================

import { StudentPerformanceRecord } from "@/lib/student-session";

export const BASELINE_ROSTER: StudentPerformanceRecord[] = [
  {
    id: "08_8A_rational-numbers",
    studentId: "std_08",
    studentName: "Aarav Sharma",
    rollNo: "08",
    section: "8-A",
    topicId: "rational-numbers",
    topicTitle: "Operations on Rational Numbers",
    theta: 1.35,
    masteryPct: 82,
    tier: { label: "Advanced", badge: "🟢 Advanced" },
    questionsAttempted: 12,
    correctAnswers: 10,
    accuracyPct: 83,
    lastActive: "15 mins ago",
    flaggedMisconceptions: ["Inverting fraction in division occasionally"],
  },
  {
    id: "14_8B_linear-equations",
    studentId: "std_14",
    studentName: "Priya Patel",
    rollNo: "14",
    section: "8-B",
    topicId: "linear-equations",
    topicTitle: "Solving Linear Equations by Transposition",
    theta: -0.42,
    masteryPct: 44,
    tier: { label: "Developing", badge: "🔴 Developing" },
    questionsAttempted: 10,
    correctAnswers: 4,
    accuracyPct: 40,
    lastActive: "45 mins ago",
    flaggedMisconceptions: ["Sign change error when transposing across equals sign"],
  },
  {
    id: "22_8A_algebraic-identities",
    studentId: "std_22",
    studentName: "Rohan Verma",
    rollNo: "22",
    section: "8-A",
    topicId: "algebraic-identities",
    topicTitle: "Standard Algebraic Identities",
    theta: 0.75,
    masteryPct: 69,
    tier: { label: "Proficient", badge: "🟡 Proficient" },
    questionsAttempted: 15,
    correctAnswers: 11,
    accuracyPct: 73,
    lastActive: "1 hour ago",
    flaggedMisconceptions: ["Omits 2ab cross term in (a+b)^2 expansion"],
  },
  {
    id: "31_8C_rational-numbers",
    studentId: "std_31",
    studentName: "Ananya Gupta",
    rollNo: "31",
    section: "8-C",
    topicId: "rational-numbers",
    topicTitle: "Operations on Rational Numbers",
    theta: 1.85,
    masteryPct: 92,
    tier: { label: "Mastered", badge: "🏆 Mastered" },
    questionsAttempted: 14,
    correctAnswers: 13,
    accuracyPct: 93,
    lastActive: "2 hours ago",
    flaggedMisconceptions: [],
  },
  {
    id: "05_8B_linear-equations",
    studentId: "std_05",
    studentName: "Kabir Mehta",
    rollNo: "05",
    section: "8-B",
    topicId: "linear-equations",
    topicTitle: "Solving Linear Equations by Transposition",
    theta: -0.85,
    masteryPct: 35,
    tier: { label: "Needs Support", badge: "⚠️ At Risk" },
    questionsAttempted: 8,
    correctAnswers: 2,
    accuracyPct: 25,
    lastActive: "Yesterday",
    flaggedMisconceptions: ["Divides RHS instead of multiplying reciprocal", "Order of operations in multi-step brackets"],
  },
];

declare global {
  // eslint-disable-next-line no-var
  var __pragatiStudentRecordsStore: Map<string, StudentPerformanceRecord> | undefined;
}

function getStore(): Map<string, StudentPerformanceRecord> {
  if (!globalThis.__pragatiStudentRecordsStore) {
    const store = new Map<string, StudentPerformanceRecord>();
    BASELINE_ROSTER.forEach((rec) => store.set(rec.id, rec));
    globalThis.__pragatiStudentRecordsStore = store;
  }
  return globalThis.__pragatiStudentRecordsStore;
}

export async function saveStudentRecord(record: StudentPerformanceRecord): Promise<void> {
  const store = getStore();
  store.set(record.id, record);
}

export async function getAllStudentRecords(): Promise<StudentPerformanceRecord[]> {
  const store = getStore();
  return Array.from(store.values());
}
