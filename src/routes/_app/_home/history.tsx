import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import HistoryDetail from "@/components/app/home/history/HistoryDetails";
import HistoryFilters, {
  type HistoryDateFilter,
} from "@/components/app/home/history/HistoryFilter";
import HistoryList from "@/components/app/home/history/HistoryList";
import { api } from "@/lib/api";
import type { RiskLevel } from "@/lib/types/analysis";
import type { HistoryResponse } from "@/lib/types/history";

export const Route = createFileRoute("/_app/_home/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState<RiskLevel | "">("");
  const [date, setDate] = useState<HistoryDateFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["history", { search, risk }],
    queryFn: () => {
      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (risk) params.set("risk", risk);

      const query = params.toString();

      return api<HistoryResponse>(`/history${query ? `?${query}` : ""}`);
    },
    placeholderData: keepPreviousData,
  });

  const history = data?.history ?? [];

  const filteredItems = history.filter((item) => {
    if (date === "all") return true;

    const createdAt = new Date(item.created_at);

    if (date === "today") {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      return createdAt >= startOfToday;
    }

    const days = date === "7d" ? 7 : 30;
    const cutoff = new Date();

    cutoff.setDate(cutoff.getDate() - days);

    return createdAt >= cutoff;
  });

  const selected = filteredItems.find((item) => item.id === selectedId) ?? null;

  useEffect(() => {
    setSelectedId(filteredItems[0]?.id ?? null);
  }, [data, date]);

  if (isPending) {
    return (
      <main className="flex h-full items-center justify-center bg-background text-sm text-foreground/40">
        Loading history...
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex h-full items-center justify-center bg-background text-sm text-red-500">
        {error.message}
      </main>
    );
  }

  const showDetail = selectedId !== null;

  return (
    <main className="flex h-full min-h-0 flex-col bg-background px-4 py-4 text-foreground md:px-6 md:py-6">
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4">
        <header className="flex items-center justify-between border-b border-foreground/10 pb-3">
          <h1 className="text-sm font-medium text-foreground/60">
            Analysis History
          </h1>

          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
            {filteredItems.length} results
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col border border-foreground/10">
          <HistoryFilters
            search={search}
            risk={risk}
            date={date}
            onSearch={setSearch}
            onRisk={setRisk}
            onDate={setDate}
          />

          {filteredItems.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-sm text-foreground/40">
              No analyses found.
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
              <HistoryList
                items={filteredItems}
                selectedId={selectedId}
                onSelect={setSelectedId}
                className={showDetail ? "hidden" : "flex"}
              />

              <HistoryDetail
                item={selected}
                onBack={() => setSelectedId(null)}
                className={showDetail ? "flex" : "hidden"}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
