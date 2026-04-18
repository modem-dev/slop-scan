# defensive.error-swallowing

Flags log-and-continue catch blocks.

- **Family:** `defensive`
- **Severity:** `strong`
- **Scope:** `file`
- **Requires:** `file.tryCatchSummaries`

## How it works

The rule looks for small try/catch blocks where the catch clause only logs and then continues.
That pattern records the failure but still suppresses it from callers.

Filesystem-existence probes are ignored, and boundary-heavy catches are downweighted rather than removed entirely.

## Flagged example

```ts
export async function syncUser(id: string) {
  try {
    await pushUser(id);
  } catch (error) {
    logger.warn(error);
  }
}
```

## Usually ignored

```ts
export async function syncUser(id: string) {
  try {
    await pushUser(id);
  } catch (error) {
    logger.error({ error, id });
    throw error;
  }
}
```

## Scoring

Each flagged catch uses the shared try/catch scoring helper, then the file total is capped at `8`.
