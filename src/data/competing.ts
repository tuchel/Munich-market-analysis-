// Competing prime-lake markets.
// From research/competing-markets.md.

export type MarketRow = {
  id: string;
  name: string;
  country: string;
  shoreKm: number;
  populationBasinK: number;
  primeEurPerM2Min: number;
  primeEurPerM2Max: number;
  trophyCeilingPerM2: number;
  cagr10yPct: number;
  commuteMinMin: number;
  commuteMaxMin: number;
  commuteNote?: string;
  buyerDomesticPct: number;
  buyerIntlPct: number;
  annualPropTaxNote: string;
  transactionCostPct: string;
  taxRegime: string;
  outlook5y: string;
  color: string;
};

export const markets: MarketRow[] = [
  {
    id: "starnberg",
    name: "Starnberger See",
    country: "DE",
    shoreKm: 49,
    populationBasinK: 130,
    primeEurPerM2Min: 22000,
    primeEurPerM2Max: 32000,
    trophyCeilingPerM2: 38000,
    cagr10yPct: 6.5,
    commuteMinMin: 25,
    commuteMaxMin: 40,
    commuteNote: "S6 / A95",
    buyerDomesticPct: 85,
    buyerIntlPct: 15,
    annualPropTaxNote: "~0.05 % of price (Grundsteuer Flächenmodell)",
    transactionCostPct: "~5.5 %",
    taxRegime: "No regime tax",
    outlook5y: "3–5 %",
    color: "#225d76",
  },
  {
    id: "tegernsee",
    name: "Tegernsee",
    country: "DE",
    shoreKm: 21,
    populationBasinK: 20,
    primeEurPerM2Min: 25000,
    primeEurPerM2Max: 40000,
    trophyCeilingPerM2: 50000,
    cagr10yPct: 7.5,
    commuteMinMin: 55,
    commuteMaxMin: 70,
    buyerDomesticPct: 70,
    buyerIntlPct: 30,
    annualPropTaxNote: "~0.05 %",
    transactionCostPct: "~5.5 %",
    taxRegime: "No regime tax",
    outlook5y: "4–6 %",
    color: "#123848",
  },
  {
    id: "ammersee",
    name: "Ammersee",
    country: "DE",
    shoreKm: 44,
    populationBasinK: 50,
    primeEurPerM2Min: 14000,
    primeEurPerM2Max: 22000,
    trophyCeilingPerM2: 26000,
    cagr10yPct: 6.0,
    commuteMinMin: 40,
    commuteMaxMin: 55,
    buyerDomesticPct: 92,
    buyerIntlPct: 8,
    annualPropTaxNote: "~0.05 %",
    transactionCostPct: "~5.5 %",
    taxRegime: "No regime tax",
    outlook5y: "3–5 %",
    color: "#3f7d96",
  },
  {
    id: "chiemsee",
    name: "Chiemsee",
    country: "DE",
    shoreKm: 64,
    populationBasinK: 75,
    primeEurPerM2Min: 12000,
    primeEurPerM2Max: 20000,
    trophyCeilingPerM2: 25000,
    cagr10yPct: 5.5,
    commuteMinMin: 75,
    commuteMaxMin: 90,
    buyerDomesticPct: 85,
    buyerIntlPct: 15,
    annualPropTaxNote: "~0.05 %",
    transactionCostPct: "~5.5 %",
    taxRegime: "No regime tax",
    outlook5y: "2–4 %",
    color: "#6fa0b4",
  },
  {
    id: "zuerichsee",
    name: "Zürichsee",
    country: "CH",
    shoreKm: 88,
    populationBasinK: 350,
    primeEurPerM2Min: 31000,
    primeEurPerM2Max: 62000,
    trophyCeilingPerM2: 80000,
    cagr10yPct: 4.5,
    commuteMinMin: 30,
    commuteMaxMin: 240,
    commuteNote: "flight or 4h drive",
    buyerDomesticPct: 45,
    buyerIntlPct: 55,
    annualPropTaxNote: "0.1–0.3 % plus Eigenmietwert (imputed)",
    transactionCostPct: "3–5 %",
    taxRegime: "Pauschalbesteuerung for non-workers",
    outlook5y: "4–6 % EUR",
    color: "#a27f3b",
  },
  {
    id: "como",
    name: "Lago di Como",
    country: "IT",
    shoreKm: 170,
    populationBasinK: 170,
    primeEurPerM2Min: 15000,
    primeEurPerM2Max: 30000,
    trophyCeilingPerM2: 50000,
    cagr10yPct: 5.5,
    commuteMinMin: 300,
    commuteMaxMin: 480,
    commuteNote: "flight",
    buyerDomesticPct: 40,
    buyerIntlPct: 60,
    annualPropTaxNote: "IMU 0.15–0.3 % primary / higher secondary",
    transactionCostPct: "9–15 %",
    taxRegime: "Flat tax €200k / year for new residents",
    outlook5y: "4–6 %",
    color: "#c2a057",
  },
];

// Normalized price index 2015=100
export type IndexPoint = {
  year: number;
  starnberg: number;
  tegernsee: number;
  ammersee: number;
  chiemsee: number;
  zuerichsee_chf: number;
  zuerichsee_eur: number;
  como: number;
};
export const priceIndex: IndexPoint[] = [
  { year: 2015, starnberg: 100, tegernsee: 100, ammersee: 100, chiemsee: 100, zuerichsee_chf: 100, zuerichsee_eur: 100, como: 100 },
  { year: 2016, starnberg: 106, tegernsee: 107, ammersee: 105, chiemsee: 104, zuerichsee_chf: 102, zuerichsee_eur: 104, como: 102 },
  { year: 2017, starnberg: 113, tegernsee: 116, ammersee: 112, chiemsee: 109, zuerichsee_chf: 105, zuerichsee_eur: 107, como: 105 },
  { year: 2018, starnberg: 121, tegernsee: 126, ammersee: 119, chiemsee: 114, zuerichsee_chf: 108, zuerichsee_eur: 110, como: 110 },
  { year: 2019, starnberg: 129, tegernsee: 137, ammersee: 126, chiemsee: 120, zuerichsee_chf: 111, zuerichsee_eur: 115, como: 114 },
  { year: 2020, starnberg: 138, tegernsee: 148, ammersee: 134, chiemsee: 126, zuerichsee_chf: 115, zuerichsee_eur: 121, como: 119 },
  { year: 2021, starnberg: 152, tegernsee: 164, ammersee: 147, chiemsee: 135, zuerichsee_chf: 120, zuerichsee_eur: 128, como: 131 },
  { year: 2022, starnberg: 166, tegernsee: 180, ammersee: 160, chiemsee: 144, zuerichsee_chf: 126, zuerichsee_eur: 138, como: 145 },
  { year: 2023, starnberg: 172, tegernsee: 188, ammersee: 166, chiemsee: 148, zuerichsee_chf: 132, zuerichsee_eur: 152, como: 157 },
  { year: 2024, starnberg: 175, tegernsee: 193, ammersee: 169, chiemsee: 150, zuerichsee_chf: 136, zuerichsee_eur: 162, como: 164 },
  { year: 2025, starnberg: 180, tegernsee: 200, ammersee: 174, chiemsee: 153, zuerichsee_chf: 141, zuerichsee_eur: 172, como: 172 },
];

// Tax & cost stack on €10M / 10-yr hold
export type StackBucket = {
  bucket: string;
  deK: number;
  chK: number;
  itK: number;
  note?: string;
};
export const stack10M: StackBucket[] = [
  { bucket: "Transfer tax", deK: 350, chK: 200, itK: 900 },
  { bucket: "Notary / registration", deK: 150, chK: 50, itK: 150 },
  { bucket: "Agent buy-side", deK: 178, chK: 100, itK: 366 },
  { bucket: "VAT on new-build", deK: 0, chK: 0, itK: 1000, note: "IT IVA 10% on new-build only" },
];

export const stackHolding10yr = [
  { bucket: "Transaction total", deK: 680, chK: 350, itK: 1416 },
  { bucket: "Annual property tax × 10", deK: 50, chK: 400, itK: 250 },
  { bucket: "Total 10-yr holding", deK: 1180, chK: 3850, itK: 3916 },
];
