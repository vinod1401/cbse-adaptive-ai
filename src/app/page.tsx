"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllTopics, getSubjects, getTopicsBySubject, ConceptTopic } from "@/lib/topics-metadata";
import { thetaToMasteryPercentage, getMasteryTier } from "@/lib/irt-engine";
import { MathRenderer } from "@/components/MathRenderer";
import { getSavedStudentProfile, StudentProfile } from "@/lib/student-session";
import {
  Brain,
  ArrowRight,
  Calculator,
  Variable,
  Sigma,
  Zap,
  Target,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Award,
  Atom,
  Globe2,
  User,
  CheckCircle2,
  Languages,
  Scroll,
  Laptop
} from "lucide-react";

export default function HomePage() {
  const subjects = getSubjects();
  const [selectedSubject, setSelectedSubject] = useState<string>("Mathematics");
  const [profiles, setProfiles] = useState<Record<string, any>>({});
  const [student, setStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pragati_profiles");
      if (saved) setProfiles(JSON.parse(saved));
    } catch (e) {}

    const savedStudent = getSavedStudentProfile();
    if (savedStudent) setStudent(savedStudent);
  }, []);

  const topicsForSubject = getTopicsBySubject(selectedSubject);

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "Mathematics":
        return <Calculator className="w-5 h-5 text-indigo-400" />;
      case "Science":
        return <Atom className="w-5 h-5 text-emerald-400" />;
      case "English":
        return <BookOpen className="w-5 h-5 text-sky-400" />;
      case "Social Science":
        return <Globe2 className="w-5 h-5 text-amber-400" />;
      case "Hindi":
        return <Languages className="w-5 h-5 text-rose-400" />;
      case "Sanskrit":
        return <Scroll className="w-5 h-5 text-orange-400" />;
      case "Computer Science":
        return <Laptop className="w-5 h-5 text-cyan-400" />;
      default:
        return <Brain className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/60 via-slate-900/40 to-slate-950 border border-indigo-900/40 p-8 md:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>CBSE Class 8 · 100% Zero-Cost Adaptive Learning</span>
          </div>

          {student && (
            <div className="inline-flex items-center gap-2 px-3 py-1 ml-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Namaste, {student.name} (Roll: {student.rollNo} · Sec: {student.section})</span>
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Select Your Subject & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Master Concepts</span> with AI
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Personalized Rasch psychometric testing for CBSE Class 8. Pick any subject below — Mathematics, Science, English, Social Science, Hindi, Sanskrit, or Computer Science — to start adaptive practice with Socratic hints and infinite AI practice.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href="#subject-selector"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.02]"
            >
              <span>Explore All 7 Subjects & Topics</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">7 Core CBSE Subjects</h4>
              <p className="text-xs text-slate-400">357+ Questions · Maths, Sci, Eng, SST, Hin, Sans, CS</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Rasch CAT Engine</h4>
              <p className="text-xs text-slate-400">Difficulty dynamically adjusts to ability</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Individual Roster</h4>
              <p className="text-xs text-slate-400">Live teacher monitoring by Name & Roll</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subject & Topic Selection Section */}
      <section id="subject-selector" className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Step 1: Choose Your Subject</h2>
            <p className="text-sm text-slate-400">CBSE Class 8 Curriculum chapters and subtopics</p>
          </div>
        </div>

        {/* Subject Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {subjects.map((subj) => {
            const isSelected = selectedSubject === subj;
            const topicCount = getTopicsBySubject(subj).length;

            return (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? "bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500 shadow-lg shadow-indigo-600/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl border ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-500"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {getSubjectIcon(subj)}
                </div>
                <div>
                  <div className="font-bold text-sm">{subj}</div>
                  <span className="text-[11px] text-slate-400 font-mono">{topicCount} Chapters</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Topics under selected subject */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Step 2: Choose Chapter in {selectedSubject}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topicsForSubject.map((topic) => {
              const profile = profiles[topic.id] || { theta: 0.0, itemsAttempted: 0 };
              const mastery = thetaToMasteryPercentage(profile.theta);
              const tier = getMasteryTier(profile.theta);

              return (
                <div
                  key={topic.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {topic.chapter}
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {tier.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mt-0.5">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {topic.description}
                      </p>
                    </div>

                    {/* Subtopics Badges */}
                    {topic.subtopics && topic.subtopics.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Subtopics Covered:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {topic.subtopics.map((sub, i) => (
                            <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400">
                      <MathRenderer content={topic.microTheory.slice(0, 130) + "..."} />
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-800/60 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Question Bank:</span>
                      <span className="text-indigo-400 font-mono font-bold">{topic.itemCount || 17} Calibrated Items</span>
                    </div>

                    <Link
                      href={`/practice?topic=${topic.id}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-md shadow-indigo-600/20"
                    >
                      <span>Start Adaptive Practice</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
