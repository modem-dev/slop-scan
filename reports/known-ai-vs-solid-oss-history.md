# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-04-26
History dir: `benchmarks/history/known-ai-vs-solid-oss/`
Pinned baseline snapshot: `benchmarks/results/known-ai-vs-solid-oss.json` (2026-04-26)
Pinned baseline analyzer version: 0.3.0

## Goal

Compare a cohort of known AI-generated JavaScript/TypeScript repos against well-regarded OSS repos, with the mature-OSS cohort pinned to the latest default-branch commit on or before 2025-01-01, using exact commit SHAs and normalized analyzer metrics. This rolling history tracks the same repos at the default-branch revision that existed at each recorded run time so the benchmark can show movement over time.

## Refresh

```bash
bun run benchmark:history
```

To backfill earlier weekly points honestly, rerun the history job with a past timestamp so each repo resolves the default-branch commit that existed at that time:

```bash
bun run benchmark:history --recorded-at 2026-04-06T12:00:00Z
```

## Latest analyzer revisions

- `0.3.0` @ `326869c` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **5.27** | 1.26 | 0.29 |
| mature-oss | 9 | **1.00** | 0.15 | 0.05 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | 5 | ▃▂▂▁█ | `main@ed1e4be` | **9.15** | **11.14** | **11.14** | +6.37 | +4.77 | 1.78 | 0.45 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 5 | ▁▁▁▁█ | `main@d95060f` | **8.42** | **10.24** | **10.24** | +8.08 | +8.08 | 1.28 | 0.29 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 5 | ▂▁▁▂█ | `main@76b46f9` | **7.83** | **9.53** | **9.53** | +5.61 | +5.62 | 1.33 | 0.38 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 5 | ▁▁▁▁█ | `main@ea50862` | **7.39** | **8.99** | **8.99** | +5.60 | +5.59 | 1.26 | 0.47 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 5 | ▁▁▁▁█ | `main@584d44d` | **5.27** | **6.41** | **6.41** | +3.39 | +3.35 | 1.32 | 0.31 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5 | ▁▁▁▁█ | `main@6b6dcaf` | **5.26** | **6.40** | **6.40** | +3.48 | +3.47 | 1.00 | 0.28 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 3 | ▁▁█ | `main@3dd1a1f` | **4.15** | **5.06** | **5.06** | +3.04 | +2.88 | 0.84 | 0.22 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 5 | ▁▁▁▁█ | `main@67a929b` | **3.06** | **3.73** | **3.73** | +1.80 | +1.74 | 0.40 | 0.12 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 5 | ▁▂▂▃█ | `main@a6aa1cb` | **2.95** | **3.59** | **3.59** | +2.08 | +2.79 | 0.48 | 0.17 |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [vitejs/vite](https://github.com/vitejs/vite) | 5 | ▁▁▁▁█ | `main@640202a` | **1.71** | **2.08** | **2.08** | +0.56 | +0.56 | 0.15 | 0.05 |
| [withastro/astro](https://github.com/withastro/astro) | 5 | ▂▁▁▁█ | `main@1058428` | **1.69** | **2.05** | **2.05** | +0.59 | +0.51 | 0.17 | 0.06 |
| [egoist/tsup](https://github.com/egoist/tsup) | 5 | ▁▁▁▁█ | `main@b906f86` | **1.25** | **1.52** | **1.52** | +0.60 | +0.60 | 0.15 | 0.06 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 5 | ██▆▆▁ | `main@95d3f33` | **1.12** | **1.36** | **1.38** | -0.02 | -0.03 | 0.19 | 0.08 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 5 | ▇▇▇█▁ | `main@0ceba02` | **1.00** | **1.22** | **1.34** | -0.13 | -0.10 | 0.10 | 0.03 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 5 | ▁▁▁▁█ | `main@f3a2e84` | **0.82** | **0.99** | **0.99** | +0.11 | +0.11 | 0.09 | 0.02 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 5 | ▁▁▁▁█ | `master@b36c237` | **0.78** | **0.95** | **0.95** | +0.53 | +0.53 | 0.08 | 0.04 |
| [vercel/hyper](https://github.com/vercel/hyper) | 5 | ▁▁▁▁█ | `canary@2a7bb18` | **0.74** | **0.90** | **0.90** | +0.49 | +0.49 | 0.63 | 0.15 |
| [umami-software/umami](https://github.com/umami-software/umami) | 5 | ████▁ | `master@c78ff36` | **0.70** | **0.85** | **1.04** | -0.19 | -0.19 | 0.07 | 0.02 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [FullAgent/fulling](https://github.com/FullAgent/fulling) — +8.08 vs previous week (pinned blended)
- [garrytan/gstack](https://github.com/garrytan/gstack) — +6.37 vs previous week (pinned blended)
- [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) — +5.61 vs previous week (pinned blended)
- [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) — +5.60 vs previous week (pinned blended)
- [openclaw/openclaw](https://github.com/openclaw/openclaw) — +3.48 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [umami-software/umami](https://github.com/umami-software/umami) — -0.19 vs previous week (pinned blended)
- [payloadcms/payload](https://github.com/payloadcms/payload) — -0.13 vs previous week (pinned blended)
- [pmndrs/zustand](https://github.com/pmndrs/zustand) — -0.02 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
