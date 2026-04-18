# Contributing to slop-scan

Thanks for helping improve `slop-scan`.

This project is a deterministic Bun + TypeScript CLI for explainable slop heuristics on JS/TS repositories. Please keep changes reproducible, stable, and explainable.

## Development setup

Requirements:

- [Bun](https://bun.sh/)
- Node.js 18+

Install dependencies:

```bash
bun install
```

Run the CLI locally:

```bash
bun run scan
bun run src/cli.ts scan /path/to/repo --lint
```

## Local validation

Run the standard validation suite before opening a PR:

```bash
bun run format:check
bun run lint
bun test
```

## Stable self-scan

`bun run lint` includes a stable self-scan.

It runs the last published `slop-scan` release against this repo using the committed root config in [`slop-scan.config.json`](slop-scan.config.json), then compares the result to [`tests/fixtures/self-scan-stable-baseline.json`](tests/fixtures/self-scan-stable-baseline.json).

The check currently fails only when the stable release reports either:

- a higher finding count
- a higher repo score

Useful commands:

```bash
bun run lint:self
bun run lint:self:update
```

Use `bun run lint:self:update` only when you intentionally accept the new stable self-scan baseline.

## Benchmarks

This repo ships with a pinned benchmark set under [`benchmarks/`](benchmarks/).

Fetch the pinned checkouts:

```bash
bun run benchmark:fetch
```

Scan them with the analyzer's default config:

```bash
bun run benchmark:scan
```

Regenerate the markdown report:

```bash
bun run benchmark:report
```

Or do all three:

```bash
bun run benchmark:update
```

Benchmark artifacts:

- manifest: [`benchmarks/sets/known-ai-vs-solid-oss.json`](benchmarks/sets/known-ai-vs-solid-oss.json)
- snapshot: [`benchmarks/results/known-ai-vs-solid-oss.json`](benchmarks/results/known-ai-vs-solid-oss.json)
- report: [`reports/known-ai-vs-solid-oss-benchmark.md`](reports/known-ai-vs-solid-oss-benchmark.md)

Notes:

- checkouts live under `benchmarks/.cache/` and are gitignored
- regenerate benchmark artifacts intentionally when the benchmark set or analyzer changes materially
- if rule behavior changes in a benchmark-facing way, rerun `bun run benchmark:update`

## Pre-commit hook

A Husky pre-commit hook runs:

```bash
bun run format:check
bun run lint
```

## Pull requests

Issues and pull requests are welcome.

A good PR usually includes:

- focused code and docs changes
- updated tests when behavior changes
- benchmark refreshes when benchmark-facing behavior changes materially
- a short explanation of any intentional stable self-scan baseline change
