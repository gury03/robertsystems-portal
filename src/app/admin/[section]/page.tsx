import { redirect, notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { CMS_SECTIONS, getCmsSection, type CmsSection } from "@/lib/cms";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, defaultLocale, isLocale, type Locale } from "@/i18n/config";
import SectionEditor from "@/components/admin/SectionEditor";

const langNames: Record<Locale, string> = { es: "Español", en: "English" };

export default async function SectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  const { section } = await params;
  if (!CMS_SECTIONS.includes(section as CmsSection)) notFound();

  const sp = await searchParams;
  const lang: Locale = sp.lang && isLocale(sp.lang) ? sp.lang : defaultLocale;

  const dict = await getDictionary(lang);
  const base =
    (dict as unknown as Record<string, unknown>)[section] ?? {};
  const override = await getCmsSection(lang, section as CmsSection);
  const initial = { ...(base as Record<string, unknown>), ...(override ?? {}) };

  return (
    <div>
      <a
        href="/admin"
        className="mb-4 inline-block text-sm text-slate-400 transition-colors hover:text-cyan-400"
      >
        ← Volver al panel
      </a>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold capitalize text-slate-100">
          Editar: {section}
        </h1>
        <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 p-1">
          {locales.map((l) => (
            <a
              key={l}
              href={`/admin/${section}?lang=${l}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                l === lang
                  ? "bg-cyan-500 text-slate-900"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {langNames[l]}
            </a>
          ))}
        </div>
      </div>
      <SectionEditor section={section} lang={lang} initial={initial} />
    </div>
  );
}

