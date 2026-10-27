// Localized navigation without injecting Korean consultation dialogs or labels.
const button=document.querySelector('.menu');
const navigation=document.getElementById('navigation');
function setOpen(open){navigation?.classList.toggle('open',open);button?.setAttribute('aria-expanded',String(open));if(button)button.textContent=(open?button.dataset.close:button.dataset.open)+(open?' −':' +');}
button?.addEventListener('click',()=>setOpen(button.getAttribute('aria-expanded')!=='true'));
navigation?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setOpen(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&button?.getAttribute('aria-expanded')==='true'){setOpen(false);button.focus();}});
