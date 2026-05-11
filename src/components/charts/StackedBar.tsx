"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { axisStyle, chartPalette, tooltipStyle, series as seriesColors } from "./chartTheme";

export function StackedBar({
  data,
  xKey,
  stacks,
  height = 340,
  yUnit = "",
  layout = "horizontal",
}: {
  data: any[];
  xKey: string;
  stacks: { key: string; label: string; color?: string }[];
  height?: number;
  yUnit?: string;
  layout?: "horizontal" | "vertical";
}) {
  const isVert = layout === "vertical";
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart data={data} layout={isVert ? "vertical" : "horizontal"} margin={{ top: 16, right: 28, bottom: 8, left: isVert ? 120 : 8 }}>
          <CartesianGrid stroke={chartPalette.grid} vertical={isVert} horizontal={!isVert} />
          {isVert ? (
            <>
              <XAxis type="number" {...axisStyle} tickFormatter={(v) => `${v}${yUnit}`} />
              <YAxis type="category" dataKey={xKey} {...axisStyle} width={130} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} {...axisStyle} />
              <YAxis {...axisStyle} tickFormatter={(v) => `${v}${yUnit}`} width={70} />
            </>
          )}
          <Tooltip {...tooltipStyle} formatter={(v: any) => [`${v}${yUnit}`]} />
          <Legend wrapperStyle={{ fontSize: 12 }} iconType="square" />
          {stacks.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              stackId="stack"
              fill={s.color || seriesColors[i % seriesColors.length]}
              radius={i === stacks.length - 1 ? [3, 3, 0, 0] : 0}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
