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
  status: "success";
  id: number;
  user: string;
  data: AnalyzeData;
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function analyzeCode(code: string): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "Analysis failed. Try again.");
  }

  return response.json();
}
