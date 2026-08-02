import type { Dictionary } from "@/i18n/dictionaries";
import { CheckIcon, DownloadIcon } from "./icons";

export default function Projects({ dict }: { dict: Dictionary }) {
  return (
    <section id="proyectos">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {dict.projects.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{dict.projects.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {dict.projects.items.map((project) => {
            const initials = project.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase();

            return (
              <article
                key={project.name}
                className="gradient-ring overflow-hidden rounded-2xl bg-card transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between border-b border-border/70 px-7 py-5">
                  <div className="flex items-center gap-3">
                    {"logo" in project && project.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.logo as string}
                        alt={project.name}
                        className="h-11 w-11 rounded-xl bg-surface object-contain p-1"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-background">
                        {initials}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-heading">
                        {project.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-muted">
                        {project.type}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    {project.status}
                  </span>
                </div>

                <div className="p-7">
                  <p className="text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-text"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <CheckIcon className="h-3 w-3" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {"screenshots" in project &&
                    Array.isArray(project.screenshots) &&
                    (project.screenshots as string[]).length > 0 && (
                      <div className="mt-6">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                          Capturas
                        </p>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {(project.screenshots as string[]).map((src) => (
                            <a
                              key={src}
                              href={src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group overflow-hidden rounded-lg border border-border/60 transition-colors hover:border-primary/50"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={src}
                                alt={`${project.name} captura`}
                                loading="lazy"
                                className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  {"tech" in project && project.tech && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {"download" in project && project.download && (
                    <a
                      href={project.download.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-cyan-300 hover:shadow-lg hover:shadow-primary/25"
                    >
                      <DownloadIcon className="h-4 w-4" />
                      {project.download.label}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
