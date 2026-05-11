"use client";

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { axisStyle, chartPalette, tooltipStyle } from "./chartTheme";

export type FanPoint = {
  year: number;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  historical?: number;
};

export function ScenarioFan({
  data,
  startYear,
  height = 360,
  yUnit = "",
}: {
  data: FanPoint[];
  startYear: number;
  height?: number;
  yUnit?: string;
}) {
  // Render ranges as stacked transparent areas
  const mapped = data.map((d) => ({
    ...d,
    low90: d.p10,
    width80: d.p90 - d.p10,
    inner25to75: d.p75 - d.p25,
    low50: d.p25,
  }));
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <ComposedChart data={mapped} margin={{ top: 20, right: 28, bottom: 8, left: 8 }}>
          <CartesianGrid stroke={chartPalette.grid} vertical={false} />
          <XAxis dataKey="year" {...axisStyle} />
          <YAxis
            {...axisStyle}
            tickFormatter={(v) => `${v}${yUnit}`}
            width={70}
            domain={[(dataMin: number) => Math.floor(dataMin * 0.92), (dataMax: number) => Math.ceil(dataMax * 1.05)]}
          />
          <Tooltip {...tooltipStyle} formatter={(v: any) => [`${Number(v).toFixed(1)}${yUnit}`]} />
          <Legend wrapperStyle={{ fontSize: 12 }} iconType="square" />
          <ReferenceLine x={startYear} stroke={chartPalette.muted} strokeDasharray="3 3" label={{ value: "forecast →", position: "top", fill: chartPalette.muted, fontSize: 10, fontStyle: "italic" }} />

          {/* 10–90 band (stack base invisible, top visible) */}
          <Area
            type="monotone"
            dataKey="low90"
            stackId="ci"
            stroke="transparent"
            fill="transparent"
            legendType="none"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="width80"
            stackId="ci"
            stroke={chartPalette.lakeLight}
            fill={chartPalette.lakeLight}
            fillOpacity={0.22}
            name="10–90 percentile"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="low50"
            stackId="ci2"
            stroke="transparent"
            fill="transparent"
            legendType="none"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="inner25to75"
            stackId="ci2"
            stroke={chartPalette.lake}
            fill={chartPalette.lake}
            fillOpacity={0.32}
            name="25–75 percentile"
            isAnimationActive={false}
          />
          <Line type="monotone" dataKey="p50" stroke={chartPalette.ink} strokeWidth={2} dot={false} name="Median path" />
          <Line
            type="monotone"
            dataKey="historical"
            stroke={chartPalette.gold}
            strokeWidth={2}
            dot={{ r: 2.5, fill: chartPalette.gold }}
            name="Historical"
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
