(()=>{const buttons=[...document.querySelectorAll('[data-case-filter]')],entries=[...document.querySelectorAll('[data-case-category]')],count=document.querySelector('.case-count');if(!buttons.length)return;const filter=(value)=>{let n=0;entries.forEach(el=>{el.hidden=value!=='all'&&el.dataset.caseCategory!==value;if(!el.hidden)n++});buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.caseFilter===value)));if(count)count.textContent=`${n}개의 사건 기록`};buttons.forEach(b=>b.addEventListener('click',()=>filter(b.dataset.caseFilter)));filter('all')})();

// Native horizontal scrolling keeps touch, keyboard and trackpad navigation responsive.
(()=>{
 document.querySelectorAll('.case-section:not(.case-archive) .case-grid').forEach((belt,index)=>{
  if(belt.querySelectorAll('.case-card').length<2)return;
  belt.id ||= 'case-belt-'+index;
  belt.tabIndex=0;belt.setAttribute('role','region');belt.setAttribute('aria-label','성공사례 가로 목록');
  const controls=document.createElement('div');controls.className='case-belt-controls';
  const hint=document.createElement('span');hint.textContent='옆으로 넘겨 더 많은 사례 보기';controls.append(hint);
  const prev=document.createElement('button'),next=document.createElement('button');
  for(const [button,label,text] of [[prev,'이전 성공사례','←'],[next,'다음 성공사례','→']]){
   button.type='button';button.setAttribute('aria-label',label);button.setAttribute('aria-controls',belt.id);button.textContent=text;controls.append(button);
  }
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const move=direction=>{const card=belt.querySelector('.case-card');const gap=parseFloat(getComputedStyle(belt).columnGap)||20;belt.scrollBy({left:direction*(card.getBoundingClientRect().width+gap),behavior:reduced.matches?'instant':'smooth'})};
  prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  function update(){prev.disabled=belt.scrollLeft<=2;next.disabled=belt.scrollLeft+belt.clientWidth>=belt.scrollWidth-2}
  belt.addEventListener('scroll',update,{passive:true});
  if('ResizeObserver'in window)new ResizeObserver(update).observe(belt);else addEventListener('resize',update);
  belt.insertAdjacentElement('afterend',controls);update();
 });
})();
