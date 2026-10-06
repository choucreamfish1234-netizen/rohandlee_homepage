import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/config/site";
import { dictionaries, isLocale, type Locale } from "@/content/locales";
import { KakaoLink, PhoneLink, WechatButton } from "@/components/contact";
import { UrgentNotice } from "@/components/consult/UrgentNotice";
import { Icon } from "@/components/Icon";
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = dictionaries[locale];
  return { title: `${d.received.title} | ${d.brand.name}`, robots: { index: false, follow: false } };
}

export default async function ReceivedPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const dict = dictionaries[locale];
  const r = dict.received;

  return (
    <div className="bg-mist">
      <div className="container-site max-w-3xl py-12 sm:py-16">
        <div className="card p-6 text-center sm:p-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
            <Icon name="check" className="h-7 w-7" strokeWidth={2.2} />
          </span>
          <h1 className="mt-5 text-[24px] font-bold text-navy sm:text-[28px]">{r.title}</h1>
          <p className="mt-3 text-[16px] leading-relaxed text-charcoal">
            {r.body[0]}
            <br />
            {r.body[1]}
          </p>
        </div>

        <Suspense fallback={null}>
          <UrgentNotice>
            <div className="mt-5 rounded-card border border-warn/40 bg-warn-bg p-5 sm:p-6" role="alert">
              <p className="flex items-center gap-2 text-[17px] font-bold text-warn">
                <Icon name="alert" />
                {r.urgentTitle}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-charcoal">{r.urgentBody}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <WechatButton location="received" className="flex h-12 items-center justify-center gap-2 rounded-card bg-wechat font-semibold text-white">
                  <Icon name="wechat" />
                  {dict.common.wechatConsult}
                </WechatButton>
                <PhoneLink location="received" className="btn-primary">
                  <Icon name="phone" className="h-4 w-4" />
                  {site.phone.intl}
                </PhoneLink>
              </div>
            </div>
          </UrgentNotice>
        </Suspense>

        <div className="card mt-5 p-5 sm:p-7">
          <h2 className="text-[17px] font-bold text-navy">{r.addUsTitle}</h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-mute">{r.addUsBody}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <WechatButton location="received" className="flex h-12 items-center justify-center gap-2 rounded-card border border-wechat/40 font-semibold text-navy hover:bg-mist">
              <Icon name="wechat" className="h-5 w-5 text-wechat" />
              {dict.wechatModal.title}
            </WechatButton>
            <KakaoLink location="received" className="flex h-12 items-center justify-center gap-2 rounded-card bg-kakao font-semibold text-[#191919]">
              <Icon name="kakao" className="h-5 w-5" />
              {dict.contact.kakaoLabel} {site.kakao.id}
            </KakaoLink>
          </div>
        </div>

        <div className="card mt-5 p-5 sm:p-7">
          <h2 className="text-[17px] font-bold text-navy">{r.nextTitle}</h2>
          <ol className="mt-4 space-y-4">
            {r.next.map((n, i) => (
              <li key={n} className="flex gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold text-[13px] font-bold text-gold">{i + 1}</span>
                <span className="pt-0.5 text-[15px] leading-relaxed text-charcoal">{n}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-8 text-center">
          <Link href={`/${locale}`} className="text-[14px] font-semibold text-navy underline underline-offset-4">{dict.common.backHome}</Link>
        </p>
      </div>
    </div>
  );
}
