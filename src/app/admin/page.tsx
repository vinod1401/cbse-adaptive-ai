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

  // Filtered Roster
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection =
      selectedSection === "ALL" ||
      r.section === selectedSection ||
      r.section === `8-${selectedSection}` ||
      r.section === `8${selectedSection}` ||
      r.section?.endsWith(selectedSection) ||
      (selectedSection.startsWith("8-") && r.section === selectedSection.replace("8-", ""));
    const matchesTier =
      selectedTier === "ALL" ||
      (selectedTier === "AT_RISK" && (r.theta < -0.3 || r.accuracyPct < 50)) ||
      (selectedTier === "PROFICIENT" && r.theta >= -0.3 && r.theta < 1.0) ||
      (selectedTier === "ADVANCED" && r.theta >= 1.0);

    return matchesSearch && matchesSection && matchesTier;
  });

  // Analytics Metrics
  const totalStudents = records.length;
  const avgTheta =
    totalStudents > 0
      ? (records.reduce((sum, r) => sum + r.theta, 0) / totalStudents).toFixed(2)
      : "+0.00";
  const avgMastery =
    totalStudents > 0
      ? Math.round(records.reduce((sum, r) => sum + r.masteryPct, 0) / totalStudents)
      : 50;
  const atRiskCount = records.filter((r) => r.theta < -0.3 || r.accuracyPct < 50).length;

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "Roll No",
      "Student Name",
      "Section",
      "Topic",
      "Ability (Theta)",
      "Mastery %",
      "Tier",
      "Questions Attempted",
      "Correct Answers",
      "Accuracy %",
      "Flagged Misconceptions"
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.rollNo}"`,
      `"${r.studentName}"`,
      `"${r.section}"`,
      `"${r.topicTitle}"`,
      r.theta >= 0 ? `+${r.theta.toFixed(2)}` : r.theta.toFixed(2),
      `${r.masteryPct}%`,
      `"${r.tier.label}"`,
      r.questionsAttempted,
      r.correctAnswers,
      `${r.accuracyPct}%`,
      `"${(r.flaggedMisconceptions || []).join("; ")}"`
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
            disabled={filteredRecords.length === 0}
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
                <th className="py-3 px-4">Misconceptions</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500 text-xs">
                    No student performance records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((std, idx) => {
                  const isAtRisk = std.theta < -0.3 || std.accuracyPct < 50;
                  return (
                    <tr
                      key={std.id || idx}
                      onClick={() => setSelectedStudentModal(std)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-400">#{std.rollNo}</td>
                      <td className="py-3.5 px-4 font-semibold text-white">{std.studentName}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-indigo-300">Sec {std.section}</td>
                      <td className="py-3.5 px-4 text-xs text-slate-300 max-w-[180px] truncate">{std.topicTitle}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-xs">
                        <span className={std.theta >= 0 ? "text-emerald-400" : "text-rose-400"}>
                          {std.theta >= 0 ? `+${std.theta.toFixed(2)}` : std.theta.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs">{std.masteryPct}%</td>
                      <td className="py-3.5 px-4 font-mono text-xs">
                        <span className={std.accuracyPct >= 70 ? "text-emerald-400" : isAtRisk ? "text-rose-400" : "text-amber-400"}>
                          {std.accuracyPct}% ({std.correctAnswers}/{std.questionsAttempted})
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {std.flaggedMisconceptions && std.flaggedMisconceptions.length > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{std.flaggedMisconceptions.length} flagged</span>
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
                              setSelectedStudentModal(std);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-semibold transition-colors inline-flex items-center gap-1"
                          >
                            <span>Report</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setRecordToDelete(std);
                            }}
                            className="p-1 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/60 hover:border-rose-500/40 transition-colors"
                            title={`Delete record for ${std.studentName} (Roll #${std.rollNo})`}
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
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
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
                  <span className="text-slate-400 print:text-gray-500 block">Assessed Concept</span>
                  <span className="font-semibold text-white print:text-black line-clamp-1">{selectedStudentModal.topicTitle}</span>
                </div>
              </div>

              {/* Psychometric Scores Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-300">
                  <span className="text-[11px] text-slate-400 print:text-gray-600 block">Ability (\(\theta\))</span>
                  <span className="text-base font-bold font-mono text-emerald-400 print:text-emerald-700">
                    {selectedStudentModal.theta >= 0 ? `+${selectedStudentModal.theta.toFixed(2)}` : selectedStudentModal.theta.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-500 print:text-gray-500 block">
                    95% CI: {getThetaConfidenceInterval(selectedStudentModal.theta, 0.35).formatted}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-300">
                  <span className="text-[11px] text-slate-400 print:text-gray-600 block">Mastery Index</span>
                  <span className="text-base font-bold font-mono text-indigo-400 print:text-indigo-700">
                    {selectedStudentModal.masteryPct}%
                  </span>
                  <span className="text-[10px] text-slate-500 print:text-gray-500 block">Sigmoid Ogive</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-300">
                  <span className="text-[11px] text-slate-400 print:text-gray-600 block">Accuracy</span>
                  <span className="text-base font-bold font-mono text-white print:text-black">
                    {selectedStudentModal.accuracyPct}%
                  </span>
                  <span className="text-[10px] text-slate-500 print:text-gray-500 block">
                    {selectedStudentModal.correctAnswers} / {selectedStudentModal.questionsAttempted} Items
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-300">
                  <span className="text-[11px] text-slate-400 print:text-gray-600 block">Assigned Tier</span>
                  <span className="text-sm font-bold text-white print:text-black block mt-0.5">
                    {selectedStudentModal.tier?.badge || "Proficient"}
                  </span>
                </div>
              </div>

              {/* Diagnostic Pedagogical Findings */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-gray-700">
                  Identified Misconceptions & Diagnostic Feedback
                </h4>
                {selectedStudentModal.flaggedMisconceptions && selectedStudentModal.flaggedMisconceptions.length > 0 ? (
                  <div className="space-y-2">
                    {selectedStudentModal.flaggedMisconceptions.map((m, i) => (
                      <div key={i} className="p-3 rounded-xl bg-rose-950/40 print:bg-rose-50 border border-rose-900/60 print:border-rose-200 flex items-start gap-2 text-xs">
                        <AlertTriangle className="w-4 h-4 text-rose-400 print:text-rose-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-rose-200 print:text-rose-900">{m}</span>
                          <p className="text-[11px] text-rose-300/80 print:text-rose-700 mt-0.5">
                            Teacher Guidance: Dedicate 15 minutes of structured worked-example review focusing on the underlying conceptual rule.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-950/30 print:bg-emerald-50 border border-emerald-900/60 print:border-emerald-200 text-xs text-emerald-300 print:text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 print:text-emerald-600" />
                    <span>Excellent performance! Student has exhibited conceptual clarity with zero flagged misconceptions.</span>
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
                onClick={() => setRecordToDelete(selectedStudentModal)}
                className="px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Delete this record"
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
