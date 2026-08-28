import { cn } from "@/lib/utils";

type Pane = "input" | "output";

interface Props {
  pane: Pane;
  onPaneChange: (pane: Pane) => void;
}

export default function PaneTabs({ pane, onPaneChange }: Props) {
  return (
    <div className="flex border-b border-foreground/10 lg:hidden">
      {(["input", "output"] as const).map((p) => {
        const active = pane === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPaneChange(p)}
            className={cn(
              "flex-1 cursor-pointer border-b py-2 text-xs font-medium uppercase tracking-wider transition-colors",
              active
                ? "border-accent text-plum"
                : "border-transparent text-foreground/50 hover:text-foreground"
            )}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}
