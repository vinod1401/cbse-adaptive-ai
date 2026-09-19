export interface StudentProfile {
  id: string;
  name: string;
  rollNo: string;
  section: string;
  updatedAt: number;
}

export interface StudentPerformanceRecord {
  id: string; // rollNo + section + topicId
  studentId: string;
  studentName: string;
  rollNo: string;
  section: string;
  topicId: string;
  topicTitle: string;
  theta: number;
  masteryPct: number;
  tier: {
    label: string;
    badge: string;
  };
  questionsAttempted: number;
  correctAnswers: number;
  accuracyPct: number;
  lastActive: string;
  flaggedMisconceptions: string[];
}

const STORAGE_KEY = 'cbse_student_profile_v1';
const ROSTER_KEY = 'cbse_student_roster_cache_v1';

export function getSavedStudentProfile(): StudentProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStudentProfile(profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Error saving student profile:', e);
  }
}

export function clearStudentProfile(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function getCachedStudentRoster(): StudentPerformanceRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ROSTER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function cacheStudentRoster(records: StudentPerformanceRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ROSTER_KEY, JSON.stringify(records));
  } catch {}
}
