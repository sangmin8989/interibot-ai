"use client";

import type { IntevityQuestion } from "@/lib/data/intevity-questions";

interface Props {
  question: IntevityQuestion;
  selectedScore: number | null;
  onSelect: (score: number) => void;
}

export default function QuestionCard({ question, selectedScore, onSelect }: Props) {
  return (
    <div className="mx-auto max-w-lg animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-6 text-center">
        <span className="mb-2 block text-3xl">{question.emoji}</span>
        <p className="text-xs font-medium uppercase tracking-wider text-orange">
          {question.axis}
        </p>
        <h2 className="mt-2 text-xl font-bold leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.score}
            onClick={() => onSelect(opt.score)}
            className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all
              ${
                selectedScore === opt.score
                  ? "border-orange bg-orange/10 text-foreground"
                  : "border-border bg-card hover:border-orange/50"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
