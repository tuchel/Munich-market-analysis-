import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { SourceCite } from "@/components/SourceCite";
import { ComparatorTool } from "@/components/tools/ComparatorTool";

export default function ComparatorPage() {
  return (
    <>
      <PageHeader
        kicker="Tool · Comparator"
        title="Side-by-side: two to four communities."
        standfirst={
          <>
            Each axis is scored 0–10. Price and commute are inverted so lower-is-better becomes
            higher-is-better on the chart. Scoring formula is documented on the methodology page.
          </>
        }
      />
      <Section>
        <ComparatorTool />
        <Prose className="mt-6">
          <p className="text-sm text-ink-600 italic">
            Scoring: €/m² (lower=better, centered around Kreis median), 5-yr appreciation, commute
            (lower=better), schools composite (Gymnasium + MIS minutes), tax-friendliness (GewSt
            Hebesatz), liquidity (population proxy), lakefront depth (max lakefront villa €M), prestige
            (rank). See Methodology for the exact formula.
          </p>
          <SourceCite ids={["gutachter_lk_sta", "gutachter_muc", "ev_starnberg", "municipal_sites", "mvv_s6", "mis_school"]} />
        </Prose>
      </Section>
    </>
  );
}
