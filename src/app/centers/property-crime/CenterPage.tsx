'use client'

import CenterPageTemplate from '@/components/CenterPageTemplate'
import ProcessTimeline from './ProcessTimeline'
import FAQAccordion from './FAQAccordion'
import Testimonials from './Testimonials'

export default function PropertyCrimeCenterPage() {
  return (
    <CenterPageTemplate
      pagePath="centers/property-crime"
      centerName="재산범죄 피해 전문센터"
      subtitle="재산범죄 피해 전문센터"
      ctaLabel="피해금 회복 가능성 진단"
      ctaHref="/consultation"
      defaultCaseType="재산범죄 피해 상담"
      services={[
        {
          title: '긴급 가압류 신청',
          description: '가해자가 재산을 빼돌리기 전에 즉시 재산을 동결합니다.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '은닉 재산 추적',
          description: '차명 계좌, 가상자산까지 전문 조사를 통해 끝까지 추적합니다.',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '민·형사 동시 진행',
          description: '형사 처벌 압박과 민사 소송을 병행하여 합의금을 극대화합니다.',
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '피해 규모 정밀 산정',
          description: '금융 거래 내역을 정밀 분석하여 정확한 피해 금액을 산출합니다.',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '고소장 작성 및 수사 협력',
          description: '치밀한 고소장 작성과 수사기관 협력으로 사건을 유리하게 이끕니다.',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '엄벌 탄원 및 구속 수사 유도',
          description: '구속 수사를 유도하여 가해자의 합의 의지를 이끌어냅니다.',
          image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '피해금 회수 및 집행',
          description: '합의금 수령부터 강제 집행까지, 피해금을 실질적으로 회수합니다.',
          image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&q=80',
        },
      ]}
      caseExamples={[
        {
          title: '투자 리딩방 사기',
          description: '피해금 2억 원 전액 회수에 성공',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '보이스피싱 피해',
          description: '인출책 검거 및 손해배상 소송 승소',
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '업무상 횡령',
          description: '합의금 5천만 원 달성',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80',
        },
      ]}
      declaration={{
        title: '재산범죄는 속도가 생명입니다.',
        description: '범인이 돈을 쓰기 전에 막아야 합니다.\n로앤이는 사건 접수 즉시 가압류부터 진행합니다.',
      }}
      lawyers={[
        {
          name: '노채은',
          role: '대표변호사',
          specialty: '재산범죄 피해자 전문 변호사',
          quote: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
          image: '/images/lawyers/lawyer-noh.svg',
        },
      ]}
      customSection={<><ProcessTimeline /><FAQAccordion /><Testimonials /></>}
      ctaTitle="재산범죄는 속도가 생명입니다."
      ctaDescription="범인이 재산을 숨기기 전에, 지금 바로 상담하세요."
    />
  )
}
