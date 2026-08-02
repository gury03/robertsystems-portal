"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { LogoMark, MenuIcon, CloseIcon } from "./icons";

interface NavbarProps {
  dict: Dictionary;
  lang: Locale;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const otherLang: Locale = lang === "es" ? "en" : "es";
  const toggleHref = pathname
    ? pathname.replace(`/${lang}`, `/${otherLang}`)
    : `/${otherLang}`;

  const links = [
    { href: "#inicio", label: dict.nav.home },
    { href: "#servicios", label: dict.nav.services },
    { href: "#proyectos", label: dict.nav.projects },
    { href: "#nosotros", label: dict.nav.about },
    { href: "#contacto", label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#inicio" className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-heading">
            Robertsystems
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={toggleHref}
            className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-primary/50 hover:text-primary"
            aria-label={`Switch to ${otherLang === "es" ? "Español" : "English"}`}
          >
            <span className={lang === "es" ? "text-primary" : ""}>ES</span>
            <span className="text-border">/</span>
            <span className={lang === "en" ? "text-primary" : ""}>EN</span>
          </Link>

          <a
            href="#contacto"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-cyan-300 sm:inline-block"
          >
            {dict.nav.cta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-text hover:bg-surface md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-text transition-colors hover:bg-card hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-background"
            >
              {dict.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
