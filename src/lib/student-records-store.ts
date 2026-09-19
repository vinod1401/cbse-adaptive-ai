// ============================================================================
// SERVER-SIDE STUDENT RECORDS STORE
// Stores authenticated, server-verified student performance records.
// Supports both in-memory caching and persistent Upstash Redis / Vercel KV REST.
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

function getMemoryStore(): Map<string, StudentPerformanceRecord> {
  if (!globalThis.__pragatiStudentRecordsStore) {
    const store = new Map<string, StudentPerformanceRecord>();
    BASELINE_ROSTER.forEach((rec) => store.set(rec.id, rec));
    globalThis.__pragatiStudentRecordsStore = store;
  }
  return globalThis.__pragatiStudentRecordsStore;
}

// Upstash Redis / Vercel KV REST Helper
const KV_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

async function redisCommand(args: (string | number)[]): Promise<any> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(KV_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.result;
  } catch {
    return null;
  }
}

export async function saveStudentRecord(record: StudentPerformanceRecord): Promise<void> {
  // 1. In-memory store
  const store = getMemoryStore();
  store.set(record.id, record);

  // 2. Cloud KV persistence (if configured)
  await redisCommand(["SET", `record:${record.id}`, JSON.stringify(record)]);
  await redisCommand(["SADD", "cbse_student_record_ids", record.id]);
}

export async function getAllStudentRecords(): Promise<StudentPerformanceRecord[]> {
  const store = getMemoryStore();
  const map = new Map<string, StudentPerformanceRecord>();

  // Base roster
  BASELINE_ROSTER.forEach((rec) => map.set(rec.id, rec));

  // In-memory records
  store.forEach((rec) => map.set(rec.id, rec));

  // Cloud KV records (if available)
  const remoteIds = await redisCommand(["SMEMBERS", "cbse_student_record_ids"]);
  if (Array.isArray(remoteIds) && remoteIds.length > 0) {
    const keys = remoteIds.map((id) => `record:${id}`);
    const remoteData = await redisCommand(["MGET", ...keys]);
    if (Array.isArray(remoteData)) {
      remoteData.forEach((raw) => {
        if (raw) {
          try {
            const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
            if (parsed && parsed.id) {
              map.set(parsed.id, parsed);
              store.set(parsed.id, parsed);
            }
          } catch {}
        }
      });
    }
  }

  return Array.from(map.values());
}
