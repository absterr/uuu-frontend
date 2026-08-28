import type { AnalyzeResponse } from "@/lib/analyse-code";
import type { BulkResultItem } from "@/lib/mock-data/analysis";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import RiskBadge from "../RiskBadge";

interface Props {
  result: AnalyzeResponse | BulkResultItem[] | null;
  error: string | null;
  isLoading: boolean;
  className?: string;
}

export default function AnalysisPanel({
  result,
  error,
  isLoading,
  className,
}: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const isBulk = Array.isArray(result);
  const isEmpty = !result || (isBulk && result.length === 0);

  return (
    <section
      aria-labelledby="output-heading"
      aria-live="polite"
      aria-busy={isLoading}
      className={cn("min-h-0 w-full min-w-0 flex-1 flex flex-col", className)}
    >
      <header className="flex items-center justify-between border-b border-foreground/10 px-4 py-3 md:px-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
            Output
          </span>
          <h2
            id="output-heading"
            className="text-sm font-medium text-foreground"
          >
            {isBulk ? "Batch Results" : "Analysis Results"}
          </h2>
        </div>
        {isBulk ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
            {result.filter((r) => r.status === "success").length} ok ·{" "}
            {result.filter((r) => r.status === "error").length} failed
          </span>
        ) : (
          result?.data.risk_level && (
            <RiskBadge level={result.data.risk_level} />
          )
        )}
      </header>

      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto p-4 md:p-6">
        {isLoading && (
          <p className="m-auto font-mono text-xs uppercase tracking-widest text-foreground/40">
            Running analysis...
          </p>
        )}
        {error && <p className="m-auto text-sm text-plum">{error}</p>}

        {!isLoading &&
          !error &&
          (isEmpty ? (
            <div className="m-auto flex flex-col items-center justify-center gap-2 text-center">
              <span
                className="flex size-10 items-center justify-center border border-foreground/10 font-mono text-xs text-foreground/30"
                aria-hidden="true"
              >
                /
              </span>
              <p className="max-w-sm text-sm text-foreground/40">
                {isBulk
                  ? "Queue files and click analyze to view results."
                  : "Enter source code and click analyze to view results."}
              </p>
            </div>
          ) : isBulk ? (
            <ul className="divide-y divide-foreground/10">
              {result.map((res) => {
                const isOpen = openId === res.id;
                const isErr = res.status === "error";
                return (
                  <li key={res.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : res.id)}
                      className="flex w-full items-center justify-between gap-3 py-3 text-left hover:bg-foreground/5"
                    >
                      <span className="truncate text-sm font-medium text-foreground">
                        {res.filename}
                      </span>
                      {isErr ? (
                        <span className="text-xs text-plum">Error</span>
                      ) : (
                        res.risk_level && <RiskBadge level={res.risk_level} />
                      )}
                    </button>
                    {isOpen && (
                      <div className="flex flex-col gap-2 border-t border-foreground/10 bg-foreground/5 p-4">
                        {isErr ? (
                          <p className="text-sm text-plum">{res.error}</p>
                        ) : (
                          <>
                            <p className="text-sm text-foreground">
                              {res.summary}
                            </p>
                            {res.analysisId && (
                              <>
                                <button className="text-xs text-plum hover:underline">
                                  View code map →
                                </button>
                                {/*<Link
                                  to="/codemap/$id"
                                  params={{ id: String(res.analysisId) }}
                                  className="text-xs text-plum hover:underline"
                                >
                                  View code map →
                                </Link>*/}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                  Summary
                </span>
                <p className="text-sm leading-6 text-foreground">
                  {result.data.summary}
                </p>
              </div>
              {result.data.risks.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                    Risks
                  </span>
                  <ul className="flex flex-col gap-2 border-t border-foreground/10 pt-2">
                    {result.data.risks.map((r) => (
                      <li
                        key={r}
                        className="flex items-center gap-2 text-sm text-foreground/70"
                      >
                        <span
                          className="size-1 shrink-0 bg-accent rounded-full"
                          aria-hidden="true"
                        />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button className="text-xs text-plum hover:underline">
                View code map →
              </button>
              {/*<Link
                to="/codemap/$id"
                params={{ id: String(result.id) }}
                className="text-xs text-plum hover:underline"
              >
                View code map →
              </Link>*/}
            </div>
          ))}
      </div>
    </section>
  );
}
