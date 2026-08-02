import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";

export const CMS_SECTIONS = [
  "nav",
  "hero",
  "services",
  "projects",
  "about",
  "contact",
  "footer",
] as const;

export type CmsSection = (typeof CMS_SECTIONS)[number];

/** Devuelve el binding de D1, o null si no está disponible (ej. en build). */
function db(): D1Database | null {
  try {
    const { env } = getCloudflareContext();
    const d1 = (env as unknown as Record<string, unknown>).robertsystems_cms;
    return (d1 as D1Database) ?? null;
  } catch {
    return null;
  }
}

/** Lee el contenido de una sección desde D1 para un idioma. */
export async function getCmsSection(
  lang: Locale,
  section: CmsSection
): Promise<Record<string, unknown> | null> {
  const d1 = db();
  if (!d1) return null;
  try {
    const res = await d1
      .prepare("SELECT data FROM cms_content WHERE lang = ?1 AND section = ?2")
      .bind(lang, section)
      .first<{ data: string }>();
    if (!res?.data) return null;
    return JSON.parse(res.data) as Record<string, unknown>;
  } catch (err) {
    console.error("getCmsSection error:", err);
    return null;
  }
}

/** Guarda el contenido de una sección en D1 para un idioma (upsert). */
export async function setCmsSection(
  lang: Locale,
  section: CmsSection,
  data: Record<string, unknown>
): Promise<void> {
  const d1 = db();
  if (!d1) throw new Error("D1 no disponible");
  const json = JSON.stringify(data);
  await d1
    .prepare(
      `INSERT INTO cms_content (lang, section, data, updated_at)
       VALUES (?1, ?2, ?3, datetime('now'))
       ON CONFLICT(lang, section) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
    )
    .bind(lang, section, json)
    .run();
}

/** Contenido final del portal: diccionario por defecto + overrides de D1. */
export async function getMergedContent(lang: Locale): Promise<Dictionary> {
  const base = await getDictionary(lang);
  const d1 = db();
  if (!d1) return base;

  try {
    const rows = await d1
      .prepare("SELECT section, data FROM cms_content WHERE lang = ?1")
      .bind(lang)
      .all<{ section: string; data: string }>();

    let merged: Record<string, unknown> = { ...base };
    for (const row of rows.results ?? []) {
      try {
        const parsed = JSON.parse(row.data) as Record<string, unknown>;
        if (row.section && parsed && typeof parsed === "object") {
          merged = { ...merged, [row.section]: parsed };
        }
      } catch {
        // ignorar secciones corruptas
      }
    }
    return merged as Dictionary;
  } catch (err) {
    console.error("getMergedContent error:", err);
    return base;
  }
}
