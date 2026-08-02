import type { Dictionary } from "@/i18n/dictionaries";
import { ShieldIcon, HandshakeIcon, RocketIcon } from "./icons";

const valueIcons = [ShieldIcon, HandshakeIcon, RocketIcon];

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="nosotros" className="bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {dict.about.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{dict.about.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            {dict.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-text">
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-3 gap-4 pt-4">
              {dict.about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card p-4 text-center"
                >
                  <p className="text-2xl font-bold gradient-text">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {dict.about.values.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <div
                  key={value.title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-heading">{value.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
