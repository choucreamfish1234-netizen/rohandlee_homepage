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
        {
          title: '가해자 연락 전면 대리',
          description: '가해자와 직접 마주할 필요 없이, 모든 연락과 협상을 변호사가 대신합니다.',
          image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '24시간 심리 케어',
          description: '불안한 밤에도 전화 한 통이면 즉시 대응합니다. 언제든 연락하세요.',
          image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '철저한 비밀 보장',
          description: '사건 내용부터 의뢰인 신원까지, 모든 정보를 철저하게 보호합니다.',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '경찰 조사 동석',
          description: '수사 단계부터 변호사가 동석하여 진술을 조력하고 심리적 안정을 지원합니다.',
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '증거 보전 및 디지털 포렌식',
          description: '휴대폰, 영상 등 디지털 증거를 확보하고 포렌식 절차를 진행합니다.',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '변호사 의견서 제출',
          description: '수사기관에 변호사 의견서를 제출하여 수사 방향을 유리하게 이끕니다.',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '합의 협상 및 재판 대리',
          description: '형사 처벌 압박을 통한 합의금 극대화와 민사 손해배상 청구를 진행합니다.',
          image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '피해자 보호명령 신청',
          description: '접근금지, 연락금지 등 보호명령을 신청하여 2차 피해를 차단합니다.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '범죄피해 보상금 청구',
          description: '국가 범죄피해자 보상 제도를 활용하여 정당한 피해 보상을 받을 수 있도록 지원합니다.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
        },
      ]}
      declaration={{
        title: '가해자는 변호하지 않습니다.\n오로지 피해자만을 변호합니다.',
        description:
          '피해자 변호사는 고소장만 내주면 끝이라는 착각.\n로앤이 성범죄피해전문센터에서는\n피해자 변호의 처음부터 끝까지, A-Z를 책임집니다.',
      }}
      lawyers={[
        {
          name: '이유림',
          role: '대표변호사',
          specialty: '성범죄 피해자 전문 변호사',
          quote: '끝까지 당신의 편에 서겠습니다.\n피해자의 시간 앞에서 겸허히 걷겠습니다.',
          image: '/images/lawyer-lee.png',
        },
      ]}
      ctaTitle="혼자 앓지 마세요. 지금 전문가와 이야기하세요."
      ctaDescription="성범죄 전담 변호사의 무료 상담을 지금 바로 받아보세요."
    />
  )
}
