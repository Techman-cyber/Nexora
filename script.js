(() => {
  'use strict';
  const config = window.NEXORA_CONFIG || {};
  const owner = String(config.owner || '').trim();
  const repo = String(config.repo || '').trim();
  const configured = Boolean(owner && repo && !owner.startsWith('YOUR_') && !repo.startsWith('YOUR_'));
  const root = configured ? `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}` : 'https://github.com';
  const releasePage = `${root}/releases`;
  const $ = id => document.getElementById(id);
  $('year').textContent = new Date().getFullYear();
  ['sourceLink', 'releaseLink', 'allReleases'].forEach(id => { if ($(id)) $(id).href = id === 'sourceLink' ? root : releasePage; });

  function bytes(value) {
    if (!Number.isFinite(value) || value <= 0) return '';
    const units = ['B', 'KB', 'MB', 'GB']; let n = value, i = 0;
    while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
    return `${n.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
  }
  function button(id, url, label) {
    const a = $(id); a.href = url; a.innerHTML = `<span>${label}</span><b>↓</b>`;
    a.target = '_blank'; a.rel = 'noopener noreferrer';
  }
  function note(platform, text, state) {
    $(`${platform}Note`).textContent = text;
    $(`${platform}Status`).classList.toggle('available', state === 'available');
    $(`${platform}Status`).classList.toggle('missing', state === 'missing');
  }
  function toast(message) {
    const node = $('toast'); node.textContent = message; node.classList.add('visible');
    clearTimeout(window.__nexoraToastTimer);
    window.__nexoraToastTimer = setTimeout(() => node.classList.remove('visible'), 3600);
  }
  if (!configured) {
    $('releaseHint').textContent = 'Set your GitHub owner and repository in config.js to activate direct downloads.';
    ['desktopDownload', 'androidDownload'].forEach(id => $(id).addEventListener('click', e => { if ($(id).getAttribute('href') === '#') { e.preventDefault(); toast('Configure the GitHub repository in config.js first.'); } }));
    return;
  }
  button('desktopDownload', releasePage, 'View Windows release');
  button('androidDownload', releasePage, 'View Android release');
  const api = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/latest`;
  fetch(api, { headers: { Accept: 'application/vnd.github+json' } })
    .then(response => {
      if (!response.ok) throw new Error(response.status === 404 ? 'No public release was found yet.' : `GitHub returned ${response.status}.`);
      return response.json();
    })
    .then(release => {
      const assets = Array.isArray(release.assets) ? release.assets : [];
      const winPattern = config.desktopAssetPattern instanceof RegExp ? config.desktopAssetPattern : /\.exe$/i;
      const apkPattern = config.androidAssetPattern instanceof RegExp ? config.androidAssetPattern : /\.apk$/i;
      const win = assets.find(asset => winPattern.test(asset.name));
      const apk = assets.find(asset => apkPattern.test(asset.name));
      const androidZip = !apk && config.androidZipFallback ? assets.find(asset => /android.*\.zip$/i.test(asset.name) || /\.zip$/i.test(asset.name)) : null;
      const tag = release.tag_name || 'Latest release';
      $('releaseLink').href = release.html_url || releasePage;
      $('allReleases').href = releasePage;
      if (win) {
        button('desktopDownload', win.browser_download_url, 'Download for Windows');
        $('desktopVersion').textContent = tag;
        $('desktopSize').textContent = bytes(win.size);
        note('desktop', `${win.name} · ready to download`, 'available');
      } else {
        $('desktopVersion').textContent = 'Not attached yet';
        note('desktop', 'No .exe found in the latest release. Check release assets.', 'missing');
      }
      if (apk) {
        button('androidDownload', apk.browser_download_url, 'Download Android APK');
        $('androidVersion').textContent = tag;
        $('androidFileType').textContent = 'APK';
        $('androidSize').textContent = bytes(apk.size);
        note('android', `${apk.name} · installable APK`, 'available');
      } else if (androidZip) {
        button('androidDownload', androidZip.browser_download_url, 'Download Android ZIP');
        $('androidVersion').textContent = tag;
        $('androidFileType').textContent = 'ZIP';
        $('androidSize').textContent = bytes(androidZip.size);
        note('android', `${androidZip.name} · ZIP fallback (not directly installable)`, 'available');
      } else {
        $('androidVersion').textContent = 'Not attached yet';
        note('android', 'No .apk found. Attach app-debug.apk or a signed release APK.', 'missing');
      }
      $('releaseHint').textContent = `Latest release: ${tag}. Published ${release.published_at ? new Date(release.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'date unavailable'}.`;
    })
    .catch(error => {
      $('releaseHint').textContent = `${error.message} The release page is still available below.`;
      note('desktop', 'Open GitHub Releases to check available Windows builds.', 'missing');
      note('android', 'Open GitHub Releases to check available Android builds.', 'missing');
    });
})();
