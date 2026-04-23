// Core time series, 2000–2025. 25 full years.
//
// Provenance:
//   - rates / hpi / bpi  → Bundesbank, ECB, Destatis (authoritative, full 2000–2025 history)
//   - munichEtw          → Gutachterausschuss München Jahresmarktbericht, back-reconstructed
//                          2000–2014 from IVD Süd / JLL historical Munich reports
//   - munichSfh          → same, with some 2000–2009 interpolation between published
//                          Gutachterausschuss 5-year benchmarks
//   - starnbergLk        → Gutachterausschuss LK Starnberg + E&V retrospectives; waterfront
//                          villa median pre-2010 is a press-reconstructed estimate, precision
//                          ±15% (only 1–3 public press prints per year in that era)
//   - transactions       → notarised contract counts, Gutachterausschuss annual reports
//   - dwellTime          → Munich dwell-time series starts 2010 in published form; earlier
//                          years are directional estimates (IVD benchmark survey)
//   - pti                → Munich 80m² ETW / HH disposable income (LfStat + Destatis)
//
// See /methodology for the reconstruction methodology and confidence flags.

export type YearRow = { year: number } & Record<string, number | undefined>;

// Munich ETW (apartment) asking prices — €/m² — median + P75 + P90
export const munichEtw: YearRow[] = [
  { year: 2000, median: 2800, p75: 3600, p90: 4500 },
  { year: 2001, median: 2750, p75: 3500, p90: 4350 },
  { year: 2002, median: 2700, p75: 3400, p90: 4200 },
  { year: 2003, median: 2650, p75: 3350, p90: 4100 }, // trough after dot-com
  { year: 2004, median: 2700, p75: 3400, p90: 4150 },
  { year: 2005, median: 2750, p75: 3450, p90: 4250 },
  { year: 2006, median: 2850, p75: 3600, p90: 4500 },
  { year: 2007, median: 2950, p75: 3750, p90: 4800 }, // late-cycle peak
  { year: 2008, median: 3050, p75: 3900, p90: 4950 },
  { year: 2009, median: 3100, p75: 3950, p90: 5050 }, // GFC flight-to-quality mutes drawdown
  { year: 2010, median: 3300, p75: 4200, p90: 5400 }, // Euro-crisis bid for German real estate begins
  { year: 2011, median: 3700, p75: 4700, p90: 6000 },
  { year: 2012, median: 4050, p75: 5100, p90: 6500 }, // Draghi "whatever it takes"
  { year: 2013, median: 4400, p75: 5600, p90: 7100 },
  { year: 2014, median: 4700, p75: 5900, p90: 7450 },
  { year: 2015, median: 4900, p75: 6200, p90: 7800 },
  { year: 2016, median: 5350, p75: 6900, p90: 8600 }, // Brexit + ZIRP acceleration
  { year: 2017, median: 5900, p75: 7600, p90: 9500 },
  { year: 2018, median: 6500, p75: 8400, p90: 10800 },
  { year: 2019, median: 7200, p75: 9300, p90: 12000 }, // empirica flags #1 bubble risk
  { year: 2020, median: 7875, p75: 9800, p90: 12600 }, // COVID / PEPP
  { year: 2021, median: 8275, p75: 10400, p90: 13300 },
  { year: 2022, median: 9975, p75: 12300, p90: 15400 }, // peak
  { year: 2023, median: 9208, p75: 11300, p90: 14200 }, // −7.7% rate shock
  { year: 2024, median: 8556, p75: 10500, p90: 13400 },
  { year: 2025, median: 8800, p75: 10700, p90: 13700 }, // recovery +2.9%
];

// Munich SFH — €/m² and median object price
export const munichSfh: YearRow[] = [
  { year: 2000, eurPerM2: 2800, medianObjectM: 0.60, p75M: 0.85, p90M: 1.40 },
  { year: 2001, eurPerM2: 2820, medianObjectM: 0.61, p75M: 0.86, p90M: 1.42 },
  { year: 2002, eurPerM2: 2830, medianObjectM: 0.61, p75M: 0.86, p90M: 1.42 },
  { year: 2003, eurPerM2: 2850, medianObjectM: 0.61, p75M: 0.87, p90M: 1.43 },
  { year: 2004, eurPerM2: 2900, medianObjectM: 0.61, p75M: 0.88, p90M: 1.45 },
  { year: 2005, eurPerM2: 3000, medianObjectM: 0.62, p75M: 0.90, p90M: 1.50 },
  { year: 2006, eurPerM2: 3100, medianObjectM: 0.64, p75M: 0.94, p90M: 1.55 },
  { year: 2007, eurPerM2: 3250, medianObjectM: 0.68, p75M: 1.00, p90M: 1.65 },
  { year: 2008, eurPerM2: 3400, medianObjectM: 0.72, p75M: 1.05, p90M: 1.75 },
  { year: 2009, eurPerM2: 3450, medianObjectM: 0.72, p75M: 1.05, p90M: 1.76 },
  { year: 2010, eurPerM2: 3700, medianObjectM: 0.75, p75M: 1.10, p90M: 1.90 },
  { year: 2011, eurPerM2: 4000, medianObjectM: 0.80, p75M: 1.18, p90M: 2.05 },
  { year: 2012, eurPerM2: 4300, medianObjectM: 0.86, p75M: 1.26, p90M: 2.15 },
  { year: 2013, eurPerM2: 4600, medianObjectM: 0.90, p75M: 1.32, p90M: 2.25 },
  { year: 2014, eurPerM2: 4900, medianObjectM: 0.95, p75M: 1.40, p90M: 2.40 },
  { year: 2015, eurPerM2: 5400, medianObjectM: 1.05, p75M: 1.55, p90M: 2.60 },
  { year: 2016, eurPerM2: 5900, medianObjectM: 1.18, p75M: 1.72, p90M: 2.95 },
  { year: 2017, eurPerM2: 6400, medianObjectM: 1.30, p75M: 1.90, p90M: 3.30 },
  { year: 2018, eurPerM2: 7000, medianObjectM: 1.42, p75M: 2.10, p90M: 3.65 },
  { year: 2019, eurPerM2: 7600, medianObjectM: 1.55, p75M: 2.30, p90M: 4.00 },
  { year: 2020, eurPerM2: 8200, medianObjectM: 1.72, p75M: 2.55, p90M: 4.40 },
  { year: 2021, eurPerM2: 9000, medianObjectM: 1.90, p75M: 2.85, p90M: 4.90 },
  { year: 2022, eurPerM2: 9800, medianObjectM: 2.10, p75M: 3.20, p90M: 5.60 },
  { year: 2023, eurPerM2: 9100, medianObjectM: 1.87, p75M: 2.85, p90M: 5.20 },
  { year: 2024, eurPerM2: 8434, medianObjectM: 1.80, p75M: 2.75, p90M: 5.00 },
  { year: 2025, eurPerM2: 8750, medianObjectM: 1.85, p75M: 2.85, p90M: 5.20 },
];

// Landkreis Starnberg — town SFH + Kreis-median + lakefront-villa-median
// Waterfront villa median pre-2010 is a reconstructed estimate (thin public prints, ±15% precision).
export const starnbergLk: YearRow[] = [
  { year: 2000, starnbergSfhEurPerM2: 2800, kreisMedianSfhM: 0.50, waterfrontVillaM: 1.50 },
  { year: 2001, starnbergSfhEurPerM2: 2850, kreisMedianSfhM: 0.51, waterfrontVillaM: 1.55 },
  { year: 2002, starnbergSfhEurPerM2: 2900, kreisMedianSfhM: 0.52, waterfrontVillaM: 1.60 },
  { year: 2003, starnbergSfhEurPerM2: 2920, kreisMedianSfhM: 0.52, waterfrontVillaM: 1.60 },
  { year: 2004, starnbergSfhEurPerM2: 3000, kreisMedianSfhM: 0.53, waterfrontVillaM: 1.70 },
  { year: 2005, starnbergSfhEurPerM2: 3100, kreisMedianSfhM: 0.55, waterfrontVillaM: 1.80 },
  { year: 2006, starnbergSfhEurPerM2: 3250, kreisMedianSfhM: 0.58, waterfrontVillaM: 1.90 },
  { year: 2007, starnbergSfhEurPerM2: 3500, kreisMedianSfhM: 0.62, waterfrontVillaM: 2.10 },
  { year: 2008, starnbergSfhEurPerM2: 3700, kreisMedianSfhM: 0.66, waterfrontVillaM: 2.20 }, // GFC minimal impact on lake
  { year: 2009, starnbergSfhEurPerM2: 3850, kreisMedianSfhM: 0.68, waterfrontVillaM: 2.30 },
  { year: 2010, starnbergSfhEurPerM2: 4200, kreisMedianSfhM: 0.75, waterfrontVillaM: 2.50 },
  { year: 2011, starnbergSfhEurPerM2: 4600, kreisMedianSfhM: 0.82, waterfrontVillaM: 2.70 },
  { year: 2012, starnbergSfhEurPerM2: 4800, kreisMedianSfhM: 0.85, waterfrontVillaM: 2.80 }, // flight-to-German-RE in Euro crisis
  { year: 2013, starnbergSfhEurPerM2: 5000, kreisMedianSfhM: 0.90, waterfrontVillaM: 3.00 },
  { year: 2014, starnbergSfhEurPerM2: 5200, kreisMedianSfhM: 0.95, waterfrontVillaM: 3.10 },
  { year: 2015, starnbergSfhEurPerM2: 5800, kreisMedianSfhM: 1.10, waterfrontVillaM: 3.50 },
  { year: 2016, starnbergSfhEurPerM2: 6400, kreisMedianSfhM: 1.22, waterfrontVillaM: 3.80 },
  { year: 2017, starnbergSfhEurPerM2: 7000, kreisMedianSfhM: 1.35, waterfrontVillaM: 4.20 },
  { year: 2018, starnbergSfhEurPerM2: 7700, kreisMedianSfhM: 1.50, waterfrontVillaM: 4.40 },
  { year: 2019, starnbergSfhEurPerM2: 8500, kreisMedianSfhM: 1.65, waterfrontVillaM: 4.70 },
  { year: 2020, starnbergSfhEurPerM2: 9950, kreisMedianSfhM: 1.95, waterfrontVillaM: 5.60 },
  { year: 2021, starnbergSfhEurPerM2: 11800, kreisMedianSfhM: 2.35, waterfrontVillaM: 6.90 },
  { year: 2022, starnbergSfhEurPerM2: 12500, kreisMedianSfhM: 2.55, waterfrontVillaM: 9.20 },
  { year: 2023, starnbergSfhEurPerM2: 12100, kreisMedianSfhM: 2.40, waterfrontVillaM: 8.90 },
  { year: 2024, starnbergSfhEurPerM2: 8001, kreisMedianSfhM: 2.35, waterfrontVillaM: 9.00 },
  { year: 2025, starnbergSfhEurPerM2: 9176, kreisMedianSfhM: 2.60, waterfrontVillaM: 9.70 },
];

// Transactions (notarized contracts)
export const transactions: YearRow[] = [
  { year: 2000, munichTotal: 13500, munichEtw: 9000, lkStarnberg: 1050 },
  { year: 2001, munichTotal: 13200, munichEtw: 8800, lkStarnberg: 1040 },
  { year: 2002, munichTotal: 12800, munichEtw: 8500, lkStarnberg: 1030 },
  { year: 2003, munichTotal: 12400, munichEtw: 8300, lkStarnberg: 1020 },
  { year: 2004, munichTotal: 12300, munichEtw: 8250, lkStarnberg: 1050 },
  { year: 2005, munichTotal: 12200, munichEtw: 8200, lkStarnberg: 1070 },
  { year: 2006, munichTotal: 12500, munichEtw: 8350, lkStarnberg: 1080 },
  { year: 2007, munichTotal: 11800, munichEtw: 7900, lkStarnberg: 990 },
  { year: 2008, munichTotal: 9800, munichEtw: 6700, lkStarnberg: 900 }, // GFC
  { year: 2009, munichTotal: 10500, munichEtw: 7200, lkStarnberg: 970 },
  { year: 2010, munichTotal: 11500, munichEtw: 7900, lkStarnberg: 1100 },
  { year: 2011, munichTotal: 12000, munichEtw: 8200, lkStarnberg: 1110 },
  { year: 2012, munichTotal: 12000, munichEtw: 8300, lkStarnberg: 1120 },
  { year: 2013, munichTotal: 12100, munichEtw: 8250, lkStarnberg: 1120 },
  { year: 2014, munichTotal: 12200, munichEtw: 8300, lkStarnberg: 1110 },
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
// Pre-2010 data is sparse; IVD benchmark survey estimates used 2005–2009.
export const dwellTime: YearRow[] = [
  { year: 2005, munich: 80, lk: 105 },
  { year: 2006, munich: 75, lk: 95 },
  { year: 2007, munich: 70, lk: 88 },
  { year: 2008, munich: 85, lk: 110 }, // GFC
  { year: 2009, munich: 75, lk: 100 },
  { year: 2010, munich: 50, lk: 70 },
  { year: 2011, munich: 48, lk: 65 },
  { year: 2012, munich: 47, lk: 62 },
  { year: 2013, munich: 46, lk: 60 },
  { year: 2014, munich: 45, lk: 60 },
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

// Rates — Bauzins 10Y fix (Bundesbank MFI), ECB MRO & Deposit, 10Y Bund
export const rates: YearRow[] = [
  { year: 2000, bauzins10y: 6.20, ecbMro: 4.75, ecbDepo: 3.75, bund10y: 5.19 },
  { year: 2001, bauzins10y: 5.50, ecbMro: 3.25, ecbDepo: 2.25, bund10y: 4.88 },
  { year: 2002, bauzins10y: 5.60, ecbMro: 2.75, ecbDepo: 1.75, bund10y: 4.21 },
  { year: 2003, bauzins10y: 5.00, ecbMro: 2.00, ecbDepo: 1.00, bund10y: 4.28 },
  { year: 2004, bauzins10y: 4.70, ecbMro: 2.00, ecbDepo: 1.00, bund10y: 4.07 },
  { year: 2005, bauzins10y: 4.30, ecbMro: 2.25, ecbDepo: 1.25, bund10y: 3.26 },
  { year: 2006, bauzins10y: 4.50, ecbMro: 3.50, ecbDepo: 2.50, bund10y: 3.72 },
  { year: 2007, bauzins10y: 5.10, ecbMro: 4.00, ecbDepo: 3.00, bund10y: 4.22 }, // late-cycle
  { year: 2008, bauzins10y: 4.90, ecbMro: 2.50, ecbDepo: 2.00, bund10y: 2.95 }, // Lehman
  { year: 2009, bauzins10y: 4.30, ecbMro: 1.00, ecbDepo: 0.25, bund10y: 3.39 },
  { year: 2010, bauzins10y: 3.80, ecbMro: 1.00, ecbDepo: 0.25, bund10y: 2.96 },
  { year: 2011, bauzins10y: 3.60, ecbMro: 1.00, ecbDepo: 0.25, bund10y: 1.83 }, // Euro crisis
  { year: 2012, bauzins10y: 2.90, ecbMro: 0.75, ecbDepo: 0.00, bund10y: 1.30 }, // Draghi
  { year: 2013, bauzins10y: 2.70, ecbMro: 0.25, ecbDepo: 0.00, bund10y: 1.94 },
  { year: 2014, bauzins10y: 2.30, ecbMro: 0.05, ecbDepo: -0.20, bund10y: 0.54 }, // ECB first NIRP
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

// Häuserpreisindex Germany (Destatis, 2015=100). Authoritative — 2000 onwards.
export const hpi: YearRow[] = [
  { year: 2000, index: 87.0, yoy: undefined },
  { year: 2001, index: 87.0, yoy: 0.0 },
  { year: 2002, index: 86.0, yoy: -1.1 },
  { year: 2003, index: 85.2, yoy: -0.9 }, // trough
  { year: 2004, index: 85.0, yoy: -0.2 },
  { year: 2005, index: 85.7, yoy: 0.8 },
  { year: 2006, index: 86.5, yoy: 0.9 },
  { year: 2007, index: 87.7, yoy: 1.4 },
  { year: 2008, index: 88.2, yoy: 0.6 },
  { year: 2009, index: 85.4, yoy: -3.2 }, // GFC dip
  { year: 2010, index: 86.3, yoy: 1.1 },
  { year: 2011, index: 89.2, yoy: 3.4 },
  { year: 2012, index: 91.3, yoy: 2.4 },
  { year: 2013, index: 93.8, yoy: 2.7 },
  { year: 2014, index: 96.5, yoy: 2.9 },
  { year: 2015, index: 100.0, yoy: 3.6 },
  { year: 2016, index: 106.8, yoy: 6.8 },
  { year: 2017, index: 113.6, yoy: 6.4 },
  { year: 2018, index: 121.2, yoy: 6.7 },
  { year: 2019, index: 127.6, yoy: 5.3 },
  { year: 2020, index: 136.5, yoy: 7.0 },
  { year: 2021, index: 152.3, yoy: 11.5 },
  { year: 2022, index: 161.6, yoy: 6.1 }, // peak
  { year: 2023, index: 148.0, yoy: -8.4 },
  { year: 2024, index: 145.8, yoy: -1.5 },
  { year: 2025, index: 150.5, yoy: 3.2 },
];

// Baupreisindex Wohngebäude (Destatis, 2015=100). Authoritative — 2000 onwards.
export const bpi: YearRow[] = [
  { year: 2000, index: 74.8, yoy: undefined },
  { year: 2001, index: 75.6, yoy: 1.1 },
  { year: 2002, index: 74.8, yoy: -1.1 },
  { year: 2003, index: 75.5, yoy: 0.9 },
  { year: 2004, index: 77.6, yoy: 2.8 },
  { year: 2005, index: 80.5, yoy: 3.7 },
  { year: 2006, index: 83.9, yoy: 4.2 },
  { year: 2007, index: 89.3, yoy: 6.4 }, // VAT hike passes through
  { year: 2008, index: 92.1, yoy: 3.2 },
  { year: 2009, index: 90.8, yoy: -1.4 },
  { year: 2010, index: 91.1, yoy: 0.3 },
  { year: 2011, index: 93.6, yoy: 2.7 },
  { year: 2012, index: 95.8, yoy: 2.4 },
  { year: 2013, index: 97.5, yoy: 1.8 },
  { year: 2014, index: 99.3, yoy: 1.8 },
  { year: 2015, index: 100.0, yoy: 0.7 },
  { year: 2016, index: 102.2, yoy: 2.2 },
  { year: 2017, index: 105.8, yoy: 3.5 },
  { year: 2018, index: 110.2, yoy: 4.2 },
  { year: 2019, index: 114.5, yoy: 3.9 },
  { year: 2020, index: 117.4, yoy: 2.5 },
  { year: 2021, index: 124.9, yoy: 6.4 },
  { year: 2022, index: 143.9, yoy: 15.2 }, // energy + materials shock
  { year: 2023, index: 152.1, yoy: 5.7 },
  { year: 2024, index: 156.2, yoy: 2.7 },
  { year: 2025, index: 160.8, yoy: 3.0 },
];

// Price-to-income Munich — 80m² ETW / HH disposable income.
export const pti: YearRow[] = [
  { year: 2000, etw80m2K: 224, hhIncomeK: 25.8, ratio: 8.7 },
  { year: 2001, etw80m2K: 220, hhIncomeK: 26.0, ratio: 8.5 },
  { year: 2002, etw80m2K: 216, hhIncomeK: 26.2, ratio: 8.2 },
  { year: 2003, etw80m2K: 212, hhIncomeK: 26.4, ratio: 8.0 },
  { year: 2004, etw80m2K: 216, hhIncomeK: 26.3, ratio: 8.2 },
  { year: 2005, etw80m2K: 220, hhIncomeK: 26.5, ratio: 8.3 },
  { year: 2006, etw80m2K: 228, hhIncomeK: 26.7, ratio: 8.5 },
  { year: 2007, etw80m2K: 236, hhIncomeK: 26.9, ratio: 8.8 },
  { year: 2008, etw80m2K: 244, hhIncomeK: 27.1, ratio: 9.0 },
  { year: 2009, etw80m2K: 248, hhIncomeK: 27.0, ratio: 9.2 },
  { year: 2010, etw80m2K: 264, hhIncomeK: 27.5, ratio: 9.6 },
  { year: 2011, etw80m2K: 296, hhIncomeK: 27.7, ratio: 10.7 },
  { year: 2012, etw80m2K: 324, hhIncomeK: 28.0, ratio: 11.6 },
  { year: 2013, etw80m2K: 352, hhIncomeK: 28.2, ratio: 12.5 },
  { year: 2014, etw80m2K: 376, hhIncomeK: 28.3, ratio: 13.3 },
  { year: 2015, etw80m2K: 392, hhIncomeK: 28.5, ratio: 13.8 },
  { year: 2016, etw80m2K: 428, hhIncomeK: 28.8, ratio: 14.9 },
  { year: 2017, etw80m2K: 472, hhIncomeK: 29.3, ratio: 16.1 },
  { year: 2018, etw80m2K: 520, hhIncomeK: 30.0, ratio: 17.3 },
  { year: 2019, etw80m2K: 576, hhIncomeK: 30.6, ratio: 18.8 },
  { year: 2020, etw80m2K: 630, hhIncomeK: 31.6, ratio: 19.9 },
  { year: 2021, etw80m2K: 662, hhIncomeK: 32.1, ratio: 20.6 },
  { year: 2022, etw80m2K: 798, hhIncomeK: 33.0, ratio: 24.2 }, // peak
  { year: 2023, etw80m2K: 736, hhIncomeK: 33.0, ratio: 22.3 },
  { year: 2024, etw80m2K: 684, hhIncomeK: 33.2, ratio: 20.6 },
  { year: 2025, etw80m2K: 696, hhIncomeK: 34.0, ratio: 20.5 },
];

// Regime-shift annotations across 25 years.
export type RegimeMark = {
  year: number;
  label: string;
  tone: "neutral" | "bull" | "bear";
  detail?: string;
};
export const regimeMarks: RegimeMark[] = [
  { year: 2003, label: "'03 trough", tone: "bear", detail: "End of post-unification adjustment; HPI bottomed at 85" },
  { year: 2008, label: "GFC", tone: "bear", detail: "Munich volumes −16 % in one year; prices mostly held" },
  { year: 2012, label: "Draghi", tone: "bull", detail: "\"Whatever it takes\" — flight-to-German-real-estate bid begins" },
  { year: 2016, label: "ZIRP", tone: "bull", detail: "ZIRP acceleration + Brexit; Munich +10 % YoY" },
  { year: 2020, label: "COVID", tone: "bull", detail: "PEPP €1.85tn; 2021 the fastest year of appreciation" },
  { year: 2022, label: "Rate shock", tone: "bear", detail: "Bauzins 1.15 % → 3.90 %; Munich volume −29 %" },
  { year: 2024, label: "Recovery", tone: "neutral", detail: "First ECB cuts; volume +35 %, prices flat-to-rising" },
];
