import type {
  BenchmarkHistoryDelta,
  BenchmarkHistoryLatestSummary,
  BenchmarkHistoryRepoSummary,
} from "./history";
import type { BenchmarkSet } from "./types";

function formatMetric(value: number | null, digits = 2): string {
  return value === null ? "n/a" : value.toFixed(digits);
}

function formatSigned(value: number | null, digits = 2): string {
  if (value === null) {
    return "n/a";
  }

  const rounded = value.toFixed(digits);
  return value > 0 ? `+${rounded}` : rounded;
}

function shortRef(ref: string): string {
  return ref.slice(0, 7);
}

function renderRepoLink(repo: BenchmarkHistoryRepoSummary): string {
  return `[${repo.repo}](https://github.com/${repo.repo})`;
}

function renderAnalyzerSummary(summary: BenchmarkHistoryLatestSummary): string[] {
  return summary.analyzers.map(
    (analyzer) =>
      `- \`${analyzer.version}\` @ \`${shortRef(analyzer.commit)}\` — ${analyzer.repoCount} latest repo snapshots`,
  );
}

function sortByPinnedTrend(
  repos: BenchmarkHistoryRepoSummary[],
  deltaSelector: (delta: BenchmarkHistoryDelta | null) => number | null,
): BenchmarkHistoryRepoSummary[] {
  return [...repos].sort((left, right) => {
    const leftValue = deltaSelector(left.deltaFromPrevious) ?? 0;
    const rightValue = deltaSelector(right.deltaFromPrevious) ?? 0;
    return Math.abs(rightValue) - Math.abs(leftValue) || left.repo.localeCompare(right.repo);
  });
}

function renderRepoTable(repos: BenchmarkHistoryRepoSummary[]): string[] {
  const lines = [
    "| Repo | Points | Latest ref | Current blended | Pinned blended | Δ prev (pinned) | Δ first (pinned) | Score/file | Findings/file |",
    "|---|---:|---|---:|---:|---:|---:|---:|---:|",
  ];

  for (const repo of repos) {
    lines.push(
      `| ${renderRepoLink(repo)} | ${repo.pointCount} | \`${repo.latest.defaultBranch}@${shortRef(repo.latest.ref)}\` | **${formatMetric(repo.latest.blended.vsCurrentCohort)}** | **${formatMetric(repo.latest.blended.vsPinnedBaseline)}** | ${formatSigned(repo.deltaFromPrevious?.blendedVsPinnedBaseline ?? null)} | ${formatSigned(repo.deltaFromFirst.blendedVsPinnedBaseline)} | ${formatMetric(repo.latest.summary.normalized.scorePerFile)} | ${formatMetric(repo.latest.summary.normalized.findingsPerFile)} |`,
    );
  }

  return lines;
}

function renderMoverList(
  repos: BenchmarkHistoryRepoSummary[],
  predicate: (value: number) => boolean,
): string[] {
  const movers = sortByPinnedTrend(repos, (delta) => delta?.blendedVsPinnedBaseline)
    .map((repo) => ({
      repo,
      value: repo.deltaFromPrevious?.blendedVsPinnedBaseline ?? null,
    }))
    .filter((entry) => entry.value !== null && predicate(entry.value))
    .slice(0, 5);

  if (movers.length === 0) {
    return ["- n/a yet (need at least two weekly points with movement)"];
  }

  return movers.map(
    ({ repo, value }) =>
      `- ${renderRepoLink(repo)} — ${formatSigned(value)} vs previous week (pinned blended)`,
  );
}

export function renderBenchmarkHistoryReport(
  set: BenchmarkSet,
  summary: BenchmarkHistoryLatestSummary,
): string {
  const aiRepos = summary.repos.filter((repo) => repo.cohort === "explicit-ai");
  const matureRepos = summary.repos.filter((repo) => repo.cohort === "mature-oss");
  const aiCohort = summary.cohorts["explicit-ai"];
  const matureCohort = summary.cohorts["mature-oss"];

  const lines = [
    `# Rolling benchmark history: ${set.name}`,
    "",
    `Latest update: ${summary.generatedAt.slice(0, 10)}`,
    `History dir: \`benchmarks/history/${set.id}/\``,
    `Pinned baseline snapshot: \`${summary.baseline.snapshotPath}\` (${summary.baseline.generatedAt.slice(0, 10)})`,
    `Pinned baseline analyzer version: ${summary.baseline.analyzerVersion}`,
    "",
    "## Goal",
    "",
    `${set.description} This rolling history tracks the same repos at their latest default-branch revisions so the benchmark can show movement over time.`,
    "",
    "## Refresh",
    "",
    "```bash",
    "bun run benchmark:history",
    "```",
    "",
    "## Latest analyzer revisions",
    "",
    ...renderAnalyzerSummary(summary),
    "",
    "## Latest cohort medians",
    "",
    "| Cohort | Repo count | Median current blended | Median score/file | Median findings/file |",
    "|---|---:|---:|---:|---:|",
    `| explicit-ai | ${aiCohort.repoCount} | **${formatMetric(aiCohort.blendedScoreMedian)}** | ${formatMetric(aiCohort.medians.scorePerFile)} | ${formatMetric(aiCohort.medians.findingsPerFile)} |`,
    `| mature-oss | ${matureCohort.repoCount} | **${formatMetric(matureCohort.blendedScoreMedian)}** | ${formatMetric(matureCohort.medians.scorePerFile)} | ${formatMetric(matureCohort.medians.findingsPerFile)} |`,
    "",
    "## AI cohort latest standings",
    "",
    ...renderRepoTable(aiRepos),
    "",
    "## Mature OSS cohort latest standings",
    "",
    ...renderRepoTable(matureRepos),
    "",
    "## Biggest increases vs previous week",
    "",
    ...renderMoverList(summary.repos, (value) => value > 0),
    "",
    "## Biggest decreases vs previous week",
    "",
    ...renderMoverList(summary.repos, (value) => value < 0),
    "",
    "## Notes",
    "",
    "- `Current blended` is relative to the latest mature-OSS cohort medians from the same run, so it is best for week-by-week ranking.",
    "- `Pinned blended` is relative to the frozen pinned benchmark baseline, so it is the cleaner long-term trend line.",
    "- Each repo stores one JSONL datapoint per UTC week; reruns in the same week replace that week's datapoint instead of appending duplicates.",
    "- The existing pinned benchmark report remains the reproducible source of truth for exact SHA-based benchmark claims.",
  ];

  return lines.join("\n");
}
