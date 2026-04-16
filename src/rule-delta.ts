import type { Finding, FindingDeltaIdentity, FindingLocation, ProviderContext } from "./core/types";
import {
  createFindingDeltaIdentity,
  createPathDeltaIdentity,
  type DeltaIdentityDescriptor,
} from "./delta-identity";

export interface SemanticDeltaBuilder {
  (finding: Finding, context: ProviderContext): DeltaIdentityDescriptor[];
}

export type DeltaStrategy =
  | { mode: "auto" }
  | { mode: "path" }
  | { mode: "primary-location" }
  | { mode: "all-locations" }
  | {
      mode: "semantic";
      build: SemanticDeltaBuilder;
    };

/**
 * Exposes the common matching modes so rule authors can declare intent without hand-rolling fingerprints.
 */
export const delta = {
  auto(): DeltaStrategy {
    return { mode: "auto" };
  },

  byPath(): DeltaStrategy {
    return { mode: "path" };
  },

  byPrimaryLocation(): DeltaStrategy {
    return { mode: "primary-location" };
  },

  byLocations(): DeltaStrategy {
    return { mode: "all-locations" };
  },

  bySemantic(build: SemanticDeltaBuilder): DeltaStrategy {
    return { mode: "semantic", build };
  },
};

function compareLocations(left: FindingLocation, right: FindingLocation): number {
  return (
    left.path.localeCompare(right.path) ||
    left.line - right.line ||
    (left.column ?? 1) - (right.column ?? 1)
  );
}

/**
 * Mirrors delta diffing's location cleanup so strategy-derived identities stay deterministic.
 */
function uniqueSortedLocations(finding: Finding): FindingLocation[] {
  const fallbackLocations = finding.path
    ? [
        {
          path: finding.path,
          line: 1,
          column: 1,
        },
      ]
    : [];
  const locations = finding.locations.length > 0 ? finding.locations : fallbackLocations;
  const seen = new Set<string>();

  return [...locations].sort(compareLocations).filter((location) => {
    const key = `${location.path}:${location.line}:${location.column ?? 1}`;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

/**
 * Provides a last-resort identity for repo-scoped or locationless findings so auto mode still emits explicit fingerprints.
 */
function createFallbackDeltaIdentity(ruleId: string, finding: Finding): FindingDeltaIdentity {
  return createFindingDeltaIdentity(ruleId, [
    {
      occurrenceKey: {
        scope: finding.scope,
        path: finding.path ?? null,
        message: finding.message,
      },
    },
  ]);
}

/**
 * Uses the finding's declared path as the semantic key, while keeping the best available display line.
 */
function buildPathDeltaIdentity(ruleId: string, finding: Finding): FindingDeltaIdentity {
  const primaryLocation = uniqueSortedLocations(finding)[0];
  const path = finding.path ?? primaryLocation?.path;

  if (!path) {
    return createFallbackDeltaIdentity(ruleId, finding);
  }

  return createPathDeltaIdentity(ruleId, path, primaryLocation?.line ?? 1);
}

/**
 * Matches a single concrete location when the rule naturally reports one occurrence per finding.
 */
function buildPrimaryLocationDeltaIdentity(ruleId: string, finding: Finding): FindingDeltaIdentity {
  const primaryLocation = uniqueSortedLocations(finding)[0];

  if (!primaryLocation) {
    return buildPathDeltaIdentity(ruleId, finding);
  }

  return createFindingDeltaIdentity(ruleId, [
    {
      path: primaryLocation.path,
      line: primaryLocation.line,
      column: primaryLocation.column,
      occurrenceKey: {
        path: primaryLocation.path,
        line: primaryLocation.line,
        column: primaryLocation.column ?? 1,
      },
    },
  ]);
}

/**
 * Treats every reported location as its own occurrence so grouped findings can diff without custom rule code.
 */
function buildAllLocationsDeltaIdentity(ruleId: string, finding: Finding): FindingDeltaIdentity {
  const locations = uniqueSortedLocations(finding);

  if (locations.length === 0) {
    return buildPrimaryLocationDeltaIdentity(ruleId, finding);
  }

  return createFindingDeltaIdentity(
    ruleId,
    locations.map((location) => ({
      path: location.path,
      line: location.line,
      column: location.column,
      occurrenceKey: {
        path: location.path,
        line: location.line,
        column: location.column ?? 1,
      },
    })),
  );
}

/**
 * Centralizes strategy execution so rules can opt into better matching without owning hash construction.
 */
export function buildFindingDeltaIdentity(
  ruleId: string,
  finding: Finding,
  context: ProviderContext,
  strategy: DeltaStrategy,
): FindingDeltaIdentity {
  switch (strategy.mode) {
    case "path":
      return buildPathDeltaIdentity(ruleId, finding);
    case "primary-location":
      return buildPrimaryLocationDeltaIdentity(ruleId, finding);
    case "all-locations":
      return buildAllLocationsDeltaIdentity(ruleId, finding);
    case "semantic":
      return createFindingDeltaIdentity(ruleId, strategy.build(finding, context));
    case "auto": {
      const locations = uniqueSortedLocations(finding);
      if (locations.length > 1) {
        return buildAllLocationsDeltaIdentity(ruleId, finding);
      }

      if (finding.path || locations.length === 1) {
        return buildPathDeltaIdentity(ruleId, finding);
      }

      return createFallbackDeltaIdentity(ruleId, finding);
    }
  }
}
