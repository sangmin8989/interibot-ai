// 인테비티 엔진 — 7탭 입력 → 15축 점수 → 11개 스타일 코사인 유사도 매칭
// 설계서 V2 섹션 7 기반

import type { ProfileScore } from "@/types";
import { INTEVITY_TYPES, type IntevityType } from "@/lib/intevity/types";
import { recommendProcesses, getSpacePriority } from "@/lib/data/process-weights";

// ── 7탭 입력 타입 ──

export interface TabAnswers {
  mbti: { EI: string; SN: string; TF: string; JP: string };
  bloodType: "A" | "B" | "O" | "AB";
  area: number; // 15~55평
  family: string[]; // ["alone", "spouse", "child", "pet", "parent"]
  painPoints: string[]; // ["storage", "noise", "lighting", "flow"]
  budget: "smart" | "balanced" | "premium";
  mood: string; // "mood-modern" | "mood-natural" | "mood-classic" | "mood-japandi"
}

// ── 15축 이름 ──

export const AXIS_NAMES = [
  "공간감각",
  "시각청각민감도",
  "청소성향",
  "정리정돈",
  "가족구성",
  "건강요소",
  "예산감각",
  "색감취향",
  "조명취향",
  "집사용목적",
  "불편요소",
  "활동동선",
  "생활루틴",
  "수면패턴",
  "취미라이프",
] as const;

export type AxisName = (typeof AXIS_NAMES)[number];

// ── MBTI → 축 매핑 (설계서 V2 7-1) ──

const MBTI_MAPPING: Record<string, Partial<Record<AxisName, number>>> = {
  E: { 공간감각: 70, 활동동선: 75 },
  I: { 공간감각: 40, 활동동선: 35 },
  S: { 정리정돈: 75, 시각청각민감도: 45 },
  N: { 정리정돈: 40, 시각청각민감도: 70 },
  T: { 예산감각: 70, 색감취향: 40 },
  F: { 예산감각: 40, 색감취향: 75 },
  J: { 생활루틴: 80, 청소성향: 75 },
  P: { 생활루틴: 35, 청소성향: 40 },
};

// ── 혈액형 → 보정 (설계서 V2 7-2) ──

const BLOOD_ADJUST: Record<string, Partial<Record<AxisName, number>>> = {
  A: { 청소성향: 10, 예산감각: 5, 시각청각민감도: 5 },
  B: { 청소성향: -5, 예산감각: -10, 시각청각민감도: 10 },
  O: { 예산감각: 10, 시각청각민감도: -5 },
  AB: { 청소성향: 5, 시각청각민감도: 15 },
};

// ── 분위기 이미지 → 축 벡터 (설계서 V2 7-3) ──

const MOOD_VECTORS: Record<string, Partial<Record<AxisName, number>>> = {
  "mood-modern": { 색감취향: 30, 조명취향: 75, 집사용목적: 70, 취미라이프: 50 },
  "mood-natural": { 색감취향: 55, 조명취향: 50, 집사용목적: 60, 취미라이프: 65 },
  "mood-classic": { 색감취향: 70, 조명취향: 65, 집사용목적: 85, 취미라이프: 45 },
  "mood-japandi": { 색감취향: 45, 조명취향: 60, 집사용목적: 75, 취미라이프: 55 },
};

// ── 11개 스타일 벡터 (15축 기준값) ──

const STYLE_VECTORS: Record<string, number[]> = {
  modern:       [65, 60, 70, 75, 50, 40, 70, 25, 80, 70, 50, 65, 75, 55, 50],
  minimal:      [45, 55, 80, 90, 40, 35, 60, 20, 50, 55, 40, 40, 85, 60, 35],
  scandinavian: [60, 50, 60, 65, 55, 55, 55, 50, 65, 60, 45, 60, 60, 65, 60],
  classic:      [70, 65, 55, 60, 60, 45, 85, 70, 70, 85, 55, 55, 65, 60, 45],
  natural:      [55, 45, 50, 50, 60, 70, 50, 55, 50, 60, 50, 55, 50, 65, 65],
  industrial:   [60, 75, 40, 45, 35, 30, 65, 65, 75, 65, 45, 55, 40, 45, 70],
  retro:        [50, 70, 35, 40, 45, 35, 55, 80, 60, 55, 45, 50, 35, 50, 75],
  romantic:     [55, 65, 50, 55, 50, 40, 55, 75, 55, 60, 40, 45, 55, 70, 60],
  french:       [60, 70, 45, 50, 45, 35, 75, 70, 65, 75, 40, 50, 50, 55, 55],
  contemporary: [65, 70, 55, 60, 45, 40, 70, 60, 80, 70, 45, 65, 60, 50, 65],
  japandi:      [50, 55, 65, 70, 50, 50, 60, 45, 55, 70, 40, 45, 70, 70, 50],
};

// ── 코사인 유사도 ──

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const mag = Math.sqrt(magA) * Math.sqrt(magB);
  return mag === 0 ? 0 : dot / mag;
}

// ── clamp 유틸 ──

function clamp(v: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, v));
}

// ── 7탭 입력 → 15축 점수 계산 ──

export function calculateAxes(answers: TabAnswers): Record<AxisName, number> {
  const axes: Record<AxisName, number> = {
    공간감각: 50,
    시각청각민감도: 50,
    청소성향: 50,
    정리정돈: 50,
    가족구성: 50,
    건강요소: 50,
    예산감각: 50,
    색감취향: 50,
    조명취향: 50,
    집사용목적: 50,
    불편요소: 50,
    활동동선: 50,
    생활루틴: 50,
    수면패턴: 50,
    취미라이프: 50,
  };

  // 1) MBTI → 8축 초기값
  const { EI, SN, TF, JP } = answers.mbti;
  for (const letter of [EI, SN, TF, JP]) {
    const mapping = MBTI_MAPPING[letter];
    if (mapping) {
      for (const [axis, value] of Object.entries(mapping)) {
        axes[axis as AxisName] = value;
      }
    }
  }

  // 2) 혈액형 → 보정
  const bloodAdj = BLOOD_ADJUST[answers.bloodType];
  if (bloodAdj) {
    for (const [axis, delta] of Object.entries(bloodAdj)) {
      axes[axis as AxisName] = clamp(axes[axis as AxisName] + delta);
    }
  }

  // 3) 평수 → 공간감각 보정
  if (answers.area <= 25) {
    axes.공간감각 = clamp(axes.공간감각 - 10);
  } else if (answers.area >= 40) {
    axes.공간감각 = clamp(axes.공간감각 + 15);
  }

  // 4) 가족 구성 → 가족구성, 건강요소
  if (answers.family.includes("alone")) {
    axes.가족구성 = 30;
  } else if (answers.family.includes("spouse") && !answers.family.includes("child")) {
    axes.가족구성 = 50;
  }
  if (answers.family.includes("child")) {
    axes.가족구성 = 80;
    axes.건강요소 = clamp(axes.건강요소 + 20);
  }
  if (answers.family.includes("pet")) {
    axes.건강요소 = clamp(axes.건강요소 + 10);
    axes.청소성향 = clamp(axes.청소성향 + 10);
  }
  if (answers.family.includes("parent")) {
    axes.가족구성 = clamp(axes.가족구성 + 15);
    axes.건강요소 = clamp(axes.건강요소 + 10);
  }

  // 5) 불편한 점 → 불편요소, 수면패턴
  if (answers.painPoints.includes("storage")) {
    axes.불편요소 = clamp(axes.불편요소 + 20);
    axes.정리정돈 = clamp(axes.정리정돈 + 10);
  }
  if (answers.painPoints.includes("noise")) {
    axes.불편요소 = clamp(axes.불편요소 + 15);
    axes.수면패턴 = clamp(axes.수면패턴 + 20);
    axes.시각청각민감도 = clamp(axes.시각청각민감도 + 10);
  }
  if (answers.painPoints.includes("lighting")) {
    axes.불편요소 = clamp(axes.불편요소 + 10);
    axes.조명취향 = clamp(axes.조명취향 + 15);
  }
  if (answers.painPoints.includes("flow")) {
    axes.불편요소 = clamp(axes.불편요소 + 15);
    axes.활동동선 = clamp(axes.활동동선 + 15);
  }

  // 6) 예산 → 오버라이드
  const budgetMap = { smart: 30, balanced: 60, premium: 90 };
  axes.예산감각 = budgetMap[answers.budget];

  // 7) 분위기 이미지 → 색감, 조명, 집사용, 취미
  const moodVec = MOOD_VECTORS[answers.mood];
  if (moodVec) {
    for (const [axis, value] of Object.entries(moodVec)) {
      axes[axis as AxisName] = value;
    }
  }

  return axes;
}

// ── 15축 → ProfileScore 호환 변환 ──

export function toProfileScore(axes: Record<AxisName, number>): ProfileScore {
  return {
    T01_space: axes.공간감각,
    T02_sensitivity: axes.시각청각민감도,
    T03_noise: axes.시각청각민감도, // 시각+청각 통합
    T04_cleaning: axes.청소성향,
    T05_organization: axes.정리정돈,
    T06_family: axes.가족구성,
    T07_health: axes.건강요소,
    T08_budget: axes.예산감각,
    T09_color: axes.색감취향,
    T10_lighting: axes.조명취향,
    T11_purpose: axes.집사용목적,
    T12_discomfort: axes.불편요소,
    T13_movement: axes.활동동선,
    T14_sleep: axes.수면패턴,
    T15_hobby: axes.취미라이프,
  };
}

// ── 타입 판정 결과 ──

export interface IntevityResult {
  mainType: IntevityType;
  subTypes: IntevityType[];
  axes: Record<AxisName, number>;
  topAxes: { name: AxisName; value: number }[];
  bottomAxis: { name: AxisName; value: number };
  percentile: number; // 희소성 %
  similarities: { type: IntevityType; score: number }[];
}

// ── 타입 희소성 (가상 통계, 바넘 효과) ──

const TYPE_RARITY: Record<string, number> = {
  modern: 14,
  minimal: 11,
  scandinavian: 13,
  classic: 6,
  natural: 15,
  industrial: 5,
  retro: 4,
  romantic: 8,
  french: 7,
  contemporary: 9,
  japandi: 8,
};

// ── getResult: 메인 타입 + 서브타입 + 축 분석 ──

export function getResult(answers: TabAnswers): IntevityResult {
  const axes = calculateAxes(answers);
  const userVector = AXIS_NAMES.map((name) => axes[name]);

  // 코사인 유사도로 11개 스타일 매칭
  const similarities = INTEVITY_TYPES.map((type) => ({
    type,
    score: cosineSimilarity(userVector, STYLE_VECTORS[type.id]),
  })).sort((a, b) => b.score - a.score);

  const mainType = similarities[0].type;
  const subTypes = similarities.slice(1, 3).map((s) => s.type);

  // 축 정렬
  const sortedAxes = AXIS_NAMES.map((name) => ({ name, value: axes[name] })).sort(
    (a, b) => b.value - a.value
  );

  return {
    mainType,
    subTypes,
    axes,
    topAxes: sortedAxes.slice(0, 3),
    bottomAxis: sortedAxes[sortedAxes.length - 1],
    percentile: TYPE_RARITY[mainType.id] ?? 8,
    similarities,
  };
}

// ── analyzeProfile: 기존 호환 래퍼 ──

export function analyzeProfile(answers: TabAnswers) {
  const result = getResult(answers);
  const profileScore = toProfileScore(result.axes);
  const processes = recommendProcesses(profileScore);
  const spacePriority = getSpacePriority(profileScore);

  const radarData = AXIS_NAMES.map((name) => ({
    axis: name,
    value: result.axes[name],
  }));

  return {
    result,
    scores: profileScore,
    processes,
    spacePriority,
    radarData,
  };
}

// ── 중간 피드백용: 현재까지 가장 높은 축 계산 ──

export function getTopAxisSoFar(
  partialAxes: Partial<Record<AxisName, number>>
): { name: AxisName; value: number; percentile: number } | null {
  let top: { name: AxisName; value: number } | null = null;
  for (const [name, value] of Object.entries(partialAxes)) {
    if (value !== undefined && (!top || value > top.value)) {
      top = { name: name as AxisName, value };
    }
  }
  if (!top) return null;
  // 바넘 효과: 높은 점수일수록 희소한 %로 표시
  const percentile = Math.max(3, Math.round(100 - top.value * 0.9));
  return { ...top, percentile };
}

// ── 중간 피드백용: 축별 해석 카피 ──

export const AXIS_INSIGHTS: Record<AxisName, string> = {
  공간감각: "넓은 시야에서 영감을 얻는 편이에요",
  시각청각민감도: "미세한 차이도 놓치지 않는 섬세한 감각이에요",
  청소성향: "깨끗한 공간에서 진정한 안식을 찾는 편이에요",
  정리정돈: "질서 속에서 평온을 찾는 타입이에요",
  가족구성: "가족 중심의 따뜻한 공간을 추구하는 편이에요",
  건강요소: "건강하고 안전한 환경을 중요시하는 편이에요",
  예산감각: "가치 있는 투자를 아끼지 않는 편이에요",
  색감취향: "따뜻한 자연 소재에 끌리는 편이에요",
  조명취향: "빛으로 공간의 분위기를 완성하는 편이에요",
  집사용목적: "오래 살 공간에 진심을 담는 편이에요",
  불편요소: "현재 공간의 아쉬운 점을 정확히 아는 편이에요",
  활동동선: "공간의 흐름을 중요하게 생각하는 편이에요",
  생활루틴: "규칙적인 일상에서 편안함을 느끼는 편이에요",
  수면패턴: "수면 환경에 예민한 섬세한 감각이에요",
  취미라이프: "집에서의 취미 생활을 소중히 여기는 편이에요",
};
