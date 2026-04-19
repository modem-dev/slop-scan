import * as ts from "typescript";
import type { RulePlugin } from "../../core/types";
import { getLineNumber, unwrapExpression, walk } from "../../facts/ts-helpers";
import { delta } from "../../rule-delta";

const MAX_LOGICAL_LINES = 5000;
const STATUS_KEYS = new Set(["success", "ok"]);
const GENERIC_PAYLOAD_KEYS = new Set(["message", "error", "data", "rows", "present", "artifactId"]);

function isBooleanLiteral(expression: ts.Expression): boolean {
  const unwrapped = unwrapExpression(expression);
  return (
    unwrapped.kind === ts.SyntaxKind.TrueKeyword || unwrapped.kind === ts.SyntaxKind.FalseKeyword
  );
}

function isGenericPayloadProperty(property: ts.PropertyAssignment): boolean {
  return ts.isIdentifier(property.name) && GENERIC_PAYLOAD_KEYS.has(property.name.text);
}

type MatchKind =
  | "returned-generic-status-envelope"
  | "json-generic-status-envelope"
  | "assigned-generic-status-envelope";

type GenericStatusEnvelopeMatch = {
  line: number;
  kind: MatchKind;
};

function isGenericStatusEnvelope(node: ts.ObjectLiteralExpression): boolean {
  let hasStatus = false;
  let hasPayload = false;

  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) {
      continue;
    }

    if (STATUS_KEYS.has(property.name.text) && isBooleanLiteral(property.initializer)) {
      hasStatus = true;
    }

    if (isGenericPayloadProperty(property)) {
      hasPayload = true;
    }
  }

  return hasStatus && hasPayload;
}

function summarizeEnvelope(
  node: ts.ObjectLiteralExpression,
  sourceFile: ts.SourceFile,
): GenericStatusEnvelopeMatch | null {
  if (!isGenericStatusEnvelope(node)) {
    return null;
  }

  const parent = node.parent;
  let kind: MatchKind = "assigned-generic-status-envelope";

  if (ts.isReturnStatement(parent)) {
    kind = "returned-generic-status-envelope";
  } else if (
    ts.isCallExpression(parent) &&
    ts.isPropertyAccessExpression(parent.expression) &&
    parent.expression.name.text === "json"
  ) {
    kind = "json-generic-status-envelope";
  }

  return {
    line: getLineNumber(sourceFile, node.getStart(sourceFile)),
    kind,
  };
}

function findGenericStatusEnvelopes(sourceFile: ts.SourceFile): GenericStatusEnvelopeMatch[] {
  const matches: GenericStatusEnvelopeMatch[] = [];

  walk(sourceFile, (node) => {
    if (!ts.isObjectLiteralExpression(node)) {
      return;
    }

    const match = summarizeEnvelope(node, sourceFile);
    if (match) {
      matches.push(match);
    }
  });

  return matches;
}

export const genericStatusEnvelopesRule: RulePlugin = {
  id: "api.generic-status-envelopes",
  family: "api",
  severity: "strong",
  scope: "file",
  requires: ["file.ast"],
  delta: delta.byLocations(),
  supports(context) {
    return context.scope === "file" && Boolean(context.file);
  },
  evaluate(context) {
    if (context.file!.logicalLineCount > MAX_LOGICAL_LINES) {
      return [];
    }

    const sourceFile = context.runtime.store.getFileFact<ts.SourceFile>(
      context.file!.path,
      "file.ast",
    );
    if (!sourceFile) {
      return [];
    }

    const matches = findGenericStatusEnvelopes(sourceFile);
    if (matches.length === 0) {
      return [];
    }

    return [
      {
        ruleId: "api.generic-status-envelopes",
        family: "api",
        severity: "strong",
        scope: "file",
        path: context.file!.path,
        message: `Found ${matches.length} generic status envelope${matches.length === 1 ? "" : "s"} that package boolean success into shallow payload wrappers`,
        evidence: matches.map((match) => `line ${match.line}: ${match.kind}`),
        score: Math.min(8, matches.length * 2),
        locations: matches.map((match) => ({ path: context.file!.path, line: match.line })),
      },
    ];
  },
};
