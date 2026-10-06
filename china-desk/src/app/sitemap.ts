import type { MetadataRoute } from "next";
import { dictionaries, locales } from "@/content/locales";
import { absUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/consult", "/privacy", ...dictionaries.cn.caseList.map((c) => `/${c.slug}`)];
  const now = new Date();
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: absUrl(l, p),
      lastModified: now,
      changeFrequency: p === "" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "" ? 1 : p === "/privacy" ? 0.2 : p === "/consult" ? 0.8 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((x) => [dictionaries[x].htmlLang, absUrl(x, p)])) },
    })),
  );
}
