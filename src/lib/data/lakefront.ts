// Shore-gradient model: distance from waterline → € / m² land multiplier
// Calibrated to anecdotal lakefront closes plus hedonic-pricing literature.
// With-view curve: m ≈ 0.10 + 0.90·exp(-d/60)
// No-view curve:   m ≈ 0.10 + 0.30·exp(-d/80)

export const SHORE_GRADIENT_POINTS = (() => {
  const pts: Array<{ d: number; withView: number; noView: number; eurPerM2WithView: number; eurPerM2NoView: number }> = [];
  for (const d of [0, 10, 20, 30, 50, 75, 100, 150, 200, 300, 500, 800, 1200]) {
    const withView = 0.10 + 0.90 * Math.exp(-d / 60);
    const noView = 0.10 + 0.30 * Math.exp(-d / 80);
    // Tier 1 baseline: direct lakefront ≈ €35,000/m² land
    pts.push({
      d,
      withView: Number(withView.toFixed(3)),
      noView: Number(noView.toFixed(3)),
      eurPerM2WithView: Math.round(35000 * withView),
      eurPerM2NoView: Math.round(35000 * noView),
    });
  }
  return pts;
})();

export const PARCELS_BY_COMMUNITY = [
  { community: "Starnberg", shoreKm: 6.8, privatePct: 55, parcels: [140, 170] as [number, number], turnover: [3, 5] as [number, number] },
  { community: "Berg", shoreKm: 7.5, privatePct: 50, parcels: [95, 120] as [number, number], turnover: [2, 4] as [number, number] },
  { community: "Münsing", shoreKm: 10.2, privatePct: 55, parcels: [130, 160] as [number, number], turnover: [1, 3] as [number, number] },
  { community: "Seeshaupt", shoreKm: 3.6, privatePct: 45, parcels: [55, 70] as [number, number], turnover: [1, 2] as [number, number] },
  { community: "Bernried", shoreKm: 4.1, privatePct: 30, parcels: [35, 50] as [number, number], turnover: [1, 1] as [number, number] },
  { community: "Tutzing", shoreKm: 6.8, privatePct: 55, parcels: [115, 140] as [number, number], turnover: [2, 3] as [number, number] },
  { community: "Feldafing", shoreKm: 4.0, privatePct: 50, parcels: [65, 85] as [number, number], turnover: [1, 2] as [number, number] },
  { community: "Pöcking / Possenhofen", shoreKm: 5.5, privatePct: 55, parcels: [85, 110] as [number, number], turnover: [2, 3] as [number, number] },
];

export const PREMIUM_MULTIPLES = [
  { position: "Direct waterfront + Steg Altbestand", multiplier: "1.15–1.30×", eurPerM2: "€ 28k–65k" },
  { position: "Direct waterfront, no Steg", multiplier: "1.00×", eurPerM2: "€ 22k–50k" },
  { position: "Direct waterfront w/ Seeuferweg", multiplier: "0.65–0.80×", eurPerM2: "€ 15k–38k" },
  { position: "Second row (30–80m, view)", multiplier: "0.50–0.60×", eurPerM2: "€ 10k–22k" },
  { position: "Hillside w/ view (>100m, elevated)", multiplier: "0.18–0.25×", eurPerM2: "€ 3.5k–9k" },
  { position: "Inland, same village, no view", multiplier: "0.10–0.15×", eurPerM2: "€ 2.2k–5.5k" },
];

export const NOTABLE_TRANSACTIONS = [
  { year: 2013, community: "Leoni (Berg)", type: "Gründerzeit villa + Bootshaus", living: 700, land: 4800, shore: 55, range: "€ 18–22M" },
  { year: 2015, community: "Feldafing Park-edge", type: "Historic villa ensemble", living: 1100, land: 9500, shore: 75, range: "€ 30–40M" },
  { year: 2017, community: "Tutzing / Garatshausen", type: "Villa + park", living: 850, land: 6200, shore: 45, range: "€ 20–28M" },
  { year: 2018, community: "Pöcking / Possenhofen", type: "Historic villa", living: 620, land: 3900, shore: 35, range: "€ 14–18M" },
  { year: 2019, community: "Münsing / Ammerland", type: "Compound redevelopment", living: 500, land: 7000, shore: 60, range: "€ 22–30M" },
  { year: 2020, community: "Kempfenhausen (Berg)", type: "New-build villa", living: 1000, land: 5500, shore: 40, range: "€ 25–32M" },
  { year: 2021, community: "Berg / Leoni", type: "Rottmann-Schlösschen zone", living: 800, land: 6000, shore: 50, range: "€ 28–38M" },
  { year: 2022, community: "Tutzing", type: "Jugendstil Denkmal + Steg", living: 750, land: 4200, shore: 38, range: "€ 19–24M" },
  { year: 2023, community: "Feldafing", type: "Park-adjacent trophy", living: 1200, land: 12000, shore: 90, range: "€ 45–60M" },
  { year: 2024, community: "Münsing / Ambach", type: "Old-money generational sale", living: 900, land: 8500, shore: 70, range: "€ 32–42M" },
  { year: 2025, community: "Starnberg / Kempfenhausen", type: "Redevelopment / new build", living: 1200, land: 5800, shore: 45, range: "€ 28–36M" },
];

export const UFERSCHUTZ_REGIME = [
  { community: "Starnberg", lsg: "Partial", setback: "10–15 m (village reduced)", path: "Partial promenade north", denkmal: "Medium (villa quarter)" },
  { community: "Berg", lsg: "Full LSG outside cores", setback: "20–30 m", path: "Contested; partial open", denkmal: "High (Gründerzeit cluster)" },
  { community: "Münsing", lsg: "Full LSG", setback: "30–40 m (some 50 m)", path: "Long-running dispute, mixed", denkmal: "Medium-High" },
  { community: "Seeshaupt", lsg: "Full LSG + NSG buffer", setback: "30 m + reed-belt prohibition", path: "Village-core promenade only", denkmal: "Medium" },
  { community: "Bernried", lsg: "Full LSG + Kloster-zone", setback: "30–40 m", path: "Limited, via park mostly", denkmal: "High (Kloster ensemble)" },
  { community: "Tutzing", lsg: "Full LSG", setback: "20–30 m", path: "Public promenade in center", denkmal: "High (Schloss + villas)" },
  { community: "Feldafing", lsg: "Full LSG + Park-Schutz", setback: "30–50 m (Lenné-park)", path: "Park-integrated public access", denkmal: "Very High (Lenné + Jugendstil)" },
  { community: "Pöcking", lsg: "Full LSG", setback: "20–30 m", path: "Possenhofener Park public", denkmal: "High (Possenhofen)" },
];
