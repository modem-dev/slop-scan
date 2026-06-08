# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-06-08
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

- `0.4.0` @ `f1b60b6` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **5.62** | 1.26 | 0.32 |
| mature-oss | 9 | **1.00** | 0.15 | 0.05 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | 12 | ▁▂▇█▃▃▁▁ | `main@45cc95d` | **8.93** | **11.09** | **11.92** | -0.01 | +4.72 | 1.65 | 0.44 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 12 | ▁▁▁▁▁███ | `main@a524c5e` | **8.28** | **10.28** | **10.28** | 0.00 | +8.12 | 1.28 | 0.29 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 12 | ▇▅█▇▆▁▂▂ | `main@c331673` | **7.26** | **9.01** | **9.62** | 0.00 | +5.10 | 1.31 | 0.39 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 12 | ▅▅▅▅▅▅▅▅ | `main@ea50862` | **7.24** | **8.99** | **8.99** | 0.00 | +5.59 | 1.26 | 0.47 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12 | ▁▁▃▄▅▅██ | `main@a04de1a` | **5.62** | **6.97** | **6.97** | +0.00 | +4.04 | 1.26 | 0.36 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 12 | ▄▄▁▃▃██▃ | `main@009b409` | **5.16** | **6.40** | **6.52** | -0.11 | +3.34 | 1.38 | 0.32 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 10 | ▄▄▂▁▂▆██ | `main@1986dd4` | **4.30** | **5.34** | **5.34** | +0.02 | +3.16 | 0.90 | 0.24 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 12 | ▁▃▁▂▂▅▆█ | `main@6005541` | **3.28** | **4.07** | **4.07** | +0.08 | +2.09 | 0.52 | 0.15 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 12 | ███▄▁▇▃▇ | `main@59cc857` | **2.84** | **3.53** | **3.59** | +0.19 | +2.72 | 0.50 | 0.17 |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [withastro/astro](https://github.com/withastro/astro) | 12 | ▁▁▄▆██▇▇ | `main@0e8c7e8` | **1.74** | **2.16** | **2.17** | +0.00 | +0.62 | 0.18 | 0.06 |
| [vitejs/vite](https://github.com/vitejs/vite) | 12 | ▂▂▂▁▃▂▅█ | `main@01337ad` | **1.70** | **2.11** | **2.11** | +0.01 | +0.59 | 0.16 | 0.05 |
| [egoist/tsup](https://github.com/egoist/tsup) | 12 | ▅▅▅▅▅▅▅▅ | `main@b6bcae8` | **1.22** | **1.52** | **1.52** | 0.00 | +0.60 | 0.15 | 0.06 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 12 | ███▂▂▂▁▁ | `main@566b5bf` | **1.09** | **1.35** | **1.38** | 0.00 | -0.03 | 0.19 | 0.08 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 12 | ▁▁▂▇██▇▆ | `main@7b3a134` | **1.00** | **1.24** | **1.34** | 0.00 | -0.08 | 0.10 | 0.03 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 12 | ▅▅▅▅▅▅▅▅ | `main@f3a2e84` | **0.80** | **0.99** | **0.99** | 0.00 | +0.11 | 0.09 | 0.02 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 12 | ▅▅▅▅▅▅▅▅ | `master@b36c237` | **0.76** | **0.95** | **0.95** | 0.00 | +0.53 | 0.08 | 0.04 |
| [vercel/hyper](https://github.com/vercel/hyper) | 12 | █████▁▁▁ | `canary@da0c401` | **0.73** | **0.90** | **0.90** | 0.00 | +0.49 | 0.63 | 0.15 |
| [umami-software/umami](https://github.com/umami-software/umami) | 12 | ████▁▁▁▁ | `master@c0ea3ae` | **0.68** | **0.85** | **1.04** | 0.00 | -0.20 | 0.07 | 0.02 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [modem-dev/hunk](https://github.com/modem-dev/hunk) — +0.19 vs previous week (pinned blended)
- [cloudflare/vinext](https://github.com/cloudflare/vinext) — +0.08 vs previous week (pinned blended)
- [emdash-cms/emdash](https://github.com/emdash-cms/emdash) — +0.02 vs previous week (pinned blended)
- [vitejs/vite](https://github.com/vitejs/vite) — +0.01 vs previous week (pinned blended)
- [openclaw/openclaw](https://github.com/openclaw/openclaw) — +0.00 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [robinebers/openusage](https://github.com/robinebers/openusage) — -0.11 vs previous week (pinned blended)
- [garrytan/gstack](https://github.com/garrytan/gstack) — -0.01 vs previous week (pinned blended)
- [payloadcms/payload](https://github.com/payloadcms/payload) — 0.00 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
