import Link from "next/link";
import type { Dictionary } from "@/content/types";

export function BrandMark({ dict, href, inverse = false }: { dict: Dictionary; href: string; inverse?: boolean }) {
  return (
    <Link href={href} className="flex min-w-0 items-center gap-2.5" aria-label={dict.brand.name}>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] font-serif text-[15px] font-semibold tracking-tight ${
          inverse ? "bg-white text-navy" : "bg-navy text-white"
        }`}
        aria-hidden="true"
      >
        R&amp;L
      </span>
      <span className="min-w-0 leading-tight">
        <span className={`block truncate text-[15px] font-bold tracking-tight sm:text-[16px] ${inverse ? "text-white" : "text-navy"}`}>{dict.brand.name}</span>
        <span className={`block truncate text-[11.5px] ${inverse ? "text-white/60" : "text-mute"}`}>{dict.brand.sub}</span>
      </span>
    </Link>
  );
}
