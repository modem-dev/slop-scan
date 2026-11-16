# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-11-16
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

- `0.4.0` @ `1f545b7` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **3.67** | 1.20 | 0.33 |
| mature-oss | 9 | **1.00** | 0.19 | 0.07 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 35 | ▅▅▅▅▅▅▅▅ | `main@c8597bb` | **4.67** | **9.01** | **9.62** | 0.00 | +5.10 | 1.33 | 0.40 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 35 | ▅▅▅▅▅▅▅▅ | `main@27f0d1a` | **4.66** | **8.99** | **8.99** | 0.00 | +5.59 | 1.26 | 0.47 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 35 | ▇█▆▂▂▁▁▁ | `main@059db8a` | **3.92** | **7.56** | **7.82** | -0.01 | +4.62 | 1.28 | 0.33 |
| [garrytan/gstack](https://github.com/garrytan/gstack) | 35 | ▆█▆▅▅▂▁▁ | `main@a15a0de` | **3.87** | **7.47** | **11.92** | -0.05 | +1.10 | 1.15 | 0.36 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 33 | ▂█▆▃▁█▅▂ | `main@8852f3f` | **3.46** | **6.67** | **6.72** | -0.03 | +4.49 | 1.26 | 0.32 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 35 | ▁▁▁▃▃▃▃█ | `main@9edd66a` | **2.02** | **3.89** | **3.89** | +0.32 | +3.09 | 0.58 | 0.21 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 35 | ██▆▄▂▂▁▁ | `main@ead02a5` | **1.84** | **3.54** | **4.11** | -0.01 | +1.55 | 0.43 | 0.12 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 35 | ▅▅▅▅▅▅▅▅ | `main@f48efce` | **1.37** | **2.64** | **10.28** | 0.00 | +0.48 | 0.20 | 0.05 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 35 | n/a | `main@4152e02` | **n/a** | **n/a** | **6.56** | n/a | n/a | n/a | n/a |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [umami-software/umami](https://github.com/umami-software/umami) | 35 | ▁▁▁▁▁▁▁█ | `master@b18d514` | **1.56** | **3.01** | **3.01** | +0.75 | +1.96 | 0.33 | 0.09 |
| [withastro/astro](https://github.com/withastro/astro) | 35 | ▄▄█▇▆▄▃▁ | `main@9d475f6` | **1.25** | **2.40** | **2.49** | -0.03 | +0.86 | 0.19 | 0.07 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 35 | ▁▁███▇▇▇ | `master@03e8e66` | **1.21** | **2.34** | **2.68** | 0.00 | +1.93 | 0.22 | 0.11 |
| [vitejs/vite](https://github.com/vitejs/vite) | 35 | ▁▂▄▅▃▃▂█ | `main@9a8d1a9` | **1.15** | **2.21** | **2.21** | +0.12 | +0.69 | 0.17 | 0.05 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 35 | ▁▁▁▁▁▁██ | `main@9fed2eb` | **1.00** | **1.93** | **1.93** | 0.00 | +0.54 | 0.29 | 0.12 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 35 | ▂▁▃▃▃▅▆█ | `main@676e178` | **0.88** | **1.69** | **1.69** | +0.03 | +0.37 | 0.15 | 0.05 |
| [egoist/tsup](https://github.com/egoist/tsup) | 35 | ▁▁▁█████ | `main@198479b` | **0.79** | **1.52** | **1.52** | 0.00 | +0.60 | 0.15 | 0.06 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 35 | ▁▁▆█████ | `main@247faa0` | **0.68** | **1.31** | **1.31** | 0.00 | +0.42 | 0.12 | 0.03 |
| [vercel/hyper](https://github.com/vercel/hyper) | 35 | ▁▁▁▁▁▁██ | `canary@890a332` | **0.50** | **0.96** | **0.96** | 0.00 | +0.55 | 0.67 | 0.16 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [umami-software/umami](https://github.com/umami-software/umami) — +0.75 vs previous week (pinned blended)
- [modem-dev/hunk](https://github.com/modem-dev/hunk) — +0.32 vs previous week (pinned blended)
- [vitejs/vite](https://github.com/vitejs/vite) — +0.12 vs previous week (pinned blended)
- [payloadcms/payload](https://github.com/payloadcms/payload) — +0.03 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [garrytan/gstack](https://github.com/garrytan/gstack) — -0.05 vs previous week (pinned blended)
- [emdash-cms/emdash](https://github.com/emdash-cms/emdash) — -0.03 vs previous week (pinned blended)
- [withastro/astro](https://github.com/withastro/astro) — -0.03 vs previous week (pinned blended)
- [cloudflare/vinext](https://github.com/cloudflare/vinext) — -0.01 vs previous week (pinned blended)
- [openclaw/openclaw](https://github.com/openclaw/openclaw) — -0.01 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
