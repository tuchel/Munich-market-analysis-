"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ComposedChart, ResponsiveContainer, ReferenceLine } from "recharts";

// ── Scenario engine ─────────────────────────────────────────────────────
// Annual price-change model for the Starnbergersee SFH / villa segment.
// Inputs:
//   ratePath:   -100 (rates fall 100 bp by year-5) … +100 (rates rise 100 bp)
//   recession:  0 = none, 1 = mild, 2 = moderate, 3 = severe
//   supply:     -2 = much tighter (inheritance delayed) … +2 (faster inheritance + permits)
//   policy:     -2 = strong tightening (Vermögensteuer + GrESt rise) … +1 = pro-housing
//   segment:    lakefront | nearLake | hillside | munichETW
//
// Baseline (no shocks): segment-specific annual % growth, plus volatility.
// Returns: array of {year, baseline, low, high} for 10-yr horizon.

type Segment = "lakefront" | "nearLake" | "hillside" | "munichETW";

const BASE_CAGR: Record<Segment, number> = {
  lakefront: 5.5,
  nearLake: 4.0,
  hillside: 3.2,
  munichETW: 2.8,
};

const VOLATILITY: Record<Segment, number> = {
  lakefront: 0.020, // ±2.0 % p.a. one-sigma
  nearLake: 0.030,
  hillside: 0.035,
  munichETW: 0.040,
};

const SEGMENT_LABEL: Record<Segment, string> = {
  lakefront: "Lakefront villa (€8M+)",
  nearLake: "Near-lake / 2nd row",
  hillside: "Hillside w/ view",
  munichETW: "Munich ETW (reference)",
};

function project({
  segment,
  ratePath,
  recession,
  supply,
  policy,
  years = 10,
  startValueM = 8.9,
}: {
  segment: Segment;
  ratePath: number;
  recession: number;
  supply: number;
  policy: number;
  years?: number;
  startValueM?: number;
}) {
  const base = BASE_CAGR[segment];
  // Rate impact: +25 bp → −0.6 pp annual growth (3-yr decay)
  const rateShockPp = -(ratePath / 100) * 2.4;
  // Recession impact: severity multiplies a 1-yr drawdown that fades over 3 yrs
  const recessionPp = -recession * 1.8;
  // Supply impact: +1 unit faster supply → -0.5 pp
  const supplyPp = -supply * 0.5;
  // Policy impact: -1 unit (tightening) → -1.0 pp
  const policyPp = policy * 1.0;

  // Build annual return series
  const arr: Array<{ year: number; baseline: number; low: number; high: number; baselinePct: number }> = [];
  let baselineValue = startValueM;
  let lowValue = startValueM;
  let highValue = startValueM;
  arr.push({ year: 0, baseline: baselineValue, low: lowValue, high: highValue, baselinePct: 0 });

  for (let y = 1; y <= years; y++) {
    // Rate effect concentrated in years 1-3
    const rateFactor = y <= 3 ? 1 : Math.max(0, 1 - (y - 3) * 0.3);
    // Recession concentrated in year 1, fades in 3 yrs
    const recFactor = y === 1 ? 1 : y === 2 ? 0.6 : y === 3 ? 0.3 : 0;

    const annualPp = base + rateShockPp * rateFactor + recessionPp * recFactor + supplyPp + policyPp;
    const annualReturn = annualPp / 100;
    const vol = VOLATILITY[segment];

    baselineValue = baselineValue * (1 + annualReturn);
    lowValue = lowValue * (1 + annualReturn - 1.6 * vol);
    highValue = highValue * (1 + annualReturn + 1.6 * vol);

    arr.push({
      year: y,
      baseline: Number(baselineValue.toFixed(2)),
      low: Number(lowValue.toFixed(2)),
      high: Number(highValue.toFixed(2)),
      baselinePct: Number((((baselineValue - startValueM) / startValueM) * 100).toFixed(1)),
    });
  }
  return arr;
}

const PRESET_BASELINE = { ratePath: 0, recession: 0, supply: 0, policy: 0 };
const PRESET_BULL = { ratePath: -50, recession: 0, supply: -1, policy: 0 };
const PRESET_BEAR = { ratePath: 50, recession: 2, supply: 1, policy: -1 };
const PRESET_STRESS = { ratePath: 75, recession: 3, supply: 2, policy: -2 };

function Slider({
  label,
  value,
  setValue,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline">
        <label className="kicker text-ink-600">{label}</label>
        <span className="tabnums text-ink-900 text-sm serif">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full mt-1 accent-lake-500"
      />
    </div>
  );
}

export default function Page() {
  const [segment, setSegment] = useState<Segment>("lakefront");
  const [startValueM, setStartValueM] = useState(8.9);
  const [ratePath, setRatePath] = useState(0);
  const [recession, setRecession] = useState(0);
  const [supply, setSupply] = useState(0);
  const [policy, setPolicy] = useState(0);

  const data = useMemo(
    () => project({ segment, ratePath, recession, supply, policy, startValueM }),
    [segment, ratePath, recession, supply, policy, startValueM]
  );

  const final = data[data.length - 1];
  const year5 = data[5];

  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">
        <Link href="/tools" className="underline">← Tools</Link> · Scenarios
      </div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Price-scenario what-if</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        Set the macro inputs — rate path, recession severity, supply pipeline, policy regime — and see
        the 10-year price trajectory with a ±1.6σ confidence band. Baseline CAGRs are calibrated to the
        2015–2025 observed performance by segment.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="md:col-span-1 border border-rule rounded-md p-5 bg-paper space-y-5">
          <div className="kicker">Inputs</div>

          <div>
            <label className="kicker block mb-1">Segment</label>
            <div className="flex flex-col gap-1">
              {(["lakefront", "nearLake", "hillside", "munichETW"] as Segment[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSegment(s)}
                  className={`text-left px-2 py-1.5 text-sm rounded border transition-colors ${
                    segment === s
                      ? "bg-lake-500 text-paper border-lake-500"
                      : "bg-paper text-ink-700 border-rule hover:bg-parchment"
                  }`}
                >
                  {SEGMENT_LABEL[s]} · baseline {BASE_CAGR[s].toFixed(1)} % CAGR
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="kicker block mb-1">Starting value</label>
            <input
              type="number"
              value={startValueM}
              onChange={(e) => setStartValueM(Number(e.target.value))}
              min={1}
              max={50}
              step={0.1}
              className="w-full border border-rule rounded px-2 py-1.5 text-sm tabnums"
            />
            <div className="text-xs text-ink-500 mt-1">in € millions</div>
          </div>

          <Slider
            label="Rate path (Δ Bauzins over 5 yrs)"
            value={ratePath}
            setValue={setRatePath}
            min={-100}
            max={100}
            step={25}
            format={(v) => (v === 0 ? "flat" : `${v > 0 ? "+" : ""}${v} bp`)}
          />
          <Slider
            label="Recession severity"
            value={recession}
            setValue={setRecession}
            min={0}
            max={3}
            step={1}
            format={(v) => ["none", "mild", "moderate", "severe"][v]}
          />
          <Slider
            label="Supply pipeline shock"
            value={supply}
            setValue={setSupply}
            min={-2}
            max={2}
            step={1}
            format={(v) =>
              v === -2 ? "much tighter" : v === -1 ? "tighter" : v === 0 ? "as observed" : v === 1 ? "looser" : "much looser"
            }
          />
          <Slider
            label="Policy regime"
            value={policy}
            setValue={setPolicy}
            min={-2}
            max={1}
            step={1}
            format={(v) =>
              v === -2 ? "strong tightening" : v === -1 ? "tightening" : v === 0 ? "status quo" : "pro-housing"
            }
          />

          <div>
            <div className="kicker mb-1">Presets</div>
            <div className="flex flex-wrap gap-2">
              <button
                className="text-xs px-2 py-1 border border-rule rounded hover:bg-parchment"
                onClick={() => { setRatePath(0); setRecession(0); setSupply(0); setPolicy(0); }}
              >
                Baseline
              </button>
              <button
                className="text-xs px-2 py-1 border border-bull/40 text-bull rounded hover:bg-bull/5"
                onClick={() => { setRatePath(PRESET_BULL.ratePath); setRecession(PRESET_BULL.recession); setSupply(PRESET_BULL.supply); setPolicy(PRESET_BULL.policy); }}
              >
                Bull
              </button>
              <button
                className="text-xs px-2 py-1 border border-bear/40 text-bear rounded hover:bg-bear/5"
                onClick={() => { setRatePath(PRESET_BEAR.ratePath); setRecession(PRESET_BEAR.recession); setSupply(PRESET_BEAR.supply); setPolicy(PRESET_BEAR.policy); }}
              >
                Bear
              </button>
              <button
                className="text-xs px-2 py-1 border border-bear/60 text-bear rounded hover:bg-bear/10"
                onClick={() => { setRatePath(PRESET_STRESS.ratePath); setRecession(PRESET_STRESS.recession); setSupply(PRESET_STRESS.supply); setPolicy(PRESET_STRESS.policy); }}
              >
                Stress
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-rule rounded-md p-4 bg-paper">
              <div className="kicker mb-1">Year-5 baseline</div>
              <div className="number-lg text-ink-900 tabnums">€ {year5.baseline.toFixed(2)}M</div>
              <div className="text-xs text-ink-500 mt-1">vs start {year5.baselinePct >= 0 ? "+" : ""}{year5.baselinePct} %</div>
            </div>
            <div className="border border-rule rounded-md p-4 bg-paper">
              <div className="kicker mb-1">Year-10 baseline</div>
              <div className="number-lg text-ink-900 tabnums">€ {final.baseline.toFixed(2)}M</div>
              <div className="text-xs text-ink-500 mt-1">vs start {final.baselinePct >= 0 ? "+" : ""}{final.baselinePct} %</div>
            </div>
            <div className="border border-rule rounded-md p-4 bg-paper">
              <div className="kicker mb-1">Year-10 band</div>
              <div className="number-lg text-ink-900 tabnums">€ {final.low.toFixed(2)} – {final.high.toFixed(2)}M</div>
              <div className="text-xs text-ink-500 mt-1">±1.6σ confidence</div>
            </div>
          </div>

          <div className="border border-rule rounded-md p-4 bg-paper">
            <div className="kicker mb-2">Price trajectory</div>
            <div style={{ width: "100%", height: 360 }}>
              <ResponsiveContainer>
                <ComposedChart data={data} margin={{ top: 8, right: 10, bottom: 6, left: 8 }}>
                  <CartesianGrid stroke="#cdc5b0" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="year" stroke="#8e8264" tickLine={false} axisLine={{ stroke: "#cdc5b0" }} style={{ fontFamily: "Inter, sans-serif", fontSize: 11 }} />
                  <YAxis stroke="#8e8264" tickLine={false} axisLine={false} tickFormatter={(v) => `€${v.toFixed(1)}M`} style={{ fontFamily: "Inter, sans-serif", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: "#faf8f3", border: "1px solid #cdc5b0", borderRadius: 4, padding: "8px 10px", fontSize: 12 }}
                    formatter={(v) => (typeof v === "number" ? `€${v.toFixed(2)}M` : String(v))}
                    labelFormatter={(l) => `Year ${l}`}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, fontFamily: "Inter, sans-serif" }} />
                  <Area dataKey="high" name="±1.6σ band" stroke="#c2a057" fill="#c2a057" fillOpacity={0.18} strokeWidth={0} />
                  <Area dataKey="low" stroke="#faf8f3" fill="#faf8f3" fillOpacity={1} strokeWidth={0} legendType="none" />
                  <Line dataKey="baseline" name="Baseline" stroke="#225d76" strokeWidth={2.5} dot={{ r: 2.5 }} />
                  <Line dataKey="high" name=" " stroke="#a27f3b" strokeWidth={1.2} strokeDasharray="4 3" dot={false} legendType="none" />
                  <Line dataKey="low" name=" " stroke="#a27f3b" strokeWidth={1.2} strokeDasharray="4 3" dot={false} legendType="none" />
                  <ReferenceLine y={startValueM} stroke="#9e3838" strokeDasharray="3 3" label={{ value: "start", position: "right", fill: "#9e3838", fontSize: 10 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-rule rounded-md p-4 bg-parchment/40">
            <div className="kicker mb-2">Reading</div>
            <p className="text-sm text-ink-700 leading-relaxed">
              Baseline CAGRs are calibrated to the observed 2015–2025 segment performance from the{" "}
              <Link href="/market" className="underline">10-Year Market</Link> data. Lakefront is the
              steepest line (5.5 % baseline) reflecting structural supply scarcity; Munich ETW the
              shallowest (2.8 %) reflecting peak-to-trough volatility. The ±1.6σ band approximates a
              90 % confidence interval under the chosen scenario; widen the interval if the
              recession lever is engaged. Outputs are projections, not predictions.
            </p>
          </div>
        </div>
      </div>

      <div className="rule-double mt-12 pt-6 source-cite">
        Scenario engine logic in <code className="text-xs">src/app/tools/scenarios/page.tsx</code>; CAGR
        calibrations from <Link href="/market" className="underline">10-Year Market</Link>; rate
        sensitivity from <Link href="/trends/rates" className="underline">Trends · Rates</Link>.
      </div>
    </article>
  );
}
