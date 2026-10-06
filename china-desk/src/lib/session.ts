/**
 * 관리자 세션 — Web Crypto HMAC-SHA256 서명 쿠키.
 * Edge(middleware)와 Node(server action) 양쪽에서 같은 코드로 검증한다.
 */
export const SESSION_COOKIE = "cd_admin";
export const SESSION_TTL_SEC = 12 * 60 * 60;

const enc = new TextEncoder();

function secret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET || "";
  return s.length >= 32 ? s : null;
}

function b64url(bytes: ArrayBuffer): string {
  let bin = "";
  for (const b of new Uint8Array(bytes)) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(data: string, key: string): Promise<string> {
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", k, enc.encode(data)));
}

/** 길이와 무관하게 상수 시간 비교 (양쪽을 해시한 뒤 비교) */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a)),
    crypto.subtle.digest("SHA-256", enc.encode(b)),
  ]);
  const x = new Uint8Array(ha);
  const y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

export function authConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && secret() !== null;
}

export async function createSessionToken(): Promise<string> {
  const key = secret();
  if (!key) throw new Error("ADMIN_SESSION_SECRET 이 없거나 32자 미만입니다.");
  const payload = `v1.${Math.floor(Date.now() / 1000) + SESSION_TTL_SEC}`;
  return `${payload}.${await hmac(payload, key)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  const key = secret();
  if (!key || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(parts[2], await hmac(`${parts[0]}.${parts[1]}`, key));
}
