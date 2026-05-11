import Link from "next/link";
import { MarketLineChart, palette } from "@/components/charts/Chart";

export const metadata = {
  title: "Trends · Competing Markets — Starnberger See Property Review",
};


const COMPARE = [
  { metric: "Shore length (km)", sbg: "49", teg: "21", amm: "44", chm: "64", zur: "88", como: "170" },
  { metric: "Population (basin)", sbg: "130k", teg: "20k", amm: "50k", chm: "75k", zur: "350k", como: "170k" },
  { metric: "Prime lakefront €/m²", sbg: "22–32k", teg: "25–40k", amm: "14–22k", chm: "12–20k", zur: "31–62k", como: "15–30k" },
  { metric: "Trophy ceiling €/m²", sbg: "~38k", teg: "~50k+", amm: "~26k", chm: "~25k", zur: "~80k+", como: "~50k" },
  { metric: "10-yr CAGR (local ccy)", sbg: "6.5 %", teg: "7.5 %", amm: "6.0 %", chm: "5.5 %", zur: "4.5 % CHF", como: "5.5 % EUR" },
  { metric: "Commute to Munich", sbg: "25–40 min", teg: "55–70 min", amm: "40–55 min", chm: "75–90 min", zur: "4 hr / 30 min flight", como: "5 hr / flight" },
  { metric: "Buyer dom/intl", sbg: "85/15", teg: "70/30", amm: "92/8", chm: "85/15", zur: "45/55", como: "40/60" },
  { metric: "Annual property tax", sbg: "~0.05 %", teg: "~0.05 %", amm: "~0.05 %", chm: "~0.05 %", zur: "0.1–0.3 % + Eigenmiet", como: "0.15–0.3 % IMU" },
  { metric: "Transaction cost all-in", sbg: "5.5 %", teg: "5.5 %", amm: "5.5 %", chm: "5.5 %", zur: "3–5 %", como: "9–15 %" },
  { metric: "Tax-relocation regime", sbg: "—", teg: "—", amm: "—", chm: "—", zur: "Pauschal CHF 150k+/yr", como: "Flat €200k/yr" },
  { metric: "5-yr outlook CAGR", sbg: "3–5 %", teg: "4–6 %", amm: "3–5 %", chm: "2–4 %", zur: "4–6 % EUR", como: "4–6 %" },
];

const INDEX = [
  { year: 2015, Starnberg: 100, Tegernsee: 100, Ammersee: 100, Chiemsee: 100, Zurich_EUR: 100, Como: 100 },
  { year: 2016, Starnberg: 106, Tegernsee: 107, Ammersee: 105, Chiemsee: 104, Zurich_EUR: 104, Como: 102 },
  { year: 2017, Starnberg: 113, Tegernsee: 116, Ammersee: 112, Chiemsee: 109, Zurich_EUR: 107, Como: 105 },
  { year: 2018, Starnberg: 121, Tegernsee: 126, Ammersee: 119, Chiemsee: 114, Zurich_EUR: 110, Como: 110 },
  { year: 2019, Starnberg: 129, Tegernsee: 137, Ammersee: 126, Chiemsee: 120, Zurich_EUR: 115, Como: 114 },
  { year: 2020, Starnberg: 138, Tegernsee: 148, Ammersee: 134, Chiemsee: 126, Zurich_EUR: 121, Como: 119 },
  { year: 2021, Starnberg: 152, Tegernsee: 164, Ammersee: 147, Chiemsee: 135, Zurich_EUR: 128, Como: 131 },
  { year: 2022, Starnberg: 166, Tegernsee: 180, Ammersee: 160, Chiemsee: 144, Zurich_EUR: 138, Como: 145 },
  { year: 2023, Starnberg: 172, Tegernsee: 188, Ammersee: 166, Chiemsee: 148, Zurich_EUR: 152, Como: 157 },
  { year: 2024, Starnberg: 175, Tegernsee: 193, Ammersee: 169, Chiemsee: 150, Zurich_EUR: 162, Como: 164 },
  { year: 2025, Starnberg: 180, Tegernsee: 200, Ammersee: 174, Chiemsee: 153, Zurich_EUR: 172, Como: 172 },
];

const COST_STACK = [
  { label: "Transfer tax", de: "350k (3.5 %)", ch: "~200k (1–3 %)", it: "900k (9 %)" },
  { label: "Notar / Registration", de: "150k (1.5 %)", ch: "50k (0.5 %)", it: "150k (1.5 %)" },
  { label: "Agent (buy-side)", de: "178k (1.78 %)", ch: "0–200k", it: "366k (3 % + VAT)" },
  { label: "IVA / VAT on new build", de: "in price", ch: "in price", it: "+1,000k (10 %)" },
  { label: "Transaction total", de: "€ 680k (6.8 %)", ch: "€ 350k (3.5 %)", it: "€ 1,416k (14.2 %)" },
  { label: "Annual prop. tax × 10 yr", de: "€ 50k", ch: "€ 400k", it: "€ 250k" },
  { label: "10-yr holding total", de: "€ 1.18M (1.2 % / yr)", ch: "€ 3.85M (3.9 %)*", it: "€ 3.92M (3.9 %)*" },
  { label: "*ex-regime", de: "—", ch: "Pauschal can offset multi-€M of income tax", it: "Flat €200k/yr can offset multi-€M income tax" },
];

const SWOT = [
  {
    market: "Tegernsee vs Starnberg",
    s: "Stronger international brand; superior Alpine scenery; Michelin-cluster gastronomy; ~30 % higher trophy ceiling.",
    w: "Commute too long for daily Munich work; even tighter supply; weekend B318 congestion.",
    o: "Continued press-driven international demand; Überfahrt / Bachmair hotel halo.",
    t: "Second-home tax tightening; overexposure to CEO / celebrity cycle.",
  },
  {
    market: "Ammersee vs Starnberg",
    s: "25–35 % pricing discount; cultural identity (Dießen, Orff, St. Ottilien); longer shoreline.",
    w: "Thin €5M+ comp set; weaker hotel/gastronomy; 'B-list' perception in Munich HNW circles.",
    o: "Affordability-driven spillover from Starnberg; improving S8 service.",
    t: "Permanently discounted positioning if no trophy catalyst emerges.",
  },
  {
    market: "Chiemsee vs Starnberg",
    s: "Size and sailing infrastructure; Austrian-border optionality; good value.",
    w: "Commute disqualifies primary residence; thin ultra-prime comps; tourist-density summers.",
    o: "Retiree and Salzburg-cross-border demand.",
    t: "Climate-change lake-level / tourism volatility.",
  },
  {
    market: "Zürichsee vs Starnberg",
    s: "Pauschal taxation regime; CHF currency strength; wealth-management ecosystem.",
    w: "2–3× absolute price; Lex Koller foreign-buyer friction; requires genuine relocation.",
    o: "German / UK HNW tax migration tailwinds.",
    t: "Political erosion of Pauschal (Zurich precedent 2009); CHF overvaluation risk.",
  },
  {
    market: "Lake Como vs Starnberg",
    s: "Climate; celebrity halo; flat-tax €200k regime; deep trophy inventory.",
    w: "9–15 % transaction friction; Italian bureaucracy; Milan-airport dependence.",
    o: "Continued remote-work internationalisation; flat-tax expansion.",
    t: "Italian political risk on regime; over-tourism in Bellagio / Varenna; seismic / landslide exposure.",
  },
];

function S({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 md:py-12 border-t border-rule">
      <div className="kicker mb-2">{kicker}</div>
      <h2 className="serif text-[1.6rem] md:text-[1.8rem] text-ink-900 mb-4 leading-tight">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">Trends · <Link href="/trends" className="underline">All trends</Link></div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Competing prime markets</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        Tegernsee, Ammersee, Chiemsee, Zürichsee, Lake Como. Each is a substitute for some
        portion of the Starnbergersee demand. Starnberg is the only German prime lake that
        combines daily-commute primary-residence viability with old-money cachet — every competitor
        forces a trade-off.
      </p>

      <S kicker="01" title="Six markets, 11 metrics">
        <div className="overflow-x-auto">
          <table className="editorial">
            <thead>
              <tr><th>Metric</th><th>Starnberg</th><th>Tegernsee</th><th>Ammersee</th><th>Chiemsee</th><th>Zürichsee</th><th>Como</th></tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r.metric}>
                  <td className="serif">{r.metric}</td>
                  <td>{r.sbg}</td>
                  <td>{r.teg}</td>
                  <td>{r.amm}</td>
                  <td>{r.chm}</td>
                  <td>{r.zur}</td>
                  <td>{r.como}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </S>

      <S kicker="02" title="Price index 2015 = 100 — six markets">
        <MarketLineChart
          data={INDEX}
          series={[
            { key: "Tegernsee", label: "Tegernsee", color: palette.gold },
            { key: "Starnberg", label: "Starnberg", color: palette.primary },
            { key: "Ammersee", label: "Ammersee", color: palette.primaryLight },
            { key: "Como", label: "Lake Como (EUR)", color: palette.ink },
            { key: "Zurich_EUR", label: "Zürichsee (EUR-adj)", color: "#7e6028" },
            { key: "Chiemsee", label: "Chiemsee", color: palette.bull ?? "#2f6a3f" },
          ]}
          yLabel="Index (2015 = 100)"
          yFormat={(v) => String(v)}
          height={340}
        />
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          Tegernsee outpaces every peer through the decade; Starnberg matches the global average; Como
          accelerates post-2021 on remote-work-driven international demand; Zürichsee in EUR terms benefits
          from CHF appreciation. Chiemsee is the laggard.
        </p>
      </S>

      <S kicker="03" title="10-yr holding cost on a €10M property — DE / CH / IT">
        <table className="editorial">
          <thead>
            <tr><th>Bucket</th><th>Germany (Starnberg / Tegernsee)</th><th>Switzerland (Zürichsee, Schwyz)</th><th>Italy (Como)</th></tr>
          </thead>
          <tbody>
            {COST_STACK.map((r) => (
              <tr key={r.label} className={r.label === "Transaction total" || r.label === "10-yr holding total" ? "bg-parchment" : ""}>
                <td><strong>{r.label}</strong></td>
                <td className="tabnums">{r.de}</td>
                <td className="tabnums">{r.ch}</td>
                <td className="tabnums">{r.it}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          Germany is the cheapest jurisdiction for a pure buy-and-hold with no tax-migration element. Switzerland
          and Italy only beat Germany when paired with relocation and access to their preferential income-tax
          regimes — in which case the math flips decisively for UHNW buyers.
        </p>
      </S>

      <S kicker="04" title="SWOT — five competitors vs Starnbergersee">
        <div className="grid md:grid-cols-1 gap-4">
          {SWOT.map((s) => (
            <div key={s.market} className="border border-rule rounded-md p-5 bg-paper">
              <div className="serif text-[1.15rem] text-ink-900 mb-3">{s.market}</div>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div><span className="kicker">Strengths</span> <p className="mt-1 text-ink-700">{s.s}</p></div>
                <div><span className="kicker">Weaknesses</span> <p className="mt-1 text-ink-700">{s.w}</p></div>
                <div><span className="kicker">Opportunities</span> <p className="mt-1 text-ink-700">{s.o}</p></div>
                <div><span className="kicker">Threats</span> <p className="mt-1 text-ink-700">{s.t}</p></div>
              </div>
            </div>
          ))}
        </div>
      </S>

      <S kicker="05" title="Positioning synthesis">
        <div className="prose-editorial max-w-prose">
          <p>For a €5–10M German buyer whose primary residence must be functional for Munich business,{" "}
          <strong>Starnbergersee is the default</strong>. Tegernsee is the second-home graduation; Zürichsee is the
          tax-driven emigration; Como is the climate arbitrage. None matches the daily-commute, cultural
          continuity, legal simplicity (standard German GrESt/notary), discreet luxury combination.</p>
          <p>Treat the competitors as <strong>real BATNA</strong> in any Starnberg negotiation. Naming two of
          them by neighbourhood in a counter-offer makes the BATNA credible and shifts the bargaining
          range in your favour (see <Link href="/property/klenzestrasse-22/negotiation" className="underline">negotiation deep-dive</Link>).</p>
        </div>
      </S>

      <div className="rule-double mt-12 pt-6 source-cite">
        E&amp;V Marktreports (Tegernsee, Ammersee, Chiemsee, Zürichsee, Lake Como); JLL / Savills / Knight Frank
        PIRI; Wüest Partner; Tecnocasa Osservatorio; Agenzia delle Entrate OMI; Sparkasse Oberland;
        Handelszeitung CH; Il Sole 24 Ore. Full bibliography on <Link href="/sources" className="underline">/sources</Link>.
      </div>
    </article>
  );
}
