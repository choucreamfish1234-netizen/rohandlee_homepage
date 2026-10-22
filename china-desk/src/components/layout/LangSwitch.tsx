"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, dictionaries } from "@/content/locales";

/**
 * 같은 페이지의 다른 언어판으로 이동 (쿼리·해시 유지).
 * 질문형 페이지(/qa)처럼 언어마다 따로 있는 페이지는, 상대 언어에 없으면 그 언어 홈으로 보낸다.
 */
export function LangSwitch({ current, qaPaths, className = "" }: { current: string; qaPaths: Record<string, string[]>; className?: string }) {
  const pathname = usePathname() || `/${current}`;
  const router = useRouter();
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <nav aria-label="Language" className={`flex items-center ${className}`}>
      {locales.map((l, i) => {
        const exists = !rest.startsWith("/qa") || (qaPaths[l] ?? []).includes(rest);
        const href = exists ? `/${l}${rest}` : `/${l}`;
        const keep = exists && l !== current;
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
                router.push(keep ? `${href}${window.location.search}${window.location.hash}` : href);
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
