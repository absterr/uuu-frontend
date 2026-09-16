import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import AnalyseToggle, {
  type AnalyseMode,
} from "@/components/app/home/analyse/AnalyseToggle";
import AnalysisPanel from "@/components/app/home/analyse/AnalysisPanel";
import CodeInputPanel from "@/components/app/home/analyse/CodeInputPanel";
import PaneTabs from "@/components/app/home/PaneTabs";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";
import type {
  AnalyzeResponse,
  BulkAnalyzeResponse,
  BulkFile,
  BulkResult,
} from "@/lib/types/analysis";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/_home/analyse")({
  component: AnalysePage,
});

const BULK_PLANS = new Set(["professional", "team", "enterprise"]);

const analyzeCode = (code: string) =>
  api<AnalyzeResponse>("/analyse", {
    method: "POST",
    body: JSON.stringify({ code }),
  });

const analyzeBulk = (files: BulkFile[]) =>
  api<BulkAnalyzeResponse>("/analyse/bulk", {
    method: "POST",
    body: JSON.stringify({
      files: files.map(({ filename, content }) => ({
        filename,
        code: content,
      })),
    }),
  });

function AnalysePage() {
  const { isAuthenticated, user } = useAuth();

  const canBulkAnalyze = isAuthenticated && BULK_PLANS.has(user?.plan ?? "");

  const [mode, setMode] = useState<AnalyseMode>("Single");
  const [pane, setPane] = useState<"input" | "output">("input");
  const [input, setInput] = useState<string | BulkFile[]>("");
  const [result, setResult] = useState<AnalyzeResponse | BulkResult[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const analyzeMutation = useMutation<
    AnalyzeResponse | BulkAnalyzeResponse,
    Error
  >({
    mutationFn: () => {
      if (mode === "Single" && typeof input === "string") {
        return analyzeCode(input);
      }

      if (mode === "Bulk" && Array.isArray(input)) {
        return analyzeBulk(input);
      }

      throw new Error("Invalid analysis input.");
    },
    onSuccess: (data) => {
      if ("results" in data) {
        setResult(data.results);
        toast.success("Bulk analysis completed.");
      } else {
        setResult(data);
        toast.success("Analysis completed.");
      }

      setError(null);
      setPane("output");
    },
    onError: (mutationError) => {
      setError(mutationError.message);
      setPane("output");
      toast.error(mutationError.message);
    },
  });

  function handleModeChange(newMode: AnalyseMode) {
    setMode(newMode);
    setError(null);
    analyzeMutation.reset();
    setResult(null);
    setPane("input");

    if (newMode === "Single") {
      setInput("");
    } else {
      setInput([]);
    }
  }

  function handleAnalyze() {
    setError(null);
    analyzeMutation.mutate();
  }

  const isLoading = analyzeMutation.isPending;

  return (
    <main
      className="flex h-full min-h-0 flex-col bg-background px-4 py-4 text-foreground
      md:px-6 md:py-6"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4">
        <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
          <h1 className="text-sm font-medium text-foreground/60">
            Analyse Code
          </h1>

          {canBulkAnalyze && (
            <AnalyseToggle mode={mode} onModeChange={handleModeChange} />
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col border border-foreground/10">
          <PaneTabs pane={pane} onPaneChange={setPane} />

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <CodeInputPanel
              value={input}
              onChange={setInput}
              onSubmit={handleAnalyze}
              isLoading={isLoading}
              className={pane === "input" ? "flex" : "hidden lg:flex"}
            />

            <AnalysisPanel
              result={result}
              error={error}
              isLoading={isLoading}
              className={pane === "output" ? "flex" : "hidden lg:flex"}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
