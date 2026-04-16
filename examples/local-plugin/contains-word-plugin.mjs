import { PLUGIN_API_VERSION, definePlugin, delta } from "../../src/node-entry.ts";

export default definePlugin({
  meta: {
    name: "slop-scan-plugin-contains-word",
    namespace: "local",
    apiVersion: PLUGIN_API_VERSION,
  },
  rules: {
    "contains-word": {
      id: "local/contains-word",
      family: "local",
      severity: "weak",
      scope: "file",
      requires: ["file.text"],
      delta: delta.byPath(),
      supports(context) {
        return context.scope === "file" && Boolean(context.file);
      },
      evaluate(context) {
        const text = context.runtime.store.getFileFact(context.file.path, "file.text") ?? "";
        const options = context.ruleConfig?.options ?? {};
        const word = typeof options.word === "string" ? options.word : "danger";

        if (!text.includes(word)) {
          return [];
        }

        return [
          {
            ruleId: "local/contains-word",
            family: "local",
            severity: "weak",
            scope: "file",
            path: context.file.path,
            message: `Found ${word} in file text`,
            evidence: [word],
            score: 1,
            locations: [{ path: context.file.path, line: 1 }],
          },
        ];
      },
    },
  },
  configs: {
    recommended: {
      rules: {
        "local/contains-word": {
          enabled: true,
          options: { word: "danger" },
        },
      },
    },
  },
});
