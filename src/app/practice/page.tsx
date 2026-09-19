"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MathRenderer } from "@/components/MathRenderer";
import {
  Brain,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  ChevronRight,
  Flame,
  Loader2,
  User,
  Edit3,
  Check,
  ArrowLeft,
  ListFilter,
  Volume2,
  VolumeX
} from "lucide-react";
import {
  StudentProfile,
  getSavedStudentProfile,
  saveStudentProfile,
} from "@/lib/student-session";
import { syncStudentPerformance } from "@/lib/firebase";
import { getAllTopics, getSubjects, getTopicsBySubject } from "@/lib/topics-metadata";

function PracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topic") || "rational-numbers";

  const allTopics = getAllTopics();
  const subjects = getSubjects();

  // Student Profile State
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showTopicModal, setShowTopicModal] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>("");
  const [inputRoll, setInputRoll] = useState<string>("");
  const [inputSection, setInputSection] = useState<string>("8-A");

  const [loading, setLoading] = useState(true);
  const [topicMeta, setTopicMeta] = useState<any>(null);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [profileSignature, setProfileSignature] = useState<string>("");
  const [masteryPct, setMasteryPct] = useState<number>(50);
  const [tier, setTier] = useState<any>({ label: "Proficient", badge: "🟡 Proficient" });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [seenIds, setSeenIds] = useState<string[]>([]);

  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [hintLevel, setHintLevel] = useState<number>(1);
  const [hintContent, setHintContent] = useState<string>("");
  const [hintLoading, setHintLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Stop speech when question changes or unmounts
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentItem?.id]);

  const handleSpeakQuestion = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech audio is not supported on this browser.");
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!currentItem?.text) return;

    // Clean mathematical tokens for clean spoken audio
    const cleanText = currentItem.text
      .replace(/\$([^\$]+)\$/g, "$1")
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1 divided by $2")
      .replace(/\\times/g, " multiplied by ")
      .replace(/\\div/g, " divided by ")
      .replace(/\\sqrt\{([^}]+)\}/g, "square root of $1")
      .replace(/\^2/g, " squared")
      .replace(/\^3/g, " cubed")
      .replace(/\^([0-9]+)/g, " to the power of $1")
      .replace(/\\neq/g, " is not equal to ")
      .replace(/\\leq/g, " is less than or equal to ")
      .replace(/\\geq/g, " is greater than or equal to ")
      .replace(/\\pm/g, " plus or minus ")
      .replace(/\^\\circ/g, " degrees")
      .replace(/[\\{}_]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const isDevanagari = /[\u0900-\u097F]/.test(cleanText);
    utterance.lang = isDevanagari ? "hi-IN" : "en-IN";
    utterance.rate = 0.9;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Check saved student profile on mount
  useEffect(() => {
    const saved = getSavedStudentProfile();
    if (saved) {
      setStudentProfile(saved);
      setInputName(saved.name);
      setInputRoll(saved.rollNo);
      setInputSection(saved.section);
    } else {
      setShowProfileModal(true);
    }
  }, []);

  const handleSaveStudentProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !inputRoll.trim()) return;

    const newProf: StudentProfile = {
      id: studentProfile?.id || "std_" + Date.now(),
      name: inputName.trim(),
      rollNo: inputRoll.trim(),
      section: inputSection,
      updatedAt: Date.now(),
    };

    setStudentProfile(newProf);
    saveStudentProfile(newProf);
    setShowProfileModal(false);
  };

  useEffect(() => {
    async function initSession() {
      setLoading(true);
      setSelectedOption(null);
      setFeedback(null);

      let localProfile = null;
      try {
        const saved = localStorage.getItem("pragati_profiles");
        if (saved) {
          const parsed = JSON.parse(saved);
          localProfile = parsed[topicId] || null;
        }
      } catch (e) {}

      try {
        const res = await fetch("/api/adaptive", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "start",
            topicId,
            currentProfile: localProfile,
            seenIds: [],
          }),
        });
        const data = await res.json();
        if (res.ok && data.item) {
          setTopicMeta(data.topic);
          setCurrentItem(data.item);
          setProfile(data.profile);
          if (data.signature) setProfileSignature(data.signature);
          setMasteryPct(data.masteryPct);
          setTier(data.tier);
          setStartTime(Date.now());
          setSeenIds([data.item.id]);
        }
      } catch (e) {
        console.error("Init failed:", e);
      } finally {
        setLoading(false);
      }
    }

    initSession();
  }, [topicId]);

  const persistProfile = (newProfile: any) => {
    try {
      const saved = localStorage.getItem("pragati_profiles");
      const all = saved ? JSON.parse(saved) : {};
      all[topicId] = newProfile;
      localStorage.setItem("pragati_profiles", JSON.stringify(all));
    } catch (e) {}
  };

  const handleSubmitAnswer = async () => {
    if (!selectedOption || submitting || feedback) return;
    setSubmitting(true);

    const timeTakenSeconds = Math.round((Date.now() - startTime) / 1000);

    try {
      // NOTE: Send BOTH action: "submit" AND action: "grade" compatible payload
      const res = await fetch("/api/adaptive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          topicId,
          itemId: currentItem.id,
          questionId: currentItem.id,
          selectedAnswer: selectedOption,
          selectedOption: selectedOption,
          currentProfile: profile,
          signature: profileSignature,
          seenIds,
          timeTakenSeconds,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback(data);
        setProfile(data.profile);
        if (data.signature) setProfileSignature(data.signature);
        setMasteryPct(data.masteryPct);
        setTier(data.tier);
        persistProfile(data.profile);

        // Dynamic import confetti safely in browser
        if (data.isCorrect && typeof window !== "undefined") {
          import("canvas-confetti").then((module) => {
            const confettiFn = module.default || module;
            confettiFn({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
              colors: ["#6366f1", "#10b981", "#f59e0b"],
            });
          }).catch(() => {});
        }

        // Sync individual student performance
        const std = studentProfile || getSavedStudentProfile();
        if (std) {
          const totalAtt = data.profile.history?.length || 1;
          const totalCorr = data.profile.history?.filter((h: any) => h.correct)?.length || (data.isCorrect ? 1 : 0);
          const recMisconceptions = data.misconception ? [data.misconception.label] : [];

          syncStudentPerformance({
            id: `${std.rollNo}_${std.section}_${topicId}`.replace(/\s+/g, "_"),
            studentId: std.id,
            studentName: std.name,
            rollNo: std.rollNo,
            section: std.section,
            topicId,
            topicTitle: topicMeta?.title || "Class 8 " + (topicMeta?.subject || "Subject"),
            theta: Number(data.profile.theta.toFixed(2)),
            masteryPct: data.masteryPct,
            tier: data.tier,
            questionsAttempted: totalAtt,
            correctAnswers: totalCorr,
            accuracyPct: Math.round((totalCorr / totalAtt) * 100),
            lastActive: "Just now",
            flaggedMisconceptions: recMisconceptions,
            profile: data.profile,
            signature: data.signature,
          }).catch((err: any) => console.warn("Background sync info:", err));
        }
      } else {
        alert("Evaluation failed: " + (data.error || "Please try again"));
      }
    } catch (e) {
      console.error("Submit error:", e);
      alert("Error submitting answer. Please check connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (!feedback) return;
    if (feedback.nextItem) {
      setCurrentItem(feedback.nextItem);
      setSeenIds((prev) => [...prev, feedback.nextItem.id]);
      setSelectedOption(null);
      setFeedback(null);
      setStartTime(Date.now());
      setHintContent("");
      setHintLevel(1);
      setAiTutorOpen(false);
    } else {
      // Completed all items
      setCurrentItem(null);
    }
  };

  const handleRequestHint = async () => {
    setHintLoading(true);
    setAiTutorOpen(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topicMeta?.title || "Class 8 Subject",
          questionText: currentItem.text,
          options: currentItem.options,
          hintLevel,
          studentAbility: profile?.theta || 0,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setHintContent(data.hint);
        setHintLevel((prev) => Math.min(prev + 1, 3));
      }
    } catch (e) {
      console.error("Tutor error:", e);
    } finally {
      setHintLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-slate-400 text-sm animate-pulse">
          Calibrating IRT adaptive difficulty model...
        </p>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-5">
        <Award className="w-14 h-14 text-emerald-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Topic Practice Complete!</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Great job! You have answered the calibrated questions for this concept. Your ability and performance have been recorded for your teacher.
        </p>
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => setShowTopicModal(true)}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
          >
            Practice Another Topic
          </button>
          <Link
            href="/"
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Student Identity & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
            {studentProfile ? studentProfile.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                {studentProfile ? studentProfile.name : "Guest Student"}
              </span>
              {studentProfile && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                  Roll: {studentProfile.rollNo} · Sec: {studentProfile.section}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              {topicMeta?.subject} · {topicMeta?.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTopicModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition-colors"
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Switch Topic</span>
          </button>

          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors border border-slate-700"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{studentProfile ? "Edit Name" : "Register"}</span>
          </button>
        </div>
      </div>

      {/* Adaptive Psychometric Meter Header */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white">Adaptive Ability (\(\theta\))</h2>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {profile?.theta >= 0 ? `+${profile?.theta.toFixed(2)}` : profile?.theta.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Current Status: <span className="font-semibold text-indigo-300">{tier.badge}</span>
            </p>
          </div>
        </div>

        {/* Mastery Progress Bar */}
        <div className="w-full sm:w-64 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400">Mastery Index</span>
            <span className="text-white font-mono">{masteryPct}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700"
              style={{ width: `${masteryPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="relative rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Problem #{seenIds.length}
            </span>
            <span className="text-xs text-slate-400">
              Calibrated Difficulty (\(b\)): <span className="font-mono text-slate-200">{currentItem.difficulty >= 0 ? `+${currentItem.difficulty}` : currentItem.difficulty}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakQuestion}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isSpeaking
                  ? "bg-indigo-600/30 text-indigo-300 border-indigo-500 animate-pulse"
                  : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700"
              }`}
              title="Pronounce question aloud (Sanskrit, Hindi, English)"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-indigo-400" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
              <span>{isSpeaking ? "Stop Audio" : "Listen 🔊"}</span>
            </button>

            <button
              onClick={handleRequestHint}
              disabled={hintLoading || feedback}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{hintLoading ? "Thinking..." : "Need a Hint?"}</span>
            </button>
          </div>
        </div>

        {/* Question Text with KaTeX */}
        <div className="text-lg text-slate-100 font-medium leading-relaxed">
          <MathRenderer content={currentItem.text} />
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {currentItem.options.map((opt: string, idx: number) => {
            const isSelected = selectedOption === opt;
            const isAnswered = feedback !== null;
            const isThisCorrect = feedback && feedback.isCorrect && isSelected;
            const isThisWrong = feedback && !feedback.isCorrect && isSelected;

            let btnStyles = "border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-900";
            if (isSelected && !isAnswered) {
              btnStyles = "border-indigo-500 bg-indigo-500/10 text-white ring-1 ring-indigo-500";
            }
            if (isThisCorrect) {
              btnStyles = "border-emerald-500 bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500";
            }
            if (isThisWrong) {
              btnStyles = "border-rose-500 bg-rose-500/15 text-rose-200 ring-1 ring-rose-500";
            }

            return (
              <button
                key={idx}
                disabled={submitting || feedback !== null}
                onClick={() => setSelectedOption(opt)}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all text-sm font-medium ${btnStyles}`}
              >
                <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <div className="flex-1">
                  <MathRenderer content={opt} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        {!feedback ? (
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption || submitting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting & Evaluating...</span>
                </>
              ) : (
                <>
                  <span>Submit Answer</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="pt-4 space-y-4">
            {/* Feedback Box */}
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                feedback.isCorrect
                  ? "bg-emerald-950/40 border-emerald-900 text-emerald-200"
                  : "bg-rose-950/40 border-rose-900 text-rose-200"
              }`}
            >
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="space-y-1.5 flex-1">
                <h4 className="font-bold text-base">
                  {feedback.isCorrect ? "Correct! Well Done!" : "Incorrect Answer"}
                </h4>
                <div className="text-sm opacity-90">
                  <MathRenderer content={feedback.explanation} />
                </div>
                {feedback.misconception && (
                  <div className="mt-2 p-2.5 rounded-xl bg-rose-900/30 border border-rose-800 text-xs space-y-1">
                    <span className="font-bold text-rose-300">Target Remediation:</span>
                    <p className="text-rose-200/90">{feedback.misconception.remedialHint}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Next Question CTA */}
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/30"
              >
                <span>Continue to Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Socratic AI Tutor Drawer */}
      {aiTutorOpen && (
        <div className="rounded-2xl bg-indigo-950/40 border border-indigo-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <h3 className="text-sm font-bold text-white">Socratic AI Hint (Level {hintLevel - 1} of 3)</h3>
            </div>
            <button
              onClick={() => setAiTutorOpen(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>
          <div className="text-sm text-indigo-200/90 bg-indigo-900/20 p-3.5 rounded-xl border border-indigo-800/40 leading-relaxed">
            <MathRenderer content={hintContent} />
          </div>
          <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
            <span>The AI guides you step-by-step without giving away the direct answer.</span>
            {hintLevel <= 3 && !feedback && (
              <button
                onClick={handleRequestHint}
                disabled={hintLoading}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                {hintLoading ? "Generating..." : "Need deeper hint?"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Switch Topic Modal */}
      {showTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Select Subject & Topic</h3>
                <p className="text-xs text-slate-400">Choose any chapter to practice</p>
              </div>
              <button
                onClick={() => setShowTopicModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-5">
              {subjects.map((subj) => (
                <div key={subj} className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <span>{subj}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {getTopicsBySubject(subj).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setShowTopicModal(false);
                          router.push(`/practice?topic=${t.id}`);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                          t.id === topicId
                            ? "bg-indigo-600/20 border-indigo-500 text-white"
                            : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <span className="font-bold text-white line-clamp-1">{t.title}</span>
                        <span className="text-[11px] text-slate-500 mt-1 font-mono">{t.itemCount || 17} calibrated questions</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Student Profile Intake Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Student Details</h2>
              <p className="text-xs text-slate-400">
                Apna Naam aur Roll No enter karein taaki aapka performance teacher dashboard par record ho sake.
              </p>
            </div>

            <form onSubmit={handleSaveStudentProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Roll Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 08"
                    value={inputRoll}
                    onChange={(e) => setInputRoll(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Class & Section *</label>
                  <select
                    value={inputSection}
                    onChange={(e) => setInputSection(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm outline-none transition-all"
                  >
                    <option value="8-A">Class 8-A</option>
                    <option value="8-B">Class 8-B</option>
                    <option value="8-C">Class 8-C</option>
                    <option value="8-D">Class 8-D</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                {studentProfile && (
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Continue</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
