import { site } from "@/config/site";
import type { Dictionary } from "@/content/types";
import { caseOptions } from "@/lib/cases";
import { ConsultForm } from "../consult/ConsultForm";
import { KakaoLink, PhoneLink, WechatButton } from "../contact";
import { FaqList } from "../FaqList";
import { Icon, type UiIcon } from "../Icon";
import { LawyerPhoto } from "../LawyerPhoto";

export function WhySection({ dict }: { dict: Dictionary }) {
  const w = dict.why;
  return (
    <section className="section bg-mist">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <h2 className="h2">{w.title}</h2>
          {w.body.map((p) => (
            <p key={p} className="lead">{p}</p>
          ))}
          <div className="mt-8 rounded-card bg-navy p-6 text-white sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gold-light">
                <Icon name="user" />
              </span>
              <h3 className="text-[17px] font-bold leading-snug sm:text-[18px]">{dict.direct.title}</h3>
            </div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/75">{dict.direct.body}</p>
          </div>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-charcoal">{w.listLead}</p>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {w.list.map((item) => (
              <li key={item} className="flex gap-2.5 rounded-card border border-line bg-white px-4 py-3.5 text-[15px] leading-snug text-charcoal">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.2} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13.5px] leading-relaxed text-mute">{w.note}</p>
        </div>
      </div>
    </section>
  );
}

const STEP_ICONS: UiIcon[] = ["message", "search", "scale", "badge"];

export function ProcessSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="process" className="section scroll-mt-20">
      <div className="container-site">
        <h2 className="h2">{dict.process.title}</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
          {dict.process.steps.map((s, i) => (
            <li key={s.no} className="relative flex gap-4 md:block">
              {i < dict.process.steps.length - 1 && (
                <span className="absolute left-7 top-14 h-[calc(100%-1.5rem)] w-px bg-line md:left-14 md:-right-6 md:top-7 md:h-px md:w-auto" aria-hidden="true" />
              )}
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-white text-gold">
                <Icon name={STEP_ICONS[i % STEP_ICONS.length]} className="h-6 w-6" />
              </span>
              <div className="md:mt-5">
                <p className="text-[12px] font-semibold tracking-wider text-gold">STEP {s.no}</p>
                <h3 className="mt-1 text-[17px] font-bold text-navy">{s.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-mute">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AboutSection({ dict }: { dict: Dictionary }) {
  const a = dict.about;
  return (
    <section id="about" className="section scroll-mt-20 bg-mist">
      <div className="container-site">
        <h2 className="h2">{a.title}</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-card bg-navy p-6 text-white sm:p-8">
            <p className="text-[20px] font-bold">{a.firmEn}</p>
            <p className="mt-0.5 text-[14px] text-white/60">{a.firmKo}</p>
            <div className="mt-5 space-y-3 text-[14.5px] leading-relaxed text-white/80">
              {a.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-[14px]">
              <InfoRow icon="pin">{dict.firmInfo.address}{site.address.detail ? ` ${site.address.detail}` : ""}</InfoRow>
              <InfoRow icon="phone">
                <PhoneLink location="contact" className="hover:text-gold-light">{site.phone.intl}</PhoneLink>
              </InfoRow>
              <InfoRow icon="kakao">
                <KakaoLink location="contact" className="hover:text-gold-light">{site.kakao.id}</KakaoLink>
              </InfoRow>
              <InfoRow icon="mail">
                <a href={`mailto:${site.email}`} className="hover:text-gold-light">{site.email}</a>
              </InfoRow>
            </ul>
          </div>

          <div>
            <h3 className="sr-only">{a.lawyersTitle}</h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {a.lawyers.map((l) => (
                <li key={l.id} className="card flex gap-4 p-4 sm:flex-col sm:gap-0 sm:p-5">
                  <div className="w-[104px] shrink-0 sm:w-full">
                    <LawyerPhoto lawyer={l} />
                  </div>
                  <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-gold sm:mt-4">{l.role}</p>
                  <p className="mt-0.5 flex items-baseline gap-2">
                    <span className="text-[19px] font-bold text-navy">{l.name}</span>
                    <span className="text-[13px] text-mute" lang="ko">{l.nameKo}</span>
                  </p>
                  <p className="text-[13px] text-mute">{l.title}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {l.focus.map((x) => (
                      <li key={x} className="rounded-full bg-mist px-2.5 py-1 text-[12px] text-charcoal">{x}</li>
                    ))}
                  </ul>
                  {l.bio.length > 0 && (
                    <ul className="mt-3 space-y-1 border-t border-line pt-3 text-[13px] leading-snug text-mute">
                      {l.bio.map((b) => (
                        <li key={b}>· {b}</li>
                      ))}
                    </ul>
                  )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, children }: { icon: UiIcon; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5">
      <Icon name={icon} className="h-4 w-4 shrink-0 text-gold-light" />
      <span className="min-w-0 break-words">{children}</span>
    </li>
  );
}

export function FaqSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="faq" className="section scroll-mt-20">
      <div className="container-site grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
        <h2 className="h2">{dict.faq.title}</h2>
        <FaqList items={dict.faq.items} />
      </div>
    </section>
  );
}

export function ContactSection({ dict }: { dict: Dictionary }) {
  const c = dict.contact;
  const fc = dict.finalCta;
  return (
    <section id="contact" className="section scroll-mt-20 bg-mist">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold text-gold">{fc.tag}</p>
          <h2 className="h2 mt-2">{fc.title}</h2>
          <p className="lead">{fc.body[0]}{fc.body[1]}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <h3 className="text-[17px] font-bold text-navy">{c.title}</h3>
            <p className="text-[14px] leading-relaxed text-mute">{c.subtitle}</p>

            <div className="card flex items-center gap-5 p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.wechat.qr} alt={dict.wechatModal.qrAlt} width={120} height={120} loading="lazy" className="h-[112px] w-[112px] shrink-0 rounded-lg border border-line p-1.5" />
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[15px] font-bold text-navy">
                  <Icon name="wechat" className="h-5 w-5 text-wechat" />
                  {dict.common.wechatConsult}
                </p>
                <WechatButton location="contact" className="mt-3 inline-flex h-10 items-center rounded-card bg-wechat px-4 text-[14px] font-semibold text-white">
                  {dict.common.wechatContact}
                </WechatButton>
              </div>
            </div>

            <PhoneLink location="contact" className="card flex items-center gap-4 p-5 hover:border-navy/40">
              <Channel icon="phone" title={dict.common.phone} value={site.phone.intl} note={c.phoneNote} />
            </PhoneLink>
            <KakaoLink location="contact" className="card flex items-center gap-4 p-5 hover:border-navy/40">
              <Channel icon="kakao" title={c.kakaoLabel} value={site.kakao.id} note={c.kakaoNote} />
            </KakaoLink>
            <a href={`mailto:${site.email}`} className="card flex items-center gap-4 p-5 hover:border-navy/40">
              <Channel icon="mail" title={c.emailLabel} value={site.email} />
            </a>
          </div>

          <div id="consult" className="card scroll-mt-20 p-5 sm:p-8">
            <ConsultForm locale={dict.locale} form={dict.form} caseOptions={caseOptions(dict)} location="inline_form" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Channel({ icon, title, value, note }: { icon: UiIcon; title: string; value: string; note?: string }) {
  return (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-gold">
        <Icon name={icon} />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] text-mute">{title}</span>
        <span className="block break-words text-[16px] font-bold text-navy">{value}</span>
        {note && <span className="mt-0.5 block text-[12.5px] text-mute">{note}</span>}
      </span>
    </>
  );
}
