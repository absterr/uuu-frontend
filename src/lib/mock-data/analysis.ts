import type { AnalyzeData, RiskLevel } from "../analyse-code";

export interface BulkFile {
  id: string;
  filename: string;
  lines: number;
  content: string;
}

export interface BulkResultItem {
  id: string;
  filename: string;
  status: "success" | "error";
  risk_level?: RiskLevel;
  summary?: string;
  risks?: string[];
  error?: string;
  analysisId?: number;
}

export const MOCK_SINGLE_CODE = `000100 IDENTIFICATION DIVISION.
000200 PROGRAM-ID. PAYROLL01.
000300 ENVIRONMENT DIVISION.
000400 DATA DIVISION.
000500 WORKING-STORAGE SECTION.
000600 01  WS-EMP-ID       PIC 9(5).
000700 01  WS-HOURS        PIC 9(3).
000800 01  WS-RATE         PIC 9(3)V99 VALUE 25.50.
000900 01  WS-GROSS-PAY    PIC 9(5)V99.
001000 PROCEDURE DIVISION.
001100 MAIN-PROCEDURE.
001200     COMPUTE WS-GROSS-PAY = WS-HOURS * WS-RATE.
001300     DISPLAY "GROSS PAY: " WS-GROSS-PAY.
001400     STOP RUN.`;

export const MOCK_SINGLE_RESULT: AnalyzeData = {
  risk_level: "HIGH",
  summary:
    "Calculates employee pay including overtime and tax withholding across three divisions.",
  explanation:
    "The program processes employee timecards, calculates gross pay with overtime multipliers, and subtracts federal withholding tax before updating output balance files.",
  risks: [
    "Hard-coded tax bracket values not externalized to table or config",
    "No bounds check on overtime hour input values",
  ],
  dependencies: ["TAXTABLE", "EMPMSTR"],
  data_flows: [],
  python_code: `def calculate_payroll(hours: float, rate: float = 25.50) -> float:
    return hours * rate

if __name__ == "__main__":
    gross_pay = calculate_payroll(40.0)
    print(f"GROSS PAY: {gross_pay:.2f}")`,
};

export const MOCK_BULK_FILES: BulkFile[] = [
  {
    id: "f-1",
    filename: "PAYROLL01.CBL",
    lines: 214,
    content: MOCK_SINGLE_CODE,
  },
  {
    id: "f-2",
    filename: "BATCHJOB.CBL",
    lines: 88,
    content: "000100 IDENTIFICATION DIVISION.\n000200 PROGRAM-ID. BATCHJOB.",
  },
  {
    id: "f-3",
    filename: "LEDGER-UPD.CBL",
    lines: 342,
    content: "000100 IDENTIFICATION DIVISION.\n000200 PROGRAM-ID. LEDGERUPD.",
  },
  {
    id: "f-4",
    filename: "bad-input.cbl",
    lines: 12,
    content: "INVALID COBOL CONTENT HERE",
  },
];

export const MOCK_BULK_RESULTS: BulkResultItem[] = [
  {
    id: "f-1",
    filename: "PAYROLL01.CBL",
    status: "success",
    risk_level: "HIGH",
    analysisId: 101,
    summary:
      "Calculates employee pay including overtime and tax withholding across three divisions.",
    risks: [
      "Hard-coded tax bracket values not externalized",
      "No bounds check on overtime hour input",
    ],
  },
  {
    id: "f-2",
    filename: "BATCHJOB.CBL",
    status: "success",
    risk_level: "LOW",
    analysisId: 102,
    summary:
      "Nightly batch scheduler that triggers dependent job files in sequence.",
    risks: ["Sequential job chain has no failure rollback"],
  },
  {
    id: "f-3",
    filename: "LEDGER-UPD.CBL",
    status: "success",
    risk_level: "MEDIUM",
    analysisId: 103,
    summary: "Updates general ledger balances from transaction file entries.",
    risks: [
      "Uses GOTO-based control flow across 6 paragraphs",
      "No transaction-level validation before commit",
    ],
  },
  {
    id: "f-4",
    filename: "bad-input.cbl",
    status: "error",
    error: "Unable to parse: unexpected token at line 4",
  },
];
