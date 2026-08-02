import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "nodejs";

interface R2Object {
  put(
    key: string,
    value: Uint8Array,
    opts?: { httpMetadata?: { contentType?: string } }
  ): Promise<void>;
}

/** Sube una imagen a R2 y devuelve su URL pública (/media/...). */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Formato inválido" }, { status: 400 });
  }

  const file = form.get("file");
  const folder = (form.get("folder") as string) || "general";

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Debe ser una imagen" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json(
      { error: "La imagen supera 8 MB" },
      { status: 400 }
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const cleanName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(-40);
  const key = `${folder}/${Date.now()}-${cleanName}`;

  const { env } = getCloudflareContext();
  const bucket = (env as unknown as Record<string, unknown>)
    .MEDIA_BUCKET as R2Object | undefined;
  if (!bucket) {
    return NextResponse.json(
      { error: "Storage no disponible" },
      { status: 500 }
    );
  }

  try {
    await bucket.put(key, bytes, {
      httpMetadata: { contentType: file.type },
    });
    return NextResponse.json({ ok: true, url: `/media/${key}` });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Error al subir la imagen" }, { status: 500 });
  }
}
