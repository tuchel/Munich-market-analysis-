import Link from "next/link";

export const metadata = {
  title: "Due-Diligence Checklist — Starnberger See Property Review",
  description:
    "Pre-signing, structural, lakefront-specific, legal, financial and post-Übergabe checks for a €5–10M Starnbergersee primary-residence purchase.",
};

type Item = {
  id: string;
  text: React.ReactNode;
  priority: "must" | "should" | "nice";
  cost?: string;
  time?: string;
  trigger?: string; // negotiation lever if adverse
};

type Section = { kicker: string; title: string; intro: string; items: Item[] };

const SECTIONS: Section[] = [
  {
    kicker: "01",
    title: "Land, location, planning law",
    intro:
      "Before any other diligence, confirm what you are actually buying — the parcel, its public-record status, its zoning and the durability of the views and noise environment.",
    items: [
      { id: "boris", text: <>Pull <strong>Bodenrichtwert</strong> for the parcel cell from <a className="underline" href="https://boris.bayern.de" target="_blank" rel="noopener">BORIS-Bayern</a>. Compare to the implied land value in your reverse-build valuation.</>, priority: "must", cost: "€ 0", time: "Same day", trigger: "BRW > paid implied → renegotiate." },
      { id: "grundbuch", text: <>Order a current <strong>Grundbuchauszug</strong> via the Notar. Check Eintragungen — Hypotheken, Grunddienstbarkeiten (easements), Reallasten, Erbbaurecht, Vorkaufsrechte.</>, priority: "must", cost: "€ 20–50", time: "1–3 days", trigger: "Each encumbrance is a price line." },
      { id: "flurkarte", text: <>Pull the <strong>Flurkarte</strong> from the Liegenschaftskataster. Verify boundaries match the exposé and walk the property edges.</>, priority: "must", cost: "€ 30", time: "1–3 days" },
      { id: "fnp", text: <>Check Gemeinde <strong>Flächennutzungsplan (FNP)</strong> for the area, with particular attention to FNP-Fortschreibungen affecting adjoining parcels.</>, priority: "must", cost: "€ 0", time: "1 week", trigger: "Density increases planned → −5 to −10 %." },
      { id: "bplan", text: <>Confirm whether a <strong>Bebauungsplan (B-Plan)</strong> applies; if not, whether parcel is §34 Innenbereich or §35 Außenbereich. Implications for any extension or rebuild.</>, priority: "must", cost: "€ 0", time: "1 week" },
      { id: "lsg", text: <>For Seegrundstücke: pull the <strong>Landschaftsschutzgebiet-Verordnung</strong> text and the FFH-Managementplan zone. Confirm the durability of any "unverbaubarer Blick" claim.</>, priority: "must", cost: "€ 0", time: "1–2 weeks", trigger: "Weak LSG protection → renegotiate view premium." },
      { id: "denkmal", text: <>Check whether the property is listed in the <strong>Bayerischer Denkmal-Atlas</strong>. If yes, obtain Denkmalstatus-Auszug and the list of permissible modifications. § 7i EStG AfA implications.</>, priority: "must", cost: "€ 0", time: "1 week" },
      { id: "noise", text: <>Visit the property at <strong>evening rush hour and at 22:00</strong> for noise verification (Autobahn, Bahnstrecke, Glockenturm, Biergarten, Bootslärm). Request a <strong>Schallschutz-/Lärm-Gutachten</strong> if not supplied.</>, priority: "must", cost: "€ 0 – 3k", time: "1–3 weeks", trigger: "Noise > threshold → −3 to −8 %." },
      { id: "flood", text: <>Cross-check the parcel against <strong>HQ100/HQ200 Hochwassergefahrenkarten</strong> on lfu.bayern.de. Also check the Starkregen-Gefahrenkarte for surface-flow risk.</>, priority: "must", cost: "€ 0", time: "Same day" },
      { id: "fire", text: <>Check the <strong>Waldbrand-Gefahrenkarte</strong> from LfU Bayern, particularly relevant south of Seeshaupt (Kiefern stands).</>, priority: "should", cost: "€ 0", time: "Same day" },
    ],
  },
  {
    kicker: "02",
    title: "Lakefront-specific (if applicable)",
    intro:
      "For any property with Seezugang, the legal regime adds a second layer of diligence. These items are often the most expensive surprise post-signing.",
    items: [
      { id: "uferschutz", text: <>Confirm the applicable <strong>Gewässerrandstreifen</strong> setback. BayWG §21 default is 5 m; municipal overlay routinely extends to 10–30 m.</>, priority: "must", cost: "€ 0", time: "1 week" },
      { id: "seeuferweg", text: <>Confirm whether the parcel is in a <strong>Seeuferweg-Prüfgebiet</strong> or has an existing Wegerecht. Müncher / Berg / Seeshaupt are the historic hot zones.</>, priority: "must", cost: "€ 0", time: "1–2 weeks", trigger: "Future path likely → −10 to −20 %." },
      { id: "steg", text: <>For any Steg / Bootshaus: obtain the <strong>wasserrechtliche Erlaubnis</strong> from Wasserwirtschaftsamt Weilheim and verify Altbestandsstatus. New Stege are essentially unobtainable.</>, priority: "must", cost: "€ 0", time: "1–2 weeks" },
      { id: "bestand", text: <>For §35 Außenbereich Altbestand: confirm <strong>Bestandsschutz</strong> status. Document age, footprint, height for replacement-right purposes.</>, priority: "must", cost: "€ 0–500", time: "1–2 weeks" },
      { id: "ffh", text: <>Confirm parcel relationship to <strong>FFH-Gebiet DE-8033-371</strong> and any Naturschutzgebiet (Osterseen, Roseninsel-Vorgelagert, reed-belt zones).</>, priority: "must", cost: "€ 0", time: "Same day" },
    ],
  },
  {
    kicker: "03",
    title: "Building, technical & energy",
    intro:
      "What the building is, in physical and regulatory reality, vs what the exposé says it is. A Bausachverständigen-Begehung is non-optional at this price band.",
    items: [
      { id: "bausach", text: <>Commission an independent <strong>Bausachverständigen-Begehung</strong> before signing. Mandatory at €5M+. Budget 2–4 hours on-site plus a written report.</>, priority: "must", cost: "€ 2,500–4,000", time: "1–2 weeks", trigger: "Material defects → mandatory remediation budget." },
      { id: "abnahme", text: <>For new builds: obtain the <strong>Bauträger-Abnahmeprotokoll</strong>, Schlussrechnung, and the list of any noted Mängel from the original Bauabnahme.</>, priority: "must", cost: "€ 0", time: "1 day" },
      { id: "energie", text: <>Inspect the <strong>Energieausweis</strong>. Confirm it is a Bedarfsausweis (calculated, for new builds) or Verbrauchsausweis (measured); verify Ausstellungsdatum, Endenergiebedarf value, and supporting Berechnung.</>, priority: "must", cost: "€ 1–1.5k for independent check", time: "1 week", trigger: "Discrepancy → contractual representation demand." },
      { id: "geg", text: <>If pre-2002 build: obtain an explicit <strong>GEG-Compliance-Bewertung</strong>. Quantify retrofit capex per the cost bands in <Link href="/trends/policy-climate" className="underline">Policy &amp; Climate</Link>.</>, priority: "must", cost: "€ 0", time: "1–2 weeks", trigger: "G or H class → €500k–€1.3M capex line." },
      { id: "knx", text: <>For KNX-equipped properties: interview the <strong>KNX-Integrator</strong>, obtain the ETS project file, run a function walk-through.</>, priority: "should", cost: "€ 1–2k", time: "1 week", trigger: "Undocumented → €15–30k recovery cost." },
      { id: "geothermal", text: <>For Erdwärme installations: obtain <strong>Bohranzeige</strong>, <strong>wasserrechtliche Erlaubnis</strong>, as-built schematic, Hersteller-Inbetriebnahme-Protokolle. Required for any future service.</>, priority: "must", cost: "€ 0", time: "1 week" },
      { id: "pv", text: <>For PV installations: confirm <strong>Anmeldung im Marktstammdatenregister</strong>, Einspeisevergütung agreement, and module manufacturer warranties.</>, priority: "should", cost: "€ 0", time: "1 week" },
      { id: "elevator", text: <>For passenger lifts: obtain <strong>TÜV-Bescheinigung</strong> and Wartungsvertrag.</>, priority: "should", cost: "€ 0", time: "1 week" },
      { id: "asbestos", text: <>For pre-1995 stock: <strong>Asbest- / Holzschutz- / Schadstoff-Gutachten</strong>. Asbest in flooring adhesives and KMF in insulation are common.</>, priority: "must", cost: "€ 1–3k", time: "1–2 weeks", trigger: "Material finding → renegotiation." },
      { id: "wind", text: <>For windows / Türen: check Schallschutzklasse, Wärmedurchgangskoeffizient (Uw), Sicherheitsklasse (RC2 / RC3) for ground-floor and accessible.</>, priority: "should", cost: "€ 0", time: "Same day" },
    ],
  },
  {
    kicker: "04",
    title: "Legal, contractual & seller entity",
    intro:
      "Who is on the other side of the table, in what legal form, with what staying power. At €5M+ the entity behind the transaction matters.",
    items: [
      { id: "hr", text: <>Pull the <strong>Handelsregisterauszug</strong> for any Bauträger / SPV / Verkäufer-Gesellschaft. Check Stammkapital, Geschäftsführer, organisational structure.</>, priority: "must", cost: "€ 4.50", time: "Same day", trigger: "Weak entity → escalate Bürgschaft." },
      { id: "bonitaet", text: <>For Bauträger / SPV sellers: a <strong>Bonitätsabfrage</strong> (Schufa-equivalent for companies).</>, priority: "should", cost: "€ 30–80", time: "Same day" },
      { id: "buergschaft", text: <>Demand <strong>Gewährleistungsbürgschaft 5 %</strong> of build cost from the Bauträger, valid 5 years post-Übergabe. Standard at this band; refusal is itself a signal.</>, priority: "must", cost: "€ 0", time: "Negotiation", trigger: "Refusal → walk." },
      { id: "kaufvertrag", text: <>Have the draft <strong>Kaufvertrag</strong> reviewed by an independent Rechtsanwalt für Immobilienrecht before notary appointment. Do not rely on the Notar alone.</>, priority: "must", cost: "€ 1–2.5k", time: "1–2 weeks" },
      { id: "inventar", text: <>Annex an <strong>item-level Inventarliste</strong> to the Kaufvertrag for any included furnishing, with model numbers, photographs and replacement values. Especially Minotti / bespoke pieces.</>, priority: "must", cost: "€ 0", time: "1 week", trigger: "Refusal → walk." },
      { id: "lastenfreistellung", text: <>Confirm <strong>Lastenfreistellung</strong> as a contractual condition for fund release. Mortgages, easements, Bauträger-financing must clear before Eintragung.</>, priority: "must", cost: "€ 0", time: "—" },
      { id: "anzahlung", text: <>Standard is 10 % <strong>Anzahlung</strong> on Notartermin into Notaranderkonto, released to seller on Lastenfreistellung. Confirm.</>, priority: "must", cost: "€ 0", time: "—" },
      { id: "geldwasche", text: <>Prepare your own <strong>Geldwäschegesetz (GwG) documentation</strong>: source-of-funds, beneficial-ownership statement, tax-residence certificate. Notar will require this — better to prepare in advance.</>, priority: "must", cost: "€ 0", time: "1 week" },
      { id: "vollmacht", text: <>If purchasing through a Familien-GbR or Stiftung: ensure Vollmachten and Vertretungsregelung are correctly documented.</>, priority: "must", cost: "€ 0–500", time: "1–2 weeks" },
    ],
  },
  {
    kicker: "05",
    title: "Financial, tax & financing",
    intro:
      "The economics of the deal — closing-cost stack, ongoing holding cost, and the tax-structuring questions that should be answered before signing.",
    items: [
      { id: "closing", text: <>Build the <strong>closing-cost stack</strong> for the negotiated price: GrESt 3.5 %, notary ~1.0 %, Grundbuch ~0.5 %, Makler 3.57 % brutto. Total ~8.5 % above Kaufpreis.</>, priority: "must", cost: "€ 0", time: "Same day" },
      { id: "courtage", text: <>Negotiate the <strong>Käuferprovision down from 3.57 %</strong> brutto. Cap at 2.5–3.0 % is achievable; on €8.9M each 0.5 % is €44.5k.</>, priority: "must", cost: "€ 0", time: "Negotiation" },
      { id: "finanzierung", text: <>If financing: obtain <strong>Finanzierungszusage</strong> with the offer. Submit it even if you intend to pay cash — eliminates seller tail risk.</>, priority: "must", cost: "€ 0", time: "1–3 weeks" },
      { id: "tax-structure", text: <>Engage a <strong>Steuerberater</strong> on Erbschaftsteuer / Familienheim planning before signing. Lifetime gifts, Nießbrauch, Familien-GbR / Stiftung options.</>, priority: "must", cost: "€ 1–3k", time: "2–4 weeks" },
      { id: "spec-tax", text: <>Document <strong>Spekulationsteuer</strong> exposure on any subsequent sale. 10-yr holding period; owner-occupier exemption for year of sale + 2 preceding.</>, priority: "should", cost: "€ 0", time: "Same day" },
      { id: "insurance", text: <>Obtain three <strong>Wohngebäude- + Inventar-Versicherung</strong> quotes (high-value carrier). Confirm carrier accepts the property without exclusions.</>, priority: "must", cost: "€ 0", time: "1–2 weeks", trigger: "Refusal / exclusions → diligence question." },
      { id: "grundsteuer", text: <>Pull the current <strong>Grundsteuerbescheid</strong> (or recompute under Bayern Flächenmodell). Confirm Hebesatz for the Gemeinde.</>, priority: "must", cost: "€ 0", time: "Same day" },
      { id: "zws", text: <>If second-home use is contemplated: confirm <strong>Zweitwohnungsteuer</strong> liability per the Gemeinde Satzung. Starnberg 20 %, Tutzing 18 %, Bernried/Seeshaupt 10 %; Berg/Pöcking/Feldafing/Münsing currently none.</>, priority: "must", cost: "€ 0", time: "Same day" },
    ],
  },
  {
    kicker: "06",
    title: "Operational & post-Übergabe",
    intro:
      "What happens between Notartermin and Eintragung, and what needs to be in hand by the Übergabetermin. Plan the operational handover before you sign.",
    items: [
      { id: "uebergabe", text: <>Draft a detailed <strong>Übergabeprotokoll</strong> — meter readings (water, gas, electricity, heating oil if applicable), keys (all sets), bank documents, manuals.</>, priority: "must", cost: "€ 0", time: "Übergabetermin" },
      { id: "umzug", text: <>Schedule <strong>Umzugsmeldung</strong> with the Gemeinde within 14 days; obtain Anmeldebestätigung for Hauptwohnsitz (critical for ZWS exemption).</>, priority: "must", cost: "€ 0", time: "Within 14 days" },
      { id: "kfz", text: <>Re-register vehicles at the Zulassungsstelle; obtain Starnberg-Kreis (STA) plates if desired.</>, priority: "should", cost: "€ 50–200", time: "1–2 weeks" },
      { id: "internet", text: <>Confirm <strong>Glasfaser / Breitband-Anschluss</strong> status. Söcking / Pöcking / Berg coverage uneven; Telekom + Deutsche Glasfaser availability varies.</>, priority: "should", cost: "€ 0", time: "1 week" },
      { id: "muell", text: <>Re-register <strong>Mülltonnen</strong> with Landratsamt Abfallwirtschaft; standard household + Biotonne.</>, priority: "should", cost: "€ 0", time: "1 week" },
      { id: "schornstein", text: <>Schedule the next <strong>Schornsteinfeger-Termin</strong> if applicable (oil/gas heating).</>, priority: "should", cost: "€ 100–300", time: "Annual" },
      { id: "garden", text: <>Engage <strong>Gartenpflege</strong> + irrigation servicing; high-value gardens require a yearly contract from Übergabe.</>, priority: "should", cost: "€ 4–8k/yr", time: "Ongoing" },
      { id: "alarm", text: <>Confirm <strong>Alarmanlage</strong> / Aufschaltung auf Wachdienst; transfer or re-contract.</>, priority: "should", cost: "€ 0–500", time: "1 week" },
      { id: "mein-bauamt", text: <>For any renovation / extension plans: <strong>pre-application meeting</strong> with the Gemeinde Bauamt before committing to design. Tone of the meeting is itself a signal.</>, priority: "nice", cost: "€ 0", time: "Variable" },
    ],
  },
];

function priorityChip(p: string) {
  if (p.startsWith("must")) return "chip chip-bear";
  if (p.startsWith("should")) return "chip chip-neutral";
  return "chip chip-bull";
}

export default function Page() {
  const allItems = SECTIONS.flatMap((s) => s.items);
  const totals = {
    must: allItems.filter((i) => i.priority.startsWith("must")).length,
    should: allItems.filter((i) => i.priority.startsWith("should")).length,
    nice: allItems.filter((i) => i.priority === "nice").length,
  };

  return (
    <article className="canvas py-10 md:py-16">
      <div className="kicker mb-3">Due-diligence checklist</div>
      <h1 className="serif text-display-lg text-ink-900 leading-[1.04] tracking-tight">Due-diligence at €5–10M</h1>
      <p className="serif italic text-ink-600 text-[1.12rem] mt-3 max-w-2xl leading-relaxed">
        A structured pre-signing checklist for a Starnbergersee primary residence. Six sections, {allItems.length} line items,
        each rated must / should / nice-to-have, costed and time-estimated, with the negotiation lever attached
        when an adverse finding is plausible.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
        <div className="border-l-4 border-bear/60 bg-bear/5 rounded-md p-4">
          <div className="kicker mb-1">Must (do not sign without)</div>
          <div className="number-xl text-bear tabnums">{totals.must}</div>
        </div>
        <div className="border-l-4 border-gold-500/60 bg-gold-400/5 rounded-md p-4">
          <div className="kicker mb-1">Should (do at this band)</div>
          <div className="number-xl text-gold-600 tabnums">{totals.should}</div>
        </div>
        <div className="border-l-4 border-bull/60 bg-bull/5 rounded-md p-4">
          <div className="kicker mb-1">Nice-to-have</div>
          <div className="number-xl text-bull tabnums">{totals.nice}</div>
        </div>
      </div>

      {SECTIONS.map((s) => (
        <section key={s.kicker} className="py-10 border-t border-rule">
          <div className="kicker mb-2">{s.kicker}</div>
          <h2 className="serif text-[1.6rem] md:text-[1.8rem] text-ink-900 mb-3 leading-tight">{s.title}</h2>
          <p className="prose-editorial max-w-prose mb-5 text-ink-700">{s.intro}</p>
          <div className="space-y-3">
            {s.items.map((i) => (
              <div key={i.id} className="grid md:grid-cols-[8rem_1fr] gap-3 border border-rule rounded-md p-4 bg-paper">
                <div>
                  <span className={priorityChip(i.priority)}>{i.priority}</span>
                  <div className="text-xs text-ink-500 mt-2 tabnums">
                    {i.cost ? <div>Cost: {i.cost}</div> : null}
                    {i.time ? <div>Time: {i.time}</div> : null}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-ink-800 leading-relaxed">{i.text}</p>
                  {i.trigger ? (
                    <p className="text-xs text-ink-500 italic mt-2"><strong>Lever:</strong> {i.trigger}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="rule-double mt-12 pt-6 source-cite">
        Cross-references the <Link href="/property/klenzestrasse-22" className="underline">property memo</Link>,{" "}
        <Link href="/property/klenzestrasse-22/negotiation" className="underline">negotiation deep-dive</Link>,{" "}
        <Link href="/lakefront" className="underline">Lakefront Premium</Link> and{" "}
        <Link href="/trends/policy-climate" className="underline">Policy &amp; Climate</Link>. Engage a
        Rechtsanwalt für Immobilienrecht and a Steuerberater before signing.
      </div>
    </article>
  );
}
