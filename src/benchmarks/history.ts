import type { AnalysisResult, AnalysisSummary, Finding, NormalizedMetrics } from "../core/types";
import { buildMedianMetrics, computeRawBlendedScore, median, rescaleBlendedScore } from "./metrics";
import type {
  BenchmarkCohort,
  BenchmarkCohortSnapshot,
  BenchmarkRepoSpec,
  BenchmarkSet,
  BenchmarkSnapshot,
} from "./types";

export interface BenchmarkHistoryArtifacts {
  checkoutsDir: string;
  historyDir: string;
  latestPath: string;
  reportPath: string;
}

export interface BenchmarkRepoResolution {
  repoId: string;
  defaultBranch: string;
  ref: string;
}

export interface BenchmarkedHistoryAnalysis {
  spec: BenchmarkRepoSpec;
  resolution: BenchmarkRepoResolution;
  result: AnalysisResult;
}

export interface BenchmarkHistoryPoint {
  schemaVersion: 1;
  benchmarkSetId: string;
  benchmarkSetName: string;
  recordedAt: string;
  periodStart: string;
  repoId: string;
  repo: string;
  cohort: BenchmarkCohort;
  scanMode: "default-branch-as-of-recorded-at";
  defaultBranch: string;
  ref: string;
  analyzerVersion: string;
  analyzerCommit: string;
  summary: AnalysisSummary;
  blended: {
    vsCurrentCohort: number | null;
    vsPinnedBaseline: number | null;
  };
  ruleCounts: Record<string, number>;
}

export interface BenchmarkHistorySeriesPoint {
  periodStart: string;
  recordedAt: string;
  blendedVsCurrentCohort: number | null;
  blendedVsPinnedBaseline: number | null;
  repoScore: number;
  findingCount: number;
}

export interface BenchmarkHistoryDelta {
  blendedVsCurrentCohort: number | null;
  blendedVsPinnedBaseline: number | null;
  repoScore: number;
  findingCount: number;
  fileCount: number;
  logicalLineCount: number;
  functionCount: number;
  scorePerFile: number | null;
  scorePerKloc: number | null;
  scorePerFunction: number | null;
  findingsPerFile: number | null;
  findingsPerKloc: number | null;
  findingsPerFunction: number | null;
}

export interface BenchmarkHistoryPeak {
  periodStart: string;
  recordedAt: string;
  defaultBranch: string;
  ref: string;
  blendedVsPinnedBaseline: number | null;
}

export interface BenchmarkHistoryRepoSummary {
  id: string;
  repo: string;
  cohort: BenchmarkCohort;
  pointCount: number;
  firstRecordedAt: string;
  latestRecordedAt: string;
  first: BenchmarkHistoryPoint;
  previous: BenchmarkHistoryPoint | null;
  latest: BenchmarkHistoryPoint;
  highest: BenchmarkHistoryPeak | null;
  series: BenchmarkHistorySeriesPoint[];
  deltaFromFirst: BenchmarkHistoryDelta;
  deltaFromPrevious: BenchmarkHistoryDelta | null;
}

export interface BenchmarkHistoryBaseline {
  snapshotPath: string;
  generatedAt: string;
  analyzerVersion: string;
  matureOssMedians: NormalizedMetrics;
  matureOssRawBlendedMedian: number | null;
}

export interface BenchmarkHistoryAnalyzerSummary {
  version: string;
  commit: string;
  repoCount: number;
}

export interface BenchmarkHistoryLatestSummary {
  schemaVersion: 1;
  benchmarkSetId: string;
  benchmarkSetName: string;
  generatedAt: string;
  baseline: BenchmarkHistoryBaseline;
  analyzers: BenchmarkHistoryAnalyzerSummary[];
  cohorts: Record<BenchmarkCohort, BenchmarkCohortSnapshot>;
  repos: BenchmarkHistoryRepoSummary[];
}

function summarizeRuleCounts(findings: Finding[]): Record<string, number> {
  const counts = new Map<string, number>();

  for (const finding of findings) {
    counts.set(finding.ruleId, (counts.get(finding.ruleId) ?? 0) + 1);
  }

  return Object.fromEntries(
    [...counts.entries()].sort(
      (left, right) => right[1] - left[1] || left[0].localeCompare(right[0]),
    ),
  );
}

function sortPoints(points: BenchmarkHistoryPoint[]): BenchmarkHistoryPoint[] {
  return [...points].sort(
    (left, right) =>
      left.periodStart.localeCompare(right.periodStart) ||
      left.recordedAt.localeCompare(right.recordedAt) ||
      left.repoId.localeCompare(right.repoId),
  );
}

function difference(current: number | null, previous: number | null): number | null {
  return current !== null && previous !== null ? current - previous : null;
}

function buildDelta(
  current: BenchmarkHistoryPoint,
  previous: BenchmarkHistoryPoint,
): BenchmarkHistoryDelta {
  return {
    blendedVsCurrentCohort: difference(
      current.blended.vsCurrentCohort,
      previous.blended.vsCurrentCohort,
    ),
    blendedVsPinnedBaseline: difference(
      current.blended.vsPinnedBaseline,
      previous.blended.vsPinnedBaseline,
    ),
    repoScore: current.summary.repoScore - previous.summary.repoScore,
    findingCount: current.summary.findingCount - previous.summary.findingCount,
    fileCount: current.summary.fileCount - previous.summary.fileCount,
    logicalLineCount: current.summary.logicalLineCount - previous.summary.logicalLineCount,
    functionCount: current.summary.functionCount - previous.summary.functionCount,
    scorePerFile: difference(
      current.summary.normalized.scorePerFile,
      previous.summary.normalized.scorePerFile,
    ),
    scorePerKloc: difference(
      current.summary.normalized.scorePerKloc,
      previous.summary.normalized.scorePerKloc,
    ),
    scorePerFunction: difference(
      current.summary.normalized.scorePerFunction,
      previous.summary.normalized.scorePerFunction,
    ),
    findingsPerFile: difference(
      current.summary.normalized.findingsPerFile,
      previous.summary.normalized.findingsPerFile,
    ),
    findingsPerKloc: difference(
      current.summary.normalized.findingsPerKloc,
      previous.summary.normalized.findingsPerKloc,
    ),
    findingsPerFunction: difference(
      current.summary.normalized.findingsPerFunction,
      previous.summary.normalized.findingsPerFunction,
    ),
  };
}

function findHighestPinnedPoint(points: BenchmarkHistoryPoint[]): BenchmarkHistoryPoint | null {
  let highest: BenchmarkHistoryPoint | null = null;

  for (const point of points) {
    const value = point.blended.vsPinnedBaseline;
    if (value === null) {
      continue;
    }

    if (!highest) {
      highest = point;
      continue;
    }

    const highestValue = highest.blended.vsPinnedBaseline;
    if (highestValue === null || value > highestValue) {
      highest = point;
      continue;
    }

    if (value === highestValue && point.recordedAt > highest.recordedAt) {
      highest = point;
    }
  }

  return highest;
}

function buildCohortSnapshots(
  points: BenchmarkHistoryPoint[],
): Record<BenchmarkCohort, BenchmarkCohortSnapshot> {
  const cohorts: Record<BenchmarkCohort, BenchmarkHistoryPoint[]> = {
    "explicit-ai": [],
    "mature-oss": [],
  };

  for (const point of points) {
    cohorts[point.cohort].push(point);
  }

  const buildSnapshot = (cohortPoints: BenchmarkHistoryPoint[]): BenchmarkCohortSnapshot => ({
    repoCount: cohortPoints.length,
    medians: buildMedianMetrics(cohortPoints),
    blendedScoreMedian: median(
      cohortPoints
        .map((point) => point.blended.vsCurrentCohort)
        .filter((value): value is number => value !== null),
    ),
  });

  return {
    "explicit-ai": buildSnapshot(cohorts["explicit-ai"]),
    "mature-oss": buildSnapshot(cohorts["mature-oss"]),
  };
}

function buildAnalyzerSummary(points: BenchmarkHistoryPoint[]): BenchmarkHistoryAnalyzerSummary[] {
  const counts = new Map<string, BenchmarkHistoryAnalyzerSummary>();

  for (const point of points) {
    const key = `${point.analyzerVersion}:${point.analyzerCommit}`;
    const current = counts.get(key);
    if (current) {
      current.repoCount += 1;
      continue;
    }

    counts.set(key, {
      version: point.analyzerVersion,
      commit: point.analyzerCommit,
      repoCount: 1,
    });
  }

  return [...counts.values()].sort(
    (left, right) => right.repoCount - left.repoCount || left.version.localeCompare(right.version),
  );
}

export function resolveBenchmarkHistoryArtifacts(setId: string): BenchmarkHistoryArtifacts {
  return {
    checkoutsDir: `benchmarks/.cache/checkouts-history/${setId}`,
    historyDir: `benchmarks/history/${setId}`,
    latestPath: `benchmarks/history/${setId}/latest.json`,
    reportPath: `reports/${setId}-history.md`,
  };
}

/**
 * Bucket history points by UTC week so scheduled reruns for the same week overwrite the
 * existing datapoint instead of endlessly appending near-duplicates.
 */
export function getUtcWeekStartDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : new Date(input.getTime());

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${String(input)}`);
  }

  const day = date.getUTCDay();
  const mondayOffset = (day + 6) % 7;
  date.setUTCDate(date.getUTCDate() - mondayOffset);
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, 10);
}

export function derivePinnedBaseline(
  snapshot: BenchmarkSnapshot,
  snapshotPath: string,
): BenchmarkHistoryBaseline {
  const matureRepos = snapshot.repos.filter((repo) => repo.cohort === "mature-oss");
  const matureOssMedians = snapshot.cohorts["mature-oss"].medians;
  const matureOssRawBlendedMedian = median(
    matureRepos
      .map((repo) => computeRawBlendedScore(repo.summary.normalized, matureOssMedians))
      .filter((value): value is number => value !== null),
  );

  return {
    snapshotPath,
    generatedAt: snapshot.generatedAt,
    analyzerVersion: snapshot.analyzerVersion,
    matureOssMedians,
    matureOssRawBlendedMedian,
  };
}

/**
 * Build one history point per repo for a scheduled run.
 *
 * We intentionally store two blended scores:
 * - `vsCurrentCohort`: relative to the mature-OSS repos scanned in this same run, which is
 *   useful for weekly ranking.
 * - `vsPinnedBaseline`: relative to the frozen pinned benchmark snapshot, which is the cleaner
 *   time-series for trend charts.
 */
export function createBenchmarkHistoryPoints(
  set: BenchmarkSet,
  analyses: BenchmarkedHistoryAnalysis[],
  pinnedSnapshot: BenchmarkSnapshot,
  pinnedSnapshotPath: string,
  analyzerVersion: string,
  analyzerCommit: string,
  recordedAt = new Date().toISOString(),
): BenchmarkHistoryPoint[] {
  const periodStart = getUtcWeekStartDate(recordedAt);
  const currentMaturePoints = analyses.filter(({ spec }) => spec.cohort === "mature-oss");
  const currentMatureMedians = buildMedianMetrics(
    currentMaturePoints.map(({ result }) => ({ summary: result.summary })),
  );
  const currentMatureRawBaseline = median(
    currentMaturePoints
      .map(({ result }) => computeRawBlendedScore(result.summary.normalized, currentMatureMedians))
      .filter((value): value is number => value !== null),
  );
  const pinnedBaseline = derivePinnedBaseline(pinnedSnapshot, pinnedSnapshotPath);

  return analyses
    .map(({ spec, resolution, result }) => {
      if (resolution.repoId !== spec.id) {
        throw new Error(`Resolution mismatch for ${spec.id}: got ${resolution.repoId}`);
      }

      return {
        schemaVersion: 1,
        benchmarkSetId: set.id,
        benchmarkSetName: set.name,
        recordedAt,
        periodStart,
        repoId: spec.id,
        repo: spec.repo,
        cohort: spec.cohort,
        scanMode: "default-branch-as-of-recorded-at",
        defaultBranch: resolution.defaultBranch,
        ref: resolution.ref,
        analyzerVersion,
        analyzerCommit,
        summary: result.summary,
        blended: {
          vsCurrentCohort: rescaleBlendedScore(
            computeRawBlendedScore(result.summary.normalized, currentMatureMedians),
            currentMatureRawBaseline,
          ),
          vsPinnedBaseline: rescaleBlendedScore(
            computeRawBlendedScore(result.summary.normalized, pinnedBaseline.matureOssMedians),
            pinnedBaseline.matureOssRawBlendedMedian,
          ),
        },
        ruleCounts: summarizeRuleCounts(result.findings),
      } satisfies BenchmarkHistoryPoint;
    })
    .sort((left, right) => left.repoId.localeCompare(right.repoId));
}

export function parseHistoryPoints(raw: string): BenchmarkHistoryPoint[] {
  if (!raw.trim()) {
    return [];
  }

  return sortPoints(
    raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as BenchmarkHistoryPoint),
  );
}

export function serializeHistoryPoints(points: BenchmarkHistoryPoint[]): string {
  const orderedPoints = sortPoints(points);
  return orderedPoints.map((point) => JSON.stringify(point)).join("\n") + "\n";
}

/**
 * Keep at most one datapoint per repo per UTC week.
 * If a workflow is rerun in the same week, replace that week's point instead of appending.
 */
export function mergeHistoryPoint(
  existingPoints: BenchmarkHistoryPoint[],
  incomingPoint: BenchmarkHistoryPoint,
): BenchmarkHistoryPoint[] {
  const index = existingPoints.findIndex(
    (point) => point.periodStart === incomingPoint.periodStart,
  );

  if (index === -1) {
    return sortPoints([...existingPoints, incomingPoint]);
  }

  const existingPoint = existingPoints[index];
  if (existingPoint && JSON.stringify(existingPoint) === JSON.stringify(incomingPoint)) {
    return sortPoints(existingPoints);
  }

  const updatedPoints = [...existingPoints];
  updatedPoints[index] = incomingPoint;
  return sortPoints(updatedPoints);
}

/**
 * Summarize the history files by looking only at the latest point for each repo, then attach
 * deltas versus the previous point and the first point so reports can show short- and long-term
 * movement without reading every JSONL file downstream.
 */
export function createBenchmarkHistoryLatestSummary(
  set: BenchmarkSet,
  allPoints: BenchmarkHistoryPoint[],
  pinnedSnapshot: BenchmarkSnapshot,
  pinnedSnapshotPath: string,
): BenchmarkHistoryLatestSummary {
  const pointsByRepo = new Map<string, BenchmarkHistoryPoint[]>();

  for (const point of sortPoints(allPoints)) {
    const repoPoints = pointsByRepo.get(point.repoId) ?? [];
    repoPoints.push(point);
    pointsByRepo.set(point.repoId, repoPoints);
  }

  const repos = [...pointsByRepo.values()]
    .map((points) => {
      const sortedPoints = sortPoints(points);
      const first = sortedPoints[0];
      const latest = sortedPoints.at(-1);
      const previous = sortedPoints.length > 1 ? (sortedPoints.at(-2) ?? null) : null;
      const highest = findHighestPinnedPoint(sortedPoints);

      if (!first || !latest) {
        throw new Error("History summary received an empty repo point set");
      }

      return {
        id: latest.repoId,
        repo: latest.repo,
        cohort: latest.cohort,
        pointCount: sortedPoints.length,
        firstRecordedAt: first.recordedAt,
        latestRecordedAt: latest.recordedAt,
        first,
        previous,
        latest,
        highest: highest
          ? {
              periodStart: highest.periodStart,
              recordedAt: highest.recordedAt,
              defaultBranch: highest.defaultBranch,
              ref: highest.ref,
              blendedVsPinnedBaseline: highest.blended.vsPinnedBaseline,
            }
          : null,
        series: sortedPoints.map((point) => ({
          periodStart: point.periodStart,
          recordedAt: point.recordedAt,
          blendedVsCurrentCohort: point.blended.vsCurrentCohort,
          blendedVsPinnedBaseline: point.blended.vsPinnedBaseline,
          repoScore: point.summary.repoScore,
          findingCount: point.summary.findingCount,
        })),
        deltaFromFirst: buildDelta(latest, first),
        deltaFromPrevious: previous ? buildDelta(latest, previous) : null,
      } satisfies BenchmarkHistoryRepoSummary;
    })
    .sort((left, right) => {
      if (left.cohort !== right.cohort) {
        return left.cohort.localeCompare(right.cohort);
      }

      const leftScore = left.latest.blended.vsPinnedBaseline ?? Number.NEGATIVE_INFINITY;
      const rightScore = right.latest.blended.vsPinnedBaseline ?? Number.NEGATIVE_INFINITY;
      return rightScore - leftScore || left.repo.localeCompare(right.repo);
    });

  const latestPoints = repos.map((repo) => repo.latest);
  const latestRecordedAt = latestPoints
    .map((point) => point.recordedAt)
    .sort((left, right) => right.localeCompare(left))[0];

  return {
    schemaVersion: 1,
    benchmarkSetId: set.id,
    benchmarkSetName: set.name,
    generatedAt: latestRecordedAt ?? new Date().toISOString(),
    baseline: derivePinnedBaseline(pinnedSnapshot, pinnedSnapshotPath),
    analyzers: buildAnalyzerSummary(latestPoints),
    cohorts: buildCohortSnapshots(latestPoints),
    repos,
  };
}
