"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { StackedBar } from "@/components/charts/StackedBar";
import { gegBands } from "@/data/taxes";
import { lakeCommunities } from "@/data/communities";

const formatEur = (v: number) =>
  "€" + Math.round(v).toLocaleString("en-US").replace(/,/g, ",");

export function TotalCostTool() {
  const [price, setPrice] = useState(7_500_000);
  const [slug, setSlug] = useState<string>("poecking");
  const [livingM2, setLivingM2] = useState(400);
  const [energyClass, setEnergyClass] = useState("G");
  const [horizon, setHorizon] = useState(10);
  const [primaryResidence, setPrimaryResidence] = useState(true);

  const c = lakeCommunities.find((x) => x.slug === slug) || lakeCommunities.find((x) => x.slug === "poecking")!;
  const band = gegBands.find((b) => b.klasse === energyClass) || gegBands[6];

  const grest = price * 0.035;
  const notar = price * 0.01;
  const grundbuch = price * 0.005;
  const makler = price * 0.0357;

  // Grundsteuer B: Bavarian Flächenmodell — approximation
  // Äquivalenzzahlen: €0.04/m² land × factor + €0.50/m² living × 70% × Hebesatz%
  const grundsteuerPerYear = livingM2 * 0.5 * 0.7 * (c.grundsteuerB / 100);
  const zweitwohnung =
    !primaryResidence && c.zweitwohnsteuerPct
      ? (livingM2 * 12 * 18) * (c.zweitwohnsteuerPct / 100) // €18/m² Jahresnettokaltmiete proxy
      : 0;

  // Retrofit cost band midpoint
  const retrofitMid = (band.eurM2Min + band.eurM2Max) / 2 * livingM2;

  // Holding per year
  const insurance = price * 0.0012; // 0.12% incl. elementary
  const maintenance = livingM2 * 25; // €25/m² p.a.
  const utilities = livingM2 * 38; // €38/m² p.a. (G/H class)
  const communitySpecificOverhead = 8_000; // gardener, dock, etc.

  const closing = grest + notar + grundbuch + makler;
  const annual = grundsteuerPerYear + insurance + maintenance + utilities + communitySpecificOverhead + zweitwohnung;
  const holding10 = annual * horizon + retrofitMid;
  const allIn = price + closing + holding10;

  const stackData = [
    {
      bucket: "Closing",
      grest,
      notar: notar + grundbuch,
      makler,
      retrofit: 0,
      holding: 0,
      label: formatEur(closing),
    },
    {
      bucket: `Retrofit (once, class ${band.klasse})`,
      grest: 0,
      notar: 0,
      makler: 0,
      retrofit: retrofitMid,
      holding: 0,
      label: formatEur(retrofitMid),
    },
    {
      bucket: `Holding × ${horizon}y`,
      grest: 0,
      notar: 0,
      makler: 0,
      retrofit: 0,
      holding: annual * horizon,
      label: formatEur(annual * horizon),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-paper border border-rule rounded-md p-5 shadow-card grid md:grid-cols-3 gap-5">
        <div>
          <div className="flex items-baseline justify-between">
            <div className="kicker text-ink-500">Purchase price</div>
            <div className="text-xs tabnums text-ink-800">{formatEur(price)}</div>
          </div>
          <input
            type="range"
            min="3000000"
            max="15000000"
            step="100000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-[#225d76]"
          />
          <div className="text-[0.72rem] text-ink-500 flex justify-between">
            <span>€3M</span>
            <span>€15M</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <div className="kicker text-ink-500">Community</div>
            <div className="text-xs text-ink-800">
              GrSt B {c.grundsteuerB}%
            </div>
          </div>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-rule rounded-sm bg-paper px-2 py-1.5 text-sm mt-1"
          >
            {lakeCommunities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <div className="kicker text-ink-500">Living area (m²)</div>
            <div className="text-xs tabnums text-ink-800">{livingM2} m²</div>
          </div>
          <input
            type="range"
            min="200"
            max="900"
            step="25"
            value={livingM2}
            onChange={(e) => setLivingM2(Number(e.target.value))}
            className="w-full accent-[#225d76]"
          />
          <div className="text-[0.72rem] text-ink-500 flex justify-between">
            <span>200 m²</span>
            <span>900 m²</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <div className="kicker text-ink-500">Energy class (today)</div>
            <div className="text-xs text-ink-800">Klasse {band.klasse}</div>
          </div>
          <select
            value={energyClass}
            onChange={(e) => setEnergyClass(e.target.value)}
            className="w-full border border-rule rounded-sm bg-paper px-2 py-1.5 text-sm mt-1"
          >
            {gegBands.map((b) => (
              <option key={b.klasse} value={b.klasse}>
                {b.klasse} — {b.stock}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <div className="kicker text-ink-500">Holding horizon</div>
            <div className="text-xs tabnums text-ink-800">{horizon} yr</div>
          </div>
          <input
            type="range"
            min="3"
            max="20"
            step="1"
            value={horizon}
            onChange={(e) => setHorizon(Number(e.target.value))}
            className="w-full accent-[#225d76]"
          />
          <div className="text-[0.72rem] text-ink-500 flex justify-between">
            <span>3 yr</span>
            <span>20 yr</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <div className="kicker text-ink-500">Primary residence?</div>
            <div className="text-xs text-ink-800">{primaryResidence ? "Yes" : "No"}</div>
          </div>
          <div className="flex gap-2 mt-1">
            {[
              ["yes", true],
              ["no", false],
            ].map(([label, v]) => (
              <button
                key={String(v)}
                onClick={() => setPrimaryResidence(v as boolean)}
                className={`flex-1 py-1.5 text-sm border rounded-sm ${
                  primaryResidence === v ? "bg-ink-800 text-paper border-ink-800" : "bg-paper border-rule hover:bg-parchment"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="text-[0.72rem] text-ink-500 mt-1">
            Drives Familienheim eligibility & Zweitwohnungsteuer
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        <Kpi label="Closing total" value={formatEur(closing)} sub={`${((closing / price) * 100).toFixed(2)}% of price`} />
        <Kpi label={`Holding × ${horizon}y`} value={formatEur(annual * horizon)} sub={`${formatEur(annual)} / yr`} />
        <Kpi label={`Retrofit (class ${band.klasse} → C)`} value={formatEur(retrofitMid)} sub="mid-range estimate" />
        <Kpi label="All-in outlay" value={formatEur(allIn)} sub={`vs. purchase €${(price / 1e6).toFixed(1)}M`} tone="bull" />
      </div>

      <div className="bg-paper border border-rule rounded-md p-4 shadow-card">
        <StackedBar
          data={stackData}
          xKey="bucket"
          stacks={[
            { key: "grest", label: "GrESt 3.5 %", color: "#18475c" },
            { key: "notar", label: "Notar + Grundbuch", color: "#225d76" },
            { key: "makler", label: "Makler (3.57 %)", color: "#a27f3b" },
            { key: "retrofit", label: "Retrofit", color: "#9e3838" },
            { key: "holding", label: "Holding total", color: "#6a5f45" },
          ]}
          yUnit=""
          height={220}
        />
      </div>

      <DataTable caption="Itemised view">
        <thead>
          <tr>
            <th>Item</th>
            <th className="text-right">Amount</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Grunderwerbsteuer (3.5 %)</td>
            <td className="text-right tabnums">{formatEur(grest)}</td>
            <td className="text-xs text-ink-600">Bavaria — lowest Land rate</td>
          </tr>
          <tr>
            <td>Notar + Grundbuch</td>
            <td className="text-right tabnums">{formatEur(notar + grundbuch)}</td>
            <td className="text-xs text-ink-600">~1.5 % combined</td>
          </tr>
          <tr>
            <td>Makler (brutto, buyer-side)</td>
            <td className="text-right tabnums">{formatEur(makler)}</td>
            <td className="text-xs text-ink-600">Bavaria 50/50 split standard</td>
          </tr>
          <tr>
            <td>Grundsteuer B (per year)</td>
            <td className="text-right tabnums">{formatEur(grundsteuerPerYear)}</td>
            <td className="text-xs text-ink-600">Bavarian Flächenmodell — decoupled from market value</td>
          </tr>
          {zweitwohnung > 0 && (
            <tr>
              <td>Zweitwohnungsteuer (per year)</td>
              <td className="text-right tabnums">{formatEur(zweitwohnung)}</td>
              <td className="text-xs text-ink-600">
                {c.zweitwohnsteuerPct}% of Jahresnettokaltmiete, not Hauptwohnsitz
              </td>
            </tr>
          )}
          <tr>
            <td>Maintenance (per year)</td>
            <td className="text-right tabnums">{formatEur(maintenance)}</td>
            <td className="text-xs text-ink-600">€25/m² — indicative</td>
          </tr>
          <tr>
            <td>Insurance (per year)</td>
            <td className="text-right tabnums">{formatEur(insurance)}</td>
            <td className="text-xs text-ink-600">0.12% of price incl. Elementarschaden</td>
          </tr>
          <tr>
            <td>Utilities (per year)</td>
            <td className="text-right tabnums">{formatEur(utilities)}</td>
            <td className="text-xs text-ink-600">Class {band.klasse} energy burden</td>
          </tr>
          <tr>
            <td>Gardener / dock / Hausmeister</td>
            <td className="text-right tabnums">{formatEur(communitySpecificOverhead)}</td>
            <td className="text-xs text-ink-600">Lakefront operating overhead</td>
          </tr>
          <tr className="bg-parchment/70 font-semibold">
            <td>Annual holding</td>
            <td className="text-right tabnums">{formatEur(annual)}</td>
            <td className="text-xs text-ink-600">Year 1 run-rate, excl. retrofit</td>
          </tr>
          <tr className="bg-parchment/70 font-semibold">
            <td>Retrofit (class {band.klasse} → C)</td>
            <td className="text-right tabnums">{formatEur(retrofitMid)}</td>
            <td className="text-xs text-ink-600">
              Mid of GEG band €{band.villa400m2MinK}k–€{band.villa400m2MaxK}k
            </td>
          </tr>
          <tr className="bg-ink-800 text-paper">
            <td className="font-semibold">All-in outlay ({horizon}y)</td>
            <td className="text-right tabnums">{formatEur(allIn)}</td>
            <td className="text-xs text-paper/70">Purchase + closing + retrofit + holding × {horizon}</td>
          </tr>
        </tbody>
      </DataTable>
    </div>
  );
}

function Kpi({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "bull" | "bear" }) {
  return (
    <div className="bg-paper border border-rule rounded-md p-3 shadow-card">
      <div className="kicker text-ink-500">{label}</div>
      <div className="number-lg tabnums">{value}</div>
      {sub && <div className="text-xs text-ink-500">{sub}</div>}
    </div>
  );
}
