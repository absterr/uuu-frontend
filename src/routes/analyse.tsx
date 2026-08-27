import AnalyseToggle, {
  type AnalyseMode,
} from "@/components/analyse/AnalyseToggle";
import AnalysisPanel from "@/components/analyse/AnalysisPanel";
import CodeInputPanel from "@/components/analyse/CodeInputPanel";
import { analyzeCode, type AnalyzeResponse } from "@/lib/analyse-code";
import {
  type BulkFile,
  type BulkResultItem,
  MOCK_BULK_FILES,
  MOCK_BULK_RESULTS,
  MOCK_SINGLE_CODE,
  MOCK_SINGLE_RESULT,
} from "@/lib/mock-analysis";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/analyse")({ component: AnalysePage });

const INITIAL_SINGLE_RESPONSE: AnalyzeResponse = {
  status: "success",
  id: 101,
  user: "demo",
  data: MOCK_SINGLE_RESULT,
};

function AnalysePage() {
  const [mode, setMode] = useState<AnalyseMode>("Single");
  const [input, setInput] = useState<string | BulkFile[]>(MOCK_SINGLE_CODE);
  const [result, setResult] = useState<
    AnalyzeResponse | BulkResultItem[] | null
  >(INITIAL_SINGLE_RESPONSE);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleModeChange(newMode: AnalyseMode) {
    setMode(newMode);
    setError(null);
    if (newMode === "Single") {
      setInput(MOCK_SINGLE_CODE);
      setResult(INITIAL_SINGLE_RESPONSE);
    } else {
      setInput(MOCK_BULK_FILES);
      setResult(MOCK_BULK_RESULTS);
    }
  }

  async function handleAnalyze() {
    setIsLoading(true);
    setError(null);
    if (typeof input === "string") {
      try {
        setResult(await analyzeCode(input));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed");
      }
    } else {
      setResult(
        input.map((f) => ({
          id: f.id,
          filename: f.filename,
          status: "success",
          risk_level: "MEDIUM",
          summary: `Analyzed ${f.filename}`,
          analysisId: 101,
        }))
      );
    }
    setIsLoading(false);
  }

  return (
    <main className="min-h-screen bg-background px-4 py-4 text-foreground md:px-6 md:py-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col gap-4 md:min-h-[calc(100vh-3rem)]">
        <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
          <h1 className="text-sm font-medium text-foreground/60">
            Analyse Code
          </h1>
          <AnalyseToggle mode={mode} onModeChange={handleModeChange} />
        </div>
        <div className="flex min-h-0 flex-1 flex-col border border-foreground/10 lg:flex-row">
          <CodeInputPanel
            value={input}
            onChange={setInput}
            onSubmit={handleAnalyze}
            isLoading={isLoading}
          />
          <AnalysisPanel result={result} error={error} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
