import type { RulePlugin } from "../../core/types";
import type { DuplicateTestSetupIndex } from "../../facts/types";
import { isTestFile } from "../../facts/ts-helpers";

export const duplicateMockSetupRule: RulePlugin = {
  id: "tests.duplicate-mock-setup",
  family: "tests",
  severity: "medium",
  scope: "file",
  requires: ["repo.testMockDuplication"],
  supports(context) {
    return context.scope === "file" && Boolean(context.file) && isTestFile(context.file!.path);
  },
  evaluate(context) {
    const duplication = context.runtime.store.getRepoFact<DuplicateTestSetupIndex>("repo.testMockDuplication");
    const clusters = duplication?.byFile[context.file!.path] ?? [];

    if (clusters.length === 0) {
      return [];
    }

    const uniqueClusters = clusters.filter(
      (cluster, index) => clusters.findIndex((candidate) => candidate.fingerprint === cluster.fingerprint) === index,
    );

    return [
      {
        ruleId: "tests.duplicate-mock-setup",
        family: "tests",
        severity: "medium",
        scope: "file",
        path: context.file!.path,
        message: `Found ${uniqueClusters.length} duplicated test mock/setup pattern${uniqueClusters.length === 1 ? "" : "s"}`,
        evidence: uniqueClusters.map((cluster) => {
          const peers = [...new Set(cluster.occurrences.map((occurrence) => occurrence.path))]
            .filter((path) => path !== context.file!.path)
            .slice(0, 3)
            .join(", ");
          return `${cluster.label} in ${cluster.fileCount} files${peers ? ` (also: ${peers})` : ""}`;
        }),
        score: Math.min(5, uniqueClusters.reduce((total, cluster) => total + 1 + (cluster.fileCount - 2) * 0.5, 0)),
        locations: clusters
          .filter((cluster) => cluster.occurrences.some((occurrence) => occurrence.path === context.file!.path))
          .flatMap((cluster) =>
            cluster.occurrences
              .filter((occurrence) => occurrence.path === context.file!.path)
              .map((occurrence) => ({ path: occurrence.path, line: occurrence.line })),
          ),
      },
    ];
  },
};
