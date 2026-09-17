export type CodeMapNodeType =
  | "start"
  | "end"
  | "process"
  | "decision"
  | "input"
  | "output";

export type CodeMapNode = {
  id: string;
  label: string;
  type: CodeMapNodeType;
  description: string;
} & Record<string, unknown>;

export interface CodeMapEdge {
  from_id: string;
  to_id: string;
  label: string;
}

export interface CodeMapResponse {
  title: string;
  summary: string;
  nodes: CodeMapNode[];
  edges: CodeMapEdge[];
  mermaid: string;
}
