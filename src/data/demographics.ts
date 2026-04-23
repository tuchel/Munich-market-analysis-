// Demographics, wealth, supply pipeline, employers, construction costs.
// From research/demographics.md.

export type YearRow = { year: number } & Record<string, number | string | undefined>;

// Landkreis Starnberg population + income vs Germany
export const populationIncome: YearRow[] = [
  { year: 2015, lkPop: 133600, lkMedianHh: 62400, lkDispPerCap: 31100, deMedianHh: 39800, deDispPerCap: 21600 },
  { year: 2018, lkPop: 137000, lkMedianHh: 68500, lkDispPerCap: 33200, deMedianHh: 43200, deDispPerCap: 22900 },
  { year: 2020, lkPop: 138900, lkMedianHh: 72100, lkDispPerCap: 34500, deMedianHh: 45600, deDispPerCap: 23800 },
  { year: 2022, lkPop: 139800, lkMedianHh: 75900, lkDispPerCap: 35700, deMedianHh: 46900, deDispPerCap: 25100 },
  { year: 2024, lkPop: 140500, lkMedianHh: 78400, lkDispPerCap: 36200, deMedianHh: 48300, deDispPerCap: 26400 },
  { year: 2030, lkPop: 145200, lkMedianHh: 92500, lkDispPerCap: 42800, deMedianHh: 55600, deDispPerCap: 30800 },
  { year: 2035, lkPop: 148800, lkMedianHh: 106000, lkDispPerCap: 48500, deMedianHh: 62100, deDispPerCap: 34200 },
];

// HNWI & Single-Family Offices (Bavaria + Munich FUA)
export const hnwi: YearRow[] = [
  { year: 2015, byHnwiK: 78, byUhnwi: 980, munichFuaHnwiK: 32, netFlowPa: 600, sfoBy: 340 },
  { year: 2018, byHnwiK: 88, byUhnwi: 1150, munichFuaHnwiK: 37, netFlowPa: 850, sfoBy: 420 },
  { year: 2020, byHnwiK: 94, byUhnwi: 1220, munichFuaHnwiK: 40, netFlowPa: 950, sfoBy: 470 },
  { year: 2022, byHnwiK: 103, byUhnwi: 1410, munichFuaHnwiK: 44, netFlowPa: 1200, sfoBy: 540 },
  { year: 2024, byHnwiK: 112, byUhnwi: 1580, munichFuaHnwiK: 48, netFlowPa: 1350, sfoBy: 610 },
];

// Building permits — LK Starnberg
export type PermitRow = { year: number; permits: number; sfhVilla: number; completions: number };
export const lkPermits: PermitRow[] = [
  { year: 2015, permits: 612, sfhVilla: 190, completions: 570 },
  { year: 2016, permits: 648, sfhVilla: 205, completions: 590 },
  { year: 2017, permits: 675, sfhVilla: 215, completions: 605 },
  { year: 2018, permits: 590, sfhVilla: 185, completions: 620 },
  { year: 2019, permits: 560, sfhVilla: 175, completions: 595 },
  { year: 2020, permits: 545, sfhVilla: 170, completions: 570 },
  { year: 2021, permits: 520, sfhVilla: 165, completions: 555 },
  { year: 2022, permits: 460, sfhVilla: 145, completions: 510 },
  { year: 2023, permits: 425, sfhVilla: 130, completions: 465 },
  { year: 2024, permits: 365, sfhVilla: 110, completions: 410 },
];

// Munich city permits
export const munichPermits = [
  { year: 2015, permits: 14200, completions: 9600 },
  { year: 2017, permits: 15800, completions: 11200 },
  { year: 2019, permits: 12500, completions: 10800 },
  { year: 2021, permits: 11400, completions: 10200 },
  { year: 2022, permits: 10100, completions: 9900 },
  { year: 2023, permits: 9100, completions: 8400 },
  { year: 2024, permits: 8329, completions: 6503 },
];

// Lakefront owner age bands
export type AgeBand = {
  band: string;
  pctMin: number;
  pctMax: number;
  parcelsMin: number;
  parcelsMax: number;
  avgTenureYr: number;
};
export const ownerAgeBands: AgeBand[] = [
  { band: "<50", pctMin: 8, pctMax: 11, parcelsMin: 220, parcelsMax: 260, avgTenureYr: 9 },
  { band: "50–59", pctMin: 14, pctMax: 17, parcelsMin: 340, parcelsMax: 400, avgTenureYr: 16 },
  { band: "60–69", pctMin: 19, pctMax: 23, parcelsMin: 460, parcelsMax: 550, avgTenureYr: 24 },
  { band: "70–79", pctMin: 24, pctMax: 28, parcelsMin: 580, parcelsMax: 670, avgTenureYr: 33 },
  { band: "80+", pctMin: 28, pctMax: 32, parcelsMin: 670, parcelsMax: 770, avgTenureYr: 42 },
];

// Inheritance wave 2025–2035
export type InheritSegment = {
  segment: string;
  eventsMin: number;
  eventsMax: number;
  avgEurM: number;
  totalMinB: number;
  totalMaxB: number;
  openMarketMinPct: number;
  openMarketMaxPct: number;
};
export const inheritance: InheritSegment[] = [
  { segment: "Lakefront", eventsMin: 900, eventsMax: 1300, avgEurM: 10, totalMinB: 8.5, totalMaxB: 13.5, openMarketMinPct: 15, openMarketMaxPct: 25 },
  { segment: "Near-lake 1st/2nd row", eventsMin: 2200, eventsMax: 2800, avgEurM: 4, totalMinB: 8, totalMaxB: 12, openMarketMinPct: 20, openMarketMaxPct: 30 },
  { segment: "LK SFH non-lake", eventsMin: 7500, eventsMax: 9500, avgEurM: 1.6, totalMinB: 11.5, totalMaxB: 16.5, openMarketMinPct: 35, openMarketMaxPct: 45 },
  { segment: "Apartments", eventsMin: 11000, eventsMax: 13500, avgEurM: 0.75, totalMinB: 7.5, totalMaxB: 11, openMarketMinPct: 50, openMarketMaxPct: 65 },
];

// Buyer mix pre/post 2022 (sanctions, rate shock)
export const buyerMix = [
  { era: "Pre-2022", domestic: 72, uk: 8, swiss: 7, russian: 6, us: 4, other: 3 },
  { era: "Post-2022", domestic: 78, uk: 7, swiss: 7, russian: 0, us: 5, other: 3 },
];

// Munich anchor employers (headcount)
export type Employer = {
  company: string;
  sector: string;
  hq: string;
  headcount: number;
  listing?: string;
};
export const employers: Employer[] = [
  { company: "Siemens AG", sector: "Industrial tech", hq: "Munich", headcount: 45000, listing: "DAX40" },
  { company: "BMW AG", sector: "Automotive", hq: "Munich (FIZ)", headcount: 42000, listing: "DAX40" },
  { company: "Allianz SE", sector: "Insurance / AM", hq: "Munich", headcount: 14000, listing: "DAX40" },
  { company: "Munich Re", sector: "Reinsurance", hq: "Munich", headcount: 5500, listing: "DAX40" },
  { company: "Infineon Technologies", sector: "Semiconductors", hq: "Neubiberg", headcount: 13500, listing: "DAX40" },
  { company: "MTU Aero Engines", sector: "Aero", hq: "Munich", headcount: 8500, listing: "MDAX" },
  { company: "Airbus D&S", sector: "Aero / Defense", hq: "Taufkirchen", headcount: 12000 },
  { company: "Linde plc", sector: "Industrial gases", hq: "Dublin / Munich", headcount: 4000, listing: "DAX" },
  { company: "Rohde & Schwarz", sector: "Test / Defense", hq: "Munich", headcount: 9000, listing: "Private" },
  { company: "Wacker Chemie", sector: "Chemicals", hq: "Munich", headcount: 6000, listing: "MDAX" },
  { company: "Celonis", sector: "SaaS / Process mining", hq: "Munich", headcount: 1800 },
  { company: "Personio", sector: "HR Tech", hq: "Munich", headcount: 1400 },
  { company: "Helsing", sector: "AI / Defense", hq: "Munich", headcount: 350 },
  { company: "Isar Aerospace", sector: "Space launch", hq: "Ottobrunn", headcount: 450 },
  { company: "Agile Robots", sector: "Robotics", hq: "Martinsried", headcount: 700 },
  { company: "Quantum Systems", sector: "Autonomous UAV", hq: "Gilching", headcount: 500 },
  { company: "Microsoft Deutschland", sector: "Software", hq: "Munich", headcount: 3000 },
  { company: "Apple München", sector: "Silicon engineering", hq: "Munich", headcount: 2500 },
  { company: "Amazon DE", sector: "Software / Commerce", hq: "Munich", headcount: 2000 },
];

// Construction cost anecdote
export const constructionCost = {
  baupreisindex2021: 108.6,
  baupreisindex2024: 148,
  baupreisindexChangePct: 36,
  luxuryChangePct: 50,
  seehausShell500m2_2020: [2.4, 3.2] as [number, number],
  seehausShell500m2_2024: [3.8, 5.2] as [number, number],
};

export const totalInheritanceLkB = {
  min: inheritance.reduce((a, r) => a + r.totalMinB, 0),
  max: inheritance.reduce((a, r) => a + r.totalMaxB, 0),
};
