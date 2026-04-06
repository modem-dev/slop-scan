export interface CommentSummary {
  text: string;
  line: number;
}

export interface FunctionSummary {
  name: string;
  line: number;
  isAsync: boolean;
  hasAwait: boolean;
  statementCount: number;
  isPassThroughWrapper: boolean;
  passThroughTarget: string | null;
  hasReturnAwaitCall: boolean;
}

export interface ExportSummary {
  topLevelStatementCount: number;
  reExportCount: number;
  hasOnlyReExports: boolean;
}

export interface TryCatchSummary {
  line: number;
  hasCatchClause: boolean;
  tryStatementCount: number;
  catchStatementCount: number;
  catchLogsOnly: boolean;
  catchReturnsDefault: boolean;
  catchHasLogging: boolean;
  catchHasDefaultReturn: boolean;
  catchIsEmpty: boolean;
  catchThrowsGeneric: boolean;
  boundaryCategories: string[];
}

export interface DirectoryMetrics {
  fileCount: number;
  tinyFileCount: number;
  wrapperFileCount: number;
  barrelFileCount: number;
  totalLineCount: number;
}

export interface TestMockSetupSummary {
  line: number;
  label: string;
  fingerprint: string;
}

export interface DuplicateTestSetupCluster {
  fingerprint: string;
  label: string;
  fileCount: number;
  occurrences: Array<{ path: string; line: number }>;
}

export interface DuplicateTestSetupIndex {
  byFile: Record<string, DuplicateTestSetupCluster[]>;
  clusters: DuplicateTestSetupCluster[];
}
