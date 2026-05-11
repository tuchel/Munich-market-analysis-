import Link from "next/link";
import { COMMUNITIES, NORTH_VS_SOUTH } from "@/lib/data/communities";
import { LakeMap } from "@/components/LakeMap";

export const metadata = {
  title: "Communities — Starnberger See Property Review",
  description:
    "Profiles, prestige rank, price benchmarks and outlook for all eight Starnbergersee lakeshore communities.",
};

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

const sorted = [...COMMUNITIES].sort((a, b) => a.prestigeRank - b.prestigeRank);

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">Per-community deep dives</div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Communities</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        Eight municipalities ring the Starnberger See. Prestige rank, price tiers, lakefront parcel
        scarcity, schools, commute, Hebesätze and character — sortable on a single map and
        rankable in a single table. Click a community for the full dossier.
      </p>

      {/* MAP */}
      <div className="mt-10">
        <LakeMap />
      </div>

      {/* NORTH vs SOUTH */}
      <section className="py-10 border-t border-rule mt-10">
        <div className="kicker mb-2">01 · The two halves</div>
        <h2 className="serif text-[1.7rem] text-ink-900 mb-4">North vs South / East — at a glance</h2>
        <div className="overflow-x-auto">
          <table className="editorial">
            <thead>
              <tr>
                <th>Metric</th>
                <th>{NORTH_VS_SOUTH.north.label}</th>
                <th>{NORTH_VS_SOUTH.south.label}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Combined pop.</td><td className="tabnums">{NORTH_VS_SOUTH.north.pop.toLocaleString("en-US")}</td><td className="tabnums">{NORTH_VS_SOUTH.south.pop.toLocaleString("en-US")}</td></tr>
              <tr><td>Median SFH €/m²</td><td className="tabnums">€ {NORTH_VS_SOUTH.north.sfhMedian.toLocaleString("en-US")}</td><td className="tabnums">€ {NORTH_VS_SOUTH.south.sfhMedian.toLocaleString("en-US")}</td></tr>
              <tr><td>Luxury P90 €/m²</td><td className="tabnums">€ {NORTH_VS_SOUTH.north.luxuryP90Range[0]/1000}k – {NORTH_VS_SOUTH.north.luxuryP90Range[1]/1000}k</td><td className="tabnums">€ {NORTH_VS_SOUTH.south.luxuryP90Range[0]/1000}k – {NORTH_VS_SOUTH.south.luxuryP90Range[1]/1000}k</td></tr>
              <tr><td>Direct-lake villa</td><td className="tabnums">€ {NORTH_VS_SOUTH.north.lakefrontVilla[0]}–{NORTH_VS_SOUTH.north.lakefrontVilla[1]}M</td><td className="tabnums">€ {NORTH_VS_SOUTH.south.lakefrontVilla[0]}–{NORTH_VS_SOUTH.south.lakefrontVilla[1]}M</td></tr>
              <tr><td>Commute to Marienplatz</td><td className="tabnums">{NORTH_VS_SOUTH.north.commute[0]}–{NORTH_VS_SOUTH.north.commute[1]} min</td><td className="tabnums">{NORTH_VS_SOUTH.south.commute[0]}–{NORTH_VS_SOUTH.south.commute[1]} min</td></tr>
              <tr><td>Gymnasium</td><td>{NORTH_VS_SOUTH.north.gymnasiums}</td><td>{NORTH_VS_SOUTH.south.gymnasiums}</td></tr>
              <tr><td>International school</td><td>{NORTH_VS_SOUTH.north.intlSchool}</td><td>{NORTH_VS_SOUTH.south.intlSchool}</td></tr>
              <tr><td>Hebesatz Gewerbe</td><td className="tabnums">{NORTH_VS_SOUTH.north.hebesatzRange[0]}–{NORTH_VS_SOUTH.north.hebesatzRange[1]} %</td><td className="tabnums">{NORTH_VS_SOUTH.south.hebesatzRange[0]} %</td></tr>
              <tr><td>Grundsteuer B</td><td className="tabnums">{NORTH_VS_SOUTH.north.grundRange[0]}–{NORTH_VS_SOUTH.north.grundRange[1]} %</td><td className="tabnums">{NORTH_VS_SOUTH.south.grundRange[0]}–{NORTH_VS_SOUTH.south.grundRange[1]} %</td></tr>
              <tr><td>5-yr trend SFH</td><td className="tabnums">+{NORTH_VS_SOUTH.north.trend5yr[0]}–{NORTH_VS_SOUTH.north.trend5yr[1]} %</td><td className="tabnums">+{NORTH_VS_SOUTH.south.trend5yr[0]}–{NORTH_VS_SOUTH.south.trend5yr[1]} %</td></tr>
              <tr><td>Character</td><td>{NORTH_VS_SOUTH.north.character}</td><td>{NORTH_VS_SOUTH.south.character}</td></tr>
              <tr><td>Buyer skew</td><td>{NORTH_VS_SOUTH.north.skew}</td><td>{NORTH_VS_SOUTH.south.skew}</td></tr>
              <tr><td>3–5 yr outlook</td><td>{NORTH_VS_SOUTH.north.outlook}</td><td>{NORTH_VS_SOUTH.south.outlook}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* RANKING TABLE */}
      <section className="py-10 border-t border-rule">
        <div className="kicker mb-2">02 · Prestige ranking</div>
        <h2 className="serif text-[1.7rem] text-ink-900 mb-4">Eight communities, ranked</h2>
        <div className="overflow-x-auto">
          <table className="editorial">
            <thead>
              <tr>
                <th>#</th>
                <th>Community</th>
                <th>Shore</th>
                <th>Pop.</th>
                <th>SFH €/m²</th>
                <th>Lux P90 €/m²</th>
                <th>Lakefront villa</th>
                <th>Commute</th>
                <th>Hebesatz B</th>
                <th>Outlook</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c) => (
                <tr key={c.slug} className="cursor-pointer">
                  <td className="tabnums text-ink-500">{c.prestigeRank}</td>
                  <td><Link href={`/communities/${c.slug}`} className="serif text-ink-900 hover:underline">{c.name}</Link></td>
                  <td className="text-xs text-ink-600 uppercase tracking-wider">{c.shore}</td>
                  <td className="tabnums">{c.pop.toLocaleString("en-US")}</td>
                  <td className="tabnums">€ {c.sfhPerM2.toLocaleString("en-US")}</td>
                  <td className="tabnums">€ {(c.luxuryP90[0]/1000).toFixed(0)}–{(c.luxuryP90[1]/1000).toFixed(0)}k</td>
                  <td className="tabnums">€ {c.lakefrontVilla[0]}–{c.lakefrontVilla[1]}M</td>
                  <td className="tabnums">{c.commuteMinSBahn ? `${c.commuteMinSBahn[0]}–${c.commuteMinSBahn[1]} min` : "—"}</td>
                  <td className="tabnums">{c.hebesatzGrund} %</td>
                  <td><span className={outlookChip(c.outlook)}>{c.outlook.replace("-", " ")}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CHARACTER CARDS */}
      <section className="py-10 border-t border-rule">
        <div className="kicker mb-2">03 · Character cards</div>
        <h2 className="serif text-[1.7rem] text-ink-900 mb-4">In one sentence each</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {sorted.map((c) => (
            <Link key={c.slug} href={`/communities/${c.slug}`} className="border border-rule rounded-md p-5 hover:bg-parchment/40 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="kicker">#{c.prestigeRank}</span>
                <span className={outlookChip(c.outlook)}>{c.outlook.replace("-", " ")}</span>
              </div>
              <div className="serif text-[1.3rem] text-ink-900">{c.name}</div>
              <div className="text-sm text-ink-600 mt-1">{c.rationale}</div>
              <div className="text-xs text-ink-500 mt-3 tabnums">
                Lakefront villa <strong>€ {c.lakefrontVilla[0]}–{c.lakefrontVilla[1]}M</strong> · Lux P90{" "}
                <strong>€ {(c.luxuryP90[0]/1000).toFixed(0)}–{(c.luxuryP90[1]/1000).toFixed(0)}k/m²</strong> · 5-yr trend{" "}
                <strong>+{c.trend5yr.sfh} %</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="rule-double mt-12 pt-6 source-cite">
        Profiles synthesised from E&amp;V Marktreport Starnberger See, BORIS-Bayern Bodenrichtwerte 2024,
        Gutachterausschuss LK Starnberg, LfStat Gemeindedaten, individual Gemeinde Haushaltssatzungen,
        and SZ/Merkur archives. Full sources on{" "}
        <Link href="/sources" className="underline">/sources</Link>; method on{" "}
        <Link href="/methodology" className="underline">/methodology</Link>.
      </div>
    </article>
  );
}
