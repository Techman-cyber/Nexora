(() => {
  'use strict';
  const cfg = window.NEXORA_CONFIG || {};
  const owner = String(cfg.owner || '').trim();
  const repo = String(cfg.repo || '').trim();
  const valid = owner && repo && !owner.startsWith('YOUR_') && !repo.startsWith('YOUR_');
  const root = valid ? `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}` : 'https://github.com';
  const releases = `${root}/releases`;
  const $ = id => document.getElementById(id);
  $('year').textContent = new Date().getFullYear();
  ['heroSource','footerSource'].forEach(id => { if ($(id)) $(id).href = root; });
  ['allReleases'].forEach(id => { if ($(id)) $(id).href = releases; });
  const menu = $('menuToggle'), nav = document.querySelector('.main-nav');
  menu?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); }));
  // Keep real logos visible: try the service favicon and alternate icon hosts instead of inventing letter marks.
  document.querySelectorAll('img[data-icon-fallbacks]').forEach(img => {
    const queue = String(img.dataset.iconFallbacks || '').split('|').filter(Boolean);
    let next = 0;
    const retry = () => {
      if (next < queue.length) { img.src = queue[next++]; return; }
      img.classList.add('brand-icon-unavailable');
      img.alt = img.alt || 'Brand logo unavailable';
    };
    img.addEventListener('error', retry);
    if (img.complete && img.naturalWidth === 0) retry();
  });
  // Remaining decorative shortcuts may use concise initials as a last-resort label; brand logo cards above do not.
  document.querySelectorAll('img[data-fallback]:not([data-icon-fallbacks])').forEach(img => img.addEventListener('error', () => {
    if (img.dataset.fallbackShown) return;
    img.dataset.fallbackShown = '1'; img.hidden = true;
    const fallback = document.createElement('span'); fallback.className = 'brand-icon-fallback'; fallback.textContent = img.dataset.fallback || '?';
    img.parentElement?.append(fallback);
  }, { once: true }));
  function formatBytes(n) { if (!Number.isFinite(n) || n <= 0) return ''; const u=['B','KB','MB','GB']; let i=0; while(n>=1024&&i<u.length-1){n/=1024;i++;} return `${n.toFixed(i?1:0)} ${u[i]}`; }
  function setButton(id, url, label) { const a=$(id); a.href=url; a.removeAttribute('aria-disabled'); a.innerHTML=`<span>${label}</span><b aria-hidden="true">↓</b>`; a.target='_blank'; a.rel='noopener noreferrer'; }
  function status(platform, text, kind) { $(`${platform}Note`).textContent=text; const dot=$(`${platform}Status`); dot.classList.toggle('available',kind==='available'); dot.classList.toggle('missing',kind==='missing'); }
  function missing(platform, platformName) { $(`${platform}Version`).textContent='Build not found'; status(platform,`No ${platformName} file found in the latest release.`, 'missing'); }
  if (!valid) { $('releaseHint').textContent='Set the GitHub owner and repository in config.js to enable direct downloads.'; return; }
  setButton('desktopDownload', releases, 'View Windows releases');
  setButton('androidDownload', releases, 'View Android releases');
  fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/latest`, {headers:{Accept:'application/vnd.github+json'}})
    .then(r => { if(!r.ok) throw new Error(r.status===404?'No public release was found yet.':`GitHub returned ${r.status}.`); return r.json(); })
    .then(release => {
      const assets=Array.isArray(release.assets)?release.assets:[];
      const winRx=cfg.desktopAssetPattern instanceof RegExp?cfg.desktopAssetPattern:/\.exe$/i;
      const apkRx=cfg.androidAssetPattern instanceof RegExp?cfg.androidAssetPattern:/\.apk$/i;
      const win=assets.find(a=>winRx.test(a.name));
      const apk=assets.find(a=>apkRx.test(a.name));
      const zip=!apk&&cfg.androidZipFallback?assets.find(a=>/android.*\.zip$/i.test(a.name)||/\.zip$/i.test(a.name)):null;
      const tag=release.tag_name||'Latest release';
      if(win){setButton('desktopDownload',win.browser_download_url,'Download for Windows');$('desktopVersion').textContent=tag;$('desktopSize').textContent=formatBytes(win.size);$('desktopFileType').textContent='EXE';status('desktop',`${win.name} · ready to download`,'available');} else {missing('desktop','.exe');}
      if(apk){setButton('androidDownload',apk.browser_download_url,'Download Android APK');$('androidVersion').textContent=tag;$('androidFileType').textContent='APK';$('androidSize').textContent=formatBytes(apk.size);status('android',`${apk.name} · installable Android package`,'available');}
      else if(zip){setButton('androidDownload',zip.browser_download_url,'Download Android ZIP');$('androidVersion').textContent=tag;$('androidFileType').textContent='ZIP';$('androidSize').textContent=formatBytes(zip.size);status('android',`${zip.name} · ZIP archive, not directly installable`,'available');}
      else {missing('android','.apk');}
      const date=release.published_at?new Date(release.published_at).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}):'date unavailable';
      $('releaseHint').textContent=`Latest release: ${tag} · published ${date}. ${assets.length} file${assets.length===1?'':'s'} attached.`;
      $('about-release').setAttribute('data-release',tag);
    })
    .catch(err=>{
      $('releaseHint').textContent=`Could not load release details (${err.message}). You can still open GitHub Releases to download available files.`;
      status('desktop','Open GitHub Releases to check Windows builds.','missing');status('android','Open GitHub Releases to check Android builds.','missing');
    });
})();
