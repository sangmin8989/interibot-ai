// 성향 → 공정 가중치 규칙
// 기존 interibot_v16cs trait-weights.json + traitWeights.ts + trait-process-mapping-v3.json 참고
// 가중치 범위: -15% ~ +30% (기존 -20%~+30%에서 조정)

import type { ProfileScore } from "@/types";

export interface ProcessRecommendation {
  process: string;
  priority: "필수" | "권장" | "선택";
  reason: string;
  weightAdjust: number; // -15 ~ +30 (%)
}

// 트레이트 → 공정 가중치 매핑 (from trait-weights.json weight_matrix)
interface WeightRule {
  trait: keyof ProfileScore;
  threshold: number; // 이 점수 이상일 때 적용
  process: string;
  weight: number; // % 가중치
  reason: string;
}

const weightRules: WeightRule[] = [
  // T01 공간감각 → 목공사 (공간 구획 변경)
  { trait: "T01_space", threshold: 70, process: "목공사", weight: 8, reason: "공간 구획 최적화" },
  // T02 시각민감도 → 도장공사 (마감 품질)
  { trait: "T02_sensitivity", threshold: 70, process: "도장공사", weight: 5, reason: "마감 품질 향상" },
  // T03 청각민감도 → 창호공사 (방음)
  { trait: "T03_noise", threshold: 70, process: "창호공사", weight: 10, reason: "이중창 방음 효과" },
  // T04 청소성향 → 필름공사 (관리 용이)
  { trait: "T04_cleaning", threshold: 70, process: "필름공사", weight: 5, reason: "관리 편의 마감" },
  // T05 정리정돈 → 가구공사 (붙박이장)
  { trait: "T05_organization", threshold: 60, process: "가구공사", weight: 12, reason: "맞춤 수납장 필요" },
  // T06 가족구성 → 가구공사 (안전 수납)
  { trait: "T06_family", threshold: 70, process: "가구공사", weight: 10, reason: "가족 안전 수납" },
  // T06 가족구성 → 도어공사 (안전 도어)
  { trait: "T06_family", threshold: 80, process: "도어공사", weight: 6, reason: "안전 도어/잠금" },
  // T07 건강요소 → 바닥공사 (친환경 자재)
  { trait: "T07_health", threshold: 60, process: "바닥공사", weight: 8, reason: "친환경 바닥재" },
  // T07 건강요소 → 도배공사 (친환경 벽지)
  { trait: "T07_health", threshold: 70, process: "도배공사", weight: 6, reason: "친환경 벽지" },
  // T09 색감 → 도배공사 (포인트 벽지)
  { trait: "T09_color", threshold: 75, process: "도배공사", weight: 5, reason: "포인트 벽지/컬러" },
  // T10 조명 → 조명공사 (레이어드 조명)
  { trait: "T10_lighting", threshold: 65, process: "조명공사", weight: 12, reason: "맞춤 조명 계획" },
  // T10 조명 → 전기공사 (조명 배선)
  { trait: "T10_lighting", threshold: 80, process: "전기공사", weight: 5, reason: "조명 배선 추가" },
  // T12 불편요소 → 타일공사 (욕실/주방)
  { trait: "T12_discomfort", threshold: 60, process: "타일공사", weight: 8, reason: "노후 타일 교체" },
  // T12 불편요소 → 수전공사
  { trait: "T12_discomfort", threshold: 70, process: "수전공사", weight: 5, reason: "수전 교체" },
  // T14 수면 → 도어공사 (방음 도어)
  { trait: "T14_sleep", threshold: 70, process: "도어공사", weight: 8, reason: "방음 도어" },
  // T15 취미 → 필름공사 (인테리어 포인트)
  { trait: "T15_hobby", threshold: 70, process: "필름공사", weight: 5, reason: "인테리어 포인트" },
];

// 예산 성향에 따른 전체 가중치 조정
function getBudgetMultiplier(budgetScore: number): number {
  if (budgetScore <= 35) return -10; // 가성비 → 전체적으로 -10%
  if (budgetScore >= 75) return 5;   // 품질 우선 → +5%
  return 0;
}

export function recommendProcesses(scores: ProfileScore): ProcessRecommendation[] {
  const recs = new Map<string, ProcessRecommendation>();
  const budgetAdj = getBudgetMultiplier(scores.T08_budget);

  // 기본 필수 공정 (올수리 기준)
  const baseProcesses = [
    { process: "철거공사", reason: "올수리 기본 공정" },
    { process: "전기공사", reason: "안전 필수 점검" },
    { process: "설비공사", reason: "배관 필수 점검" },
    { process: "도배공사", reason: "기본 마감" },
    { process: "도장공사", reason: "기본 마감" },
  ];

  for (const bp of baseProcesses) {
    recs.set(bp.process, {
      process: bp.process,
      priority: "필수",
      reason: bp.reason,
      weightAdjust: budgetAdj,
    });
  }

  // 트레이트 기반 권장/선택 공정 추가
  for (const rule of weightRules) {
    const traitScore = scores[rule.trait];
    if (traitScore >= rule.threshold) {
      const existing = recs.get(rule.process);
      const adjustedWeight = Math.min(30, Math.max(-15, rule.weight + budgetAdj));

      if (!existing) {
        recs.set(rule.process, {
          process: rule.process,
          priority: adjustedWeight >= 8 ? "권장" : "선택",
          reason: rule.reason,
          weightAdjust: adjustedWeight,
        });
      } else {
        // 기존보다 높은 가중치면 업데이트
        if (adjustedWeight > existing.weightAdjust) {
          existing.weightAdjust = adjustedWeight;
          existing.reason = rule.reason;
        }
      }
    }
  }

  // 거주 목적이 투자/매매면 ROI 높은 공정 우선
  if (scores.T11_purpose <= 35) {
    const roiProcesses = ["타일공사", "도배공사", "바닥공사"];
    for (const p of roiProcesses) {
      const existing = recs.get(p);
      if (existing) {
        existing.weightAdjust = Math.min(30, existing.weightAdjust + 5);
      }
    }
  }

  const priorityOrder = { "필수": 0, "권장": 1, "선택": 2 };
  return Array.from(recs.values()).sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}

// 공간 우선순위 점수 계산
export function getSpacePriority(scores: ProfileScore): { space: string; score: number }[] {
  const spaces = [
    { space: "거실", score: scores.T01_space * 0.3 + scores.T13_movement * 0.3 + (100 - scores.T05_organization) * 0.2 },
    { space: "주방", score: scores.T15_hobby * 0.3 + scores.T04_cleaning * 0.2 + scores.T06_family * 0.2 },
    { space: "욕실", score: scores.T12_discomfort * 0.3 + scores.T04_cleaning * 0.2 + scores.T07_health * 0.2 },
    { space: "침실", score: scores.T14_sleep * 0.4 + scores.T02_sensitivity * 0.2 + scores.T03_noise * 0.1 },
    { space: "수납", score: scores.T05_organization * 0.4 + scores.T06_family * 0.2 + scores.T04_cleaning * 0.1 },
    { space: "현관", score: scores.T02_sensitivity * 0.2 + scores.T12_discomfort * 0.2 },
  ];

  return spaces
    .map((s) => ({ space: s.space, score: Math.round(s.score) }))
    .sort((a, b) => b.score - a.score);
}
