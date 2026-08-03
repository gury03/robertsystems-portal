import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin-auth";
import { CMS_SECTIONS } from "@/lib/cms";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminDashboard() {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">
            Panel de administración
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Elige una sección para editar su contenido. Los cambios se publican
            al instante en el portal.
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CMS_SECTIONS.map((s) => (
          <Link
            key={s}
            href={`/admin/${s}`}
            className="group flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 transition-colors hover:border-cyan-500/60"
          >
            <span className="text-base font-semibold capitalize text-slate-100">
              {s}
            </span>
            <span className="text-cyan-400 transition-transform group-hover:translate-x-1">
              Editar →
            </span>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
        <span className="font-medium text-slate-300">¿Dónde están los idiomas?</span>{" "}
        Dentro de cada sección verás un selector <strong>Español / English</strong>{" "}
        para editar el contenido en cada idioma. Si no has editado un idioma, se
        muestran los textos por defecto del portal.
      </div>
    </div>
  );
}
