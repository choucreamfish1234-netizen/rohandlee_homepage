/** 상담 신청 레코드 — supabase/consultations.sql 의 klh_consultations 와 1:1 */
export const STATUSES = ["new", "contacted", "scheduled", "retained", "closed", "spam"] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABEL: Record<Status, string> = {
  new: "신규",
  contacted: "연락함",
  scheduled: "상담 예정",
  retained: "수임",
  closed: "종결",
  spam: "스팸",
};

export type ReplyVia = "wechat" | "kakaotalk";

export interface Consultation {
  id: string;
  created_at: string;
  updated_at: string;
  status: Status;
  urgent: boolean;
  name: string;
  contact_method: string;
  contact_value: string;
  wechat_id: string | null;
  kakao_id: string | null;
  phone: string | null;
  reply_via: ReplyVia | null;
  country: string | null;
  case_type: string;
  role: string;
  stage: string | null;
  description: string | null;
  locale: string | null;
  page: string | null;
  memo: string | null;
}

export type NewConsultation = Omit<Consultation, "id" | "created_at" | "updated_at" | "status" | "memo">;

export function isStatus(v: unknown): v is Status {
  return typeof v === "string" && (STATUSES as readonly string[]).includes(v);
}

/** 긴급이면서 아직 처리 전(신규·연락함)인 건 */
export function isUrgentOpen(c: Pick<Consultation, "urgent" | "status">): boolean {
  return c.urgent && (c.status === "new" || c.status === "contacted");
}

/** 긴급 미처리 건은 항상 맨 위, 나머지는 최신순 */
export function sortConsultations<T extends Consultation>(rows: T[]): T[] {
  return [...rows].sort((a, b) => {
    const ua = isUrgentOpen(a) ? 1 : 0;
    const ub = isUrgentOpen(b) ? 1 : 0;
    if (ua !== ub) return ub - ua;
    return b.created_at.localeCompare(a.created_at);
  });
}
