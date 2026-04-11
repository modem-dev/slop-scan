import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { BenchmarkSnapshot } from "../src/benchmarks/types";
import type { AnalysisResult, NormalizedMetrics } from "../src/core/types";
import { DEFAULT_REFERENCE_BASELINE } from "../src/reference-baseline";
import { textReporter } from "../src/reporters/text";

function doubleMetric(value: number | null): number | null {
  return value === null ? null : value * 2;
}

function createResultWithDoubleMatureMedian(): AnalysisResult {
  const matureMedian = DEFAULT_REFERENCE_BASELINE.cohorts.matureOss.medians;
  const normalized: NormalizedMetrics = {
    scorePerFile: doubleMetric(matureMedian.scorePerFile),
    scorePerKloc: doubleMetric(matureMedian.scorePerKloc),
    scorePerFunction: doubleMetric(matureMedian.scorePerFunction),
    findingsPerFile: doubleMetric(matureMedian.findingsPerFile),
    findingsPerKloc: doubleMetric(matureMedian.findingsPerKloc),
    findingsPerFunction: doubleMetric(matureMedian.findingsPerFunction),
  };

  return {
    rootDir: "/tmp/example",
    config: { ignores: [], rules: {}, thresholds: {} },
    summary: {
      fileCount: 10,
      directoryCount: 1,
      findingCount: 2,
      repoScore: 10,
      physicalLineCount: 100,
      logicalLineCount: 80,
      functionCount: 20,
      normalized,
    },
    files: [],
    directories: [],
    findings: [],
    fileScores: [],
    directoryScores: [],
    repoScore: 10,
  };
}

describe("reference context", () => {
  test("generated baseline matches the pinned benchmark snapshot medians", () => {
    const snapshotPath = path.join(
      process.cwd(),
      "benchmarks",
      "results",
      "known-ai-vs-solid-oss.json",
    );
    const snapshot = JSON.parse(readFileSync(snapshotPath, "utf8")) as BenchmarkSnapshot;

    expect(DEFAULT_REFERENCE_BASELINE.benchmarkSetId).toBe(snapshot.benchmarkSetId);
    expect(DEFAULT_REFERENCE_BASELINE.benchmarkSetName).toBe(snapshot.benchmarkSetName);
    expect(DEFAULT_REFERENCE_BASELINE.generatedAt).toBe(snapshot.generatedAt);
    expect(DEFAULT_REFERENCE_BASELINE.analyzerVersion).toBe(snapshot.analyzerVersion);
    expect(DEFAULT_REFERENCE_BASELINE.configMode).toBe(snapshot.configMode);
    expect(DEFAULT_REFERENCE_BASELINE.cohorts.explicitAi.repoCount).toBe(
      snapshot.cohorts["explicit-ai"].repoCount,
    );
    expect(DEFAULT_REFERENCE_BASELINE.cohorts.explicitAi.medians).toEqual(
      snapshot.cohorts["explicit-ai"].medians,
    );
    expect(DEFAULT_REFERENCE_BASELINE.cohorts.explicitAi.blendedScoreMedian).toBe(
      snapshot.cohorts["explicit-ai"].blendedScoreMedian,
    );
    expect(DEFAULT_REFERENCE_BASELINE.cohorts.matureOss.repoCount).toBe(
      snapshot.cohorts["mature-oss"].repoCount,
    );
    expect(DEFAULT_REFERENCE_BASELINE.cohorts.matureOss.medians).toEqual(
      snapshot.cohorts["mature-oss"].medians,
    );
    expect(DEFAULT_REFERENCE_BASELINE.cohorts.matureOss.blendedScoreMedian).toBe(
      snapshot.cohorts["mature-oss"].blendedScoreMedian,
    );
  });

  test("text reporter shows side-by-side benchmark context only when requested", () => {
    const result = createResultWithDoubleMatureMedian();
    const defaultOutput = textReporter.render(result) as string;
    const referenceOutput = textReporter.render(result, { reference: true }) as string;

    expect(defaultOutput).not.toContain("Reference context");
    expect(referenceOutput).toContain("Reference context");
    expect(referenceOutput).toContain("Metric");
    expect(referenceOutput).toContain("This repo");
    expect(referenceOutput).toContain("Mature median");
    expect(referenceOutput).toContain("AI median");
    expect(referenceOutput).toContain("score / file");
    expect(referenceOutput).toContain("2.00x");
  });
});
