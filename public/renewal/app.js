document.documentElement.classList.add('js');
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu?.addEventListener('click',()=>{const on=nav.classList.toggle('open');menu.setAttribute('aria-expanded',on);menu.textContent=on?'닫기 −':'메뉴 +'});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const dlg=document.querySelector('dialog');document.querySelectorAll('[data-situation]').forEach(b=>b.addEventListener('click',()=>{dlg.querySelector('h2').textContent=b.textContent.replace('↗','').trim();dlg.querySelector('.dialog-copy').textContent=b.dataset.situation;dlg.showModal()}));dlg?.querySelector('.close').addEventListener('click',()=>dlg.close());dlg?.addEventListener('click',e=>{if(e.target===dlg){const r=dlg.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dlg.close()}});
const story=document.querySelector('.story'),title=document.querySelector('#step-title'),copy=document.querySelector('#step-copy'),steps=[...document.querySelectorAll('.steps button')];const states=[['당신의 이야기를.<br>사건의 출발점으로.','사건의 경위와 현재 상황을 듣고, 다가오는 조사와 기일을 함께 확인합니다.'],['흩어진 사실을.<br>하나의 전략으로.','기록과 자료를 검토하고 핵심 쟁점을 정리합니다. 사건에 맞는 대응 방향을 설명합니다.'],['수사부터 재판까지.<br>대표변호사가 직접.','조사 준비와 동행, 의견서 제출, 공판 대응까지. 상담한 대표변호사가 사건을 수행합니다.']];let last=-1;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;function setStep(i){if(i===last)return;last=i;title.innerHTML=states[i][0];copy.textContent=states[i][1];steps.forEach((s,n)=>{s.classList.toggle('active',n===i);s.setAttribute('aria-pressed',n===i)})}function scrollUpdate(){if(!reduced)document.querySelector('.art')?.style.setProperty('--shift',Math.min(scrollY*.22,180)+'px');if(story&&!reduced){const p=Math.max(0,Math.min(1,-story.getBoundingClientRect().top/(story.offsetHeight-innerHeight)));story.style.setProperty('--progress',p);setStep(Math.min(2,Math.floor(p*3)))}}let scheduled=false;addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{scrollUpdate();scheduled=false})}},{passive:true});steps.forEach((b,i)=>b.addEventListener('click',()=>{if(reduced)setStep(i);else scrollTo({top:scrollY+story.getBoundingClientRect().top+(story.offsetHeight-innerHeight)*(i/3+.04),behavior:'smooth'})}));scrollUpdate();

// Restore the established email / booking / Kakao contact routes on static renewal pages.
(()=>{
 const booking='https://www.latpeed.com/products/vy4Pu',kakao='https://pf.kakao.com/_YxgWxcn/chat';
 const external=(a,url)=>{a.href=url;a.target='_blank';a.rel='noopener noreferrer'};
 document.querySelectorAll('.hero-action,.nav-cta,.detail-hero>.pill').forEach(a=>{
  if(!/상담/.test(a.textContent))return;
  external(a,booking);a.textContent='상담 문의하기 ↗';
 });
 document.querySelectorAll('.contact .actions').forEach(actions=>{
  const email=actions.querySelector('a[href="/consultation"]');
  if(email){email.href='/consultation#inquiry';email.textContent='문의하기 ↗'}
  const reserve=document.createElement('a');reserve.className='pill';external(reserve,booking);reserve.textContent='상담 문의하기 ↗';actions.prepend(reserve);
  const other=document.createElement('a');other.className='contact-other';external(other,kakao);other.textContent='기타 문의는 카카오톡으로 문의해주세요 ↗';actions.insertAdjacentElement('afterend',other);
 });
 if(!document.querySelector('.renewal-kakao')){
  const a=document.createElement('a');a.className='renewal-kakao';external(a,kakao);a.setAttribute('aria-label','기타 문의 · 카카오톡 (새 창)');
  a.innerHTML='<span class="renewal-kakao-label">기타 문의</span><svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28"><path fill="currentColor" d="M14 4C8.477 4 4 7.477 4 11.667c0 2.7 1.737 5.067 4.36 6.433-.14.507-.9 3.267-.933 3.5 0 0-.02.167.087.233.107.067.233.033.233.033.307-.043 3.56-2.327 4.12-2.733.7.1 1.413.2 2.133.2 5.523 0 10-3.477 10-7.667S19.523 4 14 4z"/></svg>';
  document.body.append(a);
 }
})();
