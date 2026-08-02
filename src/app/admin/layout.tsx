import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de administración | Robertsystems",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <a href="/admin" className="flex items-center gap-2 font-bold text-slate-100">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-sm text-slate-900">
              R
            </span>
            Robertsystems <span className="text-cyan-400">· Panel</span>
          </a>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="/es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 transition-colors hover:text-cyan-400"
            >
              Ver sitio ↗
            </a>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
    </div>
  );
}
