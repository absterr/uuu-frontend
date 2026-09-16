export type ComplianceStandard = "SOX" | "GDPR" | "HIPAA" | "PCI";

export type ComplianceCheckStatus = "PASS" | "FAIL" | "REVIEW";

export type ComplianceStatus = "COMPLIANT" | "PARTIAL" | "NON-COMPLIANT";

export interface ComplianceStandardOption {
  code: ComplianceStandard;
  name: string;
  description: string;
}

export interface ComplianceCheck {
  check: string;
  status: ComplianceCheckStatus;
}

export interface ComplianceReport {
  standard: ComplianceStandard;
  standard_name: string;
  description: string;
  analysis_id: string;
  summary: string;
  risk_level: "HIGH" | "MEDIUM" | "LOW";
  risks: string[];
  checks: ComplianceCheck[];
  passed_checks: number;
  total_checks: number;
  compliance_score: number;
  compliance_status: ComplianceStatus;
  status_message: string;
  generated_at: string;
  reviewed_by: string;
  disclaimer: string;
}

export interface ComplianceReportResponse {
  report: ComplianceReport;
}
