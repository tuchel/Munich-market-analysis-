"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceDot,
  ReferenceLine,
} from "recharts";
import { axisStyle, chartPalette, tooltipStyle } from "./chartTheme";
import { gradientSeries } from "@/data/lakefront";

export function ShoreGradientChart({ height = 340 }: { height?: number }) {
  const data = gradientSeries();
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 16, right: 28, bottom: 8, left: 8 }}>
          <CartesianGrid stroke={chartPalette.grid} vertical={false} />
          <XAxis
            dataKey="distanceM"
            type="number"
            {...axisStyle}
            domain={[0, 400]}
            tickFormatter={(v) => `${v} m`}
            label={{ value: "Distance from waterline (m)", position: "insideBottom", offset: -4, fill: chartPalette.muted, fontSize: 11 }}
          />
          <YAxis
            {...axisStyle}
            domain={[0, 1.1]}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            width={60}
            label={{ value: "% of direct-lakefront €/m²", angle: -90, position: "insideLeft", fill: chartPalette.muted, fontSize: 11 }}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(v: any, n: any) => [`${(Number(v) * 100).toFixed(0)}%`, n]}
            labelFormatter={(l: any) => `${l} m inland`}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} iconType="plainline" />
          <ReferenceLine y={1} stroke={chartPalette.rule} strokeDasharray="3 3" />
          <Area
            type="monotone"
            dataKey="withView"
            stroke={chartPalette.lake}
            fill={chartPalette.lake}
            fillOpacity={0.18}
            strokeWidth={2}
            name="With lake view"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="noView"
            stroke={chartPalette.gold}
            strokeWidth={2}
            strokeDasharray="4 3"
            dot={false}
            name="No view"
          />
          <ReferenceDot x={0} y={1} r={5} fill={chartPalette.lakeDeep} stroke="#faf8f3" strokeWidth={2} />
          <ReferenceDot x={60} y={0.43} r={3} fill={chartPalette.lake} stroke="#faf8f3" />
          <ReferenceDot x={120} y={0.22} r={3} fill={chartPalette.lake} stroke="#faf8f3" />
          <ReferenceDot x={300} y={0.11} r={3} fill={chartPalette.lake} stroke="#faf8f3" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
