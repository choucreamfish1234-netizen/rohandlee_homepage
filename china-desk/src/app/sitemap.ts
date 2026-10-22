import type { MetadataRoute } from "next";
import { dictionaries, locales } from "@/content/locales";
import { absUrl } from "@/lib/seo";
import { listedQa } from "@/lib/qa";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/consult", "/privacy", ...dictionaries.cn.caseList.map((c) => `/${c.slug}`)];
  const now = new Date();
  const pages: MetadataRoute.Sitemap = paths.flatMap((p) =>
    locales.map((l) => ({
      url: absUrl(l, p),
      lastModified: now,
      changeFrequency: p === "" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "" ? 1 : p === "/privacy" ? 0.2 : p === "/consult" ? 0.8 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((x) => [dictionaries[x].htmlLang, absUrl(x, p)])) },
    })),
  );

  // 질문형 페이지 — 변호사 검수 완료분만 (언어별로 따로 존재)
  const qaEntries: MetadataRoute.Sitemap = locales.flatMap((l) => {
    const items = listedQa(dictionaries[l]).filter((q) => q.reviewed);
    if (items.length === 0) return [];
    return [
      { url: absUrl(l, "/qa"), lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 },
      ...items.map((q) => ({ url: absUrl(l, `/qa/${q.slug}`), lastModified: new Date(q.updated), changeFrequency: "monthly" as const, priority: 0.7 })),
    ];
  });
  return [...pages, ...qaEntries];
}
