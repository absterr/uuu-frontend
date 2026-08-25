import AnalysisPanel from "@/components/analyse/AnalysisPanel";
import CodeInputPanel from "@/components/analyse/CodeInputPanel";
import { analyzeCode, type AnalyzeData } from "@/lib/analyse-code";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/analyse")({
  component: AnalysePage,
});

function AnalysePage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisId, setAnalysisId] = useState<number | null>(null);
  const [result, setResult] = useState<AnalyzeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    if (code.trim() === "") return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await analyzeCode(code);
      setAnalysisId(response.id);
      setResult(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Analysis failed. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-4 text-foreground md:px-6 md:py-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col md:min-h-[calc(100vh-3rem)]">
        <h1 className="sr-only">Analyze COBOL code</h1>

        <div className="flex min-h-0 flex-1 flex-col border border-foreground/10 lg:flex-row">
          <CodeInputPanel
            code={code}
            onCodeChange={setCode}
            onSubmit={handleAnalyze}
            isLoading={isLoading}
          />

          <AnalysisPanel
            analysisId={analysisId}
            result={result}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </main>
  );
}

export default AnalysePage;
