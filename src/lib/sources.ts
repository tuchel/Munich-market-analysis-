export type Source = {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  type: "official" | "industry" | "broker" | "academic" | "press" | "law" | "data" | "other";
  topics: Array<"macro" | "communities" | "lakefront" | "demographics" | "policy" | "climate" | "competing" | "tax" | "legal">;
  note?: string;
};

export const SOURCES: Source[] = [
  // ─── OFFICIAL / GOVERNMENT ────────────────────────────────────────────────
  { id: "muc-gaa-hjr-2025", title: "Halbjahresreport 2025", publisher: "Landeshauptstadt München, Gutachterausschuss", url: "https://stadt.muenchen.de/dam/jcr:8c838ecd-781d-441b-820d-635c0a420583/Halbjahresreport_2025.pdf", type: "official", topics: ["macro"], note: "Munich semi-annual transaction count, money turnover, Bestand/Neubau ETW medians H1 2025." },
  { id: "muc-gaa-herbst-2025", title: "Herbstanalyse 2025", publisher: "Landeshauptstadt München, Gutachterausschuss", url: "https://stadt.muenchen.de/dam/jcr:e3601f58-c801-47ab-8bd3-1ac2cf5dc4c9/Herbstanalyse_2025.pdf", type: "official", topics: ["macro"], note: "Q3 2025 stabilization narrative." },
  { id: "muc-gaa-hjr-2024", title: "Halbjahresreport 2024", publisher: "Landeshauptstadt München, Gutachterausschuss", url: "https://stadt.muenchen.de/dam/jcr:5602f0e5-3a8d-430d-a03d-6dcdaffc0acd/Halbjahresreport_2024.pdf", type: "official", topics: ["macro"] },
  { id: "lk-stb-gaa", title: "Immobilienmarktbericht Landkreis Starnberg", publisher: "Gutachterausschuss Landkreis Starnberg", url: "https://www.lk-starnberg.de/", type: "official", topics: ["macro", "communities"], note: "Methodology source; 2024 edition delayed to Q3/Q4 2026." },
  { id: "by-gaa", title: "Marktberichte Bayern", publisher: "Gutachterausschüsse Bayern", url: "https://www.gutachterausschuesse-bayern.de/marktberichte/", type: "official", topics: ["macro"] },
  { id: "by-imb-2024", title: "Bayern Immobilienmarktbericht 2024", publisher: "Gutachterausschüsse Bayern", url: "https://www.gutachterausschuesse-bayern.de/fileadmin/user_upload/Immobilienmarktberichte/2024_IMB_BY.pdf", type: "official", topics: ["macro"] },
  { id: "boris-by", title: "BORIS-Bayern Bodenrichtwertauskunft", publisher: "Bayer. Landesamt für Digitalisierung, Breitband und Vermessung", url: "https://boris.bayern.de/", type: "official", topics: ["communities", "lakefront"], note: "Parcel-level Bodenrichtwerte; lakefront cells €22k–35k/m² in Berg/Feldafing." },
  { id: "destatis-hpi", title: "Häuserpreisindex (Tabelle 61262)", publisher: "Statistisches Bundesamt (Destatis)", url: "https://www.destatis.de/", type: "official", topics: ["macro"] },
  { id: "destatis-bpi", title: "Baupreisindex Wohngebäude", publisher: "Destatis", url: "https://www.destatis.de/", type: "official", topics: ["macro"], note: "+61 % cumulative 2015–2025 cost inflation." },
  { id: "destatis-bevoelk", title: "Bevölkerungsfortschreibung auf Grundlage des Zensus 2022", publisher: "Destatis", url: "https://www.destatis.de/", type: "official", topics: ["demographics"] },
  { id: "destatis-bauantraege", title: "Baugenehmigungen und Baufertigstellungen, Fachserie 5 R.1", publisher: "Destatis", url: "https://www.destatis.de/", type: "official", topics: ["demographics"] },
  { id: "bbk-zinsen", title: "Wohnungsbaukredite an private Haushalte — Zinsstatistik", publisher: "Deutsche Bundesbank", url: "https://www.bundesbank.de/de/statistiken/geld-und-kapitalmaerkte/zinssaetze-und-renditen/wohnungsbaukredite-an-private-haushalte-hypothekarkredite-auf-wohngrundstuecke-615036", type: "official", topics: ["macro"] },
  { id: "bbk-wohnimmo", title: "Indikatorensystem Wohnimmobilienmarkt", publisher: "Deutsche Bundesbank", url: "https://www.bundesbank.de/de/statistiken/indikatorensaetze/indikatorensystem-wohnimmobilienmarkt", type: "official", topics: ["macro"] },
  { id: "bbk-overval", title: "Preise für Wohnimmobilien sanken 2023 deutlich, Mieten stärker unter Druck", publisher: "Deutsche Bundesbank", url: "https://www.bundesbank.de/", type: "official", topics: ["macro"] },
  { id: "ecb-rates", title: "Key ECB Interest Rates", publisher: "European Central Bank", url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html", type: "official", topics: ["macro"] },
  { id: "lfstat-by", title: "Bayerisches Landesamt für Statistik — Gemeindedaten LK Starnberg", publisher: "LfStat Bayern", url: "https://www.statistik.bayern.de/", type: "official", topics: ["demographics", "communities"] },
  { id: "lfstat-prog", title: "Regionalisierte Bevölkerungsvorausberechnung Bayern bis 2043", publisher: "LfStat Bayern", url: "https://www.statistik.bayern.de/", type: "official", topics: ["demographics"] },
  { id: "vgrdl", title: "Verfügbares Einkommen der privaten Haushalte in Landkreisen", publisher: "VGRdL Arbeitskreis", url: "https://www.vgrdl.de/", type: "official", topics: ["demographics"], note: "LK Starnberg #1–2 richest Landkreis." },
  { id: "bbsr", title: "Raumordnungsbericht 2023; Wohnungsmarktprognose 2030", publisher: "BBSR Bonn", url: "https://www.bbsr.bund.de/", type: "official", topics: ["demographics"] },
  { id: "lfu-by", title: "Hochwassergefahrenkarten + Seenbericht Starnberger See", publisher: "Bayerisches Landesamt für Umwelt", url: "https://www.lfu.bayern.de/", type: "official", topics: ["climate"], note: "Trophie-Status Starnberger See: oligotroph." },
  { id: "stmfh", title: "Grundsteuerreform Bayern (Flächenmodell)", publisher: "Bayerisches Staatsministerium der Finanzen", url: "https://www.stmfh.bayern.de/", type: "official", topics: ["tax", "policy"] },
  { id: "bay-denkmal", title: "Bayerischer Denkmal-Atlas", publisher: "Bayer. Landesamt für Denkmalpflege", url: "https://geoportal.bayern.de/", type: "official", topics: ["lakefront", "policy"] },
  { id: "dwd", title: "Klimareport Bayern 2023", publisher: "Deutscher Wetterdienst", url: "https://www.dwd.de/", type: "official", topics: ["climate"] },
  { id: "uba", title: "Monitoringbericht 2023 zur Deutschen Anpassungsstrategie", publisher: "Umweltbundesamt", url: "https://www.umweltbundesamt.de/", type: "official", topics: ["climate"] },
  { id: "ffh-stb", title: "FFH-Managementplan Starnberger See", publisher: "Regierung von Oberbayern", url: "https://www.regierung.oberbayern.bayern.de/", type: "official", topics: ["lakefront", "policy"] },
  { id: "wwa-weilheim", title: "Wasserwirtschaftsamt Weilheim — Steg-Genehmigungspraxis", publisher: "WWA Weilheim", url: "https://www.wwa-wm.bayern.de/", type: "official", topics: ["lakefront"] },
  { id: "bzst", title: "Erbschaft- und Schenkungsteuer Tabellen", publisher: "Bundeszentralamt für Steuern", url: "https://www.bzst.de/", type: "official", topics: ["tax"] },

  // ─── LAW ──────────────────────────────────────────────────────────────────
  { id: "baygwbg", title: "Bayerisches Wassergesetz (BayWG)", publisher: "Gesetze Bayern", url: "https://www.gesetze-bayern.de/", type: "law", topics: ["lakefront", "legal"] },
  { id: "baybg", title: "Baugesetzbuch (BauGB), §§ 30, 34, 35", publisher: "gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/baugb/", type: "law", topics: ["lakefront", "legal"] },
  { id: "baydschg", title: "Bayerisches Denkmalschutzgesetz (BayDSchG)", publisher: "Gesetze Bayern", url: "https://www.gesetze-bayern.de/", type: "law", topics: ["lakefront", "legal"] },
  { id: "geg", title: "Gebäudeenergiegesetz (GEG), Fassung 16.10.2023", publisher: "gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/geg/", type: "law", topics: ["policy"] },
  { id: "grstg", title: "Bayerisches Grundsteuergesetz (BayGrStG)", publisher: "Gesetze Bayern", url: "https://www.gesetze-bayern.de/", type: "law", topics: ["tax"] },
  { id: "grest", title: "Grunderwerbsteuergesetz (GrEStG) § 11", publisher: "gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/grestg_1983/", type: "law", topics: ["tax"] },
  { id: "erbstg", title: "Erbschaftsteuer- und Schenkungsteuergesetz (ErbStG)", publisher: "gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/erbstg_1974/", type: "law", topics: ["tax"] },
  { id: "estg-7i", title: "EStG §§ 7i, 11b — Erhöhte AfA Baudenkmäler", publisher: "gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/estg/", type: "law", topics: ["tax", "policy"] },
  { id: "bnatschg", title: "Bundesnaturschutzgesetz (BNatSchG); FFH-Gebiet DE-8033-371", publisher: "gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/bnatschg_2009/", type: "law", topics: ["lakefront"] },
  { id: "bgb-656", title: "BGB §§ 656a–d (Maklerrecht-Reform 23.12.2020)", publisher: "gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/bgb/", type: "law", topics: ["legal", "tax"] },
  { id: "gnotkg", title: "Gerichts- und Notarkostengesetz (GNotKG), Tabelle B", publisher: "gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/gnotkg/", type: "law", topics: ["legal", "tax"] },
  { id: "bvgh-seeuferweg", title: "BayVGH Az. 8 B series — Seeuferweg Münsing", publisher: "Bayerischer Verwaltungsgerichtshof", url: "https://www.gesetze-bayern.de/", type: "law", topics: ["lakefront", "legal"] },
  { id: "bverfg-grst", title: "BVerfG 1 BvL 11/14 (10.04.2018) — Grundsteuer", publisher: "Bundesverfassungsgericht", type: "law", topics: ["tax"] },

  // ─── INDUSTRY / BROKER ────────────────────────────────────────────────────
  { id: "ev-stb-2024", title: "Marktreport Starnberger See 2024/2025", publisher: "Engel & Völkers", url: "https://www.engelvoelkers.com/de-de/marktreporte/", type: "broker", topics: ["communities", "lakefront", "macro"], note: "Primary benchmark for €/m² SFH/ETW lakeside." },
  { id: "ev-deutschland", title: "Marktbericht Wohnimmobilien Deutschland 2023/24", publisher: "Engel & Völkers", url: "https://immobilienpreise.engelvoelkers.com/", type: "broker", topics: ["macro"] },
  { id: "ev-tegernsee", title: "Marktreport Tegernsee 2024", publisher: "Engel & Völkers", type: "broker", topics: ["competing"] },
  { id: "ev-ammersee", title: "Marktreport Ammersee 2023/24", publisher: "Engel & Völkers", type: "broker", topics: ["competing"] },
  { id: "ev-zurich", title: "Marktreport Zürichsee 2024", publisher: "Engel & Völkers", type: "broker", topics: ["competing"] },
  { id: "ev-como", title: "Lake Como Market Report 2024", publisher: "Engel & Völkers Italy", type: "broker", topics: ["competing"] },
  { id: "sir-stb", title: "Starnberger See lakefront listings 2024–2025", publisher: "Sotheby's International Realty Munich", url: "https://munich-sothebysrealty.com/", type: "broker", topics: ["lakefront", "communities"] },
  { id: "vp-stb", title: "Marktbericht Fünfseenland 2023, 2024", publisher: "Von Poll Immobilien", url: "https://www.von-poll.com/", type: "broker", topics: ["communities"] },
  { id: "ssi-2024", title: "Marktbericht Starnberger See 2024", publisher: "Starnberger See Immobilien", url: "https://issuu.com/see-immo/", type: "broker", topics: ["communities", "lakefront"] },
  { id: "ssi-2025", title: "Marktbericht Starnberger See 2025", publisher: "Starnberger See Immobilien", url: "https://issuu.com/see-immo/", type: "broker", topics: ["communities", "lakefront"] },
  { id: "riedel-stb", title: "Marktbericht Starnberger See", publisher: "Riedel Immobilien", url: "https://www.riedel-immobilien.de/", type: "broker", topics: ["lakefront"] },
  { id: "aigner-2024", title: "Marktbericht München 2024/2025", publisher: "Aigner Immobilien", url: "https://www.immobilienbrief-muenchen.de/", type: "broker", topics: ["macro"] },
  { id: "aigner-h1-2025", title: "Münchner Immobilienmarkt — Halbjahresbilanz H1 2025", publisher: "Aigner Immobilien", url: "https://aigner-immobilien.de/", type: "broker", topics: ["macro"] },
  { id: "fischer-stb", title: "Immobilienpreise Starnberg 2025", publisher: "Fischer Immobilien München", url: "https://www.fischer-immobilien-muenchen.de/", type: "broker", topics: ["macro", "communities"] },
  { id: "ivd-bayern", title: "IVD Süd Kaufmarktbericht Bayern Frühjahr/Herbst 2025", publisher: "IVD Süd", url: "https://ivd-sued.net/", type: "industry", topics: ["macro"] },
  { id: "lbs-bayern", title: "Markt für Wohnimmobilien 2025 — Bayern", publisher: "LBS Markt für Wohnimmobilien", url: "https://www.lbs-markt-fuer-wohnimmobilien.de/", type: "industry", topics: ["macro"] },
  { id: "jll-muc", title: "Residential City Profile München H2 2024", publisher: "JLL", url: "https://www.jll.de/de/trends-and-insights/research/residential-city-profile-muenchen", type: "industry", topics: ["macro"] },
  { id: "colliers-muc", title: "Immobilien-Marktbericht München 24/25", publisher: "Colliers", url: "https://www.colliers.de/", type: "industry", topics: ["macro"] },
  { id: "savills-muc", title: "Immobilieninvestmentmarkt München Q4 2025", publisher: "Savills", url: "https://www.savills.de/", type: "industry", topics: ["macro"] },
  { id: "vdp", title: "vdp-Immobilienpreisindex Q3 2025", publisher: "vdpResearch / pfandbrief.de", url: "https://www.pfandbrief.de/", type: "industry", topics: ["macro"] },
  { id: "empirica", title: "Empirica Blasenindex Q4 2025", publisher: "Empirica-Regio", url: "https://www.empirica-regio.de/", type: "industry", topics: ["macro"] },
  { id: "is24-wb", title: "ImmoScout24 WohnBarometer Q4 2025", publisher: "ImmoScout24", url: "https://www.scout24.com/", type: "industry", topics: ["macro"] },
  { id: "is24-atlas", title: "ImmoScout24 Atlas LK Starnberg", publisher: "ImmoScout24", url: "https://atlas.immobilienscout24.de/orte/deutschland/bayern/starnberg-kreis/starnberg", type: "data", topics: ["communities"] },
  { id: "knight-frank-piri", title: "Prime International Residential Index 2024", publisher: "Knight Frank", url: "https://www.knightfrank.com/", type: "industry", topics: ["competing"] },
  { id: "knight-frank-wealth", title: "The Wealth Report 2024 / 2025", publisher: "Knight Frank", url: "https://www.knightfrank.com/wealthreport", type: "industry", topics: ["demographics"] },
  { id: "savills-prime-lakes", title: "Prime Lakes & Alpine Markets Briefing 2023", publisher: "Savills", url: "https://www.savills.com/", type: "industry", topics: ["competing"] },
  { id: "capgemini-wwr", title: "World Wealth Report 2023 / 2024 — Germany", publisher: "Capgemini", url: "https://www.capgemini.com/", type: "industry", topics: ["demographics"] },
  { id: "ubs-gwr", title: "Global Wealth Report 2024", publisher: "UBS", url: "https://www.ubs.com/", type: "industry", topics: ["demographics"] },
  { id: "bcg-gwr", title: "Global Wealth Report 2024: A Tale of Two Economies", publisher: "BCG", url: "https://www.bcg.com/", type: "industry", topics: ["demographics"] },
  { id: "wuest", title: "Immo-Monitoring Q4 2024 — Zürichsee", publisher: "Wüest Partner", url: "https://www.wuestpartner.com/", type: "industry", topics: ["competing"] },
  { id: "tecnocasa-como", title: "Osservatorio Immobiliare Lago di Como 2024", publisher: "Tecnocasa", url: "https://www.tecnocasa.it/", type: "industry", topics: ["competing"] },
  { id: "agenzia-omi", title: "Osservatorio Mercato Immobiliare semester II 2024", publisher: "Agenzia delle Entrate (IT)", url: "https://www.agenziaentrate.gov.it/", type: "official", topics: ["competing"] },

  // ─── ACADEMIC / THINK-TANK ───────────────────────────────────────────────
  { id: "ifo-wohnung", title: "Schnelldienst 10/2025 — Wohnungsknappheit als politische Herausforderung", publisher: "ifo Institut", url: "https://www.ifo.de/", type: "academic", topics: ["macro", "demographics"] },
  { id: "diw-erbe", title: "Erbschaften in Deutschland 2020–2030 — Verteilung und fiskalische Effekte", publisher: "DIW Berlin", url: "https://www.diw.de/", type: "academic", topics: ["demographics", "tax"] },
  { id: "ifw-vermoegen", title: "Vermögensverteilung in Deutschland — Rolle von Immobilien und Erbschaften", publisher: "IfW Kiel", url: "https://www.ifw-kiel.de/", type: "academic", topics: ["demographics"] },
  { id: "db-erbwelle", title: "Erbschaftswelle in Deutschland — Das Ausmaß des Vermögensübergangs", publisher: "Deutsche Bank Research", url: "https://www.dbresearch.com/", type: "academic", topics: ["demographics"] },
  { id: "dena", title: "Gebäudereport 2024", publisher: "dena (Deutsche Energie-Agentur)", url: "https://www.dena.de/", type: "academic", topics: ["policy", "climate"] },

  // ─── PRESS ────────────────────────────────────────────────────────────────
  { id: "sz-stb", title: "Starnberger See Reportagen, 2022–2025", publisher: "Süddeutsche Zeitung — Landkreisteil Starnberg", url: "https://www.sueddeutsche.de/", type: "press", topics: ["communities", "lakefront"] },
  { id: "merkur-stb", title: "Starnberger Merkur archive, transaction & policy reporting", publisher: "Münchner Merkur / Starnberger Merkur", url: "https://www.merkur.de/", type: "press", topics: ["communities", "lakefront"] },
  { id: "handelsblatt-stb", title: "Deutschlands teuerste Wohnlagen 2024", publisher: "Handelsblatt", url: "https://www.handelsblatt.com/", type: "press", topics: ["communities", "macro"] },
  { id: "faz-stb", title: "Villen am Starnberger See, 2023", publisher: "Frankfurter Allgemeine Zeitung", url: "https://www.faz.net/", type: "press", topics: ["lakefront"] },
  { id: "bilanz-ch", title: "Goldküste HNWI mapping 2024", publisher: "Bilanz (CH)", type: "press", topics: ["competing", "demographics"] },
  { id: "ilsole24-como", title: "Case sul Lago di Como 2024", publisher: "Il Sole 24 Ore", url: "https://www.ilsole24ore.com/", type: "press", topics: ["competing"] },

  // ─── COMMUNITY OFFICIAL ───────────────────────────────────────────────────
  { id: "g-starnberg", title: "Haushaltssatzung & Hebesätze 2025", publisher: "Gemeinde Starnberg", url: "https://www.starnberg.de/", type: "official", topics: ["communities", "tax"] },
  { id: "g-berg", title: "Haushalt 2025", publisher: "Gemeinde Berg", url: "https://www.berg-starnberger-see.de/", type: "official", topics: ["communities", "tax"] },
  { id: "g-poecking", title: "Hebesätze 2025", publisher: "Gemeinde Pöcking", url: "https://www.poecking.de/", type: "official", topics: ["communities", "tax"] },
  { id: "g-feldafing", title: "Haushalt 2025", publisher: "Gemeinde Feldafing", url: "https://www.feldafing.de/", type: "official", topics: ["communities", "tax"] },
  { id: "g-tutzing", title: "Haushalt 2025", publisher: "Gemeinde Tutzing", url: "https://www.tutzing.de/", type: "official", topics: ["communities", "tax"] },
  { id: "g-bernried", title: "Haushalt 2025", publisher: "Gemeinde Bernried am Starnberger See", url: "https://www.bernried.de/", type: "official", topics: ["communities", "tax"] },
  { id: "g-seeshaupt", title: "Hebesätze 2025", publisher: "Gemeinde Seeshaupt", url: "https://www.seeshaupt.de/", type: "official", topics: ["communities", "tax"] },
  { id: "g-muensing", title: "Haushalt 2025", publisher: "Gemeinde Münsing", url: "https://www.muensing.de/", type: "official", topics: ["communities", "tax"] },

  // ─── OTHER DATA ───────────────────────────────────────────────────────────
  { id: "mis", title: "Munich International School — Campus Buchhof / Percha", publisher: "MIS Munich", url: "https://www.mis-munich.de/", type: "data", topics: ["communities"] },
  { id: "buchheim", title: "Buchheim Museum der Phantasie, Bernried", publisher: "Buchheim Stiftung", url: "https://www.buchheimmuseum.de/", type: "data", topics: ["communities"] },
  { id: "mvv-s6", title: "S6 Fahrplan Tutzing–Herrsching", publisher: "MVV München", url: "https://www.mvv-muenchen.de/", type: "data", topics: ["communities"] },
  { id: "schloesser-bayern", title: "Bayerische Schlösserverwaltung — Roseninsel / Schloss Possenhofen", publisher: "Bay. Schlösserverwaltung", url: "https://www.schloesser.bayern.de/", type: "official", topics: ["lakefront"] },
];
