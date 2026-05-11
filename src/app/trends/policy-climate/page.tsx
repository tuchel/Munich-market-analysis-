import Link from "next/link";

export const metadata = {
  title: "Trends · Policy & Climate — Starnberger See Property Review",
};

const GREST = [
  { land: "Bayern", rate: "3.5 %", note: "unchanged since 2006 — lowest along with Sachsen" },
  { land: "Sachsen", rate: "3.5 %", note: "increase to 5.5 % under discussion" },
  { land: "Thüringen", rate: "5.0 %", note: "lowered from 6.5 % in 2024" },
  { land: "Baden-Württemberg", rate: "5.0 %", note: "" },
  { land: "Rheinland-Pfalz / Sachsen-Anhalt / Niedersachsen / Bremen", rate: "5.0 %", note: "" },
  { land: "Hamburg", rate: "5.5 %", note: "raised 2023" },
  { land: "Berlin / Hessen / Mecklenburg-Vorp.", rate: "6.0 %", note: "" },
  { land: "Brandenburg / NRW / Saarland / Schleswig-Holstein", rate: "6.5 %", note: "highest in Germany" },
];

const HEBESATZ = [
  { gem: "Berg", gewerbe: 280, grundB: 340, zws: "—" },
  { gem: "Münsing", gewerbe: 300, grundB: 340, zws: "—" },
  { gem: "Pöcking", gewerbe: 280, grundB: 370, zws: "—" },
  { gem: "Feldafing", gewerbe: 280, grundB: 345, zws: "—" },
  { gem: "Tutzing", gewerbe: 300, grundB: 350, zws: "18 %" },
  { gem: "Bernried", gewerbe: 300, grundB: 360, zws: "10 %" },
  { gem: "Seeshaupt", gewerbe: 300, grundB: 370, zws: "10 %" },
  { gem: "Starnberg", gewerbe: 310, grundB: 395, zws: "20 %" },
  { gem: "— ref: Grünwald", gewerbe: 0, grundB: 240, zws: "—" },
  { gem: "— ref: Munich Stadt", gewerbe: 490, grundB: 535, zws: "18 %" },
];

const CLOSING = [
  { label: "Kaufpreis", v5M: 5_000_000, v75: 7_500_000, v10: 10_000_000 },
  { label: "Grunderwerbsteuer (3.5 %)", v5M: 175_000, v75: 262_500, v10: 350_000 },
  { label: "Notar (~1.0 %)", v5M: 50_000, v75: 71_000, v10: 90_000 },
  { label: "Grundbuch (~0.5 %)", v5M: 25_000, v75: 35_000, v10: 45_000 },
  { label: "Makler 3.57 % brutto", v5M: 178_500, v75: 267_750, v10: 357_000 },
  { label: "Σ Nebenkosten", v5M: 428_500, v75: 636_250, v10: 842_000 },
  { label: "% of price", v5M: 8.57, v75: 8.48, v10: 8.42, pct: true },
];

const ERBSCHAFT = [
  { rel: "Spouse / Lebenspartner", klasse: "I", freibetrag: "€ 500k", tarif: "19–30 %" },
  { rel: "Child / Stepchild", klasse: "I", freibetrag: "€ 400k", tarif: "19–30 %" },
  { rel: "Grandchild (parents alive)", klasse: "I", freibetrag: "€ 200k", tarif: "19–30 %" },
  { rel: "Grandchild (parents deceased)", klasse: "I", freibetrag: "€ 400k", tarif: "19–30 %" },
  { rel: "Parents / Grandparents (Erbfall)", klasse: "I", freibetrag: "€ 100k", tarif: "19–30 %" },
  { rel: "Siblings / Nieces / In-laws", klasse: "II", freibetrag: "€ 20k", tarif: "30–43 %" },
  { rel: "All others (incl. unmarried partner)", klasse: "III", freibetrag: "€ 20k", tarif: "30–50 %" },
];

const GEG_BANDS = [
  { klasse: "A+ / A", kwh: "< 30", stock: "new build ≥ 2016", eurPerM2: "0–50", on400: "0–20k" },
  { klasse: "B", kwh: "30–50", stock: "KfW 40/55", eurPerM2: "100–300", on400: "40–120k" },
  { klasse: "C", kwh: "50–75", stock: "new 2002+", eurPerM2: "300–600", on400: "120–240k" },
  { klasse: "D", kwh: "75–100", stock: "1995–2001", eurPerM2: "600–900", on400: "240–360k" },
  { klasse: "E", kwh: "100–130", stock: "1984–1994", eurPerM2: "900–1,400", on400: "360–560k" },
  { klasse: "F", kwh: "130–160", stock: "1978–1983", eurPerM2: "1,400–2,000", on400: "560–800k" },
  { klasse: "G", kwh: "160–200", stock: "1960–1977", eurPerM2: "1,800–2,600", on400: "720k–1.04M" },
  { klasse: "H", kwh: "> 200", stock: "< 1960 / Denkmal", eurPerM2: "2,200–3,200", on400: "880k–1.28M" },
];

const FLOOD = [
  { gem: "Starnberg", hq100: "medium", zones: "Georgenbach Mündung, Würmursprung, Seepromenade (extremes)", heat: "+2.0 °C, 12–16 HT/yr" },
  { gem: "Berg", hq100: "low-med", zones: "Assenbucher Bach, Karpfenwinkel", heat: "+2.0 °C, 10–14 HT" },
  { gem: "Pöcking", hq100: "low", zones: "Possenhofener Bahnunterführung, Maisinger Bach", heat: "+2.0 °C, 10–14 HT" },
  { gem: "Feldafing", hq100: "low", zones: "Lennépark Uferzone marginal", heat: "+2.0 °C, 10–14 HT" },
  { gem: "Tutzing", hq100: "low-med", zones: "Kustermannpark, Seebach, Bahnhofsviertel", heat: "+2.1 °C, 12–15 HT" },
  { gem: "Bernried", hq100: "low", zones: "Marienbach, Klosteranlage Uferzone", heat: "+2.0 °C, 11–14 HT" },
  { gem: "Seeshaupt", hq100: "low-med", zones: "St. Heinricher Bach, Osterseen NSG adjacent", heat: "+2.0 °C, 11–14 HT" },
  { gem: "Münsing", hq100: "low", zones: "Ammerlander Bach, Ambacher Dorfbach", heat: "+2.0 °C, 10–13 HT" },
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
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Policy &amp; climate</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        Bavaria has the lowest transaction stack and the cheapest annual property tax of any German jurisdiction
        for high-value residential. The real risks at €5–10M are GEG retrofit capex on pre-1977 stock, Denkmal
        constraints on renovation ambition, Zweitwohnungsteuer if used as a second home, and a tail-risk
        Vermögensteuer revival. Climate exposure on Starnbergersee itself is low; the lake is oligotroph (clean).
      </p>

      <S kicker="01" title="Grunderwerbsteuer — all 16 Bundesländer">
        <table className="editorial">
          <thead>
            <tr><th>Bundesland</th><th>Rate</th><th>Note</th></tr>
          </thead>
          <tbody>
            {GREST.map((r) => (
              <tr key={r.land} className={r.land === "Bayern" ? "bg-parchment" : ""}>
                <td><strong>{r.land}</strong></td>
                <td className="tabnums">{r.rate}</td>
                <td className="text-sm text-ink-600">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          On €10M: <strong>Bayern €350k vs NRW €650k = €300k saving</strong>. Bavaria's 2024 coalition agreement
          explicitly rules out any increase during the current Legislaturperiode.
        </p>
      </S>

      <S kicker="02" title="Grundsteuer Hebesatz & Zweitwohnungsteuer — lake communities">
        <table className="editorial">
          <thead>
            <tr><th>Gemeinde</th><th>Hebesatz Gewerbe</th><th>Hebesatz Grundsteuer B</th><th>Zweitwohnungsteuer</th></tr>
          </thead>
          <tbody>
            {HEBESATZ.map((h) => (
              <tr key={h.gem} className={h.gem.startsWith("—") ? "text-ink-500" : ""}>
                <td>{h.gem}</td>
                <td className="tabnums">{h.gewerbe || "—"}{h.gewerbe ? " %" : ""}</td>
                <td className="tabnums">{h.grundB} %</td>
                <td className="tabnums">{h.zws}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          Bavaria's <strong>Flächenmodell</strong> Grundsteuer (2025 reform) decouples tax from market value.
          A €10M lakefront with 2,500 m² plot + 400 m² living pays ~€800–1,400/yr depending on Hebesatz —
          roughly the same as an interior-village home with the same m². Under the Bundesmodell used elsewhere,
          the same villa would pay 3–5× that. The ZWS is N/A for primary residence (Hauptwohnsitz).
        </p>
      </S>

      <S kicker="03" title="Closing-cost stack — €5M / €7.5M / €10M (Bavaria private-to-private)">
        <table className="editorial">
          <thead>
            <tr><th>Item</th><th className="text-right">€ 5M</th><th className="text-right">€ 7.5M</th><th className="text-right">€ 10M</th></tr>
          </thead>
          <tbody>
            {CLOSING.map((row) => (
              <tr key={row.label} className={row.label === "Σ Nebenkosten" || row.label === "% of price" ? "bg-parchment" : ""}>
                <td>{row.label}</td>
                <td className="tabnums text-right">{row.pct ? `${row.v5M} %` : row.v5M.toLocaleString("en-US")}</td>
                <td className="tabnums text-right">{row.pct ? `${row.v75} %` : row.v75.toLocaleString("en-US")}</td>
                <td className="tabnums text-right">{row.pct ? `${row.v10} %` : row.v10.toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          At this price band, commission is negotiable down to 2.5–3.0 % brutto per side or a fixed cap.
          On €8.9M the difference between 3.57 % and 2.98 % is ~€52,500. Always raise the cap in writing
          with the offer.
        </p>
      </S>

      <S kicker="04" title="Erbschaftsteuer & the Familienheim trump card">
        <table className="editorial">
          <thead>
            <tr><th>Relationship</th><th>Klasse</th><th>Freibetrag</th><th>Tarif (≤ €10M)</th></tr>
          </thead>
          <tbody>
            {ERBSCHAFT.map((r) => (
              <tr key={r.rel}>
                <td>{r.rel}</td>
                <td className="text-center">{r.klasse}</td>
                <td className="tabnums">{r.freibetrag}</td>
                <td className="tabnums">{r.tarif}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="prose-editorial max-w-prose mt-4">
          <p><strong>Familienheim (§13 ErbStG):</strong></p>
          <ul>
            <li><strong>Spouse:</strong> tax-free unlimited value, must self-occupy ≥ 10 years.</li>
            <li><strong>Child:</strong> tax-free up to <strong>200 m² Wohnfläche</strong>, move-in within 6 months, occupy ≥ 10 years. Excess m² taxed pro rata.</li>
          </ul>
          <p>On a 400 m² villa worth €10M passed to one child: 50 % (200 m²) tax-free under Familienheim; remaining €5M taxed at Steuerklasse I after €400k Freibetrag → <strong>~€1.1–1.4M tax</strong>. Without Familienheim: €2.7–2.9M. Structuring via lifetime gifts (allowance refreshes every 10 years), Nießbrauch, or Familien-GbR/Stiftung is standard at this net-worth level. Engage a Steuerberater before signing.</p>
        </div>
      </S>

      <S kicker="05" title="GEG retrofit cost bands (per 400 m² villa)">
        <table className="editorial">
          <thead>
            <tr><th>Klasse</th><th>kWh/m²·a</th><th>Typical stock</th><th>€ / m² retrofit</th><th>400 m² villa total</th></tr>
          </thead>
          <tbody>
            {GEG_BANDS.map((b) => (
              <tr key={b.klasse} className={b.klasse === "G" || b.klasse === "H" ? "bg-parchment" : ""}>
                <td className="serif">{b.klasse}</td>
                <td className="tabnums">{b.kwh}</td>
                <td className="text-sm">{b.stock}</td>
                <td className="tabnums">{b.eurPerM2}</td>
                <td className="tabnums">€ {b.on400}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          Most lakefront villas (Jahrhundertwende, 1920s, 1960s vintage) sit in G or H. The 2024 GEG
          amendment requires ≥ 65 % renewable heating in new installations; municipal Wärmeplanung phases
          retrofit by 2028; EU EPBD cascade targets Class E by 2030, Class D by 2033. <strong>Denkmal-listed
          villas are partially exempt under § 105 GEG</strong> but pay higher running costs and benefit from
          §§ 7i / 11b EStG AfA (9 % × 8 yr + 7 % × 4 yr on qualifying restoration).
        </p>
      </S>

      <S kicker="06" title="Climate & flood risk — lake communities">
        <table className="editorial">
          <thead>
            <tr><th>Gemeinde</th><th>HQ100 exposure</th><th>Critical zones</th><th>Heat 2011–2040</th></tr>
          </thead>
          <tbody>
            {FLOOD.map((r) => (
              <tr key={r.gem}>
                <td className="serif">{r.gem}</td>
                <td>{r.hq100}</td>
                <td className="text-sm">{r.zones}</td>
                <td className="tabnums text-sm">{r.heat}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="prose-editorial max-w-prose mt-4 text-sm">
          The lake itself is low risk — regulated via Seeklause Starnberg, historical band ±50 cm
          (1999 peak +85 cm; 2003 low −70 cm). Trophie-Status: <strong>oligotroph</strong> (Sichttiefe
          6–9 m, top-tier EU bathing-water quality). Real HQ100 exposure is at the Bach mouths and at
          some Bahnhofs-Unterführungen. Waldbrand class 2–3 (low-medium); higher only in Kiefern stands
          south of Seeshaupt. Hailstorm intensity rising since 2010 (GDV Naturgefahren-Bilanz).
        </p>
      </S>

      <S kicker="07" title="Reading the policy/climate picture">
        <div className="prose-editorial max-w-prose">
          <ol>
            <li>Bavaria is the cheapest German jurisdiction for this transaction: 3.5 % GrESt, Flächenmodell Grundsteuer (~€800/yr on a €10M villa), no Zweitwohnungsteuer when used as Hauptwohnsitz.</li>
            <li>Erbschaftsteuer is the long-game question. €10M to one child → ~€1.1–1.4M with Familienheim + Freibetrag; ~€2.7–2.9M without. Structure lifetime gifts.</li>
            <li>GEG retrofit capex is the dominant invisible cost on pre-1977 stock — €700k–€1.3M on a 400 m² G-class villa. Buy A+ if avoiding retrofit; or Denkmal with AfA shelter.</li>
            <li>Climate: the lake itself is exceptional. Specific HQ100 / Starkregen / Waldbrand exposures are parcel-level — verify on LfU maps for any specific property.</li>
            <li>Tail risk: Vermögensteuer revival debated periodically; low probability under current Bundesregierung.</li>
          </ol>
        </div>
      </S>

      <div className="rule-double mt-12 pt-6 source-cite">
        Statute texts (BayGrStG, GEG, ErbStG, BauGB, BayDSchG, BayWG); BMF / Bayerisches Staatsministerium der Finanzen;
        LfU Bayern Hochwassergefahrenkarten; DWD Klimareport Bayern 2023; KfW Research; dena Gebäudereport 2024;
        individual Gemeinde Haushaltssatzungen 2025. Full bibliography on{" "}
        <Link href="/sources" className="underline">/sources</Link>.
      </div>
    </article>
  );
}
