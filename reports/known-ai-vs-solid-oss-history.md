# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-05-25
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

- `0.4.0` @ `f320b71` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **5.42** | 1.26 | 0.32 |
| mature-oss | 9 | **1.00** | 0.15 | 0.05 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | 10 | ▂▁▇▇██▇▇ | `main@920a13a` | **9.06** | **11.31** | **11.92** | -0.04 | +4.94 | 1.75 | 0.45 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 10 | ▁▁██████ | `main@a524c5e` | **8.23** | **10.28** | **10.28** | +0.04 | +8.12 | 1.28 | 0.29 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 10 | ▁▁██████ | `main@ea50862` | **7.20** | **8.99** | **8.99** | 0.00 | +5.59 | 1.26 | 0.47 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 10 | ▁▂█████▇ | `main@7a349fd` | **7.10** | **8.86** | **9.62** | -0.57 | +4.96 | 1.29 | 0.37 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 10 | ▁▁▇▇████ | `main@8fe4f34` | **5.42** | **6.76** | **6.76** | +0.05 | +3.83 | 1.17 | 0.33 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 10 | ▁▁██████ | `main@810b122` | **5.22** | **6.52** | **6.52** | +0.13 | +3.46 | 1.37 | 0.32 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 8 | ▁▁██▇▇▇█ | `main@283bcf0` | **4.17** | **5.20** | **5.20** | +0.24 | +3.03 | 0.87 | 0.23 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 10 | ▁▁▇█▇▇▇█ | `main@601a394` | **3.13** | **3.91** | **3.91** | +0.14 | +1.93 | 0.49 | 0.14 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 10 | ▁▂███▇▇█ | `main@e04133e` | **2.81** | **3.51** | **3.59** | +0.31 | +2.70 | 0.50 | 0.17 |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [withastro/astro](https://github.com/withastro/astro) | 10 | ▁▁▇▇▇███ | `main@221bb4b` | **1.74** | **2.17** | **2.17** | +0.01 | +0.63 | 0.18 | 0.06 |
| [vitejs/vite](https://github.com/vitejs/vite) | 10 | ▁▁██████ | `main@47c4213` | **1.67** | **2.08** | **2.09** | -0.01 | +0.56 | 0.15 | 0.05 |
| [egoist/tsup](https://github.com/egoist/tsup) | 10 | ▁▁██████ | `main@b6bcae8` | **1.22** | **1.52** | **1.52** | 0.00 | +0.60 | 0.15 | 0.06 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 10 | ██▃▃▃▁▁▁ | `main@d690ec2` | **1.08** | **1.35** | **1.38** | 0.00 | -0.03 | 0.19 | 0.08 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 10 | ▇█▁▁▁▂▃▃ | `main@0dfd31e` | **1.00** | **1.25** | **1.34** | +0.00 | -0.07 | 0.10 | 0.03 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 10 | ▁▁██████ | `main@f3a2e84` | **0.79** | **0.99** | **0.99** | 0.00 | +0.11 | 0.09 | 0.02 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 10 | ▁▁██████ | `master@b36c237` | **0.76** | **0.95** | **0.95** | 0.00 | +0.53 | 0.08 | 0.04 |
| [vercel/hyper](https://github.com/vercel/hyper) | 10 | ▁▁██████ | `canary@da0c401` | **0.72** | **0.90** | **0.90** | 0.00 | +0.49 | 0.63 | 0.15 |
| [umami-software/umami](https://github.com/umami-software/umami) | 10 | ██▁▁▁▁▁▁ | `master@c0ea3ae` | **0.68** | **0.85** | **1.04** | 0.00 | -0.20 | 0.07 | 0.02 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [modem-dev/hunk](https://github.com/modem-dev/hunk) — +0.31 vs previous week (pinned blended)
- [emdash-cms/emdash](https://github.com/emdash-cms/emdash) — +0.24 vs previous week (pinned blended)
- [cloudflare/vinext](https://github.com/cloudflare/vinext) — +0.14 vs previous week (pinned blended)
- [robinebers/openusage](https://github.com/robinebers/openusage) — +0.13 vs previous week (pinned blended)
- [openclaw/openclaw](https://github.com/openclaw/openclaw) — +0.05 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) — -0.57 vs previous week (pinned blended)
- [garrytan/gstack](https://github.com/garrytan/gstack) — -0.04 vs previous week (pinned blended)
- [vitejs/vite](https://github.com/vitejs/vite) — -0.01 vs previous week (pinned blended)
- [vercel/hyper](https://github.com/vercel/hyper) — 0.00 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
