import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/admin/CopyButton";
import { ChannelBadge, StatusBadge, UrgentBadge } from "@/components/admin/badges";
import { caseLabel, countryLabel, formatKst, localeLabel, roleLabel, stageLabel } from "@/lib/admin-labels";
import { STATUS_LABEL, STATUSES } from "@/lib/consultation";
import { getConsultation } from "@/lib/store";
import { saveConsultationAction } from "../../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> };

const ACTIVE_STATUSES = STATUSES.filter((s) => s !== "spam");

export default async function AdminDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { saved } = await searchParams;
  const c = await getConsultation(id);
  if (!c) notFound();

  const via = c.reply_via ?? (c.wechat_id ? "wechat" : "kakaotalk");
  const channels = [
    {
      key: "wechat" as const,
      label: "위챗",
      value: c.wechat_id,
      tip: "위챗 → 친구 추가 → ID 검색. 안 찾아지면 신청자가 'ID로 추가' 를 꺼 둔 것이니 카카오톡·전화로 연락하세요.",
    },
    {
      key: "kakaotalk" as const,
      label: "카카오톡",
      value: c.kakao_id,
      tip: "카카오톡 → 친구 추가 → ID 검색. 상대가 'ID 검색 허용' 을 꺼 두면 검색되지 않습니다.",
    },
  ];

  return (
    <div className="space-y-5">
      <Link href="/admin" className="inline-flex items-center gap-1 text-[14px] text-mute hover:text-navy">← 목록</Link>

      <div className="flex flex-wrap items-center gap-2">
        {c.urgent && <UrgentBadge />}
        <h1 className="text-[24px] font-bold text-navy">{c.name}</h1>
        <StatusBadge status={c.status} />
        <span className="text-[13px] text-mute">접수 {formatKst(c.created_at)} · {localeLabel(c.locale)}판</span>
      </div>
      {saved && <p className="rounded-card border border-[#1F6B3A]/30 bg-[#EEF7F1] px-4 py-2.5 text-[14px] text-[#1F6B3A]">저장했습니다.</p>}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          {/* 답변 채널 */}
          <section className="rounded-card border border-line bg-white">
            <h2 className="border-b border-line px-5 py-3 text-[15px] font-bold text-navy">답변 채널</h2>
            <ul className="divide-y divide-line">
              {channels.map((ch) => (
                <li key={ch.key} className="px-5 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <ChannelBadge via={ch.key} />
                    <span className={`text-[16px] ${ch.value ? "font-semibold text-charcoal" : "text-mute"}`}>{ch.value || "미기재"}</span>
                    {via === ch.key && <span className="rounded-full border border-navy px-2 py-0.5 text-[11.5px] font-semibold text-navy">답변 희망</span>}
                    {ch.value && <CopyButton value={ch.value} className="ml-auto" />}
                  </div>
                  {ch.value && <p className="mt-1.5 text-[12.5px] leading-snug text-mute">{ch.tip}</p>}
                </li>
              ))}
              <li className="px-5 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-md bg-mist-deep px-1.5 py-0.5 text-[11.5px] font-bold text-charcoal">전화</span>
                  <span className={`text-[16px] ${c.phone ? "font-semibold text-charcoal" : "text-mute"}`}>{c.phone || "미기재"}</span>
                  {c.phone && (
                    <span className="ml-auto flex gap-1.5">
                      <CopyButton value={c.phone} />
                      <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className="rounded-md bg-navy px-2.5 py-1 text-[12.5px] font-semibold text-white">전화 걸기</a>
                    </span>
                  )}
                </div>
                {c.phone && <p className="mt-1.5 text-[12.5px] leading-snug text-mute">+86 번호는 국제전화입니다. 중국 거주자는 위챗 음성통화가 더 잘 연결됩니다.</p>}
              </li>
            </ul>
          </section>

          {/* 원문 */}
          <section className="rounded-card border border-line bg-white">
            <h2 className="border-b border-line px-5 py-3 text-[15px] font-bold text-navy">신청자 원문</h2>
            <p className="whitespace-pre-wrap break-words px-5 py-4 text-[15px] leading-relaxed text-charcoal" lang={c.locale === "cn" ? "zh-CN" : "ko"}>
              {c.description || <span className="text-mute">(내용 없음)</span>}
            </p>
          </section>

          {/* 사건 정보 */}
          <section className="rounded-card border border-line bg-white">
            <h2 className="border-b border-line px-5 py-3 text-[15px] font-bold text-navy">사건 정보</h2>
            <table className="w-full text-[14.5px]">
              <tbody className="divide-y divide-line">
                <InfoRow k="사건 유형" v={caseLabel(c.case_type)} />
                <InfoRow k="신분" v={roleLabel(c.role)} />
                <InfoRow k="사건 단계" v={stageLabel(c.stage)} />
                <InfoRow k="거주 국가" v={countryLabel(c.country)} />
                <InfoRow k="긴급" v={c.urgent ? "예" : "아니오"} />
                <InfoRow k="신청 페이지" v={c.page || "—"} />
                <InfoRow k="최종 수정" v={formatKst(c.updated_at)} />
              </tbody>
            </table>
          </section>
        </div>

        {/* 처리 패널 */}
        <aside>
          <form action={saveConsultationAction} className="sticky top-20 space-y-4 rounded-card border border-line bg-white p-5">
            <input type="hidden" name="id" value={c.id} />
            <fieldset>
              <legend className="mb-2 text-[15px] font-bold text-navy">처리 상태</legend>
              <div className="grid grid-cols-2 gap-1.5">
                {[...ACTIVE_STATUSES, "spam" as const].map((s) => (
                  <label key={s} className="flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-2 text-[14px] has-[:checked]:border-navy has-[:checked]:bg-mist has-[:checked]:font-semibold">
                    <input type="radio" name="status" value={s} defaultChecked={c.status === s} className="accent-[#13233F]" />
                    {STATUS_LABEL[s]}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="block">
              <span className="text-[15px] font-bold text-navy">내부 메모</span>
              <textarea
                name="memo"
                rows={7}
                defaultValue={c.memo ?? ""}
                maxLength={5000}
                placeholder="통화 내용, 다음 연락 일정 등 (신청자에게 보이지 않음)"
                className="mt-2 block w-full rounded-card border border-line p-3 text-[14.5px] leading-relaxed focus:border-navy focus:outline-none"
              />
            </label>
            <button type="submit" className="btn-primary w-full">저장</button>
          </form>
        </aside>
      </div>
    </div>
  );
}

function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <tr>
      <th className="w-[120px] bg-mist/60 px-5 py-3 text-left font-medium text-mute">{k}</th>
      <td className="break-all px-5 py-3 text-charcoal">{v}</td>
    </tr>
  );
}
