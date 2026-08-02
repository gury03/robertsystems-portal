import type { Dictionary } from "@/i18n/dictionaries";
import { MobileIcon, DesktopIcon, WebIcon } from "./icons";

const iconMap = {
  mobile: MobileIcon,
  desktop: DesktopIcon,
  web: WebIcon,
} as const;

type IconKey = keyof typeof iconMap;

export default function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="servicios" className="bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {dict.services.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{dict.services.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {dict.services.items.map((item) => {
            const Icon = iconMap[item.icon as IconKey];
            return (
              <article
                key={item.title}
                className="group gradient-ring rounded-2xl bg-card p-7 transition-all hover:-translate-y-1 hover:bg-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-background">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-heading">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
