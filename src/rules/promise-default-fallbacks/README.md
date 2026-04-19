# defensive.promise-default-fallbacks

Flags promise `.catch()` handlers that suppress rejected async work with a cheap fallback.

- **Family:** `defensive`
- **Severity:** `strong`
- **Scope:** `file`
- **Requires:** `file.ast`

## How it works

The rule looks for promise-chain catch handlers that turn rejection into:

- an empty handler body like `.catch(() => {})`
- a direct sentinel default like `null`, `undefined`, `false`, `0`, `""`, `[]`, or `{}`
- a log-and-default block like `console.error(error); return false`

This is intentionally distinct from the existing `try/catch` defensive rules. It targets the promise-chain version of the same failure-suppression habit, which shows up frequently in generated async glue code.

To avoid obvious noise, the rule skips very large bundled/generated files over `5000` logical lines.

## Flagged examples

```ts
export async function loadConfig() {
  return fetchConfig().catch(() => null);
}

export async function readClipboard() {
  return navigator.clipboard.readText().catch(() => {});
}

export async function loadFlag() {
  return fetchFlag().catch((error) => {
    console.error("flag load failed", error);
    return false;
  });
}
```

## Usually ignored

```ts
export async function loadConfig() {
  return fetchConfig().catch((error) => {
    throw error;
  });
}

export async function loadConfigResult() {
  return fetchConfig().catch(() => ({ ok: false, reason: "missing" }));
}
```

## Scoring

Each flagged promise catch adds `2` points.
Log-and-default handlers add `2.5` points.
The file total is capped at `8`.

## Benchmark signal

Full pinned benchmark against the exact `known-ai-vs-solid-oss` cohort:

- Signal score: **0.98 / 1.00**
- Best separating metric: **findings / file (0.99)**
- Hit rate: **9/9 AI repos** vs **4/9 mature OSS repos**
- Full results: [experimental rule report](../../../reports/autoresearch-candidate-rule.md#defensivepromise-default-fallbacks)
