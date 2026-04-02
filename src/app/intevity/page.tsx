"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { questions } from "@/lib/data/intevity-questions";
import { analyzeProfile } from "@/lib/engine/intevity";
import QuestionCard from "@/components/intevity/QuestionCard";
import ProgressBar from "@/components/intevity/ProgressBar";
import ProfileResult from "@/components/intevity/ProfileResult";
import { ArrowLeft } from "lucide-react";

export default function IntevityPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ReturnType<typeof analyzeProfile> | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = useCallback(
    (score: number) => {
      const newAnswers = { ...answers, [currentQuestion.id]: score };
      setAnswers(newAnswers);

      if (isLast) {
        const analysisResult = analyzeProfile(newAnswers);
        setResult(analysisResult);
      } else {
        setTimeout(() => setCurrentIndex((i) => i + 1), 250);
      }
    },
    [answers, currentQuestion, isLast]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  if (result) {
    return (
      <div className="min-h-screen bg-white px-4 py-24">
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 pt-20">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            {currentIndex > 0 && (
              <button
                onClick={handleBack}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <h1 className="text-lg font-bold text-gray-900">인테리어 성향분석</h1>
          </div>
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>

        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedScore={answers[currentQuestion.id] ?? null}
            onSelect={handleSelect}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
