// ============================================================================
// SERVER-SIDE STUDENT RECORDS STORE
// Stores authenticated, server-verified student performance records.
// Supports both in-memory caching, local JSON disk persistence, and Upstash/Vercel KV.
// ============================================================================

import { StudentPerformanceRecord, BASELINE_ROSTER } from "@/lib/student-session";
import fs from "fs";
import path from "path";

export { BASELINE_ROSTER };

declare global {
  // eslint-disable-next-line no-var
  var __pragatiStudentRecordsStore: Map<string, StudentPerformanceRecord> | undefined;
}

// Upstash Redis / Vercel KV REST Helper
const KV_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

// Local JSON Disk Persistence (Guarantees local & server survivability across restarts)
const DATA_DIR = path.join(process.cwd(), "data");
const RECORDS_FILE = path.join(DATA_DIR, "student-records.json");
const INITIALIZED_FLAG_FILE = path.join(DATA_DIR, ".initialized");

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
    const records = Array.from(store.values());
    fs.writeFileSync(RECORDS_FILE, JSON.stringify(records, null, 2), "utf8");
    fs.writeFileSync(INITIALIZED_FLAG_FILE, "1", "utf8");
  } catch (e) {
    console.warn("Failed to persist student records to disk:", e);
  }
}

function loadFromDisk(): void {
  try {
    ensureDataDir();

    // 1. If RECORDS_FILE exists on disk, it is the authoritative local state
    if (fs.existsSync(RECORDS_FILE)) {
      const raw = fs.readFileSync(RECORDS_FILE, "utf8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        const store = new Map<string, StudentPerformanceRecord>();
        list.forEach((rec) => {
          if (rec && rec.id) store.set(rec.id, rec);
        });
        globalThis.__pragatiStudentRecordsStore = store;
        return;
      }
    }

    // 2. Initial first-time setup only (if file does not exist at all)
    if (!fs.existsSync(INITIALIZED_FLAG_FILE)) {
      const store = new Map<string, StudentPerformanceRecord>();
      BASELINE_ROSTER.forEach((rec) => store.set(rec.id, rec));
      globalThis.__pragatiStudentRecordsStore = store;
      persistToDisk();
      return;
    }

    // 3. Otherwise, initialized state with no file means empty store
    globalThis.__pragatiStudentRecordsStore = new Map<string, StudentPerformanceRecord>();
  } catch (e) {
    console.warn("loadFromDisk warning:", e);
    if (!globalThis.__pragatiStudentRecordsStore) {
      globalThis.__pragatiStudentRecordsStore = new Map<string, StudentPerformanceRecord>();
    }
  }
}

function getMemoryStore(): Map<string, StudentPerformanceRecord> {
  if (!globalThis.__pragatiStudentRecordsStore) {
    loadFromDisk();
    if (!globalThis.__pragatiStudentRecordsStore) {
      globalThis.__pragatiStudentRecordsStore = new Map<string, StudentPerformanceRecord>();
    }
  }
  return globalThis.__pragatiStudentRecordsStore;
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
  // 1. In-memory store
  const store = getMemoryStore();
  store.set(record.id, record);

  // 2. Local JSON disk persistence
  persistToDisk();

  // 3. Cloud KV persistence (if configured)
  await redisCommand(["DEL", "cbse_all_cleared"]);
  await redisCommand(["SET", `record:${record.id}`, JSON.stringify(record)]);
  await redisCommand(["SADD", "cbse_student_record_ids", record.id]);
}

export async function deleteStudentRecord(id: string): Promise<boolean> {
  const store = getMemoryStore();
  store.delete(id);

  // Local JSON disk persistence
  persistToDisk();

  // Cloud KV persistence
  await redisCommand(["DEL", `record:${id}`]);
  await redisCommand(["SREM", "cbse_student_record_ids", id]);

  return true;
}

export async function clearAllStudentRecords(): Promise<boolean> {
  const store = getMemoryStore();
  store.clear();

  // Local JSON disk persistence (persists empty array [] so it never resurrects)
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
  store.clear();
  BASELINE_ROSTER.forEach((rec) => store.set(rec.id, rec));

  // Local JSON disk persistence
  persistToDisk();

  // Cloud KV reset
  await redisCommand(["DEL", "cbse_all_cleared"]);
  for (const rec of BASELINE_ROSTER) {
    await redisCommand(["SET", `record:${rec.id}`, JSON.stringify(rec)]);
    await redisCommand(["SADD", "cbse_student_record_ids", rec.id]);
  }

  return true;
}

export async function getAllStudentRecords(): Promise<StudentPerformanceRecord[]> {
  loadFromDisk();
  const store = getMemoryStore();

  // Cloud KV check for global cleared status
  const isClearedRemote = await redisCommand(["GET", "cbse_all_cleared"]);
  if (isClearedRemote) {
    store.clear();
    persistToDisk();
    return [];
  }

  // Cloud KV records sync (if configured)
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
              store.set(parsed.id, parsed);
            }
          } catch {}
        }
      });
      persistToDisk();
    }
  }

  return Array.from(store.values());
}
