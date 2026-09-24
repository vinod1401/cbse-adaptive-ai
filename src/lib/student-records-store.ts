// ============================================================================
// SERVER-SIDE STUDENT RECORDS STORE
// Priority order:
//   1. Redis/Upstash KV  → used on Vercel (serverless) — AUTHORITATIVE
//   2. Local disk JSON   → used in local dev (no Redis)
// ============================================================================

import { StudentPerformanceRecord, BASELINE_ROSTER } from "@/lib/student-session";
import fs from "fs";
import path from "path";

export { BASELINE_ROSTER };

declare global {
  // eslint-disable-next-line no-var
  var __pragatiStudentRecordsStore: Map<string, StudentPerformanceRecord> | undefined;
}

// ─── Redis / Upstash KV ──────────────────────────────────────────────────────
const KV_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const REDIS_ENABLED = !!(KV_URL && KV_TOKEN);

const KEY_IDS   = "cbse_student_record_ids";   // Redis SET of all record IDs
const KEY_SEED  = "cbse_seeded";               // Flag: baseline has been seeded to Redis
const KEY_CLEAR = "cbse_all_cleared";          // Flag: teacher clicked "Clear All"

async function redisCommand(args: (string | number)[]): Promise<any> {
  if (!REDIS_ENABLED) return null;
  try {
    const res = await fetch(KV_URL!, {
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
    return json.result ?? null;
  } catch {
    return null;
  }
}

// ─── Local Disk (used only when Redis NOT configured) ────────────────────────
const DATA_DIR            = path.join(process.cwd(), "data");
const RECORDS_FILE        = path.join(DATA_DIR, "student-records.json");
const INITIALIZED_FLAG    = path.join(DATA_DIR, ".initialized");

function persistToDisk(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const records = Array.from(getMemoryStore().values());
    fs.writeFileSync(RECORDS_FILE, JSON.stringify(records, null, 2), "utf8");
    fs.writeFileSync(INITIALIZED_FLAG, "1", "utf8");
  } catch { /* silently skip on Vercel read-only FS */ }
}

function loadFromDisk(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

    if (fs.existsSync(RECORDS_FILE)) {
      const raw  = fs.readFileSync(RECORDS_FILE, "utf8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        const store = new Map<string, StudentPerformanceRecord>();
        list.forEach((r) => { if (r?.id) store.set(r.id, r); });
        globalThis.__pragatiStudentRecordsStore = store;
        return;
      }
    }

    // First ever run — seed from baseline
    if (!fs.existsSync(INITIALIZED_FLAG)) {
      const store = new Map<string, StudentPerformanceRecord>();
      BASELINE_ROSTER.forEach((r) => store.set(r.id, r));
      globalThis.__pragatiStudentRecordsStore = store;
      persistToDisk();
      return;
    }

    globalThis.__pragatiStudentRecordsStore = new Map();
  } catch {
    if (!globalThis.__pragatiStudentRecordsStore) {
      globalThis.__pragatiStudentRecordsStore = new Map();
    }
  }
}

function getMemoryStore(): Map<string, StudentPerformanceRecord> {
  if (!globalThis.__pragatiStudentRecordsStore) {
    loadFromDisk();
    if (!globalThis.__pragatiStudentRecordsStore) {
      globalThis.__pragatiStudentRecordsStore = new Map();
    }
  }
  return globalThis.__pragatiStudentRecordsStore;
}

// ─── Redis helpers ───────────────────────────────────────────────────────────

/** Seed the entire BASELINE_ROSTER into Redis (only done once per Redis DB). */
async function seedBaselineToRedis(): Promise<void> {
  for (const rec of BASELINE_ROSTER) {
    await redisCommand(["SET", `record:${rec.id}`, JSON.stringify(rec)]);
    await redisCommand(["SADD", KEY_IDS, rec.id]);
  }
  await redisCommand(["SET", KEY_SEED, "1"]);
}

/** Fetch all records from Redis by reading the ID set then MGET. */
async function fetchAllFromRedis(): Promise<StudentPerformanceRecord[]> {
  const ids = await redisCommand(["SMEMBERS", KEY_IDS]);
  if (!Array.isArray(ids) || ids.length === 0) return [];

  const keys = ids.map((id: string) => `record:${id}`);
  const rawList = await redisCommand(["MGET", ...keys]);
  const records: StudentPerformanceRecord[] = [];

  if (Array.isArray(rawList)) {
    rawList.forEach((raw) => {
      if (!raw) return;
      try {
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        if (parsed?.id) records.push(parsed);
      } catch {}
    });
  }
  return records;
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getAllStudentRecords(): Promise<StudentPerformanceRecord[]> {
  // ── REDIS MODE (Vercel / cloud) ──────────────────────────────────────────
  if (REDIS_ENABLED) {
    // 1. If teacher cleared all → return empty
    const cleared = await redisCommand(["GET", KEY_CLEAR]);
    if (cleared) return [];

    // 2. Check if baseline has ever been seeded to this Redis DB
    const seeded = await redisCommand(["GET", KEY_SEED]);
    if (!seeded) {
      // First time: seed baseline → Redis is now authoritative
      await seedBaselineToRedis();
    }

    // 3. Fetch and return all records from Redis
    return fetchAllFromRedis();
  }

  // ── LOCAL DISK MODE (no Redis) ───────────────────────────────────────────
  loadFromDisk();
  return Array.from(getMemoryStore().values());
}

export async function saveStudentRecord(record: StudentPerformanceRecord): Promise<void> {
  // ── REDIS MODE ───────────────────────────────────────────────────────────
  if (REDIS_ENABLED) {
    // Ensure seeded (so baseline exists in Redis before we add a new record)
    const seeded = await redisCommand(["GET", KEY_SEED]);
    if (!seeded) await seedBaselineToRedis();

    await redisCommand(["DEL", KEY_CLEAR]);                                    // Un-clear
    await redisCommand(["SET", `record:${record.id}`, JSON.stringify(record)]);
    await redisCommand(["SADD", KEY_IDS, record.id]);
    return;
  }

  // ── LOCAL DISK MODE ──────────────────────────────────────────────────────
  const store = getMemoryStore();
  store.set(record.id, record);
  persistToDisk();
}

export async function deleteStudentRecord(id: string): Promise<boolean> {
  // ── REDIS MODE ───────────────────────────────────────────────────────────
  if (REDIS_ENABLED) {
    // Ensure seeded (so the SET exists before we try to SREM)
    const seeded = await redisCommand(["GET", KEY_SEED]);
    if (!seeded) await seedBaselineToRedis();

    await redisCommand(["DEL", `record:${id}`]);
    await redisCommand(["SREM", KEY_IDS, id]);
    return true;
  }

  // ── LOCAL DISK MODE ──────────────────────────────────────────────────────
  const store = getMemoryStore();
  store.delete(id);
  persistToDisk();
  return true;
}

export async function clearAllStudentRecords(): Promise<boolean> {
  // ── REDIS MODE ───────────────────────────────────────────────────────────
  if (REDIS_ENABLED) {
    // Delete all individual record keys
    const ids = await redisCommand(["SMEMBERS", KEY_IDS]);
    if (Array.isArray(ids) && ids.length > 0) {
      const keys = ids.map((id: string) => `record:${id}`);
      await redisCommand(["DEL", ...keys]);
    }
    // Wipe the ID set and seeded flag so a fresh "Reset Demo" can re-seed
    await redisCommand(["DEL", KEY_IDS]);
    await redisCommand(["DEL", KEY_SEED]);
    // Mark as cleared so getAllStudentRecords returns []
    await redisCommand(["SET", KEY_CLEAR, "1"]);
    return true;
  }

  // ── LOCAL DISK MODE ──────────────────────────────────────────────────────
  const store = getMemoryStore();
  store.clear();
  persistToDisk();
  return true;
}

export async function resetToBaselineRoster(): Promise<boolean> {
  // ── REDIS MODE ───────────────────────────────────────────────────────────
  if (REDIS_ENABLED) {
    // Wipe existing records
    const ids = await redisCommand(["SMEMBERS", KEY_IDS]);
    if (Array.isArray(ids) && ids.length > 0) {
      const keys = ids.map((id: string) => `record:${id}`);
      await redisCommand(["DEL", ...keys]);
    }
    await redisCommand(["DEL", KEY_IDS]);
    await redisCommand(["DEL", KEY_CLEAR]);
    await redisCommand(["DEL", KEY_SEED]);
    // Re-seed baseline
    await seedBaselineToRedis();
    return true;
  }

  // ── LOCAL DISK MODE ──────────────────────────────────────────────────────
  const store = getMemoryStore();
  store.clear();
  BASELINE_ROSTER.forEach((rec) => store.set(rec.id, rec));
  persistToDisk();
  return true;
}
