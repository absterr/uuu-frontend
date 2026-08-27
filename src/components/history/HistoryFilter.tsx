import type { RiskLevel } from "@/lib/analyse-code";

interface Props {
  search: string;
  risk: RiskLevel | "";
  onSearch: (value: string) => void;
  onRisk: (value: RiskLevel | "") => void;
}

export default function HistoryFilters({
  search,
  risk,
  onSearch,
  onRisk,
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
    </div>
  );
}
