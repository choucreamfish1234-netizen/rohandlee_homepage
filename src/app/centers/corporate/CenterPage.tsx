'use client'

import CenterPageTemplate from '@/components/CenterPageTemplate'

export default function CorporateCenterPage() {
  return (
    <CenterPageTemplate
      centerName="기업경영 법무센터"
      subtitle="기업경영 법무센터"
      ctaLabel="기업 법무 상담 예약"
      ctaHref="/consultation"
      services={[
        { title: '계약서 검토 및 작성', description: '사업 계약의 법적 리스크 사전 차단' },
        { title: '기업 분쟁 해결', description: '소송 및 중재를 통한 분쟁 해결' },
        { title: '노무 자문', description: '근로관계 및 인사 관련 법률 자문' },
        { title: '지식재산권 보호', description: '특허, 상표, 저작권 등 IP 보호' },
        { title: '컴플라이언스', description: '기업 내부 규정 및 법규 준수 시스템 구축' },
        { title: 'M&A 자문', description: '기업 인수합병 전 과정 법률 지원' },
      ]}
      declaration={{
        title: '기업의 성장에\n법적 안전장치를 더합니다.',
        description:
          '사후 대응이 아닌 사전 예방.\n로앤이 기업경영 법무센터가 함께합니다.',
      }}
      lawyerName="이유림"
      lawyerRole="대표변호사"
      lawyerSpecialty="기업법무 전문 변호사"
      lawyerQuote={'기업의 안정적인 성장을 위해\n법적 파트너로서 함께하겠습니다.'}
      ctaTitle="기업의 내일을 지키세요."
      ctaDescription="기업경영 법무 전문 상담을 받아보세요."
    />
  )
}
