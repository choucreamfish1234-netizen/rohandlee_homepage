(()=>{
 const section=document.querySelector('.partner-section');if(!section)return;
 section.classList.add('partners-enhanced');
 const fine=matchMedia('(hover: hover) and (pointer: fine) and (min-width: 801px)'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const profiles=[...section.querySelectorAll('.partner-profile')];
 profiles.forEach(profile=>{
  const button=profile.querySelector('.portrait-button'),card=profile.querySelector('.career-hover'),full=profile.querySelector('.career-full'),photo=profile.querySelector('.individual-photo');full.hidden=true;
  let frame=0,point=null;
  function hide(){card.classList.remove('is-visible');photo.style.setProperty('--px','0px');photo.style.setProperty('--py','0px')}
  function position(e){point={x:e.clientX,y:e.clientY};if(frame)return;frame=requestAnimationFrame(()=>{frame=0;if(!point)return;const w=card.offsetWidth,h=card.offsetHeight;let x=point.x+24,y=point.y-70;if(x+w>innerWidth-16)x=point.x-w-24;y=Math.max(16,Math.min(y,innerHeight-h-16));card.style.setProperty('--cx',Math.max(16,x)+'px');card.style.setProperty('--cy',y+'px');if(!reduce.matches){const r=button.getBoundingClientRect();photo.style.setProperty('--px',((point.x-r.left)/r.width-.5)*9+'px');photo.style.setProperty('--py',((point.y-r.top)/r.height-.5)*6+'px')}})}
  button.addEventListener('pointerenter',e=>{if(fine.matches&&full.hidden){position(e);card.classList.add('is-visible')}});
  button.addEventListener('pointermove',e=>{if(fine.matches&&full.hidden)position(e)});
  button.addEventListener('pointerleave',hide);
  function close(){full.hidden=true;button.setAttribute('aria-expanded','false');hide()}
  button.addEventListener('click',()=>{const open=full.hidden;full.hidden=!open;button.setAttribute('aria-expanded',String(open));hide()});
  profile.querySelector('.career-close').addEventListener('click',()=>{close();button.focus({preventScroll:true})});
  profile.addEventListener('keydown',e=>{if(e.key==='Escape'){close();button.focus({preventScroll:true})}});
  addEventListener('scroll',hide,{passive:true});fine.addEventListener('change',hide);
 });
})();
