"use client";

import { useMemo, useState } from "react";
import { ScenarioFan } from "@/components/charts/ScenarioFan";
import { starnbergLk } from "@/data/timeseries";

// Deterministic seeded PRNG so charts are stable across refreshes
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6D2B79F5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Box-Muller
function randn(rng: () => number) {
  const u1 = Math.max(rng(), 1e-9);
  const u2 = rng();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

type Params = {
  years: number; // forecast horizon
  nSim: number; // Monte-Carlo paths
  muBase: number; // expected annual return
  sigma: number; // annual vol
  shockYear?: number; // year of supply shock
  shockPct?: number; // percent hit
  ratePenalty?: number; // additive drag on mean annual return (basis points of annual)
};

function simulate(start: number, p: Params, seed: number) {
  const rng = mulberry32(seed);
  // matrix [nSim x years]
  const paths: number[][] = [];
  for (let i = 0; i < p.nSim; i++) {
    const path = [start];
    for (let t = 1; t <= p.years; t++) {
      let mu = p.muBase - (p.ratePenalty || 0);
      // Introduce supply shock as a one-time drop
      let shock = 0;
      if (p.shockYear && t === p.shockYear && p.shockPct) {
        shock = -p.shockPct / 100;
      }
      const step = path[path.length - 1] * (1 + mu + p.sigma * randn(rng) + shock);
      path.push(step);
    }
    paths.push(path);
  }
  // percentile across paths at each t
  const percentile = (arr: number[], q: number) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor((sorted.length - 1) * q)));
    return sorted[idx];
  };
  const years = Array.from({ length: p.years + 1 }, (_, i) => i);
  return years.map((t) => {
    const snapshot = paths.map((pp) => pp[t]);
    return {
      t,
      p10: percentile(snapshot, 0.10),
      p25: percentile(snapshot, 0.25),
      p50: percentile(snapshot, 0.50),
      p75: percentile(snapshot, 0.75),
      p90: percentile(snapshot, 0.90),
    };
  });
}

export function ScenarioTool() {
  const [ratePath, setRatePath] = useState<"down" | "flat" | "up">("down");
  const [supplyShock, setSupplyShock] = useState(0); // %
  const [recession, setRecession] = useState(0); // 0=none, 1=mild, 2=severe
  const [horizon, setHorizon] = useState<5 | 10>(10);

  const latest = starnbergLk[starnbergLk.length - 1];
  const start = latest.waterfrontVillaM as number;

  const params: Params = useMemo(() => {
    const muBase = 0.045; // 4.5% long-run nominal
    // Rate path adjustment
    const ratePenalty =
      ratePath === "up" ? 0.015 : ratePath === "down" ? -0.005 : 0.005; // "up" = drag, "down" = tailwind
    const sigma = recession === 2 ? 0.09 : recession === 1 ? 0.065 : 0.05;
    const shockYear = supplyShock > 0 ? 2 : undefined;
    const shockPct = supplyShock || undefined;
    return { years: horizon, nSim: 600, muBase, sigma, ratePenalty, shockYear, shockPct };
  }, [ratePath, supplyShock, recession, horizon]);

  const sim = useMemo(() => simulate(start, params, 42), [start, params]);

  // Merge historical data into the fan chart
  const baseYear = latest.year as number;
  const historicalPoints = starnbergLk.slice(-6).map((r, i) => ({
    year: r.year,
    p10: r.waterfrontVillaM as number,
    p25: r.waterfrontVillaM as number,
    p50: r.waterfrontVillaM as number,
    p75: r.waterfrontVillaM as number,
    p90: r.waterfrontVillaM as number,
    historical: r.waterfrontVillaM as number,
  }));

  const forecastPoints = sim.slice(1).map((s) => ({
    year: baseYear + s.t,
    p10: +s.p10.toFixed(2),
    p25: +s.p25.toFixed(2),
    p50: +s.p50.toFixed(2),
    p75: +s.p75.toFixed(2),
    p90: +s.p90.toFixed(2),
    historical: undefined,
  }));

  // Make sure starting point connects
  const startPoint = {
    year: baseYear,
    p10: start,
    p25: start,
    p50: start,
    p75: start,
    p90: start,
    historical: start,
  };

  const data = [...historicalPoints.slice(0, -1), startPoint, ...forecastPoints];

  const finalP50 = sim[sim.length - 1].p50;
  const finalP10 = sim[sim.length - 1].p10;
  const finalP90 = sim[sim.length - 1].p90;
  const cagr50 = (Math.pow(finalP50 / start, 1 / horizon) - 1) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-paper border border-rule rounded-md p-5 shadow-card space-y-5">
        <div className="grid md:grid-cols-4 gap-5">
          <Control label="Horizon" value={horizon + " yr"}>
            <div className="flex gap-2">
              {[5, 10].map((h) => (
                <button
                  key={h}
                  onClick={() => setHorizon(h as 5 | 10)}
                  className={`flex-1 py-1.5 text-sm border rounded-sm ${
                    horizon === h ? "bg-ink-800 text-paper border-ink-800" : "bg-paper border-rule hover:bg-parchment"
                  }`}
                >
                  {h}y
                </button>
              ))}
            </div>
          </Control>
          <Control label="Rate path" value={ratePath}>
            <div className="flex gap-2">
              {[
                ["down", "Cuts"],
                ["flat", "Flat"],
                ["up", "Hikes"],
              ].map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setRatePath(k as any)}
                  className={`flex-1 py-1.5 text-sm border rounded-sm capitalize ${
                    ratePath === k ? "bg-ink-800 text-paper border-ink-800" : "bg-paper border-rule hover:bg-parchment"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </Control>
          <Control label="Supply shock in year 2" value={supplyShock + "%"}>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={supplyShock}
              onChange={(e) => setSupplyShock(Number(e.target.value))}
              className="w-full accent-[#225d76]"
            />
            <div className="text-[0.72rem] text-ink-500 flex justify-between">
              <span>0 %</span>
              <span>15 %</span>
            </div>
          </Control>
          <Control label="Recession severity" value={["None", "Mild", "Severe"][recession]}>
            <div className="flex gap-2">
              {[0, 1, 2].map((r) => (
                <button
                  key={r}
                  onClick={() => setRecession(r)}
                  className={`flex-1 py-1.5 text-sm border rounded-sm ${
                    recession === r ? "bg-ink-800 text-paper border-ink-800" : "bg-paper border-rule hover:bg-parchment"
                  }`}
                >
                  {["None", "Mild", "Severe"][r]}
                </button>
              ))}
            </div>
          </Control>
        </div>
      </div>

      <div className="bg-paper border border-rule rounded-md p-4 shadow-card">
        <ScenarioFan data={data} startYear={baseYear} yUnit="M" height={380} />
      </div>

      <div className="grid md:grid-cols-4 gap-3 text-sm">
        <div className="bg-paper border border-rule rounded-md p-3 shadow-card">
          <div className="kicker text-ink-500">Starting point</div>
          <div className="number-lg">€{start.toFixed(1)}M</div>
          <div className="text-ink-500 text-xs">Lakefront villa median, 2025</div>
        </div>
        <div className="bg-paper border border-rule rounded-md p-3 shadow-card">
          <div className="kicker text-ink-500">Median ({horizon}y)</div>
          <div className="number-lg">€{finalP50.toFixed(1)}M</div>
          <div className="text-ink-500 text-xs">{cagr50.toFixed(1)}% CAGR</div>
        </div>
        <div className="bg-paper border border-rule rounded-md p-3 shadow-card">
          <div className="kicker text-ink-500">10th percentile</div>
          <div className="number-lg">€{finalP10.toFixed(1)}M</div>
          <div className="text-ink-500 text-xs">Tail downside</div>
        </div>
        <div className="bg-paper border border-rule rounded-md p-3 shadow-card">
          <div className="kicker text-ink-500">90th percentile</div>
          <div className="number-lg">€{finalP90.toFixed(1)}M</div>
          <div className="text-ink-500 text-xs">Tail upside</div>
        </div>
      </div>

      <div className="text-xs text-ink-500 italic leading-relaxed">
        Monte-Carlo 600 paths, seeded for reproducibility. Mean return 4.5% nominal adjusted by the rate
        path; annual vol 5–9% scaled by recession severity; supply shock applied as a one-time multiplicative
        drag in year 2. This is a stylised model, not a forecast — its purpose is to size the confidence
        interval, not the point estimate.
      </div>
    </div>
  );
}

function Control({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div className="kicker text-ink-500">{label}</div>
        <div className="text-xs tabnums text-ink-800">{value}</div>
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
