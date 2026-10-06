import { dictionaries } from "@/content/locales";
import { getLawyerPhotos, isLawyerId } from "@/lib/lawyers";
import { readMedia } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE = "public, max-age=60, s-maxage=60, stale-while-revalidate=60";

/**
 * 변호사 사진 고정 주소. 등록 사진은 사이트 도메인에서 프록시로 내려 준다(중국에서 supabase.co 직접 접속 회피).
 * 사진이 없으면 이름 첫 글자 SVG.
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isLawyerId(id)) return new Response("Not found", { status: 404 });

  const photos = await getLawyerPhotos();
  const entry = photos[id];
  if (entry) {
    const media = await readMedia(entry.url).catch(() => null);
    if (media) {
      return new Response(media.body, {
        headers: { "Content-Type": media.contentType, "Cache-Control": CACHE, "X-Content-Type-Options": "nosniff" },
      });
    }
  }

  const q = new URL(req.url).searchParams.get("i") ?? "";
  const fallback = dictionaries.cn.about.lawyers.find((l) => l.id === id)?.name ?? "";
  const initial = Array.from(q || fallback)[0] ?? "";
  return new Response(initialSvg(initial), {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": CACHE, "X-Content-Type-Options": "nosniff" },
  });
}

function initialSvg(ch: string): string {
  const esc = ch.replace(/[&<>"']/g, (m) => `&#${m.charCodeAt(0)};`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 300" width="240" height="300"><rect width="240" height="300" fill="#E9EDF3"/><circle cx="120" cy="150" r="62" fill="#13233F"/><text x="120" y="150" dy="0.35em" text-anchor="middle" font-family="'PingFang SC','Microsoft YaHei','Apple SD Gothic Neo','Malgun Gothic',sans-serif" font-size="56" font-weight="600" fill="#ffffff">${esc}</text></svg>`;
}
