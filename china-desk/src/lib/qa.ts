import { dictionaries, locales, type Locale } from "@/content/locales";
import type { Dictionary, QaItem } from "@/content/types";

/** 로컬 `npm run dev` 에서는 검수 전 초안도 목록에 보여 준다 (운영 빌드에서는 숨김) */
export const showDrafts = process.env.NODE_ENV === "development";

/** 이 언어에 질문형 페이지가 있는지 */
export function hasQa(dict: Dictionary): boolean {
  return Boolean(dict.qa && dict.qaList && dict.qaList.length > 0);
}

/** 공개 목록·사이트맵·내부 링크에 쓰는 항목 — 검수 완료분만 (dev 는 전부) */
export function listedQa(dict: Dictionary): QaItem[] {
  return (dict.qaList ?? []).filter((q) => q.reviewed || showDrafts);
}

export function findQa(dict: Dictionary, slug: string): QaItem | undefined {
  return dict.qaList?.find((q) => q.slug === slug);
}

/** 언어별로 실제 존재하는 /qa 경로 — 언어 전환에서 없는 페이지로 보내지 않기 위해 */
export function qaPathsByLocale(): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const l of locales) {
    const d = dictionaries[l];
    out[l] = hasQa(d) ? ["/qa", ...(d.qaList ?? []).map((q) => `/qa/${q.slug}`)] : [];
  }
  return out;
}

/** 이 질문 페이지가 존재하는 언어들 (hreflang 용) */
export function localesWithQa(slug?: string): Locale[] {
  return locales.filter((l) => {
    const d = dictionaries[l];
    if (!hasQa(d)) return false;
    return slug ? Boolean(findQa(d, slug)) : true;
  });
}
