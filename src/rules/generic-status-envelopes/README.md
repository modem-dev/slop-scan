# api.generic-status-envelopes

Flags shallow boolean result wrappers like `{ ok: true, data }` and `{ success: false, error: ... }`.

- **Family:** `api`
- **Severity:** `strong`
- **Scope:** `file`
- **Requires:** `file.ast`

## How it works

The rule looks for object literals that combine:

- a boolean status field: `success` or `ok`
- a generic payload field such as `message`, `error`, `data`, `rows`, `present`, or `artifactId`

This pattern is common in generated app/service glue that wraps every operation in a shallow result envelope. It is not always wrong, but repeated use often signals generic boolean-and-payload plumbing instead of richer domain-shaped APIs.

To avoid obvious vendored noise, the rule skips very large bundled/generated files over `5000` logical lines.

## Flagged examples

```ts
return { success: false, error: "Unauthorized" };
return { success: true, message: "Repository created successfully" };
return { ok: true, rows };
return { ok: true, artifactId: String(foundId) };
```

## Usually ignored

```ts
return { ok: true };
return { success: true, user };
return { error: "missing" };
```

## Scoring

Each generic status envelope adds `2` points.
The file total is capped at `8`.

## Benchmark signal

Full pinned benchmark against the exact `known-ai-vs-solid-oss` cohort:

- Signal score: **0.93 / 1.00**
- Best separating metric: **findings / file (0.93)**
- Hit rate: **8/9 AI repos** vs **2/9 mature OSS repos**
- Full results: [experimental rule report](../../../reports/autoresearch-candidate-rule.md#apigeneric-status-envelopes)
