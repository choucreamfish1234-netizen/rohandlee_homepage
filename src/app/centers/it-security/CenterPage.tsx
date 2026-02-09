'use client'

import CenterPageTemplate from '@/components/CenterPageTemplate'

export default function ITSecurityCenterPage() {
  return (
    <CenterPageTemplate
      centerName="IT·보안 법률센터"
      subtitle="IT·보안 법률센터"
      ctaLabel="IT보안 법률 상담"
      ctaHref="/consultation"
      services={[
        {
          title: '해킹 피해 대응',
          description: '해킹 피해 조사부터 법적 구제까지 원스톱으로 지원합니다.',
          image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '개인정보 유출 대응',
          description: '개인정보보호법 위반에 대한 피해 구제 및 손해배상을 청구합니다.',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '랜섬웨어 피해 대응',
          description: '랜섬웨어 공격 피해에 대한 법적 대응과 피해 복구를 지원합니다.',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '디지털 포렌식 지원',
          description: '전자 증거의 수집, 분석, 보전을 전문적으로 지원합니다.',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '정보보호 컨설팅',
          description: '기업의 정보보호 체계 구축과 보안 점검을 자문합니다.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '사이버 수사 협력 및 고소 대리',
          description: '수사기관과 협력하여 사이버 범죄를 고소하고 가해자를 처벌합니다.',
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop&q=80',
        },
      ]}
      declaration={{
        title: '디지털 범죄는\n디지털로 대응합니다.',
        description:
          '기술과 법률의 융합.\n로앤이 IT·보안 법률센터가 디지털 세상의 정의를 세웁니다.',
      }}
      lawyers={[
        {
          name: '이유림',
          role: '대표변호사',
          specialty: 'IT·보안 법률 전문 변호사',
          quote: '디지털 시대의 새로운 위협에\n법률로 대응하겠습니다.',
          image: '/lawyer-lee.jpg',
        },
        {
          name: '노채은',
          role: '대표변호사',
          specialty: 'IT·보안 법률 전문 변호사',
          quote: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
          image: '/lawyer-noh.jpg',
        },
      ]}
      ctaTitle="디지털 피해, 혼자 대응하지 마세요."
      ctaDescription="IT·보안 법률 전문가의 상담을 받아보세요."
    />
  )
}
