export type AnalyseMode = "Single" | "Bulk";

interface ModeToggleProps {
  mode: AnalyseMode;
  onModeChange: (mode: AnalyseMode) => void;
}

export default function AnalyseToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="inline-flex border border-foreground/15 text-xs font-medium">
      {(["Single", "Bulk"] as const).map((label) => {
        const active = mode === label;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onModeChange(label)}
            className={`cursor-pointer px-3 py-1.5 transition-colors focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-accent ${
              active
                ? "bg-plum text-background font-semibold"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
