<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instrucciones del workspace — Portal Robertsystems

## Proyecto

Portal web oficial de Robertsystems (`robertsystems.org`): empresa de desarrollo de software a medida (aplicaciones móviles, programas para PC y páginas web).

## Stack

- **Next.js 15** (App Router) con TypeScript
- **Tailwind CSS v4** (tema definido en `src/app/globals.css` vía `@theme`)
- **Bilingüe**: español/inglés mediante diccionarios en `src/i18n/` (rutas `/es` y `/en`)
- Despliegue en **Cloudflare Pages** con adaptador OpenNext

## Convenciones

- Agrega contenido solo en los diccionarios `src/i18n/es.ts` y `src/i18n/en.ts` (ambos deben mantener la misma estructura).
- Los colores del tema se usan como utilidades de Tailwind: `bg-background`, `bg-card`, `text-muted`, `text-primary`, `border-border`, etc.
- Las secciones tienen `id` (`inicio`, `servicios`, `proyectos`, `nosotros`, `contacto`) y navegan con anclas.
- Íconos SVG reutilizables en `src/components/icons.tsx`.
- Comandos: `npm run dev`, `npm run build`, `npm run deploy` (Cloudflare).
