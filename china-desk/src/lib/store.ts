import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Consultation, NewConsultation, Status } from "./consultation";

/**
 * 저장소 — Supabase REST(PostgREST·Storage)를 fetch 로 직접 호출한다.
 * SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 가 없으면 .data/ 로컬 파일에 저장하는 개발용 모드.
 */
const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const TABLE = "klh_consultations";
const SETTINGS = "klh_settings";
export const MEDIA_BUCKET = "klh-media";

export const isLocalMode = !(SUPABASE_URL && SUPABASE_KEY);

const DATA_DIR = path.join(process.cwd(), ".data");
const CONSULT_FILE = path.join(DATA_DIR, "consultations.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const MEDIA_DIR = path.join(DATA_DIR, "media");

/* ───────── Supabase helpers ───────── */

function sbHeaders(extra: Record<string, string> = {}): HeadersInit {
  return { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, ...extra };
}

async function rest<T>(pathAndQuery: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${pathAndQuery}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...sbHeaders(), ...(init.headers as Record<string, string>) },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

/* ───────── local file helpers ───────── */

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, file);
}

/* ───────── consultations ───────── */

export async function insertConsultation(input: NewConsultation): Promise<Consultation> {
  if (!isLocalMode) {
    const rows = await rest<Consultation[]>(TABLE, {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(input),
    });
    return rows[0];
  }
  const now = new Date().toISOString();
  const row: Consultation = { ...input, id: randomUUID(), created_at: now, updated_at: now, status: "new", memo: null };
  const rows = await readJson<Consultation[]>(CONSULT_FILE, []);
  rows.push(row);
  await writeJson(CONSULT_FILE, rows);
  return row;
}

export async function listConsultations(): Promise<Consultation[]> {
  if (!isLocalMode) {
    return rest<Consultation[]>(`${TABLE}?select=*&order=created_at.desc&limit=2000`);
  }
  return readJson<Consultation[]>(CONSULT_FILE, []);
}

export async function getConsultation(id: string): Promise<Consultation | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  if (!isLocalMode) {
    const rows = await rest<Consultation[]>(`${TABLE}?select=*&id=eq.${id}&limit=1`);
    return rows[0] ?? null;
  }
  const rows = await readJson<Consultation[]>(CONSULT_FILE, []);
  return rows.find((r) => r.id === id) ?? null;
}

export async function updateConsultation(id: string, patch: { status: Status; memo: string | null }): Promise<void> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error("invalid id");
  const updated_at = new Date().toISOString();
  if (!isLocalMode) {
    await rest(`${TABLE}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ ...patch, updated_at }) });
    return;
  }
  const rows = await readJson<Consultation[]>(CONSULT_FILE, []);
  const i = rows.findIndex((r) => r.id === id);
  if (i < 0) throw new Error("not found");
  rows[i] = { ...rows[i], ...patch, updated_at };
  await writeJson(CONSULT_FILE, rows);
}

/* ───────── settings ───────── */

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  if (!isLocalMode) {
    const rows = await rest<{ value: T }[]>(`${SETTINGS}?select=value&key=eq.${encodeURIComponent(key)}&limit=1`);
    return rows[0]?.value ?? fallback;
  }
  const all = await readJson<Record<string, unknown>>(SETTINGS_FILE, {});
  return (all[key] as T) ?? fallback;
}

export async function setSetting(key: string, value: unknown): Promise<void> {
  if (!isLocalMode) {
    await rest(`${SETTINGS}?on_conflict=key`, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
    });
    return;
  }
  const all = await readJson<Record<string, unknown>>(SETTINGS_FILE, {});
  all[key] = value;
  await writeJson(SETTINGS_FILE, all);
}

/* ───────── media (변호사 사진) ───────── */

function safeObjectPath(p: string): string {
  if (!/^[a-z0-9/_.-]+$/i.test(p) || p.includes("..")) throw new Error("invalid path");
  return p;
}

/** 업로드 후 공개 URL(로컬 모드는 내부 표기) 반환 */
export async function uploadMedia(objectPath: string, bytes: Uint8Array, contentType: string): Promise<string> {
  const p = safeObjectPath(objectPath);
  if (!isLocalMode) {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${MEDIA_BUCKET}/${p}`, {
      method: "POST",
      headers: sbHeaders({ "Content-Type": contentType, "x-upsert": "true", "Cache-Control": "max-age=31536000" }),
      body: bytes as unknown as BodyInit,
    });
    if (!res.ok) throw new Error(`Storage ${res.status}: ${await res.text()}`);
    return `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/${p}`;
  }
  const file = path.join(MEDIA_DIR, p);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, bytes);
  return `local:${p}`;
}

export async function deleteMedia(objectPath: string): Promise<void> {
  const p = safeObjectPath(objectPath);
  if (!isLocalMode) {
    await fetch(`${SUPABASE_URL}/storage/v1/object/${MEDIA_BUCKET}`, {
      method: "DELETE",
      headers: sbHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ prefixes: [p] }),
    }).catch(() => undefined);
    return;
  }
  await fs.rm(path.join(MEDIA_DIR, p), { force: true });
}

/** 저장된 사진 바이트 읽기 (/media/lawyer/[id] 프록시용) */
export async function readMedia(url: string): Promise<{ body: ArrayBuffer; contentType: string } | null> {
  if (url.startsWith("local:")) {
    const p = safeObjectPath(url.slice(6));
    try {
      const buf = await fs.readFile(path.join(MEDIA_DIR, p));
      return { body: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer, contentType: contentTypeOf(p) };
    } catch {
      return null;
    }
  }
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  return { body: await res.arrayBuffer(), contentType: res.headers.get("content-type") || contentTypeOf(url) };
}

function contentTypeOf(p: string): string {
  if (/\.png$/i.test(p)) return "image/png";
  if (/\.webp$/i.test(p)) return "image/webp";
  return "image/jpeg";
}
