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
        {
          title: '개인회생 신청',
          description: '법원 인가를 통해 채무를 조정하고, 새로운 출발을 돕습니다.',
          image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '개인파산·면책 신청',
          description: '면책 결정을 받아 모든 채무에서 벗어나는 완전한 리셋을 지원합니다.',
          image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '법인회생 지원',
          description: '기업의 경영 정상화를 위한 법적 절차를 전담합니다.',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '자동화 서류 수집 (E-Set)',
          description: 'EDI 서류를 자동으로 수집하는 자체 시스템으로 빠르고 정확하게 처리합니다.',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '채권자 협상',
          description: '채권자와의 원만한 합의를 이끌어 의뢰인의 부담을 줄입니다.',
          image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '면책 후 신용 회복 지원',
          description: '면책 결정 이후 신용 회복까지 사후 관리를 지원합니다.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
        },
      ]}
      declaration={{
        title: '빚은 끝이 아닙니다.\n새로운 시작의 문을 열어드립니다.',
        description:
          '회생과 파산은 포기가 아니라, 법이 보장하는 새로운 시작입니다.\n로앤이 리셋 센터가 함께합니다.',
      }}
      lawyers={[
        {
          name: '이유림',
          role: '대표변호사',
          specialty: '회생·파산 전문 변호사',
          quote: '빚에 짓눌린 삶에서 벗어나\n다시 일어설 수 있도록 돕겠습니다.',
          image: '/images/lawyer-lee.png',
        },
        {
          name: '노채은',
          role: '대표변호사',
          specialty: '회생·파산 전문 변호사',
          quote: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
          image: '/images/lawyer-noh.png',
        },
      ]}
      ctaTitle="빚의 무게에서 벗어나세요."
      ctaDescription="무료 회생 가능성 진단을 받아보세요."
    />
  )
}
