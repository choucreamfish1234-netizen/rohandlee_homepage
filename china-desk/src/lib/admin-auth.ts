import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "./session";

/** server component·server action 에서 한 번 더 확인 (middleware 우회 방지) */
export async function requireAdmin(): Promise<void> {
  const jar = await cookies();
  if (!(await verifySessionToken(jar.get(SESSION_COOKIE)?.value))) redirect("/admin/login");
}
