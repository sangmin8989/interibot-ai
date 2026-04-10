import { generateText } from "ai";
import { z } from "zod";
import { geminiFlash } from "./client";
import { ExtractedQuoteSchema } from "@/lib/schema/quote";
import { OCR_QUOTE_PROMPT, OCR_FLOORPLAN_PROMPT } from "@/lib/prompts/ocr";
import type { ExtractedQuote } from "@/types";

const FloorplanSchema = z.object({
  exclusiveArea: z.number().optional(),
  areaPy: z.number().optional(),
  rooms: z.array(z.object({ name: z.string(), area: z.number() })).optional(),
  balconyExpanded: z.boolean().optional(),
  notes: z.string().optional(),
});

export type FloorplanData = z.infer<typeof FloorplanSchema>;

// ── JSON 파싱 유틸 ──

function extractJSON(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end > start) return text.slice(start, end + 1);
  return text.trim();
}

function safeJsonParse(text: string): unknown {
  const jsonStr = extractJSON(text);
  try {
    return JSON.parse(jsonStr);
  } catch {
    try {
      return JSON.parse(
        jsonStr.replace(/,\s*}/g, "}").replace(/,\s*\]/g, "]").replace(/[\x00-\x1f]/g, " ")
      );
    } catch {
      console.error("[OCR] JSON 파싱 실패:", text.slice(0, 500));
      throw new Error("AI 응답에서 유효한 JSON을 추출하지 못했습니다. 다시 시도해 주세요.");
    }
  }
}

// ── 견적서 응답 파싱 (관대한 처리) ──

function parseQuoteResponse(rawText: string): ExtractedQuote {
  const parsed = safeJsonParse(rawText) as Record<string, unknown>;

  // Gemini가 amount를 문자열로 줄 수 있음 ("820만원", "1,500,000")
  const rawItems = Array.isArray(parsed.items) ? parsed.items : [];
  const items = rawItems
    .map((item: Record<string, unknown>) => {
      const amount = parseKoreanAmount(item.amount);
      if (!item.processName || amount <= 0) return null;
      return {
        processName: String(item.processName),
        amount,
        materialName: item.materialName ? String(item.materialName) : undefined,
        quantity: typeof item.quantity === "number" ? item.quantity : undefined,
        unitPrice: typeof item.unitPrice === "number" ? item.unitPrice : undefined,
      };
    })
    .filter(Boolean) as ExtractedQuote["items"];

  if (items.length === 0) {
    throw new Error("견적서에서 공정 항목을 추출하지 못했습니다. 파일을 확인해 주세요.");
  }

  const totalAmount = parseKoreanAmount(parsed.totalAmount) || items.reduce((s, i) => s + i.amount, 0);

  return {
    items,
    totalAmount,
    apartmentName: parsed.apartmentName ? String(parsed.apartmentName) : undefined,
    area: typeof parsed.area === "number" ? parsed.area : undefined,
  };
}

/** 한국어 금액 문자열 → 숫자 변환 */
function parseKoreanAmount(val: unknown): number {
  if (typeof val === "number") return val;
  if (typeof val !== "string") return 0;
  const s = val.replace(/\s/g, "");
  // "820만원" → 8200000
  const manMatch = s.match(/^([\d,.]+)\s*만\s*원?$/);
  if (manMatch) return parseFloat(manMatch[1].replace(/,/g, "")) * 10000;
  // "1,500천원" → 1500000
  const cheonMatch = s.match(/^([\d,.]+)\s*천\s*원?$/);
  if (cheonMatch) return parseFloat(cheonMatch[1].replace(/,/g, "")) * 1000;
  // "3,200,000원" or "3200000"
  return parseFloat(s.replace(/[^\d.]/g, "")) || 0;
}

// ── 견적서 추출: 이미지 (JPG/PNG) ──

export async function extractQuoteFromImage(
  base64: string,
  mediaType: string,
): Promise<ExtractedQuote> {
  const { text } = await generateText({
    model: geminiFlash,
    messages: [{
      role: "user",
      content: [
        { type: "text", text: OCR_QUOTE_PROMPT },
        { type: "image", image: Buffer.from(base64, "base64"), mediaType },
      ],
    }],
  });
  return parseQuoteResponse(text);
}

// ── 견적서 추출: PDF ──

export async function extractQuoteFromPdf(
  base64: string,
): Promise<ExtractedQuote> {
  const { text } = await generateText({
    model: geminiFlash,
    messages: [{
      role: "user",
      content: [
        { type: "text", text: OCR_QUOTE_PROMPT },
        { type: "file", data: Buffer.from(base64, "base64"), mediaType: "application/pdf" },
      ],
    }],
  });
  return parseQuoteResponse(text);
}

// ── 견적서 추출: 텍스트 (Excel 변환 등) ──

export async function extractQuoteFromText(
  textContent: string,
): Promise<ExtractedQuote> {
  const { text } = await generateText({
    model: geminiFlash,
    messages: [{
      role: "user",
      content: `${OCR_QUOTE_PROMPT}\n\n--- 견적서 텍스트 ---\n${textContent}`,
    }],
  });
  return parseQuoteResponse(text);
}

// ── 도면 추출 ──

export async function extractFloorplanData(
  base64: string,
  mediaType: string,
): Promise<FloorplanData> {
  const { text } = await generateText({
    model: geminiFlash,
    messages: [{
      role: "user",
      content: [
        { type: "text", text: OCR_FLOORPLAN_PROMPT },
        { type: "image", image: Buffer.from(base64, "base64"), mediaType },
      ],
    }],
  });
  return FloorplanSchema.parse(safeJsonParse(text));
}

// ── Excel → 텍스트 → 추출 ──

export async function extractQuoteFromExcel(
  rows: Record<string, unknown>[],
): Promise<ExtractedQuote> {
  const textContent = rows.map((row) => Object.values(row).join(" | ")).join("\n");
  return extractQuoteFromText(textContent);
}
