# Per-rule signal benchmark: Per-rule signal mini benchmark

Date: 2026-04-26
Analyzer version: 0.3.0
Manifest: `benchmarks/sets/rule-signal-mini.json`
Summary: `benchmarks/results/rule-signal-mini.json`
Report: `reports/rule-signal-mini.md`

## Goal

Run each built-in rule in isolation against a smaller pinned cohort of explicit-AI and mature-OSS repositories so we can compare which rules separate the cohorts most cleanly. The mature-OSS repos stay pinned to exact pre-2025 commit SHAs.

Signal score = average AUROC across the six normalized metrics when each rule runs in isolation against this pinned mini cohort. 1.00 means perfect AI-over-OSS separation, while 0.50 means no better than random ordering.

## Leaderboard

| Rank | Rule | Signal score | AI hit rate | OSS hit rate | Best metric | Best AUROC |
|---:|---|---:|---:|---:|---|---:|
| 1 | `defensive.promise-default-fallbacks` | **0.81** | 6/6 (100%) | 4/5 (80%) | findings / file | 1.00 |
| 2 | `api.generic-status-envelopes` | **0.76** | 5/6 (83%) | 2/5 (40%) | findings / file | 0.88 |
| 3 | `defensive.error-swallowing` | **0.72** | 6/6 (100%) | 3/5 (60%) | findings / file | 0.87 |
| 4 | `defensive.stringified-unknown-errors` | **0.70** | 4/6 (67%) | 1/5 (20%) | findings / file | 0.80 |
| 5 | `defensive.empty-catch` | **0.67** | 6/6 (100%) | 5/5 (100%) | findings / file | 0.93 |
| 6 | `structure.pass-through-wrappers` | **0.67** | 5/6 (83%) | 4/5 (80%) | findings / file | 0.85 |
| 7 | `types.generic-record-casts` | **0.67** | 3/6 (50%) | 0/5 (0%) | findings / file | 0.75 |
| 8 | `defensive.error-obscuring` | **0.66** | 5/6 (83%) | 5/5 (100%) | findings / file | 0.83 |
| 9 | `tests.duplicate-mock-setup` | **0.63** | 3/6 (50%) | 1/5 (20%) | findings / file | 0.70 |


## defensive.promise-default-fallbacks

- Rank: **#1** of 9
- Signal score: **0.81 / 1.00**
- Family / severity / scope: `defensive` / `strong` / `file`
- Best metric: findings / file (1.00)

### Cohort summary

| Cohort | Hit rate | Median findings | Median repo score | Median score / file | Median score / KLOC | Median findings / KLOC |
|---|---:|---:|---:|---:|---:|---:|
| explicit-ai | 6/6 (100%) | 3.00 | 10.00 | 0.09 | 1.32 | 0.34 |
| mature-oss | 4/5 (80%) | 3.00 | 6.00 | 0.00 | 0.10 | 0.05 |

### AUROC by normalized metric

- score / file: 1.00
- score / KLOC: 0.97
- score / function: 0.50
- findings / file: 1.00
- findings / KLOC: 0.90
- findings / function: 0.50

### Repo results

| Repo | Cohort | Ref | Findings | Repo score | Score / file | Score / KLOC | Findings / KLOC |
|---|---|---|---:|---:|---:|---:|---:|
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | explicit-ai | `ea50862` | 1 | 8.00 | 0.25 | 2.68 | 0.33 |
| [garrytan/gstack](https://github.com/garrytan/gstack) | explicit-ai | `6cc094c` | 7 | 40.00 | 0.23 | 2.11 | 0.37 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | explicit-ai | `28980b0` | 30 | 87.00 | 0.08 | 1.46 | 0.50 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | explicit-ai | `4de00d6` | 3 | 10.00 | 0.11 | 1.18 | 0.35 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | explicit-ai | `b37663f` | 3 | 10.00 | 0.06 | 0.74 | 0.22 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | explicit-ai | `857f537` | 1 | 4.00 | 0.03 | 0.18 | 0.04 |
| [withastro/astro](https://github.com/withastro/astro) | mature-oss | `f706899` | 9 | 20.50 | 0.01 | 0.25 | 0.11 |
| [vitejs/vite](https://github.com/vitejs/vite) | mature-oss | `a492253` | 3 | 6.00 | 0.00 | 0.16 | 0.08 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | mature-oss | `99d1741` | 1 | 2.00 | 0.00 | 0.10 | 0.05 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | mature-oss | `f3f36d8` | 3 | 6.00 | 0.00 | 0.02 | 0.01 |
| [umami-software/umami](https://github.com/umami-software/umami) | mature-oss | `227b255` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |

## api.generic-status-envelopes

- Rank: **#2** of 9
- Signal score: **0.76 / 1.00**
- Family / severity / scope: `api` / `strong` / `file`
- Best metric: findings / file (0.88)

### Cohort summary

| Cohort | Hit rate | Median findings | Median repo score | Median score / file | Median score / KLOC | Median findings / KLOC |
|---|---:|---:|---:|---:|---:|---:|
| explicit-ai | 5/6 (83%) | 1.00 | 5.00 | 0.02 | 0.24 | 0.06 |
| mature-oss | 2/5 (40%) | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### AUROC by normalized metric

- score / file: 0.88
- score / KLOC: 0.88
- score / function: 0.50
- findings / file: 0.88
- findings / KLOC: 0.88
- findings / function: 0.50

### Repo results

| Repo | Cohort | Ref | Findings | Repo score | Score / file | Score / KLOC | Findings / KLOC |
|---|---|---|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | explicit-ai | `6cc094c` | 1 | 8.00 | 0.05 | 0.42 | 0.05 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | explicit-ai | `857f537` | 1 | 8.00 | 0.06 | 0.36 | 0.04 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | explicit-ai | `4de00d6` | 1 | 2.00 | 0.02 | 0.24 | 0.12 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | explicit-ai | `28980b0` | 5 | 14.00 | 0.01 | 0.24 | 0.08 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | explicit-ai | `b37663f` | 1 | 2.00 | 0.01 | 0.15 | 0.07 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | explicit-ai | `ea50862` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [withastro/astro](https://github.com/withastro/astro) | mature-oss | `f706899` | 1 | 2.00 | 0.00 | 0.02 | 0.01 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | mature-oss | `f3f36d8` | 1 | 6.00 | 0.00 | 0.02 | 0.00 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | mature-oss | `99d1741` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [umami-software/umami](https://github.com/umami-software/umami) | mature-oss | `227b255` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [vitejs/vite](https://github.com/vitejs/vite) | mature-oss | `a492253` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |

## defensive.error-swallowing

- Rank: **#3** of 9
- Signal score: **0.72 / 1.00**
- Family / severity / scope: `defensive` / `strong` / `file`
- Best metric: findings / file (0.87)

### Cohort summary

| Cohort | Hit rate | Median findings | Median repo score | Median score / file | Median score / KLOC | Median findings / KLOC |
|---|---:|---:|---:|---:|---:|---:|
| explicit-ai | 6/6 (100%) | 3.00 | 9.10 | 0.07 | 0.53 | 0.24 |
| mature-oss | 3/5 (60%) | 6.00 | 13.80 | 0.01 | 0.17 | 0.09 |

### AUROC by normalized metric

- score / file: 0.87
- score / KLOC: 0.80
- score / function: 0.50
- findings / file: 0.87
- findings / KLOC: 0.77
- findings / function: 0.50

### Repo results

| Repo | Cohort | Ref | Findings | Repo score | Score / file | Score / KLOC | Findings / KLOC |
|---|---|---|---:|---:|---:|---:|---:|
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | explicit-ai | `ea50862` | 10 | 17.40 | 0.54 | 5.83 | 3.35 |
| [garrytan/gstack](https://github.com/garrytan/gstack) | explicit-ai | `6cc094c` | 8 | 37.40 | 0.21 | 1.97 | 0.42 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | explicit-ai | `857f537` | 3 | 14.00 | 0.10 | 0.63 | 0.13 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | explicit-ai | `4de00d6` | 3 | 3.60 | 0.04 | 0.42 | 0.35 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | explicit-ai | `b37663f` | 1 | 3.00 | 0.02 | 0.22 | 0.07 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | explicit-ai | `28980b0` | 2 | 4.20 | 0.00 | 0.07 | 0.03 |
| [vitejs/vite](https://github.com/vitejs/vite) | mature-oss | `a492253` | 6 | 19.20 | 0.02 | 0.52 | 0.16 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | mature-oss | `f3f36d8` | 29 | 84.80 | 0.02 | 0.34 | 0.12 |
| [withastro/astro](https://github.com/withastro/astro) | mature-oss | `f706899` | 7 | 13.80 | 0.01 | 0.17 | 0.09 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | mature-oss | `99d1741` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [umami-software/umami](https://github.com/umami-software/umami) | mature-oss | `227b255` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |

## defensive.stringified-unknown-errors

- Rank: **#4** of 9
- Signal score: **0.70 / 1.00**
- Family / severity / scope: `defensive` / `strong` / `file`
- Best metric: findings / file (0.80)

### Cohort summary

| Cohort | Hit rate | Median findings | Median repo score | Median score / file | Median score / KLOC | Median findings / KLOC |
|---|---:|---:|---:|---:|---:|---:|
| explicit-ai | 4/6 (67%) | 1.50 | 5.00 | 0.03 | 0.31 | 0.10 |
| mature-oss | 1/5 (20%) | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### AUROC by normalized metric

- score / file: 0.80
- score / KLOC: 0.80
- score / function: 0.50
- findings / file: 0.80
- findings / KLOC: 0.80
- findings / function: 0.50

### Repo results

| Repo | Cohort | Ref | Findings | Repo score | Score / file | Score / KLOC | Findings / KLOC |
|---|---|---|---:|---:|---:|---:|---:|
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | explicit-ai | `ea50862` | 2 | 8.00 | 0.25 | 2.68 | 0.67 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | explicit-ai | `28980b0` | 11 | 30.00 | 0.03 | 0.50 | 0.18 |
| [garrytan/gstack](https://github.com/garrytan/gstack) | explicit-ai | `6cc094c` | 1 | 6.00 | 0.03 | 0.32 | 0.05 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | explicit-ai | `b37663f` | 2 | 4.00 | 0.02 | 0.29 | 0.15 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | explicit-ai | `4de00d6` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | explicit-ai | `857f537` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [withastro/astro](https://github.com/withastro/astro) | mature-oss | `f706899` | 1 | 2.00 | 0.00 | 0.02 | 0.01 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | mature-oss | `f3f36d8` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | mature-oss | `99d1741` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [umami-software/umami](https://github.com/umami-software/umami) | mature-oss | `227b255` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [vitejs/vite](https://github.com/vitejs/vite) | mature-oss | `a492253` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |

## defensive.empty-catch

- Rank: **#5** of 9
- Signal score: **0.67 / 1.00**
- Family / severity / scope: `defensive` / `strong` / `file`
- Best metric: findings / file (0.93)

### Cohort summary

| Cohort | Hit rate | Median findings | Median repo score | Median score / file | Median score / KLOC | Median findings / KLOC |
|---|---:|---:|---:|---:|---:|---:|
| explicit-ai | 6/6 (100%) | 10.00 | 42.30 | 0.12 | 1.23 | 0.31 |
| mature-oss | 5/5 (100%) | 13.00 | 45.10 | 0.04 | 1.21 | 0.35 |

### AUROC by normalized metric

- score / file: 0.87
- score / KLOC: 0.63
- score / function: 0.50
- findings / file: 0.93
- findings / KLOC: 0.57
- findings / function: 0.50

### Repo results

| Repo | Cohort | Ref | Findings | Repo score | Score / file | Score / KLOC | Findings / KLOC |
|---|---|---|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | explicit-ai | `6cc094c` | 55 | 301.30 | 1.71 | 15.89 | 2.90 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | explicit-ai | `4de00d6` | 18 | 69.30 | 0.74 | 8.18 | 2.12 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | explicit-ai | `b37663f` | 4 | 18.40 | 0.11 | 1.36 | 0.29 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | explicit-ai | `28980b0` | 16 | 66.20 | 0.06 | 1.11 | 0.27 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | explicit-ai | `857f537` | 4 | 17.50 | 0.13 | 0.79 | 0.18 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | explicit-ai | `ea50862` | 1 | 1.90 | 0.06 | 0.64 | 0.33 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | mature-oss | `99d1741` | 11 | 43.90 | 0.08 | 2.15 | 0.54 |
| [withastro/astro](https://github.com/withastro/astro) | mature-oss | `f706899` | 39 | 133.90 | 0.07 | 1.65 | 0.48 |
| [vitejs/vite](https://github.com/vitejs/vite) | mature-oss | `a492253` | 13 | 45.10 | 0.04 | 1.21 | 0.35 |
| [umami-software/umami](https://github.com/umami-software/umami) | mature-oss | `227b255` | 4 | 10.80 | 0.02 | 0.53 | 0.20 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | mature-oss | `f3f36d8` | 21 | 71.20 | 0.02 | 0.28 | 0.08 |

## structure.pass-through-wrappers

- Rank: **#6** of 9
- Signal score: **0.67 / 1.00**
- Family / severity / scope: `structure` / `strong` / `file`
- Best metric: findings / file (0.85)

### Cohort summary

| Cohort | Hit rate | Median findings | Median repo score | Median score / file | Median score / KLOC | Median findings / KLOC |
|---|---:|---:|---:|---:|---:|---:|
| explicit-ai | 5/6 (83%) | 5.50 | 13.00 | 0.08 | 1.12 | 0.35 |
| mature-oss | 4/5 (80%) | 13.00 | 41.00 | 0.02 | 0.39 | 0.15 |

### AUROC by normalized metric

- score / file: 0.85
- score / KLOC: 0.65
- score / function: 0.50
- findings / file: 0.85
- findings / KLOC: 0.65
- findings / function: 0.50

### Repo results

| Repo | Cohort | Ref | Findings | Repo score | Score / file | Score / KLOC | Findings / KLOC |
|---|---|---|---:|---:|---:|---:|---:|
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | explicit-ai | `ea50862` | 1 | 5.00 | 0.16 | 1.67 | 0.33 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | explicit-ai | `28980b0` | 29 | 85.00 | 0.08 | 1.43 | 0.49 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | explicit-ai | `b37663f` | 6 | 19.00 | 0.11 | 1.40 | 0.44 |
| [garrytan/gstack](https://github.com/garrytan/gstack) | explicit-ai | `6cc094c` | 7 | 16.00 | 0.09 | 0.84 | 0.37 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | explicit-ai | `857f537` | 5 | 10.00 | 0.07 | 0.45 | 0.22 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | explicit-ai | `4de00d6` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [vitejs/vite](https://github.com/vitejs/vite) | mature-oss | `a492253` | 25 | 65.00 | 0.05 | 1.74 | 0.67 |
| [withastro/astro](https://github.com/withastro/astro) | mature-oss | `f706899` | 24 | 62.00 | 0.03 | 0.77 | 0.30 |
| [umami-software/umami](https://github.com/umami-software/umami) | mature-oss | `227b255` | 3 | 8.00 | 0.02 | 0.39 | 0.15 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | mature-oss | `f3f36d8` | 13 | 41.00 | 0.01 | 0.16 | 0.05 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | mature-oss | `99d1741` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |

## types.generic-record-casts

- Rank: **#7** of 9
- Signal score: **0.67 / 1.00**
- Family / severity / scope: `types` / `strong` / `file`
- Best metric: findings / file (0.75)

### Cohort summary

| Cohort | Hit rate | Median findings | Median repo score | Median score / file | Median score / KLOC | Median findings / KLOC |
|---|---:|---:|---:|---:|---:|---:|
| explicit-ai | 3/6 (50%) | 0.50 | 1.00 | 0.00 | 0.03 | 0.01 |
| mature-oss | 0/5 (0%) | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### AUROC by normalized metric

- score / file: 0.75
- score / KLOC: 0.75
- score / function: 0.50
- findings / file: 0.75
- findings / KLOC: 0.75
- findings / function: 0.50

### Repo results

| Repo | Cohort | Ref | Findings | Repo score | Score / file | Score / KLOC | Findings / KLOC |
|---|---|---|---:|---:|---:|---:|---:|
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | explicit-ai | `b37663f` | 2 | 6.00 | 0.04 | 0.44 | 0.15 |
| [garrytan/gstack](https://github.com/garrytan/gstack) | explicit-ai | `6cc094c` | 1 | 2.00 | 0.01 | 0.11 | 0.05 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | explicit-ai | `28980b0` | 1 | 4.00 | 0.00 | 0.07 | 0.02 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | explicit-ai | `ea50862` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | explicit-ai | `4de00d6` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | explicit-ai | `857f537` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | mature-oss | `f3f36d8` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | mature-oss | `99d1741` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [umami-software/umami](https://github.com/umami-software/umami) | mature-oss | `227b255` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [vitejs/vite](https://github.com/vitejs/vite) | mature-oss | `a492253` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [withastro/astro](https://github.com/withastro/astro) | mature-oss | `f706899` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |

## defensive.error-obscuring

- Rank: **#8** of 9
- Signal score: **0.66 / 1.00**
- Family / severity / scope: `defensive` / `strong` / `file`
- Best metric: findings / file (0.83)

### Cohort summary

| Cohort | Hit rate | Median findings | Median repo score | Median score / file | Median score / KLOC | Median findings / KLOC |
|---|---:|---:|---:|---:|---:|---:|
| explicit-ai | 5/6 (83%) | 4.50 | 9.40 | 0.06 | 0.82 | 0.38 |
| mature-oss | 5/5 (100%) | 5.00 | 14.40 | 0.02 | 0.39 | 0.13 |

### AUROC by normalized metric

- score / file: 0.80
- score / KLOC: 0.60
- score / function: 0.50
- findings / file: 0.83
- findings / KLOC: 0.70
- findings / function: 0.50

### Repo results

| Repo | Cohort | Ref | Findings | Repo score | Score / file | Score / KLOC | Findings / KLOC |
|---|---|---|---:|---:|---:|---:|---:|
| [garrytan/gstack](https://github.com/garrytan/gstack) | explicit-ai | `6cc094c` | 19 | 49.40 | 0.28 | 2.61 | 1.00 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | explicit-ai | `28980b0` | 24 | 69.40 | 0.06 | 1.17 | 0.40 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | explicit-ai | `b37663f` | 6 | 13.00 | 0.08 | 0.96 | 0.44 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | explicit-ai | `4de00d6` | 3 | 5.80 | 0.06 | 0.68 | 0.35 |
| [robinebers/openusage](https://github.com/robinebers/openusage) | explicit-ai | `857f537` | 2 | 4.20 | 0.03 | 0.19 | 0.09 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | explicit-ai | `ea50862` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [withastro/astro](https://github.com/withastro/astro) | mature-oss | `f706899` | 26 | 80.70 | 0.04 | 1.00 | 0.32 |
| [umami-software/umami](https://github.com/umami-software/umami) | mature-oss | `227b255` | 4 | 11.50 | 0.02 | 0.56 | 0.20 |
| [vitejs/vite](https://github.com/vitejs/vite) | mature-oss | `a492253` | 5 | 14.40 | 0.01 | 0.39 | 0.13 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | mature-oss | `f3f36d8` | 28 | 77.20 | 0.02 | 0.31 | 0.11 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | mature-oss | `99d1741` | 1 | 5.00 | 0.01 | 0.25 | 0.05 |

## tests.duplicate-mock-setup

- Rank: **#9** of 9
- Signal score: **0.63 / 1.00**
- Family / severity / scope: `tests` / `medium` / `file`
- Best metric: findings / file (0.70)

### Cohort summary

| Cohort | Hit rate | Median findings | Median repo score | Median score / file | Median score / KLOC | Median findings / KLOC |
|---|---:|---:|---:|---:|---:|---:|
| explicit-ai | 3/6 (50%) | 1.50 | 4.50 | 0.04 | 0.53 | 0.15 |
| mature-oss | 1/5 (20%) | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### AUROC by normalized metric

- score / file: 0.70
- score / KLOC: 0.70
- score / function: 0.50
- findings / file: 0.70
- findings / KLOC: 0.70
- findings / function: 0.50

### Repo results

| Repo | Cohort | Ref | Findings | Repo score | Score / file | Score / KLOC | Findings / KLOC |
|---|---|---|---:|---:|---:|---:|---:|
| [robinebers/openusage](https://github.com/robinebers/openusage) | explicit-ai | `857f537` | 25 | 112.00 | 0.81 | 5.03 | 1.12 |
| [cloudflare/vinext](https://github.com/cloudflare/vinext) | explicit-ai | `28980b0` | 18 | 90.00 | 0.08 | 1.51 | 0.30 |
| [redwoodjs/agent-ci](https://github.com/redwoodjs/agent-ci) | explicit-ai | `4de00d6` | 3 | 9.00 | 0.10 | 1.06 | 0.35 |
| [garrytan/gstack](https://github.com/garrytan/gstack) | explicit-ai | `6cc094c` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [jiayun/DevWorkbench](https://github.com/jiayun/DevWorkbench) | explicit-ai | `ea50862` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [modem-dev/hunk](https://github.com/modem-dev/hunk) | explicit-ai | `b37663f` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [payloadcms/payload](https://github.com/payloadcms/payload) | mature-oss | `f3f36d8` | 6 | 22.50 | 0.01 | 0.09 | 0.02 |
| [sindresorhus/execa](https://github.com/sindresorhus/execa) | mature-oss | `99d1741` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [umami-software/umami](https://github.com/umami-software/umami) | mature-oss | `227b255` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [vitejs/vite](https://github.com/vitejs/vite) | mature-oss | `a492253` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| [withastro/astro](https://github.com/withastro/astro) | mature-oss | `f706899` | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
