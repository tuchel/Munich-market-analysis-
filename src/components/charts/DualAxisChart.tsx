"use client";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { axisStyle, chartPalette, tooltipStyle } from "./chartTheme";

export type DualSeries = {
  key: string;
  label: string;
  type: "line" | "bar";
  color: string;
  yAxisId: "left" | "right";
  unit?: string;
};

export function DualAxisChart({
  data,
  series,
  height = 380,
  leftUnit = "",
  rightUnit = "",
  marks,
}: {
  data: any[];
  series: DualSeries[];
  height?: number;
  leftUnit?: string;
  rightUnit?: string;
  marks?: { x: number | string; label: string; tone?: "bull" | "bear" | "neutral" }[];
}) {
  const markColor = (tone?: string) =>
    tone === "bull" ? chartPalette.bull : tone === "bear" ? chartPalette.bear : chartPalette.neutral;

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 24, right: 30, bottom: 8, left: 8 }}>
          <CartesianGrid stroke={chartPalette.grid} vertical={false} />
          <XAxis dataKey="year" {...axisStyle} />
          <YAxis yAxisId="left" {...axisStyle} tickFormatter={(v) => `${leftUnit === "€" ? "€" : ""}${v.toLocaleString()}${leftUnit !== "€" ? leftUnit : ""}`} width={72} />
          <YAxis yAxisId="right" orientation="right" {...axisStyle} tickFormatter={(v) => `${v.toLocaleString()}${rightUnit}`} width={60} />
          <Tooltip {...tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="plainline" />
          {marks?.map((m) => (
            <ReferenceLine
              key={String(m.x)}
              x={m.x}
              yAxisId="left"
              stroke={markColor(m.tone)}
              strokeDasharray="3 3"
              label={{
                value: m.label,
                position: "top",
                fill: markColor(m.tone),
                fontSize: 10,
                fontStyle: "italic",
              }}
            />
          ))}
          {series.map((s) =>
            s.type === "line" ? (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                dot={{ r: 2.5, fill: s.color, stroke: "none" }}
                activeDot={{ r: 4 }}
                yAxisId={s.yAxisId}
              />
            ) : (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label}
                fill={s.color}
                yAxisId={s.yAxisId}
                radius={[2, 2, 0, 0]}
                maxBarSize={26}
                fillOpacity={0.82}
              />
            )
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
