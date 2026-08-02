# Robertsystems — Portal web

Portal oficial de **Robertsystems** (`robertsystems.org`), empresa dedicada al diseño y desarrollo de software a medida: **aplicaciones móviles**, **programas para PC** y **páginas web**.

## ✨ Características

- 🌐 **Bilingüe**: español / inglés con selector de idioma (`/es` y `/en`)
- 🎨 **Tema oscuro tecnológico** con acentos cian/azul (Tailwind CSS v4)
- 📱 **Responsive** con menú móvil
- 🧩 Secciones: Inicio, Servicios, Proyectos activos (controlISP y Sistema POS), Nosotros y Contacto
- 🔍 SEO: `sitemap.xml`, `robots.txt`, metadatos Open Graph y rutas estáticas
- ☁️ Listo para **Cloudflare Pages**

## 🚀 Puesta en marcha

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Compilación de producción
npm run build

# Servidor de producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) — la raíz redirige a `/es`.

## 🧱 Tecnologías

| Tecnología  | Uso                                  |
| ----------- | ------------------------------------ |
| Next.js 15  | Framework (App Router)               |
| React 19    | UI                                   |
| TypeScript  | Tipado estático                      |
| Tailwind 4  | Estilos                              |
| OpenNext    | Adaptador para Cloudflare Pages      |

## 📂 Estructura

```
src/
├── app/
│   ├── [lang]/          # Rutas bilingües (es/en)
│   │   ├── layout.tsx
│   │   └── page.tsx     # Página principal
│   ├── admin/           # Panel de administración (/admin)
│   │   ├── login/       # Inicio de sesión
│   │   └── [section]/   # Editor de cada sección
│   ├── api/
│   │   ├── admin/       # API del panel (login, logout, content)
│   │   └── contact/     # API del formulario de contacto
│   ├── layout.tsx
│   ├── page.tsx         # Redirige a /es
│   ├── globals.css      # Tema y utilidades
│   ├── icon.svg         # Favicon
│   ├── robots.ts
│   └── sitemap.ts
├── components/          # Navbar, Hero, Services, Projects, About, Contact, Footer, icons
│   └── admin/           # Componentes del panel (editores de secciones)
├── i18n/                # Diccionarios es.ts / en.ts + config
└── lib/                 # cms.ts (contenido D1) y admin-auth.ts
```

## 🛠️ Panel de administración (`/admin`)

El portal incluye un panel propio para editar el contenido sin programar:

- Ruta: `https://robertsystems.org/admin`
- Protegido por contraseña (`ADMIN_PASSWORD`)
- Permite editar: menú, portada, servicios, proyectos, nosotros, contacto y pie de página
- Los cambios se guardan en **Cloudflare D1** y se publican **al instante**

Para configurar la contraseña en producción:
```bash
npx wrangler secret put ADMIN_PASSWORD
```

## ☁️ Despliegue en Cloudflare

El proyecto usa el adaptador **OpenNext** (`@opennextjs/cloudflare`), que compila la app a un Worker de Cloudflare con assets estáticos. Ya configurado en:

- `wrangler.jsonc` — configuración del Worker (nombre: `robertsystems-portal`)
- `open-next.config.ts` — configuración del adaptador
- `public/_headers` — cabeceras de caché para `/ _next/static/*`

### Opción A — Desplegar desde tu PC (la más rápida)

```bash
# Autenticarse en Cloudflare (solo la primera vez)
npx wrangler login

# Compilar y desplegar a Cloudflare
npm run deploy

# Probar localmente el resultado del build
npm run preview
```

Luego, en el [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → selecciona `robertsystems-portal` → **Custom domains** → añade `robertsystems.org` y `www.robertsystems.org` (los certificados HTTPS se generan automáticamente).

### Opción B — CI/CD con GitHub Actions (despliegue automático)

Este proyecto incluye el workflow `.github/workflows/deploy.yml`. Para usarlo:

1. Sube el repositorio a **GitHub**.
2. En el repositorio, ve a **Settings → Secrets and variables → Actions** y agrega:
   - `CLOUDFLARE_API_TOKEN` — token con permiso *Workers Scripts: Edit* (crear en el dashboard: My Profile → API Tokens)
   - `CLOUDFLARE_ACCOUNT_ID` — tu Account ID (visible en la página de inicio del dashboard)
3. Cada `push` a la rama `main` compila y despliega automáticamente.

### Opción C — Dashboard de Cloudflare Pages

1. En [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → Connect to Git**.
2. Selecciona el repositorio.
3. Configura el build:

   - **Framework preset**: `Next.js (OpenNext)`
   - **Build command**: `npx opennextjs-cloudflare build`
   - **Build output directory**: `.opennext`

4. Guarda y despliega, y añade tu dominio en **Custom domains**.

> ⚠️ **Nota sobre Windows**: OpenNext advierte que funciona mejor en Linux/WSL. En Windows local el build funciona, pero si tienes problemas de compatibilidad, usa WSL o despliega vía CI/CD (GitHub Actions se ejecuta en Linux).

## 🎨 Personalización

- **Contenido y textos**: edita `src/i18n/es.ts` y `src/i18n/en.ts`.
- **Colores**: modifica las variables del tema en `src/app/globals.css`.
- **Proyectos**: agrega/edita los items en la sección `projects` de los diccionarios.

## 📬 Formulario de contacto

El formulario envía los mensajes a `contacto@robertsystems.org` usando el **SMTP de Zoho Mail** (`smtp.zoho.com`, puerto 465/SSL) mediante `nodemailer` en la API route `src/app/api/contact/route.ts`.

Variables de entorno necesarias:

- `ZOHO_SMTP_HOST=smtp.zoho.com`
- `ZOHO_SMTP_PORT=465`
- `ZOHO_SMTP_USER=contacto@robertsystems.org`
- `ZOHO_SMTP_PASS` — contraseña de aplicación generada en Zoho (verificación en 2 pasos)
- `CONTACT_TO=contacto@robertsystems.org`

En producción, `ZOHO_SMTP_PASS` se guarda como **secret del Worker** (`npx wrangler secret put ZOHO_SMTP_PASS`); las demás van en `wrangler.jsonc` → `vars`. En desarrollo local, copia `.dev.vars.example` a `.dev.vars`.

## 🧹 Limpieza de instrucciones

Este archivo es el README del proyecto. El archivo `.github/copilot-instructions.md` contiene las instrucciones de trabajo de Copilot para este workspace.
