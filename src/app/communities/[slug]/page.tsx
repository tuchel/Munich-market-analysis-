import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, SectionHeader } from "@/components/PageHeader";
import { Section, Prose } from "@/components/Section";
import { Figure, Callout } from "@/components/Callout";
import { DataTable } from "@/components/DataTable";
import { SourceCite } from "@/components/SourceCite";
import { LakeMap } from "@/components/charts/LakeMap";
import { Chip, ratingTone, ratingLabel } from "@/components/Chip";
import { KpiCard } from "@/components/KpiCard";
import { allCommunities, getCommunity, lakeCommunities } from "@/data/communities";
import { shoreInventory } from "@/data/lakefront";
import { hebesatzGrundsteuerB, zweitwohnsteuer, climate } from "@/data/taxes";

export function generateStaticParams() {
  return allCommunities.map((c) => ({ slug: c.slug }));
}

export default function CommunityPage({ params }: { params: { slug: string } }) {
  const c = getCommunity(params.slug);
  if (!c) notFound();

  const shoreRow = shoreInventory.find((r) => r.community === c.name);
  const hebesatzRow = hebesatzGrundsteuerB.find((r) => r.gemeinde === c.name);
  const zwsRow = zweitwohnsteuer.find((r) => r.gemeinde === c.name);
  const climRow = climate.find((r) => r.gemeinde === c.name);

  const neighbors =
    c.kind === "lake"
      ? lakeCommunities.filter((n) => n.slug !== c.slug).slice(0, 3)
      : [];

  return (
    <>
      <PageHeader
        kicker={c.kind === "lake" ? `Lake community · ${c.shore} shore` : "Munich prime district"}
        title={c.name}
        standfirst={<>{c.thesis}</>}
        meta={c.subtitle}
      />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard
            label="Population"
            value={c.population.toLocaleString()}
            sub={c.kind === "lake" ? "LK Starnberg Gemeinde" : "Munich district"}
          />
          <KpiCard
            label="SFH median €/m²"
            value={`€${c.sfhMedianEurPerM2.toLocaleString()}`}
            sub={c.fiveYrSfh ? `${Math.round(c.fiveYrSfh * 100)}% over 5 years` : undefined}
            tone={c.fiveYrSfh && c.fiveYrSfh > 0.28 ? "bull" : "neutral"}
          />
          <KpiCard
            label="Lakefront villa range"
            value={
              c.lakefrontVillaMinM
                ? `€${c.lakefrontVillaMinM}–${c.lakefrontVillaMaxM}M`
                : "—"
            }
            sub={c.brwLakefrontLow ? `BRW €${(c.brwLakefrontLow / 1000).toFixed(0)}–${(c.brwLakefrontHigh! / 1000).toFixed(0)}k/m²` : undefined}
          />
          <KpiCard
            label="Outlook"
            value={ratingLabel(c.outlook)}
            sub={`${c.thesis.split(".")[0]}. GewSt ${c.gewStHebesatz} % · GrSt B ${c.grundsteuerB} %.`}
            tone={ratingTone(c.outlook)}
            chipLabel={ratingLabel(c.outlook)}
          />
        </div>
      </Section>

      <Section tone="parchment">
        <div className="grid lg:grid-cols-2 gap-6">
          <Figure caption={`${c.name} — shore position on the Starnbergersee.`}>
            <LakeMap size={480} highlight={c.slug} linkSlug={false} />
          </Figure>
          <div>
            <SectionHeader kicker="Brief" title="The thesis, unpacked." />
            <Prose>
              <p>{c.thesis}</p>
              {c.buyerProfile && (
                <p>
                  <strong>Buyer profile: </strong>
                  {c.buyerProfile}.
                </p>
              )}
              {c.notable && c.notable.length > 0 && (
                <>
                  <p className="mt-4">
                    <strong>Notable reported transactions:</strong>
                  </p>
                  <ul>
                    {c.notable.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </>
              )}
            </Prose>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader kicker="Pricing distribution" title="From inland to lakefront." />
        <Figure
          caption="Reported 2025 ranges for SFH, ETW, luxury P90, lakefront villa, 2nd row, and hillside."
          source={<SourceCite ids={c.sourceIds} />}
        >
          <DataTable>
            <thead>
              <tr>
                <th>Segment</th>
                <th className="text-right">Range</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SFH median</td>
                <td className="text-right tabnums">€{c.sfhMedianEurPerM2.toLocaleString()}/m²</td>
                <td className="text-xs text-ink-600">Kreisweit median for detached single-family</td>
              </tr>
              {c.etwMedianEurPerM2 && (
                <tr>
                  <td>Apartment (ETW)</td>
                  <td className="text-right tabnums">€{c.etwMedianEurPerM2.toLocaleString()}/m²</td>
                  <td className="text-xs text-ink-600">Asking-price median</td>
                </tr>
              )}
              {c.luxP90PerM2Low && (
                <tr>
                  <td>Luxury P90 €/m²</td>
                  <td className="text-right tabnums">
                    €{c.luxP90PerM2Low.toLocaleString()}–€{c.luxP90PerM2High?.toLocaleString()}
                  </td>
                  <td className="text-xs text-ink-600">Top-10% of asking prices</td>
                </tr>
              )}
              {c.brwLakefrontLow && (
                <tr>
                  <td>Bodenrichtwert (lakefront)</td>
                  <td className="text-right tabnums">
                    €{c.brwLakefrontLow.toLocaleString()}–€{c.brwLakefrontHigh?.toLocaleString()}/m²
                  </td>
                  <td className="text-xs text-ink-600">BRW Stand 2024 — land-only</td>
                </tr>
              )}
              {c.lakefrontVillaMinM && (
                <tr>
                  <td>Direct-lakefront villa (object)</td>
                  <td className="text-right tabnums">
                    €{c.lakefrontVillaMinM}M – €{c.lakefrontVillaMaxM}M
                  </td>
                  <td className="text-xs text-ink-600">Depends on Steg, shore-gradient</td>
                </tr>
              )}
              {c.secondRowMinM && (
                <tr>
                  <td>2nd row (with view)</td>
                  <td className="text-right tabnums">
                    €{c.secondRowMinM}M – €{c.secondRowMaxM}M
                  </td>
                  <td className="text-xs text-ink-600">30–80 m inland</td>
                </tr>
              )}
              {c.hillsideMinM && (
                <tr>
                  <td>Hillside (view only)</td>
                  <td className="text-right tabnums">
                    €{c.hillsideMinM}M – €{c.hillsideMaxM}M
                  </td>
                  <td className="text-xs text-ink-600">&gt;100 m from shore</td>
                </tr>
              )}
            </tbody>
          </DataTable>
        </Figure>
      </Section>

      <Section tone="parchment">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <SectionHeader kicker="Tax & commute" title="The municipal stack." />
            <DataTable>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gewerbesteuer Hebesatz</td>
                  <td className="tabnums">{c.gewStHebesatz}%</td>
                </tr>
                <tr>
                  <td>Grundsteuer B Hebesatz</td>
                  <td className="tabnums">{hebesatzRow?.hebesatzPct || c.grundsteuerB}%</td>
                </tr>
                <tr>
                  <td>Zweitwohnungsteuer</td>
                  <td>{zwsRow ? (zwsRow.ratePct ? `${zwsRow.ratePct}% Jahresnettokaltmiete` : zwsRow.note) : "—"}</td>
                </tr>
                <tr>
                  <td>S-Bahn on community</td>
                  <td>{c.sBahn ? "Yes — S6 Hauptast" : "No — car / nearest Gemeinde"}</td>
                </tr>
                <tr>
                  <td>Door-to-Marienplatz (min, peak)</td>
                  <td className="tabnums">
                    {c.commuteMinMin}–{c.commuteMaxMin}
                  </td>
                </tr>
                <tr>
                  <td>Gymnasium on community</td>
                  <td>{c.gymnasium ? "Yes" : "No (use neighbour)"}</td>
                </tr>
                {c.internationalSchoolMin !== undefined && (
                  <tr>
                    <td>MIS Munich International School</td>
                    <td className="tabnums">{c.internationalSchoolMin} min drive</td>
                  </tr>
                )}
              </tbody>
            </DataTable>
          </div>
          <div>
            <SectionHeader kicker="Climate & physical" title="Lake-level, heat, flood." />
            <DataTable>
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HQ100 flood exposure</td>
                  <td>{climRow?.hq100 || "—"}</td>
                </tr>
                <tr>
                  <td>Critical zones</td>
                  <td className="text-[0.85rem]">{climRow?.zones || "—"}</td>
                </tr>
                <tr>
                  <td>Warming (2011–2040 proj, DWD)</td>
                  <td className="tabnums">+{climRow?.warmingC || "—"}°C</td>
                </tr>
                <tr>
                  <td>Heißetage (&ge;30°C, per year)</td>
                  <td className="tabnums">
                    {climRow ? `${climRow.heatDaysLow}–${climRow.heatDaysHigh}` : "—"}
                  </td>
                </tr>
                <tr>
                  <td>Lake trophy / bathability</td>
                  <td>Oligotroph — top EU Badewasser</td>
                </tr>
              </tbody>
            </DataTable>
            {shoreRow && (
              <Callout tone="note" className="mt-4" title="Lakefront inventory">
                {c.name} controls ~{shoreRow.shoreKm} km of shoreline, of which about{" "}
                {shoreRow.pctPrivateTradeable}% is privately tradeable — an estimated{" "}
                {shoreRow.parcelsMin}–{shoreRow.parcelsMax} direct-lakefront parcels. Typical annual
                turnover is {shoreRow.turnoverMin}–{shoreRow.turnoverMax} transactions.
              </Callout>
            )}
          </div>
        </div>
      </Section>

      {neighbors.length > 0 && (
        <Section>
          <SectionHeader kicker="Next" title="Adjacent lake communities." />
          <div className="grid md:grid-cols-3 gap-4">
            {neighbors.map((n) => (
              <Link
                key={n.slug}
                href={`/communities/${n.slug}`}
                className="block bg-paper border border-rule rounded-md p-4 hover:bg-parchment transition-colors shadow-card"
              >
                <div className="kicker text-gold-500">{n.shore} shore</div>
                <div className="serif text-[1.1rem] text-ink-900">{n.name}</div>
                <div className="text-sm text-ink-600 mt-1 leading-snug">{n.thesis.split(".")[0]}.</div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
