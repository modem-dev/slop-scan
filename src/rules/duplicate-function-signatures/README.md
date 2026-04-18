# structure.duplicate-function-signatures

Flags repeated non-test helper shapes that show up across several source files.

- **Family:** `structure`
- **Severity:** `medium`
- **Scope:** `file`
- **Requires:** `repo.duplicateFunctionSignatures`

## How it works

A repo-level fact builds structural fingerprints for function bodies, normalizing local names so copy-pasted helpers still match after superficial renaming.
The rule then projects those duplicate clusters back onto each affected file.

A cluster only counts when it appears in **3 or more files**.
Tiny functions and pass-through wrappers are excluded before clustering, and test files are skipped entirely.

## Flagged example

```ts
// src/users/normalize.ts
export function normalizeUser(input: ApiUser) {
  const name = input.name?.trim() ?? "";
  const email = input.email?.toLowerCase() ?? "";
  return { name, email, active: Boolean(input.active) };
}

// src/teams/normalize.ts
export function normalizeTeamMember(member: ApiMember) {
  const name = member.name?.trim() ?? "";
  const email = member.email?.toLowerCase() ?? "";
  return { name, email, active: Boolean(member.active) };
}

// src/accounts/normalize.ts
export function normalizeAccountOwner(owner: ApiOwner) {
  const name = owner.name?.trim() ?? "";
  const email = owner.email?.toLowerCase() ?? "";
  return { name, email, active: Boolean(owner.active) };
}
```

## Usually ignored

```ts
export function getUser(id: string) {
  return loadUser(id);
}
```

Pass-through wrappers are excluded, and a duplicate that only appears in 2 files is below the reporting threshold.

## Scoring

Each duplicate cluster adds `1.25 + 0.5 * (fileCount - 3)` for the current file, capped at `6`.
