import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { Figure, Callout } from "@/components/Callout";
import { Chip } from "@/components/Chip";
import { checklist } from "@/data/diligence";

const categoryLabels: Record<string, string> = {
  zoning: "Zoning & Building Rights",
  water: "Water & Waterline",
  heritage: "Heritage / Denkmal",
  energy: "Energy / GEG",
  easements: "Easements & Rights-of-Way",
  flood: "Flood & Climate",
  legal: "Legal & Registry",
  infrastructure: "Infrastructure & Services",
  tax: "Tax Status",
};

const severityTone: Record<string, any> = {
  "show-stopper": "bear",
  high: "bear",
  medium: "neutral",
  low: "bull",
};

export default function DueDiligence() {
  const groups = checklist.reduce<Record<string, typeof checklist>>((acc, item) => {
    (acc[item.category] ||= []).push(item);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        kicker="Part VII · Due Diligence"
        title="Seventeen questions to answer before signing."
        standfirst={
          <>
            A pre-offer checklist ordered by category. Each item includes the question, why it matters,
            a severity rating, and the documents the buyer should request before committing. This is the
            list to take into a Steuerberater + Notar + Architekt briefing, not a substitute for it.
          </>
        }
      />
      <Section>
        <Callout tone="key" title="Pre-offer sequence">
          <strong>1.</strong> Obtain <em>Grundbuchauszug aktuell</em>, <em>Auszug B-Plan / Baulastenverzeichnis</em>,
          and <em>Energieausweis</em> from the seller before issuing an LoI.{" "}
          <strong>2.</strong> Pull <em>Bodenrichtwerte</em> from BORIS-Bayern, the relevant{" "}
          <em>LSG-Verordnung</em>, and the <em>Gutachterausschuss-Bericht</em> directly.{" "}
          <strong>3.</strong> File the Bauvorbescheid request for any future teardown / replacement intent
          before signing.{" "}
          <strong>4.</strong> Reserve school places in parallel with the LoI, not after closing.{" "}
          <strong>5.</strong> Engage a bauunabhängiger Gutachter for a full pre-purchase physical inspection.
        </Callout>
      </Section>

      {Object.entries(groups).map(([cat, items]) => (
        <Section key={cat} tone={cat === "water" || cat === "flood" ? "parchment" : "paper"}>
          <SectionHeader kicker={categoryLabels[cat]} title={`${items.length} ${items.length === 1 ? "item" : "items"}`} />
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-paper border border-rule rounded-md p-5 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="serif text-[1.05rem] text-ink-900 leading-tight">{item.question}</div>
                  </div>
                  <Chip tone={severityTone[item.severity]}>
                    {item.severity === "show-stopper" ? "Show-stopper" : item.severity[0].toUpperCase() + item.severity.slice(1)}
                  </Chip>
                </div>
                <p className="text-sm text-ink-700 mt-2 leading-relaxed">{item.detail}</p>
                {item.artifacts && item.artifacts.length > 0 && (
                  <div className="mt-3">
                    <div className="kicker text-ink-500">Documents to request</div>
                    <ul className="mt-1 flex flex-wrap gap-2">
                      {item.artifacts.map((a) => (
                        <li
                          key={a}
                          className="inline-block bg-parchment/70 border border-rule rounded-sm px-2 py-0.5 text-[0.78rem] text-ink-700"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      ))}

      <Section>
        <Prose>
          <p>
            This checklist is the starting point, not the end. For any object entering exclusive
            negotiation, the buyer should additionally commission a <em>Wertgutachten</em> from a local
            sachverständiger, a structural inspection from an Architekt or Bauingenieur, and an energy
            assessment from a BAFA-registered Energieberater. The extra day of due diligence is the
            cheapest insurance at this price point.
          </p>
        </Prose>
      </Section>
    </>
  );
}
