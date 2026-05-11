# Munich / Starnberger See Research Portal

A Next.js 14 App Router site authored as private editorial research for a €5–10M primary-residence decision at the Starnberger See. Ten-year market history, community dossiers, lakefront premium analysis, interactive tools. Static-exported to GitHub Pages from `main`.

## Repository layout

- `src/app/` — App Router pages. Every top-level section (Market, Communities, Lakefront, Signals, Trends, Tools, Due Diligence, Glossary, Sources, Methodology) has its own directory; `communities/[slug]/` is a dynamic route backed by `generateStaticParams`.
- `src/components/` — Shared editorial components (`KpiCard`, `Chip`, `Callout`, `DataTable`, `PageHeader`, …), `charts/` (Recharts wrappers + the custom `LakeMap` SVG), and `tools/` (client-only interactive tools).
- `src/data/` — Typed domain data as TypeScript modules. Every chart and table reads from here. `sources.ts` is the citation registry; every chart cites by source id.
- `research/` — Markdown research dossiers that seed the TS data modules.
- `.github/workflows/deploy.yml` — Static-export → GitHub Pages pipeline.

## Coding discipline

Generic guardrails against common LLM coding mistakes. These apply to **new code and content** under `src/app/`, `src/components/`, and `src/data/`, and to the markdown dossiers in `research/`.

These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think before coding

Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing code, a new page, a new chart, or a data refresh:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them. Don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

Scope note: this "stop and ask" posture applies to code, page structure, analytical decisions, and irreversible operations (git pushes, deployments, schema changes to `src/data/*`). Low-stakes, well-scoped data refreshes — updating a single numeric field in a TS data module to match an updated public source — may proceed without asking, provided the source citation on the page stays accurate.

### 2. Simplicity first

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical changes

Touch only what you must. Clean up only your own mess.

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it. Don't delete it (deletions require explicit user confirmation).

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: every changed line should trace directly to the user's request. Expected multi-file fan-out — e.g. adding a new lake community touches `src/data/communities.ts`, often `src/data/lakefront.ts` and `src/data/taxes.ts`, and surfaces on the communities landing, dynamic-slug route, and comparator automatically — counts as part of "the user's request", not a violation of this rule.

### 4. Goal-driven execution

Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

- "Add a chart" → "The chart renders with real data from `src/data/*.ts`, cites its sources via `SourceCite`, and `npx next build` passes."
- "Fix the bug" → "Reproduce it locally (`npm run dev`), state the expected behaviour, then make the diff pass the reproduction."
- "Refactor X" → "`npx tsc --noEmit` clean before and after; `npx next build` succeeds; visual spot-check on the affected route."

For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**These guidelines are working if**: fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Build & deploy

- `npm run dev` — local dev server (no `basePath`).
- `npx tsc --noEmit` — typecheck.
- `npx next build` — produces `out/` as a static export.
- `GITHUB_PAGES=true npx next build` — production build with the `/Munich-market-analysis-` base path; this is what CI runs.
- Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes to https://tuchel.github.io/Munich-market-analysis-/.
