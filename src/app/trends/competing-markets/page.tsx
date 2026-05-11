import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { Figure, Callout } from "@/components/Callout";
import { SourceCite } from "@/components/SourceCite";
import { DataTable } from "@/components/DataTable";
import { PriceLine } from "@/components/charts/PriceLine";
import { StackedBar } from "@/components/charts/StackedBar";
import { markets, priceIndex, stack10M, stackHolding10yr } from "@/data/competing";

export default function TrendsCompeting() {
  return (
    <>
      <PageHeader
        kicker="Trends · Competing Markets"
        title="Starnberg vs Tegernsee, Ammersee, Chiemsee, Zürichsee, Como."
        standfirst={
          <>
            The comparable set for a European lakefront primary residence. Prices rebased to 2015, tax
            stack on a €10M purchase over 10 years, and the one-line synthesis: <em>no other German
            lake combines daily-commute primary-residence viability with old-money cachet at this price
            band.</em>
          </>
        }
      />

      <Section>
        <SectionHeader kicker="Comparison matrix" title="Six markets, thirteen metrics." />
        <Figure
          caption="Lake size, population basin, prime €/m², trophy ceiling, CAGR, buyer mix, tax regime, outlook."
          source={<SourceCite ids={["ev_starnberg", "tegernsee_ga", "ammersee_ga", "zh_stat", "tecnocasa_como", "knight_frank_wealth", "ft_german_prime"]} />}
        >
          <DataTable dense>
            <thead>
              <tr>
                <th>Market</th>
                <th className="text-right">Shore km</th>
                <th className="text-right">Basin pop</th>
                <th className="text-right">Prime €/m²</th>
                <th className="text-right">Trophy ceiling</th>
                <th className="text-right">10-yr CAGR</th>
                <th className="text-right">Commute to Munich</th>
                <th>Buyer mix</th>
                <th>Tax regime</th>
                <th className="text-right">5-yr outlook</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m) => (
                <tr key={m.id}>
                  <td>
                    <span className="inline-block w-2 h-2 rounded-full mr-2 align-middle" style={{ background: m.color }} />
                    <span className="serif font-medium">{m.name}</span>
                    <span className="text-[0.7rem] text-ink-500 ml-1">{m.country}</span>
                  </td>
                  <td className="text-right tabnums">{m.shoreKm}</td>
                  <td className="text-right tabnums">{m.populationBasinK}k</td>
                  <td className="text-right tabnums">
                    €{(m.primeEurPerM2Min / 1000).toFixed(0)}–€{(m.primeEurPerM2Max / 1000).toFixed(0)}k
                  </td>
                  <td className="text-right tabnums">€{(m.trophyCeilingPerM2 / 1000).toFixed(0)}k</td>
                  <td className="text-right tabnums">{m.cagr10yPct.toFixed(1)}%</td>
                  <td className="text-right tabnums">
                    {m.commuteMinMin === 300 || m.commuteMinMin >= 240 ? "flight" : `${m.commuteMinMin}–${m.commuteMaxMin} min`}
                    {m.commuteNote && <span className="text-[0.7rem] text-ink-500 ml-1">{m.commuteNote}</span>}
                  </td>
                  <td className="text-[0.78rem]">
                    {m.buyerDomesticPct}% dom / {m.buyerIntlPct}% intl
                  </td>
                  <td className="text-[0.78rem]">{m.taxRegime}</td>
                  <td className="text-right tabnums text-[0.82rem]">{m.outlook5y}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Figure>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Price index" title="2015 = 100 — eleven years of divergence." sub="Tegernsee has led the group; Zürichsee in EUR terms tracks Munich closely; Como has outperformed in absolute € but the tax stack cancels most of it for a primary-residence buyer." />
        <Figure
          caption="Rebased local price index, 2015=100, for each market. Zürichsee shown in both CHF and EUR."
          source={<SourceCite ids={["vdp_index", "zh_stat", "tecnocasa_como", "tegernsee_ga", "ammersee_ga", "gutachter_lk_sta"]} />}
        >
          <PriceLine
            data={priceIndex}
            height={380}
            yUnit=""
            lines={[
              { key: "starnberg", label: "Starnbergersee", color: "#18475c" },
              { key: "tegernsee", label: "Tegernsee", color: "#225d76" },
              { key: "ammersee", label: "Ammersee", color: "#3f7d96" },
              { key: "chiemsee", label: "Chiemsee", color: "#6fa0b4" },
              { key: "zuerichsee_eur", label: "Zürichsee (EUR)", color: "#a27f3b" },
              { key: "como", label: "Como", color: "#9e3838" },
            ]}
          />
        </Figure>
      </Section>

      <Section>
        <SectionHeader kicker="Total-cost stack" title="€10M purchase — closing + 10-yr holding." sub="Bavaria is the cheapest of the three regimes end-to-end. Switzerland's Pauschalbesteuerung is an income-side benefit, not a property-side one; Como's 14%+ closing costs more than wipe out 2015-base-year price outperformance for a primary buyer." />
        <div className="grid md:grid-cols-2 gap-6">
          <Figure
            caption="Transaction cost stack — €10M purchase."
            source={<SourceCite ids={["stmf_grest", "tegernsee_ga", "zh_stat", "tecnocasa_como"]} />}
          >
            <StackedBar
              data={stack10M}
              xKey="bucket"
              stacks={[
                { key: "deK", label: "Germany (€k)", color: "#18475c" },
                { key: "chK", label: "Switzerland (€k)", color: "#a27f3b" },
                { key: "itK", label: "Italy (€k)", color: "#9e3838" },
              ]}
              layout="horizontal"
              height={260}
              yUnit=" k"
            />
          </Figure>
          <Figure
            caption="10-year holding stack — transaction total + annual property tax × 10."
            source={<SourceCite ids={["stmf_grest", "grst_reform", "zh_stat", "tecnocasa_como"]} />}
          >
            <StackedBar
              data={stackHolding10yr}
              xKey="bucket"
              stacks={[
                { key: "deK", label: "Germany (€k)", color: "#18475c" },
                { key: "chK", label: "Switzerland (€k)", color: "#a27f3b" },
                { key: "itK", label: "Italy (€k)", color: "#9e3838" },
              ]}
              layout="horizontal"
              height={260}
              yUnit=" k"
            />
          </Figure>
        </div>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Positioning" title="Starnberg's structural edge." />
        <Prose>
          <p>
            The synthesis from eleven years of data is that the Starnbergersee is the <em>only</em>
            German prime lake that combines daily-commute primary-residence viability with old-money
            cachet.
          </p>
          <ul className="list-disc pl-6 space-y-1.5 mt-4 text-ink-700">
            <li>
              <strong>Tegernsee</strong> beats on trophy ceiling (~€50k/m²+) and international brand,
              but 55–70 min to Munich disqualifies it for the primary-residence use-case.
            </li>
            <li>
              <strong>Ammersee</strong> is the 25–35% discount twin — strong if you accept 40–55 min
              commute and don't need international-school catchment.
            </li>
            <li>
              <strong>Chiemsee</strong> is too far (75–90 min) for a working-family primary.
            </li>
            <li>
              <strong>Zürichsee</strong> only wins the math with a Pauschalbesteuerung relocation; the
              holding costs otherwise triple the Bavarian stack.
            </li>
            <li>
              <strong>Como</strong> only wins with Italy's €200k flat-tax relocation and climate
              preference; otherwise 14%+ closing costs and IMU + 10% IVA on new-build are prohibitive.
            </li>
          </ul>
          <p className="mt-4">
            The Starnbergersee premium relative to Ammersee (~25–35%) is the market's pricing of
            {" "}<em>commute + school + brand</em>. Relative to Tegernsee (15–25% discount), Starnberg is
            selling primary-residence utility at a trophy-lake valuation — the rare case where the
            discounted market wins.
          </p>
        </Prose>
      </Section>

      <Section>
        <Callout tone="key" title="Summary rule">
          For a €5–10M primary residence in 2026 — with school-age children, a Munich workplace, and a
          ten-year horizon — the Starnbergersee is preferred to every other Mitteleuropean lake on a
          risk-adjusted, tax-adjusted, commute-adjusted basis. Zürichsee is the only strong alternative,
          conditional on accepting a Swiss tax residency; Como is the only strong alternative if the
          primary-residence condition is dropped.
        </Callout>
      </Section>
    </>
  );
}
