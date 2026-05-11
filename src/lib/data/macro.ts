export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] as const;

export type YearPoint = { year: number } & Record<string, number | undefined>;

// Munich ETW (Eigentumswohnung, Bestand) €/m² Angebotspreise
export const MUNICH_ETW: YearPoint[] = [
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

// Munich SFH median €/object (Mio €)
export const MUNICH_SFH: YearPoint[] = [
  { year: 2015, perM2: 5400, medianObj: 1.05, p75Obj: 1.55, p90Lux: 2.6 },
  { year: 2016, perM2: 5800, medianObj: 1.15, p75Obj: 1.70, p90Lux: 2.9 },
  { year: 2017, perM2: 6400, medianObj: 1.30, p75Obj: 1.90, p90Lux: 3.3 },
  { year: 2018, perM2: 6900, medianObj: 1.40, p75Obj: 2.05, p90Lux: 3.6 },
  { year: 2019, perM2: 7600, medianObj: 1.55, p75Obj: 2.30, p90Lux: 4.0 },
  { year: 2020, perM2: 8200, medianObj: 1.70, p75Obj: 2.55, p90Lux: 4.4 },
  { year: 2021, perM2: 9000, medianObj: 1.90, p75Obj: 2.85, p90Lux: 4.9 },
  { year: 2022, perM2: 9800, medianObj: 2.10, p75Obj: 3.20, p90Lux: 5.6 },
  { year: 2023, perM2: 9100, medianObj: 1.87, p75Obj: 2.85, p90Lux: 5.2 },
  { year: 2024, perM2: 8434, medianObj: 1.80, p75Obj: 2.75, p90Lux: 5.0 },
  { year: 2025, perM2: 8750, medianObj: 1.85, p75Obj: 2.85, p90Lux: 5.2 },
];

// Landkreis Starnberg
export const LK_STARNBERG: YearPoint[] = [
  { year: 2015, townSfhPerM2: 5800, kreisMedianM: 1.10, waterfrontVillaM: 3.5 },
  { year: 2016, townSfhPerM2: 6300, kreisMedianM: 1.20, waterfrontVillaM: 3.8 },
  { year: 2017, townSfhPerM2: 7000, kreisMedianM: 1.35, waterfrontVillaM: 4.2 },
  { year: 2018, townSfhPerM2: 7700, kreisMedianM: 1.50, waterfrontVillaM: 4.6 },
  { year: 2019, townSfhPerM2: 8500, kreisMedianM: 1.65, waterfrontVillaM: 4.7 },
  { year: 2020, townSfhPerM2: 9950, kreisMedianM: 1.95, waterfrontVillaM: 5.6 },
  { year: 2021, townSfhPerM2: 11800, kreisMedianM: 2.35, waterfrontVillaM: 6.9 },
  { year: 2022, townSfhPerM2: 12500, kreisMedianM: 2.55, waterfrontVillaM: 9.2 },
  { year: 2023, townSfhPerM2: 12100, kreisMedianM: 2.40, waterfrontVillaM: 8.9 },
  { year: 2024, townSfhPerM2: 8001, kreisMedianM: 2.35, waterfrontVillaM: 9.0 },
  { year: 2025, townSfhPerM2: 9176, kreisMedianM: 2.60, waterfrontVillaM: 9.7 },
];

// Transaction volumes
export const TRANSACTIONS: YearPoint[] = [
  { year: 2015, muc: 12100, mucEtw: 8200, lkStb: 1100 },
  { year: 2016, muc: 12000, mucEtw: 8150, lkStb: 1130 },
  { year: 2017, muc: 11900, mucEtw: 8100, lkStb: 1150 },
  { year: 2018, muc: 11700, mucEtw: 7950, lkStb: 1180 },
  { year: 2019, muc: 12200, mucEtw: 8300, lkStb: 1200 },
  { year: 2020, muc: 11500, mucEtw: 7800, lkStb: 1200 },
  { year: 2021, muc: 12800, mucEtw: 8700, lkStb: 1280 },
  { year: 2022, muc: 9100, mucEtw: 6200, lkStb: 670 },
  { year: 2023, muc: 8100, mucEtw: 5600, lkStb: 510 },
  { year: 2024, muc: 10950, mucEtw: 7250, lkStb: 720 },
  { year: 2025, muc: 11500, mucEtw: 8000, lkStb: 850 },
];

// Days on market
export const DWELL: YearPoint[] = [
  { year: 2015, muc: 45, lkStb: 60 },
  { year: 2016, muc: 38, lkStb: 52 },
  { year: 2017, muc: 32, lkStb: 47 },
  { year: 2018, muc: 30, lkStb: 45 },
  { year: 2019, muc: 28, lkStb: 40 },
  { year: 2020, muc: 25, lkStb: 35 },
  { year: 2021, muc: 28, lkStb: 35 },
  { year: 2022, muc: 50, lkStb: 55 },
  { year: 2023, muc: 95, lkStb: 120 },
  { year: 2024, muc: 100, lkStb: 130 },
  { year: 2025, muc: 95, lkStb: 125 },
];

// Bauzins / ECB / Bund (year-end)
export const RATES: YearPoint[] = [
  { year: 2015, bauzins: 1.95, ecbMro: 0.05, ecbDeposit: -0.30, bund10y: 0.63 },
  { year: 2016, bauzins: 1.60, ecbMro: 0.00, ecbDeposit: -0.40, bund10y: 0.21 },
  { year: 2017, bauzins: 1.65, ecbMro: 0.00, ecbDeposit: -0.40, bund10y: 0.43 },
  { year: 2018, bauzins: 1.80, ecbMro: 0.00, ecbDeposit: -0.40, bund10y: 0.24 },
  { year: 2019, bauzins: 1.10, ecbMro: 0.00, ecbDeposit: -0.50, bund10y: -0.19 },
  { year: 2020, bauzins: 1.16, ecbMro: 0.00, ecbDeposit: -0.50, bund10y: -0.57 },
  { year: 2021, bauzins: 1.15, ecbMro: 0.00, ecbDeposit: -0.50, bund10y: -0.18 },
  { year: 2022, bauzins: 3.90, ecbMro: 2.50, ecbDeposit: 2.00, bund10y: 2.57 },
  { year: 2023, bauzins: 3.85, ecbMro: 4.50, ecbDeposit: 4.00, bund10y: 2.02 },
  { year: 2024, bauzins: 3.50, ecbMro: 3.15, ecbDeposit: 3.00, bund10y: 2.36 },
  { year: 2025, bauzins: 3.40, ecbMro: 2.40, ecbDeposit: 2.25, bund10y: 2.90 },
];

// Häuserpreisindex & Baupreisindex (2015=100)
export const INDICES: YearPoint[] = [
  { year: 2015, hpi: 100.0, bpi: 100.0 },
  { year: 2016, hpi: 106.8, bpi: 102.2 },
  { year: 2017, hpi: 113.6, bpi: 105.8 },
  { year: 2018, hpi: 121.2, bpi: 110.2 },
  { year: 2019, hpi: 127.6, bpi: 114.5 },
  { year: 2020, hpi: 136.5, bpi: 117.4 },
  { year: 2021, hpi: 152.3, bpi: 124.9 },
  { year: 2022, hpi: 161.6, bpi: 143.9 },
  { year: 2023, hpi: 148.0, bpi: 152.1 },
  { year: 2024, hpi: 145.8, bpi: 156.2 },
  { year: 2025, hpi: 150.5, bpi: 160.8 },
];

// Price-to-income
export const PRICE_INCOME: YearPoint[] = [
  { year: 2015, etw80kPrice: 392, hhDispK: 28.5, piRatio: 13.8 },
  { year: 2018, etw80kPrice: 520, hhDispK: 30.0, piRatio: 17.3 },
  { year: 2020, etw80kPrice: 630, hhDispK: 31.6, piRatio: 19.9 },
  { year: 2021, etw80kPrice: 662, hhDispK: 32.8, piRatio: 20.2 },
  { year: 2022, etw80kPrice: 798, hhDispK: 33.0, piRatio: 24.2 },
  { year: 2023, etw80kPrice: 737, hhDispK: 33.2, piRatio: 22.2 },
  { year: 2024, etw80kPrice: 684, hhDispK: 33.2, piRatio: 20.6 },
  { year: 2025, etw80kPrice: 696, hhDispK: 34.0, piRatio: 20.5 },
];

// Composite price index — 2015 = 100, lakefront vs Munich vs DE
export const COMPOSITE_INDEX: YearPoint[] = [
  { year: 2015, sbgLakefront: 100, muc: 100, deHpi: 100 },
  { year: 2016, sbgLakefront: 108, muc: 109, deHpi: 107 },
  { year: 2017, sbgLakefront: 120, muc: 120, deHpi: 114 },
  { year: 2018, sbgLakefront: 131, muc: 133, deHpi: 121 },
  { year: 2019, sbgLakefront: 134, muc: 147, deHpi: 128 },
  { year: 2020, sbgLakefront: 160, muc: 161, deHpi: 137 },
  { year: 2021, sbgLakefront: 197, muc: 169, deHpi: 152 },
  { year: 2022, sbgLakefront: 263, muc: 204, deHpi: 162 },
  { year: 2023, sbgLakefront: 254, muc: 188, deHpi: 148 },
  { year: 2024, sbgLakefront: 257, muc: 175, deHpi: 146 },
  { year: 2025, sbgLakefront: 277, muc: 180, deHpi: 151 },
];
