# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-05-18
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

- `0.4.0` @ `48ff9d2` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **5.38** | 1.26 | 0.31 |
| mature-oss | 9 | **1.00** | 0.15 | 0.05 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | 9 | ▂▂▁▇▇██▇ | `main@026751e` | **9.10** | **11.35** | **11.92** | -0.57 | +4.98 | 1.78 | 0.46 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 9 | ▁▁▁█████ | `main@d95060f` | **8.21** | **10.24** | **10.24** | 0.00 | +8.08 | 1.28 | 0.29 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 9 | ▁▁▂█████ | `main@2cafcbc` | **7.57** | **9.44** | **9.62** | -0.08 | +5.53 | 1.40 | 0.39 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 9 | ▁▁▁█████ | `main@ea50862` | **7.21** | **8.99** | **8.99** | 0.00 | +5.59 | 1.26 | 0.47 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9 | ▁▁▁▇▇███ | `main@29f39db` | **5.38** | **6.71** | **6.71** | +0.10 | +3.78 | 1.14 | 0.32 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 9 | ▁▁▁█████ | `main@de22ad6` | **5.12** | **6.39** | **6.41** | 0.00 | +3.33 | 1.32 | 0.31 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 7 | ▁▁█████ | `main@23597d0` | **3.98** | **4.96** | **5.08** | +0.07 | +2.79 | 0.83 | 0.22 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 9 | ▁▁▁█████ | `main@69c72b0` | **3.02** | **3.77** | **3.81** | +0.00 | +1.78 | 0.47 | 0.14 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 9 | ▁▁▂███▇▇ | `main@9b01f12` | **2.56** | **3.20** | **3.59** | -0.18 | +2.39 | 0.43 | 0.16 |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [withastro/astro](https://github.com/withastro/astro) | 9 | ▁▁▁▇▇▇██ | `main@904d19a` | **1.74** | **2.17** | **2.17** | +0.03 | +0.62 | 0.18 | 0.06 |
| [vitejs/vite](https://github.com/vitejs/vite) | 9 | ▁▁▁█████ | `main@0ae2844` | **1.67** | **2.09** | **2.09** | +0.01 | +0.57 | 0.16 | 0.05 |
| [egoist/tsup](https://github.com/egoist/tsup) | 9 | ▁▁▁█████ | `main@b6bcae8` | **1.22** | **1.52** | **1.52** | 0.00 | +0.60 | 0.15 | 0.06 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 9 | █▇▇▂▂▂▁▁ | `main@6784d1e` | **1.08** | **1.35** | **1.38** | 0.00 | -0.03 | 0.19 | 0.08 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 9 | ▇▇█▁▁▁▂▃ | `main@a5425f2` | **1.00** | **1.25** | **1.34** | +0.01 | -0.07 | 0.10 | 0.03 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 9 | ▁▁▁█████ | `main@f3a2e84` | **0.80** | **0.99** | **0.99** | 0.00 | +0.11 | 0.09 | 0.02 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 9 | ▁▁▁█████ | `master@b36c237` | **0.76** | **0.95** | **0.95** | 0.00 | +0.53 | 0.08 | 0.04 |
| [vercel/hyper](https://github.com/vercel/hyper) | 9 | ▁▁▁█████ | `canary@2a7bb18` | **0.73** | **0.90** | **0.90** | 0.00 | +0.49 | 0.63 | 0.15 |
| [umami-software/umami](https://github.com/umami-software/umami) | 9 | ███▁▁▁▁▁ | `master@c0ea3ae` | **0.68** | **0.85** | **1.04** | -0.01 | -0.20 | 0.07 | 0.02 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [openclaw/openclaw](https://github.com/openclaw/openclaw) — +0.10 vs previous week (pinned blended)
- [emdash-cms/emdash](https://github.com/emdash-cms/emdash) — +0.07 vs previous week (pinned blended)
- [withastro/astro](https://github.com/withastro/astro) — +0.03 vs previous week (pinned blended)
- [vitejs/vite](https://github.com/vitejs/vite) — +0.01 vs previous week (pinned blended)
- [payloadcms/payload](https://github.com/payloadcms/payload) — +0.01 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [garrytan/gstack](https://github.com/garrytan/gstack) — -0.57 vs previous week (pinned blended)
- [modem-dev/hunk](https://github.com/modem-dev/hunk) — -0.18 vs previous week (pinned blended)
- [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) — -0.08 vs previous week (pinned blended)
- [umami-software/umami](https://github.com/umami-software/umami) — -0.01 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
