import Link from "next/link";

export default function HomePage() {
  return (
    <article className="canvas py-16 md:py-24">
      <div className="kicker mb-3">A private research portal · vol. I</div>
      <h1 className="serif text-display-lg md:text-display-xl text-ink-900 leading-[1.02] tracking-tight max-w-4xl">
        Starnberger See <span className="text-gold-500">Property Review</span>
      </h1>
      <p className="serif italic text-ink-600 text-[1.2rem] mt-4 max-w-2xl leading-relaxed">
        A data-driven research portal supporting a €5–10M primary-residence purchase around the
        Starnberger See. Ten-year market history, community deep-dives, lakefront premium analysis,
        macro and micro trends — and per-property memos when a listing crosses our desk.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <Link
          href="/property/klenzestrasse-22"
          className="border border-rule rounded-md p-6 hover:bg-parchment transition-colors"
        >
          <div className="kicker mb-2">Featured · Property memo</div>
          <div className="serif text-[1.4rem] text-ink-900 leading-tight">
            Klenzestraße 22, Söcking
          </div>
          <div className="text-sm text-ink-600 mt-2">
            A 2025-completed A+ villa, 425 m² Wohnfläche on 1,831 m². Listed at €8.9M after a €1M
            reduction. Full valuation, risk register and three-step negotiation ladder.
          </div>
          <div className="kicker mt-4 text-lake-600">Read the memo →</div>
        </Link>

        <div className="border border-rule rounded-md p-6 bg-parchment/40">
          <div className="kicker mb-2">Research dossiers (raw)</div>
          <div className="serif text-[1.15rem] text-ink-900 leading-tight mb-2">
            Six exhaustive research bodies underpin every figure on this site
          </div>
          <ul className="text-sm text-ink-700 leading-relaxed list-disc pl-5">
            <li>Macro &amp; 10-year Munich + LK Starnberg market</li>
            <li>Per-community profiles for all 8 lake municipalities</li>
            <li>Lakefront premium &amp; shore gradient model</li>
            <li>Demographics, HNWI flows, supply pipeline, inheritance wave</li>
            <li>Tax, policy, GEG retrofit, climate &amp; flood risk</li>
            <li>Competing prime markets (Tegern / Ammer / Chiem / Zürich / Como)</li>
          </ul>
          <div className="text-xs text-ink-500 mt-3">
            Stored in <span className="font-mono">/research/*.md</span>; the live analytical pages
            (Market, Communities, Lakefront, Signals, Trends, Tools) build out next.
          </div>
        </div>
      </div>

      <div className="mt-16 hairline" />
      <div className="mt-8 text-sm text-ink-500">
        Editorial style · public &amp; official sources only · one-time snapshot · not investment advice.
      </div>
    </article>
  );
}
