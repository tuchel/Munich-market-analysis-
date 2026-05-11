"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { COMMUNITIES, type Community } from "@/lib/data/communities";

const ROWS: Array<{ key: string; label: string; render: (c: Community) => string; numeric?: boolean }> = [
  { key: "rank", label: "Prestige rank", render: (c) => `#${c.prestigeRank}` },
  { key: "shore", label: "Shore position", render: (c) => c.shore.toUpperCase() },
  { key: "pop", label: "Population", render: (c) => c.pop.toLocaleString("en-US") },
  { key: "medianAge", label: "Median age", render: (c) => `${c.medianAge}` },
  { key: "hhMedianK", label: "Median HH income", render: (c) => `€ ${c.hhMedianK}k` },
  { key: "hiHHSharePct", label: "Share > €150k HH", render: (c) => `${c.hiHHSharePct} %` },
  { key: "sfhPerM2", label: "SFH €/m²", render: (c) => `€ ${c.sfhPerM2.toLocaleString("en-US")}` },
  { key: "etwPerM2", label: "ETW €/m²", render: (c) => `€ ${c.etwPerM2.toLocaleString("en-US")}` },
  { key: "trend5yr", label: "5-yr trend (SFH)", render: (c) => `+${c.trend5yr.sfh} %` },
  { key: "luxuryP90", label: "Luxury P90 €/m²", render: (c) => `€ ${(c.luxuryP90[0] / 1000).toFixed(0)}–${(c.luxuryP90[1] / 1000).toFixed(0)}k` },
  { key: "lakefrontVilla", label: "Lakefront villa", render: (c) => `€ ${c.lakefrontVilla[0]}–${c.lakefrontVilla[1]}M` },
  { key: "secondRow", label: "2nd-row villa", render: (c) => `€ ${c.secondRow[0]}–${c.secondRow[1]}M` },
  { key: "hillside", label: "Hillside villa", render: (c) => `€ ${c.hillside[0]}–${c.hillside[1]}M` },
  { key: "parcels", label: "Private lakefront parcels", render: (c) => `${c.lakefrontPrivateParcels[0]}–${c.lakefrontPrivateParcels[1]}` },
  { key: "turnover", label: "Annual lakefront turnover", render: (c) => `${c.annualLakefrontTurnover[0]}–${c.annualLakefrontTurnover[1]} / yr` },
  { key: "commuteS", label: "Commute via S-Bahn", render: (c) => `${c.commuteMinSBahn[0]}–${c.commuteMinSBahn[1]} min` },
  { key: "commuteC", label: "Commute by car", render: (c) => `${c.commuteMinCar[0]}–${c.commuteMinCar[1]} min` },
  { key: "gym", label: "Gymnasium", render: (c) => (c.gymnasium ? "Yes" : "No") },
  { key: "intl", label: "International school", render: (c) => (c.intlSchool ? "Yes" : "No") },
  { key: "gewerbe", label: "Hebesatz Gewerbe", render: (c) => `${c.hebesatzGewerbe} %` },
  { key: "grundB", label: "Hebesatz Grundsteuer B", render: (c) => `${c.hebesatzGrund} %` },
  { key: "zws", label: "Zweitwohnungsteuer", render: (c) => (c.zws ? `${c.zws.rate} %` : "—") },
  { key: "flood", label: "HQ100 risk", render: (c) => c.flood },
  { key: "outlook", label: "3–5 yr outlook", render: (c) => c.outlook.replace("-", " ") },
];

const sortedCommunities = [...COMMUNITIES].sort((a, b) => a.prestigeRank - b.prestigeRank);

export default function Page() {
  const [selected, setSelected] = useState<string[]>(["berg", "poecking", "tutzing", "muensing"]);

  const communities = useMemo(
    () => selected.map((s) => sortedCommunities.find((c) => c.slug === s)).filter(Boolean) as Community[],
    [selected]
  );

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) {
        if (prev.length <= 2) return prev; // min 2
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= 4) return [...prev.slice(1), slug]; // max 4
      return [...prev, slug];
    });
  };

  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">
        <Link href="/tools" className="underline">← Tools</Link> · Comparator
      </div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Neighbourhood comparator</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        Pick 2–4 communities to compare side-by-side across the metrics that matter for a primary-residence
        decision. Selection is preserved as you toggle.
      </p>

      {/* Picker */}
      <section className="mt-10 border-y border-rule py-5">
        <div className="kicker mb-3">Select 2–4 communities</div>
        <div className="flex flex-wrap gap-2">
          {sortedCommunities.map((c) => {
            const active = selected.includes(c.slug);
            return (
              <button
                key={c.slug}
                onClick={() => toggle(c.slug)}
                className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
                  active
                    ? "bg-lake-500 text-paper border-lake-500"
                    : "bg-paper text-ink-700 border-rule hover:bg-parchment"
                }`}
              >
                #{c.prestigeRank} {c.name}
              </button>
            );
          })}
        </div>
        <div className="text-xs text-ink-500 mt-2">{communities.length} selected · min 2, max 4</div>
      </section>

      {/* Comparison table */}
      <section className="py-8 overflow-x-auto">
        <table className="editorial w-full">
          <thead>
            <tr>
              <th className="w-1/4">Metric</th>
              {communities.map((c) => (
                <th key={c.slug}>
                  <Link href={`/communities/${c.slug}`} className="serif text-ink-900 hover:underline">
                    {c.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.key}>
                <td className="text-ink-600">{r.label}</td>
                {communities.map((c) => (
                  <td key={c.slug} className="tabnums">{r.render(c)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Rationales */}
      <section className="py-8 border-t border-rule">
        <div className="kicker mb-3">Outlook rationale by community</div>
        <div className="grid md:grid-cols-2 gap-3">
          {communities.map((c) => (
            <div key={c.slug} className="border border-rule rounded-md p-4 bg-paper">
              <div className="serif text-[1.05rem] text-ink-900">{c.name}</div>
              <div className="text-xs text-ink-500 mt-0.5">3–5 yr: {c.outlook.replace("-", " ")}</div>
              <p className="text-sm text-ink-700 mt-2 leading-relaxed">{c.rationale}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rule-double mt-12 pt-6 source-cite">
        Comparator data sourced from the same typed registry as the{" "}
        <Link href="/communities" className="underline">Communities</Link> pages — see{" "}
        <Link href="/methodology" className="underline">/methodology</Link> for the data layer.
      </div>
    </article>
  );
}
