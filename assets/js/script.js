(function () {
  const tiles = Array.from(document.querySelectorAll('.location-mosaic-tile img'));
  if (!tiles.length) return;

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');
  const lbCounter = document.getElementById('lightboxCounter');
  const btnClose = document.getElementById('lightboxClose');
  const btnPrev = document.getElementById('lightboxPrev');
  const btnNext = document.getElementById('lightboxNext');

  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + tiles.length) % tiles.length;
    const img = tiles[currentIndex];
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = img.alt || '';
    lbCounter.textContent = (currentIndex + 1) + ' / ' + tiles.length;
  }

  function open(index) {
    show(index);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }

  tiles.forEach((img, idx) => {
    const tile = img.closest('.location-mosaic-tile');
    if (!tile) return;
    tile.setAttribute('role', 'button');
    tile.setAttribute('tabindex', '0');
    tile.setAttribute('aria-label', 'Apri immagine: ' + (img.alt || 'foto ' + (idx + 1)));
    tile.addEventListener('click', () => open(idx));
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(idx);
      }
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', (e) => { e.stopPropagation(); show(currentIndex - 1); });
  btnNext.addEventListener('click', (e) => { e.stopPropagation(); show(currentIndex + 1); });

  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(currentIndex - 1);
    else if (e.key === 'ArrowRight') show(currentIndex + 1);
  });

  // Touch swipe (mobile)
  let touchStartX = 0;
  lb.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx > 0) show(currentIndex - 1);
      else show(currentIndex + 1);
    }
  }, { passive: true });
})();

/* ══════════════════════════════════════
   SIDE NAV — Scrollspy (sezione attiva)
   ══════════════════════════════════════ */
(function () {
  const navItems = document.querySelectorAll('.sidenav-item');
  if (!navItems.length) return;

  const sections = Array.from(navItems)
    .map((a) => document.getElementById(a.dataset.target))
    .filter(Boolean);
  if (!sections.length) return;

  const byId = new Map();
  navItems.forEach((a) => byId.set(a.dataset.target, a));

  let activeId = null;
  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    navItems.forEach((a) => a.classList.toggle('is-active', a.dataset.target === id));
  }

  // Calcola quale sezione occupa maggiormente la zona centrale del viewport
  function computeActive() {
    const mid = window.innerHeight / 2;
    let best = null;
    let bestDist = Infinity;
    sections.forEach((s) => {
      const rect = s.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const center = (rect.top + rect.bottom) / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = s.id;
      }
    });
    if (best) setActive(best);
  }

  window.addEventListener('scroll', computeActive, { passive: true });
  window.addEventListener('resize', computeActive);
  computeActive();

  // Smooth scroll quando si clicca una voce
  navItems.forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.dataset.target;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    });
  });
})();
