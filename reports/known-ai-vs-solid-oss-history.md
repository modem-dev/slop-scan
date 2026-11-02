# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-11-02
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

- `0.4.0` @ `921b70a` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **4.39** | 1.21 | 0.33 |
| mature-oss | 9 | **1.00** | 0.19 | 0.07 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 33 | ▅▅▅▅▅▅▅▅ | `main@c8597bb` | **5.54** | **9.01** | **9.62** | 0.00 | +5.10 | 1.33 | 0.40 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 33 | ▅▅▅▅▅▅▅▅ | `main@27f0d1a` | **5.53** | **8.99** | **8.99** | 0.00 | +5.59 | 1.26 | 0.47 |
| [garrytan/gstack](https://github.com/garrytan/gstack) | 33 | █▄▃▄▃▂▂▁ | `main@f865cd9` | **4.69** | **7.63** | **11.92** | -0.43 | +1.26 | 1.17 | 0.36 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 33 | ▁▆▇█▆▄▄▃ | `main@8ccc414` | **4.66** | **7.57** | **7.82** | -0.04 | +4.64 | 1.29 | 0.33 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 31 | ▁▅▆█▇▇▆█ | `main@f2070d9` | **4.13** | **6.72** | **6.72** | +0.06 | +4.55 | 1.26 | 0.32 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 33 | ▄▄▂▂▁▇██ | `main@503efd5` | **2.21** | **3.59** | **3.60** | -0.01 | +2.79 | 0.55 | 0.19 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 33 | █▇▅▅▄▃▁▁ | `main@f2050c5` | **2.20** | **3.58** | **4.11** | +0.02 | +1.60 | 0.43 | 0.12 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 33 | ▅▅▅▅▅▅▅▅ | `main@f48efce` | **1.63** | **2.64** | **10.28** | 0.00 | +0.48 | 0.20 | 0.05 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 33 | n/a | `main@1acc905` | **n/a** | **n/a** | **6.56** | n/a | n/a | n/a | n/a |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [withastro/astro](https://github.com/withastro/astro) | 33 | ▁▃▃▂█▆▆▂ | `main@3ef9fea` | **1.50** | **2.44** | **2.49** | -0.03 | +0.89 | 0.20 | 0.07 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 33 | ▁▁▁▁███▇ | `master@03e8e66` | **1.44** | **2.34** | **2.68** | -0.34 | +1.93 | 0.22 | 0.11 |
| [umami-software/umami](https://github.com/umami-software/umami) | 33 | █▁▁▁▁▁▁▁ | `master@559e3c6` | **1.39** | **2.26** | **2.35** | 0.00 | +1.21 | 0.25 | 0.07 |
| [vitejs/vite](https://github.com/vitejs/vite) | 33 | ▂▂▁▃▇█▅▄ | `main@b3cb057` | **1.29** | **2.10** | **2.14** | -0.01 | +0.58 | 0.16 | 0.05 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 33 | ▁▃▆▅▇▇▇█ | `main@ec35164` | **1.00** | **1.63** | **1.63** | +0.02 | +0.31 | 0.15 | 0.04 |
| [egoist/tsup](https://github.com/egoist/tsup) | 33 | ▁▁▁▁▁███ | `main@198479b` | **0.93** | **1.52** | **1.52** | 0.00 | +0.60 | 0.15 | 0.06 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 33 | ██████▁▁ | `main@382d29c` | **0.82** | **1.33** | **1.38** | 0.00 | -0.06 | 0.19 | 0.08 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 33 | ▁▁▁▁▆███ | `main@247faa0` | **0.80** | **1.31** | **1.31** | 0.00 | +0.42 | 0.12 | 0.03 |
| [vercel/hyper](https://github.com/vercel/hyper) | 33 | ▅▅▅▅▅▅▅▅ | `canary@30ec0a2` | **0.55** | **0.90** | **0.90** | 0.00 | +0.49 | 0.63 | 0.15 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [emdash-cms/emdash](https://github.com/emdash-cms/emdash) — +0.06 vs previous week (pinned blended)
- [payloadcms/payload](https://github.com/payloadcms/payload) — +0.02 vs previous week (pinned blended)
- [cloudflare/vinext](https://github.com/cloudflare/vinext) — +0.02 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [garrytan/gstack](https://github.com/garrytan/gstack) — -0.43 vs previous week (pinned blended)
- [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) — -0.34 vs previous week (pinned blended)
- [openclaw/openclaw](https://github.com/openclaw/openclaw) — -0.04 vs previous week (pinned blended)
- [withastro/astro](https://github.com/withastro/astro) — -0.03 vs previous week (pinned blended)
- [vitejs/vite](https://github.com/vitejs/vite) — -0.01 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
