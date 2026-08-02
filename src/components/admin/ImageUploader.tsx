"use client";

import { useRef, useState } from "react";

export default function ImageUploader({
  folder,
  value,
  onChange,
  multiple = false,
  label = "Subir imagen",
  addLabel = "Agregar",
}: {
  folder: string;
  value?: string | string[];
  onChange: (v: string | string[] | undefined) => void;
  multiple?: boolean;
  label?: string;
  addLabel?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const items: string[] = multiple
    ? Array.isArray(value)
      ? value.filter((v): v is string => typeof v === "string")
      : []
    : typeof value === "string"
      ? [value]
      : [];

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", folder);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: fd,
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.ok) {
          throw new Error(json.error ?? "Error al subir");
        }
        urls.push(json.url as string);
      }
      if (multiple) {
        onChange([...(Array.isArray(value) ? value : []), ...urls]);
      } else {
        onChange(urls[0]);
      }
      if (inputRef.current) inputRef.current.value = "";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al subir");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((url, i) => (
            <div key={url + i} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="h-20 w-28 rounded-lg border border-slate-600 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  if (multiple) {
                    onChange(items.filter((_, j) => j !== i));
                  } else {
                    onChange(undefined);
                  }
                }}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white hover:bg-red-400"
                aria-label="Quitar imagen"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-cyan-600/60 px-3 py-1.5 text-xs font-medium text-cyan-300 transition-colors hover:border-cyan-400">
        {uploading ? "Subiendo..." : items.length === 0 ? label : `+ ${addLabel}`}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
