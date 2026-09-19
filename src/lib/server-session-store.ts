// ============================================================================
// SERVER-SIDE SINGLE-USE ADAPTIVE SESSION STORE
// Eliminates replay attacks by maintaining an authoritative server ledger
// of consumed (sessionId, itemId) pairs.
//
// Features:
// - Server-Authoritative Single-Use item consumption tracking
// - Replay rejection: once an item is evaluated, all subsequent requests
//   for that item in the same session return 409 Conflict.
// - High-performance in-memory store with automatic TTL eviction (4 hours)
// - Native Upstash Redis / Vercel KV REST adapter (zero external dependencies)
// ============================================================================

export interface ServerSessionData {
  sessionId: string;
  topicId: string;
  activeItemId: string;
  consumedItemIds: string[];
  createdAt: number;
  updatedAt: number;
}

const SESSION_TTL_SECONDS = 60 * 60 * 4; // 4 hours
const SESSION_TTL_MS = SESSION_TTL_SECONDS * 1000;

// Global in-memory session registry (persists across requests in Node process)
declare global {
  // eslint-disable-next-line no-var
  var __pragatiAdaptiveSessionStore: Map<string, ServerSessionData> | undefined;
}

function getMemoryStore(): Map<string, ServerSessionData> {
  if (!globalThis.__pragatiAdaptiveSessionStore) {
    globalThis.__pragatiAdaptiveSessionStore = new Map<string, ServerSessionData>();
  }
  return globalThis.__pragatiAdaptiveSessionStore;
}

// Automatic cleanup of expired sessions
function cleanupExpiredSessions(): void {
  const store = getMemoryStore();
  const now = Date.now();
  for (const [id, session] of store.entries()) {
    if (now - session.updatedAt > SESSION_TTL_MS) {
      store.delete(id);
    }
  }
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

async function kvGet(key: string): Promise<ServerSessionData | null> {
  const result = await redisCommand(["GET", key]);
  if (!result) return null;
  try {
    return typeof result === "string" ? JSON.parse(result) : result;
  } catch {
    return null;
  }
}

async function kvSet(key: string, value: ServerSessionData, ttlSeconds: number = SESSION_TTL_SECONDS): Promise<void> {
  await redisCommand(["SET", key, JSON.stringify(value), "EX", ttlSeconds]);
}

/**
 * Register a newly initialized test session on the server
 */
export async function recordSessionStart(
  sessionId: string,
  topicId: string,
  initialItemId: string
): Promise<void> {
  cleanupExpiredSessions();

  const sessionData: ServerSessionData = {
    sessionId,
    topicId,
    activeItemId: initialItemId,
    consumedItemIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  // 1. In-memory store
  getMemoryStore().set(sessionId, sessionData);

  // 2. Cloud KV store (if configured)
  await kvSet(`session:${sessionId}`, sessionData);
}

/**
 * Retrieve server session state
 */
export async function getServerSession(sessionId: string): Promise<ServerSessionData | null> {
  // 1. Check in-memory store
  const mem = getMemoryStore().get(sessionId);
  if (mem) return mem;

  // 2. Check cloud KV store if available
  const cloud = await kvGet(`session:${sessionId}`);
  if (cloud) {
    getMemoryStore().set(sessionId, cloud);
    return cloud;
  }

  return null;
}

/**
 * Check if a question item has ALREADY been graded/consumed in this session.
 * Used to reject replay attacks even if the client captured and re-sent an earlier cookie.
 */
export async function isItemConsumed(sessionId: string, itemId: string): Promise<boolean> {
  const session = await getServerSession(sessionId);
  if (!session) return false;
  return session.consumedItemIds.includes(itemId);
}

/**
 * Mark an item as consumed and advance the session's active item
 */
export async function consumeItem(
  sessionId: string,
  itemId: string,
  nextItemId: string
): Promise<void> {
  let session = await getServerSession(sessionId);
  if (!session) {
    session = {
      sessionId,
      topicId: "",
      activeItemId: nextItemId,
      consumedItemIds: [itemId],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  } else {
    if (!session.consumedItemIds.includes(itemId)) {
      session.consumedItemIds.push(itemId);
    }
    session.activeItemId = nextItemId;
    session.updatedAt = Date.now();
  }

  // Persist update
  getMemoryStore().set(sessionId, session);
  await kvSet(`session:${sessionId}`, session);
}

/**
 * Get the currently active item expected for this session
 */
export async function getActiveItem(sessionId: string): Promise<string | null> {
  const session = await getServerSession(sessionId);
  return session ? session.activeItemId : null;
}
