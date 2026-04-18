# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-04-18
History dir: `benchmarks/history/known-ai-vs-solid-oss/`
Pinned baseline snapshot: `benchmarks/results/known-ai-vs-solid-oss.json` (2026-04-17)
Pinned baseline analyzer version: 0.3.0

## Goal

Compare a cohort of known AI-generated JavaScript/TypeScript repos against well-regarded OSS repos, with the mature-OSS cohort pinned to the latest default-branch commit on or before 2025-01-01, using exact commit SHAs and normalized analyzer metrics. This rolling history tracks the same repos at their latest default-branch revisions so the benchmark can show movement over time.

## Refresh

```bash
bun run benchmark:history
```

## Latest analyzer revisions

- `0.3.0` @ `106fb07` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **2.81** | 1.00 | 0.31 |
| mature-oss | 9 | **1.00** | 0.25 | 0.08 |

## AI cohort latest standings

| Repo | Points | Latest ref | Current blended | Pinned blended | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---:|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | 1 | `main@e3c961d` | **4.41** | **4.58** | n/a | 0.00 | 1.86 | 0.47 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 1 | `main@e320288` | **3.52** | **3.65** | n/a | 0.00 | 1.17 | 0.33 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 1 | `main@ea50862` | **3.26** | **3.39** | n/a | 0.00 | 1.00 | 0.44 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 1 | `main@584d44d` | **2.89** | **3.00** | n/a | 0.00 | 1.37 | 0.35 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 1 | `main@7474b52` | **2.81** | **2.92** | n/a | 0.00 | 1.00 | 0.31 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 1 | `main@d95060f` | **2.08** | **2.16** | n/a | 0.00 | 0.53 | 0.16 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 1 | `main@4ffa141` | **1.91** | **1.99** | n/a | 0.00 | 0.71 | 0.21 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 1 | `main@cc966ad` | **1.84** | **1.92** | n/a | 0.00 | 0.47 | 0.14 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 1 | `main@3214793` | **1.44** | **1.49** | n/a | 0.00 | 0.46 | 0.17 |

## Mature OSS cohort latest standings

| Repo | Points | Latest ref | Current blended | Pinned blended | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---:|---:|---:|---:|---:|---:|
| [vitejs/vite](https://github.com/vitejs/vite) | 1 | `main@e6e9fc9` | **1.47** | **1.52** | n/a | 0.00 | 0.27 | 0.08 |
| [withastro/astro](https://github.com/withastro/astro) | 1 | `main@63c5c85` | **1.41** | **1.46** | n/a | 0.00 | 0.27 | 0.10 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 1 | `main@3201328` | **1.33** | **1.38** | n/a | 0.00 | 0.47 | 0.18 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 1 | `main@8fe5f04` | **1.31** | **1.37** | n/a | 0.00 | 0.25 | 0.08 |
| [umami-software/umami](https://github.com/umami-software/umami) | 1 | `master@c78ff36` | **1.00** | **1.04** | n/a | 0.00 | 0.18 | 0.07 |
| [egoist/tsup](https://github.com/egoist/tsup) | 1 | `main@b906f86` | **0.89** | **0.92** | n/a | 0.00 | 0.21 | 0.08 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 1 | `main@f3a2e84` | **0.85** | **0.89** | n/a | 0.00 | 0.17 | 0.05 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 1 | `master@b36c237` | **0.40** | **0.41** | n/a | 0.00 | 0.08 | 0.04 |
| [vercel/hyper](https://github.com/vercel/hyper) | 1 | `canary@2a7bb18` | **0.40** | **0.41** | n/a | 0.00 | 0.65 | 0.16 |

## Biggest increases vs previous week

- n/a yet (need at least two weekly points with movement)

## Biggest decreases vs previous week

- n/a yet (need at least two weekly points with movement)

## Notes

- `Current blended` is relative to the latest mature-OSS cohort medians from the same run, so it is best for week-by-week ranking.
- `Pinned blended` is relative to the frozen pinned benchmark baseline, so it is the cleaner long-term trend line.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
