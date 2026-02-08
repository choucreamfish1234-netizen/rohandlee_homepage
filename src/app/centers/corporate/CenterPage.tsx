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
        {
          title: '계약서 검토 및 작성',
          description: '사업 계약의 법적 리스크를 사전에 점검하고 차단합니다.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '기업 분쟁 해결',
          description: '소송, 중재, 조정 등 최적의 방법으로 분쟁을 해결합니다.',
          image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '노무·인사 자문',
          description: '근로관계, 인사 이슈 등 노동 법률 전반에 대한 자문을 제공합니다.',
          image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '지식재산권 보호',
          description: '특허, 상표, 저작권 등 기업의 지식재산을 법적으로 보호합니다.',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '컴플라이언스 구축',
          description: '기업 내부 규정 및 법규 준수 시스템을 구축합니다.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80',
        },
        {
          title: 'M&A 자문',
          description: '기업 인수합병 전 과정에 걸쳐 법률 지원을 제공합니다.',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80',
        },
      ]}
      declaration={{
        title: '기업의 성장에\n법적 안전장치를 더합니다.',
        description:
          '사후 대응이 아닌 사전 예방.\n로앤이 기업경영 법무센터가 함께합니다.',
      }}
      lawyers={[
        {
          name: '이유림',
          role: '대표변호사',
          specialty: '기업법무 전문 변호사',
          quote: '기업의 안정적인 성장을 위해\n법적 파트너로서 함께하겠습니다.',
          image: '/images/lawyer-lee.png',
        },
        {
          name: '노채은',
          role: '대표변호사',
          specialty: '기업법무 전문 변호사',
          quote: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
          image: '/images/lawyer-noh.png',
        },
      ]}
      ctaTitle="기업의 내일을 지키세요."
      ctaDescription="기업경영 법무 전문 상담을 받아보세요."
    />
  )
}
