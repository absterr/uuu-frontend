import type { MOCK_RISK_SCORE } from "@/lib/mock-data/risk-score";
import RiskBadge from "../RiskBadge";

interface Props {
  score: typeof MOCK_RISK_SCORE;
}

export default function RiskOverview({ score }: Props) {
  return (
    <section className="flex flex-col gap-6 border-b border-foreground/10 p-4 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
            Overall risk
          </span>
          <span className="text-4xl font-medium tracking-tight">
            {score.overall_score}
          </span>
        </div>
        <RiskBadge level={score.overall_level} />
      </div>

      <p className="text-sm leading-6 text-foreground/60">{score.message}</p>
    </section>
  );
}
