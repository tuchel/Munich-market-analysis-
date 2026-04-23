"use client";

import { useState } from "react";
import { RadarCompare } from "@/components/charts/RadarCompare";
import { DataTable } from "@/components/DataTable";
import { Chip, ratingTone, ratingLabel } from "@/components/Chip";
import { allCommunities, type Community } from "@/data/communities";

// Score on 0–10 for each radar axis
function score(c: Community) {
  return {
    "€/m² (lower is better)": Math.max(
      0,
      Math.min(10, 10 - ((c.sfhMedianEurPerM2 - 8000) / 800))
    ),
    "5-yr appreciation": Math.max(0, Math.min(10, ((c.fiveYrSfh || 0) - 0.15) / 0.02)),
    "Commute (lower is better)": Math.max(0, Math.min(10, 10 - (c.commuteMaxMin - 25) / 4.5)),
    "Schools": (c.gymnasium ? 5 : 2) + (c.internationalSchoolMin !== undefined ? Math.max(0, 5 - c.internationalSchoolMin / 5) : 0),
    "Tax friendliness": Math.max(0, Math.min(10, 10 - (c.gewStHebesatz - 240) / 25)),
    "Liquidity": c.kind === "lake" ? (c.population / 2800) : Math.min(10, c.population / 9000),
    "Lakefront depth": c.lakefrontVillaMaxM ? Math.min(10, c.lakefrontVillaMaxM / 3.5) : 0,
    "Prestige": c.prestigeRank ? Math.max(0, 10 - c.prestigeRank * 1.2) : 6,
  } as Record<string, number>;
}

export function ComparatorTool() {
  const initial = ["berg", "feldafing", "poecking"];
  const [selected, setSelected] = useState<string[]>(initial);

  const toggle = (slug: string) => {
    setSelected((s) => {
      if (s.includes(slug)) return s.filter((x) => x !== slug);
      if (s.length >= 4) return s;
      return [...s, slug];
    });
  };

  const objs = selected
    .map((slug) => allCommunities.find((c) => c.slug === slug))
    .filter(Boolean) as Community[];

  const axes = Object.keys(score(objs[0] || allCommunities[0]));
  const radarData = axes.map((axis) => {
    const row = { metric: axis } as { metric: string; [k: string]: string | number };
    objs.forEach((c) => {
      row[c.name] = +score(c)[axis].toFixed(2);
    });
    return row;
  });

  return (
    <div className="space-y-6">
      <div className="bg-paper border border-rule rounded-md p-4 shadow-card">
        <div className="kicker text-ink-500 mb-2">Pick 2–4 communities</div>
        <div className="flex flex-wrap gap-2">
          {allCommunities.map((c) => {
            const active = selected.includes(c.slug);
            const disabled = !active && selected.length >= 4;
            return (
              <button
                key={c.slug}
                onClick={() => toggle(c.slug)}
                disabled={disabled}
                className={`px-3 py-1.5 text-sm border rounded-sm transition-colors ${
                  active
                    ? "bg-ink-800 text-paper border-ink-800"
                    : disabled
                    ? "bg-parchment/50 text-ink-400 border-rule cursor-not-allowed"
                    : "bg-paper text-ink-800 border-rule hover:bg-parchment"
                }`}
              >
                {c.name}
                <span className="text-[0.65rem] opacity-60 ml-1">{c.kind === "lake" ? "• lake" : "• city"}</span>
              </button>
            );
          })}
        </div>
      </div>

      {objs.length >= 2 && (
        <>
          <div className="bg-paper border border-rule rounded-md p-4 shadow-card">
            <RadarCompare data={radarData} names={objs.map((c) => c.name)} height={420} />
          </div>

          <DataTable caption="Side-by-side">
            <thead>
              <tr>
                <th>Metric</th>
                {objs.map((c) => (
                  <th key={c.slug} className="text-right">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Population</td>
                {objs.map((c) => (
                  <td key={c.slug} className="text-right tabnums">
                    {c.population.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td>SFH median €/m²</td>
                {objs.map((c) => (
                  <td key={c.slug} className="text-right tabnums">
                    €{c.sfhMedianEurPerM2.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Luxury P90 €/m²</td>
                {objs.map((c) => (
                  <td key={c.slug} className="text-right tabnums">
                    {c.luxP90PerM2Low
                      ? `€${c.luxP90PerM2Low.toLocaleString()}–€${c.luxP90PerM2High?.toLocaleString()}`
                      : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Lakefront villa range</td>
                {objs.map((c) => (
                  <td key={c.slug} className="text-right tabnums">
                    {c.lakefrontVillaMinM ? `€${c.lakefrontVillaMinM}–€${c.lakefrontVillaMaxM}M` : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td>5-yr SFH appreciation</td>
                {objs.map((c) => (
                  <td key={c.slug} className="text-right tabnums">
                    {c.fiveYrSfh ? `+${Math.round(c.fiveYrSfh * 100)}%` : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td>GewSt Hebesatz</td>
                {objs.map((c) => (
                  <td key={c.slug} className="text-right tabnums">
                    {c.gewStHebesatz}%
                  </td>
                ))}
              </tr>
              <tr>
                <td>Grundsteuer B</td>
                {objs.map((c) => (
                  <td key={c.slug} className="text-right tabnums">
                    {c.grundsteuerB}%
                  </td>
                ))}
              </tr>
              <tr>
                <td>Commute to Marienplatz (min)</td>
                {objs.map((c) => (
                  <td key={c.slug} className="text-right tabnums">
                    {c.commuteMinMin}–{c.commuteMaxMin}
                    {c.sBahn ? "" : " (car)"}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Gymnasium on community</td>
                {objs.map((c) => (
                  <td key={c.slug} className="text-right">
                    {c.gymnasium ? "Yes" : "No"}
                  </td>
                ))}
              </tr>
              <tr>
                <td>MIS minutes</td>
                {objs.map((c) => (
                  <td key={c.slug} className="text-right tabnums">
                    {c.internationalSchoolMin !== undefined ? `${c.internationalSchoolMin}′` : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Outlook</td>
                {objs.map((c) => (
                  <td key={c.slug} className="text-right">
                    <Chip tone={ratingTone(c.outlook)}>{ratingLabel(c.outlook)}</Chip>
                  </td>
                ))}
              </tr>
            </tbody>
          </DataTable>
        </>
      )}

      {objs.length < 2 && (
        <div className="bg-parchment/50 border border-rule rounded-md p-6 text-center text-ink-600 italic">
          Select at least two communities to compare.
        </div>
      )}
    </div>
  );
}
