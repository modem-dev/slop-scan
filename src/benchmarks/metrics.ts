import type { NormalizedMetrics } from "../core/types";
import { NORMALIZED_METRIC_KEYS } from "./types";

interface MetricsCarrier {
  summary: {
    normalized: NormalizedMetrics;
  };
}

export function median(values: number[]): number | null {
  if (values.length === 0) {
    return null;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return sorted[middle] ?? null;
  }

  const left = sorted[middle - 1];
  const right = sorted[middle];
  return left !== undefined && right !== undefined ? (left + right) / 2 : null;
}

export function buildMedianMetrics(items: MetricsCarrier[]): NormalizedMetrics {
  const entries = NORMALIZED_METRIC_KEYS.map((metricKey) => {
    const values = items
      .map((item) => item.summary.normalized[metricKey])
      .filter((value): value is number => value !== null);
    return [metricKey, median(values)];
  });

  return Object.fromEntries(entries) as NormalizedMetrics;
}

export function geometricMean(values: number[]): number | null {
  if (values.length === 0) {
    return null;
  }

  if (values.some((value) => value === 0)) {
    return 0;
  }

  return Math.exp(values.reduce((sum, value) => sum + Math.log(value), 0) / values.length);
}

export function computeRawBlendedScore(
  metrics: NormalizedMetrics,
  baseline: NormalizedMetrics,
): number | null {
  const ratios = NORMALIZED_METRIC_KEYS.flatMap((metricKey) => {
    const value = metrics[metricKey];
    const baselineValue = baseline[metricKey];

    if (value === null || baselineValue === null || baselineValue <= 0) {
      return [];
    }

    return [value / baselineValue];
  });

  return geometricMean(ratios);
}

export function rescaleBlendedScore(
  rawBlendedScore: number | null,
  baselineMedian: number | null,
): number | null {
  return rawBlendedScore !== null && baselineMedian !== null && baselineMedian > 0
    ? rawBlendedScore / baselineMedian
    : rawBlendedScore;
}
