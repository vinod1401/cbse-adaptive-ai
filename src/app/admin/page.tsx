"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllTopics } from "@/lib/topics-metadata";
import { getThetaConfidenceInterval } from "@/lib/irt-engine";
import {
  Brain,
  ArrowLeft,
  Users,
  Target,
  AlertTriangle,
  Award,
  RefreshCw,
  BarChart3,
  ShieldAlert,
  Search,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  ChevronRight,
  Sparkles,
  Lock,
  Unlock,
  KeyRound,
  Printer,
  FileText,
  ShieldCheck,
  Check,
  Trash2,
  AlertOctagon,
  RotateCcw,
  UserPlus
} from "lucide-react";
import { StudentPerformanceRecord } from "@/lib/student-session";
import {
  fetchAllStudentRecords,
  deleteStudentRecordOnServer,
  clearAllStudentRecordsOnServer,
  resetStudentRecordsOnServer,
  addStudentRecordOnServer,
} from "@/lib/firebase";

interface AggregatedStudent {
  studentKey: string;
  studentName: string;
  rollNo: string;
  section: string;
  topicsCount: number;
  latestTopicTitle: string;
  topicTitles: string[];
  avgTheta: number;
  avgMasteryPct: number;
  overallTier: { label: string; badge: string };
  totalAttempted: number;
  totalCorrect: number;
  overallAccuracyPct: number;
  latestAttemptAt: string;
  latestActive: string;
  latestAttemptTimestamp: number;
  totalDurationFormatted: string;
  totalDurationSeconds: number;
  allMisconceptions: string[];
  isAtRisk: boolean;
  records: StudentPerformanceRecord[];
  latestRecord: StudentPerformanceRecord;
}

function formatDynamicRelativeTime(timeStr?: string, timestamp?: number): string {
  let ts = timestamp;
  if (!ts && timeStr) {
    const isYesterday = timeStr.toLowerCase().includes("yesterday");
    const cleanTime = timeStr.replace(/yesterday,?\s*/i, "").trim();
    const match = cleanTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
      const now = new Date();
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
      if (isYesterday) d.setDate(d.getDate() - 1);
      ts = d.getTime();
    }
  }

  if (!ts) return timeStr || "Recently";

  const diffMs = Date.now() - ts;
  if (diffMs < 0 || diffMs < 45 * 1000) return "Just now";
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin === 1) return "1 min ago";
  if (diffMin < 60) return `${diffMin} mins ago`;
  if (diffHour === 1) return "1 hour ago";
  if (diffHour < 24) return `${diffHour} hours ago`;
  if (diffDay === 1) return "Yesterday";
  return `${diffDay} days ago`;
}

export default function AdminDashboardPage() {
  const topics = getAllTopics();
  const [records, setRecords] = useState<StudentPerformanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Security PIN State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("ALL");
  const [selectedTier, setSelectedTier] = useState("ALL");
  const [selectedStudentModal, setSelectedStudentModal] = useState<StudentPerformanceRecord | null>(null);

  // Add Student Modal State
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentRoll, setNewStudentRoll] = useState("");
  const [newStudentSection, setNewStudentSection] = useState("8-A");
  const [newStudentTopic, setNewStudentTopic] = useState("rational-numbers");

  // Deletion & Data Management State
  const [recordToDelete, setRecordToDelete] = useState<StudentPerformanceRecord | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<AggregatedStudent | null>(null);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Check server-verified PIN auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        }
      } catch (e) {}
    }
    checkAuth();
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setPinError("");
        setPinInput("");
      } else {
        setPinError(data.error || "Incorrect PIN. Default PIN is 1234.");
      }
    } catch (e) {
      setPinError("Connection error during verification.");
    }
  };

  const handleLock = async () => {
    setIsAuthenticated(false);
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch (e) {}
  };

  const loadStudentRecords = async () => {
    setRefreshing(true);
    try {
      const data = await fetchAllStudentRecords();
      setRecords(data);
    } catch (e) {
      console.error("Failed to load records:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDeleteSingle = async () => {
    if (!recordToDelete) return;
    setActionLoading(true);
    const res = await deleteStudentRecordOnServer(recordToDelete.id);
    setActionLoading(false);
    if (res.success) {
      if (res.records) {
        setRecords(res.records);
      } else {
        setRecords((prev) => prev.filter((r) => r.id !== recordToDelete.id));
      }
      if (selectedStudentModal?.id === recordToDelete.id) {
        setSelectedStudentModal(null);
      }
      const deletedName = recordToDelete.studentName;
      const deletedRoll = recordToDelete.rollNo;
      setRecordToDelete(null);
      setActionFeedback({
        type: "success",
        message: `Record for ${deletedName} (Roll #${deletedRoll}) successfully deleted.`,
      });
      setTimeout(() => setActionFeedback(null), 4000);
    } else {
      setActionFeedback({
        type: "error",
        message: res.error || "Failed to delete student record.",
      });
      setTimeout(() => setActionFeedback(null), 4000);
    }
  };

  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;
    setActionLoading(true);
    const ids = studentToDelete.records.map((r) => r.id);
    const res = await deleteStudentRecordOnServer(ids);
    setActionLoading(false);
    if (res.success) {
      if (res.records) {
        setRecords(res.records);
      } else {
        const idSet = new Set(ids);
        setRecords((prev) => prev.filter((r) => !idSet.has(r.id)));
      }
      if (selectedStudentModal && ids.includes(selectedStudentModal.id)) {
        setSelectedStudentModal(null);
      }
      const deletedName = studentToDelete.studentName;
      const deletedRoll = studentToDelete.rollNo;
      setStudentToDelete(null);
      setActionFeedback({
        type: "success",
        message: `Student "${deletedName}" (Roll #${deletedRoll}) and all associated records deleted successfully.`,
      });
      setTimeout(() => setActionFeedback(null), 4000);
    } else {
      setActionFeedback({
        type: "error",
        message: res.error || "Failed to delete student.",
      });
      setTimeout(() => setActionFeedback(null), 4000);
    }
  };

  const handleClearAll = async () => {
    setActionLoading(true);
    const res = await clearAllStudentRecordsOnServer();
    setActionLoading(false);
    if (res.success) {
      setRecords([]);
      setSelectedStudentModal(null);
      setShowClearAllModal(false);
      setActionFeedback({
        type: "success",
        message: "All student test records cleared successfully.",
      });
      setTimeout(() => setActionFeedback(null), 4000);
    } else {
      setActionFeedback({
        type: "error",
        message: res.error || "Failed to clear student records.",
      });
      setTimeout(() => setActionFeedback(null), 4000);
    }
  };

  const handleResetBaseline = async () => {
    setActionLoading(true);
    const res = await resetStudentRecordsOnServer();
    setActionLoading(false);
    if (res.success) {
      if (res.records) {
        setRecords(res.records);
      } else {
        await loadStudentRecords();
      }
      setShowResetModal(false);
      setActionFeedback({
        type: "success",
        message: "Roster reset to default CBSE Class 8 benchmark data.",
      });
      setTimeout(() => setActionFeedback(null), 4000);
    } else {
      setActionFeedback({
        type: "error",
        message: res.error || "Failed to reset sample data.",
      });
      setTimeout(() => setActionFeedback(null), 4000);
    }
  };

  const handleAddStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentRoll.trim()) return;

    setActionLoading(true);
    const chosenTopic = topics.find((t) => t.id === newStudentTopic) || topics[0];
    const res = await addStudentRecordOnServer({
      studentName: newStudentName.trim(),
      rollNo: newStudentRoll.trim(),
      section: newStudentSection,
      topicId: chosenTopic ? chosenTopic.id : "rational-numbers",
      topicTitle: chosenTopic ? chosenTopic.title : "Class 8 Mathematics",
    });
    setActionLoading(false);

    if (res.success) {
      if (res.records) {
        setRecords(res.records);
      } else if (res.record) {
        setRecords((prev) => [res.record!, ...prev]);
      }
      setShowAddStudentModal(false);
      setNewStudentName("");
      setNewStudentRoll("");
      setActionFeedback({
        type: "success",
        message: `Student "${newStudentName.trim()}" (Roll #${newStudentRoll.trim()}) added to roster successfully!`,
      });
      setTimeout(() => setActionFeedback(null), 4000);
    } else {
      setActionFeedback({
        type: "error",
        message: res.error || "Failed to add student.",
      });
      setTimeout(() => setActionFeedback(null), 4000);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadStudentRecords();
    }
  }, [isAuthenticated]);

  // Group all records by unique student identity (rollNo + section)
  const uniqueStudents: AggregatedStudent[] = React.useMemo(() => {
    const map = new Map<string, StudentPerformanceRecord[]>();

    records.forEach((r) => {
      const sanitizedRoll = String(r.rollNo || "").trim().toLowerCase();
      const sanitizedSec = String(r.section || "").trim().toLowerCase().replace(/^8-?/, "");
      const key = `${sanitizedRoll}_${sanitizedSec}`;
      const existing = map.get(key) || [];
      existing.push(r);
      map.set(key, existing);
    });

    const result: AggregatedStudent[] = [];

    map.forEach((stRecords, key) => {
      if (!stRecords || stRecords.length === 0) return;

      // Sort by lastAttemptTimestamp descending to get latest record first
      const sorted = [...stRecords].sort((a, b) => {
        const tsA = typeof a.lastAttemptTimestamp === "number" ? a.lastAttemptTimestamp : 0;
        const tsB = typeof b.lastAttemptTimestamp === "number" ? b.lastAttemptTimestamp : 0;
        return tsB - tsA;
      });

      const latest = sorted[0];
      const topicsCount = sorted.length;
      const topicTitles = Array.from(new Set(sorted.map((s) => s.topicTitle)));

      const totalAttempted = sorted.reduce((sum, r) => sum + (r.questionsAttempted || 0), 0);
      const totalCorrect = sorted.reduce((sum, r) => sum + (r.correctAnswers || 0), 0);
      const overallAccuracyPct = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

      const avgTheta = Number((sorted.reduce((sum, r) => sum + (r.theta || 0), 0) / topicsCount).toFixed(2));
      const avgMasteryPct = Math.round(sorted.reduce((sum, r) => sum + (r.masteryPct || 0), 0) / topicsCount);

      let overallTier = latest.tier || { label: "Proficient", badge: "🟡 Proficient" };
      if (avgTheta >= 1.0) {
        overallTier = { label: "Advanced", badge: "🏆 Level 3: Advanced" };
      } else if (avgTheta >= -0.3) {
        overallTier = { label: "Proficient", badge: "🟡 Level 2: Proficient" };
      } else {
        overallTier = { label: "Foundation", badge: "🔴 Remedial Needed" };
      }

      const totalDurationSeconds = sorted.reduce((sum, r) => sum + (r.sessionDurationSeconds || 0), 0);
      let totalDurationFormatted = latest.sessionDurationFormatted || "< 1 min";
      if (totalDurationSeconds > 0) {
        const m = Math.floor(totalDurationSeconds / 60);
        const s = totalDurationSeconds % 60;
        totalDurationFormatted = m === 0 ? `${s}s` : `${m}m ${s < 10 ? "0" : ""}${s}s`;
      }

      const allMisconceptions = Array.from(
        new Set(sorted.flatMap((r) => r.flaggedMisconceptions || []).filter(Boolean))
      );

      const isAtRisk = avgTheta < -0.3 || overallAccuracyPct < 50;

      result.push({
        studentKey: key,
        studentName: latest.studentName,
        rollNo: latest.rollNo,
        section: latest.section,
        topicsCount,
        latestTopicTitle: latest.topicTitle,
        topicTitles,
        avgTheta,
        avgMasteryPct,
        overallTier,
        totalAttempted,
        totalCorrect,
        overallAccuracyPct,
        latestAttemptAt: latest.lastAttemptAt || "08:15 PM",
        latestActive: formatDynamicRelativeTime(latest.lastAttemptAt, latest.lastAttemptTimestamp),
        latestAttemptTimestamp: latest.lastAttemptTimestamp || 0,
        totalDurationSeconds,
        totalDurationFormatted,
        allMisconceptions,
        isAtRisk,
        records: sorted,
        latestRecord: latest,
      });
    });

    // Sort by roll number numeric ascending
    return result.sort((a, b) => {
      const numA = parseInt(a.rollNo, 10);
      const numB = parseInt(b.rollNo, 10);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.rollNo.localeCompare(b.rollNo);
    });
  }, [records]);

  // Filtered Students Roster (One row per unique student)
  const filteredStudents = uniqueStudents.filter((std) => {
    const matchesSearch =
      std.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection =
      selectedSection === "ALL" ||
      std.section === selectedSection ||
      std.section === `8-${selectedSection}` ||
      std.section === `8${selectedSection}` ||
      std.section?.endsWith(selectedSection) ||
      (selectedSection.startsWith("8-") && std.section === selectedSection.replace("8-", ""));
    const matchesTier =
      selectedTier === "ALL" ||
      (selectedTier === "AT_RISK" && std.isAtRisk) ||
      (selectedTier === "PROFICIENT" && !std.isAtRisk && std.avgTheta < 1.0) ||
      (selectedTier === "ADVANCED" && std.avgTheta >= 1.0);

    return matchesSearch && matchesSection && matchesTier;
  });

  // Selected student multi-topic history (For Modal Report Card)
  const selectedStudentTopics = selectedStudentModal
    ? records.filter(
        (r) =>
          r.rollNo.toLowerCase() === selectedStudentModal.rollNo.toLowerCase() &&
          (r.section === selectedStudentModal.section ||
            r.studentName.toLowerCase() === selectedStudentModal.studentName.toLowerCase())
      )
    : [];

  const totalAttemptedQuestions = selectedStudentTopics.reduce((sum, r) => sum + r.questionsAttempted, 0);
  const totalCorrectAnswers = selectedStudentTopics.reduce((sum, r) => sum + r.correctAnswers, 0);
  const overallAccuracy = totalAttemptedQuestions > 0 ? Math.round((totalCorrectAnswers / totalAttemptedQuestions) * 100) : 0;

  const modalAvgTheta = selectedStudentTopics.length > 0
    ? Number((selectedStudentTopics.reduce((sum, r) => sum + (r.theta || 0), 0) / selectedStudentTopics.length).toFixed(2))
    : (selectedStudentModal?.theta || 0);

  const modalAvgMastery = selectedStudentTopics.length > 0
    ? Math.round(selectedStudentTopics.reduce((sum, r) => sum + (r.masteryPct || 0), 0) / selectedStudentTopics.length)
    : (selectedStudentModal?.masteryPct || 50);

  const modalTierBadge = modalAvgTheta >= 1.0
    ? "🏆 Level 3: Advanced"
    : modalAvgTheta >= -0.3
    ? "🟡 Level 2: Proficient"
    : "🔴 Remedial Needed";

  // Analytics Metrics across unique students
  const totalStudents = uniqueStudents.length;
  const avgTheta =
    totalStudents > 0
      ? (uniqueStudents.reduce((sum, s) => sum + s.avgTheta, 0) / totalStudents).toFixed(2)
      : "+0.00";
  const avgMastery =
    totalStudents > 0
      ? Math.round(uniqueStudents.reduce((sum, s) => sum + s.avgMasteryPct, 0) / totalStudents)
      : 50;
  const atRiskCount = uniqueStudents.filter((s) => s.isAtRisk).length;

  // Export to CSV (Unique Students)
  const handleExportCSV = () => {
    const headers = [
      "Roll No",
      "Student Name",
      "Section",
      "Topics Attempted",
      "Latest Topic",
      "Average Ability (Theta)",
      "Average Mastery %",
      "Overall Tier",
      "Total Questions Attempted",
      "Total Correct Answers",
      "Overall Accuracy %",
      "Last Attempt Time",
      "Session Duration",
      "Flagged Misconceptions"
    ];

    const rows = filteredStudents.map((s) => [
      `"${s.rollNo}"`,
      `"${s.studentName}"`,
      `"${s.section}"`,
      s.topicsCount,
      `"${s.latestTopicTitle}"`,
      s.avgTheta >= 0 ? `+${s.avgTheta.toFixed(2)}` : s.avgTheta.toFixed(2),
      `${s.avgMasteryPct}%`,
      `"${s.overallTier.label}"`,
      s.totalAttempted,
      s.totalCorrect,
      `${s.overallAccuracyPct}%`,
      `"${s.latestAttemptAt}"`,
      `"${s.totalDurationFormatted}"`,
      `"${s.allMisconceptions.join("; ")}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CBSE_Class8_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintReport = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // ================= PIN LOCK SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/10">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">Teacher Access Control</h2>
            <p className="text-sm text-slate-400">
              Enter your 4-digit Teacher PIN to view CBSE Class 8 student performance records and analytics.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4 pt-2">
            <div>
              <input
                type="password"
                maxLength={4}
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value.replace(/\D/g, ""));
                  setPinError("");
                }}
                placeholder="• • • •"
                className="w-48 mx-auto text-center text-3xl font-mono tracking-[0.5em] px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              {pinError && <p className="text-xs text-rose-400 mt-2 font-medium">{pinError}</p>}
            </div>

            <button
              type="submit"
              disabled={pinInput.length !== 4}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-500">
            <span>Protected by Server-Side Teacher Authentication (Default PIN: <strong className="text-slate-300 font-mono">1234</strong>).</span>
          </div>

          <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Student Portal</span>
          </Link>
        </div>
      </div>
    );
  }

  // ================= UNLOCKED DASHBOARD =================
  return (
    <div className="space-y-8">
      {/* Print Stylesheet for 1-Page Report Card */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-report-card, #printable-report-card * {
            visibility: visible;
          }
          #printable-report-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 20px;
            box-shadow: none !important;
            border: 1px solid #ccc !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 no-print">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">Teacher / Admin Roster</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Live Cloud Sync
              </span>
            </div>
            <p className="text-sm text-slate-400">
              CBSE Class 8 Individual Student Diagnostics & Psychometric Monitoring
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all"
            title="Reset to Benchmark CBSE Demo Roster"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <button
            onClick={() => setShowClearAllModal(true)}
            disabled={records.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 disabled:opacity-40 border border-rose-500/30 text-xs font-semibold text-rose-300 transition-all"
            title="Purge all student performance records"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Clear Old Data</span>
          </button>

          <button
            onClick={() => setShowAddStudentModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all"
            title="Register a new student directly into the roster"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Add Student</span>
          </button>

          <button
            onClick={loadStudentRecords}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${refreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            disabled={filteredStudents.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLock}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-rose-300 transition-all"
            title="Lock Dashboard"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between gap-2 border transition-all no-print ${
            actionFeedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionFeedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertOctagon className="w-4 h-4 text-rose-400" />
            )}
            <span>{actionFeedback.message}</span>
          </div>
          <button
            onClick={() => setActionFeedback(null)}
            className="text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Students</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">{totalStudents}</p>
          <span className="text-[11px] text-slate-500">Active across all Class 8 sections</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Average Ability (\(\theta\))</span>
            <Brain className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-400">{avgTheta}</p>
          <span className="text-[11px] text-slate-500">Rasch Scale (-3.0 to +3.0)</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Class Mastery Index</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-purple-400">{avgMastery}%</p>
          <span className="text-[11px] text-slate-500">Overall syllabus comprehension</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Need Remedial Help</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-rose-400">{atRiskCount}</p>
          <span className="text-[11px] text-slate-500">Flagged below foundation score</span>
        </div>
      </div>

      {/* Roster Table Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl space-y-4 p-6 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Section Filter */}
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Sections (A-D)</option>
              <option value="8-A">Section 8-A</option>
              <option value="8-B">Section 8-B</option>
              <option value="8-C">Section 8-C</option>
              <option value="8-D">Section 8-D</option>
            </select>

            {/* Mastery Tier Filter */}
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Performance Tiers</option>
              <option value="ADVANCED">🏆 Advanced (θ &gt; 1.0)</option>
              <option value="PROFICIENT">🟡 Proficient (-0.3 to 1.0)</option>
              <option value="AT_RISK">🔴 Needs Remedial (&lt; -0.3)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Roll</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Sec</th>
                <th className="py-3 px-4">Subject & Topic</th>
                <th className="py-3 px-4">Ability (\(\theta\))</th>
                <th className="py-3 px-4">Mastery</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Last Attempt</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Misconceptions</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-500 text-xs">
                    No student performance records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((std) => {
                  return (
                    <tr
                      key={std.studentKey}
                      onClick={() => setSelectedStudentModal(std.latestRecord)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-400">#{std.rollNo}</td>
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span>{std.studentName}</span>
                          {std.topicsCount > 1 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono font-medium">
                              {std.topicsCount} Topics
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-indigo-300">Sec {std.section}</td>
                      <td className="py-3.5 px-4 text-xs text-slate-300 max-w-[200px]">
                        <div className="truncate font-medium">{std.latestTopicTitle}</div>
                        {std.topicsCount > 1 && (
                          <div className="text-[10px] text-slate-500 truncate">
                            +{std.topicsCount - 1} more ({std.records.slice(1).map((r) => r.topicTitle).join(", ")})
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-xs">
                        <span className={std.avgTheta >= 0 ? "text-emerald-400" : "text-rose-400"}>
                          {std.avgTheta >= 0 ? `+${std.avgTheta.toFixed(2)}` : std.avgTheta.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs">{std.avgMasteryPct}%</td>
                      <td className="py-3.5 px-4 font-mono text-xs">
                        <span className={std.overallAccuracyPct >= 70 ? "text-emerald-400" : std.isAtRisk ? "text-rose-400" : "text-amber-400"}>
                          {std.overallAccuracyPct}% ({std.totalCorrect}/{std.totalAttempted})
                        </span>
                      </td>
                      {/* Last Attempt (Kitne Baje) */}
                      <td className="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-indigo-300 font-semibold">{std.latestAttemptAt}</span>
                          <span className="text-[10px] text-slate-500">{std.latestActive}</span>
                        </div>
                      </td>
                      {/* Session Duration (Kitne Time Ka Tha) */}
                      <td className="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-semibold">
                          <Clock className="w-3 h-3 text-amber-400 flex-shrink-0" />
                          <span>{std.totalDurationFormatted}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {std.allMisconceptions && std.allMisconceptions.length > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{std.allMisconceptions.length} flagged</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-emerald-400 font-medium">None flagged 👍</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudentModal(std.latestRecord);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-semibold transition-colors inline-flex items-center gap-1"
                          >
                            <span>Report</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setStudentToDelete(std);
                            }}
                            className="p-1 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/60 hover:border-rose-500/40 transition-colors"
                            title={`Delete student ${std.studentName} (Roll #${std.rollNo})`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Curriculum Coverage Summary */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 no-print">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight">Curriculum Concept Bank (7 Core CBSE Subjects)</h3>
          <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold font-mono">
            {topics.length} Topics · {topics.reduce((sum, t) => sum + (t.itemCount || 17), 0)} Calibrated Questions
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topics.map((t) => (
            <div key={t.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-indigo-400 font-bold uppercase tracking-wider">{t.subject}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{t.itemCount || 17} items</span>
              </div>
              <h4 className="text-sm font-semibold text-white line-clamp-1">{t.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{t.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Diagnostic Detail Modal & Printable Report Card */}
      {selectedStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Printable Report Card Container */}
            <div id="printable-report-card" className="space-y-6">
              {/* Header */}
              <div className="border-b-2 border-indigo-500 pb-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-6 h-6 text-indigo-500 print:text-indigo-600" />
                    <h2 className="text-xl font-bold tracking-tight text-white print:text-black">
                      CBSE CLASS 8 · DIAGNOSTIC PROGRESS REPORT
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                    Item Response Theory (IRT 3PL) Computerized Adaptive Testing Assessment
                  </p>
                </div>
                <div className="text-right text-xs text-slate-400 print:text-gray-600">
                  <p>Date: {new Date().toLocaleDateString()}</p>
                  <p className="font-mono">Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>

              {/* Student Identification Banner */}
              <div className="p-4 rounded-2xl bg-slate-950 print:bg-gray-100 border border-slate-800 print:border-gray-300 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 print:text-gray-500 block">Student Name</span>
                  <span className="font-bold text-sm text-white print:text-black">{selectedStudentModal.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-500 block">Roll Number</span>
                  <span className="font-bold font-mono text-sm text-indigo-400 print:text-indigo-700">#{selectedStudentModal.rollNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-500 block">Section</span>
                  <span className="font-bold font-mono text-sm text-white print:text-black">Class 8 - {selectedStudentModal.section}</span>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-500 block">Last Attempt / Duration</span>
                  <span className="font-semibold text-white print:text-black block mt-0.5 font-mono">
                    {selectedStudentModal.lastAttemptAt || "08:15 PM"} ({selectedStudentModal.sessionDurationFormatted || "< 1 min"})
                  </span>
                </div>
              </div>

              {/* Psychometric Scores Grid (Overall Student Performance Across Attempted Topics) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-300">
                  <span className="text-[11px] text-slate-400 print:text-gray-600 block">Overall Ability (\(\theta\))</span>
                  <span className="text-base font-bold font-mono text-emerald-400 print:text-emerald-700">
                    {modalAvgTheta >= 0 ? `+${modalAvgTheta.toFixed(2)}` : modalAvgTheta.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-500 print:text-gray-500 block">
                    95% CI: {getThetaConfidenceInterval(modalAvgTheta, 0.35).formatted}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-300">
                  <span className="text-[11px] text-slate-400 print:text-gray-600 block">Overall Mastery</span>
                  <span className="text-base font-bold font-mono text-indigo-400 print:text-indigo-700">
                    {modalAvgMastery}%
                  </span>
                  <span className="text-[10px] text-slate-500 print:text-gray-500 block">Across {selectedStudentTopics.length} topic{selectedStudentTopics.length > 1 ? "s" : ""}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-300">
                  <span className="text-[11px] text-slate-400 print:text-gray-600 block">Overall Accuracy</span>
                  <span className="text-base font-bold font-mono text-white print:text-black">
                    {overallAccuracy}%
                  </span>
                  <span className="text-[10px] text-slate-500 print:text-gray-500 block">
                    {totalCorrectAnswers} / {totalAttemptedQuestions} Items
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-300">
                  <span className="text-[11px] text-slate-400 print:text-gray-600 block">Assigned Tier</span>
                  <span className="text-sm font-bold text-white print:text-black block mt-0.5">
                    {modalTierBadge}
                  </span>
                </div>
              </div>

              {/* Topic-Wise Performance Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-gray-700 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-indigo-400 print:text-indigo-600" />
                    <span>Topic-Wise Performance Breakdown ({selectedStudentTopics.length} Topic{selectedStudentTopics.length > 1 ? "s" : ""} Attempted)</span>
                  </h4>
                  <span className="text-[11px] text-slate-400 print:text-gray-600 font-mono">
                    Total: {totalCorrectAnswers}/{totalAttemptedQuestions} Correct ({overallAccuracy}%)
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800 print:border-gray-300">
                  <table className="w-full text-left text-xs text-slate-300 print:text-gray-800">
                    <thead className="bg-slate-950 print:bg-gray-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400 print:text-gray-600 border-b border-slate-800 print:border-gray-300">
                      <tr>
                        <th className="py-2.5 px-3">Topic / Concept</th>
                        <th className="py-2.5 px-3">Ability (\(\theta\))</th>
                        <th className="py-2.5 px-3">Mastery</th>
                        <th className="py-2.5 px-3">Accuracy</th>
                        <th className="py-2.5 px-3">Last Attempt</th>
                        <th className="py-2.5 px-3">Duration</th>
                        <th className="py-2.5 px-3">Status / Tier</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 print:divide-gray-200">
                      {selectedStudentTopics.map((top, tIdx) => (
                        <tr key={top.id || tIdx} className="hover:bg-slate-800/30 print:hover:bg-transparent">
                          <td className="py-2.5 px-3 font-medium text-white print:text-black">
                            <div className="font-semibold">{top.topicTitle}</div>
                            {top.flaggedMisconceptions && top.flaggedMisconceptions.length > 0 && (
                              <span className="text-[10px] text-rose-400 print:text-rose-600 block mt-0.5">
                                ⚠️ {top.flaggedMisconceptions.length} misconception flagged
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold">
                            <span className={top.theta >= 0 ? "text-emerald-400 print:text-emerald-700" : "text-rose-400 print:text-rose-700"}>
                              {top.theta >= 0 ? `+${top.theta.toFixed(2)}` : top.theta.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono font-semibold text-indigo-300 print:text-indigo-800">
                            {top.masteryPct}%
                          </td>
                          <td className="py-2.5 px-3 font-mono">
                            <span className={top.accuracyPct >= 70 ? "text-emerald-400 print:text-emerald-700" : "text-amber-400 print:text-amber-700"}>
                              {top.accuracyPct}% ({top.correctAnswers}/{top.questionsAttempted})
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-400 print:text-gray-600">
                            {top.lastAttemptAt || top.lastActive || "—"}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-amber-300 print:text-amber-700">
                            {top.sessionDurationFormatted || "< 1 min"}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-[11px] font-semibold text-slate-200 print:text-gray-900">
                              {top.tier?.badge || top.tier?.label || "Proficient"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Diagnostic Pedagogical Findings Across Attempted Topics */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-gray-700">
                  Identified Misconceptions & Pedagogical Feedback
                </h4>
                {selectedStudentTopics.some((t) => t.flaggedMisconceptions && t.flaggedMisconceptions.length > 0) ? (
                  <div className="space-y-2">
                    {selectedStudentTopics.map((t) =>
                      (t.flaggedMisconceptions || []).map((m, i) => (
                        <div key={`${t.id}-${i}`} className="p-3 rounded-xl bg-rose-950/40 print:bg-rose-50 border border-rose-900/60 print:border-rose-200 flex items-start gap-2 text-xs">
                          <AlertTriangle className="w-4 h-4 text-rose-400 print:text-rose-600 flex-shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-900/40 text-rose-300 font-mono font-medium">
                              Topic: {t.topicTitle}
                            </span>
                            <div className="font-semibold text-rose-200 print:text-rose-900 mt-1">{m}</div>
                            <p className="text-[11px] text-rose-300/80 print:text-rose-700 mt-0.5">
                              Teacher Guidance: Dedicate 15 minutes of targeted review focusing on this underlying concept rule.
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-950/30 print:bg-emerald-50 border border-emerald-900/60 print:border-emerald-200 text-xs text-emerald-300 print:text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 print:text-emerald-600" />
                    <span>Excellent performance! Student has exhibited conceptual clarity with zero flagged misconceptions across all attempted topics.</span>
                  </div>
                )}
              </div>

              {/* Official Signatures Block (Visible in Print & on Screen) */}
              <div className="pt-6 border-t border-slate-800 print:border-gray-400 grid grid-cols-3 gap-6 text-center text-xs text-slate-400 print:text-gray-600">
                <div className="space-y-8">
                  <div className="h-6 border-b border-dashed border-slate-700 print:border-gray-400"></div>
                  <span>Class Teacher Signature</span>
                </div>
                <div className="space-y-8">
                  <div className="h-6 border-b border-dashed border-slate-700 print:border-gray-400"></div>
                  <span>Academic Coordinator</span>
                </div>
                <div className="space-y-8">
                  <div className="h-6 border-b border-dashed border-slate-700 print:border-gray-400"></div>
                  <span>Parent / Guardian Signature</span>
                </div>
              </div>
            </div>

            {/* Modal Actions (Hidden in Print) */}
            <div className="pt-2 flex items-center gap-3 no-print">
              <button
                onClick={handlePrintReport}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>

              <button
                onClick={() => {
                  const studentObj = uniqueStudents.find(
                    (s) =>
                      s.rollNo.toLowerCase() === selectedStudentModal.rollNo.toLowerCase() &&
                      (s.section.toLowerCase() === selectedStudentModal.section.toLowerCase() ||
                        s.studentName.toLowerCase() === selectedStudentModal.studentName.toLowerCase())
                  );
                  if (studentObj) {
                    setStudentToDelete(studentObj);
                  } else {
                    setRecordToDelete(selectedStudentModal);
                  }
                }}
                className="px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Delete this student"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Delete</span>
              </button>

              <button
                onClick={() => setSelectedStudentModal(null)}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Student (All Records) Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
          <div className="w-full max-w-md bg-slate-900 border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Delete Student?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kya aap <span className="font-semibold text-white">{studentToDelete.studentName}</span> (Roll #{studentToDelete.rollNo}, Section {studentToDelete.section}) ko roster se permanently remove karna chahte hain?
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs text-slate-300 space-y-1">
                <div>
                  <span className="text-slate-500">Attempted Topics ({studentToDelete.topicsCount}):</span>{" "}
                  {studentToDelete.records.map((r) => r.topicTitle).join(", ")}
                </div>
                <div>
                  <span className="text-slate-500">Overall Mastery:</span> {studentToDelete.avgMasteryPct}% · Ability: {studentToDelete.avgTheta >= 0 ? `+${studentToDelete.avgTheta}` : studentToDelete.avgTheta}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStudentToDelete(null)}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteStudent}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
              >
                {actionLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Record Confirmation Modal */}
      {recordToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
          <div className="w-full max-w-md bg-slate-900 border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Delete Student Record?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kya aap <span className="font-semibold text-white">{recordToDelete.studentName}</span> (Roll #{recordToDelete.rollNo}, Section {recordToDelete.section}) ka yeh performance record permanently remove karna chahte hain?
              </p>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs text-slate-300 space-y-1">
                <div><span className="text-slate-500">Topic:</span> {recordToDelete.topicTitle}</div>
                <div><span className="text-slate-500">Mastery:</span> {recordToDelete.masteryPct}% · Ability: {recordToDelete.theta}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRecordToDelete(null)}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSingle}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
              >
                {actionLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Old Data Confirmation Modal */}
      {showClearAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
          <div className="w-full max-w-md bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <AlertOctagon className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Clear All Student Records?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yeh action dashboard ke <span className="font-semibold text-rose-400">sabhi {records.length} student records</span> ko permanently delete kar dega. Naye session ya fresh testing start karne ke liye purana data clean ho jayega.
              </p>
              <p className="text-[11px] text-amber-400/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl">
                ⚠️ Note: Aap baad mein kabhi bhi sample benchmark roster ko &ldquo;Reset Demo&rdquo; button se restore kar sakte hain.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearAllModal(false)}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
              >
                {actionLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Yes, Clear Everything</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset to Default Demo Roster Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
          <div className="w-full max-w-md bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Reset to CBSE Demo Benchmark?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Isse CBSE Class 8 ke standard sample students (Aarav, Priya, Rohan, Ananya, Kabir) ka benchmark diagnostic roster dobara load ho jayega.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetBaseline}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                {actionLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
                <span>Reset Demo Roster</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <UserPlus className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Add New Student</h3>
              </div>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white text-sm outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Roll Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 19"
                    value={newStudentRoll}
                    onChange={(e) => setNewStudentRoll(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white text-sm outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Section *</label>
                  <select
                    value={newStudentSection}
                    onChange={(e) => setNewStudentSection(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white text-sm outline-none transition-all"
                  >
                    <option value="8-A">Class 8-A</option>
                    <option value="8-B">Class 8-B</option>
                    <option value="8-C">Class 8-C</option>
                    <option value="8-D">Class 8-D</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Initial Topic</label>
                <select
                  value={newStudentTopic}
                  onChange={(e) => setNewStudentTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white text-sm outline-none transition-all"
                >
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.subject}: {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || !newStudentName.trim() || !newStudentRoll.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  {actionLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                  <span>Add Student</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
