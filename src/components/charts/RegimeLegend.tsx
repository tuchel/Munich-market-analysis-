import { regimeMarks } from "@/data/timeseries";

export function RegimeLegend({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.72rem] text-ink-600 leading-snug">
      <span className="uppercase tracking-wider text-[0.6rem] text-ink-500 font-semibold">
        Regime marks
      </span>
      {regimeMarks.map((m) => {
        const color = m.tone === "bull" ? "#2f6a3f" : m.tone === "bear" ? "#9e3838" : "#8a7b5c";
        return (
          <span key={m.year} className="inline-flex items-baseline gap-1.5">
            <span className="tabnums font-semibold" style={{ color }}>
              {m.year}
            </span>
            <span className="text-ink-800 font-medium">{m.label}</span>
            {!compact && m.detail && (
              <span className="text-ink-500 italic">— {m.detail}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
