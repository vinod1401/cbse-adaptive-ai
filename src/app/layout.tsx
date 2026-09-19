import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Brain, Flame, Sparkles, Trophy } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pragati AI — CBSE Adaptive Learning & Socratic Tutor",
  description: "Next-Generation Psychometric Adaptive Practice with Gemini AI Socratic Tutor for CBSE Class 8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-slate-950 flex flex-col`}>
        {/* Modern Top Header */}
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                  Pragati <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30">AI</span>
                </span>
                <span className="block text-[11px] text-slate-400 font-medium">CBSE Class 8 · Adaptive</span>
              </div>
            </Link>

            {/* Quick Stats Widget */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>3 Day Streak</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>240 XP</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
          <p>Powered by IRT Psychometrics & Google Gemini AI Flash · 100% Free & Open-Source Architecture</p>
        </footer>
      </body>
    </html>
  );
}
