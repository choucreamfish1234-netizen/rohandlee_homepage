import type { Dictionary, SelectOption } from "@/content/types";

/** 상담폼 사건유형 선택지 — 일반 사건 8종 + 기타 */
export function caseOptions(dict: Dictionary): SelectOption[] {
  return [
    ...dict.caseList.filter((c) => !c.guide).map((c) => ({ value: c.slug, label: c.title })),
    { value: "other", label: dict.form.otherCaseType },
  ];
}

export function findCase(dict: Dictionary, slug: string) {
  return dict.caseList.find((c) => c.slug === slug);
}
