import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import CodeMapCanvas from "@/components/app/home/codemap/CodemapCanvas";
import type { CodeMapResponse } from "@/lib/types/codemap";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_app/_home/codemap/$analysisId")({
  component: CodeMapPage,
});

function CodeMapPage() {
  const { analysisId } = Route.useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["codemap", analysisId],
    queryFn: () => api<CodeMapResponse>(`/codemap/${analysisId}`),
  });

  return (
    <main
      className="flex h-full min-h-0 flex-col bg-background px-4 py-4 text-foreground
      md:px-6 md:py-6"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4">
        <header className="border-b border-foreground/10 pb-4">
          <p className="text-sm font-medium text-foreground/60 pb-2">
            Code Map
          </p>

          {data && (
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">{data.title}</h1>
              {data.summary && (
                <p className="max-w-3xl text-sm text-foreground/60">
                  {data.summary}
                </p>
              )}
            </div>
          )}
        </header>

        <section className="flex min-h-0 flex-1 flex-col border border-foreground/10">
          {isLoading && (
            <div className="flex flex-1 items-center justify-center text-sm text-foreground/50">
              Loading code map...
            </div>
          )}

          {error && (
            <div
              className="flex flex-1 items-center justify-center px-6 text-center
              text-sm text-red-600"
              role="alert"
            >
              {error.message}
            </div>
          )}
          {data && <CodeMapCanvas nodes={data.nodes} edges={data.edges} />}
        </section>
      </div>
    </main>
  );
}
