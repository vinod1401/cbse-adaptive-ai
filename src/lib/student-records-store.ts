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
  // eslint-disable-next-line no-var
  var __pragatiDeletedRecordIds: Set<string> | undefined;
  // eslint-disable-next-line no-var
  var __pragatiStoreClearedAll: boolean | undefined;
}

function getMemoryStore(): Map<string, StudentPerformanceRecord> {
  if (!globalThis.__pragatiStudentRecordsStore) {
    const store = new Map<string, StudentPerformanceRecord>();
    if (!globalThis.__pragatiStoreClearedAll) {
      BASELINE_ROSTER.forEach((rec) => store.set(rec.id, rec));
    }
    globalThis.__pragatiStudentRecordsStore = store;
  }
  return globalThis.__pragatiStudentRecordsStore;
}

function getDeletedStore(): Set<string> {
  if (!globalThis.__pragatiDeletedRecordIds) {
    globalThis.__pragatiDeletedRecordIds = new Set<string>();
  }
  return globalThis.__pragatiDeletedRecordIds;
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
  // Revive if previously marked deleted
  const deletedSet = getDeletedStore();
  deletedSet.delete(record.id);

  // 1. In-memory store
  const store = getMemoryStore();
  store.set(record.id, record);

  // 2. Cloud KV persistence (if configured)
  await redisCommand(["SREM", "cbse_deleted_record_ids", record.id]);
  await redisCommand(["SET", `record:${record.id}`, JSON.stringify(record)]);
  await redisCommand(["SADD", "cbse_student_record_ids", record.id]);
}

export async function deleteStudentRecord(id: string): Promise<boolean> {
  const store = getMemoryStore();
  const deletedSet = getDeletedStore();

  store.delete(id);
  deletedSet.add(id);

  // Cloud KV persistence
  await redisCommand(["DEL", `record:${id}`]);
  await redisCommand(["SREM", "cbse_student_record_ids", id]);
  await redisCommand(["SADD", "cbse_deleted_record_ids", id]);

  return true;
}

export async function clearAllStudentRecords(): Promise<boolean> {
  const store = getMemoryStore();
  const deletedSet = getDeletedStore();

  store.clear();
  globalThis.__pragatiStoreClearedAll = true;
  BASELINE_ROSTER.forEach((rec) => deletedSet.add(rec.id));

  // Cloud KV wipe
  const remoteIds = await redisCommand(["SMEMBERS", "cbse_student_record_ids"]);
  if (Array.isArray(remoteIds) && remoteIds.length > 0) {
    const keys = remoteIds.map((id) => `record:${id}`);
    await redisCommand(["DEL", ...keys]);
    await redisCommand(["DEL", "cbse_student_record_ids"]);
  }
  await redisCommand(["SET", "cbse_all_cleared", "1"]);

  return true;
}

export async function resetToBaselineRoster(): Promise<boolean> {
  const store = getMemoryStore();
  const deletedSet = getDeletedStore();

  store.clear();
  deletedSet.clear();
  globalThis.__pragatiStoreClearedAll = false;
  BASELINE_ROSTER.forEach((rec) => store.set(rec.id, rec));

  // Cloud KV reset
  await redisCommand(["DEL", "cbse_all_cleared"]);
  await redisCommand(["DEL", "cbse_deleted_record_ids"]);
  for (const rec of BASELINE_ROSTER) {
    await redisCommand(["SET", `record:${rec.id}`, JSON.stringify(rec)]);
    await redisCommand(["SADD", "cbse_student_record_ids", rec.id]);
  }

  return true;
}

export async function getAllStudentRecords(): Promise<StudentPerformanceRecord[]> {
  const store = getMemoryStore();
  const deletedSet = getDeletedStore();
  const map = new Map<string, StudentPerformanceRecord>();

  // Cloud KV check for global cleared status
  const isClearedRemote = await redisCommand(["GET", "cbse_all_cleared"]);
  if (isClearedRemote) {
    globalThis.__pragatiStoreClearedAll = true;
  }

  // Cloud KV remote deleted sync
  const remoteDeleted = await redisCommand(["SMEMBERS", "cbse_deleted_record_ids"]);
  if (Array.isArray(remoteDeleted)) {
    remoteDeleted.forEach((dId) => deletedSet.add(dId));
  }

  // Base roster (only if not cleared)
  if (!globalThis.__pragatiStoreClearedAll) {
    BASELINE_ROSTER.forEach((rec) => {
      if (!deletedSet.has(rec.id)) {
        map.set(rec.id, rec);
      }
    });
  }

  // In-memory records
  store.forEach((rec) => {
    if (!deletedSet.has(rec.id)) {
      map.set(rec.id, rec);
    }
  });

  // Cloud KV records (if available and not cleared)
  if (!globalThis.__pragatiStoreClearedAll) {
    const remoteIds = await redisCommand(["SMEMBERS", "cbse_student_record_ids"]);
    if (Array.isArray(remoteIds) && remoteIds.length > 0) {
      const activeIds = remoteIds.filter((id) => !deletedSet.has(id));
      if (activeIds.length > 0) {
        const keys = activeIds.map((id) => `record:${id}`);
        const remoteData = await redisCommand(["MGET", ...keys]);
        if (Array.isArray(remoteData)) {
          remoteData.forEach((raw) => {
            if (raw) {
              try {
                const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
                if (parsed && parsed.id && !deletedSet.has(parsed.id)) {
                  map.set(parsed.id, parsed);
                  store.set(parsed.id, parsed);
                }
              } catch {}
            }
          });
        }
      }
    }
  }

  // Final guarantee: strip any marked deleted
  deletedSet.forEach((dId) => map.delete(dId));

  return Array.from(map.values());
}
