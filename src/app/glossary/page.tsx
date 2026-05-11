import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { glossary } from "@/data/glossary";

const tagLabels: Record<string, string> = {
  tax: "Tax",
  legal: "Legal",
  market: "Market",
  physical: "Physical",
  finance: "Finance",
  admin: "Administrative",
};

export default function GlossaryPage() {
  const groups = glossary.reduce<Record<string, typeof glossary>>((acc, e) => {
    (acc[e.tag] ||= []).push(e);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        kicker="Reference"
        title="Glossary of German real-estate terms."
        standfirst={
          <>
            Thirty terms the English-speaking buyer will encounter in Gutachterausschuss reports, Makler
            listings, notary drafts, and Grundbuchauszüge — translated and defined in the lake's context.
          </>
        }
      />
      {Object.entries(groups).map(([tag, entries]) => (
        <Section key={tag} tone={tag === "legal" || tag === "tax" ? "parchment" : "paper"}>
          <SectionHeader kicker={tagLabels[tag]} title={`${entries.length} terms`} />
          <div className="grid md:grid-cols-2 gap-4">
            {entries.map((e) => (
              <div key={e.term} className="bg-paper border border-rule rounded-md p-4 shadow-card">
                <div className="serif text-[1.05rem] text-ink-900">{e.term}</div>
                {e.translation && (
                  <div className="kicker text-gold-500 mt-0.5">{e.translation}</div>
                )}
                <p className="text-sm text-ink-700 mt-2 leading-relaxed">{e.definition}</p>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
