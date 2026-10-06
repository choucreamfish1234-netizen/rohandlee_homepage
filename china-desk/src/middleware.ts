import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export const config = { matcher: ["/admin", "/admin/:path*"] };

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return withAdminHeaders(NextResponse.next());

  const ok = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return withAdminHeaders(NextResponse.redirect(url));
  }
  return withAdminHeaders(NextResponse.next());
}

function withAdminHeaders(res: NextResponse) {
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}
