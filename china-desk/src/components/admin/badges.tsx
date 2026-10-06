import type { Consultation, Status } from "@/lib/consultation";
import { STATUS_LABEL } from "@/lib/consultation";

const STATUS_CLS: Record<Status, string> = {
  new: "bg-navy text-white",
  contacted: "bg-[#DCE6F5] text-navy",
  scheduled: "bg-gold-pale text-[#6B5330]",
  retained: "bg-[#DDF0E4] text-[#1F6B3A]",
  closed: "bg-mist-deep text-mute",
  spam: "bg-mist-deep text-mute line-through",
};

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${STATUS_CLS[status]}`}>{STATUS_LABEL[status]}</span>;
}

export function UrgentBadge() {
  return <span className="inline-flex shrink-0 rounded-full bg-warn px-2 py-0.5 text-[11.5px] font-bold text-white">긴급</span>;
}

export function ChannelBadge({ via }: { via: "wechat" | "kakaotalk" }) {
  return via === "wechat" ? (
    <span className="inline-flex shrink-0 rounded-md bg-wechat px-1.5 py-0.5 text-[11.5px] font-bold text-white">위챗</span>
  ) : (
    <span className="inline-flex shrink-0 rounded-md bg-kakao px-1.5 py-0.5 text-[11.5px] font-bold text-[#191919]">카카오</span>
  );
}

/** 답변 희망 채널 배지 + ID, 다른 채널은 작게 */
export function ReplyCell({ c }: { c: Consultation }) {
  const via = c.reply_via ?? (c.wechat_id ? "wechat" : "kakaotalk");
  const main = via === "wechat" ? c.wechat_id : c.kakao_id;
  const other = via === "wechat" ? c.kakao_id : c.wechat_id;
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        <ChannelBadge via={via} />
        <span className="truncate font-medium text-charcoal">{main || c.contact_value}</span>
      </div>
      {(other || c.phone) && (
        <p className="mt-0.5 truncate text-[12px] text-mute">
          {other && `${via === "wechat" ? "카카오" : "위챗"} ${other}`}
          {other && c.phone && " · "}
          {c.phone && `☎ ${c.phone}`}
        </p>
      )}
    </div>
  );
}
