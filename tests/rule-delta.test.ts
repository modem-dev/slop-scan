import { describe, expect, test } from "bun:test";
import type { ProviderContext } from "../src/core/types";
import { createFindingDeltaIdentity, createPathDeltaIdentity } from "../src/delta-identity";
import { buildFindingDeltaIdentity, delta } from "../src/rule-delta";

const context = {
  scope: "file",
  file: {
    path: "src/example.ts",
    absolutePath: "/tmp/src/example.ts",
    extension: ".ts",
    lineCount: 10,
    logicalLineCount: 8,
    languageId: "javascript-like",
  },
  runtime: {
    rootDir: "/tmp",
    config: { ignores: [], rules: {}, thresholds: {}, overrides: [] },
    files: [],
    directories: [],
    store: {
      getRepoFact() {
        return undefined;
      },
      getDirectoryFact() {
        return undefined;
      },
      getFileFact() {
        return undefined;
      },
      hasRepoFact() {
        return false;
      },
      hasDirectoryFact() {
        return false;
      },
      hasFileFact() {
        return false;
      },
    },
  },
} satisfies ProviderContext;

describe("rule delta strategies", () => {
  test("byPath reuses the stable path fingerprint contract", () => {
    const finding = {
      ruleId: "local/contains-word",
      family: "local",
      severity: "weak" as const,
      scope: "file" as const,
      path: "src/example.ts",
      message: "Found danger in file text",
      evidence: ["danger"],
      score: 1,
      locations: [{ path: "src/example.ts", line: 7, column: 1 }],
    };

    expect(
      buildFindingDeltaIdentity("local/contains-word", finding, context, delta.byPath()),
    ).toEqual(createPathDeltaIdentity("local/contains-word", "src/example.ts", 7));
  });

  test("auto mode emits one occurrence per location when a grouped finding spans multiple sites", () => {
    const finding = {
      ruleId: "local/multi-hit",
      family: "local",
      severity: "weak" as const,
      scope: "file" as const,
      path: "src/example.ts",
      message: "Found 2 hits",
      evidence: ["first", "second"],
      score: 1,
      locations: [
        { path: "src/example.ts", line: 3, column: 1 },
        { path: "src/example.ts", line: 9, column: 1 },
      ],
    };

    expect(buildFindingDeltaIdentity("local/multi-hit", finding, context, delta.auto())).toEqual(
      createFindingDeltaIdentity("local/multi-hit", [
        {
          path: "src/example.ts",
          line: 3,
          column: 1,
          occurrenceKey: { path: "src/example.ts", line: 3, column: 1 },
        },
        {
          path: "src/example.ts",
          line: 9,
          column: 1,
          occurrenceKey: { path: "src/example.ts", line: 9, column: 1 },
        },
      ]),
    );
  });

  test("semantic mode lets rules centralize custom matching logic outside evaluate", () => {
    const finding = {
      ruleId: "local/clustered-duplicates",
      family: "local",
      severity: "medium" as const,
      scope: "file" as const,
      path: "src/example.ts",
      message: "Found 1 duplicate cluster",
      evidence: ["normalizeUser repeated elsewhere"],
      score: 2,
      locations: [{ path: "src/example.ts", line: 5, column: 1 }],
    };

    expect(
      buildFindingDeltaIdentity(
        "local/clustered-duplicates",
        finding,
        context,
        delta.bySemantic(() => [
          {
            groupKey: { clusterFingerprint: "dup-cluster" },
            occurrenceKey: {
              clusterFingerprint: "dup-cluster",
              path: "src/example.ts",
            },
            path: "src/example.ts",
            line: 5,
          },
        ]),
      ),
    ).toEqual(
      createFindingDeltaIdentity("local/clustered-duplicates", [
        {
          groupKey: { clusterFingerprint: "dup-cluster" },
          occurrenceKey: {
            clusterFingerprint: "dup-cluster",
            path: "src/example.ts",
          },
          path: "src/example.ts",
          line: 5,
        },
      ]),
    );
  });
});
