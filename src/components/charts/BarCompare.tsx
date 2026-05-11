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
  Cell,
} from "recharts";
import { axisStyle, chartPalette, tooltipStyle, series } from "./chartTheme";

export function BarCompare({
  data,
  xKey,
  bars,
  height = 320,
  layout = "vertical",
  yUnit = "",
}: {
  data: any[];
  xKey: string;
  bars: { key: string; label: string; color?: string }[];
  height?: number;
  layout?: "vertical" | "horizontal";
  yUnit?: string;
}) {
  const isHoriz = layout === "horizontal";
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout={isHoriz ? "vertical" : "horizontal"}
          margin={{ top: 12, right: 28, bottom: 8, left: isHoriz ? 96 : 8 }}
        >
          <CartesianGrid stroke={chartPalette.grid} vertical={isHoriz} horizontal={!isHoriz} />
          {isHoriz ? (
            <>
              <XAxis type="number" {...axisStyle} tickFormatter={(v) => `${v}${yUnit}`} />
              <YAxis type="category" dataKey={xKey} {...axisStyle} width={110} />
            </>
          ) : (
            <>
              <XAxis type="category" dataKey={xKey} {...axisStyle} />
              <YAxis type="number" {...axisStyle} tickFormatter={(v) => `${v}${yUnit}`} width={64} />
            </>
          )}
          <Tooltip {...tooltipStyle} formatter={(v: any) => [`${v}${yUnit}`]} />
          {bars.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} iconType="square" />}
          {bars.map((b, i) => (
            <Bar key={b.key} dataKey={b.key} name={b.label} fill={b.color || series[i % series.length]} radius={3} maxBarSize={28}>
              {data.map((d, idx) => (
                <Cell key={idx} fill={(d._color as string) || b.color || series[i % series.length]} />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
