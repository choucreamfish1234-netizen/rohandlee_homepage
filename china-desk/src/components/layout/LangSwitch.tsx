"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, dictionaries } from "@/content/locales";

/** 같은 페이지의 다른 언어판으로 이동 (쿼리·해시 유지) */
export function LangSwitch({ current, className = "" }: { current: string; className?: string }) {
  const pathname = usePathname() || `/${current}`;
  const router = useRouter();
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <nav aria-label="Language" className={`flex items-center ${className}`}>
      {locales.map((l, i) => {
        const href = `/${l}${rest}`;
        const active = l === current;
        return (
          <span key={l} className="flex items-center">
            {i > 0 && <span className="mx-2 opacity-40" aria-hidden="true">|</span>}
            <a
              href={href}
              hrefLang={dictionaries[l].htmlLang}
              lang={dictionaries[l].htmlLang}
              aria-current={active ? "true" : undefined}
              className={active ? "font-semibold" : "opacity-70 hover:opacity-100"}
              onClick={(e) => {
                if (active) return e.preventDefault();
                e.preventDefault();
                router.push(`${href}${window.location.search}${window.location.hash}`);
              }}
            >
              {dictionaries[l].langLabel}
            </a>
          </span>
        );
      })}
    </nav>
  );
}
