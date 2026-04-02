import { z } from "zod";

export const QuoteItemSchema = z.object({
  processName: z.string(),
  amount: z.number(),
  materialName: z.string().optional(),
  quantity: z.number().optional(),
  unitPrice: z.number().optional(),
});

export const ExtractedQuoteSchema = z.object({
  items: z.array(QuoteItemSchema),
  totalAmount: z.number(),
  apartmentName: z.string().optional(),
  area: z.number().optional(),
});

export type QuoteItemInput = z.infer<typeof QuoteItemSchema>;
export type ExtractedQuoteInput = z.infer<typeof ExtractedQuoteSchema>;
