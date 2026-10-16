# Nexora Browser — Download Website

A responsive static download page with your Nexora logo and GitHub Releases integration.

## Files
- `index.html` — website structure
- `style.css` — responsive visual design
- `script.js` — loads the latest public release and locates Windows/Android assets
- `config.js` — GitHub repository and asset matching rules
- `assets/Nexora.png` — Nexora logo used in the header, hero, preview, footer, and favicon

## GitHub Release setup
The config is already set to `Techman-cyber/Nexora`. Publish a **public** GitHub Release and attach a Windows `.exe` plus an Android `.apk` (for example `app-debug.apk` for testing). The page automatically uses the latest release and direct asset URLs. It prefers an APK; if none is present, it can link an Android ZIP as a fallback, clearly labelled as a ZIP rather than an installable app.

## Publish with GitHub Pages
1. Extract this ZIP.
2. Upload the contents of the `Nexora-Download-Website` folder to the root of the separate website repository. Make sure `index.html`, `style.css`, `script.js`, `config.js`, and `assets/` are at the same level.
3. Commit and push.
4. In that website repository, open **Settings → Pages**, choose the branch and root folder, and save.

No API token is needed for public GitHub releases. GitHub's public API can be rate-limited occasionally; the releases page remains available as a fallback.
