import Link from "next/link";
import { MarketLineChart, palette } from "@/components/charts/Chart";
import { RATES, PRICE_INCOME } from "@/lib/data/macro";

export const metadata = {
  title: "Trends · Rates & Affordability — Starnberger See Property Review",
};


function S({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 md:py-12 border-t border-rule">
      <div className="kicker mb-2">{kicker}</div>
      <h2 className="serif text-[1.6rem] md:text-[1.8rem] text-ink-900 mb-4 leading-tight">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

// Affordability stress: monthly payment €1M loan, 10Y fix + 2% Tilgung
function monthlyPayment(rateAnnualPct: number, tilgungPct = 2, loanK = 1000) {
  const rateMonthly = rateAnnualPct / 100 / 12;
  const tilgungMonthly = tilgungPct / 100 / 12;
  return Math.round(loanK * (rateMonthly + tilgungMonthly) * 1000);
}

const PAYMENTS = RATES.map((r) => ({
  year: r.year,
  paymentPer1M: monthlyPayment(r.bauzins ?? 0),
}));

export default function Page() {
  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">Trends · <Link href="/trends" className="underline">All trends</Link></div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Rates &amp; affordability</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        From a 1.0–1.3 % Bauzins corridor in 2015–2021 to a 4.2 % peak in autumn 2022 and back to ~3.4 %
        in 2025 — the single largest variable behind the 2023 transaction collapse and the 2024–25
        recovery. For a €5–10M cash or heavy-equity buyer the macro is a weak-neutral tailwind; for a
        leveraged buyer it is the binding constraint.
      </p>

      <S kicker="01" title="The rate cycle in one chart">
        <MarketLineChart
          data={RATES}
          series={[
            { key: "bauzins", label: "Bauzins 10Y fix", color: palette.gold },
            { key: "ecbMro", label: "ECB MRO", color: palette.primary },
            { key: "ecbDeposit", label: "ECB Deposit", color: palette.primaryLight },
            { key: "bund10y", label: "10Y Bund", color: palette.ink },
          ]}
          yLabel="%"
          yFormat={(v) => `${v.toFixed(1)}%`}
          height={340}
        />
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          Bauzins (10-year fix, MFI Neugeschäft, year-end) tracks the 10Y Bund + a Pfandbrief spread of
          ~50–95 bp. The 2022 H2 inflection is the cleanest macro signal in the decade. ECB cut cycle
          began June 2024; rates stabilising around 2.25–2.50 % deposit through 2025.
        </p>
      </S>

      <S kicker="02" title="Monthly payment, € 1M loan @ 10Y fix + 2 % Tilgung">
        <MarketLineChart
          data={PAYMENTS}
          series={[{ key: "paymentPer1M", label: "Monthly payment (€) per €1M loan", color: palette.primary }]}
          yLabel="€ / month"
          yFormat={(v) => `€${v.toLocaleString("en-US")}`}
          height={300}
        />
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          Each €1M of mortgage at the year-end Bauzins + 2 % Tilgung. From €2,460/mo in 2021 to
          €4,920/mo in 2022 (peak) and €4,500/mo in 2025. For €5M of mortgage the implied monthly
          payment swings from €12.3k (2021) to €24.6k (2022) to ~€22.5k (2025) — a structural
          re-rating of affordability.
        </p>
      </S>

      <S kicker="03" title="Price-to-income — the affordability cliff">
        <MarketLineChart
          data={PRICE_INCOME}
          series={[{ key: "piRatio", label: "Munich median ETW (80 m²) ÷ median HH income", color: palette.gold }]}
          yLabel="Multiple"
          yFormat={(v) => `${v.toFixed(1)}×`}
          yDomain={[10, 26]}
          height={280}
        />
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          The Munich price-to-income peaked at 24.2× in 2022 — well into international red-zone
          territory — and has compressed to ~20.5× via the 2023–24 price correction. Still elevated
          historically; for context, IMF guidance views &gt;6× as stretched.
        </p>
      </S>

      <S kicker="04" title="What this means for the €5–10M cash/equity buyer">
        <div className="prose-editorial max-w-prose">
          <ul>
            <li><strong>Cash and 70 %+ equity buyers carry a premium</strong> — leveraged competition is structurally constrained at current rates. Use this in negotiation (no financing contingency, 4–6 week close).</li>
            <li><strong>Rates likely drift lower</strong> through 2026 (ECB cycle ongoing) but not back to ZIRP. A 25–50 bp drop changes monthly payment ~€100–200 per €1M — meaningful at scale but unlikely to unlock decisive buyer demand.</li>
            <li><strong>Pfandbrief spread compression is supportive of financed demand returning</strong>; private banks competing for safe mortgage flow. Mid-segment Munich should continue to recover.</li>
            <li><strong>Lakefront decouples from this story</strong> — luxury Seelage is overwhelmingly cash-financed (see <Link href="/lakefront" className="underline">/lakefront</Link>). Rates don't gate demand at this tier.</li>
          </ul>
        </div>
      </S>

      <div className="rule-double mt-12 pt-6 source-cite">
        Bundesbank Zinsstatistik Wohnungsbaukredite; ECB Key Rates; FRED IRLTLT01DEM156N; Statista 1347565; Finanztip / Interhyp historical Bauzinsen. Cross-references{" "}
        <Link href="/market" className="underline">10-Year Market</Link> and{" "}
        <Link href="/signals" className="underline">Signals</Link>.
      </div>
    </article>
  );
}
