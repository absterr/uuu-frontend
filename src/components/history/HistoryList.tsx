import type { HistoryItem } from "@/lib/mock-data/history";
import RiskBadge from "../RiskBadge";

interface Props {
  items: HistoryItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function HistoryList({ items, selectedId, onSelect }: Props) {
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col border-b border-foreground/10 lg:border-r lg:border-b-0">
      <header className="flex items-center justify-between border-b border-foreground/10 px-4 py-3">
        <h2 className="text-sm font-medium">Analyses</h2>
        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
          {items.length} results
        </span>
      </header>

      <ul className="min-h-0 flex-1 divide-y divide-foreground/10 overflow-y-auto">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex w-full cursor-pointer flex-col gap-2 p-4 text-left hover:bg-foreground/5 ${
                selectedId === item.id ? "bg-foreground/5" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] text-foreground/35">
                  #{item.id}
                </span>
                <RiskBadge level={item.risk_level} />
              </div>

              <p className="text-sm leading-5">{item.summary}</p>

              <time
                dateTime={item.created_at}
                className="font-mono text-[10px] text-foreground/35"
              >
                {new Date(item.created_at).toLocaleString()}
              </time>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
