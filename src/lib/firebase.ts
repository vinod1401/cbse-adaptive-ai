import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { StudentPerformanceRecord, getCachedStudentRoster, cacheStudentRoster } from "./student-session";

export const firebaseConfig = {
  apiKey: "AIzaSyDQdPfSiuQBQAI5tcb8Tn4FaxOrqVOLi-E",
  authDomain: "cbse-class8-tests.firebaseapp.com",
  projectId: "cbse-class8-tests",
  storageBucket: "cbse-class8-tests.firebasestorage.app",
  messagingSenderId: "841473220522",
  appId: "1:841473220522:web:8df776b033cd7d26df55d3"
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Sign in anonymously if client-side
let authPromise: Promise<any> | null = null;
export async function ensureAuth() {
  if (typeof window === "undefined") return null;
  if (auth.currentUser) return auth.currentUser;
  if (!authPromise) {
    authPromise = signInAnonymously(auth).catch((err) => {
      console.warn("Anonymous auth failed, fallback to local:", err);
      return null;
    });
  }
  return authPromise;
}

const COLLECTION_NAME = "adaptive_student_records";

// Save or update student performance
export async function syncStudentPerformance(record: StudentPerformanceRecord): Promise<void> {
  // Always update local cache first
  const cached = getCachedStudentRoster();
  const existingIdx = cached.findIndex((r) => r.id === record.id);
  if (existingIdx >= 0) {
    cached[existingIdx] = record;
  } else {
    cached.unshift(record);
  }
  cacheStudentRoster(cached);

  // Sync to Firestore
  try {
    await ensureAuth();
    const docRef = doc(db, COLLECTION_NAME, record.id);
    await setDoc(docRef, {
      ...record,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.warn("Firestore sync warning (data kept in local storage):", error);
  }
}

// Baseline mock roster for demonstration when starting fresh
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
    flaggedMisconceptions: ["Inverting fraction in division occasionally"]
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
    flaggedMisconceptions: ["Sign change error when transposing across equals sign"]
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
    flaggedMisconceptions: ["Omits 2ab cross term in (a+b)^2 expansion"]
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
    flaggedMisconceptions: []
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
    flaggedMisconceptions: ["Divides RHS instead of multiplying reciprocal", "Order of operations in multi-step brackets"]
  }
];

// Fetch all student records for Teacher/Admin
export async function fetchAllStudentRecords(): Promise<StudentPerformanceRecord[]> {
  const localList = getCachedStudentRoster();
  
  try {
    await ensureAuth();
    const q = query(collection(db, COLLECTION_NAME), limit(100));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const remoteList: StudentPerformanceRecord[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as any;
        remoteList.push({
          id: docSnap.id,
          studentId: data.studentId || docSnap.id,
          studentName: data.studentName || "Anonymous Student",
          rollNo: data.rollNo || "-",
          section: data.section || "8-A",
          topicId: data.topicId || "rational-numbers",
          topicTitle: data.topicTitle || "Class 8 Mathematics",
          theta: typeof data.theta === "number" ? data.theta : 0,
          masteryPct: typeof data.masteryPct === "number" ? data.masteryPct : 50,
          tier: data.tier || { label: "Proficient", badge: "🟡 Proficient" },
          questionsAttempted: data.questionsAttempted || 0,
          correctAnswers: data.correctAnswers || 0,
          accuracyPct: data.accuracyPct || 0,
          lastActive: data.lastActive || "Recently",
          flaggedMisconceptions: data.flaggedMisconceptions || [],
        });
      });

      // Merge remote with local and baseline (deduplicated by id)
      const map = new Map<string, StudentPerformanceRecord>();
      BASELINE_ROSTER.forEach((item) => map.set(item.id, item));
      remoteList.forEach((item) => map.set(item.id, item));
      localList.forEach((item) => map.set(item.id, item));
      return Array.from(map.values());
    }
  } catch (error) {
    console.warn("Firestore fetch error, utilizing cached & baseline records:", error);
  }

  // Fallback to local and baseline
  const map = new Map<string, StudentPerformanceRecord>();
  BASELINE_ROSTER.forEach((item) => map.set(item.id, item));
  localList.forEach((item) => map.set(item.id, item));
  return Array.from(map.values());
}
