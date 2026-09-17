import type { HistoryItem } from "@/lib/types/history";
import { cn } from "@/lib/utils";

interface Props {
  analyses: HistoryItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}

export default function ComplianceList({
  analyses,
  selectedId,
  onSelect,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "min-h-0 flex-1 flex-col border-b border-foreground/10 lg:flex lg:border-r lg:border-b-0",
        className,
      )}
    >
      <header className="border-b border-foreground/10 px-4 py-3 md:px-6">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
          Analyses
        </span>
      </header>

      <ul className="min-h-0 flex-1 overflow-y-auto">
        {analyses.map((analysis) => (
          <li key={analysis.id}>
            <button
              type="button"
              onClick={() => onSelect(analysis.id)}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between gap-3 border-b border-foreground/10 px-4 py-4 text-left md:px-6 ",
                selectedId === analysis.id
                  ? "bg-foreground/5"
                  : "hover:bg-foreground/5",
              )}
            >
              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-sm font-medium">
                  Analysis #{analysis.id}
                </span>

                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
                  {new Date(analysis.created_at).toLocaleDateString()}
                </span>
              </div>

              <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-foreground/50">
                {analysis.risk_level}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
