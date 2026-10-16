# Nexora Browser — Download Website

A responsive landing page for Nexora with a dark editorial UI, feature/value messaging, platform download cards, and live GitHub Release asset detection.

## Files
- `index.html` — page structure and copy
- `style.css` — responsive visual design
- `script.js` — mobile navigation and release asset detection
- `config.js` — GitHub repository and asset patterns
- `assets/Nexora.png` — Nexora logo used throughout the site and as the favicon

## Configure downloads
`config.js` currently targets `Techman-cyber/Nexora`. The latest public GitHub Release should include a Windows `.exe` and an Android `.apk`. If there is no APK, the page can offer an attached Android ZIP as a fallback; ZIP files are not directly installable unless they contain an APK that the visitor extracts.

If the website is hosted in a different repository, upload the **contents** of this folder to that website repository and keep `assets/` beside `index.html`. GitHub Pages can serve these static files directly. No API token is needed for public releases.

## Notes
- GitHub API rate limits can temporarily prevent the release status from loading. The release-page links remain available.
- The page only advertises file types found in the public release; it does not claim the browser has unverified privacy or performance features.
