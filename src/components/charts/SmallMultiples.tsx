"use client";

import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { chartPalette } from "./chartTheme";

export type MultipleSeries = {
  id: string;
  label: string;
  sub?: string;
  color?: string;
  data: { year: number; value: number | undefined }[];
};

export function SmallMultiples({
  items,
  height = 120,
  unit = "",
  markYear,
  columns = 4,
}: {
  items: MultipleSeries[];
  height?: number;
  unit?: string;
  markYear?: number;
  columns?: 2 | 3 | 4;
}) {
  const colClass =
    columns === 2 ? "grid-cols-2" : columns === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  return (
    <div className={`grid ${colClass} gap-3`}>
      {items.map((m) => {
        const values = m.data.map((d) => d.value).filter((v): v is number => v !== undefined);
        const min = values.length ? Math.min(...values) : 0;
        const max = values.length ? Math.max(...values) : 1;
        const latest = m.data[m.data.length - 1]?.value;
        const first = m.data[0]?.value;
        const pct = first && latest ? (latest / first - 1) * 100 : 0;
        const tone = pct >= 0 ? chartPalette.bull : chartPalette.bear;
        return (
          <div
            key={m.id}
            className="bg-paper border border-rule rounded-md p-3 flex flex-col gap-1.5 shadow-card"
          >
            <div className="flex items-baseline justify-between gap-2">
              <div className="serif text-[0.95rem] leading-tight text-ink-900">{m.label}</div>
              <div className="text-[0.7rem] tabnums" style={{ color: tone }}>
                {pct >= 0 ? "+" : ""}
                {pct.toFixed(0)}%
              </div>
            </div>
            {m.sub && <div className="text-[0.7rem] text-ink-500 leading-snug">{m.sub}</div>}
            <div style={{ height }}>
              <ResponsiveContainer>
                <LineChart data={m.data} margin={{ top: 6, right: 4, bottom: 0, left: 0 }}>
                  <XAxis dataKey="year" hide />
                  <YAxis hide domain={[min * 0.95, max * 1.05]} />
                  {markYear && (
                    <ReferenceLine
                      x={markYear}
                      stroke={chartPalette.rule}
                      strokeDasharray="2 2"
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={m.color || chartPalette.lake}
                    strokeWidth={1.6}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-[0.7rem] text-ink-500 tabnums">
              <span>{m.data[0]?.year}</span>
              <span className="text-ink-800 font-medium">
                {latest !== undefined ? `${latest.toLocaleString()}${unit}` : "—"}
              </span>
              <span>{m.data[m.data.length - 1]?.year}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
