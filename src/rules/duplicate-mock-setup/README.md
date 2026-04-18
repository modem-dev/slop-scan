# tests.duplicate-mock-setup

Flags repeated test mock/setup shapes across several test files.

- **Family:** `tests`
- **Severity:** `medium`
- **Scope:** `file`
- **Requires:** `repo.testMockDuplication`

## How it works

A repo-level fact fingerprints statement-level mock/setup shapes inside test files.
The rule reports a file when one of those shapes appears in **3 or more test files**.

Generic labels such as `vi.mock`, `jest.mock`, `vi.spyOn`, `jest.spyOn`, `sinon.stub`, and `sinon.spy` are filtered out so routine framework setup does not dominate the signal.
Cleanup-only statements like `mockReset` and `mockClear` are also ignored.

## Flagged example

```ts
// users.test.ts
vi.mocked(api.fetchUser).mockResolvedValue({ id: 1, name: "Ada" });

// teams.test.ts
vi.mocked(api.fetchUser).mockResolvedValue({ id: 2, name: "Lin" });

// accounts.test.ts
vi.mocked(api.fetchUser).mockResolvedValue({ id: 3, name: "Max" });
```

Once that same setup shape appears in 3 files, each participating file gets a finding.

## Usually ignored

```ts
vi.mock("./client");
vi.clearAllMocks();
```

Generic mock declarations and cleanup-only statements do not contribute to this rule.

## Scoring

Each duplicate setup cluster adds `1 + 0.5 * (fileCount - 2)` for the current file, capped at `5`.
