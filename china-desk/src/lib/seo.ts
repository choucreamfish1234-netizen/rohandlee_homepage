import type { Metadata } from "next";
import { site } from "@/config/site";
import { defaultLocale, dictionaries, locales, type Locale } from "@/content/locales";
import type { CaseDetail, Dictionary, FaqItem } from "@/content/types";

/** "/cn" + path */
export function href(locale: string, path = ""): string {
  return `/${locale}${path}`;
}

export function absUrl(locale: string, path = ""): string {
  return `${site.url}${href(locale, path)}`;
}

/** canonical + hreflang (zh-CN / ko / x-default) */
export function alternatesFor(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[dictionaries[l].htmlLang] = absUrl(l, path);
  languages["x-default"] = absUrl(defaultLocale, path);
  return { canonical: absUrl(locale, path), languages };
}

export function pageMetadata(opts: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
  noindex?: boolean;
}): Metadata {
  const dict = dictionaries[opts.locale];
  const path = opts.path ?? "";
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: alternatesFor(opts.locale, path),
    openGraph: {
      type: "website",
      siteName: dict.brand.name,
      locale: dict.ogLocale,
      url: absUrl(opts.locale, path),
      title: opts.title,
      description: opts.description,
    },
    twitter: { card: "summary", title: opts.title, description: opts.description },
    robots: opts.noindex ? { index: false, follow: false } : undefined,
  };
}

/* ───────── JSON-LD (자체 평점·리뷰 마크업은 넣지 않는다) ───────── */

export function legalServiceLd(dict: Dictionary, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${absUrl(locale)}#legalservice`,
    name: dict.brand.name,
    description: dict.meta.description,
    url: absUrl(locale),
    telephone: site.phone.intl,
    email: site.email,
    inLanguage: dict.htmlLang,
    availableLanguage: ["zh-CN", "ko"],
    areaServed: { "@type": "Country", name: "KR" },
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: "경기도",
      addressLocality: "부천시",
      ...(site.address.detail ? { streetAddress: site.address.detail } : {}),
    },
    parentOrganization: {
      "@type": "LegalService",
      name: "Law Firm Roh&Lee",
      alternateName: "법률사무소 로앤이",
      url: site.mainSite,
    },
  };
}

export function faqLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(dict: Dictionary, locale: Locale, c: CaseDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.common.home, item: absUrl(locale) },
      { "@type": "ListItem", position: 2, name: dict.nav.cases, item: `${absUrl(locale)}#cases` },
      { "@type": "ListItem", position: 3, name: c.title, item: absUrl(locale, `/${c.slug}`) },
    ],
  };
}
