import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

/** Sirve imágenes almacenadas en R2 desde /media/... */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key } = await params;
  if (!Array.isArray(key) || key.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  const { env } = getCloudflareContext();
  const bucket = (env as unknown as Record<string, unknown>)
    .MEDIA_BUCKET as
    | { get(key: string): Promise<{
        writeHttpMetadata(headers: Headers): void;
        httpEtag: string;
        body: ReadableStream;
      } | null> }
    | undefined;

  if (!bucket) {
    return new Response("Storage no disponible", { status: 500 });
  }

  const object = await bucket.get(key.join("/"));
  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}
