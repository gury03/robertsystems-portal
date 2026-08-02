import type { Locale } from "./config";

const dictionaries = {
  es: () => import("./es").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
} as const;

export type Dictionary = Awaited<ReturnType<typeof dictionaries.es>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
