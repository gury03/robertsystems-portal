import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { LogoMark } from "./icons";

export default function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();

  const links = [
    { href: "#inicio", label: dict.nav.home },
    { href: "#servicios", label: dict.nav.services },
    { href: "#proyectos", label: dict.nav.projects },
    { href: "#nosotros", label: dict.nav.about },
    { href: "#contacto", label: dict.nav.contact },
  ];

  const services = dict.services.items.map((item) => ({
    label: item.title,
    href: "#servicios",
  }));

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight text-heading">
              Robertsystems
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-heading">
            {dict.footer.linksTitle}
          </h3>
          <ul className="space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-heading">
            {dict.footer.servicesTitle}
          </h3>
          <ul className="space-y-2.5">
            {services.map((service) => (
              <li key={service.label}>
                <a
                  href={service.href}
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted sm:flex-row">
          <p>
            © {year} Robertsystems. {dict.footer.rights}
          </p>
          <p>
            <Link
              href="/es"
              className="transition-colors hover:text-primary"
            >
              robertsystems.org
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
