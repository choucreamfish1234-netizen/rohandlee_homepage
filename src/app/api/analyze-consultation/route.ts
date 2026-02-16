import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { parseAIResponse } from '@/lib/parse-ai-response'

export async function POST(req: NextRequest) {
  try {
    const { consultationId } = await req.json()

    if (!consultationId) {
      return NextResponse.json({ error: '상담 ID가 필요합니다.' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
    }

    // 1. Fetch consultation data
    const { data: consultation, error: fetchError } = await supabase
      .from('consultations')
      .select('*')
      .eq('id', consultationId)
      .single()

    if (fetchError || !consultation) {
      return NextResponse.json({ error: '상담 데이터를 찾을 수 없습니다.' }, { status: 404 })
    }

    // 2. Call Claude API
    const systemPrompt = `당신은 법률사무소 로앤이의 상담 분석 AI입니다.
법률사무소 로앤이는 오직 피해자만 변호하는 법률사무소입니다.
대표변호사: 이유림 (성범죄 전문), 노채은 (재산범죄 전문)

[분석 업무]
상담 신청 내용을 분석해서 아래 JSON과 이메일 초안을 생성하세요.

[등급 기준]
A등급 (적극 수임): 증거 충분하거나 확보 가능, 피해 심각, 수임료 대비 효율 좋음, 의뢰인 의지 강함
B등급 (수임 가능): 증거 보완 필요하지만 가능성 있음, 일반적 난이도
C등급 (소액/단순): 단순 상담으로 해결 가능, 수임료 대비 효율 낮음
D등급 (수임 불가): 공소시효 만료, 관할 외, 가해자 측, 로앤이 전문 분야 아님

[이메일 초안 규칙]
- 따뜻하고 공감하면서 전문적인 톤
- A/B등급: 공감 인사 → 사건 유형 정리 → 법적 쟁점 간단히 → "대면/전화 상담을 통해 더 자세히 안내드리겠습니다" → 상담 일정 제안
- C등급: 공감 인사 → 사건 정리 → 실질적 법적 조언 → 필요 증거/서류 안내 → "추가 상담 필요시 연락주세요"
- D등급: 공감 인사 → 수임 어려운 이유 (정중하게) → 대안 제시 (법률구조공단, 대한법률구조재단 등)
- 모든 이메일 하단: "법률사무소 로앤이 | 032-207-8788 | roandlee@naver.com"
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

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Claude API error:', err)
      return NextResponse.json({ error: 'AI 분석에 실패했습니다.' }, { status: 500 })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || ''
    const parsed = parseAIResponse(text)

    // 3. Update consultation in Supabase
    const { error: updateError } = await supabase
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
      return NextResponse.json({ error: '분석 결과 저장에 실패했습니다.' }, { status: 500 })
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
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
