"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { chartPalette, series, tooltipStyle } from "./chartTheme";

export function RadarCompare({
  data,
  names,
  height = 360,
}: {
  data: { metric: string; [k: string]: number | string }[];
  names: string[];
  height?: number;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke={chartPalette.rule} />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: chartPalette.ink }} />
          <PolarRadiusAxis angle={90} tick={{ fontSize: 10, fill: chartPalette.muted }} stroke={chartPalette.rule} domain={[0, 10]} />
          <Tooltip {...tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12 }} iconType="square" />
          {names.map((n, i) => (
            <Radar
              key={n}
              name={n}
              dataKey={n}
              stroke={series[i % series.length]}
              fill={series[i % series.length]}
              fillOpacity={0.22}
              strokeWidth={2}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
