// Strength/weakness signals dashboard — 14 indicators.
//
// Sparkline series are 2005–2025 where the underlying data exists; newer
// product-level indicators (e.g. ImmoScout demand index) cover fewer years.
// Each signal carries an explicit "why" explaining the rating.

export type Rating = "bullish" | "neutral-bullish" | "neutral" | "neutral-bearish" | "bearish";

export type Signal = {
  id: string;
  name: string;
  group: "supply" | "demand" | "macro" | "sentiment";
  value: string;
  rangeLabel: string; // e.g. "2005–2025 range" — used as the x-axis hint for sparkline
  rangeLow?: string;
  rangeHigh?: string;
  direction: "up" | "down" | "flat";
  rating: Rating;
  // Year-keyed sparkline — oldest first. Gaps allowed (undefined).
  seriesYears?: number[];
  series?: number[];
  // One-line headline reading
  note: string;
  // Why this rating, not the one next to it.
  why: string;
  sourceIds: string[];
};

export const signals: Signal[] = [
  {
    id: "mos_muc",
    name: "Months-of-Supply — Munich ETW",
    group: "supply",
    value: "4.8",
    rangeLabel: "2008–2025",
    rangeLow: "2.9 (2021)",
    rangeHigh: "7.5 (2008 GFC)",
    direction: "flat",
    rating: "neutral",
    seriesYears: [2008, 2009, 2010, 2012, 2014, 2016, 2018, 2020, 2021, 2022, 2023, 2024, 2025],
    series: [7.5, 6.4, 5.2, 4.2, 3.6, 3.0, 3.0, 2.9, 2.9, 3.3, 5.8, 6.2, 4.8],
    note: "Balanced market; below the 6-month bearish threshold but above the 2017–2021 shortage regime.",
    why: "Rated neutral because supply is neither tight (<3) nor loose (>6). The 2023–24 overhang has now absorbed enough to re-enter the balanced band.",
    sourceIds: ["gutachter_muc", "immoscout", "jll_muc"],
  },
  {
    id: "mos_lk_sea",
    name: "Months-of-Supply — LK Starnberg SFH (overall / Seelage)",
    group: "supply",
    value: "8–10 / <3",
    rangeLabel: "2010–2025",
    rangeLow: "2.5 (Seelage 2021)",
    rangeHigh: "12.0 (overall 2024)",
    direction: "flat",
    rating: "neutral-bullish",
    seriesYears: [2010, 2012, 2014, 2016, 2018, 2020, 2021, 2022, 2023, 2024, 2025],
    series: [5.0, 4.2, 3.8, 3.4, 3.2, 3.0, 2.8, 5.5, 11.0, 9.8, 9.0],
    note: "Bifurcated — overall Kreis carries inland oversupply; Seelage direct-lakefront remains deeply undersupplied.",
    why: "Rated neutral-bullish on the weighted split: the Seelage set (direct-lakefront, A-schools) is running <3 months, and that's where a €5–10M primary-residence bid clears. Inland LK softness doesn't bind here.",
    sourceIds: ["gutachter_lk_sta", "ev_starnberg"],
  },
  {
    id: "lts_muc",
    name: "List-to-sale ratio — Munich",
    group: "demand",
    value: "95–97 %",
    rangeLabel: "2005–2025",
    rangeLow: "88 % (2008)",
    rangeHigh: "104 % (2021)",
    direction: "up",
    rating: "neutral",
    seriesYears: [2005, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2021, 2022, 2023, 2024, 2025],
    series: [93, 88, 94, 97, 99, 101, 103, 104, 104, 97, 92, 94, 96],
    note: "Buyers negotiating ~3–5 % off list; bounced off 2023 trough.",
    why: "Rated neutral because the ratio has climbed back above the long-run 93 % mean but remains 6–8 pp below the 2018–21 bidding regime. Buyers can still negotiate.",
    sourceIds: ["jll_muc", "pricehubble", "gutachter_muc"],
  },
  {
    id: "lts_seelage",
    name: "List-to-sale ratio — Seelage",
    group: "demand",
    value: "98–103 %",
    rangeLabel: "2010–2025",
    rangeLow: "94 % (2023 trough)",
    rangeHigh: "108 % (2021)",
    direction: "up",
    rating: "bullish",
    seriesYears: [2010, 2012, 2014, 2016, 2018, 2020, 2021, 2022, 2023, 2024, 2025],
    series: [98, 99, 100, 103, 105, 107, 108, 101, 97, 99, 101],
    note: "Bidding above ask returns for A-locations; thin book on direct-lakefront.",
    why: "Rated bullish because prime lakefront is clearing at or above ask on thin supply, a pattern that only reappears in tight Seelage regimes. Broader Munich is still under 100 %.",
    sourceIds: ["ev_starnberg", "gutachter_lk_sta", "sz_starnberg"],
  },
  {
    id: "dwell_muc",
    name: "Vermarktungsdauer — Munich (days)",
    group: "demand",
    value: "95",
    rangeLabel: "2005–2025",
    rangeLow: "25 (2020)",
    rangeHigh: "100 (2024)",
    direction: "flat",
    rating: "neutral-bearish",
    seriesYears: [2005, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2021, 2022, 2023, 2024, 2025],
    series: [80, 85, 50, 47, 45, 40, 30, 25, 28, 50, 95, 100, 95],
    note: "Still ~3× the 2020–21 regime — the slowest metric in the dashboard.",
    why: "Rated neutral-bearish because dwell time is the one signal that has NOT recovered. A 95-day median means listings sit — the tape is slow even if prices have firmed.",
    sourceIds: ["gutachter_muc", "immoscout"],
  },
  {
    id: "price_cuts",
    name: "Price-cut frequency — Munich",
    group: "demand",
    value: "35–40 %",
    rangeLabel: "2010–2025",
    rangeLow: "10 % (2020)",
    rangeHigh: "55 % (H1 2024)",
    direction: "down",
    rating: "neutral",
    seriesYears: [2010, 2012, 2014, 2016, 2018, 2020, 2021, 2022, 2023, 2024, 2025],
    series: [30, 25, 20, 15, 12, 10, 15, 22, 48, 55, 38],
    note: "Peaked H1 2024 at 55 %; moderating as inventory thins.",
    why: "Rated neutral: materially better than the 2024 peak (−17 pp) but still ~3× the 2018–20 baseline. Buyers retain price-discovery leverage on mainstream Munich listings.",
    sourceIds: ["immoscout", "immowelt"],
  },
  {
    id: "spread_bauzins_bund",
    name: "Bauzins-to-Bund spread (bp)",
    group: "macro",
    value: "~50 bp",
    rangeLabel: "2005–2025",
    rangeLow: "25 (2005)",
    rangeHigh: "195 (2009 GFC)",
    direction: "down",
    rating: "bullish",
    seriesYears: [2005, 2007, 2008, 2009, 2011, 2013, 2015, 2017, 2019, 2021, 2022, 2023, 2024, 2025],
    series: [104, 88, 195, 91, 177, 76, 132, 122, 129, 133, 133, 183, 114, 50],
    note: "Narrowest in 20 years — banks have risk appetite for residential again.",
    why: "Rated bullish because a 50 bp spread signals that residential credit is being priced close to sovereign risk — the complement to volume recovery.",
    sourceIds: ["bundesbank_rates"],
  },
  {
    id: "munich_permits",
    name: "Munich permits (annual) / completions",
    group: "supply",
    value: "8,329 / 6,503",
    rangeLabel: "2005–2024",
    rangeLow: "6,500 (completions 2024)",
    rangeHigh: "15,800 (permits 2017)",
    direction: "down",
    rating: "bullish",
    seriesYears: [2005, 2008, 2010, 2012, 2014, 2017, 2019, 2021, 2022, 2023, 2024],
    series: [9200, 9800, 11500, 13000, 14200, 15800, 12500, 11400, 10100, 9100, 8329],
    note: "Completions −34 % YoY, permits at a 13-yr low. Munich is structurally undersupplied.",
    why: "Rated bullish for existing Bestand: the incremental supply needed to absorb population growth is not being produced. The fewer new units, the more Bestand prices are defended by replacement-cost arithmetic.",
    sourceIds: ["gutachter_muc", "lfstat", "destatis_bpi"],
  },
  {
    id: "hh_formation",
    name: "Household formation (Munich / LK Starnberg)",
    group: "demand",
    value: "+0.4–0.6 % / +0.3 % p.a.",
    rangeLabel: "2010–2035 (projected)",
    rangeLow: "+0.2 % (LK 2016)",
    rangeHigh: "+0.8 % (Munich 2018)",
    direction: "flat",
    rating: "neutral-bullish",
    seriesYears: [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024, 2030, 2035],
    series: [0.45, 0.5, 0.55, 0.4, 0.7, 0.6, 0.5, 0.5, 0.45, 0.4],
    note: "LK Starnberg projects +8k residents to 2035 despite aging profile.",
    why: "Rated neutral-bullish because positive formation is a demand tailwind, not a surge. Importantly, it hasn't stalled — the ageing profile has not begun to offset net migration and urbanisation.",
    sourceIds: ["lfstat", "ifo_housing"],
  },
  {
    id: "immoscout_demand",
    name: "ImmoScout24 demand index (YoY)",
    group: "sentiment",
    value: "+16 % YoY",
    rangeLabel: "2018–2025",
    rangeLow: "−22 % (2022)",
    rangeHigh: "+28 % (2020)",
    direction: "up",
    rating: "bullish",
    seriesYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    series: [22, 20, 28, 12, -22, -12, 4, 16],
    note: "Sharp recovery; Bavaria and Oberbayern lead the national tape.",
    why: "Rated bullish: the demand index turned positive in Q2 2024 and has widened through 2025. Historically a 6–9 month leading indicator of price and volume prints.",
    sourceIds: ["immoscout"],
  },
  {
    id: "bundesbank_overvaluation",
    name: "Bundesbank Top-7 overvaluation estimate",
    group: "macro",
    value: "15–20 %",
    rangeLabel: "2015–2025",
    rangeLow: "8 % (2015)",
    rangeHigh: "40 % (2022)",
    direction: "down",
    rating: "neutral",
    seriesYears: [2015, 2017, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    series: [8, 20, 30, 35, 40, 40, 28, 20, 17],
    note: "Halved from 2022 peak; closer to long-run equilibrium.",
    why: "Rated neutral because the valuation overshoot has been largely worked off through the 2023 price reset — but it is not yet below fair value, so it's not a buying-pressure signal either.",
    sourceIds: ["bundesbank_overval"],
  },
  {
    id: "empirica_bubble",
    name: "empirica Blasenindex (Top-7 / national)",
    group: "macro",
    value: "29 % / 19 %",
    rangeLabel: "2012–2025",
    rangeLow: "12 % (2013)",
    rangeHigh: "48 % (2020)",
    direction: "down",
    rating: "neutral-bullish",
    seriesYears: [2012, 2014, 2016, 2018, 2020, 2021, 2022, 2023, 2024, 2025],
    series: [15, 22, 30, 38, 48, 45, 42, 35, 31, 29],
    note: "Well off the pre-2022 peak; bubble-risk label retired for most of DE.",
    why: "Rated neutral-bullish because the index has moved back into its pre-2018 range, removing the macro-prudential tail risk that coloured the 2020–22 tape.",
    sourceIds: ["empirica_bubble"],
  },
  {
    id: "rent_growth",
    name: "Rent growth — Munich (asking, YoY)",
    group: "demand",
    value: "+3.7 %",
    rangeLabel: "2010–2025",
    rangeLow: "+1.9 % (2014)",
    rangeHigh: "+6.8 % (2021)",
    direction: "flat",
    rating: "bullish",
    seriesYears: [2010, 2012, 2014, 2016, 2018, 2020, 2021, 2022, 2023, 2024, 2025],
    series: [3.6, 4.2, 1.9, 2.6, 3.4, 2.8, 6.8, 5.0, 5.2, 4.0, 3.7],
    note: "2023 rents +24.7 % vs 2019 — the rent-own arbitrage that supports owner-occupier bids.",
    why: "Rated bullish because persistent 4 %+ rent growth keeps the own-vs-rent math inclined toward purchase at any sub-3.5 % mortgage rate. At this ticket (€5–10M primary), it's a tailwind for replacement decisions.",
    sourceIds: ["immoscout", "jll_muc", "lbs_res"],
  },
  {
    id: "construction_cost",
    name: "Construction-cost cumulative (2000–25)",
    group: "supply",
    value: "+115 %",
    rangeLabel: "2000–2025",
    rangeLow: "0 % (2000 base)",
    rangeHigh: "+115 % (2025)",
    direction: "up",
    rating: "bullish",
    seriesYears: [2000, 2005, 2010, 2015, 2020, 2022, 2024, 2025],
    series: [0, 8, 22, 34, 57, 92, 109, 115],
    note: "Replacement cost underwrites the Bestand. Critical for teardown-economics underwriting.",
    why: "Rated bullish because every doubling of replacement cost puts a floor under existing Bestand. At +115 % since 2000, a 2000s-era build now requires a ~2.15× rebuild budget to replicate — the strongest of the long-dated tailwinds.",
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
  const total = signals.reduce((a, s) => a + signalScore(s.rating), 0);
  return Math.round((total / signals.length) * 100);
}
