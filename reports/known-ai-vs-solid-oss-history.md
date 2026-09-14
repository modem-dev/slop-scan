# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-09-14
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

- `0.4.0` @ `d734e22` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **4.77** | 1.24 | 0.34 |
| mature-oss | 9 | **1.00** | 0.16 | 0.06 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | 26 | ███▅▄▂▂▁ | `main@71f6048` | **6.85** | **10.01** | **11.92** | -0.10 | +3.64 | 1.46 | 0.41 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 26 | ██▂▂▂▂▂▁ | `main@c8597bb` | **6.16** | **9.01** | **9.62** | -0.01 | +5.10 | 1.33 | 0.40 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 26 | ▅▅▅▅▅▅▅▅ | `main@27f0d1a` | **6.15** | **8.99** | **8.99** | 0.00 | +5.59 | 1.26 | 0.47 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 26 | ▂▃▂▁▁▄▆█ | `main@a7c6365` | **5.11** | **7.48** | **7.48** | +0.17 | +4.54 | 1.37 | 0.36 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 24 | ▁▃▅▄▆▆▇█ | `main@3bd30da` | **4.43** | **6.48** | **6.48** | +0.04 | +4.31 | 1.22 | 0.31 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 26 | █▇▇▆▃▁▁▇ | `main@8eccc20` | **2.68** | **3.91** | **4.11** | +0.14 | +1.93 | 0.50 | 0.14 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 26 | ▂▁▂▃▂▆▇█ | `main@ee556ac` | **2.41** | **3.52** | **3.59** | +0.05 | +2.72 | 0.55 | 0.19 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 26 | ▅▅▅▅▅▅▅▅ | `main@f48efce` | **1.81** | **2.64** | **10.28** | 0.00 | +0.48 | 0.20 | 0.05 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 26 | n/a | `main@bb055e2` | **n/a** | **n/a** | **6.56** | n/a | n/a | n/a | n/a |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [withastro/astro](https://github.com/withastro/astro) | 26 | ▁▂▁▇█▇█▇ | `main@88767f2` | **1.66** | **2.43** | **2.46** | -0.02 | +0.89 | 0.20 | 0.07 |
| [umami-software/umami](https://github.com/umami-software/umami) | 26 | ▁▁▁▆████ | `master@ca661c7` | **1.61** | **2.35** | **2.35** | 0.00 | +1.31 | 0.24 | 0.06 |
| [vitejs/vite](https://github.com/vitejs/vite) | 26 | ▃█▇▇▄▄▁▄ | `main@99bd9d1` | **1.43** | **2.08** | **2.11** | +0.02 | +0.56 | 0.16 | 0.05 |
| [egoist/tsup](https://github.com/egoist/tsup) | 26 | ▅▅▅▅▅▅▅▅ | `main@b6bcae8` | **1.04** | **1.52** | **1.52** | 0.00 | +0.60 | 0.15 | 0.06 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 26 | ▂▁▂▃▃▆▇█ | `main@877ec0a` | **1.00** | **1.46** | **1.46** | +0.02 | +0.14 | 0.12 | 0.04 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 26 | ███▁▁▁▁▁ | `main@b57db4f` | **0.91** | **1.33** | **1.38** | 0.00 | -0.05 | 0.19 | 0.08 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 26 | █▁▁▁▁▁▁▁ | `main@8017b27` | **0.67** | **0.98** | **1.10** | 0.00 | +0.09 | 0.09 | 0.02 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 26 | ▅▅▅▅▅▅▅▅ | `master@b36c237` | **0.65** | **0.95** | **0.95** | 0.00 | +0.53 | 0.08 | 0.04 |
| [vercel/hyper](https://github.com/vercel/hyper) | 26 | ▅▅▅▅▅▅▅▅ | `canary@30ec0a2` | **0.62** | **0.90** | **0.90** | 0.00 | +0.49 | 0.63 | 0.15 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [openclaw/openclaw](https://github.com/openclaw/openclaw) — +0.17 vs previous week (pinned blended)
- [cloudflare/vinext](https://github.com/cloudflare/vinext) — +0.14 vs previous week (pinned blended)
- [modem-dev/hunk](https://github.com/modem-dev/hunk) — +0.05 vs previous week (pinned blended)
- [emdash-cms/emdash](https://github.com/emdash-cms/emdash) — +0.04 vs previous week (pinned blended)
- [vitejs/vite](https://github.com/vitejs/vite) — +0.02 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [garrytan/gstack](https://github.com/garrytan/gstack) — -0.10 vs previous week (pinned blended)
- [withastro/astro](https://github.com/withastro/astro) — -0.02 vs previous week (pinned blended)
- [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) — -0.01 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
