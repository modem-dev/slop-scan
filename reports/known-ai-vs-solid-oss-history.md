# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-06-22
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

- `0.4.0` @ `60b6a36` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **5.69** | 1.28 | 0.33 |
| mature-oss | 9 | **1.00** | 0.15 | 0.05 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | 14 | ▇█▃▃▁▁▂▁ | `main@9fd03fa` | **8.93** | **11.08** | **11.92** | -0.06 | +4.71 | 1.65 | 0.44 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 14 | ▁▁▁█████ | `main@a524c5e` | **8.29** | **10.28** | **10.28** | 0.00 | +8.12 | 1.28 | 0.29 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 14 | █▇▆▁▂▂▂▂ | `main@37a094e` | **7.27** | **9.01** | **9.62** | 0.00 | +5.11 | 1.32 | 0.39 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 14 | ▅▅▅▅▅▅▅▅ | `main@e524b1f` | **7.25** | **8.99** | **8.99** | 0.00 | +5.59 | 1.26 | 0.47 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 14 | ▁▂▃▄▇▇▇█ | `main@d3781cc` | **5.69** | **7.06** | **7.06** | +0.10 | +4.13 | 1.31 | 0.37 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 14 | ▁▂▂▆▆▃██ | `main@d88abd1` | **5.29** | **6.56** | **6.56** | 0.00 | +3.50 | 1.42 | 0.33 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 12 | ▂▁▂▄▅▆▇█ | `main@ca47da4` | **4.48** | **5.56** | **5.56** | +0.12 | +3.39 | 0.93 | 0.25 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 14 | ▁▂▂▄▆▇█▇ | `main@65f9531` | **3.25** | **4.03** | **4.11** | -0.08 | +2.04 | 0.53 | 0.15 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 14 | █▄▁▇▃▇▄▃ | `main@0a3cc06` | **2.68** | **3.33** | **3.59** | -0.06 | +2.52 | 0.46 | 0.18 |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [withastro/astro](https://github.com/withastro/astro) | 14 | ▁▃▄▄▄▄██ | `main@f55ba4c` | **1.83** | **2.27** | **2.27** | 0.00 | +0.72 | 0.19 | 0.07 |
| [vitejs/vite](https://github.com/vitejs/vite) | 14 | ▂▁▃▂▅█▅▅ | `main@403cc60` | **1.69** | **2.10** | **2.11** | 0.00 | +0.58 | 0.15 | 0.05 |
| [egoist/tsup](https://github.com/egoist/tsup) | 14 | ▅▅▅▅▅▅▅▅ | `main@b6bcae8` | **1.22** | **1.52** | **1.52** | 0.00 | +0.60 | 0.15 | 0.06 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 14 | █▂▂▂▁▁▁▁ | `main@a1f685c` | **1.09** | **1.35** | **1.38** | 0.00 | -0.03 | 0.19 | 0.08 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 14 | ▁▆██▇▆█▆ | `main@1dd2f97` | **1.00** | **1.24** | **1.34** | -0.01 | -0.08 | 0.10 | 0.03 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 14 | ▅▅▅▅▅▅▅▅ | `main@f3a2e84` | **0.80** | **0.99** | **0.99** | 0.00 | +0.11 | 0.09 | 0.02 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 14 | ▅▅▅▅▅▅▅▅ | `master@b36c237` | **0.76** | **0.95** | **0.95** | 0.00 | +0.53 | 0.08 | 0.04 |
| [vercel/hyper](https://github.com/vercel/hyper) | 14 | ███▁▁▁▁▁ | `canary@da0c401` | **0.73** | **0.90** | **0.90** | 0.00 | +0.49 | 0.63 | 0.15 |
| [umami-software/umami](https://github.com/umami-software/umami) | 14 | ██▁▁▁▁▁▁ | `master@c0ea3ae` | **0.68** | **0.85** | **1.04** | 0.00 | -0.20 | 0.07 | 0.02 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [emdash-cms/emdash](https://github.com/emdash-cms/emdash) — +0.12 vs previous week (pinned blended)
- [openclaw/openclaw](https://github.com/openclaw/openclaw) — +0.10 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [cloudflare/vinext](https://github.com/cloudflare/vinext) — -0.08 vs previous week (pinned blended)
- [garrytan/gstack](https://github.com/garrytan/gstack) — -0.06 vs previous week (pinned blended)
- [modem-dev/hunk](https://github.com/modem-dev/hunk) — -0.06 vs previous week (pinned blended)
- [payloadcms/payload](https://github.com/payloadcms/payload) — -0.01 vs previous week (pinned blended)
- [withastro/astro](https://github.com/withastro/astro) — 0.00 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
