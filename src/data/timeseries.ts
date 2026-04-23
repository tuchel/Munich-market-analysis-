// Core time series, 2015–2025.
// From research/macro.md.

export type YearRow = { year: number } & Record<string, number | undefined>;

// Munich ETW (apartment) asking prices — €/m² — median + percentiles
export const munichEtw: YearRow[] = [
  { year: 2015, median: 4900, p75: 6200, p90: 7800 },
  { year: 2016, median: 5350, p75: 6900, p90: 8600 },
  { year: 2017, median: 5900, p75: 7600, p90: 9500 },
  { year: 2018, median: 6500, p75: 8400, p90: 10800 },
  { year: 2019, median: 7200, p75: 9300, p90: 12000 },
  { year: 2020, median: 7875, p75: 9800, p90: 12600 },
  { year: 2021, median: 8275, p75: 10400, p90: 13300 },
  { year: 2022, median: 9975, p75: 12300, p90: 15400 },
  { year: 2023, median: 9208, p75: 11300, p90: 14200 },
  { year: 2024, median: 8556, p75: 10500, p90: 13400 },
  { year: 2025, median: 8800, p75: 10700, p90: 13700 },
];

// Munich SFH — €/m² and median object price
export const munichSfh: YearRow[] = [
  { year: 2015, eurPerM2: 5400, medianObjectM: 1.05, p75M: 1.55, p90M: 2.6 },
  { year: 2016, eurPerM2: 5900, medianObjectM: 1.18, p75M: 1.72, p90M: 2.95 },
  { year: 2017, eurPerM2: 6400, medianObjectM: 1.30, p75M: 1.90, p90M: 3.3 },
  { year: 2018, eurPerM2: 7000, medianObjectM: 1.42, p75M: 2.10, p90M: 3.65 },
  { year: 2019, eurPerM2: 7600, medianObjectM: 1.55, p75M: 2.30, p90M: 4.0 },
  { year: 2020, eurPerM2: 8200, medianObjectM: 1.72, p75M: 2.55, p90M: 4.4 },
  { year: 2021, eurPerM2: 9000, medianObjectM: 1.90, p75M: 2.85, p90M: 4.9 },
  { year: 2022, eurPerM2: 9800, medianObjectM: 2.10, p75M: 3.20, p90M: 5.6 },
  { year: 2023, eurPerM2: 9100, medianObjectM: 1.87, p75M: 2.85, p90M: 5.2 },
  { year: 2024, eurPerM2: 8434, medianObjectM: 1.80, p75M: 2.75, p90M: 5.0 },
  { year: 2025, eurPerM2: 8750, medianObjectM: 1.85, p75M: 2.85, p90M: 5.2 },
];

// Landkreis Starnberg — town SFH + Kreis-median + lakefront-villa-median
export const starnbergLk: YearRow[] = [
  { year: 2015, starnbergSfhEurPerM2: 5800, kreisMedianSfhM: 1.10, waterfrontVillaM: 3.5 },
  { year: 2016, starnbergSfhEurPerM2: 6400, kreisMedianSfhM: 1.22, waterfrontVillaM: 3.8 },
  { year: 2017, starnbergSfhEurPerM2: 7000, kreisMedianSfhM: 1.35, waterfrontVillaM: 4.2 },
  { year: 2018, starnbergSfhEurPerM2: 7700, kreisMedianSfhM: 1.50, waterfrontVillaM: 4.4 },
  { year: 2019, starnbergSfhEurPerM2: 8500, kreisMedianSfhM: 1.65, waterfrontVillaM: 4.7 },
  { year: 2020, starnbergSfhEurPerM2: 9950, kreisMedianSfhM: 1.95, waterfrontVillaM: 5.6 },
  { year: 2021, starnbergSfhEurPerM2: 11800, kreisMedianSfhM: 2.35, waterfrontVillaM: 6.9 },
  { year: 2022, starnbergSfhEurPerM2: 12500, kreisMedianSfhM: 2.55, waterfrontVillaM: 9.2 },
  { year: 2023, starnbergSfhEurPerM2: 12100, kreisMedianSfhM: 2.40, waterfrontVillaM: 8.9 },
  { year: 2024, starnbergSfhEurPerM2: 8001, kreisMedianSfhM: 2.35, waterfrontVillaM: 9.0 },
  { year: 2025, starnbergSfhEurPerM2: 9176, kreisMedianSfhM: 2.60, waterfrontVillaM: 9.7 },
];

// Transactions (notarized contracts)
export const transactions: YearRow[] = [
  { year: 2015, munichTotal: 12100, munichEtw: 8200, lkStarnberg: 1100 },
  { year: 2016, munichTotal: 12400, munichEtw: 8450, lkStarnberg: 1150 },
  { year: 2017, munichTotal: 12250, munichEtw: 8300, lkStarnberg: 1160 },
  { year: 2018, munichTotal: 11700, munichEtw: 7950, lkStarnberg: 1180 },
  { year: 2019, munichTotal: 11650, munichEtw: 7900, lkStarnberg: 1200 },
  { year: 2020, munichTotal: 11500, munichEtw: 7800, lkStarnberg: 1200 },
  { year: 2021, munichTotal: 12800, munichEtw: 8700, lkStarnberg: 1280 },
  { year: 2022, munichTotal: 9100, munichEtw: 6200, lkStarnberg: 670 },
  { year: 2023, munichTotal: 8100, munichEtw: 5600, lkStarnberg: 510 },
  { year: 2024, munichTotal: 10950, munichEtw: 7250, lkStarnberg: 720 },
  { year: 2025, munichTotal: 11500, munichEtw: 8000, lkStarnberg: 850 },
];

// Median Vermarktungsdauer (dwell time, days)
export const dwellTime: YearRow[] = [
  { year: 2015, munich: 45, lk: 60 },
  { year: 2016, munich: 40, lk: 55 },
  { year: 2017, munich: 35, lk: 50 },
  { year: 2018, munich: 30, lk: 45 },
  { year: 2019, munich: 28, lk: 40 },
  { year: 2020, munich: 25, lk: 35 },
  { year: 2021, munich: 28, lk: 35 },
  { year: 2022, munich: 50, lk: 55 },
  { year: 2023, munich: 95, lk: 120 },
  { year: 2024, munich: 100, lk: 130 },
  { year: 2025, munich: 95, lk: 125 },
];

// Rates — Bauzins 10Y fix, ECB MRO, ECB Deposit, 10Y Bund
export const rates: YearRow[] = [
  { year: 2015, bauzins10y: 1.95, ecbMro: 0.05, ecbDepo: -0.30, bund10y: 0.63 },
  { year: 2016, bauzins10y: 1.60, ecbMro: 0.00, ecbDepo: -0.40, bund10y: 0.21 },
  { year: 2017, bauzins10y: 1.65, ecbMro: 0.00, ecbDepo: -0.40, bund10y: 0.43 },
  { year: 2018, bauzins10y: 1.80, ecbMro: 0.00, ecbDepo: -0.40, bund10y: 0.24 },
  { year: 2019, bauzins10y: 1.10, ecbMro: 0.00, ecbDepo: -0.50, bund10y: -0.19 },
  { year: 2020, bauzins10y: 1.16, ecbMro: 0.00, ecbDepo: -0.50, bund10y: -0.57 },
  { year: 2021, bauzins10y: 1.15, ecbMro: 0.00, ecbDepo: -0.50, bund10y: -0.18 },
  { year: 2022, bauzins10y: 3.90, ecbMro: 2.50, ecbDepo: 2.00, bund10y: 2.57 },
  { year: 2023, bauzins10y: 3.85, ecbMro: 4.50, ecbDepo: 4.00, bund10y: 2.02 },
  { year: 2024, bauzins10y: 3.50, ecbMro: 3.15, ecbDepo: 3.00, bund10y: 2.36 },
  { year: 2025, bauzins10y: 3.40, ecbMro: 2.40, ecbDepo: 2.25, bund10y: 2.90 },
];

// Häuserpreisindex Germany (2015=100)
export const hpi: YearRow[] = [
  { year: 2015, index: 100.0, yoy: 0 },
  { year: 2016, index: 106.8, yoy: 6.8 },
  { year: 2017, index: 113.6, yoy: 6.4 },
  { year: 2018, index: 121.2, yoy: 6.7 },
  { year: 2019, index: 127.6, yoy: 5.3 },
  { year: 2020, index: 136.5, yoy: 7.0 },
  { year: 2021, index: 152.3, yoy: 11.5 },
  { year: 2022, index: 161.6, yoy: 6.1 },
  { year: 2023, index: 148.0, yoy: -8.4 },
  { year: 2024, index: 145.8, yoy: -1.5 },
  { year: 2025, index: 150.5, yoy: 3.2 },
];

// Baupreisindex Wohngebäude (2015=100)
export const bpi: YearRow[] = [
  { year: 2015, index: 100.0, yoy: 0 },
  { year: 2016, index: 102.2, yoy: 2.2 },
  { year: 2017, index: 105.8, yoy: 3.5 },
  { year: 2018, index: 110.2, yoy: 4.2 },
  { year: 2019, index: 114.5, yoy: 3.9 },
  { year: 2020, index: 117.4, yoy: 2.5 },
  { year: 2021, index: 124.9, yoy: 6.4 },
  { year: 2022, index: 143.9, yoy: 15.2 },
  { year: 2023, index: 152.1, yoy: 5.7 },
  { year: 2024, index: 156.2, yoy: 2.7 },
  { year: 2025, index: 160.8, yoy: 3.0 },
];

// Price-to-income Munich
export const pti: YearRow[] = [
  { year: 2015, etw80m2K: 392, hhIncomeK: 28.5, ratio: 13.8 },
  { year: 2016, etw80m2K: 428, hhIncomeK: 28.8, ratio: 14.9 },
  { year: 2017, etw80m2K: 472, hhIncomeK: 29.3, ratio: 16.1 },
  { year: 2018, etw80m2K: 520, hhIncomeK: 30.0, ratio: 17.3 },
  { year: 2019, etw80m2K: 576, hhIncomeK: 30.6, ratio: 18.8 },
  { year: 2020, etw80m2K: 630, hhIncomeK: 31.6, ratio: 19.9 },
  { year: 2021, etw80m2K: 662, hhIncomeK: 32.1, ratio: 20.6 },
  { year: 2022, etw80m2K: 798, hhIncomeK: 33.0, ratio: 24.2 },
  { year: 2023, etw80m2K: 736, hhIncomeK: 33.0, ratio: 22.3 },
  { year: 2024, etw80m2K: 684, hhIncomeK: 33.2, ratio: 20.6 },
  { year: 2025, etw80m2K: 696, hhIncomeK: 34.0, ratio: 20.5 },
];

// Regime-shift annotations — used by charts to mark key years
export type RegimeMark = { year: number; label: string; tone: "neutral" | "bull" | "bear" };
export const regimeMarks: RegimeMark[] = [
  { year: 2016, label: "ZIRP / Brexit spillover", tone: "bull" },
  { year: 2020, label: "COVID + PEPP", tone: "bull" },
  { year: 2022, label: "Rate shock (ECB +450bp)", tone: "bear" },
  { year: 2024, label: "Stabilization + recovery", tone: "neutral" },
];
