// 공정별 합리적 금액 범위 (32평 기준, 원 단위)
// DB v4_market_price_ranges 보완용 하드코딩 fallback

const BASE_PY = 32;

const RANGES_32PY: Record<string, { min: number; max: number }> = {
  철거공사: { min: 1_500_000, max: 8_000_000 },
  목공사:   { min: 3_000_000, max: 15_000_000 },
  전기공사: { min: 1_000_000, max: 8_000_000 },
  설비공사: { min: 2_000_000, max: 12_000_000 },
  타일공사: { min: 3_000_000, max: 12_000_000 },
  도장공사: { min: 1_000_000, max: 6_000_000 },
  도배공사: { min: 1_000_000, max: 6_000_000 },
  바닥공사: { min: 1_500_000, max: 8_000_000 },
  필름공사: { min: 500_000, max: 4_000_000 },
  창호공사: { min: 2_000_000, max: 15_000_000 },
  도어공사: { min: 1_000_000, max: 8_000_000 },
  도기공사: { min: 500_000, max: 5_000_000 },
  수전공사: { min: 300_000, max: 3_000_000 },
  가구공사: { min: 2_000_000, max: 20_000_000 },
  확장공사: { min: 3_000_000, max: 15_000_000 },
  조명공사: { min: 500_000, max: 5_000_000 },
  기타공사: { min: 500_000, max: 10_000_000 },
};

// 일반적인 범위 (공정명 불명 시)
const GENERAL_RANGE = { min: 100_000, max: 30_000_000 };

// 평당 총 비용 합리적 범위 (원/평)
export const PER_PYEONG_RANGE = { min: 300_000, max: 2_000_000 };

function getScaledRange(processName: string, areaPy: number) {
  const base = RANGES_32PY[processName] || GENERAL_RANGE;
  const scale = areaPy / BASE_PY;
  return {
    min: Math.round(base.min * scale),
    max: Math.round(base.max * scale),
  };
}

/**
 * 금액 단위 추론 및 보정
 * 범위 밖이면 ×10,000(만원) 또는 ×1,000(천원) 시도
 */
export function inferAmountUnit(
  processName: string,
  amount: number,
  areaPy: number = 32,
): { corrected: number; correction: "man_won" | "cheon_won" | null; confidence: "high" | "medium" | "low" } {
  const range = getScaledRange(processName, areaPy);

  // 이미 범위 내
  if (amount >= range.min && amount <= range.max) {
    return { corrected: amount, correction: null, confidence: "high" };
  }

  // 원본 금액이 너무 작으면(100 미만) garbage OCR일 수 있음 — 보정하지 않음
  if (amount < 100) {
    return { corrected: amount, correction: null, confidence: "low" };
  }

  // 만원 단위로 추정 (원본이 100~99,999 범위일 때만)
  const asManWon = amount * 10_000;
  if (amount >= 100 && amount < 100_000 && asManWon >= range.min && asManWon <= range.max) {
    return { corrected: asManWon, correction: "man_won", confidence: "high" };
  }

  // 천원 단위로 추정 (원본이 1,000~999,999 범위일 때만)
  const asCheonWon = amount * 1_000;
  if (amount >= 1_000 && amount < 1_000_000 && asCheonWon >= range.min && asCheonWon <= range.max) {
    return { corrected: asCheonWon, correction: "cheon_won", confidence: "medium" };
  }

  // 보정 불가 — 원본 유지
  return { corrected: amount, correction: null, confidence: "low" };
}

/**
 * 총액 교차 검증
 * 항목 합계 vs 총액 비교 + 평당 단가 체크
 */
export function crossValidateTotal(
  itemsSum: number,
  totalAmount: number,
  areaPy: number,
): { isConsistent: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // 항목합 vs 총액 비교
  if (totalAmount > 0) {
    const diff = Math.abs(itemsSum - totalAmount);
    const pct = diff / Math.max(itemsSum, totalAmount);

    if (pct > 0.5) {
      // 50% 이상 차이 → 단위 불일치 가능성
      const asManWon = totalAmount * 10_000;
      if (Math.abs(itemsSum - asManWon) / itemsSum < 0.1) {
        warnings.push(`총액이 만원 단위로 보입니다 (${totalAmount.toLocaleString()} → ${asManWon.toLocaleString()}원)`);
      } else {
        warnings.push(`항목 합계(${Math.round(itemsSum / 10000).toLocaleString()}만원)와 총액(${Math.round(totalAmount / 10000).toLocaleString()}만원)이 크게 차이납니다`);
      }
    } else if (pct > 0.1) {
      warnings.push(`항목 합계와 총액이 ${Math.round(pct * 100)}% 차이납니다`);
    }
  }

  // 평당 단가 체크
  if (!areaPy || areaPy <= 0) return { isConsistent: warnings.length === 0, warnings };
  const perPy = (itemsSum || totalAmount) / areaPy;
  if (perPy < PER_PYEONG_RANGE.min) {
    warnings.push(`평당 비용(${Math.round(perPy / 10000)}만원)이 일반 범위(30~200만원) 미만입니다 — 부분 시공이거나 단위를 확인하세요`);
  } else if (perPy > PER_PYEONG_RANGE.max) {
    warnings.push(`평당 비용(${Math.round(perPy / 10000)}만원)이 일반 범위(30~200만원)를 초과합니다 — 프리미엄 시공이거나 단위를 확인하세요`);
  }

  return { isConsistent: warnings.length === 0, warnings };
}
