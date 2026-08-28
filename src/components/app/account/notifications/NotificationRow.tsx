import { cn } from "@/lib/utils";

interface Props {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}

export default function NotificationRow({
  label,
  description,
  checked,
  onChange,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-foreground/10 py-4 last:border-0">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-foreground">{label}</span>
        {description && (
          <span className="text-xs text-foreground/50">{description}</span>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          "relative flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-2xl border transition-colors",
          checked
            ? "border-plum bg-plum"
            : "border-foreground/20 bg-foreground/5",
        )}
      >
        <span
          className={cn(
            "size-3 rounded-full bg-background transition-transform",
            checked ? "translate-x-5" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}
