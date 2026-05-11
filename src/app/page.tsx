import Link from "next/link";

const NAV_CARDS: Array<{ href: string; kicker: string; title: string; body: string; featured?: boolean }> = [
  {
    href: "/property/klenzestrasse-22",
    kicker: "Featured · Single-asset memo",
    title: "Klenzestraße 22, Söcking",
    body: "A 2025-completed A+ villa, 425 m² Wohnfläche on 1,831 m². Listed at €8.9M after a €1M reduction. Full valuation, risk register and three-step negotiation ladder with a recommended €8.0M walk-away ceiling.",
    featured: true,
  },
  {
    href: "/property/klenzestrasse-22/negotiation",
    kicker: "Featured · Negotiation playbook",
    title: "Negotiation pricing strategy",
    body: "18-section deep-dive: seller analysis, BATNA, five-lens anchor maths, full offer ladder, €700–950k concession ladder, round-by-round scripts, probability tree, Kaufvertrag clauses.",
    featured: true,
  },
  {
    href: "/market",
    kicker: "01 · Market overview",
    title: "Ten years of Munich & LK Starnberg",
    body: "Five regimes inside ten years, in nine annotated charts. Munich ETW P75/P90, LK Starnberg waterfront, transactions, dwell, rates, HPI vs BPI, P/I.",
  },
  {
    href: "/communities",
    kicker: "02 · Per-community deep dives",
    title: "Communities — 8 lakeshore municipalities",
    body: "Stylised lake map with clickable pins, prestige ranking, north-vs-south comparison, and full per-community dossiers.",
  },
  {
    href: "/lakefront",
    kicker: "03 · Premium sub-market",
    title: "Lakefront Premium",
    body: "Shore-gradient model, parcel scarcity, the four-layer legal regime (BayWG / BauGB §35 / LSG / Denkmal + GEG), Seeuferweg case law, 11 notable transactions.",
  },
  {
    href: "/signals",
    kicker: "04 · Strength & weakness scorecard",
    title: "Market signals",
    body: "15 indicators across supply / demand / financing / sentiment / macro / structural — composite read for the €5–10M buyer.",
  },
  {
    href: "/trends",
    kicker: "05 · Macro & micro threads",
    title: "Trends — four pages",
    body: "Rates & affordability. Demographics & supply. Policy, tax & climate. Competing prime markets (Tegern, Ammer, Chiem, Zürich, Como).",
  },
  {
    href: "/tools",
    kicker: "06 · Interactive tools",
    title: "Comparator & Scenarios",
    body: "Side-by-side any 2–4 communities; or run a 10-yr price what-if with adjustable rate, recession, supply and policy levers.",
  },
  {
    href: "/due-diligence",
    kicker: "07 · Pre-signing",
    title: "Due-diligence checklist",
    body: "60+ line items across land/planning, lakefront, building, legal, financial, operational. Each priced, time-estimated and tied to a negotiation lever.",
  },
  {
    href: "/sources",
    kicker: "08 · Bibliography",
    title: "Sources",
    body: "80+ entries — official, statute, industry research, broker reports, academic, press — organised by type and topic-tagged.",
  },
];

export default function HomePage() {
  return (
    <article className="canvas py-12 md:py-20">
      <div className="kicker mb-3">A private research portal · vol. I</div>
      <h1 className="serif text-display-lg md:text-display-xl text-ink-900 leading-[1.02] tracking-tight max-w-4xl">
        Starnberger See <span className="text-gold-500">Property Review</span>
      </h1>
      <p className="serif italic text-ink-600 text-[1.2rem] mt-4 max-w-2xl leading-relaxed">
        A data-driven research portal for a €5–10M primary-residence purchase around the
        Starnberger See. Ten-year market history, community deep-dives, lakefront premium
        analysis, macro and micro trends, interactive tools, and per-property memos when a
        listing crosses the desk.
      </p>

      {/* Featured */}
      <section className="mt-12 grid md:grid-cols-2 gap-5">
        {NAV_CARDS.filter((c) => c.featured).map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="border border-gold-500/30 rounded-md p-6 hover:bg-parchment transition-colors block bg-parchment/30"
          >
            <div className="kicker mb-2 text-gold-600">{c.kicker}</div>
            <div className="serif text-[1.4rem] text-ink-900 leading-tight">{c.title}</div>
            <div className="text-sm text-ink-700 mt-2 leading-relaxed">{c.body}</div>
            <div className="kicker mt-4 text-lake-600">Read →</div>
          </Link>
        ))}
      </section>

      {/* All sections */}
      <section className="py-10 mt-10 border-t border-rule">
        <div className="kicker mb-3">All sections</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NAV_CARDS.filter((c) => !c.featured).map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="border border-rule rounded-md p-5 hover:bg-parchment/40 transition-colors block"
            >
              <div className="kicker mb-1">{c.kicker}</div>
              <div className="serif text-[1.1rem] text-ink-900 leading-tight">{c.title}</div>
              <div className="text-xs text-ink-600 mt-2 leading-relaxed">{c.body}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Composite read */}
      <section className="py-10 border-t border-rule">
        <div className="kicker mb-3">In one paragraph</div>
        <p className="serif text-[1.2rem] text-ink-800 leading-[1.55] max-w-3xl">
          The Munich + LK Starnberg market is in <strong>early-cycle recovery with a bifurcated tail</strong>.
          Lakefront is structurally scarce and bullish; mid-segment Munich is neutral and fully priced;
          leveraged sub-luxury is bearish on liquidity. For a €5–10M cash or heavy-equity buyer, the
          macro is a weak-neutral tailwind — but the micro decision (lot quality, See orientation,
          energy class, Denkmalstatus, Grundstücksgröße) dominates the outcome. Waiting for a "better
          cycle entry" in lakefront is likely a losing strategy; mid-segment Speckgürtel can afford patience.
        </p>
      </section>

      <div className="mt-12 hairline" />
      <div className="mt-6 text-sm text-ink-500">
        Editorial style · public &amp; official sources only · one-time snapshot dated Q1 2026 · not investment advice.
      </div>
    </article>
  );
}
