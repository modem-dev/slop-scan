# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-11-23
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

- `0.4.0` @ `93d93a5` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **3.66** | 1.19 | 0.33 |
| mature-oss | 9 | **1.00** | 0.19 | 0.07 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 36 | ▅▅▅▅▅▅▅▅ | `main@c8597bb` | **4.67** | **9.01** | **9.62** | 0.00 | +5.10 | 1.33 | 0.40 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 36 | ▅▅▅▅▅▅▅▅ | `main@27f0d1a` | **4.66** | **8.99** | **8.99** | 0.00 | +5.59 | 1.26 | 0.47 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 36 | █▆▃▃▂▂▂▁ | `main@314ae9a` | **3.90** | **7.52** | **7.82** | -0.03 | +4.59 | 1.27 | 0.33 |
| [garrytan/gstack](https://github.com/garrytan/gstack) | 36 | █▆▅▅▂▂▂▁ | `main@af6deb9` | **3.83** | **7.38** | **11.92** | -0.09 | +1.00 | 1.13 | 0.35 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 34 | █▆▃▁█▅▂▇ | `main@71ebb5c` | **3.48** | **6.71** | **6.72** | +0.05 | +4.54 | 1.28 | 0.33 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 36 | ▁▁▃▃▃▃██ | `main@f5de530` | **2.00** | **3.86** | **3.89** | -0.02 | +3.06 | 0.58 | 0.20 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 36 | █▆▅▃▃▂▂▁ | `main@0916a6e` | **1.81** | **3.48** | **4.11** | -0.05 | +1.50 | 0.42 | 0.12 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 36 | ▅▅▅▅▅▅▅▅ | `main@f48efce` | **1.37** | **2.64** | **10.28** | 0.00 | +0.48 | 0.20 | 0.05 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 36 | n/a | `main@53f70b3` | **n/a** | **n/a** | **6.56** | n/a | n/a | n/a | n/a |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [umami-software/umami](https://github.com/umami-software/umami) | 36 | ▁▁▁▁▁▁██ | `master@aad2c4c` | **1.56** | **3.01** | **3.01** | 0.00 | +1.96 | 0.33 | 0.09 |
| [withastro/astro](https://github.com/withastro/astro) | 36 | ▄█▇▇▄▄▂▁ | `main@ebcaf69` | **1.24** | **2.39** | **2.49** | -0.01 | +0.84 | 0.19 | 0.07 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 36 | ▁███▇▇▇▇ | `master@03e8e66` | **1.21** | **2.34** | **2.68** | 0.00 | +1.93 | 0.22 | 0.11 |
| [vitejs/vite](https://github.com/vitejs/vite) | 36 | ▁▂▃▂▁▁▆█ | `main@3567471` | **1.18** | **2.27** | **2.27** | +0.06 | +0.75 | 0.17 | 0.05 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 36 | ▁▁▁▁▁███ | `main@5d66d53` | **1.00** | **1.93** | **1.93** | 0.00 | +0.54 | 0.29 | 0.12 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 36 | ▁▃▃▃▄▅▆█ | `main@ce66418` | **0.90** | **1.74** | **1.74** | +0.05 | +0.42 | 0.16 | 0.05 |
| [egoist/tsup](https://github.com/egoist/tsup) | 36 | ▁▁██████ | `main@198479b` | **0.79** | **1.52** | **1.52** | 0.00 | +0.60 | 0.15 | 0.06 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 36 | ▁▆██████ | `main@6f856d5` | **0.68** | **1.31** | **1.31** | 0.00 | +0.42 | 0.12 | 0.03 |
| [vercel/hyper](https://github.com/vercel/hyper) | 36 | ▁▁▁▁▁███ | `canary@890a332` | **0.50** | **0.96** | **0.96** | 0.00 | +0.55 | 0.67 | 0.16 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [vitejs/vite](https://github.com/vitejs/vite) — +0.06 vs previous week (pinned blended)
- [payloadcms/payload](https://github.com/payloadcms/payload) — +0.05 vs previous week (pinned blended)
- [emdash-cms/emdash](https://github.com/emdash-cms/emdash) — +0.05 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [garrytan/gstack](https://github.com/garrytan/gstack) — -0.09 vs previous week (pinned blended)
- [cloudflare/vinext](https://github.com/cloudflare/vinext) — -0.05 vs previous week (pinned blended)
- [openclaw/openclaw](https://github.com/openclaw/openclaw) — -0.03 vs previous week (pinned blended)
- [modem-dev/hunk](https://github.com/modem-dev/hunk) — -0.02 vs previous week (pinned blended)
- [withastro/astro](https://github.com/withastro/astro) — -0.01 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
