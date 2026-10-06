"use client";

import { useEffect, useRef } from "react";

/** 가로 스크롤 칩 — 현재 페이지 칩이 보이도록 가운데로 맞춘다 */
export function ChipScroller({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const ul = ref.current;
    const cur = ul?.querySelector<HTMLElement>('[aria-current="page"]');
    if (ul && cur) ul.scrollLeft = cur.offsetLeft - (ul.clientWidth - cur.offsetWidth) / 2;
  }, []);
  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}
