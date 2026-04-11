import { describe, expect, test } from "bun:test";
import path from "node:path";
import { DEFAULT_CONFIG, loadConfig } from "../src/config";
import { formatHelp, parseCliArgs, run } from "../src/cli";

describe("project scaffold", () => {
  test("help text stays focused on usage", () => {
    expect(formatHelp()).toContain("slop-scan");
    expect(formatHelp()).toContain("scan");
    expect(formatHelp()).toContain("--lint");
    expect(formatHelp()).toContain("--ignore");
    expect(formatHelp()).toContain("--ref");
    expect(formatHelp()).toContain("--help");
    expect(formatHelp()).not.toContain("Development:");
    expect(formatHelp()).not.toContain("Implemented today:");
  });

  test("parses reference context flag", () => {
    expect(parseCliArgs(["scan", ".", "--ref"]).ref).toBe(true);
  });

  test("loadConfig returns defaults when config file is absent", async () => {
    const fixtureRoot = path.join(process.cwd(), "tests", "fixtures", "repos", "clean");
    const config = await loadConfig(fixtureRoot);
    expect(config).toEqual(DEFAULT_CONFIG);
  });

  test("scan command exits successfully", async () => {
    const fixtureRoot = path.join(process.cwd(), "tests", "fixtures", "repos", "clean");
    const exitCode = await run(["scan", fixtureRoot]);
    expect(exitCode).toBe(0);
  });

  test("--ref is limited to default text output", async () => {
    const fixtureRoot = path.join(process.cwd(), "tests", "fixtures", "repos", "clean");
    const exitCode = await run(["scan", fixtureRoot, "--json", "--ref"]);

    expect(exitCode).toBe(1);
  });
});
