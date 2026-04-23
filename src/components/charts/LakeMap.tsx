"use client";

import clsx from "clsx";
import { lakeCommunities, type Community } from "@/data/communities";
import Link from "next/link";

// Hand-crafted schematic of the Starnberger See.
// The lake shape is a vertically-elongated teardrop with Starnberg at the top and Seeshaupt at the bottom.
// Communities are positioned per research/communities.md, then attached to the nearest schematic shore.

const lakePath =
  "M 48 10 C 54 14, 60 18, 62 26 C 66 36, 72 44, 70 58 C 68 72, 62 82, 50 94 C 42 100, 34 96, 30 86 C 26 74, 22 60, 26 44 C 30 30, 36 20, 42 14 C 44 12, 46 11, 48 10 Z";

// Schematic boundaries of each shore: annotations on the inside-edge of the lake.
const roseninsel = { cx: 38, cy: 50 };

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
    if (metric === "outlook") return outlookColor(c.outlook);
    if (metric === "price") {
      const t = (c.sfhMedianEurPerM2 - minPrice) / (maxPrice - minPrice || 1);
      // scale lake-300 (#6fa0b4) -> lake-700 (#123848)
      const blend = (a: number, b: number) => Math.round(a + (b - a) * t);
      const r = blend(0x6f, 0x12);
      const g = blend(0xa0, 0x38);
      const b2 = blend(0xb4, 0x48);
      return `rgb(${r},${g},${b2})`;
    }
    if (metric === "commute") {
      const t = c.commuteMaxMin >= 55 ? 1 : c.commuteMaxMin <= 32 ? 0 : (c.commuteMaxMin - 32) / 23;
      const blend = (a: number, b: number) => Math.round(a + (b - a) * t);
      const r = blend(0x2f, 0x9e);
      const g = blend(0x6a, 0x38);
      const b2 = blend(0x3f, 0x38);
      return `rgb(${r},${g},${b2})`;
    }
    return "#225d76";
  };

  return (
    <div className="relative" style={{ width: size, maxWidth: "100%" }}>
      <svg viewBox="0 0 100 110" width={size} height={size * 1.1} role="img" aria-label="Starnberger See community map">
        <defs>
          <linearGradient id="lakefill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a7c5d2" />
            <stop offset="50%" stopColor="#6fa0b4" />
            <stop offset="100%" stopColor="#3f7d96" />
          </linearGradient>
          <pattern id="ripple" patternUnits="userSpaceOnUse" width="3" height="3">
            <path d="M0 1.5 C 0.5 0.5, 1.5 0.5, 1.5 1.5 S 2.5 2.5, 3 1.5" stroke="#eef4f6" strokeWidth="0.18" fill="none" />
          </pattern>
        </defs>
        <rect width="100" height="110" fill="#faf8f3" />
        {/* Alpenblick horizon to the south */}
        <g opacity="0.6">
          <polygon points="0,106 18,99 34,104 48,97 62,102 78,96 100,101 100,110 0,110" fill="#ece8dd" />
          <polygon points="30,100 42,93 50,100 62,92 72,99 80,95 92,100" fill="none" stroke="#cdc5b0" strokeWidth="0.3" />
        </g>
        {/* Lake body */}
        <path d={lakePath} fill="url(#lakefill)" stroke="#123848" strokeWidth="0.35" />
        <path d={lakePath} fill="url(#ripple)" />

        {/* Roseninsel marker */}
        <g>
          <circle cx={roseninsel.cx} cy={roseninsel.cy} r="0.9" fill="#c2a057" stroke="#7e6028" strokeWidth="0.15" />
          <text x={roseninsel.cx - 6} y={roseninsel.cy - 1.4} fontSize="2" fill="#332d22" fontStyle="italic">
            Roseninsel
          </text>
        </g>

        {/* Community markers */}
        {lakeCommunities.map((c) => {
          const hp = highlight === c.slug;
          return (
            <g key={c.slug} transform={`translate(${c.lakePos!.x},${c.lakePos!.y})`}>
              <circle
                r={hp ? 2.4 : 1.8}
                fill={color(c)}
                stroke="#faf8f3"
                strokeWidth="0.5"
                style={{ transition: "r 0.2s" }}
              />
              <text
                x={c.lakePos!.x > 50 ? 3 : -3}
                y={0.5}
                fontSize="2.3"
                fill="#12100b"
                fontFamily="Fraunces, serif"
                textAnchor={c.lakePos!.x > 50 ? "start" : "end"}
                fontWeight={hp ? 600 : 500}
              >
                {c.name}
              </text>
              <text
                x={c.lakePos!.x > 50 ? 3 : -3}
                y={3}
                fontSize="1.6"
                fill="#4d4432"
                textAnchor={c.lakePos!.x > 50 ? "start" : "end"}
              >
                €{(c.sfhMedianEurPerM2 / 1000).toFixed(1)}k/m²
              </text>
            </g>
          );
        })}

        {/* Compass */}
        <g transform="translate(90,12)">
          <circle r="3" fill="#faf8f3" stroke="#cdc5b0" strokeWidth="0.25" />
          <text y="0.5" textAnchor="middle" fontSize="2.2" fill="#12100b" fontFamily="Fraunces, serif">
            N
          </text>
          <line x1="0" y1="0.6" x2="0" y2="-2.2" stroke="#12100b" strokeWidth="0.3" />
        </g>

        {/* Scale */}
        <g transform="translate(10,100)">
          <line x1="0" y1="0" x2="8" y2="0" stroke="#12100b" strokeWidth="0.4" />
          <text y="3" fontSize="1.6" fill="#4d4432">
            ≈ 4 km
          </text>
        </g>
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
