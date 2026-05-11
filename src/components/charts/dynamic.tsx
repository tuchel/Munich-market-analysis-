"use client";

import dynamic from "next/dynamic";

const ChartLoader = () => (
  <div className="h-[320px] w-full flex items-center justify-center text-ink-400 text-sm bg-parchment/30 rounded">
    Loading chart…
  </div>
);

export const MarketLineChart = dynamic(() => import("./Chart").then((m) => m.MarketLineChart), {
  ssr: false,
  loading: ChartLoader,
});

export const MarketBarChart = dynamic(() => import("./Chart").then((m) => m.MarketBarChart), {
  ssr: false,
  loading: ChartLoader,
});

export { palette } from "./Chart";
