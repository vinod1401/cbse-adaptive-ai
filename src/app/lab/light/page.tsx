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
  { d: 45, mirror: "C से परे", lens: "2F₁ से परे" },
  { d: 30, mirror: "C पर", lens: "2F₁ पर" },
  { d: 22, mirror: "C और F के बीच", lens: "2F₁ और F₁ के बीच" },
  { d: 15, mirror: "F पर", lens: "F₁ पर" },
  { d: 8, mirror: "F और P के बीच", lens: "F₁ और O के बीच" },
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
    ? ["अत्यधिक बड़ा (highly enlarged)", "अनंत पर बनता है"]
    : [
        res.real ? "वास्तविक (Real)" : "आभासी (Virtual)",
        res.magnification < 0 ? "उल्टा (Inverted)" : "सीधा (Erect)",
        absM > 1.05 ? "बड़ा (Enlarged)" : absM < 0.95 ? "छोटा (Diminished)" : "समान आकार (Same size)",
      ];

  const rayNotes = isMirror
    ? [
        "मुख्य अक्ष के समानांतर किरण परावर्तन के बाद F से होकर जाती है (या F से आती प्रतीत होती है)।",
        "P पर पड़ने वाली किरण ∠i = ∠r के साथ परावर्तित होती है।",
        "F की ओर जाने वाली किरण परावर्तन के बाद मुख्य अक्ष के समानांतर हो जाती है।",
      ]
    : [
        "मुख्य अक्ष के समानांतर किरण अपवर्तन के बाद F₂ से होकर जाती है (या F₁ से आती प्रतीत होती है)।",
        "प्रकाशिक केंद्र O से होकर जाने वाली किरण बिना मुड़े सीधी निकल जाती है।",
        "फोकस की ओर जाने वाली किरण अपवर्तन के बाद मुख्य अक्ष के समानांतर निकलती है।",
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
              3D Light Lab — दर्पण और लेंस
            </h1>
            <p className="text-xs text-slate-400">Chapter 10: Light — किरण आरेख (Ray Diagrams) खुद बनाकर देखें</p>
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
            {MODE_LABELS[m].hi}
            <span className="block text-[11px] font-normal opacity-80">{MODE_LABELS[m].en}</span>
          </button>
        ))}
      </div>

      <div className="relative rounded-2xl border border-slate-800 bg-slate-950">
        <LightLab3D mode={mode} objectDistance={distance} showPhotons={showPhotons} />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg pointer-events-none">
          <Hand className="w-3.5 h-3.5" /> खींचकर घुमाएँ · scroll से zoom
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="distance" className="text-sm font-semibold text-white">
            वस्तु की दूरी (Object distance): <span className="font-mono text-amber-300">{distance.toFixed(1)}</span>
            <span className="text-slate-400 text-xs"> (F = {F}, {isMirror ? "C" : "2F"} = {2 * F})</span>
          </label>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setSweeping((s) => !s)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30"
            >
              {sweeping ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {sweeping ? "रोकें" : "Animation चलाएँ"}
            </button>
            <button
              onClick={() => setShowPhotons((s) => !s)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
            >
              प्रकाश कण: {showPhotons ? "ON" : "OFF"}
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
          <h2 className="text-sm font-bold text-white">प्रतिबिंब (Image)</h2>
          <dl className="text-sm space-y-1.5">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-400">वस्तु की स्थिति</dt>
              <dd className="text-amber-300 text-right">{caseInfo.object}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-400">प्रतिबिंब की स्थिति</dt>
              <dd className="text-emerald-300 text-right">{caseInfo.image}</dd>
            </div>
            {!res.atInfinity && (
              <>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-400">प्रतिबिंब दूरी</dt>
                  <dd className="text-white font-mono">{Math.abs(res.imageDistance).toFixed(1)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-400">आवर्धन (Magnification)</dt>
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
            हरा तीर = वास्तविक प्रतिबिंब · बैंगनी पारदर्शी तीर = आभासी प्रतिबिंब · बिंदीदार रेखा = किरण का पीछे की ओर बढ़ाया भाग
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4 space-y-2">
          <h2 className="text-sm font-bold text-white">किरणें (Rays)</h2>
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
