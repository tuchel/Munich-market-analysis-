import Link from "next/link";
import { SIGNALS, SIGNAL_SUMMARY, type Reading } from "@/lib/data/signals";

export const metadata = {
  title: "Signals — Starnberger See Property Review",
  description:
    "Strength and weakness scorecard — 15 indicators rated bullish / neutral / bearish, with rationale and source.",
};

const readingMeta: Record<Reading, { chip: string; label: string; symbol: string }> = {
  bull: { chip: "chip chip-bull", label: "Bullish", symbol: "▲" },
  "bull-lakefront": { chip: "chip chip-bull", label: "Bull (lakefront)", symbol: "▲" },
  neutral: { chip: "chip chip-neutral", label: "Neutral", symbol: "■" },
  bear: { chip: "chip chip-bear", label: "Bearish", symbol: "▼" },
};

const CATEGORIES = ["Supply", "Demand", "Financing", "Sentiment", "Macro", "Structural"] as const;

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">Strength &amp; weakness scorecard</div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Market signals</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        15 indicators across supply, demand, financing, sentiment, macro and structural channels.
        Each rated bull / neutral / bear with a quantified current reading, 5-year range, direction
        and named source. The composite is a bifurcated recovery — lakefront bullish, mid-segment
        neutral, leveraged sub-luxury bearish.
      </p>

      {/* COMPOSITE */}
      <div className="mt-10 grid md:grid-cols-3 gap-3">
        <div className="border-l-4 border-bull/60 bg-bull/5 rounded-md p-5">
          <div className="kicker mb-1">Bullish readings</div>
          <div className="number-xl text-bull tabnums">{SIGNAL_SUMMARY.totalBull}</div>
          <div className="text-xs text-ink-500 mt-1">of {SIGNALS.length} indicators</div>
        </div>
        <div className="border-l-4 border-gold-500/60 bg-gold-400/5 rounded-md p-5">
          <div className="kicker mb-1">Neutral readings</div>
          <div className="number-xl text-gold-600 tabnums">{SIGNAL_SUMMARY.totalNeutral}</div>
          <div className="text-xs text-ink-500 mt-1">of {SIGNALS.length} indicators</div>
        </div>
        <div className="border-l-4 border-bear/60 bg-bear/5 rounded-md p-5">
          <div className="kicker mb-1">Bearish readings</div>
          <div className="number-xl text-bear tabnums">{SIGNAL_SUMMARY.totalBear}</div>
          <div className="text-xs text-ink-500 mt-1">of {SIGNALS.length} indicators</div>
        </div>
      </div>

      <div className="callout mt-6">
        <div className="callout-title">Composite read</div>
        <p className="text-[0.96rem] leading-relaxed">{SIGNAL_SUMMARY.composite}</p>
      </div>

      {/* SIGNALS BY CATEGORY */}
      {CATEGORIES.map((cat) => {
        const items = SIGNALS.filter((s) => s.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="py-8 border-t border-rule mt-2">
            <div className="kicker mb-2">{cat}</div>
            <h2 className="serif text-[1.5rem] text-ink-900 mb-4">{cat} signals</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {items.map((s) => {
                const meta = readingMeta[s.reading];
                return (
                  <div key={s.id} className="border border-rule rounded-md p-4 bg-paper">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={meta.chip}>{meta.symbol} {meta.label}</span>
                        <span className="kicker">{s.direction === "↑" ? "Rising" : s.direction === "↓" ? "Falling" : "Stable"}</span>
                      </div>
                    </div>
                    <div className="serif text-[1.05rem] text-ink-900 leading-tight">{s.name}</div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="kicker mb-0.5">Current</div>
                        <div className="tabnums text-ink-800 serif">{s.current}</div>
                      </div>
                      <div>
                        <div className="kicker mb-0.5">5-yr range</div>
                        <div className="tabnums text-ink-700">{s.fiveYrRange}</div>
                      </div>
                    </div>
                    <p className="text-sm text-ink-700 mt-3 leading-relaxed">{s.rationale}</p>
                    <div className="source-cite mt-2">Source: {s.source}</div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* FULL TABLE */}
      <section className="py-10 border-t border-rule">
        <div className="kicker mb-2">Composite table</div>
        <h2 className="serif text-[1.5rem] text-ink-900 mb-4">All signals at a glance</h2>
        <div className="overflow-x-auto">
          <table className="editorial">
            <thead>
              <tr><th>Signal</th><th>Category</th><th>Reading</th><th>Current</th><th>5-yr range</th><th>Direction</th></tr>
            </thead>
            <tbody>
              {SIGNALS.map((s) => {
                const meta = readingMeta[s.reading];
                return (
                  <tr key={s.id}>
                    <td className="serif">{s.name}</td>
                    <td className="text-xs uppercase tracking-wider text-ink-600">{s.category}</td>
                    <td><span className={meta.chip}>{meta.label}</span></td>
                    <td className="tabnums">{s.current}</td>
                    <td className="tabnums text-ink-600">{s.fiveYrRange}</td>
                    <td className="text-center text-ink-700">{s.direction}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="rule-double mt-12 pt-6 source-cite">
        Cross-reference{" "}
        <Link href="/market" className="underline">10-Year Market</Link>,{" "}
        <Link href="/lakefront" className="underline">Lakefront Premium</Link> and{" "}
        <Link href="/trends/rates" className="underline">Rates &amp; Affordability</Link> for the
        underlying time-series. Full sources on{" "}
        <Link href="/sources" className="underline">/sources</Link>.
      </div>
    </article>
  );
}
