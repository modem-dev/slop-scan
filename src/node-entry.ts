import { PLUGIN_API_VERSION as pluginApiVersion } from "./plugin";

export const PLUGIN_API_VERSION = pluginApiVersion;

export { formatHelp, run } from "./cli";
export { DEFAULT_CONFIG, loadConfig, loadConfigFile, resolveRuleConfigDefaults } from "./config";
export { analyzeRepository } from "./core/engine";
export { Registry } from "./core/registry";
export { createDefaultRegistry } from "./default-registry";
export { defineConfig, definePlugin } from "./plugin";
export type {
  AnalyzerConfig,
  ConfigOverride,
  LoadedConfigFile,
  ResolvedRuleConfig,
  RuleConfig,
} from "./config";
export type {
  AnalysisResult,
  AnalysisSummary,
  AnalyzerRuntime,
  DirectoryRecord,
  FactProvider,
  FactStoreReader,
  FileRecord,
  Finding,
  FindingLocation,
  LanguagePlugin,
  ProviderContext,
  ReporterPlugin,
  ReporterOptions,
  RulePlugin,
  Scope,
} from "./core/types";
export type { ConfigFile, LoadedPlugin, PluginReference, SlopScanPlugin } from "./plugin";
