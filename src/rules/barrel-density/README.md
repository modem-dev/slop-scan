# structure.barrel-density

Flags files that are effectively nothing but re-export barrels.

- **Family:** `structure`
- **Severity:** `medium`
- **Scope:** `file`
- **Requires:** `file.exportSummary`

## How it works

A file is reported when both of these are true:

- every top-level statement is a re-export
- there are at least 2 re-export statements

That keeps the rule focused on pure barrels instead of legitimate modules that happen to re-export one helper or type.

## Flagged example

```ts
export * from "./client";
export * from "./types";
export { createStore } from "./store";
```

## Usually ignored

```ts
import { createStoreImpl } from "./store";

export function createStore() {
  return createStoreImpl();
}

export { type Store } from "./types";
```

## Scoring

The score starts at `1` and adds `0.5` per re-export statement, capped at `3`.
