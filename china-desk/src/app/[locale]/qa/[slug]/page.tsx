import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, locales, type Locale } from "@/content/locales";
import { JsonLd } from "@/components/JsonLd";
import { QaDetailView } from "@/components/qa/QaDetailView";
import { findQa, hasQa, localesWithQa } from "@/lib/qa";
import { faqLd, pageMetadata, qaBreadcrumbLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const d = dictionaries[locale];
    return hasQa(d) ? (d.qaList ?? []).map((q) => ({ locale, slug: q.slug })) : [];
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const q = findQa(dictionaries[locale], slug);
  if (!q) return {};
  return pageMetadata({
    locale,
    path: `/qa/${slug}`,
    title: q.seo.title,
    description: q.seo.description,
    keywords: q.seo.keywords,
    available: localesWithQa(slug),
    noindex: !q.reviewed,
  });
}

export default async function QaPage({ params }: Props) {
  const { locale, slug } = await params;
  const dict = dictionaries[locale as Locale];
  const q = findQa(dict, slug);
  if (!q) notFound();

  return (
    <>
      {q.reviewed && <JsonLd data={faqLd([{ q: q.question, a: q.answer }])} />}
      <JsonLd data={qaBreadcrumbLd(dict, locale as Locale, q)} />
      <QaDetailView dict={dict} q={q} />
    </>
  );
}
