/* ---- Edit these two lines when you publish a release ---- */
var NEXORA = {
  version: '0.9.8',
  // Put your installer on GitHub Releases (or any file host) and paste the page or file link here:
  windowsUrl: 'https://github.com/YOUR-USERNAME/nexora/releases/latest'
};
(function () {
  document.querySelectorAll('[data-dl]').forEach(function (a) { a.href = NEXORA.windowsUrl; });
  document.querySelectorAll('[data-version]').forEach(function (e) { e.textContent = NEXORA.version; });
  var ua = navigator.userAgent || '', isWin = /Windows/i.test(ua);
  document.querySelectorAll('[data-os-label]').forEach(function (e) { e.textContent = isWin ? 'Download for Windows' : 'Get Nexora for Windows'; });
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  var b = document.querySelector('.menu-btn'), l = document.querySelector('.links');
  if (b && l) { b.addEventListener('click', function () { var o = l.classList.toggle('open'); b.setAttribute('aria-expanded', String(o)); }); l.addEventListener('click', function (e) { if (e.target.tagName === 'A') { l.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); } }); }
})();
