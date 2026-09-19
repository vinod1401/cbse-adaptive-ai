"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllTopics } from "@/lib/question-bank";
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
  Check
} from "lucide-react";
import { StudentPerformanceRecord } from "@/lib/student-session";
import { fetchAllStudentRecords } from "@/lib/firebase";

export default function AdminDashboardPage() {
  const topics = getAllTopics();
  const [records, setRecords] = useState<StudentPerformanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Security PIN State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinSuccessMsg, setPinSuccessMsg] = useState("");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("ALL");
  const [selectedTier, setSelectedTier] = useState("ALL");
  const [selectedStudentModal, setSelectedStudentModal] = useState<StudentPerformanceRecord | null>(null);

  // Check PIN auth on mount
  useEffect(() => {
    try {
      const auth = sessionStorage.getItem("pragati_teacher_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    } catch (e) {}
  }, []);

  const getSavedPin = () => {
    try {
      return localStorage.getItem("pragati_admin_pin") || "1234";
    } catch (e) {
      return "1234";
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getSavedPin();
    if (pinInput.trim() === correctPin) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem("pragati_teacher_auth", "true");
      } catch (e) {}
      setPinError("");
      setPinInput("");
    } else {
      setPinError("Incorrect PIN. Default PIN is 1234.");
    }
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem("pragati_teacher_auth");
    } catch (e) {}
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      setPinError("PIN must be exactly 4 digits.");
      return;
    }
    if (newPin !== confirmPin) {
      setPinError("PINs do not match.");
      return;
    }
    try {
      localStorage.setItem("pragati_admin_pin", newPin);
      setPinSuccessMsg("PIN changed successfully!");
      setTimeout(() => {
        setShowChangePinModal(false);
        setPinSuccessMsg("");
        setNewPin("");
        setConfirmPin("");
        setPinError("");
      }, 1500);
    } catch (e) {
      setPinError("Failed to save PIN.");
    }
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
    const matchesSection = selectedSection === "ALL" || r.section === selectedSection;
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
            <span>Default PIN is <strong className="text-slate-300 font-mono">1234</strong> (You can change it once logged in).</span>
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowChangePinModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-all"
            title="Change 4-Digit Teacher PIN"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>Change PIN</span>
          </button>

          <button
            onClick={handleLock}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-rose-300 transition-all"
            title="Lock Dashboard"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>Lock</span>
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

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
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
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
            {topics.length} Topics · 357 Calibrated Questions
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topics.map((t) => (
            <div key={t.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-indigo-400 font-bold uppercase tracking-wider">{t.subject}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{t.items.length} items</span>
              </div>
              <h4 className="text-sm font-semibold text-white line-clamp-1">{t.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{t.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Change PIN Modal */}
      {showChangePinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Change 4-Digit Teacher PIN</h3>
            <p className="text-xs text-slate-400">Set a new secret PIN to protect student records from unauthorized viewing.</p>

            <form onSubmit={handleChangePin} className="space-y-3 pt-2 text-left">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">New 4-Digit PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 4 digits"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-center font-mono text-lg focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Confirm New PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
                  placeholder="Re-enter 4 digits"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-center font-mono text-lg focus:outline-none focus:border-indigo-500"
                />
              </div>

              {pinError && <p className="text-xs text-rose-400">{pinError}</p>}
              {pinSuccessMsg && <p className="text-xs text-emerald-400 font-semibold">{pinSuccessMsg}</p>}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePinModal(false);
                    setPinError("");
                  }}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Save PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                onClick={() => setSelectedStudentModal(null)}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
