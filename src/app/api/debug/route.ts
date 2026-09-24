// Debug endpoint — Redis state checker (Admin only)
import { NextResponse } from "next/server";

const KV_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

async function redis(args: (string | number)[]): Promise<any> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(KV_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(args),
      cache: "no-store",
    });
    if (!res.ok) return `HTTP_ERR_${res.status}`;
    const json = await res.json();
    return json.result ?? null;
  } catch (e: any) {
    return `FETCH_ERR: ${e.message}`;
  }
}

export async function GET() {
  const redisEnabled = !!(KV_URL && KV_TOKEN);

  let cleared = null, seeded = null, ids: any = null, recordCount = 0;

  if (redisEnabled) {
    cleared   = await redis(["GET", "cbse_all_cleared"]);
    seeded    = await redis(["GET", "cbse_seeded"]);
    ids       = await redis(["SMEMBERS", "cbse_student_record_ids"]);
    recordCount = Array.isArray(ids) ? ids.length : 0;
  }

  return NextResponse.json({
    redis_enabled: redisEnabled,
    kv_url_set: !!KV_URL,
    kv_token_set: !!KV_TOKEN,
    cbse_all_cleared: cleared,
    cbse_seeded: seeded,
    record_ids_count: recordCount,
    record_ids: Array.isArray(ids) ? ids : [],
  });
}
