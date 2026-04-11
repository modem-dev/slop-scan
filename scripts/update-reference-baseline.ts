import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  DEFAULT_BENCHMARK_SET_PATH,
  loadBenchmarkSet,
  resolveProjectPath,
} from "../src/benchmarks/manifest";
import type { BenchmarkSnapshot } from "../src/benchmarks/types";
import { getOption } from "./lib/get-option";

interface ReferenceBaselinePayload {
  benchmarkSetId: string;
  benchmarkSetName: string;
  generatedAt: string;
  analyzerVersion: string;
  configMode: "default";
  cohorts: {
    explicitAi: {
      label: string;
      repoCount: number;
      medians: BenchmarkSnapshot["cohorts"]["explicit-ai"]["medians"];
      blendedScoreMedian: number | null;
    };
    matureOss: {
      label: string;
      repoCount: number;
      medians: BenchmarkSnapshot["cohorts"]["mature-oss"]["medians"];
      blendedScoreMedian: number | null;
    };
  };
}

function renderReferenceBaseline(payload: ReferenceBaselinePayload): string {
  const explicitAi = payload.cohorts.explicitAi;
  const matureOss = payload.cohorts.matureOss;

  return [
    'import type { NormalizedMetrics } from "./core/types";',
    "",
    "export interface ReferenceBenchmarkCohort {",
    "  label: string;",
    "  repoCount: number;",
    "  medians: NormalizedMetrics;",
    "  blendedScoreMedian: number | null;",
    "}",
    "",
    "export interface ReferenceBaseline {",
    "  benchmarkSetId: string;",
    "  benchmarkSetName: string;",
    "  generatedAt: string;",
    "  analyzerVersion: string;",
    '  configMode: "default";',
    "  cohorts: {",
    "    explicitAi: ReferenceBenchmarkCohort;",
    "    matureOss: ReferenceBenchmarkCohort;",
    "  };",
    "}",
    "",
    "export const DEFAULT_REFERENCE_BASELINE = {",
    `  benchmarkSetId: ${JSON.stringify(payload.benchmarkSetId)},`,
    `  benchmarkSetName: ${JSON.stringify(payload.benchmarkSetName)},`,
    `  generatedAt: ${JSON.stringify(payload.generatedAt)},`,
    `  analyzerVersion: ${JSON.stringify(payload.analyzerVersion)},`,
    `  configMode: ${JSON.stringify(payload.configMode)},`,
    "  cohorts: {",
    "    explicitAi: {",
    `      label: ${JSON.stringify(explicitAi.label)},`,
    `      repoCount: ${explicitAi.repoCount},`,
    "      medians: {",
    renderMetrics(explicitAi.medians, "        "),
    "      },",
    `      blendedScoreMedian: ${formatNullableNumber(explicitAi.blendedScoreMedian)},`,
    "    },",
    "    matureOss: {",
    `      label: ${JSON.stringify(matureOss.label)},`,
    `      repoCount: ${matureOss.repoCount},`,
    "      medians: {",
    renderMetrics(matureOss.medians, "        "),
    "      },",
    `      blendedScoreMedian: ${formatNullableNumber(matureOss.blendedScoreMedian)},`,
    "    },",
    "  },",
    "} satisfies ReferenceBaseline;",
    "",
  ].join("\n");
}

function formatNullableNumber(value: number | null): string {
  return value === null ? "null" : String(value);
}

function renderMetrics(
  metrics: BenchmarkSnapshot["cohorts"]["explicit-ai"]["medians"],
  indent: string,
): string {
  return [
    `${indent}scorePerFile: ${formatNullableNumber(metrics.scorePerFile)},`,
    `${indent}scorePerKloc: ${formatNullableNumber(metrics.scorePerKloc)},`,
    `${indent}scorePerFunction: ${formatNullableNumber(metrics.scorePerFunction)},`,
    `${indent}findingsPerFile: ${formatNullableNumber(metrics.findingsPerFile)},`,
    `${indent}findingsPerKloc: ${formatNullableNumber(metrics.findingsPerKloc)},`,
    `${indent}findingsPerFunction: ${formatNullableNumber(metrics.findingsPerFunction)},`,
  ].join("\n");
}

const manifestPath = getOption(process.argv.slice(2), "--manifest", DEFAULT_BENCHMARK_SET_PATH);
const benchmarkSet = await loadBenchmarkSet(manifestPath);
const snapshotPath = resolveProjectPath(benchmarkSet.artifacts.snapshotPath);
const targetPath = resolveProjectPath("src/reference-baseline.ts");
const snapshot = JSON.parse(await readFile(snapshotPath, "utf8")) as BenchmarkSnapshot;

if (snapshot.benchmarkSetId !== benchmarkSet.id) {
  throw new Error(
    `Benchmark snapshot id mismatch: expected ${benchmarkSet.id}, got ${snapshot.benchmarkSetId}`,
  );
}

const baseline: ReferenceBaselinePayload = {
  benchmarkSetId: snapshot.benchmarkSetId,
  benchmarkSetName: snapshot.benchmarkSetName,
  generatedAt: snapshot.generatedAt,
  analyzerVersion: snapshot.analyzerVersion,
  configMode: snapshot.configMode,
  cohorts: {
    explicitAi: {
      label: "Explicit AI median",
      repoCount: snapshot.cohorts["explicit-ai"].repoCount,
      medians: snapshot.cohorts["explicit-ai"].medians,
      blendedScoreMedian: snapshot.cohorts["explicit-ai"].blendedScoreMedian,
    },
    matureOss: {
      label: "Mature OSS median",
      repoCount: snapshot.cohorts["mature-oss"].repoCount,
      medians: snapshot.cohorts["mature-oss"].medians,
      blendedScoreMedian: snapshot.cohorts["mature-oss"].blendedScoreMedian,
    },
  },
};

await mkdir(path.dirname(targetPath), { recursive: true });
await writeFile(targetPath, renderReferenceBaseline(baseline));

console.log(`Wrote reference baseline to ${targetPath}`);
