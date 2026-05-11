// German real-estate glossary for English-speaking readers.

export type GlossaryEntry = {
  term: string;
  translation?: string;
  definition: string;
  tag: "tax" | "legal" | "market" | "physical" | "finance" | "admin";
};

export const glossary: GlossaryEntry[] = [
  { term: "Grunderwerbsteuer (GrESt)", translation: "Real-estate transfer tax", definition: "Levied once at purchase. In Bavaria: 3.5 % of the contractual price — the lowest rate in Germany.", tag: "tax" },
  { term: "Grundsteuer B", translation: "Recurring property tax (built-up land)", definition: "Annual tax set at the municipal level via a Hebesatz (multiplier). Bavaria applies a Flächenmodell decoupled from market value — luxury and average homes of equal m² pay the same.", tag: "tax" },
  { term: "Hebesatz", translation: "Municipal multiplier", definition: "Per-municipality multiplier on the federal base assessment for Grund- and Gewerbesteuer. Grünwald (240 %) is Germany's lowest; Munich city is 535 %.", tag: "tax" },
  { term: "Zweitwohnungsteuer", translation: "Second-home tax", definition: "Only applies if the property is not the owner's Hauptwohnsitz (main residence). Charged as a % of the notional net cold rent.", tag: "tax" },
  { term: "Erbschaftsteuer", translation: "Inheritance tax", definition: "Federal tax. Classed I (spouse/children), II (siblings), III (everyone else) with very different exemptions and rates.", tag: "tax" },
  { term: "Familienheim (§13 ErbStG)", definition: "Inheritance-tax exemption for a family-home: unlimited for spouses, up to 200 m² living space for children, with a 10-year occupancy requirement.", tag: "tax" },
  { term: "AfA (§7i / §11b EStG)", definition: "Accelerated depreciation on Denkmal renovation spend — 9 % × 8 years, then 7 % × 4 years — a material benefit when restoring a lakefront Baudenkmal.", tag: "tax" },
  { term: "Bodenrichtwert (BRW)", translation: "Official land value", definition: "Published biennially by the Gutachterausschuss. BORIS-Bayern is the interactive map. For direct-lakefront parcels, BRW is a useful floor but the actual market tends to clear materially higher.", tag: "market" },
  { term: "Gutachterausschuss", translation: "Independent valuation board", definition: "The only source of real transaction-level statistics, published annually as the Immobilienmarktbericht.", tag: "market" },
  { term: "Bebauungsplan (B-Plan)", translation: "Zoning plan", definition: "Defines what may be built on a parcel. Most direct-lakefront parcels lie outside a B-Plan, in the Außenbereich.", tag: "legal" },
  { term: "Außenbereich (§35 BauGB)", translation: "Unzoned outer area", definition: "Outside a B-Plan — generally no new construction; existing structures benefit from Bestandsschutz replacement rights. This is the core reason Altbestand lakefront trades at a premium.", tag: "legal" },
  { term: "Bestandsschutz", translation: "Grandfathering protection", definition: "Right to retain or replace pre-existing built volume even when current rules would forbid it. Can allow re-building to prior volume + up to ~20 % in most cases.", tag: "legal" },
  { term: "Gewässerrandstreifen (§21 BayWG)", translation: "Water's-edge buffer strip", definition: "Minimum 5 m buffer from the waterline, frequently widened to 10–30 m in LSG overlays and up to 40–50 m inside a B-Plan.", tag: "legal" },
  { term: "Landschaftsschutzgebiet (LSG)", translation: "Landscape protection area", definition: "The LSG Starnberger See Ost/West governs tree removal, hedging, fencing, and Steg aesthetics.", tag: "legal" },
  { term: "Denkmalschutz", translation: "Heritage protection", definition: "Duty to preserve historic fabric; exchanges restoration costs for AfA depreciation and partial exemption from GEG retrofit mandates.", tag: "legal" },
  { term: "Seeuferweg", translation: "Public path along the shore", definition: "Article 27 BayWG creates a right to walk the shoreline. Enforced paths running lakeward of a parcel materially reduce its lakefront premium.", tag: "legal" },
  { term: "Steg / Bootshaus", translation: "Dock / boathouse", definition: "New private Stege are essentially not granted by WWA Weilheim; only Altbestand Stege with an existing Wasserrecht carry value (+€150–450k).", tag: "physical" },
  { term: "Wasserrecht", translation: "Water-use right", definition: "Pre-existing right attached to a Steg or Bootshaus. Critical — without it the structure cannot legally remain in use.", tag: "legal" },
  { term: "Einfamilienhaus (EFH / SFH)", translation: "Detached single-family home", definition: "The dominant lakefront typology. Benchmark pricing is usually quoted per m² Wohnfläche.", tag: "physical" },
  { term: "Eigentumswohnung (ETW)", translation: "Condominium / apartment unit", definition: "The primary residential reference unit in Munich city pricing tables.", tag: "physical" },
  { term: "Vermarktungsdauer", translation: "Days on market", definition: "Median time from listing to notarized sale. The Starnbergersee dwell time rose from ~35 (2020) to ~125 days (2024–25).", tag: "market" },
  { term: "Bauzins", translation: "Mortgage rate", definition: "Quoted here as the 10-year fixed residential rate published by Bundesbank. Peak 2022 ≈ 3.9 %; 2025 ≈ 3.4 %.", tag: "finance" },
  { term: "Baupreisindex", translation: "Construction-cost index", definition: "Destatis — tracks construction-input prices. 2015=100 → 160.8 (2025): +61 % cumulative.", tag: "market" },
  { term: "Häuserpreisindex (HPI)", translation: "National house-price index", definition: "Destatis — quarterly. Captured the 2022–23 reset: peak 161.6 (Q2 2022) → 148.0 (Q3 2023).", tag: "market" },
  { term: "GEG", translation: "Gebäudeenergiegesetz", definition: "Federal building-energy law. §105 exempts most Denkmal properties from the strictest retrofit mandates but internal insulation still typically needed.", tag: "legal" },
  { term: "KfW", translation: "State development bank", definition: "Funds efficiency upgrades via grants and subsidized credit (BEG programmes). Core tool for lakefront retrofit economics.", tag: "finance" },
  { term: "Pauschalbesteuerung (CH)", translation: "Lump-sum taxation", definition: "Swiss regime for non-working residents, based on a multiple of rental value. A structural arbitrage versus German income tax for HNWI families.", tag: "tax" },
  { term: "Hauptwohnsitz", translation: "Primary residence", definition: "Registered main residence. Triggers the Familienheim Erbschaftsteuer exemption and turns off most Zweitwohnungsteuer rates.", tag: "admin" },
  { term: "S-Bahn S6", translation: "Commuter rail Tutzing ↔ Munich", definition: "Essential commute artery. Possenhofen → Marienplatz ~32 min; Tutzing ~45 min; Seeshaupt (terminus) ~55–62 min.", tag: "physical" },
  { term: "MIS", translation: "Munich International School", definition: "Bilingual IB campus in Starnberg / Buchhof. One of Europe's most competitive catchment schools for lakefront buyers.", tag: "admin" },
];
