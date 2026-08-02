"use client";

import { useState } from "react";
import {
  Field,
  TextInput,
  TextArea,
  Card,
  StringListEditor,
} from "./ui";

type Data = Record<string, unknown>;

function asStr(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function asArr(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}

export default function SectionEditor({
  section,
  lang,
  initial,
}: {
  section: string;
  lang: string;
  initial: Data;
}) {
  const [data, setData] = useState<Data>(() => {
    // Hero: si el título viene como segmentos, lo aplanamos a texto.
    if (section === "hero" && Array.isArray(initial.title)) {
      const joined = (initial.title as { text: string }[])
        .map((s) => s.text)
        .join("");
      return { ...initial, title: joined };
    }
    return initial;
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setField(key: string, value: unknown) {
    setData((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, lang, data }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Error");
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {error && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="space-y-6">
        {section === "nav" && <NavForm data={data} setField={setField} />}
        {section === "hero" && <HeroForm data={data} setField={setField} />}
        {section === "services" && (
          <ServicesForm data={data} setField={setField} />
        )}
        {section === "projects" && (
          <ProjectsForm data={data} setField={setField} />
        )}
        {section === "about" && <AboutForm data={data} setField={setField} />}
        {section === "contact" && <ContactForm data={data} setField={setField} />}
        {section === "footer" && <FooterForm data={data} setField={setField} />}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-cyan-400 disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
        {saved && <span className="text-sm text-emerald-400">✓ Guardado</span>}
      </div>
    </div>
  );
}

/* ---------- Formularios por sección ---------- */

function NavForm({
  data,
  setField,
}: {
  data: Data;
  setField: (k: string, v: unknown) => void;
}) {
  const keys = ["home", "services", "projects", "about", "contact", "cta"];
  return (
    <Card title="Menú de navegación">
      {keys.map((k) => (
        <Field key={k} label={k}>
          <TextInput value={asStr(data[k])} onChange={(v) => setField(k, v)} />
        </Field>
      ))}
    </Card>
  );
}

function HeroForm({
  data,
  setField,
}: {
  data: Data;
  setField: (k: string, v: unknown) => void;
}) {
  return (
    <Card title="Portada (Hero)">
      <Field label="Etiqueta / insignia">
        <TextInput value={asStr(data.badge)} onChange={(v) => setField("badge", v)} />
      </Field>
      <Field label="Título principal" hint="Se mostrará sin resaltado especial.">
        <TextArea
          value={asStr(data.title)}
          onChange={(v) => setField("title", v)}
          rows={2}
        />
      </Field>
      <Field label="Subtítulo">
        <TextArea
          value={asStr(data.subtitle)}
          onChange={(v) => setField("subtitle", v)}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Botón principal">
          <TextInput
            value={asStr(data.ctaPrimary)}
            onChange={(v) => setField("ctaPrimary", v)}
          />
        </Field>
        <Field label="Botón secundario">
          <TextInput
            value={asStr(data.ctaSecondary)}
            onChange={(v) => setField("ctaSecondary", v)}
          />
        </Field>
      </div>
    </Card>
  );
}

function ServicesForm({
  data,
  setField,
}: {
  data: Data;
  setField: (k: string, v: unknown) => void;
}) {
  const items = asArr(data.items) as Record<string, unknown>[];
  function setItem(i: number, key: string, value: unknown) {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    setField("items", next);
  }
  function addItem() {
    setField("items", [...items, { icon: "mobile", title: "", description: "", tags: [] }]);
  }
  function removeItem(i: number) {
    setField("items", items.filter((_, j) => j !== i));
  }

  return (
    <div className="space-y-4">
      <Field label="Título de la sección">
        <TextInput value={asStr(data.title)} onChange={(v) => setField("title", v)} />
      </Field>
      <Field label="Subtítulo">
        <TextInput value={asStr(data.subtitle)} onChange={(v) => setField("subtitle", v)} />
      </Field>
      <div className="space-y-4">
        {items.map((item, i) => (
          <Card key={i} title={`Servicio ${i + 1}`}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Título">
                <TextInput value={asStr(item.title)} onChange={(v) => setItem(i, "title", v)} />
              </Field>
              <Field label="Icono" hint="mobile, desktop o web">
                <TextInput value={asStr(item.icon)} onChange={(v) => setItem(i, "icon", v)} />
              </Field>
            </div>
            <Field label="Descripción">
              <TextArea value={asStr(item.description)} onChange={(v) => setItem(i, "description", v)} />
            </Field>
            <StringListEditor
              label="Etiquetas"
              values={asArr(item.tags) as string[]}
              onChange={(v) => setItem(i, "tags", v)}
            />
            <div className="pt-1">
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="rounded-lg border border-red-500/50 px-3 py-1.5 text-xs text-red-300 hover:border-red-400"
              >
                Eliminar servicio
              </button>
            </div>
          </Card>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="rounded-full border border-cyan-600/60 px-4 py-2 text-sm text-cyan-300 hover:border-cyan-400"
        >
          + Agregar servicio
        </button>
      </div>
    </div>
  );
}

function ProjectsForm({
  data,
  setField,
}: {
  data: Data;
  setField: (k: string, v: unknown) => void;
}) {
  const items = asArr(data.items) as Record<string, unknown>[];
  function setItem(i: number, key: string, value: unknown) {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    setField("items", next);
  }
  function addItem() {
    setField("items", [
      ...items,
      { name: "", status: "Activo", type: "", description: "", features: [] },
    ]);
  }
  function removeItem(i: number) {
    setField("items", items.filter((_, j) => j !== i));
  }

  return (
    <div className="space-y-4">
      <Field label="Título de la sección">
        <TextInput value={asStr(data.title)} onChange={(v) => setField("title", v)} />
      </Field>
      <Field label="Subtítulo">
        <TextInput value={asStr(data.subtitle)} onChange={(v) => setField("subtitle", v)} />
      </Field>
      <div className="space-y-4">
        {items.map((item, i) => {
          const download =
            item.download && typeof item.download === "object"
              ? (item.download as Record<string, unknown>)
              : null;
          return (
            <Card key={i} title={`Proyecto ${i + 1}`}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre">
                  <TextInput value={asStr(item.name)} onChange={(v) => setItem(i, "name", v)} />
                </Field>
                <Field label="Tipo">
                  <TextInput value={asStr(item.type)} onChange={(v) => setItem(i, "type", v)} />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Estado" hint="Activo, Beta, etc.">
                  <TextInput value={asStr(item.status)} onChange={(v) => setItem(i, "status", v)} />
                </Field>
                <Field label="Descarga: URL" hint="Dejar vacío para ocultar el botón de descarga">
                  <TextInput
                    value={download ? asStr(download.url) : ""}
                    onChange={(v) =>
                      setItem(i, "download", v ? { url: v, label: asStr(download?.label) || "Descargar" } : null)
                    }
                  />
                </Field>
              </div>
              <Field label="Descripción">
                <TextArea value={asStr(item.description)} onChange={(v) => setItem(i, "description", v)} />
              </Field>
              <StringListEditor
                label="Características"
                values={asArr(item.features) as string[]}
                onChange={(v) => setItem(i, "features", v)}
              />
              {download && (
                <Field label="Texto del botón de descarga">
                  <TextInput
                    value={asStr(download.label)}
                    onChange={(v) =>
                      setItem(i, "download", { ...download, label: v })
                    }
                  />
                </Field>
              )}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="rounded-lg border border-red-500/50 px-3 py-1.5 text-xs text-red-300 hover:border-red-400"
                >
                  Eliminar proyecto
                </button>
              </div>
            </Card>
          );
        })}
        <button
          type="button"
          onClick={addItem}
          className="rounded-full border border-cyan-600/60 px-4 py-2 text-sm text-cyan-300 hover:border-cyan-400"
        >
          + Agregar proyecto
        </button>
      </div>
    </div>
  );
}

function AboutForm({
  data,
  setField,
}: {
  data: Data;
  setField: (k: string, v: unknown) => void;
}) {
  const stats = asArr(data.stats) as Record<string, unknown>[];
  const values = asArr(data.values) as Record<string, unknown>[];
  function setStat(i: number, key: string, value: unknown) {
    const next = [...stats];
    next[i] = { ...next[i], [key]: value };
    setField("stats", next);
  }
  function setValue(i: number, key: string, value: unknown) {
    const next = [...values];
    next[i] = { ...next[i], [key]: value };
    setField("values", next);
  }
  function addStat() {
    setField("stats", [...stats, { value: "", label: "" }]);
  }
  function addValue() {
    setField("values", [...values, { title: "", description: "" }]);
  }

  return (
    <div className="space-y-4">
      <Field label="Título de la sección">
        <TextInput value={asStr(data.title)} onChange={(v) => setField("title", v)} />
      </Field>
      <Field label="Subtítulo">
        <TextArea value={asStr(data.subtitle)} onChange={(v) => setField("subtitle", v)} rows={2} />
      </Field>
      <StringListEditor
        label="Párrafos"
        values={asArr(data.paragraphs) as string[]}
        onChange={(v) => setField("paragraphs", v)}
        addLabel="Agregar párrafo"
      />
      <Card title="Estadísticas">
        {stats.map((s, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="flex-1">
              <Field label="Valor">
                <TextInput value={asStr(s.value)} onChange={(v) => setStat(i, "value", v)} />
              </Field>
            </div>
            <div className="flex-1">
              <Field label="Etiqueta">
                <TextInput value={asStr(s.label)} onChange={(v) => setStat(i, "label", v)} />
              </Field>
            </div>
            <button
              type="button"
              onClick={() => setField("stats", stats.filter((_, j) => j !== i))}
              className="mb-1 rounded-lg border border-red-500/50 px-3 py-1.5 text-xs text-red-300"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addStat}
          className="rounded-lg border border-cyan-600/60 px-3 py-1.5 text-xs text-cyan-300 hover:border-cyan-400"
        >
          + Agregar estadística
        </button>
      </Card>
      <Card title="Valores">
        {values.map((v, i) => (
          <div key={i} className="rounded-lg border border-slate-700 p-3">
            <Field label="Título">
              <TextInput value={asStr(v.title)} onChange={(nv) => setValue(i, "title", nv)} />
            </Field>
            <Field label="Descripción">
              <TextArea value={asStr(v.description)} onChange={(nv) => setValue(i, "description", nv)} rows={2} />
            </Field>
            <button
              type="button"
              onClick={() => setField("values", values.filter((_, j) => j !== i))}
              className="rounded-lg border border-red-500/50 px-3 py-1.5 text-xs text-red-300"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addValue}
          className="rounded-lg border border-cyan-600/60 px-3 py-1.5 text-xs text-cyan-300 hover:border-cyan-400"
        >
          + Agregar valor
        </button>
      </Card>
    </div>
  );
}

function ContactForm({
  data,
  setField,
}: {
  data: Data;
  setField: (k: string, v: unknown) => void;
}) {
  const info =
    data.info && typeof data.info === "object"
      ? (data.info as Record<string, unknown>)
      : {};
  function setInfo(key: string, value: unknown) {
    setField("info", { ...info, [key]: value });
  }
  return (
    <Card title="Contacto">
      <Field label="Título">
        <TextInput value={asStr(data.title)} onChange={(v) => setField("title", v)} />
      </Field>
      <Field label="Subtítulo">
        <TextArea value={asStr(data.subtitle)} onChange={(v) => setField("subtitle", v)} rows={2} />
      </Field>
      <Field label="Correo de contacto">
        <TextInput value={asStr(info.email)} onChange={(v) => setInfo("email", v)} />
      </Field>
      <Field label="Ubicación / texto informativo">
        <TextInput value={asStr(info.location)} onChange={(v) => setInfo("location", v)} />
      </Field>
    </Card>
  );
}

function FooterForm({
  data,
  setField,
}: {
  data: Data;
  setField: (k: string, v: unknown) => void;
}) {
  const keys = ["tagline", "linksTitle", "servicesTitle", "rights"];
  return (
    <Card title="Pie de página">
      {keys.map((k) => (
        <Field key={k} label={k}>
          <TextInput value={asStr(data[k])} onChange={(v) => setField(k, v)} />
        </Field>
      ))}
    </Card>
  );
}
