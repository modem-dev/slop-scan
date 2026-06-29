# Rolling benchmark history: Known AI repos vs older solid OSS repos

Latest update: 2026-06-29
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

- `0.4.0` @ `2d92e18` — 18 latest repo snapshots

## Latest cohort medians

| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |
|---|---:|---:|---:|---:|
| explicit-ai | 9 | **6.46** | 1.27 | 0.33 |
| mature-oss | 9 | **1.00** | 0.15 | 0.05 |

## AI cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | 15 | █▃▃▁▁▂▁▁ | `main@11de390` | **8.92** | **11.07** | **11.92** | 0.00 | +4.70 | 1.65 | 0.44 |
| [FullAgent/fulling](https://github.com/FullAgent/fulling) | 15 | ▁▁██████ | `main@a524c5e` | **8.28** | **10.28** | **10.28** | 0.00 | +8.12 | 1.28 | 0.29 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | 15 | █▇▁▃▃▃▃▃ | `main@37a094e` | **7.26** | **9.01** | **9.62** | 0.00 | +5.11 | 1.32 | 0.39 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | 15 | ▅▅▅▅▅▅▅▅ | `main@e524b1f` | **7.24** | **8.99** | **8.99** | 0.00 | +5.59 | 1.26 | 0.47 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 15 | ▁▃▃▇▇▆██ | `main@be94853` | **5.67** | **7.04** | **7.06** | -0.02 | +4.11 | 1.32 | 0.37 |
| [emdash-cms/emdash](https://github.com/emdash-cms/emdash) | 13 | ▁▂▄▅▅▆▇█ | `main@7611641` | **4.60** | **5.71** | **5.71** | +0.15 | +3.54 | 0.96 | 0.25 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | 15 | ▁▁▄▆▇█▆▄ | `main@4f5ab7b` | **3.16** | **3.92** | **4.11** | -0.10 | +1.94 | 0.51 | 0.15 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | 15 | ▅▁█▄█▅▄▄ | `main@6cd39c9` | **2.68** | **3.32** | **3.59** | 0.00 | +2.52 | 0.46 | 0.18 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | 15 | ▁▁▆▆▂██· | `main@2f740cc` | **n/a** | **n/a** | **6.56** | n/a | n/a | n/a | n/a |

## Mature OSS cohort latest standings

| Repo | Points | Trend (pinned) | Latest ref | Current blended | Latest pinned | Highest pinned | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |
|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| [withastro/astro](https://github.com/withastro/astro) | 15 | ▁▂▃▂▂███ | `main@5970ef4` | **1.83** | **2.27** | **2.27** | +0.01 | +0.73 | 0.19 | 0.07 |
| [vitejs/vite](https://github.com/vitejs/vite) | 15 | ▁▃▂▅█▅▅█ | `main@869e8ea` | **1.70** | **2.11** | **2.11** | +0.02 | +0.59 | 0.16 | 0.05 |
| [egoist/tsup](https://github.com/egoist/tsup) | 15 | ▅▅▅▅▅▅▅▅ | `main@b6bcae8` | **1.22** | **1.52** | **1.52** | 0.00 | +0.60 | 0.15 | 0.06 |
| [pmndrs/zustand](https://github.com/pmndrs/zustand) | 15 | ███▁▁▁▁▁ | `main@a1f685c` | **1.09** | **1.35** | **1.38** | 0.00 | -0.03 | 0.19 | 0.08 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | 15 | ▂▇█▆▂▆▁▂ | `main@93a5fbf` | **1.00** | **1.24** | **1.34** | +0.00 | -0.08 | 0.10 | 0.03 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | 15 | ▅▅▅▅▅▅▅▅ | `main@f3a2e84` | **0.80** | **0.99** | **0.99** | 0.00 | +0.11 | 0.09 | 0.02 |
| [umami-software/umami](https://github.com/umami-software/umami) | 15 | ▁▁▁▁▁▁▁█ | `master@af1b6c6` | **0.80** | **0.99** | **1.04** | +0.14 | -0.06 | 0.08 | 0.03 |
| [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier) | 15 | ▅▅▅▅▅▅▅▅ | `master@b36c237` | **0.76** | **0.95** | **0.95** | 0.00 | +0.53 | 0.08 | 0.04 |
| [vercel/hyper](https://github.com/vercel/hyper) | 15 | ██▁▁▁▁▁▁ | `canary@da0c401` | **0.73** | **0.90** | **0.90** | 0.00 | +0.49 | 0.63 | 0.15 |

## Table legend

- `Current blended` = latest repo score vs the current mature-OSS medians from the same rolling run.
- `Latest pinned` = latest repo score vs the frozen pinned mature-OSS baseline snapshot.
- `Highest pinned` = highest stored repo score on that same pinned baseline.
- `Δ prev (pinned)` = latest pinned - previous week's pinned score.
- `Δ first (pinned)` = latest pinned - first stored pinned score for that repo.

## Biggest increases vs previous week

- [emdash-cms/emdash](https://github.com/emdash-cms/emdash) — +0.15 vs previous week (pinned blended)
- [umami-software/umami](https://github.com/umami-software/umami) — +0.14 vs previous week (pinned blended)
- [vitejs/vite](https://github.com/vitejs/vite) — +0.02 vs previous week (pinned blended)
- [withastro/astro](https://github.com/withastro/astro) — +0.01 vs previous week (pinned blended)
- [payloadcms/payload](https://github.com/payloadcms/payload) — +0.00 vs previous week (pinned blended)

## Biggest decreases vs previous week

- [cloudflare/vinext](https://github.com/cloudflare/vinext) — -0.10 vs previous week (pinned blended)
- [openclaw/openclaw](https://github.com/openclaw/openclaw) — -0.02 vs previous week (pinned blended)
- [modem-dev/hunk](https://github.com/modem-dev/hunk) — 0.00 vs previous week (pinned blended)
- [garrytan/gstack](https://github.com/garrytan/gstack) — 0.00 vs previous week (pinned blended)

## Notes

- `Trend (pinned)` is a mini sparkline of the repo's stored pinned-blended values across recent weekly points.
- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.
- Older backfills can have fewer points for newer repos because the history job skips weeks before a repo had any commit on its current default branch.
- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.
