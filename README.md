# slop-scan

[![CI status](https://img.shields.io/github/actions/workflow/status/modem-dev/slop-scan/ci.yml?branch=main&style=for-the-badge&label=CI)](https://github.com/modem-dev/slop-scan/actions/workflows/ci.yml?query=branch%3Amain)
[![Latest release](https://img.shields.io/github/v/release/modem-dev/slop-scan?style=for-the-badge&label=release)](https://github.com/modem-dev/slop-scan/releases)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

Deterministic CLI for finding **AI-associated slop patterns** in JavaScript and TypeScript repositories.

Scan a repo, surface the hotspots, and compare codebases using normalized slop metrics.

## Why use it

- **Find the hotspots fast** — see which files and directories concentrate the most suspicious patterns
- **Understand why something was flagged** — every finding includes a rule ID and evidence
- **Compare repos fairly** — normalize by file count, logical KLOC, and function count
- **Benchmark heuristics over time** — rerun the pinned benchmark set and watch movement

## Good fit for

- checking third-party repos that feel vibe-coded
- comparing known AI-generated repos to mature OSS baselines
- finding low-judgment boilerplate in your own codebase
- iterating on deterministic slop heuristics

## Why can you trust it?

Every rule is tested and benchmarked against popular, mature OSS repos pinned to exact commit SHAs from before AI coding was common. See [Benchmarks](#benchmarks).

## Install

Install globally with npm:

```bash
npm install -g slop-scan
```

Install it in a project and run it with npm tools:

```bash
npm install --save-dev slop-scan
npx slop-scan scan .
```

## Quick start

Scan the current repo:

```bash
slop-scan scan .
```

Scan the current repo in lint mode:

```bash
slop-scan scan . --lint
```

Scan another repo and get JSON:

```bash
slop-scan scan /path/to/repo --json
```

## Use it like a linter

Use `--lint` when you want human-readable findings in local runs, CI logs, or PR checks.

```bash
slop-scan scan . --lint
```

Example output:

```text
medium  Found 3 duplicated function signatures  structure.duplicate-function-signatures
  at src/users/normalize.ts:1:1
  at src/teams/normalize.ts:1:1
  at src/accounts/normalize.ts:1:1
```

## JSON output

Use `--json` when you want full-fidelity output for scripts, CI, or post-processing.

```bash
slop-scan scan . --json
```

Example CI check:

```bash
slop-scan scan . --json | jq -e '.summary.findingCount == 0'
```

The CLI currently exits non-zero for CLI/runtime errors, not for findings.

## Delta comparisons

Use `delta` when you want a machine-readable comparison between two scans.

Compare two paths directly:

```bash
slop-scan delta ../main .
slop-scan delta --base ../main --head . --json
```

Compare two saved reports:

```bash
slop-scan scan ../main --json > base.json
slop-scan scan . --json > head.json
slop-scan delta --base-report base.json --head-report head.json
```

Fail CI only when new or worse occurrence-level findings show up:

```bash
slop-scan delta --base ../main --fail-on added,worsened
```

`delta --json` emits a generic report format with:

- base/head scan summaries
- occurrence-level change classification (`added`, `resolved`, `worsened`, `improved`)
- per-path score deltas
- report metadata and config hashes so downstream tools can detect mismatched scan conditions
- stable per-occurrence fingerprints for built-in rules, so grouped findings can match across rescans without relying on rendered message text

## What it catches

Current default-pack checks focus on patterns that often show up in unreviewed generated code:

- [log-and-continue catch blocks](src/rules/error-swallowing/README.md)
- [error-obscuring catch blocks](src/rules/error-obscuring/README.md) (default-return or generic replacement error)
- [empty catch blocks](src/rules/empty-catch/README.md)
- [promise `.catch()` default fallbacks](src/rules/promise-default-fallbacks/README.md)
- [generic status envelopes](src/rules/generic-status-envelopes/README.md)
- [generic record casts](src/rules/generic-record-casts/README.md)
- [stringified unknown errors](src/rules/stringified-unknown-errors/README.md)
- [pass-through wrappers](src/rules/pass-through-wrappers/README.md)
- [duplicated test mock/setup patterns](src/rules/duplicate-mock-setup/README.md)

`scan` reports raw + normalized scores, hotspot tables, and grouped findings. Use `--json` when you want the full evidence payload.

## Supported files

Current language support:

- `.ts`
- `.tsx`
- `.js`
- `.jsx`
- `.mjs`
- `.cjs`

## Benchmarks

The repo ships with a **pinned, recreatable benchmark set** comparing known AI-generated repos against well-regarded OSS repos, with the mature-OSS cohort pinned to the latest default-branch commit on or before **2025-01-01**.

_Why before Jan 1, 2025?_ Because this cutoff aims to catch mature OSS before AI coding had materially changed mainstream repository shape and review norms.

**Blended score** = geometric mean of the six normalized-metric ratios versus the mature OSS cohort medians, then rescaled so the mature OSS cohort median is **1.00**. Higher means a repo is consistently noisier across the benchmark dimensions.

### Cohort medians

| Metric              | AI median | Mature OSS median |     Ratio |
| ------------------- | --------: | ----------------: | --------: |
| Blended score       |  **6.91** |          **1.00** | **6.91x** |
| Score / file        |  **1.07** |          **0.12** | **8.82x** |
| Score / KLOC        | **10.90** |          **1.48** | **7.38x** |
| Score / function    |  **0.28** |          **0.05** | **5.51x** |
| Findings / file     |  **0.29** |          **0.04** | **6.97x** |
| Findings / KLOC     |  **3.04** |          **0.56** | **5.39x** |
| Findings / function |  **0.08** |          **0.02** | **3.51x** |

### Rolling benchmark snapshot

Latest default-branch history, still normalized against the frozen pinned baseline. Ordered by latest pinned score.

| Repository                                                            | Cohort     | Latest ref       | Current blended | Latest pinned | Highest pinned | Δ prev | Δ peak |
| --------------------------------------------------------------------- | ---------- | ---------------- | --------------: | ------------: | -------------: | -----: | -----: |
| [`garrytan/gstack`](https://github.com/garrytan/gstack)               | ai         | `main@ed1e4be`   |        **9.15** |     **11.14** |      **11.14** |  +6.37 |   0.00 |
| [`FullAgent/fulling`](https://github.com/FullAgent/fulling)           | ai         | `main@d95060f`   |        **8.42** |     **10.24** |      **10.24** |  +8.08 |   0.00 |
| [`redwoodjs/agent-ci`](https://github.com/redwoodjs/agent-ci)         | ai         | `main@76b46f9`   |        **7.83** |      **9.53** |       **9.53** |  +5.61 |   0.00 |
| [`jiayun/DevWorkbench`](https://github.com/jiayun/DevWorkbench)       | ai         | `main@ea50862`   |        **7.39** |      **8.99** |       **8.99** |  +5.60 |   0.00 |
| [`robinebers/openusage`](https://github.com/robinebers/openusage)     | ai         | `main@584d44d`   |        **5.27** |      **6.41** |       **6.41** |  +3.39 |   0.00 |
| [`openclaw/openclaw`](https://github.com/openclaw/openclaw)           | ai         | `main@6b6dcaf`   |        **5.26** |      **6.40** |       **6.40** |  +3.48 |   0.00 |
| [`emdash-cms/emdash`](https://github.com/emdash-cms/emdash)           | ai         | `main@3dd1a1f`   |        **4.15** |      **5.06** |       **5.06** |  +3.04 |   0.00 |
| [`cloudflare/vinext`](https://github.com/cloudflare/vinext)           | ai         | `main@67a929b`   |        **3.06** |      **3.73** |       **3.73** |  +1.80 |   0.00 |
| [`modem-dev/hunk`](https://github.com/modem-dev/hunk)                 | ai         | `main@a6aa1cb`   |        **2.95** |      **3.59** |       **3.59** |  +2.08 |   0.00 |
| [`vitejs/vite`](https://github.com/vitejs/vite)                       | mature-oss | `main@640202a`   |        **1.71** |      **2.08** |       **2.08** |  +0.56 |   0.00 |
| [`withastro/astro`](https://github.com/withastro/astro)               | mature-oss | `main@1058428`   |        **1.69** |      **2.05** |       **2.05** |  +0.59 |   0.00 |
| [`egoist/tsup`](https://github.com/egoist/tsup)                       | mature-oss | `main@b906f86`   |        **1.25** |      **1.52** |       **1.52** |  +0.60 |   0.00 |
| [`pmndrs/zustand`](https://github.com/pmndrs/zustand)                 | mature-oss | `main@95d3f33`   |        **1.12** |      **1.36** |       **1.38** |  -0.02 |  -0.02 |
| [`payloadcms/payload`](https://github.com/payloadcms/payload)         | mature-oss | `main@0ceba02`   |        **1.00** |      **1.22** |       **1.34** |  -0.13 |  -0.13 |
| [`sindresorhus/execa`](https://github.com/sindresorhus/execa)         | mature-oss | `main@f3a2e84`   |        **0.82** |      **0.99** |       **0.99** |  +0.11 |   0.00 |
| [`mikaelbr/node-notifier`](https://github.com/mikaelbr/node-notifier) | mature-oss | `master@b36c237` |        **0.78** |      **0.95** |       **0.95** |  +0.53 |   0.00 |
| [`vercel/hyper`](https://github.com/vercel/hyper)                     | mature-oss | `canary@2a7bb18` |        **0.74** |      **0.90** |       **0.90** |  +0.49 |   0.00 |
| [`umami-software/umami`](https://github.com/umami-software/umami)     | mature-oss | `master@c78ff36` |        **0.70** |      **0.85** |       **1.04** |  -0.19 |  -0.19 |

Legend:

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot
- `Highest pinned` = highest stored repo score on that same pinned baseline
- `Δ prev` = latest pinned - previous week's pinned score
- `Δ peak` = latest pinned - highest pinned score, so more negative means the repo is below its own historical high

For exact pinned SHAs, the current default-pack medians, and the full per-metric breakdowns, see the saved snapshot and pinned benchmark report.

Full benchmark assets:

- manifest: [`benchmarks/sets/known-ai-vs-solid-oss.json`](benchmarks/sets/known-ai-vs-solid-oss.json)
- pinned snapshot: [`benchmarks/results/known-ai-vs-solid-oss.json`](benchmarks/results/known-ai-vs-solid-oss.json)
- pinned report: [`reports/known-ai-vs-solid-oss-benchmark.md`](reports/known-ai-vs-solid-oss-benchmark.md)
- rolling latest summary: [`benchmarks/history/known-ai-vs-solid-oss/latest.json`](benchmarks/history/known-ai-vs-solid-oss/latest.json)
- rolling history report: [`reports/known-ai-vs-solid-oss-history.md`](reports/known-ai-vs-solid-oss-history.md)

## Configuration

The analyzer reads `slop-scan.config.ts`, `slop-scan.config.js`, `slop-scan.config.mjs`, `slop-scan.config.cjs`, or `slop-scan.config.json` from the scan root. Root `.gitignore` entries are also respected.

```json
{
  "ignores": ["dist/**", "coverage/**", "**/*.generated.ts"],
  "plugins": {
    "acme": "slop-scan-plugin-acme"
  },
  "extends": ["plugin:acme/recommended"],
  "rules": {
    "structure.over-fragmentation": { "enabled": true, "weight": 1.2 },
    "comments.placeholder-comments": { "enabled": false },
    "acme/no-generated-wrapper": { "enabled": true, "options": { "threshold": 3 } }
  },
  "overrides": [
    {
      "files": ["src/rules/**"],
      "rules": {
        "structure.over-fragmentation": { "enabled": false }
      }
    }
  ]
}
```

Supported today:

- `ignores`
- `plugins.<namespace>` as either a package/path string or a plugin object in module configs
- `extends: ["plugin:<namespace>/<config>"]`
- `rules.<id>.enabled`
- `rules.<id>.weight`
- `rules.<id>.options`
- `overrides[].files`
- `overrides[].rules.<id>.enabled`
- `overrides[].rules.<id>.weight`
- `overrides[].rules.<id>.options`

### Plugins

`slop-scan` can load third-party rule plugins and plugin preset configs from JSON or module configs.

For plugin setup, naming rules, and authoring examples, see [docs/plugins.md](docs/plugins.md).
Simple plugin rules can now declare stable delta behavior with helpers like `delta.byPath()` / `delta.byLocations()`, and clustered rules can attach lightweight `deltaKeys` instead of building fingerprints manually.

See also:

- [`examples/local-plugin/contains-word-plugin.mjs`](examples/local-plugin/contains-word-plugin.mjs)
- [`examples/local-plugin/slop-scan.config.ts`](examples/local-plugin/slop-scan.config.ts)

This repo also commits a root [`slop-scan.config.json`](slop-scan.config.json) for self-scans and local development. It keeps the scan focused on the tool itself by excluding heavyweight benchmark checkouts and intentionally disables directory-structure rules under `src/rules/**`.

## Docs

- plugin guide: [`docs/plugins.md`](docs/plugins.md)
- built-in rule docs: browse [`src/rules/`](src/rules)
- benchmark guide: [`benchmarks/README.md`](benchmarks/README.md)
- pinned benchmark report: [`reports/known-ai-vs-solid-oss-benchmark.md`](reports/known-ai-vs-solid-oss-benchmark.md)
- rolling benchmark history: [`reports/known-ai-vs-solid-oss-history.md`](reports/known-ai-vs-solid-oss-history.md)
- exploratory note on non-JS/TS candidates: [`reports/exploratory-vite-astro-openclaw-beads.md`](reports/exploratory-vite-astro-openclaw-beads.md)
- contributing guide: [`CONTRIBUTING.md`](CONTRIBUTING.md)

## Contributing

Issues and pull requests are welcome.

For local development, validation, and benchmark reproduction, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Sponsor

Sponsored by [Modem](https://modem.dev?utm_source=github&utm_medium=oss&utm_campaign=slop-scan).

<a href="https://modem.dev?utm_source=github&utm_medium=oss&utm_campaign=slop-scan">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://modem.dev/images/logo/svg/modem-combined-white.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://modem.dev/images/logo/svg/modem-combined-black.svg">
    <img src="https://modem.dev/images/logo/svg/modem-combined-black.svg" alt="Modem" width="220">
  </picture>
</a>

## License

MIT
