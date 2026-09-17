import type { HistoryItem } from "@/lib/types/history";
import RiskBadge from "../RiskBadge";

interface Props {
  items: HistoryItem[];
}

export default function HighRiskAnalyses({ items }: Props) {
  return (
    <section className="flex min-h-0 flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-medium">High-risk analyses</h2>

        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
          {items.length} results
        </span>
      </div>

      <div className="pt-4">
        {items.length === 0 ? (
          <p className=" text-sm text-foreground/40">
            No high-risk analyses found.
          </p>
        ) : (
          <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm">{item.summary}</p>
                  <time
                    dateTime={item.created_at}
                    className="font-mono text-[10px] text-foreground/35"
                  >
                    {new Date(item.created_at).toLocaleString()}
                  </time>
                </div>

                <RiskBadge level={item.risk_level} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
