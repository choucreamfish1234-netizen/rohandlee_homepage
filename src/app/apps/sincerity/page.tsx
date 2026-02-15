import type { Metadata } from 'next'
import SincerityContent from './SincerityContent'

export const metadata: Metadata = {
  title: '진심의무게 - AI 탄원서 작성 서비스 | 법률사무소 로앤이',
  description:
    '성범죄·재산범죄 피해자를 위한 AI 엄벌 탄원서 작성 도우미. 3분이면 완성. 이유림·노채은 변호사가 직접 검수합니다. 무료 작성, Word 다운로드.',
  keywords: [
    '탄원서',
    'AI 탄원서',
    '엄벌 탄원서',
    '탄원서 작성',
    '성범죄 탄원서',
    '피해자 탄원서',
    '법률사무소 로앤이',
    '진심의무게',
    '이유림 변호사',
    '노채은 변호사',
  ],
  openGraph: {
    title: '진심의무게 - AI 탄원서 작성 서비스 | 법률사무소 로앤이',
    description:
      '피해자 전문 변호사가 직접 설계한 AI 엄벌 탄원서 작성 도우미. 3분이면 완성됩니다.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '법률사무소 로앤이',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: '진심의무게',
      applicationCategory: 'LegalService',
      operatingSystem: 'Web',
      description:
        '피해자 전문 변호사가 직접 설계한 AI 엄벌 탄원서 작성 도우미. 3분이면 완성됩니다.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KRW',
        description: 'AI 탄원서 작성 및 Word 다운로드 무료',
      },
      provider: {
        '@type': 'LegalService',
        name: '법률사무소 로앤이',
        telephone: '032-207-8788',
        address: {
          '@type': 'PostalAddress',
          addressLocality: '부천시',
          addressRegion: '경기도',
          addressCountry: 'KR',
        },
      },
      creator: [
        {
          '@type': 'Person',
          name: '이유림',
          jobTitle: '대표변호사',
          worksFor: { '@type': 'LegalService', name: '법률사무소 로앤이' },
          knowsAbout: ['성범죄 피해자 변호', '탄원서', '형사고소'],
        },
        {
          '@type': 'Person',
          name: '노채은',
          jobTitle: '대표변호사',
          worksFor: { '@type': 'LegalService', name: '법률사무소 로앤이' },
          knowsAbout: [
            '재산범죄 피해자 변호',
            '사기 횡령 배임',
            '민사소송',
          ],
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '진심의무게는 무료인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, AI 탄원서 작성과 Word 다운로드는 무료입니다. 변호사 검수 서비스는 별도 비용이 발생하며, 신청 시 안내해 드립니다.',
          },
        },
        {
          '@type': 'Question',
          name: '어떤 종류의 탄원서를 작성할 수 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '성범죄(강간, 강제추행, 불법촬영 등), 재산범죄(사기, 횡령, 배임), 스토킹, 폭행·상해, 협박, 명예훼손 등 피해자가 제출하는 엄벌 탄원서를 작성할 수 있습니다. 법원 제출용과 검찰 제출용 모두 지원합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '법률 용어를 몰라도 되나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, 전혀 몰라도 됩니다. 쉬운 질문에 답하고 해당 항목을 터치하기만 하면 AI가 법률 용어와 형식에 맞춰 탄원서를 자동 완성합니다.',
          },
        },
        {
          '@type': 'Question',
          name: '작성한 탄원서를 법원에 직접 제출해야 하나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, 탄원서의 법원·검찰 제출은 본인이 직접 하셔야 합니다. 진심의무게에서 Word 파일로 다운로드한 후 인쇄하여 제출하시면 됩니다.',
          },
        },
        {
          '@type': 'Question',
          name: '개인정보는 안전한가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '작성 내용은 내 기기에만 저장됩니다. 서버에 개인정보가 전송되지 않으므로 안심하고 이용하실 수 있습니다.',
          },
        },
        {
          '@type': 'Question',
          name: '피해자 본인이 아닌 가족이나 친구도 작성할 수 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "네, '피해자의 지인' 모드를 선택하면 가족, 친구 등이 대신 작성할 수 있습니다. 작성자에 따라 탄원서의 문맥이 자동으로 변경됩니다.",
          },
        },
      ],
    },
  ],
}

export default function SincerityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SincerityContent />
    </>
  )
}
