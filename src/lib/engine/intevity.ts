// 성향분석 엔진 — rule-based, GPT 호출 없음
// 기존 interibot_v16cs /lib/intevity/analyzer.ts + decision-impact engine 참고

import type { ProfileScore, StyleMatch } from "@/types";
import { questions } from "@/lib/data/intevity-questions";
import { matchStyles } from "@/lib/data/style-mapping";
import { recommendProcesses, getSpacePriority } from "@/lib/data/process-weights";

const scoreMap: Record<string, keyof ProfileScore> = {
  T01: "T01_space",
  T02: "T02_sensitivity",
  T03: "T03_cleaning",
  T04: "T04_organization",
  T05: "T05_organization",
  T06: "T06_family",
  T07: "T07_health",
  T08: "T08_budget",
  T09: "T09_color",
  T10: "T10_lighting",
  T11: "T11_purpose",
  T12: "T12_discomfort",
  T13: "T13_movement",
  T14: "T14_sleep",
  T15: "T15_hobby",
};

export function calculateScores(answers: Record<string, number>): ProfileScore {
  const scores = {} as ProfileScore;
  for (const q of questions) {
    const key = scoreMap[q.id];
    scores[key] = answers[q.id] ?? 50;
  }
  return scores;
}

export function analyzeProfile(answers: Record<string, number>) {
  const scores = calculateScores(answers);
  const styles = matchStyles(scores);
  const processes = recommendProcesses(scores);
  const spacePriority = getSpacePriority(scores);

  const styleMatch: StyleMatch = {
    primaryStyle: styles.primary.style,
    secondaryStyle: styles.secondary?.style,
    recommendedProcesses: processes.map((p) => p.process),
  };

  // 레이더 차트용 5축 요약
  const radarData = [
    { axis: "공간감각", value: Math.round((scores.T01_space + scores.T13_movement) / 2) },
    { axis: "미적감성", value: Math.round((scores.T09_color + scores.T10_lighting) / 2) },
    { axis: "실용성", value: Math.round((scores.T04_organization + scores.T05_organization) / 2) },
    { axis: "건강/안전", value: Math.round((scores.T07_health + scores.T06_family) / 2) },
    { axis: "생활패턴", value: Math.round((scores.T14_sleep + scores.T15_hobby) / 2) },
  ];

  return {
    scores,
    styleMatch,
    styleDetails: styles,
    processes,
    spacePriority,
    radarData,
  };
}
