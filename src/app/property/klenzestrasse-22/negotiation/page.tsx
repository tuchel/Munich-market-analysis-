import Link from "next/link";

export const metadata = {
  title: "Klenzestraße 22 — Negotiation deep-dive · €8.9M ask",
  description:
    "Exhaustive negotiation pricing strategy for the Klenzestraße 22 listing in Söcking: seller analysis, BATNA, comparables dissection, anchoring, offer ladder, concession ladder, round-by-round scripts, probability trees, walk-away protocols, re-entry strategy, Kaufvertrag clauses.",
};

function Section({ kicker, title, children, id }: { kicker: string; title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="py-10 md:py-14 border-t border-rule scroll-mt-20">
      <div className="kicker mb-2">{kicker}</div>
      <h2 className="serif text-[1.85rem] md:text-[2.1rem] tracking-tight text-ink-900 mb-5 leading-tight">{title}</h2>
      <div className="prose-editorial max-w-prose">{children}</div>
    </section>
  );
}
function Sub({ children }: { children: React.ReactNode }) {
  return <h3 className="serif text-[1.25rem] mt-7 mb-2 text-ink-900">{children}</h3>;
}
function Script({ role, body }: { role: string; body: React.ReactNode }) {
  return (
    <div className="border-l-4 border-gold-500 pl-4 py-2 my-3 bg-parchment/40">
      <div className="kicker mb-1">{role}</div>
      <div className="serif italic text-ink-800 text-[0.98rem] leading-relaxed">{body}</div>
    </div>
  );
}

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">
        <Link href="/property/klenzestrasse-22" className="underline">← Property memo</Link>
        <span className="mx-2">·</span>Negotiation deep-dive
      </div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">
        Negotiation pricing strategy
      </h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        An exhaustive playbook for the Klenzestraße 22 negotiation: who the seller is and what
        moves them, what your real BATNA is, every comparable dissected, anchor maths, round-by-round
        scripts, concession ladders, walk-away triggers, re-entry strategy, and the specific
        Kaufvertrag clauses that protect the buyer at €8M+.
      </p>

      {/* TOC */}
      <nav className="mt-10 grid md:grid-cols-2 gap-x-8 gap-y-1 text-sm border-y border-rule py-5">
        <ol className="list-decimal pl-5 marker:text-gold-500 marker:font-semibold space-y-1">
          <li><a href="#exec" className="hover:underline">Executive negotiation summary</a></li>
          <li><a href="#seller" className="hover:underline">Seller analysis &amp; motivation map</a></li>
          <li><a href="#market" className="hover:underline">Market context as leverage</a></li>
          <li><a href="#asymmetry" className="hover:underline">Information asymmetry map</a></li>
          <li><a href="#batna" className="hover:underline">BATNA — yours and theirs</a></li>
          <li><a href="#comps" className="hover:underline">Comparables, dissected</a></li>
          <li><a href="#anchoring" className="hover:underline">Anchor maths — five lenses</a></li>
          <li><a href="#offers" className="hover:underline">Offer ladder — the full sequence</a></li>
        </ol>
        <ol className="list-decimal pl-5 marker:text-gold-500 marker:font-semibold space-y-1" start={9}>
          <li><a href="#concessions" className="hover:underline">Concession ladder — non-price levers</a></li>
          <li><a href="#playbook" className="hover:underline">Round-by-round playbook (scripts)</a></li>
          <li><a href="#probability" className="hover:underline">Probability tree &amp; expected-value</a></li>
          <li><a href="#cash" className="hover:underline">Cash vs financed posture</a></li>
          <li><a href="#timing" className="hover:underline">Timing &amp; windows</a></li>
          <li><a href="#walk" className="hover:underline">Walk-away protocols</a></li>
          <li><a href="#reentry" className="hover:underline">Re-entry strategy</a></li>
          <li><a href="#contract" className="hover:underline">Kaufvertrag clauses to demand</a></li>
          <li><a href="#diligence" className="hover:underline">Diligence as negotiation lever</a></li>
          <li><a href="#summary" className="hover:underline">One-page summary</a></li>
        </ol>
      </nav>

      <Section id="exec" kicker="01" title="Executive negotiation summary">
        <p>
          <strong>The single number that matters: walk away above €8.0M.</strong> Open at €7.4M. Settle at
          €7.6–7.8M with the inventory annex, warranty bond and commission cap. Above €8.0M without bundled
          concessions, the substitute set (Berg-Aufkirchen, Pöcking second-row, Tutzing-Oberzeismering,
          Söcking-Südhang Bestand) gives strictly better location for the same money — and the seller’s carry
          cost is working for you, not against you.
        </p>
        <p>
          The seller already conceded €1M (10.1 %) from the original €9.9M ask. The first move was the hardest;
          the second move comes faster. Your job is to ensure that the second move is taken inside a frame
          where the seller still feels they are the price-maker. That frame is built with three components:
          a credible market floor (the comparables and reverse-build cost analysis), a credible BATNA (named
          substitute properties and a documented willingness to walk), and a credible counterparty
          (cash / heavy-Eigenkapital posture, fast close, low Vertragsrisiko).
        </p>
        <p>
          Everything else in this document supports those three components.
        </p>
      </Section>

      <Section id="seller" kicker="02" title="Seller analysis & motivation map">
        <p>
          You cannot price a negotiation without first pricing the counterparty. The exposé tells you who is
          selling and gives you several inferences about how they think.
        </p>
        <Sub>What we know from the exposé</Sub>
        <ul>
          <li><strong>Listing agent:</strong> Engel &amp; Völkers Fünf Seen Land GmbH, Hauptstraße 9, Starnberg.</li>
          <li><strong>Build year:</strong> 2025 (just completed).</li>
          <li><strong>Exposé creation date:</strong> Tue Dec 2, 2025 (PDF metadata).</li>
          <li><strong>Listed at:</strong> €9.9M originally; <strong>reduced to €8.9M</strong> (when the user reported it).</li>
          <li><strong>Full Minotti furnishing included</strong> — implies the seller furnished it specifically for marketing, which is a developer / Bauträger move, not an owner-occupier sale.</li>
          <li><strong>Brand-new build with no prior occupancy</strong> — confirms the seller is either the Bauträger themselves or a flip-investor who bought the project on Schlüsselübergabe.</li>
        </ul>
        <Sub>What we infer about the seller</Sub>
        <ul>
          <li><strong>Probability ~75 %: The seller is the Bauträger (project developer).</strong> The Minotti staging, the brand-new condition with zero occupancy, the early Q4 2025 exposé, the 10 % price cut within a few months — all consistent with a developer carrying financing on a finished spec build.</li>
          <li><strong>Probability ~20 %: The seller is a flip-investor.</strong> Bought the project at handover, marked it up, listed at €9.9M, has been forced down to €8.9M because the market read the original ask as aspirational.</li>
          <li><strong>Probability ~5 %: The seller is an owner-occupier or family who never moved in.</strong> Unlikely given the staging signature.</li>
        </ul>
        <Sub>Why this matters for price</Sub>
        <p>
          A Bauträger has a known cost basis: typically €5,000–7,000/m² turnkey for premium A+ build (≈ €5.2M
          on 698 m² total floor) + €300–500k for pool/garage/landscaping + €200–400k for site costs + €100–200k
          for the Minotti package + financing carry. Their <em>economic floor</em> is somewhere around{" "}
          <strong>€6.0–6.5M</strong> before margin. Below that, they are taking a loss; above that, every euro
          of price is margin. Their <em>negotiation floor</em> sits at cost + minimum acceptable margin — typically
          15–20 % for a Bauträger, so roughly <strong>€7.0–7.5M</strong>.
        </p>
        <p>
          A flip-investor’s floor is acquisition cost + carry + minimum return. If they bought from the Bauträger
          at €6.5–7.5M six to twelve months ago, their floor today (with carry) is roughly{" "}
          <strong>€7.2–8.0M</strong>. This is the harder counterparty to break; if you suspect a flip, anchor
          higher and move faster — they bleed on time, but they have less elasticity than a Bauträger.
        </p>
        <Sub>The agent’s position</Sub>
        <p>
          Engel &amp; Völkers Fünf Seen Land is a franchise license-partner of E&amp;V Residential GmbH. The
          agent’s incentive structure: 3.57 % commission on the seller side at close, with split commissions
          (3.57 % buyer + 3.57 % seller = 7.14 % gross to E&amp;V at full rate). On €8.9M, that’s €317,730 per
          side — so the agent has €635,460 of gross commission at stake at full rate. A 10 % price reduction
          (€8.9M → €8.0M) costs the agent only €32,000 in commission but secures the close. Agents in this
          environment routinely advise sellers to take the price cut. <strong>The agent is your ally on
          closing the deal even if they are nominally the seller’s representative.</strong> Treat them as such
          tactically — give them a clear, fast, financeable offer they can sell internally.
        </p>
        <Sub>Specific intelligence to request from the agent (in writing)</Sub>
        <ol>
          <li>Exact date of first listing.</li>
          <li>Full price-cut chronology with dates.</li>
          <li>Number of viewings to date.</li>
          <li>Number of written offers received and the spread (not names — they will not give names, but they will give a range).</li>
          <li>Reason previous offers did not close (typically: too low / financing fell through / timing mismatch).</li>
          <li>Whether the seller has a deadline (financing maturity, end-of-quarter, year-end tax planning).</li>
          <li>Whether the seller is willing to consider a commission cap.</li>
        </ol>
        <p>
          Agents will not always answer these directly, but the <em>way they answer</em> is the signal.
          “Wir haben mehrere Interessenten” without specifics = thin pipeline. A concrete number of offers,
          even vague, = real pipeline. Refusal to answer 2 / 5 / 6 = something to push on.
        </p>
      </Section>

      <Section id="market" kicker="03" title="Market context as leverage">
        <p>
          The macro and micro market data are not neutral background — they are the most defensible reason
          you can give the seller for why €8.9M does not clear. Marshal these explicitly in writing in your
          first offer letter:
        </p>
        <ul>
          <li><strong>Munich + LK Starnberg transaction collapse:</strong> 2023 transactions in LK Starnberg fell ~60 % below the 2021 peak; even after the 2024–25 recovery, volumes remain 33 % below peak. Buyers have re-priced their willingness to pay.</li>
          <li><strong>Vermarktungsdauer (dwell time):</strong> Munich median listings now sit 89–105 days on market; LK Starnberg ~110–140 days. The 2020–21 sellers’ market with sub-30-day dwells is gone. Pricing patience is a luxury the seller does not have.</li>
          <li><strong>Price-cut frequency:</strong> ImmoScout24 / Aigner data show ~35–40 % of Munich listings carrying at least one price reduction in 2025 (peaked at ~55 % in 2024). Your seller is already in that statistic — they will not be insulted to land further into it.</li>
          <li><strong>Bauzins (mortgage rate):</strong> 10-yr fixed at 3.40–3.60 % vs the 2020–21 sub-1 % regime. Buyer purchasing power is structurally lower; comparable-spec properties that closed at the 2022 peak would not close at the same price today.</li>
          <li><strong>Empirica Blasenindex:</strong> Top-7 Rückschlagpotenzial moved from 48 % (2022) to 29 % (2024) to 19 % (Q4 2025) — driven by rent catch-up, not price growth. Pure capital-gains thesis is weaker than it has been in a decade.</li>
          <li><strong>Bundesbank overvaluation indicator:</strong> Munich Top-7 still 15–20 % above fundamentals. Anchor on this number in writing.</li>
          <li><strong>Construction cost (Baupreisindex):</strong> +61 % cumulative 2015–2025. This <em>cuts both ways</em>: it sets a high replacement-cost floor (favours seller), but it also means buyers refuse to overpay for new-build when they perceive cost-plus pricing.</li>
        </ul>
        <p className="mt-4">
          Write a paragraph for the offer letter that uses three of these data points by name and number.
          German real-estate negotiations respect specifics. Pre-empt the “unique property” counter by
          acknowledging it (yes, it is a fine villa) and then anchoring on the market objective frame.
        </p>
      </Section>

      <Section id="asymmetry" kicker="04" title="Information asymmetry map">
        <p>
          Negotiation is the management of information asymmetry. There is information they have that you
          do not, information you have that they do not, and information neither side has that you can
          surface to your advantage.
        </p>
        <table className="editorial">
          <thead>
            <tr>
              <th>Information</th>
              <th>You know</th>
              <th>Seller knows</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>True cost basis of the build</td><td>Estimated</td><td>Exact</td><td>Ask politely, expect refusal; estimate via Baupreisindex back-calc.</td></tr>
            <tr><td>Number of competing offers</td><td>No</td><td>Yes</td><td>Ask; calibrate your bid by their willingness to disclose.</td></tr>
            <tr><td>Financing carry deadline</td><td>No</td><td>Yes</td><td>Probe via the agent: “Is there a particular timeline target?”</td></tr>
            <tr><td>Original Bauträger margin target</td><td>Estimated 15–20 %</td><td>Exact</td><td>Anchor below it; let them counter you up.</td></tr>
            <tr><td>Your maximum willingness to pay</td><td>Yes</td><td>No</td><td>Never reveal. The €8.0M ceiling is yours alone.</td></tr>
            <tr><td>Your real BATNA properties</td><td>Yes</td><td>No</td><td>Reveal selectively — name 2 properties under active consideration to make it credible.</td></tr>
            <tr><td>Your financing posture</td><td>Yes</td><td>No</td><td>Reveal strategically: “cash / Eigenkapital ≥ 70 %, no financing contingency”.</td></tr>
            <tr><td>Bodenrichtwert of the parcel cell</td><td>Public via BORIS-Bayern</td><td>Yes</td><td>Pull it yourself; cite in offer letter.</td></tr>
            <tr><td>LSG durability of adjoining parcels</td><td>Public via LRA</td><td>Estimated</td><td>Pull LSG-Verordnung; if buffer is weak, that is your point.</td></tr>
            <tr><td>A952 noise exposure measured</td><td>Verifiable by visit / Gutachten</td><td>Likely yes, undisclosed</td><td>Order own Schallschutz-Gutachten; surface findings only at counter-stage.</td></tr>
            <tr><td>KNX commissioning quality</td><td>No</td><td>Yes</td><td>Get the integrator’s contact + ETS file as part of due diligence.</td></tr>
            <tr><td>Minotti inventory specifics</td><td>No</td><td>Yes</td><td>Demand item-level annex before signing.</td></tr>
            <tr><td>Energy-pump warranty terms</td><td>No</td><td>Yes</td><td>Get manufacturer + installation date + warranty docs.</td></tr>
            <tr><td>Bauträger / SPV legal standing</td><td>Public via Handelsregister</td><td>Yes</td><td>Pull HR-Auszug; if SPV, demand Gewährleistungsbürgschaft.</td></tr>
            <tr><td>Future Flächennutzungsplan changes</td><td>Public via Gemeinde</td><td>Estimated</td><td>Check Söcking FNP-Fortschreibung status.</td></tr>
          </tbody>
        </table>
        <p className="mt-4">
          The two pieces of information you must absolutely never volunteer are (a) the actual ceiling of
          your willingness to pay, and (b) the urgency of your own timeline. Both are negative-cost to reveal
          and infinite-cost to leak.
        </p>
      </Section>

      <Section id="batna" kicker="05" title="BATNA — yours and theirs">
        <p>
          BATNA = Best Alternative To a Negotiated Agreement. The party with the better BATNA wins.
        </p>
        <Sub>Your BATNA</Sub>
        <p>
          You are buying a primary residence in the Starnberger See catchment in the €5–10M band. The
          substitute set is genuinely deep:
        </p>
        <ul>
          <li><strong>Berg-Aufkirchen / Höhenrain / Mörlbach:</strong> hillside villas €3.5–8M, larger plots (2,500–5,000 m²), Berg Gewerbesteuer Hebesatz 280 % vs Starnberg 395 %.</li>
          <li><strong>Pöcking / Niederpöcking / Possenhofen:</strong> second-row near-lake €5–10M, S-Bahn S6, MIS catchment.</li>
          <li><strong>Söcking-Südhang Bestand:</strong> the genuine peer to this listing; €4–9M for renovated/Altbestand.</li>
          <li><strong>Tutzing-Oberzeismering / Kampberg hillside:</strong> €3–7M, scenic, slower commute.</li>
          <li><strong>Münsing / Ammerland / Ambach lakefront:</strong> €9–16M for actual direct-lakefront — a different product but the comparable substitution at the upper end of your budget.</li>
          <li><strong>Greenfield build option:</strong> buy a plot in good Söcking / Pöcking at €1,800–3,500/m² × ~2,000 m² + €5,500–7,000/m² build × ~500 m² = ~€6.0–9.5M total. Replicable specification on a chosen plot.</li>
        </ul>
        <p>
          <strong>Strength of your BATNA:</strong> high. Multiple credible substitutes within budget,
          different communities, different product profiles. Strengthens further the longer you are
          willing to wait — the inheritance wave (€8.5–13.5 bn of lakefront properties expected to
          transfer 2025–2035 in LK Starnberg) drips new supply onto the market every quarter.
        </p>
        <Sub>Seller’s BATNA</Sub>
        <ul>
          <li><strong>Hold and wait:</strong> Carry the property into 2026 H2 / 2027 selling seasons. Cost: financing interest at ~5–7 % on a Bauträger credit line on €5–6M working capital = €25–35k/month of pure carry. Plus insurance, maintenance, marketing, Hausgeld.</li>
          <li><strong>Cut price further and re-list:</strong> moving to €7.9–8.4M shifts the listing into a more liquid price band — but signals weakness, locking in lower buyer expectations.</li>
          <li><strong>Sell at auction / share-deal:</strong> opaque, lower price realisation, mostly used for distressed assets — not realistic here unless the seller is in genuine financial pressure.</li>
          <li><strong>Rent it out:</strong> a 425 m² villa in Söcking might command €8,000–14,000/month Kaltmiete = €100–170k/year, a ~1.1–1.9 % gross yield on €8.9M. Below cost of capital. Unlikely first choice.</li>
          <li><strong>Refinance / convert to long-term hold:</strong> typically requires breaking the Bauträger structure; unusual.</li>
        </ul>
        <p>
          <strong>Strength of seller’s BATNA:</strong> moderate. The “hold and wait” option has real
          financial cost — each month of carry is roughly €25–35k. The seller can absorb 6–9 months of this
          before the carry cost equals the negotiation gap. Time strongly favours you.
        </p>
        <Sub>BATNA conclusion</Sub>
        <p>
          You have the stronger BATNA in absolute terms (you can buy somewhere else; the seller can only sell
          this property). You also have the stronger BATNA in time terms (you can wait longer than they can).
          Use both, but never advertise them — credible BATNA is silent BATNA.
        </p>
      </Section>

      <Section id="comps" kicker="06" title="Comparables, dissected">
        <p>
          Specific comparables defeat generic objections. Walk into the negotiation with these named,
          dated and price-anchored.
        </p>
        <Sub>Comp 1 — Söcking-Südhang estate, €9.8M (E&amp;V closed, 2024)</Sub>
        <ul>
          <li><strong>Why it matters:</strong> The direct local ceiling. A genuine Südhang property on a likely larger plot, with an established address and view profile — closed at €9.8M.</li>
          <li><strong>Implication:</strong> Klenzestraße 22 is asking €8.9M for a non-Südhang address with arguably a smaller plot. The asking should be 15–25 % below Südhang-prime, putting fair value at €7.35–8.35M. Anchor on this comparable explicitly.</li>
          <li><strong>Use in negotiation:</strong> “Vergleichsweise wurde im Söcking-Südhang ein Anwesen für ca. €9.8M veräußert (E&amp;V, 2024). Da Klenzestraße 22 außerhalb der Südhang-Bodenrichtwertzone liegt, halten wir einen Abschlag von mindestens 18 % für angemessen.”</li>
        </ul>
        <Sub>Comp 2 — Percha lake villa, €14M (Merkur, 2023)</Sub>
        <ul>
          <li><strong>Why it matters:</strong> Sets the local lake-adjacent ceiling. Genuine Percha-See address with lake proximity, larger plot, mature building.</li>
          <li><strong>Implication:</strong> At €14M for genuine lake-near, €8.9M for non-lake hillside in adjacent Ortsteil is mispriced. A defensible discount to Percha-See is 35–45 %, putting fair value at €7.7–9.1M for Klenzestraße 22.</li>
          <li><strong>Tactical note:</strong> Use this carefully — the seller will argue the build vintage (new vs Bestand) inverts the discount. Pre-empt: “Even allowing for new-build premium, the location differential exceeds it.”</li>
        </ul>
        <Sub>Comp 3 — Niederpöcking lake villa, ~€18M (E&amp;V 2024 listing)</Sub>
        <ul>
          <li><strong>Why it matters:</strong> Anchors the price gradient between true lakefront and hillside-with-view. Lakefront is ~2× hillside, not 1×.</li>
          <li><strong>Implication:</strong> If a direct lakefront villa in Niederpöcking lists at €18M, an interior Söcking villa at €8.9M is asking for 49 % of lakefront pricing. Per our shore-gradient model, hillside-with-view trades at 18–25 % of lakefront. The asking is overpriced relative to the lake gradient by a factor of 2x.</li>
        </ul>
        <Sub>Comp 4 — Berg-Aufkirchen hillside villa range, €3.5–8M (2025)</Sub>
        <ul>
          <li><strong>Why it matters:</strong> The direct substitution for your purchase. Berg’s Gewerbesteuer Hebesatz 280 % beats Starnberg’s 395 %, and the location halo (Wittelsbach, Leoni) is stronger than Söcking’s.</li>
          <li><strong>Implication:</strong> For €8M you can be in the highest tier of Berg hillside on a comparable or larger plot. Klenzestraße 22 must compete on price.</li>
        </ul>
        <Sub>Comp 5 — Greenfield build cost on a 2,000 m² Söcking plot</Sub>
        <ul>
          <li><strong>Plot cost:</strong> ~€2,500/m² × 2,000 m² = €5.0M (good Söcking, not Südhang).</li>
          <li><strong>Build cost:</strong> €5,500–7,000/m² × 500 m² premium A+ KfW-40+ build = €2.75–3.50M.</li>
          <li><strong>Architect / permits / Bauleitung:</strong> ~€300–400k.</li>
          <li><strong>Landscaping + pool:</strong> ~€400–500k.</li>
          <li><strong>Furnishing (à la Minotti):</strong> ~€150–250k.</li>
          <li><strong>Total replication cost:</strong> ~€8.6–9.65M — but with 24–36 months of time and full Bauträger risk.</li>
          <li><strong>Implication:</strong> A buyer pays a “time + risk” premium for a finished build. That premium is reasonably 8–15 % over replication cost on this scope, putting fair value at ~€7.0–8.3M. The asking lands at the very top of that band.</li>
        </ul>
        <Sub>Comp 6 — Notable lakefront, 2021 Berg/Leoni “Rottmann-zone”, €28–38M reported</Sub>
        <ul>
          <li><strong>Why it matters:</strong> Top-of-market reference. Anchors the trophy tier so that the seller cannot drift up.</li>
        </ul>
        <Sub>Reading the comparable set as a whole</Sub>
        <p>
          The comp set gives three convergent fair-value estimates: <strong>€7.35–8.35M (Söcking-Südhang
          discount)</strong>, <strong>€7.7–9.1M (lake-adjacent discount)</strong>, and{" "}
          <strong>€7.0–8.3M (replication + premium)</strong>. The overlapping band is{" "}
          <strong className="tabnums">€7.7–8.3M</strong>. That is the negotiation range. Anything below
          €7.7M is a steal; anything above €8.3M is overpaying.
        </p>
      </Section>

      <Section id="anchoring" kicker="07" title="Anchor maths — five lenses">
        <p>
          Anchors are credible when they are derived from explicit formulas. Five independent lenses, each
          giving you a defensible offer number. Together they bracket the negotiation.
        </p>
        <table className="editorial">
          <thead>
            <tr><th>Lens</th><th>Formula</th><th>Implied price</th><th>€ / m² Wohnfläche</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>1. P90 Wohnfläche (raw)</strong></td><td className="tabnums">425 m² × €15,500</td><td className="tabnums">€ 6.59 M</td><td className="tabnums">€ 15,500</td></tr>
            <tr><td><strong>2. P90 + 15 % new-build premium</strong></td><td className="tabnums">425 m² × €15,500 × 1.15</td><td className="tabnums">€ 7.58 M</td><td className="tabnums">€ 17,825</td></tr>
            <tr><td><strong>3. P90 + 20 % (A+ + furnished + new)</strong></td><td className="tabnums">425 m² × €15,500 × 1.20</td><td className="tabnums">€ 7.91 M</td><td className="tabnums">€ 18,600</td></tr>
            <tr><td><strong>4. Reverse-build (land + replacement)</strong></td><td className="tabnums">€2,000/m² × 1,831 m² + €5.25M build</td><td className="tabnums">€ 8.91 M</td><td className="tabnums">€ 20,964</td></tr>
            <tr><td><strong>5. Söcking-Südhang minus location discount</strong></td><td className="tabnums">€9.8M × (1 − 18 %)</td><td className="tabnums">€ 8.04 M</td><td className="tabnums">€ 18,917</td></tr>
            <tr className="bg-parchment"><td><strong>Trimmed mean (excl. low and high)</strong></td><td>—</td><td className="tabnums"><strong>€ 7.84 M</strong></td><td className="tabnums"><strong>€ 18,447</strong></td></tr>
          </tbody>
        </table>
        <p className="mt-4">
          <strong>Read:</strong> three of five lenses converge on €7.6–8.0M. The reverse-build lens (lens 4)
          is the seller’s case — it reconstructs the asking. The luxury-P90-raw lens (lens 1) is the buyer’s
          most aggressive defensible floor. The middle three lenses are where deals close.
        </p>
        <Sub>Anchoring tactics</Sub>
        <ol>
          <li><strong>Open at lens 1 + small margin (€7.4M).</strong> Anchor low to drag the bargaining range down. Justify it explicitly with lenses 1 and 2.</li>
          <li><strong>Counter at lens 2 (€7.58M) or lens 3 (€7.91M).</strong> Surface the lens by name in writing; this transforms the bid from “arbitrary discount” to “market-derived valuation”.</li>
          <li><strong>Ceiling at trimmed-mean (€7.84M).</strong> If the seller pushes further, your move is concessions, not price.</li>
        </ol>
        <p>
          <strong>Critical:</strong> never anchor to the seller’s asking price. Always anchor to your own
          comp-derived valuation. Every time you say “€8.9M is …” you are validating €8.9M as the centre
          of gravity. Say instead: “Our valuation is €7.8M, derived as follows…”
        </p>
      </Section>

      <Section id="offers" kicker="08" title="Offer ladder — the full sequence">
        <table className="editorial">
          <thead>
            <tr><th>Step</th><th>Offer</th><th>€ / m²</th><th>vs ask</th><th>Anchor logic</th><th>Concessions sought</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>R1 — Open</strong></td>
              <td className="tabnums">€ 7,250,000</td>
              <td className="tabnums">€ 17,059</td>
              <td className="tabnums">−18.5 %</td>
              <td>Lens 2 minus 5 % opening discount. Credible market floor.</td>
              <td>Inventarliste signed; commission cap 2.98 %; 10 % Anzahlung.</td>
            </tr>
            <tr>
              <td><strong>R2 — Mid</strong></td>
              <td className="tabnums">€ 7,600,000</td>
              <td className="tabnums">€ 17,882</td>
              <td className="tabnums">−14.6 %</td>
              <td>Lens 2 + 0.3 %. Movement of €350k signals serious counterparty.</td>
              <td>Add: 5 % Gewährleistungsbürgschaft; written A952 noise disclosure; KNX integrator handover.</td>
            </tr>
            <tr>
              <td><strong>R3 — Walk-ready</strong></td>
              <td className="tabnums">€ 7,800,000</td>
              <td className="tabnums">€ 18,353</td>
              <td className="tabnums">−12.4 %</td>
              <td>Lens-3 mid-point. Fair-value centre per comp set.</td>
              <td>All above; commission cap fixed at 2.50 %; 60-day close.</td>
            </tr>
            <tr className="bg-parchment">
              <td><strong>R4 — Final ceiling</strong></td>
              <td className="tabnums"><strong>€ 8,000,000</strong></td>
              <td className="tabnums"><strong>€ 18,824</strong></td>
              <td className="tabnums"><strong>−10.1 %</strong></td>
              <td><strong>Final walk-away. Trimmed mean + 2.0 %.</strong></td>
              <td><strong>All above + Bausachverständigen access 14 days pre-signing.</strong></td>
            </tr>
            <tr>
              <td>R5 (only with bundled concessions)</td>
              <td className="tabnums">€ 8,200,000</td>
              <td className="tabnums">€ 19,294</td>
              <td className="tabnums">−7.9 %</td>
              <td>Only if seller delivers: extended 10-yr warranty bond + €100k bespoke finishing budget + commission at 2.0 %.</td>
              <td>Each concession item must be quantified in € and written into the Kaufvertrag.</td>
            </tr>
            <tr>
              <td>R6 (absolute ceiling, with all concessions + extras)</td>
              <td className="tabnums">€ 8,400,000</td>
              <td className="tabnums">€ 19,765</td>
              <td className="tabnums">−5.6 %</td>
              <td>Only if (a) confirmed top-band BRW for parcel, (b) zero A952 noise issue verified, (c) 5-yr warranty plus 5 % retention bond, (d) full Minotti annex with retention clause, (e) commission cap 1.5 % or fee.</td>
              <td>This bundle is worth €350–500k in cash-equivalent value; do not pay €8.4M without it.</td>
            </tr>
            <tr>
              <td>R7 (red — do not enter)</td>
              <td className="tabnums">€ 8,500–8,900M</td>
              <td className="tabnums">€ 20,000+</td>
              <td className="tabnums">&lt; 5 %</td>
              <td><strong>Substitute set dominates. Walk.</strong></td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
        <Sub>Increments &amp; pace</Sub>
        <p>
          German real-estate negotiation respects measured pace. Between each round, allow 7–14 days. Never
          counter your own offer; never increase your bid without a corresponding seller concession on price
          or terms. If the seller refuses to move between R1 and R2, hold and wait — silence is bargaining.
        </p>
        <Sub>Why €7.25M as opening (not €7.0M, not €7.4M)</Sub>
        <p>
          Below €7.0M is rejected as not-serious and damages the relationship. Above €7.4M concedes ground
          without need. €7.25M is the “credible insult” — low enough to drag the mid-point, high enough to
          force engagement. The exact number signals analytical preparation; round numbers (€7.0M, €7.5M)
          signal arbitrary anchoring and invite arbitrary counters.
        </p>
      </Section>

      <Section id="concessions" kicker="09" title="Concession ladder — non-price levers">
        <p>
          Every euro of price reduction has a direct economic equivalent in non-price concessions. When the
          seller refuses to come down further, the negotiation pivots to terms. Each item below has a
          quantified cash-equivalent value to you — use these as the trading currency in the final rounds.
        </p>
        <table className="editorial">
          <thead>
            <tr><th>Concession</th><th>Cash-equivalent value</th><th>How to ask</th></tr>
          </thead>
          <tbody>
            <tr><td>Commission cap at 2.50 % brutto (vs 3.57 %)</td><td className="tabnums text-right">€ 95,200</td><td>Direct to agent, in writing, with the offer.</td></tr>
            <tr><td>Commission cap at 2.0 % brutto</td><td className="tabnums text-right">€ 139,700</td><td>Final round only; “in exchange for our concession on price”.</td></tr>
            <tr><td>Fixed-fee commission (€100k cap)</td><td className="tabnums text-right">€ 217,730</td><td>Aggressive; useful at high asking prices.</td></tr>
            <tr><td>5-yr Gewährleistungsbürgschaft (5 % of build cost)</td><td className="tabnums text-right">€ 260,000</td><td>Standard at this build tier — refusal is itself a signal.</td></tr>
            <tr><td>10-yr extended construction warranty bond</td><td className="tabnums text-right">€ 350,000</td><td>Mid-round concession; quantifies risk avoidance.</td></tr>
            <tr><td>Item-level Minotti inventory annex (notarised)</td><td className="tabnums text-right">€ 150,000</td><td>Refusal = treat as zero value of furnishing.</td></tr>
            <tr><td>Replacement-clause if Minotti damaged pre-Übergabe</td><td className="tabnums text-right">€ 50,000</td><td>Standard contract language; should be uncontroversial.</td></tr>
            <tr><td>14-day Bausachverständigen access pre-signing</td><td className="tabnums text-right">€ 25,000</td><td>Always request; refusal is a major red flag.</td></tr>
            <tr><td>Written A952 noise + Schallschutz disclosure</td><td className="tabnums text-right">€ 30,000</td><td>If seller has measurements, they cost nothing to provide.</td></tr>
            <tr><td>Energieausweis Berechnung + Endenergiebedarf figure</td><td className="tabnums text-right">€ 5,000</td><td>Free for seller; valuable for buyer.</td></tr>
            <tr><td>KNX ETS project file + integrator service contract (1 yr)</td><td className="tabnums text-right">€ 20,000</td><td>Free for seller; saves €15–30k post-handover.</td></tr>
            <tr><td>Geothermal probe Bohranzeige + wasserrechtliche Erlaubnis</td><td className="tabnums text-right">€ 10,000</td><td>Free for seller; required for any future service work.</td></tr>
            <tr><td>Garden landscaping €50k credit / topup</td><td className="tabnums text-right">€ 50,000</td><td>Easy ask if seller insists on price.</td></tr>
            <tr><td>Sauna / steam-room build-out post-handover credit</td><td className="tabnums text-right">€ 75,000</td><td>Trophy concession; seller can route via in-house contractors.</td></tr>
            <tr><td>Furniture upgrade allowance (€50k bespoke)</td><td className="tabnums text-right">€ 50,000</td><td>For specific Minotti pieces you want replaced.</td></tr>
            <tr><td>Übergabe at 90 days (vs 30) with seller carrying utilities</td><td className="tabnums text-right">€ 20,000</td><td>Useful if your timeline allows.</td></tr>
            <tr><td>Seller-paid Notar &amp; Grundbuch</td><td className="tabnums text-right">€ 133,500</td><td>Unusual but possible at distressed end.</td></tr>
            <tr className="bg-parchment"><td><strong>Maximum stackable bundle</strong></td><td className="tabnums text-right"><strong>≈ € 700,000–€ 950,000</strong></td><td><strong>Equivalent to ~9 % effective price reduction.</strong></td></tr>
          </tbody>
        </table>
        <Sub>How to deploy the ladder</Sub>
        <p>
          The mistake at this price band is asking for everything at once. The right play is to stack
          concessions in rising order: <em>information items</em> (free for seller, valuable to you) early,
          <em> contractual protections</em> (warranty, inventory annex) at mid-round, <em>price-equivalent
          credits</em> (landscaping, sauna, bespoke finishing) only at the final round.
        </p>
        <p>
          Each concession should be costed in your offer letter so the seller sees the trade-off explicitly.
          That moves the conversation from “you keep pushing me down” to “we are negotiating a portfolio of
          terms”.
        </p>
      </Section>

      <Section id="playbook" kicker="10" title="Round-by-round playbook (scripts)">
        <p>
          The exact language of a negotiation matters more at this price band than at any other. German
          real-estate culture rewards <em>Sachlichkeit</em> (objectivity) and <em>Vorbereitung</em>{" "}
          (preparation). Show both in every written communication.
        </p>

        <Sub>Round 0 — Initial agent contact</Sub>
        <Script
          role="You → Agent (email)"
          body={
            <>
              Sehr geehrte Frau Scherbel, mit Interesse haben wir das Exposé W-030N05 zur Klenzestraße 22
              gelesen. Wir bereiten eine ernsthafte Kaufentscheidung für ein Hauptwohnsitz-Objekt im
              €5–10M-Band rund um den Starnberger See vor und betrachten die Klenzestraße als eines von
              mehreren Objekten in der engeren Auswahl. Bevor wir einen Besichtigungstermin vereinbaren,
              wären folgende Unterlagen für unsere Bewertung hilfreich: (1) Energieausweis mit
              Berechnungsgrundlage, (2) Bauträger-Abnahmeprotokoll, (3) Item-Liste der Minotti-Möblierung,
              (4) KNX-Übergabedokumentation, (5) Bohranzeige der Erdwärmesonden, (6) Lageplan mit
              Bodenrichtwert-Eintragung. Mit freundlichen Grüßen…
            </>
          }
        />
        <p>
          <em>Signal:</em> You are serious, technically prepared, and price-disciplined. You are not the
          buyer who falls in love at the viewing.
        </p>

        <Sub>Round 1 — Opening offer (€7.25M)</Sub>
        <Script
          role="You → Agent (formal offer letter)"
          body={
            <>
              Nach Besichtigung und auf Grundlage der vorliegenden Unterlagen sowie unserer eigenen
              Markt-Analyse möchten wir hiermit ein verbindliches Kaufpreisangebot in Höhe von{" "}
              <strong>€ 7.250.000</strong> für die Liegenschaft Klenzestraße 22 unterbreiten.{" "}
              <br /><br />
              Unser Angebot beruht auf folgenden Überlegungen: (1) Der Bodenrichtwert für die betreffende
              Parzelle laut BORIS-Bayern liegt bei rund €2.000/m². Bei 1.831 m² entspricht das einem
              Grundstückswert von ca. €3,66M. (2) Die rekonstruierten Bauwerkskosten für eine A+ -KfW-40+
              -Spezifikation in dieser Größenordnung liegen bei rund €5,25M inkl. Pool, Garage und
              Außenanlagen. (3) Der Vergleichsmarkt — Söcking-Südhang Anwesen €9,8M (2024) abzüglich
              Lage-Differenzial — sowie der ImmoScout24-WohnBarometer für die Region untermauern eine
              faire Wertspanne von €7,6–8,0M. <br /><br />
              Das Angebot setzt zusätzlich voraus: <br />
              • Beidseitige Käuferprovision-Kappung bei 2,98 % brutto <br />
              • Notariell beurkundete Inventarliste der Minotti-Möblierung als Anlage zum Kaufvertrag <br />
              • 5 %-ige Gewährleistungsbürgschaft des Bauträgers (gemäß § 632a BGB / VOB) <br />
              • Zugang für unseren Bausachverständigen 14 Tage vor Notartermin <br /><br />
              Unser Angebot ist <strong>10 Werktage</strong> gültig. Wir sind als
              Eigenkapital-/Cash-Käufer aufgestellt und können einen Notartermin innerhalb von 6 Wochen
              ab Annahme einrichten.
            </>
          }
        />

        <Sub>Round 2 — Counter (expect €8.4–8.6M)</Sub>
        <p>
          The seller will almost certainly counter in the €8.4–8.6M band. Their goal is to anchor you
          upward. Your response:
        </p>
        <Script
          role="You → Agent (response)"
          body={
            <>
              Wir danken für Ihr Gegenangebot in Höhe von €8.500.000 und respektieren die Position des
              Verkäufers. Allerdings verfügen wir aktuell über zwei weitere Objekte in der engeren Auswahl
              (Berg-Aufkirchen und Pöcking-Niederpöcking, jeweils im Bereich €7,2–8,0M), die jeweils
              vergleichbare Wohnflächen bei größeren Grundstücken bieten. Vor diesem Hintergrund können
              wir unser Angebot auf <strong>€ 7.600.000</strong> erhöhen, einschließlich der zuvor
              genannten Konditionen sowie zusätzlich der schriftlichen Bestätigung der A952-Lärm-
              Exposition (idealerweise mit Gutachten) und der KNX-Integrator-Servicegarantie für 12
              Monate.
            </>
          }
        />
        <p>
          <em>Tactical note:</em> You have <strong>named two specific competing properties</strong>. This
          is the single most powerful credibility move in a German real-estate negotiation. The agent can
          and will verify this is plausible by looking at recent listings. Have actual properties in mind
          before you make this claim.
        </p>

        <Sub>Round 3 — Mid-cycle (expect €8.2–8.3M)</Sub>
        <Script
          role="You → Agent"
          body={
            <>
              Wir nähern uns einer Einigung. Unser finales Angebot — vorbehaltlich der noch ausstehenden
              technischen Prüfung — beträgt <strong>€ 7.800.000</strong>. Das ist 12,4 % unter dem
              ursprünglichen Angebotspreis und entspricht damit dem Mittelwert vergleichbarer
              Transaktionen in der Region 2024–2025. Wir sind bereit, einen Vorvertrag mit 10 %
              Anzahlung innerhalb von 14 Tagen zu unterschreiben.{" "}
              <br /><br />
              Sollte der Verkäufer auf einem höheren Preis bestehen, müssten folgende zusätzliche
              Konditionen erfüllt sein: (a) 10-jährige verlängerte Bauträger-Gewährleistung, (b) €100k
              Sonderausstattungs-Guthaben für noch ausstehende Wünsche, (c) Maklerprovision-Deckelung bei
              2,0 % brutto. Diese Zugaben repräsentieren einen wirtschaftlichen Wert von ca. €350k und
              könnten einen Aufschlag bis €8,15M rechtfertigen.
            </>
          }
        />

        <Sub>Round 4 — Final or walk</Sub>
        <p>
          If the seller refuses to come below €8.2M without concessions: walk. If the seller agrees to a
          bundle that lands you at €7.8–8.0M cash with concessions worth €300–500k, close.
        </p>
        <Script
          role="You → Agent (walk version)"
          body={
            <>
              Wir bedauern, dass eine Einigung in der Wertspanne, die unsere Marktanalyse rechtfertigt,
              nicht möglich war. Wir ziehen unser Angebot zurück und konzentrieren uns auf die anderen
              Objekte in unserer Auswahl. Sollte sich der Verkäufer in den kommenden 60–90 Tagen
              umentscheiden, würden wir uns über eine erneute Kontaktaufnahme freuen. Wir danken Ihnen
              für die professionelle Beratung.
            </>
          }
        />
        <p>
          <em>Walking is a tactic, not a defeat.</em> The 60–90 day re-entry window is a real negotiation
          tool — see Section 15.
        </p>
      </Section>

      <Section id="probability" kicker="11" title="Probability tree & expected value">
        <p>
          The negotiation outcome is not deterministic. Modelling it as a probability tree clarifies
          which moves maximise <em>expected</em> value, not just the best-case outcome.
        </p>
        <table className="editorial">
          <thead>
            <tr><th>Path</th><th>Probability</th><th>Close price</th><th>Concession value</th><th>Net cash equivalent</th><th>Comment</th></tr>
          </thead>
          <tbody>
            <tr><td>A. Seller accepts R1 (€7.25M)</td><td className="tabnums">5 %</td><td className="tabnums">€ 7.25 M</td><td className="tabnums">€ 200k</td><td className="tabnums">€ 7.05 M effective</td><td>Rare; happens if seller in distress.</td></tr>
            <tr><td>B. Settles at R2 (€7.60M)</td><td className="tabnums">15 %</td><td className="tabnums">€ 7.60 M</td><td className="tabnums">€ 350k</td><td className="tabnums">€ 7.25 M effective</td><td>Plausible if seller is Bauträger w/ deadline.</td></tr>
            <tr><td>C. Settles at R3 (€7.80M)</td><td className="tabnums">30 %</td><td className="tabnums">€ 7.80 M</td><td className="tabnums">€ 500k</td><td className="tabnums">€ 7.30 M effective</td><td>Most likely landing zone.</td></tr>
            <tr><td>D. Settles at R4 (€8.00M)</td><td className="tabnums">20 %</td><td className="tabnums">€ 8.00 M</td><td className="tabnums">€ 600k</td><td className="tabnums">€ 7.40 M effective</td><td>Your stated ceiling; full concession bundle.</td></tr>
            <tr><td>E. Settles above €8.0M (you walk)</td><td className="tabnums">20 %</td><td className="tabnums">— (walk)</td><td className="tabnums">—</td><td className="tabnums">substitute purchase</td><td>You buy in Berg / Pöcking instead.</td></tr>
            <tr><td>F. Re-entry at €7.8–8.0M after walk</td><td className="tabnums">10 %</td><td className="tabnums">€ 7.85 M</td><td className="tabnums">€ 400k</td><td className="tabnums">€ 7.45 M effective</td><td>Seller re-engages within 60–90 days.</td></tr>
            <tr className="bg-parchment">
              <td><strong>Probability-weighted expected close (paths A–D, F)</strong></td>
              <td className="tabnums">80 %</td>
              <td className="tabnums">€ 7.83 M</td>
              <td className="tabnums">€ 480k</td>
              <td className="tabnums"><strong>€ 7.35 M effective</strong></td>
              <td>Excludes walk-substitute path.</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4">
          <strong>Reading:</strong> the probability-weighted expected close is <span className="tabnums">€7.83M</span>{" "}
          with <span className="tabnums">€480k</span> of concession value, for an effective economic position
          of <span className="tabnums">€7.35M</span>. That is 17 % below the current ask. The 20 % walk
          probability is your insurance — without it, the seller has no reason to move.
        </p>
        <Sub>Sensitivity to seller type</Sub>
        <p>
          If you can confirm the seller is the Bauträger (not a flip), shift 10 % probability from path D to
          path C — Bauträger have lower price floors. If you confirm flip-investor, shift 10 % from path C to
          path E — flippers are less elastic and the walk path becomes more likely.
        </p>
      </Section>

      <Section id="cash" kicker="12" title="Cash vs financed posture">
        <p>
          Posture matters as much as price. At €7.5–8.0M, the seller’s certainty premium for an all-cash
          buyer is real and quantifiable.
        </p>
        <Sub>Cash-buyer premium to the seller</Sub>
        <ul>
          <li>No financing-contingency risk (typical financed-buyer deals fall through 5–8 % of the time at this price band — see Aigner / IVD data).</li>
          <li>Faster Notartermin (4–6 weeks vs 8–12 weeks for financed).</li>
          <li>No bank Wertgutachten (which can re-anchor downward if the appraisal comes in low).</li>
          <li>Certainty of funds at notarial date.</li>
        </ul>
        <p>
          Quantified seller benefit: <strong>€100–200k of cash-equivalent</strong> at this price band. Use
          it explicitly: “Als Eigenkapital-/Cash-Käufer können wir innerhalb von 4 Wochen abschließen ohne
          Finanzierungsvorbehalt — dieser Vorteil rechtfertigt einen Preisabschlag von ca. €150k.”
        </p>
        <Sub>If you finance</Sub>
        <ul>
          <li>10-yr Bauzins at 3.40–3.60 %. On 50 % LTV (€4.0M loan), monthly payment ≈ €17,500 (interest only) or €19,400 (1 % Tilgung).</li>
          <li>Total cost of capital over 10 years: ~€2.1M interest + €0.4M Tilgung repayment savings.</li>
          <li>Wait for next ECB cycle: rates likely to drift down 25–50 bp through 2026; not worth waiting unless it shifts decisively below 3.0 %.</li>
          <li>Pre-approval (Finanzierungszusage) in hand <em>before</em> offer is mandatory. Without it, your offer is treated as 80 % credibility.</li>
        </ul>
        <Sub>Hybrid strategy (recommended)</Sub>
        <p>
          Lead with “cash up to €8.0M, financing capacity above” — gives you posture flexibility without
          committing. Submit Finanzierungszusage even if you intend to pay cash; it costs nothing and
          eliminates the seller’s tail risk.
        </p>
      </Section>

      <Section id="timing" kicker="13" title="Timing & windows">
        <p>
          Timing is the single most underused lever in German real-estate negotiation. The seller’s carry
          cost is concrete; the buyer’s patience is free.
        </p>
        <Sub>Seasonal pattern</Sub>
        <ul>
          <li><strong>March–June:</strong> primary selling season. Sellers most motivated to close before summer holidays. <em>Best buyer leverage in March–early May (post-Easter pickup) and late May (pre-holiday close).</em></li>
          <li><strong>July–August:</strong> dead season. Few transactions. Sellers who carry into September face full carry through to Christmas.</li>
          <li><strong>September–October:</strong> secondary selling season. Sellers who missed spring re-anchor lower.</li>
          <li><strong>November–February:</strong> dead. Carry pressure accumulates. <em>Best price discovery in late January (sellers planning year-ahead) and February (pre-spring listing competition).</em></li>
        </ul>
        <Sub>Specific timing for this listing</Sub>
        <p>
          The exposé is dated December 2025. The €1M price cut likely landed Jan–Feb 2026 (typical 6–10
          week pattern between initial listing and first cut). We are currently in <strong>May 2026</strong>{" "}
          — peak selling-window pressure. The seller’s window to clear before summer dead-season ends
          around <strong>June 20</strong>. If you can close before then, you remove a major source of seller
          anxiety; if you can credibly threaten to disengage until October, you expose them to another full
          carry cycle.
        </p>
        <Sub>Response windows you set</Sub>
        <ul>
          <li>R1 offer validity: 10 business days. Short enough to force engagement; long enough to be plausible.</li>
          <li>R2 / R3 offer validity: 7 business days. Pace accelerates.</li>
          <li>R4 final offer validity: 5 business days. “Take it or we walk by Friday.”</li>
          <li>Walk-and-wait: at least 60 days before any re-engagement. Don’t cheapen the walk.</li>
        </ul>
        <Sub>Move-out / Übergabe timing</Sub>
        <p>
          Offer flexibility on Übergabe date as a free concession. If your move-in flexibility is 30–120
          days, offer 120 days — the seller may use the time for tax planning, and you’ve cost yourself
          nothing.
        </p>
      </Section>

      <Section id="walk" kicker="14" title="Walk-away protocols">
        <p>
          A walk is only useful if it is credible. Credible walks share four properties: pre-announced,
          numerically anchored, accompanied by named alternatives, and silent after delivery.
        </p>
        <Sub>Triggers — when to walk</Sub>
        <ol>
          <li><strong>Hard:</strong> Seller refuses to come below €8.2M cash-only (no concessions).</li>
          <li><strong>Hard:</strong> Seller refuses to provide item-level Minotti inventory.</li>
          <li><strong>Hard:</strong> Seller refuses Bausachverständigen access pre-signing.</li>
          <li><strong>Hard:</strong> Bauträger / SPV cannot or will not provide 5 % Gewährleistungsbürgschaft.</li>
          <li><strong>Hard:</strong> BRW pull or A952 noise inspection reveals material misrepresentation.</li>
          <li><strong>Soft:</strong> Seller communication delays (no response &gt; 10 days) — re-anchor and request explanation.</li>
          <li><strong>Soft:</strong> Multiple price-floor mentions from agent (“The seller cannot go below…”) — suggests scripted defence; press through it.</li>
        </ol>
        <Sub>The walk letter</Sub>
        <Script
          role="You → Agent"
          body={
            <>
              Sehr geehrte Frau Scherbel, nach interner Bewertung müssen wir leider feststellen, dass die
              vom Verkäufer geforderte Preisspanne unsere Wertanalyse übersteigt. Wir ziehen unser Angebot
              hiermit zurück und werden uns auf andere Objekte in unserer Auswahl konzentrieren. Wir
              danken Ihnen für die professionelle Begleitung des Prozesses. Für den Fall, dass sich die
              Preisvorstellung des Verkäufers in den kommenden Monaten anpasst, stehen wir grundsätzlich
              weiterhin als Kaufinteressent zur Verfügung. Mit freundlichen Grüßen…
            </>
          }
        />
        <Sub>What not to do after walking</Sub>
        <ul>
          <li>Do not call to “check in”. Silence is the entire point.</li>
          <li>Do not increase your last offer in any communication.</li>
          <li>Do not have someone else (spouse, advisor) re-engage on your behalf — agents read it as weakness.</li>
          <li>Do not engage with other E&amp;V Fünf Seen Land listings via the same agent until 30+ days have passed — the agent network reports across the office.</li>
        </ul>
        <Sub>What the seller does after you walk</Sub>
        <p>
          Typical pattern: (1) reassessment with the agent over 2–4 weeks; (2) price reduction or
          re-listing at €8.4–8.6M; (3) agent reaches out to you within 60–90 days if no other serious bid
          has materialised. The probability of the seller re-engaging at or near your final offer within 6
          months: ~30–45 % based on observed dwell-time / price-cut patterns for €7M+ Munich-region
          listings.
        </p>
      </Section>

      <Section id="reentry" kicker="15" title="Re-entry strategy">
        <p>
          If the agent reaches out within 60–90 days, do not jump. Re-establish your terms calmly.
        </p>
        <Script
          role="Agent → You (typical re-engagement)"
          body={
            <>
              “Sehr geehrte Familie…, wie geht es Ihnen? Der Verkäufer der Klenzestraße wäre nun bereit,
              über einen Preis im Bereich €8,3M zu sprechen. Sollten Sie noch Interesse haben…”
            </>
          }
        />
        <Script
          role="You → Agent"
          body={
            <>
              Danke für die Rückmeldung. Wir haben unsere Suche in der Zwischenzeit aktiv weitergeführt,
              haben aber die Klenzestraße tatsächlich noch im Blick. Unsere Wertanalyse hat sich nicht
              verändert; wir wären bereit, ein erneutes Angebot in Höhe von <strong>€ 7.700.000</strong>{" "}
              zu unterbreiten, einschließlich der bereits diskutierten Konditionen (Inventarliste,
              Provisionskappung 2,5 %, Gewährleistungsbürgschaft 5 %, Bausachverständigen-Zugang).
              Sollte der Verkäufer dieses Angebot annehmen können, können wir innerhalb von 6 Wochen
              abschließen.
            </>
          }
        />
        <Sub>Why €7.70M (not your original final ceiling of €8.00M)</Sub>
        <p>
          The walk and the seller’s subsequent re-engagement <em>shift</em> the bargaining range downward.
          The seller has spent another 60–90 days carrying the property, has not received better offers,
          and is now in a weaker position. Reflect that in your re-anchored offer. Do not reward
          the seller for taking your walk seriously by paying your prior ceiling — pay below it.
        </p>
        <Sub>Re-entry concessions</Sub>
        <p>
          Demand <em>more</em> concessions on re-entry, not fewer. Your leverage has increased. Add a
          €50k landscaping credit, a 12-month KNX service contract, and a 3-yr property-management
          handoff if useful.
        </p>
      </Section>

      <Section id="contract" kicker="16" title="Kaufvertrag clauses to demand">
        <p>
          The Notar drafts the Kaufvertrag, but the buyer can request specific clauses. At this price
          band, the following are standard demands — refusal is a red flag and itself a negotiation point.
        </p>
        <Sub>Mandatory clauses (do not sign without)</Sub>
        <ol>
          <li>
            <strong>Detailed Inventarliste (Anlage 1).</strong> Item-level inventory of the Minotti
            furnishing with model numbers, photographs, individual replacement values, and the seller’s
            obligation to replace any damaged or missing item at full cost before Übergabe.
          </li>
          <li>
            <strong>Gewährleistungsbürgschaft (§ 632a BGB / VOB/B § 17).</strong> 5 % of build cost
            (≈ €260k on €5.25M build) held by a bank as performance bond for 5 years post-Übergabe.
            Standard at Bauträger sales of new builds.
          </li>
          <li>
            <strong>Rücktrittsrecht bei Mangel (§ 323 BGB).</strong> Buyer right to withdraw if material
            defects discovered post-signing, pre-Übergabe.
          </li>
          <li>
            <strong>Lastenfreistellung (§ 875 BGB).</strong> Seller’s obligation to clear all encumbrances
            (mortgages, easements, Bauträger financing) before Eintragung des Eigentumswechsels in the
            Grundbuch. Standard.
          </li>
          <li>
            <strong>Anzahlung / Sicherheit.</strong> 10 % Anzahlung on Notartermin, deposited in
            Notaranderkonto, released to seller only at Lastenfreistellung. Standard.
          </li>
          <li>
            <strong>Energy data (Anlage 2).</strong> Energieausweis with Endenergiebedarf number,
            Energieklasse, Ausstellungsdatum, supporting Berechnung, and Bauunterlagen confirming the A+
            class — all annexed to the contract.
          </li>
          <li>
            <strong>Technical handover (Anlage 3).</strong> KNX ETS project file, geothermal Bohranzeige
            and wasserrechtliche Erlaubnis, HVAC commissioning protocols, Hersteller-Inbetriebnahme-
            Protokolle for major systems — all transferred at Übergabe.
          </li>
        </ol>
        <Sub>Recommended additional clauses</Sub>
        <ol start={8}>
          <li>
            <strong>Schadensersatz bei Verzögerung.</strong> Liquidated damages if Übergabe is delayed
            past the contractually agreed date (e.g. €5k/week of delay).
          </li>
          <li>
            <strong>Notarrückforderungsrecht (§ 311b BGB).</strong> Standard escape from Kaufvertrag if
            seller cannot deliver title or essential conditions.
          </li>
          <li>
            <strong>Bauträger-Mängel post-Übergabe.</strong> Defined process: written notification within
            14 days, seller’s obligation to remediate within 30 days, alternative remediation by buyer
            with right of cost recovery.
          </li>
          <li>
            <strong>Provisionsanspruch verzichtsklausel.</strong> Explicit acknowledgement that the
            commission is final and that no additional fees apply, with the agreed commission rate
            written in.
          </li>
          <li>
            <strong>Konkurrenzschutz Bauträger.</strong> If you suspect the seller is also developing
            adjacent parcels: a clause restricting density / height of any subsequent build on neighbouring
            plots owned by the same Bauträger for X years. Unusual but possible.
          </li>
        </ol>
      </Section>

      <Section id="diligence" kicker="17" title="Diligence as negotiation lever">
        <p>
          Every diligence step is also a negotiation move. Either it confirms the asking price (rare), or
          it surfaces a finding that justifies a further reduction. Sequence them deliberately.
        </p>
        <table className="editorial">
          <thead>
            <tr><th>Step</th><th>Cost</th><th>Time</th><th>Negotiation lever if adverse</th></tr>
          </thead>
          <tbody>
            <tr><td>BORIS-Bayern BRW pull for parcel</td><td className="tabnums">€ 0</td><td>Same day</td><td>BRW below €2,000/m² → demand price reduction € (2,000 − actual) × 1,831.</td></tr>
            <tr><td>Grundbuchauszug</td><td className="tabnums">€ 20–50</td><td>1–3 days</td><td>Encumbrances, easements, Erbbaurecht — each a price point.</td></tr>
            <tr><td>Flurkarte (Liegenschaftskataster)</td><td className="tabnums">€ 30</td><td>1–3 days</td><td>Boundary discrepancies vs exposé → re-anchor.</td></tr>
            <tr><td>LSG-Verordnung text (Landratsamt)</td><td className="tabnums">€ 0</td><td>1 week</td><td>Weakness in LSG protection → undermines “unverbaubarer Blick” claim → −5 to −8 % price.</td></tr>
            <tr><td>Flächennutzungsplan-Fortschreibung Söcking</td><td className="tabnums">€ 0</td><td>1 week</td><td>Adjacent density-increase plans → −5 to −10 %.</td></tr>
            <tr><td>HQ100 / Starkregen-Karte</td><td className="tabnums">€ 0</td><td>Same day</td><td>Unexpected exposure → −5 % + insurance cost.</td></tr>
            <tr><td>A952 Schallschutz / Lärmkartierung</td><td className="tabnums">€ 0 (own walk) or €1.5–3k (Gutachten)</td><td>1–3 weeks</td><td>Noise &gt; threshold → −3 to −8 %.</td></tr>
            <tr><td>Bausachverständigen-Begehung</td><td className="tabnums">€ 2.5–4k</td><td>1–2 weeks</td><td>Material defects → mandatory remediation budget; minor defects → €30–80k cosmetic credit.</td></tr>
            <tr><td>KNX integrator interview + ETS file review</td><td className="tabnums">€ 1–2k</td><td>1 week</td><td>Undocumented / incomplete commissioning → demand 12-month service contract or €15–30k credit.</td></tr>
            <tr><td>Bohranzeige + wasserrechtliche Erlaubnis check</td><td className="tabnums">€ 0</td><td>1 week</td><td>Missing permits → −€50–100k risk premium.</td></tr>
            <tr><td>Handelsregister-Auszug seller entity</td><td className="tabnums">€ 4.50</td><td>Same day</td><td>SPV with thin capital → demand Bürgschaft escalation.</td></tr>
            <tr><td>Energieausweis Berechnungsprüfung</td><td className="tabnums">€ 1–1.5k</td><td>1 week</td><td>Discrepancy vs class → contractual representation demand.</td></tr>
            <tr><td>Comparable transaction extract (Gutachterausschuss)</td><td className="tabnums">€ 30–50</td><td>2–4 weeks</td><td>Lower comps surfaced → re-anchor.</td></tr>
            <tr><td>Versicherungs-Angebot Wohngebäude high-value</td><td className="tabnums">€ 0</td><td>1 week</td><td>Insurance carrier flags risk → diligence question to seller.</td></tr>
            <tr><td>Bonität-Check Bauträger / SPV</td><td className="tabnums">€ 30–80</td><td>Same day</td><td>Weak rating → escalate warranty bond demand.</td></tr>
          </tbody>
        </table>
        <p className="mt-4">
          <strong>Sequencing:</strong> the free items first (BRW, FNP, LSG, HQ100, Handelsregister) before
          R1. The cheap-paid items (Grundbuch, Flurkarte, Energieausweis Prüfung) between R1 and R2. The
          most expensive (Bausachverständigen) between R3 and final signature, conditioned on contract.
        </p>
        <Sub>Diligence findings as concession currency</Sub>
        <p>
          When a diligence finding is adverse, do not threaten — present it as a fact and propose a price
          adjustment. Example: “Die LSG-Verordnung erlaubt für die südlich anschließende Parzelle eine
          Geschossigkeit von II + Dach. Dies relativiert die unverbaubare Sicht-Aussage des Exposés und
          rechtfertigt aus unserer Sicht einen Abschlag von €200k.”
        </p>
      </Section>

      <Section id="summary" kicker="18" title="One-page summary">
        <div className="callout">
          <div className="callout-title">The strategy in 10 lines</div>
          <ol className="text-[0.95rem] leading-[1.65]">
            <li><strong>Anchor on €7.84M trimmed-mean</strong> from five independent valuation lenses.</li>
            <li><strong>Open at €7.25M</strong> — credible-insult floor, formal letter with comp-derived rationale.</li>
            <li><strong>Three rounds of bids:</strong> €7.25M → €7.60M → €7.80M. €200–350k step-up signals serious counterparty.</li>
            <li><strong>Final ceiling €8.0M</strong> cash; <strong>€8.4M only with €350–500k concession bundle</strong> (inventory annex, 10-yr warranty bond, commission cap 2.0 %, finishing credit).</li>
            <li><strong>Walk above €8.0M.</strong> Substitute set in Berg / Pöcking / Tutzing / Söcking-Südhang is genuinely competitive.</li>
            <li><strong>Lead with cash-buyer posture</strong> (no financing contingency, 4–6 week close) — worth €100–200k to the seller.</li>
            <li><strong>Use diligence as currency:</strong> BRW, LSG, A952 noise, Bauträger entity check — each finding is a price adjustment.</li>
            <li><strong>Name two competing properties</strong> by neighbourhood at R2 to make BATNA visible.</li>
            <li><strong>Demand Inventarliste, Gewährleistungsbürgschaft, Bausachverständigen-Zugang</strong> as contractual standards — refusal is a walk trigger.</li>
            <li><strong>Walk silently, wait 60–90 days, re-engage below your prior ceiling</strong> — leverage has shifted further in your direction by then.</li>
          </ol>
        </div>
        <p className="mt-6 serif italic text-ink-700 text-[1.05rem]">
          The probability-weighted expected close is <strong>€7.83M with €480k of bundled concessions</strong> —
          an effective economic position of <strong>€7.35M</strong>, or 17 % below the current ask. The 20 %
          walk-probability is the insurance that makes the other 80 % possible.
        </p>
      </Section>

      <div className="rule-double mt-12 pt-6 source-cite">
        Negotiation deep-dive prepared 2026-05-11. Cross-references the Macro, Communities, Lakefront,
        Demographics, Policy/Climate and Competing-Markets dossiers in this portal. All figures rounded;
        not legal or investment advice — Notarvertragsklauseln in particular should be reviewed with a
        qualified Rechtsanwalt für Immobilienrecht before signing.{" "}
        <Link href="/property/klenzestrasse-22" className="underline">← Back to property memo</Link>
      </div>
    </article>
  );
}
