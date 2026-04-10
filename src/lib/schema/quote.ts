import { z } from "zod";

export const QuoteItemSchema = z.object({
  processName: z.string().min(1, "공정명은 필수입니다"),
  amount: z.number().min(0, "금액은 0 이상이어야 합니다"),
  materialName: z.string().optional(),
  quantity: z.number().optional(),
  unitPrice: z.number().optional(),
});

export const ExtractedQuoteSchema = z.object({
  items: z.array(QuoteItemSchema).min(1, "최소 1개 이상의 공정 항목이 필요합니다"),
  totalAmount: z.number().min(0, "총액은 0 이상이어야 합니다"),
  apartmentName: z.string().optional(),
  area: z.number().optional(),
});

export type QuoteItemInput = z.infer<typeof QuoteItemSchema>;
export type ExtractedQuoteInput = z.infer<typeof ExtractedQuoteSchema>;
