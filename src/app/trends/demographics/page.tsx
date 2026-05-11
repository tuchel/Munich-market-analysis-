import Link from "next/link";
import { MarketBarChart, MarketLineChart, palette } from "@/components/charts/Chart";

export const metadata = {
  title: "Trends · Demographics & Supply — Starnberger See Property Review",
};


const POP_INCOME = [
  { year: 2015, lkPop: 133600, lkHhK: 62.4, lkDispK: 31.1, deHhK: 39.8 },
  { year: 2018, lkPop: 137000, lkHhK: 68.5, lkDispK: 33.2, deHhK: 43.2 },
  { year: 2020, lkPop: 138900, lkHhK: 72.1, lkDispK: 34.5, deHhK: 45.6 },
  { year: 2022, lkPop: 139800, lkHhK: 75.9, lkDispK: 35.7, deHhK: 46.9 },
  { year: 2024, lkPop: 140500, lkHhK: 78.4, lkDispK: 36.2, deHhK: 48.3 },
  { year: 2030, lkPop: 145200, lkHhK: 92.5, lkDispK: 42.8, deHhK: 55.6 },
  { year: 2035, lkPop: 148800, lkHhK: 106.0, lkDispK: 48.5, deHhK: 62.1 },
];

const HNWI = [
  { year: 2015, bavariaHNWI: 78, bavariaUHNWI: 980, mucHNWI: 32, netInflow: 600, sfos: 340 },
  { year: 2018, bavariaHNWI: 88, bavariaUHNWI: 1150, mucHNWI: 37, netInflow: 850, sfos: 420 },
  { year: 2020, bavariaHNWI: 94, bavariaUHNWI: 1220, mucHNWI: 40, netInflow: 950, sfos: 470 },
  { year: 2022, bavariaHNWI: 103, bavariaUHNWI: 1410, mucHNWI: 44, netInflow: 1200, sfos: 540 },
  { year: 2024, bavariaHNWI: 112, bavariaUHNWI: 1580, mucHNWI: 48, netInflow: 1350, sfos: 610 },
];

const PERMITS = [
  { year: 2015, permits: 612, sfh: 190, completions: 570 },
  { year: 2016, permits: 648, sfh: 205, completions: 590 },
  { year: 2017, permits: 675, sfh: 215, completions: 605 },
  { year: 2018, permits: 590, sfh: 185, completions: 620 },
  { year: 2019, permits: 560, sfh: 175, completions: 595 },
  { year: 2020, permits: 545, sfh: 170, completions: 570 },
  { year: 2021, permits: 520, sfh: 165, completions: 555 },
  { year: 2022, permits: 460, sfh: 145, completions: 510 },
  { year: 2023, permits: 425, sfh: 130, completions: 465 },
  { year: 2024, permits: 365, sfh: 110, completions: 410 },
];

const OWNER_AGE = [
  { band: "<50", pctLo: 8, pctHi: 11, tenure: 9 },
  { band: "50–59", pctLo: 14, pctHi: 17, tenure: 16 },
  { band: "60–69", pctLo: 19, pctHi: 23, tenure: 24 },
  { band: "70–79", pctLo: 24, pctHi: 28, tenure: 33 },
  { band: "80+", pctLo: 28, pctHi: 32, tenure: 42 },
];

const EMPLOYERS = [
  { name: "Siemens AG", sector: "Industrials / Automation", hq: "Munich", muc: 45000, dax: "DAX40" },
  { name: "BMW Group", sector: "Automotive", hq: "Munich (FIZ)", muc: 42000, dax: "DAX40" },
  { name: "Allianz SE", sector: "Insurance / AM", hq: "Munich", muc: 14000, dax: "DAX40" },
  { name: "Infineon Technologies", sector: "Semiconductors", hq: "Neubiberg", muc: 13500, dax: "DAX40" },
  { name: "Airbus Defence & Space", sector: "Aerospace / Defence", hq: "Taufkirchen / Ottobrunn", muc: 12000, dax: "—" },
  { name: "Rohde & Schwarz", sector: "Test & Meas. / Defence", hq: "Munich", muc: 9000, dax: "Private" },
  { name: "MTU Aero Engines", sector: "Aerospace", hq: "Munich", muc: 8500, dax: "MDAX" },
  { name: "Wacker Chemie", sector: "Chemicals", hq: "Munich", muc: 6000, dax: "MDAX" },
  { name: "Munich Re", sector: "Reinsurance", hq: "Munich", muc: 5500, dax: "DAX40" },
  { name: "Linde plc", sector: "Industrial Gases", hq: "Dublin / Munich", muc: 4000, dax: "DAX-listed" },
  { name: "G+D / Giesecke+Devrient", sector: "Security tech", hq: "Munich", muc: 4500, dax: "Private" },
  { name: "Microsoft Deutschland", sector: "Software", hq: "Munich", muc: 3000, dax: "—" },
  { name: "Apple München", sector: "Silicon design", hq: "Munich", muc: 2500, dax: "—" },
  { name: "Knorr-Bremse", sector: "Rail / Truck", hq: "Munich", muc: 3500, dax: "MDAX" },
  { name: "Amazon Dev. Center", sector: "Software / Alexa", hq: "Munich", muc: 2000, dax: "—" },
  { name: "Celonis", sector: "Process Mining SaaS (Unicorn)", hq: "Munich", muc: 1800, dax: "—" },
  { name: "Personio", sector: "HR SaaS (Unicorn)", hq: "Munich", muc: 1400, dax: "—" },
  { name: "Google Germany", sector: "Software", hq: "Munich", muc: 1500, dax: "—" },
  { name: "Agile Robots", sector: "Robotics (Unicorn)", hq: "Martinsried", muc: 700, dax: "—" },
  { name: "Helsing", sector: "AI Defence ($5bn val)", hq: "Munich", muc: 350, dax: "—" },
  { name: "Quantum Systems", sector: "UAV / Defence", hq: "Gilching", muc: 500, dax: "—" },
  { name: "Isar Aerospace", sector: "Space launch (Unicorn)", hq: "Ottobrunn", muc: 450, dax: "—" },
];

const INHERITANCE = [
  { segment: "Starnbergersee lakefront", events: "900–1,300", avgM: "9–11M", totalBn: "8.5–13.5", sell: "15–25 %" },
  { segment: "Near-lake 1st/2nd row", events: "2,200–2,800", avgM: "3.5–4.5M", totalBn: "8–12", sell: "20–30 %" },
  { segment: "LK SFH non-lake", events: "7,500–9,500", avgM: "1.4–1.8M", totalBn: "11.5–16.5", sell: "35–45 %" },
  { segment: "Apartments", events: "11,000–13,500", avgM: "0.65–0.85M", totalBn: "7.5–11", sell: "50–65 %" },
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
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Demographics &amp; supply</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        The demographic engine: Munich's structural employer base, Bavaria's HNWI inflows, the aging lakefront
        ownership cohort, and the €35–53bn inheritance wave hitting Landkreis Starnberg 2025–2035. The
        supply-side counter: Baugenehmigungen at a decade low, lakefront net additions close to zero, Baupreisindex
        up 61 % since 2015.
      </p>

      <S kicker="01" title="LK Starnberg population & income vs Germany">
        <MarketLineChart
          data={POP_INCOME}
          series={[
            { key: "lkHhK", label: "LK Starnberg median HH (€k)", color: palette.gold, yAxis: "left" },
            { key: "deHhK", label: "Germany median HH (€k)", color: palette.primary, yAxis: "left" },
            { key: "lkPop", label: "LK Pop. (right axis)", color: palette.ink, yAxis: "right" },
          ]}
          yLabel="Income (€k / yr)"
          yFormat={(v) => `€${v}k`}
          yRightLabel="Population"
          yRightFormat={(v) => `${(v / 1000).toFixed(0)}k`}
          height={320}
        />
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          LK Starnberg is the #1 or #2 richest Landkreis in Germany by disposable income per capita. Median age 46.8 (vs 44.3 national); &gt;65 share 24.1 % (vs 22.1 %). 2030/35 projections assume 2.3 % nominal income CAGR nationally, 2.8 % in LK Starnberg.
        </p>
      </S>

      <S kicker="02" title="Bavarian HNWI population & SFO growth">
        <MarketBarChart
          data={HNWI}
          series={[
            { key: "bavariaHNWI", label: "Bavaria HNWI ('000)", color: palette.primary },
            { key: "mucHNWI", label: "Munich FUA HNWI ('000)", color: palette.gold },
          ]}
          yFormat={(v) => `${v}k`}
          height={280}
        />
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          112k HNWI in Bavaria, 48k in Munich FUA, 1,580 UHNWI (USD 30M+) — ~40 % of the German UHNWI total.
          Net inflow +1,350 household-units p.a. in 2024 (up from 600 in 2015). Registered SFOs in Bavaria
          grew from 340 (2018) to 610 (2024), overtaking Hamburg.
        </p>
      </S>

      <S kicker="03" title="The Munich employer base">
        <p className="prose-editorial max-w-prose mb-4">
          Three DAX40 headquarters (BMW, Siemens, Allianz), three more constituents (Munich Re, Infineon),
          a defence cluster (Airbus DS, MTU Aero), a tech-unicorn density unmatched in Germany (Celonis,
          Personio, Helsing, Isar Aerospace, Agile Robots, Quantum Systems), and a quiet US-Silicon footprint
          (Apple, Microsoft, Google, Amazon, Scale AI). The single most concentrated wealth-production region
          in the country.
        </p>
        <div className="overflow-x-auto">
          <table className="editorial">
            <thead>
              <tr><th>Employer</th><th>Sector</th><th>HQ</th><th>Munich/BY HC</th><th>Index</th></tr>
            </thead>
            <tbody>
              {EMPLOYERS.map((e) => (
                <tr key={e.name}>
                  <td className="serif">{e.name}</td>
                  <td>{e.sector}</td>
                  <td>{e.hq}</td>
                  <td className="tabnums">{e.muc.toLocaleString("en-US")}</td>
                  <td className="text-xs text-ink-600 uppercase tracking-wider">{e.dax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </S>

      <S kicker="04" title="Baugenehmigungen LK Starnberg — the supply collapse">
        <MarketBarChart
          data={PERMITS}
          series={[
            { key: "permits", label: "Permits (Wohneinheiten)", color: palette.primary },
            { key: "sfh", label: "Of which SFH / villa", color: palette.gold },
          ]}
          yFormat={(v) => v.toLocaleString("en-US")}
          height={300}
        />
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          LK Starnberg permits at a 10-year low in 2024 (~365 vs 675 in 2017 peak). Munich Stadt parallel
          collapse: 11,528 (2020) → 3,400 (2024), down 56 %. Completions lag permits 18–36 months, so
          2025–2027 supply is structurally locked low. Lakefront net additions ≈ 0 across the entire lake.
        </p>
      </S>

      <S kicker="05" title="The aging-owner thesis (lakefront)">
        <table className="editorial">
          <thead>
            <tr><th>Owner age band</th><th>% of lakefront parcels (est.)</th><th>Estimated # parcels (of ~2,400)</th><th>Avg tenure (yrs)</th></tr>
          </thead>
          <tbody>
            {OWNER_AGE.map((o) => (
              <tr key={o.band}>
                <td className="serif">{o.band}</td>
                <td className="tabnums">{o.pctLo}–{o.pctHi} %</td>
                <td className="tabnums">{Math.round(2400 * o.pctLo / 100)}–{Math.round(2400 * o.pctHi / 100)}</td>
                <td className="tabnums">{o.tenure}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          55–62 % of lakefront owners are 70+ and 30–35 % are 80+. Many of these were original buyers
          from the post-war Munich boom (Siemens, BMW, Allianz, Quandt-circle generation). Turnover
          25–45 parcels/yr (~1.0–1.9 % churn), 2/3 family-internal. The aging-owner thesis underpins the
          inheritance-wave supply estimate below.
        </p>
      </S>

      <S kicker="06" title="Inheritance wave — LK Starnberg residential 2025–2035">
        <table className="editorial">
          <thead>
            <tr><th>Segment</th><th>Property events</th><th>Avg value</th><th>Total €bn</th><th>Open-market sell-through</th></tr>
          </thead>
          <tbody>
            {INHERITANCE.map((r) => (
              <tr key={r.segment}>
                <td className="serif">{r.segment}</td>
                <td className="tabnums">{r.events}</td>
                <td className="tabnums">{r.avgM}</td>
                <td className="tabnums">{r.totalBn}</td>
                <td className="tabnums">{r.sell}</td>
              </tr>
            ))}
            <tr className="bg-parchment">
              <td><strong>Total residential LK Starnberg</strong></td>
              <td className="tabnums"><strong>21,600–27,100</strong></td>
              <td>—</td>
              <td className="tabnums"><strong>€ 35.5–53.0 bn</strong></td>
              <td className="tabnums"><strong>~30–40 % blended</strong></td>
            </tr>
          </tbody>
        </table>
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          For lakefront specifically: 900–1,300 property events over 2025–2035, with 15–25 % open-market
          sell-through implies <strong>135–325 incremental lakefront listings over the decade</strong>, or
          14–33 per year. That is the single largest upside optionality for buyer-side supply, but still sits
          below the structural Munich-wealth demand flow.
        </p>
      </S>

      <S kicker="07" title="Reading the demographics-supply chain">
        <div className="prose-editorial max-w-prose">
          <ol>
            <li><strong>Demand is structurally loaded.</strong> 112k HNWI, +1,350 net annual inflow, SFOs up 80 % since 2018, Munich unicorn / DAX density producing €5–50M liquid-net-worth buyers annually.</li>
            <li><strong>Supply is physically capped.</strong> ~2,400 Starnbergersee lakefront parcels, &lt;2 % annual turnover, §34 BauGB tightening, Baupreisindex +61 % cumulative 2015–25, permits 10-year low.</li>
            <li><strong>Inheritance wave adds modest supply</strong> — but at a rate that does not clear demand. Listings rate increases ~14–33/yr; demand absorbs faster.</li>
            <li><strong>Post-2022 buyer mix reshuffled</strong>: Russian channel ≈ 0 %; US/Swiss/UK share expanded to fill the gap.</li>
            <li><strong>The price thesis is structural, not cyclical.</strong> A 10–15 year demand-supply imbalance.</li>
          </ol>
        </div>
      </S>

      <div className="rule-double mt-12 pt-6 source-cite">
        Destatis Bevölkerungsfortschreibung; LfStat Bayern; VGRdL; BBSR Wohnungsmarktprognose 2030; Capgemini /
        UBS / BCG / Knight Frank Wealth Reports; Campden Wealth / Handelsblatt SFO-Datenbank; Empirica-Systeme;
        IHK München; DIW / Deutsche Bank Research <em>Erbschaftswelle</em>; LH München Statistik; Münchner Wohnen Geschäftsbericht 2024.
        Full bibliography on <Link href="/sources" className="underline">/sources</Link>.
      </div>
    </article>
  );
}
