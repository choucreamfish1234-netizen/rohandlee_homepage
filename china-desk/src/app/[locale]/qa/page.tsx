import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, type Locale } from "@/content/locales";
import { QaLinkList } from "@/components/qa/QaDetailView";
import { hasQa, listedQa, localesWithQa } from "@/lib/qa";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = dictionaries[locale];
  if (!hasQa(d)) return {};
  return pageMetadata({
    locale,
    path: "/qa",
    title: `${d.qa!.title} | ${d.brand.sub}`,
    description: d.qa!.subtitle,
    available: localesWithQa(),
    // 검수 완료된 질문이 하나도 없으면 빈 목록을 색인시키지 않는다
    noindex: listedQa(d).length === 0,
  });
}

export default async function QaIndexPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const dict = dictionaries[locale];
  if (!hasQa(dict)) notFound();
  const items = listedQa(dict);

  return (
    <div className="container-site max-w-4xl py-12 sm:py-16">
      <h1 className="text-[26px] font-bold tracking-tight text-navy sm:text-[32px]">{dict.qa!.title}</h1>
      <p className="mt-3 text-[15.5px] leading-relaxed text-mute">{dict.qa!.subtitle}</p>
      {items.length > 0 ? (
        <QaLinkList dict={dict} items={items} />
      ) : (
        <p className="mt-8 rounded-card border border-line p-8 text-center text-[15px] text-mute">준비 중입니다.</p>
      )}
    </div>
  );
}
