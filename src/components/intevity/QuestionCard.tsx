"use client";

import { motion } from "framer-motion";
import type { IntevityQuestion } from "@/lib/data/intevity-questions";

interface Props {
  question: IntevityQuestion;
  selectedScore: number | null;
  onSelect: (score: number) => void;
}

export default function QuestionCard({ question, selectedScore, onSelect }: Props) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto max-w-lg"
    >
      <div className="mb-8 text-center">
        <span className="mb-2 block text-4xl">{question.emoji}</span>
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
          {question.axis}
        </p>
        <h2 className="mt-3 text-xl font-bold leading-relaxed text-gray-900 md:text-2xl">
          {question.question}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.score}
            onClick={() => onSelect(opt.score)}
            className={`rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium transition-all duration-200
              ${
                selectedScore === opt.score
                  ? "border-orange-400 bg-orange-50 text-gray-900 shadow-md"
                  : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:shadow-sm"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
