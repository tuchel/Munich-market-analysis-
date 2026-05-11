import Link from "next/link";
import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";

const tools = [
  {
    href: "/tools/comparator",
    label: "Community Comparator",
    body: "Pick 2–4 communities. Radar chart on eight axes (€/m², 5-yr appreciation, commute, schools, tax, outlook) + a side-by-side editorial table.",
  },
  {
    href: "/tools/scenarios",
    label: "Scenarios",
    body: "Sliders for the rate path, supply shock and recession severity → 5/10-yr lakefront villa median fan-chart with Monte-Carlo confidence bands.",
  },
  {
    href: "/tools/total-cost",
    label: "Total-Cost Calculator",
    body: "Enter purchase price, community, energy class, and horizon → full closing, annual holding, retrofit, and sensitivity estimate.",
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        kicker="Part VI · Tools"
        title="Three calculators that wire the research together."
        standfirst={<>Each tool is interactive; each output carries the same source stack used across the portal.</>}
      />
      <Section>
        <div className="grid md:grid-cols-3 gap-5">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="block bg-paper border border-rule rounded-md p-5 hover:bg-parchment transition-colors shadow-card"
            >
              <div className="kicker text-gold-500">Interactive</div>
              <div className="serif text-[1.3rem] text-ink-900 mt-1">{t.label}</div>
              <p className="text-sm text-ink-700 mt-2 leading-relaxed">{t.body}</p>
              <div className="kicker text-gold-500 mt-3">Open →</div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
