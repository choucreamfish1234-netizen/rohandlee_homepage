import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import RealEstatePage from './RealEstatePage'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/centers/real-estate', {
    title: '전세사기·보증금·건축사기·토지매매 피해 전담센터',
    description: '전세사기 변호사, 보증금 미반환, 건축사기 공사대금 먹튀, 토지매매 사기, 권리금 회수 방해, 중개사고 손해배상. 가압류·형사 고소·강제집행 원스톱 해결. 법률사무소 로앤이. 상담 032-207-8788',
    keywords: '전세사기 변호사, 보증금 안 돌려줄 때, 건축사기 변호사, 공사대금 먹튀, 시공사 도주, 건축 하자 소송, 임차권등기명령 방법, 전세보증금 가압류, 토지매매 사기, 권리금 회수 방해, 중개사 손해배상, 인테리어 사기, 법률사무소 로앤이',
    ogTitle: '전세사기·건축사기·보증금·토지매매 피해 전담센터',
    ogDescription: '전세사기·건축사기·보증금 미반환. 가압류·형사 고소·강제집행 원스톱. 상담 032-207-8788',
  })
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '전세 만기 후 보증금을 안 돌려주면 어떻게 하나요?', acceptedAnswer: { '@type': 'Answer', text: '먼저 내용증명을 발송하여 공식적으로 반환을 요구하세요. 그래도 돌려주지 않으면 임차권등기명령을 신청하고, 임대인 재산에 가압류를 건 뒤 보증금반환청구 소송을 제기합니다.' } },
    { '@type': 'Question', name: '전세사기로 형사 고소가 가능한가요?', acceptedAnswer: { '@type': 'Answer', text: '임대인이 처음부터 보증금을 돌려줄 의사나 능력이 없었음에도 계약을 체결했다면 사기죄(형법 제347조)에 해당할 수 있습니다.' } },
    { '@type': 'Question', name: '건축업자가 공사대금 받고 도주하면 어떻게 하나요?', acceptedAnswer: { '@type': 'Answer', text: '사기죄 형사 고소가 가능합니다. 동시에 시공사의 사업자등록 정보로 다른 재산을 추적하여 가압류하고, 공사대금 반환 민사소송도 병행합니다.' } },
    { '@type': 'Question', name: '건축 하자가 발견되면 어떻게 대응하나요?', acceptedAnswer: { '@type': 'Answer', text: '먼저 하자 부분을 사진과 영상으로 기록하고, 시공사에 서면으로 하자 보수를 요청하세요. 시공사가 보수를 거부하면 하자 감정을 신청하고, 감정 결과를 근거로 손해배상을 청구합니다.' } },
    { '@type': 'Question', name: '임차권등기명령이 뭔가요?', acceptedAnswer: { '@type': 'Answer', text: '이사를 나가야 하는데 보증금을 못 받은 경우, 법원에 신청하면 등기부에 임차권이 기재됩니다. 이후 이사를 가더라도 대항력과 우선변제권이 유지되어 보증금을 보호받을 수 있습니다.' } },
    { '@type': 'Question', name: '깡통전세인데 보증금을 돌려받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '깡통전세의 경우에도 임대인에 대한 보증금반환청구, 사기죄 고소, 경매 배당 참여, 전세보증금 반환보증보험 청구 등 다양한 방법으로 회수가 가능합니다.' } },
    { '@type': 'Question', name: '상가 권리금을 못 받고 쫓겨났는데 방법이 있나요?', acceptedAnswer: { '@type': 'Answer', text: '상가건물 임대차보호법 제10조의4에 따라 임대인이 정당한 사유 없이 권리금 회수를 방해하면 손해배상 책임이 있습니다. 시효는 3년입니다.' } },
    { '@type': 'Question', name: '중개사가 근저당 사실을 안 알려줬어요.', acceptedAnswer: { '@type': 'Answer', text: '공인중개사는 중개대상물의 권리관계 등을 설명할 의무가 있습니다(공인중개사법 제25조). 이를 위반하면 중개사 및 중개법인에 손해배상 청구가 가능합니다.' } },
    { '@type': 'Question', name: '인테리어 업자가 돈만 받고 사라졌어요.', acceptedAnswer: { '@type': 'Answer', text: '건축사기와 동일하게 사기죄 형사 고소가 가능합니다. 계약서, 입금 내역, 카카오톡 대화 등 증거를 확보하고, 업자의 사업자 정보로 재산을 추적하여 가압류합니다.' } },
    { '@type': 'Question', name: '보증금반환청구 소송에 얼마나 걸리나요?', acceptedAnswer: { '@type': 'Answer', text: '통상 6개월에서 1년 정도 소요됩니다. 하지만 소송 전에 가압류를 걸어두면 상대방이 합의에 응할 가능성이 높아집니다.' } },
    { '@type': 'Question', name: '전국에서 상담받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 전화·화상·온라인 상담이 가능합니다. 부동산 소재지 관할 법원에 소송을 제기해야 하지만, 로앤이는 전국 어디든 출장 대응합니다.' } },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <RealEstatePage />
    </>
  )
}
