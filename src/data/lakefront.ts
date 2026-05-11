// Lakefront premium — shore tiers, gradients, parcels, docks, transactions.
// From research/lakefront.md.

export type ShoreTier = {
  id: string;
  name: string;
  priceMinPerM2: number;
  priceMaxPerM2: number;
  communities: string[];
  color: string;
};

export const shoreTiers: ShoreTier[] = [
  {
    id: "tier1p",
    name: "Tier 1+ — Feldafing Park-edge",
    priceMinPerM2: 28000,
    priceMaxPerM2: 70000,
    communities: ["Feldafing (Park-adjacent)"],
    color: "#123848",
  },
  {
    id: "tier1",
    name: "Tier 1 — Top lakefront",
    priceMinPerM2: 22000,
    priceMaxPerM2: 55000,
    communities: ["Berg/Leoni", "Kempfenhausen", "Münsing/Ammerland", "Münsing/Ambach", "Tutzing", "Pöcking/Possenhofen"],
    color: "#225d76",
  },
  {
    id: "tier2",
    name: "Tier 2 — Second lakefront tier",
    priceMinPerM2: 15000,
    priceMaxPerM2: 32000,
    communities: ["Starnberg", "Seeshaupt", "Bernried"],
    color: "#6fa0b4",
  },
];

// Shore gradient (multiplier × direct-lakefront base)
export type GradientPoint = {
  distanceM: number;
  withView: number; // multiplier
  noView: number;
};

// Functional approximations:
//   with-view:  m(d) = 0.10 + 0.90 * exp(-d/60)
//   no-view:    m(d) = 0.10 + 0.30 * exp(-d/80)
export function gradientWithView(d: number) {
  return 0.10 + 0.90 * Math.exp(-d / 60);
}
export function gradientNoView(d: number) {
  return 0.10 + 0.30 * Math.exp(-d / 80);
}

export function gradientSeries(): GradientPoint[] {
  const pts: GradientPoint[] = [];
  for (let d = 0; d <= 400; d += 10) {
    pts.push({ distanceM: d, withView: gradientWithView(d), noView: gradientNoView(d) });
  }
  return pts;
}

// Position multipliers (absolute — relative to Direct, no Steg = 1.00x)
export const positionMultipliers = [
  { label: "Direct + Steg (Altbestand)", min: 1.15, max: 1.30, perM2Min: 28, perM2Max: 65 },
  { label: "Direct, no Steg", min: 1.00, max: 1.00, perM2Min: 22, perM2Max: 50 },
  { label: "Direct + Seeuferweg through parcel", min: 0.65, max: 0.80, perM2Min: 15, perM2Max: 38 },
  { label: "2nd row (30–80m, lake view)", min: 0.50, max: 0.60, perM2Min: 10, perM2Max: 22 },
  { label: "Hillside view (>100m)", min: 0.18, max: 0.25, perM2Min: 3.5, perM2Max: 9 },
  { label: "Inland, no view", min: 0.10, max: 0.15, perM2Min: 2.2, perM2Max: 5.5 },
];

// Shoreline inventory
export type ShoreInventoryRow = {
  community: string;
  shoreKm: number;
  pctPrivateTradeable: number;
  parcelsMin: number;
  parcelsMax: number;
  turnoverMin: number;
  turnoverMax: number;
};
export const shoreInventory: ShoreInventoryRow[] = [
  { community: "Starnberg", shoreKm: 6.8, pctPrivateTradeable: 55, parcelsMin: 140, parcelsMax: 170, turnoverMin: 3, turnoverMax: 5 },
  { community: "Berg", shoreKm: 7.5, pctPrivateTradeable: 50, parcelsMin: 95, parcelsMax: 120, turnoverMin: 2, turnoverMax: 4 },
  { community: "Münsing", shoreKm: 10.2, pctPrivateTradeable: 55, parcelsMin: 130, parcelsMax: 160, turnoverMin: 1, turnoverMax: 3 },
  { community: "Seeshaupt", shoreKm: 3.6, pctPrivateTradeable: 45, parcelsMin: 55, parcelsMax: 70, turnoverMin: 1, turnoverMax: 2 },
  { community: "Bernried", shoreKm: 4.1, pctPrivateTradeable: 30, parcelsMin: 35, parcelsMax: 50, turnoverMin: 1, turnoverMax: 1 },
  { community: "Tutzing", shoreKm: 6.8, pctPrivateTradeable: 55, parcelsMin: 115, parcelsMax: 140, turnoverMin: 2, turnoverMax: 3 },
  { community: "Feldafing", shoreKm: 4.0, pctPrivateTradeable: 50, parcelsMin: 65, parcelsMax: 85, turnoverMin: 1, turnoverMax: 2 },
  { community: "Pöcking", shoreKm: 5.5, pctPrivateTradeable: 55, parcelsMin: 85, parcelsMax: 110, turnoverMin: 2, turnoverMax: 3 },
];

export const shoreTotals = {
  shoreKm: shoreInventory.reduce((a, r) => a + r.shoreKm, 0),
  parcelsMin: shoreInventory.reduce((a, r) => a + r.parcelsMin, 0),
  parcelsMax: shoreInventory.reduce((a, r) => a + r.parcelsMax, 0),
  turnoverMin: shoreInventory.reduce((a, r) => a + r.turnoverMin, 0),
  turnoverMax: shoreInventory.reduce((a, r) => a + r.turnoverMax, 0),
  lakeAreaKm2: 56.4,
  protectedSharePct: 42, // Wittelsbach / Kloster / state / NSG
};

// Notable transactions
export type NotableTransaction = {
  year: number;
  community: string;
  type: string;
  livingM2: string;
  landM2: string;
  shoreM: string;
  priceMinM: number;
  priceMaxM: number;
  sourceIds: string[];
};

export const notableTransactions: NotableTransaction[] = [
  { year: 2013, community: "Leoni / Berg", type: "Villa + Bootshaus", livingM2: "~700", landM2: "4,800", shoreM: "~55", priceMinM: 18, priceMaxM: 22, sourceIds: ["sz_starnberg"] },
  { year: 2015, community: "Feldafing Park", type: "Villa ensemble", livingM2: "~1,100", landM2: "9,500", shoreM: "~75", priceMinM: 30, priceMaxM: 40, sourceIds: ["faz_immo", "handelsblatt_lux"] },
  { year: 2017, community: "Garatshausen / Tutzing", type: "Villa + park", livingM2: "~850", landM2: "6,200", shoreM: "~45", priceMinM: 20, priceMaxM: 28, sourceIds: ["faz_immo"] },
  { year: 2018, community: "Possenhofen", type: "Historic villa", livingM2: "~620", landM2: "3,900", shoreM: "~35", priceMinM: 14, priceMaxM: 18, sourceIds: ["sz_starnberg"] },
  { year: 2019, community: "Ammerland / Münsing", type: "Lakefront compound", livingM2: "500+", landM2: "7,000", shoreM: "~60", priceMinM: 22, priceMaxM: 30, sourceIds: ["sz_starnberg", "handelsblatt_lux"] },
  { year: 2020, community: "Kempfenhausen / Berg", type: "New-build villa", livingM2: "~1,000", landM2: "5,500", shoreM: "~40", priceMinM: 25, priceMaxM: 32, sourceIds: ["handelsblatt_lux"] },
  { year: 2021, community: "Berg / Leoni", type: "Rottmann zone", livingM2: "~800", landM2: "6,000", shoreM: "~50", priceMinM: 28, priceMaxM: 38, sourceIds: ["sz_starnberg"] },
  { year: 2022, community: "Tutzing", type: "Jugendstil + Steg", livingM2: "~750", landM2: "4,200", shoreM: "~38", priceMinM: 19, priceMaxM: 24, sourceIds: ["sz_starnberg"] },
  { year: 2023, community: "Feldafing", type: "Park-adjacent estate", livingM2: "~1,200", landM2: "12,000", shoreM: "~90", priceMinM: 45, priceMaxM: 60, sourceIds: ["faz_immo", "handelsblatt_lux"] },
  { year: 2024, community: "Ambach / Münsing", type: "Generational estate", livingM2: "~900", landM2: "8,500", shoreM: "~70", priceMinM: 32, priceMaxM: 42, sourceIds: ["sz_starnberg"] },
  { year: 2025, community: "Kempfenhausen / Berg", type: "Teardown + new-build", livingM2: "~1,200", landM2: "5,800", shoreM: "~45", priceMinM: 28, priceMaxM: 36, sourceIds: ["handelsblatt_lux"] },
];

// Legal regime summary rows
export const legalRegime = [
  {
    id: "baywg_21",
    title: "BayWG §21 — Gewässerrandstreifen",
    body:
      "5 m default buffer from the waterline. Often extended to 10–30 m by overlay and 40–50 m inside a Bebauungsplan. Defines what can be built, planted, or paved close to the shore.",
  },
  {
    id: "baugb_35",
    title: "BauGB §35 — Außenbereich / Bestandsschutz",
    body:
      "Most direct-lakefront parcels sit outside a B-Plan, in the Außenbereich. New build is forbidden. Replacement of existing structures is only permitted under Bestandsschutz — the reason that Altbestand parcels trade at a premium.",
  },
  {
    id: "lsg",
    title: "LSG Starnberger See Ost/West",
    body:
      "Landscape-protection areas regulate tree removal, hedging, fencing and the aesthetics of Stege. Renovations are routinely negotiated through the UNB (Untere Naturschutzbehörde).",
  },
  {
    id: "denkmal",
    title: "BayDSchG — Denkmal status",
    body:
      "Many lakefront villas are Baudenkmal. Duty to preserve, but §7i / §11b EStG grant 9% AfA ×8yr then 7% ×4yr on qualifying renovation spend — strongly incentivizes authentic restoration for owner-occupiers.",
  },
  {
    id: "geg_105",
    title: "GEG §105 — Denkmal exemption",
    body:
      "Denkmal properties are largely exempt from GEG retrofit mandates, but internal insulation is still forced by building physics. Running costs 30–50% higher than modern new-build.",
  },
];

// Seeuferweg (public path) impact
export const seeuferwegImpact = [
  { situation: "No public path within parcel", impact: "None — baseline lakefront premium" },
  { situation: "Path routed along driveway only", impact: "−5 % to −10 % premium" },
  { situation: "Under administrative review", impact: "−5 % to −12 % premium (optionality cost)" },
  { situation: "Enforced path through parcel (lakeward)", impact: "−20 % to −35 % premium" },
];

// Private dock premiums (Altbestand Wasserrecht)
export const dockPremiums = [
  { item: "Altbestand private Steg with Wasserrecht", addValueEurK: [150, 450] as [number, number] },
  { item: "Bootshaus (boathouse) with Wasserrecht", addValueEurK: [800, 2500] as [number, number] },
  { item: "New Steg permit (WWA Weilheim)", addValueEurK: [0, 0] as [number, number] },
];
