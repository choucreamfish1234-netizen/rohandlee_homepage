import Link from "next/link";
import { site } from "@/config/site";
import type { Dictionary } from "@/content/types";
import { ConsultLink, PhoneLink, WechatButton } from "../contact";
import { Icon } from "../Icon";
import { BrandMark } from "./BrandMark";
import { LangSwitch } from "./LangSwitch";
import { MobileMenu } from "./MobileMenu";

export function UtilityBar({ dict }: { dict: Dictionary }) {
  return (
    <div className="bg-navy-deep text-[12px] text-white/80">
      <div className="mx-auto flex h-8 max-w-site items-center justify-between gap-3 px-4 sm:px-6">
        <p className="min-w-0 truncate">
          {dict.common.operatedBy}
          <span className="hidden sm:inline"> · {dict.about.firmKo}</span>
        </p>
        <div className="flex shrink-0 items-center gap-4">
          <PhoneLink location="utility" className="hidden items-center gap-1 hover:text-white sm:flex">
            <Icon name="phone" className="h-3.5 w-3.5" />
            {site.phone.display}
          </PhoneLink>
          <LangSwitch current={dict.locale} className="text-white" />
        </div>
      </div>
    </div>
  );
}

export function navItems(dict: Dictionary) {
  const base = `/${dict.locale}`;
  return [
    { href: `${base}#cases`, label: dict.nav.cases },
    { href: `${base}#process`, label: dict.nav.process },
    { href: `${base}#about`, label: dict.nav.about },
    { href: `${base}#faq`, label: dict.nav.faq },
    { href: `${base}#contact`, label: dict.nav.contact },
  ];
}

export function Header({ dict }: { dict: Dictionary }) {
  const items = navItems(dict);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="relative mx-auto flex h-16 max-w-site items-center justify-between gap-3 px-4 sm:px-6">
        <BrandMark dict={dict} href={`/${dict.locale}`} />

        <nav className="hidden items-center gap-7 text-[15px] font-medium text-charcoal lg:flex" aria-label={dict.nav.menu}>
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="hover:text-navy">
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <WechatButton location="header" className="flex h-10 items-center gap-1.5 rounded-card border border-line px-4 text-[14px] font-semibold text-navy hover:border-navy/30 hover:bg-mist">
            <Icon name="wechat" className="h-[18px] w-[18px] text-wechat" />
            {dict.common.wechatConsult}
          </WechatButton>
          <ConsultLink location="header" className="flex h-10 items-center rounded-card bg-navy px-4 text-[14px] font-semibold text-white hover:bg-navy-soft">
            {dict.nav.consult}
          </ConsultLink>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <WechatButton location="header" className="flex h-10 w-10 items-center justify-center rounded-lg text-wechat hover:bg-mist">
            <Icon name="wechat" className="h-6 w-6" />
            <span className="sr-only">{dict.common.wechatConsult}</span>
          </WechatButton>
          <MobileMenu label={dict.nav.menu} closeLabel={dict.nav.close}>
            <nav className="mx-auto max-w-site px-4 py-2" aria-label={dict.nav.menu}>
              {items.map((it) => (
                <Link key={it.href} href={it.href} className="flex items-center justify-between border-b border-line py-3.5 text-[16px] font-medium text-charcoal last:border-0">
                  {it.label}
                  <Icon name="chevron" className="h-4 w-4 text-mute" />
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 py-3">
                <PhoneLink location="mobile_menu" className="flex h-11 items-center justify-center gap-1.5 rounded-card border border-line text-[14px] font-semibold text-navy">
                  <Icon name="phone" className="h-4 w-4" />
                  {site.phone.display}
                </PhoneLink>
                <ConsultLink location="mobile_menu" className="flex h-11 items-center justify-center rounded-card bg-navy text-[14px] font-semibold text-white">
                  {dict.nav.consult}
                </ConsultLink>
              </div>
            </nav>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
