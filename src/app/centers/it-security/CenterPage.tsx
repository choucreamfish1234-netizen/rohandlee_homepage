'use client'

import CenterPageTemplate from '@/components/CenterPageTemplate'

export default function ITSecurityCenterPage() {
  return (
    <CenterPageTemplate
      centerName="IT보안 법률센터"
      subtitle="IT보안 법률센터"
      ctaLabel="IT보안 법률 상담"
      ctaHref="/consultation"
      services={[
        { title: '해킹 피해 대응', description: '해킹 피해 조사 및 법적 구제' },
        { title: '개인정보 유출 대응', description: '개인정보보호법 위반 피해 구제' },
        { title: '랜섬웨어 대응', description: '랜섬웨어 공격 피해 법적 대응' },
        { title: '디지털 포렌식 지원', description: '전자 증거 수집 및 분석 지원' },
        { title: '정보보호 컨설팅', description: '기업 정보보호 체계 구축 자문' },
        { title: '사이버 수사 협력', description: '수사기관 협력 및 고소 대리' },
      ]}
      declaration={{
        title: '디지털 범죄는\n디지털로 대응합니다.',
        description:
          '기술과 법률의 융합.\n로앤이 IT보안 법률센터가 디지털 세상의 정의를 세웁니다.',
      }}
      lawyerName="노채은"
      lawyerRole="대표변호사"
      lawyerSpecialty="IT보안 법률 전문 변호사"
      lawyerQuote={'디지털 시대의 새로운 위협에\n법률로 대응하겠습니다.'}
      ctaTitle="디지털 피해, 혼자 대응하지 마세요."
      ctaDescription="IT보안 법률 전문가의 상담을 받아보세요."
    />
  )
}
