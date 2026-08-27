import type { APIKey } from "@/lib/mock-data/api-keys";
import { cn } from "@/lib/utils";

interface Props {
  apiKey: APIKey;
  onRevoke: () => void;
}

export default function APIKeyRow({ apiKey, onRevoke }: Props) {
  return (
    <div className="flex flex-row gap-4 items-center justify-between border-b border-foreground/10 py-5">
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">
            {apiKey.name}
          </span>

          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-wider",
              apiKey.status === "ACTIVE" ? "text-plum" : "text-foreground/30"
            )}
          >
            {apiKey.status}
          </span>
        </div>

        <span className="truncate font-mono text-xs text-foreground/40">
          {apiKey.key}
        </span>

        <span className="text-[10px] text-foreground/40">
          Created {apiKey.created_at}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-end gap-6 sm:shrink-0">
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/30">
              Today
            </span>
            <span className="font-mono text-xs tabular-nums text-foreground/60">
              {apiKey.requests_today.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/30">
              Total
            </span>
            <span className="font-mono text-xs tabular-nums text-foreground/60">
              {apiKey.total_requests.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={apiKey.status === "ACTIVE" ? onRevoke : undefined}
          className="cursor-pointer text-xs text-foreground/40 hover:text-plum"
        >
          {apiKey.status === "ACTIVE" ? "Revoke" : "Delete"}
        </button>
      </div>
    </div>
  );
}
