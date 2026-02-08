'use client'

import CenterPageTemplate from '@/components/CenterPageTemplate'

export default function SexualCrimeCenterPage() {
  return (
    <CenterPageTemplate
      centerName="성범죄 피해 전문센터"
      subtitle="성범죄 피해 전문센터"
      ctaLabel="무료 상담 신청하기"
      ctaHref="/consultation"
      services={[
        { title: '모든 연락 대리', description: '가해자와 마주할 필요 없이 모든 연락을 대리합니다' },
        { title: '24시간 심리 케어', description: '불안한 밤, 전화 한 통이면 즉시 대응합니다' },
        { title: '철저한 비밀 보장', description: '사생활 보호와 함께 비밀을 철저히 지킵니다' },
        { title: '경찰 조사 동석', description: '진술 교정 및 심리적 안정 지원' },
        { title: '증거 보전/지원출', description: '핸드폰/영상 압수수색 및 디지털 포렌식 진행 지원' },
        { title: '의견서 제출', description: '변호사 의견서로 수사 방향 조율' },
        { title: '합의 및 재판', description: '형사 처벌 압박으로 최대한의 합의금 협상 진행' },
        { title: '공감간 장애예시 실행 및 함의', description: '로앤이의 심오 사례' },
        { title: '형법범행율 무료 사적 및 직대 보상 완료', description: '로앤이의 심오 사례' },
      ]}
      declaration={{
        title: '가해자는 변호하지 않습니다.\n오로지 성범죄 피해자만을 변호합니다.',
        description:
          '피해자 변호사는 고소장만 내주면 끝이라는 착각,\n\n피해자 변호사는 고소장만 내주면 끝이라는 착각,\n로앤이 성범죄피해전문센터에서는\n피해자 변호의 A-Z를 경험합니다.',
      }}
      lawyerName="이유림"
      lawyerRole="대표변호사"
      lawyerSpecialty="성범죄피해자 전문 변호사"
      lawyerQuote={'끝까지 당신의 편에 서겠습니다.\n피해자의 시간 앞에서 겸허히 걷겠습니다.'}
      ctaTitle="혼자 앓지 마세요. 지금 전문가와 이야기하세요."
      ctaDescription="성범죄 전담 10년 변호사의 무료 상담을 지금 바로 받아보세요."
    />
  )
}
