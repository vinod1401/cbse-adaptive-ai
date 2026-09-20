// ============================================================================
// SERVER-SIDE STUDENT RECORDS STORE
// Stores authenticated, server-verified student performance records.
// Supports both in-memory caching and persistent Upstash Redis / Vercel KV REST.
// ============================================================================

import { StudentPerformanceRecord, BASELINE_ROSTER } from "@/lib/student-session";
import fs from "fs";
import path from "path";

export { BASELINE_ROSTER };

declare global {
  // eslint-disable-next-line no-var
  var __pragatiStudentRecordsStore: Map<string, StudentPerformanceRecord> | undefined;
  // eslint-disable-next-line no-var
  var __pragatiDeletedRecordIds: Set<string> | undefined;
  // eslint-disable-next-line no-var
  var __pragatiStoreClearedAll: boolean | undefined;
}

// Upstash Redis / Vercel KV REST Helper
const KV_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

// Local JSON Disk Persistence (Guarantees local & server survivability across restarts)
const DATA_DIR = path.join(process.cwd(), "data");
const RECORDS_FILE = path.join(DATA_DIR, "student-records.json");
const DELETED_FILE = path.join(DATA_DIR, "deleted-records.json");

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {}
}

function persistToDisk() {
  try {
    ensureDataDir();
    const store = getMemoryStore();
    const deletedSet = getDeletedStore();
    const records = Array.from(store.values());
    fs.writeFileSync(RECORDS_FILE, JSON.stringify(records, null, 2), "utf8");
    fs.writeFileSync(DELETED_FILE, JSON.stringify(Array.from(deletedSet), null, 2), "utf8");
  } catch {}
}

function loadFromDisk() {
  try {
    ensureDataDir();
    if (fs.existsSync(RECORDS_FILE)) {
      const raw = fs.readFileSync(RECORDS_FILE, "utf8");
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) {
        const store = new Map<string, StudentPerformanceRecord>();
        list.forEach((rec) => store.set(rec.id, rec));
        globalThis.__pragatiStudentRecordsStore = store;
      }
    }
    if (fs.existsSync(DELETED_FILE)) {
      const raw = fs.readFileSync(DELETED_FILE, "utf8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        globalThis.__pragatiDeletedRecordIds = new Set<string>(list);
      }
    }
  } catch {}
}

function getMemoryStore(): Map<string, StudentPerformanceRecord> {
  if (!globalThis.__pragatiStudentRecordsStore) {
    loadFromDisk();
    if (!globalThis.__pragatiStudentRecordsStore) {
      const store = new Map<string, StudentPerformanceRecord>();
      if (!globalThis.__pragatiStoreClearedAll) {
        BASELINE_ROSTER.forEach((rec) => store.set(rec.id, rec));
      }
      globalThis.__pragatiStudentRecordsStore = store;
      persistToDisk();
    }
  }
  return globalThis.__pragatiStudentRecordsStore;
}

function getDeletedStore(): Set<string> {
  if (!globalThis.__pragatiDeletedRecordIds) {
    globalThis.__pragatiDeletedRecordIds = new Set<string>();
  }
  return globalThis.__pragatiDeletedRecordIds;
}

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

  // 2. Local JSON disk persistence
  persistToDisk();

  // 3. Cloud KV persistence (if configured)
  await redisCommand(["SREM", "cbse_deleted_record_ids", record.id]);
  await redisCommand(["SET", `record:${record.id}`, JSON.stringify(record)]);
  await redisCommand(["SADD", "cbse_student_record_ids", record.id]);
}

export async function deleteStudentRecord(id: string): Promise<boolean> {
  const store = getMemoryStore();
  const deletedSet = getDeletedStore();

  store.delete(id);
  deletedSet.add(id);

  // Local JSON disk persistence
  persistToDisk();

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

  // Local JSON disk persistence
  persistToDisk();

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

  // Local JSON disk persistence
  persistToDisk();

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
