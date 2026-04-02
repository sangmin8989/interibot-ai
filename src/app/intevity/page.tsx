"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/lib/data/intevity-questions";
import { analyzeProfile } from "@/lib/engine/intevity";
import ProfileResult from "@/components/intevity/ProfileResult";

const ease = [0.16, 1, 0.3, 1] as const;

export default function IntevityPage() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ReturnType<typeof analyzeProfile> | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const q = questions[idx];
  const pct = ((idx + 1) / questions.length) * 100;

  const handleSelect = useCallback((score: number) => {
    setSelected(score);
    const next = { ...answers, [q.id]: score };
    setAnswers(next);
    setTimeout(() => {
      setSelected(null);
      if (idx === questions.length - 1) setResult(analyzeProfile(next));
      else setIdx(i => i + 1);
    }, 500);
  }, [answers, q, idx]);

  if (result) {
    return (
      <div className="min-h-screen bg-white px-6 py-28">
        <ProfileResult radarData={result.radarData} styleDetails={result.styleDetails} processes={result.processes} spacePriority={result.spacePriority} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-6 pt-24">
        {idx > 0 ? (
          <button onClick={() => { setIdx(i => i - 1); setSelected(null); }} className="text-[10px] text-white/55 transition hover:text-white/70">←</button>
        ) : <span />}
        <span className="font-mono text-[10px] text-[#C9A96E]/30">{idx + 1} — {questions.length}</span>
      </div>

      {/* Gold hairline progress */}
      <div className="mx-auto mt-6 w-full max-w-md px-6">
        <div className="h-[0.5px] w-full bg-white/[0.04]">
          <motion.div className="h-full bg-[#C9A96E]/40" animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease }} />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease }}
            className="w-full max-w-md"
          >
            <div className="text-center">
              <p className="text-[9px] tracking-[0.5em] text-[#C9A96E]/40">{q.axis}</p>
              <h2 className="mt-6 font-serif text-[clamp(1.25rem,3vw,1.75rem)] font-light leading-[1.5] text-white">
                {q.question}
              </h2>
            </div>

            <div className="mt-12">
              {q.options.map((opt) => {
                const active = selected === opt.score;
                return (
                  <motion.button
                    key={opt.score}
                    onClick={() => handleSelect(opt.score)}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full border-b py-5 text-left text-[13px] transition-all duration-500 ${
                      active
                        ? "border-[#C9A96E]/30 text-white"
                        : "border-white/[0.04] text-white/50 hover:text-white/80"
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
