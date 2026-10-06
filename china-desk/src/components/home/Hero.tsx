import type { Dictionary } from "@/content/types";
import { ConsultLink, WechatButton } from "../contact";
import { Icon } from "../Icon";
import { QuickPanel } from "./QuickPanel";
import { Skyline } from "./Skyline";

export function Hero({ dict }: { dict: Dictionary }) {
  const h = dict.hero;
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 h-[110px] w-full sm:h-[200px]" />
      <div className="container-site relative grid gap-5 pb-24 pt-6 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8 lg:pb-36 lg:pt-20">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-gold-light/40 px-3 py-1 text-[12px] font-medium text-gold-light sm:text-[13px]">
            <Icon name="scale" className="h-3.5 w-3.5" />
            {h.eyebrow}
          </p>
          <h1 className="mt-3 text-[25px] font-bold leading-[1.3] tracking-tight [text-wrap:balance] sm:mt-5 sm:text-[36px] lg:text-[44px]">
            <span className="block">{h.headline[0]}</span>
            <span className="block text-white/90 [text-wrap:balance]">{h.headline[1]}</span>
          </h1>
          <p className="mt-2 text-[14px] text-white/65 sm:mt-4 sm:text-[16px]">{h.audienceLine}</p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <QuickPanel hero={h} phoneLabel={dict.common.phone} wechatLabel={dict.common.wechatConsult} />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <ul className="flex flex-wrap gap-2">
            {h.topics.map((t) => (
              <li key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[13px] text-white/80">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 hidden flex-wrap gap-3 lg:flex">
            <ConsultLink location="hero" className="btn-gold min-w-[180px]">
              {dict.common.consultNow}
              <Icon name="arrow" className="h-4 w-4" />
            </ConsultLink>
            <WechatButton location="hero" className="inline-flex h-12 items-center justify-center gap-2 rounded-card border border-white/25 px-6 text-[15px] font-semibold text-white hover:bg-white/10">
              <Icon name="wechat" />
              {dict.common.wechatConsult}
            </WechatButton>
          </div>
          <p className="mt-5 hidden items-center gap-2 text-[13px] text-white/60 lg:flex">
            <Icon name="check" className="h-4 w-4 text-gold-light" />
            {h.trustLine}
          </p>
        </div>
      </div>
    </section>
  );
}

const TRUST_ICONS = ["user", "message", "lock", "scale"] as const;

export function TrustBar({ dict }: { dict: Dictionary }) {
  return (
    <div className="container-site relative z-10 -mt-14 lg:-mt-20">
      <ul className="grid grid-cols-2 overflow-hidden rounded-card border border-line bg-white shadow-float lg:grid-cols-4">
        {dict.trust.map((t, i) => (
          <li
            key={t.title}
            className={`flex gap-3 p-4 sm:p-6 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
          >
            <Icon name={TRUST_ICONS[i % TRUST_ICONS.length]} className="mt-0.5 h-5 w-5 shrink-0 text-gold sm:h-6 sm:w-6" />
            <div className="min-w-0">
              <p className="text-[14px] font-bold leading-snug text-navy sm:text-[15.5px]">{t.title}</p>
              <p className="mt-1 text-[12.5px] leading-snug text-mute sm:text-[13.5px]">{t.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
