import { describe, expect, test } from "bun:test";
import path from "node:path";
import { parseCliArgs, run } from "../src/cli";
import { analyzeRepository } from "../src/core/engine";
import { createDefaultRegistry } from "../src/default-registry";
import { DEFAULT_CONFIG } from "../src/config";

const MIXED_FIXTURE = path.join(process.cwd(), "tests", "fixtures", "repos", "mixed");

describe("parseCliArgs --ignore", () => {
  test("extracts single --ignore flag", () => {
    const args = parseCliArgs(["scan", ".", "--ignore", "tests/**"]);
    expect(args.ignore).toEqual(["tests/**"]);
    expect(args.command).toBe("scan");
    expect(args.target).toBe(".");
  });

  test("extracts multiple --ignore flags", () => {
    const args = parseCliArgs(["scan", ".", "--ignore", "tests/**", "--ignore", "*.generated.*"]);
    expect(args.ignore).toEqual(["tests/**", "*.generated.*"]);
  });

  test("preserves other flags", () => {
    const args = parseCliArgs(["scan", ".", "--json", "--fail-on-findings", "--ignore", "dist/**"]);
    expect(args.ignore).toEqual(["dist/**"]);
    expect(args.json).toBe(true);
    expect(args.lint).toBe(false);
    expect(args.failOnFindings).toBe(true);
  });

  test("defaults to empty ignores when none provided", () => {
    const args = parseCliArgs(["scan", ".", "--json"]);
    expect(args.ignore).toEqual([]);
  });

  test("parses help flag", () => {
    expect(parseCliArgs(["--help"]).help).toBe(true);
    expect(parseCliArgs(["-h"]).help).toBe(true);
    expect(parseCliArgs(["scan", "."]).help).toBe(false);
  });

  test("rejects extra scan positionals", () => {
    expect(() => parseCliArgs(["scan", ".", "extra"])).toThrow(
      "The scan command accepts at most one target path.",
    );
  });
});

describe("--ignore CLI integration", () => {
  test("ignoring a directory excludes its files from results", async () => {
    const registry = createDefaultRegistry();

    const baseline = await analyzeRepository(MIXED_FIXTURE, DEFAULT_CONFIG, registry);
    const baselinePaths = baseline.files.map((f) => f.path);
    expect(baselinePaths.some((p) => p.startsWith("src/slop/"))).toBe(true);

    const config = { ...DEFAULT_CONFIG, ignores: [...DEFAULT_CONFIG.ignores, "src/slop/**"] };
    const filtered = await analyzeRepository(MIXED_FIXTURE, config, registry);
    const filteredPaths = filtered.files.map((f) => f.path);
    expect(filteredPaths.some((p) => p.startsWith("src/slop/"))).toBe(false);
    expect(filteredPaths.some((p) => p.startsWith("src/core/"))).toBe(true);
  });

  test("ignoring a specific file excludes only that file", async () => {
    const registry = createDefaultRegistry();

    const config = {
      ...DEFAULT_CONFIG,
      ignores: [...DEFAULT_CONFIG.ignores, "src/core/math.ts"],
    };
    const result = await analyzeRepository(MIXED_FIXTURE, config, registry);
    const paths = result.files.map((f) => f.path);
    expect(paths).not.toContain("src/core/math.ts");
    expect(paths).toContain("src/core/index.ts");
  });

  test("CLI --ignore merges with config ignores", async () => {
    const exitCode = await run(["scan", MIXED_FIXTURE, "--json", "--ignore", "src/slop/**"]);
    expect(exitCode).toBe(0);
  });

  test("help text documents --ignore flag", async () => {
    const { formatHelp } = await import("../src/cli");
    const help = formatHelp();
    expect(help).toContain("--ignore");
    expect(help).toContain("<pattern>");
  });
});
