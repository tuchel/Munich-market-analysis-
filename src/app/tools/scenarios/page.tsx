import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { SourceCite } from "@/components/SourceCite";
import { Callout } from "@/components/Callout";
import { ScenarioTool } from "@/components/tools/ScenarioTool";

export default function ScenariosPage() {
  return (
    <>
      <PageHeader
        kicker="Tool · Scenarios"
        title="Fan-chart: rate, supply, recession × 5 or 10 years."
        standfirst={
          <>
            A stylised Monte-Carlo model over the Starnbergersee lakefront villa median (€M). Use the
            controls to stress-test the path — the fan shows the 10th, 25th, 50th, 75th and 90th
            percentile outcomes across 600 simulated runs.
          </>
        }
      />
      <Section>
        <ScenarioTool />
      </Section>
      <Section tone="parchment">
        <SectionHeader kicker="Model notes" title="What the sliders do." />
        <Prose>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              <strong>Rate path.</strong> "Cuts" applies a −50 bp tailwind on expected annual return;
              "Hikes" applies a +150 bp drag. Calibrated against the 2022 rate-shock elasticity.
            </li>
            <li>
              <strong>Supply shock.</strong> A one-time multiplicative drop applied in year 2 (e.g. forced
              inventory flush from a concentrated inheritance event, or a Gemeinde-level taxation
              change).
            </li>
            <li>
              <strong>Recession.</strong> None = 5% annual vol; Mild = 6.5%; Severe = 9%. Scales the
              spread of the fan without shifting the mean.
            </li>
            <li>
              <strong>Horizon.</strong> 5 or 10 years; everything recomputes in the client.
            </li>
          </ul>
          <p className="mt-4">
            The model deliberately does <em>not</em> attempt to forecast. Its purpose is to size the
            confidence interval given plausible assumptions about the macro backdrop. Use the P10 tail as
            a downside rehearsal; use the P90 as a reminder that trophy-lake markets have positive skew
            and the upside tail is heavy.
          </p>
        </Prose>
        <Callout tone="note" className="mt-4" title="Base assumption">
          4.5% long-run nominal annual return, calibrated to the 2015–2025 empirical lakefront villa
          CAGR. Higher than the Kreis SFH (6.5% 10-yr CAGR) because lakefront absorbed the 2022 shock
          with less drawdown; lower than the post-2020 rally subset because we don't extrapolate the
          ZIRP regime.
        </Callout>
        <SourceCite ids={["gutachter_lk_sta", "bundesbank_rates", "destatis_hpi"]} />
      </Section>
    </>
  );
}
