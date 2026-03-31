/**
 * SEO 롱테일 키워드 블로그 글 대량 생성 스크립트
 *
 * 사용법:
 *   npx tsx scripts/generate-seo-blogs.ts [--batch 1|2|3]
 *
 * 환경변수 필요:
 *   ANTHROPIC_API_KEY, NEXT_PUBLIC_SUPABASE_URL,
 *   SUPABASE_SERVICE_ROLE_KEY (또는 NEXT_PUBLIC_SUPABASE_ANON_KEY)
 */

import { createClient } from '@supabase/supabase-js'

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

// ─── 키워드 목록 (30개) ───
interface KeywordEntry {
  keyword: string
  title: string
  slug: string
  category: string
  author: string
  tags: string[]
  description: string
}

const ALL_KEYWORDS: KeywordEntry[] = [
  // ── 성범죄 피해 (1-10) ──
  {
    keyword: '강제추행 합의금 얼마',
    title: '강제추행 합의금, 얼마가 적정할까? 피해자가 알아야 할 기준',
    slug: 'sexual-assault-settlement-amount',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['강제추행', '합의금', '성범죄', '성추행 합의', '피해자 권리', '형법 제298조', '이유림 변호사'],
    description: '강제추행 합의금 적정 금액과 피해자가 반드시 알아야 할 협상 기준을 전문 변호사가 안내합니다.',
  },
  {
    keyword: '카메라촬영죄 합의금',
    title: '카메라촬영죄 합의금, 얼마가 적정할까? 불법촬영 피해자 가이드',
    slug: 'camera-recording-crime-settlement',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['카메라촬영죄', '불법촬영', '합의금', '성폭력처벌법', '몰래카메라', '디지털성범죄', '이유림 변호사'],
    description: '카메라촬영죄(불법촬영) 합의금 기준과 피해자가 알아야 할 법적 절차를 안내합니다.',
  },
  {
    keyword: '준강간 증거 없을 때 고소 가능한지',
    title: '준강간 증거가 없을 때도 고소할 수 있을까? 피해자를 위한 법률 가이드',
    slug: 'quasi-rape-no-evidence-prosecution',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['준강간', '증거', '고소', '성폭력', '형법 제299조', '피해자 진술', '이유림 변호사'],
    description: '준강간 피해 증거가 부족할 때 고소 가능 여부와 증거 확보 방법을 안내합니다.',
  },
  {
    keyword: '성폭력 피해자 국선변호사 신청 방법',
    title: '성폭력 피해자 국선변호사 신청 방법, 비용 없이 법률 도움받는 법',
    slug: 'sexual-violence-victim-public-defender',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['성폭력', '국선변호사', '피해자 변호사', '성폭력처벌법', '무료 법률지원', '피해자 권리', '이유림 변호사'],
    description: '성폭력 피해자가 국선변호사를 무료로 신청하는 방법과 절차를 상세히 안내합니다.',
  },
  {
    keyword: '디지털 성범죄 신고 방법 절차',
    title: '디지털 성범죄 신고 방법과 절차, 피해자가 지금 해야 할 일',
    slug: 'digital-sex-crime-report-procedure',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['디지털성범죄', '신고방법', '불법촬영', '성폭력처벌법 제14조', '사이버범죄', '증거보전', '이유림 변호사'],
    description: '디지털 성범죄(불법촬영, 유포 등) 신고 방법과 피해자 보호 절차를 안내합니다.',
  },
  {
    keyword: '지인 성추행 고소 절차',
    title: '지인에게 성추행 당했을 때 고소 절차, 어떻게 시작하나요?',
    slug: 'acquaintance-sexual-harassment-prosecution',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['지인 성추행', '고소 절차', '강제추행', '성범죄 신고', '피해자 보호', '형법 제298조', '이유림 변호사'],
    description: '지인에 의한 성추행 피해 시 고소 절차와 주의사항을 전문 변호사가 안내합니다.',
  },
  {
    keyword: '성범죄 피해자 진술 요령',
    title: '성범죄 피해자 진술 요령, 경찰 조사에서 꼭 기억할 것들',
    slug: 'sexual-crime-victim-statement-tips',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['성범죄', '피해자 진술', '경찰 조사', '진술 요령', '피해자 보호', '수사 절차', '이유림 변호사'],
    description: '성범죄 피해자가 경찰 조사 시 알아야 할 진술 요령과 권리를 안내합니다.',
  },
  {
    keyword: '음란물 유포 협박 대처법',
    title: '음란물 유포 협박, 어떻게 대처해야 할까? 피해자 긴급 가이드',
    slug: 'revenge-porn-blackmail-response',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['음란물 유포', '협박', '디지털성범죄', '성폭력처벌법', '리벤지포르노', '사이버범죄', '이유림 변호사'],
    description: '음란물 유포 협박을 받았을 때 즉시 해야 할 대처법과 법적 절차를 안내합니다.',
  },
  {
    keyword: '데이트폭력 고소 방법',
    title: '데이트폭력 고소 방법, 연인의 폭력에서 벗어나는 법적 절차',
    slug: 'dating-violence-prosecution-guide',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['데이트폭력', '고소 방법', '가정폭력', '스토킹', '접근금지', '피해자 보호', '이유림 변호사'],
    description: '데이트폭력 피해 시 고소 방법과 접근금지 등 보호조치 절차를 안내합니다.',
  },
  {
    keyword: '불법촬영 발견 시 대처 방법',
    title: '불법촬영(몰래카메라) 발견 시 대처 방법, 지금 당장 해야 할 일',
    slug: 'hidden-camera-discovery-response',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['불법촬영', '몰래카메라', '대처법', '성폭력처벌법 제14조', '증거보전', '신고방법', '이유림 변호사'],
    description: '불법촬영(몰카)을 발견했을 때 즉시 해야 할 대처 방법과 신고 절차를 안내합니다.',
  },
  // ── 스토킹/접근금지 (11-15) ──
  {
    keyword: '스토킹 접근금지 신청 방법',
    title: '스토킹 접근금지 신청 방법, 절차와 비용 총정리',
    slug: 'stalking-restraining-order-procedure',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['스토킹', '접근금지', '스토킹처벌법', '긴급응급조치', '보호명령', '피해자 보호', '이유림 변호사'],
    description: '스토킹 피해자를 위한 접근금지 명령 신청 방법, 절차, 비용을 안내합니다.',
  },
  {
    keyword: '스토킹 처벌 수위 형량',
    title: '스토킹 처벌 수위와 형량, 가해자는 어떤 처벌을 받나요?',
    slug: 'stalking-punishment-sentencing',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['스토킹', '처벌', '형량', '스토킹처벌법', '스토킹범죄', '접근금지', '이유림 변호사'],
    description: '스토킹 가해자의 처벌 수위와 형량 기준을 스토킹처벌법에 따라 안내합니다.',
  },
  {
    keyword: '전 남자친구 스토킹 고소 방법',
    title: '전 남자친구 스토킹, 고소하는 방법과 절차 총정리',
    slug: 'ex-boyfriend-stalking-prosecution',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['스토킹', '전 남자친구', '고소', '스토킹처벌법', '접근금지', '데이트폭력', '이유림 변호사'],
    description: '전 남자친구의 스토킹 피해 시 고소 방법과 보호조치 절차를 안내합니다.',
  },
  {
    keyword: '접근금지 가처분 신청 비용 절차',
    title: '접근금지 가처분 신청, 비용과 절차를 한눈에 정리',
    slug: 'restraining-order-injunction-cost',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['접근금지', '가처분', '비용', '절차', '스토킹', '보호명령', '이유림 변호사', '민사소송'],
    description: '접근금지 가처분 신청 비용, 절차, 소요 기간을 상세히 안내합니다.',
  },
  {
    keyword: '스토킹 증거 수집 방법',
    title: '스토킹 증거 수집 방법, 고소를 위해 꼭 모아야 할 것들',
    slug: 'stalking-evidence-collection-guide',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['스토킹', '증거 수집', '스토킹처벌법', '고소', '카카오톡 증거', 'CCTV', '이유림 변호사'],
    description: '스토킹 고소를 위한 효과적인 증거 수집 방법과 주의사항을 안내합니다.',
  },
  // ── 재산범죄 피해 (16-20) ──
  {
    keyword: '보이스피싱 현금수거책 처벌 수위',
    title: '보이스피싱 현금수거책 처벌 수위, 피해자가 알아야 할 법적 대응',
    slug: 'voice-phishing-cash-collector-punishment',
    category: '재산범죄',
    author: '노채은 변호사',
    tags: ['보이스피싱', '현금수거책', '처벌', '사기죄', '전자금융거래법', '피해금 환급', '노채은 변호사'],
    description: '보이스피싱 현금수거책의 처벌 수위와 피해자의 법적 대응 방법을 안내합니다.',
  },
  {
    keyword: '사기죄 고소장 작성 방법',
    title: '사기죄 고소장 작성 방법, 핵심 포인트와 양식 안내',
    slug: 'fraud-criminal-complaint-writing-guide',
    category: '재산범죄',
    author: '노채은 변호사',
    tags: ['사기죄', '고소장', '작성방법', '형법 제347조', '사기 피해', '고소 절차', '노채은 변호사'],
    description: '사기죄 고소장 작성 시 반드시 포함할 내용과 핵심 포인트를 안내합니다.',
  },
  {
    keyword: '횡령 배임 고소 절차',
    title: '횡령·배임 고소 절차, 피해자가 준비해야 할 모든 것',
    slug: 'embezzlement-breach-of-trust-prosecution',
    category: '재산범죄',
    author: '노채은 변호사',
    tags: ['횡령', '배임', '고소 절차', '형법 제355조', '형법 제356조', '업무상횡령', '노채은 변호사'],
    description: '횡령·배임 피해 시 고소 절차와 피해자가 준비할 증거를 안내합니다.',
  },
  {
    keyword: '투자 사기 피해 구제 방법',
    title: '투자 사기 피해 구제 방법, 돈을 돌려받을 수 있을까?',
    slug: 'investment-fraud-victim-remedy',
    category: '재산범죄',
    author: '노채은 변호사',
    tags: ['투자사기', '피해구제', '사기죄', '민사소송', '가압류', '피해금 회수', '노채은 변호사'],
    description: '투자 사기 피해 시 돈을 돌려받기 위한 법적 구제 방법을 안내합니다.',
  },
  {
    keyword: '중고거래 사기 고소 방법',
    title: '중고거래 사기 고소 방법, 소액이라도 처벌받게 하려면?',
    slug: 'secondhand-trade-fraud-prosecution',
    category: '재산범죄',
    author: '노채은 변호사',
    tags: ['중고거래 사기', '고소', '사기죄', '소액 사기', '당근마켓', '번개장터', '노채은 변호사'],
    description: '중고거래 사기 피해 시 고소 방법과 소액 피해도 처벌 가능한 절차를 안내합니다.',
  },
  // ── 임대차/전세 (21-25) ──
  {
    keyword: '전세사기 고소 방법 절차',
    title: '전세사기 고소 방법과 절차, 피해자가 지금 해야 할 일',
    slug: 'jeonse-fraud-prosecution-procedure',
    category: '재산범죄',
    author: '이유림 변호사, 노채은 변호사',
    tags: ['전세사기', '고소', '보증금', '사기죄', '임대차', '형사고소', '이유림 변호사', '노채은 변호사'],
    description: '전세사기 피해자를 위한 형사 고소 방법과 단계별 절차를 안내합니다.',
  },
  {
    keyword: '보증금 안 돌려줄 때 내용증명 작성법',
    title: '보증금 안 돌려줄 때 내용증명 작성법, 양식과 핵심 포인트',
    slug: 'deposit-refund-certified-letter-guide',
    category: '재산범죄',
    author: '이유림 변호사, 노채은 변호사',
    tags: ['보증금', '내용증명', '임대차', '보증금 반환', '전세', '임차인', '이유림 변호사', '노채은 변호사'],
    description: '보증금을 돌려주지 않는 임대인에게 보내는 내용증명 작성법을 안내합니다.',
  },
  {
    keyword: '임차권등기명령 신청 방법 비용',
    title: '임차권등기명령 신청 방법과 비용, 보증금 보호의 첫걸음',
    slug: 'lease-registration-order-application',
    category: '재산범죄',
    author: '이유림 변호사, 노채은 변호사',
    tags: ['임차권등기명령', '신청방법', '비용', '보증금', '임대차', '대항력', '이유림 변호사', '노채은 변호사'],
    description: '임차권등기명령 신청 방법, 비용, 효과를 피해자 관점에서 안내합니다.',
  },
  {
    keyword: '전세보증금 가압류 신청 방법',
    title: '전세보증금 가압류 신청 방법, 임대인 재산을 먼저 잠그세요',
    slug: 'jeonse-deposit-provisional-seizure',
    category: '재산범죄',
    author: '이유림 변호사, 노채은 변호사',
    tags: ['전세보증금', '가압류', '보증금', '임대차', '재산보전', '보전처분', '이유림 변호사', '노채은 변호사'],
    description: '전세보증금 가압류 신청 방법과 절차를 피해자 관점에서 안내합니다.',
  },
  {
    keyword: '전세 사기 형사 고소 가능 여부',
    title: '전세 사기, 형사 고소가 가능할까? 사기죄 성립 요건 총정리',
    slug: 'jeonse-fraud-criminal-prosecution-possible',
    category: '재산범죄',
    author: '이유림 변호사, 노채은 변호사',
    tags: ['전세사기', '형사고소', '사기죄', '형법 제347조', '보증금', '임대차', '이유림 변호사', '노채은 변호사'],
    description: '전세 사기의 형사 고소 가능 여부와 사기죄 성립 요건을 안내합니다.',
  },
  // ── 기타 피해 (26-30) ──
  {
    keyword: '학교폭력 가해자 처벌 신고 방법',
    title: '학교폭력 가해자 처벌과 신고 방법, 부모가 알아야 할 모든 것',
    slug: 'school-violence-perpetrator-punishment-report',
    category: '법률상식',
    author: '이유림 변호사',
    tags: ['학교폭력', '가해자 처벌', '신고', '학교폭력예방법', '피해학생', '학폭위', '이유림 변호사'],
    description: '학교폭력 피해 시 신고 방법과 가해자 처벌 절차를 부모 관점에서 안내합니다.',
  },
  {
    keyword: '명예훼손 고소 방법 증거',
    title: '명예훼손 고소 방법과 필요한 증거, 내 명예를 지키는 법',
    slug: 'defamation-prosecution-evidence-guide',
    category: '법률상식',
    author: '이유림 변호사',
    tags: ['명예훼손', '고소', '증거', '형법 제307조', '모욕죄', '사이버명예훼손', '이유림 변호사'],
    description: '명예훼손 고소 시 필요한 증거와 구체적인 절차를 안내합니다.',
  },
  {
    keyword: '사이버 명예훼손 처벌 기준',
    title: '사이버 명예훼손 처벌 기준, 온라인 악플도 범죄입니다',
    slug: 'cyber-defamation-punishment-standard',
    category: '법률상식',
    author: '이유림 변호사',
    tags: ['사이버명예훼손', '처벌', '악플', '정보통신망법', '인터넷 명예훼손', '댓글', '이유림 변호사'],
    description: '사이버 명예훼손의 처벌 기준과 온라인 악플에 대한 법적 대응을 안내합니다.',
  },
  {
    keyword: '협박죄 성립 요건 처벌',
    title: '협박죄 성립 요건과 처벌, 협박을 당했을 때 대처법',
    slug: 'intimidation-crime-requirements-punishment',
    category: '법률상식',
    author: '노채은 변호사',
    tags: ['협박죄', '성립요건', '처벌', '형법 제283조', '공갈', '위협', '노채은 변호사'],
    description: '협박죄의 성립 요건, 처벌 수위, 피해자 대처법을 안내합니다.',
  },
  {
    keyword: '가정폭력 접근금지 신청 방법',
    title: '가정폭력 접근금지 신청 방법, 안전한 일상을 되찾으세요',
    slug: 'domestic-violence-restraining-order',
    category: '성범죄',
    author: '이유림 변호사',
    tags: ['가정폭력', '접근금지', '보호명령', '가정폭력처벌법', '피해자 보호', '긴급임시조치', '이유림 변호사'],
    description: '가정폭력 피해자를 위한 접근금지 명령 신청 방법과 보호조치를 안내합니다.',
  },
]

// ─── 이미지 풀 (카테고리별) ───
const IMAGE_POOLS: Record<string, string[]> = {
  '성범죄': [
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=800&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&h=450&fit=crop&q=80',
    'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
    'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
    'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
    'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
    'https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
  ],
  '재산범죄': [
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&h=450&fit=crop&q=80',
    'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
    'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
    'https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
  ],
  '법률상식': [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&h=450&fit=crop&q=80',
    'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=800&h=450&fit=crop&q=80',
    'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
    'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
  ],
}

function getRandomThumbnail(category: string, usedUrls: string[]): string {
  const pool = IMAGE_POOLS[category] || IMAGE_POOLS['법률상식']
  const available = pool.filter((url) => !usedUrls.includes(url))
  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)]
  }
  return pool[Math.floor(Math.random() * pool.length)]
}

// ─── 시스템 프롬프트 ───
function buildSystemPrompt(author: string): string {
  return `당신은 법률사무소 로앤이의 전문 법률 콘텐츠 작성자입니다.
법률사무소 로앤이는 "오직 피해자만 변호합니다"를 슬로건으로 하는 피해자 전문 로펌입니다.

대표변호사: 이유림(성범죄/IT/디지털성범죄 전문), 노채은(재산범죄/사기/횡령 전문)
주소: 경기도 부천시 부일로205번길 54, 205호
전화: 032-207-8788

블로그 글 작성 규칙:
- "~해요"체 사용 (따뜻하지만 전문적인 톤)
- 관련 법조문을 반드시 인용 (조문 번호 명시)
- H2, H3 소제목으로 구조화
- FAQ 섹션 3개 이상 포함 (## 자주 묻는 질문)
- 마지막에 로앤이 상담 안내 포함
- 1500자 이상
- 피해자 입장에서 공감하되, 법률 정보는 정확하게
- 가해자를 변호하는 내용은 절대 포함하지 않음
- "${author}" 이름을 전문성과 묶어서 최소 3회 이상 언급
- 글 상단에 "작성: ${author} (법률사무소 로앤이)" 추가
- 글 하단에 "본 글은 법률사무소 로앤이 ${author}가 직접 작성·감수한 법률 정보입니다." 추가
- 중요 키워드 **볼드** 처리
- 소제목은 ## 사용
- 마크다운 본문만 응답. JSON 금지. 코드블록으로 감싸지 마세요. 글 본문 텍스트만 응답하세요.
- 전화번호 넣지 않기
- 이모지 사용하지 않기
- 제목(h1)은 포함하지 않습니다(별도로 제공됩니다)`
}

function buildUserPrompt(keyword: string): string {
  return `"${keyword}"를 제목에 포함하는 블로그 글을 작성해주세요.

이 글을 읽는 사람은 해당 상황의 피해자입니다. 피해자가 알아야 할 법적 정보, 절차, 주의사항을 구체적으로 설명해주세요.`
}

// ─── Claude API 호출 ───
async function callClaude(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 4096,
      system: systemPrompt,
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

// ─── 중복 체크 ───
async function isDuplicate(title: string): Promise<boolean> {
  const { data: existingPosts } = await supabase
    .from('blog_posts')
    .select('id, title')
    .eq('status', 'published')

  if (!existingPosts || existingPosts.length === 0) return false

  const titleWords = title
    .toLowerCase()
    .replace(/[^가-힣a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 1)

  for (const existing of existingPosts) {
    const existingWords = existing.title
      .toLowerCase()
      .replace(/[^가-힣a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w: string) => w.length > 1)
    const overlap = titleWords.filter((w) => existingWords.includes(w))
    const similarity = titleWords.length > 0 ? overlap.length / titleWords.length : 0
    if (similarity >= 0.8) {
      return true
    }
  }
  return false
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
async function generatePost(entry: KeywordEntry, index: number): Promise<boolean> {
  console.log(`\n[${index + 1}/30] 생성 중: "${entry.title}"`)

  // 중복 체크
  const duplicate = await isDuplicate(entry.title)
  if (duplicate) {
    console.log(`  ⏭ 중복 건너뜀: "${entry.title}"`)
    return false
  }

  // slug 유니크 확인
  const slug = await getUniqueSlug(entry.slug)

  // Claude API로 본문 생성
  const systemPrompt = buildSystemPrompt(entry.author)
  const userPrompt = buildUserPrompt(entry.keyword)
  const content = await callClaude(systemPrompt, userPrompt)

  if (!content || content.length < 100) {
    console.error(`  ✗ 내용 생성 실패 (길이: ${content.length})`)
    return false
  }

  console.log(`  ✓ 내용 생성 완료 (${content.length}자)`)

  // excerpt 추출
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

  // 썸네일
  const { data: existingThumbs } = await supabase
    .from('blog_posts')
    .select('thumbnail_url')
    .eq('category', entry.category)
  const usedUrls = (existingThumbs || [])
    .map((p: { thumbnail_url: string | null }) => p.thumbnail_url)
    .filter(Boolean) as string[]
  const thumbnailUrl = getRandomThumbnail(entry.category, usedUrls)

  // DB 삽입
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
  let skipCount = 0

  for (let i = 0; i < batch.length; i++) {
    try {
      const result = await generatePost(batch[i], startIdx + i)
      if (result) {
        successCount++
      } else {
        skipCount++
      }
    } catch (error) {
      console.error(`  ✗ 오류: ${error instanceof Error ? error.message : error}`)
    }

    // Rate limit 방지: 마지막 항목이 아니면 5초 대기
    if (i < batch.length - 1) {
      console.log('  ⏳ 5초 대기...')
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }

  console.log(`\n배치 ${batchNum} 완료: 성공 ${successCount}개, 건너뜀 ${skipCount}개`)
  return { successCount, skipCount }
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
    if (isNaN(batchNum) || batchNum < 1 || batchNum > 3) {
      console.error('--batch 값은 1, 2, 3 중 하나여야 합니다.')
      process.exit(1)
    }
  }

  console.log('🔧 SEO 롱테일 블로그 글 생성 스크립트')
  console.log(`총 키워드: ${ALL_KEYWORDS.length}개`)

  if (batchNum) {
    await runBatch(batchNum)
  } else {
    // 전체 3배치 순차 실행
    let totalSuccess = 0
    let totalSkip = 0
    for (let b = 1; b <= 3; b++) {
      const { successCount, skipCount } = await runBatch(b)
      totalSuccess += successCount
      totalSkip += skipCount

      if (b < 3) {
        console.log('\n⏳ 배치 간 10초 대기...')
        await new Promise((resolve) => setTimeout(resolve, 10000))
      }
    }
    console.log(`\n${'='.repeat(60)}`)
    console.log(`전체 완료: 성공 ${totalSuccess}개, 건너뜀 ${totalSkip}개`)
    console.log(`${'='.repeat(60)}`)
  }

  // 최종 확인
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
