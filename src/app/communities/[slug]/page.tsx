import Link from "next/link";
import { notFound } from "next/navigation";
import { COMMUNITIES } from "@/lib/data/communities";
import { LakeMap } from "@/components/LakeMap";

export function generateStaticParams() {
  return COMMUNITIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = COMMUNITIES.find((c) => c.slug === params.slug);
  if (!c) return {};
  return {
    title: `${c.name} — Community profile`,
    description: `Profile of ${c.name} on the Starnberger See: prestige rank #${c.prestigeRank}, SFH €${c.sfhPerM2.toLocaleString("en-US")}/m², lakefront villa €${c.lakefrontVilla[0]}–${c.lakefrontVilla[1]}M.`,
  };
}

function Section({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-8 md:py-10 border-t border-rule">
      <div className="kicker mb-2">{kicker}</div>
      <h2 className="serif text-[1.5rem] md:text-[1.7rem] tracking-tight text-ink-900 mb-4 leading-tight">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function outlookChip(o: string) {
  const map: Record<string, string> = {
    "bullish": "chip chip-bull",
    "neutral-bullish": "chip chip-bull",
    "neutral": "chip chip-neutral",
    "neutral-bearish": "chip chip-bear",
    "bearish": "chip chip-bear",
  };
  return map[o] ?? "chip chip-neutral";
}

export default function Page({ params }: { params: { slug: string } }) {
  const c = COMMUNITIES.find((c) => c.slug === params.slug);
  if (!c) return notFound();

  // sibling navigation (by prestige rank order)
  const sorted = [...COMMUNITIES].sort((a, b) => a.prestigeRank - b.prestigeRank);
  const idx = sorted.findIndex((x) => x.slug === c.slug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3"><Link href="/communities" className="underline">← Communities</Link> · #{c.prestigeRank} of 8</div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">{c.name}</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">{c.rationale}</p>

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span className={outlookChip(c.outlook)}>{c.outlook.replace("-", " ")}</span>
        <span className="chip chip-neutral">{c.shore} shore</span>
        {c.gymnasium ? <span className="chip chip-bull">Gymnasium</span> : <span className="chip chip-neutral">No Gymnasium</span>}
        {c.intlSchool ? <span className="chip chip-bull">Intl. school</span> : null}
      </div>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="border border-rule rounded-md p-4 bg-paper">
          <div className="kicker mb-1">SFH €/m²</div>
          <div className="number-lg text-ink-900 tabnums">€ {c.sfhPerM2.toLocaleString("en-US")}</div>
          <div className="text-xs text-ink-500 mt-1">5-yr +{c.trend5yr.sfh} %</div>
        </div>
        <div className="border border-rule rounded-md p-4 bg-paper">
          <div className="kicker mb-1">Luxury P90 €/m²</div>
          <div className="number-lg text-ink-900 tabnums">€ {(c.luxuryP90[0]/1000).toFixed(0)}–{(c.luxuryP90[1]/1000).toFixed(0)}k</div>
          <div className="text-xs text-ink-500 mt-1">€3M+ segment</div>
        </div>
        <div className="border border-rule rounded-md p-4 bg-paper">
          <div className="kicker mb-1">Lakefront villa</div>
          <div className="number-lg text-ink-900 tabnums">€ {c.lakefrontVilla[0]}–{c.lakefrontVilla[1]}M</div>
          <div className="text-xs text-ink-500 mt-1">Direct waterfront</div>
        </div>
        <div className="border border-rule rounded-md p-4 bg-paper">
          <div className="kicker mb-1">Hebesatz B</div>
          <div className="number-lg text-ink-900 tabnums">{c.hebesatzGrund} %</div>
          <div className="text-xs text-ink-500 mt-1">Grundsteuer multiplier</div>
        </div>
      </div>

      {/* LOCATION + MAP */}
      <Section kicker="01" title="On the map">
        <LakeMap highlight={c.slug} />
      </Section>

      {/* DEMOGRAPHICS */}
      <Section kicker="02" title="Demographics">
        <table className="editorial">
          <tbody>
            <tr><td>Population</td><td className="tabnums">{c.pop.toLocaleString("en-US")}</td></tr>
            <tr><td>Median age</td><td className="tabnums">{c.medianAge}</td></tr>
            <tr><td>Median household income</td><td className="tabnums">€ {c.hhMedianK}k / yr</td></tr>
            <tr><td>Share &gt; €150k HH</td><td className="tabnums">{c.hiHHSharePct} %</td></tr>
            <tr><td>Ortsteile / sub-neighbourhoods</td><td>{c.ortsteile.join(", ")}</td></tr>
          </tbody>
        </table>
      </Section>

      {/* PRICING DETAIL */}
      <Section kicker="03" title="Pricing tiers">
        <table className="editorial">
          <thead>
            <tr><th>Position</th><th>Range</th><th>Note</th></tr>
          </thead>
          <tbody>
            <tr><td>Direct lakefront villa</td><td className="tabnums">€ {c.lakefrontVilla[0]}–{c.lakefrontVilla[1]}M</td><td>Bodenrichtwert €{(c.brwLakefront[0]/1000).toFixed(0)}–{(c.brwLakefront[1]/1000).toFixed(0)}k/m²</td></tr>
            <tr><td>Second-row / near-lake</td><td className="tabnums">€ {c.secondRow[0]}–{c.secondRow[1]}M</td><td>30–80m from waterline, often view-preserved</td></tr>
            <tr><td>Hillside / interior</td><td className="tabnums">€ {c.hillside[0]}–{c.hillside[1]}M</td><td>View vs no-view dominates</td></tr>
            <tr><td>SFH median €/m²</td><td className="tabnums">€ {c.sfhPerM2.toLocaleString("en-US")}</td><td>5-yr trend +{c.trend5yr.sfh} %</td></tr>
            <tr><td>ETW median €/m²</td><td className="tabnums">€ {c.etwPerM2.toLocaleString("en-US")}</td><td>5-yr trend +{c.trend5yr.etw} %</td></tr>
            <tr><td>Luxury P90 €/m² (est.)</td><td className="tabnums">€ {(c.luxuryP90[0]/1000).toFixed(0)}–{(c.luxuryP90[1]/1000).toFixed(0)}k</td><td>P90 of &gt;€3M segment, broker-derived</td></tr>
          </tbody>
        </table>
      </Section>

      {/* SCARCITY */}
      <Section kicker="04" title="Lakefront scarcity">
        <table className="editorial">
          <tbody>
            <tr><td>Lakefront share of municipality perimeter</td><td className="tabnums">~ {c.shorePct} %</td></tr>
            <tr><td>Estimated private lakefront parcels</td><td className="tabnums">{c.lakefrontPrivateParcels[0]}–{c.lakefrontPrivateParcels[1]}</td></tr>
            <tr><td>Annual lakefront transactions</td><td className="tabnums">~ {c.annualLakefrontTurnover[0]}–{c.annualLakefrontTurnover[1]} / yr</td></tr>
          </tbody>
        </table>
        <p className="mt-3 text-sm text-ink-600">Aggregated across the lake there are roughly 720–905 private lakefront parcels, with 13–23 transactions per year — of which 2–5 sit in the &gt;€10M ultra-prime band. See <Link href="/lakefront" className="underline">Lakefront Premium</Link> for shore-gradient analysis.</p>
      </Section>

      {/* COMMUTE + SCHOOLS */}
      <Section kicker="05" title="Commute, schools, infrastructure">
        <table className="editorial">
          <tbody>
            <tr><td>S-Bahn to Marienplatz</td><td className="tabnums">{c.commuteMinSBahn[0]}–{c.commuteMinSBahn[1]} min</td></tr>
            <tr><td>Car (A95 / A952)</td><td className="tabnums">{c.commuteMinCar[0]}–{c.commuteMinCar[1]} min</td></tr>
            <tr><td>Gymnasium in community?</td><td>{c.gymnasium ? "Yes" : "No (use Starnberg or Tutzing)"}</td></tr>
            <tr><td>International school access?</td><td>{c.intlSchool ? "Yes (MIS Buchhof/Percha)" : "No on-shore option"}</td></tr>
          </tbody>
        </table>
      </Section>

      {/* TAX */}
      <Section kicker="06" title="Tax & holding profile">
        <table className="editorial">
          <tbody>
            <tr><td>Gewerbesteuer-Hebesatz</td><td className="tabnums">{c.hebesatzGewerbe} %</td></tr>
            <tr><td>Grundsteuer B Hebesatz</td><td className="tabnums">{c.hebesatzGrund} %</td></tr>
            <tr><td>Zweitwohnungsteuer</td><td>{c.zws ? `${c.zws.rate} % of ${c.zws.basis}` : "none"}</td></tr>
          </tbody>
        </table>
        <p className="mt-3 text-sm text-ink-600">
          As a primary-residence buyer, the Zweitwohnungsteuer is N/A (Hauptwohnsitz). Bavaria's
          Grundsteuer-Flächenmodell means a €10M lake villa pays roughly the same as an interior-village
          home of equal m². See <Link href="/trends/policy-climate" className="underline">Policy &amp; Climate</Link> for the full tax stack.
        </p>
      </Section>

      {/* TRANSACTIONS */}
      <Section kicker="07" title="Notable transactions">
        <ul className="text-sm text-ink-700 list-disc pl-5 space-y-1">
          {c.notableTx.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
        <p className="mt-3 text-xs text-ink-500 italic">
          Press-reported; closing prices not always publicly verifiable.
        </p>
      </Section>

      {/* BUYER + OUTLOOK */}
      <Section kicker="08" title="Buyer profile & outlook">
        <p className="text-sm text-ink-700"><strong>Typical buyer:</strong> {c.buyerProfile}</p>
        <p className="text-sm text-ink-700 mt-3">
          <strong>3–5 yr outlook:</strong> <span className={outlookChip(c.outlook)}>{c.outlook.replace("-", " ")}</span> — {c.rationale}
        </p>
      </Section>

      {/* CLIMATE */}
      <Section kicker="09" title="Climate & flood">
        <table className="editorial">
          <tbody>
            <tr><td>HQ100 risk</td><td>{c.flood}</td></tr>
            <tr><td>Critical zones / heat outlook</td><td>{c.climateNote}</td></tr>
          </tbody>
        </table>
      </Section>

      {/* NAV */}
      <div className="mt-12 pt-6 border-t border-rule flex flex-col md:flex-row md:items-center justify-between gap-3">
        {prev ? (
          <Link href={`/communities/${prev.slug}`} className="text-sm text-ink-600 hover:text-ink-900">
            ← #{prev.prestigeRank} {prev.name}
          </Link>
        ) : <span />}
        <Link href="/communities" className="text-sm text-ink-600 hover:text-ink-900">All communities</Link>
        {next ? (
          <Link href={`/communities/${next.slug}`} className="text-sm text-ink-600 hover:text-ink-900">
            #{next.prestigeRank} {next.name} →
          </Link>
        ) : <span />}
      </div>
    </article>
  );
}
