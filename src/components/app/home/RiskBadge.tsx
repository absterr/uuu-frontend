import type { RiskLevel } from "@/lib/types/analysis";

const RISK_STYLES: Record<RiskLevel, string> = {
  HIGH: "bg-accent/10 text-plum",
  MEDIUM: "bg-foreground/10 text-foreground/70",
  LOW: "bg-foreground/5 text-foreground/60",
};

interface RiskBadgeProps {
  level: RiskLevel;
}

export default function RiskBadge({ level }: RiskBadgeProps) {
  const label = level.charAt(0) + level.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex items-center gap-2 border border-current/15 px-2.5
        py-1 text-[10px] font-medium uppercase tracking-widest ${RISK_STYLES[level]}`}
    >
      <span className="size-1.5 bg-current rounded-full" aria-hidden="true" />
      {label} risk
    </span>
  );
}
