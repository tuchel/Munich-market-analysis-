import Link from "next/link";
import { MarketLineChart, MarketBarChart, palette } from "@/components/charts/Chart";
import {
  MUNICH_ETW, MUNICH_SFH, LK_STARNBERG, TRANSACTIONS, DWELL, RATES, INDICES, PRICE_INCOME, COMPOSITE_INDEX,
} from "@/lib/data/macro";

export const metadata = {
  title: "10-Year Market — Starnberger See Property Review",
  description:
    "A ten-year view of the Munich and Landkreis Starnberg residential market: prices, transactions, dwell times, rates, construction costs, and affordability.",
};


const ANNOTATIONS = [
  { from: 2016, to: 2016, label: "Brexit / ZIRP", fill: palette.goldLight },
  { from: 2020, to: 2021, label: "COVID blow-off", fill: palette.goldLight },
  { from: 2022, to: 2023, label: "Rate shock", fill: "#9e3838" },
  { from: 2025, to: 2025, label: "Recovery", fill: "#2f6a3f" },
];

function S({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 md:py-14 border-t border-rule">
      <div className="kicker mb-2">{kicker}</div>
      <h2 className="serif text-[1.7rem] md:text-[1.9rem] tracking-tight text-ink-900 mb-5 leading-tight">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function Cite({ children }: { children: React.ReactNode }) {
  return <div className="source-cite mt-3">Source: {children}</div>;
}

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">Market overview</div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Ten years of Munich &amp; LK&nbsp;Starnberg</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        Five distinct regimes inside ten years: the ZIRP boom (2015–19), the COVID blow-off (2020–22),
        the rate shock and correction (2022–24), and the bifurcated recovery now under way (2024–26).
        Lakefront has decoupled from the rest of the market.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-3 text-sm">
        <div className="border border-rule rounded-md p-4 bg-paper">
          <div className="kicker mb-1">10-yr Munich ETW</div>
          <div className="number-lg text-ink-900">+80 %</div>
          <div className="text-xs text-ink-500 mt-1">€4,900 → €8,800/m² (peak €9,975 in 2022)</div>
        </div>
        <div className="border border-rule rounded-md p-4 bg-paper">
          <div className="kicker mb-1">10-yr LK Starnberg waterfront</div>
          <div className="number-lg text-ink-900">+177 %</div>
          <div className="text-xs text-ink-500 mt-1">€3.5M → €9.7M median villa</div>
        </div>
        <div className="border border-rule rounded-md p-4 bg-paper">
          <div className="kicker mb-1">10-yr construction cost</div>
          <div className="number-lg text-ink-900">+61 %</div>
          <div className="text-xs text-ink-500 mt-1">Baupreisindex Wohngebäude 100 → 160.8</div>
        </div>
      </div>

      {/* COMPOSITE INDEX */}
      <S kicker="01" title="The decade in one chart">
        <p className="prose-editorial max-w-prose mb-4">
          Indexed to 2015 = 100, three series tell the story: Germany's national HPI (the slowest mover),
          Munich (a faster cycle with sharper drawdown), and Starnbergersee lakefront (decoupled and
          structurally steeper).
        </p>
        <MarketLineChart
          data={COMPOSITE_INDEX}
          series={[
            { key: "sbgLakefront", label: "Starnbergersee lakefront", color: palette.gold },
            { key: "muc", label: "Munich ETW", color: palette.primary },
            { key: "deHpi", label: "Germany HPI", color: palette.ink },
          ]}
          yLabel="Index (2015 = 100)"
          yFormat={(v) => String(v)}
          height={360}
          annotations={ANNOTATIONS as any}
        />
        <Cite>Destatis Häuserpreisindex; Statista 554151 (Munich ETW); E&amp;V Marktreport Starnberger See; author composite. 2015 = 100.</Cite>
      </S>

      {/* MUNICH ETW */}
      <S kicker="02" title="Munich ETW — median, P75 and P90">
        <p className="prose-editorial max-w-prose mb-4">
          The Munich Eigentumswohnung Angebotspreis series — the canonical pulse of the Munich market.
          Note the 2022 peak (€9,975 median), the 14 % drawdown into late 2024, and the modest 2025
          recovery (+2.9 % YoY) reading.
        </p>
        <MarketLineChart
          data={MUNICH_ETW}
          series={[
            { key: "p90", label: "P90 (top segment)", color: palette.gold },
            { key: "p75", label: "P75", color: palette.primaryLight },
            { key: "median", label: "Median", color: palette.primary },
          ]}
          yLabel="€ / m²"
          yFormat={(v) => `€${(v / 1000).toFixed(0)}k`}
          height={340}
        />
        <Cite>Statista 554151 (Munich ETW Angebotspreise); ImmoScout24 WohnBarometer; Aigner Halbjahresbilanz; cross-checked vs JLL Residential City Profile München.</Cite>
      </S>

      {/* MUNICH SFH */}
      <S kicker="03" title="Munich SFH — €/m² and median object price">
        <p className="prose-editorial max-w-prose mb-4">
          Single-family houses inside Munich's city boundary are scarce and heterogeneous; €/m² is noisy
          because plot value dominates. The median object price is more meaningful for thinking about
          family-home transactions. The luxury P90 (estimated) is the closest indicator of the segment
          you are actually shopping in — though most €3M+ Munich-area SFH transactions cluster in
          Grünwald-adjacent districts, not within the city boundary.
        </p>
        <MarketLineChart
          data={MUNICH_SFH}
          series={[
            { key: "perM2", label: "Avg €/m² (left)", color: palette.primary, yAxis: "left" },
            { key: "medianObj", label: "Median object (€M, right)", color: palette.ink, yAxis: "right" },
            { key: "p75Obj", label: "P75 object (€M, right)", color: palette.primaryLight, yAxis: "right" },
            { key: "p90Lux", label: "P90 luxury (€M, right, est.)", color: palette.gold, yAxis: "right", dashed: true },
          ]}
          yLabel="€/m²"
          yFormat={(v) => `€${(v / 1000).toFixed(0)}k`}
          yRightLabel="€ million"
          yRightFormat={(v) => `€${v.toFixed(1)}M`}
          height={360}
        />
        <Cite>IVD Süd Kaufmarktbericht Bayern; Aigner Marktbericht München 2024/25; Glaser Immobilienberatung; author P90-luxury estimate from broker bands.</Cite>
      </S>

      {/* LK STARNBERG */}
      <S kicker="04" title="Landkreis Starnberg — town SFH and waterfront villa">
        <p className="prose-editorial max-w-prose mb-4">
          The LK Starnberg story is two stories. The town SFH median tracks Munich with a small premium;
          the waterfront villa median has its own dynamic, driven by an exceptionally thin transaction
          flow (8–18 lakefront sales per year across the whole lake). The lakefront line shows the
          structural decoupling — modest drawdown in 2023, fast recovery in 2024–25.
        </p>
        <MarketLineChart
          data={LK_STARNBERG}
          series={[
            { key: "townSfhPerM2", label: "Starnberg town SFH (€/m², left)", color: palette.primary, yAxis: "left" },
            { key: "kreisMedianM", label: "Kreis median SFH (€M, right)", color: palette.primaryDark, yAxis: "right" },
            { key: "waterfrontVillaM", label: "Waterfront villa median (€M, right)", color: palette.gold, yAxis: "right" },
          ]}
          yLabel="€/m²"
          yFormat={(v) => `€${(v / 1000).toFixed(0)}k`}
          yRightLabel="€ million"
          yRightFormat={(v) => `€${v.toFixed(1)}M`}
          height={360}
        />
        <Cite>E&amp;V Marktreport Starnberger See; Starnberger See Immobilien Marktbericht 2025; Fischer Immobilien; Immobilienpreis-Ermittler; press-reported transactions (SZ, Merkur, FAZ, Handelsblatt).</Cite>
      </S>

      {/* TRANSACTIONS */}
      <S kicker="05" title="Transaction volumes — the rate-shock signature">
        <p className="prose-editorial max-w-prose mb-4">
          The 2023 collapse is the cleanest signal in the data. Munich Stadt contracts fell ~37 % from
          the 2021 peak; LK Starnberg fell 60 %. The 2024 recovery is real — Munich Stadt printed +34 %
          YoY to ~10,950 contracts — but volumes remain meaningfully below the boom-era baseline.
        </p>
        <MarketBarChart
          data={TRANSACTIONS}
          series={[
            { key: "muc", label: "Munich Stadt (notarized contracts)", color: palette.primary },
            { key: "lkStb", label: "LK Starnberg", color: palette.gold },
          ]}
          yFormat={(v) => v.toLocaleString("en-US")}
          height={300}
        />
        <Cite>Gutachterausschuss Landeshauptstadt München Halbjahres-/Herbstreport; Landratsamt Starnberg.</Cite>
      </S>

      {/* DWELL */}
      <S kicker="06" title="Vermarktungsdauer — days on market">
        <p className="prose-editorial max-w-prose mb-4">
          Dwell time is the most under-discussed indicator. The 2020–21 sub-30-day sellers' market is
          gone; current Munich median is 89–105 days, LK Starnberg 110–140. For a €5–10M buyer this is
          decisive: time is now <em>your</em> resource, not the seller's.
        </p>
        <MarketLineChart
          data={DWELL}
          series={[
            { key: "muc", label: "Munich Stadt (median days)", color: palette.primary },
            { key: "lkStb", label: "LK Starnberg (median days)", color: palette.gold },
          ]}
          yLabel="Days on market"
          yFormat={(v) => String(v)}
          height={300}
        />
        <Cite>K&amp;F Immobilien Vermarktungsdauer-Studien 2024–25; Happy Immo; Aigner; author cross-tab.</Cite>
      </S>

      {/* RATES */}
      <S kicker="07" title="Mortgage rate, ECB policy and 10Y Bund">
        <p className="prose-editorial max-w-prose mb-4">
          The single most important macro variable for €5–10M residential pricing is the 10-year Bauzins.
          From a 1.0–1.3 % corridor 2015–21 to a 4.2 % peak in 2022 H2, now stabilising in the 3.3–3.6 %
          band. Cash and high-equity buyers carry a measurable premium in 2025.
        </p>
        <MarketLineChart
          data={RATES}
          series={[
            { key: "bauzins", label: "Bauzins 10Y fix", color: palette.gold },
            { key: "ecbMro", label: "ECB MRO", color: palette.primary },
            { key: "ecbDeposit", label: "ECB Deposit", color: palette.primaryLight },
            { key: "bund10y", label: "10Y Bund", color: palette.ink },
          ]}
          yLabel="%"
          yFormat={(v) => `${v.toFixed(1)}%`}
          height={320}
        />
        <Cite>Deutsche Bundesbank Zinsstatistik Wohnungsbaukredite; ECB key rates; FRED IRLTLT01DEM156N; Finanztip / Interhyp Bauzinsen Verlauf.</Cite>
      </S>

      {/* HPI vs BPI */}
      <S kicker="08" title="House price index vs construction cost index">
        <p className="prose-editorial max-w-prose mb-4">
          The construction-cost line (BPI) is the structural floor under prices. With a +61 % cumulative
          BPI rise since 2015, no rational builder will replicate Bestand stock below replacement cost.
          That floor is the strongest argument <em>for</em> existing high-quality inventory at current
          asking levels — and the strongest argument against new-build over-pricing.
        </p>
        <MarketLineChart
          data={INDICES}
          series={[
            { key: "hpi", label: "Häuserpreisindex (DE)", color: palette.primary },
            { key: "bpi", label: "Baupreisindex Wohngebäude (DE)", color: palette.gold },
          ]}
          yLabel="Index (2015 = 100)"
          yFormat={(v) => String(v)}
          height={300}
        />
        <Cite>Destatis Häuserpreisindex (Tabelle 61262); Destatis Baupreisindex Wohngebäude. Both rebased to 2015 = 100.</Cite>
      </S>

      {/* P/I */}
      <S kicker="09" title="Price-to-income — the affordability cliff">
        <p className="prose-editorial max-w-prose mb-4">
          A median 80 m² Munich ETW versus median Munich household disposable income. The ratio peaked
          at 24.2× in 2022 — well into international red-zone territory — and has compressed to ~20.5×
          via the 2023–24 price correction and modest income gains. Still elevated by historical
          standards.
        </p>
        <MarketLineChart
          data={PRICE_INCOME}
          series={[
            { key: "piRatio", label: "Price / Income ratio", color: palette.gold },
          ]}
          yLabel="Multiple"
          yFormat={(v) => `${v.toFixed(0)}×`}
          yDomain={[10, 26]}
          height={260}
        />
        <Cite>Statista 1105672 (Kaufkraft Munich); LH München Statistik verfügbares Einkommen 2023; author ratio.</Cite>
      </S>

      {/* TAKEAWAYS */}
      <S kicker="10" title="What the macro picture tells a €5–10M buyer">
        <div className="prose-editorial max-w-prose">
          <ol>
            <li>The cyclical entry window that opened in late 2023 for mid-segment Munich Speckgürtel inventory has largely closed; for lakefront, there is effectively no cyclical entry window — timing matters less than sourcing and condition.</li>
            <li>Bauzins at 3.3–3.6 % is your tactical environment. All-cash and 70 %+ equity buyers carry measurable premium and should lead with that posture in negotiation.</li>
            <li>Construction cost inflation (+61 % cumulative) creates a hard floor under existing high-quality stock; quality Bestand is structurally cheaper to own than reproducing it.</li>
            <li>Transaction volume and dwell-time data say <em>time is on your side</em>. Sellers carry monthly cost; buyers do not.</li>
            <li>The lakefront / non-lakefront decoupling is the single largest insight: Starnbergersee waterfront is +177 % over the decade vs +50 % for Germany HPI. Substitution risk inside the lake is low; substitution out of the lake at this budget is essentially free.</li>
          </ol>
        </div>
      </S>

      <div className="rule-double mt-12 pt-6 source-cite">
        Data vintage 2015–Q1 2026. Cross-references the <Link href="/trends/rates" className="underline">Rates &amp; affordability</Link>,{" "}
        <Link href="/trends/demographics" className="underline">Demographics &amp; supply</Link> and{" "}
        <Link href="/signals" className="underline">Signals dashboard</Link>. Full bibliography on{" "}
        <Link href="/sources" className="underline">Sources</Link>; method on{" "}
        <Link href="/methodology" className="underline">Methodology</Link>.
      </div>
    </article>
  );
}
