'use client'

import CenterPageTemplate from '@/components/CenterPageTemplate'

export default function PropertyCrimeCenterPage() {
  return (
    <CenterPageTemplate
      centerName="재산범죄 피해 전문센터"
      subtitle="재산범죄 피해 전문센터"
      ctaLabel="피해금 회복 가능성 진단"
      ctaHref="/consultation"
      services={[
        { title: '신속한 가압류', description: '가해자가 재산을 빼돌리기 전에 즉시 동결' },
        { title: '은닉 재산 추적', description: '차명 계좌 및 코인까지 끝까지 추적' },
        { title: '민형사 동시 진행', description: '형사 처벌 압박으로 합의금 최대 확보' },
        { title: '피해 규모 산정', description: '금융 거래 내역 정밀 분석' },
        { title: '고소 및 가압류', description: '수사 시작과 동시에 재산 묶기' },
        { title: '엄벌 탄원', description: '구속 수사 유도로 합의 압박' },
        { title: '피해금 회수', description: '합의금 수령 또는 배상 명령 집행' },
      ]}
      caseExamples={[
        { title: '투자 리딩방 사기', description: '2억 원 전액 회수' },
        { title: '보이스피싱', description: '인출책 검거 및 손해배상 승소' },
        { title: '업무상 횡령', description: '합의금 5천만 원 달성' },
      ]}
      declaration={{
        title: '재산범죄는 속도가 생명입니다.',
        description: '범인이 돈을 쓰기 전에 막아야 합니다.',
      }}
      lawyerName="노채은"
      lawyerRole="대표변호사"
      lawyerSpecialty="재산범죄피해자 전문 변호사"
      lawyerQuote={'무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.'}
      ctaTitle="재산범죄는 속도가 생명입니다."
      ctaDescription="범인이 돈을 쓰기 전에 막아야 합니다."
    />
  )
}
