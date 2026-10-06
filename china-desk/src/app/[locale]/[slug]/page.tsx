import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, locales, type Locale } from "@/content/locales";
import { CaseDetailView } from "@/components/case/CaseDetailView";
import { JsonLd } from "@/components/JsonLd";
import { findCase } from "@/lib/cases";
import { breadcrumbLd, faqLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => dictionaries[locale].caseList.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const c = findCase(dictionaries[locale], slug);
  if (!c) return {};
  return pageMetadata({ locale, path: `/${slug}`, title: c.seo.title, description: c.seo.description, keywords: c.seo.keywords });
}

export default async function CasePage({ params }: Props) {
  const { locale, slug } = await params;
  const dict = dictionaries[locale as Locale];
  const c = findCase(dict, slug);
  if (!c) notFound();

  return (
    <>
      <JsonLd data={faqLd(c.faq)} />
      <JsonLd data={breadcrumbLd(dict, locale as Locale, c)} />
      <CaseDetailView dict={dict} c={c} />
    </>
  );
}
