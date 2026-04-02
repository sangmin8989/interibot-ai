"use client";

import { useState, useCallback } from "react";
import { questions } from "@/lib/data/intevity-questions";
import { analyzeProfile } from "@/lib/engine/intevity";
import QuestionCard from "@/components/intevity/QuestionCard";
import ProgressBar from "@/components/intevity/ProgressBar";
import ProfileResult from "@/components/intevity/ProfileResult";
import { Button } from "@/components/ui/button";
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
        setTimeout(() => setCurrentIndex((i) => i + 1), 200);
      }
    },
    [answers, currentQuestion, isLast]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  if (result) {
    return (
      <div className="px-4 py-8">
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
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          {currentIndex > 0 && (
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-lg font-semibold">인테리어 성향분석</h1>
        </div>
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </div>

      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        selectedScore={answers[currentQuestion.id] ?? null}
        onSelect={handleSelect}
      />
    </div>
  );
}
