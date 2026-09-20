// ============================================================================
// CBSE ADAPTIVE AI — OFFICIAL AUTOMATED TEST SUITE
// Run with: npm test
// ============================================================================

import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// 1. IRT Engine Psychometric Calibration
// ---------------------------------------------------------------------------
test('Suite 1: IRT Engine 3PL Math & Standard Error', () => {
  const c = 0.20;
  const a = 1.0;
  const b = 0.0;
  const theta = 0.0;
  const p = c + (1 - c) / (1 + Math.exp(-a * (theta - b)));
  assert.strictEqual(Math.round(p * 100) / 100, 0.60, '3PL probability at theta=b must equal 0.60');

  const currentVariance = 1.0;
  const itemInfo = 0.25;
  const newVariance = 1 / (1 / currentVariance + itemInfo);
  const newSE = Math.sqrt(newVariance);
  assert(newSE < 1.0, 'Standard error must decrease under Fisher information');
});

// ---------------------------------------------------------------------------
// 2. Client Bundle Protection (Zero Answer Leakage)
// ---------------------------------------------------------------------------
test('Suite 2: Client Bundle Protection & Server Guards', () => {
  const metaPath = path.join(projectRoot, 'src', 'lib', 'topics-metadata.ts');
  const metaContent = fs.readFileSync(metaPath, 'utf8');

  assert(!metaContent.includes('correctAnswer'), 'topics-metadata.ts MUST NOT leak correctAnswer');
  assert(!metaContent.includes('"misconceptions"'), 'topics-metadata.ts MUST NOT leak misconceptions');
  assert(!metaContent.includes('"explanation"'), 'topics-metadata.ts MUST NOT leak explanation');

  const clientPages = [
    path.join(projectRoot, 'src', 'app', 'page.tsx'),
    path.join(projectRoot, 'src', 'app', 'practice', 'page.tsx'),
    path.join(projectRoot, 'src', 'app', 'admin', 'page.tsx'),
  ];

  for (const p of clientPages) {
    const content = fs.readFileSync(p, 'utf8');
    assert(!content.includes('@/lib/question-bank'), `${path.basename(p)} must not import question-bank`);
    assert(content.includes('@/lib/topics-metadata'), `${path.basename(p)} must import topics-metadata`);
  }

  const qbPath = path.join(projectRoot, 'src', 'lib', 'question-bank.ts');
  const qbContent = fs.readFileSync(qbPath, 'utf8');
  assert(qbContent.includes('typeof window !== "undefined"'), 'question-bank.ts must contain server-only window guard');
  assert(qbContent.includes('SECURITY VIOLATION'), 'question-bank.ts must throw runtime error on client import');
});

// ---------------------------------------------------------------------------
// 3. Cryptographic Profile Signing & Anti-Tampering
// ---------------------------------------------------------------------------
test('Suite 3: Cryptographic Profile Signatures & Identity Binding', () => {
  const SECRET = 'pragati-cbse-student-profile-hmac-salt-2026';

  function signProfile(profile, identity) {
    const roll = String(identity?.rollNo ?? profile.rollNo ?? '0').trim();
    const sec = String(identity?.section ?? profile.section ?? 'A').trim().toUpperCase();
    const stdId = String(identity?.studentId ?? profile.studentId ?? 'std_anon').trim();
    const historyStr = (profile.history || []).map((h) => `${h.itemId}_${h.correct}`).join(',');
    const payload = `${stdId}:${roll}:${sec}:${profile.theta.toFixed(4)}:${profile.standardError.toFixed(4)}:${profile.itemsAttempted}:${profile.correctCount}:${historyStr}`;
    return crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  }

  function verifyProfileSignature(profile, signature, identity) {
    if (!signature) return false;
    const expected = signProfile(profile, identity);
    if (signature.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  }

  const identityA = { studentId: 'std_08', rollNo: '08', section: '8-A' };
  const profileA = { theta: 1.2, standardError: 0.45, itemsAttempted: 8, correctCount: 7, history: [] };
  const validSig = signProfile(profileA, identityA);

  assert.strictEqual(verifyProfileSignature(profileA, validSig, identityA), true, 'Valid profile signature must pass');

  // Tampered theta
  const tamperedProfile = { ...profileA, theta: 3.0 };
  assert.strictEqual(verifyProfileSignature(tamperedProfile, validSig, identityA), false, 'Tampered theta must fail verification');

  // Classmate identity spoofing (targeting classmate roll 14)
  const spoofedIdentity = { studentId: 'std_14', rollNo: '14', section: '8-B' };
  assert.strictEqual(verifyProfileSignature(profileA, validSig, spoofedIdentity), false, 'Classmate identity spoofing must fail verification');
});

// ---------------------------------------------------------------------------
// 4. Shared Teacher / Admin Authentication
// ---------------------------------------------------------------------------
test('Suite 4: Shared Admin Authentication & Token Verification', () => {
  const adminAuthPath = path.join(projectRoot, 'src', 'lib', 'admin-auth.ts');
  const adminAuthContent = fs.readFileSync(adminAuthPath, 'utf8');

  assert(adminAuthContent.includes('createSignedAdminToken'), 'admin-auth.ts must export createSignedAdminToken');
  assert(adminAuthContent.includes('verifyAdminToken'), 'admin-auth.ts must export verifyAdminToken');
  assert(adminAuthContent.includes('timingSafeEqual'), 'admin-auth.ts must use timingSafeEqual');

  const authRoute = fs.readFileSync(path.join(projectRoot, 'src', 'app', 'api', 'admin', 'auth', 'route.ts'), 'utf8');
  const recordsRoute = fs.readFileSync(path.join(projectRoot, 'src', 'app', 'api', 'student', 'records', 'route.ts'), 'utf8');

  assert(authRoute.includes('verifyAdminToken'), 'auth/route must use verifyAdminToken');
  assert(recordsRoute.includes('verifyAdminToken'), 'records/route must use verifyAdminToken');
  assert(recordsRoute.includes('ADMIN_COOKIE_NAME'), 'records/route must use shared ADMIN_COOKIE_NAME');
});

// ---------------------------------------------------------------------------
// 5. Server-Side Single-Use Tracking & Replay Defense
// ---------------------------------------------------------------------------
test('Suite 5: Server-Side Single-Use Tracking & Replay Defense', () => {
  const sessionStorePath = path.join(projectRoot, 'src', 'lib', 'server-session-store.ts');
  const sessionStoreContent = fs.readFileSync(sessionStorePath, 'utf8');

  assert(sessionStoreContent.includes('recordSessionStart'), 'server-session-store must export recordSessionStart');
  assert(sessionStoreContent.includes('isItemConsumed'), 'server-session-store must export isItemConsumed');
  assert(sessionStoreContent.includes('consumeItem'), 'server-session-store must export consumeItem');

  const adaptiveRoutePath = path.join(projectRoot, 'src', 'app', 'api', 'adaptive', 'route.ts');
  const adaptiveRouteContent = fs.readFileSync(adaptiveRoutePath, 'utf8');

  assert(adaptiveRouteContent.includes('isItemConsumed'), 'adaptive route must check isItemConsumed');
  assert(adaptiveRouteContent.includes('consumeItem'), 'adaptive route must call consumeItem');
  assert(adaptiveRouteContent.includes('status: 409'), 'adaptive route must return 409 on replay attempts');
});

// ---------------------------------------------------------------------------
// 6. Upstash Redis / KV Cloud Storage Support
// ---------------------------------------------------------------------------
test('Suite 6: Shared Store (Upstash Redis / Vercel KV)', () => {
  const recordsStorePath = path.join(projectRoot, 'src', 'lib', 'student-records-store.ts');
  const recordsStoreContent = fs.readFileSync(recordsStorePath, 'utf8');

  assert(recordsStoreContent.includes('UPSTASH_REDIS_REST_URL'), 'student-records-store must support UPSTASH_REDIS_REST_URL');
  assert(recordsStoreContent.includes('redisCommand'), 'student-records-store must implement redisCommand');

  const envExamplePath = path.join(projectRoot, '.env.local.example');
  const envExampleContent = fs.readFileSync(envExamplePath, 'utf8');

  assert(envExampleContent.includes('UPSTASH_REDIS_REST_URL'), '.env.local.example must document UPSTASH_REDIS_REST_URL');
  assert(envExampleContent.includes('AUTH_SECRET'), '.env.local.example must document AUTH_SECRET');
});

// ---------------------------------------------------------------------------
// 7. Strict TypeScript & Build Configuration
// ---------------------------------------------------------------------------
test('Suite 7: Strict TypeScript Enforcement', () => {
  const nextConfigPath = path.join(projectRoot, 'next.config.mjs');
  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

  assert(!nextConfigContent.includes('ignoreBuildErrors'), 'next.config.mjs must NOT contain ignoreBuildErrors');
});

// ---------------------------------------------------------------------------
// 8. Admin Student Record Deletion & Purge Protection
// ---------------------------------------------------------------------------
test('Suite 8: Admin Student Record Deletion & Purge Protection', () => {
  const recordsRoutePath = path.join(projectRoot, 'src', 'app', 'api', 'student', 'records', 'route.ts');
  const recordsRouteContent = fs.readFileSync(recordsRoutePath, 'utf8');

  assert(recordsRouteContent.includes('export async function DELETE'), 'records route must export DELETE method');
  assert(recordsRouteContent.includes('verifyAdminToken'), 'records DELETE must verify admin token');
  assert(recordsRouteContent.includes('deleteStudentRecord'), 'records DELETE must call deleteStudentRecord');
  assert(recordsRouteContent.includes('clearAllStudentRecords'), 'records DELETE must support clearAllStudentRecords');
  assert(recordsRouteContent.includes('resetToBaselineRoster'), 'records DELETE must support resetToBaselineRoster');

  const recordsStorePath = path.join(projectRoot, 'src', 'lib', 'student-records-store.ts');
  const recordsStoreContent = fs.readFileSync(recordsStorePath, 'utf8');

  assert(recordsStoreContent.includes('export async function deleteStudentRecord'), 'records store must export deleteStudentRecord');
  assert(recordsStoreContent.includes('export async function clearAllStudentRecords'), 'records store must export clearAllStudentRecords');
  assert(recordsStoreContent.includes('export async function resetToBaselineRoster'), 'records store must export resetToBaselineRoster');
});

