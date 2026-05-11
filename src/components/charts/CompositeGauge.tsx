"use client";

import { chartPalette } from "./chartTheme";

export function CompositeGauge({
  value,
  label = "Market Temperature",
  size = 260,
}: {
  value: number; // -100..+100
  label?: string;
  size?: number;
}) {
  const v = Math.max(-100, Math.min(100, value));
  const angle = (v / 100) * 90; // -90..+90
  const radius = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2 + size * 0.14;

  // Generate an arc path from -90 to +90 degrees
  const arc = (startDeg: number, endDeg: number) => {
    const rad = (d: number) => ((d - 90) * Math.PI) / 180;
    const x1 = cx + radius * Math.cos(rad(startDeg));
    const y1 = cy + radius * Math.sin(rad(startDeg));
    const x2 = cx + radius * Math.cos(rad(endDeg));
    const y2 = cy + radius * Math.sin(rad(endDeg));
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  };

  const needleRad = ((angle - 90) * Math.PI) / 180;
  const nx = cx + (radius - 16) * Math.cos(needleRad);
  const ny = cy + (radius - 16) * Math.sin(needleRad);

  const tone = v > 30 ? chartPalette.bull : v < -30 ? chartPalette.bear : chartPalette.gold;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.82} viewBox={`0 0 ${size} ${size * 0.82}`}>
        {/* Bearish arc */}
        <path d={arc(0, 60)} stroke={chartPalette.bear} strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.22" />
        <path d={arc(60, 120)} stroke={chartPalette.gold} strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.22" />
        <path d={arc(120, 180)} stroke={chartPalette.bull} strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.22" />
        {/* Active arc */}
        <path
          d={arc(90, 90 + angle)}
          stroke={tone}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={chartPalette.ink} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="4" fill={chartPalette.ink} />
        {/* Labels */}
        <text x={cx - radius + 4} y={cy + 22} fontSize="11" fill={chartPalette.muted}>
          bearish
        </text>
        <text x={cx} y={cy + 26} fontSize="11" fill={chartPalette.muted} textAnchor="middle">
          neutral
        </text>
        <text x={cx + radius - 48} y={cy + 22} fontSize="11" fill={chartPalette.muted}>
          bullish
        </text>
        {/* Value */}
        <text x={cx} y={cy - 12} textAnchor="middle" fontSize="32" fontFamily="Fraunces, serif" fill={chartPalette.ink} fontWeight="500">
          {v > 0 ? "+" : ""}
          {v}
        </text>
      </svg>
      <div className="kicker mt-1 text-ink-500">{label}</div>
    </div>
  );
}
