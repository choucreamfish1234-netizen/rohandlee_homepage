"use client";

import { useState } from "react";

export function CopyButton({ value, className = "" }: { value: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={`rounded-md border border-line bg-white px-2.5 py-1 text-[12.5px] font-semibold text-navy hover:bg-mist ${className}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          /* noop */
        }
      }}
    >
      {done ? "복사됨" : "복사"}
    </button>
  );
}
