import Link from "next/link";
import { MarketLineChart, palette } from "@/components/charts/dynamic";
import { SHORE_GRADIENT_POINTS, PARCELS_BY_COMMUNITY, PREMIUM_MULTIPLES, NOTABLE_TRANSACTIONS, UFERSCHUTZ_REGIME } from "@/lib/data/lakefront";

export const metadata = {
  title: "Lakefront Premium — Starnberger See Property Review",
  description:
    "Scarcity, shore gradient, Uferschutz, Denkmalschutz, Seeuferweg case law and notable lakefront transactions on the Starnberger See.",
};

export const dynamic = "force-dynamic";

function S({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 md:py-14 border-t border-rule">
      <div className="kicker mb-2">{kicker}</div>
      <h2 className="serif text-[1.7rem] md:text-[1.9rem] tracking-tight text-ink-900 mb-5 leading-tight">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

const totalParcels = PARCELS_BY_COMMUNITY.reduce(
  (acc, c) => ({ lo: acc.lo + c.parcels[0], hi: acc.hi + c.parcels[1] }),
  { lo: 0, hi: 0 }
);
const totalTurnover = PARCELS_BY_COMMUNITY.reduce(
  (acc, c) => ({ lo: acc.lo + c.turnover[0], hi: acc.hi + c.turnover[1] }),
  { lo: 0, hi: 0 }
);

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">Premium sub-market</div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Lakefront Premium</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        Direct-waterfront on the Starnberger See is a scarcity good. Only ~50 % of the ~49 km shoreline is
        privately tradeable; the rest is Wittelsbach, monastery, state forestry, conservation reed-belt and
        public park. The legal regime — BayWG, BauGB §35, Landschaftsschutz, Denkmalschutz, GEG —
        compounds the scarcity by making new supply effectively impossible to create.
      </p>

      <div className="mt-10 grid md:grid-cols-4 gap-3 text-sm">
        <div className="border border-rule rounded-md p-4 bg-paper">
          <div className="kicker mb-1">Shore length</div>
          <div className="number-lg text-ink-900 tabnums">~ 49 km</div>
          <div className="text-xs text-ink-500 mt-1">2nd largest Bavarian lake by area</div>
        </div>
        <div className="border border-rule rounded-md p-4 bg-paper">
          <div className="kicker mb-1">Privately tradeable shore</div>
          <div className="number-lg text-ink-900 tabnums">~ 50 %</div>
          <div className="text-xs text-ink-500 mt-1">~35–45 % off-market permanently</div>
        </div>
        <div className="border border-rule rounded-md p-4 bg-paper">
          <div className="kicker mb-1">Lakefront parcels</div>
          <div className="number-lg text-ink-900 tabnums">{totalParcels.lo}–{totalParcels.hi}</div>
          <div className="text-xs text-ink-500 mt-1">Total private, all 8 communities</div>
        </div>
        <div className="border border-rule rounded-md p-4 bg-paper">
          <div className="kicker mb-1">Annual transactions</div>
          <div className="number-lg text-ink-900 tabnums">{totalTurnover.lo}–{totalTurnover.hi}/yr</div>
          <div className="text-xs text-ink-500 mt-1">Of which 2–5 &gt; € 10M</div>
        </div>
      </div>

      <S kicker="01" title="Shore gradient model — €/m² vs distance from waterline">
        <p className="prose-editorial max-w-prose mb-4">
          A calibrated decay curve: direct waterfront sets the baseline (1.00× ≈ € 35,000/m² land in
          Tier-1 communities), and value falls fast with distance. The view/no-view distinction creates
          a hard step function — losing the lake view at a given distance roughly halves price. Functional
          approximation (with view): <span className="font-mono text-sm">m ≈ 0.10 + 0.90·exp(−d/60)</span>.
        </p>
        <MarketLineChart
          data={SHORE_GRADIENT_POINTS as any}
          xKey="d"
          series={[
            { key: "eurPerM2WithView", label: "With lake view (€/m²)", color: palette.gold, type: "line" },
            { key: "eurPerM2NoView", label: "No view (€/m²)", color: palette.primary, type: "line" },
          ]}
          yLabel="€ / m² land"
          yFormat={(v) => `€${(v / 1000).toFixed(0)}k`}
          height={320}
        />
        <p className="prose-editorial max-w-prose mt-4 text-sm text-ink-600">
          x-axis: distance from waterline in metres. Curve calibrated to E&amp;V Lake Property edition
          benchmarks and hedonic-pricing literature.
        </p>
      </S>

      <S kicker="02" title="Price-premium multiples ladder">
        <p className="prose-editorial max-w-prose mb-4">
          The full position ladder, indexed to direct waterfront = 1.00×. A Steg with valid Altbestand
          Wasserrecht adds 15–30 % over the baseline; an enforced Seeuferweg subtracts 20–35 %.
        </p>
        <table className="editorial">
          <thead>
            <tr><th>Position</th><th>Multiplier</th><th>€ / m² land (2025)</th></tr>
          </thead>
          <tbody>
            {PREMIUM_MULTIPLES.map((p, i) => (
              <tr key={i} className={i === 1 ? "bg-parchment" : ""}>
                <td>{p.position}</td>
                <td className="tabnums">{p.multiplier}</td>
                <td className="tabnums">{p.eurPerM2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </S>

      <S kicker="03" title="Parcels & turnover by community">
        <table className="editorial">
          <thead>
            <tr><th>Community</th><th>Shore (km)</th><th>% private</th><th>Lakefront parcels</th><th>Annual turnover</th></tr>
          </thead>
          <tbody>
            {PARCELS_BY_COMMUNITY.map((c) => (
              <tr key={c.community}>
                <td className="serif">{c.community}</td>
                <td className="tabnums">{c.shoreKm.toFixed(1)}</td>
                <td className="tabnums">{c.privatePct} %</td>
                <td className="tabnums">{c.parcels[0]}–{c.parcels[1]}</td>
                <td className="tabnums">{c.turnover[0]}–{c.turnover[1]} / yr</td>
              </tr>
            ))}
            <tr className="bg-parchment">
              <td><strong>Total</strong></td>
              <td className="tabnums"><strong>~ 48.5</strong></td>
              <td className="tabnums"><strong>~ 50 %</strong></td>
              <td className="tabnums"><strong>{totalParcels.lo}–{totalParcels.hi}</strong></td>
              <td className="tabnums"><strong>{totalTurnover.lo}–{totalTurnover.hi} / yr</strong></td>
            </tr>
          </tbody>
        </table>
      </S>

      <S kicker="04" title="The legal regime — four overlapping layers">
        <div className="prose-editorial max-w-prose space-y-4">
          <div>
            <h3 className="serif text-[1.15rem] text-ink-900 mb-1">BayWG (Bayerisches Wassergesetz)</h3>
            <p>Article 21 sets a 5 m <em>Gewässerrandstreifen</em> at lakes (Bavaria default), routinely extended to 10–30 m via municipal overlay, and to 40–50 m where a B-Plan or LSG-Verordnung applies. Article 27 establishes the public right of passage along navigable waters — the legal hook for Seeuferweg designation. New private <em>Steg</em> permits from Wasserwirtschaftsamt Weilheim are essentially unobtainable outside Bestandsersatz; <strong>Altbestand Stege are a distinct asset line worth € 150k–€ 2.5M</strong> depending on size.</p>
          </div>
          <div>
            <h3 className="serif text-[1.15rem] text-ink-900 mb-1">BauGB §35 Außenbereich</h3>
            <p>Most lakefront outside an existing qualified Bebauungsplan sits in the <em>Außenbereich</em>, where new building is prohibited save for Bestandsschutz-replacement and privileged uses. <strong>This is the cornerstone value driver for Altbestand: you cannot replicate it</strong>. A derelict 1920s Bootshaus with 60 m² footprint in Außenbereich can carry €1.5–3M of pure-Baurecht value because of the irreplaceable replacement-right it embeds.</p>
          </div>
          <div>
            <h3 className="serif text-[1.15rem] text-ink-900 mb-1">LSG &amp; FFH (Landschaftsschutz / Natura 2000)</h3>
            <p>The "Starnberger See Ost" and "Starnberger See West" LSG-Verordnungen cover almost the entire non-village shoreline. The Starnberger See is also FFH-Gebiet DE-8033-371 (Natura 2000). LSG controls tree removal, hedging, fencing, Steg aesthetics, exterior lighting. Combined with Denkmalschutz where applicable, the effective construction envelope is routinely 20–30 % below paper-BGF.</p>
          </div>
          <div>
            <h3 className="serif text-[1.15rem] text-ink-900 mb-1">Denkmalschutz (BayDSchG) + GEG</h3>
            <p>Many Starnbergersee villas (Jugendstil, Historismus, Heimatstil 1870–1930) are listed individually or as ensemble. Obligations: Erlaubnis for any externally-visible change. Offset: <strong>§7i EStG AfA — 9 %×8 yr + 7 %×4 yr on qualifying restoration costs</strong>, a decisive tax-shelter for high-income buyers. GEG §105 exempts Denkmal from most modern energy mandates; the trade-off is higher running costs.</p>
          </div>
        </div>
      </S>

      <S kicker="05" title="Uferschutz regime by community">
        <table className="editorial">
          <thead>
            <tr><th>Community</th><th>LSG coverage</th><th>Effective setback</th><th>Seeuferweg</th><th>Denkmal density</th></tr>
          </thead>
          <tbody>
            {UFERSCHUTZ_REGIME.map((r) => (
              <tr key={r.community}>
                <td className="serif">{r.community}</td>
                <td>{r.lsg}</td>
                <td>{r.setback}</td>
                <td>{r.path}</td>
                <td>{r.denkmal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </S>

      <S kicker="06" title="The Seeuferweg wars">
        <div className="prose-editorial max-w-prose">
          <p>BayWG Art. 27 grants the principle of public passage along navigable waters. The Bayerischer Verwaltungsgerichtshof has affirmed that municipalities may designate a <em>Seeuferweg</em> across private parcels under tight conditions (proportionality, no building encroachment, compensation or tolerance).</p>
          <p><strong>Münsing</strong> spent more than 15 years in litigation over the Ammerland/Ambach stretch — multiple BayVGH rulings (Az. 8 B series through the 2010s). <strong>Berg</strong> had parallel disputes around Assenbuch/Kempfenhausen. Outcomes mixed: some stretches opened via easement (path 1–3 m inland of strict Uferlinie); others remain closed.</p>
          <p><strong>Value impact:</strong></p>
          <ul>
            <li>Parcel with enforced Seeuferweg cutting through garden/shoreline: <strong>−20–35 %</strong> of direct-lakefront premium.</li>
            <li>Path routed along driveway boundary: <strong>−5–10 %</strong>.</li>
            <li>Parcel in "under review" zone: <strong>−5–12 %</strong> latent discount.</li>
          </ul>
          <p>For any specific Seegrundstück: pull the LSG-Verordnung text from the Landratsamt, the FNP-Fortschreibung status from the Gemeinde, and ask explicitly whether the parcel is in a Seeuferweg-Prüfgebiet.</p>
        </div>
      </S>

      <S kicker="07" title="Notable transactions (press-reported)">
        <p className="prose-editorial max-w-prose mb-4">
          The Starnbergersee ultra-prime market is heavily obscured by share-deal structures and family
          holding vehicles. Closed prices in the Gutachterausschuss Kaufpreissammlung are confidential.
          These are press-reported ranges from SZ, Merkur, FAZ and Handelsblatt archives — treat as
          ranges, not point values.
        </p>
        <div className="overflow-x-auto">
          <table className="editorial">
            <thead>
              <tr><th>Year</th><th>Community</th><th>Type</th><th>Living m²</th><th>Land m²</th><th>Shore m</th><th>Reported range</th></tr>
            </thead>
            <tbody>
              {NOTABLE_TRANSACTIONS.map((t, i) => (
                <tr key={i}>
                  <td className="tabnums">{t.year}</td>
                  <td className="serif">{t.community}</td>
                  <td>{t.type}</td>
                  <td className="tabnums">{t.living.toLocaleString("en-US")}</td>
                  <td className="tabnums">{t.land.toLocaleString("en-US")}</td>
                  <td className="tabnums">{t.shore}</td>
                  <td className="tabnums">{t.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-500 italic mt-3">
          €/m² gradient implied by these closes: € 25,000–55,000/m² land for trophy lakefront,
          consistent with the Tier-1 premium-multiples ladder.
        </p>
      </S>

      <S kicker="08" title="The hedonic premium">
        <div className="prose-editorial max-w-prose">
          <p>Academic hedonic-pricing literature on Bodensee, Wörthersee, Zürichsee and US lakefront markets suggests a <strong>3–6× lakefront premium</strong> over inland-equivalent properties.</p>
          <p>Starnbergersee empirically <em>exceeds</em> this. Direct-lakefront €/m² land routinely trades at:</p>
          <ul>
            <li><strong>6–10×</strong> the equivalent hillside-view parcel in the same Gemeinde</li>
            <li><strong>15–25×</strong> the inland no-view interior-village equivalent</li>
          </ul>
          <p>The explanation: scarcity × Munich-wealth demand × regulatory impossibility of creating new supply. The premium has widened, not narrowed, through the 2015–2025 cycle — see <Link href="/market" className="underline">10-Year Market</Link>.</p>
        </div>
      </S>

      <S kicker="09" title="Reading the lakefront market in 2026">
        <div className="prose-editorial max-w-prose">
          <ol>
            <li>True lakefront stock is ~720–905 private parcels. Annual turnover 13–23 transactions; only 2–5 in the &gt;€10M trophy band.</li>
            <li>Tier-1 communities (Berg/Leoni, Feldafing, Tutzing, Pöcking, Münsing-Ammerland) print €22–55k/m² land. Tier-2 (Starnberg, Seeshaupt, Bernried) print €15–32k/m² land.</li>
            <li>Steg Altbestand and Bootshaus permits are distinct assets; new permits unobtainable.</li>
            <li>Seeuferweg status is the single most impactful overlay risk after Bestandsschutz status.</li>
            <li>Denkmal villas carry a complex risk/reward: high restoration capex, soft GEG exemption, powerful AfA shelter via §§7i, 11b EStG.</li>
            <li>Construction-cost floor is +61 % cumulative since 2015 — replacement-cost defence is durable.</li>
          </ol>
          <p className="serif italic text-ink-700 mt-4">
            For a primary-residence buyer at €5–10M, the realistic lakefront set is: Münsing/Ambach lakefront (smaller, older); Bernried (limited inventory); Seeshaupt south end (commute drag); Tutzing west shore (rare); occasional Pöcking second-row. Tier-1 north-shore lakefront is structurally above €10M except in distressed conditions.
          </p>
        </div>
      </S>

      <div className="rule-double mt-12 pt-6 source-cite">
        Cross-references the <Link href="/communities" className="underline">Communities</Link>,{" "}
        <Link href="/trends/policy-climate" className="underline">Policy &amp; Climate</Link> and{" "}
        <Link href="/market" className="underline">10-Year Market</Link> pages. Statute texts (BayWG, BauGB, BayDSchG, GEG) and BayVGH case law on{" "}
        <Link href="/sources" className="underline">/sources</Link>.
      </div>
    </article>
  );
}
