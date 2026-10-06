import type { Metadata } from "next";
import { dictionaries, isLocale, type Locale } from "@/content/locales";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = dictionaries[locale];
  return pageMetadata({ locale, path: "/privacy", title: `${d.privacy.title} | ${d.brand.name}`, description: d.privacy.sections[0]?.p[0] ?? d.meta.description });
}

export default async function PrivacyPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const p = dictionaries[locale].privacy;
  return (
    <div className="container-site max-w-3xl py-12 sm:py-16">
      <h1 className="text-[26px] font-bold text-navy sm:text-[32px]">{p.title}</h1>
      <p className="mt-2 text-[14px] text-mute">{p.updated}</p>
      <div className="mt-10 space-y-9">
        {p.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-[18px] font-bold text-navy">{s.h}</h2>
            <div className="mt-3 space-y-2 text-[15px] leading-[1.8] text-charcoal">
              {s.p.map((x) => (
                <p key={x}>{x}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
