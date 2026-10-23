import { createHmac, timingSafeEqual } from 'crypto'
import { NextResponse } from 'next/server'

// 관리자 세션 — 서버에서 서명한 httpOnly 쿠키로 확인한다.
// ADMIN_PASSWORD(서버 전용 환경변수)를 설정하면 그 값으로만 로그인할 수 있다.

export const ADMIN_COOKIE = 'admin_session'
const SESSION_HOURS = 12

function adminPassword() {
  // NEXT_PUBLIC_ 값과 기본값은 ADMIN_PASSWORD 설정 전까지의 임시 호환용이다.
  return process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'roandlee2026'
}

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!s) throw new Error('ADMIN_SESSION_SECRET is not configured')
  return s
}

function sign(value: string) {
  return createHmac('sha256', secret()).update(value).digest('hex')
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && timingSafeEqual(ab, bb)
}

export function checkAdminPassword(password: string) {
  return typeof password === 'string' && safeEqual(password, adminPassword())
}

export function createSessionCookie(res: NextResponse) {
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000
  const value = `${expires}.${sign(String(expires))}`
  res.cookies.set(ADMIN_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_HOURS * 60 * 60,
  })
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
}

function readCookie(req: Request, name: string) {
  const header = req.headers.get('cookie') || ''
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=')
    if (k === name) return decodeURIComponent(v.join('='))
  }
  return undefined
}

export function isAdminRequest(req: Request) {
  const value = readCookie(req, ADMIN_COOKIE)
  if (!value) return false
  const [expires, signature] = value.split('.')
  if (!expires || !signature || Number(expires) < Date.now()) return false
  try {
    return safeEqual(signature, sign(expires))
  } catch {
    return false
  }
}

/** 관리자 요청이 아니면 401 응답을, 맞으면 null을 돌려준다. */
export function requireAdmin(req: Request) {
  return isAdminRequest(req) ? null : NextResponse.json({ error: 'unauthorized' }, { status: 401 })
}
