# Pinned benchmark: Known AI repos vs older solid OSS repos

Date: 2026-04-26
Analyzer version: 0.3.0
Config mode: default

## Goal

Compare a cohort of known AI-generated JavaScript/TypeScript repos against well-regarded OSS repos, with the mature-OSS cohort pinned to the latest default-branch commit on or before 2025-01-01, using exact commit SHAs and normalized analyzer metrics.

## Reproduction

```bash
bun run benchmark:fetch
bun run benchmark:scan
bun run benchmark:report
```

Manifest: `benchmarks/sets/known-ai-vs-solid-oss.json`
Snapshot: `benchmarks/results/known-ai-vs-solid-oss.json`
Report: `reports/known-ai-vs-solid-oss-benchmark.md`

The pinned refs below are the exact commits used for the saved snapshot.

Blended score = geometric mean of the six normalized-metric ratios versus the mature OSS cohort medians, then rescaled so the mature OSS cohort median is 1.00. Higher means a repo is consistently noisier across the benchmark dimensions.

## AI cohort

| Repo | Ref | Age | Stars | Blended | Files | Logical LOC | Functions | Score/file | Score/KLOC | Score/function | Findings/file | Findings/KLOC | Findings/function |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | `6cc094c` | 0.1y | 65613 | **13.40** | 176 | 18958 | 832 | 2.61 | 24.27 | 0.55 | 0.56 | 5.22 | 0.12 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | `d95060f` | 0.5y | 2413 | **10.24** | 219 | 12154 | 574 | 1.28 | 22.98 | 0.49 | 0.29 | 5.27 | 0.11 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | `ea50862` | 0.8y | 17 | **8.99** | 32 | 2986 | 147 | 1.26 | 13.50 | 0.27 | 0.47 | 5.02 | 0.10 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | `4de00d6` | 0.2y | 120 | **8.77** | 94 | 8474 | 220 | 1.06 | 11.77 | 0.45 | 0.33 | 3.66 | 0.14 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | `44cf747` | 0.4y | 350232 | **6.91** | 10465 | 1031409 | 40348 | 1.07 | 10.90 | 0.28 | 0.30 | 3.04 | 0.08 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | `857f537` | 0.2y | 1715 | **6.40** | 139 | 22270 | 491 | 1.22 | 7.62 | 0.35 | 0.29 | 1.84 | 0.08 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | `dbaf8c6` | 0.1y | 7842 | **5.35** | 1072 | 120432 | 3513 | 0.85 | 7.60 | 0.26 | 0.22 | 1.97 | 0.07 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | `28980b0` | 0.2y | 7709 | **3.76** | 1129 | 59523 | 2917 | 0.40 | 7.56 | 0.15 | 0.12 | 2.28 | 0.05 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | `b37663f` | 0.1y | 352 | **3.21** | 166 | 13564 | 752 | 0.45 | 5.56 | 0.10 | 0.15 | 1.84 | 0.03 |

## Mature OSS cohort

| Repo | Ref | Age | Stars | Blended | Files | Logical LOC | Functions | Score/file | Score/KLOC | Score/function | Findings/file | Findings/KLOC | Findings/function |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| [withastro/astro](https://github.com/withastro/astro) | `f706899` | 5.1y | 58212 | **2.07** | 1949 | 80948 | 3018 | 0.16 | 3.89 | 0.10 | 0.05 | 1.32 | 0.04 |
| [vitejs/vite](https://github.com/vitejs/vite) | `a492253` | 6.0y | 79637 | **1.76** | 1229 | 37251 | 1904 | 0.12 | 4.02 | 0.08 | 0.04 | 1.40 | 0.03 |
| [egoist/tsup](https://github.com/egoist/tsup) | `cd03e1e` | 6.1y | 11198 | **1.57** | 46 | 2668 | 140 | 0.15 | 2.62 | 0.05 | 0.07 | 1.12 | 0.02 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | `2e6d881` | 7.0y | 57758 | **1.45** | 48 | 7096 | 161 | 0.20 | 1.37 | 0.06 | 0.08 | 0.56 | 0.02 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | `f3f36d8` | 5.3y | 41856 | **1.00** | 4234 | 251992 | 3544 | 0.07 | 1.23 | 0.09 | 0.02 | 0.40 | 0.03 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | `99d1741` | 10.4y | 7481 | **0.99** | 580 | 20374 | 1007 | 0.09 | 2.50 | 0.05 | 0.02 | 0.64 | 0.01 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | `b36c237` | 13.4y | 5843 | **0.95** | 24 | 2114 | 42 | 0.08 | 0.90 | 0.05 | 0.04 | 0.47 | 0.02 |
| [vercel/hyper](https://github.com/vercel/hyper) | `2a7bb18` | 9.8y | 44687 | **0.90** | 113 | 65075 | 5354 | 0.63 | 1.10 | 0.01 | 0.15 | 0.26 | 0.00 |
| [umami-software/umami](https://github.com/umami-software/umami) | `227b255` | 5.8y | 36012 | **0.76** | 512 | 20508 | 911 | 0.06 | 1.48 | 0.03 | 0.02 | 0.54 | 0.01 |

## Cohort medians

| Metric | AI median | Solid median | Ratio |
|---|---:|---:|---:|
| Blended score | **6.91** | **1.00** | **6.91x** |
| Score / file | **1.07** | **0.12** | **8.82x** |
| Score / KLOC | **10.90** | **1.48** | **7.38x** |
| Score / function | **0.28** | **0.05** | **5.51x** |
| Findings / file | **0.29** | **0.04** | **6.97x** |
| Findings / KLOC | **3.04** | **0.56** | **5.39x** |
| Findings / function | **0.08** | **0.02** | **3.51x** |

## Spot-check pairings

| AI repo | Solid repo | Score/file ratio | Score/KLOC ratio | Score/function ratio | Findings/file ratio | Findings/KLOC ratio | Findings/function ratio |
|---|---|---:|---:|---:|---:|---:|---:|
| `devworkbench` | `hyper` | 1.99x | 12.27x | 20.50x | 3.12x | 19.23x | 32.14x |
| `openusage` | `umami` | 20.63x | 5.16x | 10.39x | 13.73x | 3.43x | 6.92x |
| `vinext` | `vite` | 3.27x | 1.88x | 1.96x | 2.85x | 1.64x | 1.71x |

## Top rule families by cohort

### AI cohort
- `tests.duplicate-mock-setup` — 997 (26.3%)
- `structure.pass-through-wrappers` — 697 (18.4%)
- `defensive.empty-catch` — 463 (12.2%)
- `defensive.error-obscuring` — 456 (12.1%)
- `api.generic-status-envelopes` — 424 (11.2%)
- `defensive.promise-default-fallbacks` — 420 (11.1%)

### Mature OSS cohort
- `defensive.empty-catch` — 93 (30.1%)
- `structure.pass-through-wrappers` — 73 (23.6%)
- `defensive.error-obscuring` — 67 (21.7%)
- `defensive.error-swallowing` — 51 (16.5%)
- `defensive.promise-default-fallbacks` — 16 (5.2%)
- `tests.duplicate-mock-setup` — 6 (1.9%)

## Notes

- This benchmark is intentionally pinned to exact commit SHAs so future reruns can reproduce the same cohort.
- Why before 2025-01-01? The intent is to use a mature-OSS cutoff from before AI coding had materially changed mainstream repository shape and review norms.
- AI provenance in the set may come from README disclosures or user-provided provenance recorded in the manifest.
- The benchmark scanner uses the analyzer's default config for every repo to keep results comparable.
- The analyzer still only scans JS/TS-family files, so non-JS/TS portions of mixed-language repos are out of scope.
