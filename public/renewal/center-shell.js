(() => {
  const header = document.querySelector('.center-hub > header');
  if (!header) return;
  const menu = header.querySelector('.menu');
  const nav = header.querySelector('#navigation');
  const mega = header.querySelector('.nav-mega');
  function closeMenu(restoreFocus = false) {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = '메뉴 +';
    mega.open = false;
    if (restoreFocus) menu.focus();
  }
  // Reuse app.js's toggle; supply keyboard dismissal and navigation cleanup.
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (nav.classList.contains('open')) closeMenu(true);
      else { mega.open = false; mega.querySelector('summary').focus(); }
    }
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target) && nav.classList.contains('open')) closeMenu();
  });
  matchMedia('(max-width: 800px)').addEventListener('change', () => closeMenu());
})();
