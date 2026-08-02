"use client";

import type { ReactNode } from "react";

const inputCls =
  "w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none transition-colors focus:border-cyan-400";
const btnGhost =
  "inline-flex items-center gap-1 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-400";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-slate-200">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputCls}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 4,
}: {
  value?: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={`${inputCls} resize-y`}
    />
  );
}

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
      {title && (
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
          {title}
        </h4>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/** Editor para una lista de textos simples (tags, features, párrafos...). */
export function StringListEditor({
  label,
  values,
  onChange,
  addLabel = "Agregar",
}: {
  label: string;
  values?: string[];
  onChange: (v: string[]) => void;
  addLabel?: string;
}) {
  const items = Array.isArray(values) ? values : [];
  return (
    <Field label={label}>
      <div className="space-y-2">
        {items.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <TextInput
              value={v}
              onChange={(nv) => {
                const next = [...items];
                next[i] = nv;
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className={btnGhost}
              aria-label="Eliminar"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className={`${btnGhost} border-cyan-600/60 text-cyan-300 hover:border-cyan-400`}
        >
          + {addLabel}
        </button>
      </div>
    </Field>
  );
}
