import { dictionaries } from "@/content/locales";
import { PhotoUploader } from "@/components/admin/PhotoUploader";
import { formatKst } from "@/lib/admin-labels";
import { getLawyerPhotos } from "@/lib/lawyers";
import { removePhotoAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const photos = await getLawyerPhotos();
  const lawyers = dictionaries.ko.about.lawyers;
  const zhNames = Object.fromEntries(dictionaries.cn.about.lawyers.map((l) => [l.id, l.name]));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[22px] font-bold text-navy">변호사 사진</h1>
        <p className="mt-1.5 text-[14px] text-mute">JPG·PNG·WEBP, 5MB 이하. 세로 4:5 비율이 가장 잘 맞습니다. 저장하면 사이트 &lsquo;사무소 소개&rsquo;에 1분 안에 반영되고, 내리면 이름 첫 글자 이미지로 돌아갑니다.</p>
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {lawyers.map((l) => {
          const p = photos[l.id];
          const initial = Array.from(zhNames[l.id] ?? l.name)[0] ?? "";
          return (
            <li key={l.id} className="rounded-card border border-line bg-white p-5">
              <div className="flex gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/media/lawyer/${l.id}?i=${encodeURIComponent(initial)}&v=${encodeURIComponent(p?.updatedAt ?? "none")}`}
                  alt={l.name}
                  className="aspect-[4/5] w-28 shrink-0 rounded-lg border border-line bg-mist-deep object-cover"
                />
                <div className="min-w-0">
                  <p className="text-[18px] font-bold text-navy">{l.name}</p>
                  <p className="text-[13px] text-mute">{l.role} · id <code>{l.id}</code></p>
                  <p className="mt-2 text-[13px] text-mute">{p ? `등록됨 · ${formatKst(p.updatedAt)}` : "등록된 사진 없음 (이니셜 표시 중)"}</p>
                  {p && (
                    <form action={removePhotoAction} className="mt-3">
                      <input type="hidden" name="lawyer" value={l.id} />
                      <button type="submit" className="rounded-md border border-warn/40 px-3 py-1.5 text-[13px] font-semibold text-warn hover:bg-warn-bg">사진 내리기</button>
                    </form>
                  )}
                </div>
              </div>
              <div className="mt-4 border-t border-line pt-4">
                <PhotoUploader lawyerId={l.id} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
