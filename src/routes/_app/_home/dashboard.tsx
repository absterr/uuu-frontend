import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { useAuth } from "@/hooks/use-auth";
import { getHistory, getRiskScore } from "@/lib/requests";

export const Route = createFileRoute("/_app/_home/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  const historyQuery = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  const riskQuery = useQuery({
    queryKey: ["risk-score"],
    queryFn: getRiskScore,
  });

  const recentAnalyses = [...(historyQuery.data?.history ?? [])]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  const risk = riskQuery.data;

  return (
    <main className="flex h-full min-h-0 flex-col bg-background px-4 py-4 text-foreground md:px-6 md:py-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex items-end justify-between border-b border-foreground/10 pb-4">
          <div>
            <p className="text-xs text-foreground/40">Dashboard</p>
            <h1 className="pt-1 text-xl font-medium">
              Welcome back, {user?.name ?? "there"}
            </h1>
          </div>

          <Link
            to="/analyse"
            className="bg-plum px-4 py-2 text-xs font-medium text-background hover:bg-plum/90"
          >
            Analyze
          </Link>
        </header>

        <section className="grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
          <div className="bg-background p-5">
            <p className="text-xs text-foreground/40">Analyses used</p>
            <p className="pt-2 font-mono text-3xl font-bold">
              {user?.analyses_used ?? 0}
            </p>
            <p className="pt-1 text-xs text-foreground/40">This month</p>
          </div>

          <div className="bg-background p-5">
            <p className="text-xs text-foreground/40">Risk score</p>
            <div className="flex items-end gap-2 pt-2">
              <p className="font-mono text-3xl font-bold">
                {risk?.overall_score ?? "—"}
              </p>
              {risk && (
                <span className="pb-1 text-xs text-foreground/50">/ 10</span>
              )}
            </div>
            <p className="pt-1 text-xs text-foreground/40">
              {risk?.overall_level ?? "Loading..."}
            </p>
          </div>
        </section>

        <section className="border border-foreground/10">
          <div className="flex items-center justify-between border-b border-foreground/10 p-4">
            <div>
              <h2 className="text-sm font-medium">Risk overview</h2>
              <p className="pt-1 text-xs text-foreground/40">
                {risk?.message ?? "Loading risk profile..."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 divide-x divide-foreground/10">
            {(["HIGH", "MEDIUM", "LOW"] as const).map((level) => (
              <div key={level} className="p-4">
                <p className="text-xs text-foreground/40">{level}</p>
                <p className="pt-2 font-mono text-2xl font-bold">
                  {risk?.breakdown[level] ?? "—"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-foreground/10">
          <div className="flex items-center justify-between border-b border-foreground/10 p-4">
            <h2 className="text-sm font-medium">Recent analyses</h2>

            <Link
              to="/history"
              className="text-xs text-foreground/40 hover:text-foreground"
            >
              View all
            </Link>
          </div>

          {historyQuery.isPending ? (
            <p className="p-4 text-xs text-foreground/40">
              Loading analyses...
            </p>
          ) : historyQuery.isError ? (
            <p className="p-4 text-xs text-red-500">Failed to load analyses.</p>
          ) : recentAnalyses.length === 0 ? (
            <p className="p-4 text-xs text-foreground/40">No analyses yet.</p>
          ) : (
            <div>
              {recentAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between gap-4
                    border-b border-foreground/10 p-4 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm">{analysis.summary}</p>
                    <p className="pt-1 text-xs text-foreground/40">
                      {new Date(analysis.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="shrink-0 font-mono text-[10px] text-foreground/50">
                    {analysis.risk_level}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
