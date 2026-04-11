import type { NormalizedMetrics } from "./core/types";

export interface ReferenceBenchmarkCohort {
  label: string;
  repoCount: number;
  medians: NormalizedMetrics;
  blendedScoreMedian: number | null;
}

export interface ReferenceBaseline {
  benchmarkSetId: string;
  benchmarkSetName: string;
  generatedAt: string;
  analyzerVersion: string;
  configMode: "default";
  cohorts: {
    explicitAi: ReferenceBenchmarkCohort;
    matureOss: ReferenceBenchmarkCohort;
  };
}

export const DEFAULT_REFERENCE_BASELINE = {
  benchmarkSetId: "known-ai-vs-solid-oss",
  benchmarkSetName: "Known AI repos vs older solid OSS repos",
  generatedAt: "2026-04-09T00:24:29.081Z",
  analyzerVersion: "0.2.0",
  configMode: "default",
  cohorts: {
    explicitAi: {
      label: "Explicit AI median",
      repoCount: 9,
      medians: {
        scorePerFile: 0.9875000000000002,
        scorePerKloc: 9.510586363885691,
        scorePerFunction: 0.2286514601096154,
        findingsPerFile: 0.30851063829787234,
        findingsPerKloc: 2.96198782293895,
        findingsPerFunction: 0.0842173094081491,
      },
      blendedScoreMedian: 3.476442610225084,
    },
    matureOss: {
      label: "Mature OSS median",
      repoCount: 8,
      medians: {
        scorePerFile: 0.19086548662498448,
        scorePerKloc: 4.422142801664107,
        scorePerFunction: 0.09195482875096181,
        findingsPerFile: 0.06947805977819406,
        findingsPerKloc: 1.3961844005945103,
        findingsPerFunction: 0.02817460317460317,
      },
      blendedScoreMedian: 0.9999999999999999,
    },
  },
} satisfies ReferenceBaseline;
