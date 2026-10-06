import type { FaqItem } from "@/content/types";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-[16px] font-semibold leading-snug text-navy [&::-webkit-details-marker]:hidden">
            <span className="flex gap-3">
              <span className="font-bold text-gold" aria-hidden="true">Q</span>
              {f.q}
            </span>
            <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-mute transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </summary>
          <p className="pb-5 pl-7 text-[15px] leading-relaxed text-mute">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
