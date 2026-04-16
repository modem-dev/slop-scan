import type { Finding } from "../core/types";
import type { DeltaIdentityDescriptor } from "../delta-identity";

// These segments are intentionally conservative. The goal is to recognize common
// asset buckets like icon packs without teaching the analyzer that arbitrary
// directories full of tiny files are always harmless.
const ASSET_LIKE_DIRECTORY_SEGMENTS = new Set(["icon", "icons", "svg", "svgs", "asset", "assets"]);

// Thin wrappers around these targets are often boundary/framework adapters, so
// rules such as async-noise and pass-through-wrappers treat them more leniently.
export const BOUNDARY_WRAPPER_TARGET_PREFIXES = [
  "prisma.",
  "redis.",
  "jwt.",
  "bcrypt.",
  "response.",
  "Response.",
  "fetch",
  "axios.",
  "crypto.",
  "storage.",
];

/**
 * Returns zero instead of NaN so threshold math stays predictable on tiny repos and empty directories.
 */
export function ratio(count: number, total: number): number {
  return total === 0 ? 0 : count / total;
}

/**
 * Keeps rule code declarative when several heuristics need the same count-by-predicate shape.
 */
export function countMatching<T>(values: T[], predicate: (value: T) => boolean): number {
  return values.reduce((total, value) => total + (predicate(value) ? 1 : 0), 0);
}

/**
 * Uses a zero default because missing context is weak evidence, not an exceptional condition, in these heuristics.
 */
export function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/**
 * Makes text fingerprints insensitive to indentation and incidental spacing differences.
 */
export function normalizeWhitespace(value: string): string {
  const trimmed = value.trim();
  const collapsed = trimmed.replace(/\s+/g, " ");
  return collapsed.toLowerCase();
}

/**
 * Distinguishes repeated identical keys in one file without letting incidental traversal order leak into hashes.
 */
export function assignStableOrdinals<T>(
  values: T[],
  keyOf: (value: T) => string,
  lineOf: (value: T) => number,
): Array<{ value: T; ordinal: number }> {
  const counts = new Map<string, number>();

  return [...values]
    .sort((left, right) => lineOf(left) - lineOf(right) || keyOf(left).localeCompare(keyOf(right)))
    .map((value) => {
      const key = keyOf(value);
      const ordinal = (counts.get(key) ?? 0) + 1;
      counts.set(key, ordinal);
      return { value, ordinal };
    });
}

/**
 * Packages the common "same-file occurrence with stable ordinal" pattern used by several rule fingerprints.
 */
export function buildFileOrdinalDeltaDescriptors<T>(
  filePath: string,
  values: T[],
  keyOf: (value: T) => string,
  lineOf: (value: T) => number,
  occurrenceKeyOf: (value: T, ordinal: number) => unknown,
): DeltaIdentityDescriptor[] {
  return assignStableOrdinals(values, keyOf, lineOf).map(({ value, ordinal }) => ({
    path: filePath,
    line: lineOf(value),
    occurrenceKey: occurrenceKeyOf(value, ordinal),
  }));
}

/**
 * Lets semantic delta builders stay aligned with the finding they are post-processing instead of re-emitting every candidate.
 */
export function filterValuesByFindingLines<T>(
  finding: Finding,
  filePath: string,
  values: T[],
  lineOf: (value: T) => number,
): T[] {
  const lines = new Set(
    finding.locations
      .filter((location) => location.path === filePath)
      .map((location) => location.line),
  );

  if (lines.size === 0) {
    return values;
  }

  return values.filter((value) => lines.has(lineOf(value)));
}

/**
 * Uses the median for sibling baselines so one unusually wide directory does not flatten the whole comparison.
 */
export function median(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return sorted[middle] ?? 0;
  }

  const left = sorted[middle - 1] ?? 0;
  const right = sorted[middle] ?? 0;
  return (left + right) / 2;
}

/**
 * Treat icon/svg/asset folders specially so structural rules do not confuse a
 * generated asset pack with a suspiciously fragmented code directory.
 */
export function isAssetLikeDirectoryPath(directoryPath: string): boolean {
  return directoryPath
    .split("/")
    .map((segment) => segment.toLowerCase())
    .some((segment) => ASSET_LIKE_DIRECTORY_SEGMENTS.has(segment));
}
