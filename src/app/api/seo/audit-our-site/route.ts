import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { parseAIResponse } from '@/lib/parse-ai-response'
import { callClaude } from '@/lib/claude-api'

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

const PAGE_AUDIT_SYSTEM = `당신은 법률 웹사이트 SEO 감사 전문가입니다.
법률사무소 로앤이(roandlee.com)의 페이지 1개를 감사합니다.
title과 description의 길이, 키워드 포함 여부, SEO 최적화 상태를 평가하세요.
100점 만점으로 평가하고 문제점과 개선사항을 제시하세요.

평가 기준:
- title 길이: 50-60자 권장
- description 길이: 140-160자 권장
- 핵심 키워드 포함 여부
- H1 태그 존재 여부
- 전반적 SEO 최적화 상태

반드시 유효한 JSON만 응답하세요. 마크다운 코드블록 사용 금지.
{"score":85,"issues":["문제점1","문제점2"],"improvements":["개선사항1","개선사항2"],"title_feedback":"타이틀 평가","description_feedback":"디스크립션 평가"}`

export async function POST() {
  try {
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicApiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, { status: 500 })
    }

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

    // Step 2: Audit each page individually via Claude (using metadata, not HTML fetch)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const auditPages: any[] = []
    const allIssues: string[] = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageResults: any[] = []

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

      try {
        const pageData = `${page.name} (${page.path}):
- Title (${title.length}자): ${title}
- Meta Description (${description.length}자): ${description}
- Keywords: ${keywords || '미설정'}
- OG Title: ${ogTitle}
- OG Description: ${ogDescription}
- H1 태그: ${page.hasH1 ? '있음' : '없음'}
- 데이터 출처: ${source}`

        const text = await callClaude(
          anthropicApiKey,
          PAGE_AUDIT_SYSTEM,
          `이 페이지를 SEO 감사해주세요:\n\n${pageData}`,
          512,
        )
        const parsed = parseAIResponse(text)
        auditPages.push({ path: page.path, name: page.name, ...parsed })
        if (parsed.issues) allIssues.push(...parsed.issues)
      } catch (err) {
        console.error(`Audit failed for ${page.path}:`, err)
        auditPages.push({
          path: page.path,
          name: page.name,
          score: 0,
          issues: ['AI 분석 실패'],
          improvements: [],
          title_feedback: '',
          description_feedback: '',
        })
      }
    }

    // Calculate overall score
    const scores = auditPages.filter((p: { score: number }) => p.score > 0).map((p: { score: number }) => p.score)
    const overallScore = scores.length > 0
      ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length)
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

    // Save
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
