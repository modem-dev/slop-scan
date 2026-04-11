import type { AnalysisResult, NormalizedMetrics } from "./core/types";
import { DEFAULT_REFERENCE_BASELINE } from "./reference-baseline";

interface ReferenceMetric {
  key: keyof NormalizedMetrics;
  label: string;
}

const REFERENCE_METRICS: ReferenceMetric[] = [
  { key: "scorePerFile", label: "score / file" },
  { key: "scorePerKloc", label: "score / KLOC" },
  { key: "scorePerFunction", label: "score / function" },
  { key: "findingsPerFile", label: "findings / file" },
  { key: "findingsPerKloc", label: "findings / KLOC" },
  { key: "findingsPerFunction", label: "findings / function" },
];

function divideOrNull(numerator: number | null, denominator: number | null): number | null {
  return numerator !== null && denominator !== null && denominator !== 0
    ? numerator / denominator
    : null;
}

function formatMetric(value: number | null): string {
  return value === null ? "n/a" : value.toFixed(2);
}

function formatRatio(value: number | null): string {
  return value === null ? "n/a" : `${value.toFixed(2)}x`;
}

function formatRow(values: string[], widths: number[]): string {
  return values
    .map((value, index) =>
      index === 0 ? value.padEnd(widths[index] ?? 0) : value.padStart(widths[index] ?? 0),
    )
    .join("  ");
}

export function renderReferenceContext(result: AnalysisResult): string[] {
  const baseline = DEFAULT_REFERENCE_BASELINE;
  const matureOss = baseline.cohorts.matureOss.medians;
  const explicitAi = baseline.cohorts.explicitAi.medians;
  const rows = REFERENCE_METRICS.map((metric) => {
    const repoValue = result.summary.normalized[metric.key];
    const matureValue = matureOss[metric.key];
    const explicitAiValue = explicitAi[metric.key];
    return [
      metric.label,
      formatMetric(repoValue),
      formatMetric(matureValue),
      formatRatio(divideOrNull(repoValue, matureValue)),
      formatMetric(explicitAiValue),
    ];
  });
  const header = ["Metric", "This repo", "Mature median", "vs mature", "AI median"];
  const widths = header.map((value, index) =>
    Math.max(value.length, ...rows.map((row) => row[index]?.length ?? 0)),
  );

  return [
    "",
    `Reference context: ${baseline.benchmarkSetName} (analyzer ${baseline.analyzerVersion}, ${baseline.configMode} config)`,
    formatRow(header, widths),
    formatRow(
      widths.map((width) => "-".repeat(width)),
      widths,
    ),
    ...rows.map((row) => formatRow(row, widths)),
  ];
}
