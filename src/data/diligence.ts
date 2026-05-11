// Due-diligence checklist for a Starnbergersee luxury primary residence.

export type ChecklistItem = {
  id: string;
  question: string;
  detail: string;
  category: "zoning" | "water" | "heritage" | "energy" | "easements" | "flood" | "legal" | "infrastructure" | "tax";
  severity: "show-stopper" | "high" | "medium" | "low";
  artifacts?: string[]; // documents the buyer should obtain
};

export const checklist: ChecklistItem[] = [
  {
    id: "b-plan",
    category: "zoning",
    question: "Does a Bebauungsplan exist, and does it allow residential use at the built volume?",
    detail:
      "If the parcel is inside a B-Plan, rebuild rights are clearer. If it sits in the Außenbereich (most direct-lakefront), rebuild rights hinge on Bestandsschutz — document the current volume as the reference for any future replacement.",
    severity: "show-stopper",
    artifacts: ["Auszug B-Plan", "Baulastenverzeichnis", "Erklärung Bauamt zum Bestandsschutz"],
  },
  {
    id: "bestandsschutz",
    category: "zoning",
    question: "Is Bestandsschutz (grandfathering) confirmed in writing for the existing volume?",
    detail: "Crucial for any replacement / teardown scenario. Get a positive Vorbescheid from the Bauamt before signing.",
    severity: "show-stopper",
    artifacts: ["Bauvorbescheid", "Teilungsgenehmigung (if relevant)"],
  },
  {
    id: "brw",
    category: "zoning",
    question: "What is the current Bodenrichtwert and what share of the price it implies for land?",
    detail: "Pull the most recent BRW from BORIS-Bayern. Compare to purchase price to separate land from improvements.",
    severity: "medium",
    artifacts: ["BRW-Auszug BORIS-Bayern", "Gutachterausschuss-Bericht"],
  },
  {
    id: "gewaesserstreifen",
    category: "water",
    question: "What is the enforced Gewässerrandstreifen — 5, 10, 30 or 50 m?",
    detail: "Determines how close to the waterline any future renovation or Garage/Pool may sit. Often stricter than §21 BayWG default via LSG or B-Plan overlay.",
    severity: "high",
    artifacts: ["LSG-Verordnung", "Bebauungsplan-Festsetzungen", "Katasterplan"],
  },
  {
    id: "steg-wasserrecht",
    category: "water",
    question: "Does the Steg / Bootshaus carry a valid Wasserrecht with dated permit?",
    detail: "Private Stege without an Altbestand Wasserrecht have no realisable value and cannot be legally re-used.",
    severity: "high",
    artifacts: ["WWA Weilheim Wasserrechtsbescheid", "Steg-Plan und Baujahr"],
  },
  {
    id: "seeuferweg",
    category: "easements",
    question: "Is a Seeuferweg designated, under review, or enforced through the parcel?",
    detail: "An enforced path cuts 20–35 % off the lakefront premium. Enforcement disputes can persist >10 years.",
    severity: "high",
    artifacts: ["Grundbuch Abt. II", "Gemeindliche Auskunft", "Bay. VGH Entscheidungen"],
  },
  {
    id: "denkmal",
    category: "heritage",
    question: "Is the building listed (Baudenkmal / Ensembleschutz)?",
    detail: "Lists restoration duties — but unlocks §7i/§11b AfA and GEG §105 partial exemption. Denkmal entries often surprise buyers post-purchase.",
    severity: "high",
    artifacts: ["Denkmalliste Bayern Auskunft", "Bauakte"],
  },
  {
    id: "geg",
    category: "energy",
    question: "What is the Energieausweis class and what is the realistic retrofit cost to C/B?",
    detail: "Most 1950–1990 lake villas sit in G/H. Retrofit to C realistically costs €600–2,600 /m² — €240k–€1.0M on a 400 m² villa before contingencies.",
    severity: "medium",
    artifacts: ["Energieausweis", "Energieberater-Gutachten", "Heiztechnik Sanierungsangebot"],
  },
  {
    id: "hq100",
    category: "flood",
    question: "Does any part of the parcel fall inside HQ100 zones (LfU Bayern)?",
    detail: "The lake itself is regulated and low-risk; tributary streams and seepage corridors are the risk vectors. HQ100 flag compromises future insurance and permitting.",
    severity: "medium",
    artifacts: ["LfU HQ100 Auszug", "Elementarversicherung-Tarif"],
  },
  {
    id: "easements",
    category: "easements",
    question: "What easements (Grunddienstbarkeiten) encumber the parcel?",
    detail: "Wegerecht, Leitungsrecht, Wasserentnahmerechte — anything in Grundbuch Abt. II. Check whether the Hausanschluss runs under a neighbour's parcel.",
    severity: "high",
    artifacts: ["Grundbuchauszug Abt. I–III aktuell", "Dienstbarkeitenskizze"],
  },
  {
    id: "erbpacht",
    category: "legal",
    question: "Is the parcel Erbbaurecht (leasehold) — and on what remaining term / ground rent?",
    detail: "Some church and Wittelsbach holdings are leasehold. Value-negative if <50 years remain on the lease.",
    severity: "show-stopper",
    artifacts: ["Erbbaurechtsvertrag", "Grundbuch Abt. II"],
  },
  {
    id: "altlasten",
    category: "legal",
    question: "Is the parcel listed in the Altlastenkataster (contaminated-land register)?",
    detail: "Historic tanks / workshops / Kriegsschäden can trigger remediation duties.",
    severity: "medium",
    artifacts: ["Altlastenauskunft LRA Starnberg", "Baugrundgutachten"],
  },
  {
    id: "pre-emption",
    category: "legal",
    question: "Does the Gemeinde have a statutory Vorkaufsrecht?",
    detail: "Under BauGB §§24–27 many Gemeinden may exercise a pre-emption right — a closing delay of up to 3 months to obtain the Negativattest.",
    severity: "medium",
    artifacts: ["Negativzeugnis Vorkaufsrecht"],
  },
  {
    id: "septic",
    category: "infrastructure",
    question: "Is the property on municipal sewer, or on septic / Kleinkläranlage?",
    detail: "Lakefront parcels, especially east-shore Ambach/Ammerland, historically used septic systems. Upgrade order on Kleinkläranlage can be €40–120k.",
    severity: "medium",
    artifacts: ["Abwasseranschluss-Nachweis", "Entsorgungsbescheinigung"],
  },
  {
    id: "commute",
    category: "infrastructure",
    question: "What is the realistic door-to-door commute at 08:00 to Marienplatz?",
    detail: "Published S-Bahn times are accurate ±2 min; car times are not — A95 cars add 10–20 min in rush hour. Test the commute from the actual driveway.",
    severity: "low",
  },
  {
    id: "schools",
    category: "infrastructure",
    question: "Are the intended schools open for registration, and is the catchment confirmed?",
    detail: "Gymnasium Tutzing and MIS Buchhof both run waitlists. Reserve a slot in parallel to the LoI, not after closing.",
    severity: "medium",
    artifacts: ["Aufnahmebestätigung oder Warteliste"],
  },
  {
    id: "tax-residence",
    category: "tax",
    question: "Is the Hauptwohnsitz designation achievable at closing?",
    detail: "Triggers Familienheim Erbschaftsteuer exemption and waives Zweitwohnungsteuer. Requires physical move-in and Meldebescheinigung.",
    severity: "low",
  },
];
