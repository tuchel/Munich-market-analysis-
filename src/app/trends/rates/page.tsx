import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { Figure, Callout } from "@/components/Callout";
import { SourceCite } from "@/components/SourceCite";
import { DataTable } from "@/components/DataTable";
import { KpiCard } from "@/components/KpiCard";
import { PriceLine } from "@/components/charts/PriceLine";
import { rates, bpi, hpi } from "@/data/timeseries";

function monthlyPayment(principal: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export default function TrendsRates() {
  // Affordability on a €5M purchase, 60% LTV, 25-year amortization
  const ltv = 0.6;
  const principal = 5_000_000 * ltv;
  const years = 25;
  const affordability = rates.map((r) => ({
    year: r.year,
    monthlyCost: monthlyPayment(principal, (r.bauzins10y as number) || 3.5, years),
    bauzins: r.bauzins10y,
  }));

  return (
    <>
      <PageHeader
        kicker="Trends · Rates & Affordability"
        title="The rate cycle that broke the market — and hasn't fully healed."
        standfirst={
          <>
            The 2022–23 shock hit German residential harder than the US because variable retail credit is
            relatively rare and mortgage refinancing is priced off the 10-year Pfandbrief. At the €5–10M
            band, buyers are typically 40–70% LTV — but rate sensitivity still sets the pace of the tape.
          </>
        }
      />

      <Section>
        <SectionHeader kicker="Bauzins — the headline series" title="Three regimes in ten years." />
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <KpiCard label="Bauzins 2019" value="1.10%" sub="Trough before 2020 rally" />
          <KpiCard label="Bauzins peak 2022" value="3.90%" sub="ECB +450bp in 10 months" tone="bear" chipLabel="Peak" />
          <KpiCard label="Bauzins 2025" value="3.40%" sub="Stabilized ~50bp spread to Bund" tone="bull" chipLabel="Tailwind" />
          <KpiCard label="Bauzins–Bund spread" value="~50 bp" sub="5-yr low — banks risk-on for prime residential" tone="bull" chipLabel="Narrow" />
        </div>
        <Figure
          caption="Bundesbank mortgage 10-yr fix, ECB MRO and Deposit Rates, 10Y Bund yield."
          source={<SourceCite ids={["bundesbank_rates", "ecb_mrr"]} />}
        >
          <PriceLine
            data={rates}
            height={360}
            yUnit="%"
            lines={[
              { key: "bauzins10y", label: "Bauzins 10Y fix", color: "#9e3838" },
              { key: "ecbMro", label: "ECB MRO", color: "#c2a057" },
              { key: "ecbDepo", label: "ECB Deposit", color: "#a27f3b" },
              { key: "bund10y", label: "10Y Bund", color: "#225d76" },
            ]}
            marks={[
              { x: 2022, label: "Rate shock", color: "#9e3838" },
              { x: 2024, label: "First ECB cuts" },
            ]}
          />
        </Figure>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Affordability" title="Monthly debt cost on a €5M property (60% LTV, 25-yr)." />
        <Figure
          caption="Monthly cost derived from the Bundesbank 10-yr fixed rate and a €3.0M mortgage."
          source={<SourceCite ids={["bundesbank_rates"]} />}
          note="Illustrative: individual bank margins typically add 20–80 bp; affluent private-banking clients price below the reported Bauzins."
        >
          <PriceLine
            data={affordability.map((r) => ({ ...r, monthlyCost: Math.round(r.monthlyCost) }))}
            height={320}
            yUnit=""
            lines={[{ key: "monthlyCost", label: "Monthly debt service (€)", color: "#225d76" }]}
            marks={[{ x: 2022, label: "Peak +67 %", color: "#9e3838" }]}
          />
        </Figure>
        <Prose>
          <p>
            On a €5M property financed at 60% LTV over 25 years, the monthly debt cost moved from
            ~€12,000 (2020, Bauzins 1.16%) to ~€16,800 (2022, 3.90%) — a +40% shock. At the current
            3.40%, the monthly line is back to ~€15,700: still 30% above pre-2022, but well off peak.
            For €10M purchases, the absolute numbers scale linearly; the relative stress test is identical.
          </p>
        </Prose>
      </Section>

      <Section>
        <SectionHeader kicker="The refi wall" title="Why 2026–2028 is the structural watch window." />
        <Prose>
          <p>
            Most German residential mortgages are 10-year fixed, with a typical 10–15 year total
            amortization via subsequent Anschlussfinanzierung. Loans originated at the 1.1–1.3% ZIRP lows
            of 2019–2021 reprice into the current rate regime in 2029–2031 — well outside the primary
            buying horizon here. But the intermediate refi wave, for loans originated at ~1.6–1.8% in
            2015–2018, is 2025–2028. This is a demand overhang: owners facing a refi will be less likely
            to move. It reduces inventory flow — a bullish force for existing Bestand, a bearish force for
            buyer urgency.
          </p>
        </Prose>
        <Callout tone="note" title="For a €5–10M primary-residence buyer">
          The Bauzins-Bund spread at 50 bp is bank-willingness-to-lend as high as it has been in five
          years. The cost of waiting for further rate cuts is priced in by sellers; the cost of waiting
          for price cuts is increasingly priced out at the waterline. These two effects cancel for
          mainstream tape and favour the seller at the lake.
        </Callout>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Cost of building" title="Construction-cost inflation is the hidden bull case." sub="Baupreisindex +61% 2015→2025. Replacement-cost underwrite for existing Bestand is at an all-time high." />
        <Figure
          caption="HPI (Destatis), Baupreisindex (Destatis), 2015=100."
          source={<SourceCite ids={["destatis_hpi", "destatis_bpi"]} />}
        >
          <PriceLine
            data={bpi.map((r, i) => ({ year: r.year, bpi: r.index, hpi: hpi[i]?.index }))}
            height={320}
            yUnit=""
            lines={[
              { key: "bpi", label: "Baupreisindex", color: "#a27f3b" },
              { key: "hpi", label: "Häuserpreisindex", color: "#225d76" },
            ]}
          />
        </Figure>
      </Section>

      <Section>
        <SectionHeader kicker="Fan-chart data" title="Rates, year by year." />
        <DataTable caption="Bauzins, ECB policy rates, 10Y Bund (year-end)">
          <thead>
            <tr>
              <th>Year</th>
              <th className="text-right">Bauzins 10Y</th>
              <th className="text-right">ECB MRO</th>
              <th className="text-right">ECB Deposit</th>
              <th className="text-right">10Y Bund</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((r) => (
              <tr key={r.year}>
                <td>{r.year}</td>
                <td className="text-right tabnums">{r.bauzins10y?.toFixed(2)}%</td>
                <td className="text-right tabnums">{r.ecbMro?.toFixed(2)}%</td>
                <td className="text-right tabnums">{r.ecbDepo?.toFixed(2)}%</td>
                <td className="text-right tabnums">{r.bund10y?.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Section>
    </>
  );
}
