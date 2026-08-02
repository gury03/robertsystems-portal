// Guarda logos y capturas en la sección projects del portal (idioma es)
import { readFileSync } from "node:fs";

const BASE = "https://robertsystems.org";
const PASSWORD = process.env.ADMIN_PASSWORD || "";

async function login() {
  const res = await fetch(`${BASE}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login falló (${res.status})`);
  return (res.headers.get("set-cookie") || "").split(";")[0];
}

const cookie = await login();

const content = await fetch(
  `${BASE}/api/admin/content?section=projects&lang=es`,
  { headers: { Cookie: cookie } }
).then((r) => r.json());

const items = content.data.items;
// controlISP (primer proyecto)
items[0].logo = "/media/projects/controlisp/1785714172883-logo_controlisp.png";
items[0].screenshots = [
  "/media/projects/controlisp/1785714173820-dashboard.png",
  "/media/projects/controlisp/1785714174149-abonados.png",
  "/media/projects/controlisp/1785714174399-pagos.png",
];
// POS (segundo proyecto)
items[1].logo = "/media/projects/puntodeventa/1785714173546-icono_app.png";

const body = JSON.stringify({
  section: "projects",
  lang: "es",
  data: { title: content.data.title, subtitle: content.data.subtitle, items },
});

const res = await fetch(`${BASE}/api/admin/content`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Cookie: cookie },
  body,
});
const json = await res.json().catch(() => ({}));
if (!res.ok || !json.ok) throw new Error(json.error || "Error al guardar");
console.log("Contenido de proyectos actualizado con logos y capturas OK");
