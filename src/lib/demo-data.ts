import type { RangePosition, AnalysisReport, ConfidenceLevel } from "@/types";

// ── 데모 분석 리포트 (새 v2 구조) ──
export const DEMO_ANALYSIS_REPORT: AnalysisReport = {
  items: [
    { processName: "목공사", userAmount: 8200000, rangeLow: 5500000, rangeHigh: 10000000, median: 7500000, position: "within", positionRatio: 0.60, context: { possibleReasons: ["붙박이장 제작 포함", "천장 몰딩·간접조명 박스"], suggestedQuestion: "붙박이장이나 간접조명 시공이 포함된 금액인가요?", confidence: "high", sampleCount: 42 }, source: "시장 데이터 기준" },
    { processName: "타일공사", userAmount: 6500000, rangeLow: 4000000, rangeHigh: 8000000, median: 5800000, position: "within", positionRatio: 0.63, context: { possibleReasons: ["수입 타일", "대형 타일 시공"], suggestedQuestion: "타일 브랜드와 시공 면적이 어떻게 되나요?", confidence: "high", sampleCount: 38 }, source: "시장 데이터 기준" },
    { processName: "전기공사", userAmount: 3800000, rangeLow: 1500000, rangeHigh: 3200000, median: 2300000, position: "above", positionRatio: 0.88, context: { possibleReasons: ["분전반 교체 포함", "콘센트 20개 이상 증설", "LED 다운라이트 전환"], suggestedQuestion: "분전반 교체와 콘센트 증설 수량이 어떻게 되나요?", confidence: "moderate", sampleCount: 28 }, source: "시장 데이터 기준" },
    { processName: "설비공사", userAmount: 4200000, rangeLow: 3000000, rangeHigh: 6000000, median: 4200000, position: "within", positionRatio: 0.50, context: { possibleReasons: ["노후 배관 전체 교체", "수입 수전"], suggestedQuestion: "배관 교체 범위와 수전·도기 브랜드가 어떤 건가요?", confidence: "high", sampleCount: 35 }, source: "시장 데이터 기준" },
    { processName: "도배공사", userAmount: 3100000, rangeLow: 1500000, rangeHigh: 3000000, median: 2200000, position: "upper", positionRatio: 0.78, context: { possibleReasons: ["실크 벽지", "천장 도배 포함"], suggestedQuestion: "벽지 종류가 합지인가요 실크인가요? 천장 도배도 포함인가요?", confidence: "high", sampleCount: 40 }, source: "시장 데이터 기준" },
    { processName: "도장공사", userAmount: 2800000, rangeLow: 1500000, rangeHigh: 4000000, median: 2500000, position: "within", positionRatio: 0.47, context: { possibleReasons: ["수입 페인트", "천장 포함"], suggestedQuestion: "페인트 브랜드와 도장 범위를 확인할 수 있나요?", confidence: "high", sampleCount: 36 }, source: "시장 데이터 기준" },
    { processName: "바닥공사", userAmount: 3200000, rangeLow: 2000000, rangeHigh: 5000000, median: 3200000, position: "within", positionRatio: 0.50, context: { possibleReasons: ["강마루/원목마루", "헤링본 패턴"], suggestedQuestion: "마루 종류가 강화마루인가요, 강마루/원목인가요?", confidence: "high", sampleCount: 34 }, source: "시장 데이터 기준" },
  ],
  missingProcesses: [
    { processName: "철거공사", criticality: "critical", reason: "기존 마감재 철거 없이는 시공이 어렵습니다. 별도 항목으로 포함되었는지 확인하세요." },
  ],
  totalAmount: 31800000,
  totalRangeLow: 19000000,
  totalRangeHigh: 39200000,
  totalMedian: 27700000,
  perPyeongCost: 994000,
  typicalPerPyeongRange: [594000, 1225000],
  processRatios: [
    { processName: "목공사", ratio: 26 },
    { processName: "타일공사", ratio: 20 },
    { processName: "설비공사", ratio: 13 },
    { processName: "전기공사", ratio: 12 },
    { processName: "바닥공사", ratio: 10 },
    { processName: "도배공사", ratio: 10 },
    { processName: "도장공사", ratio: 9 },
  ],
  overallConfidence: "moderate",
  sampleBasis: "시장 28건 기준",
  disclaimer: "이 분석은 참고용이며, 자재 등급·시공 범위·지역에 따라 달라질 수 있습니다.",
};

// ── 홈페이지용 간략 데모 ──
export const DEMO_HOME_ITEMS = DEMO_ANALYSIS_REPORT.items.slice(0, 5);

export const DEMO_HVI = {
  hvi: 32000000,
  roi: 142,
  lii: "A",
  processRoi: [
    { name: "목공사", roi: 58, amount: 8200000 },
    { name: "타일공사", roi: 65, amount: 6500000 },
    { name: "설비공사", roi: 60, amount: 4200000 },
    { name: "바닥공사", roi: 48, amount: 3200000 },
    { name: "도배공사", roi: 35, amount: 3100000 },
    { name: "도장공사", roi: 30, amount: 2800000 },
  ],
};

export const DEMO_INTEVITY = {
  type: "감성 모던 무드메이커",
  scores: { 공간감각: 82, 심미성: 91, 실용성: 65, 가족지향: 73, 트렌드: 88 },
  style: "모던 미니멀",
  priority: ["거실", "주방", "침실", "서재", "욕실"],
};

export function formatWon(amount: number): string {
  if (amount >= 100000000) return `${(amount / 100000000).toFixed(1)}억원`;
  return `${Math.round(amount / 10000).toLocaleString()}만원`;
}

// ── 범위 위치별 스타일 (골드/블랙 디자인 시스템) ──
export function getPositionStyle(position: RangePosition) {
  switch (position) {
    case "within": return { bg: "bg-[#C9A96E]/5", text: "text-[#1A1A1A]/50", border: "border-[#C9A96E]/10", bar: "bg-[#C9A96E]", label: "범위 내" };
    case "upper": return { bg: "bg-amber-50/60", text: "text-amber-700", border: "border-amber-200", bar: "bg-amber-500", label: "범위 상단" };
    case "above": return { bg: "bg-[#1A1A1A]/[0.06]", text: "text-[#1A1A1A]/80", border: "border-[#1A1A1A]/15", bar: "bg-[#1A1A1A]/60", label: "범위 초과" };
    case "below": return { bg: "bg-blue-50/60", text: "text-blue-600", border: "border-blue-200", bar: "bg-blue-400", label: "범위 하단" };
    default: return { bg: "bg-[#C9A96E]/5", text: "text-[#1A1A1A]/50", border: "border-[#C9A96E]/10", bar: "bg-[#C9A96E]", label: "—" };
  }
}

// ── Legacy (홈페이지 호환) ──
export function getStatusColor(status: string) {
  switch (status) {
    case "PASS": return { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", bar: "bg-emerald-500" };
    case "WARN": return { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", bar: "bg-amber-500" };
    case "BLOCK": return { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", bar: "bg-red-500" };
    default: return { bg: "bg-black/[0.03]", text: "text-black/40", border: "border-black/5", bar: "bg-black/20" };
  }
}
