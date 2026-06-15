# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-06-15
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

- `0.4.0` @ `4deb423` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **5.58** | 1.28 | 0.33 |
| mature-oss | 9 | **1.00** | 0.15 | 0.05 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | 13 | ▂▇█▃▃▁▁▁ | `main@c7ae632` | **8.94** | **11.14** | **11.92** | +0.05 | +4.77 | 1.66 | 0.44 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 13 | ▁▁▁▁████ | `main@a524c5e` | **8.25** | **10.28** | **10.28** | 0.00 | +8.12 | 1.28 | 0.29 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 13 | ▅█▇▆▁▂▂▂ | `main@928fb44` | **7.23** | **9.01** | **9.62** | +0.01 | +5.11 | 1.32 | 0.39 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 13 | ▅▅▅▅▅▅▅▅ | `main@e524b1f` | **7.21** | **8.99** | **8.99** | 0.00 | +5.59 | 1.26 | 0.47 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 13 | ▁▃▄▅▅███ | `main@6607916` | **5.58** | **6.96** | **6.97** | -0.01 | +4.03 | 1.28 | 0.36 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 13 | ▃▁▂▂▆▆▃█ | `main@d88abd1` | **5.26** | **6.56** | **6.56** | +0.16 | +3.50 | 1.42 | 0.33 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 11 | ▃▂▁▂▅▆▇█ | `main@1ec2bfd` | **4.36** | **5.44** | **5.44** | +0.10 | +3.26 | 0.92 | 0.24 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 13 | ▃▁▂▂▄▆▇█ | `main@b67a8dd` | **3.30** | **4.11** | **4.11** | +0.04 | +2.12 | 0.54 | 0.15 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 13 | ██▄▁▇▃▇▄ | `main@3906f39` | **2.71** | **3.38** | **3.59** | -0.14 | +2.58 | 0.46 | 0.17 |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [withastro/astro](https://github.com/withastro/astro) | 13 | ▁▂▄▅▅▄▅█ | `main@5a1cff5` | **1.82** | **2.27** | **2.27** | +0.11 | +0.72 | 0.19 | 0.07 |
| [vitejs/vite](https://github.com/vitejs/vite) | 13 | ▂▂▁▃▂▅█▅ | `main@d18e985` | **1.68** | **2.10** | **2.11** | -0.02 | +0.58 | 0.15 | 0.05 |
| [egoist/tsup](https://github.com/egoist/tsup) | 13 | ▅▅▅▅▅▅▅▅ | `main@b6bcae8` | **1.22** | **1.52** | **1.52** | 0.00 | +0.60 | 0.15 | 0.06 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 13 | ██▂▂▂▁▁▁ | `main@07cee61` | **1.08** | **1.35** | **1.38** | 0.00 | -0.03 | 0.19 | 0.08 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 13 | ▁▂▇██▇▆█ | `main@875f37f` | **1.00** | **1.25** | **1.34** | +0.01 | -0.07 | 0.10 | 0.03 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 13 | ▅▅▅▅▅▅▅▅ | `main@f3a2e84` | **0.80** | **0.99** | **0.99** | 0.00 | +0.11 | 0.09 | 0.02 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 13 | ▅▅▅▅▅▅▅▅ | `master@b36c237` | **0.76** | **0.95** | **0.95** | 0.00 | +0.53 | 0.08 | 0.04 |
| [vercel/hyper](https://github.com/vercel/hyper) | 13 | ████▁▁▁▁ | `canary@da0c401` | **0.72** | **0.90** | **0.90** | 0.00 | +0.49 | 0.63 | 0.15 |
| [umami-software/umami](https://github.com/umami-software/umami) | 13 | ███▁▁▁▁▁ | `master@c0ea3ae` | **0.68** | **0.85** | **1.04** | 0.00 | -0.20 | 0.07 | 0.02 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [robinebers/openusage](https://github.com/robinebers/openusage) — +0.16 vs previous week (pinned blended)
- [withastro/astro](https://github.com/withastro/astro) — +0.11 vs previous week (pinned blended)
- [emdash-cms/emdash](https://github.com/emdash-cms/emdash) — +0.10 vs previous week (pinned blended)
- [garrytan/gstack](https://github.com/garrytan/gstack) — +0.05 vs previous week (pinned blended)
- [cloudflare/vinext](https://github.com/cloudflare/vinext) — +0.04 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [modem-dev/hunk](https://github.com/modem-dev/hunk) — -0.14 vs previous week (pinned blended)
- [vitejs/vite](https://github.com/vitejs/vite) — -0.02 vs previous week (pinned blended)
- [openclaw/openclaw](https://github.com/openclaw/openclaw) — -0.01 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
