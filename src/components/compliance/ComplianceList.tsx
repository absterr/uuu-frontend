import type { ComplianceReport } from "@/lib/mock-data/compliance";

interface Props {
  reports: ComplianceReport[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function ComplianceList({
  reports,
  selectedId,
  onSelect,
}: Props) {
  return (
    <section className="flex min-h-0 flex-1 flex-col border-b border-foreground/10 lg:border-r lg:border-b-0">
      <header className="border-b border-foreground/10 px-4 py-3 md:px-6">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
          Reports
        </span>
      </header>

      <ul className="min-h-0 flex-1 overflow-y-auto">
        {reports.map((report) => (
          <li key={`${report.analysis_id}-${report.standard}`}>
            <button
              type="button"
              onClick={() => onSelect(report.analysis_id)}
              className={`flex w-full cursor-pointer items-center justify-between gap-3 border-b border-foreground/10 px-4 py-4 text-left md:px-6 ${
                selectedId === report.analysis_id
                  ? "bg-foreground/5"
                  : "hover:bg-foreground/5"
              }`}
            >
              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-sm font-medium">
                  {report.standard_name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
                  Analysis #{report.analysis_id}
                </span>
              </div>

              <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-foreground/50">
                {report.compliance_status.replace("-", " ")}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
