import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { parseAIResponse } from '@/lib/parse-ai-response'

export async function POST(req: NextRequest) {
  try {
    const { consultationId } = await req.json()

    if (!consultationId) {
      return NextResponse.json({ error: '상담 ID가 필요합니다.' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: '[1단계] ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다. Vercel 환경변수를 확인해주세요.' }, { status: 500 })
    }

    // 1. Fetch consultation data
    const { data: consultation, error: fetchError } = await supabaseAdmin
      .from('consultations')
      .select('*')
      .eq('id', consultationId)
      .single()

    if (fetchError) {
      return NextResponse.json({ error: `[2단계] 상담 데이터 조회 실패: ${fetchError.message}` }, { status: 500 })
    }

    if (!consultation) {
      return NextResponse.json({ error: `[2단계] 상담 ID ${consultationId}에 해당하는 데이터가 없습니다.` }, { status: 404 })
    }

    // 2. Call Claude API
    const systemPrompt = `당신은 법률사무소 로앤이의 상담 분석 AI입니다.
법률사무소 로앤이는 피해자 전문 로펌이지만, 다양한 법률 사건을 폭넓게 다룹니다.
대표변호사: 이유림 (성범죄 전문), 노채은 (재산범죄 전문)

[취급 분야]
- 성범죄 피해 (강제추행, 강간, 디지털성범죄, 카메라촬영 등)
- 재산범죄 피해 (사기, 횡령, 배임, 보이스피싱 등)
- 신체범죄 피해 (폭행, 상해, 스토킹, 협박, 공갈, 가정폭력 등)
- 부동산 분쟁 (전세사기, 보증금, 토지매매, 권리금 등)
- 손해배상 (교통사고, 의료사고, 산재, 제조물 등)
- 재산회복 (가압류, 가처분, 강제집행, 압류추심 등)
- 개인회생·파산
- 일반 민사소송
- 난민 사건
- 가사 사건
- 형사 사건 (가해자 측 변호 포함)
- 기업법무
- 개인정보보호
- 기타 모든 법률 분쟁

[유일하게 수임하지 않는 사건]
- 성범죄 가해자 변호 (강간, 강제추행, 성폭력 등의 가해자 측)
이 한 가지를 제외한 모든 사건은 등급 분석 대상입니다.

[분석 업무]
상담 신청 내용을 분석해서 아래 JSON과 이메일 초안을 생성하세요.

[등급 기준]
A등급 (적극 수임): 수임료가 크거나, 긴급하거나, 승소 가능성 높은 사건
B등급 (수임 가능): 일반적인 사건
C등급 (소액/단순): 소액이거나 단순한 사건
D등급 (수임 불가): 성범죄 가해자 변호 요청 (이것만 수임 불가)

[이메일 초안 규칙]
- 따뜻하고 공감하면서 전문적인 톤
- A/B등급: 공감 인사 → 사건 유형 정리 → 법적 쟁점 간단히 → "대면/전화 상담을 통해 더 자세히 안내드리겠습니다" → 상담 일정 제안
- C등급: 공감 인사 → 사건 정리 → 실질적 법적 조언 → 필요 증거/서류 안내 → "추가 상담 필요시 연락주세요"
- D등급: 공감 인사 → 성범죄 가해자 변호는 수임하지 않는다는 안내 (정중하게) → 대안 제시 (대한법률구조공단, 대한변호사협회 법률구조재단 등)
- 모든 이메일 하단: "법률사무소 로앤이 | 032-207-8788 | rohetlee@naver.com"
- 이모지 사용 금지
- 의뢰인 이름을 사용하여 개인화

반드시 유효한 JSON만 응답하세요. 마크다운 코드블록(\`\`\`)을 사용하지 마세요. JSON 외 텍스트를 포함하지 마세요. 응답이 잘리지 않도록 간결하게 작성하세요.

[응답 형식]
{
  "analysis": {
    "case_category": "대분류",
    "case_subcategory": "소분류",
    "urgency": "높음/보통/낮음",
    "statute_of_limitations": "공소시효 정보",
    "estimated_fee_range": "예상 수임료 범위",
    "key_issues": ["쟁점1", "쟁점2"],
    "recommended_action": "권장 조치",
    "grade_reason": "등급 판단 근거"
  },
  "grade": "A/B/C/D",
  "email_draft": "이메일 본문 전체",
  "email_subject": "이메일 제목",
  "assigned_to": "이유림 변호사 또는 노채은 변호사"
}`

    const userPrompt = `다음 상담 신청을 분석해주세요:

이름: ${consultation.name}
연락처: ${consultation.phone}
이메일: ${consultation.email || '미제공'}
상담 유형: ${consultation.category || '미선택'}
상담 내용: ${consultation.content || '내용 없음'}
접수일: ${consultation.created_at}`

    let response: Response
    try {
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 4096,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }],
        }),
      })
    } catch (fetchErr) {
      const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr)
      return NextResponse.json({ error: `[3단계] Claude API 네트워크 오류: ${msg}` }, { status: 500 })
    }

    if (!response.ok) {
      const err = await response.text()
      console.error('Claude API error:', response.status, err)
      let detail = ''
      try {
        const errJson = JSON.parse(err)
        detail = errJson?.error?.message || ''
      } catch { detail = err.substring(0, 300) }
      return NextResponse.json({ error: `[3단계] Claude API 오류 (${response.status}): ${detail || '알 수 없는 오류'}` }, { status: 500 })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || ''

    if (!text) {
      return NextResponse.json({ error: '[4단계] Claude API 응답이 비어있습니다.' }, { status: 500 })
    }

    let parsed
    try {
      parsed = parseAIResponse(text)
    } catch (parseErr) {
      const msg = parseErr instanceof Error ? parseErr.message : String(parseErr)
      return NextResponse.json({ error: `[4단계] AI 응답 파싱 실패: ${msg}` }, { status: 500 })
    }

    // 3. Update consultation in Supabase
    const { error: updateError } = await supabaseAdmin
      .from('consultations')
      .update({
        ai_analysis: { ...parsed.analysis, email_subject: parsed.email_subject },
        grade: parsed.grade,
        email_draft: parsed.email_draft,
        assigned_to: parsed.assigned_to,
        status: 'analyzed',
      })
      .eq('id', consultationId)

    if (updateError) {
      console.error('Supabase update error:', updateError)
      return NextResponse.json({ error: `[5단계] 분석 결과 저장 실패: ${updateError.message}` }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      analysis: parsed.analysis,
      grade: parsed.grade,
      email_draft: parsed.email_draft,
      email_subject: parsed.email_subject,
      assigned_to: parsed.assigned_to,
    })
  } catch (error) {
    console.error('Analyze consultation error:', error)
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${message}` }, { status: 500 })
  }
}
