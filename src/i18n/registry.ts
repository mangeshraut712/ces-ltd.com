'use client';

const registry = new Map<string, string>();

export function registerTranslationKey(key: string, defaultValue: string) {
  if (!key) {
    return;
  }
  if (!registry.has(key)) {
    registry.set(key, defaultValue);
  }
}

export function getRegisteredTranslationEntries() {
  return Array.from(registry.entries()).map(([key, text]) => ({ key, text }));
}

export function clearTranslationRegistry() {
  registry.clear();
}
