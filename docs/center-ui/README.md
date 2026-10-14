# 5개 센터 UI·구조 감사 및 검증

기준: `b3f99afaa3e5c064cef103f54a555d9e33d750d2` (2026-10-15 KST). 브랜치: `fix/five-center-consistency-20261015`. 운영 배포 없음.

## 1. 실제 감사 결과

| 센터 | 실제 응답 파일 | 공통 UI / 하위 분야 | 구버전 화면 여부 |
|---|---|---|---|
| /defense | `public/renewal/pages/defense/index.html` | 동일 헤더·푸터·상담 CTA·8개 CSS / 11개 | 발견되지 않음 |
| /civil | `public/renewal/pages/civil/index.html` | 동일 헤더·푸터·상담 CTA·8개 CSS / 10개 | 발견되지 않음 |
| /collection | `public/renewal/pages/collection/index.html` | 동일 헤더·푸터·상담 CTA·8개 CSS / 8개 | 발견되지 않음 |
| /crypto | `public/renewal/pages/crypto/index.html` | 동일 헤더·푸터·상담 CTA·8개 CSS / 7개 | 발견되지 않음 |
| /voice-phishing | `public/renewal/pages/voice-phishing/index.html` | 동일 헤더·푸터·상담 CTA·8개 CSS / 5개 | 발견되지 않음 |

- `next.config.mjs`의 `beforeFiles` rewrite와 `src/data/renewal-routes.json`에 따라 위 정적 문서를 제공합니다. 운영 URL 5개 모두 HTTP 200이며 내려받은 원본 HTML이 기준 커밋과 바이트 단위로 같았습니다.
- `src/app/collection/page.tsx`, `src/app/crypto/page.tsx` 및 `src/components/practice/PracticeHub.tsx`는 이전 구현으로 남아 있으나 정상 운영 설정에서는 위 rewrite가 우선합니다. 이 파일들을 불필요하게 교체하지 않았습니다.
- 5개 페이지의 헤더·푸터 원본 해시가 각각 동일했습니다. 폰트·색상·여백·버튼·카드는 `style.css`, `cinematic.css`, `practice.css`, `center-motion.css`, `partners.css`, `case-content.css`, `center-images.css`, `garden.css`를 같은 순서로 적용합니다.
- 실제 보완 대상: 현재 센터의 `aria-current` 부재, 높은 우선순위의 기존 CSS에 의해 밝은 히어로에서 흰색으로 표시되는 로고, 모바일 전체 메뉴 높이 제한 및 Escape/링크 선택 후 닫기 부재. 모바일 업무 메뉴 안쪽에 기존 어두운 배경이 남아 있어 바깥 아이보리 메뉴와도 달랐습니다.

## 2. 변경 전후

| 항목 | 변경 전 | 변경 후 |
|---|---|---|
| 로고 | 밝은 사진 위 흰색 필터가 우선 | 5개 허브에 한해 어두운 로고 필터 적용 |
| 현재 센터 | 표시 없음 | 해당 센터 링크 밑줄·굵기 및 aria-current=page |
| 헤더/푸터 원본 | 동일한 코드가 5개 파일에 개별 복제 | 공유 partial에서 생성, 동기화 검사 제공 |
| 법률상식 링크 | JS 실행 후 헤더에 삽입, 푸터 문구 변경 | 원본 HTML에도 법률상식 링크·문구 제공 |
| 모바일 업무 메뉴 | 안쪽 어두운 배경, 중첩 스크롤 | 아이보리 배경 통일, 전체 메뉴에서 스크롤 |
| 메뉴 닫기 | 토글 버튼 위주 | Escape·링크 선택·바깥 클릭·브레이크포인트 변경 시 닫기 |
| 센터 본문·사진·사례 | 센터별 고유 콘텐츠 | 본문 HTML 해시 동일, 변경 없음 |

## 3. SEO 및 콘텐츠 보존

| 경로 | 기존 Title / 유지 | H1 / 유지 | Canonical / 유지 |
|---|---|---|
| /defense | 형사사건 &#124; 법률사무소 로앤이 | 형사사건 | https://lawfirmrohandlee.com/defense |
| /civil | 민사·가사 &#124; 법률사무소 로앤이 | 민사·가사 | https://lawfirmrohandlee.com/civil |
| /collection | 채권추심 &#124; 법률사무소 로앤이 | 채권추심 | https://lawfirmrohandlee.com/collection |
| /crypto | 가상자산·코인 &#124; 법률사무소 로앤이 | 가상자산·코인 | https://lawfirmrohandlee.com/crypto |
| /voice-phishing | 보이스피싱 &#124; 법률사무소 로앤이 | 보이스피싱 | https://lawfirmrohandlee.com/voice-phishing |

기존 Meta Description, Open Graph, robots meta, LegalService/WebPage JSON-LD는 `baseline.json`에 원문 기록했으며 변경하지 않았습니다. 각 H1은 1개입니다. 모든 본문, 성공사례 링크, 이미지 src/alt/크기, 하위 분야 URL을 보존했습니다. 새 실적이나 경력을 추가하지 않았습니다.

`next.config.mjs`, 라우트 매핑, sitemap, robots, 피해자 전문센터, 기존 공유 CSS/JS는 변경하지 않았습니다. 새 리디렉션도 없습니다. SEO 변경은 헤더의 기존 법률상식 링크를 JS 없이도 읽을 수 있게 한 것과 활성 페이지 표시뿐입니다.

## 4. 변경 파일

- `public/renewal/pages/{defense,civil,collection,crypto,voice-phishing}/index.html`: 5개 허브의 헤더/푸터·범위 클래스·전용 자산 연결만 수정.
- `scripts/renewal/partials/center-header.html`, `center-footer.html`: 기존 디자인 기반 공유 원본.
- `scripts/renewal/sync-center-shell.mjs`: 5개 허브만 동기화. `--check`로 불일치 확인.
- `public/renewal/center-shell.css`, `center-shell.js`: 5개 허브에서만 로고·메뉴·활성 상태·접근성 보완.
- `scripts/renewal/check-center-preservation.mjs`: SEO·본문·이미지·기존 링크 보존 검사.
- `docs/center-ui/`: 감사 기준 및 검증 결과.
- `public/design-review/five-centers/`: noindex 비교 페이지와 기준 HTML JSON. 운영 미배포 검토용.

## 5. 검증

- `npm run build`: 통과 (기존 Next.js img 최적화 경고 존재, 빌드 오류 없음). 로컬에는 운영 DB 환경변수가 없어 정적 생성 페이지 수는 운영 빌드와 다릅니다.
- `node scripts/renewal/sync-center-shell.mjs --check`: 통과.
- `node scripts/renewal/check-center-preservation.mjs`: 5개 모두 통과.
- `node --check public/renewal/center-shell.js`, `git diff --check`: 통과.
- 기존 하위 분야 41개 모두 실제 URL HTTP 200. `link-check.json` 참조.

### 실제 브라우저 결과

Chrome의 같은 출처 iframe으로 지정한 CSS viewport 폭을 검사했습니다. 세로 높이는 900px이며 스크롤바 15px을 제외한 콘텐츠 폭은 각각 360/375/753/1425px입니다.

| 센터 | 375px | 390px | 768px | 1440px |
|---|---|---|---|---|
| 형사사건 | 통과 | 통과 | 통과 | 통과 |
| 민사·가사 | 통과 | 통과 | 통과 | 통과 |
| 채권추심 | 통과 | 통과 | 통과 | 통과 |
| 가상자산·코인 | 통과 | 통과 | 통과 | 통과 |
| 보이스피싱 | 통과 | 통과 | 통과 | 통과 |

- 20개 조합에서 문서 가로 넘침 없음, 하위 분야 제목·본문 잘림 없음, 헤더·푸터·H1 각각 1개, 올바른 활성 센터 링크 1개.
- 15개 모바일·태블릿 조합에서 메뉴 및 업무 분야 열기, 전체 메뉴 높이 제한, Escape 닫기 통과.
- 센터 5개 모두 메뉴 링크로 실제 이동하고 도착 경로·닫힌 메뉴 상태 확인.
- 5개 센터 × 모바일/데스크톱에서 상담 팝업 열기·닫기 통과. 예약 URL `https://www.latpeed.com/products/vy4Pu`, 기타 문의 `https://pf.kakao.com/_YxgWxcn/chat` 유지. 개인정보나 문의를 실제 제출하지 않았습니다.
- 5개 히어로 이미지 모두 naturalWidth 1536px로 로드 확인. src/alt/width/height는 보존 검사 통과.
- 모바일 하위 분야 앵커 이동 후 제목 transform이 원위치이며, 화면 안 카드 opacity가 1임을 확인했습니다.
- 기준 원본도 390/1440px에서 5개 모두 비교했습니다. Noto Sans KR, 히어로 본문 12/14px 등 기존 공통 체계가 같았습니다. 활성 표시 0개·흰색 로고 필터가 공통 문제임을 재확인했습니다.
- reduced-motion: 기존 CSS/JS 미디어쿼리와 추가한 허브 범위의 애니메이션 해제 규칙을 코드 검사했습니다. OS 설정을 바꾼 실기기 검증은 하지 않았습니다.

### 남은 제한 및 후속 작업

- 실제 iPhone Safari의 터치 관성·동적 주소창·VoiceOver 및 OS reduced-motion은 실기기 확인 권장. 이번 검증은 Chrome의 viewport 기반입니다.
- 모바일 히어로 설명 12px은 기존 5개 센터에서 동일합니다. 이번 작업은 불일치 수정에 한정했고, 가독성 크기 조정은 별도 디자인 검토 대상으로 남겼습니다.
- 하위 분야 41개 URL은 정상 응답과 링크 보존을 확인했으나, 41개 상세 페이지 전체의 디자인을 재설계하거나 전수 시각 검수하지 않았습니다.
- 보존된 구버전 React 원본은 롤백 용도로 유지했습니다. 향후 미사용 코드 정리는 별도 작업입니다.
- 비교 페이지는 noindex 검토 도구입니다. 새 라이브러리·리디렉션·sitemap/robots 수정은 없습니다.
- **PR #125는 Draft이며 운영 배포·main 병합을 하지 않았습니다.**


## 6. 하위 분야 URL 목록

### /defense

- /defense/dui
- /defense/drugs
- /defense/sexual-offense
- /defense/traffic
- /defense/assault
- /defense/fraud
- /defense/defamation
- /defense/gambling
- /defense/medical
- /defense/corporate
- /defense/warrant

### /civil

- /civil/damages
- /civil/contract
- /civil/loan-deposit
- /civil/real-estate
- /civil/construction
- /civil/divorce
- /civil/parenting
- /civil/inheritance
- /civil/labor
- /business

### /collection

- /collection/b2b
- /collection/personal-loan
- /collection/fraud-recovery
- /collection/crypto-recovery
- /collection/wage
- /collection/alimony
- /collection/construction
- /collection/process

### /crypto

- /crypto/listing
- /crypto/ico-compliance
- /crypto/exchange-dispute
- /crypto/fraud-defense
- /crypto/seizure
- /crypto/tax
- /crypto/defi

### /voice-phishing

- /voice-phishing/cash-delivery
- /voice-phishing/account-access
- /voice-phishing/job-scam
- /voice-phishing/account-freeze
- /voice-phishing/investigation

