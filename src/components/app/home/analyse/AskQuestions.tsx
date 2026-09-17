import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { askQuestion, getAskHistory } from "@/lib/requests";

interface Props {
  analysisId: string;
}

export default function AskQuestions({ analysisId }: Props) {
  const [question, setQuestion] = useState("");

  const historyQuery = useQuery({
    queryKey: ["ask-history", analysisId],
    queryFn: () => getAskHistory(analysisId),
  });

  const askMutation = useMutation({
    mutationFn: (value: string) => askQuestion(analysisId, value),
    onSuccess: () => {
      setQuestion("");
      historyQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSubmit() {
    const value = question.trim();

    if (!value || askMutation.isPending) return;

    askMutation.mutate(value);
  }

  const messages = historyQuery.data?.conversation ?? [];

  return (
    <section className="flex flex-col gap-4 border-t border-foreground/10 pt-6">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
          Ask Questions
        </span>
        <p className="text-xs text-foreground/40">
          Ask about this analysis and its source code.
        </p>
      </div>

      {messages.length > 0 && (
        <div className="flex flex-col gap-3">
          {messages.map((message, index) => (
            <div
              key={message.id ?? `${message.role}-${index}`}
              className={
                message.role === "user"
                  ? "self-end max-w-[85%] bg-foreground/5 px-3 py-2 text-sm"
                  : "max-w-[85%] border border-foreground/10 px-3 py-2 text-sm text-foreground/70"
              }
            >
              {message.content}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSubmit();
          }}
          placeholder="Ask a question..."
          aria-label="Ask a question about this analysis"
          className="min-w-0 flex-1 border border-foreground/15 bg-foreground/5 px-3 py-2 text-xs outline-none focus:border-accent"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!question.trim() || askMutation.isPending}
          className="shrink-0 bg-plum px-3 py-2 text-xs font-medium text-background hover:bg-plum/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {askMutation.isPending ? "Asking..." : "Send"}
        </button>
      </div>
    </section>
  );
}
