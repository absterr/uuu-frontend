import type { BulkFile } from "@/lib/mock-data/analysis";
import { cn } from "@/lib/utils";

interface Props {
  value: string | BulkFile[];
  onChange: (val: string | BulkFile[]) => void;
  onSubmit: () => void;
  isLoading: boolean;
  className?: string;
}

export default function CodeInputPanel({
  value,
  onChange,
  onSubmit,
  isLoading,
  className,
}: Props) {
  const isBulk = Array.isArray(value);

  const handleFiles = (fileList: FileList) => {
    if (isBulk) {
      Promise.all(
        Array.from(fileList).map(async (f) => ({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          filename: f.name,
          lines: (await f.text()).split("\n").length,
          content: await f.text(),
        })),
      ).then((newFiles) => onChange([...value, ...newFiles]));
    } else {
      const file = fileList[0];
      if (file) file.text().then((text) => onChange(text));
    }
  };

  return (
    <section
      aria-labelledby="input-heading"
      className={cn(
        "min-h-0 min-w-0 flex-1 border-b border-foreground/10 flex flex-col lg:border-r lg:border-b-0",
        className,
      )}
    >
      <header className="flex items-center justify-between border-b border-foreground/10 px-4 py-3 md:px-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
            Input
          </span>
          <h2
            id="input-heading"
            className="text-sm font-medium text-foreground"
          >
            {isBulk ? "Source Queue" : "COBOL Source"}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {!isBulk && (
            <label className="cursor-pointer border border-foreground/15 px-2.5 py-1 text-xs font-medium text-foreground/70 hover:border-accent hover:text-plum">
              Upload file
              <input
                type="file"
                accept=".cbl,.cob,.txt"
                onChange={(e) =>
                  e.target.files?.length && handleFiles(e.target.files)
                }
                className="sr-only"
              />
            </label>
          )}
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
            {isBulk
              ? `${value.length} queued`
              : `${value ? value.split("\n").length : 0} lines`}
          </span>
        </div>
      </header>

      <div className="flex min-h-0 w-full flex-1 flex-col p-4 md:p-6">
        {isBulk ? (
          <div className="flex flex-1 flex-col gap-4 min-h-0">
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                e.dataTransfer.files?.length &&
                  handleFiles(e.dataTransfer.files);
              }}
              className="flex flex-col items-center justify-center gap-2 border border-dashed border-foreground/15 bg-foreground/5 p-6 text-center"
            >
              <p className="text-sm text-foreground/60">Drag files here, or</p>
              <span className="cursor-pointer border border-foreground/15 px-3 py-1.5 text-xs font-medium text-foreground/70 hover:border-accent hover:text-plum">
                Browse files
              </span>
              <input
                type="file"
                multiple
                accept=".cbl,.cob,.txt"
                onChange={(e) =>
                  e.target.files?.length && handleFiles(e.target.files)
                }
                className="sr-only"
              />
            </label>
            <ul className="flex-1 divide-y divide-foreground/10 overflow-y-auto border-t border-foreground/10">
              {value.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between gap-3 px-2 py-3 hover:bg-foreground/5"
                >
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium text-foreground">
                      {f.filename}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-foreground/40">
                      {f.lines} lines
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onChange(value.filter((x) => x.id !== f.id))}
                    className="cursor-pointer text-foreground/30 hover:text-plum"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste COBOL source code here..."
            className="w-full flex-1 resize-none border border-foreground/15 bg-foreground/5 p-4 font-mono text-xs text-foreground focus-visible:outline-1 focus-visible:outline-accent"
          />
        )}
      </div>

      <footer
        className={`flex items-center border-t border-foreground/10 px-4 py-3 md:px-6 ${isBulk ? "justify-between" : "justify-end"}`}
      >
        {isBulk && (
          <button
            type="button"
            onClick={() => onChange([])}
            disabled={!value.length || isLoading}
            className="cursor-pointer text-xs text-foreground/50 hover:text-plum disabled:text-foreground/20"
          >
            Clear all
          </button>
        )}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || (isBulk ? !value.length : !value.trim())}
          className="flex cursor-pointer items-center gap-1 bg-plum px-4 py-2 text-xs font-medium text-background hover:bg-plum/90 disabled:bg-foreground/10 disabled:text-foreground/30"
        >
          <span>
            {isLoading
              ? "Analyzing..."
              : isBulk
                ? `Analyze all (${value.length})`
                : "Analyze Source"}
          </span>
          {!isLoading && <span aria-hidden="true">↗</span>}
        </button>
      </footer>
    </section>
  );
}
