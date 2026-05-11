import Link from "next/link";

export const metadata = {
  title: "Methodology — Starnberger See Property Review",
  description:
    "How the data on this portal was assembled, what is directly sourced vs estimated, and the structural caveats every reader should know.",
};

function S({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 md:py-12 border-t border-rule">
      <div className="kicker mb-2">{kicker}</div>
      <h2 className="serif text-[1.7rem] text-ink-900 mb-4 leading-tight">{title}</h2>
      <div className="prose-editorial max-w-prose">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">How this portal was built</div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Methodology</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        A research portal is only as trustworthy as its methodology. This page documents how the
        numbers were sourced, what is directly observed vs estimated, the structural caveats every
        reader should know, and the refresh procedure.
      </p>

      <S kicker="01" title="Scope & decisions">
        <ul>
          <li><strong>Buyer profile:</strong> €5–10M primary residence at the Starnberger See.</li>
          <li><strong>Geography:</strong> Starnbergersee-first; Munich appears as macro and substitute context. Lakefront and near-lake stock has analytical priority over hillside Bestand.</li>
          <li><strong>Segment:</strong> Luxury single-family villas, €3M+. Apartments / ETW figures included for trend reference only.</li>
          <li><strong>Language:</strong> English copy throughout; German technical terms preserved where translation distorts meaning (e.g. <em>Bodenrichtwert</em>, <em>Familienheim</em>, <em>Bauträger</em>). See the <Link href="/glossary">Glossary</Link>.</li>
          <li><strong>Maintenance:</strong> One-time snapshot. Data vintage is Q1 2026 except where annotated.</li>
        </ul>
      </S>

      <S kicker="02" title="Data sources, in order of preference">
        <ol>
          <li><strong>Statutory / official:</strong> Bundesbank, Destatis, LfStat Bayern, Gutachterausschuss München / Landkreis Starnberg, BORIS-Bayern, LfU Bayern, DWD, BBSR, VGRdL, individual Gemeinde Haushaltssatzungen. These are anchor figures; everything else is calibrated to them.</li>
          <li><strong>Statute &amp; case law:</strong> Where the analysis turns on a legal regime (Bayerisches Wassergesetz, Baugesetzbuch, Denkmalschutz, GEG, Grundsteuer reform, Erbschaftsteuer Familienheim), the statute text or court rulings are cited.</li>
          <li><strong>Industry research:</strong> vdp, Empirica, BBSR; JLL, Colliers, Savills, Capgemini, BCG, Knight Frank for HNWI and prime-market data.</li>
          <li><strong>Broker market reports:</strong> Engel &amp; Völkers (Starnberger See, Tegernsee, Ammersee, Zürichsee, Como editions), Sotheby's, Von Poll, Starnberger See Immobilien, Riedel, Aigner. Critically: these are <em>asking-price</em> data, with sample-selection bias toward listed inventory.</li>
          <li><strong>Academic / think-tank:</strong> ifo, DIW, IfW, Deutsche Bank Research, dena.</li>
          <li><strong>Press archives:</strong> Süddeutsche Zeitung Starnberg, Münchner / Starnberger Merkur, Handelsblatt, FAZ, Bilanz (CH), Il Sole 24 Ore — used for individual transaction reporting and policy context.</li>
        </ol>
        <p>
          The full bibliography, with URLs, publishers and topic tags, is on the{" "}
          <Link href="/sources">Sources page</Link>.
        </p>
      </S>

      <S kicker="03" title="What's directly sourced vs estimated">
        <p>
          For each table on the portal, we use one of three confidence levels:
        </p>
        <ul>
          <li>
            <strong>🟢 Directly sourced.</strong> The number appears verbatim or near-verbatim in a named
            publication. Example: Bauzins year-end values from Bundesbank SUD 510 series, ECB policy rates from
            ECB press releases, Destatis HPI annual averages.
          </li>
          <li>
            <strong>🟡 Derived.</strong> The number is interpolated from adjacent reported series — e.g. quarterly
            published, but the table shows year-average; or P75 derived from published median and reported
            distribution shape; or annual figures cross-referenced from two consistent publications.
          </li>
          <li>
            <strong>🔴 Estimated.</strong> The publishable data does not segregate the segment of interest
            (typical for the &gt;€3M luxury cut), so we triangulate from broker P90 bands, notable-sale press
            reports, and ratio extrapolation. Always flagged explicitly.
          </li>
        </ul>
        <p>
          The most heavily-estimated tables are: luxury-segment medians (€3M+) in Munich and LK Starnberg,
          waterfront villa medians (insufficient n for stable medians), and the shore-gradient multiplier
          ladder (calibrated from anecdotal closes plus academic hedonic-pricing literature).
        </p>
      </S>

      <S kicker="04" title="Structural caveats every reader should know">
        <ol>
          <li>
            <strong>Luxury-segment data is not published in German official sources.</strong> The Gutachterausschuss
            reports cover the full market with P75/P90 bands; segment-specific cuts (€3M+, lakefront, Bestand-vs-Neubau)
            are reconstructed from broker reports and notable-sale reporting. Expect ±10 % uncertainty on luxury medians.
          </li>
          <li>
            <strong>Gutachterausschuss LK Starnberg 2024 edition is delayed to Q3/Q4 2026.</strong> Primary-source
            data for LK Starnberg therefore stops at 2022. 2023–2025 figures rely on broker reports and
            commercial aggregators (ImmoScout24, Immowelt, Immobilienpreis-Ermittler) with their own caveats.
          </li>
          <li>
            <strong>Most figures are <em>Angebotspreise</em> (asking), not <em>Erzielter Kaufpreis</em> (realized).</strong>{" "}
            Realized prices in 2023–2024 corrected 3–7 % below asking. We retain asking for time-series
            continuity and flag where realized Gutachterausschuss medians diverge.
          </li>
          <li>
            <strong>€/m² for SFH is structurally noisy.</strong> Plot value dominates total price for villa
            segments. The Mio-€-per-object median is more stable but less granular. We report both.
          </li>
          <li>
            <strong>Press-reported transactions are not confirmed closes.</strong> Many of our reference trades
            (Leoni €38M, Garatshausen €26M etc.) are press reports without notarized confirmation. Treat as
            ranges, not point values.
          </li>
          <li>
            <strong>Bavaria Flächenmodell Grundsteuer is reported per-Gemeinde at Hebesatz level.</strong> The
            actual liability for a specific parcel depends on registered Wohnfläche and Grundstücksfläche. We
            present formulas and worked examples; for a specific property, the Finanzamt's Grundsteuerbescheid
            is authoritative.
          </li>
          <li>
            <strong>Currency conversions for Zürichsee and Como.</strong> CHF/EUR appreciated from ~0.92 (2015)
            to ~1.05 (2025). Local-currency CAGRs vs EUR-CAGRs differ materially.
          </li>
          <li>
            <strong>Shore-gradient model is illustrative, not predictive.</strong> The functional approximation{" "}
            <span className="font-mono text-sm">m ≈ 0.10 + 0.90·exp(−d/60)</span> is a calibration to
            anecdotal closes — useful for ordering but not for pricing.
          </li>
        </ol>
      </S>

      <S kicker="05" title="Where figures come from on each page">
        <table className="editorial">
          <thead><tr><th>Page</th><th>Primary sources</th></tr></thead>
          <tbody>
            <tr><td><Link href="/market">10-Year Market</Link></td><td>Bundesbank, Destatis, LfStat, Gutachterausschuss München, vdp, ImmoScout24, Aigner.</td></tr>
            <tr><td><Link href="/communities">Communities</Link></td><td>BORIS-Bayern, LfStat Gemeindedaten, E&amp;V/Sotheby's/Von Poll listings, individual Gemeinde Haushaltssatzungen, SZ/Merkur archives.</td></tr>
            <tr><td><Link href="/lakefront">Lakefront Premium</Link></td><td>BayWG, BayDSchG, FFH-Managementplan Starnberger See, BayVGH Seeuferweg rulings, E&amp;V Lake Property editions, hedonic-pricing literature.</td></tr>
            <tr><td><Link href="/trends/demographics">Demographics & Supply</Link></td><td>Destatis, LfStat, VGRdL, Capgemini/UBS/BCG/Knight Frank wealth reports, DIW Berlin, Deutsche Bank Research, IHK München, Empirica.</td></tr>
            <tr><td><Link href="/trends/policy-climate">Policy & Climate</Link></td><td>Statute texts (BayGrStG, GEG, ErbStG, BauGB), LfU Hochwassergefahrenkarten, DWD Klimareport Bayern, dena Gebäudereport.</td></tr>
            <tr><td><Link href="/trends/competing-markets">Competing Markets</Link></td><td>E&amp;V Tegernsee/Ammersee/Zürichsee/Como, Wüest Partner (CH), Tecnocasa (IT), Agenzia delle Entrate OMI, Knight Frank PIRI.</td></tr>
            <tr><td><Link href="/property/klenzestrasse-22">Property memo</Link></td><td>The Engel &amp; Völkers exposé W-030N05 (Dec 2025) cross-referenced with all of the above.</td></tr>
          </tbody>
        </table>
      </S>

      <S kicker="06" title="Refresh procedure">
        <p>
          This portal is a one-time snapshot dated 2026-05-11. To refresh — recommended quarterly —
          repeat the following:
        </p>
        <ol>
          <li>Pull the most recent <strong>Gutachterausschuss München Halbjahres-/Herbstreport</strong> and the LK Starnberg <em>Grundstücksmarktbericht</em> (when published).</li>
          <li>Pull the current <strong>Bundesbank Bauzinsen Zinsstatistik</strong>, <strong>ECB policy rates</strong>, and <strong>Destatis HPI / Baupreisindex</strong> quarterly press releases.</li>
          <li>Pull the latest <strong>vdp-Immobilienpreisindex</strong> quarterly release.</li>
          <li>Pull the latest <strong>E&amp;V Marktreport Starnberger See</strong> edition.</li>
          <li>Pull <strong>ImmoScout24 WohnBarometer</strong> and <strong>Aigner Halbjahresbilanz</strong>.</li>
          <li>Check Gemeinde Haushaltssatzungen for any Hebesatz adjustments.</li>
          <li>Update Empirica Blasenindex Rückschlagpotenzial figure.</li>
          <li>Update notable-transactions list from SZ / Merkur / Handelsblatt archives.</li>
        </ol>
        <p>All updates are made to the typed data layer (<code className="text-xs">src/lib/sources.ts</code> and equivalent), not to page copy directly. Page copy renders from the data layer.</p>
      </S>

      <S kicker="07" title="What this portal is, and what it is not">
        <p>
          <strong>This portal is:</strong> a private research compendium prepared for a single
          prospective buyer evaluating a primary residence at the Starnberger See. It synthesises
          public, official, industry, broker, academic, legal and press sources into a single
          coherent reference.
        </p>
        <p>
          <strong>This portal is not:</strong> a valuation report, an investment recommendation, a
          legal opinion, or a substitute for commissioned diligence on a specific property. The
          numbers presented support thinking, not signing. For any specific transaction, commission
          a Bausachverständigen-Begehung, a Notar-Vertragsprüfung, a tax advisor (Steuerberater)
          briefing on your specific Erbschaftsteuer / Familienheim situation, and where appropriate a
          formal Wertgutachten from a licensed Sachverständiger.
        </p>
      </S>

      <div className="rule-double mt-12 pt-6 source-cite">
        Methodology last revised 2026-05-11. Questions or methodological objections welcome — they
        improve the portal. <Link href="/sources" className="underline">See all sources →</Link>
      </div>
    </article>
  );
}
