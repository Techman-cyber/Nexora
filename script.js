(() => {
 const c=window.NEXORA_CONFIG||{}, owner=(c.owner||'').trim(), repo=(c.repo||'').trim();
 const ready=owner&&repo&&!owner.startsWith('YOUR_')&&!repo.startsWith('YOUR_');
 const root=ready?`https://github.com/${owner}/${repo}`:'https://github.com';
 const $=id=>document.getElementById(id); $('year').textContent=new Date().getFullYear();
 $('github').href=root; $('source').href=root; $('releases').href=ready?`${root}/releases`:'https://github.com';
 function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.nexoraToast);window.nexoraToast=setTimeout(()=>t.classList.remove('show'),4000)}
 function set(id,note,url,label){const a=$(id);a.href=url;a.innerHTML=label+' <b>↓</b>';a.onclick=e=>{if(!ready){e.preventDefault();toast('Open config.js and add your GitHub username and repository name first.')}}}
 if(!ready){set('desktop','desktopNote','#','Download for Windows');set('android','androidNote','#','Get Android APK');return}
 $('hint').textContent='These buttons use the latest public GitHub Release. Publish each new build as a release asset to update the website automatically.';
 set('desktop','desktopNote',`${root}/releases/latest`,'Download for Windows');set('android','androidNote',`${root}/releases/latest`,'Get Android APK');
 fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`,{headers:{Accept:'application/vnd.github+json'}}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(r=>{
  const assets=r.assets||[], win=assets.find(a=>(c.desktopAssetPattern||/\.exe$/i).test(a.name)), apk=assets.find(a=>(c.androidAssetPattern||/\.apk$/i).test(a.name));
  if(win){set('desktop','desktopNote',win.browser_download_url,'Download for Windows');$('desktopNote').textContent=`${r.tag_name||'Latest'} · ${win.name}`}
  else $('desktopNote').textContent='No EXE found in latest release — view releases below.';
  if(apk){set('android','androidNote',apk.browser_download_url,'Get Android APK');$('androidNote').textContent=`${r.tag_name||'Latest'} · ${apk.name}`}
  else $('androidNote').textContent='No APK found in latest release — view releases below.';
 }).catch(()=>{$('desktopNote').textContent='Check that the repository is public and has a release.';$('androidNote').textContent='Check that the repository is public and has a release.'});
})();
