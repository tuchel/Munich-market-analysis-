import Link from "next/link";
import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";

const trends = [
  {
    href: "/trends/rates",
    label: "Rates & Affordability",
    body: "Bundesbank Bauzins fan-chart, ECB path, affordability index on a €5M property, bank Bund spread, the refi wall.",
  },
  {
    href: "/trends/demographics",
    label: "Demographics & Supply",
    body: "HNWI net migration to Bavaria, Munich employer anchors, LK permits pipeline, the 2025–2035 inheritance wave.",
  },
  {
    href: "/trends/policy-climate",
    label: "Policy & Climate",
    body: "Tax stack (GrESt/GrSt/ZWS/ErbSt), Bavarian Flächenmodell, GEG retrofit cost bands, HQ100 flood exposure, lake level history.",
  },
  {
    href: "/trends/competing-markets",
    label: "Competing Prime Markets",
    body: "Starnberg vs Tegernsee, Ammersee, Chiemsee, Zürichsee, Como — price indices rebased to 2015, tax stack on €10M, 10-yr hold.",
  },
];

export default function TrendsPage() {
  return (
    <>
      <PageHeader
        kicker="Part V · Trends"
        title="Four structural threads."
        standfirst={
          <>
            The four long-dated forces shaping the Starnberger-See price curve: interest rates, demographic
            and supply pipeline, tax and climate policy, and the comparable set of competing lake markets.
          </>
        }
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-5">
          {trends.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="block bg-paper border border-rule rounded-md p-5 hover:bg-parchment transition-colors shadow-card"
            >
              <div className="kicker text-gold-500">Thread</div>
              <div className="serif text-[1.3rem] text-ink-900 mt-1">{t.label}</div>
              <p className="text-sm text-ink-700 mt-2 leading-relaxed">{t.body}</p>
              <div className="kicker text-gold-500 mt-3">Read →</div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
