import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { Figure, Callout } from "@/components/Callout";
import { SourceCite } from "@/components/SourceCite";
import { Chip, ratingTone, ratingLabel } from "@/components/Chip";
import { Sparkline } from "@/components/Sparkline";
import { CompositeGauge } from "@/components/charts/CompositeGauge";
import { signals, compositeTemperature } from "@/data/signals";

const groupLabels: Record<string, string> = {
  supply: "Supply",
  demand: "Demand",
  macro: "Macro",
  sentiment: "Sentiment",
};

export default function SignalsPage() {
  const grouped = signals.reduce<Record<string, typeof signals>>((acc, s) => {
    (acc[s.group] ||= []).push(s);
    return acc;
  }, {});

  const temp = compositeTemperature();
  const allIds = Array.from(new Set(signals.flatMap((s) => s.sourceIds)));

  return (
    <>
      <PageHeader
        kicker="Part IV · Signals"
        title="Fourteen indicators. One composite."
        standfirst={
          <>
            A single scorecard of the tape — supply, demand, macro, sentiment — plus a composite
            temperature gauge. Each card shows the value, a five-year range, direction of travel, and a
            one-line reading.
          </>
        }
      />

      <Section>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-1 bg-paper border border-rule rounded-md p-4 shadow-card">
            <CompositeGauge value={temp} />
            <div className="text-sm text-ink-700 leading-relaxed mt-3">
              Composite score rolls up 14 indicators into a -100 (deep bear) to +100 (deep bull) index.
              Today's reading is <strong>{temp > 0 ? "+" : ""}{temp}</strong> — a neutral-to-mildly-
              constructive tape, masked by bifurcation between direct-lakefront (bullish) and the mainstream
              LK/Munich ETW market (neutral).
            </div>
          </div>
          <div className="md:col-span-2">
            <SectionHeader kicker="Reading" title="How to read this page." />
            <Prose>
              <p>
                The dashboard separates supply (shelf life, construction, permits), demand (dwell time,
                list-to-sale, rent), macro (rates, overvaluation), and sentiment. A single average hides
                the lake's bifurcation: direct-lakefront is running tight while Munich-ETW and mainstream
                LK SFH are balanced-to-soft. Read the grouped cards first; the composite is the
                headline.
              </p>
              <p>
                All sparklines are 2019-to-current. Each card cites its underlying series; hovering the
                Sources footer gives the full bibliography entry.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      {Object.entries(grouped).map(([group, items]) => (
        <Section key={group} tone={group === "supply" || group === "macro" ? "parchment" : "paper"}>
          <SectionHeader kicker={groupLabels[group]} title={`${items.length} ${groupLabels[group].toLowerCase()} indicators.`} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((s) => {
              const tone = ratingTone(s.rating);
              const stroke = tone === "bull" ? "#2f6a3f" : tone === "bear" ? "#9e3838" : "#225d76";
              const fill = tone === "bull" ? "rgba(47,106,63,0.10)" : tone === "bear" ? "rgba(158,56,56,0.10)" : "rgba(34,93,118,0.12)";
              return (
                <div key={s.id} className="bg-paper border border-rule rounded-md p-4 shadow-card flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="kicker text-ink-500">{groupLabels[s.group]}</div>
                      <div className="serif text-[1.02rem] text-ink-900 leading-tight mt-0.5">{s.name}</div>
                    </div>
                    <Chip tone={tone}>{ratingLabel(s.rating)}</Chip>
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="number-lg text-ink-900">{s.value}</div>
                      <div className="text-[0.7rem] text-ink-500 tabnums">
                        5-yr range: {s.fiveYrLow || "—"} → {s.fiveYrHigh || "—"}
                      </div>
                    </div>
                    {s.series && <Sparkline values={s.series} stroke={stroke} fill={fill} />}
                  </div>
                  <div className="text-[0.82rem] text-ink-700 leading-snug">{s.note}</div>
                  <div className="mt-1 text-[0.65rem] uppercase tracking-wider text-ink-500">
                    Direction ·{" "}
                    <span className="tabnums text-ink-700">
                      {s.direction === "up" ? "↑ up" : s.direction === "down" ? "↓ down" : "→ flat"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      ))}

      <Section>
        <SectionHeader kicker="Takeaway" title="Bifurcated recovery." />
        <Prose>
          <p>
            Eight of 14 indicators lean bullish or neutral-bullish; one is bearish-leaning (dwell time);
            the rest are neutral. The composite of +{Math.max(temp, 0)}/100 hides the split: the Seelage
            set (list-to-sale, Seelage months-of-supply, direct-lakefront dwell) reads bullish, while the
            broader Kreis and Munich ETW tape is balanced. Two cross-cutting pieces put a long-dated floor
            under all segments — <em>Munich permits at a 10-year low</em> and <em>construction costs +61%
            cumulative</em>. Both favour existing Bestand over new-build substitutes.
          </p>
        </Prose>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Full source stack" title="Every series, every publisher." />
        <Figure caption="Combined source list across all 14 signals.">
          <SourceCite ids={allIds} />
        </Figure>
      </Section>
    </>
  );
}
