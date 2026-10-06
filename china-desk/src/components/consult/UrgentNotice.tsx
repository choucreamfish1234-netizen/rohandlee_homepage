"use client";

import { useSearchParams } from "next/navigation";

/** ?urgent=1 일 때만 보이는 긴급 안내 */
export function UrgentNotice({ children }: { children: React.ReactNode }) {
  const q = useSearchParams();
  if (q.get("urgent") !== "1") return null;
  return <>{children}</>;
}
