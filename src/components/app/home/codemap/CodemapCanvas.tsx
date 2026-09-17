import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";

import type {
  CodeMapEdge,
  CodeMapNode as CodeMapNodeData,
} from "@/lib/types/codemap";
import CodeMapNode from "./CodemapNode";

type FlowNode = Node<CodeMapNodeData, "codemap">;

const nodeTypes = {
  codemap: CodeMapNode,
};

interface CodeMapCanvasProps {
  nodes: CodeMapNodeData[];
  edges: CodeMapEdge[];
}

export default function CodeMapCanvas({ nodes, edges }: CodeMapCanvasProps) {
  const flowNodes = layoutNodes(nodes, edges);
  const flowEdges = createEdges(edges);

  return (
    <div className="codemap-flow min-h-0 flex-1">
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        defaultNodes={flowNodes}
        defaultEdges={flowEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesConnectable={false}
        edgesReconnectable={false}
        deleteKeyCode={null}
        colorMode="system"
        minZoom={0.5}
        maxZoom={2}
        aria-label="COBOL code map"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={18}
          size={1}
          color="color-mix(in oklch, var(--foreground) 18%, transparent)"
        />

        <Controls
          position="bottom-left"
          showInteractive={false}
          aria-label="Code map controls"
        />
      </ReactFlow>
    </div>
  );
}

const layoutNodes = (
  nodes: CodeMapNodeData[],
  edges: CodeMapEdge[]
): FlowNode[] => {
  const incoming = new Map(nodes.map((node) => [node.id, 0]));
  const outgoing = new Map<string, string[]>();

  for (const edge of edges) {
    incoming.set(edge.to_id, (incoming.get(edge.to_id) ?? 0) + 1);

    const targets = outgoing.get(edge.from_id) ?? [];
    targets.push(edge.to_id);
    outgoing.set(edge.from_id, targets);
  }

  const depth = new Map<string, number>();
  const queue = nodes
    .filter((node) => incoming.get(node.id) === 0)
    .map((node) => node.id);

  for (const id of queue) {
    depth.set(id, 0);
  }

  for (let index = 0; index < queue.length; index += 1) {
    const id = queue[index];
    const currentDepth = depth.get(id) ?? 0;

    for (const target of outgoing.get(id) ?? []) {
      const nextDepth = currentDepth + 1;
      depth.set(target, Math.max(depth.get(target) ?? 0, nextDepth));

      const remaining = (incoming.get(target) ?? 1) - 1;
      incoming.set(target, remaining);

      if (remaining === 0) {
        queue.push(target);
      }
    }
  }

  const columns = new Map<number, number>();

  return nodes.map((node) => {
    const column = depth.get(node.id) ?? 0;
    const row = columns.get(column) ?? 0;

    columns.set(column, row + 1);

    return {
      id: node.id,
      type: "codemap",
      position: {
        x: column * 340,
        y: row * 150,
      },
      data: node,
      ariaLabel: `${node.type}: ${node.label}`,
    };
  });
};

const createEdges = (edges: CodeMapEdge[]): Edge[] => {
  return edges.map((edge, index) => ({
    id: `${edge.from_id}-${edge.to_id}-${index}`,
    source: edge.from_id,
    target: edge.to_id,
    type: "smoothstep",
    label: edge.label || undefined,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    labelStyle: {
      fill: "var(--foreground)",
      fontSize: 10,
    },
    labelBgStyle: {
      fill: "var(--background)",
    },
    labelBgPadding: [4, 2],
    labelBgBorderRadius: 0,
  }));
};
