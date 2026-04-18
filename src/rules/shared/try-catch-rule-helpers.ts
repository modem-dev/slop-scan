import type { TryCatchSummary } from "../../facts/types";

/**
 * Screens out probe-style catches that would dominate results without being meaningfully slop-like.
 */
export function isValidTryCatchTarget(summary: TryCatchSummary): boolean {
  return summary.hasCatchClause && !summary.isFilesystemExistenceProbe;
}

/**
 * Keeps boundary context compact in evidence strings so rule output stays readable in CI logs.
 */
export function formatTryCatchBoundary(summary: TryCatchSummary): string {
  return summary.boundaryCategories.length > 0 ? summary.boundaryCategories.join("|") : "none";
}

/**
 * Captures the structural parts of a try/catch that should survive line drift between scans.
 */
export function buildTryCatchIdentityBase(summary: TryCatchSummary) {
  return {
    enclosingSymbol: summary.enclosingSymbol,
    boundaryCategories: summary.boundaryCategories,
    boundaryOperationPaths: summary.boundaryOperationPaths,
    tryStatementCount: summary.tryStatementCount,
    catchStatementCount: summary.catchStatementCount,
  };
}

/**
 * Downweights boundary code without erasing the signal when the catch pattern is still suspicious.
 */
export function scoreTryCatch(summary: TryCatchSummary): number {
  let score = 3;

  if (summary.catchIsEmpty) {
    score += 0.5;
  }

  // Re-throwing a generic error is still noisy, but it is slightly less bad
  // than silently swallowing or flattening the failure into a default.
  if (summary.catchThrowsGeneric) {
    score -= 0.5;
  }

  if (summary.boundaryCategories.length > 0) {
    // Boundary code often logs/translates errors for operational reasons, so we
    // downweight instead of fully exempting it.
    score *= 0.4;
    if (summary.catchIsEmpty) {
      score += 0.5;
    }
  }

  return Math.max(0.75, score);
}
