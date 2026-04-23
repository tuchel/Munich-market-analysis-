import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { Figure, Callout } from "@/components/Callout";
import { DataTable } from "@/components/DataTable";
import { KpiCard } from "@/components/KpiCard";
import { SourceCite } from "@/components/SourceCite";
import { ShoreGradientChart } from "@/components/charts/ShoreGradientChart";
import { BarCompare } from "@/components/charts/BarCompare";
import {
  shoreTiers,
  positionMultipliers,
  shoreInventory,
  shoreTotals,
  notableTransactions,
  legalRegime,
  seeuferwegImpact,
  dockPremiums,
} from "@/data/lakefront";

export default function LakefrontPage() {
  const txChart = notableTransactions.map((t) => ({
    year: t.year,
    community: t.community,
    priceMidM: (t.priceMinM + t.priceMaxM) / 2,
    priceMinM: t.priceMinM,
    priceMaxM: t.priceMaxM,
  }));

  return (
    <>
      <PageHeader
        kicker="Part III · Lakefront Premium"
        title="Why the last 60 metres are worth more than the last six kilometres."
        standfirst={
          <>
            The direct-lakefront segment is a micro-market with its own supply curve, legal regime, and
            buyer set. This page separates the shore gradient, the scarcity math, the legal friction, and
            the €10M+ record — the four ingredients that underwrite the lake's structural premium.
          </>
        }
      />

      <Section>
        <SectionHeader kicker="Scarcity" title="Forty-nine kilometres of shore, eight hundred tradeable parcels." />
        <div className="grid md:grid-cols-4 gap-4">
          <KpiCard label="Shoreline" value={`${shoreTotals.shoreKm.toFixed(1)} km`} sub="Total Gemeinde-measured" />
          <KpiCard label="Protected (perpetual)" value={`~${shoreTotals.protectedSharePct}%`} sub="Wittelsbach, Kloster, state, NSG" tone="neutral" chipLabel="Off-market" />
          <KpiCard label="Direct-lakefront parcels (private)" value={`${shoreTotals.parcelsMin.toLocaleString()}–${shoreTotals.parcelsMax.toLocaleString()}`} sub="~620–780 currently privately tradeable" />
          <KpiCard label="Annual turnover" value={`${shoreTotals.turnoverMin}–${shoreTotals.turnoverMax}`} sub="Direct-lakefront transactions per year (8–16 typical; 2–5 are >€10M)" tone="bull" chipLabel="Tight" />
        </div>
        <Figure
          className="mt-6"
          caption="Per-community shoreline, private-tradeable share, parcel counts, and annual turnover."
          source={<SourceCite ids={["gutachter_lk_sta", "boris_bayern", "lfu_hq100", "ev_starnberg"]} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>Community</th>
                <th className="text-right">Shore km</th>
                <th className="text-right">% tradeable</th>
                <th className="text-right">Direct-lakefront parcels</th>
                <th className="text-right">Annual turnover</th>
              </tr>
            </thead>
            <tbody>
              {shoreInventory.map((r) => (
                <tr key={r.community}>
                  <td className="serif font-medium">{r.community}</td>
                  <td className="text-right tabnums">{r.shoreKm.toFixed(1)}</td>
                  <td className="text-right tabnums">{r.pctPrivateTradeable}%</td>
                  <td className="text-right tabnums">
                    {r.parcelsMin}–{r.parcelsMax}
                  </td>
                  <td className="text-right tabnums">
                    {r.turnoverMin}–{r.turnoverMax}
                  </td>
                </tr>
              ))}
              <tr className="bg-parchment/70 font-semibold">
                <td>Total</td>
                <td className="text-right tabnums">{shoreTotals.shoreKm.toFixed(1)}</td>
                <td className="text-right tabnums">~50%</td>
                <td className="text-right tabnums">
                  {shoreTotals.parcelsMin}–{shoreTotals.parcelsMax}
                </td>
                <td className="text-right tabnums">
                  {shoreTotals.turnoverMin}–{shoreTotals.turnoverMax}
                </td>
              </tr>
            </tbody>
          </DataTable>
        </Figure>
      </Section>

      <Section tone="parchment">
        <SectionHeader
          kicker="Shore tiers"
          title="Three tiers, eight digits of spread."
          sub="Published Bodenrichtwerte and transacted €/m² cluster into three shore tiers. Tier 1+ (Feldafing park-edge) has traded as high as €70k/m² on land alone."
        />
        <div className="grid md:grid-cols-3 gap-4">
          {shoreTiers.map((t) => (
            <div
              key={t.id}
              className="bg-paper border border-rule rounded-md p-4 shadow-card"
              style={{ borderTop: `4px solid ${t.color}` }}
            >
              <div className="kicker text-gold-500">{t.id === "tier1p" ? "Trophy ceiling" : t.id === "tier1" ? "Top tier" : "Second tier"}</div>
              <div className="serif text-[1.1rem] text-ink-900 leading-tight mt-1">{t.name}</div>
              <div className="mt-2 tabnums text-ink-800">
                <span className="number-lg">€{(t.priceMinPerM2 / 1000).toFixed(0)}k</span>
                <span className="text-ink-500 mx-1">–</span>
                <span className="number-lg">€{(t.priceMaxPerM2 / 1000).toFixed(0)}k</span>
                <span className="text-sm text-ink-500"> /m²</span>
              </div>
              <ul className="mt-3 text-sm text-ink-700 space-y-0.5">
                {t.communities.map((n) => (
                  <li key={n}>· {n}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          kicker="Shore gradient"
          title="Price collapses with every metre inland."
          sub="Hedonic work on German alpine lakes converges on 3–6× multiples. Starnbergersee is at the top end: direct-lakefront parcels trade at 6–10× same-Gemeinde hillside and 15–25× inland no-view."
        />
        <Figure
          caption="% of direct-lakefront €/m² as a function of metres from waterline, for parcels with and without a preserved lake view."
          source={<SourceCite ids={["gutachter_lk_sta", "boris_bayern", "ev_starnberg"]} />}
          note="Functional approximation: with-view m = 0.10 + 0.90·exp(-d/60); no-view m = 0.10 + 0.30·exp(-d/80)."
        >
          <ShoreGradientChart />
        </Figure>
        <Figure
          caption="Positional multipliers and 2025 €/m² land-only ranges, holding community constant."
          source={<SourceCite ids={["boris_bayern", "gutachter_lk_sta", "ev_starnberg"]} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>Position</th>
                <th className="text-right">Multiplier (× direct)</th>
                <th className="text-right">€/m² (2025)</th>
              </tr>
            </thead>
            <tbody>
              {positionMultipliers.map((p) => (
                <tr key={p.label}>
                  <td>{p.label}</td>
                  <td className="text-right tabnums">
                    {p.min.toFixed(2)}–{p.max.toFixed(2)}×
                  </td>
                  <td className="text-right tabnums">
                    €{p.perM2Min.toFixed(1)}k – €{p.perM2Max.toFixed(1)}k
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Figure>
      </Section>

      <Section tone="parchment">
        <SectionHeader
          kicker="Legal regime"
          title="What governs what you can do on the shore."
          sub="The most common buyer mistake at the lake is pricing a waterfront parcel as if it were a zoned building lot. Five instruments govern what you can build, keep, replace, or remove."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {legalRegime.map((l) => (
            <Callout key={l.id} title={l.title}>
              {l.body}
            </Callout>
          ))}
        </div>
        <Figure
          className="mt-6"
          caption="Value impact of Seeuferweg (public lakeshore path) designations."
          source={<SourceCite ids={["baywg", "municipal_sites"]} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>Situation</th>
                <th>Price impact</th>
              </tr>
            </thead>
            <tbody>
              {seeuferwegImpact.map((s) => (
                <tr key={s.situation}>
                  <td>{s.situation}</td>
                  <td>{s.impact}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Figure>
      </Section>

      <Section>
        <SectionHeader kicker="Stege & Bootshäuser" title="Private docks carry the Altbestand premium." sub="WWA Weilheim grants essentially no new private Stege. A pre-existing Wasserrecht is the only way to own a usable dock." />
        <Figure
          caption="Added value of a preserved private Steg or Bootshaus (Altbestand, with Wasserrecht)."
          source={<SourceCite ids={["wwa_weilheim", "baywg", "ev_starnberg"]} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>Item</th>
                <th className="text-right">Added value €k</th>
              </tr>
            </thead>
            <tbody>
              {dockPremiums.map((d) => (
                <tr key={d.item}>
                  <td>{d.item}</td>
                  <td className="text-right tabnums">
                    {d.addValueEurK[0] === 0 && d.addValueEurK[1] === 0
                      ? "No realisable value (new permits essentially not granted)"
                      : `€${d.addValueEurK[0]}–€${d.addValueEurK[1]}k`}
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Figure>
      </Section>

      <Section tone="parchment">
        <SectionHeader
          kicker="The record"
          title="Notable €10M+ lakefront transactions, 2013–2025."
          sub="Every reported direct-lakefront sale above ~€10M the press captured in the last twelve years. Prices are ranges because Gutachterausschuss aggregates; precise clearing prices rarely public."
        />
        <Figure
          caption="Reported press midpoints for €10M+ direct-lakefront transactions."
          source={<SourceCite ids={["sz_starnberg", "merkur_sta", "handelsblatt_lux", "faz_immo"]} />}
        >
          <BarCompare
            data={txChart}
            xKey="year"
            yUnit="M"
            bars={[{ key: "priceMidM", label: "Midpoint (€M)", color: "#225d76" }]}
            height={320}
            layout="vertical"
          />
        </Figure>
        <Figure
          caption="Tabular detail."
          source={<SourceCite ids={["sz_starnberg", "handelsblatt_lux", "faz_immo", "merkur_sta"]} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>Year</th>
                <th>Community</th>
                <th>Type</th>
                <th className="text-right">Living m²</th>
                <th className="text-right">Land m²</th>
                <th className="text-right">Shore m</th>
                <th className="text-right">Range (€M)</th>
              </tr>
            </thead>
            <tbody>
              {notableTransactions.map((t) => (
                <tr key={`${t.year}-${t.community}`}>
                  <td className="tabnums">{t.year}</td>
                  <td className="serif font-medium">{t.community}</td>
                  <td>{t.type}</td>
                  <td className="text-right tabnums">{t.livingM2}</td>
                  <td className="text-right tabnums">{t.landM2}</td>
                  <td className="text-right tabnums">{t.shoreM}</td>
                  <td className="text-right tabnums">
                    €{t.priceMinM}–€{t.priceMaxM}M
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Figure>
      </Section>

      <Section>
        <SectionHeader kicker="Takeaways" title="Three compounding scarcities." />
        <Prose>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Physical shore is finite.</strong> 49 km of shoreline, 42% of which is perpetually
              off-market. 720–900 tradeable parcels on the private tape.
            </li>
            <li>
              <strong>Regulatory shore is tighter.</strong> Außenbereich + BayWG §21 + LSG overlays forbid
              new construction and width widen-outs. Every privately tradeable parcel is a Bestand bet.
            </li>
            <li>
              <strong>Docks are a closed set.</strong> No new private Stege. Altbestand Wasserrechte are
              the only viable path to a usable dock — an intangible worth €150k–€2.5M in the market.
            </li>
          </ol>
          <p>
            Those three scarcities, compounding, are the reason direct-lakefront prices passed the 2022
            peak in 2025 while the broader Kreis, Munich city, and the national HPI are still below it.
          </p>
        </Prose>
      </Section>
    </>
  );
}
