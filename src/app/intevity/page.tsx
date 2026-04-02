"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/lib/data/intevity-questions";
import { analyzeProfile } from "@/lib/engine/intevity";
import ProfileResult from "@/components/intevity/ProfileResult";

const ease = [0.22, 1, 0.36, 1] as const;

export default function IntevityPage() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ReturnType<typeof analyzeProfile> | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const q = questions[idx];
  const pct = Math.round(((idx + 1) / questions.length) * 100);

  const handleSelect = useCallback(
    (score: number) => {
      setSelected(score);
      const next = { ...answers, [q.id]: score };
      setAnswers(next);
      setTimeout(() => {
        setSelected(null);
        if (idx === questions.length - 1) setResult(analyzeProfile(next));
        else setIdx((i) => i + 1);
      }, 400);
    },
    [answers, q, idx]
  );

  if (result) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] px-4 py-24">
        <ProfileResult
          radarData={result.radarData}
          styleDetails={result.styleDetails}
          processes={result.processes}
          spacePriority={result.spacePriority}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0B]">
      {/* Top bar: minimal */}
      <div className="flex items-center justify-between px-6 pt-20">
        {idx > 0 ? (
          <button onClick={() => { setIdx((i) => i - 1); setSelected(null); }} className="text-xs text-white/30 hover:text-white/60">
            ← 이전
          </button>
        ) : (
          <span />
        )}
        <span className="font-mono text-xs text-white/20">{idx + 1}/{questions.length}</span>
      </div>

      {/* Progress — thin line */}
      <div className="mx-6 mt-4 h-[2px] bg-white/[0.04]">
        <motion.div
          className="h-full bg-[#FF6B35]"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease }}
        />
      </div>

      {/* Question — centered, dramatic */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, ease }}
            className="w-full max-w-md"
          >
            {/* Emoji as giant art piece */}
            <div className="text-center">
              <span className="text-5xl">{q.emoji}</span>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6B35]/60">
                {q.axis}
              </p>
              <h2 className="mt-4 text-2xl font-bold leading-relaxed text-white md:text-3xl">
                {q.question}
              </h2>
            </div>

            {/* Options — dark cards */}
            <div className="mt-10 space-y-3">
              {q.options.map((opt) => {
                const isSelected = selected === opt.score;
                return (
                  <motion.button
                    key={opt.score}
                    onClick={() => handleSelect(opt.score)}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full rounded-2xl border px-5 py-4 text-left text-sm transition-all ${
                      isSelected
                        ? "border-[#FF6B35] bg-[#FF6B35]/10 text-white"
                        : "border-white/[0.06] bg-white/[0.02] text-white/60 hover:border-white/10 hover:bg-white/[0.04] hover:text-white/80"
                    }`}
                  >
                    {opt.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
