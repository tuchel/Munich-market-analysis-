import Link from "next/link";
import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { KpiCard } from "@/components/KpiCard";
import { Callout, Figure } from "@/components/Callout";
import { Section, Prose } from "@/components/Section";
import { SourceCite } from "@/components/SourceCite";
import { DualAxisChart } from "@/components/charts/DualAxisChart";
import { starnbergLk, transactions, rates, regimeMarks } from "@/data/timeseries";
import { compositeTemperature } from "@/data/signals";

export default function HomePage() {
  // Build combined series for the decade-in-one-chart
  const combined = starnbergLk.map((r, i) => ({
    year: r.year,
    lakefrontVillaM: r.waterfrontVillaM,
    lkSfhMedianM: r.kreisMedianSfhM,
    bauzins: rates[i]?.bauzins10y,
    tx: transactions[i]?.lkStarnberg,
  }));

  const tempNow = compositeTemperature();

  return (
    <>
      <PageHeader
        kicker="Starnberger See · Private Buyer's Review, Vol. I"
        title="A ten-year read on the lake — and why this decade is different."
        standfirst={
          <>
            A research portal assembled for a single prospective primary-residence buyer in the €5–10M band.
            Ten years of Gutachterausschuss data, Engel & Völkers and Sotheby's reports, Bundesbank rate
            series, and the notable-transactions record — pulled into one editorial view.
          </>
        }
        meta={<>Data as of Q1 2026 · One-time snapshot · Open-source public sources only</>}
      />

      <Section>
        <SectionHeader kicker="At a glance" title="Five things to know before anything else." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiCard
            label="Lakefront villa median (LK Starnberg)"
            value="€9.7M"
            sub="Trophy segment already above 2022 peak; rate shock barely scratched Seelage."
            series={starnbergLk.map((r) => (r.waterfrontVillaM as number) || 0)}
            tone="bull"
            chipLabel="Bullish"
          />
          <KpiCard
            label="LK Starnberg SFH (€/m²)"
            value="€9.2k"
            sub="Town-SFH segment reset 2024; recovering mid-single-digit YoY."
            series={starnbergLk.map((r) => (r.starnbergSfhEurPerM2 as number) || 0)}
            tone="neutral"
            chipLabel="Neutral"
          />
          <KpiCard
            label="Bauzins 10Y fix"
            value="3.4%"
            unit=""
            sub="Peak 2022 3.9% → 2025 3.4%. Spread to Bund at 5-yr low."
            series={rates.map((r) => (r.bauzins10y as number) || 0)}
            tone="bull"
            chipLabel="Tailwind"
          />
          <KpiCard
            label="Dwell time (LK Starnberg)"
            value="125d"
            sub="3× the 2020 regime. Buyers negotiate, except on direct-lakefront."
            series={[60, 55, 50, 45, 40, 35, 35, 55, 120, 130, 125]}
            tone="bear"
            chipLabel="Caution"
          />
          <KpiCard
            label="Composite Temperature"
            value={(tempNow >= 0 ? "+" : "") + tempNow}
            unit="/100"
            sub="Bifurcated: Seelage bullish, inland LK still neutral-bearish."
            tone={tempNow >= 20 ? "bull" : tempNow <= -20 ? "bear" : "neutral"}
            chipLabel={tempNow >= 20 ? "Seller's" : tempNow <= -20 ? "Buyer's" : "Balanced"}
          />
        </div>
      </Section>

      <Section tone="parchment">
        <SectionHeader
          kicker="Decade in one chart"
          title="Lakefront prices, Kreis-wide sales, and the rate shock."
          sub="Trophy lake prices kept rising right through the 2022–23 rate shock that reset mainstream German real estate. Transaction volumes in the Landkreis halved in 2023; they have since recovered most — but not all — of the 2021 peak."
        />
        <Figure
          caption="Lakefront villa median (€M) and Kreis median SFH (€M) vs Bundesbank Bauzins and Kreis transaction volume, 2015–2025."
          source={<SourceCite ids={["gutachter_lk_sta", "bundesbank_rates", "ev_starnberg", "ivd_sued"]} />}
          note="Volume series from notarized Kreis contracts; rate is Bundesbank 10-year fixed residential."
        >
          <DualAxisChart
            data={combined}
            leftUnit="M"
            rightUnit=""
            height={400}
            series={[
              { key: "lakefrontVillaM", label: "Lakefront villa median (€M)", type: "line", color: "#18475c", yAxisId: "left" },
              { key: "lkSfhMedianM", label: "LK Starnberg SFH median (€M)", type: "line", color: "#c2a057", yAxisId: "left" },
              { key: "tx", label: "LK transactions", type: "bar", color: "#a7c5d2", yAxisId: "right" },
            ]}
            marks={regimeMarks.map((m) => ({ x: m.year, label: m.label, tone: m.tone }))}
          />
        </Figure>
      </Section>

      <Section>
        <SectionHeader kicker="Executive summary" title="Thesis in three paragraphs." />
        <Prose className="drop-cap">
          <p>
            The Starnbergersee is the only German prime lake that combines daily-commute primary-residence
            viability with old-money cachet. Munich delivers ~€1.2 trillion of metropolitan GDP twenty minutes
            away; the western lake communities sit on a forty-minute S-Bahn tether to Marienplatz; the
            international school catchment survives. At the €5–10M band, no other German lake simultaneously
            offers Gymnasium coverage, MIS, and driveway-to-lake primary-residence inventory. Tegernsee sells
            the trophy but loses the commute; Ammersee is the 25–35% discount twin; Chiemsee is too far.
          </p>
          <p>
            Structurally the lake is supply-locked. 35–45% of the shoreline is Wittelsbach, Kloster, state,
            or conservation — permanently off-market. The remaining ~720–900 tradeable direct-lakefront
            parcels turn over 13–23 times per year. Permits for new SFH/villa in the Landkreis fell to a
            ten-year low of 110 in 2024 (–42% vs 2017). Construction costs are up 61% cumulatively since
            2015 — a long-dated floor under the existing Bestand. The inheritance wave (2025–2035) will see
            tens of billions of lakefront and near-lake property change hands, but only ~15–25% of lakefront
            is expected to reach the open market; the rest stays family-internal.
          </p>
          <p>
            Cyclically, the tape is bifurcated. The Seelage list-to-sale ratio is back to 98–103%; direct
            lakefront Vermarktungsdauer is under 60 days on A-locations; Seelage months-of-supply is below
            three. By contrast the broader Kreis and Munich ETW tape has 95–130-day dwell times, 35–40%
            price-cut frequency, and months-of-supply around 5–10. The Bundesbank estimates Top-7
            overvaluation halved from its 2022 peak. <em>This is still a negotiable moment on the mainstream
            tape; it is not a negotiable moment at the waterline.</em>
          </p>
        </Prose>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Where to go next" title="The portal, indexed." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/market", label: "10-Year Market", body: "Munich ETW, Munich SFH, LK Starnberg, transaction volumes, rates, regime-shift annotations." },
            { href: "/communities", label: "Communities", body: "Side-by-side of the 8 lake Gemeinden plus 6 Munich prime districts. Click through for a deep-dive per community." },
            { href: "/lakefront", label: "Lakefront Premium", body: "Shore gradient model, parcel scarcity, Seeuferweg effects, private-dock premiums, notable €10M+ transactions." },
            { href: "/signals", label: "Signals", body: "14 indicators in a scorecard plus a composite market-temperature gauge." },
            { href: "/trends/rates", label: "Trends — Rates", body: "Bauzins fan chart, affordability on a €5M property, Bund spread, refi-wall." },
            { href: "/trends/demographics", label: "Trends — Demographics & Supply", body: "HNWI net migration, Munich employer anchors, permits pipeline, inheritance wave 2025–2035." },
            { href: "/trends/policy-climate", label: "Trends — Policy & Climate", body: "Tax stack, GEG retrofit, HQ100 flood, Grundsteuer Flächenmodell, Familienheim exemption." },
            { href: "/trends/competing-markets", label: "Trends — Competing Markets", body: "Starnberg vs Tegernsee, Ammersee, Chiemsee, Zürichsee, Como — normalized price index and tax stack." },
            { href: "/tools/comparator", label: "Comparator", body: "Pick 2–4 communities → radar chart + editorial table." },
            { href: "/tools/scenarios", label: "Scenarios", body: "Rate, supply, and recession sliders → fan-chart 5/10-yr price path." },
            { href: "/tools/total-cost", label: "Total-Cost", body: "All-in closing, holding, and retrofit model for a Bavarian €5–10M purchase." },
            { href: "/due-diligence", label: "Due Diligence", body: "Pre-offer checklist — 17 categories, severity-ranked, with the documents to request." },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block bg-paper border border-rule rounded-md p-4 hover:bg-parchment transition-colors shadow-card"
            >
              <div className="serif text-[1.1rem] text-ink-900">{c.label}</div>
              <div className="text-sm text-ink-600 mt-1 leading-relaxed">{c.body}</div>
              <div className="kicker text-gold-500 mt-2">Read →</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          <Callout tone="key" title="How this portal is built">
            Every figure, chart, and table is assembled from open, public sources — Gutachterausschuss
            reports, Destatis, Bundesbank, LfStat, Engel & Völkers, Sotheby's, FAZ/SZ/Handelsblatt archives.
            Where a number is an estimate, the viz flags it and the methodology page explains the
            construction. There is no MLS in Germany; we rebuild the €5–10M tape out of published bands,
            notarized contract counts, and notable-sale reporting.
          </Callout>
          <Callout tone="note" title="Not investment advice">
            This is private research, not a recommendation. The site exists to make a better-informed
            buyer, not to issue a rating. Use the comparator, scenarios, and due-diligence pages as
            starting points for conversations with a German real-estate solicitor (Notar), a Steuerberater,
            and a qualified local appraiser.
          </Callout>
        </div>
      </Section>
    </>
  );
}
