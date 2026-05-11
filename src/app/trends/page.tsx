import Link from "next/link";

export const metadata = { title: "Trends — Starnberger See Property Review" };

const PAGES = [
  {
    href: "/trends/rates",
    kicker: "01 · Rates & affordability",
    title: "Mortgage rates, ECB and the affordability cliff",
    description: "10-yr Bauzins, ECB policy cycle, Pfandbrief spreads, price-to-income trajectory, refi wall.",
  },
  {
    href: "/trends/demographics",
    kicker: "02 · Demographics & supply",
    title: "Wealth migration, employers, the inheritance wave, the supply pipeline",
    description: "Bavaria HNWI/UHNWI population, SFO growth, Munich employer base, age structure of lakefront owners, €35–53bn LK Starnberg inheritance flow 2025–2035.",
  },
  {
    href: "/trends/policy-climate",
    kicker: "03 · Policy & climate",
    title: "Tax, regulation, GEG retrofit, flood and heat",
    description: "Grunderwerbsteuer all 16 Länder, Hebesatz by community, ZWS, GEG cost bands, Erbschaftsteuer + Familienheim, HQ100 flood per community.",
  },
  {
    href: "/trends/competing-markets",
    kicker: "04 · Competing markets",
    title: "Tegernsee, Ammersee, Chiemsee, Zürichsee, Como — substitution check",
    description: "Six markets compared on 12 metrics, normalised 2015=100 price-index, €10M 10-yr holding-cost stack across DE / CH / IT.",
  },
];

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">Macro &amp; micro threads</div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Trends</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        Four threads that move the needle on a €5–10M Starnbergersee purchase: the rate environment,
        the demographic engine behind demand, the tax / policy / climate regime that shapes the cost
        of holding, and the competing prime markets a buyer at this budget genuinely substitutes
        against.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-5">
        {PAGES.map((p) => (
          <Link key={p.href} href={p.href} className="border border-rule rounded-md p-6 hover:bg-parchment/40 transition-colors block">
            <div className="kicker mb-2">{p.kicker}</div>
            <div className="serif text-[1.3rem] text-ink-900 leading-tight">{p.title}</div>
            <div className="text-sm text-ink-600 mt-2">{p.description}</div>
            <div className="kicker mt-4 text-lake-600">Read →</div>
          </Link>
        ))}
      </div>

      <div className="rule-double mt-12 pt-6 source-cite">
        All four trend pages feed back into{" "}
        <Link href="/signals" className="underline">/signals</Link> and the{" "}
        <Link href="/property/klenzestrasse-22" className="underline">property memo</Link>.
      </div>
    </article>
  );
}
