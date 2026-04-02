export type { Database, Json } from "./database.types";

// 17개 표준 공정명
export const STANDARD_PROCESSES = [
  "철거공사",
  "목공사",
  "전기공사",
  "설비공사",
  "타일공사",
  "도장공사",
  "도배공사",
  "바닥공사",
  "필름공사",
  "창호공사",
  "도어공사",
  "도기공사",
  "수전공사",
  "가구공사",
  "확장공사",
  "조명공사",
  "기타공사",
] as const;

export type ProcessName = (typeof STANDARD_PROCESSES)[number];

export type Verdict = "PASS" | "WARN" | "BLOCK";

export interface QuoteItem {
  processName: string;
  amount: number;
  materialName?: string;
  quantity?: number;
  unitPrice?: number;
}

export interface ExtractedQuote {
  items: QuoteItem[];
  totalAmount: number;
  apartmentName?: string;
  area?: number;
}

export interface AuditItem {
  processName: string;
  userAmount: number;
  p25: number;
  p50: number;
  p75: number;
  percentile: number;
  verdict: Verdict;
  source: string;
}

export interface AuditReport {
  overallVerdict: Verdict;
  items: AuditItem[];
  missingProcesses: string[];
  totalAmount: number;
  benchmarkP50Total: number;
  source: string;
}

export interface ProfileScore {
  T01_space: number;        // 공간감각
  T02_sensitivity: number;  // 시각민감도
  T03_cleaning: number;     // 청각민감도 (방음)
  T04_organization: number; // 청소성향
  T05_organization: number; // 정리정돈습관
  T06_family: number;       // 가족구성
  T07_health: number;       // 건강요소
  T08_budget: number;       // 예산감각
  T09_color: number;        // 색감취향
  T10_lighting: number;     // 조명취향
  T11_purpose: number;      // 집사용목적
  T12_discomfort: number;   // 불편요소
  T13_movement: number;     // 활동동선
  T14_sleep: number;        // 수면패턴
  T15_hobby: number;        // 취미·라이프스타일
}

export type StyleType =
  | "모던"
  | "내추럴"
  | "클래식"
  | "미니멀"
  | "스칸디"
  | "빈티지";

export interface StyleMatch {
  primaryStyle: StyleType;
  secondaryStyle?: StyleType;
  recommendedProcesses: string[];
}

export interface HviResult {
  hvi: number;
  roi: number;
  lii: number;
  processRoi: { processName: string; roi: number; amount: number }[];
}
