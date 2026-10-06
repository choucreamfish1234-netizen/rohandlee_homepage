import type { Dictionary } from "@/content/types";
import { ConsultLink, WechatButton } from "../contact";
import { Icon } from "../Icon";

/** 모바일 하단 고정 CTA — lg 이상에서는 숨김 */
export function MobileCta({ dict }: { dict: Dictionary }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-site grid-cols-2 gap-2">
        <WechatButton location="sticky" className="flex h-12 items-center justify-center gap-1.5 rounded-card bg-wechat text-[15px] font-semibold text-white">
          <Icon name="wechat" />
          {dict.common.wechatConsult}
        </WechatButton>
        <ConsultLink location="sticky" className="flex h-12 items-center justify-center gap-1.5 rounded-card bg-navy text-[15px] font-semibold text-white">
          <Icon name="message" />
          {dict.common.chineseLegalConsult}
        </ConsultLink>
      </div>
    </div>
  );
}
