// Copia logos/capturas de projects (es) a projects (en)
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
const es = await fetch(`${BASE}/api/admin/content?section=projects&lang=es`, {
  headers: { Cookie: cookie },
}).then((r) => r.json());
const en = await fetch(`${BASE}/api/admin/content?section=projects&lang=en`, {
  headers: { Cookie: cookie },
}).then((r) => r.json());

const esItems = es.data.items;
const enItems = en.data.items;
// copiar logo y screenshots manteniendo el texto del idioma destino
enItems[0].logo = esItems[0].logo;
enItems[0].screenshots = esItems[0].screenshots;
enItems[1].logo = esItems[1].logo;

const body = JSON.stringify({
  section: "projects",
  lang: "en",
  data: { title: en.data.title, subtitle: en.data.subtitle, items: enItems },
});
const res = await fetch(`${BASE}/api/admin/content`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Cookie: cookie },
  body,
});
const json = await res.json().catch(() => ({}));
if (!res.ok || !json.ok) throw new Error(json.error || "Error");
console.log("projects (en) actualizado con logos y capturas OK");
