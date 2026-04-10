import type { FactProvider } from "./types";

/** Simple dependency ordering that preserves registration order among providers that are ready at the same time. */
export function orderFactProviders(
  providers: FactProvider[],
  initialFacts: string[] = [],
): FactProvider[] {
  const ordered: FactProvider[] = [];
  const pending = [...providers];
  const availableFacts = new Set(initialFacts);

  while (pending.length > 0) {
    const readyIndex = pending.findIndex((provider) =>
      provider.requires.every((fact) => availableFacts.has(fact)),
    );

    if (readyIndex === -1) {
      const missing = pending.map((provider) => ({
        id: provider.id,
        missing: provider.requires.filter((fact) => !availableFacts.has(fact)),
      }));

      throw new Error(`Unresolved fact provider dependencies: ${JSON.stringify(missing)}`);
    }

    const [provider] = pending.splice(readyIndex, 1);
    ordered.push(provider);
    provider.provides.forEach((fact) => availableFacts.add(fact));
  }

  return ordered;
}

/** Fails fast when a rule depends on facts that the planned analysis will never produce. */
export function validateRuleRequirements(
  ruleRequirements: Array<{ id: string; requires: string[] }>,
  availableFacts: string[],
): void {
  const facts = new Set(availableFacts);
  const unresolved = ruleRequirements
    .map((rule) => ({
      id: rule.id,
      missing: rule.requires.filter((fact) => !facts.has(fact)),
    }))
    .filter((rule) => rule.missing.length > 0);

  if (unresolved.length > 0) {
    throw new Error(`Unresolved rule dependencies: ${JSON.stringify(unresolved)}`);
  }
}
