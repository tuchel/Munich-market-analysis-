import Link from "next/link";
import { COMMUNITIES } from "@/lib/data/communities";

// Stylised SVG of Starnberger See with community pins. Coordinates roughly
// honour geographic positions on the lake (long, narrow N-S oriented body).
// Not a GIS map — purely editorial.

type Pin = { slug: string; x: number; y: number; anchor?: "left" | "right" | "top" | "bottom" };

const PINS: Pin[] = [
  { slug: "starnberg", x: 320, y: 60, anchor: "top" },     // north tip
  { slug: "berg", x: 380, y: 130, anchor: "right" },        // east upper
  { slug: "muensing", x: 410, y: 250, anchor: "right" },    // east middle (Ammerland)
  { slug: "seeshaupt", x: 320, y: 410, anchor: "bottom" },  // south tip
  { slug: "bernried", x: 220, y: 350, anchor: "left" },     // west lower
  { slug: "tutzing", x: 215, y: 260, anchor: "left" },      // west middle
  { slug: "feldafing", x: 240, y: 175, anchor: "left" },    // west upper
  { slug: "poecking", x: 285, y: 105, anchor: "left" },     // northwest (Possenhofen)
];

export function LakeMap({ highlight }: { highlight?: string }) {
  return (
    <div className="border border-rule rounded-md bg-parchment/30 p-4">
      <svg viewBox="0 0 600 480" className="w-full h-auto" role="img" aria-label="Starnberger See stylised map">
        {/* paper grid */}
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ece8dd" strokeWidth="0.8" />
          </pattern>
          <radialGradient id="water" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#a7c5d2" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6fa0b4" stopOpacity="0.5" />
          </radialGradient>
        </defs>
        <rect width="600" height="480" fill="url(#grid)" opacity="0.5" />

        {/* lake outline — stylised; long axis north-south */}
        <path
          d="M 320 30
             C 360 35, 395 80, 405 130
             C 415 175, 425 215, 415 260
             C 405 300, 395 340, 360 400
             C 340 425, 305 445, 290 420
             C 260 380, 235 350, 215 310
             C 195 260, 195 215, 215 165
             C 230 115, 265 70, 300 40
             Z"
          fill="url(#water)"
          stroke="#225d76"
          strokeWidth="1.4"
        />
        {/* Roseninsel — tiny island, west shore approx Feldafing */}
        <ellipse cx="260" cy="200" rx="6" ry="4" fill="#a27f3b" opacity="0.7" />
        <text x="270" y="203" fontSize="9" fill="#7e6028" fontFamily="Fraunces, serif" fontStyle="italic">Roseninsel</text>

        {/* compass */}
        <g transform="translate(550, 50)">
          <line x1="0" y1="-15" x2="0" y2="15" stroke="#8e8264" strokeWidth="1" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#8e8264" strokeWidth="1" />
          <text x="0" y="-20" fontSize="10" textAnchor="middle" fill="#332d22" fontFamily="Inter, sans-serif" fontWeight="600">N</text>
          <text x="0" y="28" fontSize="10" textAnchor="middle" fill="#332d22" fontFamily="Inter, sans-serif">S</text>
          <text x="-20" y="3" fontSize="10" textAnchor="end" fill="#332d22" fontFamily="Inter, sans-serif">W</text>
          <text x="20" y="3" fontSize="10" textAnchor="start" fill="#332d22" fontFamily="Inter, sans-serif">E</text>
        </g>

        {/* scale */}
        <g transform="translate(40, 440)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#332d22" strokeWidth="1.4" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#332d22" strokeWidth="1" />
          <line x1="80" y1="-3" x2="80" y2="3" stroke="#332d22" strokeWidth="1" />
          <text x="40" y="16" fontSize="9" textAnchor="middle" fill="#4d4432" fontFamily="Inter, sans-serif">~ 5 km (illustrative)</text>
        </g>

        {/* north arrow on shore */}
        <text x="320" y="22" fontSize="11" fill="#225d76" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic">→ Munich (S6)</text>

        {/* pins */}
        {PINS.map((p) => {
          const c = COMMUNITIES.find((c) => c.slug === p.slug);
          if (!c) return null;
          const active = highlight === p.slug;
          const labelX = p.anchor === "right" ? p.x + 12 : p.anchor === "left" ? p.x - 12 : p.x;
          const labelY = p.anchor === "top" ? p.y - 10 : p.anchor === "bottom" ? p.y + 18 : p.y + 4;
          const textAnchor = p.anchor === "right" ? "start" : p.anchor === "left" ? "end" : "middle";
          return (
            <g key={p.slug}>
              <Link href={`/communities/${p.slug}`}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 8 : 5}
                  fill={active ? "#a27f3b" : "#225d76"}
                  stroke="#faf8f3"
                  strokeWidth={2}
                  style={{ cursor: "pointer" }}
                />
                <text
                  x={labelX}
                  y={labelY}
                  fontSize={11}
                  fontFamily="Fraunces, serif"
                  fill={active ? "#7e6028" : "#332d22"}
                  fontWeight={active ? 600 : 500}
                  textAnchor={textAnchor}
                  style={{ cursor: "pointer" }}
                >
                  {c.name}
                </text>
                <text
                  x={labelX}
                  y={labelY + 12}
                  fontSize={9}
                  fontFamily="Inter, sans-serif"
                  fill="#6a5f45"
                  textAnchor={textAnchor}
                >
                  #{c.prestigeRank} · €{(c.lakefrontVilla[0]).toFixed(0)}–{(c.lakefrontVilla[1]).toFixed(0)}M
                </text>
              </Link>
            </g>
          );
        })}
      </svg>
      <div className="text-xs text-ink-500 mt-2 text-center italic">
        Click any community to open its detail page. Map is stylised; pin positions are indicative,
        not GIS-accurate. Prestige rank and lakefront-villa range shown.
      </div>
    </div>
  );
}
