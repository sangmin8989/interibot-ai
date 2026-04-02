"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/lib/data/intevity-questions";
import { analyzeProfile } from "@/lib/engine/intevity";
import ProfileResult from "@/components/intevity/ProfileResult";
import { ArrowLeft } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// Category-based gradient backgrounds
function getGradient(idx: number): string {
  if (idx < 2) return "from-blue-500/5 to-indigo-500/5";      // 공간감각
  if (idx < 4) return "from-violet-500/5 to-purple-500/5";     // 감각
  if (idx < 8) return "from-emerald-500/5 to-teal-500/5";      // 생활
  if (idx < 12) return "from-orange-500/5 to-amber-500/5";     // 취향
  return "from-pink-500/5 to-rose-500/5";                       // 라이프
}

export default function IntevityPage() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ReturnType<typeof analyzeProfile> | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const q = questions[idx];
  const isLast = idx === questions.length - 1;

  const handleSelect = useCallback(
    (score: number) => {
      setSelected(score);
      const newAnswers = { ...answers, [q.id]: score };
      setAnswers(newAnswers);

      setTimeout(() => {
        setSelected(null);
        if (isLast) {
          setResult(analyzeProfile(newAnswers));
        } else {
          setIdx((i) => i + 1);
        }
      }, 350);
    },
    [answers, q, isLast]
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

  const pct = Math.round(((idx + 1) / questions.length) * 100);

  return (
    <div className={`flex min-h-screen flex-col bg-gradient-to-br ${getGradient(idx)} bg-white`}>
      {/* Mini nav */}
      <div className="flex items-center gap-3 px-4 pt-20 lg:px-8">
        {idx > 0 && (
          <button
            onClick={() => { setIdx((i) => i - 1); setSelected(null); }}
            className="rounded-lg p-2 text-[#9CA3AF] transition hover:bg-black/5 hover:text-[#1A1A1A]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <span className="text-sm font-medium text-[#9CA3AF]">
          인테리어 성향분석
        </span>
      </div>

      {/* Progress */}
      <div className="mx-auto mt-4 w-full max-w-lg px-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-[#9CA3AF]">{idx + 1} / {questions.length}</span>
          <span className="font-semibold text-[#FF6B35]">{pct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/[0.04]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-amber-400"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35, ease }}
            className="w-full max-w-lg"
          >
            <div className="text-center">
              <span className="text-4xl">{q.emoji}</span>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
                {q.axis}
              </p>
              <h2 className="mt-4 text-2xl font-bold leading-relaxed text-[#1A1A1A] md:text-[1.75rem]">
                {q.question}
              </h2>
            </div>

            <div className="mt-8 space-y-3">
              {q.options.map((opt) => {
                const isSelected = selected === opt.score;
                return (
                  <motion.button
                    key={opt.score}
                    onClick={() => handleSelect(opt.score)}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? "border-[#FF6B35] bg-[#FF6B35]/5 text-[#1A1A1A] shadow-md"
                        : "border-black/[0.06] bg-white text-[#374151] hover:border-[#FF6B35]/30 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF6B35]"
                        >
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                      <span>{opt.label}</span>
                    </div>
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
