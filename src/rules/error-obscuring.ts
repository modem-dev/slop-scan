import type { Finding, ProviderContext, RulePlugin } from "../core/types";
import type { TryCatchSummary } from "../facts/types";
import { delta } from "../rule-delta";
import { buildFileOrdinalDeltaDescriptors, filterValuesByFindingLines } from "./helpers";
import {
  buildTryCatchIdentityBase,
  formatTryCatchBoundary,
  isValidTryCatchTarget,
  scoreTryCatch,
} from "./try-catch-rule-helpers";

/**
 * Keeps evidence strings and fingerprints aligned on the same catch-transformation categories.
 */
function obscuringKind(summary: TryCatchSummary): string {
  if (summary.catchHasLogging && summary.catchHasDefaultReturn) {
    return "log+default";
  }

  if (summary.catchReturnsDefault) {
    return "default-return";
  }

  return "generic-rethrow";
}

function findErrorObscuringSummaries(summaries: TryCatchSummary[]): TryCatchSummary[] {
  return summaries.filter(
    (summary) =>
      isValidTryCatchTarget(summary) &&
      summary.tryStatementCount <= 2 &&
      (summary.catchReturnsDefault ||
        summary.catchThrowsGeneric ||
        (summary.catchHasLogging && summary.catchHasDefaultReturn)),
  );
}

function buildErrorObscuringDeltaDescriptors(finding: Finding, context: ProviderContext) {
  const filePath = context.file?.path ?? finding.path;
  if (!filePath) {
    return [];
  }

  const summaries =
    context.runtime.store.getFileFact<TryCatchSummary[]>(filePath, "file.tryCatchSummaries") ?? [];
  const flagged = filterValuesByFindingLines(
    finding,
    filePath,
    findErrorObscuringSummaries(summaries),
    (summary) => summary.line,
  );

  return buildFileOrdinalDeltaDescriptors(
    filePath,
    flagged,
    (summary) =>
      JSON.stringify({
        ...buildTryCatchIdentityBase(summary),
        kind: obscuringKind(summary),
      }),
    (summary) => summary.line,
    (summary, ordinal) => ({
      path: filePath,
      kind: obscuringKind(summary),
      ...buildTryCatchIdentityBase(summary),
      ordinal,
    }),
  );
}

/**
 * Flags catch blocks that convert the original failure into a default value or
 * generic replacement error, making downstream diagnosis harder.
 */
export const errorObscuringRule: RulePlugin = {
  id: "defensive.error-obscuring",
  family: "defensive",
  severity: "strong",
  scope: "file",
  requires: ["file.tryCatchSummaries"],
  delta: delta.bySemantic(buildErrorObscuringDeltaDescriptors),
  supports(context) {
    return context.scope === "file" && Boolean(context.file);
  },
  evaluate(context) {
    const summaries =
      context.runtime.store.getFileFact<TryCatchSummary[]>(
        context.file!.path,
        "file.tryCatchSummaries",
      ) ?? [];

    const flagged = findErrorObscuringSummaries(summaries);

    if (flagged.length === 0) {
      return [];
    }

    return [
      {
        ruleId: "defensive.error-obscuring",
        family: "defensive",
        severity: "strong",
        scope: "file",
        path: context.file!.path,
        message: `Found ${flagged.length} error-obscuring catch block${flagged.length === 1 ? "" : "s"}`,
        evidence: flagged.map(
          (summary) =>
            `line ${summary.line}: ${obscuringKind(summary)}, boundary=${formatTryCatchBoundary(summary)}`,
        ),
        score: Math.min(
          8,
          flagged.reduce((total, summary) => total + scoreTryCatch(summary), 0),
        ),
        locations: flagged.map((summary) => ({ path: context.file!.path, line: summary.line })),
      },
    ];
  },
};
