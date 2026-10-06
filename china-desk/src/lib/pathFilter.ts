import type { Audience } from "@/content/types";

/** 히어로 2갈래 선택 ↔ 사건 카드 필터 — URL 해시(#for-victim / #for-accused)로 공유 */
export const FILTER_EVENT = "cd:filter";

export function readFilter(): Audience | null {
  if (typeof window === "undefined") return null;
  const h = window.location.hash;
  if (h === "#for-victim") return "victim";
  if (h === "#for-accused") return "accused";
  return null;
}

export function writeFilter(a: Audience | null): void {
  const url = `${window.location.pathname}${window.location.search}${a ? `#for-${a}` : ""}`;
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(FILTER_EVENT));
}

export function subscribeFilter(cb: () => void): () => void {
  window.addEventListener("hashchange", cb);
  window.addEventListener(FILTER_EVENT, cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener(FILTER_EVENT, cb);
  };
}
