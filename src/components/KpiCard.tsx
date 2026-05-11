import clsx from "clsx";
import { Chip, Tone } from "./Chip";
import { Sparkline } from "./Sparkline";

export function KpiCard({
  label,
  value,
  unit,
  sub,
  series,
  tone,
  chipLabel,
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  series?: number[];
  tone?: Tone;
  chipLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "bg-paper border border-rule rounded-md p-4 flex flex-col gap-2 shadow-card hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="kicker text-ink-500">{label}</div>
        {chipLabel && <Chip tone={tone}>{chipLabel}</Chip>}
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <span className="number-xl text-ink-900">{value}</span>
          {unit && <span className="ml-1 text-sm text-ink-500 font-sans">{unit}</span>}
        </div>
        {series && <Sparkline values={series} stroke={tone === "bear" ? "#9e3838" : tone === "bull" ? "#2f6a3f" : "#225d76"} />}
      </div>
      {sub && <div className="text-xs text-ink-600 leading-snug">{sub}</div>}
    </div>
  );
}
