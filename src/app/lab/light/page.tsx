"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pause, Play, Sparkles, Hand } from "lucide-react";
import { LightLab3D } from "@/components/LightLab3D";
import {
  FOCAL_LENGTH,
  MODE_LABELS,
  OpticMode,
  RAY_COLORS,
  computeOptics,
  describeCase,
} from "@/lib/optics";

const MODES: OpticMode[] = ["concave-mirror", "convex-mirror", "convex-lens", "concave-lens"];
const MIN_D = 4;
const MAX_D = 55;
const F = FOCAL_LENGTH;

const PRESETS = [
  { d: 45, mirror: "Beyond C", lens: "Beyond 2F₁" },
  { d: 30, mirror: "At C", lens: "At 2F₁" },
  { d: 22, mirror: "Between C and F", lens: "Between 2F₁ and F₁" },
  { d: 15, mirror: "At F", lens: "At F₁" },
  { d: 8, mirror: "Between F and P", lens: "Between F₁ and O" },
];

export default function LightLabPage() {
  const [mode, setMode] = useState<OpticMode>("concave-mirror");
  const [distance, setDistance] = useState(45);
  const [sweeping, setSweeping] = useState(false);
  const [showPhotons, setShowPhotons] = useState(true);

  // Auto-play: slide the object towards the element and back.
  useEffect(() => {
    if (!sweeping) return;
    let dir = -1;
    const id = setInterval(() => {
      setDistance((d) => {
        let next = d + dir * 0.25;
        if (next <= MIN_D || next >= MAX_D) {
          dir = -dir;
          next = Math.min(Math.max(next, MIN_D), MAX_D);
        }
        return Math.round(next * 100) / 100;
      });
    }, 60);
    return () => clearInterval(id);
  }, [sweeping]);

  const res = computeOptics(mode, distance);
  const caseInfo = describeCase(mode, distance);
  const isMirror = mode.endsWith("mirror");
  const converging = mode === "concave-mirror" || mode === "convex-lens";

  const absM = Math.abs(res.magnification);
  const nature = res.atInfinity
    ? ["Highly enlarged", "Formed at infinity"]
    : [
        res.real ? "Real" : "Virtual",
        res.magnification < 0 ? "Inverted" : "Erect",
        absM > 1.05 ? "Enlarged" : absM < 0.95 ? "Diminished" : "Same size",
      ];

  const rayNotes = isMirror
    ? [
        "A ray parallel to the principal axis, after reflection, passes through F (or appears to come from F).",
        "A ray striking the pole P is reflected obliquely, with ∠i = ∠r.",
        "A ray directed towards F, after reflection, becomes parallel to the principal axis.",
      ]
    : [
        "A ray parallel to the principal axis, after refraction, passes through F₂ (or appears to come from F₁).",
        "A ray passing through the optical centre O goes straight without any deviation.",
        "A ray directed towards a focus, after refraction, emerges parallel to the principal axis.",
      ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/practice?topic=light-mirrors"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            aria-label="Back to practice"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              3D Light Lab — Mirrors and Lenses
            </h1>
            <p className="text-xs text-slate-400">Chapter 10: Light — build and explore ray diagrams yourself</p>
          </div>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`py-2.5 px-3 rounded-xl text-sm font-semibold border transition-colors ${
              mode === m
                ? "bg-indigo-600 text-white border-indigo-500"
                : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
            }`}
          >
            {MODE_LABELS[m].en}
          </button>
        ))}
      </div>

      <div className="relative rounded-2xl border border-slate-800 bg-slate-950">
        <LightLab3D mode={mode} objectDistance={distance} showPhotons={showPhotons} />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg pointer-events-none">
          <Hand className="w-3.5 h-3.5" /> Drag to rotate · Scroll to zoom
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="distance" className="text-sm font-semibold text-white">
            Object distance: <span className="font-mono text-amber-300">{distance.toFixed(1)}</span>
            <span className="text-slate-400 text-xs"> (F = {F}, {isMirror ? "C" : "2F"} = {2 * F})</span>
          </label>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setSweeping((s) => !s)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30"
            >
              {sweeping ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {sweeping ? "Pause" : "Play Animation"}
            </button>
            <button
              onClick={() => setShowPhotons((s) => !s)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
            >
              Light particles: {showPhotons ? "ON" : "OFF"}
            </button>
          </div>
        </div>
        <input
          id="distance"
          type="range"
          min={MIN_D}
          max={MAX_D}
          step={0.5}
          value={distance}
          onChange={(e) => {
            setSweeping(false);
            setDistance(Number(e.target.value));
          }}
          className="w-full accent-amber-400"
        />
        {converging && (
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.d}
                onClick={() => {
                  setSweeping(false);
                  setDistance(p.d);
                }}
                className={`text-xs px-2.5 py-1 rounded-lg border ${
                  Math.abs(distance - p.d) < 0.01
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    : "bg-slate-950 text-slate-300 border-slate-700 hover:bg-slate-800"
                }`}
              >
                {isMirror ? p.mirror : p.lens}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4 space-y-3">
          <h2 className="text-sm font-bold text-white">Image</h2>
          <dl className="text-sm space-y-1.5">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-400">Object position</dt>
              <dd className="text-amber-300 text-right">{caseInfo.object}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-400">Image position</dt>
              <dd className="text-emerald-300 text-right">{caseInfo.image}</dd>
            </div>
            {!res.atInfinity && (
              <>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-400">Image distance</dt>
                  <dd className="text-white font-mono">{Math.abs(res.imageDistance).toFixed(1)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-400">Magnification</dt>
                  <dd className="text-white font-mono">{res.magnification.toFixed(2)}×</dd>
                </div>
              </>
            )}
          </dl>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {nature.map((n) => (
              <span key={n} className="text-xs px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                {n}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">
            Green arrow = real image · Translucent purple arrow = virtual image · Dashed line = ray extended backwards
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4 space-y-2">
          <h2 className="text-sm font-bold text-white">Rays</h2>
          {rayNotes.map((note, i) => (
            <p key={i} className="text-sm text-slate-300 flex gap-2">
              <span className="mt-1.5 w-3 h-3 rounded-full shrink-0" style={{ background: RAY_COLORS[i] }} />
              {note}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
