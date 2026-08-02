import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robertsystems.org"),
  title: {
    default: "Robertsystems — Desarrollo de software a medida",
    template: "%s | Robertsystems",
  },
  description:
    "Diseñamos y desarrollamos aplicaciones móviles, programas para PC y páginas web. Proyectos activos: controlISP y sistema POS para negocios y bodegas.",
  keywords: [
    "Robertsystems",
    "desarrollo de software",
    "aplicaciones móviles",
    "programas para PC",
    "páginas web",
    "sistema POS",
    "controlISP",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Robertsystems",
    title: "Robertsystems — Desarrollo de software a medida",
    description:
      "Aplicaciones móviles, programas para PC y páginas web hechas a la medida de tu negocio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
