(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  addEventListener('pointermove', e => { root.style.setProperty('--mx', e.clientX + 'px'); root.style.setProperty('--my', e.clientY + 'px'); }, { passive: true });
  const win = document.querySelector('.app-window'), box = document.querySelector('.hero-visual');
  if (!win || !box) return;
  box.addEventListener('pointermove', e => {
    const r = box.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    win.style.transform = `perspective(1000px) rotateY(${x * 16}deg) rotateX(${-y * 12}deg) translateZ(0)`;
  });
  box.addEventListener('pointerleave', () => { win.style.transform = ''; });
})();
