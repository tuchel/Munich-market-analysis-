import Link from "next/link";

const facts = [
  ["Address", "Klenzestraße 22, 82319 Starnberg-Söcking"],
  ["E&V ID", "W-030N05"],
  ["Asking price (current)", "€ 8,900,000"],
  ["Asking price (original)", "€ 9,900,000"],
  ["Reduction taken", "−€ 1,000,000 (−10.1 %)"],
  ["Buyer's commission", "3.57 % incl. VAT (€ 317,730)"],
  ["Plot (Grundstück)", "≈ 1,831 m²"],
  ["Living area (Wohnfläche)", "≈ 425 m²"],
  ["Useful area (Nutzfläche)", "≈ 273 m²"],
  ["Total floor area", "≈ 698 m² (4 levels + UG)"],
  ["Rooms / Bedrooms / Baths", "12 / 6 / 5"],
  ["Year built", "2025 (newly completed)"],
  ["Heating", "Geothermal + ambient-heat (Wärmepumpe)"],
  ["Energy class", "A+ (Energieausweis)"],
  ["Garage", "Triple, direct house access"],
  ["Listing agent", "Engel & Völkers Fünf Seen Land GmbH"],
];

const headlinePerM2 = Math.round(8_900_000 / 425);
const originalPerM2 = Math.round(9_900_000 / 425);
const perM2Plot = Math.round(8_900_000 / 1_831);

function Section({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 md:py-14 border-t border-rule">
      <div className="kicker mb-2">{kicker}</div>
      <h2 className="serif text-[1.85rem] md:text-[2.1rem] tracking-tight text-ink-900 mb-5 leading-tight">{title}</h2>
      <div className="prose-editorial max-w-prose">{children}</div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border border-rule bg-paper p-4 rounded-md">
      <div className="kicker mb-1">{label}</div>
      <div className="number-lg text-ink-900">{value}</div>
      {sub ? <div className="text-xs text-ink-500 mt-1 tabnums">{sub}</div> : null}
    </div>
  );
}

function Risk({ level, title, body }: { level: "high" | "med" | "low"; title: string; body: string }) {
  const palette =
    level === "high"
      ? "border-bear/40 bg-bear/5"
      : level === "med"
      ? "border-gold-500/40 bg-gold-400/5"
      : "border-bull/40 bg-bull/5";
  const chip = level === "high" ? "chip chip-bear" : level === "med" ? "chip chip-neutral" : "chip chip-bull";
  return (
    <div className={`border ${palette} p-4 rounded-md`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={chip}>{level === "high" ? "Material" : level === "med" ? "Watch" : "Manageable"}</span>
        <span className="serif text-ink-900 text-[1.02rem]">{title}</span>
      </div>
      <p className="text-sm text-ink-700 leading-relaxed">{body}</p>
    </div>
  );
}

export const metadata = {
  title: "Klenzestraße 22, Söcking — Property memo · €8.9M",
  description:
    "A deep-dive valuation, risk and negotiation analysis of the Klenzestraße 22 villa in Starnberg-Söcking, listed at €8.9M.",
};

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      {/* HERO */}
      <header className="mb-10">
        <div className="kicker mb-3">Property memo · single-asset deep dive</div>
        <h1 className="serif text-display-lg md:text-display-xl text-ink-900 leading-[1.02] tracking-tight">
          Klenzestraße 22, Söcking
        </h1>
        <p className="serif italic text-ink-600 text-[1.15rem] mt-2 max-w-2xl">
          A 2025-completed, A+-rated 425 m² villa on a 1,831 m² hillside plot adjoining a Landschaftsschutzgebiet
          — listed at €8.9M after a €1M reduction from the original ask.
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Asking" value="€ 8.90 M" sub={`Reduced from €9.90M (−10.1 %)`} />
          <Stat label="€ / m² Wohnfläche" value={`€ ${headlinePerM2.toLocaleString("en-US")}`} sub={`vs originally € ${originalPerM2.toLocaleString("en-US")}`} />
          <Stat label="€ / m² Grundstück" value={`€ ${perM2Plot.toLocaleString("en-US")}`} sub={`(price ÷ plot, includes building)`} />
          <Stat label="All-in cost" value="€ 9.66 M" sub="Asking + 8.57 % Nebenkosten" />
        </div>
      </header>

      {/* Deep-dive CTA */}
      <div className="mt-6 mb-2 border-l-4 border-gold-500 bg-parchment/60 pl-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="kicker mb-1">Companion analysis</div>
          <div className="serif text-[1.05rem] text-ink-900">Exhaustive negotiation pricing strategy — 18 sections, scripts, BATNA, probability tree, Kaufvertrag clauses.</div>
        </div>
        <Link href="/property/klenzestrasse-22/negotiation" className="serif text-lake-600 text-[1rem] hover:underline whitespace-nowrap">Open the deep-dive →</Link>
      </div>

      {/* EXEC SUMMARY */}
      <section className="callout">
        <div className="callout-title">Executive summary</div>
        <p className="text-[0.96rem] leading-[1.7] text-ink-800">
          <span className="serif font-semibold">Klenzestraße 22</span> is a brand-new, top-specification villa in
          Söcking, the western hillside Ortsteil of Starnberg. It is not lakefront and not in the prime
          Söcking-Südhang BRW band — it is a competent commuter-tier address with a Landschaftsschutzgebiet
          buffer that gives the unblockable rural view advertised. At <span className="tabnums">€20,941/m²</span>{" "}
          Wohnfläche, the asking sits roughly{" "}
          <span className="serif font-semibold">23–50 % above</span> the Starnberg luxury P90 band of €14–17k/m²
          we observe in the market data. The premium is partly justified by the brand-new build, A+ energy class,
          geothermal heating, KNX smart-home, included Minotti furniture and pool — but only partly. Reverse-engineering
          the build cost (≈ 698 m² total floor at €5,500–7,500/m² premium spec, plus pool/garage/landscaping) implies
          a residual land value of roughly{" "}
          <span className="tabnums">€2,000/m² × 1,831 m² ≈ €3.6–3.8M</span>, which is in line with general (non-Südhang)
          Söcking BRW. The seller has already moved €1M (10 %) and looks to be a developer carrying financing —
          our reading of dwell-time, price-cut frequency and the spring 2026 selling window all favour a further
          concession. Our recommended <span className="serif font-semibold">walk-away ceiling</span> is{" "}
          <span className="serif font-semibold tabnums">€7.8–8.0 M</span> (€18.4–18.8k/m² Wohnfläche), with an{" "}
          <span className="serif font-semibold">opening offer at €7.4M</span>. Above €8.5M, the listing offers no
          superior return-of-amenity over a true Südhang or near-lake address you could acquire instead. Below €7.8M
          this is a strong technical buy: zero deferred maintenance, zero GEG retrofit risk, full KfW-40+ envelope,
          and a furnished, move-in primary residence.
        </p>
      </section>

      {/* QUICK FACTS GRID */}
      <Section kicker="01 · At a glance" title="The facts">
        <p>
          The exposé from <em>Engel &amp; Völkers Fünf Seen Land GmbH</em> (Dec 2025) describes a four-level villa
          with a UG basement, ground floor with 3.30 m ceiling height, two upper floors and a passenger lift
          connecting all levels. The land sits at{" "}
          <em>Klenzestraße 22, 82319 Starnberg-Söcking</em>, on the western hillside of Starnberg.
        </p>
        <table className="editorial mt-6">
          <tbody>
            {facts.map(([k, v]) => (
              <tr key={k}><td className="text-ink-600 w-1/3">{k}</td><td className="serif">{v}</td></tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* LOCATION */}
      <Section kicker="02 · Location" title="What “Söcking” really means in the Starnberg geography">
        <p>
          Söcking is a residential Ortsteil of the Kreisstadt Starnberg, west of the rail line and the lake. In our
          community ranking it sits inside the top tier of Starnberg’s sub-quarters{" "}
          (<em>Söcking-Südhang &gt; Percha-See &gt; Hadorf &gt; Leutstetten &gt; Kernstadt</em>), but only the{" "}
          <em>Südhang</em> band — the sun-facing southern slope with open Alpenblick — commands the top
          Bodenrichtwerte (BORIS-Bayern records up to ~€6,800/m² there). The <em>Klenzestraße</em> address is
          north of the Südhang core; it benefits from the Söcking name and infrastructure, but its land
          benchmarks sit closer to <span className="tabnums">€1,800–3,500/m²</span> general-Söcking territory.
        </p>
        <p>
          Critically: <strong>this is not lakefront, not lake-view, and not Südhang</strong>. The exposé is precise
          about what it offers — “unverbaubarer Blick ins Grüne (Landschaftsschutzgebiet)”, i.e. a permanent
          countryside outlook. The LSG buffer is real and durable: the BayNatSchG zoning across Söcking’s
          west and north flanks is the single best long-term protection against future density on adjoining
          parcels. But this is a green-view villa, not a water-view villa — and the price ladder we observe in
          the lakefront premium analysis treats those as fundamentally different goods, with the hillside-with-view
          tier trading at <span className="tabnums">0.18–0.25×</span> of direct waterfront.
        </p>
        <p>
          The locational positives are concrete. S-Bahn S6 from Starnberg runs to Marienplatz in 28–32 min;
          the A95 / A952 are minutes away by car. The Klinikum Starnberg, the Gymnasium Starnberg and the
          Munich International School (MIS) are all within the same Gemeinde and are recurring buyer draws,
          particularly for international families. The A952 proximity also has a downside the exposé does
          not surface — verify motorway noise exposure on the western edge of Söcking before viewing.
        </p>
      </Section>

      {/* SPEC */}
      <Section kicker="03 · Specification" title="What the building actually delivers">
        <p>
          On a 1,831 m² plot the building delivers <strong>425 m² Wohnfläche + 273 m² Nutzfläche</strong> (≈ 698 m²
          total floor area) across UG / EG / 1.OG / 2.OG, with a passenger lift connecting all levels — barrier-free
          throughout, which is unusually rare in single-family construction at this size.
        </p>
        <ul>
          <li><strong>Ceiling heights:</strong> 3.30 m on the ground floor — generous and rarely seen outside bespoke high-end builds (typical SFH is 2.50–2.70 m).</li>
          <li><strong>Master suite:</strong> custom wood wall paneling, suite-scale layout.</li>
          <li><strong>Kitchen + living:</strong> open flow ground floor with “exclusive kitchen”; specifics not enumerated in the exposé — request the supplier sheet (Bulthaup / SieMatic / Poggenpohl-tier likely).</li>
          <li><strong>Materials:</strong> oak multi-layer parquet floors throughout; porcelain stoneware terraces; natural stone retaining walls; bespoke joinery (Schreinereien) embedded.</li>
          <li><strong>Furnishing:</strong> <em>Minotti &amp; Co. full furnishing included in the price</em>. At list, a Minotti package for a villa of this size is €150–250k retail; treat that as €100–150k of real-economic value transferred.</li>
          <li><strong>Outdoor:</strong> heated pool with countercurrent (Gegenstromanlage) and underfloor rolling-cover; outdoor shower; designed garden with automated irrigation; multiple terraces.</li>
          <li><strong>Garage:</strong> three-car, with direct access into the house — important detail given the climate and the daily-use case.</li>
        </ul>
      </Section>

      {/* TECH / ENERGY */}
      <Section kicker="04 · Technical & energy" title="The most important hidden differentiator">
        <p>
          For a property of this vintage — completed in 2025, with an Energieausweis class <strong>A+</strong> —
          the compliance and operating-cost picture is materially different from anything in the existing
          Bestand at this price point. The lakefront stock that competes for trophy buyers is overwhelmingly
          built 1900–1977, sits in energy classes G–H, and faces €600k–€1.28M in GEG-driven retrofit capex
          over the next decade (see our{" "}
          <Link href="/trends/policy-climate">Policy & Climate</Link> module for the full retrofit-cost ladder).
          Buying a 2025 A+ build is buying a decade-long exemption from that capex stack.
        </p>
        <ul>
          <li><strong>Heating:</strong> Geothermal heat pump (Erdwärme / Umweltwärme). Annual heating cost for a 425 m² A+ envelope is realistically €1,500–3,000/year vs €18,000–35,000 for a Gründerzeit Denkmal villa of comparable size on oil/gas — a €15–30k/year operating-cost advantage that compounds to €300–600k over a 20-year hold.</li>
          <li><strong>Floor heating throughout</strong> + <strong>controlled residential ventilation (KWL)</strong>: standard for A+ envelopes; supports stable indoor air quality.</li>
          <li><strong>Air conditioning all rooms</strong>: not standard in German residential — useful for the rising heat-day count (DWD projects 12–16 Hitzetage/Jahr for the Munich region by 2040).</li>
          <li><strong>KNX bus system</strong>: top-tier German smart-home standard. Properly commissioned KNX is the most upgrade-proof control layer available; verify the function programming has been documented and handed over (this is a frequent failure point — get the KNX integrator’s contact and the project file).</li>
          <li><strong>Security & comfort:</strong> PZ security lock, video door entry, motorised rolling shutters and external Raffstores, central in-wall audio.</li>
        </ul>
        <p>
          The <strong>KfW-40+ / EnEV+ economic value</strong> of an A+ envelope at this build cost is meaningful.
          The current GEG mandates: from 2024, replacement heaters must be ≥65 % renewable; municipalities are
          phasing in mandatory heat-pump retrofit per Wärmeplanung by 2028; the EU EPBD cascade requires
          residential to reach Class E by 2030 and Class D by 2033. This property is exempt from all of the
          above for the foreseeable future. That is not a marketing claim — it is a hard avoidance of regulatory
          capex.
        </p>
      </Section>

      {/* PRICING */}
      <Section kicker="05 · Pricing analysis" title="What you are actually paying for, line by line">
        <p>
          The headline asking of <span className="tabnums">€8,900,000</span> resolves to{" "}
          <strong className="tabnums">€20,941/m² Wohnfläche</strong>{" "}
          (or <span className="tabnums">€12,750/m²</span> if you spread it across the 698 m² total floor area).
          Two separate market lenses are useful:
        </p>
        <ul>
          <li>
            <strong>Per-Wohnfläche lens (Starnberg luxury):</strong> our 2025 dataset puts Starnberg luxury P90
            (P90 of the &gt;€3M segment) at €14,000–17,000/m². At the upper end of that band, a 425 m² villa
            prices at €7.23M. The asking carries a 23 % premium over that ceiling. New-build + A+ + furnished
            justifies a 15–20 % premium over P90. Net: the asking is <em>at or just above</em> the upper bound
            of what the premium-adjusted comp set supports.
          </li>
          <li>
            <strong>Reverse-build lens (land + construction):</strong> A premium A+ KfW-40+ specification at the
            indicated quality reconstructs at roughly €5,500–7,500/m² turnkey across 698 m² total floor (≈
            €3.84–5.24M), plus €300–400k for pool / garage / landscaping, €100–200k for the included Minotti,
            and €200–300k for design / Bauleitung / fees. Total replacement cost: <strong className="tabnums">≈ €4.4–6.1M</strong>.
            Subtracting the midpoint <em>€5.25M</em> from the €8.9M ask leaves <strong className="tabnums">€3.65M for the land</strong>,
            implying <strong className="tabnums">≈ €1,995/m²</strong> Bodenrichtwert. That number is consistent with general
            Söcking — not Südhang. So the seller is asking general-Söcking land + premium build cost. Defensible,
            but not a discount.
          </li>
        </ul>
        <table className="editorial mt-6">
          <thead>
            <tr><th>Reference benchmark</th><th>€ / m² Wohnfläche</th><th>425 m² implied</th></tr>
          </thead>
          <tbody>
            <tr><td>Starnberg town SFH median (2025)</td><td className="tabnums">€ 10,500</td><td className="tabnums">€ 4.46 M</td></tr>
            <tr><td>Starnberg luxury P90 (2025)</td><td className="tabnums">€ 14,000–17,000</td><td className="tabnums">€ 5.95 – 7.23 M</td></tr>
            <tr><td>Luxury P90 + 15 % new-build premium</td><td className="tabnums">€ 16,100–19,550</td><td className="tabnums">€ 6.84 – 8.31 M</td></tr>
            <tr><td>Luxury P90 + 20 % (A+ + Minotti + new)</td><td className="tabnums">€ 16,800–20,400</td><td className="tabnums">€ 7.14 – 8.67 M</td></tr>
            <tr className="bg-parchment"><td><strong>This listing — current</strong></td><td className="tabnums"><strong>€ 20,941</strong></td><td className="tabnums"><strong>€ 8.90 M</strong></td></tr>
            <tr><td>Original ask (Dec 2025)</td><td className="tabnums">€ 23,294</td><td className="tabnums">€ 9.90 M</td></tr>
            <tr><td>Berg / Leoni direct lakefront BRW (context)</td><td className="tabnums">€ 28,000–55,000 (land)</td><td className="tabnums">— different product</td></tr>
          </tbody>
        </table>
        <p className="mt-5">
          <strong>Read:</strong> the original €9.9M was an aspirational ask roughly 15 % above the
          premium-adjusted ceiling. The current €8.9M lands at the very top edge of justified value.
          The fair-value mid-point on this analysis is closer to <span className="tabnums">€7.8M</span>{" "}
          (€18.4k/m² Wohnfläche). That is the number to anchor on.
        </p>
      </Section>

      {/* COMPS */}
      <Section kicker="06 · What €8.9M buys elsewhere" title="The opportunity-cost set">
        <p>
          To stress-test the asking, place €8.9M against the substitute set we tracked in the Communities and
          Lakefront modules — what else clears at this number?
        </p>
        <ul>
          <li><strong>Berg hillside (Aufkirchen, Höhenrain, Mörlbach):</strong> €3.5–8M for top-quartile family villa, on plots routinely 2,500–5,000 m². At €8M you typically get a top-end specification on a larger plot, with the Berg Hebesatz advantage (Gewerbesteuer 280 %, Grundsteuer 340 % vs Starnberg 395 %).</li>
          <li><strong>Pöcking / Niederpöcking second-row:</strong> €5–10M, often with partial lake view or 200–400 m walking distance to the shore. Munich International School 10-min drive — same family-school catchment as Söcking.</li>
          <li><strong>Münsing / Ammerland or Ambach lakefront (south end):</strong> €9–16M direct-lakefront villa territory. At ~€9M you can buy a smaller direct-lakefront villa (older Bestand, requires renovation) — fundamentally different product, but the asset class people compare against this listing.</li>
          <li><strong>Tutzing hillside (Oberzeismering / Kampberg):</strong> €3–7M for hillside-with-view villas. €8M buys an exceptional plot or a renovated estate.</li>
          <li><strong>Söcking Südhang Bestand:</strong> the comparable closed sale we noted in the Communities dossier was a Söcking-Südhang estate at ~€9.8M (E&amp;V, 2024). That property was likely on a larger plot and on the Südhang BRW band — directly relevant; it tells you the absolute Söcking ceiling is in the high-€9M range, and only at the better address.</li>
        </ul>
        <p>
          The defensible argument <em>for</em> Klenzestraße at €8.9M is that none of those alternatives delivers the
          combination of (a) brand-new 2025 build, (b) A+ energy + geothermal, (c) full Minotti furnishing, (d)
          KNX-controlled / lifted / climatised, (e) move-in immediate. Every alternative either trades comfort
          and tech for location, or trades location for retrofit obligation. The argument <em>against</em> at €8.9M
          is that comfort and tech are reproducible (you can build A+ KfW-40+ on any plot), location is not, and the
          location here is good-Söcking-not-Südhang.
        </p>
      </Section>

      {/* TOTAL COST */}
      <Section kicker="07 · Total cost of acquisition" title="What clears the notary">
        <table className="editorial">
          <thead>
            <tr><th>Item</th><th className="text-right">€</th><th className="text-right">% of price</th></tr>
          </thead>
          <tbody>
            <tr><td>Kaufpreis (asking)</td><td className="text-right tabnums">8,900,000</td><td className="text-right tabnums">100.00 %</td></tr>
            <tr><td>Grunderwerbsteuer Bayern (3.5 %)</td><td className="text-right tabnums">311,500</td><td className="text-right tabnums">3.50 %</td></tr>
            <tr><td>Notar (~1.0 % degressive)</td><td className="text-right tabnums">≈ 89,000</td><td className="text-right tabnums">≈ 1.00 %</td></tr>
            <tr><td>Grundbuch (~0.5 %)</td><td className="text-right tabnums">≈ 44,500</td><td className="text-right tabnums">≈ 0.50 %</td></tr>
            <tr><td>Käufer-Courtage (3.57 % brutto, exposé-stated)</td><td className="text-right tabnums">317,730</td><td className="text-right tabnums">3.57 %</td></tr>
            <tr className="bg-parchment"><td><strong>Total Nebenkosten</strong></td><td className="text-right tabnums"><strong>≈ 762,730</strong></td><td className="text-right tabnums"><strong>8.57 %</strong></td></tr>
            <tr className="rule-double"><td><strong>All-in to close</strong></td><td className="text-right tabnums"><strong>≈ 9,662,730</strong></td><td className="text-right tabnums"><strong>108.57 %</strong></td></tr>
          </tbody>
        </table>
        <p className="mt-4">
          <strong>Negotiation note on commission.</strong> The 3.57 % brutto is the <em>list</em> rate, not the
          ceiling. At this price band, a sophisticated buyer can normally negotiate commission down to
          2.50–2.98 % brutto per side, or a fixed cap. On €8.9M, the difference between 3.57 % and 2.98 % is
          <span className="tabnums"> ≈ €52,500</span>. Open the conversation with the agent before submitting any
          offer, in writing, with a fixed-fee proposal — the agent has more reason to play ball when there is a
          live offer behind it.
        </p>
      </Section>

      {/* HOLDING */}
      <Section kicker="08 · Annual holding cost" title="Why Bavaria is the cheapest jurisdiction to own this">
        <p>
          Bavaria’s <em>Flächenmodell</em> Grundsteuer (effective 2025) decouples the tax from market value —
          a structural windfall for high-value residential. For Klenzestraße 22:
        </p>
        <table className="editorial">
          <tbody>
            <tr><td>Land Äquivalenzbetrag (1,831 m² × €0.04)</td><td className="tabnums text-right">€ 73.24</td></tr>
            <tr><td>Wohnfläche Äquivalenzbetrag (425 m² × €0.50)</td><td className="tabnums text-right">€ 212.50</td></tr>
            <tr><td>Σ Äquivalenzbetrag</td><td className="tabnums text-right">€ 285.74</td></tr>
            <tr><td>× Grundsteuermesszahl (70 % residential)</td><td className="tabnums text-right">€ 200.02</td></tr>
            <tr><td>× Hebesatz Starnberg B (395 %)</td><td className="tabnums text-right"><strong>≈ € 790 / yr</strong></td></tr>
          </tbody>
        </table>
        <p className="mt-4">
          Roughly <span className="tabnums">€ 800/year</span> in property tax for an €8.9M asset is the cheapest
          residential property tax of any peer European jurisdiction we modelled (vs ≈ €25k/yr IMU on a similar
          Como property, ≈ €40k/yr Liegenschaft + Eigenmiet on a similar Zürichsee property).
        </p>
        <p>Annualised running cost estimate (primary residence, owner-occupied):</p>
        <table className="editorial">
          <tbody>
            <tr><td>Grundsteuer B (Bayern Flächenmodell)</td><td className="tabnums text-right">≈ € 800</td></tr>
            <tr><td>Heating + electricity (A+, geothermal, 425 m²)</td><td className="tabnums text-right">€ 3,000 – 5,000</td></tr>
            <tr><td>Wohngebäude- / Inventar-Versicherung (high-value)</td><td className="tabnums text-right">€ 8,000 – 12,000</td></tr>
            <tr><td>Maintenance reserve (~0.5–0.8 % of building value)</td><td className="tabnums text-right">€ 25,000 – 40,000</td></tr>
            <tr><td>Pool maintenance + chemicals + service</td><td className="tabnums text-right">€ 2,500 – 4,000</td></tr>
            <tr><td>Garden + irrigation + tree care</td><td className="tabnums text-right">€ 4,000 – 8,000</td></tr>
            <tr><td>KNX / smart-home service contract</td><td className="tabnums text-right">€ 1,000 – 2,000</td></tr>
            <tr className="bg-parchment"><td><strong>Total annual holding</strong></td><td className="tabnums text-right"><strong>≈ € 44k – 72k</strong></td></tr>
          </tbody>
        </table>
        <p className="mt-4">
          On the asking, that is <span className="tabnums">≈ 0.5–0.8 % / yr</span> — extremely low for a primary
          residence of this caliber by any international comparison. Note that no Zweitwohnungsteuer applies if
          the villa is your <em>Hauptwohnsitz</em> (Starnberg levies 20 % of the Jahresnettokaltmiete on second
          homes — verify Melderechtliche Anmeldung structure if family situation is mixed).
        </p>
      </Section>

      {/* RISKS */}
      <Section kicker="09 · Risk register" title="What to verify before signing the Reservierung">
        <div className="grid md:grid-cols-2 gap-4 not-prose">
          <Risk
            level="med"
            title="Verify exact Bodenrichtwert via BORIS-Bayern"
            body="Pull the parcel-level BRW for Klenzestraße 22 from boris.bayern.de and the Gutachterausschuss Landkreis Starnberg Bodenrichtwertkarte. If the cell is below €2,500/m², the implied land value in our reverse-build sits above local benchmark — material to your offer."
          />
          <Risk
            level="med"
            title="A952 motorway noise exposure"
            body="The exposé highlights A952 access as a positive. The flip side is night-time noise exposure on the western edge of Söcking. Visit at evening rush and at 22:00; request a Schallschutz-Gutachten if not already supplied; check Lärmkartierung on lfu.bayern.de."
          />
          <Risk
            level="med"
            title="Bauträger 5-year warranty (Verjährung Mängelansprüche)"
            body="Brand-new Bauträger build means the §634a BGB 5-year warranty clock on construction defects starts at handover. Get the Abnahmeprotokoll, the Schlussrechnung, and the list of any noted Mängel. A dedicated Bausachverständigen visit before signing is standard at this price band — budget €2.5–4k."
          />
          <Risk
            level="low"
            title="Energy label final form (Endenergiebedarfsausweis)"
            body="A+ class is excellent. Confirm it is a Bedarfsausweis (calculated, not measured) for a new build, that the Ausstellungsdatum is post-completion, and that the supporting Berechnung is included. Class A+ qualifies for KfW Effizienzhaus Plus financing if useful."
          />
          <Risk
            level="med"
            title="LSG buffer durability (Landschaftsschutzgebiet)"
            body="The “unverbaubarer Blick” claim depends on the LSG ordinance for the adjoining parcels. Pull the LSG-Verordnung text from the Landratsamt; the BayNatSchG is robust but exemption procedures exist. Also verify that the adjoining parcels are not in a Flächennutzungsplan-Fortschreibung that would reclassify them."
          />
          <Risk
            level="low"
            title="HQ100 / surface-water exposure"
            body="Söcking is generally low risk vs the Würmursprung area at the northern lake edge. Cross-check the Hochwassergefahrenkarten on lfu.bayern.de for the parcel; also check the Starkregen-Gefahrenkarte for surface-flow risk at hillside elevation."
          />
          <Risk
            level="med"
            title="KNX commissioning + handover documentation"
            body="KNX is only as good as the commissioning. Request the ETS project file, the integrator's contact, and a walk-through of all functions. Undocumented KNX is the most common post-handover headache at this build tier — cost to recover later €15–30k."
          />
          <Risk
            level="low"
            title="Geothermal probe documentation"
            body="Get the bore-log for the Erdwärme probes (Bohranzeige), the wasserrechtliche Erlaubnis from the Landratsamt, the as-built schematic of the heat pump, and the Hersteller- + Inbetriebnahme-Protokolle. Post-2030 heat-pump market service capacity is a watch item."
          />
          <Risk
            level="high"
            title="Furnishing inventory (Minotti)"
            body="“Vollmöblierung von Minotti & Co. im Kaufpreis enthalten” must be backed by an item-level inventory list with model numbers, photos and individual valuations. Without this list signed and notarised as part of the Kaufvertrag, the seller can replace pieces between viewing and Übergabe. Insist on annexing a notarised Inventarliste."
          />
          <Risk
            level="med"
            title="Bauträger entity standing"
            body="If the seller is a project company (Bauträger), check Handelsregister standing, sample VOB-conformity in the Schlussrechnung, and whether the warranty obligation passes to a Konzern / Mutter or dies with a project SPV. Negotiate a Gewährleistungsbürgschaft (5-year bank guarantee) at 5 % of build cost — standard at this tier."
          />
          <Risk
            level="low"
            title="Gymnasium / MIS / commute fit"
            body="Söcking is in the catchment for Gymnasium Starnberg, Viscardi-Gymnasium, and within drive of MIS (Buchhof / Percha). Verify family fit; if MIS is decisive, factor the bus-route + drive time at school-run hours."
          />
          <Risk
            level="med"
            title="Listing market-time and price-cut history"
            body="The exposé is dated Dec 2025, the listed price has been reduced €1M to €8.9M. Ask the agent in writing: when first listed, when reduced, how many viewings, how many offers received, why the previous offers did not close. This is your single best data signal on real seller motivation."
          />
        </div>
      </Section>

      {/* NEGOTIATION */}
      <Section kicker="10 · Negotiation framework" title="Where the leverage is, and how to use it">
        <p>The negotiation has six anchors in your favour and three in the seller’s. Read both honestly.</p>
        <h3 className="serif text-[1.25rem] mt-6 mb-2 text-ink-900">In your favour</h3>
        <ol>
          <li>
            <strong>Pricing math.</strong> €20,941/m² Wohnfläche sits at the top of the premium-adjusted P90
            band. Anything you offer in the €17–19k/m² range is defensibly in-market.
          </li>
          <li>
            <strong>Seller already moved €1M (10 %).</strong> The first cut is the hardest one psychologically.
            A seller who has crossed that threshold has signalled willingness to discount further if the right
            buyer surfaces.
          </li>
          <li>
            <strong>Bauträger carry cost.</strong> A 2025-completed villa held into 2026 is accruing financing,
            insurance, marketing and Hausgeld carry. Spring 2026 is the seller’s prime selling window;
            past it, they hold into another carry year. Time pressure is on the seller, not on you.
          </li>
          <li>
            <strong>Macro context.</strong> LK Starnberg dwell times are 110–140 days. Munich-region price-cut
            frequency was 55 % at peak 2024 and remains 35–40 % in 2025. The seller’s narrative of unique
            scarcity does not survive contact with the broader transaction data.
          </li>
          <li>
            <strong>Substitution depth.</strong> Berg-Aufkirchen, Tutzing-Oberzeismering and Pöcking second-row
            give you genuine alternatives at €6–9M. Walking is a real option, and the agent knows it.
          </li>
          <li>
            <strong>Cash / equity advantage.</strong> Bauzins at 3.4 % means a leveraged buyer faces ~€3,200/mo
            per €1M financed; cash-buyer offers carry a measurable premium for the seller’s certainty. Lead with
            the financing posture (cash / Eigenkapital ≥ 70 %) to extract a price concession in exchange for speed.
          </li>
        </ol>
        <h3 className="serif text-[1.25rem] mt-6 mb-2 text-ink-900">In the seller’s favour</h3>
        <ol>
          <li>
            <strong>True scarcity of A+ new-build at this size.</strong> There genuinely are very few brand-new
            A+ villas on the lake-shore commuter axis. If your decision criterion is “zero retrofit risk
            and move-in primary”, the substitute set narrows quickly.
          </li>
          <li>
            <strong>MIS catchment + Klinikum + Gymnasium.</strong> The Starnberg infrastructure stack is a
            durable family-buyer draw. Söcking inherits all of it.
          </li>
          <li>
            <strong>Replacement-cost floor.</strong> Baupreisindex is +61 % cumulative since 2015, +36 % since
            2020. Building this same envelope in 2026 prices materially higher than in 2024.
          </li>
        </ol>
        <h3 className="serif text-[1.25rem] mt-6 mb-2 text-ink-900">Information you must extract before bidding</h3>
        <ul>
          <li>Date of first listing; chronology of price reductions; offers received and reasons not closed.</li>
          <li>Whether the seller is the original Bauträger or a flip-investor, and the legal entity.</li>
          <li>Bauleitung file, Abnahmeprotokoll, Mängellisten, Bausachverständigen-zugänglichkeit.</li>
          <li>Item-level Minotti inventory with serial numbers / photographs.</li>
          <li>BORIS-Bayern Bodenrichtwert for the parcel cell, current edition.</li>
          <li>LSG-Verordnung text + Flächennutzungsplan-Status of adjoining parcels.</li>
          <li>Schallschutz-/Lärm-Gutachten for A952 noise exposure.</li>
          <li>Bohranzeige + wasserrechtliche Erlaubnis for the Erdwärme probes.</li>
          <li>Energieausweis Berechnung + Endenergiebedarf number, not just the class.</li>
          <li>KNX ETS project file + integrator contract.</li>
        </ul>
      </Section>

      {/* OFFER LADDER */}
      <Section kicker="11 · Recommended offer ladder" title="The three-step bid sequence">
        <table className="editorial">
          <thead>
            <tr>
              <th>Step</th><th>Offer</th><th>€ / m²</th><th>vs ask</th><th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Open</strong></td>
              <td className="tabnums">€ 7,400,000</td>
              <td className="tabnums">€ 17,412</td>
              <td className="tabnums">−16.9 %</td>
              <td>Anchors at luxury P90 + 9 % new-build premium. Sets a credible market floor without being insulting.</td>
            </tr>
            <tr>
              <td><strong>Mid</strong></td>
              <td className="tabnums">€ 7,800,000</td>
              <td className="tabnums">€ 18,353</td>
              <td className="tabnums">−12.4 %</td>
              <td>Fair-value mid-point on the premium-adjusted P90 + replacement-cost analysis.</td>
            </tr>
            <tr className="bg-parchment">
              <td><strong>Walk-away ceiling</strong></td>
              <td className="tabnums"><strong>€ 8,000,000</strong></td>
              <td className="tabnums"><strong>€ 18,824</strong></td>
              <td className="tabnums"><strong>−10.1 %</strong></td>
              <td><strong>Above this, the alternative-market opportunity cost dominates. Walk.</strong></td>
            </tr>
            <tr>
              <td>Concessional ceiling</td>
              <td className="tabnums">€ 8,400,000</td>
              <td className="tabnums">€ 19,765</td>
              <td className="tabnums">−5.6 %</td>
              <td>Only if seller bundles: extended 10-yr Gewährleistungsbürgschaft, written commission cap at 2.5 %, additional landscaping / sauna / wine-cellar build-out, full furnished inventory beyond Minotti.</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4">
          <strong>Sequencing.</strong> Submit the Open in writing, with proof of funds and a 10-day acceptance
          window. Expect a counter at €8.4–8.6M. Hold at €7.6–7.7M for one round, citing the BORIS / replacement-cost
          analysis and at least two named substitute properties under active consideration. Move to €7.8M
          conditional on (a) item-level Minotti inventory annex, (b) commission cap at 2.5 % brutto, (c)
          5 % Gewährleistungsbürgschaft. If the seller refuses to land below €8.2M, walk and circle back in 60–90
          days; the listing will likely re-price.
        </p>
      </Section>

      {/* VERDICT */}
      <Section kicker="12 · Verdict" title="The bottom line">
        <div className="callout">
          <div className="callout-title">Decision framework</div>
          <ul className="text-[0.96rem]">
            <li><strong>Buy below € 7.8 M:</strong> a strong technical buy. Zero retrofit risk, A+ envelope, geothermal, full furnishing, ~€800/yr Grundsteuer, lift, climatisation, KNX, pool. The lowest-friction primary residence available in the Söcking catchment in 2026.</li>
            <li><strong>Buy at € 7.8–8.0 M with concessions:</strong> defensible if the inventory annex, warranty bond and commission cap are obtained. The premium over fair value pays for build vintage and move-in immediacy.</li>
            <li><strong>Walk above € 8.0 M (no concessions) or € 8.4 M (with concessions):</strong> the substitute set in Berg, Pöcking and Tutzing — and even Söcking-Südhang Bestand — gives demonstrably better location for the same money. The pricing premium is then paying for tech and vintage that you can reproduce on a better plot.</li>
            <li><strong>Do not pay €8.9 M:</strong> the asking carries no margin of safety against (a) a normalising rate environment, (b) widening price-cut frequency, (c) any compromise discovery in the Bausachverständigen review.</li>
          </ul>
        </div>
        <p className="mt-6">
          <strong>One sentence.</strong> Klenzestraße 22 is a high-quality, low-friction primary residence at a
          competent address — but it is priced as if it were a Südhang or near-lake property, which it is not;
          enter the negotiation at €7.4M, anchor on €7.8M, hold the line at €8.0M, and let the seller’s carry
          cost work for you.
        </p>
      </Section>

      <div className="rule-double mt-12 pt-6 source-cite">
        Memo prepared 2026-05-11 from Engel &amp; Völkers exposé of Klenzestraße 22 dated Dec 2025 (E&amp;V ID
        W-030N05), cross-referenced against the macro, communities, lakefront, demographics, policy/climate and
        competing-markets dossiers in this portal. Pricing scenarios assume Bavaria Grunderwerbsteuer 3.5 % and
        Starnberg Hebesatz 395 %. All figures rounded; not investment advice.
      </div>
    </article>
  );
}
