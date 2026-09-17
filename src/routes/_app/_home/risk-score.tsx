import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import HighRiskAnalysis from "@/components/app/home/risk-score/HighRiskAnalysis";
import RiskBreakdown from "@/components/app/home/risk-score/RiskBreakdown";
import RiskOverview from "@/components/app/home/risk-score/RiskOverview";
import { getHistoryByRisk, getRiskScore } from "@/lib/requests";

export const Route = createFileRoute("/_app/_home/risk-score")({
  component: RiskScorePage,
});

function RiskScorePage() {
  const riskQuery = useQuery({
    queryKey: ["risk-score"],
    queryFn: getRiskScore,
  });

  const highRiskQuery = useQuery({
    queryKey: ["history", { risk: "HIGH" }],
    queryFn: () => getHistoryByRisk("HIGH"),
  });

  if (riskQuery.isPending || highRiskQuery.isPending) {
    return (
      <main className="flex h-full items-center justify-center bg-background text-sm text-foreground/40">
        Loading risk score...
      </main>
    );
  }

  if (riskQuery.isError) {
    return (
      <main className="flex h-full items-center justify-center bg-background text-sm text-red-500">
        {riskQuery.error.message}
      </main>
    );
  }

  if (highRiskQuery.isError) {
    return (
      <main className="flex h-full items-center justify-center bg-background text-sm text-red-500">
        {highRiskQuery.error.message}
      </main>
    );
  }

  return (
    <main className="flex h-full min-h-0 flex-col bg-background px-4 py-4 text-foreground md:px-6 md:py-6">
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4">
        <header className="border-b border-foreground/10 pb-3">
          <h1 className="text-sm font-medium text-foreground/60">Risk Score</h1>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto border border-foreground/10">
          <RiskOverview score={riskQuery.data} />
          <RiskBreakdown score={riskQuery.data} />
          <HighRiskAnalysis items={highRiskQuery.data.history} />
        </div>
      </div>
    </main>
  );
}
