"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** <details> 햄버거 — 링크를 누르거나 경로가 바뀌면 닫는다 */
export function MobileMenu({ label, closeLabel, children }: { label: string; closeLabel: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details ref={ref} className="group lg:hidden">
      <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg text-navy hover:bg-mist [&::-webkit-details-marker]:hidden">
        <span className="sr-only group-open:hidden">{label}</span>
        <span className="sr-only hidden group-open:inline">{closeLabel}</span>
        <svg viewBox="0 0 24 24" className="h-6 w-6 group-open:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        <svg viewBox="0 0 24 24" className="hidden h-6 w-6 group-open:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </summary>
      <div
        className="absolute inset-x-0 top-full border-b border-line bg-white shadow-float"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a,button") && ref.current) ref.current.open = false;
        }}
      >
        {children}
      </div>
    </details>
  );
}
