const COBOL_ZONES = [
  { label: "Seq", range: "1-6" },
  { label: "Ind", range: "7" },
  { label: "Area A", range: "8-11" },
  { label: "Area B", range: "12-72" },
];

export default function ColumnGuide() {
  return (
    <ul
      className="flex flex-wrap gap-2 border-b border-foreground/10 px-4 py-2"
      aria-label="COBOL fixed-format column zones"
    >
      {COBOL_ZONES.map((zone) => (
        <li
          key={zone.label}
          className="bg-foreground/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground/60"
        >
          {zone.label}{" "}
          <span className="font-mono normal-case tracking-normal text-foreground/40">
            {zone.range}
          </span>
        </li>
      ))}
    </ul>
  );
}
