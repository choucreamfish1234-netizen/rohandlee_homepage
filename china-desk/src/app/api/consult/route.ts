import { NextResponse } from "next/server";
import { dictionaries, isLocale } from "@/content/locales";
import type { NewConsultation, ReplyVia } from "@/lib/consultation";
import { insertConsultation } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ko = dictionaries.ko;
const CASE_VALUES = new Set([...ko.caseList.filter((c) => !c.guide).map((c) => c.slug as string), "other"]);
const ROLE_VALUES = new Set(ko.form.roles.map((o) => o.value));
const STAGE_VALUES = new Set(ko.form.stages.map((o) => o.value));
const COUNTRY_VALUES = new Set(ko.form.countries.map((o) => o.value));

/** 문자열 정리: 제어문자 제거 · 앞뒤 공백 제거 · 길이 제한 */
function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

function pick(v: unknown, allowed: Set<string>): string {
  return typeof v === "string" && allowed.has(v) ? v : "";
}

function bad(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 20_000) return bad(413, "payload_too_large");
    body = JSON.parse(text);
    if (!body || typeof body !== "object") throw new Error();
  } catch {
    return bad(400, "invalid_json");
  }

  // 허니팟 — 봇이면 성공처럼 응답하고 저장하지 않는다
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 60);
  const wechatId = clean(body.wechatId, 60);
  const kakaoId = clean(body.kakaoId, 60);
  const phone = clean(body.phone, 40);
  const caseType = pick(body.caseType, CASE_VALUES);
  const role = pick(body.role, ROLE_VALUES);
  const stage = pick(body.stage, STAGE_VALUES);
  const country = pick(body.country, COUNTRY_VALUES);
  const description = clean(body.description, 3000);
  const urgent = body.urgent === true;
  const locale = typeof body.locale === "string" && isLocale(body.locale) ? body.locale : "cn";
  const page = clean(body.page, 200);

  if (!wechatId && !kakaoId) return bad(422, "reply_channel_required");
  if (!name) return bad(422, "name_required");
  if (!caseType) return bad(422, "case_type_required");
  if (!role) return bad(422, "role_required");
  if (body.consent !== true) return bad(422, "consent_required");

  // 답변 채널: 둘 다 있으면 신청자 선택, 하나뿐이면 그 채널
  let replyVia: ReplyVia;
  if (wechatId && kakaoId) replyVia = body.replyVia === "kakaotalk" ? "kakaotalk" : "wechat";
  else replyVia = wechatId ? "wechat" : "kakaotalk";

  const record: NewConsultation = {
    urgent,
    name,
    contact_method: replyVia,
    contact_value: replyVia === "wechat" ? wechatId : kakaoId,
    wechat_id: wechatId || null,
    kakao_id: kakaoId || null,
    phone: phone || null,
    reply_via: replyVia,
    country: country || null,
    case_type: caseType,
    role,
    stage: stage || null,
    description: description || null,
    locale,
    page: page || null,
  };

  let id: string;
  try {
    id = (await insertConsultation(record)).id;
  } catch (e) {
    console.error("[consult] store failed", e);
    return bad(500, "store_failed");
  }

  await notify(record, id).catch((e) => console.error("[consult] webhook failed", e));
  return NextResponse.json({ ok: true, id });
}

/** 한국어 요약 알림 — 실패해도 접수는 유지 */
async function notify(r: NewConsultation, id: string) {
  const url = process.env.CONSULT_WEBHOOK_URL;
  if (!url) return;
  const label = (opts: { value: string; label: string }[], v: string | null) => (v ? opts.find((o) => o.value === v)?.label ?? v : "-");
  const caseLabel = r.case_type === "other" ? ko.form.otherCaseType : ko.caseList.find((c) => c.slug === r.case_type)?.title ?? r.case_type;
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const lines = [
    `${r.urgent ? "🚨 [긴급] " : ""}China Desk 상담 신청 — ${r.name}`,
    `사건: ${caseLabel} / 신분: ${label(ko.form.roles, r.role)} / 단계: ${label(ko.form.stages, r.stage)}`,
    `답변 채널: ${r.reply_via === "wechat" ? "위챗" : "카카오톡"} ${r.contact_value}`,
    `위챗: ${r.wechat_id ?? "-"} / 카카오톡: ${r.kakao_id ?? "-"} / 전화: ${r.phone ?? "-"}`,
    `국가: ${label(ko.form.countries, r.country)} / 언어: ${r.locale}`,
    r.description ? `내용: ${r.description.slice(0, 300)}${r.description.length > 300 ? "…" : ""}` : "",
    site ? `관리: ${site}/admin/${id}` : "",
  ].filter(Boolean);
  const text = lines.join("\n");

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, urgent: r.urgent, id, case_type: r.case_type }),
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}
