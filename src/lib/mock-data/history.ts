import type { RiskLevel } from "../analyse-code";

export interface HistoryItem {
  id: number;
  user_id: number | null;
  cobol_code: string;
  summary: string;
  explanation: string;
  python_code: string;
  risk_level: RiskLevel;
  risks: string[];
  created_at: string;
}

export const MOCK_HISTORY: HistoryItem[] = [
  {
    id: 101,
    user_id: 1,
    cobol_code:
      "000100 IDENTIFICATION DIVISION.\n000200 PROGRAM-ID. PAYROLL01.",
    summary:
      "Calculates employee pay including overtime and tax withholding across three divisions.",
    explanation:
      "Processes employee timecards, calculates gross pay, and applies withholding.",
    python_code: `def calculate_payroll(hours: float, rate: float = 25.50) -> float:
    return hours * rate`,
    risk_level: "HIGH",
    risks: [
      "Hard-coded tax bracket values not externalized",
      "No bounds check on overtime hour input",
    ],
    created_at: "2026-08-27T09:42:00Z",
  },
  {
    id: 102,
    user_id: 1,
    cobol_code: "000100 IDENTIFICATION DIVISION.\n000200 PROGRAM-ID. BATCHJOB.",
    summary:
      "Nightly batch scheduler that triggers dependent job files in sequence.",
    explanation:
      "Executes loading, processing, and output operations in sequence.",
    python_code: `def run_batch():
    load_data()
    process_data()
    write_output()`,
    risk_level: "LOW",
    risks: ["Sequential job chain has no failure rollback"],
    created_at: "2026-08-26T17:15:00Z",
  },
  {
    id: 103,
    user_id: 1,
    cobol_code:
      "000100 IDENTIFICATION DIVISION.\n000200 PROGRAM-ID. LEDGERUPD.",
    summary: "Updates general ledger balances from transaction file entries.",
    explanation:
      "Reads transaction records and applies amounts to account balances.",
    python_code: `def update_ledger(amount: float, balance: float) -> float:
    return balance + amount`,
    risk_level: "MEDIUM",
    risks: [
      "Uses GOTO-based control flow",
      "No transaction-level validation before commit",
    ],
    created_at: "2026-08-25T12:30:00Z",
  },
  {
    id: 104,
    user_id: 1,
    cobol_code:
      "000100 IDENTIFICATION DIVISION.\n000200 PROGRAM-ID. CUSTOMER01.",
    summary: "Displays a customer record and terminates.",
    explanation:
      "Performs a simple output operation without external processing.",
    python_code: `def display_customer():
    print("CUSTOMER RECORD")`,
    risk_level: "LOW",
    risks: [],
    created_at: "2026-08-24T08:05:00Z",
  },
];
