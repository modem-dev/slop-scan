import * as ts from "typescript";
import type { FactProvider } from "../core/types";
import type { TestMockSetupSummary } from "./types";
import { fingerprintNodeShape, getExpressionPath, getLineNumber, isTestFile, walk } from "./ts-helpers";

const MOCK_PATH_PATTERNS = [
  "vi.mock",
  "jest.mock",
  "vi.spyOn",
  "jest.spyOn",
  "sinon.stub",
  "sinon.spy",
  "mockImplementation",
  "mockImplementationOnce",
  "mockReturnValue",
  "mockReturnValueOnce",
  "mockResolvedValue",
  "mockResolvedValueOnce",
  "mockRejectedValue",
  "mockRejectedValueOnce",
  "mockReset",
  "mockClear",
  "mockRestore",
];

function matchesMockPath(path: string): boolean {
  return MOCK_PATH_PATTERNS.some((pattern) => path === pattern || path.endsWith(`.${pattern}`));
}

function collectMockPaths(node: ts.Node): string[] {
  const matches = new Set<string>();

  walk(node, (child) => {
    if (!ts.isCallExpression(child) && !ts.isNewExpression(child)) {
      return;
    }

    const expression = ts.isCallExpression(child) ? child.expression : child.expression;
    if (!expression) {
      return;
    }

    const path = getExpressionPath(expression).join(".");
    if (path && matchesMockPath(path)) {
      matches.add(path);
    }
  });

  return [...matches].sort();
}

export const testMockSetupsFactProvider: FactProvider = {
  id: "fact.file.test-mock-setups",
  scope: "file",
  requires: ["file.ast"],
  provides: ["file.testMockSetups"],
  supports(context) {
    return context.scope === "file" && Boolean(context.file);
  },
  run(context) {
    const file = context.file!;
    if (!isTestFile(file.path)) {
      return { "file.testMockSetups": [] satisfies TestMockSetupSummary[] };
    }

    const sourceFile = context.runtime.store.getFileFact<ts.SourceFile>(file.path, "file.ast");
    if (!sourceFile) {
      return { "file.testMockSetups": [] satisfies TestMockSetupSummary[] };
    }

    const setups: TestMockSetupSummary[] = [];

    walk(sourceFile, (node) => {
      if (!ts.isStatement(node)) {
        return;
      }

      const labels = collectMockPaths(node);
      if (labels.length === 0) {
        return;
      }

      setups.push({
        line: getLineNumber(sourceFile, node.getStart(sourceFile)),
        label: labels.join(" | "),
        fingerprint: `${labels.join("|")}::${fingerprintNodeShape(node, 5)}`,
      });
    });

    return { "file.testMockSetups": setups };
  },
};
