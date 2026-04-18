import { spawnSync } from "node:child_process";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import packageJson from "../package.json";
import {
  createBenchmarkHistoryLatestSummary,
  createBenchmarkHistoryPoints,
  mergeHistoryPoint,
  parseHistoryPoints,
  resolveBenchmarkHistoryArtifacts,
  serializeHistoryPoints,
  type BenchmarkedHistoryAnalysis,
  type BenchmarkRepoResolution,
} from "../src/benchmarks/history";
import { parseLsRemoteDefaultBranch } from "../src/benchmarks/latest-ref";
import {
  DEFAULT_BENCHMARK_SET_PATH,
  loadBenchmarkSet,
  resolveProjectPath,
} from "../src/benchmarks/manifest";
import { renderBenchmarkHistoryReport } from "../src/benchmarks/history-report";
import type { BenchmarkRepoSpec, BenchmarkSnapshot } from "../src/benchmarks/types";
import { DEFAULT_CONFIG } from "../src/config";
import { analyzeRepository } from "../src/core/engine";
import { createDefaultRegistry } from "../src/default-registry";
import { getOption } from "./lib/get-option";

function run(command: string, args: string[], cwd?: string): string {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.status !== 0) {
    throw new Error(
      [`Command failed: ${command} ${args.join(" ")}`, result.stdout, result.stderr]
        .filter(Boolean)
        .join("\n"),
    );
  }

  return result.stdout.trim();
}

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readTextIfExists(targetPath: string): Promise<string> {
  return (await pathExists(targetPath)) ? await readFile(targetPath, "utf8") : "";
}

async function writeIfChanged(targetPath: string, content: string): Promise<boolean> {
  const currentContent = await readTextIfExists(targetPath);
  if (currentContent === content) {
    return false;
  }

  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, content);
  return true;
}

function resolveLatestRef(spec: BenchmarkRepoSpec): BenchmarkRepoResolution {
  const output = run("git", ["ls-remote", "--symref", spec.url, "HEAD"]);
  const parsed = parseLsRemoteDefaultBranch(output);
  return {
    repoId: spec.id,
    defaultBranch: parsed.defaultBranch,
    ref: parsed.ref,
  };
}

async function prepareCheckout(
  checkoutsDir: string,
  spec: BenchmarkRepoSpec,
  resolution: BenchmarkRepoResolution,
): Promise<string> {
  const checkoutPath = path.join(checkoutsDir, spec.id);
  const gitPath = path.join(checkoutPath, ".git");

  if (!(await pathExists(gitPath))) {
    console.log(`cloning ${spec.repo}`);
    run("git", ["clone", "--filter=blob:none", "--no-checkout", spec.url, checkoutPath]);
  }

  run("git", ["remote", "set-url", "origin", spec.url], checkoutPath);
  run("git", ["fetch", "--force", "--prune", "--filter=blob:none", "origin"], checkoutPath);
  run("git", ["checkout", "--force", "--detach", resolution.ref], checkoutPath);
  run("git", ["reset", "--hard", resolution.ref], checkoutPath);
  run("git", ["clean", "-fdx"], checkoutPath);

  const actualRef = run("git", ["rev-parse", "HEAD"], checkoutPath);
  if (actualRef !== resolution.ref) {
    throw new Error(
      `Latest ref mismatch for ${spec.id}: expected ${resolution.ref}, got ${actualRef}`,
    );
  }

  return checkoutPath;
}

const manifestPath = getOption(process.argv.slice(2), "--manifest", DEFAULT_BENCHMARK_SET_PATH);
const recordedAt = getOption(process.argv.slice(2), "--recorded-at", new Date().toISOString());
const benchmarkSet = await loadBenchmarkSet(manifestPath);
const baselineSnapshotDisplayPath = benchmarkSet.artifacts.snapshotPath;
const baselineSnapshotPath = resolveProjectPath(baselineSnapshotDisplayPath);

if (!(await pathExists(baselineSnapshotPath))) {
  throw new Error(
    `Missing pinned benchmark snapshot at ${baselineSnapshotPath}. Run bun run benchmark:update first.`,
  );
}

const baselineSnapshot = JSON.parse(
  await readFile(baselineSnapshotPath, "utf8"),
) as BenchmarkSnapshot;
const artifacts = resolveBenchmarkHistoryArtifacts(benchmarkSet.id);
const checkoutsDir = resolveProjectPath(artifacts.checkoutsDir);
const historyDir = resolveProjectPath(artifacts.historyDir);
const latestPath = resolveProjectPath(artifacts.latestPath);
const reportPath = resolveProjectPath(artifacts.reportPath);
const analyzerCommit = run("git", ["rev-parse", "HEAD"], process.cwd());
const registry = createDefaultRegistry();
const analyses: BenchmarkedHistoryAnalysis[] = [];

await mkdir(checkoutsDir, { recursive: true });
await mkdir(historyDir, { recursive: true });

for (const repo of benchmarkSet.repos) {
  console.log(`\n==> resolving ${repo.id} (${repo.repo})`);
  const resolution = resolveLatestRef(repo);
  console.log(`default branch ${resolution.defaultBranch} @ ${resolution.ref.slice(0, 7)}`);
  const checkoutPath = await prepareCheckout(checkoutsDir, repo, resolution);

  console.log(`scanning ${repo.id}`);
  const result = await analyzeRepository(checkoutPath, DEFAULT_CONFIG, registry);
  analyses.push({ spec: repo, resolution, result });
}

const points = createBenchmarkHistoryPoints(
  benchmarkSet,
  analyses,
  baselineSnapshot,
  baselineSnapshotDisplayPath,
  packageJson.version,
  analyzerCommit,
  recordedAt,
);

const updatedPointSets = new Map<string, ReturnType<typeof parseHistoryPoints>>();
let changedFiles = 0;

for (const point of points) {
  const historyPath = path.join(historyDir, `${point.repoId}.jsonl`);
  const existingPoints = parseHistoryPoints(await readTextIfExists(historyPath));
  const updatedPoints = mergeHistoryPoint(existingPoints, point);
  updatedPointSets.set(point.repoId, updatedPoints);

  if (await writeIfChanged(historyPath, serializeHistoryPoints(updatedPoints))) {
    changedFiles += 1;
  }
}

const allPoints = [...updatedPointSets.values()].flat();
const summary = createBenchmarkHistoryLatestSummary(
  benchmarkSet,
  allPoints,
  baselineSnapshot,
  baselineSnapshotDisplayPath,
);
const report = renderBenchmarkHistoryReport(benchmarkSet, summary);

if (await writeIfChanged(latestPath, `${JSON.stringify(summary, null, 2)}\n`)) {
  changedFiles += 1;
}

if (await writeIfChanged(reportPath, `${report}\n`)) {
  changedFiles += 1;
}

console.log(`\nUpdated ${points.length} repo histories (${changedFiles} file changes).`);
console.log(`History dir: ${historyDir}`);
console.log(`Latest summary: ${latestPath}`);
console.log(`Report: ${reportPath}`);
