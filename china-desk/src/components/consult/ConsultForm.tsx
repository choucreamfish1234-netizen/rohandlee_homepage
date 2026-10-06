"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import type { Dictionary, SelectOption } from "@/content/types";
import { track, type CtaLocation } from "@/lib/analytics";
import { Icon } from "../Icon";

type ReplyVia = "wechat" | "kakaotalk";

export interface ConsultFormProps {
  locale: string;
  form: Dictionary["form"];
  caseOptions: SelectOption[];
  defaultCase?: string;
  location: CtaLocation;
  /** 제목·부제 표시 여부 (단독 페이지는 페이지 제목을 따로 쓴다) */
  showHeading?: boolean;
}

const LIMIT = { name: 60, id: 60, phone: 40, description: 3000 };

export function ConsultForm({ locale, form, caseOptions, defaultCase = "", location, showHeading = true }: ConsultFormProps) {
  const f = form.fields;
  const uid = useId();
  const router = useRouter();

  const [name, setName] = useState("");
  const [wechatId, setWechatId] = useState("");
  const [kakaoId, setKakaoId] = useState("");
  const [phone, setPhone] = useState("");
  const [replyVia, setReplyVia] = useState<ReplyVia>(locale === "ko" ? "kakaotalk" : "wechat");
  const [country, setCountry] = useState("");
  const [caseType, setCaseType] = useState(caseOptions.some((o) => o.value === defaultCase) ? defaultCase : "");
  const [role, setRole] = useState("");
  const [stage, setStage] = useState("");
  const [description, setDescription] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // 허니팟
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  const hasWechat = wechatId.trim().length > 0;
  const hasKakao = kakaoId.trim().length > 0;
  const hasReply = hasWechat || hasKakao;
  const valid = name.trim().length > 0 && hasReply && caseType !== "" && role !== "" && consent;
  const touchedReply = name.trim().length > 0 && !hasReply;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || state === "sending") return;
    setState("sending");
    const effectiveReply: ReplyVia = hasWechat && hasKakao ? replyVia : hasWechat ? "wechat" : "kakaotalk";
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, wechatId, kakaoId, phone, replyVia: effectiveReply, country, caseType, role, stage,
          description, urgent, consent, website, locale, page: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("consultation_submit", { cta_location: location, case_type: caseType, role, urgent, reply_via: effectiveReply });
      router.push(`/${locale}/consult/received${urgent ? "?urgent=1" : ""}`);
    } catch {
      setState("error");
    }
  }

  const req = <span className="ml-1 text-[12px] font-normal text-warn">*<span className="sr-only">{form.required}</span></span>;

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6" aria-describedby={`${uid}-privacy`}>
      {showHeading && (
        <div>
          <h2 className="text-[21px] font-bold text-navy sm:text-[24px]">{form.title}</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-mute">{form.subtitle}</p>
        </div>
      )}

      {/* 허니팟 — 사람에게는 보이지 않는다 */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      {/* 1. 이름 */}
      <Field label={<>{f.name}{req}</>} htmlFor={`${uid}-name`}>
        <input
          id={`${uid}-name`}
          className={inputCls}
          value={name}
          maxLength={LIMIT.name}
          autoComplete="name"
          placeholder={f.namePh}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Field>

      {/* 2. 답변 채널 */}
      <fieldset className="rounded-card border border-line bg-mist/60 p-4 sm:p-5">
        <legend className="px-1 text-[15px] font-semibold text-charcoal">{f.replyTitle}{req}</legend>
        <p className="text-[13px] leading-relaxed text-mute">{f.replyNote}</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-wechat`} className="flex items-center gap-1.5 text-[14px] font-semibold text-charcoal">
              <Icon name="wechat" className="h-4 w-4 text-wechat" />
              {f.wechatId}
            </label>
            <input id={`${uid}-wechat`} className={`${inputCls} mt-1.5`} value={wechatId} maxLength={LIMIT.id} placeholder={f.wechatPh} autoCapitalize="off" autoCorrect="off" spellCheck={false} onChange={(e) => setWechatId(e.target.value)} />
            <p className="mt-1.5 text-[12px] leading-snug text-mute">{f.wechatHint}</p>
          </div>
          <div>
            <label htmlFor={`${uid}-kakao`} className="flex items-center gap-1.5 text-[14px] font-semibold text-charcoal">
              <Icon name="kakao" className="h-4 w-4 text-[#3A1D1D]" />
              {f.kakaoId}
            </label>
            <input id={`${uid}-kakao`} className={`${inputCls} mt-1.5`} value={kakaoId} maxLength={LIMIT.id} placeholder={f.kakaoPh} autoCapitalize="off" autoCorrect="off" spellCheck={false} onChange={(e) => setKakaoId(e.target.value)} />
            <p className="mt-1.5 text-[12px] leading-snug text-mute">{f.kakaoHint}</p>
          </div>
        </div>

        {hasWechat && hasKakao && (
          <div className="mt-4">
            <p className="text-[14px] font-semibold text-charcoal">{f.replyVia}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["wechat", "kakaotalk"] as const).map((v) => (
                <button key={v} type="button" className="chip" aria-pressed={replyVia === v} onClick={() => setReplyVia(v)}>
                  {v === "wechat" ? labelOf(form.contactMethods, "wechat") : "KakaoTalk"}
                </button>
              ))}
            </div>
          </div>
        )}

        {touchedReply && (
          <p className="mt-3 text-[13px] text-warn" role="status">{f.replyNeedOne}</p>
        )}

        <div className="mt-4">
          <label htmlFor={`${uid}-phone`} className="text-[14px] font-semibold text-charcoal">{f.phone}</label>
          <input id={`${uid}-phone`} type="tel" inputMode="tel" className={`${inputCls} mt-1.5`} value={phone} maxLength={LIMIT.phone} placeholder={f.phonePh} autoComplete="tel" onChange={(e) => setPhone(e.target.value)} />
        </div>
      </fieldset>

      {/* 3. 국가 */}
      <ChipGroup label={f.country} options={form.countries} value={country} onChange={setCountry} />

      {/* 4. 사건 유형 */}
      <Field label={<>{f.caseType}{req}</>} htmlFor={`${uid}-case`}>
        <select id={`${uid}-case`} className={`${inputCls} appearance-none bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10`} style={{ backgroundImage: SELECT_ARROW }} value={caseType} onChange={(e) => setCaseType(e.target.value)} required>
          <option value="">{f.caseTypePh}</option>
          {caseOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </Field>

      {/* 5. 신분 */}
      <ChipGroup label={<>{f.role}{req}</>} options={form.roles} value={role} onChange={setRole} />

      {/* 6. 단계 */}
      <ChipGroup label={f.stage} options={form.stages} value={stage} onChange={setStage} />

      {/* 7. 설명 */}
      <Field label={f.description} htmlFor={`${uid}-desc`}>
        <textarea id={`${uid}-desc`} rows={5} className={`${inputCls} h-auto py-3 leading-relaxed`} value={description} maxLength={LIMIT.description} placeholder={f.descriptionPh} onChange={(e) => setDescription(e.target.value)} />
      </Field>

      {/* 8. 긴급 */}
      <label className={`flex cursor-pointer gap-3 rounded-card border p-4 transition-colors ${urgent ? "border-warn bg-warn-bg" : "border-line bg-white hover:border-navy/30"}`}>
        <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[#B4533A]" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
        <span>
          <span className={`block text-[15px] font-semibold ${urgent ? "text-warn" : "text-charcoal"}`}>{f.urgent}</span>
          <span className="mt-0.5 block text-[13px] leading-snug text-mute">{f.urgentHint}</span>
        </span>
      </label>

      {/* 9. 동의 */}
      <div className="flex gap-3">
        <input id={`${uid}-consent`} type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[#13233F]" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        <div className="text-[14px] leading-snug">
          <label htmlFor={`${uid}-consent`} className="cursor-pointer text-charcoal">{f.consent}{req}</label>{" "}
          <Link href={`/${locale}/privacy`} target="_blank" className="whitespace-nowrap text-navy underline underline-offset-2">{f.consentLink}</Link>
        </div>
      </div>

      {state === "error" && (
        <p className="rounded-card border border-warn/40 bg-warn-bg p-3 text-[14px] text-warn" role="alert">{form.error}</p>
      )}

      <button
        type="submit"
        disabled={!valid || state === "sending"}
        className="btn-primary h-14 w-full text-[16px] disabled:cursor-not-allowed disabled:bg-mute/40"
        data-cta="consultation_submit"
        data-cta-location={location}
      >
        {state === "sending" ? form.submitting : form.submit}
      </button>
      <p id={`${uid}-privacy`} className="flex items-start gap-1.5 text-[12.5px] leading-snug text-mute">
        <Icon name="lock" className="mt-px h-3.5 w-3.5 shrink-0" />
        {form.privacyNote}
      </p>
    </form>
  );
}

const inputCls =
  "block h-12 w-full rounded-card border border-line bg-white px-3.5 text-[16px] text-charcoal placeholder:text-mute/60 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15";

const SELECT_ARROW =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235B6170' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")";

function labelOf(options: SelectOption[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

function Field({ label, htmlFor, children }: { label: React.ReactNode; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[15px] font-semibold text-charcoal">{label}</label>
      {children}
    </div>
  );
}

function ChipGroup({ label, options, value, onChange }: { label: React.ReactNode; options: SelectOption[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[15px] font-semibold text-charcoal">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o.value} type="button" className="chip" aria-pressed={value === o.value} onClick={() => onChange(value === o.value ? "" : o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
