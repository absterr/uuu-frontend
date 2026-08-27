export type ComplianceStandard = "SOX" | "GDPR" | "HIPAA" | "PCI";

export type ComplianceCheckStatus = "PASS" | "FAIL" | "REVIEW";

export type ComplianceStatus = "COMPLIANT" | "PARTIAL" | "NON-COMPLIANT";

export interface ComplianceReport {
  standard: ComplianceStandard;
  standard_name: string;
  description: string;
  analysis_id: number;
  summary: string;
  risk_level: "HIGH" | "MEDIUM" | "LOW";
  risks: string[];
  checks: {
    check: string;
    status: ComplianceCheckStatus;
  }[];
  passed_checks: number;
  total_checks: number;
  compliance_score: number;
  compliance_status: ComplianceStatus;
  status_message: string;
  generated_at: string;
  reviewed_by: string;
  disclaimer: string;
}

export const MOCK_COMPLIANCE_REPORTS: ComplianceReport[] = [
  {
    standard: "SOX",
    standard_name: "Sarbanes-Oxley Act",
    description: "Financial reporting and internal control requirements.",
    analysis_id: 101,
    summary:
      "Payroll processing contains controls relevant to financial reporting and employee compensation.",
    risk_level: "HIGH",
    risks: [
      "Hard-coded tax values are not externally controlled",
      "Input values lack bounds validation",
    ],
    checks: [
      { check: "Financial calculation controls", status: "PASS" },
      { check: "Input validation", status: "FAIL" },
      { check: "Audit trail controls", status: "REVIEW" },
      { check: "Configuration management", status: "FAIL" },
    ],
    passed_checks: 1,
    total_checks: 4,
    compliance_score: 25,
    compliance_status: "NON-COMPLIANT",
    status_message: "Several required controls require remediation.",
    generated_at: "2026-08-25T14:32:00Z",
    reviewed_by: "UUU Analysis Engine",
    disclaimer:
      "This report is an automated assessment and does not constitute legal advice.",
  },
  {
    standard: "PCI",
    standard_name: "PCI DSS",
    description: "Security requirements for payment card data environments.",
    analysis_id: 103,
    summary:
      "The analyzed ledger process contains controls that partially align with payment data security requirements.",
    risk_level: "MEDIUM",
    risks: ["Transaction validation is incomplete"],
    checks: [
      { check: "Input validation", status: "PASS" },
      { check: "Data protection", status: "REVIEW" },
      { check: "Access controls", status: "PASS" },
      { check: "Audit logging", status: "REVIEW" },
    ],
    passed_checks: 2,
    total_checks: 4,
    compliance_score: 50,
    compliance_status: "PARTIAL",
    status_message: "Some controls require further review.",
    generated_at: "2026-08-24T10:15:00Z",
    reviewed_by: "UUU Analysis Engine",
    disclaimer:
      "This report is an automated assessment and does not constitute legal advice.",
  },
  {
    standard: "HIPAA",
    standard_name: "HIPAA",
    description:
      "Privacy and security requirements for protected health information.",
    analysis_id: 102,
    summary:
      "The analyzed batch process shows limited exposure to protected health information.",
    risk_level: "LOW",
    risks: [],
    checks: [
      { check: "Data handling", status: "PASS" },
      { check: "Access controls", status: "PASS" },
      { check: "Audit controls", status: "PASS" },
    ],
    passed_checks: 3,
    total_checks: 3,
    compliance_score: 100,
    compliance_status: "COMPLIANT",
    status_message: "All evaluated controls passed.",
    generated_at: "2026-08-22T09:40:00Z",
    reviewed_by: "UUU Analysis Engine",
    disclaimer:
      "This report is an automated assessment and does not constitute legal advice.",
  },
];
