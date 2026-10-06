import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/config/site";
import { dictionaries, isLocale, type Locale } from "@/content/locales";
import { ConsultForm } from "@/components/consult/ConsultForm";
import { ConsultFormFromQuery } from "@/components/consult/ConsultFormFromQuery";
import { KakaoLink, PhoneLink, WechatButton } from "@/components/contact";
import { Icon } from "@/components/Icon";
import { caseOptions } from "@/lib/cases";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = dictionaries[locale];
  return pageMetadata({ locale, path: "/consult", title: `${d.form.title} | ${d.brand.name}`, description: d.form.subtitle });
}

export default async function ConsultPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const dict = dictionaries[locale];
  const formProps = { locale, form: dict.form, caseOptions: caseOptions(dict), location: "consult_page" as const, showHeading: false };

  return (
    <div className="bg-mist">
      <div className="container-site grid gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-navy sm:text-[32px]">{dict.form.title}</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mute">{dict.form.subtitle}</p>
          <div className="card mt-7 p-5 sm:p-8">
            <Suspense fallback={<ConsultForm {...formProps} />}>
              <ConsultFormFromQuery {...formProps} />
            </Suspense>
          </div>
        </div>

        <aside className="space-y-3 lg:pt-[92px]">
          <p className="text-[14px] font-semibold text-charcoal">{dict.contact.subtitle}</p>
          <WechatButton location="consult_page" className="flex h-12 w-full items-center justify-center gap-2 rounded-card bg-wechat text-[15px] font-semibold text-white">
            <Icon name="wechat" />
            {dict.common.wechatConsult}
          </WechatButton>
          <PhoneLink location="consult_page" className="btn-outline w-full">
            <Icon name="phone" className="h-4 w-4" />
            {site.phone.intl}
          </PhoneLink>
          <KakaoLink location="consult_page" className="btn-outline w-full">
            <Icon name="kakao" className="h-4 w-4" />
            {site.kakao.id}
          </KakaoLink>
        </aside>
      </div>
    </div>
  );
}
