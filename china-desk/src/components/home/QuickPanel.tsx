"use client";

import { useEffect, useState } from "react";
import type { Audience, Dictionary } from "@/content/types";
import { track } from "@/lib/analytics";
import { readFilter, subscribeFilter, writeFilter } from "@/lib/pathFilter";
import { ConsultLink, PhoneLink, WechatButton } from "../contact";
import { Icon } from "../Icon";

export function QuickPanel({ hero, phoneLabel, wechatLabel }: { hero: Dictionary["hero"]; phoneLabel: string; wechatLabel: string }) {
  const [active, setActive] = useState<Audience | null>(null);
  useEffect(() => {
    const sync = () => setActive(readFilter());
    sync();
    return subscribeFilter(sync);
  }, []);

  const choose = (a: Audience) => {
    track("path_select", { cta_location: "hero_panel", path: a });
    writeFilter(a);
    document.getElementById("cases")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const paths: { key: Audience; icon: "heart" | "scale" }[] = [
    { key: "victim", icon: "heart" },
    { key: "accused", icon: "scale" },
  ];

  return (
    <div className="rounded-card bg-white p-4 text-charcoal shadow-float sm:p-6">
      <h2 className="text-[17px] font-bold text-navy sm:text-[19px]">{hero.quickTitle}</h2>
      <p className="mt-0.5 text-[13px] text-mute">{hero.pathPrompt}</p>

      <div className="mt-3 grid gap-2.5 sm:mt-4">
        {paths.map(({ key, icon }) => {
          const p = hero.paths[key];
          const on = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => choose(key)}
              aria-pressed={on}
              data-cta="path_select"
              data-cta-location="hero_panel"
              className={`group flex w-full items-center gap-3 rounded-card border px-3.5 py-3 text-left transition-colors sm:px-4 sm:py-3.5 ${
                on ? "border-navy bg-navy text-white" : "border-line hover:border-navy/40 hover:bg-mist"
              }`}
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${on ? "bg-white/10 text-gold-light" : "bg-mist text-gold"}`}>
                <Icon name={icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-[15.5px] font-bold leading-snug ${on ? "text-white" : "text-navy"}`}>{p.title}</span>
                <span className={`mt-0.5 block text-[12.5px] leading-snug ${on ? "text-white/75" : "text-mute"}`}>{p.desc}</span>
              </span>
              <Icon name="chevron" className={`h-4 w-4 shrink-0 ${on ? "text-white" : "text-mute group-hover:text-navy"}`} />
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3 text-[12px] text-mute sm:mt-5">
        <span className="h-px flex-1 bg-line" />
        {hero.quickOr}
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <WechatButton location="hero_panel" className="flex h-[58px] flex-col items-center justify-center gap-1 rounded-card border border-line text-[12.5px] font-semibold text-navy hover:bg-mist">
          <Icon name="wechat" className="h-5 w-5 text-wechat" />
          {wechatLabel}
        </WechatButton>
        <PhoneLink location="hero_panel" className="flex h-[58px] flex-col items-center justify-center gap-1 rounded-card border border-line text-[12.5px] font-semibold text-navy hover:bg-mist">
          <Icon name="phone" className="h-5 w-5 text-gold" />
          {phoneLabel}
        </PhoneLink>
        <ConsultLink location="hero_panel" anchor className="flex h-[58px] flex-col items-center justify-center gap-1 rounded-card border border-line text-[12.5px] font-semibold text-navy hover:bg-mist">
          <Icon name="form" className="h-5 w-5 text-gold" />
          {hero.quickForm}
        </ConsultLink>
      </div>
    </div>
  );
}
