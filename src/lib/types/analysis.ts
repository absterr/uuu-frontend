export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

export interface AnalyzeData {
  summary: string;
  explanation: string;
  python_code: string;
  risk_level: RiskLevel;
  risks: string[];
  dependencies?: string[];
  data_flows?: unknown[];
}

export interface AnalyzeResponse {
  id: string;
  user: string;
  data: AnalyzeData;
}

export interface BulkFile {
  id: string;
  filename: string;
  lines: number;
  content: string;
}

export interface BulkResult {
  filename: string;
  status: "success" | "error";
  data: AnalyzeData | null;
  error: string | null;
}

export interface BulkAnalyzeResponse {
  total: number;
  results: BulkResult[];
}
