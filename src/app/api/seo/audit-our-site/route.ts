import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const SITE_PAGES = [
  {
    path: '/',
    name: '메인 페이지',
    hasH1: true,
    defaultTitle: '부천 성범죄 피해자 전문 변호사 | 법률사무소 로앤이 | 오직 피해자만 변호합니다',
    defaultDescription: '성범죄 피해자 전문 변호사 이유림, 재산범죄 전문 변호사 노채은. 로톡 평점 4.9, 후기 600건 이상. 성폭행, 성추행, 불법촬영, 디지털성범죄, 스토킹, 보이스피싱, 전세사기 피해자를 위한 전문 법률 서비스. 부천시 원미구 소재.',
  },
  {
    path: '/blog',
    name: '블로그',
    hasH1: true,
    defaultTitle: '법률 블로그',
    defaultDescription: '법률사무소 로앤이 법률 블로그. 성범죄·재산범죄·회생파산 등 법률 정보와 판례 분석, 법률 상식을 알기 쉽게 전달합니다.',
  },
  {
    path: '/cases',
    name: '성공 사례',
    hasH1: true,
    defaultTitle: '성공사례',
    defaultDescription: '법률사무소 로앤이의 성공사례. 보이스피싱 불송치, 성범죄 엄벌, 회생인가 등 실제 사건 결과로 증명합니다. 600건 이상 의뢰인 후기.',
  },
  {
    path: '/directions',
    name: '오시는 길',
    hasH1: true,
    defaultTitle: '오시는 길',
    defaultDescription: '법률사무소 로앤이 오시는 길. 경기도 부천시 부일로205번길 54, 205호(14544). 7호선 부천시청역 2번 출구 도보 5분. 무료 주차 가능.',
  },
  {
    path: '/centers/sexual-crime',
    name: '성범죄 센터',
    hasH1: true,
    defaultTitle: '성범죄 피해자 전문 변호사 | 성폭행·성추행·불법촬영 피해 상담 | 로앤이',
    defaultDescription: '성범죄 피해자만 변호하는 이유림 변호사. 성폭행, 성추행, 강제추행, 불법촬영, 몰카, 디지털성범죄, 리벤지포르노, 딥페이크 피해 전문 상담. 로톡 평점 4.9, 후기 600건 이상. 경찰 조사부터 재판까지 전 과정 동행. 첫 상담 무료.',
  },
  {
    path: '/centers/property-crime',
    name: '재산범죄 센터',
    hasH1: true,
    defaultTitle: '보이스피싱·전세사기·투자사기 피해자 전문 변호사 | 로앤이',
    defaultDescription: '재산범죄 피해자 전문 노채은 변호사. 보이스피싱 피해금 환급, 전세사기 특별법 활용, 투자사기 민형사 대응. 피해금 회수 전문. 로톡 평점 4.9. 첫 상담 무료.',
  },
  {
    path: '/centers/stalking',
    name: '스토킹 센터',
    hasH1: true,
    defaultTitle: '스토킹 피해자 전문 변호사 | 로앤이',
    defaultDescription: '스토킹 피해자 전문 법률 상담. 스토킹처벌법 활용, 접근금지 가처분, 피해자 보호 전문. 첫 상담 무료.',
  },
  {
    path: '/centers/digital-crime',
    name: '디지털성범죄 센터',
    hasH1: true,
    defaultTitle: '디지털성범죄·딥페이크·리벤지포르노 피해자 변호사 | 로앤이',
    defaultDescription: '불법촬영, 몰카, 딥페이크, 리벤지포르노, 온라인 성착취 피해 전문. 유포 차단, 삭제 요청, 가해자 처벌, 손해배상까지. 디지털 증거 보존 전문. 첫 상담 무료.',
  },
  {
    path: '/centers/rehabilitation',
    name: '회생파산 센터',
    hasH1: true,
    defaultTitle: '개인회생·개인파산 전문 변호사 | 부천 회생파산 상담 | 로앤이',
    defaultDescription: '개인회생 신청부터 면책까지 전 과정 대행. 개인회생 vs 개인파산 비교 상담. 월 변제금 최소화. 채무 탕감 전문. 부천시 소재 법률사무소 로앤이.',
  },
]

const IMPORTANT_KEYWORDS = ['변호사', '피해자', '로앤이', '부천']

function auditPage(
  title: string,
  description: string,
  keywords: string,
  hasH1: boolean,
  ogTitle: string,
  ogDescription: string,
) {
  let score = 100
  const issues: string[] = []
  const improvements: string[] = []

  // --- Title 체크 ---
  let titleFeedback = ''
  if (!title || title === '(미설정)') {
    score -= 25
    issues.push('title 미설정')
    titleFeedback = 'title이 설정되지 않았습니다. 50-60자의 키워드 포함 title을 설정하세요.'
  } else {
    if (title.length < 30) {
      score -= 10
      issues.push(`title이 너무 짧음 (${title.length}자, 권장 50-60자)`)
      titleFeedback = `title이 ${title.length}자로 짧습니다. 핵심 키워드를 포함하여 50-60자로 늘리세요.`
    } else if (title.length > 65) {
      score -= 5
      issues.push(`title이 너무 김 (${title.length}자, 권장 50-60자)`)
      titleFeedback = `title이 ${title.length}자로 깁니다. 검색결과에서 잘릴 수 있으니 60자 이내로 줄이세요.`
    } else {
      titleFeedback = `title 길이 적절 (${title.length}자)`
    }

    const titleHasKeyword = IMPORTANT_KEYWORDS.some((k) => title.includes(k))
    if (!titleHasKeyword) {
      score -= 15
      issues.push('title에 핵심 키워드 없음 (변호사/피해자/로앤이/부천)')
      improvements.push('title에 "변호사", "피해자", "로앤이", "부천" 중 하나 이상 포함 권장')
    }
  }

  // --- Description 체크 ---
  let descFeedback = ''
  if (!description || description === '(미설정)') {
    score -= 25
    issues.push('description 미설정')
    descFeedback = 'description이 설정되지 않았습니다. 140-160자의 설명을 추가하세요.'
  } else {
    if (description.length < 80) {
      score -= 10
      issues.push(`description이 너무 짧음 (${description.length}자, 권장 140-160자)`)
      descFeedback = `description이 ${description.length}자로 짧습니다. 140-160자로 늘려 검색결과에서 충분한 정보를 제공하세요.`
    } else if (description.length > 170) {
      score -= 5
      issues.push(`description이 너무 김 (${description.length}자, 권장 140-160자)`)
      descFeedback = `description이 ${description.length}자로 깁니다. 검색결과에서 잘릴 수 있으니 160자 이내로 줄이세요.`
    } else {
      descFeedback = `description 길이 적절 (${description.length}자)`
    }

    const descHasKeyword = IMPORTANT_KEYWORDS.some((k) => description.includes(k))
    if (!descHasKeyword) {
      score -= 10
      issues.push('description에 핵심 키워드 없음')
      improvements.push('description에 핵심 키워드 포함 권장')
    }
  }

  // --- Keywords 체크 ---
  if (!keywords) {
    score -= 5
    issues.push('keywords 메타태그 미설정')
    improvements.push('keywords 메타태그에 관련 키워드 설정 권장')
  }

  // --- H1 체크 ---
  if (!hasH1) {
    score -= 10
    issues.push('H1 태그 없음')
    improvements.push('페이지에 H1 태그 추가 권장')
  }

  // --- OG 태그 체크 ---
  if (!ogTitle || ogTitle === title) {
    // OG title이 없거나 일반 title과 같으면 약간 감점
    // (같아도 괜찮지만, 소셜 공유 최적화 가능)
  }
  if (!ogDescription || ogDescription === '(미설정)') {
    score -= 5
    issues.push('OG description 미설정')
    improvements.push('소셜 미디어 공유를 위한 OG description 설정 권장')
  }

  // --- 개선 제안 추가 ---
  if (issues.length === 0) {
    improvements.push('현재 SEO 설정이 양호합니다. 주기적으로 키워드 트렌드를 확인하세요.')
  }
  if (title && title.length >= 30 && title.length <= 65) {
    improvements.push('title에 지역명(부천, 경기)과 전문 분야를 함께 포함하면 효과적입니다.')
  }
  if (description && description.length >= 80 && description.length <= 170) {
    improvements.push('description에 CTA(전화번호, 무료상담 등)를 포함하면 클릭률이 높아집니다.')
  }

  return {
    score: Math.max(0, score),
    issues,
    improvements,
    title_feedback: titleFeedback,
    description_feedback: descFeedback,
  }
}

export async function POST() {
  try {
    // Step 1: Fetch page_seo data for all pages at once
    const { data: seoRows } = await supabaseAdmin
      .from('page_seo')
      .select('page_path, title, description, keywords, og_title, og_description')

    const seoMap = new Map<string, { title: string | null; description: string | null; keywords: string | null; og_title: string | null; og_description: string | null }>()
    if (seoRows) {
      for (const row of seoRows) {
        seoMap.set(row.page_path, row)
      }
    }

    // Step 2: Audit each page using rule-based scoring (no AI calls)
    const auditPages: {
      path: string
      name: string
      score: number
      issues: string[]
      improvements: string[]
      title_feedback: string
      description_feedback: string
    }[] = []
    const allIssues: string[] = []
    const pageResults: {
      path: string
      name: string
      title: string
      description: string
      keywords: string
      ogTitle: string
      ogDescription: string
      source: string
      hasH1: boolean
    }[] = []

    for (const page of SITE_PAGES) {
      const seoData = seoMap.get(page.path)
      const title = seoData?.title || page.defaultTitle
      const description = seoData?.description || page.defaultDescription
      const keywords = seoData?.keywords || ''
      const ogTitle = seoData?.og_title || title
      const ogDescription = seoData?.og_description || description
      const source = seoData ? 'page_seo 테이블' : '코드 기본값'

      pageResults.push({
        path: page.path,
        name: page.name,
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        source,
        hasH1: page.hasH1,
      })

      const result = auditPage(title, description, keywords, page.hasH1, ogTitle, ogDescription)
      auditPages.push({ path: page.path, name: page.name, ...result })
      allIssues.push(...result.issues)
    }

    // Calculate overall score
    const scores = auditPages.map((p) => p.score)
    const overallScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0

    // Deduplicate critical issues
    const criticalIssues = Array.from(new Set(allIssues)).slice(0, 5)

    const audit = {
      pages: auditPages,
      overall_score: overallScore,
      critical_issues: criticalIssues,
      top_priorities: criticalIssues.slice(0, 3),
      summary: `${auditPages.length}개 페이지 감사 완료. 평균 점수: ${overallScore}점/100점`,
    }

    // Save to seo_analyses
    await supabaseAdmin.from('seo_analyses').insert({
      analysis_type: 'our_site',
      data: { pages: pageResults, audit },
      recommendations: audit.top_priorities,
    })

    return NextResponse.json({ audit, pageResults })
  } catch (error) {
    console.error('Site audit error:', error)
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${msg}` }, { status: 500 })
  }
}
