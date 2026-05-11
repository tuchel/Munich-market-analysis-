// Pure server-renderable SVG chart library — replaces recharts.
// No "use client"; no browser globals. Renders identical output server-side and client-side
// so static export works for every page.

import React from "react";

export const palette = {
  primary: "#225d76",
  primaryLight: "#6fa0b4",
  primaryDark: "#123848",
  gold: "#a27f3b",
  goldLight: "#c2a057",
  ink: "#332d22",
  inkLight: "#8e8264",
  rule: "#cdc5b0",
  bull: "#2f6a3f",
  bear: "#9e3838",
  parchment: "#f2ede0",
  paper: "#faf8f3",
};

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";

// ─── helpers ─────────────────────────────────────────────────────────────

function niceStep(rough: number) {
  const mag = Math.pow(10, Math.floor(Math.log10(Math.abs(rough))));
  const n = rough / mag;
  if (n < 1.5) return mag;
  if (n < 3) return 2 * mag;
  if (n < 7) return 5 * mag;
  return 10 * mag;
}

function niceTicks(min: number, max: number, count = 5): number[] {
  if (min === max) {
    const v = min;
    return [v - 1, v, v + 1];
  }
  const range = max - min;
  const step = niceStep(range / count);
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  // Use a safety bound to avoid floating-point infinite loops
  for (let v = start, i = 0; v <= end + step / 2 && i < 50; v += step, i++) {
    ticks.push(Number(v.toFixed(10)));
  }
  return ticks;
}

function autoDomain(values: number[]): [number, number] {
  let min = Infinity;
  let max = -Infinity;
  for (const v of values) {
    if (typeof v === "number" && isFinite(v)) {
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  if (!isFinite(min) || !isFinite(max)) return [0, 1];
  if (min === max) return [min - 1, max + 1];
  const range = max - min;
  // Pad: 5% below, 10% above; clamp to 0 if already positive baseline
  const padBottom = range * 0.05;
  const padTop = range * 0.1;
  let lo = min - padBottom;
  let hi = max + padTop;
  // If all-positive and min not near zero, allow a soft baseline
  if (min >= 0 && lo < 0) lo = 0;
  return [lo, hi];
}

function resolveDomain(
  values: number[],
  override?: [number | "auto", number | "auto"]
): [number, number] {
  const auto = autoDomain(values);
  if (!override) return auto;
  const lo = override[0] === "auto" ? auto[0] : (override[0] as number);
  const hi = override[1] === "auto" ? auto[1] : (override[1] as number);
  // Snap to nice ticks for cleaner axis
  const ticks = niceTicks(lo, hi);
  return [ticks[0], ticks[ticks.length - 1]];
}

function fmtDefault(v: number): string {
  if (Math.abs(v) >= 1000) return v.toLocaleString("en-US");
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

// Build a path with gap handling (skips undefined / null entries).
function linePath(pts: Array<{ x: number; y: number } | null>): string {
  let d = "";
  let pen = false;
  for (const p of pts) {
    if (!p) {
      pen = false;
      continue;
    }
    if (!pen) {
      d += `M${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
      pen = true;
    } else {
      d += `L${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    }
  }
  return d;
}

// ─── types ───────────────────────────────────────────────────────────────

export type SeriesDef = {
  key: string;
  label: string;
  color?: string;
  type?: "line" | "bar" | "area";
  dashed?: boolean;
  yAxis?: "left" | "right";
};

export type ChartAnnotation = { from: number; to: number; label?: string; fill?: string };

type ChartDatum = Record<string, number | string | undefined | null>;

// ─── shared layout ──────────────────────────────────────────────────────

const VIEW_W = 900;
const DEFAULT_H = 360;

function makeBox(viewH: number, hasRight: boolean, withLegend = true) {
  const top = 24;
  const right = hasRight ? 64 : 24;
  const bottom = withLegend ? 48 : 30;
  const left = 60;
  return {
    top,
    right,
    bottom,
    left,
    width: VIEW_W,
    height: viewH,
    innerW: VIEW_W - left - right,
    innerH: viewH - top - bottom,
  };
}

function Axes({
  box,
  yTicks,
  yFormat,
  yRightTicks,
  yRightFormat,
  yLabel,
  yRightLabel,
  yScale,
  yRightScale,
  xTicks,
}: {
  box: ReturnType<typeof makeBox>;
  yTicks: number[];
  yFormat: (v: number) => string;
  yRightTicks?: number[];
  yRightFormat?: (v: number) => string;
  yLabel?: string;
  yRightLabel?: string;
  yScale: (v: number) => number;
  yRightScale?: (v: number) => number;
  xTicks: Array<{ value: number | string; x: number; label: string }>;
}) {
  const baseY = box.top + box.innerH;
  return (
    <g>
      {/* horizontal grid lines + left-axis labels */}
      {yTicks.map((t, i) => {
        const y = yScale(t);
        return (
          <g key={`yl-${i}`}>
            <line
              x1={box.left}
              x2={box.left + box.innerW}
              y1={y}
              y2={y}
              stroke={palette.rule}
              strokeDasharray="2 4"
              strokeWidth={0.8}
            />
            <text
              x={box.left - 8}
              y={y}
              fontSize={11}
              fontFamily={FONT}
              fill={palette.inkLight}
              textAnchor="end"
              dominantBaseline="middle"
            >
              {yFormat(t)}
            </text>
          </g>
        );
      })}
      {/* right axis labels */}
      {yRightTicks && yRightScale && yRightFormat
        ? yRightTicks.map((t, i) => {
            const y = yRightScale(t);
            return (
              <text
                key={`yr-${i}`}
                x={box.left + box.innerW + 8}
                y={y}
                fontSize={11}
                fontFamily={FONT}
                fill={palette.inkLight}
                textAnchor="start"
                dominantBaseline="middle"
              >
                {yRightFormat(t)}
              </text>
            );
          })
        : null}
      {/* x axis */}
      <line
        x1={box.left}
        x2={box.left + box.innerW}
        y1={baseY}
        y2={baseY}
        stroke={palette.rule}
        strokeWidth={1}
      />
      {xTicks.map((t, i) => (
        <g key={`x-${i}`}>
          <line x1={t.x} x2={t.x} y1={baseY} y2={baseY + 4} stroke={palette.rule} strokeWidth={1} />
          <text
            x={t.x}
            y={baseY + 16}
            fontSize={11}
            fontFamily={FONT}
            fill={palette.inkLight}
            textAnchor="middle"
          >
            {t.label}
          </text>
        </g>
      ))}
      {/* axis labels */}
      {yLabel ? (
        <text
          x={14}
          y={box.top + box.innerH / 2}
          fontSize={11}
          fontFamily={FONT}
          fill={palette.ink}
          textAnchor="middle"
          transform={`rotate(-90 14 ${box.top + box.innerH / 2})`}
        >
          {yLabel}
        </text>
      ) : null}
      {yRightLabel ? (
        <text
          x={box.left + box.innerW + 52}
          y={box.top + box.innerH / 2}
          fontSize={11}
          fontFamily={FONT}
          fill={palette.ink}
          textAnchor="middle"
          transform={`rotate(90 ${box.left + box.innerW + 52} ${box.top + box.innerH / 2})`}
        >
          {yRightLabel}
        </text>
      ) : null}
    </g>
  );
}

function Legend({ series }: { series: SeriesDef[] }) {
  return (
    <ul
      className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 mt-2"
      style={{ fontFamily: FONT, fontSize: 12, color: palette.ink }}
    >
      {series
        .filter((s) => s.label && s.label.trim().length > 0)
        .map((s) => {
          const c = s.color ?? palette.primary;
          const dashed = s.dashed;
          return (
            <li key={s.key} className="flex items-center gap-1.5">
              {s.type === "bar" ? (
                <span style={{ width: 12, height: 10, background: c, display: "inline-block", borderRadius: 1 }} />
              ) : (
                <svg width={18} height={10} aria-hidden>
                  <line
                    x1={0}
                    x2={18}
                    y1={5}
                    y2={5}
                    stroke={c}
                    strokeWidth={2.2}
                    strokeDasharray={dashed ? "5 4" : undefined}
                  />
                  <circle cx={9} cy={5} r={2.5} fill={palette.paper} stroke={c} strokeWidth={1.2} />
                </svg>
              )}
              <span>{s.label}</span>
            </li>
          );
        })}
    </ul>
  );
}

// ─── MarketLineChart ─────────────────────────────────────────────────────

export function MarketLineChart({
  data,
  series,
  height = DEFAULT_H,
  yLabel,
  yRightLabel,
  yFormat,
  yRightFormat,
  annotations,
  xKey = "year",
  yDomain,
  yRightDomain,
  band,
}: {
  data: ChartDatum[];
  series: SeriesDef[];
  height?: number;
  yLabel?: string;
  yRightLabel?: string;
  yFormat?: (v: number) => string;
  yRightFormat?: (v: number) => string;
  annotations?: ChartAnnotation[];
  xKey?: string;
  yDomain?: [number | "auto", number | "auto"];
  yRightDomain?: [number | "auto", number | "auto"];
  band?: { lowKey: string; highKey: string; color?: string; opacity?: number; yAxis?: "left" | "right" };
}) {
  const hasRight = series.some((s) => s.yAxis === "right");
  const box = makeBox(height, hasRight, true);

  // X axis: numeric or category
  const xs = data.map((d) => d[xKey]);
  const allNumeric = xs.every((v) => typeof v === "number" && isFinite(v as number));
  let xScale: (v: number | string) => number;
  let xTicks: Array<{ value: number | string; x: number; label: string }>;
  if (allNumeric) {
    const xNums = xs.map(Number);
    const xMin = Math.min(...xNums);
    const xMax = Math.max(...xNums);
    const span = xMax - xMin || 1;
    xScale = (v) => box.left + ((Number(v) - xMin) / span) * box.innerW;
    // Use the data points themselves as ticks, but thin out if > 14
    const stride = Math.max(1, Math.ceil(xNums.length / 12));
    xTicks = xNums
      .filter((_, i) => i % stride === 0 || i === xNums.length - 1)
      .map((v) => ({ value: v, x: xScale(v), label: Number.isInteger(v) ? String(v) : v.toFixed(0) }));
  } else {
    // categorical: equal spacing
    xScale = (v) => {
      const i = xs.indexOf(v as string | number);
      const n = xs.length;
      return box.left + ((i + 0.5) / n) * box.innerW;
    };
    xTicks = xs.map((v) => ({ value: v as string | number, x: xScale(v as string | number), label: String(v) }));
  }

  // Y scales
  const leftValues = series
    .filter((s) => s.yAxis !== "right")
    .flatMap((s) => data.map((d) => Number(d[s.key])).filter((v) => isFinite(v)));
  const [yLo, yHi] = resolveDomain(leftValues, yDomain);
  const yScale = (v: number) => box.top + (1 - (v - yLo) / (yHi - yLo)) * box.innerH;
  const yTicks = niceTicks(yLo, yHi, 5);

  let yRightLo = 0;
  let yRightHi = 1;
  let yRightScale: ((v: number) => number) | undefined;
  let yRightTicks: number[] | undefined;
  if (hasRight) {
    const rightValues = series
      .filter((s) => s.yAxis === "right")
      .flatMap((s) => data.map((d) => Number(d[s.key])).filter((v) => isFinite(v)));
    [yRightLo, yRightHi] = resolveDomain(rightValues, yRightDomain);
    yRightScale = (v: number) => box.top + (1 - (v - yRightLo) / (yRightHi - yRightLo)) * box.innerH;
    yRightTicks = niceTicks(yRightLo, yRightHi, 5);
  }

  // Zero-line on left axis if domain crosses zero
  const drawZero = yLo < 0 && yHi > 0;
  const zeroY = drawZero ? yScale(0) : null;

  // Build band polygon if requested
  let bandPath: string | null = null;
  if (band) {
    const scale = band.yAxis === "right" && yRightScale ? yRightScale : yScale;
    const topPts: Array<{ x: number; y: number } | null> = data.map((d) => {
      const v = Number(d[band.highKey]);
      const xv = d[xKey];
      if (!isFinite(v) || xv === undefined) return null;
      return { x: xScale(xv as number | string), y: scale(v) };
    });
    const botPtsReversed: Array<{ x: number; y: number } | null> = [...data]
      .map((d) => {
        const v = Number(d[band.lowKey]);
        const xv = d[xKey];
        if (!isFinite(v) || xv === undefined) return null;
        return { x: xScale(xv as number | string), y: scale(v) };
      })
      .reverse();
    const all = [...topPts.filter((p): p is { x: number; y: number } => !!p), ...botPtsReversed.filter((p): p is { x: number; y: number } => !!p)];
    if (all.length > 2) {
      bandPath = "M" + all.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L") + " Z";
    }
  }

  // Build line / area paths per series
  const seriesPaths = series.map((s) => {
    const scale = s.yAxis === "right" && yRightScale ? yRightScale : yScale;
    const pts: Array<{ x: number; y: number } | null> = data.map((d) => {
      const v = Number(d[s.key]);
      const xv = d[xKey];
      if (!isFinite(v) || xv === undefined) return null;
      return { x: xScale(xv as number | string), y: scale(v) };
    });
    return { s, pts, path: linePath(pts) };
  });

  // Bar series: compute layout for grouped bars
  const barSeries = series.filter((s) => s.type === "bar");
  const slotWidth = allNumeric
    ? (data.length > 1 ? (box.innerW / (data.length)) * 0.8 : 40)
    : (box.innerW / data.length) * 0.8;
  const barWidth = barSeries.length > 0 ? slotWidth / barSeries.length : 0;

  return (
    <div className="chart-wrap" style={{ width: "100%" }}>
      <svg
        viewBox={`0 0 ${box.width} ${box.height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block", background: "transparent" }}
        role="img"
      >
        {/* annotations behind everything */}
        {annotations
          ? annotations.map((a, i) => {
              if (!allNumeric) return null;
              const x1 = xScale(a.from);
              const x2 = xScale(a.to);
              const w = Math.max(2, x2 - x1);
              return (
                <g key={`anno-${i}`} opacity={0.22}>
                  <rect x={x1} y={box.top} width={w} height={box.innerH} fill={a.fill ?? palette.goldLight} />
                  {a.label ? (
                    <text
                      x={(x1 + x2) / 2}
                      y={box.top + 12}
                      fontSize={9.5}
                      fontFamily={FONT}
                      fill={palette.gold}
                      fontWeight={600}
                      textAnchor="middle"
                      opacity={1}
                    >
                      {a.label}
                    </text>
                  ) : null}
                </g>
              );
            })
          : null}

        {/* band (under series) */}
        {bandPath ? (
          <path d={bandPath} fill={band!.color ?? palette.gold} opacity={band!.opacity ?? 0.18} stroke="none" />
        ) : null}

        {/* axes (under series) */}
        <Axes
          box={box}
          yTicks={yTicks}
          yFormat={yFormat ?? fmtDefault}
          yRightTicks={yRightTicks}
          yRightFormat={yRightFormat ?? fmtDefault}
          yLabel={yLabel}
          yRightLabel={yRightLabel}
          yScale={yScale}
          yRightScale={yRightScale}
          xTicks={xTicks}
        />

        {/* zero line if applicable */}
        {zeroY !== null ? (
          <line
            x1={box.left}
            x2={box.left + box.innerW}
            y1={zeroY}
            y2={zeroY}
            stroke={palette.ink}
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.5}
          />
        ) : null}

        {/* bar series (grouped) */}
        {barSeries.map((s, sIdx) => {
          const color = s.color ?? palette.primary;
          return (
            <g key={`bar-${s.key}`}>
              {data.map((d, i) => {
                const v = Number(d[s.key]);
                const xv = d[xKey];
                if (!isFinite(v) || xv === undefined) return null;
                const xc = xScale(xv as number | string);
                const groupX = xc - slotWidth / 2 + sIdx * barWidth;
                const scale = s.yAxis === "right" && yRightScale ? yRightScale : yScale;
                const yTop = scale(Math.max(0, v));
                const yBot = scale(Math.min(0, v));
                const yZero = scale(0);
                const drawY = v >= 0 ? scale(v) : yZero;
                const h = Math.abs(scale(v) - yZero);
                return (
                  <rect
                    key={`b-${s.key}-${i}`}
                    x={groupX}
                    y={drawY}
                    width={Math.max(1, barWidth - 1)}
                    height={Math.max(0, h)}
                    fill={color}
                    rx={1.5}
                  />
                );
              })}
            </g>
          );
        })}

        {/* line / area series */}
        {seriesPaths.map(({ s, pts, path }) => {
          if (s.type === "bar") return null;
          const color = s.color ?? palette.primary;
          const dashArray = s.dashed ? "5 4" : undefined;
          if (s.type === "area") {
            // Build closed area path to bottom
            const scale = s.yAxis === "right" && yRightScale ? yRightScale : yScale;
            const baseline = box.top + box.innerH;
            const validPts = pts.filter((p): p is { x: number; y: number } => !!p);
            if (validPts.length < 2) return null;
            const areaD =
              `M${validPts[0].x.toFixed(2)} ${baseline.toFixed(2)} ` +
              validPts.map((p) => `L${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") +
              ` L${validPts[validPts.length - 1].x.toFixed(2)} ${baseline.toFixed(2)} Z`;
            return (
              <g key={`s-${s.key}`}>
                <path d={areaD} fill={color} opacity={0.18} />
                <path d={path} stroke={color} strokeWidth={2} fill="none" strokeDasharray={dashArray} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            );
          }
          return (
            <g key={`s-${s.key}`}>
              <path d={path} stroke={color} strokeWidth={2.2} fill="none" strokeDasharray={dashArray} strokeLinecap="round" strokeLinejoin="round" />
              {pts.map((p, i) =>
                p ? (
                  <circle key={`d-${s.key}-${i}`} cx={p.x} cy={p.y} r={2.5} fill={palette.paper} stroke={color} strokeWidth={1.4} />
                ) : null
              )}
            </g>
          );
        })}
      </svg>
      <Legend series={series} />
    </div>
  );
}

// ─── MarketBarChart ──────────────────────────────────────────────────────

export function MarketBarChart({
  data,
  series,
  height = 300,
  xKey = "year",
  yFormat,
  yDomain,
  stacked = false,
}: {
  data: ChartDatum[];
  series: SeriesDef[];
  height?: number;
  xKey?: string;
  yFormat?: (v: number) => string;
  yDomain?: [number | "auto", number | "auto"];
  stacked?: boolean;
}) {
  // Forward to LineChart-style layout but render only bars (no lines).
  // For grouped bars use the bar logic from MarketLineChart; for stacked, compute cumulative.
  const box = makeBox(height, false, true);

  const xs = data.map((d) => d[xKey]);
  const allNumeric = xs.every((v) => typeof v === "number" && isFinite(v as number));
  let xScale: (v: number | string) => number;
  let xTicks: Array<{ value: number | string; x: number; label: string }>;
  if (allNumeric) {
    const xNums = xs.map(Number);
    const xMin = Math.min(...xNums);
    const xMax = Math.max(...xNums);
    const span = xMax - xMin || 1;
    xScale = (v) => box.left + ((Number(v) - xMin) / span) * box.innerW;
    const stride = Math.max(1, Math.ceil(xNums.length / 12));
    xTicks = xNums
      .filter((_, i) => i % stride === 0 || i === xNums.length - 1)
      .map((v) => ({ value: v, x: xScale(v), label: Number.isInteger(v) ? String(v) : v.toFixed(0) }));
  } else {
    xScale = (v) => {
      const i = xs.indexOf(v as string | number);
      const n = xs.length;
      return box.left + ((i + 0.5) / n) * box.innerW;
    };
    xTicks = xs.map((v) => ({ value: v as string | number, x: xScale(v as string | number), label: String(v) }));
  }

  // Y domain — for stacked, sum per category
  let allVals: number[];
  if (stacked) {
    allVals = data.map((d) =>
      series.map((s) => Number(d[s.key])).filter((v) => isFinite(v)).reduce((a, b) => a + b, 0)
    );
  } else {
    allVals = series.flatMap((s) => data.map((d) => Number(d[s.key])).filter((v) => isFinite(v)));
  }
  const [yLo, yHi] = resolveDomain(allVals, yDomain);
  const yScale = (v: number) => box.top + (1 - (v - yLo) / (yHi - yLo)) * box.innerH;
  const yTicks = niceTicks(yLo, yHi, 5);

  const slotWidth = (box.innerW / data.length) * (allNumeric ? 0.8 : 0.7);
  const barWidth = stacked ? slotWidth : slotWidth / series.length;

  return (
    <div className="chart-wrap" style={{ width: "100%" }}>
      <svg
        viewBox={`0 0 ${box.width} ${box.height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
      >
        <Axes box={box} yTicks={yTicks} yFormat={yFormat ?? fmtDefault} yScale={yScale} xTicks={xTicks} />

        {stacked
          ? data.map((d, i) => {
              const xv = d[xKey];
              if (xv === undefined) return null;
              const xc = xScale(xv as number | string);
              let cum = 0;
              return (
                <g key={`stack-${i}`}>
                  {series.map((s, sIdx) => {
                    const v = Number(d[s.key]);
                    if (!isFinite(v) || v <= 0) return null;
                    const start = cum;
                    cum += v;
                    const yTop = yScale(cum);
                    const yBot = yScale(start);
                    return (
                      <rect
                        key={`st-${i}-${sIdx}`}
                        x={xc - slotWidth / 2}
                        y={yTop}
                        width={Math.max(1, barWidth - 1)}
                        height={Math.max(0, yBot - yTop)}
                        fill={s.color ?? palette.primary}
                      />
                    );
                  })}
                </g>
              );
            })
          : series.map((s, sIdx) => (
              <g key={`gr-${sIdx}`}>
                {data.map((d, i) => {
                  const v = Number(d[s.key]);
                  const xv = d[xKey];
                  if (!isFinite(v) || xv === undefined) return null;
                  const xc = xScale(xv as number | string);
                  const groupX = xc - slotWidth / 2 + sIdx * barWidth;
                  const yZero = yScale(0);
                  const drawY = v >= 0 ? yScale(v) : yZero;
                  const h = Math.abs(yScale(v) - yZero);
                  return (
                    <rect
                      key={`bb-${sIdx}-${i}`}
                      x={groupX}
                      y={drawY}
                      width={Math.max(1, barWidth - 1)}
                      height={Math.max(0, h)}
                      fill={s.color ?? palette.primary}
                      rx={1.5}
                    />
                  );
                })}
              </g>
            ))}
      </svg>
      <Legend series={series} />
    </div>
  );
}

// ─── MarketBandChart ─────────────────────────────────────────────────────
// Used for confidence-band charts (e.g. price scenarios).

export function MarketBandChart({
  data,
  bandLowKey,
  bandHighKey,
  centerKey,
  centerLabel = "Baseline",
  bandLabel = "±1.6σ band",
  refValue,
  refLabel = "start",
  height = DEFAULT_H,
  xKey = "year",
  yFormat,
  yDomain,
  centerColor,
  bandColor,
}: {
  data: ChartDatum[];
  bandLowKey: string;
  bandHighKey: string;
  centerKey: string;
  centerLabel?: string;
  bandLabel?: string;
  refValue?: number;
  refLabel?: string;
  height?: number;
  xKey?: string;
  yFormat?: (v: number) => string;
  yDomain?: [number | "auto", number | "auto"];
  centerColor?: string;
  bandColor?: string;
}) {
  return (
    <MarketLineChart
      data={data}
      xKey={xKey}
      height={height}
      yFormat={yFormat}
      yDomain={yDomain}
      band={{ lowKey: bandLowKey, highKey: bandHighKey, color: bandColor ?? palette.goldLight, opacity: 0.22 }}
      series={[
        { key: centerKey, label: centerLabel, color: centerColor ?? palette.primary },
        { key: bandHighKey, label: bandLabel, color: bandColor ?? palette.gold, dashed: true },
        { key: bandLowKey, label: "", color: bandColor ?? palette.gold, dashed: true },
      ]}
      annotations={
        refValue !== undefined
          ? [
              // not a true annotation — just visual cue rendered separately below
            ]
          : undefined
      }
    />
  );
}
