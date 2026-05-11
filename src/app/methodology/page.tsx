import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { Callout } from "@/components/Callout";

export default function MethodologyPage() {
  return (
    <>
      <PageHeader
        kicker="Reference"
        title="Methodology."
        standfirst={
          <>
            How each chart, table, and estimate on this portal is constructed — and where assumptions
            enter the picture. This is the honest caveat page.
          </>
        }
      />
      <Section>
        <SectionHeader kicker="Principle" title="Public sources, documented assumptions." />
        <Prose>
          <p>
            Every number comes from a public or industry-published source, cited on the Sources page and
            footnoted beneath each figure. Where the underlying data is aggregate and we've had to
            disaggregate (e.g. luxury subsets inside a Kreis median, per-community trajectories), the
            process is documented here and flagged in the chart caption with a note or italic qualifier.
          </p>
          <p>
            No listing-level scraping, no proprietary databases. The goal is reproducibility: a reader
            with the same source bundle should be able to re-run every calculation.
          </p>
        </Prose>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Time series" title="Market data — 25-year view, with confidence flags." />
        <Prose>
          <p>
            Every headline series runs 2000–2025 (26 full years), with two exceptions: Munich ETW price
            medians at the per-percentile level are re-anchored to Gutachterausschuss data starting 2000,
            and the LK Starnberg lakefront-villa median is a reconstructed series with declining precision
            pre-2010 (details below).
          </p>
          <h3 className="serif text-[1.2rem] text-ink-800 mt-4">Authoritative 2000–2025 series</h3>
          <p>
            These series come straight from public statistics offices and require no reconstruction:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Destatis HPI / BPI</strong> — quarterly since 2000; we use annual averages. Rebased to 2015=100.</li>
            <li><strong>Bundesbank Bauzins (10-yr fixed residential)</strong> — monthly since 2003; 2000–2002 from Bundesbank MFI retrospective series.</li>
            <li><strong>ECB key rates and 10Y Bund yield</strong> — since 1999 / 1970s respectively.</li>
            <li><strong>Destatis / LfStat population and disposable income</strong> — annual since 2000.</li>
            <li><strong>LfStat building permits and completions</strong> — annual since 2000 for LK Starnberg and Munich city.</li>
          </ul>
          <h3 className="serif text-[1.2rem] text-ink-800 mt-4">Reconstructed — Munich ETW & SFH (2000–2014)</h3>
          <p>
            Asking-price medians and percentiles are reconstructed from Gutachterausschuss München
            Jahresmarktberichte (historical editions), IVD Süd Preisspiegel archive, JLL and Savills
            Munich residential reports back-catalogue, and LBS Research retrospective files. Precision:
            ±5 % on the median, ±10 % on P90. Where two publishers disagree materially, the
            Gutachterausschuss figure is authoritative.
          </p>
          <h3 className="serif text-[1.2rem] text-ink-800 mt-4">Reconstructed — LK Starnberg (2000–2014)</h3>
          <p>
            Starnberg town SFH €/m² and Kreis-median SFH € reconstructed from Gutachterausschuss Landkreis
            Starnberg historical reports and BORIS-Bayern BRW snapshots. Precision ±8 % on SFH medians.
            <strong> Lakefront villa median pre-2010 is the weakest series in the portal</strong> — only
            1–3 public press prints per year in the €2–5M band, so each data point is a plausible
            reconstruction rather than a transaction record. Precision flag: ±15 % for 2000–2009, ±10 %
            for 2010–2014, ±5 % from 2015 onward as E&V / Sotheby's annual reports become granular.
          </p>
          <h3 className="serif text-[1.2rem] text-ink-800 mt-4">Competing-markets price index (2000–2025)</h3>
          <p>
            Each market is rebased to 2015=100 using its own headline publisher: vdp residential index for
            Germany overall; Gutachterausschuss Miesbach for Tegernsee; Landsberg / Weilheim-Schongau for
            Ammersee; Rosenheim for Chiemsee; UBS Swiss Real Estate Bubble Index for Zürich; ISTAT /
            Tecnocasa for Como. Pre-2015 points are reconstructed from the same publishers' older archive
            plus BIS / ECB national series. Italy pre-2010 is the noisy one — Italian regional housing
            indices have well-known coverage gaps.
          </p>
          <h3 className="serif text-[1.2rem] text-ink-800 mt-4">Notable transactions</h3>
          <p>
            Direct-lakefront transactions above ~€10M are typically reported in the local press (SZ,
            Merkur) and national business press (Handelsblatt, FAZ). Ranges are press-reported; clearing
            prices rarely public. We include only transactions with ≥2 independent press references where
            possible.
          </p>
        </Prose>
      </Section>

      <Section>
        <SectionHeader kicker="Reconstructed series" title="Per-community trajectories." />
        <Prose>
          <p>
            The small-multiples grid on the Market and Communities pages reconstructs each lakefront
            community's SFH €/m² trajectory on a unified 2015→2025 axis. Raw community-level yearly
            series are not published; the Gutachterausschuss publishes medians at the Kreis level, with
            selected community ranges in the narrative text.
          </p>
          <p>Our reconstruction:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Anchor each community's 2025 SFH €/m² to the value in the E&V Marktreport and community dossier.</li>
            <li>Apply the community-specific 5-yr appreciation rate (2020→2025) published by E&V / Von Poll.</li>
            <li>Extend 2015→2020 using the Kreis-level shape, scaled by community-specific leverage to the Munich ETW index (higher for near-Munich communities like Starnberg/Pöcking, lower for south-shore like Bernried/Seeshaupt).</li>
            <li>Impose the 2022 peak / 2024 trough pattern observed at the Kreis level.</li>
          </ol>
          <p>
            These are <em>illustrative</em> trajectories, not transaction records. The calibration targets
            the 2025 median and the 5-year appreciation; the path is a shape estimate.
          </p>
        </Prose>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Lakefront" title="Shore gradient & parcel estimates." />
        <Prose>
          <p>
            The shore-gradient curve uses two exponential decay functions calibrated against published
            Bodenrichtwerte and press-reported transactions:
          </p>
          <ul className="list-disc pl-6 space-y-1 font-mono text-sm">
            <li>with-view: m(d) = 0.10 + 0.90 · exp(−d/60)</li>
            <li>no-view: m(d) = 0.10 + 0.30 · exp(−d/80)</li>
          </ul>
          <p>
            where <em>d</em> is metres from the waterline and <em>m(d)</em> is the multiplier on
            direct-lakefront €/m². The constants 0.10 are the inland no-view asymptote; 0.90 and 0.30 are
            the added premium for view vs no-view; 60 and 80 metres are characteristic decay lengths. The
            curve is consistent with Starnbergersee empirical 6–10× lakefront-to-hillside spread within
            the same Gemeinde.
          </p>
          <p>
            Parcel counts are our estimate. Shoreline kilometres are measured from the Gemeinde cadastral
            boundary; private-tradeable share is reduced for the Wittelsbach / Kloster / state / NSG
            fraction; per-parcel density is taken as ~14–22 parcels per private shore-km (tighter north,
            looser south). Annual turnover is the 2019–2024 average of direct-lakefront transactions as
            reported by E&V, Sotheby's, and press.
          </p>
        </Prose>
      </Section>

      <Section>
        <SectionHeader kicker="Signals" title="Composite scoring." />
        <Prose>
          <p>
            Each of the 14 signals is classed bullish (+1), neutral-bullish (+0.5), neutral (0),
            neutral-bearish (−0.5) or bearish (−1). The composite is the average of these 14 scores,
            multiplied by 100 and rounded, to produce a −100 to +100 scale. This composite deliberately
            weights each signal equally; a weighted version would under-weight the sentiment-group
            against the supply-group. Future iterations may change the weighting; the unweighted
            composite is the safer default for an editorial portal.
          </p>
        </Prose>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Scenario tool" title="Monte-Carlo specification." />
        <Prose>
          <p>
            The scenario tool simulates 600 paths of the lakefront villa median €M over 5 or 10 years, in
            discrete annual steps. Per-step return is{" "}
            <span className="font-mono text-sm">r_t = μ − penalty + σ · ε_t</span>, with ε_t standard
            normal, plus a one-time multiplicative drop in year 2 if a supply shock is set. Parameters:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>μ base = 4.5% nominal (calibrated to 2015–2025 empirical lakefront CAGR)</li>
            <li>Rate-path penalty: +150 bp (hikes), +50 bp (flat), −50 bp (cuts)</li>
            <li>σ = 5% (no recession), 6.5% (mild), 9% (severe)</li>
            <li>Supply-shock drop: 0–15% one-time</li>
            <li>Seed = 42; reproducible across refreshes and browsers</li>
          </ul>
          <p>
            The fan chart plots the 10th, 25th, 50th, 75th, and 90th percentile outcomes at each forecast
            horizon. This is a stylised model — the purpose is to size the confidence interval, not the
            point estimate.
          </p>
        </Prose>
      </Section>

      <Section>
        <SectionHeader kicker="Tools" title="Comparator scoring & Total-cost." />
        <Prose>
          <p>The comparator radar scores eight axes 0–10:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>€/m²</strong>: inverted; centred on €8,000, 10 points / €800.</li>
            <li><strong>5-yr appreciation</strong>: linear, 10 points at +35%.</li>
            <li><strong>Commute</strong>: inverted; linear, 10 points at 25 min.</li>
            <li><strong>Schools</strong>: Gymnasium = +5, MIS ≤25 min = up to +5.</li>
            <li><strong>Tax friendliness</strong>: inverted on GewSt Hebesatz, 10 points at 240%.</li>
            <li><strong>Liquidity</strong>: population-proxy, capped at 10.</li>
            <li><strong>Lakefront depth</strong>: max lakefront villa / 3.5, capped at 10.</li>
            <li><strong>Prestige</strong>: 10 − rank × 1.2, floored at 0.</li>
          </ul>
          <p>
            Total-cost: GrESt 3.5%, Notar + Grundbuch 1.5%, Makler 3.57% brutto. Grundsteuer B =
            living m² × €0.50 × 70% × Hebesatz (Bavarian Flächenmodell, Land-portion excluded for
            simplicity). Maintenance €25/m²/yr; insurance 0.12% of price; utilities €38/m²/yr (scales
            with energy class). Retrofit = GEG class band midpoint × m². Lakefront overhead €8,000/yr
            flat. Zweitwohnungsteuer applied if not Hauptwohnsitz, as community rate × (€18/m²/mo × 12).
          </p>
        </Prose>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Refresh" title="How to update this portal." />
        <Prose>
          <p>
            This is a one-time snapshot as of Q1 2026. To refresh:
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Re-pull the most recent Gutachterausschuss reports for Munich and LK Starnberg.</li>
            <li>Update BORIS-Bayern Bodenrichtwerte (biennial stichtag).</li>
            <li>Bundesbank MFI rate series — monthly update.</li>
            <li>Destatis HPI and BPI — quarterly.</li>
            <li>Knight Frank Wealth Report + ifo Immobilien-Klima — annual / monthly respectively.</li>
            <li>Re-scan SZ / Merkur / Handelsblatt / FAZ archives for newly reported notable transactions.</li>
          </ol>
          <p>
            All data live in the TypeScript modules under <code className="font-mono text-sm">src/data/</code>.
            Updates are plain edits; every chart and table reads from those modules.
          </p>
        </Prose>
        <Callout tone="note" className="mt-4">
          This is private research, not investment advice. Nothing on this portal is a recommendation to
          buy, not-buy, or hold any specific property or asset class. Always verify specific transactions
          with a Notar, Steuerberater, and bauunabhängiger Sachverständiger in Bavaria.
        </Callout>
      </Section>
    </>
  );
}
