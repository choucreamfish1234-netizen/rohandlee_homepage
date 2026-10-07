# Roh&Lee China Desk

법률사무소 로앤이(Law Firm Roh&Lee)가 운영하는 중국인·외국인 대상 법률상담 랜딩사이트.
목표는 페이지뷰가 아니라 **상담 신청 전환**이다. 설계 기준은 [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md).

- Next.js 15 (App Router) · TypeScript · Tailwind CSS 3.4 · 외부 UI 라이브러리 없음
- 웹폰트 없음(시스템 폰트) — 중국 본토에서 Google Fonts 차단 대응
- 저장소: Supabase REST(PostgREST·Storage)를 `fetch` 로 직접 호출. 환경변수가 없으면 `.data/` 로컬 파일(개발용)

## 로컬에서 보기

필요한 것은 **Node.js 20 이상** 하나뿐입니다. ([nodejs.org](https://nodejs.org) 에서 LTS 버전 설치)

```bash
git fetch origin
git checkout claude/kind-pascal-87i5uo
cd china-desk
npm install     # 처음 한 번만 (2~3분)
npm run dev
```

브라우저에서 **http://localhost:3000** 을 열면 됩니다. 중국어판으로 자동 이동합니다.

| 주소 | 화면 |
|---|---|
| http://localhost:3000 | 메인 (중국어) |
| http://localhost:3000/ko | 한국어판 |
| http://localhost:3000/cn/detention | 사건 상세 (예: 가족 구속) |
| http://localhost:3000/cn#for-accused | 피의자용 광고 랜딩 (카드가 걸러진 상태) |
| http://localhost:3000/cn/consult | 상담 신청 |
| http://localhost:3000/admin | 관리자 (비밀번호 `admin1234`) |

`npm run dev` 가 처음 실행될 때 `.env.local` 을 자동으로 만들어 줍니다. Supabase 없이도 바로 볼 수 있고, 로컬에서 넣은 상담 신청은 `china-desk/.data/consultations.json` 에 저장됩니다. 멈출 때는 터미널에서 `Ctrl+C`.

> 자동 생성되는 비밀번호 `admin1234` 는 **로컬 전용**입니다. 실제 배포에는 Vercel 환경변수에 긴 비밀번호를 따로 넣으세요.

### 휴대폰으로도 보려면

같은 와이파이에 연결한 뒤 `npm run dev` 가 출력하는 `Network:` 주소(예: `http://192.168.0.5:3000`)를 휴대폰 브라우저에 입력하면 됩니다.

## 그 밖의 명령

```bash
npm run build && npm start   # 운영 빌드로 확인 (http://localhost:3000)
npm run lint
npm run typecheck
```

## 환경변수

| 이름 | 설명 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 사이트 주소. canonical·hreflang·sitemap 기준 (예: `https://china.lawfirmrohandlee.com`) |
| `NEXT_PUBLIC_GA_ID` | GA4 측정 ID. 비우면 GA 스크립트를 싣지 않음 (dataLayer 는 항상 쌓임 → GTM 사용 가능) |
| `CONSULT_WEBHOOK_URL` | 상담 접수 알림 웹훅(Slack Incoming Webhook 등). `{ text, urgent, id, case_type }` 를 POST. 실패해도 접수는 저장됨 |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | 둘 다 있으면 Supabase 저장, 없으면 `.data/` 로컬 저장 |
| `ADMIN_PASSWORD` | 관리자 비밀번호 (충분히 길게). 로컬은 `npm run dev` 가 자동 생성 |
| `ADMIN_SESSION_SECRET` | 세션 서명 키, 32자 이상 (`openssl rand -hex 32`) |

> ⚠️ Vercel 에서는 로컬 파일이 유지되지 않으므로 **운영에는 반드시 Supabase 를 연결**한다. 관리자 상단에 "로컬 저장 모드" 배지가 보이면 Supabase 가 연결되지 않은 상태다.

## Supabase 설정 순서

1. Supabase 프로젝트 생성(RO-ZIC 과 같은 프로젝트를 써도 됨)
2. **SQL Editor** 에서 [`supabase/consultations.sql`](supabase/consultations.sql) 전체를 한 번 실행
   - `klh_consultations`(상담), `klh_settings`(설정) 테이블 생성, **RLS on + 정책 없음** → 브라우저(anon 키)로는 접근 불가, 서버만 service_role 키로 접근
   - Storage 공개 버킷 `klh-media`(변호사 사진) 생성
3. Project Settings → API 에서 `Project URL` → `SUPABASE_URL`, `service_role` 키 → `SUPABASE_SERVICE_ROLE_KEY`
4. Vercel 환경변수에 입력 후 재배포

## Vercel 배포

이 폴더는 본 홈페이지 저장소(`rohandlee_homepage`) 안의 독립 앱이다.

1. Vercel → Add New Project → 같은 저장소 선택
2. **Root Directory = `china-desk`**, Framework = Next.js
3. 환경변수 입력 → Deploy
4. 도메인(예: `china.lawfirmrohandlee.com`) 연결 후 `NEXT_PUBLIC_SITE_URL` 을 같은 값으로

본 홈페이지 프로젝트는 루트 `tsconfig.json` 에서 `china-desk` 를 제외해 두어 서로의 빌드에 영향을 주지 않는다.

## 구조

```
src/
├ config/site.ts        연락 수단(전화·이메일·카카오·위챗 QR·주소) — 여기서만 수정
├ content/              사이트 문구 전체 (types.ts 스키마, zh/, ko/, locales.ts)
├ lib/
│  ├ analytics.ts       전환 이벤트 track() — GA4 gtag + dataLayer 동시 송신
│  ├ store.ts           Supabase REST / .data 로컬 저장
│  ├ session.ts         Web Crypto HMAC 세션 (middleware·server action 공용)
│  ├ seo.ts             metadata·hreflang·JSON-LD
│  └ pathFilter.ts      #for-victim / #for-accused 해시 필터
├ components/
│  ├ contact.tsx        ★ 전환 진입점: 위챗 모달·WechatButton·PhoneLink·KakaoLink·ConsultLink
│  ├ layout/            유틸리티 바·헤더(<details> 모바일 메뉴)·푸터·모바일 하단 CTA·언어 전환
│  ├ home/              히어로(스카이라인 SVG·빠른 상담 패널)·신뢰 바·사건 카드·소개·FAQ·연락처
│  ├ case/              사건 상세 7단 템플릿
│  ├ consult/           상담폼 (허니팟, 접수 성공 후에만 consultation_submit)
│  └ admin/             관리자 화면 조각
├ app/
│  ├ [locale]/          /cn, /ko — 메인·[slug] 상세·consult·consult/received·privacy (전부 정적 생성)
│  ├ api/consult        상담 접수 POST
│  ├ admin/             로그인·목록·[id] 상세·settings(변호사 사진)
│  ├ media/lawyer/[id]  변호사 사진 고정 주소(프록시, 없으면 이니셜 SVG, max-age=60)
│  └ sitemap.ts · robots.ts
└ middleware.ts         /admin/* 보호
```

### 자주 하는 작업

- **연락처 변경**: `src/config/site.ts`
- **문구 수정**: `src/content/zh/*.ts`, `src/content/ko/*.ts`
- **사건 페이지 추가**: `types.ts` 의 `CaseSlug` 에 슬러그 추가 → 각 언어 `cases.ts` 배열에 객체 1개. 라우트·사이트맵·카드·폼 선택지가 자동 반영
- **언어 추가**(예: 영어): `src/content/en/` 폴더(`index.ts` 에서 `Dictionary` export) → `locales.ts` 에 `en` 한 줄
- **광고 랜딩**: 피의자 대상 `/cn#for-accused`, 피해자 대상 `/cn#for-victim` (카드가 필터된 상태로 열림), 사건 키워드는 상세 URL로

### 전환 이벤트

`wechat_click` · `phone_click` · `kakao_click` · `consultation_click` · `consultation_submit`(서버 접수 OK 후) · `wechat_id_copy` · `path_select`.
모든 이벤트에 `cta_location`, 모든 전환 버튼에 `data-cta` / `data-cta-location` 속성(GTM 트리거용).

## 관리자

- `/admin/login` — 비밀번호 1개. HMAC 서명 httpOnly 쿠키 12시간. 틀리면 600ms 지연. noindex·no-store
- `/admin` — 요약(신규·긴급 미처리·상담 예정·수임), 상태 탭, 긴급만 보기, 검색. 긴급이면서 신규·연락함인 건은 항상 맨 위. "전체" 탭은 스팸을 제외
- `/admin/<id>` — 답변 채널(위챗·카카오톡·전화, 복사·전화 걸기), 신청자 원문, 사건 정보, 상태·메모 저장
- `/admin/settings` — 변호사 사진(이유림 `lee`, 노채은 `roh`) 업로드/내리기. 사이트에 1분 안에 반영

## 운영 전 남은 일 (TODO)

- [ ] `site.ts` — 도로명 상세 주소, 사업자등록번호, (공개 시) 위챗 ID
- [ ] 노채은 변호사 약력(`bio`) 입력, 변호사 사진 업로드
- [ ] 상담료 정책 확정 후 FAQ "咨询需要费用吗" 문구 확정
- [ ] 중국 본토 접속 속도 실측, 百度统计 병행 검토
- [ ] 변호사 광고 규정 최종 검토
