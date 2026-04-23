import Link from "next/link";
import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { Figure } from "@/components/Callout";
import { DataTable } from "@/components/DataTable";
import { SourceCite } from "@/components/SourceCite";
import { LakeMap } from "@/components/charts/LakeMap";
import { Chip, ratingTone, ratingLabel } from "@/components/Chip";
import { lakeCommunities, munichPrime, fmtPrice } from "@/data/communities";

export default function CommunitiesPage() {
  return (
    <>
      <PageHeader
        kicker="Part II · Communities"
        title="Eight lake Gemeinden. Six Munich prime districts."
        standfirst={
          <>
            One page per community on the lake; a tighter comparison for the six Munich districts a €5–10M
            buyer would realistically weigh against the Seelage move. Rankings are derived from the
            research dossier; outlook ratings are judgment calls annotated with the underlying drivers.
          </>
        }
        meta="Figures as of 2025 · Prices are medians of the SFH segment unless noted"
      />

      <Section>
        <SectionHeader kicker="Map" title="The lake at a glance." sub="Color = outlook rating; size = relative trophy-segment intensity. Click a pin to deep-dive." />
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <LakeMap size={520} />
          <Prose className="max-w-prose">
            <p>
              The Starnbergersee unfolds on a north-south axis. The S6 rail corridor — the decisive
              commute artery — runs down the <em>west</em> shore from Starnberg through Pöcking, Feldafing,
              Tutzing, Bernried, and Seeshaupt. The <em>east</em> shore has no commuter rail: Berg, Leoni,
              and the Münsing estates at Ammerland/Ambach trade car-only quiet for the highest direct-lake
              €/m² on the lake.
            </p>
            <p>
              North-shore communities (Starnberg, Berg, Pöcking, Feldafing) concentrate ~68% of Gemeinde
              population and the bulk of 5–10M transactions. South/east (Tutzing, Bernried, Seeshaupt,
              Münsing) run at a 15–25% €/m² discount and deliver the lake's best Alpenblick.
            </p>
          </Prose>
        </div>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Lake comparison table" title="Eight lake Gemeinden — side by side." />
        <Figure
          caption="Population, SFH / Lakefront pricing, tax, commute, schools, and outlook — 2025."
          source={<SourceCite ids={["gutachter_lk_sta", "boris_bayern", "ev_starnberg", "lfstat", "mvv_s6", "municipal_sites"]} />}
        >
          <DataTable dense>
            <thead>
              <tr>
                <th>Community</th>
                <th className="text-right">Pop</th>
                <th className="text-right">SFH €/m²</th>
                <th className="text-right">Lux P90 €/m²</th>
                <th className="text-right">Lakefront villa €M</th>
                <th className="text-right">5-yr SFH</th>
                <th className="text-right">GewSt</th>
                <th className="text-right">Commute min</th>
                <th>Schools</th>
                <th>Outlook</th>
              </tr>
            </thead>
            <tbody>
              {lakeCommunities.map((c) => (
                <tr key={c.slug}>
                  <td>
                    <Link href={`/communities/${c.slug}`} className="serif font-medium hover:underline">
                      {c.name}
                    </Link>
                    {c.subtitle && <div className="text-[0.7rem] text-ink-500 leading-snug">{c.subtitle}</div>}
                  </td>
                  <td className="text-right tabnums">{c.population.toLocaleString()}</td>
                  <td className="text-right tabnums">€{c.sfhMedianEurPerM2.toLocaleString()}</td>
                  <td className="text-right tabnums">
                    €{c.luxP90PerM2Low?.toLocaleString()}–€{c.luxP90PerM2High?.toLocaleString()}
                  </td>
                  <td className="text-right tabnums">
                    €{c.lakefrontVillaMinM}–€{c.lakefrontVillaMaxM}M
                  </td>
                  <td className="text-right tabnums">+{Math.round((c.fiveYrSfh || 0) * 100)}%</td>
                  <td className="text-right tabnums">{c.gewStHebesatz}%</td>
                  <td className="text-right tabnums">
                    {c.commuteMinMin}–{c.commuteMaxMin}
                    {c.sBahn ? "" : "*"}
                  </td>
                  <td className="text-[0.75rem]">
                    {c.gymnasium ? "Gymnasium" : "—"}
                    {c.internationalSchoolMin ? `, MIS ${c.internationalSchoolMin}′` : ""}
                  </td>
                  <td>
                    <Chip tone={ratingTone(c.outlook)}>{ratingLabel(c.outlook)}</Chip>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Figure>
        <div className="text-xs text-ink-500 mt-1 italic">* Car-only — no S-Bahn on this community.</div>
      </Section>

      <Section>
        <SectionHeader kicker="Deep dives" title="Lake communities." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lakeCommunities.map((c) => (
            <Link
              key={c.slug}
              href={`/communities/${c.slug}`}
              className="block bg-paper border border-rule rounded-md p-5 hover:bg-parchment transition-colors shadow-card"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <div className="kicker text-gold-500">
                    {c.shore ? `${c.shore} shore` : "—"} {c.prestigeRank ? `· #${c.prestigeRank}` : ""}
                  </div>
                  <div className="serif text-[1.3rem] text-ink-900">{c.name}</div>
                  {c.subtitle && <div className="text-[0.8rem] text-ink-500">{c.subtitle}</div>}
                </div>
                <Chip tone={ratingTone(c.outlook)}>{ratingLabel(c.outlook)}</Chip>
              </div>
              <p className="text-sm text-ink-700 mt-2 leading-relaxed">{c.thesis}</p>
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs tabnums">
                <div>
                  <div className="text-ink-500 text-[0.7rem]">SFH median</div>
                  <div className="text-ink-900 font-medium">{fmtPrice(c.sfhMedianEurPerM2)}</div>
                </div>
                <div>
                  <div className="text-ink-500 text-[0.7rem]">Lakefront villa</div>
                  <div className="text-ink-900 font-medium">
                    €{c.lakefrontVillaMinM}–{c.lakefrontVillaMaxM}M
                  </div>
                </div>
                <div>
                  <div className="text-ink-500 text-[0.7rem]">Commute</div>
                  <div className="text-ink-900 font-medium">
                    {c.commuteMinMin}–{c.commuteMaxMin} min
                  </div>
                </div>
              </div>
              <div className="kicker mt-3 text-gold-500">Open brief →</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="parchment">
        <SectionHeader kicker="Munich prime" title="Six urban alternatives." sub="For completeness — the six Munich districts a €5–10M buyer would seriously weigh against the Seelage move." />
        <Figure
          caption="Munich prime districts, 2025 medians and rating."
          source={<SourceCite ids={["gutachter_muc", "ev_munich", "sothebys_munich", "jll_muc"]} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>District</th>
                <th className="text-right">Pop</th>
                <th className="text-right">SFH €/m²</th>
                <th className="text-right">Lux P90 €/m²</th>
                <th className="text-right">5-yr SFH</th>
                <th className="text-right">Hebesatz</th>
                <th>Outlook</th>
              </tr>
            </thead>
            <tbody>
              {munichPrime.map((c) => (
                <tr key={c.slug}>
                  <td>
                    <span className="serif font-medium">{c.name}</span>
                  </td>
                  <td className="text-right tabnums">{c.population.toLocaleString()}</td>
                  <td className="text-right tabnums">€{c.sfhMedianEurPerM2.toLocaleString()}</td>
                  <td className="text-right tabnums">
                    €{c.luxP90PerM2Low?.toLocaleString()}–€{c.luxP90PerM2High?.toLocaleString()}
                  </td>
                  <td className="text-right tabnums">+{Math.round((c.fiveYrSfh || 0) * 100)}%</td>
                  <td className="text-right tabnums">{c.grundsteuerB}%</td>
                  <td>
                    <Chip tone={ratingTone(c.outlook)}>{ratingLabel(c.outlook)}</Chip>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Figure>
        <Prose className="mt-5">
          <p>
            <strong>Grünwald</strong> is the tax-optimised city substitute for lakefront (Hebesatz 240%),
            but delivers neither view nor water; <strong>Bogenhausen</strong> is the historic villa answer
            for buyers prioritising Gymnasium access and Isarnähe; <strong>Altstadt-Maxvorstadt</strong> is
            trophy-penthouse territory where the €5–10M band buys 200–300 m² but no garden. At this ticket,
            these are complements, not substitutes, to the Seelage decision.
          </p>
        </Prose>
      </Section>
    </>
  );
}
