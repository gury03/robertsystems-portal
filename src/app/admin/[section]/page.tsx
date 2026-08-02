import { redirect, notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { CMS_SECTIONS, getCmsSection, type CmsSection } from "@/lib/cms";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, type Locale } from "@/i18n/config";
import SectionEditor from "@/components/admin/SectionEditor";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  const { section } = await params;
  if (!CMS_SECTIONS.includes(section as CmsSection)) notFound();

  const lang = defaultLocale; // el panel edita el idioma por defecto (es)
  const dict = await getDictionary(lang as Locale);
  const base =
    (dict as unknown as Record<string, unknown>)[section] ?? {};
  const override = await getCmsSection(lang as Locale, section as CmsSection);
  const initial = { ...(base as Record<string, unknown>), ...(override ?? {}) };

  return (
    <div>
      <a
        href="/admin"
        className="mb-4 inline-block text-sm text-slate-400 transition-colors hover:text-cyan-400"
      >
        ← Volver al panel
      </a>
      <h1 className="mb-6 text-2xl font-bold capitalize text-slate-100">
        Editar: {section}
      </h1>
      <SectionEditor section={section} lang={lang} initial={initial} />
    </div>
  );
}
