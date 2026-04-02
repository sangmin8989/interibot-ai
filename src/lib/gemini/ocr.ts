import { generateText } from "ai";
import { geminiFlash } from "./client";
import { ExtractedQuoteSchema } from "@/lib/schema/quote";
import { OCR_QUOTE_PROMPT, OCR_FLOORPLAN_PROMPT } from "@/lib/prompts/ocr";
import type { ExtractedQuote } from "@/types";

function extractJSON(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/) || text.match(/(\{[\s\S]*\})/);
  return match ? match[1].trim() : text.trim();
}

function makeDataUrl(base64: string, mimeType: string): string {
  return `data:${mimeType};base64,${base64}`;
}

export async function extractQuoteFromImage(
  imageBase64: string,
  mimeType: string
): Promise<ExtractedQuote> {
  const { text } = await generateText({
    model: geminiFlash,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: OCR_QUOTE_PROMPT },
          { type: "image", image: new URL(makeDataUrl(imageBase64, mimeType)) },
        ],
      },
    ],
  });

  const parsed = JSON.parse(extractJSON(text));
  return ExtractedQuoteSchema.parse(parsed);
}

export async function extractQuoteFromText(textContent: string): Promise<ExtractedQuote> {
  const { text } = await generateText({
    model: geminiFlash,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `${OCR_QUOTE_PROMPT}\n\n--- 견적서 텍스트 ---\n${textContent}`,
          },
        ],
      },
    ],
  });

  const parsed = JSON.parse(extractJSON(text));
  return ExtractedQuoteSchema.parse(parsed);
}

export async function extractFloorplanData(
  imageBase64: string,
  mimeType: string
) {
  const { text } = await generateText({
    model: geminiFlash,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: OCR_FLOORPLAN_PROMPT },
          { type: "image", image: new URL(makeDataUrl(imageBase64, mimeType)) },
        ],
      },
    ],
  });

  return JSON.parse(extractJSON(text));
}

export async function extractQuoteFromExcel(
  rows: Record<string, unknown>[]
): Promise<ExtractedQuote> {
  const textContent = rows
    .map((row) => Object.values(row).join(" | "))
    .join("\n");

  return extractQuoteFromText(textContent);
}
