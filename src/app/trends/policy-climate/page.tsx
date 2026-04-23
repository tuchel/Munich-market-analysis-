import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { Figure, Callout } from "@/components/Callout";
import { SourceCite } from "@/components/SourceCite";
import { DataTable } from "@/components/DataTable";
import { KpiCard } from "@/components/KpiCard";
import { BarCompare } from "@/components/charts/BarCompare";
import {
  closingStack,
  closingTotals,
  grEstByLand,
  hebesatzGrundsteuerB,
  zweitwohnsteuer,
  erbschaftsteuer,
  familienheim,
  gegBands,
  climate,
  lakeLevel,
} from "@/data/taxes";

export default function TrendsPolicy() {
  return (
    <>
      <PageHeader
        kicker="Trends · Policy & Climate"
        title="The tax, energy, and climate stack that shapes every Euro."
        standfirst={
          <>
            Bavaria's 3.5% Grunderwerbsteuer is the lowest in Germany; the Flächenmodell for Grundsteuer
            almost fully decouples annual tax from market value; Familienheim §13 eliminates inheritance
            tax on primary residence for spouses. Offset by the GEG retrofit economics on 1950–1990 lake
            villas and the HQ100 map. This page covers the whole stack.
          </>
        }
      />

      <Section>
        <SectionHeader kicker="Closing stack — Bavaria" title="What you actually pay at the notary." />
        <div className="grid md:grid-cols-3 gap-4">
          <KpiCard label="Closing cost on €5M" value={`€${(closingTotals.eur5M / 1000).toFixed(0)}k`} sub="8.57% of purchase — GrESt, notary, Grundbuch, buyer-Makler" />
          <KpiCard label="Closing cost on €7.5M" value={`€${(closingTotals.eur7_5M / 1000).toFixed(0)}k`} sub="8.48% of purchase" />
          <KpiCard label="Closing cost on €10M" value={`€${(closingTotals.eur10M / 1000).toFixed(0)}k`} sub="8.42% of purchase" />
        </div>
        <Figure
          className="mt-6"
          caption="Nebenkosten stack on €5M / €7.5M / €10M Bavaria primary-residence purchase."
          source={<SourceCite ids={["stmf_grest", "ev_starnberg", "ivd_sued"]} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>Bucket</th>
                <th className="text-right">€5M</th>
                <th className="text-right">€7.5M</th>
                <th className="text-right">€10M</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {closingStack.map((r) => (
                <tr key={r.item}>
                  <td>{r.item}</td>
                  <td className="text-right tabnums">€{r.eur5M.toLocaleString()}</td>
                  <td className="text-right tabnums">€{r.eur7_5M.toLocaleString()}</td>
                  <td className="text-right tabnums">€{r.eur10M.toLocaleString()}</td>
                  <td className="text-xs text-ink-500">{r.note}</td>
                </tr>
              ))}
              <tr className="bg-parchment/70 font-semibold">
                <td>Total Nebenkosten</td>
                <td className="text-right tabnums">€{closingTotals.eur5M.toLocaleString()}</td>
                <td className="text-right tabnums">€{closingTotals.eur7_5M.toLocaleString()}</td>
                <td className="text-right tabnums">€{closingTotals.eur10M.toLocaleString()}</td>
                <td className="text-xs text-ink-500">8.4–8.6 % of Kaufpreis</td>
              </tr>
            </tbody>
          </DataTable>
        </Figure>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Grunderwerbsteuer" title="Bavaria's 3.5 % is structurally cheap." />
        <Figure
          caption="GrESt rate by Bundesland — Bavaria (3.5 %) and Saxony (3.5 %) are structurally the lowest."
          source={<SourceCite ids={["stmf_grest"]} />}
        >
          <BarCompare
            data={grEstByLand.map((r) => ({ land: r.land, ratePct: r.ratePct, _color: r.land === "Bayern" ? "#18475c" : "#a7c5d2" }))}
            xKey="land"
            bars={[{ key: "ratePct", label: "GrESt %", color: "#225d76" }]}
            layout="horizontal"
            height={420}
            yUnit=" %"
          />
        </Figure>
      </Section>

      <Section>
        <SectionHeader kicker="Grundsteuer" title="The Flächenmodell makes luxury almost tax-neutral." sub="Bavaria's Grundsteuer uses a pure area model — a €10M lake villa with 400 m² living area pays about the same annual tax as a 400 m² Hinterland home of the same size." />
        <Figure
          caption="Grundsteuer B Hebesätze — Starnbergersee lake Gemeinden + reference points."
          source={<SourceCite ids={["grst_reform", "municipal_sites"]} />}
        >
          <BarCompare
            data={hebesatzGrundsteuerB.map((r) => ({ gemeinde: r.gemeinde, hebesatz: r.hebesatzPct, _color: r.kind === "ref" ? "#a27f3b" : "#225d76" }))}
            xKey="gemeinde"
            bars={[{ key: "hebesatz", label: "Hebesatz %", color: "#225d76" }]}
            layout="horizontal"
            height={360}
            yUnit=" %"
          />
        </Figure>
        <DataTable caption="Zweitwohnungsteuer — applies only if the property is not the Hauptwohnsitz">
          <thead>
            <tr>
              <th>Gemeinde</th>
              <th>Rate / Note</th>
            </tr>
          </thead>
          <tbody>
            {zweitwohnsteuer.map((r) => (
              <tr key={r.gemeinde}>
                <td>{r.gemeinde}</td>
                <td>{r.ratePct ? `${r.ratePct} % of Jahresnettokaltmiete` : r.note}</td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Erbschaftsteuer" title="Familienheim (§13 ErbStG) changes the math entirely." />
        <Figure
          caption="Erbschaftsteuer schedule on inheritance up to €10M, by class and relationship."
          source={<SourceCite ids={["erbst_bmf"]} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>Beziehung</th>
                <th>Klasse</th>
                <th className="text-right">Freibetrag</th>
                <th className="text-right">Rate to €10M</th>
              </tr>
            </thead>
            <tbody>
              {erbschaftsteuer.map((e) => (
                <tr key={e.beziehung}>
                  <td>{e.beziehung}</td>
                  <td>{e.klasse}</td>
                  <td className="text-right tabnums">€{e.freibetragEur.toLocaleString()}</td>
                  <td className="text-right tabnums">
                    {e.rateMinPct}–{e.rateMaxPct} %
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Figure>
        <Callout tone="key" title="Familienheim — the most under-appreciated rule at the lake">
          A spouse inherits the primary residence tax-free, unlimited in value, under a 10-year continued-
          occupancy requirement. Children inherit tax-free <em>up to 200 m² living area</em>, provided
          they move in within 6 months and occupy for 10 years. On a €10M / 400 m² lake villa the
          indicative tax burden is <strong>€{familienheim.with10MvillaExampleTaxRangeM[0]}–
          €{familienheim.with10MvillaExampleTaxRangeM[1]}M</strong> with Familienheim versus{" "}
          <strong>€{familienheim.without10MvillaExampleTaxRangeM[0]}–
          €{familienheim.without10MvillaExampleTaxRangeM[1]}M</strong> without.
        </Callout>
      </Section>

      <Section>
        <SectionHeader kicker="GEG retrofit" title="The decade's hidden renovation bill." sub="Most lake villas from the 1950–1990 cohort sit in Energieausweis class G or H. Retrofit-to-C typically costs €300–€2,600 /m²." />
        <Figure
          caption="GEG class bands, kWh/m²·a, typical stock, €/m² retrofit cost, cost on a 400 m² villa."
          source={<SourceCite ids={["geg"]} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>Klasse</th>
                <th className="text-right">kWh/m²·a</th>
                <th>Typical stock</th>
                <th className="text-right">€/m² retrofit</th>
                <th className="text-right">400 m² villa</th>
              </tr>
            </thead>
            <tbody>
              {gegBands.map((b) => (
                <tr key={b.klasse}>
                  <td className="serif font-medium">{b.klasse}</td>
                  <td className="text-right tabnums">{b.kwhM2a}</td>
                  <td>{b.stock}</td>
                  <td className="text-right tabnums">
                    €{b.eurM2Min}–€{b.eurM2Max}
                  </td>
                  <td className="text-right tabnums">
                    €{b.villa400m2MinK}–€{b.villa400m2MaxK}k
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Figure>
        <Callout tone="note" title="Denkmal economics">
          Denkmal-listed villas (many of the pre-1950 Altbau lakefront Bestand) are largely exempt from
          GEG retrofit mandates (§105 GEG) — but internal insulation is still forced by building physics.
          Offsetting this, §7i / §11b EStG grant 9% AfA × 8 years, then 7% × 4 years on qualifying
          restoration spend, yielding 100% depreciation inside 12 years — a strong incentive to restore
          authentically.
        </Callout>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Climate" title="Lake-level regulation, HQ100 corridors, heat projection." />
        <Figure
          caption="Per-Gemeinde HQ100 exposure, critical zones, warming 2011–2040, heißetage per year."
          source={<SourceCite ids={["lfu_hq100", "dwd_climate", "seeklause"]} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>Gemeinde</th>
                <th>HQ100</th>
                <th>Critical zones</th>
                <th className="text-right">Warming (°C)</th>
                <th className="text-right">Heat days/yr</th>
              </tr>
            </thead>
            <tbody>
              {climate.map((r) => (
                <tr key={r.gemeinde}>
                  <td className="serif font-medium">{r.gemeinde}</td>
                  <td>{r.hq100}</td>
                  <td className="text-sm">{r.zones}</td>
                  <td className="text-right tabnums">+{r.warmingC.toFixed(1)}</td>
                  <td className="text-right tabnums">
                    {r.heatDaysLow}–{r.heatDaysHigh}
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Figure>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <Callout title="Lake-level history">
            The lake is regulated by the <strong>{lakeLevel.regulator}</strong>. Typical annual range
            {" "}<strong>{lakeLevel.typicalRangeCm} cm</strong>; historical peaks +{lakeLevel.historicPeakHighCm} cm (1999) and
            {" "}{lakeLevel.historicPeakLowCm} cm (2003). Flood risk for direct-lakefront is tail-risk
            via tributary streams and seepage, not lake surge.
          </Callout>
          <Callout tone="note" title="Water quality & fire risk">
            The lake's <strong>{lakeLevel.trophie}</strong> — top EU Badewasser class. Forest-fire risk is
            <strong> Waldbrandklasse {lakeLevel.waldbrandklasse}</strong>, peaking only in the Kiefer
            stands south of Seeshaupt.
          </Callout>
        </div>
      </Section>

      <Section>
        <SectionHeader kicker="Implications" title="A simplified policy pricing rule." />
        <Prose>
          <p>
            For a €5–10M primary-residence buyer in Bavaria, the policy stack is, on balance, a
            structural positive. The 3.5% Grunderwerbsteuer is half the Berlin/NRW rate; the Flächenmodell
            Grundsteuer on a €10M lake villa is a small three-digit monthly line; Zweitwohnungsteuer is
            voided by registering Hauptwohnsitz; Familienheim makes intergenerational transfer largely
            tax-free. The only material policy headwind is GEG retrofit economics, and Denkmal
            registration is a partial exemption plus an AfA offset.
          </p>
          <p>
            The climate stack is largely bright. The lake itself is a regulated body with historical peak
            ranges well within engineering envelope; HQ100 flags at the Gemeinde level attach to
            tributary corridors, not to the shoreline proper. Heat projection adds 10–16 Heißetage per
            year in the 2030s — mitigated by the lake's own microclimate.
          </p>
        </Prose>
      </Section>
    </>
  );
}
