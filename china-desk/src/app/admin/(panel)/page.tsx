import Link from "next/link";
import { ReplyCell, StatusBadge, UrgentBadge } from "@/components/admin/badges";
import { caseLabel, formatKst, roleLabel, stageLabel } from "@/lib/admin-labels";
import { isStatus, isUrgentOpen, sortConsultations, STATUS_LABEL, STATUSES, type Consultation, type Status } from "@/lib/consultation";
import { listConsultations } from "@/lib/store";

export const dynamic = "force-dynamic";

type SP = Promise<{ status?: string; urgent?: string; q?: string }>;

function matches(c: Consultation, q: string): boolean {
  const hay = [c.name, c.wechat_id, c.kakao_id, c.phone, c.contact_value, c.description, c.memo].filter(Boolean).join("\n").toLowerCase();
  return hay.includes(q.toLowerCase());
}

export default async function AdminListPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const status: Status | null = isStatus(sp.status) ? sp.status : null;
  const urgentOnly = sp.urgent === "1";
  const q = (sp.q ?? "").trim().slice(0, 100);

  let all: Consultation[] = [];
  let loadError = "";
  try {
    all = await listConsultations();
  } catch (e) {
    loadError = e instanceof Error ? e.message : String(e);
  }

  const counts = Object.fromEntries(STATUSES.map((s) => [s, all.filter((c) => c.status === s).length])) as Record<Status, number>;
  const nonSpam = all.filter((c) => c.status !== "spam").length;
  const urgentOpen = all.filter(isUrgentOpen).length;

  let rows = all.filter((c) => (status ? c.status === status : c.status !== "spam"));
  if (urgentOnly) rows = rows.filter((c) => c.urgent);
  if (q) rows = rows.filter((c) => matches(c, q));
  rows = sortConsultations(rows);

  const link = (patch: Record<string, string | null>) => {
    const p = new URLSearchParams();
    const next = { status: status ?? null, urgent: urgentOnly ? "1" : null, q: q || null, ...patch };
    for (const [k, v] of Object.entries(next)) if (v) p.set(k, v);
    const s = p.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  return (
    <div className="space-y-6">
      {loadError && <p className="rounded-card border border-warn/40 bg-warn-bg p-4 text-[14px] text-warn">불러오기 실패: {loadError}</p>}

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Summary label="신규" value={counts.new} href={link({ status: "new", urgent: null })} />
        <Summary label="긴급 미처리" value={urgentOpen} href={link({ status: null, urgent: "1" })} tone="warn" />
        <Summary label="상담 예정" value={counts.scheduled} href={link({ status: "scheduled", urgent: null })} />
        <Summary label="수임" value={counts.retained} href={link({ status: "retained", urgent: null })} />
      </section>

      <section className="space-y-3">
        <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          <Tab href={link({ status: null })} on={!status} label="전체" count={nonSpam} />
          {STATUSES.map((s) => (
            <Tab key={s} href={link({ status: s })} on={status === s} label={STATUS_LABEL[s]} count={counts[s]} />
          ))}
        </div>
        <form action="/admin" className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {status && <input type="hidden" name="status" value={status} />}
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="이름·위챗/카카오 ID·전화·내용·메모 검색"
            className="h-11 w-full rounded-card border border-line bg-white px-3.5 text-[15px] focus:border-navy focus:outline-none sm:max-w-md"
          />
          <label className="flex h-11 items-center gap-2 rounded-card border border-line bg-white px-3.5 text-[14px]">
            <input type="checkbox" name="urgent" value="1" defaultChecked={urgentOnly} className="h-4 w-4 accent-[#B4533A]" />
            긴급만 보기
          </label>
          <button type="submit" className="h-11 rounded-card bg-navy px-5 text-[14px] font-semibold text-white">검색</button>
          {(q || urgentOnly) && (
            <Link href={link({ q: null, urgent: null })} className="text-[13px] text-mute underline">초기화</Link>
          )}
        </form>
      </section>

      {rows.length === 0 ? (
        <p className="rounded-card border border-line bg-white p-10 text-center text-[15px] text-mute">해당하는 상담 신청이 없습니다.</p>
      ) : (
        <>
          {/* 데스크톱 표 */}
          <div className="hidden overflow-hidden rounded-card border border-line bg-white lg:block">
            <table className="w-full table-fixed text-left text-[14px]">
              <thead className="border-b border-line bg-mist text-[12.5px] text-mute">
                <tr>
                  <th className="w-[128px] px-4 py-3 font-medium">접수</th>
                  <th className="w-[150px] px-4 py-3 font-medium">이름</th>
                  <th className="w-[230px] px-4 py-3 font-medium">답변 채널</th>
                  <th className="px-4 py-3 font-medium">사건 유형</th>
                  <th className="w-[120px] px-4 py-3 font-medium">신분</th>
                  <th className="w-[100px] px-4 py-3 font-medium">단계</th>
                  <th className="w-[96px] px-4 py-3 font-medium">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((c) => (
                  <tr key={c.id} className={`relative hover:bg-mist/60 ${isUrgentOpen(c) ? "bg-warn-bg" : ""}`}>
                    <td className="px-4 py-3 text-[13px] text-mute">{formatKst(c.created_at)}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/${c.id}`} className="flex items-center gap-1.5 font-semibold text-navy after:absolute after:inset-0">
                        {c.urgent && <UrgentBadge />}
                        <span className="truncate">{c.name}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3"><ReplyCell c={c} /></td>
                    <td className="truncate px-4 py-3">{caseLabel(c.case_type)}</td>
                    <td className="truncate px-4 py-3">{roleLabel(c.role)}</td>
                    <td className="truncate px-4 py-3">{stageLabel(c.stage)}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일 카드 */}
          <ul className="space-y-2.5 lg:hidden">
            {rows.map((c) => (
              <li key={c.id}>
                <Link href={`/admin/${c.id}`} className={`block rounded-card border bg-white p-4 ${isUrgentOpen(c) ? "border-warn/50 bg-warn-bg" : "border-line"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex min-w-0 items-center gap-1.5 font-semibold text-navy">
                      {c.urgent && <UrgentBadge />}
                      <span className="truncate">{c.name}</span>
                    </p>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="mt-1 text-[13px] text-mute">{caseLabel(c.case_type)} · {roleLabel(c.role)} · {stageLabel(c.stage)}</p>
                  <div className="mt-2 text-[14px]"><ReplyCell c={c} /></div>
                  <p className="mt-2 text-[12px] text-mute">{formatKst(c.created_at)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Summary({ label, value, href, tone }: { label: string; value: number; href: string; tone?: "warn" }) {
  return (
    <Link href={href} className={`rounded-card border bg-white p-4 hover:border-navy/40 sm:p-5 ${tone === "warn" && value > 0 ? "border-warn/50" : "border-line"}`}>
      <p className="text-[13px] text-mute">{label}</p>
      <p className={`mt-1 text-[28px] font-bold ${tone === "warn" && value > 0 ? "text-warn" : "text-navy"}`}>{value}</p>
    </Link>
  );
}

function Tab({ href, on, label, count }: { href: string; on: boolean; label: string; count: number }) {
  return (
    <Link href={href} className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13.5px] ${on ? "border-navy bg-navy font-semibold text-white" : "border-line bg-white text-charcoal hover:border-navy/40"}`}>
      {label}
      <span className={on ? "text-white/70" : "text-mute"}>{count}</span>
    </Link>
  );
}
