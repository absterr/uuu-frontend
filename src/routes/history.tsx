import HistoryDetail from "@/components/history/HistoryDetails";
import HistoryFilters from "@/components/history/HistoryFilter";
import HistoryList from "@/components/history/HistoryList";
import type { RiskLevel } from "@/lib/analyse-code";
import { MOCK_HISTORY } from "@/lib/mock-data/history";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState<RiskLevel | "">("");
  const [selectedId, setSelectedId] = useState<number | null>(
    MOCK_HISTORY[0]?.id ?? null
  );

  const items = MOCK_HISTORY.filter((item) => {
    const query = search.toLowerCase();

    return (
      (!query ||
        item.summary.toLowerCase().includes(query) ||
        item.cobol_code.toLowerCase().includes(query)) &&
      (!risk || item.risk_level === risk)
    );
  });

  const selected = MOCK_HISTORY.find((item) => item.id === selectedId) ?? null;

  return (
    <main className="flex min-h-screen flex-col bg-background px-4 py-4 text-foreground md:px-6 md:py-6">
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4">
        <header className="flex items-center justify-between border-b border-foreground/10 pb-3">
          <h1 className="text-sm font-medium text-foreground/60">
            Analysis History
          </h1>
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
            {items.length} results
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col border border-foreground/10">
          <HistoryFilters
            search={search}
            risk={risk}
            onSearch={setSearch}
            onRisk={setRisk}
          />

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <HistoryList
              items={items}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            <HistoryDetail item={selected} />
          </div>
        </div>
      </div>
    </main>
  );
}
