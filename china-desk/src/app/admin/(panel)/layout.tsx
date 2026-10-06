import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { isLocalMode } from "@/lib/store";
import { logoutAction } from "../actions";
import { AdminNav } from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-navy-deep text-white">
        <div className="mx-auto flex h-14 max-w-site items-center gap-4 px-4 sm:px-6">
          <Link href="/admin" className="flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-white font-serif text-[12px] font-semibold text-navy">R&amp;L</span>
            <span className="hidden text-[14px] font-bold sm:inline">China Desk 관리자</span>
          </Link>
          <AdminNav />
          <div className="ml-auto flex items-center gap-3 text-[13px]">
            {isLocalMode && (
              <span className="rounded-full bg-warn px-2.5 py-1 text-[11.5px] font-semibold text-white" title="SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 가 없어 .data/ 에 저장 중입니다. 배포 환경에서는 데이터가 유지되지 않습니다.">
                로컬 저장 모드
              </span>
            )}
            <a href="/cn" target="_blank" rel="noopener" className="hidden text-white/70 hover:text-white sm:inline">사이트 보기 ↗</a>
            <form action={logoutAction}>
              <button type="submit" className="rounded-md border border-white/20 px-2.5 py-1 text-white/80 hover:bg-white/10">로그아웃</button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-site px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
