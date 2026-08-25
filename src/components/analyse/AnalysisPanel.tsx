import { Link } from "@tanstack/react-router";
import type { AnalyzeData } from "@/lib/analyse-code";
import RiskBadge from "./RiskBadge";

interface AnalysisPanelProps {
  analysisId: number | null;
  result: AnalyzeData | null;
  isLoading: boolean;
  error: string | null;
}

export default function AnalysisPanel({
  analysisId,
  result,
  isLoading,
  error,
}: AnalysisPanelProps) {
  return (
    <section
      className="flex min-h-0 flex-1 flex-col"
      aria-labelledby="analysis-heading"
      aria-live="polite"
      aria-busy={isLoading}
    >
      <header className="flex items-center justify-between gap-4 border-b border-foreground/10 px-4 py-3 md:px-6">
        <div className="flex flex-col gap-1">
          <p className="font-mono font-semibold text-[10px] uppercase tracking-wider text-foreground/40">
            Output
          </p>
          <h2
            id="analysis-heading"
            className="text-sm font-medium text-foreground"
          >
            Analysis
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {analysisId !== null && (
            <span className="font-mono text-[10px] text-foreground/40">
              #{analysisId}
            </span>
          )}
          {result && <RiskBadge level={result.risk_level} />}
        </div>
      </header>

      <div className="min-h-0 flex-1 h-full flex flex-col overflow-y-auto p-4 md:p-6">
        {isLoading && (
          <div className="flex h-full flex-1 items-center justify-center">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/40">
              Analyzing...
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div
            className="border border-accent/30 bg-accent/10 p-4"
            role="alert"
          >
            <p className="text-sm text-plum">{error}</p>
          </div>
        )}

        {!isLoading && !error && !result && (
          <div className="flex-1 flex flex-col items-center gap-2 justify-center border border-dashed border-foreground/10">
            <span
              className="flex size-10 items-center justify-center border border-foreground/10 font-mono text-xs text-foreground/30"
              aria-hidden="true"
            >
              /
            </span>
            <p className="max-w-sm px-6 text-center text-sm text-foreground/40">
              Submit COBOL source to generate a structured analysis.
            </p>
          </div>
        )}

        {!isLoading && !error && result && (
          <div className="flex flex-col gap-6">
            <section
              aria-labelledby="summary-heading"
              className="flex flex-col gap-2"
            >
              <p
                id="summary-heading"
                className="font-mono text-[10px] uppercase tracking-widest text-foreground/40"
              >
                Summary
              </p>
              <p className="max-w-2xl text-sm leading-6 text-foreground">
                {result.summary}
              </p>
            </section>

            <section
              className="border-t border-foreground/10 pt-6 flex flex-col gap-2"
              aria-labelledby="explanation-heading"
            >
              <p
                id="explanation-heading"
                className="font-mono text-[10px] uppercase tracking-widest text-foreground/40"
              >
                Explanation
              </p>
              <p className="max-w-2xl text-sm leading-6 text-foreground/70">
                {result.explanation}
              </p>
            </section>

            <section
              className="border-t border-foreground/10 pt-6 flex flex-col gap-2"
              aria-labelledby="risks-heading"
            >
              <div className="flex items-center justify-between gap-4">
                <p
                  id="risks-heading"
                  className="font-mono text-[10px] uppercase tracking-widest text-foreground/40"
                >
                  Risks
                </p>
                <span className="font-mono text-[10px] text-foreground/40">
                  {result.risks.length.toString().padStart(2, "0")}
                </span>
              </div>

              <ul className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
                {result.risks.map((risk) => (
                  <li
                    key={risk}
                    className="flex gap-3 py-3 text-sm leading-6 text-foreground/70"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 bg-accent rounded-full"
                      aria-hidden="true"
                    />
                    {risk}
                  </li>
                ))}
              </ul>
            </section>

            <section
              className="border-t border-foreground/10 pt-6"
              aria-labelledby="python-heading"
            >
              <p
                id="python-heading"
                className="font-mono text-[10px] uppercase tracking-widest text-foreground/40"
              >
                Python equivalent
              </p>

              <pre className="mt-3 overflow-x-auto border border-foreground/10 bg-foreground p-4 text-background md:p-5">
                <code className="font-py text-xs leading-6">
                  {result.python_code}
                </code>
              </pre>
            </section>
          </div>
        )}
      </div>

      {analysisId !== null && (
        <footer className="border-t border-foreground/10 px-4 py-3 md:px-6">
          <Link
            to="/codemap/$id"
            params={{ id: String(analysisId) }}
            className="inline-flex items-center gap-2 text-xs font-medium text-plum hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View code map
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      )}
    </section>
  );
}
