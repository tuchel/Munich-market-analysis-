import Link from "next/link";

export const metadata = { title: "Tools — Starnberger See Property Review" };

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">Interactive tools</div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Tools</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        Two analytical instruments to support a specific decision: a side-by-side neighbourhood
        comparator, and a forward price-scenario model with adjustable rate, recession and supply
        assumptions.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-5">
        <Link href="/tools/comparator" className="border border-rule rounded-md p-6 hover:bg-parchment/40 transition-colors block">
          <div className="kicker mb-2">Comparator</div>
          <div className="serif text-[1.3rem] text-ink-900 leading-tight">Neighbourhood side-by-side</div>
          <div className="text-sm text-ink-600 mt-2">
            Pick any 2–4 of the 8 lakeshore communities and compare them across 15+ metrics —
            pricing tiers, schools, commute, Hebesatz, climate, outlook.
          </div>
          <div className="kicker mt-4 text-lake-600">Open →</div>
        </Link>
        <Link href="/tools/scenarios" className="border border-rule rounded-md p-6 hover:bg-parchment/40 transition-colors block">
          <div className="kicker mb-2">Scenarios</div>
          <div className="serif text-[1.3rem] text-ink-900 leading-tight">5/10-yr price what-if</div>
          <div className="text-sm text-ink-600 mt-2">
            Adjust the rate path, recession severity, supply pipeline and policy regime; see the
            resulting price trajectory with confidence bands.
          </div>
          <div className="kicker mt-4 text-lake-600">Open →</div>
        </Link>
      </div>

      <div className="rule-double mt-12 pt-6 source-cite">
        Tools read from the same data layer as the analytical pages. Method on{" "}
        <Link href="/methodology" className="underline">/methodology</Link>.
      </div>
    </article>
  );
}
