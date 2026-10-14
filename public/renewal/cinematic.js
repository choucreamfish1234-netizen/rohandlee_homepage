(() => {
  const cinema = document.querySelector('.cinema');
  if (!cinema) return;
  const stage = cinema.querySelector('.cinema-stage');
  const opening = cinema.querySelector('.opening-copy');
  const closing = cinema.querySelector('.closing-copy');
  const chapter = cinema.querySelector('.chapter-number');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 800px)');
  const clamp = x => Math.max(0, Math.min(1, x));
  const smooth = (a, b, p) => {
    const t = clamp((p - a) / (b - a));
    return t * t * (3 - 2 * t);
  };
  let ticking = false, lastProgress = -1;
  function draw() {
    ticking = false;
    if (reduced.matches) {
      stage.removeAttribute('style');
      opening.inert = false;
      closing.inert = true;
      closing.classList.remove('is-active');
      lastProgress = -1;
      return;
    }
    const rect = cinema.getBoundingClientRect();
    // Rendered sticky height keeps iOS browser chrome out of the timeline.
    const p = clamp(-rect.top / Math.max(1, cinema.offsetHeight - stage.clientHeight));
    if (Math.abs(p - lastProgress) < .0005) return;
    lastProgress = p;
    const focus = smooth(0, .18, p), out = smooth(.25, .59, p);
    const dark = smooth(.30, .70, p), enter = smooth(.47, .75, p), end = smooth(.8, 1, p);
    const vars = {
      '--out': out, '--in': enter, '--dark': dark,
      '--photo-alpha': (.90 + .10 * focus) * (1 - .82 * smooth(.42, .86, p)),
      '--photo-blur': mobile.matches ? '0px' : (1.2 * (1 - focus) + 4 * smooth(.48, .86, p)) + 'px',
      '--photo-scale': .98 + .025 * focus + .045 * out,
      '--photo-x': (-10 * out) + 'px', '--photo-y': (12 * (1 - focus) - 20 * out) + 'px',
      '--copy-y': (-28 * out) + 'px', '--end-y': (24 * (1 - enter) - 6 * end) + 'px',
      '--mark-x': (-35 * p) + 'px', '--bar': (p * 100) + '%'
    };
    for (const [key, value] of Object.entries(vars)) stage.style.setProperty(key, value);
    closing.classList.toggle('is-active', enter > .5);
    closing.inert = enter < .5;
    opening.inert = out > .8;
    chapter.textContent = p < .3 ? '01 — PORTRAIT' : p < .65 ? '02 — FOCUS' : '03 — COMMITMENT';
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(draw); } }
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', () => { lastProgress = -1; request(); });
  for (const query of [reduced, mobile]) query.addEventListener('change', () => { lastProgress = -1; request(); });
  draw();
})();
