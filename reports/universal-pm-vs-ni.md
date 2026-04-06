# AI-slop comparison: `universal-pm` vs `ni`

Date: 2026-04-06

## Goal

Compare one repo that explicitly describes itself as AI-generated against one well-regarded manual TypeScript repo in a similar domain.

## Repos

### AI repo
- Repo: `golusprasad12-arch/universal-pm`
- Why selected: the README explicitly says **"This project is 100% AI-generated code."**
- Domain: package-manager CLI

### Manual repo
- Repo: `antfu-collective/ni`
- Why selected: mature, well-regarded TypeScript package-manager CLI by Anthony Fu
- Domain: package-manager CLI

## Commands used

```bash
bun run src/cli.ts scan /tmp/aicand-ZTXEM9 --json
bun run src/cli.ts scan /tmp/ni-JjVTWC --json
```

## Headline result

The analyzer currently separates these repos reasonably well on a normalized basis.

| Metric | universal-pm | ni |
|---|---:|---:|
| Source files scanned | 18 | 87 |
| Findings | 23 | 14 |
| Repo score | 88.70 | 62.87 |
| Score per file | **4.93** | **0.72** |
| Findings per file | **1.28** | **0.16** |

Even though `ni` is much larger, `universal-pm` scores about **6.8x higher per file** and produces about **8x more findings per file**.

## Rule mix

### universal-pm

| Rule | Count |
|---|---:|
| `defensive.needless-try-catch` | 11 |
| `defensive.async-noise` | 8 |
| `structure.pass-through-wrappers` | 3 |
| `structure.directory-fanout-hotspot` | 1 |
| `tests.duplicate-mock-setup` | 0 |

### ni

| Rule | Count |
|---|---:|
| `structure.over-fragmentation` | 7 |
| `defensive.async-noise` | 5 |
| `structure.barrel-density` | 1 |
| `structure.directory-fanout-hotspot` | 1 |
| `tests.duplicate-mock-setup` | 0 |

## Interpretation

### universal-pm

The AI repo is dominated by the rule families we currently consider most suspicious:

- `needless-try-catch`
- `async-noise`
- `pass-through-wrappers`

Top hotspots:
- `src/index.ts` — 14.0
- `src/commands/index.ts` — 12.0
- `src/commands/utilities.ts` — 11.4
- `src/commands/update.ts` — 10.0
- `src/services/manager.ts` — 10.0

This points to a pattern of:
- lots of defensive shell/process wrappers,
- many shallow async helpers,
- repetitive command plumbing,
- pass-through abstractions with little additional logic.

### ni

The manual repo does **not** light up on the same suspicious families.

Its score is mostly structural:
- `over-fragmentation`
- a little `async-noise`
- one `barrel-density` hit

Top hotspots:
- `src/catalog/pnpm.ts` — 3.0
- `src/index.ts` — 3.0
- `src/commands/ni.ts` — 1.5
- `src/commands/nr.ts` — 1.5
- `src/commands/nun.ts` — 1.5

That suggests the current analyzer sees `ni` mostly as a modular CLI with many small files and tests, not as a repo dominated by AI-ish defensive clutter.

## About the new test-duplication heuristic

A new rule was added in this pass:

- `tests.duplicate-mock-setup`

It looks for repeated mock/setup shapes across multiple test files.

Important outcome for this comparison:

- `universal-pm`: **0** hits
- `ni`: **0** hits

This is a useful negative result.

It means the rule, in its current form, did **not** spuriously penalize `ni` for its many test files, and it also did not change the `universal-pm` result because that repo has little test surface to analyze.

## Current takeaway

This comparison is encouraging for the analyzer.

The current engine differentiates the repos in a direction that makes sense:

- the explicitly AI-generated repo looks much noisier per file,
- the manual repo scores far lower per file,
- and the rule mix is qualitatively different.

## Caveats

This is still an early heuristic engine, so a few caveats matter:

1. `repoScore` is still a raw aggregate, not a calibrated 0–100 quality score.
2. `ni` still gets structural penalties from tiny-file/test layouts that may be legitimate.
3. `universal-pm` is a small repo, so concentrated noise inflates the per-file comparison.
4. A stronger benchmark set should eventually include multiple AI and manual repos per category.

## Recommended next calibration steps

1. Add duplicate function / near-clone detection.
2. Refine `over-fragmentation` so tiny test matrices are less likely to be over-penalized when they are intentionally data-driven.
3. Add a distinction between boundary CLI wrappers and leaf business-logic wrappers.
4. Build a small benchmark suite of known-AI and known-manual repos with saved scan snapshots.
