export const DEMO_AUDIT_REPORT = {
  apartment: "래미안 32평",
  region: "서울",
  area_py: 32,
  total_amount: 52000000,
  position_pct: 68,
  processes: [
    { name: "목공사", amount: 8200000, percentile: 55, status: "PASS" as const },
    { name: "타일공사", amount: 6500000, percentile: 72, status: "PASS" as const },
    { name: "전기공사", amount: 3800000, percentile: 91, status: "WARN" as const },
    { name: "설비공사", amount: 4200000, percentile: 58, status: "PASS" as const },
    { name: "도배공사", amount: 3100000, percentile: 83, status: "WARN" as const },
    { name: "도장공사", amount: 2800000, percentile: 45, status: "PASS" as const },
    { name: "바닥공사", amount: 3200000, percentile: 62, status: "PASS" as const },
  ],
  warnings: [
    "방수공사가 견적에 포함되지 않았습니다",
    "전기공사가 시장 상위 91% 수준입니다 (확인 필요)",
  ],
  data_source: "시장 450건 기준",
};

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

export function getStatusColor(status: string) {
  switch (status) {
    case "PASS": return { bg: "bg-black/[0.03]", text: "text-black/40", border: "border-black/5", bar: "bg-[#C9A96E]" };
    case "WARN": return { bg: "bg-[#C9A96E]/10", text: "text-[#C9A96E]", border: "border-[#C9A96E]/20", bar: "bg-[#C9A96E]" };
    case "BLOCK": return { bg: "bg-black/[0.06]", text: "text-black/70", border: "border-black/10", bar: "bg-black/60" };
    default: return { bg: "bg-black/[0.03]", text: "text-black/40", border: "border-black/5", bar: "bg-black/20" };
  }
}
