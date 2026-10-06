import type { Metadata } from "next";
import { dictionaries, isLocale, type Locale } from "@/content/locales";
import { CaseExplorer } from "@/components/home/CaseExplorer";
import { Hero, TrustBar } from "@/components/home/Hero";
import { AboutSection, ContactSection, FaqSection, ProcessSection, WhySection } from "@/components/home/HomeSections";
import { JsonLd } from "@/components/JsonLd";
import { faqLd, legalServiceLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = dictionaries[locale];
  return pageMetadata({ locale, title: d.meta.title, description: d.meta.description, keywords: d.meta.keywords });
}

export default async function HomePage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const dict = dictionaries[locale];
  const items = dict.caseList.map(({ slug, icon, title, summary, cardCta, audiences, guide }) => ({ slug, icon, title, summary, cardCta, audiences, guide }));

  return (
    <>
      <JsonLd data={legalServiceLd(dict, locale)} />
      <JsonLd data={faqLd(dict.faq.items)} />
      <Hero dict={dict} />
      <TrustBar dict={dict} />
      <section id="cases" className="section scroll-mt-20">
        <div className="container-site">
          <CaseExplorer locale={locale} labels={dict.cases} items={items} />
        </div>
      </section>
      <WhySection dict={dict} />
      <ProcessSection dict={dict} />
      <AboutSection dict={dict} />
      <FaqSection dict={dict} />
      <ContactSection dict={dict} />
    </>
  );
}
