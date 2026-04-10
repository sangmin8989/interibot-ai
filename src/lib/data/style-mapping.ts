// 성향 스코어 → 스타일 매칭
// 기존 interibot_v16cs analyzer.ts 프로필 타입 + styleMapper.ts 참고, 업그레이드

import type { ProfileScore, StyleType } from "@/types";

export interface StyleMatchResult {
  style: StyleType;
  description: string;
  matchScore: number;
  keywords: string[];
}

interface StyleRule {
  style: StyleType;
  description: string;
  keywords: string[];
  match: (s: ProfileScore) => number;
}

const styleRules: StyleRule[] = [
  {
    style: "모던",
    description: "깔끔한 직선과 무채색 기반의 세련된 공간. 군더더기 없는 디자인.",
    keywords: ["무채색", "직선", "심플", "세련됨"],
    match: (s) => {
      let score = 0;
      if (s.T09_color <= 40) score += 25;
      if (s.T05_organization >= 70) score += 20;
      if (s.T10_lighting >= 65) score += 15;
      if (s.T04_cleaning >= 65) score += 10;
      if (s.T08_budget >= 60) score += 10;
      return score;
    },
  },
  {
    style: "내추럴",
    description: "우드톤과 자연 소재로 따뜻하고 편안한 공간. 자연 친화적 분위기.",
    keywords: ["우드톤", "자연소재", "따뜻함", "편안함"],
    match: (s) => {
      let score = 0;
      if (s.T09_color >= 45 && s.T09_color <= 65) score += 25;
      if (s.T07_health >= 55) score += 20;
      if (s.T01_space >= 55) score += 15;
      if (s.T14_sleep >= 60) score += 10;
      if (s.T06_family >= 50) score += 10;
      return score;
    },
  },
  {
    style: "클래식",
    description: "고급스럽고 격조 있는 전통적 스타일. 몰딩, 대리석, 고급 자재.",
    keywords: ["고급", "몰딩", "대리석", "격조"],
    match: (s) => {
      let score = 0;
      if (s.T08_budget >= 75) score += 25;
      if (s.T11_purpose >= 70) score += 20;
      if (s.T09_color >= 55 && s.T09_color <= 80) score += 15;
      if (s.T10_lighting >= 55) score += 10;
      return score;
    },
  },
  {
    style: "미니멀",
    description: "불필요한 것을 줄이고 본질에 집중. 히든 수납, 매립형 디자인.",
    keywords: ["미니멀", "히든수납", "매립형", "절제"],
    match: (s) => {
      let score = 0;
      if (s.T05_organization >= 75) score += 25;
      if (s.T04_cleaning >= 75) score += 20;
      if (s.T09_color <= 35) score += 15;
      if (s.T01_space <= 50) score += 10;
      return score;
    },
  },
  {
    style: "스칸디",
    description: "북유럽식 심플하면서도 따뜻한 스타일. 밝은 톤, 원목, 패브릭 활용.",
    keywords: ["북유럽", "밝은톤", "원목", "패브릭"],
    match: (s) => {
      let score = 0;
      if (s.T09_color >= 35 && s.T09_color <= 65) score += 20;
      if (s.T10_lighting >= 55) score += 20;
      if (s.T07_health >= 50) score += 15;
      if (s.T13_movement >= 55) score += 10;
      if (s.T15_hobby >= 50) score += 10;
      return score;
    },
  },
  {
    style: "빈티지",
    description: "개성 있는 오래된 매력. 독특한 소품과 믹스매치로 나만의 공간.",
    keywords: ["빈티지", "믹스매치", "개성", "레트로"],
    match: (s) => {
      let score = 0;
      if (s.T09_color >= 80) score += 25;
      if (s.T15_hobby >= 65) score += 20;
      if (s.T08_budget >= 55) score += 10;
      if (s.T10_lighting >= 65) score += 15;
      return score;
    },
  },
];

export function matchStyles(scores: ProfileScore): {
  primary: StyleMatchResult;
  secondary?: StyleMatchResult;
} {
  const results: StyleMatchResult[] = styleRules
    .map((rule) => ({
      style: rule.style,
      description: rule.description,
      keywords: rule.keywords,
      matchScore: rule.match(scores),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  return {
    primary: results[0],
    secondary: results[1].matchScore > 20 ? results[1] : undefined,
  };
}
