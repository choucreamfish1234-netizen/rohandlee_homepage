"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Audience, CaseDetail, Dictionary } from "@/content/types";
import { track } from "@/lib/analytics";
import { readFilter, subscribeFilter, writeFilter } from "@/lib/pathFilter";
import { Icon } from "../Icon";

export type CaseCardData = Pick<CaseDetail, "slug" | "icon" | "title" | "summary" | "cardCta" | "audiences" | "guide">;

export function CaseExplorer({ locale, labels, items }: { locale: string; labels: Dictionary["cases"]; items: CaseCardData[] }) {
  const [filter, setFilter] = useState<Audience | null>(null);
  useEffect(() => {
    const sync = () => setFilter(readFilter());
    sync();
    return subscribeFilter(sync);
  }, []);

  const select = (a: Audience | null) => {
    if (a) track("path_select", { cta_location: "cases", path: a });
    writeFilter(a);
  };

  const visible = items.filter((c) => !filter || c.audiences.includes(filter));
  const regular = visible.filter((c) => !c.guide);
  const guides = visible.filter((c) => c.guide);
  const tabs: { key: Audience | null; label: string }[] = [
    { key: null, label: labels.filterAll },
    { key: "victim", label: labels.filterLabels.victim },
    { key: "accused", label: labels.filterLabels.accused },
  ];

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="h2">{labels.title}</h2>
          <p className="lead">{labels.subtitle}</p>
        </div>
        <div role="group" aria-label={labels.title} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {tabs.map((t) => (
            <button key={t.label} type="button" className="chip shrink-0" aria-pressed={filter === t.key} onClick={() => select(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {regular.map((c) => (
          <li key={c.slug}>
            <Link href={`/${locale}/${c.slug}`} className="card group flex h-full items-start gap-3.5 p-4 transition-colors hover:border-navy/40 sm:flex-col sm:gap-0 sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-gold sm:h-11 sm:w-11">
                <Icon name={c.icon} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col self-stretch">
                <h3 className="text-[16px] font-bold leading-snug text-navy sm:mt-4 sm:text-[17px]">{c.title}</h3>
                <p className="mt-1 flex-1 text-[13.5px] leading-relaxed text-mute sm:mt-2 sm:text-[14px]">{c.summary}</p>
                <span className="mt-2 hidden items-center gap-1 text-[14px] font-semibold text-navy sm:mt-4 sm:inline-flex">
                  {c.cardCta}
                  <Icon name="arrow" className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
              <Icon name="chevron" className="mt-3 h-4 w-4 shrink-0 text-mute sm:hidden" />
            </Link>
          </li>
        ))}
      </ul>

      {guides.length > 0 && (
        <ul className="mt-4 grid gap-3 sm:gap-4 md:grid-cols-2">
          {guides.map((c) => (
            <li key={c.slug}>
              <Link href={`/${locale}/${c.slug}`} className="group flex h-full items-center gap-4 rounded-card border border-line bg-mist p-5 transition-colors hover:border-navy/40 sm:p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-gold">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16.5px] font-bold leading-snug text-navy">{c.title}</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-mute">{c.summary}</span>
                </span>
                <Icon name="chevron" className="h-5 w-5 shrink-0 text-mute group-hover:text-navy" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
