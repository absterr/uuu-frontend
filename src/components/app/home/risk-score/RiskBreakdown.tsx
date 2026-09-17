import type { RiskLevel } from "@/lib/types/analysis";
import type { RiskScoreResponse } from "@/lib/types/risk";

interface Props {
  score: RiskScoreResponse;
}

const LEVELS: RiskLevel[] = ["HIGH", "MEDIUM", "LOW"];

const BAR_CLASSES: Record<RiskLevel, string> = {
  HIGH: "bg-red-500",
  MEDIUM: "bg-yellow-500",
  LOW: "bg-green-500",
};

export default function RiskBreakdown({ score }: Props) {
  return (
    <section className="flex flex-col gap-4 border-b border-foreground/10 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Risk breakdown</h2>

        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
          {score.total_analyses} analyses
        </span>
      </div>

      <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
        {LEVELS.map((level) => (
          <li key={level} className="flex items-center gap-4 py-4">
            <span className="w-16 text-xs font-medium">{level}</span>

            <div
              className="h-2 min-w-0 flex-1 bg-foreground/5"
              role="progressbar"
              aria-label={`${level} risk percentage`}
              aria-valuenow={score.percentage[level]}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`h-full ${BAR_CLASSES[level]}`}
                style={{ width: `${score.percentage[level]}%` }}
              />
            </div>

            <span className="w-12 text-right font-mono text-xs text-foreground/50">
              {score.breakdown[level]}
            </span>

            <span className="w-14 text-right text-xs text-foreground/40">
              {score.percentage[level]}%
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
