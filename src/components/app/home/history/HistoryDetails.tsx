import type { HistoryItem } from "@/lib/types/history";
import { cn } from "@/lib/utils";
import RiskBadge from "../RiskBadge";

interface Props {
  item: HistoryItem | null;
  onBack: () => void;
  className?: string;
}

export default function HistoryDetails({ item, onBack, className }: Props) {
  return (
    <section
      className={cn("min-h-0 min-w-0 flex-1 flex-col lg:flex", className)}
    >
      <header className="flex items-center gap-3 border-b border-foreground/10 px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to history list"
          className="cursor-pointer text-foreground/50 hover:text-foreground lg:hidden"
        >
          ←
        </button>
        <h2 className="flex-1 truncate text-sm font-medium">
          {item ? `Analysis #${item.id}` : "Analysis Details"}
        </h2>
        {item && <RiskBadge level={item.risk_level} />}
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
        {!item ? (
          <div className="flex min-h-full items-center justify-center text-sm text-foreground/40">
            Select an analysis to view its details.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                Summary
              </span>
              <p className="text-sm leading-6">{item.summary}</p>
            </section>

            <section className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                Explanation
              </span>
              <p className="text-sm leading-6 text-foreground/70">
                {item.explanation}
              </p>
            </section>

            {item.risks.length > 0 && (
              <section className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                  Risks
                </span>
                <ul className="flex flex-col gap-2 border-t border-foreground/10 pt-2">
                  {item.risks.map((risk) => (
                    <li
                      key={risk}
                      className="flex gap-2 text-sm text-foreground/70"
                    >
                      <span
                        className="mt-2 size-1 shrink-0 bg-accent"
                        aria-hidden="true"
                      />
                      {risk}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                Source
              </span>
              <pre className="overflow-x-auto border border-foreground/15 bg-foreground/5 p-4 font-mono text-xs leading-5">
                <code>{item.cobol_code}</code>
              </pre>
            </section>

            <section className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                Python Equivalent
              </span>
              <pre className="overflow-x-auto border border-foreground/15 bg-foreground/5 p-4 font-py text-xs leading-5">
                <code>{item.python_code}</code>
              </pre>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
