import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { Figure, Callout } from "@/components/Callout";
import { SourceCite } from "@/components/SourceCite";
import { DataTable } from "@/components/DataTable";
import { KpiCard } from "@/components/KpiCard";
import { PriceLine } from "@/components/charts/PriceLine";
import { BarCompare } from "@/components/charts/BarCompare";
import { StackedBar } from "@/components/charts/StackedBar";
import {
  populationIncome,
  hnwi,
  lkPermits,
  munichPermits,
  ownerAgeBands,
  inheritance,
  buyerMix,
  employers,
  constructionCost,
  totalInheritanceLkB,
} from "@/data/demographics";

export default function TrendsDemographics() {
  const employersTop = employers.slice(0, 12);
  return (
    <>
      <PageHeader
        kicker="Trends · Demographics & Supply"
        title="Who wants the lake, what will come on-market, who will buy it."
        standfirst={
          <>
            Three interlocking flows: the Munich HNWI stock that underwrites incremental demand, the LK
            Starnberg permits pipeline that constrains new supply, and the 2025–2035 inheritance wave that
            will force ~€36–53bn of residential property through the estate process — but relatively
            little through open-market listings.
          </>
        }
      />

      <Section>
        <SectionHeader
          kicker="Population & income"
          title="LK Starnberg: Germany's richest Landkreis — for two decades running."
          sub="Disposable income per capita ~37 % above Germany and has been consistently so since 2005. Population projected +8k residents to 2035, despite a median age that's already 2.7 years above the national figure."
        />
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <KpiCard
            label="LK Pop (2024)"
            value="140.5k"
            sub="+13 % since 2005 (+16k). Net migration, not natural increase — LK Starnberg has been attracting wealth for 20 years."
          />
          <KpiCard
            label="Median HH income"
            value="€78.4k"
            sub="#1 Kreis in Germany (VGRdL). 62 % above the DE median of €48.3k — a gap that has widened from +48 % (2005)."
            tone="bull"
            chipLabel="#1 Kreis"
          />
          <KpiCard
            label="LK Pop 2035 (projection)"
            value="148.8k"
            sub="Growing: +5.9 % vs 2024 on LfStat base case. Demand-side support for pricing even without in-migration of new wealth."
            tone="bull"
            chipLabel="Growing"
          />
          <KpiCard
            label="Share 65+"
            value="24.1 %"
            sub="2.0 pp above DE 22.1 %. Demographic dividend (wealth concentration, political stability) with inheritance-event risk (see below — 55 %+ of lakefront parcels held by owners 70+)."
            tone="neutral"
          />
        </div>
        <Figure
          caption="LK Starnberg population, median HH income, disposable €/capita — 2015 through projected 2035."
          source={<SourceCite ids={["lfstat", "oecd_hous", "diw_housing"]} />}
        >
          <PriceLine
            data={populationIncome}
            height={320}
            yUnit=""
            lines={[
              { key: "lkMedianHh", label: "LK median HH (€)", color: "#225d76" },
              { key: "deMedianHh", label: "DE median HH (€)", color: "#a27f3b" },
              { key: "lkDispPerCap", label: "LK disp. €/capita", color: "#3f7d96" },
            ]}
          />
        </Figure>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Wealth stock" title="HNWI & Single-Family Offices — Bavaria." sub="Bavaria's HNWI count +44% 2015→2024; Munich FUA +50%. SFO count +79%." />
        <Figure
          caption="Bavaria HNWI & UHNWI stock, Munich FUA HNWI, Single-Family Offices, 2015–2024."
          source={<SourceCite ids={["knight_frank_wealth", "db_inherit", "ifo_housing"]} />}
        >
          <PriceLine
            data={hnwi}
            height={320}
            yUnit=""
            lines={[
              { key: "byHnwiK", label: "BY HNWI ('000)", color: "#225d76" },
              { key: "munichFuaHnwiK", label: "Munich FUA HNWI ('000)", color: "#c2a057" },
              { key: "sfoBy", label: "BY SFOs", color: "#9e3838" },
            ]}
          />
        </Figure>
      </Section>

      <Section>
        <SectionHeader kicker="Munich employers" title="The income anchor is dual: legacy DAX + defence-tech wave." />
        <Figure
          caption="Headcount of major Munich-anchored employers. DAX & MDAX incumbents dominate but defence-tech/space cluster is the fastest-growing cohort."
          source={<SourceCite ids={["ifo_housing", "colliers_muc", "savills_muc"]} />}
        >
          <BarCompare
            data={employersTop.map((e) => ({ company: `${e.company} · ${e.sector}`, headcount: e.headcount, _color: e.listing?.includes("DAX") ? "#18475c" : e.headcount > 2500 ? "#225d76" : "#c2a057" }))}
            xKey="company"
            bars={[{ key: "headcount", label: "Headcount", color: "#225d76" }]}
            layout="horizontal"
            height={440}
          />
        </Figure>
        <Prose>
          <p>
            Helsing, Quantum Systems, Isar Aerospace, Agile Robots — the Munich defence-tech/space cluster
            has grown from near-zero to ~2,500 employees in five years. Average comp and equity value
            outpace the DAX norm; a meaningful share of the next decade's €5–10M primary-residence
            buyers will come from this pool.
          </p>
        </Prose>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Supply pipeline" title="Permits collapsing, completions lagging." />
        <div className="grid md:grid-cols-2 gap-6">
          <Figure
            caption="LK Starnberg — Baugenehmigungen and SFH/Villa subset, 2015–2024."
            source={<SourceCite ids={["lfstat", "gutachter_lk_sta"]} />}
          >
            <PriceLine
              data={lkPermits}
              height={300}
              yUnit=""
              lines={[
                { key: "permits", label: "Permits (all)", color: "#225d76" },
                { key: "sfhVilla", label: "SFH / Villa", color: "#c2a057" },
                { key: "completions", label: "Completions", color: "#9e3838" },
              ]}
              marks={[{ x: 2024, label: "10-year low", color: "#9e3838" }]}
            />
          </Figure>
          <Figure
            caption="Munich city permits and completions, 2015–2024 (snapshot years)."
            source={<SourceCite ids={["gutachter_muc", "destatis_bpi"]} />}
          >
            <PriceLine
              data={munichPermits}
              height={300}
              yUnit=""
              lines={[
                { key: "permits", label: "Permits", color: "#225d76" },
                { key: "completions", label: "Completions", color: "#a27f3b" },
              ]}
              marks={[{ x: 2024, label: "-56 % from peak", color: "#9e3838" }]}
            />
          </Figure>
        </div>
      </Section>

      <Section>
        <SectionHeader
          kicker="Inheritance wave 2025–2035"
          title={`€${totalInheritanceLkB.min.toFixed(0)}–€${totalInheritanceLkB.max.toFixed(0)}bn of LK Starnberg residential value will pass through estates.`}
          sub="Roughly ~30–40% of event volume reaches the open market. For direct-lakefront: just 15–25%."
        />
        <Figure
          caption="Estate events (min) and total value (median) by segment, LK Starnberg, 2025–2035 (cumulative)."
          source={<SourceCite ids={["ifw_inherit", "db_inherit", "diw_housing", "empirica_bubble"]} />}
        >
          <StackedBar
            data={inheritance.map((r) => ({
              segment: r.segment,
              events: r.eventsMin,
              valueMid: (r.totalMinB + r.totalMaxB) / 2,
              openMarket: ((r.totalMinB + r.totalMaxB) / 2) * ((r.openMarketMinPct + r.openMarketMaxPct) / 200),
              retained: ((r.totalMinB + r.totalMaxB) / 2) * (1 - (r.openMarketMinPct + r.openMarketMaxPct) / 200),
            }))}
            xKey="segment"
            stacks={[
              { key: "retained", label: "Family-internal retention (€bn)", color: "#225d76" },
              { key: "openMarket", label: "Open-market sell-through (€bn)", color: "#c2a057" },
            ]}
            layout="vertical"
            height={300}
            yUnit="bn"
          />
        </Figure>
        <Figure
          caption="Lakefront ownership age profile — 55–62% of parcels held by owners 70+, with tenures 30+ years."
          source={<SourceCite ids={["lfstat", "gutachter_lk_sta"]} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>Age band</th>
                <th className="text-right">% of parcels</th>
                <th className="text-right">Parcels (est.)</th>
                <th className="text-right">Avg tenure (yrs)</th>
              </tr>
            </thead>
            <tbody>
              {ownerAgeBands.map((b) => (
                <tr key={b.band}>
                  <td>{b.band}</td>
                  <td className="text-right tabnums">{b.pctMin}–{b.pctMax}%</td>
                  <td className="text-right tabnums">{b.parcelsMin}–{b.parcelsMax}</td>
                  <td className="text-right tabnums">{b.avgTenureYr}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Figure>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Buyer mix" title="Sanctions reset the international bid." />
        <Figure
          caption="Domestic vs international buyer share, pre-2022 vs post-2022."
          source={<SourceCite ids={["ev_starnberg", "sothebys_munich", "knight_frank_wealth"]} />}
        >
          <StackedBar
            data={buyerMix}
            xKey="era"
            stacks={[
              { key: "domestic", label: "Domestic DE", color: "#18475c" },
              { key: "uk", label: "UK", color: "#225d76" },
              { key: "swiss", label: "Swiss", color: "#3f7d96" },
              { key: "us", label: "US", color: "#c2a057" },
              { key: "russian", label: "Russian", color: "#9e3838" },
              { key: "other", label: "Other", color: "#8e8264" },
            ]}
            yUnit=" %"
            height={240}
          />
        </Figure>
        <Prose>
          <p>
            Russian buyers, historically 5–7% of lakefront bids, fell to ~0% post-2022 under EU sanctions.
            That demand was partially replaced by US buyers (up to 7–10% of notable transactions) and
            expanded Swiss / UK participation. The domestic share rose to ~78%, further consolidating the
            German old-money character of the market.
          </p>
        </Prose>
      </Section>

      <Section>
        <SectionHeader kicker="Replacement cost" title="Why Bestand is the most over-owned word on the lake." />
        <Callout title="Construction-cost inflation, 2020 → 2024">
          Baupreisindex Wohngebäude: 108.6 (2021) → 148 (late 2024). Cumulative +36% on standard
          construction; +45–55% on luxury spec (stone, high-performance glazing, Passivhaus). A 500 m²
          Seehaus shell that cost €{constructionCost.seehausShell500m2_2020[0]}–
          {constructionCost.seehausShell500m2_2020[1]}M to build in 2020 now costs
          €{constructionCost.seehausShell500m2_2024[0]}–{constructionCost.seehausShell500m2_2024[1]}M
          (pre-land). That cost gap is the replacement-cost floor under every existing lakefront villa.
        </Callout>
      </Section>
    </>
  );
}
