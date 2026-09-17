import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";

import type { CodeMapNode as CodeMapNodeData } from "@/lib/types/codemap";
import { cn } from "@/lib/utils";

type FlowNode = Node<CodeMapNodeData, "codemap">;

const TYPE_LABELS: Record<CodeMapNodeData["type"], string> = {
  start: "Start",
  end: "End",
  process: "Process",
  decision: "Decision",
  input: "Input",
  output: "Output",
};

export default function CodeMapNode({ data, selected }: NodeProps<FlowNode>) {
  const showTarget = data.type !== "start";
  const showSource = data.type !== "end";

  return (
    <div
      className={cn(
        "relative w-64 border bg-background shadow-sm transition-shadow",
        selected ? "border-plum shadow-md" : "border-foreground/10",
      )}
    >
      {showTarget && (
        <Handle
          type="target"
          position={Position.Left}
          className="h-2.5! w-2.5! border-2! border-plum! bg-background!"
        />
      )}

      <div className="flex items-center justify-between border-b border-foreground/10 px-3 py-2">
        <span className="truncate text-xs font-medium text-foreground">
          {data.label}
        </span>

        <span className="shrink-0 text-[10px] uppercase tracking-wide text-foreground/40">
          {TYPE_LABELS[data.type]}
        </span>
      </div>

      {data.description && (
        <p className="px-3 py-2 text-xs leading-5 text-foreground/60">
          {data.description}
        </p>
      )}

      {showSource && (
        <Handle
          type="source"
          position={Position.Right}
          className="h-2.5! w-2.5! border-2! border-plum! bg-background!"
        />
      )}
    </div>
  );
}
