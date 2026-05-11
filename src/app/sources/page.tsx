import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { DataTable } from "@/components/DataTable";
import { sources } from "@/data/sources";

const kindLabels: Record<string, string> = {
  official: "Official & Public Statistics",
  industry: "Industry Research & Broker Reports",
  academic: "Academic & Think-Tank",
  press: "Press & Data Journalism",
  portal: "Portals & Platforms",
};

export default function SourcesPage() {
  const all = Object.values(sources);
  const groups = all.reduce<Record<string, typeof all>>((acc, s) => {
    (acc[s.kind] ||= []).push(s);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        kicker="Reference"
        title="Sources."
        standfirst={
          <>
            Every series, chart, and estimate in this portal traces back to an entry on this page. We
            prioritise official statistics (Gutachterausschuss, Destatis, Bundesbank, LfStat), then
            industry reports from the brokers with the longest Starnberger See books (Engel & Völkers,
            Sotheby's, Von Poll, JLL, Colliers, Savills, CBRE), then academic and press coverage for
            context and anecdote.
          </>
        }
        meta={`Bibliography — ${all.length} entries · retrieved 2026-04-23`}
      />
      <Section>
        <Prose>
          <p>
            German residential markets are less granular than US MLS tapes. Gutachterausschuss reports
            aggregate to protect privacy, so luxury-segment trajectories are reconstructed from published
            bands plus notable-transaction reporting. Every chart that uses such a reconstruction is
            flagged in its caption, and the methodology page documents the exact step.
          </p>
        </Prose>
      </Section>

      {Object.entries(groups).map(([kind, items]) => (
        <Section key={kind} tone={kind === "official" ? "parchment" : "paper"}>
          <SectionHeader kicker={kindLabels[kind]} title={`${items.length} sources`} />
          <DataTable>
            <thead>
              <tr>
                <th>Title</th>
                <th>Publisher</th>
                <th>Vintage</th>
                <th>Retrieved</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id}>
                  <td className="serif font-medium">{s.title}</td>
                  <td className="text-sm">{s.publisher}</td>
                  <td className="text-xs tabnums text-ink-600">{s.vintage || "—"}</td>
                  <td className="text-xs tabnums text-ink-600">{s.retrieved || "—"}</td>
                  <td className="text-xs">
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-lake-600 underline underline-offset-2 hover:text-lake-800">
                        open →
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Section>
      ))}
    </>
  );
}
