import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getDictionary } from "@/i18n/dictionaries";
import { getCmsSection, setCmsSection, type CmsSection } from "@/lib/cms";
import { isLocale, type Locale } from "@/i18n/config";

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") ?? "es";
  const section = url.searchParams.get("section") ?? "hero";

  if (!isLocale(lang)) {
    return NextResponse.json({ error: "Idioma inválido" }, { status: 400 });
  }

  const dict = await getDictionary(lang as Locale);
  const base = (dict as unknown as Record<string, unknown>)[section] ?? {};
  const override = await getCmsSection(lang as Locale, section as CmsSection);
  const data = { ...(base as Record<string, unknown>), ...(override ?? {}) };

  return NextResponse.json({ section, lang, data });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: { section?: string; lang?: string; data?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const lang = body.lang ?? "es";
  const section = body.section ?? "hero";

  if (!isLocale(lang) || !body.data || typeof body.data !== "object") {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    await setCmsSection(lang as Locale, section as CmsSection, body.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error guardando contenido:", err);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
