// 추출된 견적서/도면 데이터 품질 검증 + 공정명 정규화 + 단위 보정
import { STANDARD_PROCESSES } from "@/types";
import type { ExtractedQuote, QuoteItem } from "@/types";
import { inferAmountUnit, crossValidateTotal } from "@/lib/data/amount-ranges";

export interface ValidationResult {
  isValid: boolean;
  score: number; // 0~100
  warnings: string[];
  errors: string[];
  corrections: string[];
  correctedQuote: ExtractedQuote;
}

// ── 공정명 별칭 테이블 (DB v4_process_mapping 보완용 하드코딩) ──
const PROCESS_ALIASES: Record<string, string> = {
  // 철거
  "해체공사": "철거공사", "해체": "철거공사", "철거": "철거공사",
  // 목공
  "목수": "목공사", "목재공사": "목공사", "목재": "목공사",
  // 전기
  "콘센트": "전기공사", "전기배선": "전기공사", "전기": "전기공사",
  // 설비
  "배관공사": "설비공사", "배관": "설비공사", "급배수공사": "설비공사", "급배수": "설비공사", "수도공사": "설비공사", "수도": "설비공사",
  // 타일
  "타일": "타일공사",
  // 도장
  "페인트공사": "도장공사", "페인트": "도장공사", "도장": "도장공사", "페인팅": "도장공사",
  // 도배
  "벽지공사": "도배공사", "벽지": "도배공사", "도배": "도배공사",
  // 바닥
  "마루공사": "바닥공사", "마루": "바닥공사", "장판공사": "바닥공사", "장판": "바닥공사", "바닥": "바닥공사",
  // 필름
  "필름": "필름공사", "시트지": "필름공사",
  // 창호
  "샤시공사": "창호공사", "샤시": "창호공사", "창호": "창호공사", "창문": "창호공사",
  // 도어
  "문짝공사": "도어공사", "문짝": "도어공사", "도어": "도어공사",
  // 도기
  "위생도기": "도기공사", "양변기": "도기공사", "도기": "도기공사",
  // 수전
  "수전": "수전공사", "수도꼭지": "수전공사",
  // 가구
  "가구": "가구공사", "싱크대": "가구공사", "주방가구": "가구공사", "주방": "가구공사",
  // 확장
  "확장": "확장공사", "발코니확장": "확장공사",
  // 조명
  "조명": "조명공사", "등기구": "조명공사",
  // 기타
  "준공청소": "기타공사", "방수공사": "기타공사", "방수": "기타공사", "부자재": "기타공사",
};

/**
 * 공정명을 17개 표준 공정명으로 정규화
 */
function normalizeProcessName(raw: string): string {
  // 이미 표준이면 그대로
  if ((STANDARD_PROCESSES as readonly string[]).includes(raw)) return raw;

  // 별칭 매핑
  const alias = PROCESS_ALIASES[raw];
  if (alias) return alias;

  // 부분 문자열 매칭 (예: "철거 및 해체" → "철거공사")
  for (const [key, value] of Object.entries(PROCESS_ALIASES)) {
    if (raw.includes(key)) return value;
  }

  // 표준 공정명 부분 매칭 (예: "목공사(추가)" → "목공사")
  for (const std of STANDARD_PROCESSES) {
    if (raw.includes(std.replace("공사", "")) || raw.includes(std)) return std;
  }

  return raw; // 정규화 실패 시 원본 유지
}

/**
 * 중복 공정 병합 (같은 공정명의 금액을 합산)
 */
function mergeDuplicates(items: QuoteItem[]): QuoteItem[] {
  const merged = new Map<string, QuoteItem>();
  for (const item of items) {
    const existing = merged.get(item.processName);
    if (existing) {
      existing.amount += item.amount;
    } else {
      merged.set(item.processName, { ...item });
    }
  }
  return Array.from(merged.values());
}

export function validateAndCorrectQuote(
  quote: ExtractedQuote,
  areaPy: number = 32,
): ValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  const corrections: string[] = [];
  let score = 100;

  // 0. 항목 존재 확인
  if (!quote.items || quote.items.length === 0) {
    errors.push("추출된 공정 항목이 없습니다.");
    return { isValid: false, score: 0, warnings, errors, corrections, correctedQuote: quote };
  }

  // 1. 공정명 정규화
  const normalizedItems: QuoteItem[] = quote.items.map((item) => {
    const normalized = normalizeProcessName(item.processName);
    if (normalized !== item.processName) {
      corrections.push(`${item.processName} → ${normalized}`);
    }
    return { ...item, processName: normalized };
  });

  // 2. 중복 공정 병합 (개별 자재 항목을 합산) ← 단위 보정보다 먼저!
  const mergedItems = mergeDuplicates(normalizedItems);
  if (mergedItems.length < normalizedItems.length) {
    const diff = normalizedItems.length - mergedItems.length;
    corrections.push(`중복 공정 ${diff}건 병합 (금액 합산)`);
  }

  // 3. 금액 단위 보정 (병합된 합산 금액으로 체크)
  const correctedItems: QuoteItem[] = mergedItems.map((item) => {
    const result = inferAmountUnit(item.processName, item.amount, areaPy);
    if (result.correction) {
      const unitLabel = result.correction === "man_won" ? "만원" : "천원";
      corrections.push(`${item.processName} 금액 ${item.amount.toLocaleString()} → ${result.corrected.toLocaleString()}원 (${unitLabel} 단위 보정)`);
    }
    if (result.confidence === "low") {
      warnings.push(`${item.processName}: 금액(${item.amount.toLocaleString()})이 일반적 범위를 벗어납니다`);
      score -= 5;
    }
    return { ...item, amount: result.corrected };
  });

  // 4. 비표준 공정명 검사
  for (const item of correctedItems) {
    if (!(STANDARD_PROCESSES as readonly string[]).includes(item.processName)) {
      warnings.push(`비표준 공정명: ${item.processName}`);
      score -= 5;
    }
  }

  // 5. 금액 합리성 (음수, 0원)
  for (const item of correctedItems) {
    if (item.amount <= 0) {
      warnings.push(`${item.processName}: 금액이 0 이하입니다`);
      score -= 10;
    }
  }

  // 6. 총액 교차 검증
  const itemsSum = correctedItems.reduce((s, i) => s + i.amount, 0);
  const totalValidation = crossValidateTotal(itemsSum, quote.totalAmount, areaPy);
  warnings.push(...totalValidation.warnings);
  if (!totalValidation.isConsistent) score -= 10;

  // 7. 최소 공정 수
  if (correctedItems.length < 3) {
    warnings.push("추출된 공정이 3개 미만입니다 — OCR 정확도를 확인하세요");
    score -= 10;
  }

  const correctedQuote: ExtractedQuote = {
    items: correctedItems,
    totalAmount: itemsSum > 0 ? itemsSum : quote.totalAmount,
    apartmentName: quote.apartmentName,
    area: quote.area,
  };

  return {
    isValid: errors.length === 0,
    score: Math.max(0, score),
    warnings,
    errors,
    corrections,
    correctedQuote,
  };
}

// ── Legacy export (기존 호환) ──
export function validateExtractedQuote(quote: ExtractedQuote): ValidationResult {
  return validateAndCorrectQuote(quote);
}

export function validateFloorplanData(data: {
  exclusiveArea?: number;
  areaPy?: number;
}): ValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  let score = 100;

  if (data.areaPy) {
    if (data.areaPy < 15 || data.areaPy > 60) {
      warnings.push(`평수(${data.areaPy}평)가 일반적 범위(15~60평)를 벗어납니다.`);
      score -= 20;
    }
  }

  if (data.exclusiveArea) {
    if (data.exclusiveArea < 33 || data.exclusiveArea > 200) {
      warnings.push(`전용면적(${data.exclusiveArea}㎡)이 일반적 범위를 벗어납니다.`);
      score -= 15;
    }
    if (data.areaPy) {
      const expectedPy = Math.round(data.exclusiveArea / 3.3058);
      if (Math.abs(expectedPy - data.areaPy) > 3) {
        warnings.push("전용면적과 평수가 일치하지 않습니다.");
        score -= 10;
      }
    }
  }

  return {
    isValid: errors.length === 0 && score >= 60,
    score: Math.max(0, score),
    warnings,
    errors,
    corrections: [],
    correctedQuote: { items: [], totalAmount: 0 },
  };
}
