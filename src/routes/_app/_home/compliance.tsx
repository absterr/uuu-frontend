import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import ComplianceDetail from "@/components/app/home/compliance/ComplianceDetail";
import ComplianceList from "@/components/app/home/compliance/ComplianceList";
import { api } from "@/lib/api";
import type {
  ComplianceReport,
  ComplianceReportResponse,
  ComplianceStandard,
} from "@/lib/types/compliance";
import type { HistoryResponse } from "@/lib/types/history";

export const Route = createFileRoute("/_app/_home/compliance")({
  component: CompliancePage,
});

const fetchHistory = () => api<HistoryResponse>("/history");

const fetchComplianceReport = (
  analysisId: string,
  standard: ComplianceStandard,
) =>
  api<ComplianceReportResponse>(
    `/compliance/${analysisId}?standard=${standard}`,
  );

function CompliancePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [standard, setStandard] = useState<ComplianceStandard>("SOX");

  const historyQuery = useQuery({
    queryKey: ["history"],
    queryFn: fetchHistory,
  });

  const analyses = historyQuery.data?.history ?? [];

  useEffect(() => {
    if (selectedId === null && analyses.length > 0) {
      setSelectedId(analyses[0].id);
    }
  }, [analyses, selectedId]);

  const reportQuery = useQuery({
    queryKey: ["compliance", selectedId, standard],
    queryFn: () => fetchComplianceReport(selectedId as string, standard),
    enabled: selectedId !== null,
  });

  const selectedReport: ComplianceReport | null =
    reportQuery.data?.report ?? null;

  const showDetail = selectedId !== null;

  function handleSelect(id: string) {
    setSelectedId(id);
  }

  function handleBack() {
    setSelectedId(null);
  }

  return (
    <main
      className="flex h-full min-h-0 flex-col bg-background px-4 py-4
      text-foreground md:px-6 md:py-6"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4">
        <header className="flex items-center justify-between border-b border-foreground/10 pb-3">
          <h1 className="text-sm font-medium text-foreground/60">Compliance</h1>

          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
            {analyses.length} analyses
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col border border-foreground/10 lg:flex-row">
          {historyQuery.isLoading ? (
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                Loading analyses...
              </p>
            </div>
          ) : historyQuery.isError ? (
            <div className="flex min-h-0 flex-1 items-center justify-center p-6">
              <p className="text-sm text-plum">{historyQuery.error.message}</p>
            </div>
          ) : analyses.length === 0 ? (
            <div className="flex min-h-0 flex-1 items-center justify-center p-6">
              <p className="text-sm text-foreground/40">
                No analyses available for compliance reporting.
              </p>
            </div>
          ) : (
            <>
              <ComplianceList
                analyses={analyses}
                selectedId={selectedId}
                onSelect={handleSelect}
                className={showDetail ? "hidden" : "flex"}
              />

              <ComplianceDetail
                report={selectedReport}
                standard={standard}
                onStandardChange={setStandard}
                onBack={handleBack}
                isLoading={reportQuery.isLoading}
                error={reportQuery.isError ? reportQuery.error.message : null}
                className={showDetail ? "flex" : "hidden lg:flex"}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
