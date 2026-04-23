#!/usr/bin/env node
// Read the Overpass JSON for Starnberger See, simplify the shoreline,
// project to a local planar coord system (metres), and emit a TS module.

import { readFileSync, writeFileSync } from "node:fs";

const raw = JSON.parse(readFileSync("scripts/starnbergersee.overpass.json", "utf8"));
const rel = raw.elements[0];
if (!rel || rel.tags?.name !== "Starnberger See") {
  throw new Error("Expected Starnberger See relation as first element");
}

// Collect rings
const outerMembers = rel.members.filter((m) => m.role === "outer");
const innerMembers = rel.members.filter((m) => m.role === "inner");
if (outerMembers.length !== 1) throw new Error(`Expected 1 outer ring, got ${outerMembers.length}`);

// Determine projection centre as the outer ring centroid (arithmetic mean)
const outerGeom = outerMembers[0].geometry;
const lat0 = outerGeom.reduce((a, p) => a + p.lat, 0) / outerGeom.length;
const lon0 = outerGeom.reduce((a, p) => a + p.lon, 0) / outerGeom.length;
const cosLat0 = Math.cos((lat0 * Math.PI) / 180);

// 1 deg lat ≈ 111_320 m; 1 deg lon ≈ 111_320 * cos(lat0) m
const M_PER_DEG_LAT = 111320;
const M_PER_DEG_LON = 111320 * cosLat0;

function project(lat, lon) {
  return {
    x: (lon - lon0) * M_PER_DEG_LON,
    // SVG y grows downwards — flip so north is up
    y: -(lat - lat0) * M_PER_DEG_LAT,
  };
}

function projectRing(geom) {
  return geom.map((p) => project(p.lat, p.lon));
}

// Douglas-Peucker, in planar metres.
function distPointSegment(p, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const proj = { x: a.x + t * dx, y: a.y + t * dy };
  return Math.hypot(p.x - proj.x, p.y - proj.y);
}
function dp(points, tol) {
  if (points.length < 3) return points.slice();
  let maxDist = 0;
  let maxIdx = -1;
  for (let i = 1; i < points.length - 1; i++) {
    const d = distPointSegment(points[i], points[0], points[points.length - 1]);
    if (d > maxDist) {
      maxDist = d;
      maxIdx = i;
    }
  }
  if (maxDist > tol) {
    const left = dp(points.slice(0, maxIdx + 1), tol);
    const right = dp(points.slice(maxIdx), tol);
    return [...left.slice(0, -1), ...right];
  }
  return [points[0], points[points.length - 1]];
}

// Shore: simplify to ~25 m tolerance. The lake is ~6.7 km × 19.7 km; 25 m is well
// below the perceptual width of a 2 px stroke at the final render scale.
const outerProjected = projectRing(outerGeom);
const outerSimplified = dp(outerProjected, 25);
// Roseninsel is small; keep finer detail at 3 m tolerance.
const inners = innerMembers.map((m) => ({
  geometry: m.geometry,
  projected: projectRing(m.geometry),
}));
const innerSimplified = inners
  .map((r) => ({ original: r.geometry.length, simplified: dp(r.projected, 3) }))
  .filter((r) => r.simplified.length >= 4); // drop the tiny 6-point artefact

// Compute bbox
function bbox(ring) {
  const xs = ring.map((p) => p.x);
  const ys = ring.map((p) => p.y);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}
const bb = bbox(outerSimplified);
const widthM = bb.maxX - bb.minX;
const heightM = bb.maxY - bb.minY;

// Round nicely for the TS module
const roundPt = (p, d = 1) => ({ x: +p.x.toFixed(d), y: +p.y.toFixed(d) });

// Roseninsel feature — find by bbox
const roseninselRing = innerSimplified[0]?.simplified || [];

console.log("Outer:", outerGeom.length, "→", outerSimplified.length, "pts");
console.log("Inner rings kept:", innerSimplified.length);
innerSimplified.forEach((r, i) => console.log(`  Inner ${i}: ${r.original} → ${r.simplified.length} pts`));
console.log("Lake bbox metres:", widthM.toFixed(0), "×", heightM.toFixed(0));

// Community coordinates (village centres — from Wikipedia / OSM).
// `anchor` = side of the pin on which the label is rendered.
// For east-shore pins, the label sits to the EAST of the pin (outside the lake).
// For west-shore pins, the label sits to the WEST.
const COMMUNITIES = [
  { slug: "starnberg", lat: 47.9943, lon: 11.3437, anchor: "E" },   // N tip, town on NE shoulder
  { slug: "berg", lat: 47.9728, lon: 11.3573, anchor: "E" },        // east shore, N
  { slug: "poecking", lat: 47.9583, lon: 11.3009, anchor: "W" },    // Possenhofen / Pöcking — west
  { slug: "feldafing", lat: 47.9361, lon: 11.2922, anchor: "W" },   // west shore, mid-north
  { slug: "tutzing", lat: 47.9094, lon: 11.2789, anchor: "W" },     // west shore, middle
  { slug: "bernried", lat: 47.8597, lon: 11.2917, anchor: "W" },    // west shore, south
  { slug: "seeshaupt", lat: 47.8257, lon: 11.3095, anchor: "W" },   // south tip
  { slug: "muensing", lat: 47.9093, lon: 11.3750, anchor: "E" },    // east shore (Ammerland/Holzhausen)
];

const communitiesProjected = COMMUNITIES.map((c) => ({
  slug: c.slug,
  anchor: c.anchor,
  ...roundPt(project(c.lat, c.lon)),
}));

// Roseninsel centroid for the label
let roseninselCentroid = null;
if (roseninselRing.length) {
  const cx = roseninselRing.reduce((a, p) => a + p.x, 0) / roseninselRing.length;
  const cy = roseninselRing.reduce((a, p) => a + p.y, 0) / roseninselRing.length;
  roseninselCentroid = { x: +cx.toFixed(1), y: +cy.toFixed(1) };
}

// Emit the module
const out = `// AUTOGENERATED by scripts/build-lake-geom.mjs — do not edit by hand.
// Source: OpenStreetMap (Overpass API), relation Q131615 / "Starnberger See".
// Projection: local equirectangular centred at (lat0=${lat0.toFixed(6)}, lon0=${lon0.toFixed(6)}),
// units are metres relative to that centre. North is up (negative y).

export const LAKE_PROJECTION = {
  lat0: ${lat0.toFixed(6)},
  lon0: ${lon0.toFixed(6)},
  metresPerDegLat: ${M_PER_DEG_LAT},
  metresPerDegLon: ${M_PER_DEG_LON.toFixed(2)},
};

export const LAKE_BBOX_M = {
  minX: ${bb.minX.toFixed(1)},
  maxX: ${bb.maxX.toFixed(1)},
  minY: ${bb.minY.toFixed(1)},
  maxY: ${bb.maxY.toFixed(1)},
  widthM: ${widthM.toFixed(1)},
  heightM: ${heightM.toFixed(1)},
};

export type LakePoint = { x: number; y: number };

export const LAKE_SHORE: LakePoint[] = ${JSON.stringify(outerSimplified.map((p) => roundPt(p)))};

export const LAKE_ISLANDS: LakePoint[][] = ${JSON.stringify(
  innerSimplified.map((r) => r.simplified.map((p) => roundPt(p)))
)};

export const ROSENINSEL_CENTROID: LakePoint | null = ${JSON.stringify(roseninselCentroid)};

export type CommunityPin = { slug: string; x: number; y: number; anchor: "E" | "W" };
export const COMMUNITY_PINS: CommunityPin[] = ${JSON.stringify(communitiesProjected)};
`;

writeFileSync("src/data/lakeGeometry.ts", out);
console.log("Wrote src/data/lakeGeometry.ts");
