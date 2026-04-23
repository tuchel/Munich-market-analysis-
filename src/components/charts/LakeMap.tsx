"use client";

import clsx from "clsx";
import Link from "next/link";
import { lakeCommunities, type Community } from "@/data/communities";
import {
  LAKE_SHORE,
  LAKE_ISLANDS,
  LAKE_BBOX_M,
  ROSENINSEL_CENTROID,
  COMMUNITY_PINS,
} from "@/data/lakeGeometry";

// Viewport margins (metres) around the lake bounding box. Enough room for
// community labels, the Alps silhouette to the south, and a compass rose NW.
const PAD = { left: 3800, right: 3800, top: 1400, bottom: 4200 };

const VB = {
  minX: LAKE_BBOX_M.minX - PAD.left,
  minY: LAKE_BBOX_M.minY - PAD.top,
  width: LAKE_BBOX_M.widthM + PAD.left + PAD.right,
  height: LAKE_BBOX_M.heightM + PAD.top + PAD.bottom,
};

function outlookColor(o: Community["outlook"]) {
  switch (o) {
    case "bullish":
      return "#18475c";
    case "neutral-bullish":
      return "#3f7d96";
    case "neutral":
      return "#8a7b5c";
    case "neutral-bearish":
      return "#b97c3e";
    case "bearish":
      return "#9e3838";
  }
}

function priceColor(c: Community, min: number, max: number) {
  const t = (c.sfhMedianEurPerM2 - min) / (max - min || 1);
  const blend = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${blend(0x6f, 0x12)},${blend(0xa0, 0x38)},${blend(0xb4, 0x48)})`;
}

function commuteColor(c: Community) {
  const t = c.commuteMaxMin >= 55 ? 1 : c.commuteMaxMin <= 32 ? 0 : (c.commuteMaxMin - 32) / 23;
  const blend = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${blend(0x2f, 0x9e)},${blend(0x6a, 0x38)},${blend(0x3f, 0x38)})`;
}

function pointsToPath(pts: { x: number; y: number }[]) {
  if (!pts.length) return "";
  return (
    "M " +
    pts.map((p, i) => `${i === 0 ? "" : "L "}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") +
    " Z"
  );
}

export function LakeMap({
  metric = "outlook",
  size = 560,
  highlight,
  linkSlug = true,
}: {
  metric?: "outlook" | "price" | "commute";
  size?: number;
  highlight?: string;
  linkSlug?: boolean;
}) {
  const maxPrice = Math.max(...lakeCommunities.map((c) => c.sfhMedianEurPerM2));
  const minPrice = Math.min(...lakeCommunities.map((c) => c.sfhMedianEurPerM2));

  const color = (c: Community) => {
    if (metric === "price") return priceColor(c, minPrice, maxPrice);
    if (metric === "commute") return commuteColor(c);
    return outlookColor(c.outlook);
  };

  // Font sizes in viewBox metres. Calibrated so that a 520px render produces
  // ~13–16px community labels and ~11–12px subtext.
  const FS_COMMUNITY = 420;
  const FS_SUB = 320;
  const FS_NOTE = 260;
  const PIN_R = 180;
  const PIN_R_HL = 260;

  // Scale bar: 5 km in real metres → same in viewBox
  const SCALE_KM = 5;
  const scaleM = SCALE_KM * 1000;

  // Alps silhouette: three ranges of mountains along the south edge of the viewport
  const alpsBaseY = LAKE_BBOX_M.maxY + 1800;
  const alps = [
    // Back range (lightest)
    { y0: alpsBaseY + 900, amp: 900, period: 3800, fill: "#f0ebdf", stroke: "#d9d2bf" },
    // Mid range
    { y0: alpsBaseY + 600, amp: 1300, period: 4800, fill: "#e7e0cd", stroke: "#c5bba0" },
    // Front range (darkest, closest)
    { y0: alpsBaseY + 200, amp: 1600, period: 5200, fill: "#dad1b6", stroke: "#b2a483" },
  ];

  function alpsPath(range: { y0: number; amp: number; period: number }) {
    const { y0, amp, period } = range;
    const left = VB.minX - 200;
    const right = VB.minX + VB.width + 200;
    const baseY = y0 + amp;
    const pts: string[] = [`M ${left} ${baseY + amp}`];
    const n = Math.ceil((right - left) / (period / 4)) + 2;
    for (let i = 0; i <= n; i++) {
      const x = left + (i * (period / 4));
      const tri = i % 4; // rising peaks: 0 base,1 peak,2 valley,3 peak
      let yy = baseY;
      if (tri === 1) yy = y0;
      else if (tri === 2) yy = y0 + amp * 0.55;
      else if (tri === 3) yy = y0 + amp * 0.2;
      pts.push(`L ${x} ${yy}`);
    }
    pts.push(`L ${right} ${baseY + amp}`);
    pts.push("Z");
    return pts.join(" ");
  }

  return (
    <div className="relative w-full" style={{ maxWidth: size }}>
      <svg
        viewBox={`${VB.minX} ${VB.minY} ${VB.width} ${VB.height}`}
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMin meet"
        style={{ display: "block", aspectRatio: `${VB.width} / ${VB.height}` }}
        role="img"
        aria-label="Starnberger See — real-geometry community map, projected from OpenStreetMap"
      >
        <defs>
          <linearGradient id="lakefill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a7c5d2" />
            <stop offset="55%" stopColor="#6fa0b4" />
            <stop offset="100%" stopColor="#3f7d96" />
          </linearGradient>
          <pattern id="ripple" patternUnits="userSpaceOnUse" width="420" height="360">
            <path
              d="M0 180 C 90 60, 330 60, 420 180 M-210 360 C -120 240, 120 240, 210 360"
              stroke="#e9f2f4"
              strokeWidth="18"
              fill="none"
              opacity="0.55"
            />
          </pattern>
        </defs>

        {/* Paper */}
        <rect
          x={VB.minX}
          y={VB.minY}
          width={VB.width}
          height={VB.height}
          fill="#faf8f3"
        />

        {/* Alps silhouette */}
        <g>
          {alps.map((r, i) => (
            <path key={i} d={alpsPath(r)} fill={r.fill} stroke={r.stroke} strokeWidth="14" />
          ))}
        </g>

        {/* Ground line */}
        <line
          x1={VB.minX}
          y1={LAKE_BBOX_M.maxY + 1800}
          x2={VB.minX + VB.width}
          y2={LAKE_BBOX_M.maxY + 1800}
          stroke="#cdc5b0"
          strokeWidth="10"
        />

        {/* Lake body with Roseninsel punched through (fillRule=evenodd) */}
        <path
          d={[pointsToPath(LAKE_SHORE), ...LAKE_ISLANDS.map(pointsToPath)].join(" ")}
          fill="url(#lakefill)"
          stroke="#123848"
          strokeWidth="28"
          fillRule="evenodd"
        />
        <path
          d={[pointsToPath(LAKE_SHORE), ...LAKE_ISLANDS.map(pointsToPath)].join(" ")}
          fill="url(#ripple)"
          fillRule="evenodd"
          pointerEvents="none"
        />

        {/* Roseninsel label */}
        {ROSENINSEL_CENTROID && (
          <g>
            <text
              x={ROSENINSEL_CENTROID.x + 280}
              y={ROSENINSEL_CENTROID.y + 80}
              fontSize={FS_NOTE}
              fontStyle="italic"
              fill="#332d22"
              fontFamily="Fraunces, serif"
            >
              Roseninsel
            </text>
          </g>
        )}

        {/* Community pins */}
        {COMMUNITY_PINS.map((pin) => {
          const c = lakeCommunities.find((x) => x.slug === pin.slug);
          if (!c) return null;
          const hl = highlight === pin.slug;
          const labelDx = pin.anchor === "E" ? 420 : -420;
          const textAnchor = pin.anchor === "E" ? "start" : "end";
          return (
            <g key={pin.slug}>
              {/* Leader dot */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r={hl ? PIN_R_HL : PIN_R}
                fill={color(c)}
                stroke="#faf8f3"
                strokeWidth="60"
              />
              <text
                x={pin.x + labelDx}
                y={pin.y - 40}
                fontSize={FS_COMMUNITY}
                fill="#12100b"
                fontFamily="Fraunces, serif"
                textAnchor={textAnchor}
                fontWeight={hl ? 600 : 500}
              >
                {c.name}
              </text>
              <text
                x={pin.x + labelDx}
                y={pin.y + FS_SUB + 20}
                fontSize={FS_SUB}
                fill="#4d4432"
                fontFamily="Inter, sans-serif"
                textAnchor={textAnchor}
              >
                €{(c.sfhMedianEurPerM2 / 1000).toFixed(1)}k/m²
              </text>
            </g>
          );
        })}

        {/* Compass rose, top right */}
        {(() => {
          const cx = VB.minX + VB.width - 1800;
          const cy = VB.minY + 1400;
          const r = 560;
          return (
            <g>
              <circle cx={cx} cy={cy} r={r} fill="#faf8f3" stroke="#cdc5b0" strokeWidth="35" />
              <line x1={cx} y1={cy + r - 80} x2={cx} y2={cy - r + 160} stroke="#12100b" strokeWidth="40" />
              <polygon
                points={`${cx - 120} ${cy - r + 240}, ${cx + 120} ${cy - r + 240}, ${cx} ${cy - r + 60}`}
                fill="#12100b"
              />
              <text
                x={cx}
                y={cy - r - 120}
                fontSize={FS_NOTE + 40}
                fill="#12100b"
                fontFamily="Fraunces, serif"
                textAnchor="middle"
              >
                N
              </text>
            </g>
          );
        })()}

        {/* Scale bar, bottom left */}
        {(() => {
          const x0 = VB.minX + 900;
          const y0 = LAKE_BBOX_M.maxY + 3200;
          return (
            <g>
              <line x1={x0} y1={y0} x2={x0 + scaleM} y2={y0} stroke="#12100b" strokeWidth="50" />
              <line x1={x0} y1={y0 - 140} x2={x0} y2={y0 + 140} stroke="#12100b" strokeWidth="50" />
              <line
                x1={x0 + scaleM}
                y1={y0 - 140}
                x2={x0 + scaleM}
                y2={y0 + 140}
                stroke="#12100b"
                strokeWidth="50"
              />
              <text
                x={x0 + scaleM / 2}
                y={y0 - 260}
                fontSize={FS_SUB}
                fill="#4d4432"
                fontFamily="Inter, sans-serif"
                textAnchor="middle"
              >
                {SCALE_KM} km
              </text>
            </g>
          );
        })()}

        {/* Attribution */}
        <text
          x={VB.minX + VB.width - 300}
          y={VB.minY + VB.height - 300}
          fontSize={FS_NOTE - 40}
          fill="#8a7b5c"
          fontFamily="Inter, sans-serif"
          textAnchor="end"
          fontStyle="italic"
        >
          Shoreline: © OpenStreetMap contributors · WGS84 → local equirectangular
        </text>
      </svg>

      {linkSlug && (
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-1.5 text-xs">
          {lakeCommunities.map((c) => (
            <Link
              key={c.slug}
              href={`/communities/${c.slug}`}
              className={clsx(
                "flex items-center gap-1.5 px-2 py-1 border border-rule rounded-sm hover:bg-parchment",
                highlight === c.slug && "bg-parchment"
              )}
            >
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color(c) }} />
              <span className="truncate">{c.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
