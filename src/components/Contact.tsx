"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { MailIcon, MapPinIcon } from "./icons";

export default function Contact({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: conectar a un servicio de formularios (Resend, Formspree, EmailJS, etc.)
    setSubmitted(true);
  }

  const inputClasses =
    "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-muted/70 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <section id="contacto">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {dict.contact.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{dict.contact.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          {/* Información de contacto */}
          <div className="space-y-4 lg:col-span-2">
            <div className="gradient-ring flex items-center gap-4 rounded-2xl bg-card p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MailIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  Email
                </p>
                <a
                  href={`mailto:${dict.contact.info.email}`}
                  className="font-medium text-heading transition-colors hover:text-primary"
                >
                  {dict.contact.info.email}
                </a>
              </div>
            </div>

            <div className="gradient-ring flex items-center gap-4 rounded-2xl bg-card p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPinIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  {dict.contact.info.location}
                </p>
                <p className="font-medium text-heading">Robertsystems</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="gradient-ring flex h-full flex-col items-center justify-center rounded-2xl bg-card p-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7"
                    aria-hidden="true"
                  >
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                </div>
                <p className="mt-5 max-w-sm text-lg font-medium text-heading">
                  {dict.contact.form.success}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="gradient-ring space-y-5 rounded-2xl bg-card p-7"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text"
                    >
                      {dict.contact.form.name}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={dict.contact.form.namePlaceholder}
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text"
                    >
                      {dict.contact.form.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={dict.contact.form.emailPlaceholder}
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text"
                  >
                    {dict.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={dict.contact.form.messagePlaceholder}
                    className={`${inputClasses} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-background transition-all hover:bg-cyan-300 hover:shadow-lg hover:shadow-primary/25 sm:w-auto"
                >
                  {dict.contact.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
