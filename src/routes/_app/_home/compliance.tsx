import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ComplianceDetail from "@/components/app/home/compliance/ComplianceDetail";
import ComplianceList from "@/components/app/home/compliance/ComplianceList";
import { MOCK_COMPLIANCE_REPORTS } from "@/lib/mock-data/compliance";

export const Route = createFileRoute("/_app/_home/compliance")({
  component: CompliancePage,
});

function CompliancePage() {
  const [selectedId, setSelectedId] = useState<number | null>(
    MOCK_COMPLIANCE_REPORTS[0]?.analysis_id ?? null
  );
  const selected =
    MOCK_COMPLIANCE_REPORTS.find(
      (report) => report.analysis_id === selectedId
    ) ?? null;
  const showDetail = selectedId !== null;

  return (
    <main className="flex h-full min-h-0 flex-col bg-background px-4 py-4 text-foreground md:px-6 md:py-6">
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4">
        <header className="flex items-center justify-between border-b border-foreground/10 pb-3">
          <h1 className="text-sm font-medium text-foreground/60">Compliance</h1>
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
            {MOCK_COMPLIANCE_REPORTS.length} reports
          </span>
        </header>
        <div className="flex min-h-0 flex-1 flex-col border border-foreground/10 lg:flex-row">
          <ComplianceList
            reports={MOCK_COMPLIANCE_REPORTS}
            selectedId={selectedId}
            onSelect={setSelectedId}
            className={showDetail ? "hidden" : "flex"}
          />
          <ComplianceDetail
            report={selected}
            onBack={() => setSelectedId(null)}
            className={showDetail ? "flex" : "hidden"}
          />
        </div>
      </div>
    </main>
  );
}
