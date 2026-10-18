(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const overlay = $('#commandOverlay');
  const input = $('#commandInput');
  const list = $('#commandList');
  const progress = $('#scrollProgress');
  const trigger = $('#openCommand');
  if (!overlay || !input || !list) return;

  const defaults = [...list.children];
  let activeIndex = 0;
  let visibleOptions = defaults;

  function openPalette() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    input.value = '';
    filterOptions('');
    input.focus();
  }
  function closePalette() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    trigger?.focus({preventScroll:true});
  }
  function filterOptions(query) {
    const q = query.trim().toLowerCase();
    visibleOptions = defaults.filter(option => option.textContent.toLowerCase().includes(q));
    defaults.forEach(option => { option.hidden = !visibleOptions.includes(option); });
    if (q) {
      const search = document.createElement('button');
      search.className = 'command-option';
      search.dataset.action = 'search';
      search.dataset.query = query.trim();
      search.innerHTML = '<span class="command-symbol">⌕</span><span>Search the web for “' +
        query.trim().replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])) +
        '”<small>Open results in your default search engine</small></span>';
      list.append(search);
      visibleOptions.push(search);
    }
    activeIndex = 0;
    highlightActive();
  }
  function highlightActive() {
    visibleOptions.forEach((option, i) => {
      option.style.background = i === activeIndex ? 'rgba(255,255,255,.07)' : '';
      option.setAttribute('aria-current', i === activeIndex ? 'true' : 'false');
    });
  }
  function runOption(option) {
    if (!option) return;
    const action = option.dataset.action;
    if (action === 'section') {
      closePalette();
      document.getElementById(option.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'});
    } else if (action === 'url') {
      window.open(option.dataset.url, '_blank', 'noopener,noreferrer');
      closePalette();
    } else if (action === 'search') {
      const q = option.dataset.query || input.value;
      window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank', 'noopener,noreferrer');
      closePalette();
    }
  }
  trigger?.addEventListener('click', openPalette);
  overlay.addEventListener('click', e => { if (e.target === overlay) closePalette(); });
  input.addEventListener('input', () => {
    defaults.forEach(option => option.hidden = false);
    $$('.command-option[data-action="search"]', list).forEach(option => option.remove());
    filterOptions(input.value);
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex + (e.key === 'ArrowDown' ? 1 : -1) + visibleOptions.length) % visibleOptions.length;
      highlightActive();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runOption(visibleOptions[activeIndex]);
    } else if (e.key === 'Escape') closePalette();
  });
  list.addEventListener('click', e => {
    const option = e.target.closest('.command-option');
    if (option) runOption(option);
  });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      overlay.classList.contains('open') ? closePalette() : openPalette();
    } else if (e.key === 'Escape' && overlay.classList.contains('open')) closePalette();
  });

  // Subtle, accessible reveal animation.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = $$('.value-card, .showcase-panel, .nexora-suite-group, .nexora-ai-card, .download-card, .release-banner, .manifesto, .principles-strip');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.body.classList.add('reveal-ready');
    revealTargets.forEach((el, i) => {
      el.classList.add('reveal-item');
      el.style.transitionDelay = `${(i % 3) * 65}ms`;
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -30px 0px'});
    revealTargets.forEach(el => observer.observe(el));
  }

  // Reading progress and section-aware navigation.
  let ticking = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    if (progress) progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, {passive:true});
  updateProgress();

  const navLinks = $$('.main-nav a[href^="#"]');
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('nav-active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, {rootMargin:'-25% 0px -65% 0px'});
    sections.forEach(section => navObserver.observe(section));
  }
})();
