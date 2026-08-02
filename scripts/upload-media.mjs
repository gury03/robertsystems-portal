// Sube los logos y capturas al portal vía la API del panel (/api/admin/upload)
// Uso: node scripts/upload-media.mjs
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE = "https://robertsystems.org";
const PASSWORD = process.env.ADMIN_PASSWORD || "";

async function login() {
  const res = await fetch(`${BASE}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login falló (${res.status})`);
  const cookie = (res.headers.get("set-cookie") || "").split(";")[0];
  return cookie;
}

async function upload(cookie, filePath, folder) {
  const name = filePath.split(/[\\/]/).pop();
  const buffer = readFileSync(resolve(filePath));
  const ext = name.includes(".") ? name.split(".").pop().toLowerCase() : "png";
  const contentType =
    ext === "jpg" || ext === "jpeg"
      ? "image/jpeg"
      : ext === "svg"
        ? "image/svg+xml"
        : "image/png";
  const form = new FormData();
  form.append("folder", folder);
  form.append("file", new Blob([buffer], { type: contentType }), name);
  const res = await fetch(`${BASE}/api/admin/upload`, {
    method: "POST",
    headers: { Cookie: cookie },
    body: form,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.ok) {
    throw new Error(`Subida ${name}: ${json.error || res.status}`);
  }
  return json.url;
}

async function main() {
  const files = [
    ["C:/Users/Usuario/Documents/carp/cloudflare-isp/frontend/public/logo_controlisp.png", "projects/controlisp", "logoControlIsp"],
    ["C:/Users/Usuario/Documents/Proyectos/PuntoDeVenta-win7/PuntoDeVenta/icono_app.png", "projects/puntodeventa", "logoPos"],
    ["C:/Users/Usuario/Documents/carp/app/Imagenes/dashboard.png", "projects/controlisp", "shotDashboard"],
    ["C:/Users/Usuario/Documents/carp/app/Imagenes/abonados.png", "projects/controlisp", "shotAbonados"],
    ["C:/Users/Usuario/Documents/carp/app/Imagenes/pagos.png", "projects/controlisp", "shotPagos"],
  ];

  const cookie = await login();
  const urls = {};
  for (const [file, folder, key] of files) {
    const url = await upload(cookie, file, folder);
    urls[key] = url;
    console.log(`${key}: ${url}`);
  }
  console.log("JSON=" + JSON.stringify(urls));
}

main().catch((e) => {
  console.error("ERROR:", e.message);
  process.exit(1);
});
