"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, ComposedChart, Area, ReferenceLine, ReferenceArea,
} from "recharts";

const FONT_FAMILY = "Inter, ui-sans-serif, system-ui, sans-serif";
const COLORS = {
  primary: "#225d76",      // lake-500
  primaryLight: "#6fa0b4", // lake-300
  primaryDark: "#123848",  // lake-700
  gold: "#a27f3b",         // gold-500
  goldLight: "#c2a057",    // gold-400
  ink: "#332d22",          // ink-700
  inkLight: "#8e8264",     // ink-400
  rule: "#cdc5b0",
  bull: "#2f6a3f",
  bear: "#9e3838",
  parchment: "#f2ede0",
};

export const palette = COLORS;

const tooltipStyle = {
  fontFamily: FONT_FAMILY,
  fontSize: 12,
  background: "#faf8f3",
  border: `1px solid ${COLORS.rule}`,
  borderRadius: 4,
  padding: "8px 10px",
  boxShadow: "0 4px 12px rgba(26,22,13,0.08)",
};
const labelStyle = { color: COLORS.ink, fontWeight: 600, marginBottom: 4 };
const itemStyle = { color: COLORS.ink };

type Series = {
  key: string;
  label: string;
  color?: string;
  type?: "line" | "bar" | "area";
  dashed?: boolean;
  yAxis?: "left" | "right";
};

type AnnoBand = { from: number; to: number; label?: string; fill?: string };

export function MarketLineChart({
  data,
  series,
  height = 320,
  yLabel,
  yRightLabel,
  yFormat,
  yRightFormat,
  annotations,
  xKey = "year",
  yDomain,
  yRightDomain,
}: {
  data: Array<Record<string, number | string | undefined>>;
  series: Series[];
  height?: number;
  yLabel?: string;
  yRightLabel?: string;
  yFormat?: (v: number) => string;
  yRightFormat?: (v: number) => string;
  annotations?: AnnoBand[];
  xKey?: string;
  yDomain?: [number | "auto", number | "auto"];
  yRightDomain?: [number | "auto", number | "auto"];
}) {
  const hasRight = series.some((s) => s.yAxis === "right");
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 12, right: hasRight ? 36 : 16, bottom: 6, left: 8 }}>
          <CartesianGrid stroke={COLORS.rule} strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey={xKey}
            stroke={COLORS.inkLight}
            tickLine={false}
            axisLine={{ stroke: COLORS.rule }}
            style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}
          />
          <YAxis
            yAxisId="left"
            stroke={COLORS.inkLight}
            tickLine={false}
            axisLine={false}
            tickFormatter={yFormat ?? ((v: number) => String(v))}
            style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}
            domain={yDomain}
            label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft", offset: 8, style: { fill: COLORS.ink, fontSize: 11, fontFamily: FONT_FAMILY } } : undefined}
          />
          {hasRight ? (
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={COLORS.inkLight}
              tickLine={false}
              axisLine={false}
              tickFormatter={yRightFormat ?? ((v: number) => String(v))}
              style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}
              domain={yRightDomain}
              label={yRightLabel ? { value: yRightLabel, angle: 90, position: "insideRight", offset: 12, style: { fill: COLORS.ink, fontSize: 11, fontFamily: FONT_FAMILY } } : undefined}
            />
          ) : null}
          {annotations?.map((a, i) => (
            <ReferenceArea
              key={i}
              x1={a.from}
              x2={a.to}
              yAxisId="left"
              fill={a.fill ?? COLORS.goldLight}
              fillOpacity={0.12}
              label={a.label ? { value: a.label, position: "insideTop", style: { fill: COLORS.gold, fontSize: 10, fontFamily: FONT_FAMILY, fontWeight: 600 } } : undefined}
            />
          ))}
          <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} itemStyle={itemStyle} formatter={(v) => (typeof v === "number" ? v.toLocaleString("en-US") : String(v ?? "—"))} />
          <Legend
            iconType="line"
            wrapperStyle={{ fontFamily: FONT_FAMILY, fontSize: 12, color: COLORS.ink, paddingTop: 4 }}
          />
          {series.map((s) => {
            const yAxisId = s.yAxis === "right" ? "right" : "left";
            const color = s.color ?? COLORS.primary;
            if (s.type === "bar") {
              return <Bar key={s.key} dataKey={s.key} name={s.label} fill={color} yAxisId={yAxisId} radius={[2, 2, 0, 0]} />;
            }
            if (s.type === "area") {
              return <Area key={s.key} dataKey={s.key} name={s.label} stroke={color} fill={color} fillOpacity={0.16} yAxisId={yAxisId} strokeWidth={2} />;
            }
            return (
              <Line
                key={s.key}
                dataKey={s.key}
                name={s.label}
                stroke={color}
                strokeWidth={2}
                strokeDasharray={s.dashed ? "5 4" : undefined}
                dot={{ r: 2.5, stroke: color, strokeWidth: 1, fill: "#faf8f3" }}
                activeDot={{ r: 4 }}
                yAxisId={yAxisId}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MarketBarChart({
  data,
  series,
  height = 280,
  xKey = "year",
  yFormat,
  yDomain,
  stacked = false,
}: {
  data: Array<Record<string, number | string | undefined>>;
  series: Series[];
  height?: number;
  xKey?: string;
  yFormat?: (v: number) => string;
  yDomain?: [number | "auto", number | "auto"];
  stacked?: boolean;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 12, right: 16, bottom: 6, left: 8 }}>
          <CartesianGrid stroke={COLORS.rule} strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey={xKey} stroke={COLORS.inkLight} tickLine={false} axisLine={{ stroke: COLORS.rule }} style={{ fontFamily: FONT_FAMILY, fontSize: 11 }} />
          <YAxis stroke={COLORS.inkLight} tickLine={false} axisLine={false} tickFormatter={yFormat ?? ((v: number) => String(v))} style={{ fontFamily: FONT_FAMILY, fontSize: 11 }} domain={yDomain} />
          <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} itemStyle={itemStyle} formatter={(v) => (typeof v === "number" ? v.toLocaleString("en-US") : String(v ?? "—"))} />
          <Legend wrapperStyle={{ fontFamily: FONT_FAMILY, fontSize: 12, color: COLORS.ink, paddingTop: 4 }} />
          {series.map((s) => (
            <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color ?? COLORS.primary} stackId={stacked ? "a" : undefined} radius={[2, 2, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
