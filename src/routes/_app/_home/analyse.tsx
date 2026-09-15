import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import AnalyseToggle, {
  type AnalyseMode,
} from "@/components/app/home/analyse/AnalyseToggle";
import AnalysisPanel from "@/components/app/home/analyse/AnalysisPanel";
import CodeInputPanel from "@/components/app/home/analyse/CodeInputPanel";
import PaneTabs from "@/components/app/home/PaneTabs";
import { api } from "@/lib/api";
import {
  type BulkFile,
  type BulkResultItem,
  MOCK_BULK_FILES,
  MOCK_BULK_RESULTS,
  MOCK_SINGLE_CODE,
  MOCK_SINGLE_RESULT,
} from "@/lib/mock-data/analysis";
import type { AnalyzeResponse } from "@/lib/types/analysis";

export const Route = createFileRoute("/_app/_home/analyse")({
  component: AnalysePage,
});

const analyzeCode = (code: string) => {
  return api<AnalyzeResponse>("/api/v1/analyse", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
};

const INITIAL_SINGLE_RESPONSE: AnalyzeResponse = {
  id: "mock-analysis",
  user: "demo",
  data: MOCK_SINGLE_RESULT,
};

function AnalysePage() {
  const [mode, setMode] = useState<AnalyseMode>("Single");
  const [pane, setPane] = useState<"input" | "output">("input");
  const [input, setInput] = useState<string | BulkFile[]>(MOCK_SINGLE_CODE);
  const [result, setResult] = useState<
    AnalyzeResponse | BulkResultItem[] | null
  >(INITIAL_SINGLE_RESPONSE);
  const [error, setError] = useState<string | null>(null);

  const analyzeMutation = useMutation({
    mutationFn: analyzeCode,
    onSuccess: (data) => {
      setResult(data);
      setError(null);
      setPane("output");
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : "Analysis failed.");
      setPane("output");
    },
  });

  function handleModeChange(newMode: AnalyseMode) {
    setMode(newMode);
    setError(null);
    analyzeMutation.reset();

    if (newMode === "Single") {
      setInput(MOCK_SINGLE_CODE);
      setResult(INITIAL_SINGLE_RESPONSE);
    } else {
      setInput(MOCK_BULK_FILES);
      setResult(MOCK_BULK_RESULTS);
    }
  }

  function handleAnalyze() {
    if (typeof input !== "string") {
      return;
    }

    setError(null);
    analyzeMutation.mutate(input);
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
          <AnalyseToggle mode={mode} onModeChange={handleModeChange} />
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
