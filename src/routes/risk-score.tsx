import RiskBreakdown from "@/components/risk-score/RiskBreakdown";
import RiskOverview from "@/components/risk-score/RiskOverview";
import { MOCK_RISK_SCORE } from "@/lib/mock-data/risk-score";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/risk-score")({
  component: RiskScorePage,
});

function RiskScorePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background px-4 py-4 text-foreground md:px-6 md:py-6">
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4">
        <header className="border-b border-foreground/10 pb-3">
          <h1 className="text-sm font-medium text-foreground/60">Risk Score</h1>
        </header>

        <div className="flex min-h-0 flex-1 flex-col border border-foreground/10">
          <RiskOverview score={MOCK_RISK_SCORE} />
          <RiskBreakdown score={MOCK_RISK_SCORE} />
        </div>
      </div>
    </main>
  );
}
