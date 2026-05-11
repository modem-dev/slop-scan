# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-05-11
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

- `0.4.0` @ `4a9b91f` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **5.32** | 1.26 | 0.31 |
| mature-oss | 9 | **1.00** | 0.15 | 0.05 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | 8 | ▃▂▂▁▇▇██ | `main@49cc4ff` | **9.60** | **11.92** | **11.92** | +0.06 | +5.55 | 1.89 | 0.48 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 8 | ▁▁▁▁████ | `main@d95060f` | **8.25** | **10.24** | **10.24** | 0.00 | +8.08 | 1.28 | 0.29 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 8 | ▂▁▁▂████ | `main@24387c7` | **7.66** | **9.52** | **9.62** | -0.10 | +5.61 | 1.38 | 0.39 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 8 | ▁▁▁▁████ | `main@ea50862` | **7.24** | **8.99** | **8.99** | 0.00 | +5.59 | 1.26 | 0.47 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8 | ▁▁▁▁████ | `main@a012bfb` | **5.32** | **6.61** | **6.61** | +0.06 | +3.68 | 1.11 | 0.31 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 8 | ▁▁▁▁████ | `main@1bf1896` | **5.14** | **6.39** | **6.41** | +0.04 | +3.33 | 1.32 | 0.31 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 6 | ▁▁████ | `main@a68caa8` | **3.94** | **4.89** | **5.08** | -0.07 | +2.72 | 0.82 | 0.22 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 8 | ▁▁▁▁████ | `main@77c4d9c` | **3.04** | **3.77** | **3.81** | +0.05 | +1.78 | 0.45 | 0.13 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 8 | ▁▂▂▃███▇ | `main@493619e` | **2.72** | **3.37** | **3.59** | -0.22 | +2.57 | 0.46 | 0.17 |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [withastro/astro](https://github.com/withastro/astro) | 8 | ▂▁▁▁▇▇██ | `main@07529ec` | **1.72** | **2.14** | **2.14** | +0.04 | +0.59 | 0.17 | 0.06 |
| [vitejs/vite](https://github.com/vitejs/vite) | 8 | ▁▁▁▁████ | `main@7190cca` | **1.67** | **2.08** | **2.08** | 0.00 | +0.56 | 0.15 | 0.05 |
| [egoist/tsup](https://github.com/egoist/tsup) | 8 | ▁▁▁▁████ | `main@b6bcae8` | **1.22** | **1.52** | **1.52** | 0.00 | +0.60 | 0.15 | 0.06 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 8 | ██▇▇▂▂▂▁ | `main@f631347` | **1.09** | **1.35** | **1.38** | -0.01 | -0.03 | 0.19 | 0.08 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 8 | ▇▇▇█▁▁▁▂ | `main@419a8e3` | **1.00** | **1.24** | **1.34** | +0.02 | -0.08 | 0.10 | 0.03 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 8 | ▁▁▁▁████ | `main@f3a2e84` | **0.80** | **0.99** | **0.99** | 0.00 | +0.11 | 0.09 | 0.02 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 8 | ▁▁▁▁████ | `master@b36c237` | **0.76** | **0.95** | **0.95** | 0.00 | +0.53 | 0.08 | 0.04 |
| [vercel/hyper](https://github.com/vercel/hyper) | 8 | ▁▁▁▁████ | `canary@2a7bb18` | **0.73** | **0.90** | **0.90** | 0.00 | +0.49 | 0.63 | 0.15 |
| [umami-software/umami](https://github.com/umami-software/umami) | 8 | ████▁▁▁▁ | `master@a9508e7` | **0.68** | **0.85** | **1.04** | 0.00 | -0.19 | 0.07 | 0.02 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [openclaw/openclaw](https://github.com/openclaw/openclaw) — +0.06 vs previous week (pinned blended)
- [garrytan/gstack](https://github.com/garrytan/gstack) — +0.06 vs previous week (pinned blended)
- [cloudflare/vinext](https://github.com/cloudflare/vinext) — +0.05 vs previous week (pinned blended)
- [withastro/astro](https://github.com/withastro/astro) — +0.04 vs previous week (pinned blended)
- [robinebers/openusage](https://github.com/robinebers/openusage) — +0.04 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [modem-dev/hunk](https://github.com/modem-dev/hunk) — -0.22 vs previous week (pinned blended)
- [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) — -0.10 vs previous week (pinned blended)
- [emdash-cms/emdash](https://github.com/emdash-cms/emdash) — -0.07 vs previous week (pinned blended)
- [pmndrs/zustand](https://github.com/pmndrs/zustand) — -0.01 vs previous week (pinned blended)
- [vitejs/vite](https://github.com/vitejs/vite) — 0.00 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
