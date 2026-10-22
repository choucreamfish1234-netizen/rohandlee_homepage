import Link from "next/link";
import { site } from "@/config/site";
import type { Dictionary, QaItem } from "@/content/types";
import { findCase } from "@/lib/cases";
import { listedQa } from "@/lib/qa";
import { ConsultLink, PhoneLink, WechatButton } from "../contact";
import { Icon } from "../Icon";

export function QaDetailView({ dict, q }: { dict: Dictionary; q: QaItem }) {
  const base = `/${dict.locale}`;
  const t = dict.qa!;
  const cases = q.related.map((s) => findCase(dict, s)).filter((c) => c !== undefined);
  const others = listedQa(dict).filter((x) => x.slug !== q.slug).slice(0, 4);

  return (
    <>
      <section className="border-b border-line bg-mist">
        <div className="container-site max-w-4xl py-7 sm:py-10">
          <nav aria-label="Breadcrumb" className="text-[13px] text-mute">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href={base} className="hover:text-navy">{dict.common.home}</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href={`${base}/qa`} className="hover:text-navy">{t.title}</Link></li>
            </ol>
          </nav>
          {!q.reviewed && (
            <p className="mt-4 inline-flex rounded-full bg-warn px-3 py-1 text-[12px] font-semibold text-white">
              검수 전 초안 · 검색 제외 상태
            </p>
          )}
          <h1 className="mt-4 text-[24px] font-bold leading-snug tracking-tight text-navy sm:text-[32px]">{q.question}</h1>
          <p className="mt-3 text-[13px] text-mute">
            {t.updatedLabel} {q.updated}
            {q.reviewed && q.reviewer && <> · {t.reviewedBy} {q.reviewer}</>}
            {" · "}
            {dict.firmInfo.name}
          </p>
        </div>
      </section>

      <div className="container-site max-w-4xl py-10 sm:py-14">
        <article className="space-y-10">
          <section className="rounded-card border-l-4 border-gold bg-white p-5 shadow-float sm:p-7">
            <h2 className="text-[14px] font-bold text-gold">{t.answerLabel}</h2>
            <p className="mt-2 text-[17px] leading-[1.8] text-charcoal">{q.answer}</p>
          </section>

          {q.sections.map((s) => (
            <section key={s.h}>
              <h2 className="mb-4 border-b border-line pb-3 text-[20px] font-bold text-navy sm:text-[22px]">{s.h}</h2>
              {s.p && (
                <div className="space-y-3 text-[16px] leading-[1.8] text-charcoal">
                  {s.p.map((x) => (
                    <p key={x}>{x}</p>
                  ))}
                </div>
              )}
              {s.list && (
                <ul className={`space-y-2.5 ${s.p ? "mt-4" : ""}`}>
                  {s.list.map((x) => (
                    <li key={x} className="flex gap-2.5 text-[15.5px] leading-relaxed text-charcoal">
                      <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={2.2} />
                      {x}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="rounded-card bg-navy p-6 text-white sm:p-9">
            <h2 className="text-[21px] font-bold leading-snug sm:text-[24px]">{t.ctaTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/75">{t.ctaBody}</p>
            <div className="mt-6 grid gap-2.5 sm:flex sm:flex-wrap">
              <ConsultLink location="qa_bottom" className="btn-gold">
                {dict.common.consultNow}
                <Icon name="arrow" className="h-4 w-4" />
              </ConsultLink>
              <WechatButton location="qa_bottom" className="inline-flex h-12 items-center justify-center gap-2 rounded-card bg-wechat px-6 text-[15px] font-semibold text-white">
                <Icon name="wechat" />
                {dict.common.wechatConsult}
              </WechatButton>
              <PhoneLink location="qa_bottom" className="inline-flex h-12 items-center justify-center gap-2 rounded-card border border-white/25 px-6 text-[15px] font-semibold text-white hover:bg-white/10">
                <Icon name="phone" className="h-4 w-4" />
                {site.phone.display}
              </PhoneLink>
            </div>
          </section>

          <p className="text-[13px] leading-relaxed text-mute">{dict.common.disclaimer}</p>

          {cases.length > 0 && (
            <section>
              <h2 className="text-[18px] font-bold text-navy">{dict.common.relatedCases}</h2>
              <ul className="mt-4 grid gap-3 md:grid-cols-3">
                {cases.map((x) => (
                  <li key={x.slug}>
                    <Link href={`${base}/${x.slug}`} className="card group flex h-full flex-col p-5 hover:border-navy/40">
                      <Icon name={x.icon} className="h-5 w-5 text-gold" />
                      <span className="mt-3 text-[15.5px] font-bold leading-snug text-navy">{x.title}</span>
                      <span className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-mute">{x.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {others.length > 0 && (
            <section>
              <h2 className="text-[18px] font-bold text-navy">{t.relatedTitle}</h2>
              <QaLinkList dict={dict} items={others} />
            </section>
          )}
        </article>
      </div>
    </>
  );
}

export function QaLinkList({ dict, items }: { dict: Dictionary; items: QaItem[] }) {
  return (
    <ul className="mt-4 divide-y divide-line border-y border-line">
      {items.map((x) => (
        <li key={x.slug}>
          <Link href={`/${dict.locale}/qa/${x.slug}`} className="group flex items-start gap-3 py-4">
            <span className="font-bold text-gold" aria-hidden="true">Q</span>
            <span className="flex-1 text-[15.5px] font-semibold leading-snug text-navy group-hover:underline">
              {x.question}
              {!x.reviewed && <span className="ml-2 rounded bg-warn px-1.5 py-0.5 align-middle text-[11px] font-semibold text-white">검수 전</span>}
            </span>
            <Icon name="chevron" className="mt-0.5 h-4 w-4 shrink-0 text-mute" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
