"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { isStatus } from "@/lib/consultation";
import { getLawyerPhotos, isLawyerId, saveLawyerPhotos } from "@/lib/lawyers";
import { authConfigured, createSessionToken, safeEqual, SESSION_COOKIE, SESSION_TTL_SEC } from "@/lib/session";
import { deleteMedia, updateConsultation, uploadMedia } from "@/lib/store";

/* ───────── 로그인 ───────── */

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!authConfigured()) {
    return { error: "ADMIN_PASSWORD 와 ADMIN_SESSION_SECRET(32자 이상) 환경변수를 먼저 설정해 주세요." };
  }
  const password = String(formData.get("password") ?? "");
  const ok = password.length > 0 && (await safeEqual(password, process.env.ADMIN_PASSWORD!));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 600));
    return { error: "비밀번호가 맞지 않습니다." };
  }
  const jar = await cookies();
  jar.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SEC,
  });
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ───────── 상담 처리 ───────── */

export async function saveConsultationAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = formData.get("status");
  const memo = String(formData.get("memo") ?? "").slice(0, 5000).trim();
  if (!isStatus(status)) throw new Error("잘못된 상태 값");
  await updateConsultation(id, { status, memo: memo || null });
  revalidatePath("/admin");
  redirect(`/admin/${id}?saved=1`);
}

/* ───────── 변호사 사진 ───────── */

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

export type PhotoState = { ok?: boolean; error?: string };

/** 파일 앞부분으로 실제 형식 확인 */
function sniff(b: Uint8Array): string | null {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return "image/webp";
  return null;
}

export async function uploadPhotoAction(_prev: PhotoState, formData: FormData): Promise<PhotoState> {
  await requireAdmin();
  const id = String(formData.get("lawyer") ?? "");
  const file = formData.get("photo");
  if (!isLawyerId(id)) return { error: "알 수 없는 변호사입니다." };
  if (!(file instanceof File) || file.size === 0) return { error: "사진 파일을 선택해 주세요." };
  if (file.size > MAX_BYTES) return { error: "5MB 이하 파일만 올릴 수 있습니다." };

  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = sniff(bytes);
  if (!type) return { error: "JPG, PNG, WEBP 형식만 올릴 수 있습니다." };

  try {
    const photos = await getLawyerPhotos();
    const prev = photos[id];
    const objectPath = `lawyers/${id}-${Date.now()}.${TYPES[type]}`;
    const url = await uploadMedia(objectPath, bytes, type);
    photos[id] = { url, path: objectPath, updatedAt: new Date().toISOString() };
    await saveLawyerPhotos(photos);
    if (prev?.path && prev.path !== objectPath) await deleteMedia(prev.path).catch(() => undefined);
  } catch (e) {
    console.error("[admin] photo upload failed", e);
    return { error: "업로드에 실패했습니다. Supabase 버킷(klh-media)과 환경변수를 확인해 주세요." };
  }
  revalidatePath("/admin/settings");
  return { ok: true };
}

export async function removePhotoAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("lawyer") ?? "");
  if (!isLawyerId(id)) return;
  const photos = await getLawyerPhotos();
  const prev = photos[id];
  delete photos[id];
  await saveLawyerPhotos(photos);
  if (prev?.path) await deleteMedia(prev.path).catch(() => undefined);
  revalidatePath("/admin/settings");
}
