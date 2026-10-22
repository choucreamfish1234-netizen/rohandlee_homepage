import { supabase } from '@/lib/supabase'
import { trackConversion } from '@/lib/track-conversion'

export function initConsultation() {
  if (document.getElementById('rl-consult')) return
  if (!document.querySelector('link[data-consultation-style]')) {
    const style = document.createElement('link')
    style.rel = 'stylesheet'
    style.href = '/renewal/consultation.css'
    style.dataset.consultationStyle = ''
    document.head.append(style)
  }
  const dialog = document.createElement('dialog')
  dialog.className = 'rl-consult'
  dialog.id = 'rl-consult'
  dialog.setAttribute('aria-labelledby', 'rl-consult-title')
  dialog.innerHTML = `
    <button type="button" class="rl-close" aria-label="상담 팝업 닫기">×</button>
    <p class="rl-eyebrow">LAW FIRM ROH & LEE</p>
    <h2 id="rl-consult-title" tabindex="-1">어떤 도움이 필요하신가요?</h2>
    <div class="rl-options">
      <p class="rl-intro">편하신 방법으로 로앤이에 문의해주세요.</p>
      <button type="button" class="rl-choice" data-email><span><strong>문의하기</strong><small>사건내용을 남겨주세요</small></span><span aria-hidden="true">↗</span></button>
      <a class="rl-choice rl-book" href="https://www.latpeed.com/products/vy4Pu" target="_blank" rel="noopener noreferrer"><span><strong>상담예약하기</strong><small>전화상담, 방문상담을 원하시는 일정에 예약하세요</small></span><span aria-hidden="true">↗</span></a>
      <a class="rl-other" href="https://pf.kakao.com/_YxgWxcn/chat" target="_blank" rel="noopener noreferrer">기타 문의는 카카오톡으로 문의해주세요 ↗</a>
    </div>
    <form class="rl-form" hidden>
      <button class="rl-back" type="button">← 문의 방법 선택</button>
      <p class="rl-intro">사건내용을 남겨주세요</p>
      <div class="rl-fields">
        <label>이름<input name="name" autocomplete="name" required maxlength="100"></label>
        <label>연락처<input name="phone" type="tel" autocomplete="tel" required maxlength="30"></label>
      </div>
      <label>이메일<input name="email" type="email" autocomplete="email" required maxlength="254"></label>
      <label>문의 분야<select name="category"><option value="">선택해주세요</option><option>형사사건</option><option>민사·가사</option><option>채권추심</option><option>가상자산·코인</option><option>보이스피싱</option><option>기업법무</option><option>피해자 대리</option><option>기타</option></select></label>
      <label>문의 내용<textarea name="content" rows="4" required maxlength="10000"></textarea></label>
      <label class="rl-consent"><input name="privacy_consent" type="checkbox" required><span>문의 접수 및 답변을 위한 개인정보 수집·이용에 동의합니다. <a href="/privacy" target="_blank" rel="noopener noreferrer">개인정보처리방침 ↗</a></span></label>
      <p class="rl-status" role="status" aria-live="polite"></p>
      <button class="rl-submit" type="submit">문의하기 ↗</button>
    </form>`
  document.body.append(dialog)
  const form = dialog.querySelector('form')!
  const options = dialog.querySelector<HTMLElement>('.rl-options')!
  const title = dialog.querySelector<HTMLElement>('h2')!
  const status = dialog.querySelector<HTMLElement>('.rl-status')!
  const submit = dialog.querySelector<HTMLButtonElement>('.rl-submit')!
  let opener: HTMLElement | null = null
  let overflow = ''
  let pending = false
  let submitted = false
  const select = (email: boolean) => {
    options.hidden = email
    form.hidden = !email
    title.textContent = email ? '문의하기' : '어떤 도움이 필요하신가요?'
    title.focus()
  }
  const open = (trigger: HTMLElement) => {
    if (dialog.open) return
    opener = trigger
    if (submitted) { form.reset(); status.textContent = ''; submit.disabled = false; submitted = false }
    select(false)
    if (document.body.classList.contains('business-page')) {
      form.querySelector<HTMLSelectElement>('[name=category]')!.value = '기업법무'
    }
    if (document.body.classList.contains('collection-fees-page')) {
      form.querySelector<HTMLSelectElement>('[name=category]')!.value = '채권추심'
      form.querySelector<HTMLTextAreaElement>('[name=content]')!.placeholder = '채권 유형·금액, 지급기일 또는 미지급 기간, 집행권원 유무, 기존 소송·압류, 알고 있는 회수 단서를 적어주세요.'
    }
    overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    title.focus()
    trackConversion('consultation_open')
  }
  dialog.querySelector('.rl-close')!.addEventListener('click', () => dialog.close())
  dialog.addEventListener('close', () => { document.body.style.overflow = overflow; opener?.focus() })
  dialog.addEventListener('click', e => {
    if (e.target !== dialog) return
    const r = dialog.getBoundingClientRect()
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close()
  })
  dialog.querySelector('[data-email]')!.addEventListener('click', () => { select(true); trackConversion('email_consultation_select') })
  dialog.querySelector('.rl-back')!.addEventListener('click', () => select(false))
  dialog.querySelector('.rl-book')!.addEventListener('click', () => trackConversion('rapid_consultation_click'))
  dialog.querySelector('.rl-other')!.addEventListener('click', () => trackConversion('kakao_click'))
  document.querySelectorAll<HTMLAnchorElement>('[data-consultation],a[href="/consultation"],a[href="/consultation#inquiry"],.hero-action,.nav-cta,.detail-hero>.pill').forEach(link => {
    if (!/상담|문의/.test(link.textContent || '')) return
    // Preserve the existing CTA layout and replace only its behavior.
    link.href = '#rl-consult'
    link.removeAttribute('target')
    link.setAttribute('aria-haspopup', 'dialog')
    link.setAttribute('aria-controls', dialog.id)
    link.addEventListener('click', e => { e.preventDefault(); open(link) })
  })
  form.addEventListener('submit', async e => {
    e.preventDefault()
    if (pending || submitted || !form.reportValidity()) return
    pending = true; submit.disabled = true; submit.textContent = '접수 중…'; status.textContent = ''
    const data = new FormData(form)
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw new Error('unavailable')
      const { error } = await supabase.from('consultations').insert([{
        name: String(data.get('name')).trim(), phone: String(data.get('phone')).trim(),
        email: String(data.get('email')).trim(), category: data.get('category') || null,
        content: String(data.get('content')).trim(), privacy_consent: data.get('privacy_consent') === 'on',
        status: 'new', created_at: new Date().toISOString()
      }])
      if (error) throw error
      submitted = true
      status.textContent = '문의가 접수되었습니다. 남겨주신 연락처로 답변드리겠습니다.'
      submit.textContent = '접수 완료'
      trackConversion('form_submit')
    } catch {
      status.textContent = '문의 접수에 실패했습니다. 잠시 후 다시 시도하거나 전화 032-207-8788로 문의해주세요.'
      submit.disabled = false; submit.textContent = '다시 문의하기 ↗'
    } finally { pending = false }
  })
}
