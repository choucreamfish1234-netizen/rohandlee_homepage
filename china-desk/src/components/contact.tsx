"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { ctaAttrs, track, type CtaLocation } from "@/lib/analytics";
import type { Dictionary } from "@/content/types";
import { Icon } from "./Icon";

/**
 * 전환 진입점 — 위챗 모달 · 전화 · 카카오톡 · 상담 신청 링크.
 * 모든 버튼에 data-cta / data-cta-location 을 달고 track() 으로 이벤트를 보낸다.
 */

export interface ContactLabels {
  locale: string;
  wechatModal: Dictionary["wechatModal"];
  phone: string;
}

interface Ctx {
  labels: ContactLabels;
  openWechat: (location: CtaLocation) => void;
}

const ContactContext = createContext<Ctx | null>(null);

function useContact(): Ctx {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("ContactProvider missing");
  return ctx;
}

export function ContactProvider({ labels, children }: { labels: ContactLabels; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openWechat = useCallback((location: CtaLocation) => {
    track("wechat_click", { cta_location: location });
    setOpen(true);
  }, []);
  return (
    <ContactContext.Provider value={{ labels, openWechat }}>
      {children}
      {open && <WechatModal labels={labels} onClose={() => setOpen(false)} />}
    </ContactContext.Provider>
  );
}

/* ───────── 위챗 모달: 모바일 하단 시트 / 데스크톱 가운데 카드 ───────── */

function WechatModal({ labels, onClose }: { labels: ContactLabels; onClose: () => void }) {
  const t = labels.wechatModal;
  const closeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(site.wechat.id);
      setCopied(true);
      track("wechat_id_copy", { cta_location: "wechat_modal" });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* 복사 실패 시 무시 — ID 는 화면에 보인다 */
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <div className="absolute inset-0 bg-navy-deep/60" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wechat-modal-title"
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-card bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-float sm:max-w-[420px] sm:rounded-card sm:p-7"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line sm:hidden" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4">
          <h2 id="wechat-modal-title" className="flex items-center gap-2 text-lg font-bold text-navy">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-wechat/10 text-wechat">
              <Icon name="wechat" className="h-5 w-5" />
            </span>
            {t.title}
          </h2>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t.close} className="-mr-2 -mt-1 rounded-full p-2 text-mute hover:bg-mist">
            <Icon name="close" />
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.wechat.qr} alt={t.qrAlt} width={220} height={220} className="h-[200px] w-[200px] rounded-lg border border-line p-2 sm:h-[220px] sm:w-[220px]" />
        </div>

        <p className="mt-4 text-[14px] leading-relaxed text-mute">{t.body}</p>

        {site.wechat.id && (
          <div className="mt-3 flex items-center justify-between rounded-lg border border-line px-3 py-2 text-sm">
            <span className="text-mute">{t.idLabel}</span>
            <span className="font-semibold text-charcoal">{site.wechat.id}</span>
            <button type="button" onClick={copyId} className="rounded-md border border-line px-2 py-1 text-xs text-navy hover:bg-mist" {...ctaAttrs("wechat_id_copy", "wechat_modal")}>
              {copied ? t.copied : t.copy}
            </button>
          </div>
        )}

        <a
          href={site.wechat.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-card bg-wechat font-semibold text-white hover:brightness-95"
          data-cta-location="wechat_modal"
        >
          <Icon name="wechat" />
          {t.openInWechat}
        </a>

        <div className="mt-5 border-t border-line pt-4">
          <p className="text-[13px] text-mute">{t.fallback}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <ConsultLink location="wechat_modal" onNavigate={onClose} className="flex h-11 items-center justify-center gap-1.5 rounded-card border border-line text-sm font-semibold text-navy hover:bg-mist">
              <Icon name="form" className="h-4 w-4" />
              {t.formLabel}
            </ConsultLink>
            <PhoneLink location="wechat_modal" className="flex h-11 items-center justify-center gap-1.5 rounded-card border border-line text-sm font-semibold text-navy hover:bg-mist">
              <Icon name="phone" className="h-4 w-4" />
              {labels.phone}
            </PhoneLink>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── 버튼들 ───────── */

type BtnProps = { location: CtaLocation; className?: string; children: React.ReactNode };

export function WechatButton({ location, className, children }: BtnProps) {
  const { openWechat } = useContact();
  return (
    <button type="button" className={className} onClick={() => openWechat(location)} {...ctaAttrs("wechat_click", location)}>
      {children}
    </button>
  );
}

export function PhoneLink({ location, className, children }: BtnProps) {
  return (
    <a href={`tel:${site.phone.tel}`} className={className} onClick={() => track("phone_click", { cta_location: location })} {...ctaAttrs("phone_click", location)}>
      {children}
    </a>
  );
}

export function KakaoLink({ location, className, children }: BtnProps) {
  return (
    <a
      href={site.kakao.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("kakao_click", { cta_location: location })}
      {...ctaAttrs("kakao_click", location)}
    >
      {children}
    </a>
  );
}

/**
 * 상담 신청으로 가는 링크. anchor 를 주면 같은 페이지의 #consult 로, 아니면 /<locale>/consult(?case=) 로.
 */
export function ConsultLink({
  location,
  className,
  children,
  caseSlug,
  anchor,
  onNavigate,
}: BtnProps & { caseSlug?: string; anchor?: boolean; onNavigate?: () => void }) {
  const { labels } = useContact();
  const target = anchor ? "#consult" : `/${labels.locale}/consult${caseSlug ? `?case=${caseSlug}` : ""}`;
  return (
    <Link
      href={target}
      className={className}
      onClick={() => {
        track("consultation_click", { cta_location: location, ...(caseSlug ? { case_type: caseSlug } : {}) });
        onNavigate?.();
      }}
      {...ctaAttrs("consultation_click", location)}
    >
      {children}
    </Link>
  );
}
