(() => {
 const cinema=document.querySelector('.cinema');
 if(!cinema||document.body.classList.contains('victim-motion-page'))return;
 const stage=cinema.querySelector('.cinema-stage'),opening=cinema.querySelector('.opening-copy'),closing=cinema.querySelector('.closing-copy'),chapter=cinema.querySelector('.chapter-number'),manifesto=document.querySelector('.manifesto');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const clamp=x=>Math.max(0,Math.min(1,x));
 const smooth=(a,b,p)=>{const t=clamp((p-a)/(b-a));return t*t*(3-2*t)};
 let ticking=false;
 function draw(){
  ticking=false;if(reduced.matches){stage.removeAttribute("style");opening.inert=false;closing.inert=true;return}
  const p=clamp(-cinema.getBoundingClientRect().top/Math.max(1,cinema.offsetHeight-innerHeight));
  const focus=smooth(0,.22,p),out=smooth(.31,.57,p),dark=smooth(.4,.77,p),enter=smooth(.62,.85,p),end=smooth(.8,1,p);
  const vars={'--out':out,'--in':enter,'--dark':dark,'--photo-alpha':(.72+.28*focus)*(1-.85*smooth(.48,.91,p)),'--photo-blur':(1.5*(1-focus)+10*smooth(.51,.9,p))+'px','--photo-scale':.94+.08*focus+.11*out,'--photo-x':(-24*out)+'px','--photo-y':(30*(1-focus)-30*out)+'px','--copy-y':(-65*out)+'px','--end-y':(45*(1-enter)-12*end)+'px','--mark-x':(-90*p)+'px','--bar':(p*100)+'%'};
  for(const [k,v] of Object.entries(vars))stage.style.setProperty(k,v);
  closing.classList.toggle('is-active',enter>.5);closing.inert=enter<.5;opening.inert=out>.8;
  chapter.textContent=p<.36?'01 — PORTRAIT':p<.7?'02 — FOCUS':'03 — COMMITMENT';
  if(manifesto){const r=manifesto.getBoundingClientRect();const t=clamp((innerHeight*.8-r.top)/(innerHeight*.75));manifesto.querySelectorAll('p span').forEach((s,i)=>s.style.setProperty('--lit',(clamp(t*3-i*.68)*100)+'%'))}
 }
 function request(){if(!ticking){ticking=true;requestAnimationFrame(draw)}}
 addEventListener('scroll',request,{passive:true});addEventListener('resize',request);reduced.addEventListener('change',request);draw();
})();
