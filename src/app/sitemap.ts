import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://robertsystems.org",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...locales.map((lang) => ({
      url: `https://robertsystems.org/${lang}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
