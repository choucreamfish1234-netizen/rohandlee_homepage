(()=>{
 const page=document.querySelector('.victim-motion-page');if(!page)return;
 const cinema=page.querySelector('.victim-cinema'),stage=cinema.querySelector('.cinema-stage'),opening=stage.querySelector('.opening-copy'),closing=stage.querySelector('.closing-copy'),toggle=cinema.querySelector('.victim-motion-toggle');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');let paused=false,frame=0,observer;const animations=new Set();
 const clamp=x=>Math.max(0,Math.min(1,x));const smooth=(a,b,p)=>{const x=clamp((p-a)/(b-a));return x*x*(3-2*x)};
 page.querySelectorAll('.center-link').forEach((a,i)=>a.dataset.centerNumber=String(i+1).padStart(2,'0'));
 const reveal=[...page.querySelectorAll('.victim-directory-title,.center-link,.voices-heading,#contact h2')];
 function draw(){frame=0;if(page.dataset.motion!=='on')return;
  const rect=cinema.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;
  const p=clamp(-rect.top/Math.max(1,cinema.offsetHeight-stage.offsetHeight));
  const out=smooth(.16,.48,p),enter=smooth(.52,.83,p),dark=smooth(.28,.7,p);
  const vars={'--out':out,'--in':enter,'--dark':dark,'--photo-alpha':1-.84*smooth(.4,.85,p),'--photo-scale':1+.1*smooth(0,.55,p),'--photo-x':'0px','--photo-y':(-38*p)+'px','--copy-y':(-50*out)+'px','--end-y':(35*(1-enter))+'px','--mark-x':(-65*p)+'px','--bar':(100*p)+'%'};
  Object.entries(vars).forEach(([k,v])=>stage.style.setProperty(k,v));
  opening.inert=out>.85;closing.inert=enter<.5;closing.classList.toggle('is-active',enter>=.5);
  stage.querySelector('.chapter-number').textContent=p<.35?'01 — 당신의 곁에서':p<.7?'02 — 이야기를 듣고':'03 — 다음 단계로';
 }
 function schedule(){if(!frame&&page.dataset.motion==='on')frame=requestAnimationFrame(draw)}
 function animate(el){if(page.dataset.motion!=='on'||!el.animate)return;const row=el.classList.contains('center-link');const a=el.animate(row?[{transform:'translate3d(30px,18px,0)',opacity:.35},{transform:'none',opacity:1}]:[{transform:'translate3d(0,32px,0)',clipPath:'inset(0 0 75% 0)'},{transform:'none',clipPath:'inset(0 0 0 0)'}],{duration:row?650:900,easing:'cubic-bezier(.2,.75,.2,1)',delay:row?(Number(el.dataset.centerNumber)%2)*70:0});animations.add(a);a.onfinish=()=>animations.delete(a);}
 function configure(){const enabled=!paused&&!reduce.matches;page.dataset.motion=enabled?'on':'off';toggle.setAttribute('aria-pressed',String(!enabled));toggle.textContent=enabled?'모션 끄기':'모션 켜기';toggle.disabled=reduce.matches;
  if(frame){cancelAnimationFrame(frame);frame=0}animations.forEach(a=>a.cancel());animations.clear();observer?.disconnect();
  if(!enabled){stage.removeAttribute('style');opening.inert=false;closing.inert=false;return;}
  if('IntersectionObserver'in window){observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){animate(e.target);observer.unobserve(e.target)}}),{threshold:.12});reveal.forEach(el=>observer.observe(el));}
  draw();
 }
 toggle.addEventListener('click',()=>{paused=!paused;configure()});reduce.addEventListener('change',configure);addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);configure();
})();
