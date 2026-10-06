"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { uploadPhotoAction, type PhotoState } from "@/app/admin/actions";

const MAX = 5 * 1024 * 1024;
const ACCEPT = ["image/jpeg", "image/png", "image/webp"];

export function PhotoUploader({ lawyerId }: { lawyerId: string }) {
  const [state, action, pending] = useActionState<PhotoState, FormData>(uploadPhotoAction, {});
  const [preview, setPreview] = useState<string | null>(null);
  const [localError, setLocalError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  useEffect(() => {
    if (state.ok) {
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [state]);

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="lawyer" value={lawyerId} />
      <input
        ref={inputRef}
        type="file"
        name="photo"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        className="block w-full text-[13px] file:mr-3 file:rounded-md file:border file:border-line file:bg-white file:px-3 file:py-1.5 file:text-[13px] file:font-semibold file:text-navy"
        onChange={(e) => {
          setLocalError("");
          const f = e.target.files?.[0];
          if (preview) URL.revokeObjectURL(preview);
          setPreview(null);
          if (!f) return;
          if (!ACCEPT.includes(f.type)) return setLocalError("JPG, PNG, WEBP 형식만 올릴 수 있습니다.");
          if (f.size > MAX) return setLocalError("5MB 이하 파일만 올릴 수 있습니다.");
          setPreview(URL.createObjectURL(f));
        }}
      />
      {preview && (
        <div className="flex items-end gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="미리보기" className="aspect-[4/5] w-28 rounded-lg border border-line object-cover" />
          <p className="text-[12.5px] text-mute">미리보기 — 저장을 눌러야 사이트에 반영됩니다.</p>
        </div>
      )}
      {(localError || state.error) && <p className="text-[13px] text-warn" role="alert">{localError || state.error}</p>}
      {state.ok && !preview && <p className="text-[13px] text-[#1F6B3A]">저장했습니다. 사이트에는 1분 안에 반영됩니다.</p>}
      <button type="submit" disabled={!preview || pending || !!localError} className="btn-primary h-10 px-4 text-[14px] disabled:cursor-not-allowed disabled:opacity-50">
        {pending ? "올리는 중…" : "사진 저장"}
      </button>
    </form>
  );
}
