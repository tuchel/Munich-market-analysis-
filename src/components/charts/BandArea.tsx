"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { axisStyle, chartPalette, tooltipStyle } from "./chartTheme";

export type BandSpec = {
  lowKey: string;
  highKey: string;
  label: string;
  fill: string;
  stroke?: string;
};

export function BandArea({
  data,
  bands,
  yUnit = "",
  height = 320,
}: {
  data: any[];
  bands: BandSpec[];
  yUnit?: string;
  height?: number;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid stroke={chartPalette.grid} vertical={false} />
          <XAxis dataKey="year" {...axisStyle} />
          <YAxis {...axisStyle} tickFormatter={(v) => `${v.toLocaleString()}${yUnit}`} width={72} />
          <Tooltip {...tooltipStyle} formatter={(v: any) => [`${v}${yUnit}`]} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="square" />
          {bands.map((b) => (
            <Area
              key={b.label}
              type="monotone"
              dataKey={b.highKey}
              name={b.label}
              stroke={b.stroke || b.fill}
              fill={b.fill}
              fillOpacity={0.22}
              strokeWidth={1}
              isAnimationActive={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
