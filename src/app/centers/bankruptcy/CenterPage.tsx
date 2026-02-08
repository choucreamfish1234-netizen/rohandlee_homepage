'use client'

import CenterPageTemplate from '@/components/CenterPageTemplate'

export default function BankruptcyCenterPage() {
  return (
    <CenterPageTemplate
      centerName="회생·파산 전문센터 리셋"
      subtitle="회생·파산 전문센터(리셋)"
      ctaLabel="무료 회생 가능성 진단"
      ctaHref="/consultation"
      services={[
        { title: '개인회생 신청', description: '채무 조정으로 새로운 시작을 돕습니다' },
        { title: '개인파산 신청', description: '면책 결정을 통한 완전한 리셋' },
        { title: '법인회생', description: '기업의 경영정상화를 위한 법적 지원' },
        { title: '자동화 서류수집', description: 'E-Set 시스템으로 EDI 서류 자동 수집' },
        { title: '채권자 협상', description: '채권자와의 원만한 합의 도출' },
        { title: '면책 후 관리', description: '면책 이후 신용 회복까지 지원' },
      ]}
      declaration={{
        title: '빚은 끝이 아닙니다.\n새로운 시작의 문을 열어드립니다.',
        description:
          '회생과 파산은 포기가 아니라 법이 보장하는 새로운 시작입니다.\n로앤이 리셋 센터가 함께합니다.',
      }}
      lawyerName="이유림"
      lawyerRole="대표변호사"
      lawyerSpecialty="회생·파산 전문 변호사"
      lawyerQuote={'빚에 짓눌린 삶에서 벗어나\n다시 일어설 수 있도록 돕겠습니다.'}
      lawyerImage="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=800&fit=crop&q=80"
      ctaTitle="빚의 무게에서 벗어나세요."
      ctaDescription="무료 회생 가능성 진단을 받아보세요."
    />
  )
}
