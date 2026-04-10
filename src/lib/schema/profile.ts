import { z } from "zod";

const score = z.number().min(0).max(100);

export const ProfileScoreSchema = z.object({
  T01_space: score,
  T02_sensitivity: score,
  T03_noise: score,
  T04_cleaning: score,
  T05_organization: score,
  T06_family: score,
  T07_health: score,
  T08_budget: score,
  T09_color: score,
  T10_lighting: score,
  T11_purpose: score,
  T12_discomfort: score,
  T13_movement: score,
  T14_sleep: score,
  T15_hobby: score,
});

export const STYLE_TYPES = [
  "모던",
  "내추럴",
  "클래식",
  "미니멀",
  "스칸디",
  "빈티지",
] as const;

export const StyleMatchSchema = z.object({
  primaryStyle: z.enum(STYLE_TYPES),
  secondaryStyle: z.enum(STYLE_TYPES).optional(),
  recommendedProcesses: z.array(z.string()),
});

export type ProfileScoreInput = z.infer<typeof ProfileScoreSchema>;
export type StyleMatchInput = z.infer<typeof StyleMatchSchema>;
