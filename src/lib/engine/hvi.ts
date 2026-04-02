// HVI (Home Value Index) / ROI / LII 엔진
// 기존 interibot_v16cs HVI 2.1 / ROI 2.1 / LII 참고

import type { ExtractedQuote, HviResult } from "@/types";

// 공정별 집값 상승 기여율 (ROI %)
const PROCESS_ROI: Record<string, { min: number; max: number }> = {
  "타일공사": { min: 60, max: 70 },
  "설비공사": { min: 55, max: 65 },
  "주방공사": { min: 70, max: 80 },
  "목공사": { min: 50, max: 60 },
  "바닥공사": { min: 40, max: 55 },
  "전기공사": { min: 45, max: 55 },
  "창호공사": { min: 55, max: 70 },
  "도배공사": { min: 30, max: 40 },
  "도장공사": { min: 25, max: 35 },
  "도어공사": { min: 35, max: 45 },
  "가구공사": { min: 40, max: 55 },
  "조명공사": { min: 35, max: 50 },
  "철거공사": { min: 10, max: 15 },
  "필름공사": { min: 20, max: 30 },
  "도기공사": { min: 50, max: 60 },
  "수전공사": { min: 45, max: 55 },
  "확장공사": { min: 60, max: 75 },
  "기타공사": { min: 15, max: 25 },
};

// 생활 개선 지수 가중치
const LII_WEIGHTS: Record<string, number> = {
  "타일공사": 0.12,
  "설비공사": 0.10,
  "목공사": 0.08,
  "바닥공사": 0.10,
  "전기공사": 0.08,
  "창호공사": 0.10,
  "도배공사": 0.08,
  "도장공사": 0.05,
  "도어공사": 0.06,
  "가구공사": 0.08,
  "조명공사": 0.07,
  "철거공사": 0.02,
  "필름공사": 0.03,
  "도기공사": 0.05,
  "수전공사": 0.05,
  "확장공사": 0.08,
  "기타공사": 0.02,
};

export function calculateHVI(
  quote: ExtractedQuote,
  areaPy: number
): HviResult {
  const totalCost = quote.totalAmount;

  // 공정별 ROI 계산
  const processRoi = quote.items.map((item) => {
    const roiRange = PROCESS_ROI[item.processName] || { min: 20, max: 30 };
    const avgRoi = (roiRange.min + roiRange.max) / 2;
    return {
      processName: item.processName,
      roi: avgRoi,
      amount: item.amount,
      valueAdd: Math.round(item.amount * (avgRoi / 100)),
    };
  });

  // 총 HVI (예상 집값 상승액)
  const hvi = processRoi.reduce((sum, p) => sum + p.valueAdd, 0);

  // 총 ROI
  const roi = totalCost > 0 ? Math.round((hvi / totalCost) * 100) : 0;

  // LII (생활 개선 지수) — 0~100
  let liiRaw = 0;
  for (const item of quote.items) {
    const weight = LII_WEIGHTS[item.processName] || 0.02;
    // 금액이 평균 이상이면 더 높은 점수
    const amountScore = Math.min(100, (item.amount / (areaPy * 100000)) * 100);
    liiRaw += weight * amountScore;
  }
  const lii = Math.min(100, Math.round(liiRaw));

  return {
    hvi,
    roi,
    lii,
    processRoi: processRoi
      .map((p) => ({
        processName: p.processName,
        roi: p.roi,
        amount: p.amount,
      }))
      .sort((a, b) => b.roi - a.roi),
  };
}
