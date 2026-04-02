// 추출된 견적서/도면 데이터 품질 검증
import { STANDARD_PROCESSES } from "@/types";
import type { ExtractedQuote } from "@/types";

export interface ValidationResult {
  isValid: boolean;
  score: number; // 0~100
  warnings: string[];
  errors: string[];
}

export function validateExtractedQuote(quote: ExtractedQuote): ValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  let score = 100;

  // 1. 항목이 있는지
  if (!quote.items || quote.items.length === 0) {
    errors.push("추출된 공정 항목이 없습니다.");
    return { isValid: false, score: 0, warnings, errors };
  }

  // 2. 총액 일치 여부 (±10% 허용)
  const itemsTotal = quote.items.reduce((sum, i) => sum + i.amount, 0);
  if (quote.totalAmount > 0) {
    const diff = Math.abs(itemsTotal - quote.totalAmount) / quote.totalAmount;
    if (diff > 0.1) {
      warnings.push(
        `항목 합계(${formatWon(itemsTotal)})와 총액(${formatWon(quote.totalAmount)})이 10% 이상 차이납니다.`
      );
      score -= 15;
    }
  }

  // 3. 공정명 표준화 검사
  for (const item of quote.items) {
    if (!STANDARD_PROCESSES.includes(item.processName as typeof STANDARD_PROCESSES[number])) {
      warnings.push(`비표준 공정명: ${item.processName}`);
      score -= 5;
    }
  }

  // 4. 금액 범위 합리성 (음수, 0원, 1억 이상)
  for (const item of quote.items) {
    if (item.amount <= 0) {
      warnings.push(`${item.processName}: 금액이 0 이하입니다.`);
      score -= 10;
    }
    if (item.amount > 100000000) {
      warnings.push(`${item.processName}: 금액이 1억원을 초과합니다.`);
      score -= 5;
    }
  }

  // 5. 중복 공정 검사
  const processNames = quote.items.map((i) => i.processName);
  const duplicates = processNames.filter(
    (name, idx) => processNames.indexOf(name) !== idx
  );
  if (duplicates.length > 0) {
    warnings.push(`중복 공정: ${[...new Set(duplicates)].join(", ")}`);
    score -= 5;
  }

  // 6. 최소 공정 수 (올수리 기준 5개 이상)
  if (quote.items.length < 3) {
    warnings.push("추출된 공정이 3개 미만입니다. OCR 정확도를 확인하세요.");
    score -= 10;
  }

  return {
    isValid: errors.length === 0 && score >= 50,
    score: Math.max(0, score),
    warnings,
    errors,
  };
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
    // 평수와 전용면적 정합성 체크
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
  };
}

function formatWon(amount: number) {
  return `${Math.round(amount / 10000).toLocaleString()}만원`;
}
