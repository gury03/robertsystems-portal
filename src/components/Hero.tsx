import type { Dictionary } from "@/i18n/dictionaries";
import { ArrowRightIcon } from "./icons";

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-border/60"
    >
      <div className="grid-bg absolute inset-0" aria-hidden="true" />

      {/* Resplandores decorativos */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {dict.hero.badge}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-heading sm:text-5xl lg:text-6xl">
            {typeof dict.hero.title === "string" ? (
              dict.hero.title
            ) : (
              (dict.hero.title as { text: string; highlight?: boolean }[]).map(
                (segment, i) =>
                  segment.highlight ? (
                    <span key={i} className="gradient-text">
                      {segment.text}
                    </span>
                  ) : (
                    <span key={i}>{segment.text}</span>
                  )
              )
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {dict.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#proyectos"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-background transition-all hover:bg-cyan-300 hover:shadow-lg hover:shadow-primary/25 sm:w-auto"
            >
              {dict.hero.ctaPrimary}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contacto"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface/60 px-7 py-3.5 text-sm font-semibold text-text transition-colors hover:border-primary/50 hover:text-primary sm:w-auto"
            >
              {dict.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
