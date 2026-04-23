"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
  Legend,
} from "recharts";
import { axisStyle, chartPalette, series, tooltipStyle } from "./chartTheme";

export type LineSpec = {
  key: string;
  label: string;
  color?: string;
  dash?: string;
  yAxisId?: string;
};

export function PriceLine({
  data,
  lines,
  height = 340,
  xKey = "year",
  yUnit = "",
  marks,
  yDomain,
}: {
  data: any[];
  lines: LineSpec[];
  height?: number;
  xKey?: string;
  yUnit?: string;
  marks?: { x: number | string; label: string; color?: string }[];
  yDomain?: [number | "auto", number | "auto"];
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 16, right: 28, bottom: 8, left: 8 }}>
          <CartesianGrid stroke={chartPalette.grid} vertical={false} />
          <XAxis dataKey={xKey} {...axisStyle} />
          <YAxis {...axisStyle} domain={yDomain} tickFormatter={(v) => `${v}${yUnit}`} width={66} />
          <Tooltip {...tooltipStyle} formatter={(v: any) => [`${v}${yUnit}`]} />
          {lines.length > 1 && (
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              iconType="plainline"
            />
          )}
          {marks?.map((m, i) => (
            <ReferenceLine
              key={String(m.x)}
              x={m.x}
              stroke={m.color || chartPalette.neutral}
              strokeDasharray="3 3"
              label={{
                value: m.label,
                position: "top",
                fill: m.color || chartPalette.muted,
                fontSize: 10,
                fontStyle: "italic",
                dy: (i % 2 === 0 ? -14 : -2),
              }}
            />
          ))}
          {lines.map((l, i) => (
            <Line
              key={l.key}
              type="monotone"
              dataKey={l.key}
              name={l.label}
              stroke={l.color || series[i % series.length]}
              strokeWidth={2}
              strokeDasharray={l.dash}
              dot={{ r: 2.5, stroke: "none", fill: l.color || series[i % series.length] }}
              activeDot={{ r: 4 }}
              yAxisId={l.yAxisId}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
