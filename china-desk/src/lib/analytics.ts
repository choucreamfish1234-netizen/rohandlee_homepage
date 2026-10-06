/**
 * 전환 이벤트 — 이름은 여기서만 관리한다.
 * GA4(gtag) 와 GTM(dataLayer) 에 동시에 보낸다. gtag 는 NEXT_PUBLIC_GA_ID 가 있을 때만 로드된다.
 */
export type AnalyticsEvent =
  | "wechat_click"
  | "phone_click"
  | "kakao_click"
  | "consultation_click"
  | "consultation_submit"
  | "wechat_id_copy"
  | "path_select";

export type CtaLocation =
  | "utility"
  | "header"
  | "mobile_menu"
  | "hero"
  | "hero_panel"
  | "cases"
  | "contact"
  | "inline_form"
  | "consult_page"
  | "sticky"
  | "case_hero"
  | "case_sidebar"
  | "case_bottom"
  | "wechat_modal"
  | "received"
  | "footer";

type Params = { cta_location: CtaLocation | string } & Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Params): void {
  if (typeof window === "undefined") return;
  const payload = { ...params, page_path: window.location.pathname };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
    if (typeof window.gtag === "function") window.gtag("event", event, payload);
  } catch {
    /* 분석 실패가 화면 동작을 막지 않게 한다 */
  }
}

/** GTM 트리거용 data 속성 */
export function ctaAttrs(cta: AnalyticsEvent, location: CtaLocation | string) {
  return { "data-cta": cta, "data-cta-location": location } as const;
}
