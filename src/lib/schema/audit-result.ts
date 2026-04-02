import { z } from "zod";

export const AuditItemSchema = z.object({
  processName: z.string(),
  userAmount: z.number(),
  p25: z.number(),
  p50: z.number(),
  p75: z.number(),
  percentile: z.number(),
  verdict: z.enum(["PASS", "WARN", "BLOCK"]),
  source: z.string(),
});

export const AuditReportSchema = z.object({
  overallVerdict: z.enum(["PASS", "WARN", "BLOCK"]),
  items: z.array(AuditItemSchema),
  missingProcesses: z.array(z.string()),
  totalAmount: z.number(),
  benchmarkP50Total: z.number(),
  source: z.string(),
});

export type AuditItemInput = z.infer<typeof AuditItemSchema>;
export type AuditReportInput = z.infer<typeof AuditReportSchema>;
