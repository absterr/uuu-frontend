import type { ChangeEvent } from "react";
import ColumnGuide from "./ColumnGuide";

interface CodeInputPanelProps {
  code: string;
  onCodeChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function CodeInputPanel({
  code,
  onCodeChange,
  onSubmit,
  isLoading,
}: CodeInputPanelProps) {
  const lineCount = code === "" ? 0 : code.split("\n").length;

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    file.text().then(onCodeChange);
    event.target.value = "";
  }

  return (
    <section
      className="flex min-h-0 flex-1 flex-col border-b border-foreground/10 lg:border-r lg:border-b-0"
      aria-labelledby="code-input-heading"
    >
      <header className="flex items-center justify-between gap-4 border-b border-foreground/10 px-4 py-3 md:px-6">
        <div className="flex flex-col gap-1">
          <p className="font-mono font-semibold text-[10px] uppercase tracking-wider text-foreground/40">
            Input
          </p>
          <h2
            id="code-input-heading"
            className="text-sm font-medium text-foreground"
          >
            COBOL Source
          </h2>
        </div>

        <label
          className={`cursor-pointer border border-foreground/15 px-3 py-2 text-xs
            font-medium text-foreground/70 transition-colors hover:border-accent
            hover:bg-accent/10 hover:text-plum focus-within:outline-1 focus-within:outline-offset-1 focus-within:outline-accent`}
        >
          Upload file
          <input
            type="file"
            accept=".cbl,.cob,.txt"
            onChange={handleFileUpload}
            className="sr-only"
          />
        </label>
      </header>

      <ColumnGuide />

      <label htmlFor="cobol-code" className="sr-only">
        COBOL code
      </label>

      <textarea
        id="cobol-code"
        value={code}
        onChange={(event) => onCodeChange(event.target.value)}
        placeholder="Paste COBOL source here..."
        spellCheck={false}
        className={`min-h-0 flex-1 resize-none bg-background p-4 font-mono text-sm
          leading-6 text-foreground placeholder:text-foreground/30 focus-visible:outline-1
          focus-visible:-outline-offset-1 focus-visible:outline-accent md:p-6`}
      />

      <footer className="flex items-center justify-between border-t border-foreground/10 px-4 py-3 md:px-6">
        <span className="font-mono text-[10px] tabular-nums uppercase tracking-wider text-foreground/40">
          {lineCount} {lineCount === 1 ? "line" : "lines"}
        </span>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || code.trim() === ""}
          className={`bg-plum px-4 py-2 text-xs font-medium text-background transition-colors
            hover:bg-plum/90 focus-visible:outline-1 focus-visible:outline-offset-1
            focus-visible:outline-accent disabled:cursor-not-allowed disabled:bg-foreground/10 disabled:text-foreground/30`}
        >
          <span>{isLoading ? "Analyzing..." : "Analyze "}</span>
          {!isLoading && <span aria-hidden="true">↗</span>}
        </button>
      </footer>
    </section>
  );
}
