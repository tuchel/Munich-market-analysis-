// Editorial chart palette — deep lake blues, gold accent, bull/bear reds.

export const chartPalette = {
  ink: "#12100b",
  rule: "#cdc5b0",
  paper: "#faf8f3",
  grid: "#ece8dd",
  lakeDeep: "#123848",
  lake: "#225d76",
  lakeMid: "#3f7d96",
  lakeLight: "#6fa0b4",
  lakeTint: "#a7c5d2",
  gold: "#a27f3b",
  goldLight: "#c2a057",
  bull: "#2f6a3f",
  bear: "#9e3838",
  neutral: "#8a7b5c",
  muted: "#6a5f45",
};

export const series = [
  chartPalette.lake,
  chartPalette.gold,
  chartPalette.lakeLight,
  chartPalette.bear,
  chartPalette.bull,
  chartPalette.lakeDeep,
  chartPalette.muted,
];

export const axisStyle = {
  stroke: chartPalette.rule,
  tickLine: false,
  axisLine: { stroke: chartPalette.rule },
  tick: { fill: chartPalette.muted, fontSize: 11 },
};

export const tooltipStyle = {
  contentStyle: {
    background: "#fffdf7",
    border: `1px solid ${chartPalette.rule}`,
    borderRadius: 4,
    fontSize: 12,
    fontVariantNumeric: "tabular-nums",
    padding: "8px 10px",
  },
  labelStyle: {
    color: chartPalette.ink,
    fontWeight: 600,
    marginBottom: 4,
  },
  itemStyle: { color: chartPalette.ink },
  cursor: { stroke: chartPalette.rule, strokeDasharray: "2 3" },
};
