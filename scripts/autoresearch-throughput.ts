import { access } from "node:fs/promises";
import { performance } from "node:perf_hooks";
import path from "node:path";
import { DEFAULT_CONFIG } from "../src/config";
import { analyzeRepository } from "../src/core/engine";
import { createDefaultRegistry } from "../src/default-registry";

const defaultRepos = [
  "benchmarks/.cache/checkouts/known-ai-vs-solid-oss/agent-ci",
  "benchmarks/.cache/checkouts/known-ai-vs-solid-oss/umami",
  "benchmarks/.cache/checkouts/known-ai-vs-solid-oss/astro",
  "benchmarks/.cache/checkouts/known-ai-vs-solid-oss/openclaw",
];

async function assertExists(targetPath: string): Promise<void> {
  try {
    await access(targetPath);
  } catch {
    throw new Error(`Missing benchmark repo: ${targetPath}`);
  }
}

const repoArgs = process.argv.slice(2);
const repoPaths = repoArgs.length > 0 ? repoArgs : defaultRepos;
const registry = createDefaultRegistry();

let totalMs = 0;
let totalFiles = 0;
let totalFindings = 0;
let totalScore = 0;

for (const repoPath of repoPaths) {
  const absolutePath = path.resolve(repoPath);
  await assertExists(absolutePath);

  const startedAt = performance.now();
  const result = await analyzeRepository(absolutePath, DEFAULT_CONFIG, registry);
  const elapsedMs = performance.now() - startedAt;

  totalMs += elapsedMs;
  totalFiles += result.summary.fileCount;
  totalFindings += result.summary.findingCount;
  totalScore += result.summary.repoScore;

  console.log(
    [
      "SCAN",
      `repo=${path.basename(absolutePath)}`,
      `ms=${elapsedMs.toFixed(3)}`,
      `files=${result.summary.fileCount}`,
      `findings=${result.summary.findingCount}`,
      `score=${result.summary.repoScore.toFixed(2)}`,
    ].join(" "),
  );
}

console.log(`METRIC total_ms=${totalMs.toFixed(3)}`);
console.log(`METRIC total_files=${totalFiles}`);
console.log(`METRIC total_findings=${totalFindings}`);
console.log(`METRIC total_score=${totalScore.toFixed(2)}`);
