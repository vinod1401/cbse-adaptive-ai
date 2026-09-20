// ============================================================================
// STUDENT PERFORMANCE SYNC & ROSTER SERVICE
// Secure Server-Authoritative Sync (Eliminates untrusted client Firestore writes)
// Features:
// - Server-Verified Cryptographic HMAC Profile Sync (/api/student/sync)
// - Authenticated Teacher Dashboard Records Fetch (/api/student/records)
// - Offline-Resilient Local Storage Fallback Cache
// ============================================================================

import {
  StudentPerformanceRecord,
  getCachedStudentRoster,
  cacheStudentRoster,
  deleteCachedStudentRecord,
  clearCachedStudentRoster,
} from "./student-session";
import { BASELINE_ROSTER } from "./student-records-store";

export { BASELINE_ROSTER };

export interface SyncStudentPayload extends StudentPerformanceRecord {
  profile?: any;
  signature?: string;
}

/**
 * Sync student performance to the server-authoritative API.
 * The server cryptographically validates the profile HMAC signature before persisting.
 */
export async function syncStudentPerformance(payload: SyncStudentPayload): Promise<void> {
  // 1. Update local cache immediately for instant UI feedback
  const cached = getCachedStudentRoster();
  const existingIdx = cached.findIndex((r) => r.id === payload.id);
  if (existingIdx >= 0) {
    cached[existingIdx] = payload;
  } else {
    cached.unshift(payload);
  }
  cacheStudentRoster(cached);

  // 2. Transmit to server-authoritative endpoint with cryptographic signature
  try {
    const res = await fetch("/api/student/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile: payload.profile,
        signature: payload.signature,
        student: {
          studentId: payload.studentId,
          studentName: payload.studentName,
          rollNo: payload.rollNo,
          section: payload.section,
        },
        topicId: payload.topicId,
        topicTitle: payload.topicTitle,
        misconceptions: payload.flaggedMisconceptions || [],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.record) {
        // Update local cache with authoritative server-computed record
        const updated = getCachedStudentRoster();
        const idx = updated.findIndex((r) => r.id === data.record.id);
        if (idx >= 0) {
          updated[idx] = data.record;
        } else {
          updated.unshift(data.record);
        }
        cacheStudentRoster(updated);
      }
    } else {
      const errJson = await res.json().catch(() => ({}));
      console.warn("Server sync rejected:", errJson.error || res.statusText);
    }
  } catch (error) {
    console.warn("Background server sync notice (cached locally):", error);
  }
}

/**
 * Fetch student records from the authenticated server records endpoint.
 */
export async function fetchAllStudentRecords(): Promise<StudentPerformanceRecord[]> {
  try {
    const res = await fetch("/api/student/records");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.records)) {
        // Authoritative server state — update local cache
        cacheStudentRoster(data.records);
        return data.records;
      }
    }
  } catch (error) {
    console.warn("Server records fetch notice (falling back to cache):", error);
  }

  // Fallback to local cache if offline or unauthenticated
  const localList = getCachedStudentRoster();
  return localList;
}

/**
 * Delete a single student record from server and cache (Teacher Authenticated).
 */
export async function deleteStudentRecordOnServer(
  id: string
): Promise<{ success: boolean; records?: StudentPerformanceRecord[]; error?: string }> {
  try {
    const res = await fetch("/api/student/records", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      deleteCachedStudentRecord(id);
      if (Array.isArray(data.records)) {
        cacheStudentRoster(data.records);
      }
      return { success: true, records: data.records };
    }
    return { success: false, error: data.error || "Failed to delete record." };
  } catch (error: any) {
    return { success: false, error: error.message || "Network error during deletion." };
  }
}

/**
 * Clear ALL student records from server and cache (Teacher Authenticated).
 */
export async function clearAllStudentRecordsOnServer(): Promise<{
  success: boolean;
  records?: StudentPerformanceRecord[];
  error?: string;
}> {
  try {
    const res = await fetch("/api/student/records", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      clearCachedStudentRoster();
      return { success: true, records: [] };
    }
    return { success: false, error: data.error || "Failed to clear records." };
  } catch (error: any) {
    return { success: false, error: error.message || "Network error during clear." };
  }
}

/**
 * Reset student records to default CBSE sample benchmark roster (Teacher Authenticated).
 */
export async function resetStudentRecordsOnServer(): Promise<{
  success: boolean;
  records?: StudentPerformanceRecord[];
  error?: string;
}> {
  try {
    const res = await fetch("/api/student/records", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetBaseline: true }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      if (Array.isArray(data.records)) {
        cacheStudentRoster(data.records);
      }
      return { success: true, records: data.records };
    }
    return { success: false, error: data.error || "Failed to reset records." };
  } catch (error: any) {
    return { success: false, error: error.message || "Network error during reset." };
  }
}
