import React from "react";

export function Sparkline({
  values,
  width = 120,
  height = 36,
  stroke = "#225d76",
  fill = "rgba(34,93,118,0.12)",
  strokeWidth = 1.5,
}: {
  values: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
}) {
  if (!values?.length) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const step = values.length > 1 ? width / (values.length - 1) : width;
  const points = values
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / span) * (height - 4) - 2;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const area =
    `M 0,${height} L ` +
    values
      .map((v, i) => {
        const x = i * step;
        const y = height - ((v - min) / span) * (height - 4) - 2;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" L ") +
    ` L ${width},${height} Z`;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      style={{ display: "block" }}
    >
      <path d={area} fill={fill} stroke="none" />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
