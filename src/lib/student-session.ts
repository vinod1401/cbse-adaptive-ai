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
  lastAttemptAt?: string; // e.g. "08:15 AM"
  lastAttemptTimestamp?: number; // epoch ms
  sessionDurationSeconds?: number;
  sessionDurationFormatted?: string; // e.g. "12m 25s"
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

export function deleteCachedStudentRecord(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getCachedStudentRoster();
    const updated = list.filter((r) => r.id !== id);
    localStorage.setItem(ROSTER_KEY, JSON.stringify(updated));
  } catch {}
}

export function clearCachedStudentRoster(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ROSTER_KEY);
  } catch {}
}

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
    lastAttemptAt: "08:05 AM",
    sessionDurationSeconds: 780,
    sessionDurationFormatted: "13m 00s",
    flaggedMisconceptions: ["Inverting fraction in division occasionally"],
  },
  {
    id: "08_8A_colonial-era-in-india",
    studentId: "std_08",
    studentName: "Aarav Sharma",
    rollNo: "08",
    section: "8-A",
    topicId: "colonial-era-in-india",
    topicTitle: "The Colonial Era in India & Economic Drain",
    theta: 0.90,
    masteryPct: 72,
    tier: { label: "Proficient", badge: "🟡 Proficient" },
    questionsAttempted: 9,
    correctAnswers: 7,
    accuracyPct: 78,
    lastActive: "5 mins ago",
    lastAttemptAt: "08:15 AM",
    sessionDurationSeconds: 675,
    sessionDurationFormatted: "11m 15s",
    flaggedMisconceptions: [],
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
    lastAttemptAt: "07:35 AM",
    sessionDurationSeconds: 620,
    sessionDurationFormatted: "10m 20s",
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
    lastAttemptAt: "07:20 AM",
    sessionDurationSeconds: 940,
    sessionDurationFormatted: "15m 40s",
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
    lastAttemptAt: "06:15 AM",
    sessionDurationSeconds: 860,
    sessionDurationFormatted: "14m 20s",
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
    lastAttemptAt: "Yesterday, 04:30 PM",
    sessionDurationSeconds: 490,
    sessionDurationFormatted: "8m 10s",
    flaggedMisconceptions: ["Divides RHS instead of multiplying reciprocal", "Order of operations in multi-step brackets"],
  },
  {
    id: "12_8-A_colonial-era-in-india",
    studentId: "std_12_8-A",
    studentName: "Aadvik",
    rollNo: "12",
    section: "8-A",
    topicId: "colonial-era-in-india",
    topicTitle: "The Colonial Era in India & Economic Drain",
    theta: 0.45,
    masteryPct: 62,
    tier: { label: "Proficient", badge: "🟡 Proficient" },
    questionsAttempted: 8,
    correctAnswers: 6,
    accuracyPct: 75,
    lastActive: "10 mins ago",
    lastAttemptAt: "08:10 AM",
    sessionDurationSeconds: 710,
    sessionDurationFormatted: "11m 50s",
    flaggedMisconceptions: [],
  },
  {
    id: "12_8-A_rational-numbers",
    studentId: "std_12_8-A",
    studentName: "Aadvik",
    rollNo: "12",
    section: "8-A",
    topicId: "rational-numbers",
    topicTitle: "Operations on Rational Numbers",
    theta: 0.20,
    masteryPct: 55,
    tier: { label: "Proficient", badge: "🟡 Proficient" },
    questionsAttempted: 6,
    correctAnswers: 4,
    accuracyPct: 67,
    lastActive: "30 mins ago",
    lastAttemptAt: "07:50 AM",
    sessionDurationSeconds: 510,
    sessionDurationFormatted: "8m 30s",
    flaggedMisconceptions: ["Reciprocal error during fraction division"],
  },
  {
    id: "15_8-A_colonial-era-in-india",
    studentId: "std_15_8-A",
    studentName: "Parv",
    rollNo: "15",
    section: "8-A",
    topicId: "colonial-era-in-india",
    topicTitle: "The Colonial Era in India & Economic Drain",
    theta: 0.3,
    masteryPct: 58,
    tier: { label: "Proficient", badge: "🟡 Proficient" },
    questionsAttempted: 7,
    correctAnswers: 5,
    accuracyPct: 71,
    lastActive: "15 mins ago",
    lastAttemptAt: "08:05 AM",
    sessionDurationSeconds: 580,
    sessionDurationFormatted: "9m 40s",
    flaggedMisconceptions: [],
  },
  {
    id: "15_8-A_crop-production",
    studentId: "std_15_8-A",
    studentName: "Parv",
    rollNo: "15",
    section: "8-A",
    topicId: "crop-production",
    topicTitle: "Crop Production & Agricultural Practices",
    theta: 0.60,
    masteryPct: 65,
    tier: { label: "Proficient", badge: "🟡 Proficient" },
    questionsAttempted: 8,
    correctAnswers: 6,
    accuracyPct: 75,
    lastActive: "40 mins ago",
    lastAttemptAt: "07:40 AM",
    sessionDurationSeconds: 615,
    sessionDurationFormatted: "10m 15s",
    flaggedMisconceptions: [],
  },
];

