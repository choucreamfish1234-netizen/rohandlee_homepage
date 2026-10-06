# Roh&Lee China Desk — 사이트 설계서 v3

> 명칭 변경(v3): 「韩国法律帮助中心 / 한국법률도움센터 / Korea Law Help」 → **Roh&Lee China Desk**. 국가명+「센터·帮助中心」 조합이 공공기관·국가 법률구조기관(중국의 法律援助中心)으로 오인될 소지가 있어, 운영 사무소명을 앞세운 명칭으로 바꿨다.

운영: Law Firm Roh&Lee (법률사무소 로앤이) · 작성 2026-10-06

> 판단 기준 하나: **"한국에서 갑자기 법률문제를 겪은 중국인이, 이 사이트를 믿고 상담을 신청하는가?"**
> KPI는 PV가 아니라 `consultation_submit`(상담폼 접수) + `wechat_click` + `phone_click`.

---

## 1. 사이트 IA

```
/                       → 307 → /cn  (기본 언어 중국어)
/cn                     메인 (전환형 랜딩)
│  ├ #cases             사건 카드 (해시 필터: #for-victim / #for-accused)
│  ├ #process           상담 절차
│  ├ #about             사무소·변호사
│  ├ #faq               FAQ
│  └ #consult           인라인 상담폼
│
├ /cn/criminal-investigation   在韩国被警察要求接受调查      [피의자]
├ /cn/sex-crime-defense        在韩国被控性犯罪              [피의자]
├ /cn/sex-crime-victim         在韩国遭遇性犯罪              [피해자]
├ /cn/detention                家人被拘留了                  [피의자·가족]
├ /cn/fraud                    在韩国被诈骗                  [피해자]
├ /cn/assault                  在韩国发生暴力事件            [공통]
├ /cn/dui                      在韩国酒驾被查                [피의자]
├ /cn/rental-deposit           韩国租房押金纠纷              [피해자]
├ /cn/criminal-procedure       外国人在韩国刑事案件流程       [안내형]
├ /cn/legal-fees               韩国律师费用咨询              [안내형]
│
├ /cn/consult                  상담폼 단독 페이지 (?case=<slug> 로 사건유형 자동선택)
├ /cn/consult/received         접수 완료 (noindex, ?urgent=1 이면 긴급 안내 노출)
├ /cn/privacy                  隐私政策
├ /sitemap.xml · /robots.txt
└ /api/consult                 POST 수신 → 웹훅
```

한국어판: `/ko` 이하 같은 구조(브랜드명 동일: Roh&Lee China Desk). 상단 언어 전환(中文 | 한국어)은 같은 페이지의 다른 언어판으로 이동하고, 각 페이지에 hreflang 이 들어간다.
확장: `/en`, `/vi` … 언어 추가 = `src/content/<locale>/` 폴더 하나 + `locales.ts` 한 줄.

## 2. 메인페이지 UX

| 순서 | 섹션 | 역할 | 전환 장치 |
|---|---|---|---|
| 0 | 유틸리티 바 + 헤더 | 운영주체·전화·언어 / 전체 메뉴 | 위챗·상담 버튼 상시 노출, 모바일 햄버거 메뉴 |
| 1 | **Hero** (navy + 서울 스카이라인 선화) | 좌: 헤드라인 / 우: **빠른 상담 패널** | 패널 상단 2갈래 선택 → 해시 필터 + 카드로 스크롤, 하단 위챗·전화·온라인 |
| 1.5 | 신뢰 바 | 히어로에 걸친 4개 신뢰 요소 | — |
| 2 | 사건 카드 8 + 안내 2 | "내 상황" 즉시 찾기 | 필터 탭, 카드 → 상세 |
| 3 | 语言不同，法律程序也不同 | 왜 한국 변호사인가 | "변호사 본인이 직접 수행" 신뢰 박스 |
| 4 | 咨询流程 01–04 | 불안 해소 (다음에 뭐가 일어나는지) | — |
| 5 | 关于我们 | 운영주체 공개, 변호사 카드 | — |
| 6 | FAQ | 마지막 망설임 제거 | FAQ 구조화데이터 |
| 7 | 마무리 카피 + **인라인 폼** | 클릭 1회 절약 | 위챗·전화 대체 경로 병치 |
| 고정 | 모바일 하단 바 | 어디서든 1탭 | 左 微信咨询 / 右 中文法律咨询 |

첫 화면(390×844) 안에 **헤드라인 + 두 갈래 버튼이 모두 들어오도록** 높이를 맞췄다. 사건 목록·장문 설명은 첫 화면에서 의도적으로 뺐다.

광고 랜딩 팁: 피의자 대상 광고는 `/cn#for-accused`, 피해자 대상은 `/cn#for-victim` 으로 보내면 카드가 미리 필터링된다. 사건 키워드 광고는 상세 URL로 직행.

## 3. 중국어 카피

전부 `src/content/zh/site.ts`(공통) · `src/content/zh/cases.ts`(사건 10종)에 실제 문구로 들어 있다. 원칙:
- 결과 단정 금지 → "可能 / 根据案件情况 / 需要具体判断"
- 금지 표현: 保证胜诉·保证无罪·保证不拘留·最好·第一·专门/专业(전문 표시)·免费
- 각 상세 페이지 7단: 现在的情况 → 最先要做的事 → 不要这样做 → 韩国的程序 → 律师可以帮您做什么 → FAQ → CTA
- "不要这样做"에 **브로커(중개인) 경고, 피해자 직접 연락 금지, 증거 삭제 금지**를 반복 배치 — 중국인 고객이 실제로 많이 하는 실수이자 신뢰 신호

## 4. 데스크톱 / 모바일 레이아웃

v2 방향: 슬라이드처럼 한 화면 한 메시지로 끊기는 구성을 버리고, 일반 로펌 홈페이지 문법(유틸리티 바·전체 메뉴·빠른 상담 패널·사건 메뉴 사이드바·다단 푸터)으로 재구성.

- **모바일(기준)**: 1단, 좌우 16px, 햄버거 메뉴, 하단 고정 CTA, 위챗 모달은 바텀시트. 상세페이지 상단에 사건 유형 가로 스크롤 메뉴.
- **데스크톱(≥1024)**: Hero 2단(좌 헤드라인·CTA / 우 빠른 상담 패널), 사건 카드 4열 + 안내 2열, 상세페이지는 **좌측 사건 메뉴 사이드바 + 상담 박스** / 우 본문, 연락처 섹션은 좌 연락 채널(위챗 QR 노출) / 우 폼.

## 5. 디자인 시스템

| 토큰 | 값 | 용도 |
|---|---|---|
| navy.deep | `#0C1830` | Hero·푸터 배경 |
| navy | `#13233F` | 주 버튼, 제목 |
| navy.soft | `#1E3358` | hover |
| ivory | `#F7F3EC` | 페이지 배경 |
| ivory.warm | `#EFE8DC` | 폼 섹션 배경 |
| gold | `#A8875A` | 포인트(번호·화살표·주 CTA on navy) — 면적 5% 이하 |
| gold.light / pale | `#C9AE84` / `#EADFC9` | 다크 배경 위 강조 / 태그 |
| charcoal | `#24272D` / mute `#5B6170` | 본문 / 보조 |
| 경고(하지 말 것) | `#B4533A` on `#FBF4F0` | 빨강 대신 낮은 채도의 테라코타 |

| mist / mist.deep | `#F3F5F8` / `#E9EDF3` | 섹션 교차 배경 (v2) |
| line | `#E2E6ED` | 구분선·카드 테두리 (v2) |

- 타이포(v2): 제목·본문 모두 고딕 굵기 대비로 위계를 만든다. 중국어 `PingFang SC / Microsoft YaHei`, 한국어 `Apple SD Gothic Neo / Malgun Gothic`(html lang 으로 자동 전환). 명조는 브랜드 마크 "韩"에만. **웹폰트를 쓰지 않아 중국 본토에서도 즉시 표시**.
- 형태: 라운드 12px, 1px 라인 위주, 그림자는 떠 있는 요소(빠른 상담 패널·신뢰 바)에만. 금색은 아이콘·포인트에만.
- 브랜드 마크: 네이비 사각 안 금선 테두리 + 명조 "韩".

## 6. 컴포넌트 구조

```
src/
├ config/site.ts            운영정보(전화·이메일·주소·위챗ID·QR·GA ID) — 언어 무관 고정값
├ content/
│  ├ types.ts               콘텐츠 스키마 (Dictionary, CaseDetail)
│  ├ locales.ts             언어 등록부 (cn → zh)
│  ├ zh/ site.ts · cases.ts · index.ts   중국어
│  └ ko/ site.ts · cases.ts · index.ts   한국어
├ lib/analytics.ts          track() — 이벤트 이름 단일 관리
├ components/
│  ├ contact.tsx            ★ 전환 진입점: ContactProvider(위챗 모달) · WechatButton · PhoneLink · ConsultLink
│  ├ Header(유틸리티 바·메뉴) · LangSwitch(client) · Brand · Footer · StickyCta
│  ├ Hero · Skyline · QuickPanel(client) · TrustBar · CaseExplorer(client) · CaseCard/GuideCard
│  ├ HomeSections(Why·Process·About·Faq) · LawyerCard · FaqList · ContactSection · SubHero · SectionTitle
│  ├ ConsultForm(client)    상담폼 (허니팟, 서버 접수 성공 후에만 submit 이벤트)
│  ├ CaseDetailView         상세 7단 템플릿
│  └ JsonLd · Analytics · Icon · Section
└ app/
   ├ [locale]/layout.tsx · page.tsx · [slug]/page.tsx · consult/… · privacy/
   ├ api/consult/route.ts
   └ sitemap.ts · robots.ts
```

새 사건 페이지 추가 = `cases.ts` 배열에 객체 1개. 라우트·사이트맵·카드·폼 선택지가 자동 반영된다.

## 7. SEO 구조

- URL: `/cn/<영문 슬러그>` (위 IA). 슬러그는 언어 공통 → hreflang 확장 용이.
- 페이지별 `title / description / keywords / canonical / OG` 는 `cases.ts`의 `seo` 필드에서 생성.
- 키워드 배치(제목·H1·설명에 자연 삽입):

| 페이지 | 주 키워드 |
|---|---|
| /cn | 韩国律师, 韩国法律咨询, 在韩中国人律师, 韩国刑事律师 |
| criminal-investigation | 中国人在韩国被警察调查, 韩国警察调查, 在韩国被告怎么办 |
| sex-crime-defense / victim | 韩国性犯罪律师 |
| detention | 中国人在韩国被抓, 韩国拘留所律师 |
| fraud | 韩国诈骗律师 |
| dui | 韩国酒驾律师 |
| criminal-procedure | 韩国刑事案件 |

- 구조화 데이터: `LegalService`(운영주체·상위조직 Roh&Lee) + 페이지별 `FAQPage` + `BreadcrumbList`. **자체 평점(aggregateRating) 마크업은 넣지 않음**.
- 내부링크: 모든 상세 → 관련 사건 3개 + 홈, 홈 → 모든 상세. 고아 페이지 0.
- "韩国华人律师"는 소속 변호사가 화교라는 오해를 줄 수 있어 본문 표기 대신 메타 키워드로만 사용. 화교·중국어 가능 인력 여부가 확정되면 본문 반영 검토.
- 다음 단계: 바이두 대응(바이두 站长平台 등록, 중국 내 접속 속도 확인), 샤오홍슈 노트 → 상세 URL 직링크.

## 8. 상담 전환 UX

**이벤트 정의** (`src/lib/analytics.ts`, GA4 `gtag` + GTM `dataLayer` 동시 송신)

| 이벤트 | 시점 | 용도 |
|---|---|---|
| `wechat_click` | 위챗 버튼 → 모달 열림 | 마이크로 전환 |
| `phone_click` | 전화 링크 탭 | 마이크로 전환 |
| `consultation_click` | 상담폼으로 가는 버튼 | 퍼널 진입 |
| `consultation_submit` | **서버가 접수 OK 응답한 뒤** | ★ 광고 최적화 전환 |
| `wechat_id_copy` / `path_select` | 보조 | 퍼널 분석 |

모든 이벤트에 `cta_location`(header / hero / sticky / case_hero / case_bottom / final_cta …) 파라미터 → 어느 버튼이 전환을 만드는지 비교 가능. 보조로 `/cn/consult/received` 페이지 도달을 URL 기반 전환으로 써도 된다.

**폼 설계**: 필수는 이름 · **답변 채널(위챗 ID 또는 카카오톡 ID 중 하나)** · 사건유형 · 신분 · 동의. 두 ID를 다 적으면 어느 쪽으로 답변받을지 고르게 하고, 전화번호는 선택. 접수 완료 화면에서 우리 위챗·카카오톡 채널 추가를 권해 답변 누락을 막는다. 나머지(국가·단계·설명)는 선택 → 이탈 최소화. 칩 버튼으로 탭 한 번 입력. 사건 상세에서 들어오면 사건유형 자동 선택. 긴급 체크 시 접수 알림에 🚨 표시 + 완료화면에 위챗·전화 즉시 연결 블록.

**접수 알림**: `CONSULT_WEBHOOK_URL`(Slack/Make/Zapier/Supabase Edge Function)로 한국어 요약 전송. RO-ZIC 연동 시 이 라우트만 교체.

## 9. 관리자 페이지 (/admin)

- **로그인**: 비밀번호 1개(`ADMIN_PASSWORD`) → 12시간 유효한 서명 쿠키(`ADMIN_SESSION_SECRET`). `/admin` 이하는 미들웨어가 막고, 검색엔진 색인 금지.
- **목록**: 요약(신규·긴급 미처리·상담 예정·수임), 상태 탭, 긴급만 보기, 이름·연락처·내용·메모 검색. **긴급이면서 미처리인 건은 항상 맨 위**.
- **상세**: 연락처 복사·전화 걸기, 신청자 원문(중국어 그대로), 사건 정보, 처리 상태(신규 → 연락함 → 상담 예정 → 수임/종결, 스팸) + 내부 메모.
- **저장소**: Supabase 테이블 `klh_consultations` (`supabase/consultations.sql`). RLS 를 켜고 정책을 두지 않아 브라우저에서는 접근 불가, 서버만 service_role 키로 읽고 쓴다. 환경변수가 없으면 로컬 파일(`.data/`)에 저장 — 개발용.
- **변호사 사진** (`/admin/settings`): JPG·PNG·WEBP 5MB 이하 업로드/내리기. 사이트는 고정 주소 `/media/lawyer/<id>` 로 사진을 받아 페이지 재배포 없이 1분 안에 반영되고, 사진이 없으면 이름 첫 글자 이미지가 나온다. 사진 파일은 Supabase Storage 공개 버킷 `klh-media`, 사이트 도메인을 거쳐 내려주므로 중국 본토에서도 외부 스토리지 도메인에 직접 접속하지 않는다.
- **알림**: `CONSULT_WEBHOOK_URL` 을 설정하면 접수와 동시에 Slack 등으로 요약 알림(실패해도 접수는 저장됨).
- 다음 단계 후보: 변호사별 계정(Supabase Auth), 중국어 원문 자동 번역 표시, RO-ZIC 의뢰인 DB로 "수임" 건 이관.

## 10. 운영 전 체크리스트

- [ ] `site.ts`: 위챗 ID, 도로명 주소, 사업자등록번호 입력
- [ ] `public/images/wechat-qr.svg` → 실제 QR로 교체
- [ ] 변호사 사진 `public/images/lawyers/*.jpg` 추가 후 `zh/site.ts` 변호사 항목에 `photo` 경로 지정
- [ ] 노채은 변호사 약력(bio) 입력
- [x] 중국어 응대 방식: 사무소 상주 중국어 통역사 — 예약 시 통역사 동석 상담 (신뢰 바·FAQ·상담 절차·폼 안내에 반영)
- [ ] 상담료 정책 확정 후 FAQ "咨询需要费用吗" 문구 확정
- [ ] 도메인 확정 → `NEXT_PUBLIC_SITE_URL`
- [ ] Supabase 에 `supabase/consultations.sql` 실행 → `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` 입력
- [ ] `ADMIN_PASSWORD`(충분히 긴 비밀번호), `ADMIN_SESSION_SECRET`(openssl rand -hex 32) 입력
- [ ] 변호사 광고 규정 검토(광고책임변호사 표시 반영됨)
- [ ] 중국 본토 접속: GA4·Google 차단 → 百度统计(Baidu Tongji) 병행 검토, Vercel 접속 속도 실측
