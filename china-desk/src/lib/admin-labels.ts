import { dictionaries } from "@/content/locales";

/** 관리자 화면 라벨 — 한국어 사전(ko content) 기준으로 값 → 라벨 변환 */
const ko = dictionaries.ko;

function from(opts: { value: string; label: string }[]) {
  return (v: string | null | undefined) => (v ? opts.find((o) => o.value === v)?.label ?? v : "—");
}

export const roleLabel = from(ko.form.roles);
export const stageLabel = from(ko.form.stages);
export const countryLabel = from(ko.form.countries);

export function caseLabel(v: string | null | undefined): string {
  if (!v) return "—";
  if (v === "other") return ko.form.otherCaseType;
  return ko.caseList.find((c) => c.slug === v)?.title ?? v;
}

export function localeLabel(v: string | null | undefined): string {
  if (!v) return "—";
  return v in dictionaries ? dictionaries[v as keyof typeof dictionaries].langLabel : v;
}

export function formatKst(iso: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}
