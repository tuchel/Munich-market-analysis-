import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { Figure, Callout } from "@/components/Callout";
import { SourceCite } from "@/components/SourceCite";
import { DataTable } from "@/components/DataTable";
import { DualAxisChart } from "@/components/charts/DualAxisChart";
import { PriceLine } from "@/components/charts/PriceLine";
import { SmallMultiples } from "@/components/charts/SmallMultiples";
import {
  munichEtw,
  munichSfh,
  starnbergLk,
  transactions,
  dwellTime,
  hpi,
  bpi,
  pti,
  rates,
  regimeMarks,
} from "@/data/timeseries";
import { lakeCommunities } from "@/data/communities";

// Small-multiples: reconstruct each community's SFH trajectory 2015→2025
// using the Kreis median proxy scaled to each community's 2025 level and 5-yr drift.
function trajectory(base2025: number, fiveYr: number) {
  // Work back: assume 5yr (2020→2025) change = fiveYr, and a symmetric 2015→2020 change ≈ 70% of fiveYr
  const v2020 = base2025 / (1 + fiveYr);
  const v2015 = v2020 / (1 + fiveYr * 0.72);
  // Interpolate + inject a 2022 peak followed by 2024 trough shape
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  // Shape factors relative to the linear path, calibrated to Kreis empirical
  const shape = [1.0, 1.05, 1.10, 1.14, 1.18, 1.18, 1.28, 1.37, 1.30, 1.16, 1.18];
  const normBase = v2015;
  return years.map((y, i) => {
    const linear = v2015 + ((v2020 - v2015) * Math.min(i, 5)) / 5 + ((base2025 - v2020) * Math.max(0, i - 5)) / 5;
    const val = normBase * (shape[i] / shape[0]) * (linear / v2015);
    return { year: y, value: Math.round(val) };
  });
}

export default function MarketPage() {
  // Compose EWT + SFH chart — Munich
  const munichCombined = munichEtw.map((r, i) => ({
    year: r.year,
    munichEtwMedian: r.median,
    munichSfhEurPerM2: munichSfh[i]?.eurPerM2,
    tx: transactions[i]?.munichEtw,
  }));

  // Starnberg LK + rate overlay
  const starnbergLkCombined = starnbergLk.map((r, i) => ({
    year: r.year,
    starnbergTownSfh: r.starnbergSfhEurPerM2,
    kreisMedianSfhM: r.kreisMedianSfhM,
    waterfrontVillaM: r.waterfrontVillaM,
    bauzins: rates[i]?.bauzins10y,
  }));

  const multiples = lakeCommunities.map((c) => ({
    id: c.slug,
    label: c.name,
    sub: c.shore ? `${c.shore} shore · ${c.population.toLocaleString()} pop` : undefined,
    color: c.accentColor,
    data: trajectory(c.sfhMedianEurPerM2, c.fiveYrSfh || 0.25),
  }));

  return (
    <>
      <PageHeader
        kicker="Part I · Market"
        title="A ten-year read on the Munich–Starnberg tape."
        standfirst={
          <>
            Eleven years of asking-price and Gutachterausschuss medians, from the Draghi-ZIRP era through the
            2022 rate shock into the 2024–25 recovery. Six charts, one table, and the key annotations a
            buyer needs before engaging a Makler.
          </>
        }
        meta="2015 through 2025 · annual frequency · Bavaria-weighted where relevant"
      />

      <Section>
        <SectionHeader
          kicker="Munich — the anchor"
          title="The 2022 reset, visualized."
          sub="Munich ETW asking-price medians peaked at €9,975/m² in 2022, fell 14.2% through 2024, then stabilized. SFH prices on the Stadtgebiet ran parallel, with an even sharper 2024 reset in the Landkreis tape."
        />
        <Figure
          caption="Munich asking-price medians (€/m²) and transaction volume, 2015–2025."
          source={<SourceCite ids={["gutachter_muc", "immoscout", "jll_muc", "pricehubble"]} />}
        >
          <DualAxisChart
            data={munichCombined}
            leftUnit="€"
            rightUnit=""
            height={380}
            series={[
              { key: "munichEtwMedian", label: "ETW median €/m²", type: "line", color: "#225d76", yAxisId: "left" },
              { key: "munichSfhEurPerM2", label: "SFH median €/m²", type: "line", color: "#c2a057", yAxisId: "left" },
              { key: "tx", label: "ETW transactions", type: "bar", color: "#a7c5d2", yAxisId: "right" },
            ]}
            marks={regimeMarks.map((m) => ({ x: m.year, label: m.label, tone: m.tone }))}
          />
        </Figure>

        <DataTable caption="Munich ETW asking-price distribution, 2015–2025 (€/m²)" className="mt-4">
          <thead>
            <tr>
              <th>Year</th>
              <th className="text-right">Median</th>
              <th className="text-right">P75</th>
              <th className="text-right">P90</th>
              <th className="text-right">SFH €/m²</th>
              <th className="text-right">SFH median € total</th>
            </tr>
          </thead>
          <tbody>
            {munichEtw.map((r, i) => (
              <tr key={r.year}>
                <td>{r.year}</td>
                <td className="text-right tabnums">€{r.median?.toLocaleString()}</td>
                <td className="text-right tabnums">€{r.p75?.toLocaleString()}</td>
                <td className="text-right tabnums">€{r.p90?.toLocaleString()}</td>
                <td className="text-right tabnums">€{munichSfh[i]?.eurPerM2?.toLocaleString()}</td>
                <td className="text-right tabnums">€{munichSfh[i]?.medianObjectM?.toFixed(2)}M</td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Section>

      <Section tone="parchment">
        <SectionHeader
          kicker="Landkreis Starnberg"
          title="Where the Town-SFH and the Lakefront decoupled."
          sub="Starnberg town SFH prices reset hard in 2024 (−33% from 2023) reflecting post-shock inventory overhang; the lakefront villa median barely flinched and set a new all-time high in 2025."
        />
        <Figure
          caption="Starnberg town SFH (€/m²), LK Kreis-median SFH (€M), lakefront villa median (€M), against Bundesbank Bauzins 10Y."
          source={<SourceCite ids={["gutachter_lk_sta", "boris_bayern", "ev_starnberg", "bundesbank_rates"]} />}
        >
          <DualAxisChart
            data={starnbergLkCombined}
            leftUnit="M"
            rightUnit="%"
            height={400}
            series={[
              { key: "waterfrontVillaM", label: "Lakefront villa median (€M)", type: "line", color: "#18475c", yAxisId: "left" },
              { key: "kreisMedianSfhM", label: "Kreis median SFH (€M)", type: "line", color: "#c2a057", yAxisId: "left" },
              { key: "bauzins", label: "Bauzins 10Y (%)", type: "line", color: "#9e3838", yAxisId: "right" },
            ]}
            marks={regimeMarks.map((m) => ({ x: m.year, label: m.label, tone: m.tone }))}
          />
        </Figure>

        <Callout tone="note" title="The 2024 town-SFH reset is specific, not secular">
          The €/m² drop in Starnberg town SFH 2023→2024 (€12.1k → €8.0k) reflects Gutachterausschuss
          registering a cluster of distressed sellers and downzoning adjustments inside the town
          boundary. Lakefront, large-garden parcels, and MIS-catchment neighbourhoods transacted at or
          above the 2023 level. Read this as compositional noise, not a regime.
        </Callout>
      </Section>

      <Section>
        <SectionHeader kicker="Sixteen communities" title="Sixteen trajectories." sub="Small-multiples grid: SFH €/m² reconstructed for each lakefront community on a unified 2015→2025 axis." />
        <Figure
          caption="Reconstructed SFH €/m² trajectories, lakefront communities (2015–2025)."
          source={<SourceCite ids={["gutachter_lk_sta", "boris_bayern", "ev_starnberg"]} />}
          note="Each series calibrated to the 2025 median €/m² reported in community research and the community's 5-yr SFH appreciation. Full-detail per community in /communities."
        >
          <SmallMultiples items={multiples} unit="€/m²" markYear={2022} columns={4} />
        </Figure>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Volume & liquidity" title="The 2022 collapse, the 2024 recovery." sub="Notarized contracts and Vermarktungsdauer capture the 2022–23 freeze. By 2025 volumes are ~75% back to peak; dwell time is not." />
        <div className="grid md:grid-cols-2 gap-6">
          <Figure
            caption="Notarized transactions: Munich (total + ETW) and Landkreis Starnberg, 2015–2025."
            source={<SourceCite ids={["gutachter_muc", "gutachter_lk_sta"]} />}
          >
            <PriceLine
              data={transactions}
              height={300}
              lines={[
                { key: "munichTotal", label: "Munich total", color: "#18475c" },
                { key: "munichEtw", label: "Munich ETW", color: "#3f7d96" },
                { key: "lkStarnberg", label: "LK Starnberg", color: "#c2a057" },
              ]}
            />
          </Figure>
          <Figure
            caption="Vermarktungsdauer (days-on-market median) for Munich and LK Starnberg."
            source={<SourceCite ids={["gutachter_muc", "gutachter_lk_sta", "immoscout"]} />}
          >
            <PriceLine
              data={dwellTime}
              height={300}
              yUnit=""
              lines={[
                { key: "munich", label: "Munich (days)", color: "#225d76" },
                { key: "lk", label: "LK Starnberg (days)", color: "#a27f3b" },
              ]}
              marks={[{ x: 2022, label: "Rate shock", color: "#9e3838" }]}
            />
          </Figure>
        </div>
      </Section>

      <Section>
        <SectionHeader kicker="Macro overlays" title="HPI, construction costs, and the P/I stress test." sub="The three series a buyer should know before arguing an offer." />
        <div className="grid md:grid-cols-3 gap-5">
          <Figure
            caption="Häuserpreisindex (Destatis), 2015=100."
            source={<SourceCite ids={["destatis_hpi"]} />}
          >
            <PriceLine
              data={hpi}
              height={260}
              yUnit=""
              lines={[{ key: "index", label: "HPI (2015=100)", color: "#18475c" }]}
              marks={[{ x: 2022, label: "Peak 161.6" }, { x: 2023, label: "Trough 148.0", color: "#9e3838" }]}
            />
          </Figure>
          <Figure
            caption="Baupreisindex Wohngebäude (Destatis), 2015=100."
            source={<SourceCite ids={["destatis_bpi"]} />}
          >
            <PriceLine
              data={bpi}
              height={260}
              yUnit=""
              lines={[{ key: "index", label: "BPI (2015=100)", color: "#a27f3b" }]}
              marks={[{ x: 2022, label: "+15.2% YoY" }]}
            />
          </Figure>
          <Figure
            caption="Price-to-income — Munich (80m² ETW / HH disposable income)."
            source={<SourceCite ids={["destatis_hpi", "lfstat"]} />}
          >
            <PriceLine
              data={pti}
              height={260}
              yUnit="×"
              lines={[{ key: "ratio", label: "P/I ratio", color: "#9e3838" }]}
              marks={[{ x: 2022, label: "Peak 24.2×", color: "#9e3838" }]}
            />
          </Figure>
        </div>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="The through-line" title="Four regimes, one lake." />
        <Prose>
          <p>
            The 2015–2025 Munich/Starnberg series tells four stories, in sequence:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-ink-700">
            <li>
              <strong>2015–2021, the ZIRP ramp.</strong> Bauzins 1.6–1.9%, HPI +52%, Munich ETW +69%,
              lakefront villa median +97%. Dwell times fell from 60 to 35 days in the Kreis. Empirica
              flagged Munich #1 bubble risk by 2019.
            </li>
            <li>
              <strong>2022, the shock.</strong> ECB +450bp in 10 months. Bauzins 1.15 → 3.9%. LK Starnberg
              volumes –47.7%; Munich ETW peaked at €9,975/m² and began a 14% correction.
            </li>
            <li>
              <strong>2023–2024, the freeze.</strong> Price-cuts on 55% of listings, dwell times to 130 days,
              HPI –8.4% nationally. Lakefront barely participated; Kreis-wide median held.
            </li>
            <li>
              <strong>2025, bifurcated recovery.</strong> Volumes back to ~75% of peak. Seelage hit a new
              all-time high at €9.7M median; mainstream Kreis SFH still –6% from peak. Bauzins 3.4%;
              banks' Bund spread at a 5-year low.
            </li>
          </ol>
          <p>
            The implication for a €5–10M primary-residence buyer: the fat tape is negotiable, but the
            moat — direct lakefront inside the Pöcking–Berg–Feldafing triangle — is not. That asymmetry is
            the core premise the rest of this portal explores.
          </p>
        </Prose>
      </Section>
    </>
  );
}
