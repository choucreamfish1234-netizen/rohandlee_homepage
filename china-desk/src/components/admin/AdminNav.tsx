"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav() {
  const p = usePathname();
  const tabs = [
    { href: "/admin", label: "상담", on: p === "/admin" || (/^\/admin\/[0-9a-f-]{36}$/i.test(p) ) },
    { href: "/admin/settings", label: "변호사 사진", on: p.startsWith("/admin/settings") },
  ];
  return (
    <nav className="flex h-full items-stretch gap-1 text-[14px]">
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} className={`flex items-center border-b-2 px-3 ${t.on ? "border-gold-light font-semibold text-white" : "border-transparent text-white/65 hover:text-white"}`}>
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
