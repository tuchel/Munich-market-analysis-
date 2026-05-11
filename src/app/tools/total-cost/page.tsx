import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { SourceCite } from "@/components/SourceCite";
import { Callout } from "@/components/Callout";
import { TotalCostTool } from "@/components/tools/TotalCostTool";

export default function TotalCostPage() {
  return (
    <>
      <PageHeader
        kicker="Tool · Total-Cost"
        title="All-in cost for a Bavarian €5–10M primary residence."
        standfirst={
          <>
            Closing costs (GrESt 3.5%, Notar/Grundbuch 1.5%, Makler 3.57%), annual holding (Grundsteuer
            Flächenmodell, maintenance, insurance, utilities, lakefront overhead), and a mid-range GEG
            retrofit bill. Re-run with your assumptions.
          </>
        }
      />
      <Section>
        <TotalCostTool />
      </Section>
      <Section tone="parchment">
        <SectionHeader kicker="Model notes" title="How each line is calculated." />
        <Prose>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>GrESt</strong> is 3.5% of purchase (Bavaria rate, unchanged since 2006).
            </li>
            <li>
              <strong>Notar + Grundbuch</strong> is 1.5% (roughly 1.0% notary + 0.5% Grundbuch on
              properties in this band).
            </li>
            <li>
              <strong>Makler</strong> is 3.57% brutto buyer-side. In Bavaria the statutory split is
              50/50 between buyer and seller. Private transactions sometimes come in with no Makler —
              the calculator assumes a Makler on both sides.
            </li>
            <li>
              <strong>Grundsteuer B</strong> uses the Bavarian Flächenmodell: living m² × €0.50 ×
              70% × Gemeinde Hebesatz. Land area excluded here for simplicity — it adds ~10–20% at
              large lakefront parcels.
            </li>
            <li>
              <strong>Zweitwohnungsteuer</strong> applies only if the property is not the Hauptwohnsitz.
              Base: Jahresnettokaltmiete at €18/m²/month (proxy). Toggle primary-residence to switch.
            </li>
            <li>
              <strong>Retrofit</strong> uses the GEG class band midpoint, €/m² × m². Denkmal properties
              can offset via §7i / §11b EStG AfA — not modelled here.
            </li>
            <li>
              <strong>Maintenance</strong> €25/m² p.a., <strong>Insurance</strong> 0.12%, <strong>Utilities</strong>{" "}
              €38/m² p.a. for G/H class (proportional to band).
            </li>
            <li>
              <strong>Lakefront overhead</strong> €8,000 p.a. — gardener, dock, Hausmeister; varies widely
              but this is a reasonable centre.
            </li>
          </ul>
          <p className="mt-4 text-sm italic text-ink-600">
            Not a financial model. Use as an order-of-magnitude scaffold for a Steuerberater-led detailed
            model; nothing here replaces the Notarangebot + Berechnungsgrundlage for your specific object.
          </p>
        </Prose>
        <Callout tone="note" className="mt-4" title="Cash discipline at this band">
          On a €10M purchase in Bavaria, closing costs alone are ~€840k. Including a realistic 10-year
          hold and a G-class retrofit, a €10M ticket converts into a ~€12.5–13M all-in outlay at closing-
          plus-horizon. The retrofit bill is the most variable; energy-class due diligence is the single
          highest-leverage line item in this calculator.
        </Callout>
        <SourceCite ids={["stmf_grest", "grst_reform", "geg", "ev_starnberg", "municipal_sites"]} />
      </Section>
    </>
  );
}
