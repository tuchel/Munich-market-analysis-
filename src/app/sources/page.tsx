import Link from "next/link";
import { SOURCES, type Source } from "@/lib/sources";

export const metadata = {
  title: "Sources — Starnberger See Property Review",
  description:
    "Exhaustive bibliography of public, official, industry, broker, academic, legal and press sources used to build this portal.",
};

const TYPE_LABELS: Record<Source["type"], string> = {
  official: "Official / Government",
  law: "Statute & case law",
  industry: "Industry research",
  broker: "Broker market reports",
  academic: "Academic / Think-tank",
  press: "Press & data journalism",
  data: "Reference data",
  other: "Other",
};

const TYPE_ORDER: Source["type"][] = ["official", "law", "industry", "broker", "academic", "press", "data", "other"];

const TOPIC_LABELS: Record<string, string> = {
  macro: "Macro & 10-yr market",
  communities: "Communities",
  lakefront: "Lakefront premium",
  demographics: "Demographics & supply",
  policy: "Policy & regulation",
  climate: "Climate & physical risk",
  competing: "Competing markets",
  tax: "Tax",
  legal: "Legal",
};

export default function Page() {
  const byType: Record<string, Source[]> = {};
  for (const s of SOURCES) {
    byType[s.type] ??= [];
    byType[s.type].push(s);
  }
  const totalCount = SOURCES.length;
  const topicCounts: Record<string, number> = {};
  for (const s of SOURCES) for (const t of s.topics) topicCounts[t] = (topicCounts[t] ?? 0) + 1;

  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">Bibliography</div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Sources</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        Every figure, table and claim in this portal traces to one of the {totalCount} sources below.
        Official statistics first, statutes next, then industry research, broker market reports,
        academic work, press archives. Sources are organised by type and tagged by the dossier they
        feed into.
      </p>

      <div className="mt-8 grid md:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
        {Object.entries(topicCounts).map(([k, v]) => (
          <div key={k} className="border border-rule rounded-md px-3 py-2 bg-parchment/40">
            <div className="kicker mb-0.5">{TOPIC_LABELS[k] ?? k}</div>
            <div className="serif text-ink-900 tabnums">{v} sources</div>
          </div>
        ))}
      </div>

      <div className="mt-10 hairline" />

      {TYPE_ORDER.map((type) => {
        const items = byType[type] ?? [];
        if (!items.length) return null;
        return (
          <section key={type} className="py-8 border-t border-rule">
            <div className="kicker mb-2">{TYPE_LABELS[type]}</div>
            <h2 className="serif text-[1.5rem] text-ink-900 mb-4">{TYPE_LABELS[type]} <span className="text-ink-500 tabnums">· {items.length}</span></h2>
            <ol className="space-y-3">
              {items.map((s, i) => (
                <li key={s.id} className="grid md:grid-cols-[3rem_1fr] gap-2">
                  <div className="kicker pt-1">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="serif text-ink-900 text-[1.02rem]">
                      {s.url ? (
                        <a href={s.url} className="hover:underline" target="_blank" rel="noopener noreferrer">{s.title}</a>
                      ) : (
                        s.title
                      )}
                    </div>
                    <div className="text-xs text-ink-600 mt-0.5">
                      <span className="font-medium text-ink-700">{s.publisher}</span>
                      {s.topics.length > 0 ? (
                        <span> · {s.topics.map((t) => TOPIC_LABELS[t] ?? t).join(", ")}</span>
                      ) : null}
                    </div>
                    {s.note ? <div className="text-sm text-ink-700 mt-1">{s.note}</div> : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        );
      })}

      <div className="rule-double mt-12 pt-6 source-cite">
        Bibliography last updated 2026-05-11. All URLs valid at retrieval date; if a deep link 404s,
        navigate from the publisher's root. <Link href="/methodology" className="underline">Methodology →</Link>
      </div>
    </article>
  );
}
