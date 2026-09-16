import type { RiskLevel } from "./analysis";

export interface HistoryItem {
  id: string;
  user_id: string;
  cobol_code: string;
  summary: string;
  explanation: string;
  python_code: string;
  risk_level: RiskLevel;
  risks: string[];
  created_at: string;
}

export interface HistoryResponse {
  total: number;
  history: HistoryItem[];
}
