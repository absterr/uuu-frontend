export const MOCK_RISK_SCORE = {
  total_analyses: 24,
  overall_score: 62.5,
  overall_level: "MEDIUM" as const,
  breakdown: {
    HIGH: 6,
    MEDIUM: 9,
    LOW: 9,
  },
  percentage: {
    HIGH: 25,
    MEDIUM: 37.5,
    LOW: 37.5,
  },
  message: "Your codebase has a moderate overall risk profile.",
};
