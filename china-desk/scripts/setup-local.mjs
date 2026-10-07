/**
 * 로컬 실행 준비 — `npm run dev` 앞에서 자동 실행된다.
 * .env.local 이 없을 때만 개발용 기본값으로 만들어 준다. (운영 배포에는 쓰지 않는다)
 */
import { existsSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { join } from "node:path";

const file = join(process.cwd(), ".env.local");

if (process.env.VERCEL || process.env.CI || process.env.NODE_ENV === "production") {
  process.exit(0);
}

if (existsSync(file)) {
  process.exit(0);
}

const password = "admin1234";
const body = `# 로컬 개발용으로 자동 생성된 파일입니다. git 에 올라가지 않습니다.
# 운영(Vercel)에서는 이 값을 쓰지 말고 Vercel 환경변수에 직접 입력하세요.

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=
CONSULT_WEBHOOK_URL=

# 비우면 상담 신청이 .data/ 폴더에 저장됩니다 (로컬 확인용)
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# 관리자 로그인 (로컬 전용 비밀번호)
ADMIN_PASSWORD=${password}
ADMIN_SESSION_SECRET=${randomBytes(32).toString("hex")}
`;

writeFileSync(file, body, "utf8");

console.log(`
  .env.local 을 만들었습니다 (로컬 전용)
  관리자 주소   http://localhost:3000/admin
  관리자 비밀번호 ${password}
  상담 신청은 china-desk/.data/ 폴더에 저장됩니다.
`);
