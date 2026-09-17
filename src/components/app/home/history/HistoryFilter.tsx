import type { RiskLevel } from "@/lib/types/analysis";

export type HistoryDateFilter = "all" | "today" | "7d" | "30d";

interface Props {
  search: string;
  risk: RiskLevel | "";
  date: HistoryDateFilter;
  onSearch: (value: string) => void;
  onRisk: (value: RiskLevel | "") => void;
  onDate: (value: HistoryDateFilter) => void;
}

export default function HistoryFilters({
  search,
  risk,
  date,
  onSearch,
  onRisk,
  onDate,
}: Props) {
  return (
    <div className="flex flex-col gap-2 border-b border-foreground/10 p-4 md:flex-row">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search history..."
        aria-label="Search history"
        className="min-w-0 flex-1 border border-foreground/15 bg-foreground/5 px-3 py-2 text-xs outline-none focus:border-accent"
      />

      <select
        value={risk}
        onChange={(e) => onRisk(e.target.value as RiskLevel | "")}
        aria-label="Filter by risk"
        className="border border-foreground/15 bg-background px-3 py-2 text-xs outline-none focus:border-accent"
      >
        <option value="">All risks</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>

      <select
        value={date}
        onChange={(e) => onDate(e.target.value as HistoryDateFilter)}
        aria-label="Filter by date"
        className="border border-foreground/15 bg-background px-3 py-2 text-xs outline-none focus:border-accent"
      >
        <option value="all">All dates</option>
        <option value="today">Today</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
      </select>
    </div>
  );
}
