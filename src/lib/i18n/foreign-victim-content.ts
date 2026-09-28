// Content data for foreign victim sub-pages (crime types + guides)
// Each slug × locale has title, subtitle, sections (3-4 H2s), faq (3 items), geo

export interface SubPageContent {
  title: string
  subtitle: string
  sections: { heading: string; body: string }[]
  faq: { q: string; a: string }[]
  geo: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string
}

export const crimeTypeSlugs = ['sexual-crime', 'stalking', 'fraud', 'violence', 'rental-fraud', 'wage-theft'] as const
export const guideSlugs = ['report', 'visa', 'process'] as const

export type CrimeTypeSlug = typeof crimeTypeSlugs[number]
export type GuideSlug = typeof guideSlugs[number]

export const crimeTypeContent: Record<string, Record<string, SubPageContent>> = {
  'sexual-crime': {
    ko: {
      title: '외국인 성범죄 피해',
      subtitle: '한국에서 성범죄 피해를 입은 외국인도 한국법의 보호를 받습니다.',
      metaTitle: '외국인 성범죄 피해 | 외국인 범죄피해 지원센터 | 로앤이',
      metaDescription: '한국에서 성범죄 피해를 입은 외국인을 위한 법률 지원. 성폭행, 성추행, 디지털 성범죄 피해 외국인 전문 변호사. 대표변호사 직접 수행. 중국어·영어·베트남어 상담. 032-207-8788',
      metaKeywords: '외국인 성범죄 피해, 외국인 성폭행, 한국 성범죄 변호사, 외국인 성추행 신고, 외국인 디지털 성범죄',
      sections: [
        {
          heading: '외국인 성범죄 피해, 어떻게 대응해야 하나요?',
          body: '한국에서 성범죄 피해를 입은 외국인은 국적이나 비자 상태에 관계없이 한국 형법의 보호를 받습니다. 성폭행, 성추행, 불법촬영, 디지털 성범죄 등 모든 유형의 성범죄에 대해 피해자로서의 권리를 행사할 수 있습니다. 피해 직후 증거를 보전하고, 경찰에 신고하는 것이 중요합니다. 로앤이는 대표변호사가 수사기관 동행부터 법원 출석까지 직접 수행합니다.',
        },
        {
          heading: '외국인 성범죄 피해 신고 절차',
          body: '경찰서 또는 112에 신고할 수 있으며, 외국인 피해자의 경우 통역 지원을 요청할 수 있습니다. 신고 후에는 피해자 진술조서 작성, 증거 수집, 가해자 조사 순서로 진행됩니다. 피해자 국선변호사 제도를 통해 무료 법률 지원도 가능하지만, 전문 변호사를 선임하면 수사 단계부터 적극적인 대리가 가능합니다. 로앤이는 초기 상담부터 합의 협상까지 전 과정을 대표변호사가 직접 담당합니다.',
        },
        {
          heading: '성범죄 피해 외국인의 비자는 보호됩니다',
          body: '범죄 피해를 신고했다는 이유로 비자가 취소되거나 불이익을 받는 것은 아닙니다. 한국 정부는 범죄 피해 외국인의 체류자격을 보호하는 제도를 운영하고 있으며, 수사 및 재판 기간 동안 체류 연장이 가능합니다. 불법체류 상태라 하더라도 피해자로서의 권리는 보장됩니다. 로앤이는 비자 관련 법적 조언도 함께 제공합니다.',
        },
        {
          heading: '로앤이 성범죄 피해 외국인 지원 실적',
          body: '로앤이는 2026년 9월 기준 누적 241건의 피해자 대리 실적을 보유하고 있으며, 성범죄 피해 외국인 사건도 다수 수행했습니다. 성폭행, 직장 내 성추행, 불법촬영, 디지털 성범죄 등 다양한 유형의 사건을 대리한 경험이 있습니다. 대표변호사 이유림·노채은이 초기 상담부터 증거 수집 전략 수립, 수사기관 동행, 검찰 면담, 법원 출석, 피해자 진술권 행사, 합의 협상까지 모든 과정을 직접 수행합니다. 다른 변호사나 수습변호사에게 사건을 넘기지 않습니다. 중국어·영어·베트남어로 초기 상담 접수가 가능합니다.',
        },
      ],
      faq: [
        { q: '불법체류 상태에서도 성범죄 신고가 가능한가요?', a: '네, 가능합니다. 한국법은 체류자격과 관계없이 모든 범죄 피해자를 보호합니다. 범죄 피해 신고가 자동으로 강제퇴거로 이어지는 것은 아니며, 수사기관은 피해자 보호를 우선합니다. 다만 개별 상황에 따라 변호사와 먼저 상담하는 것이 안전합니다.' },
        { q: '성범죄 피해 신고 후 가해자가 보복할까 걱정됩니다.', a: '한국에는 체계적인 피해자 보호 제도가 있습니다. 접근금지 명령, 피해자 신변보호 조치, 피해자 개인정보 보호 명령 등을 신청할 수 있습니다. 성범죄 피해자의 경우 신원 비공개와 주소지 비공개도 가능합니다. 변호사가 신고 시 동시에 이러한 보호 조치를 신청하여 안전을 확보합니다.' },
        { q: '한국어를 못해도 경찰 신고가 가능한가요?', a: '가능합니다. 경찰에 통역 지원을 요청할 수 있으며, 1345 외국인종합안내센터를 통한 전화 통역도 활용 가능합니다. 변호사가 수사기관에 동행하여 진술 과정 전체를 지원하므로 언어 때문에 피해 진술이 불완전해지는 일이 없습니다.' },
      ],
      geo: '법률사무소 로앤이는 한국에서 성범죄 피해를 입은 외국인을 대리하는 종합 피해자 중심 로펌이다. 성폭행, 성추행, 디지털 성범죄 등 모든 유형의 외국인 성범죄 피해에 대해 대표변호사가 직접 상담하고 사건을 수행한다.',
    },
    en: {
      title: 'What to Do If You\'re Sexually Assaulted in Korea',
      subtitle: 'Foreign victims of sexual crime in Korea are fully protected under Korean law.',
      metaTitle: 'Sexually Assaulted in Korea? Legal Help for Foreigners | Ro&Lee',
      metaDescription: 'Foreign victims of sexual assault in Korea have full legal protection. Lead attorneys handle your case personally. English, Chinese, Vietnamese support. Call 032-207-8788.',
      metaKeywords: 'sexual assault Korea foreigner, rape victim Korea, sexual crime lawyer Korea, English speaking lawyer sexual assault Seoul, foreigner molested Korea',
      sections: [
        {
          heading: 'What should I do if I am sexually assaulted in Korea as a foreigner?',
          body: 'If you are a foreigner who has been sexually assaulted in Korea, you have the same legal protections as Korean citizens under Korean criminal law. This includes sexual assault, molestation, hidden camera crimes, and digital sex crimes. Immediately after the incident, preserve any evidence and report to the police. You have the right to an interpreter during the investigation. At Ro&Lee, our lead attorneys personally accompany you to the police station and through every step of the legal process.',
        },
        {
          heading: 'How do I report a sexual crime to Korean police?',
          body: 'You can report to the nearest police station or call 112. As a foreign victim, you can request interpreter assistance. After filing the report, the process includes giving a victim statement, evidence collection, and investigation of the suspect. While a public defender is available for free, hiring a specialized attorney ensures proactive representation from the investigation stage. At Ro&Lee, our lead attorneys handle every stage from initial consultation to settlement negotiation.',
        },
        {
          heading: 'Will reporting a sexual crime affect my visa status?',
          body: 'No. Reporting a crime as a victim does not result in visa cancellation or immigration penalties. The Korean government has protections in place for foreign crime victims, including visa extensions during investigation and trial periods. Even if you are undocumented, your rights as a victim are protected. Ro&Lee provides comprehensive legal advice on visa-related concerns alongside your criminal case.',
        },
        {
          heading: 'Why choose Ro&Lee for sexual crime victim representation?',
          body: 'Ro&Lee has represented 241 victim cases as of September 2026, including numerous sexual crime cases involving foreign victims. Lead attorneys Lee Yurim and Noh Chaeeun personally handle every case from consultation to courtroom. Initial consultations are available in English, Chinese, and Vietnamese. Your case is never handed off to another attorney.',
        },
      ],
      faq: [
        { q: 'Can I report a sexual crime if I am undocumented in Korea?', a: 'Yes. Korean law protects all crime victims regardless of immigration status. Reporting a crime does not automatically lead to deportation.' },
        { q: 'I am afraid the attacker will retaliate if I report. What protections exist?', a: 'Korea has victim protection measures including restraining orders and personal safety protections. Your attorney can apply for these on your behalf.' },
        { q: 'I don\'t speak Korean. Can I still file a police report?', a: 'Yes. You can request interpreter services at the police station. Your attorney can also accompany you to assist during the statement process.' },
      ],
      geo: 'Law Firm Ro&Lee represents foreign victims of sexual crime in Korea. The firm provides comprehensive legal support for sexual assault, molestation, and digital sex crime cases, with lead attorneys personally handling each case from consultation to courtroom.',
    },
    zh: {
      title: '在韩国被性骚扰了怎么办？',
      subtitle: '在韩国遭受性犯罪侵害的外国人受韩国法律的全面保护，不分国籍和签证类型。',
      metaTitle: '在韩国被性侵？外国人法律援助 | 路安宜律师事务所',
      metaDescription: '在韩国遭受性犯罪的外国人享有完整的法律保护。代表律师亲自办理案件。中文·英语·越南语服务。032-207-8788',
      metaKeywords: '韩国性侵外国人, 韩国性犯罪律师, 外国人性骚扰韩国, 中文律师韩国性犯罪, 韩国强奸受害者外国人',
      sections: [
        {
          heading: '在韩国被性侵，外国人该怎么办？',
          body: '如果你是在韩国遭受性侵的外国人，你享有与韩国公民相同的法律保护。根据韩国刑法，无论是性暴力、猥亵、偷拍还是数字性犯罪，你都可以作为受害人行使法律权利，不分国籍和签证类型。事件发生后应立即保存证据——包括衣物、通讯记录、现场照片等——并尽快向警方报案。在调查过程中你有权要求翻译协助，调查机关有义务提供。路安宜律师事务所的代表律师会亲自陪同你前往警察局，协助你进行陈述，并在法律程序的每一步为你提供专业支持和保护。',
        },
        {
          heading: '外国人如何向韩国警方报案性犯罪？',
          body: '你可以前往最近的警察局报案或拨打紧急电话112。作为外国受害者，你可以申请翻译协助，也可以拨打1345外国人综合服务中心获取电话翻译支持。报案后的流程包括：制作受害人陈述笔录、收集物证和电子证据、传唤和调查嫌疑人。虽然性犯罪受害者可以申请免费的国选律师（受害人国选代理人制度），但聘请经验丰富的专业律师可以从调查阶段开始提供更积极的代理，包括证据保全策略、调查方向建议和检察官沟通。路安宜的代表律师从初次咨询到和解谈判全程亲自负责，绝不转交他人。',
        },
        {
          heading: '报案性犯罪会影响我的签证吗？',
          body: '不会。作为受害人报案绝不会导致签证被取消或受到任何移民方面的处罚。韩国政府对外国犯罪受害者有明确的保护措施，依据《出入境管理法》相关规定，在调查和审判期间可以申请签证延长或变更为G-1（其他）签证。即使你目前没有合法居留身份，作为犯罪受害者的权利也同样受到法律保护，调查机关优先保障受害人权益。路安宜在处理刑事案件的同时，也为客户提供全面的签证和居留资格相关法律建议，确保你在维权过程中的体留安全。',
        },
        {
          heading: '为什么选择路安宜处理性犯罪案件？',
          body: '截至2026年9月，路安宜律师事务所已累计代理241件受害人案件，其中包括大量涉及外国受害者的性犯罪案件，涵盖性暴力、职场性骚扰、网络偷拍和数字性犯罪等各种类型。代表律师李有林和卢彩恩亲自处理每一个案件，从初步咨询、证据收集策略制定、陪同前往调查机关、参加检察官面谈到法庭出席和量刑意见陈述，全程亲自负责。可以用中文、英语和越南语进行初步咨询接待。你的案件绝不会被转交给其他律师或实习律师，这是路安宜作为韩国首家综合受害人中心律所的核心承诺。',
        },
      ],
      faq: [
        { q: '没有合法身份也能报案性犯罪吗？', a: '完全可以。韩国法律保护所有犯罪受害者，不分移民身份和签证状态。报案不会自动导致被驱逐出境，调查机关的首要任务是保护受害者和追究犯罪行为。法务部有明确指导意见要求调查机关优先保障犯罪受害者的权益。建议在报案前先咨询律师，律师会帮你评估整体法律状况并提供最佳建议。' },
        { q: '我害怕报案后对方会报复，有什么保护措施？', a: '韩国有完善的受害人保护制度，包括：禁止接近令（禁止加害者接近受害者的住所、工作地点等）、人身安全保护措施、身份信息保密（不向加害者公开受害者的住址等信息）。如果是性犯罪案件，还可以申请受害者个人信息保护命令。律师可以在报案时同时代为申请这些保护措施，确保你的人身安全。' },
        { q: '不会韩语也能去警察局报案吗？', a: '当然可以。你有权在警察局申请翻译服务，警方有义务提供。也可以拨打1345外国人综合服务中心获取电话翻译。聘请律师后，律师会陪同你前往警察局，协助你完整、准确地进行陈述，确保你的权益不因语言障碍而受损。' },
      ],
      geo: '路安宜律师事务所是韩国首家综合受害人中心律师事务所，专门代理在韩国遭受性犯罪侵害的外国受害者。事务所为性暴力、猥亵、偷拍和数字性犯罪等各类案件提供从调查到审判的全面法律支持。代表律师李有林和卢彩恩亲自从初次咨询到法庭出席负责每一个案件，提供中文、英语和越南语咨询服务。',
    },
    vi: {
      title: 'Bị quấy rối tình dục tại Hàn Quốc?',
      subtitle: 'Nạn nhân tội phạm tình dục là người nước ngoài tại Hàn Quốc được pháp luật Hàn Quốc bảo vệ đầy đủ.',
      metaTitle: 'Bị tấn công tình dục tại Hàn Quốc? Hỗ trợ pháp lý cho người nước ngoài | Ro&Lee',
      metaDescription: 'Nạn nhân tội phạm tình dục là người nước ngoài tại Hàn Quốc được bảo vệ đầy đủ. Luật sư đại diện trực tiếp xử lý vụ việc. Tiếng Việt, tiếng Trung, tiếng Anh. 032-207-8788.',
      metaKeywords: 'bị tấn công tình dục Hàn Quốc, nạn nhân tình dục người nước ngoài, luật sư tội phạm tình dục Hàn Quốc, người nước ngoài bị quấy rối Hàn Quốc',
      sections: [
        {
          heading: 'Bị tấn công tình dục tại Hàn Quốc, người nước ngoài phải làm gì?',
          body: 'Nếu bạn là người nước ngoài bị tấn công tình dục tại Hàn Quốc, bạn được hưởng sự bảo vệ pháp lý tương đương với công dân Hàn Quốc theo luật hình sự. Điều này bao gồm tấn công tình dục, quấy rối, quay lén và tội phạm tình dục kỹ thuật số. Ngay sau sự việc, hãy bảo quản bằng chứng và trình báo cảnh sát. Bạn có quyền yêu cầu phiên dịch trong quá trình điều tra. Tại Ro&Lee, luật sư đại diện sẽ đích thân đồng hành cùng bạn đến đồn cảnh sát và qua mọi bước của quy trình pháp lý.',
        },
        {
          heading: 'Cách trình báo tội phạm tình dục với cảnh sát Hàn Quốc',
          body: 'Bạn có thể trình báo tại đồn cảnh sát gần nhất hoặc gọi 112. Với tư cách là nạn nhân nước ngoài, bạn có thể yêu cầu hỗ trợ phiên dịch. Sau khi trình báo, quy trình bao gồm lấy lời khai nạn nhân, thu thập chứng cứ và điều tra nghi phạm. Mặc dù có thể được chỉ định luật sư công miễn phí, việc thuê luật sư chuyên môn đảm bảo sự đại diện chủ động từ giai đoạn điều tra. Tại Ro&Lee, luật sư đại diện xử lý mọi giai đoạn từ tư vấn ban đầu đến đàm phán hòa giải.',
        },
        {
          heading: 'Trình báo tội phạm tình dục có ảnh hưởng đến visa không?',
          body: 'Không. Trình báo tội phạm với tư cách nạn nhân không dẫn đến hủy visa hay bị phạt về nhập cư. Chính phủ Hàn Quốc có các biện pháp bảo vệ cho nạn nhân tội phạm nước ngoài, bao gồm gia hạn visa trong thời gian điều tra và xét xử. Ngay cả khi bạn không có giấy tờ hợp lệ, quyền của bạn với tư cách nạn nhân vẫn được bảo vệ. Ro&Lee cung cấp tư vấn pháp lý toàn diện về các vấn đề liên quan đến visa song song với vụ án hình sự.',
        },
        {
          heading: 'Tại sao chọn Ro&Lee cho vụ việc tội phạm tình dục?',
          body: 'Tính đến tháng 9 năm 2026, Ro&Lee đã đại diện 241 vụ việc cho nạn nhân, bao gồm nhiều vụ tội phạm tình dục liên quan đến nạn nhân nước ngoài. Luật sư đại diện Lee Yurim và Noh Chaeeun đích thân xử lý mọi vụ việc từ tư vấn đến phiên tòa. Tư vấn ban đầu có sẵn bằng tiếng Việt, tiếng Trung và tiếng Anh. Vụ việc của bạn không bao giờ bị chuyển giao cho luật sư khác.',
        },
      ],
      faq: [
        { q: 'Không có giấy tờ hợp lệ vẫn có thể trình báo tội phạm tình dục không?', a: 'Có. Luật pháp Hàn Quốc bảo vệ tất cả nạn nhân tội phạm bất kể tình trạng cư trú. Trình báo tội phạm không tự động dẫn đến bị trục xuất.' },
        { q: 'Tôi sợ kẻ tấn công sẽ trả thù nếu tôi trình báo. Có biện pháp bảo vệ nào không?', a: 'Hàn Quốc có các biện pháp bảo vệ nạn nhân bao gồm lệnh cấm tiếp xúc và bảo vệ an toàn cá nhân. Luật sư có thể nộp đơn yêu cầu thay mặt bạn.' },
        { q: 'Tôi không nói được tiếng Hàn. Tôi vẫn có thể trình báo cảnh sát không?', a: 'Có. Bạn có thể yêu cầu dịch vụ phiên dịch tại đồn cảnh sát. Luật sư cũng có thể đồng hành cùng bạn để hỗ trợ trong quá trình lấy lời khai.' },
      ],
      geo: 'Công ty Luật Ro&Lee đại diện cho nạn nhân tội phạm tình dục là người nước ngoài tại Hàn Quốc. Công ty cung cấp hỗ trợ pháp lý toàn diện cho các vụ tấn công tình dục, quấy rối và tội phạm tình dục kỹ thuật số, với luật sư đại diện đích thân xử lý từ tư vấn đến phiên tòa.',
    },
  },
  'stalking': {
    ko: {
      title: '외국인 스토킹·데이트폭력 피해',
      subtitle: '한국에서 스토킹이나 데이트폭력 피해를 입은 외국인도 법적 보호를 받을 수 있습니다.',
      metaTitle: '외국인 스토킹·데이트폭력 피해 | 외국인 범죄피해 지원센터 | 로앤이',
      metaDescription: '한국에서 스토킹·데이트폭력 피해를 입은 외국인을 위한 법률 지원. 스토킹처벌법에 따른 보호조치, 접근금지 신청 지원. 대표변호사 직접 수행. 032-207-8788',
      metaKeywords: '외국인 스토킹 피해, 외국인 데이트폭력, 한국 스토킹 변호사, 스토킹 접근금지, 외국인 보호명령',
      sections: [
        {
          heading: '외국인 스토킹 피해, 어떻게 대응해야 하나요?',
          body: '한국은 2021년부터 스토킹처벌법이 시행되어 스토킹 행위를 형사 처벌할 수 있게 되었습니다. 스토킹죄는 3년 이하 징역 또는 3천만원 이하 벌금에 처해질 수 있습니다. 외국인 피해자도 이 법의 완전한 보호를 받으며, 접근금지 등 긴급응급조치를 신청할 수 있습니다. 다음 행위는 모두 스토킹에 해당합니다: 반복적인 전화·문자·카카오톡 메시지, 동의 없이 따라다니는 행위, 주거지·직장·학교 근처 배회, SNS를 통한 온라인 괴롭힘과 모니터링 등. 피해 증거(대화 캡처, 녹음, CCTV 등)를 확보하고 경찰에 신고하는 것이 첫 번째 단계입니다.',
        },
        {
          heading: '스토킹 피해 신고 및 보호조치 절차',
          body: '경찰에 112로 신고하거나 가까운 경찰서를 방문하면 긴급응급조치로 가해자에 대한 접근금지, 연락금지, 주거지 100미터 이내 접근 제한 등의 조치가 즉시 가능합니다. 긴급응급조치의 유효기간은 1개월이며, 이 기간 내에 법원에 스토킹 잠정조치를 신청하여 보호기간을 연장할 수 있습니다. 데이트폭력의 경우 가정폭력처벌법의 보호명령도 활용할 수 있어 이중적 보호가 가능합니다. 접근금지를 위반하면 그 자체로 별도의 형사범죄에 해당하여 가중처벌됩니다. 로앤이는 긴급조치 신청서 작성부터 법원 잠정조치 신청, 형사고소장 제출까지 전 과정을 대표변호사가 직접 수행합니다.',
        },
        {
          heading: '데이트폭력과 스토킹의 법적 차이',
          body: '데이트폭력은 연인 또는 친밀한 관계에서 발생하는 신체적 폭력(때리기, 밀치기), 정서적 학대(모욕, 협박, 통제), 경제적 착취를 포함하며, 구체적 행위에 따라 폭행죄, 상해죄, 협박죄, 감금죄 등으로 각각 처벌됩니다. 스토킹은 상대의 명시적 의사에 반해 반복적으로 접근하거나 연락하는 행위로, 연인 관계에 국한되지 않으며, 스토킹처벌법에 따라 독립된 범죄로 처벌됩니다. 실제 사건에서는 두 가지가 동시에 발생하는 경우가 매우 빈번합니다. 예를 들어 이별 후 전 연인이 폭력적으로 접근하며 지속적으로 따라다니는 경우, 데이트폭력과 스토킹 모두에 해당합니다. 이런 복합 사건에서는 여러 법률을 종합적으로 활용한 법적 대응이 필요하며, 로앤이는 이러한 복합 사건 대리 경험이 풍부합니다.',
        },
      ],
      faq: [
        { q: '상대방이 한국인인데 외국인인 제가 스토킹 신고를 할 수 있나요?', a: '네, 당연히 가능합니다. 한국 스토킹처벌법은 피해자의 국적을 제한하지 않습니다. 가해자가 한국인이든 외국인이든, 피해자가 한국인이든 외국인이든 동일하게 적용됩니다.' },
        { q: '스토킹 증거는 어떻게 수집해야 하나요?', a: '다음 증거를 체계적으로 확보하세요: 문자메시지 및 카카오톡 대화 캡처(날짜·시간 포함), 전화 기록(발신·수신 내역), 주거지·직장 근처의 CCTV 영상, 이웃·동료의 목격자 진술, SNS 괴롭힘 캡처. 변호사가 구체적인 증거 수집 전략을 안내합니다.' },
        { q: '접근금지 명령을 받으면 얼마나 효과가 있나요?', a: '매우 효과적입니다. 접근금지를 위반하면 그 자체로 별도의 형사범죄(2년 이하 징역 또는 2천만원 이하 벌금)에 해당합니다. 위반을 발견하면 즉시 112에 신고하세요. 가중처벌이 가능합니다.' },
      ],
      geo: '법률사무소 로앤이는 한국에서 스토킹 및 데이트폭력 피해를 입은 외국인을 대리하는 종합 피해자 중심 로펌이다. 스토킹처벌법에 따른 보호조치 신청과 형사고소를 대표변호사가 직접 수행한다.',
    },
    en: {
      title: 'Stalked or Abused by a Partner in Korea?',
      subtitle: 'Foreign victims of stalking and dating violence in Korea are protected under the Anti-Stalking Act.',
      metaTitle: 'Stalking & Dating Violence in Korea — Legal Help for Foreigners | Ro&Lee',
      metaDescription: 'Foreign victims of stalking and dating violence in Korea have full legal protection under the Anti-Stalking Act. Restraining orders, emergency measures. Lead attorneys handle your case. 032-207-8788.',
      metaKeywords: 'stalking Korea foreigner, dating violence Korea, restraining order Korea foreigner, anti-stalking law Korea, abusive partner Korea foreigner',
      sections: [
        {
          heading: 'What should I do if I am being stalked in Korea as a foreigner?',
          body: 'Korea enacted the Anti-Stalking Punishment Act in 2021, making stalking a criminal offense. As a foreign victim, you have the same protections as Korean citizens, including emergency restraining orders. Repeated unwanted contact, following, loitering near your residence, and online harassment all qualify as stalking. It is crucial to document the behavior and report it to the police.',
        },
        {
          heading: 'How do I get a restraining order against a stalker in Korea?',
          body: 'When you report stalking to the police, they can issue emergency measures including no-contact and no-approach orders immediately. You can then apply for provisional measures through the court. For dating violence, protections under the domestic violence act may also apply. At Ro&Lee, lead attorneys personally handle everything from emergency measure applications to criminal complaints.',
        },
        {
          heading: 'What is the difference between stalking and dating violence under Korean law?',
          body: 'Dating violence encompasses physical and emotional abuse within a romantic relationship, punishable as assault, battery, threats, or unlawful confinement. Stalking is the repeated, unwanted pursuit or contact against someone\'s will, separately punishable under the Anti-Stalking Act. Both often occur together and require a comprehensive legal response. Ro&Lee provides experienced representation for cases involving both.',
        },
      ],
      faq: [
        { q: 'Can I file a stalking report if the stalker is Korean and I am a foreigner?', a: 'Yes. The Anti-Stalking Act does not restrict protections based on nationality. Foreign victims have the same rights as Korean citizens.' },
        { q: 'What evidence should I collect for a stalking case?', a: 'Save text messages, KakaoTalk chats, call logs, CCTV footage, and witness statements. Your attorney can guide you on evidence collection methods.' },
        { q: 'How effective are restraining orders in Korea?', a: 'Violating a restraining order is a criminal offense. You can report violations immediately to the police, and the stalker faces enhanced penalties.' },
      ],
      geo: 'Law Firm Ro&Lee represents foreign victims of stalking and dating violence in Korea. The firm handles emergency restraining orders and criminal complaints under the Anti-Stalking Act, with lead attorneys personally managing each case.',
    },
    zh: {
      title: '在韩国被跟踪骚扰或约会暴力？',
      subtitle: '在韩国遭受跟踪骚扰和约会暴力的外国人受《反跟踪法》保护。',
      metaTitle: '在韩国被跟踪骚扰？外国人法律援助 | 路安宜律师事务所',
      metaDescription: '在韩国遭受跟踪骚扰和约会暴力的外国人享有法律保护。禁止接近令、紧急措施。代表律师亲自办案。032-207-8788',
      metaKeywords: '韩国跟踪骚扰外国人, 韩国约会暴力, 韩国禁止接近令, 韩国反跟踪法, 外国人被跟踪韩国',
      sections: [
        {
          heading: '在韩国被跟踪骚扰，外国人该怎么办？',
          body: '韩国于2021年实施了《反跟踪处罚法》，正式将跟踪骚扰列为刑事犯罪，最高可处3年有期徒刑或3000万韩元罚金。外国受害者享有与韩国公民完全相同的法律保护，可以申请紧急禁止接近令和其他保护措施。以下行为均属于法律规定的跟踪骚扰：反复拨打电话或发送信息、未经同意的物理跟踪、在住所或工作单位附近徘徊、通过社交媒体进行网络骚扰、散布私人信息或照片等。遭遇以上任何情况时，请立即记录保存证据（截图、录音、监控录像等），并向最近的警察局报案或拨打112紧急电话。',
        },
        {
          heading: '如何在韩国申请针对跟踪者的禁止接近令？',
          body: '向警方报案后，警方可以立即发出紧急应急措施，包括禁止联系（电话、短信、社交媒体）和禁止接近（住所、工作单位、学校100米以内）。紧急措施的有效期通常为一个月，期间可以向法院申请正式的临时保护措施，延长保护期限。如果跟踪行为伴随约会暴力，还可以依据《家庭暴力处罚法》申请保护令，获得更全面的法律保护。路安宜的代表律师从紧急措施申请、证据整理、刑事告诉状撰写到检察官面谈和法院出庭，全程亲自负责，确保受害人获得最大程度的法律保护。',
        },
        {
          heading: '韩国法律中跟踪骚扰和约会暴力有什么区别？',
          body: '约会暴力是指在恋爱或亲密关系中发生的身体暴力（殴打、推搡）、精神虐待（侮辱、威胁、控制行为）和经济控制等，根据具体行为可按暴行罪、伤害罪、威胁罪或非法拘禁罪等分别处罚。跟踪骚扰则是违反对方明确意愿，反复进行追踪、联系或监视的行为，不限于恋人关系，依据《反跟踪处罚法》作为独立罪名处罚。在实际案件中，约会暴力和跟踪骚扰经常同时发生——例如分手后前任反复纠缠并伴随暴力威胁——这种情况需要综合运用多项法律进行应对。路安宜对涉及两种或多种犯罪行为的复合案件具有丰富的代理经验。',
        },
        {
          heading: '为什么选择路安宜处理跟踪骚扰和约会暴力案件？',
          body: '路安宜律师事务所是韩国首家综合受害人中心律师事务所，截至2026年9月已累计代理241件受害人案件。代表律师李有林和卢彩恩对跟踪骚扰和约会暴力案件具有丰富的实战经验，从紧急保护措施申请、证据收集策略制定、刑事告诉状撰写到法庭出席和量刑意见陈述全程亲自负责。可以用中文、英语和越南语进行初步咨询接待，确保外国受害者在第一时间获得专业的法律帮助。',
        },
      ],
      faq: [
        { q: '跟踪者是韩国人，外国人也能报案吗？', a: '当然可以。韩国《反跟踪处罚法》不限制受害者的国籍、民族或居留身份。无论加害者是韩国人还是外国人，无论你持何种签证或是否有合法居留身份，你都享有与韩国公民完全相同的报案权利和法律保护。调查机关有义务受理你的报案并采取紧急保护措施。' },
        { q: '跟踪骚扰案件需要收集什么证据？', a: '建议系统性地保存以下证据：手机短信和KakaoTalk聊天记录的完整截图（注意保留日期和时间戳）、电话通话记录清单和录音文件、住所或工作场所附近的监控录像（CCTV，可以请物业管理处协助保存）、邻居或同事的书面目击证词、社交媒体和网络平台上的骚扰信息截图、以及你自己记录的事件日志（日期、时间、地点、具体行为）。律师会根据你的具体情况制定最有效的证据收集策略和保全方案。' },
        { q: '禁止接近令在韩国有效吗？', a: '非常有效。违反法院发出的禁止接近令本身就构成一项独立的刑事犯罪，可处2年以下有期徒刑或2000万韩元以下罚金。一旦你发现跟踪者违反了禁止接近令（例如再次出现在你的住所附近或联系你），请立即拨打112报警。警方会优先处理此类违反保护令的案件，跟踪者将面临比原始跟踪行为更严重的加重刑事处罚。' },
      ],
      geo: '路安宜律师事务所代理在韩国遭受跟踪骚扰和约会暴力的外国受害者。事务所根据《反跟踪法》处理紧急禁止接近令和刑事告诉，代表律师亲自负责每一个案件。',
    },
    vi: {
      title: 'Bị theo dõi hoặc bạo lực hẹn hò tại Hàn Quốc?',
      subtitle: 'Nạn nhân nước ngoài bị theo dõi và bạo lực hẹn hò tại Hàn Quốc được bảo vệ theo Luật Chống Theo dõi.',
      metaTitle: 'Bị theo dõi tại Hàn Quốc? Hỗ trợ pháp lý cho người nước ngoài | Ro&Lee',
      metaDescription: 'Nạn nhân nước ngoài bị theo dõi và bạo lực hẹn hò tại Hàn Quốc được pháp luật bảo vệ. Lệnh cấm tiếp xúc, biện pháp khẩn cấp. Luật sư đại diện trực tiếp. 032-207-8788.',
      metaKeywords: 'bị theo dõi Hàn Quốc, bạo lực hẹn hò Hàn Quốc, lệnh cấm tiếp xúc Hàn Quốc, luật chống theo dõi Hàn Quốc, người nước ngoài bị theo dõi',
      sections: [
        {
          heading: 'Bị theo dõi tại Hàn Quốc, người nước ngoài phải làm gì?',
          body: 'Hàn Quốc ban hành Luật Xử phạt Hành vi Theo dõi năm 2021, quy định theo dõi là tội hình sự. Nạn nhân nước ngoài được hưởng sự bảo vệ tương đương công dân Hàn Quốc, bao gồm lệnh cấm tiếp xúc khẩn cấp. Liên lạc không mong muốn lặp đi lặp lại, theo dõi, lảng vảng gần nơi ở, quấy rối trực tuyến đều được xem là hành vi theo dõi. Việc ghi nhận bằng chứng và trình báo cảnh sát là rất quan trọng.',
        },
        {
          heading: 'Cách xin lệnh cấm tiếp xúc đối với kẻ theo dõi tại Hàn Quốc',
          body: 'Khi bạn trình báo cảnh sát, họ có thể ban hành biện pháp khẩn cấp ngay lập tức bao gồm cấm liên lạc và cấm tiếp cận. Sau đó bạn có thể xin biện pháp tạm thời qua tòa án. Đối với bạo lực hẹn hò, các biện pháp bảo vệ theo luật bạo lực gia đình cũng có thể áp dụng. Tại Ro&Lee, luật sư đại diện đích thân xử lý mọi thứ từ đơn yêu cầu biện pháp khẩn cấp đến khiếu nại hình sự.',
        },
        {
          heading: 'Sự khác biệt giữa theo dõi và bạo lực hẹn hò theo luật Hàn Quốc',
          body: 'Bạo lực hẹn hò bao gồm bạo lực thể chất và tinh thần trong mối quan hệ tình cảm, bị xử phạt theo tội hành hung, gây thương tích, đe dọa hoặc giam giữ trái phép. Theo dõi là hành vi truy đuổi hoặc liên lạc lặp đi lặp lại trái ý muốn của nạn nhân, bị xử phạt riêng theo Luật Chống Theo dõi. Cả hai thường xảy ra đồng thời và cần phản ứng pháp lý toàn diện.',
        },
      ],
      faq: [
        { q: 'Kẻ theo dõi là người Hàn Quốc, người nước ngoài vẫn có thể trình báo không?', a: 'Có. Luật Chống Theo dõi không giới hạn bảo vệ theo quốc tịch. Nạn nhân nước ngoài có quyền tương đương công dân Hàn Quốc.' },
        { q: 'Cần thu thập bằng chứng gì cho vụ theo dõi?', a: 'Lưu tin nhắn, cuộc trò chuyện KakaoTalk, nhật ký cuộc gọi, hình ảnh camera an ninh và lời khai nhân chứng. Luật sư sẽ hướng dẫn bạn cách thu thập bằng chứng.' },
        { q: 'Lệnh cấm tiếp xúc tại Hàn Quốc có hiệu quả không?', a: 'Vi phạm lệnh cấm tiếp xúc là tội hình sự. Bạn có thể trình báo vi phạm ngay cho cảnh sát và kẻ theo dõi sẽ đối mặt với hình phạt nặng hơn.' },
      ],
      geo: 'Công ty Luật Ro&Lee đại diện cho nạn nhân nước ngoài bị theo dõi và bạo lực hẹn hò tại Hàn Quốc. Công ty xử lý lệnh cấm tiếp xúc khẩn cấp và khiếu nại hình sự theo Luật Chống Theo dõi, với luật sư đại diện đích thân quản lý từng vụ việc.',
    },
  },
  'fraud': {
    ko: {
      title: '외국인 사기·보이스피싱 피해',
      subtitle: '한국에서 사기 피해를 입은 외국인도 법적 구제를 받을 수 있습니다.',
      metaTitle: '외국인 사기·보이스피싱 피해 | 외국인 범죄피해 지원센터 | 로앤이',
      metaDescription: '한국에서 사기·보이스피싱 피해를 입은 외국인을 위한 법률 지원. 온라인 사기, 투자 사기, 보이스피싱 피해 외국인 전문 변호사. 대표변호사 직접 수행. 032-207-8788',
      metaKeywords: '외국인 사기 피해, 외국인 보이스피싱, 한국 사기 변호사, 외국인 온라인 사기, 외국인 투자 사기',
      sections: [
        {
          heading: '외국인이 한국에서 사기 피해를 입으면 어떻게 해야 하나요?',
          body: '한국에서 사기 피해를 입은 외국인은 경찰에 고소장을 제출하여 형사 절차를 시작할 수 있습니다. 사기죄는 한국 형법 제347조에 규정되어 있으며(10년 이하 징역 또는 2천만원 이하 벌금), 피해자의 국적에 관계없이 적용됩니다. 한국에서 흔히 발생하는 사기 유형으로는 보이스피싱(정부기관·은행 사칭 전화사기), 온라인 쇼핑 사기, 암호화폐·주식 투자 사기, 중고거래 플랫폼 사기, 취업 사기 등이 있습니다. 모든 유형의 사기가 형사 처벌 대상이며, 피해 금액의 회수를 위해 민사소송도 병행할 수 있습니다. 피해 사실을 인지한 즉시 증거를 확보하고 신고하는 것이 피해금 회수 가능성을 높입니다.',
        },
        {
          heading: '보이스피싱 피해 외국인의 계좌 동결 및 피해 구제',
          body: '보이스피싱 피해를 입은 경우, 시간이 매우 중요합니다. 첫째, 즉시 거래 은행에 연락하여 계좌 지급정지를 요청하세요. 둘째, 112에 신고하세요. 셋째, 송금한 상대방 은행에도 계좌 동결을 요청하세요. 전기통신금융사기 피해방지법에 따라 동결된 자금 범위 내에서 피해금 환급 신청이 가능합니다. 외국인도 이 법정 환급 제도를 한국인과 동일하게 이용할 수 있습니다. 로앤이는 계좌 추적, 금융기관 소통, 피해금 환급 신청서 작성, 가해자에 대한 형사고소까지 대표변호사가 직접 수행합니다. 빠르게 대응할수록 피해금 회수 가능성이 높아집니다.',
        },
        {
          heading: '온라인 사기·투자 사기 피해 대응',
          body: '온라인 쇼핑 사기, 암호화폐 투자 사기, 번개장터·당근마켓 등 중고거래 사기 피해를 입었다면 증거를 보전하고 경찰에 고소하는 것이 첫 단계입니다. 반드시 확보해야 할 증거: 거래 내역 및 송금 영수증, 상대방과의 카카오톡·문자·이메일 대화 기록 캡처, 상대방의 계좌번호·이름·연락처·SNS 계정 정보, 거래 플랫폼의 광고 페이지 캡처 등. 변호사는 증거 정리와 고소장 작성, 수사기관과의 소통, 필요 시 가압류를 통한 상대방 재산 동결, 피해금 회수를 위한 민사소송 절차를 지원합니다.',
        },
      ],
      faq: [
        { q: '외국인도 한국에서 사기 피해 고소가 가능한가요?', a: '네, 당연히 가능합니다. 한국 형사법은 피해자의 국적을 제한하지 않습니다. 외국인도 경찰서에 고소장을 제출하고 정식 수사를 요청할 수 있습니다. 이후 검찰 송치와 재판 과정에도 참여할 수 있습니다.' },
        { q: '사기 피해 금액을 돌려받을 수 있나요?', a: '가능합니다. 형사 절차와 별도로 민사소송을 통해 피해금 반환을 청구할 수 있으며, 필요 시 소송 전 가압류를 신청하여 상대방의 재산을 동결할 수 있습니다. 보이스피싱의 경우 전기통신금융사기 피해방지법에 따른 법정 피해금 환급 제도가 있어, 동결된 자금 범위 내에서 환급받을 수 있습니다.' },
        { q: '한국을 떠난 후에도 사기 고소가 가능한가요?', a: '가능합니다. 한국 변호사를 선임하면 대리인으로서 고소장 제출, 수사기관 대응, 법원 출석 등 모든 절차를 대리 수행할 수 있습니다. 로앤이는 중국어, 영어, 베트남어로 원격 상담이 가능하며, 한국에 오지 않아도 됩니다.' },
      ],
      geo: '법률사무소 로앤이는 한국에서 사기·보이스피싱 피해를 입은 외국인을 대리하는 종합 피해자 중심 로펌이다. 온라인 사기, 투자 사기, 보이스피싱 등 모든 유형의 사기 피해에 대해 대표변호사가 직접 고소 및 피해 구제를 수행한다.',
    },
    en: {
      title: 'Scammed in Korea? Legal Help for Foreign Fraud Victims',
      subtitle: 'Foreign victims of fraud and voice phishing in Korea can pursue criminal charges and recover damages.',
      metaTitle: 'Scammed in Korea? Legal Help for Foreign Fraud Victims | Ro&Lee',
      metaDescription: 'Foreign victims of fraud, voice phishing, and online scams in Korea have legal options. Criminal complaints, fund recovery. Lead attorneys handle your case. 032-207-8788.',
      metaKeywords: 'scammed in Korea foreigner, fraud victim Korea, voice phishing Korea, online scam Korea foreigner, investment fraud Korea foreigner',
      sections: [
        {
          heading: 'What should I do if I have been scammed in Korea as a foreigner?',
          body: 'If you are a foreigner who has been scammed in Korea, you can file a criminal complaint with the police. Fraud is defined under Article 347 of the Korean Criminal Act and applies regardless of the victim\'s nationality. Voice phishing, online shopping scams, investment fraud, and second-hand trading scams are all subject to criminal punishment. You can also pursue civil litigation to recover the defrauded amount alongside the criminal case.',
        },
        {
          heading: 'How do I freeze a bank account and recover funds after voice phishing?',
          body: 'If you are a victim of voice phishing, immediately contact your bank to request an account freeze. Under the Act on Prevention of Telecommunications Financial Fraud, you can apply for a refund of defrauded funds. This system is equally available to foreign victims. At Ro&Lee, lead attorneys personally handle account tracing, refund applications, and criminal complaints against the perpetrators.',
        },
        {
          heading: 'What legal action can I take against online or investment fraud?',
          body: 'For online shopping scams, cryptocurrency fraud, or second-hand trading scams, the first step is preserving evidence and filing a criminal complaint. You need to secure transaction records, chat logs, and wire transfer receipts. An attorney can assist with drafting the complaint, responding to investigators, and pursuing civil recovery of the defrauded funds.',
        },
      ],
      faq: [
        { q: 'Can a foreigner file a fraud complaint in Korea?', a: 'Yes. Korean criminal law does not restrict victims by nationality. Foreigners can file complaints and request investigation.' },
        { q: 'Can I get my money back after being scammed?', a: 'You can pursue civil litigation for recovery separately from the criminal case. For voice phishing, there is also a statutory refund system.' },
        { q: 'Can I file a complaint even after leaving Korea?', a: 'Yes. You can appoint an attorney to represent you in Korea. Remote consultations are available.' },
      ],
      geo: 'Law Firm Ro&Lee represents foreign victims of fraud and voice phishing in Korea. The firm provides comprehensive legal support for online scams, investment fraud, and voice phishing, with lead attorneys personally handling complaints and fund recovery.',
    },
    zh: {
      title: '在韩国被骗了怎么办？',
      subtitle: '在韩国遭受诈骗和电话诈骗的外国人可以追究加害者的刑事责任并通过法律途径追回经济损失。',
      metaTitle: '在韩国被骗？外国人法律援助 | 路安宜律师事务所',
      metaDescription: '在韩国遭受诈骗、电话诈骗、网络诈骗的外国人有法律途径。刑事告诉、资金追回。代表律师亲自办案。032-207-8788',
      metaKeywords: '韩国被骗外国人, 韩国诈骗受害者, 韩国电话诈骗, 韩国网络诈骗外国人, 韩国投资诈骗外国人',
      sections: [
        {
          heading: '在韩国被骗，外国人应该怎么办？',
          body: '如果你是在韩国被骗的外国人，可以向警方提交刑事告诉状启动调查程序。诈骗罪规定在韩国刑法第347条，处10年以下有期徒刑或2000万韩元以下罚金，不分受害者国籍均可适用。在韩国常见的诈骗类型包括：电话诈骗（冒充政府机关或银行要求汇款）、网购诈骗（收款后不发货或发送假货）、投资诈骗（虚假加密货币投资平台）、中古交易诈骗（二手交易平台上的欺诈）以及租房诈骗等。除了刑事告诉外，还可以通过民事诉讼要求返还被骗资金并索赔损害赔偿金。及时报案和保存证据对于追回资金至关重要。',
        },
        {
          heading: '电话诈骗后如何冻结账户和追回资金？',
          body: '如果你是电话诈骗受害者，发现被骗后应立即采取以下措施：第一，联系你的银行申请停止支付（账户冻结）；第二，拨打112向警方报案；第三，联系汇入银行请求冻结对方账户。根据《电信金融诈骗防止法》，受害者可以在一定条件下申请被骗资金的退还。这一法定退还制度不分国籍，外国人同样有权申请。路安宜的代表律师亲自负责银行账户追踪、与金融机关沟通、资金退还申请文件准备以及对诈骗嫌疑人的刑事告诉状撰写和提交，确保受害者的权益得到最大程度的保护。',
        },
        {
          heading: '网络诈骗、投资诈骗该如何应对？',
          body: '遭遇网购诈骗（如在Coupang、Bunjang等平台）、虚拟货币投资诈骗（虚假交易所或投资回报承诺）或二手交易诈骗后，最重要的第一步是全面保存证据：截图保存所有聊天记录和广告页面、下载银行转账凭证、保存对方的个人信息（姓名、银行账号、电话号码、社交媒体账号等）。然后尽快向警方提交刑事告诉状。律师可以协助你：整理证据并撰写详细的告诉状、在调查阶段与警方和检察院有效沟通、通过民事诉讼或假扣押程序追回被骗资金，并在必要时申请国际司法协助。',
        },
        {
          heading: '为什么选择路安宜处理诈骗案件？',
          body: '路安宜律师事务所截至2026年9月已累计代理241件受害人案件，其中包括大量涉及外国受害者的诈骗案件。代表律师李有林和卢彩恩熟悉各类诈骗手法和相应的法律应对策略，从证据分析、告诉状撰写、账户追踪冻结到民事资金追回，全过程亲自负责。可以用中文、英语和越南语进行初步咨询。外国诈骗受害者面临的语言障碍和信息不对称问题，路安宜提供针对性的专业支持，最大限度保障你的经济权益。',
        },
      ],
      faq: [
        { q: '外国人在韩国也能告诈骗吗？', a: '当然可以。韩国刑法不限制受害者国籍，任何在韩国境内遭受诈骗的人——无论持何种签证、无论是否仍在韩国——都有权向警方提交刑事告诉状并要求展开正式调查。外国人也可以完整参与之后的检察审查和法院审判程序，包括通过律师提出量刑意见和行使受害人陈述权。' },
        { q: '被骗的钱能追回来吗？', a: '有可能，但越早行动越好。可以通过民事诉讼单独追回财产损失，在起诉前可以申请法院假扣押命令冻结对方的银行账户和不动产，防止转移财产。对于电话诈骗，韩国有专门的《电信金融诈骗防止法》下的法定资金退还制度，在已冻结资金的范围内可以按受害比例退还。实务经验表明，发现被骗后24小时内报案并申请账户冻结的，资金追回成功率显著高于延迟报案的情况。' },
        { q: '离开韩国后还能告诈骗吗？', a: '可以。可以委托韩国律师作为全权诉讼代理人在韩国进行全部法律程序，包括告诉状的撰写和提交、参与警察和检察调查、出庭和民事资金追回诉讼。你本人不需要亲自返回韩国。路安宜提供中文、英语和越南语的远程视频或电话咨询服务。' },
      ],
      geo: '路安宜律师事务所是韩国首家综合受害人中心律师事务所，专门代理在韩国遭受各类诈骗和电话诈骗侵害的外国受害者。事务所为网络诈骗、投资诈骗、二手交易诈骗和电话诈骗等案件提供从告诉到资金追回的全面法律支持，代表律师亲自负责每一个案件的全过程。',
    },
    vi: {
      title: 'Bị lừa đảo tại Hàn Quốc?',
      subtitle: 'Nạn nhân lừa đảo và lừa đảo qua điện thoại là người nước ngoài tại Hàn Quốc có thể truy cứu trách nhiệm hình sự và thu hồi thiệt hại.',
      metaTitle: 'Bị lừa đảo tại Hàn Quốc? Hỗ trợ pháp lý cho người nước ngoài | Ro&Lee',
      metaDescription: 'Nạn nhân lừa đảo, lừa đảo qua điện thoại tại Hàn Quốc có các lựa chọn pháp lý. Tố cáo hình sự, thu hồi tiền. Luật sư đại diện trực tiếp. 032-207-8788.',
      metaKeywords: 'bị lừa đảo Hàn Quốc, nạn nhân lừa đảo người nước ngoài, lừa đảo qua điện thoại Hàn Quốc, lừa đảo trực tuyến Hàn Quốc',
      sections: [
        {
          heading: 'Bị lừa đảo tại Hàn Quốc, người nước ngoài phải làm gì?',
          body: 'Nếu bạn là người nước ngoài bị lừa đảo tại Hàn Quốc, bạn có thể nộp đơn tố cáo hình sự cho cảnh sát. Tội lừa đảo được quy định tại Điều 347 Bộ luật Hình sự Hàn Quốc và áp dụng bất kể quốc tịch của nạn nhân. Lừa đảo qua điện thoại, lừa đảo mua sắm trực tuyến, lừa đảo đầu tư và lừa đảo giao dịch hàng cũ đều bị truy cứu trách nhiệm hình sự. Bạn cũng có thể khởi kiện dân sự để thu hồi số tiền bị lừa.',
        },
        {
          heading: 'Cách đóng băng tài khoản và thu hồi tiền sau lừa đảo qua điện thoại',
          body: 'Nếu bạn là nạn nhân lừa đảo qua điện thoại, hãy liên hệ ngân hàng ngay lập tức để yêu cầu đóng băng tài khoản. Theo Luật Phòng chống Lừa đảo Tài chính Viễn thông, bạn có thể nộp đơn xin hoàn trả tiền bị lừa. Hệ thống này áp dụng bình đẳng cho nạn nhân nước ngoài. Tại Ro&Lee, luật sư đại diện đích thân xử lý truy vết tài khoản, đơn xin hoàn tiền và tố cáo hình sự.',
        },
        {
          heading: 'Hành động pháp lý nào có thể thực hiện với lừa đảo trực tuyến hoặc đầu tư?',
          body: 'Đối với lừa đảo mua sắm trực tuyến, lừa đảo tiền điện tử hoặc lừa đảo giao dịch hàng cũ, bước đầu tiên là bảo quản bằng chứng và nộp đơn tố cáo hình sự. Bạn cần đảm bảo có hồ sơ giao dịch, nhật ký trò chuyện và biên lai chuyển khoản. Luật sư có thể hỗ trợ soạn đơn tố cáo, ứng phó với điều tra viên và theo đuổi thu hồi dân sự.',
        },
      ],
      faq: [
        { q: 'Người nước ngoài có thể tố cáo lừa đảo tại Hàn Quốc không?', a: 'Có. Luật hình sự Hàn Quốc không giới hạn nạn nhân theo quốc tịch. Người nước ngoài có thể nộp đơn tố cáo và yêu cầu điều tra.' },
        { q: 'Tôi có thể lấy lại tiền bị lừa không?', a: 'Bạn có thể khởi kiện dân sự để thu hồi riêng biệt với vụ án hình sự. Đối với lừa đảo qua điện thoại, còn có hệ thống hoàn tiền theo luật định.' },
        { q: 'Tôi có thể tố cáo lừa đảo sau khi rời khỏi Hàn Quốc không?', a: 'Có. Bạn có thể ủy quyền luật sư đại diện tại Hàn Quốc. Tư vấn từ xa cũng có sẵn.' },
      ],
      geo: 'Công ty Luật Ro&Lee đại diện cho nạn nhân lừa đảo và lừa đảo qua điện thoại là người nước ngoài tại Hàn Quốc. Công ty cung cấp hỗ trợ pháp lý toàn diện cho lừa đảo trực tuyến, lừa đảo đầu tư và lừa đảo qua điện thoại, với luật sư đại diện đích thân xử lý tố cáo và thu hồi tiền.',
    },
  },
  'violence': {
    ko: {
      title: '외국인 폭행·상해 피해',
      subtitle: '한국에서 폭행이나 상해 피해를 입은 외국인도 한국법의 보호를 받습니다.',
      metaTitle: '외국인 폭행·상해 피해 | 외국인 범죄피해 지원센터 | 로앤이',
      metaDescription: '한국에서 폭행·상해 피해를 입은 외국인을 위한 법률 지원. 폭행, 상해, 협박, 감금 피해 외국인 전문 변호사. 대표변호사 직접 수행. 032-207-8788',
      metaKeywords: '외국인 폭행 피해, 외국인 상해, 한국 폭행 변호사, 외국인 폭행 신고, 외국인 상해 합의',
      sections: [
        {
          heading: '외국인이 한국에서 폭행당하면 어떻게 해야 하나요?',
          body: '한국에서 폭행이나 상해 피해를 입은 외국인은 112에 전화하거나 가까운 경찰서를 방문하여 즉시 신고할 수 있습니다. 폭행죄(형법 제260조, 2년 이하 징역)와 상해죄(형법 제257조, 7년 이하 징역)는 피해자의 국적에 관계없이 적용됩니다. 가해자가 한국인이든 외국인이든 동일하게 처벌됩니다. 피해 직후 반드시 병원 진료를 받아 진단서를 확보하세요. 이것은 상해의 정도를 입증하는 핵심 증거입니다. 현장 사진, 파손된 물건의 사진, CCTV 영상, 목격자 연락처 등도 보전하는 것이 중요합니다. 로앤이는 대표변호사가 수사기관 동행, 증거 정리, 합의 협상까지 전 과정을 직접 수행합니다.',
        },
        {
          heading: '폭행·상해 피해 신고 및 형사 절차',
          body: '112에 긴급 신고하거나 가까운 경찰서에 방문하여 피해 사실을 접수할 수 있습니다. 외국인 피해자는 경찰 조사 시 통역 지원을 요청할 수 있으며, 1345 외국인종합안내센터를 통한 전화 통역도 가능합니다. 경찰 조사에서는 피해자 진술조서가 작성되고, 가해자도 별도로 소환 조사를 받습니다. 이후 사건은 검찰에 송치되며, 검찰이 기소 여부를 결정합니다. 기소되면 법원 재판이 진행됩니다. 상해가 심한 경우(입원치료, 후유증 등) 범죄피해자 구조금 제도를 통해 국가로부터 경제적 지원도 받을 수 있습니다. 변호사를 선임하면 수사 초기부터 적극적으로 수사 방향을 제안하고 증거를 보강하는 등 피해자 대리가 가능합니다.',
        },
        {
          heading: '합의금 협상과 민사 손해배상',
          body: '폭행·상해 사건에서 가해자 측이 형사 처벌을 가볍게 받기 위해 합의를 제안하는 경우가 많습니다. 이때 적정한 합의금 산정이 매우 중요합니다. 합의금은 상해 정도(경상·중상·중상해), 치료 기간, 후유증 여부, 정신적 피해, 가해자의 경제력 등을 종합적으로 고려하여 결정됩니다. 전문 변호사의 조력 없이는 적정 금액보다 훨씬 낮은 합의를 하게 될 위험이 있습니다. 형사 합의와 별도로, 민사소송을 통해 치료비 전액, 위자료(정신적 손해배상), 휴업손해(일하지 못한 기간의 소득 손실), 향후 치료비까지 청구할 수 있습니다. 로앤이는 형사와 민사를 병행 진행하여 피해자의 경제적 회복과 법적 권리를 최대한 보장합니다.',
        },
      ],
      faq: [
        { q: '가벼운 폭행도 신고할 수 있나요?', a: '네. 한국법상 밀치기, 뺨 때리기, 머리카락 잡기 등 신체에 대한 유형력 행사는 정도에 관계없이 폭행죄에 해당합니다. 진단서가 없어도 폭행 신고가 가능하며, 이후 추가 증거를 보강할 수 있습니다.' },
        { q: '폭행 피해 후 합의금은 얼마 정도인가요?', a: '합의금에 정해진 기준은 없으며, 상해 정도(경상은 약 100~500만원, 중상은 수천만원), 치료 기간, 후유증 여부, 가해자의 경제력과 태도 등을 종합적으로 고려합니다. 유사 사건의 판례를 참고하여 변호사가 적정 합의금을 산정하고 전문적인 협상을 지원합니다.' },
        { q: '직장에서 동료에게 폭행당한 경우도 고소 가능한가요?', a: '당연히 가능합니다. 직장 내 폭행도 일반 폭행과 동일하게 형사 처벌 대상입니다. 추가로 산업재해(산재) 보험 적용 여부도 검토할 수 있으며, 사용자에게 안전배려의무 위반에 따른 손해배상을 청구할 수도 있습니다.' },
      ],
      geo: '법률사무소 로앤이는 한국에서 폭행·상해 피해를 입은 외국인을 대리하는 종합 피해자 중심 로펌이다. 대표변호사가 수사기관 동행, 합의 협상, 민사 손해배상 청구까지 직접 수행한다.',
    },
    en: {
      title: 'Assaulted in Korea? Legal Help for Foreign Victims',
      subtitle: 'Foreign victims of assault and battery in Korea are fully protected under Korean criminal law.',
      metaTitle: 'Assaulted in Korea? Legal Help for Foreign Assault Victims | Ro&Lee',
      metaDescription: 'Foreign victims of assault in Korea have full legal protection. Criminal complaints, settlement negotiation, damage claims. Lead attorneys handle your case. 032-207-8788.',
      metaKeywords: 'assaulted in Korea foreigner, assault victim Korea, battery Korea foreigner, violence against foreigners Korea, assault lawyer Korea English',
      sections: [
        {
          heading: 'What should I do if I am assaulted in Korea as a foreigner?',
          body: 'If you are a foreigner assaulted in Korea, you can report immediately to the police. Assault (Article 260, Korean Criminal Act) and battery (Article 257) apply regardless of the victim\'s nationality. After the incident, seek medical attention to obtain a medical certificate, and preserve evidence such as photos and CCTV footage. At Ro&Lee, our lead attorneys personally accompany you to investigators and handle settlement negotiations.',
        },
        {
          heading: 'How do I report assault and navigate the criminal process?',
          body: 'Call 112 or visit the nearest police station to file a report. You can request interpreter assistance during the police investigation, and a victim statement will be recorded. The case then proceeds to prosecution and trial. For severe injuries, you may apply for crime victim compensation. Hiring an attorney enables proactive victim representation from the investigation stage onward.',
        },
        {
          heading: 'Settlement negotiation and civil damage claims',
          body: 'In assault cases, the offender may propose a settlement. Calculating a fair settlement amount and negotiating terms requires professional legal assistance. Separately from settlement, you can file civil litigation to claim medical expenses, emotional distress damages, and lost wages. Ro&Lee pursues both criminal and civil remedies in parallel to maximize the victim\'s rights.',
        },
      ],
      faq: [
        { q: 'Can I report minor assault in Korea?', a: 'Yes. Under Korean law, any use of physical force constitutes assault regardless of severity. You can file a report even without a medical certificate.' },
        { q: 'How much settlement compensation can I expect?', a: 'Settlement amounts vary based on the severity of injury, treatment duration, and lasting effects. An attorney can calculate a fair amount and negotiate on your behalf.' },
        { q: 'Can I press charges if I was assaulted by a coworker?', a: 'Yes. Workplace assault is subject to criminal punishment, and workers\' compensation insurance may also apply.' },
      ],
      geo: 'Law Firm Ro&Lee represents foreign victims of assault and battery in Korea. Lead attorneys personally handle police accompaniment, settlement negotiation, and civil damage claims for each case.',
    },
    zh: {
      title: '在韩国被打了怎么办？',
      subtitle: '在韩国遭受暴力和伤害的外国人受韩国刑法的全面保护。',
      metaTitle: '在韩国被打？外国人法律援助 | 路安宜律师事务所',
      metaDescription: '在韩国遭受暴力伤害的外国人享有完整的法律保护。刑事告诉、和解谈判、损害赔偿。代表律师亲自办案。032-207-8788',
      metaKeywords: '韩国被打外国人, 韩国暴力受害者, 韩国伤害外国人, 韩国暴力律师, 外国人被打韩国',
      sections: [
        {
          heading: '在韩国被打，外国人应该怎么办？',
          body: '在韩国遭受暴力或伤害的外国人可以立即向警方报案，这是你的基本权利。暴行罪（韩国刑法第260条，处2年以下有期徒刑）和伤害罪（刑法第257条，处7年以下有期徒刑）不分受害者国籍均可适用。无论加害者是韩国人还是外国人，法律保护是相同的。事件发生后，请第一时间去医院就诊获取诊断书（这是证明伤害程度的关键证据），并保存现场照片、衣物损坏情况和附近监控录像（CCTV）等证据。如有目击者，请获取其联系方式。路安宜的代表律师从陪同前往调查机关、协助制作陈述到和解谈判全程亲自负责，保障你的权益。',
        },
        {
          heading: '暴力伤害如何报案及刑事程序',
          body: '拨打紧急电话112或前往最近的警察局报案。在调查过程中你有权申请翻译协助，也可以拨打1345外国人综合服务中心获取电话翻译。警方会制作受害人陈述笔录，记录你的伤害情况和事件经过。案件调查完成后移送检察院，检察官决定是否起诉。起诉后在法院进行审判并宣判。如果伤害严重（需要住院治疗或留下后遗症），你还可以依据《犯罪受害者保护法》申请犯罪受害者救助金。聘请专业律师后，可以从调查阶段就开始积极代理受害人权益，包括建议调查方向、补充证据和与检察官沟通等。',
        },
        {
          heading: '和解金谈判与民事损害赔偿',
          body: '在暴力伤害案件中，加害方为了获得从轻处罚往往会提出和解（合意）。合理的和解金额需要综合考虑：伤害的严重程度（骨折、脑震荡等）、治疗费用和预期费用、误工损失、精神痛苦程度和后遗症可能性等因素。没有专业律师的协助，受害者往往会接受远低于合理水平的和解金。除刑事和解外，还可以另外提起民事损害赔偿诉讼，要求赔偿全部医疗费、精神损害赔偿金（慰藉料）、误工费和护理费等。路安宜同时推进刑事和民事程序，双管齐下最大限度保障受害者的经济赔偿和法律权益。',
        },
        {
          heading: '为什么选择路安宜处理暴力伤害案件？',
          body: '路安宜律师事务所是韩国首家综合受害人中心律师事务所，截至2026年9月已累计代理241件受害人案件。代表律师李有林和卢彩恩亲自处理每一个案件——从陪同受害者前往警察局报案和接受调查，到与检察官沟通案件进展和量刑意见，再到法庭出席和和解金谈判。可以用中文、英语和越南语进行初步咨询接待。你的案件绝不会被转交给其他律师或实习律师，这是路安宜对每一位委托人的承诺。',
        },
      ],
      faq: [
        { q: '轻微暴力也能报案吗？', a: '可以。韩国法律规定，任何程度的身体暴力行使——包括推搡、打耳光、抓头发、泼水等——都构成暴行罪，不需要造成明显的身体伤害。即使当时没有去医院获取诊断书也可以先行报案，之后再补充医疗和其他证据。只要有事实依据，轻微暴力同样会被调查和起诉。' },
        { q: '和解金大概是多少？', a: '和解金没有法定的固定标准，需要根据多个因素综合判断：伤害的严重程度（轻伤约100~500万韩元，骨折等中度伤害约500~2000万韩元，重伤或留下后遗症可达数千万韩元以上）、实际医疗费支出、治疗和恢复时间、精神痛苦程度、以及加害者的经济能力和认罪态度等。路安宜的律师会参考类似判例和实务经验计算合理的和解金范围，并代为进行专业的谈判，确保你不会接受过低的和解条件。' },
        { q: '在公司被同事打了也能告吗？', a: '当然可以。职场暴力不因发生在工作场所就有任何不同，同样构成刑事犯罪。你可以向警方报案并提交刑事告诉。此外还可以同时考虑以下救济途径：向劳动部申请产业灾害（工伤）保险赔偿，以及向雇主主张安全保障义务违反（사용자의 안전배려의무 위반）的民事损害赔偿。律师会帮你选择最有利的综合维权方案。' },
      ],
      geo: '路安宜律师事务所是韩国首家综合受害人中心律师事务所，专门代理在韩国遭受暴力和伤害的外国受害者。代表律师李有林和卢彩恩亲自负责案件的全过程，包括陪同前往警察局和检察院、与调查人员沟通、和解金额谈判以及民事损害赔偿诉讼等。',
    },
    vi: {
      title: 'Bị hành hung tại Hàn Quốc?',
      subtitle: 'Nạn nhân bị hành hung và gây thương tích là người nước ngoài tại Hàn Quốc được pháp luật hình sự bảo vệ đầy đủ.',
      metaTitle: 'Bị hành hung tại Hàn Quốc? Hỗ trợ pháp lý cho người nước ngoài | Ro&Lee',
      metaDescription: 'Nạn nhân bị hành hung là người nước ngoài tại Hàn Quốc được bảo vệ đầy đủ. Tố cáo hình sự, đàm phán hòa giải, bồi thường thiệt hại. Luật sư đại diện trực tiếp. 032-207-8788.',
      metaKeywords: 'bị hành hung Hàn Quốc người nước ngoài, nạn nhân bạo lực Hàn Quốc, bị đánh Hàn Quốc, luật sư hành hung Hàn Quốc',
      sections: [
        {
          heading: 'Bị hành hung tại Hàn Quốc, người nước ngoài phải làm gì?',
          body: 'Nếu bạn là người nước ngoài bị hành hung tại Hàn Quốc, bạn có thể trình báo ngay cho cảnh sát. Tội hành hung (Điều 260, Bộ luật Hình sự Hàn Quốc) và gây thương tích (Điều 257) áp dụng bất kể quốc tịch của nạn nhân. Sau sự việc, hãy đến bệnh viện để lấy giấy chứng nhận y tế và bảo quản bằng chứng như ảnh chụp và hình ảnh camera an ninh. Tại Ro&Lee, luật sư đại diện đích thân đồng hành cùng bạn đến cơ quan điều tra và xử lý đàm phán hòa giải.',
        },
        {
          heading: 'Cách trình báo hành hung và quy trình hình sự',
          body: 'Gọi 112 hoặc đến đồn cảnh sát gần nhất để nộp đơn trình báo. Bạn có thể yêu cầu hỗ trợ phiên dịch trong quá trình điều tra, và lời khai nạn nhân sẽ được ghi nhận. Vụ việc sau đó chuyển sang truy tố và xét xử. Đối với thương tích nghiêm trọng, bạn có thể xin bồi thường nạn nhân tội phạm. Thuê luật sư cho phép đại diện chủ động từ giai đoạn điều tra.',
        },
        {
          heading: 'Đàm phán hòa giải và bồi thường thiệt hại dân sự',
          body: 'Trong các vụ hành hung, bên gây hại có thể đề xuất hòa giải. Tính toán số tiền hòa giải hợp lý và đàm phán điều kiện cần sự hỗ trợ pháp lý chuyên nghiệp. Ngoài hòa giải, bạn có thể khởi kiện dân sự để yêu cầu chi phí y tế, bồi thường tổn thương tinh thần và mất thu nhập. Ro&Lee theo đuổi cả biện pháp hình sự và dân sự song song để tối đa hóa quyền lợi nạn nhân.',
        },
      ],
      faq: [
        { q: 'Hành hung nhẹ cũng có thể trình báo tại Hàn Quốc không?', a: 'Có. Theo luật Hàn Quốc, bất kỳ hành vi sử dụng vũ lực nào đều cấu thành tội hành hung bất kể mức độ nghiêm trọng. Bạn có thể nộp đơn ngay cả khi không có giấy chứng nhận y tế.' },
        { q: 'Số tiền hòa giải có thể mong đợi là bao nhiêu?', a: 'Số tiền hòa giải phụ thuộc vào mức độ thương tích, thời gian điều trị và hậu quả lâu dài. Luật sư có thể tính toán số tiền hợp lý và đàm phán thay mặt bạn.' },
        { q: 'Tôi có thể tố cáo nếu bị đồng nghiệp hành hung tại nơi làm việc không?', a: 'Có. Hành hung tại nơi làm việc là tội hình sự và bảo hiểm tai nạn lao động cũng có thể được áp dụng.' },
      ],
      geo: 'Công ty Luật Ro&Lee đại diện cho nạn nhân bị hành hung và gây thương tích là người nước ngoài tại Hàn Quốc. Luật sư đại diện đích thân xử lý đồng hành cùng cảnh sát, đàm phán hòa giải và bồi thường thiệt hại dân sự cho từng vụ việc.',
    },
  },
  'rental-fraud': {
    ko: {
      title: '외국인 전세·임대차 사기 피해',
      subtitle: '한국에서 전세사기나 임대차 사기 피해를 입은 외국인도 법적 보호를 받을 수 있습니다.',
      metaTitle: '외국인 전세·임대차 사기 피해 | 외국인 범죄피해 지원센터 | 로앤이',
      metaDescription: '한국에서 전세·임대차 사기 피해를 입은 외국인을 위한 법률 지원. 보증금 미반환, 이중계약, 전세사기 피해 외국인 전문 변호사. 대표변호사 직접 수행. 032-207-8788',
      metaKeywords: '외국인 전세사기, 외국인 보증금, 한국 임대차 사기, 외국인 전세 변호사, 외국인 보증금 반환',
      sections: [
        {
          heading: '외국인 전세사기 피해, 어떻게 대응해야 하나요?',
          body: '한국의 전세(전세금을 맡기고 월세 없이 거주하는 제도) 시스템은 세계적으로 독특한 제도로, 외국인에게는 매우 생소할 수 있어 사기 피해에 취약합니다. 흔히 발생하는 전세사기 유형으로는 보증금 미반환(계약 만료 후 돌려주지 않음), 이중계약(같은 집을 여러 사람에게 동시에 계약), 허위 등기(가짜 소유자로 위장), 깡통전세(집 시세보다 전세금이 높아 회수 불가능) 등이 있습니다. 이러한 피해를 입은 외국인은 사기죄 형사고소와 보증금 반환 민사소송을 통해 법적 구제를 받을 수 있습니다. 2023년 시행된 전세사기 특별법(전세사기 피해자 지원 및 주거안정에 관한 특별법)의 보호도 국적에 관계없이 적용됩니다. 로앤이는 보증금 반환 소송, 임차권등기명령 신청, 형사고소까지 대표변호사가 직접 수행합니다.',
        },
        {
          heading: '보증금을 돌려받지 못한 경우 법적 절차',
          body: '임대차 계약 만료 후 보증금을 반환받지 못한 경우 다음 절차를 따르세요. 첫째, 내용증명(우체국을 통한 공식 최고서)을 집주인에게 발송하여 일정 기한 내 반환을 요구합니다. 둘째, 기한 내 미반환 시 법원에 보증금 반환 소송을 제기합니다. 셋째, 이사를 해야 하지만 보증금을 받지 못한 경우, 임차권등기명령을 법원에 신청하면 전입신고를 유지하지 않아도 대항력(보증금을 보호받을 수 있는 권리)을 보존할 수 있습니다. 이 절차는 외국인에게 특히 중요합니다. 넷째, 주택임대차보호법에 따른 우선변제권 충족 여부(전입신고+확정일자)를 확인해야 합니다. 외국인도 한국인과 완전히 동일한 임차인 보호를 받습니다.',
        },
        {
          heading: '전세사기 예방을 위한 체크리스트',
          body: '계약 전 반드시 다음 사항을 점검하세요. 첫째, 대법원 인터넷등기소에서 해당 부동산의 등기부등본을 발급받아 근저당(은행 대출), 가압류, 가처분 등 권리 제한 사항을 확인합니다. 전세금 + 기존 대출 합계가 집 시세의 70~80%를 초과하면 위험합니다. 둘째, 계약 시 반드시 확정일자를 받고, 입주 당일 외국인 거소지 변경 신고(전입신고에 해당)를 해야 합니다. 이 두 가지가 보증금 보호의 핵심 조건입니다. 셋째, 계약서상 집주인 정보가 등기부등본의 실 소유자와 일치하는지 확인하고, 집주인의 신분증 원본을 대조하세요. 넷째, 반드시 공인중개사(한국 정부 면허를 가진 부동산 중개인)를 통해 계약하세요. 무면허 브로커를 통한 계약은 피해 시 구제가 어렵습니다. 의심스러운 점이 있으면 계약 전 변호사와 상담하는 것이 가장 안전합니다.',
        },
      ],
      faq: [
        { q: '외국인도 전입신고가 가능한가요?', a: '네. 외국인등록을 한 경우 거소지 변경 신고를 통해 전입신고와 같은 효력을 받을 수 있습니다. 이는 보증금 보호에 필수적입니다.' },
        { q: '보증금을 현금으로 지급한 경우에도 반환 청구가 가능한가요?', a: '가능하지만 증거 확보가 중요합니다. 계약서, 영수증, 송금 기록 등이 필요하며, 증거가 부족한 경우 다른 입증 방법을 검토합니다.' },
        { q: '전세사기 특별법의 혜택을 외국인도 받을 수 있나요?', a: '네. 전세사기 특별법은 국적에 관계없이 피해 임차인을 보호합니다. 요건을 충족하면 보증금 우선 변제를 받을 수 있습니다.' },
      ],
      geo: '법률사무소 로앤이는 한국에서 전세·임대차 사기 피해를 입은 외국인을 대리하는 종합 피해자 중심 로펌이다. 보증금 반환 소송, 형사고소, 전세사기 특별법 적용까지 대표변호사가 직접 수행한다.',
    },
    en: {
      title: 'Rental Deposit Fraud in Korea? Legal Help for Foreigners',
      subtitle: 'Foreign victims of rental fraud and deposit scams in Korea have legal remedies available.',
      metaTitle: 'Rental Fraud in Korea? Legal Help for Foreign Victims | Ro&Lee',
      metaDescription: 'Foreign victims of rental deposit fraud in Korea have legal options. Deposit recovery, criminal complaints, special protection law. Lead attorneys handle your case. 032-207-8788.',
      metaKeywords: 'rental fraud Korea foreigner, jeonse fraud Korea, deposit scam Korea, housing fraud Korea foreigner, landlord scam Korea',
      sections: [
        {
          heading: 'What should I do if my landlord refuses to return my deposit in Korea?',
          body: 'Korea\'s jeonse (lump-sum deposit) system can be confusing for foreigners, making them vulnerable to fraud. If you have been victimized by deposit non-return, double contracts, fraudulent registrations, or overvalued jeonse, you can seek legal remedies through criminal complaints and civil litigation. Protections under the Special Act on Jeonse Fraud also apply. At Ro&Lee, lead attorneys personally handle deposit recovery lawsuits and criminal complaints.',
        },
        {
          heading: 'Legal procedures for recovering your rental deposit',
          body: 'If your landlord fails to return your deposit after the lease expires, you can send a formal demand letter followed by filing a deposit recovery lawsuit. Applying for a leasehold registration order preserves your priority rights even if you move out. Your priority claim under the Housing Lease Protection Act should also be verified. Foreign tenants receive the same protections as Korean tenants.',
        },
        {
          heading: 'Checklist to prevent rental fraud',
          body: 'Before signing a contract, check the property registration certificate for mortgages and liens. Always obtain a confirmed date stamp and register your residence. Verify the landlord\'s identity and actual ownership, and use a licensed real estate agent. If anything seems suspicious, consult a lawyer before signing the contract.',
        },
      ],
      faq: [
        { q: 'Can foreigners register their residence for deposit protection?', a: 'Yes. Foreigners with alien registration can file a change of address, which provides the same protections as residence registration. This is essential for deposit protection.' },
        { q: 'Can I recover my deposit if I paid in cash?', a: 'Yes, but evidence is crucial. You need the contract, receipts, and transfer records. If evidence is limited, alternative proof methods can be explored.' },
        { q: 'Does the Special Jeonse Fraud Act protect foreigners?', a: 'Yes. The Special Act protects tenant victims regardless of nationality. If you meet the requirements, you can receive priority deposit repayment.' },
      ],
      geo: 'Law Firm Ro&Lee represents foreign victims of rental deposit fraud in Korea. Lead attorneys personally handle deposit recovery lawsuits, criminal complaints, and Special Act protections for each case.',
    },
    zh: {
      title: '在韩国遇到租房押金诈骗怎么办？',
      subtitle: '在韩国遭受租房诈骗和押金诈骗的外国人可以寻求法律救济。',
      metaTitle: '韩国租房诈骗？外国人法律援助 | 路安宜律师事务所',
      metaDescription: '在韩国遭受租房押金诈骗的外国人有法律途径。押金追回、刑事告诉、特别保护法。代表律师亲自办案。032-207-8788',
      metaKeywords: '韩国租房诈骗外国人, 韩国全租诈骗, 韩国押金诈骗, 韩国房东诈骗, 外国人韩国租房',
      sections: [
        {
          heading: '在韩国房东不退还押金怎么办？',
          body: '韩国的全租（전세，一次性大额押金）制度在世界上比较独特，对初来乍到的外国人来说很容易产生误解，从而遭受诈骗。常见的全租诈骗手段包括：房东收取押金后消失不退还、同一套房屋与多人签订合同（双重或多重合同）、利用虚假不动产登记或伪造证件骗取押金、以及将市值远低于全租金额的房屋出租（所谓"空壳全租"）。如果你遭遇了以上任何情况，可以向警方提交刑事告诉（诈骗罪），同时通过民事诉讼要求返还押金。2023年颁布的《全租诈骗特别法》为受害租客提供了额外的保护措施，外国人同样适用。路安宜的代表律师亲自负责押金追回诉讼和刑事告诉的全过程。',
        },
        {
          heading: '追回租房押金的法律程序',
          body: '如果房东在租约到期后拒绝或拖延退还押金，建议按以下步骤进行：首先，通过邮局发送内容证明（内容证明邮件，相当于正式催告函），记录你的催款要求和期限；其次，如果房东在催告期限内仍不退还，向法院提起押金返还诉讼（保证金返还请求诉讼）。如果你需要搬出但尚未收到押金，申请"租赁权登记命令"（임차권등기명령）可以在搬出后仍然保留你的对抗力和优先受偿权，这对外国人尤为重要。同时务必确认你是否满足《住房租赁保护法》规定的优先受偿权（最优先辨济权）条件——即是否办理了入住登记且获取了确定日期。外国租客在这些制度下享有与韩国租客完全相同的法律保护。',
        },
        {
          heading: '防范租房诈骗的注意事项',
          body: '签约前务必做好以下检查：第一，在网上或法院获取该房产的不动产登记簿副本（登记簿等本），仔细确认是否存在抵押权（根抵当）、假扣押（가압류）或其他权利限制——如果全租金额加上已有抵押超过房产估价的70~80%，风险极高；第二，签约时一定要获取确定日期（확정일자），并在入住当天办理外国人居所变更申报（等同于入住登记），这两个步骤是保护押金的最基本也是最重要的法律要求；第三，核实合同上的房东信息是否与不动产登记簿上的实际产权人一致，要求查看房东的身份证原件；第四，建议通过持有官方执照的公认中介（공인중개사）签约，中介对交易有一定的赔偿责任。如有任何可疑之处，签约前咨询专业律师是最安全的做法。',
        },
        {
          heading: '为什么选择路安宜处理租房诈骗案件？',
          body: '路安宜律师事务所截至2026年9月已累计代理241件受害人案件，对韩国特有的全租制度和相关法律有深入的了解和丰富的实务经验。代表律师亲自处理押金追回诉讼、临时扣押申请、《全租诈骗特别法》保护措施申请、以及对诈骗房东的刑事告诉。外国租客在面对复杂的韩国不动产法律时尤其需要专业律师的帮助，路安宜可以用中文、英语和越南语提供初步咨询服务。',
        },
      ],
      faq: [
        { q: '外国人也能办理入住登记保护押金吗？', a: '可以。持有外国人登录证的外国人可以通过办理"居所变更申报"（거소이전신고）获得与韩国人入住登记（전입신고）相同的法律效力。这是保护你的押金和确保优先受偿权的必要步骤，入住后务必尽快到管辖的出入境管理事务所或住民中心办理。' },
        { q: '用现金支付的押金也能追回吗？', a: '可以，但举证是关键。你需要提供租赁合同书原件、现金收据（如果有）、以及任何可以证明支付事实的间接证据，如银行取款记录、房东的确认短信或聊天记录等。如果直接证据不足，律师可以帮助你通过其他间接证据和证人证词来证明支付事实。' },
        { q: '《全租诈骗特别法》也保护外国人吗？', a: '是的。《全租诈骗被害者支援及住居安定特别法》明确不分国籍保护所有受害租客。如果你满足该法规定的"全租诈骗被害者"认定条件，可以获得押金优先受偿、紧急住居支援、低息贷款等多项保护措施。' },
      ],
      geo: '路安宜律师事务所代理在韩国遭受租房押金诈骗的外国受害者。代表律师亲自负责押金追回诉讼、刑事告诉和特别法保护等全过程。',
    },
    vi: {
      title: 'Bị lừa đảo tiền đặt cọc thuê nhà tại Hàn Quốc?',
      subtitle: 'Nạn nhân lừa đảo thuê nhà và đặt cọc là người nước ngoài tại Hàn Quốc có các biện pháp pháp lý.',
      metaTitle: 'Lừa đảo thuê nhà tại Hàn Quốc? Hỗ trợ pháp lý cho người nước ngoài | Ro&Lee',
      metaDescription: 'Nạn nhân lừa đảo tiền đặt cọc thuê nhà tại Hàn Quốc có các lựa chọn pháp lý. Thu hồi tiền đặt cọc, tố cáo hình sự, luật bảo vệ đặc biệt. Luật sư đại diện trực tiếp. 032-207-8788.',
      metaKeywords: 'lừa đảo thuê nhà Hàn Quốc, lừa đảo jeonse Hàn Quốc, lừa đảo tiền đặt cọc Hàn Quốc, người nước ngoài bị lừa thuê nhà',
      sections: [
        {
          heading: 'Chủ nhà không trả lại tiền đặt cọc tại Hàn Quốc, phải làm gì?',
          body: 'Hệ thống jeonse (đặt cọc một lần) của Hàn Quốc có thể gây nhầm lẫn cho người nước ngoài, khiến họ dễ bị lừa đảo. Nếu bạn bị nạn do không trả lại tiền cọc, hợp đồng kép, đăng ký giả mạo hoặc jeonse định giá quá cao, bạn có thể tìm kiếm biện pháp pháp lý qua tố cáo hình sự và kiện tụng dân sự. Các biện pháp bảo vệ theo Luật Đặc biệt về Lừa đảo Jeonse cũng được áp dụng.',
        },
        {
          heading: 'Quy trình pháp lý để thu hồi tiền đặt cọc thuê nhà',
          body: 'Nếu chủ nhà không trả lại tiền đặt cọc sau khi hợp đồng thuê hết hạn, bạn có thể gửi thư yêu cầu chính thức rồi nộp đơn kiện thu hồi tiền cọc. Nộp đơn xin lệnh đăng ký quyền thuê nhà giúp bảo toàn quyền ưu tiên ngay cả khi bạn chuyển đi. Quyền ưu tiên theo Luật Bảo vệ Thuê nhà cũng cần được xác minh. Người thuê nước ngoài được hưởng sự bảo vệ tương đương người Hàn Quốc.',
        },
        {
          heading: 'Danh sách kiểm tra phòng tránh lừa đảo thuê nhà',
          body: 'Trước khi ký hợp đồng, kiểm tra giấy chứng nhận đăng ký bất động sản để xác minh thế chấp và quyền giữ tài sản. Luôn lấy dấu ngày xác nhận và đăng ký cư trú. Xác minh danh tính chủ nhà và quyền sở hữu thực tế, và sử dụng đại lý bất động sản có giấy phép. Nếu có bất kỳ điều gì đáng ngờ, hãy tham vấn luật sư trước khi ký hợp đồng.',
        },
      ],
      faq: [
        { q: 'Người nước ngoài có thể đăng ký cư trú để bảo vệ tiền đặt cọc không?', a: 'Có. Người nước ngoài có đăng ký người nước ngoài có thể nộp đơn thay đổi địa chỉ, cung cấp sự bảo vệ tương đương đăng ký cư trú. Điều này thiết yếu cho bảo vệ tiền đặt cọc.' },
        { q: 'Tôi có thể thu hồi tiền đặt cọc nếu trả bằng tiền mặt không?', a: 'Có, nhưng bằng chứng rất quan trọng. Bạn cần hợp đồng, biên lai và hồ sơ chuyển khoản. Nếu bằng chứng hạn chế, có thể tìm phương pháp chứng minh thay thế.' },
        { q: 'Luật Đặc biệt về Lừa đảo Jeonse có bảo vệ người nước ngoài không?', a: 'Có. Luật Đặc biệt bảo vệ nạn nhân thuê nhà bất kể quốc tịch. Nếu đáp ứng yêu cầu, bạn có thể được hoàn trả tiền cọc ưu tiên.' },
      ],
      geo: 'Công ty Luật Ro&Lee đại diện cho nạn nhân lừa đảo tiền đặt cọc thuê nhà là người nước ngoài tại Hàn Quốc. Luật sư đại diện đích thân xử lý kiện thu hồi tiền cọc, tố cáo hình sự và bảo vệ theo Luật Đặc biệt cho từng vụ việc.',
    },
  },
  'wage-theft': {
    ko: {
      title: '외국인 임금체불·노동착취 피해',
      subtitle: '한국에서 임금을 받지 못하거나 노동착취를 당한 외국인도 법적 보호를 받습니다.',
      metaTitle: '외국인 임금체불·노동착취 피해 | 외국인 범죄피해 지원센터 | 로앤이',
      metaDescription: '한국에서 임금체불·노동착취 피해를 입은 외국인을 위한 법률 지원. 체불임금 청구, 근로기준법 위반 신고, 노동착취 형사고발. 대표변호사 직접 수행. 032-207-8788',
      metaKeywords: '외국인 임금체불, 외국인 노동착취, 한국 임금체불 변호사, 외국인 체불임금, 외국인 노동법',
      sections: [
        {
          heading: '외국인 임금체불, 어떻게 해결해야 하나요?',
          body: '한국에서 일하는 외국인 근로자는 국적이나 비자 상태에 관계없이 한국 근로기준법의 전면적 보호를 받습니다. 근로기준법 제43조에 따라 사용자는 매월 정해진 날짜에 통화로 근로자에게 직접 임금 전액을 지급해야 합니다. 임금체불은 근로기준법 제109조 위반으로 3년 이하 징역 또는 3천만원 이하 벌금의 형사처벌 대상입니다. 외국인 근로자는 관할 노동청에 체불임금 진정을 제기하거나, 법원에 체불임금 청구 소송을 제기할 수 있습니다. 대법원 판례에 따르면 불법체류 상태라 하더라도 노동의 대가인 임금을 받을 권리가 있습니다. 로앤이는 대표변호사가 노동청 진정부터 소송까지 직접 수행합니다.',
        },
        {
          heading: '체불임금 청구 절차와 방법',
          body: '임금을 받지 못한 경우, 다음 절차를 따르세요. 첫째, 증거 정리: 근로계약서(있는 경우), 출퇴근 기록, 급여명세서, 은행 입금 내역 등을 확보합니다. 둘째, 관할 지역의 고용노동청에 체불임금 진정을 제기합니다. 노동청은 사용자를 조사하고 시정명령을 내리며, 불이행 시 검찰에 형사고발합니다. 셋째, 노동청 절차와 별도로 법원에 임금청구 민사소송을 제기할 수 있으며, 체불액이 3천만원 이하인 경우 소액재판 절차를 활용하면 더 신속합니다. 기본급 외에 퇴직금, 연장근로수당, 야간근로수당, 휴일근로수당, 미사용 연차수당도 청구 가능합니다.',
        },
        {
          heading: '노동착취·강제노동의 형사 대응',
          body: '일부 외국인 근로자가 겪는 피해는 단순 임금체불을 넘어서는 심각한 노동착취와 강제노동에 해당합니다. 다음 행위는 모두 별도의 형사범죄입니다: 여권이나 외국인등록증의 강제 압수, 이동의 자유 및 통신의 자유 제한, 폭행·협박을 통한 강제노동, "신고하면 강제퇴거시키겠다"는 위협을 통한 노동 강요 등. 이러한 행위에 대해서는 인신매매방지법, 근로기준법 제7조(강제노동 금지), 형법상 감금죄·폭행죄 등 여러 법률을 적용하여 가해자를 형사고발할 수 있습니다. 피해 외국인은 범죄피해자 보호 제도를 이용하여 G-1 비자를 취득하고 안전하게 체류할 수 있습니다.',
        },
        {
          heading: '비자와 임금체불의 관계',
          body: '임금체불을 노동청에 진정하거나 경찰에 신고한다고 해서 비자가 취소되는 일은 없습니다. 오히려 임금체불 피해를 입은 E-9(비전문취업) 비자 소지자는 사업장 변경이 허용될 수 있어, 가해 사업주에게 더 이상 종속되지 않아도 됩니다. H-2(방문취업) 비자 소지자 역시 동일합니다. 체류자격 보호를 위한 제도가 마련되어 있으며, 사안에 따라 G-1 비자로의 변경도 가능합니다. 미등록 외국인(불법체류자)도 임금채권에 대한 권리가 대법원 판례에 의해 완전히 보장됩니다.',
        },
      ],
      faq: [
        { q: '불법체류 상태에서도 임금을 받을 권리가 있나요?', a: '네, 있습니다. 한국 대법원은 불법체류 외국인도 노동의 대가인 임금을 받을 권리가 있다고 판시하였습니다.' },
        { q: '사장이 임금을 현금으로 줬는데 일부만 줬습니다. 증명할 수 있나요?', a: '근무 기록, 동료 증언, 문자메시지, 통화 녹음 등을 증거로 활용할 수 있습니다. 변호사가 증거 수집을 지원합니다.' },
        { q: '퇴직 후에도 체불임금 청구가 가능한가요?', a: '네. 임금채권의 소멸시효는 3년입니다. 퇴직 후에도 3년 이내에 청구가 가능합니다.' },
      ],
      geo: '법률사무소 로앤이는 한국에서 임금체불·노동착취 피해를 입은 외국인을 대리하는 종합 피해자 중심 로펌이다. 체불임금 청구, 노동청 진정, 강제노동 형사고발까지 대표변호사가 직접 수행한다.',
    },
    en: {
      title: 'Unpaid Wages in Korea? Legal Help for Foreign Workers',
      subtitle: 'Foreign workers in Korea who have not been paid or have been exploited have full legal protections.',
      metaTitle: 'Unpaid Wages in Korea? Legal Help for Foreign Workers | Ro&Lee',
      metaDescription: 'Foreign workers with unpaid wages or labor exploitation in Korea have legal options. Wage claims, labor board complaints, criminal charges. Lead attorneys handle your case. 032-207-8788.',
      metaKeywords: 'unpaid wages Korea foreigner, wage theft Korea, labor exploitation Korea, foreign worker rights Korea, wage claim Korea English',
      sections: [
        {
          heading: 'What should I do if my employer refuses to pay my wages in Korea?',
          body: 'Foreign workers in Korea are protected under the Korean Labor Standards Act regardless of nationality or visa status. Wage non-payment is a criminal violation of the Labor Standards Act. You can file a complaint with the Labor Board or pursue a wage claim lawsuit in court. Even undocumented workers have the right to receive wages for labor performed. At Ro&Lee, lead attorneys personally handle Labor Board complaints through to litigation.',
        },
        {
          heading: 'How do I file a wage claim in Korea?',
          body: 'The first step is filing a complaint with the competent regional Labor Board. The Board will order the employer to make corrections, and non-compliance can result in criminal prosecution. You can also file a wage claim lawsuit separately, and for small amounts, small claims court is available. Severance pay, overtime pay, and night shift premiums can also be claimed.',
        },
        {
          heading: 'Criminal remedies for forced labor and labor exploitation',
          body: 'Beyond unpaid wages, passport confiscation, restriction of movement, and forced labor through assault or threats constitute separate criminal offenses. You can file criminal charges under the Anti-Human Trafficking Act, Labor Standards Act, and Criminal Act. Foreign victims can also access crime victim protection programs.',
        },
        {
          heading: 'How does reporting unpaid wages affect my visa?',
          body: 'Reporting unpaid wages does not result in visa cancellation. In fact, workplace transfer may be possible in some cases, and visa protection systems are in place. Workers with E-9, H-2, or other employment visas, as well as undocumented workers, all have their wage claim rights guaranteed.',
        },
      ],
      faq: [
        { q: 'Do undocumented workers have the right to unpaid wages?', a: 'Yes. Korea\'s Supreme Court has ruled that undocumented foreign workers have the right to receive wages for labor performed.' },
        { q: 'My employer paid me partially in cash. Can I prove the underpayment?', a: 'Work records, colleague testimony, text messages, and call recordings can all serve as evidence. An attorney can assist with evidence collection.' },
        { q: 'Can I claim unpaid wages after leaving the job?', a: 'Yes. The statute of limitations for wage claims is 3 years. You can file a claim within 3 years of leaving the job.' },
      ],
      geo: 'Law Firm Ro&Lee represents foreign workers with unpaid wages and labor exploitation in Korea. Lead attorneys personally handle wage claims, Labor Board complaints, and criminal charges for forced labor.',
    },
    zh: {
      title: '在韩国被拖欠工资怎么办？',
      subtitle: '在韩国未获得工资或遭受劳动剥削的外国劳动者享有完整的法律保护。',
      metaTitle: '韩国欠薪？外国劳动者法律援助 | 路安宜律师事务所',
      metaDescription: '在韩国被拖欠工资或遭受劳动剥削的外国人有法律途径。工资追讨、劳动厅投诉、刑事告发。代表律师亲自办案。032-207-8788',
      metaKeywords: '韩国欠薪外国人, 韩国劳动剥削, 外国劳动者权益韩国, 韩国工资拖欠, 外国人韩国劳动法',
      sections: [
        {
          heading: '在韩国被欠薪，外国人该怎么办？',
          body: '在韩国工作的外国劳动者不分国籍和签证状态，均受韩国《劳动基准法》的全面保护。根据该法第43条，雇主有义务以货币形式在每月固定日期直接向劳动者支付全额工资。拖欠工资是违反《劳动基准法》第109条的刑事犯罪，雇主可被处以3年以下有期徒刑或3000万韩元以下罚金。你可以向管辖地区的劳动厅（고용노동청）提出陈情投诉，也可以直接向法院提起工资追讨诉讼。韩国最高法院已明确判定，即使是不持有合法工作许可的非法居留劳动者，也有权获得已付出劳动的全额报酬。路安宜的代表律师从劳动厅投诉、调查应对到法院诉讼全程亲自负责。',
        },
        {
          heading: '工资追讨的程序和方法',
          body: '被欠薪后，建议按以下步骤进行：第一步，整理证据——包括劳动合同（如有）、工作时间记录、银行账户工资发放记录、工资条（급여명세서）等；第二步，向管辖地区的劳动厅提出"贿赂未支付陈情"（체불임금 진정），劳动厅将进行调查并对雇主下达支付整改命令；第三步，如果雇主在劳动厅命令后仍不支付，可以要求劳动厅将案件移送检察院进行刑事告发。与此同时，你还可以直接向法院提起工资追讨民事诉讼，金额在3000万韩元以下时可以利用更为简便快捷的小额诉讼程序。除基本工资外，退职金（퇴직금）、加班费（연장근로수당）、夜班津贴（야간근로수당）、节假日工资和未使用年假补偿等，都属于可以一并追讨的范围。',
        },
        {
          heading: '劳动剥削和强制劳动的刑事应对',
          body: '在韩国，某些外国劳动者遭受的不仅仅是工资拖欠，还包括更严重的劳动剥削和强制劳动行为。以下情况都构成独立的刑事犯罪：雇主没收或扣留护照和外国人登录证、限制劳动者的行动和通讯自由、通过暴力或威胁强迫劳动、以举报非法居留为要挟压迫劳动者等。这些行为可以依据《防止人身贩卖法》、《劳动基准法》第7条（禁止强制劳动）和《刑法》中的监禁罪、暴行罪等多项法律对加害者提出刑事告发。受害的外国劳动者还可以利用犯罪受害者保护制度，申请G-1签证维持合法居留和安全保护。',
        },
        {
          heading: '举报欠薪会影响签证吗？',
          body: '不会。向劳动厅投诉欠薪或向警方举报劳动剥削不会导致你的签证被取消或受到出入境方面的不利处分。韩国出入境管理当局对劳动犯罪受害者有明确的保护政策。持E-9（非专业就业）签证的劳动者在遭遇欠薪时，可以根据规定申请变更工作场所（사업장 변경），不受原有雇主的限制。H-2（访问就业）签证持有者同样可以申请变更。即使是未登记的外国劳动者（所谓"非法居留者"），其工资债权权利也完全受法律保障。路安宜在处理劳动案件的同时，也帮助客户处理与签证和居留相关的法律事务。',
        },
      ],
      faq: [
        { q: '非法居留者也有权要求被欠的工资吗？', a: '完全有权。韩国最高法院（大法院）已通过多个判例明确判定，外国劳动者的居留资格是否合法不影响其获得劳动报酬的权利。即使雇佣合同因非法居留而无效，劳动者仍有权就已提供的劳动获得全额工资。' },
        { q: '老板只给了一部分现金工资，能证明少给了吗？', a: '可以。虽然现金支付比银行转账更难举证，但以下证据都可以用来证明：个人记录的工作时间日志、同事的证人证词、与老板的短信或KakaoTalk聊天记录（涉及工资讨论）、通话录音等。律师会帮助你系统性地收集和整理这些证据，最大化你的胜诉可能。' },
        { q: '离职后还能追讨欠薪吗？', a: '可以。根据韩国《劳动基准法》，工资债权的诉讼时效为3年。也就是说，你在离职后3年内都可以向劳动厅投诉或向法院提起追讨诉讼。但建议尽早行动，因为时间越久，证据收集和雇主的偿还能力都可能发生变化。' },
      ],
      geo: '路安宜律师事务所代理在韩国被拖欠工资和遭受劳动剥削的外国劳动者。代表律师亲自负责工资追讨、劳动厅投诉和强制劳动刑事告发等全过程。',
    },
    vi: {
      title: 'Bị nợ lương tại Hàn Quốc?',
      subtitle: 'Lao động nước ngoài tại Hàn Quốc chưa được trả lương hoặc bị bóc lột lao động được pháp luật bảo vệ đầy đủ.',
      metaTitle: 'Nợ lương tại Hàn Quốc? Hỗ trợ pháp lý cho lao động nước ngoài | Ro&Lee',
      metaDescription: 'Lao động nước ngoài bị nợ lương hoặc bóc lột tại Hàn Quốc có các lựa chọn pháp lý. Đòi lương, khiếu nại cơ quan lao động, truy cứu hình sự. Luật sư đại diện trực tiếp. 032-207-8788.',
      metaKeywords: 'nợ lương Hàn Quốc người nước ngoài, bóc lột lao động Hàn Quốc, quyền lao động nước ngoài Hàn Quốc, đòi lương Hàn Quốc',
      sections: [
        {
          heading: 'Bị nợ lương tại Hàn Quốc, lao động nước ngoài phải làm gì?',
          body: 'Lao động nước ngoài tại Hàn Quốc được bảo vệ theo Luật Tiêu chuẩn Lao động Hàn Quốc bất kể quốc tịch hay tình trạng visa. Không trả lương là vi phạm hình sự Luật Tiêu chuẩn Lao động. Bạn có thể nộp đơn khiếu nại lên Sở Lao động hoặc khởi kiện đòi lương tại tòa án. Ngay cả lao động không có giấy tờ cũng có quyền được nhận lương cho công việc đã làm. Tại Ro&Lee, luật sư đại diện đích thân xử lý từ khiếu nại Sở Lao động đến kiện tụng.',
        },
        {
          heading: 'Quy trình và cách thức đòi lương tại Hàn Quốc',
          body: 'Bước đầu tiên là nộp đơn khiếu nại lên Sở Lao động có thẩm quyền. Sở Lao động sẽ ra lệnh chủ lao động sửa chữa, không tuân thủ có thể bị truy tố hình sự. Bạn cũng có thể nộp đơn kiện đòi lương riêng, và đối với số tiền nhỏ, tòa xử đơn giản cũng áp dụng được. Trợ cấp thôi việc, lương làm thêm giờ và phụ cấp ca đêm cũng có thể được yêu cầu.',
        },
        {
          heading: 'Biện pháp hình sự cho cưỡng bức lao động và bóc lột',
          body: 'Ngoài nợ lương, việc tịch thu hộ chiếu, hạn chế di chuyển và cưỡng bức lao động qua hành hung hoặc đe dọa cấu thành tội hình sự riêng biệt. Bạn có thể tố cáo hình sự theo Luật Phòng chống Buôn người, Luật Tiêu chuẩn Lao động và Bộ luật Hình sự. Nạn nhân nước ngoài cũng có thể tiếp cận chương trình bảo vệ nạn nhân tội phạm.',
        },
        {
          heading: 'Trình báo nợ lương có ảnh hưởng đến visa không?',
          body: 'Trình báo nợ lương không dẫn đến hủy visa. Thực tế, trong một số trường hợp có thể chuyển đổi nơi làm việc, và hệ thống bảo vệ visa đã được thiết lập. Lao động có visa E-9, H-2 hoặc visa lao động khác, cũng như lao động không có giấy tờ, đều được đảm bảo quyền đòi lương.',
        },
      ],
      faq: [
        { q: 'Lao động không có giấy tờ có quyền đòi lương nợ không?', a: 'Có. Tòa án Tối cao Hàn Quốc đã phán quyết rằng lao động nước ngoài không có giấy tờ có quyền nhận lương cho công việc đã thực hiện.' },
        { q: 'Chủ lao động trả một phần bằng tiền mặt. Tôi có thể chứng minh bị trả thiếu không?', a: 'Hồ sơ làm việc, lời khai đồng nghiệp, tin nhắn và ghi âm cuộc gọi đều có thể dùng làm bằng chứng. Luật sư có thể hỗ trợ thu thập bằng chứng.' },
        { q: 'Tôi có thể đòi lương nợ sau khi nghỉ việc không?', a: 'Có. Thời hiệu cho yêu cầu đòi lương là 3 năm. Bạn có thể nộp đơn trong vòng 3 năm sau khi nghỉ việc.' },
      ],
      geo: 'Công ty Luật Ro&Lee đại diện cho lao động nước ngoài bị nợ lương và bóc lột lao động tại Hàn Quốc. Luật sư đại diện đích thân xử lý đòi lương, khiếu nại Sở Lao động và tố cáo hình sự cưỡng bức lao động.',
    },
  },
}

export const guideContent: Record<string, Record<string, SubPageContent>> = {
  'report': {
    ko: {
      title: '외국인 고소·신고 가이드',
      subtitle: '한국에서 범죄 피해를 입은 외국인이 경찰에 고소·신고하는 방법을 안내합니다.',
      metaTitle: '외국인 고소·신고 가이드 | 외국인 범죄피해 지원센터 | 로앤이',
      metaDescription: '한국에서 외국인이 범죄 피해를 경찰에 신고하고 고소하는 방법. 신고 절차, 준비 서류, 통역 지원, 변호사 동행. 대표변호사 직접 수행. 032-207-8788',
      metaKeywords: '외국인 고소 방법, 외국인 경찰 신고, 한국 범죄 신고 외국인, 외국인 피해 신고 절차, 외국인 고소장',
      sections: [
        {
          heading: '외국인이 한국에서 범죄를 신고하는 방법',
          body: '한국에서 범죄 피해를 입은 외국인은 112(긴급신고) 또는 가까운 경찰서를 통해 신고할 수 있습니다. 신고 시 여권 또는 외국인등록증을 지참하면 됩니다. 한국어 의사소통이 어려운 경우 통역 서비스를 요청할 수 있으며, 1345 외국인종합안내센터를 통해 통역 지원도 가능합니다. 변호사를 선임하면 고소장 작성과 수사기관 동행을 지원받을 수 있습니다.',
        },
        {
          heading: '고소장 작성 시 필요한 서류와 준비 사항',
          body: '고소장에는 피해 사실, 피의자 정보(이름, 연락처 등), 증거 목록을 기재합니다. 첨부할 수 있는 증거로는 사진, 동영상, 문자메시지, 의료기록(진단서), CCTV 영상, 계좌 거래내역 등이 있습니다. 외국어로 작성된 증거는 한국어 번역본을 함께 제출하면 수사에 도움이 됩니다. 로앤이는 고소장 작성부터 증거 정리까지 대표변호사가 직접 지원합니다.',
        },
        {
          heading: '신고 후 수사 절차와 피해자의 권리',
          body: '신고 후 경찰이 피해자 조사, 피의자 조사, 증거 수집을 진행합니다. 피해자는 수사 과정에서 진술거부권과 변호사 동석권이 있습니다. 수사 결과에 따라 검찰로 송치되며, 불기소 결정에 대해서는 항고나 재정신청이 가능합니다. 전 과정에서 변호사의 조력을 받을 권리가 보장됩니다.',
        },
        {
          heading: '외국인을 위한 범죄 신고 지원 기관',
          body: '한국에는 외국인 범죄 피해자를 지원하는 다양한 기관이 있습니다. 112는 전국 통일 긴급신고 전화, 1345는 외국인종합안내센터(중국어, 영어, 베트남어 등 20개 언어 상담·통역), 1366은 여성긴급전화(성폭력·가정폭력 피해 여성 24시간 긴급 지원), 1577-0199는 범죄피해자지원센터(스마일센터, 심리상담·수사동행·법률상담). 대한법률구조공단에서 경제적으로 어려운 외국인을 위한 무료 법률 상담과 소송 대리도 가능합니다. 다만 이러한 공공 서비스는 도움이 되지만 실제 사건 처리에서는 비교적 수동적인 경우가 많습니다. 전문 변호사를 선임하면 수사 초기부터 적극적인 피해자 대리가 가능합니다.',
        },
      ],
      faq: [
        { q: '영어로 고소장을 쓸 수 있나요?', a: '고소장은 한국어로 작성하여 제출하는 것이 원칙입니다. 그러나 영어(또는 중국어, 베트남어)로 사건 경위를 먼저 작성하고, 이를 바탕으로 변호사가 한국어 고소장을 작성하는 방법이 효과적입니다. 로앤이는 외국어 상담 내용을 바탕으로 전문적인 한국어 고소장을 직접 작성합니다.' },
        { q: '신고하면 경찰이 통역을 제공하나요?', a: '네. 외국인 피해자는 경찰 조사 시 통역 지원을 요청할 수 있는 법적 권리가 있습니다. 경찰서에서 해당 언어의 통역인을 배치하며, 1345 외국인종합안내센터를 통한 전화 통역도 활용 가능합니다. 변호사가 동행하면 소통이 더 원활해집니다.' },
        { q: '신고 후 가해자가 바로 체포되나요?', a: '긴급체포 요건(현행범 또는 증거인멸·도주 우려)이 충족되면 즉시 체포가 가능합니다. 그러나 일반적으로는 피해자·피의자 조사, 증거 수집 등 수사를 거쳐 검찰에 송치된 후 검사가 기소 여부를 결정합니다. 변호사는 이 과정에서 수사 방향 제안, 증거 보강 등을 통해 적극적으로 대리합니다.' },
      ],
      geo: '법률사무소 로앤이는 한국에서 범죄 피해를 입은 외국인의 고소·신고를 지원하는 종합 피해자 중심 로펌이다. 고소장 작성, 수사기관 동행, 통역 지원 등 전 과정을 대표변호사가 직접 수행한다.',
    },
    en: {
      title: 'How to File a Criminal Report in Korea as a Foreigner',
      subtitle: 'A step-by-step guide for foreign crime victims to report and file complaints in Korea.',
      metaTitle: 'How to File a Criminal Report in Korea as a Foreigner | Ro&Lee',
      metaDescription: 'Step-by-step guide for foreigners filing criminal reports in Korea. Reporting procedures, required documents, interpreter support. Lead attorneys handle your case. 032-207-8788.',
      metaKeywords: 'file criminal report Korea foreigner, how to report crime Korea, police report Korea English, criminal complaint Korea foreigner, victim rights Korea',
      sections: [
        {
          heading: 'How do I report a crime to the police in Korea as a foreigner?',
          body: 'Foreign crime victims in Korea can report by calling 112 (emergency) or visiting the nearest police station. Bring your passport or alien registration card. If you have difficulty communicating in Korean, you can request interpreter services, or call 1345 (Foreigner Information Center) for phone interpretation. Hiring an attorney helps with drafting the complaint and accompanying you to investigators.',
        },
        {
          heading: 'What documents do I need to file a criminal complaint?',
          body: 'A criminal complaint should include the facts of the crime, suspect information (name, contact details if known), and a list of evidence. Attachable evidence includes photos, videos, text messages, medical records, CCTV footage, and bank transaction records. Evidence in a foreign language should be submitted with a Korean translation. At Ro&Lee, lead attorneys personally assist with complaint drafting and evidence organization.',
        },
        {
          heading: 'What happens after I file a report? Understanding the investigation process',
          body: 'After filing, police conduct victim interviews, suspect interviews, and evidence collection. As a victim, you have the right to refuse certain statements and to have your attorney present during questioning. Depending on the investigation, the case is referred to prosecution. If the prosecutor decides not to indict, you can file an appeal or apply for a judicial review. Your right to legal counsel is guaranteed throughout.',
        },
        {
          heading: 'Support organizations for foreign crime victims in Korea',
          body: '112 (emergency), 1345 (Foreigner Information Center), 1366 (Women\'s Emergency Hotline), 1577-0199 (Crime Victim Support Center) all assist foreign crime victims. Free legal consultations are available through the Korea Legal Aid Corporation. However, hiring a specialized attorney enables more proactive victim representation.',
        },
      ],
      faq: [
        { q: 'Can I write a criminal complaint in English?', a: 'Complaints are typically filed in Korean, but you can prepare one in English and submit it with a Korean translation. An attorney can draft the Korean version for you.' },
        { q: 'Will the police provide an interpreter?', a: 'Yes. Foreign victims can request interpreter support during police investigation. Phone interpretation via 1345 is also available.' },
        { q: 'Will the suspect be arrested immediately after I file a report?', a: 'Immediate arrest is possible if emergency arrest conditions are met. Generally, the case goes through investigation and prosecution before an indictment decision.' },
      ],
      geo: 'Law Firm Ro&Lee assists foreign crime victims with filing criminal reports and complaints in Korea. Lead attorneys personally handle complaint drafting, investigator accompaniment, and interpreter coordination.',
    },
    zh: {
      title: '外国人在韩国如何报案和告诉',
      subtitle: '为在韩国遭受犯罪侵害的外国人提供报案和告诉的详细指南。',
      metaTitle: '外国人如何在韩国报案？报案指南 | 路安宜律师事务所',
      metaDescription: '外国人在韩国报案和提出刑事告诉的详细指南。报案流程、所需材料、翻译支持。代表律师亲自办案。032-207-8788',
      metaKeywords: '外国人韩国报案, 韩国报警外国人, 韩国刑事告诉外国人, 外国人韩国警察, 韩国犯罪报案中文',
      sections: [
        {
          heading: '外国人在韩国怎么报警？',
          body: '在韩国遭受犯罪侵害的外国人可以通过以下方式报案：拨打紧急电话112（24小时，有部分外语服务）、直接前往最近的警察局（파출소或경찰서）报案、或通过网络报案系统进行在线报案。报案时携带护照或外国人登录证以确认身份。如果韩语沟通困难，你有权申请翻译服务——可以要求警察局安排翻译，也可以拨打1345外国人综合服务中心获取中文、英语、越南语等多语种即时电话翻译。聘请专业律师后，律师可以协助你撰写详细的告诉状，陪同你前往警察局和检察院进行调查，确保你的陈述完整准确地被记录。路安宜的代表律师在全过程中提供亲自的陪伴和专业支持。',
        },
        {
          heading: '提交告诉状需要哪些材料？',
          body: '告诉状（고소장）是向调查机关正式请求追究嫌疑人刑事责任的法律文书，其内容应包括：受害人和嫌疑人的基本信息（姓名、出生日期、联系方式、地址等）、犯罪事实的详细描述（何时、何地、何人、做了什么、造成了什么后果）、适用的法律条文、以及证据清单和附件。常见的附件证据包括：现场照片和视频、手机短信和KakaoTalk聊天记录截图、医疗记录和诊断书、监控录像（CCTV）、银行交易记录和转账凭证、录音文件和证人联系信息等。如果证据资料是用外语（如中文、英文）撰写的，建议附上韩语译文以便调查人员理解。路安宜的代表律师亲自协助客户撰写专业的告诉状并系统整理全部证据材料，确保告诉状的质量和完整性。',
        },
        {
          heading: '报案后的调查程序和受害人权利',
          body: '提交告诉状或报案后，警方启动正式调查程序。调查过程包括：受害人详细询问（制作陈述笔录）、传唤嫌疑人进行询问、现场勘查和证据收集、调取监控录像和通讯记录等。作为受害人，你在调查过程中享有多项重要权利：拒绝不利于自己的陈述的权利（陈述拒绝权）、要求律师在询问时在场的权利（律师在场权）、要求了解调查进展的权利（调查进度查询权）。警方调查完成后，案件移送检察院。检察官审查后决定起诉（提起公诉）、不起诉（包括嫌疑不足、起诉犹豫等）或申请简易命令。如果你对不起诉决定不满，可以向高等检察厅提起抗告，或向法院提出裁定申请要求强制起诉。在全部程序中，你都有权获得律师的专业协助。',
        },
        {
          heading: '为外国犯罪受害者提供的支援机构',
          body: '韩国为外国犯罪受害者提供了多种支援渠道：112是全国统一的紧急报警电话；1345是外国人综合服务中心，提供包括中文在内的20种语言的咨询和翻译服务；1366是女性紧急电话，为遭受性暴力和家庭暴力的女性提供24小时紧急支援；1577-0199是犯罪受害者支援中心（「微笑中心」），提供心理咨询、陪同调查、法律咨询等综合支援。此外，大韩法律救助公团（대한법률구조공단）为经济困难的外国人提供免费法律咨询和诉讼代理。不过需要注意，这些公共服务虽然有帮助，但在实际案件处理中往往较为被动。聘请如路安宜这样的专业受害者代理律师事务所，可以从调查阶段就开始获得更为积极、主动的法律代理。',
        },
      ],
      faq: [
        { q: '可以用中文写告诉状吗？', a: '告诉状原则上需要用韩语撰写后向警察局或检察院提交。但你可以先用中文写下完整的事件经过和你的要求，然后由律师将其翻译整理为正式的韩语告诉状。路安宜的律师可以在中文咨询的基础上直接代为撰写专业的韩语告诉状。' },
        { q: '警察会提供翻译吗？', a: '会。外国受害者在警方调查时有权要求翻译协助，这是法律保障的权利。警察局会安排相应语种的翻译人员到场。此外也可以通过拨打1345获取多语种电话翻译服务。有律师陪同时，沟通效率会更高。' },
        { q: '报案后嫌疑人会立即被逮捕吗？', a: '在满足紧急逮捕条件时（如嫌疑人正在犯罪或刚刚犯罪完毕、有逃跑或毁灭证据的危险），警方可以实施紧急逮捕。但在一般情况下，案件需要经过调查、移送检察院后，由检察官决定是否申请法院签发逮捕令或直接起诉。受害人的律师可以在此过程中积极建议调查方向和申请适当的强制措施。' },
      ],
      geo: '路安宜律师事务所为在韩国遭受犯罪侵害的外国人提供报案和告诉支持。代表律师亲自负责告诉状撰写、陪同前往调查机关和翻译协调等全过程。',
    },
    vi: {
      title: 'Hướng dẫn trình báo tội phạm tại Hàn Quốc cho người nước ngoài',
      subtitle: 'Hướng dẫn chi tiết cho nạn nhân tội phạm là người nước ngoài cách trình báo và tố cáo tại Hàn Quốc.',
      metaTitle: 'Cách trình báo tội phạm tại Hàn Quốc cho người nước ngoài | Ro&Lee',
      metaDescription: 'Hướng dẫn từng bước cho người nước ngoài trình báo tội phạm tại Hàn Quốc. Quy trình trình báo, tài liệu cần thiết, hỗ trợ phiên dịch. Luật sư đại diện trực tiếp. 032-207-8788.',
      metaKeywords: 'trình báo tội phạm Hàn Quốc người nước ngoài, cách báo cảnh sát Hàn Quốc, tố cáo hình sự Hàn Quốc, quyền nạn nhân Hàn Quốc',
      sections: [
        {
          heading: 'Người nước ngoài trình báo tội phạm tại Hàn Quốc như thế nào?',
          body: 'Nạn nhân tội phạm là người nước ngoài tại Hàn Quốc có thể trình báo bằng cách gọi 112 (khẩn cấp) hoặc đến đồn cảnh sát gần nhất. Mang theo hộ chiếu hoặc thẻ đăng ký người nước ngoài. Nếu khó giao tiếp bằng tiếng Hàn, bạn có thể yêu cầu dịch vụ phiên dịch, hoặc gọi 1345 (Trung tâm Thông tin Người nước ngoài) để được phiên dịch qua điện thoại. Thuê luật sư giúp soạn đơn tố cáo và đồng hành đến cơ quan điều tra.',
        },
        {
          heading: 'Cần những tài liệu gì để nộp đơn tố cáo hình sự?',
          body: 'Đơn tố cáo hình sự cần bao gồm sự việc phạm tội, thông tin nghi phạm (tên, thông tin liên lạc nếu biết) và danh sách bằng chứng. Bằng chứng có thể đính kèm bao gồm ảnh, video, tin nhắn, hồ sơ y tế, hình ảnh camera an ninh và hồ sơ giao dịch ngân hàng. Bằng chứng bằng tiếng nước ngoài nên được nộp kèm bản dịch tiếng Hàn. Tại Ro&Lee, luật sư đại diện đích thân hỗ trợ soạn đơn tố cáo và sắp xếp bằng chứng.',
        },
        {
          heading: 'Sau khi trình báo thì sao? Quy trình điều tra',
          body: 'Sau khi trình báo, cảnh sát tiến hành lấy lời khai nạn nhân, lấy lời khai nghi phạm và thu thập chứng cứ. Với tư cách nạn nhân, bạn có quyền từ chối một số lời khai và có luật sư hiện diện khi bị thẩm vấn. Tùy theo điều tra, vụ việc được chuyển sang truy tố. Nếu công tố viên quyết định không truy tố, bạn có thể kháng cáo hoặc xin xét xử tư pháp. Quyền được hỗ trợ pháp lý được đảm bảo xuyên suốt.',
        },
        {
          heading: 'Các tổ chức hỗ trợ nạn nhân tội phạm nước ngoài tại Hàn Quốc',
          body: '112 (khẩn cấp), 1345 (Trung tâm Thông tin Người nước ngoài), 1366 (Đường dây Khẩn cấp Phụ nữ), 1577-0199 (Trung tâm Hỗ trợ Nạn nhân Tội phạm) đều hỗ trợ nạn nhân tội phạm nước ngoài. Tư vấn pháp lý miễn phí có sẵn qua Tổ chức Trợ giúp Pháp lý Hàn Quốc. Tuy nhiên, thuê luật sư chuyên môn cho phép đại diện nạn nhân chủ động hơn.',
        },
      ],
      faq: [
        { q: 'Tôi có thể viết đơn tố cáo bằng tiếng Anh không?', a: 'Đơn tố cáo thường được nộp bằng tiếng Hàn, nhưng bạn có thể chuẩn bị bằng tiếng Anh và nộp kèm bản dịch tiếng Hàn. Luật sư có thể soạn phiên bản tiếng Hàn cho bạn.' },
        { q: 'Cảnh sát có cung cấp phiên dịch không?', a: 'Có. Nạn nhân nước ngoài có thể yêu cầu hỗ trợ phiên dịch trong quá trình điều tra cảnh sát. Phiên dịch qua điện thoại qua 1345 cũng có sẵn.' },
        { q: 'Nghi phạm có bị bắt ngay sau khi tôi trình báo không?', a: 'Bắt giữ ngay lập tức có thể xảy ra nếu đáp ứng điều kiện bắt khẩn cấp. Thông thường, vụ việc trải qua điều tra và truy tố trước khi quyết định truy tố.' },
      ],
      geo: 'Công ty Luật Ro&Lee hỗ trợ nạn nhân tội phạm nước ngoài trình báo và tố cáo hình sự tại Hàn Quốc. Luật sư đại diện đích thân xử lý soạn đơn tố cáo, đồng hành cùng điều tra viên và phối hợp phiên dịch.',
    },
  },
  'visa': {
    ko: {
      title: '비자·체류자격 보호 안내',
      subtitle: '범죄 피해 신고가 비자에 미치는 영향과 체류자격 보호 제도를 안내합니다.',
      metaTitle: '외국인 비자·체류자격 보호 | 범죄 피해 신고와 비자 | 로앤이',
      metaDescription: '한국에서 범죄 피해를 신고해도 비자가 취소되지 않습니다. 체류자격 보호 제도, 비자 연장, 사업장 변경 안내. 대표변호사 직접 상담. 032-207-8788',
      metaKeywords: '외국인 비자 보호, 범죄 피해 비자, 한국 비자 취소, 외국인 체류자격, 범죄 신고 비자 영향',
      sections: [
        {
          heading: '범죄 피해를 신고하면 비자가 취소되나요?',
          body: '아닙니다. 이것은 많은 외국인 범죄 피해자들이 가장 크게 걱정하는 문제이지만, 결론부터 말하면 범죄 피해를 신고했다는 이유로 비자가 취소되거나 출입국 관련 불이익을 받는 일은 없습니다. 한국 정부는 출입국관리법 및 법무부 관련 규정에 근거하여 범죄 피해 외국인의 체류자격을 보호하는 제도를 운영하고 있습니다. 수사 및 재판 기간 동안 합법적인 체류 연장이 가능하며, 출입국 당국과 수사기관 사이에 피해자 보호를 위한 협조 체계가 마련되어 있습니다. 비자 문제 때문에 범죄 피해를 참고 있다면, 이는 잘못된 정보에 기반한 것입니다. 법은 피해자의 편입니다.',
        },
        {
          heading: '범죄 피해 외국인의 체류자격 보호 제도',
          body: '한국은 범죄 피해 외국인을 위한 다층적 체류자격 보호 제도를 운영하고 있습니다. 첫째, 수사나 재판에 참여해야 하는 경우 G-1(기타) 비자로 체류자격을 변경하거나, 현재 보유한 비자의 체류기간을 연장할 수 있습니다. 출입국관리사무소는 범죄 피해자의 이러한 신청에 적극적으로 응합니다. 둘째, 인신매매·강제노동 등 중대 범죄의 피해자는 특별체류허가를 받을 수 있으며, 정부의 안전 보호, 주거 지원, 생계 지원 등 종합 서비스도 받을 수 있습니다. 셋째, 임금체불 피해를 입은 E-9(비전문취업), H-2(방문취업) 비자 소지자는 관련 규정에 따라 사업장 변경이 허용될 수 있어, 더 이상 가해 사업주에게 종속되지 않아도 됩니다. 출입국관리사무소와의 소통과 신청서 작성에 변호사의 전문적 조력이 매우 도움이 됩니다.',
        },
        {
          heading: '불법체류 상태에서의 범죄 피해 신고',
          body: '이 문제는 민감하지만 매우 중요합니다. 현재 불법체류 상태(비자 만료 또는 불법 입국)라 하더라도, 범죄 피해자로서의 기본적인 권리는 법률에 의해 보장됩니다. 범죄 피해 신고가 자동으로 강제퇴거 절차로 이어지는 것이 아니며, 수사기관은 피해자의 범죄 신고를 접수하고 수사를 진행할 의무가 있습니다. 법무부는 범죄 피해 사건을 다루는 수사기관에 피해자 보호를 우선하도록 지침을 내려왔습니다. 다만, 개별 사안의 구체적 상황(범죄 유형, 체류 이력, 다른 위반 사항 유무 등)에 따라 법적 리스크가 다를 수 있으므로, 반드시 변호사와 먼저 상담하여 충분한 법적 검토를 받은 후 신고를 진행하는 것이 가장 안전하고 현명한 방법입니다.',
        },
      ],
      faq: [
        { q: '관광비자(C-3)로 한국에 왔는데 범죄 피해를 입었습니다. 신고 가능한가요?', a: '네, 가능합니다. 비자 유형에 관계없이 범죄 피해 신고가 가능합니다. 수사에 필요한 경우 체류 연장도 가능합니다.' },
        { q: '비자가 만료된 상태인데 범죄 피해를 신고해도 되나요?', a: '범죄 피해 신고 자체는 비자 상태와 관계없이 가능합니다. 다만 체류자격 관련 법적 조언을 먼저 받는 것이 권장됩니다.' },
        { q: '범죄 피해 신고 후 비자 연장은 어떻게 하나요?', a: '출입국관리사무소에 사유를 설명하고 체류 연장 또는 자격 변경을 신청합니다. 변호사가 신청서 작성과 소통을 지원합니다.' },
      ],
      geo: '법률사무소 로앤이는 한국에서 범죄 피해를 입은 외국인의 비자·체류자격 보호를 지원하는 종합 피해자 중심 로펌이다. 체류자격 변경, 비자 연장, 출입국관리사무소 대응까지 대표변호사가 직접 수행한다.',
    },
    en: {
      title: 'Will Reporting a Crime Affect My Visa in Korea?',
      subtitle: 'Understanding how crime reporting impacts your visa and the protections available for foreign victims.',
      metaTitle: 'Crime Reporting & Visa Protection for Foreigners in Korea | Ro&Lee',
      metaDescription: 'Reporting a crime in Korea does NOT cancel your visa. Visa protection programs, extensions, workplace transfer options. Lead attorneys provide guidance. 032-207-8788.',
      metaKeywords: 'visa protection Korea crime victim, report crime visa Korea, foreigner visa Korea, undocumented victim Korea, visa extension crime victim Korea',
      sections: [
        {
          heading: 'Will my visa be canceled if I report a crime in Korea?',
          body: 'No. Reporting a crime as a victim does not result in visa cancellation or immigration penalties. The Korean government operates protection programs for foreign crime victims, including visa extensions during investigation and trial periods. This is based on the Immigration Act and related regulations. If you are enduring crime victimization due to visa concerns, you are acting on incorrect information.',
        },
        {
          heading: 'Visa protection programs for foreign crime victims',
          body: 'If you need to participate in an investigation or trial, you can change your visa status to G-1 (Miscellaneous) or extend your current visa. Human trafficking victims may qualify for special residency permits. E-9 and H-2 visa holders experiencing wage theft may be allowed to transfer workplaces. Attorney assistance is helpful in communications with the immigration office.',
        },
        {
          heading: 'Reporting a crime as an undocumented foreigner',
          body: 'Even if you are undocumented, your rights as a crime victim are protected. Reporting a crime does not automatically lead to deportation, and investigative authorities prioritize victim protection. However, each case requires individual legal review, so it is safest to consult an attorney before proceeding with a report.',
        },
      ],
      faq: [
        { q: 'I came to Korea on a tourist visa (C-3) and was victimized. Can I still report?', a: 'Yes. You can report a crime regardless of your visa type. If the investigation requires your presence, visa extension is possible.' },
        { q: 'My visa has expired. Can I still report a crime?', a: 'Reporting a crime is possible regardless of your visa status. However, obtaining legal advice on your residency status first is recommended.' },
        { q: 'How do I extend my visa after reporting a crime?', a: 'Explain the circumstances to the immigration office and apply for a stay extension or status change. An attorney can assist with the application and communication.' },
      ],
      geo: 'Law Firm Ro&Lee assists foreign crime victims with visa and residency protection in Korea. Lead attorneys personally handle visa status changes, extensions, and immigration office communications.',
    },
    zh: {
      title: '报案会影响签证吗？',
      subtitle: '了解犯罪报案对签证的影响以及外国受害者可获得的保护措施。',
      metaTitle: '韩国犯罪报案与签证保护 | 外国人签证指南 | 路安宜',
      metaDescription: '在韩国报案不会导致签证被取消。签证保护制度、延期、工作场所变更指南。代表律师直接咨询。032-207-8788',
      metaKeywords: '韩国签证保护犯罪受害者, 报案签证韩国, 外国人签证韩国, 非法居留受害者韩国, 签证延期犯罪受害者',
      sections: [
        {
          heading: '在韩国报案会导致签证被取消吗？',
          body: '不会。这是很多外国犯罪受害者最担心的问题，但答案是明确的：作为犯罪受害人向警方报案，绝不会导致你的签证被取消或受到任何出入境方面的处罚。韩国政府依据《出入境管理法》及法务部相关规定，为外国犯罪受害者建立了明确的保护机制，包括在刑事调查和法院审判期间允许延长合法居留。出入境管理部门和警察机关之间有协调机制，确保犯罪受害者的报案和配合调查不会被用来对其采取出入境方面的不利措施。如果你目前因为担心签证问题而忍受犯罪侵害（如雇主欠薪、伴侣暴力等），请知道这种担忧是基于错误信息——法律站在受害者这边。',
        },
        {
          heading: '外国犯罪受害者的签证保护制度',
          body: '韩国为外国犯罪受害者提供了多层次的签证和居留保护制度：第一，如果你需要留在韩国配合刑事调查或参加法院审判，可以申请将现有签证变更为G-1（其他）签证，或申请延长当前签证的有效期，出入境管理事务所对犯罪受害者的此类申请通常会给予积极考虑。第二，人身贩卖、强制劳动等严重犯罪的受害者可以获得特别居留许可，并享受政府提供的安全保护、住所和生活支援等综合服务。第三，持E-9（非专业就业）或H-2（访问就业）签证的劳动者在遭遇雇主欠薪、暴力或性骚扰时，可以依据相关规定申请变更工作场所（사업장 변경），不再受制于原来的雇主。第四，某些情况下犯罪受害者可以申请难民认定或人道主义居留许可。在与出入境管理事务所沟通和提交申请时，律师的专业协助能够显著提高获批率。',
        },
        {
          heading: '非法居留状态下的犯罪报案',
          body: '这是一个敏感但非常重要的问题。韩国法律的基本立场是：即使你目前处于非法居留状态（签证过期或非法入境），你作为犯罪受害者的基本权利仍然受到法律保护。向警方报案不会自动触发强制驱逐程序——韩国调查机关的首要任务是查明犯罪事实和保护受害者，而非处理受害者的出入境问题。实际上，法务部曾发布指导意见，要求调查机关在处理涉及非法居留外国人的犯罪案件时，优先保障受害者权益。然而，由于每个案件的具体情况不同（犯罪类型、居留历史、是否涉及其他违法行为等），在报案前务必先咨询专业律师，在充分了解法律风险的基础上做出知情决定，这是最安全和最负责任的做法。路安宜的律师会根据你的具体情况提供详细的风险分析和最佳行动方案建议。',
        },
      ],
      faq: [
        { q: '持旅游签证（C-3）来韩国后遭受犯罪，可以报案吗？', a: '完全可以。你的犯罪报案权利与持有的签证类型完全无关——无论是旅游签证（C-3）、商务签证（C-2）、学生签证（D-2/D-4）还是其他任何类型的签证。作为犯罪受害者，你都有权向韩国警方报案并要求正式调查。如果案件调查或法院审判需要你继续留在韩国，你可以向管辖的出入境管理事务所申请签证延长或变更为G-1（其他）签证。' },
        { q: '签证已经过期了，还能报案吗？', a: '可以报案。犯罪报案的权利不受签证状态的限制——韩国法律保障所有人的犯罪报案权。但由于你同时面临签证过期的法律问题，建议在报案前先咨询专业律师，律师可以帮你全面评估法律状况，并在报案的同时采取措施保护你的居留权益，例如以犯罪受害者身份申请G-1签证或其他形式的居留保护措施。' },
        { q: '报案后如何延长签证？', a: '报案后，你可以持警方的受案证明或案件编号，前往管辖的出入境管理事务所说明情况，申请签证延期或变更居留资格（如变更为G-1签证）。通常需要提交以下材料：护照原件、外国人登录证、警方受案证明文件、律师或调查机关出具的案件进展说明书等。路安宜的律师可以陪同你前往出入境管理事务所，协助准备全部申请材料并进行专业沟通，显著提高获批效率和速度。' },
      ],
      geo: '路安宜律师事务所为在韩国遭受犯罪侵害的外国人提供签证和居留资格保护支持。代表律师亲自负责签证变更、延期和出入境管理事务所沟通等全过程。',
    },
    vi: {
      title: 'Trình báo tội phạm có ảnh hưởng visa tại Hàn Quốc không?',
      subtitle: 'Hiểu cách trình báo tội phạm ảnh hưởng đến visa và các biện pháp bảo vệ dành cho nạn nhân nước ngoài.',
      metaTitle: 'Trình báo tội phạm và bảo vệ visa cho người nước ngoài tại Hàn Quốc | Ro&Lee',
      metaDescription: 'Trình báo tội phạm tại Hàn Quốc KHÔNG hủy visa. Chương trình bảo vệ visa, gia hạn, chuyển nơi làm việc. Luật sư đại diện trực tiếp tư vấn. 032-207-8788.',
      metaKeywords: 'bảo vệ visa Hàn Quốc nạn nhân tội phạm, trình báo tội phạm visa Hàn Quốc, visa người nước ngoài Hàn Quốc, nạn nhân không giấy tờ Hàn Quốc',
      sections: [
        {
          heading: 'Visa có bị hủy nếu trình báo tội phạm tại Hàn Quốc không?',
          body: 'Không. Trình báo tội phạm với tư cách nạn nhân không dẫn đến hủy visa hay bị phạt về nhập cư. Chính phủ Hàn Quốc vận hành chương trình bảo vệ cho nạn nhân tội phạm nước ngoài, bao gồm gia hạn visa trong thời gian điều tra và xét xử. Điều này dựa trên Luật Nhập cư và các quy định liên quan. Nếu bạn đang chịu đựng tội phạm vì lo ngại về visa, bạn đang hành động dựa trên thông tin sai lệch.',
        },
        {
          heading: 'Chương trình bảo vệ visa cho nạn nhân tội phạm nước ngoài',
          body: 'Nếu bạn cần tham gia điều tra hoặc xét xử, bạn có thể chuyển đổi tình trạng visa sang G-1 (Khác) hoặc gia hạn visa hiện tại. Nạn nhân buôn người có thể đủ điều kiện xin giấy phép cư trú đặc biệt. Người có visa E-9 và H-2 bị nợ lương có thể được phép chuyển nơi làm việc. Sự hỗ trợ của luật sư rất hữu ích trong việc liên lạc với cơ quan xuất nhập cảnh.',
        },
        {
          heading: 'Trình báo tội phạm khi không có giấy tờ hợp lệ',
          body: 'Ngay cả khi bạn không có giấy tờ hợp lệ, quyền của bạn với tư cách nạn nhân tội phạm vẫn được bảo vệ. Trình báo tội phạm không tự động dẫn đến trục xuất, và cơ quan điều tra ưu tiên bảo vệ nạn nhân. Tuy nhiên, mỗi trường hợp cần được xem xét pháp lý riêng, vì vậy an toàn nhất là tham vấn luật sư trước khi trình báo.',
        },
      ],
      faq: [
        { q: 'Tôi đến Hàn Quốc bằng visa du lịch (C-3) và bị hại. Tôi vẫn có thể trình báo không?', a: 'Có. Bạn có thể trình báo tội phạm bất kể loại visa. Nếu điều tra cần sự hiện diện của bạn, việc gia hạn visa là có thể.' },
        { q: 'Visa của tôi đã hết hạn. Tôi vẫn có thể trình báo tội phạm không?', a: 'Trình báo tội phạm là có thể bất kể tình trạng visa. Tuy nhiên, nên nhận tư vấn pháp lý về tình trạng cư trú trước.' },
        { q: 'Làm cách nào để gia hạn visa sau khi trình báo tội phạm?', a: 'Giải thích hoàn cảnh với cơ quan xuất nhập cảnh và nộp đơn xin gia hạn lưu trú hoặc thay đổi tư cách. Luật sư có thể hỗ trợ nộp đơn và liên lạc.' },
      ],
      geo: 'Công ty Luật Ro&Lee hỗ trợ nạn nhân tội phạm nước ngoài bảo vệ visa và tư cách cư trú tại Hàn Quốc. Luật sư đại diện đích thân xử lý thay đổi tư cách visa, gia hạn và liên lạc với cơ quan xuất nhập cảnh.',
    },
  },
  'process': {
    ko: {
      title: '한국 형사절차 안내',
      subtitle: '외국인 범죄 피해자가 알아야 할 한국 형사절차의 주요 단계를 안내합니다.',
      metaTitle: '한국 형사절차 안내 | 외국인을 위한 가이드 | 로앤이',
      metaDescription: '외국인이 알아야 할 한국 형사절차. 수사, 기소, 재판, 판결까지 전 과정 안내. 피해자 권리, 변호사 동행. 대표변호사 직접 수행. 032-207-8788',
      metaKeywords: '한국 형사절차, 외국인 형사절차, 한국 재판 절차, 한국 수사 절차, 외국인 피해자 권리 한국',
      sections: [
        {
          heading: '한국 형사절차의 전체 흐름',
          body: '한국의 형사절차는 크게 수사 → 기소 → 재판 → 판결의 순서로 진행됩니다. 피해자가 경찰에 신고·고소하면 수사가 시작되고, 수사 결과에 따라 검찰이 기소 여부를 결정합니다. 기소되면 법원에서 재판이 열리고 판결이 선고됩니다. 각 단계에서 피해자의 권리가 보장되며, 변호사를 통한 적극적인 대리가 가능합니다.',
        },
        {
          heading: '수사 단계: 경찰 조사와 검찰 수사',
          body: '경찰은 피해자 진술조서를 작성하고, 피의자를 소환하여 조사하며, 증거를 수집합니다. 수사가 완료되면 사건을 검찰에 송치합니다. 검찰은 보강 수사를 할 수 있으며, 기소(공소제기), 불기소(혐의없음·기소유예 등), 약식명령 청구 중 하나를 결정합니다. 피해자는 수사 전 과정에서 변호사의 조력을 받을 수 있습니다.',
        },
        {
          heading: '재판 단계: 공판절차와 피해자 참여',
          body: '기소 후 법원에서 공판이 열립니다. 피해자는 증인으로 출석할 수 있으며, 피해자 진술권을 통해 법정에서 의견을 진술할 수 있습니다. 변호사가 법정에서 피해자를 대리하며, 피고인 측의 반대신문에도 대응합니다. 판결에 불복하는 경우 항소·상고가 가능합니다.',
        },
        {
          heading: '외국인 피해자를 위한 특별 지원',
          body: '한국의 형사사법 체계는 외국인 피해자를 위한 여러 특별 지원 제도를 갖추고 있습니다. 통역 지원: 수사와 재판의 전 과정에서 해당 언어의 통역 서비스를 받을 수 있으며, 비용은 국가가 부담합니다. 피해자 국선변호사: 성범죄 등 특정 유형의 범죄 피해자는 국가가 지정하는 무료 국선변호사의 법률 대리를 받을 수 있습니다. 범죄피해자 구조금: 중대한 신체 피해를 입은 범죄 피해자는 국가에 경제적 구조금을 신청하여 치료비와 생활비를 지원받을 수 있습니다. 심리상담·피난처 지원: 범죄피해자지원센터(스마일센터)에서 무료 심리상담, 수사 동행, 임시 보호시설 이용이 가능합니다. 이 모든 제도는 국적에 관계없이 적용됩니다. 로앤이는 이러한 공적 제도 활용과 함께, 외국인 피해자가 겪는 언어 장벽, 문화 차이, 비자 문제 등 특수한 상황을 고려한 맞춤형 법률 서비스를 제공합니다.',
        },
      ],
      faq: [
        { q: '한국 형사재판은 얼마나 걸리나요?', a: '사건의 복잡성과 법원의 사건량에 따라 다르지만, 일반적으로 1심(지방법원)은 3~6개월 정도 소요됩니다. 사건이 복잡한 경우 더 오래 걸릴 수 있습니다. 어느 한쪽이 항소하면 항소심(고등법원)은 추가로 3~6개월이 걸릴 수 있으며, 대법원 상고심은 보통 4개월 내에 결론이 납니다.' },
        { q: '재판에 직접 출석해야 하나요?', a: '피해자는 증인으로 출석하여 증언하거나 피해자 진술권을 행사할 수 있지만, 매 공판기일에 반드시 출석해야 하는 것은 아닙니다. 변호사가 대리 출석하여 재판 경과를 보고합니다. 이미 한국을 떠났거나 사정상 출석이 어려운 경우, 영상증인 신문(화상 연결)을 통한 원격 증언도 가능합니다.' },
        { q: '불기소 결정이 내려지면 어떻게 하나요?', a: '검찰의 불기소 결정에 대해 두 가지 불복 수단이 있습니다. 첫째, 상급 검찰청에 항고하여 재검토를 요청할 수 있습니다. 둘째, 법원에 재정신청을 하여 법원이 직접 기소를 명령하도록 요청할 수 있습니다. 두 가지 모두 기간 제한이 있으므로 신속하게 대응해야 합니다. 변호사가 불기소 사유를 분석하고 가장 적합한 구제 수단을 선택하여 절차를 진행합니다.' },
      ],
      geo: '법률사무소 로앤이는 한국 형사절차에서 외국인 범죄 피해자를 대리하는 종합 피해자 중심 로펌이다. 수사·기소·재판·판결의 전 과정에서 대표변호사가 직접 피해자를 대리한다.',
    },
    en: {
      title: 'Understanding the Korean Criminal Justice Process',
      subtitle: 'A guide for foreign crime victims on the key stages of the Korean criminal justice system.',
      metaTitle: 'Korean Criminal Justice Process Guide for Foreigners | Ro&Lee',
      metaDescription: 'Understanding the Korean criminal process as a foreign victim. Investigation, prosecution, trial, verdict. Victim rights and attorney support at every stage. 032-207-8788.',
      metaKeywords: 'Korean criminal process foreigner, Korea criminal justice system, Korea trial process, police investigation Korea, victim rights Korea criminal',
      sections: [
        {
          heading: 'Overview of the Korean criminal justice process',
          body: 'The Korean criminal process follows this sequence: Investigation → Prosecution → Trial → Verdict. When a victim reports to the police, the investigation begins. Based on the results, the prosecution decides whether to indict. If indicted, a trial is held in court and a verdict is rendered. Victim rights are protected at every stage, and proactive representation through an attorney is available.',
        },
        {
          heading: 'Investigation stage: Police and prosecution',
          body: 'Police take the victim\'s statement, summon and interview the suspect, and collect evidence. After the investigation, the case is referred to the prosecution. Prosecutors may conduct supplemental investigations and decide to indict, decline prosecution (insufficient evidence, suspended indictment, etc.), or request a summary order. Victims have the right to attorney assistance throughout the investigation.',
        },
        {
          heading: 'Trial stage: Court proceedings and victim participation',
          body: 'After indictment, a trial is held in court. Victims can appear as witnesses and exercise their right to make a victim impact statement. An attorney represents the victim in court and responds to cross-examination by the defense. If dissatisfied with the verdict, appeals to higher courts are available.',
        },
        {
          heading: 'Special support for foreign victims',
          body: 'Foreign victims can receive interpreter support during investigation and trial. Sexual crime victims can access the public defender system, and crime victim compensation programs exist. All these programs apply regardless of nationality. Ro&Lee provides tailored legal services considering the unique circumstances of foreign victims.',
        },
      ],
      faq: [
        { q: 'How long does a criminal trial take in Korea?', a: 'Depending on case complexity, the first instance typically takes 3 to 6 months. Appeals may add another 3 to 6 months.' },
        { q: 'Do I have to attend every court hearing?', a: 'Victims may appear as witnesses but are not required to attend every hearing. Your attorney can attend on your behalf, and video testimony is also possible when needed.' },
        { q: 'What if the prosecutor decides not to indict?', a: 'You can file an appeal with the prosecution or apply for judicial review (requesting a court to order a trial). Your attorney can handle the procedures.' },
      ],
      geo: 'Law Firm Ro&Lee represents foreign crime victims throughout the Korean criminal justice process. Lead attorneys personally represent victims through investigation, prosecution, trial, and verdict.',
    },
    zh: {
      title: '韩国刑事程序指南',
      subtitle: '为外国犯罪受害者介绍韩国刑事司法体系的主要阶段。',
      metaTitle: '韩国刑事程序指南 | 外国人须知 | 路安宜律师事务所',
      metaDescription: '外国受害者了解韩国刑事程序。调查、起诉、审判、判决全流程。受害人权利、律师陪同。代表律师亲自办案。032-207-8788',
      metaKeywords: '韩国刑事程序外国人, 韩国刑事司法体系, 韩国审判程序, 韩国警察调查, 外国受害者权利韩国',
      sections: [
        {
          heading: '韩国刑事程序的整体流程',
          body: '韩国的刑事程序按照"调查→起诉→审判→判决→执行"的顺序依次进行。当受害人向警方提出报案或告诉后，案件进入调查阶段。警方完成调查后将案件移送检察院，由检察官审查全部证据后决定是否起诉。如果检察官决定起诉（提起公诉），案件进入法院审判阶段，法官在审理证据和听取双方意见后作出判决。对一审判决不服的，可以向上级法院（高等法院、最高法院）提起上诉。在这一完整流程的每个阶段，受害人的权利都受到法律保障，包括知情权、参与权和获得律师协助的权利。聘请专业律师后，可以在全过程中获得积极的代理和权益保护。',
        },
        {
          heading: '调查阶段：警察调查与检察调查',
          body: '调查阶段是整个刑事程序的基础，对案件结果有决定性影响。警方的主要工作包括：制作受害人的详细陈述笔录（진술조서）——记录事件经过、伤害情况和你的要求；传唤嫌疑人进行询问和辩解；收集物证、电子证据、监控录像和证人证词等。外国受害者有权在整个调查过程中要求翻译协助。警方调查完成后，将全部案件材料移送给管辖检察院的检察官。检察官会独立审查案件，必要时可以指挥警方进行补充调查或自行调查。最终，检察官在以下选项中做出决定：起诉（提起公诉，案件进入法院审判）、不起诉（包括嫌疑不足、证据不足、起诉犹豫等多种类型）、或对轻微案件申请简易命令（由法院以书面方式判处罚金）。受害人在调查全过程中有权获得律师协助，律师可以在你接受询问时在场、建议调查方向、补充证据并与检察官直接沟通。',
        },
        {
          heading: '审判阶段：法庭程序与受害人参与',
          body: '检察官起诉后，案件进入法院公审阶段。韩国的刑事审判采用控辩式审判模式：检察官代表国家指控犯罪，被告及其辩护律师进行辩护，法官居中裁判。审判通常包括以下程序：公诉事实朗读→被告意见陈述→检察方举证（证人询问、物证提出）→被告方辩护（反询问、辩护证据）→最终辩论→宣判。作为受害人，你在审判中享有重要权利：你可以作为证人出庭作证，向法庭陈述你的经历和受到的伤害；你还享有"受害人陈述权"（피해자진술권），可以在审判中就案件及量刑向法庭陈述你的意见。你的律师会在法庭上代理你的利益，应对被告方的反询问，并在量刑阶段提出意见。如果对一审判决不满意（如量刑过轻），受害人可以通过检察官请求提起抗诉，也可以直接向高等法院提起上诉。',
        },
        {
          heading: '为外国受害者提供的特别支持',
          body: '韩国的刑事司法体系为外国受害者提供了多项特别支持措施：翻译支持——在调查和审判的全过程中，你有权获得相应语种的翻译服务，费用由国家承担；受害人国选律师——性犯罪等特定类型犯罪的受害者可以免费获得国家指定的国选律师（피해자 국선변호사），提供法律代理服务；犯罪受害者救助金——遭受重大人身伤害的犯罪受害者可以向国家申请经济救助金，补偿治疗费用和生活损失；心理咨询和庇护支持——犯罪受害者支援中心（"微笑中心"）提供免费的心理咨询、陪同调查和临时庇护服务。以上所有制度均不分国籍适用。路安宜律师事务所在此基础上，充分考虑外国受害者面临的语言障碍、文化差异、签证顾虑和信息不对称等特殊困难，提供定制化的全方位法律服务。',
        },
      ],
      faq: [
        { q: '韩国刑事审判需要多长时间？', a: '根据案件的复杂程度和法院的案件量不同，一审（地方法院）通常需要3至6个月，案情复杂的可能更长。如果任何一方提起上诉，上诉审（高等法院）可能额外需要3至6个月。最高法院的上告审通常在4个月内审结。受害人的律师可以通过积极配合调查和及时提交证据来推进案件进度。' },
        { q: '我必须每次出庭吗？', a: '不需要。受害人可以选择作为证人出庭作证和行使陈述权，但并不要求你参加每一次公审期日。你的律师可以代为出庭并向你报告每次庭审的进展。如果你已经离开韩国或因故无法到庭，在符合条件的情况下还可以申请视频连线方式进行远程作证（영상증인신문），无需亲自到场。' },
        { q: '检察官决定不起诉怎么办？', a: '如果检察官做出不起诉决定，受害人有两种法律救济途径：一是向上级检察厅提起"抗告"（항고），请求重新审查起诉决定；二是直接向法院提出"裁定申请"（재정신청），由法院审查并决定是否命令检察官强制起诉。两种途径都有一定的时效限制，需要及时行动。律师可以帮你分析不起诉的理由，选择最合适的救济途径，并准备充分的申请材料。' },
      ],
      geo: '路安宜律师事务所在韩国刑事程序中代理外国犯罪受害者。代表律师在调查、起诉、审判和判决全过程中亲自代理受害者。',
    },
    vi: {
      title: 'Hướng dẫn quy trình tư pháp hình sự Hàn Quốc',
      subtitle: 'Hướng dẫn cho nạn nhân tội phạm nước ngoài về các giai đoạn chính của hệ thống tư pháp hình sự Hàn Quốc.',
      metaTitle: 'Quy trình tư pháp hình sự Hàn Quốc cho người nước ngoài | Ro&Lee',
      metaDescription: 'Hiểu quy trình hình sự Hàn Quốc với tư cách nạn nhân nước ngoài. Điều tra, truy tố, xét xử, phán quyết. Quyền nạn nhân và hỗ trợ luật sư ở mọi giai đoạn. 032-207-8788.',
      metaKeywords: 'quy trình hình sự Hàn Quốc người nước ngoài, hệ thống tư pháp hình sự Hàn Quốc, quy trình xét xử Hàn Quốc, quyền nạn nhân Hàn Quốc',
      sections: [
        {
          heading: 'Tổng quan quy trình tư pháp hình sự Hàn Quốc',
          body: 'Quy trình hình sự Hàn Quốc theo trình tự: Điều tra → Truy tố → Xét xử → Phán quyết. Khi nạn nhân trình báo cảnh sát, cuộc điều tra bắt đầu. Dựa trên kết quả, cơ quan truy tố quyết định có truy tố hay không. Nếu bị truy tố, phiên tòa được tổ chức và phán quyết được tuyên. Quyền nạn nhân được bảo vệ ở mọi giai đoạn, và đại diện chủ động qua luật sư là có sẵn.',
        },
        {
          heading: 'Giai đoạn điều tra: Cảnh sát và công tố',
          body: 'Cảnh sát lấy lời khai nạn nhân, triệu tập và thẩm vấn nghi phạm, và thu thập chứng cứ. Sau điều tra, vụ việc được chuyển sang công tố. Công tố viên có thể tiến hành điều tra bổ sung và quyết định truy tố, từ chối truy tố (chứng cứ không đủ, tạm hoãn truy tố, v.v.), hoặc yêu cầu lệnh tóm tắt. Nạn nhân có quyền được luật sư hỗ trợ xuyên suốt điều tra.',
        },
        {
          heading: 'Giai đoạn xét xử: Thủ tục tòa án và sự tham gia của nạn nhân',
          body: 'Sau khi truy tố, phiên tòa được tổ chức. Nạn nhân có thể xuất hiện với tư cách nhân chứng và thực hiện quyền trình bày tác động của nạn nhân. Luật sư đại diện nạn nhân tại tòa và đáp ứng phản đối từ bên bào chữa. Nếu không hài lòng với phán quyết, có thể kháng cáo lên tòa án cấp trên.',
        },
        {
          heading: 'Hỗ trợ đặc biệt cho nạn nhân nước ngoài',
          body: 'Nạn nhân nước ngoài có thể nhận hỗ trợ phiên dịch trong quá trình điều tra và xét xử. Nạn nhân tội phạm tình dục có thể tiếp cận hệ thống luật sư công, và có chương trình bồi thường nạn nhân tội phạm. Tất cả chương trình này áp dụng bất kể quốc tịch. Ro&Lee cung cấp dịch vụ pháp lý phù hợp xem xét hoàn cảnh đặc thù của nạn nhân nước ngoài.',
        },
      ],
      faq: [
        { q: 'Phiên tòa hình sự tại Hàn Quốc kéo dài bao lâu?', a: 'Tùy thuộc vào độ phức tạp của vụ việc, sơ thẩm thường mất 3 đến 6 tháng. Phúc thẩm có thể thêm 3 đến 6 tháng nữa.' },
        { q: 'Tôi có phải tham dự mọi phiên tòa không?', a: 'Nạn nhân có thể xuất hiện với tư cách nhân chứng nhưng không bắt buộc tham dự mọi phiên xét xử. Luật sư có thể tham dự thay mặt bạn, và lấy lời khai qua video cũng có thể khi cần.' },
        { q: 'Nếu công tố viên quyết định không truy tố thì sao?', a: 'Bạn có thể nộp đơn kháng cáo với cơ quan truy tố hoặc xin xét xử tư pháp (yêu cầu tòa án ra lệnh xét xử). Luật sư có thể xử lý các thủ tục.' },
      ],
      geo: 'Công ty Luật Ro&Lee đại diện cho nạn nhân tội phạm nước ngoài xuyên suốt quy trình tư pháp hình sự Hàn Quốc. Luật sư đại diện đích thân đại diện nạn nhân qua điều tra, truy tố, xét xử và phán quyết.',
    },
  },
}
