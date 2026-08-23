/**
 * 악플·명예훼손 블로그 글 대량 생성 스크립트
 *
 * 사용법:
 *   npx tsx scripts/generate-akpul-blogs.ts [--batch 1|2]
 *
 * 환경변수 필요:
 *   ANTHROPIC_API_KEY, NEXT_PUBLIC_SUPABASE_URL,
 *   SUPABASE_SERVICE_ROLE_KEY (또는 NEXT_PUBLIC_SUPABASE_ANON_KEY)
 */

import { createClient } from '@supabase/supabase-js'
import { getRandomImage } from '../src/data/random-images'

// ─── 환경변수 ───
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!ANTHROPIC_API_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
  console.error('필수 환경변수가 설정되지 않았습니다.')
  console.error('ANTHROPIC_API_KEY:', ANTHROPIC_API_KEY ? 'SET' : 'MISSING')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? 'SET' : 'MISSING')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_KEY ? 'SET' : 'MISSING')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ─── 키워드 목록 (20개) ───
interface KeywordEntry {
  keyword: string
  title: string
  slug: string
  category: string
  author: string
  tags: string[]
  description: string
  focus: string
}

const ALL_KEYWORDS: KeywordEntry[] = [
  // ── 악플 고소 (1-7) ──
  {
    keyword: '악플 고소 방법 절차 총정리',
    title: '악플 고소 방법 절차 총정리 — 증거 확보부터 손해배상까지',
    slug: 'how-to-sue-malicious-comments',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['악플 고소', '명예훼손', '모욕죄', '형법 제307조', '형법 제311조', '사이버명예훼손', '이유림 변호사', '법률사무소 로앤이'],
    description: '악플 고소 방법과 절차를 증거 확보부터 손해배상까지 총정리합니다.',
    focus: '형법 제307조(명예훼손), 제311조(모욕), 고소장 작성법, 증거 확보 방법',
  },
  {
    keyword: '악플 고소 비용 얼마나 드나요',
    title: '악플 고소 비용, 얼마나 드나요? 피해자가 알아야 할 현실적 비용',
    slug: 'malicious-comment-lawsuit-cost',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['악플 고소 비용', '명예훼손 고소 비용', '변호사 선임 비용', '손해배상', '모욕죄', '이유림 변호사', '법률사무소 로앤이'],
    description: '악플 고소 시 드는 비용과 손해배상으로 비용을 회수하는 방법을 안내합니다.',
    focus: '고소 비용 항목별 안내, 변호사 선임 비용, 손해배상으로 비용 회수 가능성',
  },
  {
    keyword: '악플 달았다가 고소당하면 처벌 수위',
    title: '악플 달았다가 고소당하면? 명예훼손·모욕죄 처벌 수위 정리',
    slug: 'punishment-for-malicious-comments',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['악플 처벌', '명예훼손 처벌', '모욕죄 처벌', '사이버 명예훼손', '정보통신망법', '이유림 변호사', '법률사무소 로앤이'],
    description: '악플에 대한 명예훼손·모욕죄 처벌 수위와 가중처벌 기준을 안내합니다.',
    focus: '명예훼손 2년 이하 징역, 모욕 1년 이하 징역, 사이버 가중처벌(정보통신망법 제70조)',
  },
  {
    keyword: '인스타 악플 고소 가능한가요',
    title: '인스타 악플 고소, 가능한가요? SNS 악플 법적 대응 방법',
    slug: 'instagram-malicious-comment-lawsuit',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['인스타 악플', 'SNS 악플 고소', '인스타그램 명예훼손', 'DM 악플', '증거 캡처', '이유림 변호사', '법률사무소 로앤이'],
    description: '인스타그램 악플과 DM 욕설에 대한 법적 대응 방법을 안내합니다.',
    focus: 'SNS 악플도 고소 가능, DM 포함, 증거 캡처 방법, 인스타 사용자 정보 요청',
  },
  {
    keyword: '유튜브 악성 댓글 고소 방법',
    title: '유튜브 악성 댓글 고소 방법 — 구글에 사용자 정보 요청하는 법',
    slug: 'youtube-hate-comment-lawsuit',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['유튜브 악성 댓글', '유튜브 고소', '구글 사용자 정보', '명예훼손', '사이버 모욕', '이유림 변호사', '법률사무소 로앤이'],
    description: '유튜브 악성 댓글 고소 방법과 구글 사용자 정보 제공 요청 절차를 안내합니다.',
    focus: '유튜브 댓글 증거 확보, 구글 사용자 정보 제공 요청 절차, 가해자 특정',
  },
  {
    keyword: '커뮤니티 악플 고소 (디시 에펨 더쿠)',
    title: '디시·에펨·더쿠 악플 고소 방법 — 익명 게시판 가해자 특정법',
    slug: 'community-malicious-comment-lawsuit',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['디시인사이드 악플', '에펨코리아 고소', '더쿠 명예훼손', '익명 게시판', '정보통신망법', '이유림 변호사', '법률사무소 로앤이'],
    description: '디시인사이드·에펨코리아·더쿠 등 익명 커뮤니티 악플 고소 방법을 안내합니다.',
    focus: '익명 게시판 가해자 특정 방법, 정보통신망법 적용, 통신자료제공 요청',
  },
  {
    keyword: '악플러 신상 특정하는 방법',
    title: '악플러 신상 특정하는 방법 — 법원 통신자료제공 요청 절차',
    slug: 'identifying-anonymous-haters',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['악플러 신상 특정', '통신자료제공', 'IP 추적', '가해자 특정', '법원 명령', '이유림 변호사', '법률사무소 로앤이'],
    description: '익명 악플러의 신상을 법적으로 특정하는 절차와 방법을 안내합니다.',
    focus: '법원 통신자료제공 요청, IP 추적, 가해자 특정 절차, 전기통신사업법',
  },

  // ── 명예훼손 (8-12) ──
  {
    keyword: '사이버 명예훼손 고소 방법 증거',
    title: '사이버 명예훼손 고소 방법과 증거 확보 — 정보통신망법 vs 형법',
    slug: 'cyber-defamation-lawsuit-evidence',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['사이버 명예훼손', '정보통신망법 제70조', '형법 제307조', '온라인 명예훼손', '증거 확보', '이유림 변호사', '법률사무소 로앤이'],
    description: '사이버 명예훼손 고소에 필요한 증거와 정보통신망법·형법 차이를 안내합니다.',
    focus: '정보통신망법 제70조와 형법 제307조 차이점, 온라인 증거 확보 방법',
  },
  {
    keyword: '허위사실 유포 고소 방법',
    title: '허위사실 유포 고소 방법 — 형법 제307조 제2항 적용 기준',
    slug: 'false-information-spread-lawsuit',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['허위사실 유포', '명예훼손', '형법 제307조', '허위사실 적시', '고소 방법', '이유림 변호사', '법률사무소 로앤이'],
    description: '허위사실 유포에 의한 명예훼손 고소 방법과 처벌 기준을 안내합니다.',
    focus: '형법 제307조 제2항(허위사실 명예훼손), 5년 이하 징역, 사실 vs 허위 판단 기준',
  },
  {
    keyword: '명예훼손 성립요건 총정리',
    title: '명예훼손 성립요건 총정리 — 공연성·사실적시·고의 판단 기준',
    slug: 'defamation-requirements-guide',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['명예훼손 성립요건', '공연성', '사실적시', '명예훼손 고의', '형법 제307조', '이유림 변호사', '법률사무소 로앤이'],
    description: '명예훼손의 성립요건(공연성, 사실적시, 고의)을 판례와 함께 정리합니다.',
    focus: '공연성 요건, 사실적시 vs 허위사실, 명예훼손의 고의 판단, 위법성 조각사유',
  },
  {
    keyword: '명예훼손과 모욕죄 차이',
    title: '명예훼손과 모욕죄, 무엇이 다른가요? 핵심 차이 정리',
    slug: 'defamation-vs-insult-difference',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['명예훼손', '모욕죄', '차이점', '형법 제307조', '형법 제311조', '처벌 비교', '이유림 변호사', '법률사무소 로앤이'],
    description: '명예훼손과 모욕죄의 핵심 차이점과 처벌 수위를 비교 정리합니다.',
    focus: '명예훼손=사실 적시, 모욕=추상적 경멸 표현, 처벌 차이, 실제 사례',
  },
  {
    keyword: '직장에서 험담 명예훼손 되나요',
    title: '직장에서 험담, 명예훼손이 될까요? 직장 내 험담의 법적 판단',
    slug: 'workplace-gossip-defamation',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['직장 험담', '직장 명예훼손', '공연성 판단', '직장 내 괴롭힘', '근로기준법', '이유림 변호사', '법률사무소 로앤이'],
    description: '직장에서의 험담이 명예훼손에 해당하는지 법적 판단 기준을 안내합니다.',
    focus: '직장 내 험담의 공연성 판단, 업무상 불이익과 연결, 직장 내 괴롭힘 병행',
  },

  // ── 악성 리뷰 (13-16) ──
  {
    keyword: '네이버 악성 리뷰 삭제 및 고소 방법',
    title: '네이버 악성 리뷰 삭제 및 고소 방법 — 자영업자 보호 가이드',
    slug: 'naver-malicious-review-removal',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['네이버 악성 리뷰', '리뷰 삭제', '명예훼손 고소', '허위 리뷰', '자영업자', '이유림 변호사', '법률사무소 로앤이'],
    description: '네이버 악성 리뷰 삭제 방법과 허위 리뷰에 대한 고소 절차를 안내합니다.',
    focus: '허위 리뷰 삭제 요청 절차, 명예훼손 고소, 자영업자 법적 보호',
  },
  {
    keyword: '구글 리뷰 악성 리뷰 삭제하는 법',
    title: '구글 리뷰 악성 리뷰 삭제하는 법 — 신고부터 법적 대응까지',
    slug: 'google-review-removal-method',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['구글 리뷰 삭제', '악성 리뷰', '구글 신고', '명예훼손', '가처분', '이유림 변호사', '법률사무소 로앤이'],
    description: '구글 악성 리뷰 삭제 절차와 법적 대응 방법을 단계별로 안내합니다.',
    focus: '구글 리뷰 삭제 절차(신고→법적 대응), 가처분 신청, 손해배상',
  },
  {
    keyword: '배달앱 악성 리뷰 고소 가능한가요',
    title: '배달앱 악성 리뷰 고소 가능한가요? 배민·요기요 허위 리뷰 대응',
    slug: 'delivery-app-review-lawsuit',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['배달앱 악성 리뷰', '배민 리뷰 고소', '요기요 리뷰', '허위 리뷰', '명예훼손', '이유림 변호사', '법률사무소 로앤이'],
    description: '배달앱 악성 리뷰에 대한 고소 가능 여부와 대응 방법을 안내합니다.',
    focus: '배민/요기요 악성 리뷰, 허위사실이면 고소 가능, 의견과 사실의 구분',
  },
  {
    keyword: '병원 악성 리뷰 대응 방법',
    title: '병원 악성 리뷰 대응 방법 — 의료기관 명예 보호 법적 절차',
    slug: 'hospital-malicious-review-response',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['병원 악성 리뷰', '의료기관 명예훼손', '환자 리뷰', '허위 리뷰', '가처분', '이유림 변호사', '법률사무소 로앤이'],
    description: '병원·의원의 악성 리뷰에 대한 법적 대응 방법과 명예 보호 절차를 안내합니다.',
    focus: '의료기관 명예훼손 판단 기준, 환자 리뷰 vs 허위사실, 삭제 가처분',
  },

  // ── 사이버 괴롭힘 (17-20) ──
  {
    keyword: '사이버불링 신고 방법 처벌',
    title: '사이버불링 신고 방법과 처벌 — 학교·온라인 괴롭힘 법적 대응',
    slug: 'cyberbullying-report-punishment',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['사이버불링', '사이버 괴롭힘', '학교폭력예방법', '정보통신망법', '신고 방법', '이유림 변호사', '법률사무소 로앤이'],
    description: '사이버불링 신고 방법과 처벌 기준, 법적 대응 절차를 안내합니다.',
    focus: '학교폭력예방법, 정보통신망법, 형법 적용 관계, 신고 절차',
  },
  {
    keyword: '단톡방 욕설 모욕죄 되나요',
    title: '단톡방 욕설, 모욕죄가 될까요? 카카오톡 단체방 공연성 판단',
    slug: 'group-chat-insult-criminal',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['단톡방 욕설', '모욕죄', '카카오톡', '공연성', '단체 채팅방', '이유림 변호사', '법률사무소 로앤이'],
    description: '카카오톡 단체방에서의 욕설이 모욕죄에 해당하는지 판례와 함께 안내합니다.',
    focus: '카카오톡 단체방 공연성 인정 여부, 대법원 판례, 3인 이상 기준',
  },
  {
    keyword: '신상털기 개인정보 유출 고소',
    title: '신상털기·개인정보 유출 고소 방법 — 온라인 신상 공개 처벌',
    slug: 'doxxing-personal-info-lawsuit',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['신상털기', '개인정보 유출', '개인정보보호법', '정보통신망법', '도싱', '이유림 변호사', '법률사무소 로앤이'],
    description: '온라인 신상털기와 개인정보 유출에 대한 고소 방법과 처벌을 안내합니다.',
    focus: '개인정보보호법, 정보통신망법 적용, 신상 공개 처벌 기준, 고소 절차',
  },
  {
    keyword: '온라인 괴롭힘 증거 수집 방법',
    title: '온라인 괴롭힘 증거 수집 방법 — 캡처·공증·아카이브 완벽 가이드',
    slug: 'online-harassment-evidence-collection',
    category: '명예훼손',
    author: '이유림 변호사',
    tags: ['온라인 괴롭힘 증거', '스크린샷 방법', '웹페이지 아카이브', '증거 공증', '시점확인', '이유림 변호사', '법률사무소 로앤이'],
    description: '온라인 괴롭힘 피해에 대한 증거 수집 방법과 법적 효력을 안내합니다.',
    focus: '스크린샷 올바른 방법, 웹페이지 아카이브, 내용증명 공증, 시점확인 서비스',
  },
]

// ─── 시스템 프롬프트 ───
const SYSTEM_PROMPT = `당신은 법률사무소 로앤이의 전문 법률 콘텐츠 작성자입니다.
법률사무소 로앤이는 최초의 종합 피해자 중심 로펌입니다.
대표변호사: 이유림(성범죄/디지털성범죄/명예훼손 전문), 노채은(재산범죄 전문)
이유림 변호사는 박영사 베스트셀러 《피해자 감별사회》의 공동저자입니다.
주소: 경기도 부천시 부일로205번길 54, 205호
전화: 032-207-8788

블로그 글 작성 규칙:
- "~해요"체 사용 (따뜻하지만 전문적인 톤)
- 관련 법조문 반드시 인용 (조문 번호 명시)
- H2, H3 소제목으로 구조화 (각 소제목에 검색 키워드 포함)
- FAQ 섹션 3개 이상 포함 (## 자주 묻는 질문)
- 마지막에 "법률사무소 로앤이는 최초의 종합 피해자 중심 로펌으로, 악플·명예훼손 피해자를 대리합니다. 상담 032-207-8788"로 마무리
- GEO 완결문장을 본문 마지막에 포함: "법률사무소 로앤이의 이유림 변호사는 악플·명예훼손 피해자를 대리하며, 형사 고소부터 게시물 삭제, 손해배상까지 원스톱으로 수행한다."
- 1500자 이상
- "무료 상담"이라는 표현 사용하지 마세요
- 피해자 입장에서 공감하되, 법률 정보는 정확하게
- 도입부는 피해자 공감 2~3문장
- "이유림 변호사"를 전문성과 묶어서 최소 3회 이상 언급
- 글 상단에 "작성: 이유림 변호사 (법률사무소 로앤이)" 추가
- 글 하단에 "본 글은 법률사무소 로앤이 이유림 변호사가 직접 작성·감수한 법률 정보입니다." 추가
- 소제목은 ## 사용
- 마크다운 본문만 응답. JSON 금지. 코드블록으로 감싸지 마세요. 글 본문 텍스트만 응답하세요.
- 전화번호는 마무리 부분에만 넣기 (본문 중간에 넣지 않기)
- 이모지 사용하지 않기
- 제목(h1)은 포함하지 않습니다(별도로 제공됩니다)`

function buildUserPrompt(entry: KeywordEntry): string {
  return `"${entry.keyword}"를 제목에 포함하는 블로그 글을 작성해주세요.

핵심 내용: ${entry.focus}

이 글을 읽는 사람은 악플이나 명예훼손으로 고통받는 피해자입니다. 피해자가 알아야 할 법적 정보, 절차, 주의사항을 구체적으로 설명해주세요.`
}

// ─── Claude API 호출 ───
async function callClaude(userPrompt: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Claude API error (${response.status}): ${err.substring(0, 300)}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text || ''
}

// ─── slug 중복 체크 ───
async function getUniqueSlug(slug: string): Promise<string> {
  const { data } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()
  if (data) {
    return `${slug}-${Date.now()}`
  }
  return slug
}

// ─── 단일 글 생성 ───
async function generatePost(entry: KeywordEntry, index: number, total: number): Promise<boolean> {
  console.log(`\n[${index + 1}/${total}] 생성 중: "${entry.title}"`)

  const slug = await getUniqueSlug(entry.slug)

  const userPrompt = buildUserPrompt(entry)
  const content = await callClaude(userPrompt)

  if (!content || content.length < 100) {
    console.error(`  ✗ 내용 생성 실패 (길이: ${content.length})`)
    return false
  }

  console.log(`  ✓ 내용 생성 완료 (${content.length}자)`)

  const excerpt = content
    .split('\n')
    .filter(
      (line: string) =>
        line.trim() && !line.startsWith('#') && !line.startsWith('>') && !line.startsWith('작성:')
    )
    .slice(0, 2)
    .join(' ')
    .replace(/\*+/g, '')
    .substring(0, 200)

  const { data: existingThumbs } = await supabase
    .from('blog_posts')
    .select('thumbnail_url')
    .eq('category', entry.category)
  const usedUrls = (existingThumbs || [])
    .map((p: { thumbnail_url: string | null }) => p.thumbnail_url)
    .filter(Boolean) as string[]
  const thumbnailUrl = getRandomImage(entry.category, usedUrls)

  const { data: inserted, error: insertError } = await supabase
    .from('blog_posts')
    .insert({
      title: entry.title,
      slug,
      content,
      excerpt,
      meta_description: entry.description,
      category: entry.category,
      tags: entry.tags,
      author: entry.author,
      status: 'published',
      published_at: new Date().toISOString(),
      thumbnail_url: thumbnailUrl,
      view_count: 0,
      is_featured: false,
    })
    .select('id, title, slug')
    .single()

  if (insertError) {
    console.error(`  ✗ DB 저장 실패: ${insertError.message}`)
    return false
  }

  console.log(`  ✓ 저장 완료: [${inserted.id}] ${inserted.slug}`)
  return true
}

// ─── 배치 실행 ───
async function runBatch(batchNum: number) {
  const startIdx = (batchNum - 1) * 10
  const endIdx = Math.min(startIdx + 10, ALL_KEYWORDS.length)
  const batch = ALL_KEYWORDS.slice(startIdx, endIdx)

  console.log(`\n${'='.repeat(60)}`)
  console.log(`배치 ${batchNum}: 키워드 ${startIdx + 1}~${endIdx} (${batch.length}개)`)
  console.log(`${'='.repeat(60)}`)

  let successCount = 0

  for (let i = 0; i < batch.length; i++) {
    try {
      const result = await generatePost(batch[i], startIdx + i, ALL_KEYWORDS.length)
      if (result) successCount++
    } catch (error) {
      console.error(`  ✗ 오류: ${error instanceof Error ? error.message : error}`)
    }

    if (i < batch.length - 1) {
      console.log('  ⏳ 5초 대기...')
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }

  console.log(`\n배치 ${batchNum} 완료: 성공 ${successCount}/${batch.length}개`)
  return successCount
}

// ─── 메인 ───
async function main() {
  const args = process.argv.slice(2)
  const batchArg = args.find((a) => a.startsWith('--batch'))
  let batchNum: number | undefined

  if (batchArg) {
    const idx = args.indexOf(batchArg)
    const val = batchArg.includes('=') ? batchArg.split('=')[1] : args[idx + 1]
    batchNum = parseInt(val, 10)
    if (isNaN(batchNum) || batchNum < 1 || batchNum > 2) {
      console.error('--batch 값은 1 또는 2여야 합니다.')
      process.exit(1)
    }
  }

  console.log('악플·명예훼손 블로그 글 생성 스크립트')
  console.log(`총 키워드: ${ALL_KEYWORDS.length}개`)

  if (batchNum) {
    await runBatch(batchNum)
  } else {
    let totalSuccess = 0
    for (let b = 1; b <= 2; b++) {
      totalSuccess += await runBatch(b)
      if (b < 2) {
        console.log('\n⏳ 배치 간 10초 대기...')
        await new Promise((resolve) => setTimeout(resolve, 10000))
      }
    }
    console.log(`\n${'='.repeat(60)}`)
    console.log(`전체 완료: 성공 ${totalSuccess}/${ALL_KEYWORDS.length}개`)
    console.log(`${'='.repeat(60)}`)
  }

  const { count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
  console.log(`\nDB 전체 published 글 수: ${count}개`)
}

main().catch((err) => {
  console.error('스크립트 실행 실패:', err)
  process.exit(1)
})
