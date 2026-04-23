// Strength/weakness signals dashboard — 14 indicators.
// From research/macro.md §Signals.

export type Rating = "bullish" | "neutral-bullish" | "neutral" | "neutral-bearish" | "bearish";

export type Signal = {
  id: string;
  name: string;
  group: "supply" | "demand" | "macro" | "sentiment";
  value: string;
  fiveYrLow?: string;
  fiveYrHigh?: string;
  direction: "up" | "down" | "flat";
  rating: Rating;
  // optional mini-series for a sparkline (values only, most recent last)
  series?: number[];
  note: string;
  sourceIds: string[];
};

export const signals: Signal[] = [
  {
    id: "mos_muc",
    name: "Months-of-Supply — Munich ETW",
    group: "supply",
    value: "4.8",
    fiveYrLow: "2.9",
    fiveYrHigh: "6.2",
    direction: "flat",
    rating: "neutral",
    series: [3.0, 2.9, 3.3, 5.8, 6.2, 5.4, 4.8],
    note: "Balanced market; below the 6-month bearish threshold but above the 2021 shortage regime.",
    sourceIds: ["gutachter_muc", "immoscout", "jll_muc"],
  },
  {
    id: "mos_lk_sea",
    name: "Months-of-Supply — LK Starnberg SFH (overall / Seelage)",
    group: "supply",
    value: "8–10 / <3",
    fiveYrLow: "2.5",
    fiveYrHigh: "12.0",
    direction: "flat",
    rating: "neutral-bullish",
    series: [3.0, 3.2, 2.8, 5.5, 11.0, 9.8, 9.0],
    note: "Bifurcated — overall Kreis carries inland oversupply; Seelage direct-lakefront remains deeply undersupplied.",
    sourceIds: ["gutachter_lk_sta", "ev_starnberg"],
  },
  {
    id: "lts_muc",
    name: "List-to-sale ratio — Munich",
    group: "demand",
    value: "95–97 %",
    fiveYrLow: "90 %",
    fiveYrHigh: "103 %",
    direction: "up",
    rating: "neutral",
    series: [103, 102, 101, 97, 92, 94, 96],
    note: "Buyers negotiating ~3–5% off list; bounced off 2023 trough.",
    sourceIds: ["jll_muc", "pricehubble", "gutachter_muc"],
  },
  {
    id: "lts_seelage",
    name: "List-to-sale ratio — Seelage",
    group: "demand",
    value: "98–103 %",
    fiveYrLow: "95 %",
    fiveYrHigh: "108 %",
    direction: "up",
    rating: "bullish",
    series: [107, 105, 106, 101, 97, 99, 101],
    note: "Bidding above ask returns for A-locations; thin book on direct-lakefront.",
    sourceIds: ["ev_starnberg", "gutachter_lk_sta", "sz_starnberg"],
  },
  {
    id: "dwell_muc",
    name: "Vermarktungsdauer — Munich (days)",
    group: "demand",
    value: "95",
    fiveYrLow: "25",
    fiveYrHigh: "105",
    direction: "flat",
    rating: "neutral-bearish",
    series: [25, 28, 50, 95, 100, 95, 95],
    note: "Still 3× above the 2020–21 regime — the slowest metric in the dashboard.",
    sourceIds: ["gutachter_muc", "immoscout"],
  },
  {
    id: "price_cuts",
    name: "Price-cut frequency — Munich",
    group: "demand",
    value: "35–40 %",
    fiveYrLow: "10 %",
    fiveYrHigh: "55 %",
    direction: "down",
    rating: "neutral",
    series: [12, 15, 22, 48, 55, 45, 38],
    note: "Peaked H1 2024 at 55%; moderating as inventory thins.",
    sourceIds: ["immoscout", "immowelt"],
  },
  {
    id: "spread_bauzins_bund",
    name: "Bauzins-to-Bund spread (bp)",
    group: "macro",
    value: "~50 bp",
    fiveYrLow: "25",
    fiveYrHigh: "180",
    direction: "down",
    rating: "bullish",
    series: [150, 180, 165, 130, 115, 95, 50],
    note: "Narrowest in 5 years — banks have risk appetite for residential again.",
    sourceIds: ["bundesbank_rates"],
  },
  {
    id: "munich_permits",
    name: "Munich permits 2024 / completions",
    group: "supply",
    value: "8,329 / 6,503",
    fiveYrLow: "6,500",
    fiveYrHigh: "15,800",
    direction: "down",
    rating: "bullish",
    series: [15800, 14200, 12500, 11200, 9400, 7900, 6503],
    note: "Completions –34% YoY. Munich is structurally undersupplied — the most bullish single series for prices.",
    sourceIds: ["gutachter_muc", "lfstat", "destatis_bpi"],
  },
  {
    id: "hh_formation",
    name: "Household formation (Munich / LK Starnberg)",
    group: "demand",
    value: "+0.4–0.6 % / +0.3 % p.a.",
    fiveYrLow: "+0.2 %",
    fiveYrHigh: "+0.8 %",
    direction: "flat",
    rating: "neutral-bullish",
    note: "LK Starnberg projects +8k residents to 2035 despite aging profile.",
    sourceIds: ["lfstat", "ifo_housing"],
  },
  {
    id: "immoscout_demand",
    name: "ImmoScout24 demand index",
    group: "sentiment",
    value: "+16 % YoY",
    fiveYrLow: "–22 %",
    fiveYrHigh: "+28 %",
    direction: "up",
    rating: "bullish",
    series: [20, 25, 12, -22, -12, 4, 16],
    note: "Sharp recovery; Bavaria and Oberbayern lead the national tape.",
    sourceIds: ["immoscout"],
  },
  {
    id: "bundesbank_overvaluation",
    name: "Bundesbank Top-7 overvaluation estimate",
    group: "macro",
    value: "15–20 %",
    fiveYrLow: "15 %",
    fiveYrHigh: "40 %",
    direction: "down",
    rating: "neutral",
    series: [35, 40, 38, 32, 25, 20, 17],
    note: "Halved from 2022 peak; closer to long-run equilibrium.",
    sourceIds: ["bundesbank_overval"],
  },
  {
    id: "empirica_bubble",
    name: "empirica Blasenindex (Top-7 / national)",
    group: "macro",
    value: "29 % / 19 %",
    fiveYrLow: "19 %",
    fiveYrHigh: "48 %",
    direction: "down",
    rating: "neutral-bullish",
    series: [38, 45, 48, 42, 35, 31, 29],
    note: "Well off the pre-2022 peak; bubble-risk label retired for most of DE.",
    sourceIds: ["empirica_bubble"],
  },
  {
    id: "rent_growth",
    name: "Rent growth — Munich (asking, YoY)",
    group: "demand",
    value: "+3.7 %",
    fiveYrLow: "+2.2 %",
    fiveYrHigh: "+6.8 %",
    direction: "flat",
    rating: "bullish",
    series: [2.8, 3.1, 3.6, 5.0, 6.8, 5.2, 3.7],
    note: "2023 rents +24.7% vs 2019 — the rent-own arbitrage that supports owner-occupier bids.",
    sourceIds: ["immoscout", "jll_muc", "lbs_res"],
  },
  {
    id: "construction_cost",
    name: "Construction-cost cumulative (2015–25)",
    group: "supply",
    value: "+61 %",
    fiveYrLow: "+25 %",
    fiveYrHigh: "+61 %",
    direction: "up",
    rating: "bullish",
    series: [25, 30, 37, 47, 52, 56, 61],
    note: "Replacement cost underwrites the Bestand. Critical for teardown-economics underwriting.",
    sourceIds: ["destatis_bpi"],
  },
];

// Composite temperature — bullish=+1, neutral-bullish=+0.5, neutral=0, neutral-bearish=-0.5, bearish=-1
export function signalScore(rating: Rating) {
  switch (rating) {
    case "bullish":
      return 1;
    case "neutral-bullish":
      return 0.5;
    case "neutral":
      return 0;
    case "neutral-bearish":
      return -0.5;
    case "bearish":
      return -1;
  }
}

export function compositeTemperature(): number {
  // normalize to -100..+100
  const total = signals.reduce((a, s) => a + signalScore(s.rating), 0);
  return Math.round((total / signals.length) * 100);
}
