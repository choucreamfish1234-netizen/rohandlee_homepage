import Link from "next/link";
import { site } from "@/config/site";
import type { CaseDetail, Dictionary } from "@/content/types";
import { ConsultLink, PhoneLink, WechatButton } from "../contact";
import { FaqList } from "../FaqList";
import { Icon } from "../Icon";
import { ChipScroller } from "./ChipScroller";

function related(dict: Dictionary, c: CaseDetail): CaseDetail[] {
  const others = dict.caseList.filter((x) => x.slug !== c.slug);
  const score = (x: CaseDetail) => (x.guide ? 0 : 2) + (x.audiences.some((a) => c.audiences.includes(a)) ? 1 : 0);
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, 3);
}

export function CaseDetailView({ dict, c }: { dict: Dictionary; c: CaseDetail }) {
  const base = `/${dict.locale}`;
  const t = dict.caseDetail;

  return (
    <>
      {/* 상단 띠 */}
      <section className="border-b border-line bg-mist">
        <div className="container-site py-7 sm:py-10">
          <nav aria-label="Breadcrumb" className="text-[13px] text-mute">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href={base} className="hover:text-navy">{dict.common.home}</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href={`${base}#cases`} className="hover:text-navy">{dict.nav.cases}</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-charcoal">{c.title}</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-[26px] font-bold leading-snug tracking-tight text-navy sm:text-[34px]">{c.title}</h1>
          <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-mute sm:text-[17px]">{c.situation.lead}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.audiences.map((a) => (
              <li key={a} className="rounded-full border border-gold/40 bg-white px-3 py-1 text-[12.5px] font-medium text-gold">
                {dict.cases.filterLabels[a]}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <ConsultLink location="case_hero" caseSlug={c.guide ? undefined : c.slug} className="btn-primary">
              {dict.common.consultNow}
              <Icon name="arrow" className="h-4 w-4" />
            </ConsultLink>
            <WechatButton location="case_hero" className="btn-outline">
              <Icon name="wechat" className="h-5 w-5 text-wechat" />
              {dict.common.wechatConsult}
            </WechatButton>
          </div>
        </div>
      </section>

      {/* 모바일: 사건 유형 가로 스크롤 */}
      <nav aria-label={t.sidebarTitle} className="border-b border-line bg-white lg:hidden">
        <ChipScroller className="no-scrollbar relative flex gap-2 overflow-x-auto px-4 py-3">
          {dict.caseList.map((x) => (
            <li key={x.slug} className="shrink-0">
              <Link href={`${base}/${x.slug}`} className="chip h-9 text-[13.5px]" data-active={x.slug === c.slug} aria-current={x.slug === c.slug ? "page" : undefined}>
                {x.title}
              </Link>
            </li>
          ))}
        </ChipScroller>
      </nav>

      <div className="container-site grid gap-10 py-10 lg:grid-cols-[264px_minmax(0,1fr)] lg:gap-14 lg:py-14">
        {/* 데스크톱 사이드바 */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <nav aria-label={t.sidebarTitle} className="card overflow-hidden">
              <p className="border-b border-line bg-mist px-4 py-3 text-[14px] font-bold text-navy">{t.sidebarTitle}</p>
              <ul className="py-1.5">
                {dict.caseList.map((x) => {
                  const on = x.slug === c.slug;
                  return (
                    <li key={x.slug}>
                      <Link
                        href={`${base}/${x.slug}`}
                        aria-current={on ? "page" : undefined}
                        className={`flex items-center gap-2.5 px-4 py-2.5 text-[14px] leading-snug ${on ? "bg-mist font-semibold text-navy" : "text-charcoal hover:bg-mist/70 hover:text-navy"}`}
                      >
                        <Icon name={x.icon} className={`h-4 w-4 shrink-0 ${on ? "text-gold" : "text-mute"}`} />
                        {x.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="rounded-card bg-navy p-5 text-white">
              <p className="text-[15.5px] font-bold leading-snug">{t.consultBoxTitle}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">{t.consultBoxBody}</p>
              <ConsultLink location="case_sidebar" caseSlug={c.guide ? undefined : c.slug} className="btn-gold mt-4 h-11 w-full text-[14px]">
                {dict.common.consultNow}
              </ConsultLink>
              <WechatButton location="case_sidebar" className="mt-2 flex h-11 w-full items-center justify-center gap-1.5 rounded-card border border-white/25 text-[14px] font-semibold hover:bg-white/10">
                <Icon name="wechat" className="h-4 w-4" />
                {dict.common.wechatConsult}
              </WechatButton>
            </div>
          </div>
        </aside>

        {/* 본문 */}
        <article className="min-w-0 space-y-12 sm:space-y-14">
          <Block title={t.situation}>
            <div className="space-y-3 text-[16px] leading-[1.8] text-charcoal">
              {c.situation.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Block>

          <Block title={t.firstSteps}>
            <ol className="space-y-3">
              {c.firstSteps.map((s, i) => (
                <li key={s} className="flex gap-3.5 rounded-card border border-line p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-[13px] font-bold text-white">{i + 1}</span>
                  <span className="pt-0.5 text-[15.5px] leading-relaxed text-charcoal">{s}</span>
                </li>
              ))}
            </ol>
          </Block>

          <section className="rounded-card border border-warn/30 bg-warn-bg p-5 sm:p-7">
            <h2 className="flex items-center gap-2 text-[20px] font-bold text-warn sm:text-[22px]">
              <Icon name="x-circle" className="h-6 w-6" />
              {t.donts}
            </h2>
            <ul className="mt-4 space-y-3">
              {c.donts.map((d) => (
                <li key={d} className="flex gap-2.5 text-[15.5px] leading-relaxed text-charcoal">
                  <Icon name="close" className="mt-1 h-4 w-4 shrink-0 text-warn" strokeWidth={2.2} />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          <Block title={t.procedure}>
            {c.procedure.intro && <p className="mb-5 text-[15px] leading-relaxed text-mute">{c.procedure.intro}</p>}
            <ol className="relative space-y-6 border-l border-line pl-7">
              {c.procedure.steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="absolute -left-[39.5px] top-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-gold bg-white text-[11px] font-bold text-gold">
                    {i + 1}
                  </span>
                  <h3 className="text-[16.5px] font-bold text-navy">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-mute">{s.body}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block title={t.lawyerHelp}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {c.lawyerHelp.map((h) => (
                <li key={h} className="flex gap-2.5 rounded-card bg-mist p-4 text-[15px] leading-relaxed text-charcoal">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={2.2} />
                  {h}
                </li>
              ))}
            </ul>
          </Block>

          <Block title={t.faq}>
            <FaqList items={c.faq} />
          </Block>

          <section className="rounded-card bg-navy p-6 text-white sm:p-9">
            <h2 className="text-[21px] font-bold leading-snug sm:text-[25px]">{c.cta.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/75">{c.cta.body}</p>
            <div className="mt-6 grid gap-2.5 sm:flex sm:flex-wrap">
              <ConsultLink location="case_bottom" caseSlug={c.guide ? undefined : c.slug} className="btn-gold">
                {c.cta.button}
                <Icon name="arrow" className="h-4 w-4" />
              </ConsultLink>
              <WechatButton location="case_bottom" className="inline-flex h-12 items-center justify-center gap-2 rounded-card bg-wechat px-6 text-[15px] font-semibold text-white">
                <Icon name="wechat" />
                {dict.common.wechatConsult}
              </WechatButton>
              <PhoneLink location="case_bottom" className="inline-flex h-12 items-center justify-center gap-2 rounded-card border border-white/25 px-6 text-[15px] font-semibold text-white hover:bg-white/10">
                <Icon name="phone" className="h-4 w-4" />
                {site.phone.intl}
              </PhoneLink>
            </div>
          </section>

          <p className="text-[13px] leading-relaxed text-mute">{dict.common.disclaimer}</p>

          <section>
            <h2 className="text-[18px] font-bold text-navy">{dict.common.relatedCases}</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {related(dict, c).map((x) => (
                <li key={x.slug}>
                  <Link href={`${base}/${x.slug}`} className="card group flex h-full flex-col p-5 hover:border-navy/40">
                    <Icon name={x.icon} className="h-5 w-5 text-gold" />
                    <span className="mt-3 text-[15.5px] font-bold leading-snug text-navy">{x.title}</span>
                    <span className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-mute">{x.summary}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-semibold text-navy">
                      {x.cardCta}
                      <Icon name="arrow" className="h-3.5 w-3.5 text-gold" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 border-b border-line pb-3 text-[20px] font-bold text-navy sm:text-[22px]">{title}</h2>
      {children}
    </section>
  );
}
