// Tax, cost, climate data.
// From research/policy-climate.md.

export type TaxStackRow = {
  item: string;
  eur5M: number;
  eur7_5M: number;
  eur10M: number;
  note?: string;
};

// Closing-cost stack — Bavaria, private-to-private, with Makler
export const closingStack: TaxStackRow[] = [
  { item: "Kaufpreis", eur5M: 5_000_000, eur7_5M: 7_500_000, eur10M: 10_000_000 },
  { item: "Grunderwerbsteuer (3,5 %)", eur5M: 175_000, eur7_5M: 262_500, eur10M: 350_000, note: "Bavaria — lowest Land rate" },
  { item: "Notar (~1,0 %)", eur5M: 50_000, eur7_5M: 71_000, eur10M: 90_000 },
  { item: "Grundbuch (~0,5 %)", eur5M: 25_000, eur7_5M: 35_000, eur10M: 45_000 },
  { item: "Makler (3,57 % brutto buyer-side)", eur5M: 178_500, eur7_5M: 267_750, eur10M: 357_000, note: "BY split 50/50 common" },
];
export const closingTotals = (() => {
  const items = closingStack.slice(1);
  return {
    eur5M: items.reduce((a, r) => a + r.eur5M, 0),
    eur7_5M: items.reduce((a, r) => a + r.eur7_5M, 0),
    eur10M: items.reduce((a, r) => a + r.eur10M, 0),
  };
})();

// GrESt by Bundesland
export type GrEStRow = { land: string; ratePct: number; note?: string };
export const grEstByLand: GrEStRow[] = [
  { land: "Bayern", ratePct: 3.5, note: "unchanged since 2006 — lowest in DE" },
  { land: "Sachsen", ratePct: 3.5 },
  { land: "Thüringen", ratePct: 5.0 },
  { land: "Baden-Württemberg", ratePct: 5.0 },
  { land: "Rheinland-Pfalz", ratePct: 5.0 },
  { land: "Sachsen-Anhalt", ratePct: 5.0 },
  { land: "Bremen", ratePct: 5.0 },
  { land: "Niedersachsen", ratePct: 5.0 },
  { land: "Hamburg", ratePct: 5.5 },
  { land: "Berlin", ratePct: 6.0 },
  { land: "Hessen", ratePct: 6.0 },
  { land: "Mecklenburg-Vorpommern", ratePct: 6.0 },
  { land: "Brandenburg", ratePct: 6.5 },
  { land: "Nordrhein-Westfalen", ratePct: 6.5 },
  { land: "Saarland", ratePct: 6.5 },
  { land: "Schleswig-Holstein", ratePct: 6.5 },
];

// Grundsteuer B Hebesätze — lake + reference
export type HebesatzRow = { gemeinde: string; hebesatzPct: number; kind: "lake" | "ref" };
export const hebesatzGrundsteuerB: HebesatzRow[] = [
  { gemeinde: "Starnberg", hebesatzPct: 395, kind: "lake" },
  { gemeinde: "Pöcking", hebesatzPct: 370, kind: "lake" },
  { gemeinde: "Seeshaupt", hebesatzPct: 370, kind: "lake" },
  { gemeinde: "Bernried", hebesatzPct: 360, kind: "lake" },
  { gemeinde: "Tutzing", hebesatzPct: 350, kind: "lake" },
  { gemeinde: "Feldafing", hebesatzPct: 345, kind: "lake" },
  { gemeinde: "Berg", hebesatzPct: 340, kind: "lake" },
  { gemeinde: "Münsing", hebesatzPct: 340, kind: "lake" },
  { gemeinde: "Munich (reference)", hebesatzPct: 535, kind: "ref" },
  { gemeinde: "Grünwald (lowest DE)", hebesatzPct: 240, kind: "ref" },
];

// Zweitwohnsteuer (if not Hauptwohnsitz)
export type ZwsRow = { gemeinde: string; ratePct?: number; note?: string };
export const zweitwohnsteuer: ZwsRow[] = [
  { gemeinde: "Starnberg", ratePct: 20, note: "% of Jahresnettokaltmiete" },
  { gemeinde: "Tutzing", ratePct: 18 },
  { gemeinde: "Bernried", ratePct: 10 },
  { gemeinde: "Seeshaupt", ratePct: 10 },
  { gemeinde: "Berg", ratePct: undefined, note: "none (debated)" },
  { gemeinde: "Pöcking", ratePct: undefined, note: "none" },
  { gemeinde: "Feldafing", ratePct: undefined, note: "none" },
  { gemeinde: "Münsing", ratePct: undefined, note: "none" },
  { gemeinde: "Munich (reference)", ratePct: 18 },
];

// Erbschaftsteuer schedule
export type ErbstClass = {
  beziehung: string;
  klasse: "I" | "II" | "III";
  freibetragEur: number;
  rateMinPct: number;
  rateMaxPct: number;
  note?: string;
};
export const erbschaftsteuer: ErbstClass[] = [
  { beziehung: "Ehegatte / eingetr. Lebenspartner", klasse: "I", freibetragEur: 500000, rateMinPct: 19, rateMaxPct: 30 },
  { beziehung: "Kind", klasse: "I", freibetragEur: 400000, rateMinPct: 19, rateMaxPct: 30 },
  { beziehung: "Enkel (Eltern leben)", klasse: "I", freibetragEur: 200000, rateMinPct: 19, rateMaxPct: 30 },
  { beziehung: "Enkel (Eltern verstorben)", klasse: "I", freibetragEur: 400000, rateMinPct: 19, rateMaxPct: 30 },
  { beziehung: "Geschwister, Nichte/Neffe", klasse: "II", freibetragEur: 20000, rateMinPct: 30, rateMaxPct: 43 },
  { beziehung: "Unverwandt / Partner ohne Ehe", klasse: "III", freibetragEur: 20000, rateMinPct: 30, rateMaxPct: 50 },
];

// Familienheim §13 ErbStG — practical outcomes on €10M / 400m² villa
export const familienheim = {
  spouseFreePct: 100,
  childrenFreeUpTo: "200 m² living area, 6-month move-in, 10-year occupancy",
  with10MvillaExampleTaxRangeM: [1.1, 1.4] as [number, number],
  without10MvillaExampleTaxRangeM: [2.7, 2.9] as [number, number],
};

// GEG retrofit bands — €/m² on a 400m² villa
export type GegBand = {
  klasse: string;
  kwhM2a: string;
  stock: string;
  eurM2Min: number;
  eurM2Max: number;
  villa400m2MinK: number;
  villa400m2MaxK: number;
};
export const gegBands: GegBand[] = [
  { klasse: "A+/A", kwhM2a: "<30", stock: "Neubau ≥2016", eurM2Min: 0, eurM2Max: 50, villa400m2MinK: 0, villa400m2MaxK: 20 },
  { klasse: "B", kwhM2a: "30–50", stock: "KfW40/55", eurM2Min: 100, eurM2Max: 300, villa400m2MinK: 40, villa400m2MaxK: 120 },
  { klasse: "C", kwhM2a: "50–75", stock: "Neubau 2002+", eurM2Min: 300, eurM2Max: 600, villa400m2MinK: 120, villa400m2MaxK: 240 },
  { klasse: "D", kwhM2a: "75–100", stock: "1995–2001", eurM2Min: 600, eurM2Max: 900, villa400m2MinK: 240, villa400m2MaxK: 360 },
  { klasse: "E", kwhM2a: "100–130", stock: "1984–1994", eurM2Min: 900, eurM2Max: 1400, villa400m2MinK: 360, villa400m2MaxK: 560 },
  { klasse: "F", kwhM2a: "130–160", stock: "1978–1983", eurM2Min: 1400, eurM2Max: 2000, villa400m2MinK: 560, villa400m2MaxK: 800 },
  { klasse: "G", kwhM2a: "160–200", stock: "1960–1977", eurM2Min: 1800, eurM2Max: 2600, villa400m2MinK: 720, villa400m2MaxK: 1040 },
  { klasse: "H", kwhM2a: ">200", stock: "<1960 / Denkmal", eurM2Min: 2200, eurM2Max: 3200, villa400m2MinK: 880, villa400m2MaxK: 1280 },
];

// Climate / flood per community
export type ClimateRow = {
  gemeinde: string;
  hq100: "low" | "low-med" | "medium" | "high";
  zones: string;
  warmingC: number;
  heatDaysLow: number;
  heatDaysHigh: number;
};
export const climate: ClimateRow[] = [
  { gemeinde: "Starnberg", hq100: "medium", zones: "Georgenbach, Würm, See-Promenade", warmingC: 2.0, heatDaysLow: 12, heatDaysHigh: 16 },
  { gemeinde: "Berg", hq100: "low-med", zones: "Assenbucher Bach, Karpfenwinkel", warmingC: 2.0, heatDaysLow: 10, heatDaysHigh: 14 },
  { gemeinde: "Pöcking", hq100: "low", zones: "Possenhofen-Bahn, Maisinger Bach", warmingC: 2.0, heatDaysLow: 10, heatDaysHigh: 14 },
  { gemeinde: "Feldafing", hq100: "low", zones: "Lenné-Park Uferzone marginal", warmingC: 2.0, heatDaysLow: 10, heatDaysHigh: 14 },
  { gemeinde: "Tutzing", hq100: "low-med", zones: "Kustermannpark, Seebach", warmingC: 2.1, heatDaysLow: 12, heatDaysHigh: 15 },
  { gemeinde: "Bernried", hq100: "low", zones: "Marienbach, Kloster Uferzone", warmingC: 2.0, heatDaysLow: 11, heatDaysHigh: 14 },
  { gemeinde: "Seeshaupt", hq100: "low-med", zones: "St. Heinricher Bach, Osterbäche", warmingC: 2.0, heatDaysLow: 11, heatDaysHigh: 14 },
  { gemeinde: "Münsing", hq100: "low", zones: "Ammerlander Bach, Ambacher Bach", warmingC: 2.0, heatDaysLow: 10, heatDaysHigh: 13 },
];

// Lake-level history summary
export const lakeLevel = {
  regulator: "Seeklause Starnberg (WWA Weilheim)",
  typicalRangeCm: "±50",
  historicPeakHighCm: 85, // 1999
  historicPeakLowCm: -70, // 2003
  trophie: "oligotroph (Sichttiefe 6–9 m, top EU Badewasser)",
  waldbrandklasse: "2–3 (niedrig–mittel)",
};
