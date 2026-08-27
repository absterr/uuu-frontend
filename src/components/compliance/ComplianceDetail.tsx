import type { ComplianceReport } from "@/lib/mock-data/compliance";

interface Props {
  report: ComplianceReport | null;
}

export default function ComplianceDetail({ report }: Props) {
  if (!report) {
    return (
      <section className="flex min-h-0 flex-1 items-center justify-center p-6">
        <p className="text-sm text-foreground/40">
          Select a compliance report to view its details.
        </p>
      </section>
    );
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-foreground/10 px-4 py-3 md:px-6">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
            Compliance
          </span>
          <h2 className="truncate text-sm font-medium">
            {report.standard_name}
          </h2>
        </div>

        <span className="shrink-0 text-xs font-medium text-foreground/60">
          {report.compliance_score}%
        </span>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
              Status
            </span>
            <p className="text-sm font-medium">
              {report.compliance_status.replace("-", " ")}
            </p>
            <p className="text-sm text-foreground/60">
              {report.status_message}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
              Summary
            </span>
            <p className="text-sm leading-6">{report.summary}</p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
              Checks
            </span>

            <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
              {report.checks.map((check) => (
                <li
                  key={check.check}
                  className="flex items-center justify-between gap-4 py-3 text-sm"
                >
                  <span>{check.check}</span>
                  <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-foreground/50">
                    {check.status}
                  </span>
                </li>
              ))}
            </ul>

            <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
              {report.passed_checks} / {report.total_checks} passed
            </span>
          </div>

          {report.risks.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                Risks
              </span>

              <ul className="flex flex-col gap-2">
                {report.risks.map((risk) => (
                  <li
                    key={risk}
                    className="flex items-center gap-2 text-sm text-foreground/70"
                  >
                    <span
                      className="size-1 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-1 border-t border-foreground/10 pt-4 text-[10px] uppercase tracking-wider text-foreground/40">
            <span>Analysis #{report.analysis_id}</span>
            <span>Reviewed by {report.reviewed_by}</span>
            <span>
              Generated {new Date(report.generated_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
