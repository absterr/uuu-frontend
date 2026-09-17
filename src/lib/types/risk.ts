import type { RiskLevel } from "./analysis";

export interface RiskScoreResponse {
  total_analyses: number;
  overall_score: number;
  overall_level: RiskLevel | "NONE";
  breakdown: Record<RiskLevel, number>;
  percentage: Record<RiskLevel, number>;
  message: string;
}
