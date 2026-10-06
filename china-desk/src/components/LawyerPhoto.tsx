import type { Lawyer } from "@/content/types";

/** /media/lawyer/<id> — 등록 사진이 없으면 이름 첫 글자 SVG 가 내려온다 */
export function LawyerPhoto({ lawyer, className = "" }: { lawyer: Lawyer; className?: string }) {
  const initial = Array.from(lawyer.name)[0] ?? "";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/media/lawyer/${lawyer.id}?i=${encodeURIComponent(initial)}`}
      alt={`${lawyer.name} ${lawyer.title}`}
      width={240}
      height={300}
      loading="lazy"
      className={`aspect-[4/5] w-full rounded-lg bg-mist-deep object-cover ${className}`}
    />
  );
}
