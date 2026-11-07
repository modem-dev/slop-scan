import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import type { AnalysisResult } from "./core/types";
import { analyzeRepository } from "./core/engine";
import { createDefaultRegistry } from "./default-registry";
import { diffReports, formatDeltaText, parseFailOn, shouldFailDelta } from "./delta";
import { loadConfigFile } from "./config";
import { buildReportMetadata } from "./report-metadata";

/**
 * Keeps the help text centralized so scan/delta usage stays consistent across the CLI and tests.
 */
export function formatHelp(): string {
  return [
    "slop-scan",
    "",
    "Usage:",
    "  slop-scan scan [path] [options]",
    "  slop-scan delta [base-path] [head-path] [options]",
    "  slop-scan --help",
    "",
    "Shared options:",
    "  -h, --help              Show help",
    "  --json                  Output scan or delta results as JSON",
    "  --ignore <pattern>      Glob pattern to ignore for scanned paths (repeatable)",
    "",
    "Scan options:",
    "  --lint                  Output scan results in lint format",
    "  --fail-on-findings      Exit non-zero when scan findings are reported",
    "",
    "Delta options:",
    "  --base <path>           Base repo/worktree to compare",
    "  --head <path>           Head repo/worktree to compare (defaults to .)",
    "  --base-report <file>    Read the base scan report from JSON",
    "  --head-report <file>    Read the head scan report from JSON",
    "  --fail-on <statuses>    Exit non-zero on added,resolved,worsened,improved,any",
    "",
    "Examples:",
    "  slop-scan scan .",
    "  slop-scan scan ./my-project --lint",
    "  slop-scan scan ./my-project --lint --fail-on-findings",
    '  slop-scan scan ./my-project --ignore "tests/**" --ignore "*.generated.*"',
    "  slop-scan delta ../main .",
    "  slop-scan delta --base-report base.json --head-report head.json --json",
    "  slop-scan delta --base ../main --fail-on added,worsened",
  ].join("\n");
}

export interface CliArgs {
  help: boolean;
  json: boolean;
  lint: boolean;
  failOnFindings: boolean;
  ignore: string[];
  command: string | undefined;
  target: string;
  base?: string;
  head?: string;
  baseReport?: string;
  headReport?: string;
  failOn?: string;
}

/**
 * Accepts plain JSON-like objects when hydrating saved reports from disk.
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Executes a scan exactly as the CLI would, then attaches metadata needed by downstream delta consumers.
 */
async function scanTarget(targetPath: string, ignore: string[]): Promise<AnalysisResult> {
  const rootDir = path.resolve(targetPath);
  const loadedConfig = await loadConfigFile(rootDir);
  const config = loadedConfig.config;

  if (ignore.length > 0) {
    config.ignores = [...config.ignores, ...ignore];
  }

  const registry = createDefaultRegistry();
  for (const plugin of loadedConfig.plugins) {
    registry.registerPlugin(plugin.namespace, plugin.plugin);
  }

  const result = await analyzeRepository(rootDir, config, registry);
  result.metadata = buildReportMetadata(config, loadedConfig.plugins);
  return result;
}

/**
 * Hydrates a previously emitted scan report and rejects obviously unrelated JSON before diffing.
 */
async function readReport(reportPath: string): Promise<AnalysisResult> {
  const resolvedPath = path.resolve(reportPath);
  const raw = JSON.parse(await readFile(resolvedPath, "utf8")) as unknown;

  if (!isPlainObject(raw) || !isPlainObject(raw.summary) || !Array.isArray(raw.findings)) {
    throw new Error(`Invalid slop-scan report: ${reportPath}`);
  }

  return raw as AnalysisResult;
}

/**
 * Normalizes the two delta input modes so the diff engine always receives in-memory reports.
 */
async function resolveDeltaInput(
  reportPath: string | undefined,
  targetPath: string | undefined,
  ignore: string[],
  label: "base" | "head",
): Promise<AnalysisResult> {
  if (reportPath && targetPath) {
    throw new Error(`Pass either --${label} or --${label}-report, not both.`);
  }

  if (reportPath) {
    return readReport(reportPath);
  }

  if (targetPath) {
    return scanTarget(targetPath, ignore);
  }

  throw new Error(`Pass either --${label} <path> or --${label}-report <file>.`);
}

/**
 * Treats delta positionals as sugar over --base/--head while keeping scan strict about a single target.
 */
export function parseCliArgs(argv: string[]): CliArgs {
  const { values, positionals } = parseArgs({
    args: argv,
    options: {
      help: { type: "boolean", short: "h", default: false },
      json: { type: "boolean", default: false },
      lint: { type: "boolean", default: false },
      "fail-on-findings": { type: "boolean", default: false },
      ignore: { type: "string", multiple: true, default: [] },
      base: { type: "string" },
      head: { type: "string" },
      "base-report": { type: "string" },
      "head-report": { type: "string" },
      "fail-on": { type: "string" },
    },
    allowPositionals: true,
    strict: false,
  });

  const [command, firstPositional, secondPositional, ...extraPositionals] = positionals;

  if (extraPositionals.length > 0) {
    throw new Error(`Unexpected extra positional arguments: ${extraPositionals.join(" ")}`);
  }

  if (command === "delta") {
    if (firstPositional && values.base) {
      throw new Error("Pass the base path either positionally or with --base, not both.");
    }

    if (secondPositional && values.head) {
      throw new Error("Pass the head path either positionally or with --head, not both.");
    }
  }

  if (command === "scan" && secondPositional) {
    throw new Error("The scan command accepts at most one target path.");
  }

  const base = values.base ?? (command === "delta" ? firstPositional : undefined);
  const head =
    values.head ??
    (command === "delta"
      ? (secondPositional ?? (values["head-report"] ? undefined : "."))
      : undefined);

  return {
    help: values.help,
    json: values.json,
    lint: values.lint,
    failOnFindings: values["fail-on-findings"],
    ignore: values.ignore,
    command,
    target: command === "scan" ? (firstPositional ?? ".") : ".",
    base,
    head,
    baseReport: values["base-report"],
    headReport: values["head-report"],
    failOn: values["fail-on"],
  };
}

/**
 * Routes between scan and delta flows and keeps command-specific flag validation near the entrypoint.
 */
export async function run(argv: string[]): Promise<number> {
  const args = parseCliArgs(argv);

  if (args.help || argv.length === 0) {
    console.log(formatHelp());
    return 0;
  }

  if (args.command === "scan") {
    if (args.json && args.lint) {
      console.error("--json and --lint cannot be used together.");
      return 1;
    }

    if (args.base || args.head || args.baseReport || args.headReport || args.failOn) {
      console.error("Delta-only flags cannot be used with the scan command.");
      return 1;
    }

    const result = await scanTarget(args.target, args.ignore);
    const reporter = createDefaultRegistry().getReporter(
      args.json ? "json" : args.lint ? "lint" : "text",
    );
    const output = await reporter.render(result);

    if (output.length > 0) {
      console.log(output);
    }
    return args.failOnFindings && result.summary.findingCount > 0 ? 1 : 0;
  }

  if (args.command === "delta") {
    if (args.lint) {
      console.error("--lint is only supported by the scan command.");
      return 1;
    }

    if (args.failOnFindings) {
      console.error("--fail-on-findings is only supported by the scan command.");
      return 1;
    }

    if (!args.base && !args.baseReport) {
      console.error("Pass either --base <path> or --base-report <file>.");
      return 1;
    }

    const [baseReport, headReport] = await Promise.all([
      resolveDeltaInput(args.baseReport, args.base, args.ignore, "base"),
      resolveDeltaInput(args.headReport, args.head, args.ignore, "head"),
    ]);
    const delta = diffReports(baseReport, headReport);
    const output = args.json ? JSON.stringify(delta, null, 2) : formatDeltaText(delta);

    if (output.length > 0) {
      console.log(output);
    }

    const failOn = args.failOn ? parseFailOn(args.failOn) : [];
    return shouldFailDelta(delta, failOn) ? 1 : 0;
  }

  console.error(`Unknown command: ${args.command}`);
  console.error("Run with --help to see supported commands.");
  return 1;
}

if (import.meta.main) {
  const exitCode = await run(process.argv.slice(2));
  process.exit(exitCode);
}
