import type { Dictionary } from "../types";

/**
 * 简体中文 — 站点通用文案
 * 法律广告规范：不使用"保证胜诉/保证无罪/保证结果/最好/第一"等表述；
 * 结论性表达一律使用"可能""根据案件情况""需要具体判断"。
 */
export const zhSite: Omit<Dictionary, "caseList"> = {
  locale: "cn",
  htmlLang: "zh-CN",
  langLabel: "中文",
  ogLocale: "zh_CN",
  brand: { name: "Roh&Lee China Desk", sub: "Roh&Lee 律师事务所" },

  meta: {
    title: "韩国律师中文法律咨询 | Roh&Lee China Desk",
    description:
      "在韩国遇到法律问题？韩国律师直接提供法律咨询，预约后可由中文翻译在场面谈。警察调查、性犯罪、拘留逮捕、诈骗、暴力伤害、酒驾、租房押金纠纷等，面向在韩中国人及外国人。由 Law Firm Roh&Lee 运营。",
    keywords: [
      "韩国律师", "韩国华人律师", "在韩中国人律师", "韩国刑事律师", "韩国刑事案件",
      "韩国警察调查", "韩国法律咨询", "中国人在韩国被抓", "中国人在韩国被警察调查", "在韩国被告怎么办",
    ],
  },

  nav: { cases: "案件类型", process: "咨询流程", about: "关于我们", faq: "常见问题", contact: "联系我们", consult: "立即咨询", menu: "菜单", close: "关闭" },

  firmInfo: { name: "Law Firm Roh&Lee（법률사무소 로앤이）", address: "韩国 京畿道 富川市", adLawyer: "李宥琳 律师" },

  common: {
    home: "首页",
    wechatConsult: "微信咨询",
    wechatContact: "微信联系",
    consultNow: "立即中文咨询",
    chineseLegalConsult: "中文法律咨询",
    phone: "电话咨询",
    backHome: "返回首页",
    relatedCases: "您可能也想了解",
    operatedBy: "Operated by Law Firm Roh&Lee",
    disclaimer:
      "本页内容为一般性法律信息，不构成针对具体案件的法律意见。每个案件的结果取决于具体事实与证据，需要由律师根据案件情况具体判断。",
  },

  hero: {
    eyebrow: "韩国律师 · 中文法律咨询",
    headline: ["在韩国遇到法律问题？", "韩国律师用中文为您提供法律服务。"],
    topics: ["刑事案件", "性犯罪", "暴力伤害", "诈骗", "酒驾", "拘留逮捕", "租房纠纷", "出入境"],
    trustLine: "韩国律师直接咨询",
    audienceLine: "面向在韩中国人及外国人的法律服务",
    pathPrompt: "请先选择您目前的情况",
    paths: {
      victim: { title: "我是受害者", desc: "我遭受了犯罪或损失" },
      accused: { title: "我正在接受调查或审判", desc: "我正在接受警方调查、检察机关调查或法院审判" },
    },
    quickTitle: "您目前的情况是？",
    quickOr: "或者直接联系我们",
    quickForm: "在线咨询",
  },

  trust: [
    { title: "韩国律师直接负责", body: "从咨询到出庭，由律师本人处理" },
    { title: "中文翻译在场", body: "提前预约，可由中文翻译陪同面谈" },
    { title: "依法保密", body: "律师对咨询内容负有保密义务" },
    { title: "受害人与辩护均可", body: "受害人代理及刑事辩护均可咨询" },
  ],

  cases: {
    title: "您遇到的是哪一类问题？",
    subtitle: "选择最接近的情况，先了解该做什么、不该做什么，再与韩国律师确认。",
    filterAll: "全部",
    filterLabels: { victim: "我是受害者", accused: "接受调查 / 审判" },
  },

  why: {
    title: "语言不同，法律程序也不同。",
    body: [
      "很多外国人在韩国遇到法律问题时，因为不了解韩国的警察调查、检察机关和法院程序，容易错过重要的应对时机。",
    ],
    listLead: "韩国律师可以根据案件情况说明：",
    list: [
      "现在应该做什么",
      "哪些话需要谨慎陈述",
      "应该准备哪些证据",
      "是否需要律师陪同调查",
      "案件可能经过哪些程序",
      "家属可以做什么",
      "对外国人的签证及出入境是否可能产生影响",
    ],
    note: "具体结果需要根据案件事实和证据具体判断。我们不会对案件结果作出任何保证，但会如实说明可能的风险与选择。",
  },

  direct: {
    title: "从咨询到出庭，由韩国律师本人负责",
    body: "咨询、案件分析、陪同调查、出庭及和解协商，均由负责律师直接处理，不转交他人。",
  },

  process: {
    title: "咨询流程",
    steps: [
      { no: "01", title: "中文咨询申请", body: "通过微信、在线表单或电话联系我们。" },
      { no: "02", title: "韩国律师确认案件情况", body: "律师了解案件类型、目前程序及紧急程度。" },
      { no: "03", title: "法律咨询", body: "根据韩国法律说明案件风险和可能的应对方向。来所面谈可预约中文翻译在场。" },
      { no: "04", title: "委托律师", body: "如有需要，可委托律师处理警方调查、检察机关、法院审判等程序。" },
    ],
  },

  about: {
    title: "关于我们",
    firmEn: "Law Firm Roh&Lee",
    firmKo: "법률사무소 로앤이",
    body: [
      "Roh&Lee是一家位于韩国的律师事务所。",
      "我们为在韩国生活或与韩国法律事务有关的外国人提供法律咨询及案件代理服务，同时代理犯罪受害人，并为接受调查或审判的当事人提供刑事辩护。",
    ],
    lawyersTitle: "负责律师",
    lawyers: [
      {
        id: "lee",
        name: "李宥琳",
        nameKo: "이유림",
        role: "代表律师",
        title: "韩国律师",
        focus: ["刑事案件", "性犯罪", "跟踪骚扰", "数字性犯罪", "个人信息"],
        bio: ["忠北大学法学专门研究生院 毕业", "合著《피해자 감별사회》（博英社，2026）"],
      },
      {
        id: "roh",
        name: "卢彩恩",
        nameKo: "노채은",
        role: "代表律师",
        title: "韩国律师",
        focus: ["刑事案件", "财产犯罪", "刑事辩护"],
        bio: [],
      },
    ],
  },

  faq: {
    title: "常见问题",
    items: [
      { q: "我不会韩语，也可以咨询吗？", a: "可以。本所有中文翻译人员，提前预约后，可在中文翻译在场的情况下与韩国律师面谈咨询。也可以先通过微信或在线表单用中文说明案件情况。" },
      { q: "我人在中国，也可以咨询韩国的案件吗？", a: "可以先进行咨询。是否可以委托处理，需要根据案件类型和目前程序具体判断。" },
      { q: "家人在韩国拘留所，可以委托律师吗？", a: "可以。律师可以根据案件情况进行律师会见并了解案件进展。家属也可以代为咨询。" },
      { q: "我是犯罪受害人，也可以咨询吗？", a: "可以。可以就报警、调查、证据整理、刑事程序及损害赔偿等问题进行咨询。" },
      { q: "我正在被警方调查，也可以委托吗？", a: "可以。Roh&Lee同时提供刑事案件辩护服务。" },
      { q: "咨询内容会保密吗？", a: "律师依法对执业过程中知悉的信息承担保密义务。您提交的信息仅用于案件咨询。" },
      { q: "咨询需要费用吗？", a: "咨询方式和费用会在预约时事先说明。正式委托前，会以书面委托合同明确律师费用和服务范围。" },
    ],
  },

  finalCta: {
    title: "在韩国遇到法律问题，不要独自判断。",
    body: ["越早了解韩国法律程序，", "越能更冷静地决定下一步应该怎么做。"],
    tag: "韩国律师直接咨询",
  },

  wechatModal: {
    title: "微信咨询",
    body: "扫描二维码添加微信，添加时请简单备注案件类型（例如：警察调查 / 诈骗 / 家人被拘留）。用手机浏览时，可长按保存二维码，再在微信「扫一扫」中从相册选择。",
    idLabel: "微信号",
    copy: "复制",
    copied: "已复制",
    qrAlt: "Roh&Lee China Desk 微信二维码",
    fallback: "暂时无法使用微信？也可以通过在线表单或电话联系我们。",
    formLabel: "在线表单",
    openInWechat: "在微信中打开",
    close: "关闭",
  },

  form: {
    title: "中文法律咨询申请",
    subtitle: "请简单填写以下信息。律师确认后会通过您留下的方式与您联系。如需来所面谈，可预约中文翻译在场。",
    fields: {
      name: "姓名 / 称呼",
      namePh: "例如：王先生、李女士",
      contactMethod: "联系方式",
      contactValue: "微信号 / 电话 / 邮箱",
      contactValuePh: "请填写可以联系到您的账号或号码",
      replyTitle: "回复方式",
      replyNote: "律师会通过微信或KakaoTalk回复您。请至少填写其中一项。",
      wechatId: "微信号",
      wechatPh: "例如：wang_88",
      wechatHint: "请确认微信「添加我的方式」中已允许通过微信号添加",
      kakaoId: "KakaoTalk ID",
      kakaoPh: "如有KakaoTalk请填写",
      kakaoHint: "请确认已开启「允许通过ID搜索」",
      phone: "电话",
      phonePh: "选填，例如 +86 138… / 010-…",
      replyVia: "希望通过哪里回复？",
      replyNeedOne: "请至少填写微信号或KakaoTalk ID中的一项。",
      country: "目前所在国家",
      caseType: "案件类型",
      caseTypePh: "请选择",
      role: "我是",
      stage: "目前案件阶段",
      description: "请简单说明情况",
      descriptionPh: "例如：什么时候、在哪里发生了什么事，目前收到了什么通知。可以只写大概情况。",
      urgent: "紧急情况",
      urgentHint: "家人刚被逮捕，或近几天内需要去警察局 / 检察厅 / 法院",
      consent: "我同意为咨询目的收集和使用上述个人信息",
      consentLink: "查看隐私政策",
    },
    contactMethods: [
      { value: "wechat", label: "微信" },
      { value: "phone", label: "电话" },
      { value: "email", label: "邮箱" },
      { value: "kakaotalk", label: "KakaoTalk" },
    ],
    countries: [
      { value: "KR", label: "韩国" },
      { value: "CN", label: "中国" },
      { value: "OTHER", label: "其他国家/地区" },
    ],
    roles: [
      { value: "victim", label: "受害人" },
      { value: "accused", label: "被调查人 / 被告人" },
      { value: "family", label: "家属" },
      { value: "other", label: "其他" },
    ],
    stages: [
      { value: "not_reported", label: "尚未报警" },
      { value: "police", label: "警方调查" },
      { value: "prosecution", label: "检察机关" },
      { value: "court", label: "法院审判" },
      { value: "detained", label: "已被拘留" },
      { value: "unknown", label: "不清楚" },
    ],
    otherCaseType: "其他法律问题",
    submit: "提交咨询申请",
    submitting: "正在提交…",
    required: "必填",
    error: "提交失败，请稍后重试，或直接通过微信 / 电话联系我们。",
    privacyNote: "您提交的信息仅用于案件咨询，律师依法负有保密义务。",
  },

  received: {
    title: "咨询申请已提交",
    body: ["您的咨询申请已收到。", "Roh&Lee确认内容后将与您联系。"],
    nextTitle: "接下来",
    next: [
      "律师会先确认案件类型、目前阶段和紧急程度。",
      "律师会通过您留下的微信或KakaoTalk回复您，并说明咨询方式。",
      "在此之前，请保存好与案件有关的通知、聊天记录、转账记录等资料，不要删除。",
    ],
    urgentTitle: "情况紧急？",
    urgentBody: "如家人刚被逮捕或马上需要接受调查，请同时通过微信或电话联系我们。",
    addUsTitle: "为了顺利收到回复",
    addUsBody: "建议您也先添加我们的微信或KakaoTalk频道，这样回复不会被漏掉。",
  },

  footer: {
    operator: "运营主体",
    service: "韩国律师提供法律咨询及案件代理服务。",
    address: "地址",
    phone: "电话",
    email: "邮箱",
    kakao: "KakaoTalk",
    bizNo: "营业执照号",
    adLawyer: "广告责任律师",
    privacy: "隐私政策",
    mainSite: "Roh&Lee 韩文官网",
    notice: "本网站内容仅供一般参考，不构成法律意见，也不保证任何案件结果。",
  },

  privacy: {
    title: "隐私政策",
    updated: "生效日期：2026年10月",
    sections: [
      {
        h: "1. 收集的信息及目的",
        p: [
          "法律事务所 Roh&Lee（법률사무소 로앤이，以下简称“本所”）为提供法律咨询，收集以下信息：姓名或称呼、联系方式（微信号、KakaoTalk ID、电话等）、所在国家、案件类型、身份（受害人、被调查人、家属等）、案件阶段、案件情况说明及紧急程度。",
          "上述信息仅用于确认咨询内容、与您联系及提供法律咨询，不用于其他目的。",
        ],
      },
      {
        h: "2. 保存期限",
        p: [
          "咨询信息自收集之日起保存3年，之后予以销毁。如您委托本所处理案件，则按照委托合同及相关法律规定的期限保存。",
          "您可以随时要求删除您的信息，本所将及时处理（法律另有规定的除外）。",
        ],
      },
      {
        h: "3. 向第三方提供",
        p: ["除法律规定或经您同意外，本所不会向第三方提供您的个人信息。"],
      },
      {
        h: "4. 委托处理",
        p: ["为接收和管理咨询申请，本所可能使用网站托管、表单接收等服务。相关服务提供者仅在必要范围内处理信息，并负有保密义务。"],
      },
      {
        h: "5. 您的权利",
        p: ["您可以随时要求查阅、更正、删除您的个人信息或停止处理。拒绝提供信息时，可能无法提供在线咨询服务。"],
      },
      {
        h: "6. 律师保密义务",
        p: ["根据韩国《律师法》，律师对在执业过程中知悉的秘密负有保密义务。"],
      },
      {
        h: "7. 联系方式",
        p: ["个人信息保护负责人：李宥琳 律师", "邮箱：rohetlee@naver.com　电话：+82-32-207-8788　KakaoTalk：@법률사무소로앤이"],
      },
    ],
  },

  contact: {
    title: "联系我们",
    subtitle: "请选择方便的方式。情况紧急时，建议同时使用微信或电话。",
    channels: "联系方式",
    emailLabel: "邮箱",
    phoneNote: "韩国境内拨打 032-207-8788",
    kakaoLabel: "KakaoTalk",
    kakaoNote: "点击进入KakaoTalk频道",
  },

  notFound: { title: "页面不存在", back: "返回首页" },

  caseDetail: {
    sidebarTitle: "案件类型",
    consultBoxTitle: "需要韩国律师确认？",
    consultBoxBody: "告诉我们目前的情况，律师会说明下一步。",
    situation: "您现在的情况",
    firstSteps: "现在最先要做的事",
    donts: "不要这样做",
    procedure: "韩国的程序",
    lawyerHelp: "律师可以帮您做什么",
    faq: "常见问题",
    onThisPage: "本页内容",
  },
};
