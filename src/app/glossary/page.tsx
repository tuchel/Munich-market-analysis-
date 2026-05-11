import Link from "next/link";

type Term = { term: string; aka?: string; def: React.ReactNode; category: string };

const TERMS: Term[] = [
  // Pricing & valuation
  { category: "Pricing", term: "Bodenrichtwert (BRW)", def: <>Official cell-level land value published by the Gutachterausschuss, accessible via BORIS-Bayern. The reference for taxation and the anchor for any reverse-build valuation.</> },
  { category: "Pricing", term: "Verkehrswert", def: <>Market value of a property under §194 BauGB — the price obtainable in ordinary trade at a defined date.</> },
  { category: "Pricing", term: "Angebotspreis", aka: "Asking price", def: <>Listed price. Distinguished from <em>erzielter Kaufpreis</em> (realized price). Realized prices ran 3–7 % below asking in 2023–2024.</> },
  { category: "Pricing", term: "Gutachterausschuss", def: <>Statutory municipal valuation committee. Publishes the annual Immobilienmarktbericht and maintains the Kaufpreissammlung (closed-transaction database).</> },
  { category: "Pricing", term: "Häuserpreisindex (HPI)", def: <>Destatis nationwide residential price index; the canonical German house-price time series.</> },
  { category: "Pricing", term: "Baupreisindex (BPI)", def: <>Destatis construction-cost index for residential buildings. +61 % cumulative 2015–2025.</> },

  // Property area
  { category: "Floor area", term: "Wohnfläche", def: <>Living area as calculated under the Wohnflächenverordnung (WoFlV). The standard area unit in residential pricing.</> },
  { category: "Floor area", term: "Nutzfläche", def: <>Useful area (basement, technical rooms, storage). Excluded from Wohnfläche.</> },
  { category: "Floor area", term: "Bruttogrundfläche (BGF)", def: <>Gross floor area including all enclosed levels — closer to the US/UK <em>gross</em> measure.</> },
  { category: "Floor area", term: "GRZ / GFZ", def: <>Grundflächenzahl (site-coverage ratio) and Geschossflächenzahl (floor-area ratio). The two density parameters set in any Bebauungsplan.</> },

  // Planning law
  { category: "Planning law", term: "Flächennutzungsplan (FNP)", def: <>Municipal land-use master plan. Defines zones; not directly binding on individual builds.</> },
  { category: "Planning law", term: "Bebauungsplan (B-Plan)", def: <>Binding municipal zoning regulation for a specific area — sets GRZ, GFZ, building heights, roof forms, setbacks.</> },
  { category: "Planning law", term: "§34 BauGB Einfügen", def: <>Where no B-Plan exists, a new build must "fit into" the surrounding built context (height, density, form). Wide municipal discretion.</> },
  { category: "Planning law", term: "§35 BauGB Außenbereich", def: <>Outer zone where new building is generally prohibited; only privileged uses (agricultural, forestry) and Bestandsschutz-replacement allowed. Most lakefront sits here.</> },
  { category: "Planning law", term: "Bestandsschutz", def: <>Grandfather right to maintain or replace an existing building. The single most important value driver for Altbestand on lakefront §35 parcels.</> },
  { category: "Planning law", term: "Einfügen", def: <>"Fitting in" test under §34 BauGB. The interpretive lever municipalities use to constrain teardown-replacement density.</> },

  // Lakefront
  { category: "Lakefront", term: "Seegrundstück / Seeufergrundstück", def: <>Direct-lakefront parcel with Uferlinie (waterline contact). The most valuable category of land in the Starnbergersee sub-market.</> },
  { category: "Lakefront", term: "Seezugang", def: <>Lake access right, distinct from direct lakefront — may be a deeded easement across an intervening parcel.</> },
  { category: "Lakefront", term: "Steg / Bootshaus", def: <>Private dock / boathouse. New permits essentially unobtainable on Starnbergersee; <em>Altbestand</em> permits are a distinct asset line worth €150k–€2.5M depending on size.</> },
  { category: "Lakefront", term: "Wasserrecht", def: <>Water-use right (wasserrechtliche Gestattung / Erlaubnis), granted by the Wasserwirtschaftsamt. Required for any private Steg or water-abstraction.</> },
  { category: "Lakefront", term: "Gewässerrandstreifen", def: <>Statutory water-edge buffer under BayWG §21. Default 5 m at lakes; routinely extended to 10–30 m by municipal overlay.</> },
  { category: "Lakefront", term: "Uferschutz", def: <>Shoreline protection regime — combination of Gewässerrandstreifen, Landschaftsschutz, and Naturschutz. Limits building, tree removal, dock works.</> },
  { category: "Lakefront", term: "Seeuferweg", def: <>Public-access path along the waterline under BayWG Art. 27. Contested in Münsing and Berg through long-running BayVGH litigation. Parcel with enforced path: −20–35 % value impact.</> },
  { category: "Lakefront", term: "Landschaftsschutzgebiet (LSG)", def: <>Landscape-protection zone under BNatSchG / BayNatSchG. Controls tree removal, hedging, fencing, Steg aesthetics. Starnberger See Ost and West LSGs cover almost the entire non-village shoreline.</> },
  { category: "Lakefront", term: "Naturschutzgebiet (NSG)", def: <>Stricter zone — building freeze and seasonal access limits. Osterseen buffer and reed-belt zones.</> },
  { category: "Lakefront", term: "FFH-Gebiet", def: <>Natura 2000 conservation area. Starnberger See is FFH-Gebiet DE-8033-371.</> },

  // Heritage
  { category: "Heritage", term: "Denkmalschutz", def: <>Heritage protection under BayDSchG. Listed villas (Baudenkmal) require Erlaubnis for any externally-visible change. Offsetting benefit: §7i EStG AfA (9 %×8 yr, 7 %×4 yr on qualifying restoration costs).</> },
  { category: "Heritage", term: "Denkmal-AfA", def: <>Tax depreciation regime for heritage properties — §§7i, 10f, 11b EStG. Can shelter 90 %+ of restoration cost over 12 years.</> },

  // Tax
  { category: "Tax", term: "Grunderwerbsteuer (GrESt)", def: <>One-off transfer tax on property purchase. <strong>Bayern: 3.5 %</strong> — the lowest in Germany alongside Sachsen; NRW/Schleswig-Holstein/Brandenburg/Saarland: 6.5 %.</> },
  { category: "Tax", term: "Grundsteuer", def: <>Annual property tax. Bayern reform (2025) chose the <em>Flächenmodell</em>: tax base = area × Äquivalenzbetrag × Grundsteuermesszahl × Hebesatz. Decoupled from market value.</> },
  { category: "Tax", term: "Flächenmodell", def: <>Bavaria's area-based Grundsteuer model. Äquivalenzzahlen: €0.04/m² land, €0.50/m² Wohnfläche. Grundsteuermesszahl 70 % residential.</> },
  { category: "Tax", term: "Hebesatz", def: <>Municipal multiplier applied to the Grundsteuermessbetrag. Lake communities: 280–395 %; Munich: 535 %; Grünwald (lowest in DE): 240 %.</> },
  { category: "Tax", term: "Zweitwohnungsteuer (ZWS)", def: <>Second-home tax levied as % of Jahresnettokaltmiete. Starnberg 20 %, Tutzing 18 %, Bernried/Seeshaupt 10 %. <strong>Not applicable to primary residence</strong>.</> },
  { category: "Tax", term: "Spekulationsteuer", def: <>Capital gains tax on private real estate sales (§23 EStG). 10-yr holding period for tax-free sale; owner-occupier exemption: 0 yrs in year of sale + 2 preceding.</> },
  { category: "Tax", term: "Erbschaftsteuer", def: <>Inheritance tax. Spouse allowance €500k, child €400k, grandchild €200k. Steuerklasse I 19–30 %, II 30–43 %, III 30–50 %.</> },
  { category: "Tax", term: "Familienheim", def: <>Inheritance-tax exemption (§13 ErbStG): spouse tax-free unlimited; child tax-free up to 200 m² Wohnfläche, both conditional on 10-yr continued occupancy.</> },
  { category: "Tax", term: "Makler-Courtage", def: <>Real-estate commission. Post-2020 reform: must be split 50/50 buyer/seller in private SFH sales. Market rate Bayern: 3.57 % brutto (3.0 % net + 19 % VAT) per side.</> },

  // Construction & energy
  { category: "Energy", term: "Energieausweis", def: <>Mandatory energy performance certificate. Bedarfsausweis (calculated, for new builds) or Verbrauchsausweis (measured, from utility data).</> },
  { category: "Energy", term: "GEG", def: <>Gebäudeenergiegesetz. 2024 amendment requires new heaters to be ≥65 % renewable; municipal Wärmeplanung phases retrofit by 2028; EU EPBD cascade to Class E by 2030, Class D by 2033. §105 GEG: heritage exemption.</> },
  { category: "Energy", term: "KfW Effizienzhaus", def: <>Energy-efficiency standard ladder (KfW 40 / 55 / 70 / 100), with KfW 40+ being the highest tier short of Passivhaus.</> },
  { category: "Energy", term: "KNX", def: <>European bus standard for smart-home automation. The premium German home-control system; quality depends entirely on commissioning. Get the ETS project file at handover.</> },

  // Process & legal
  { category: "Process", term: "Notar", def: <>Notary. German real-estate transfers must be notarised under §311b BGB. The Notar drafts the Kaufvertrag and supervises Auflassung + Grundbucheintragung.</> },
  { category: "Process", term: "Auflassung", def: <>The notarised real-property transfer agreement, distinct from the Kaufvertrag. Without Auflassung + Eintragung, ownership does not pass.</> },
  { category: "Process", term: "Grundbuch", def: <>Land register. Definitive record of ownership, encumbrances and easements.</> },
  { category: "Process", term: "Lastenfreistellung", def: <>Discharge of encumbrances. Seller's contractual obligation to clear mortgages, easements, and other Belastungen before Eintragung.</> },
  { category: "Process", term: "Anzahlung / Notaranderkonto", def: <>10 % deposit on Notartermin, held in the notary's escrow account; released to seller at Lastenfreistellung.</> },
  { category: "Process", term: "Vermarktungsdauer", def: <>Days-on-market between listing and signed Kaufvertrag. Munich median 2025: 89–105 days; LK Starnberg: 110–140.</> },
  { category: "Process", term: "Gewährleistungsbürgschaft", def: <>Warranty bond — bank guarantee held back for the §634a BGB warranty period (5 years for new builds). Typically 5 % of build cost.</> },
  { category: "Process", term: "Abnahmeprotokoll", def: <>Construction-handover protocol. Triggers the warranty clock and the final invoice.</> },

  // Demographics
  { category: "Demographics", term: "Bauträger", def: <>Project developer who builds and sells the completed asset. Distinguished from a flip-investor who buys-to-resell. Identification affects negotiation floor analysis.</> },
  { category: "Demographics", term: "Single Family Office (SFO)", def: <>Wealth-management vehicle for a single ultra-HNW family. Bayern hosts ~610 (2024) — more than Hamburg, narrowing the gap with Frankfurt.</> },
  { category: "Demographics", term: "HNWI / UHNWI", def: <>High-Net-Worth Individual ($1M+ investable) / Ultra-HNWI ($30M+). Bavaria: 112k HNWI, 1,580 UHNWI (2024).</> },
  { category: "Demographics", term: "Erbschaftswelle", def: <>The inheritance wave. Germany 2020–2030: €3.0–3.1 trillion expected to transfer; Bayern over-indexes at 22–24 %.</> },

  // Macro
  { category: "Macro", term: "Bauzins", def: <>German mortgage rate, typically quoted as 10-year fixed (10Y-Zinsbindung).</> },
  { category: "Macro", term: "Pfandbrief", def: <>German covered bond — the funding instrument for ~50 % of German residential mortgages. Spreads observed via vdp / dz hyp / pfandbrief.market.</> },
  { category: "Macro", term: "Empirica Blasenindex", def: <>Bubble-risk indicator. <em>Rückschlagpotenzial</em> for the Top-7: 48 % (2022) → 29 % (2024) → 19 % (Q4 2025).</> },
];

const CATEGORIES = ["Pricing", "Floor area", "Planning law", "Lakefront", "Heritage", "Tax", "Energy", "Process", "Demographics", "Macro"];

export const metadata = {
  title: "Glossary — Starnberger See Property Review",
  description:
    "German real-estate, tax, planning and lakefront terms used throughout the portal, with concise English explanations.",
};

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">Terminology</div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Glossary</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        German real-estate, planning, tax and lakefront-law terms used in the analytical pages.
        Where the German term has no clean English equivalent, the original is retained throughout
        the portal and defined here.
      </p>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
        {CATEGORIES.map((c) => (
          <a key={c} href={`#${c.toLowerCase().replace(" ", "-")}`} className="border border-rule rounded-md px-3 py-1.5 bg-parchment/40 hover:bg-parchment text-ink-700">{c}</a>
        ))}
      </div>

      {CATEGORIES.map((c) => (
        <section key={c} id={c.toLowerCase().replace(" ", "-")} className="py-8 border-t border-rule scroll-mt-20">
          <div className="kicker mb-2">{c}</div>
          <h2 className="serif text-[1.5rem] text-ink-900 mb-4">{c}</h2>
          <dl className="space-y-4">
            {TERMS.filter((t) => t.category === c).map((t) => (
              <div key={t.term} className="grid md:grid-cols-[14rem_1fr] gap-x-6 gap-y-1">
                <dt className="serif text-ink-900 text-[1.02rem]">
                  {t.term}
                  {t.aka ? <span className="text-ink-500 italic"> · {t.aka}</span> : null}
                </dt>
                <dd className="text-ink-700 text-[0.95rem] leading-relaxed">{t.def}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <div className="rule-double mt-12 pt-6 source-cite">
        Glossary maintained as part of the methodology baseline.{" "}
        <Link href="/methodology" className="underline">Methodology →</Link> ·{" "}
        <Link href="/sources" className="underline">Sources →</Link>
      </div>
    </article>
  );
}
