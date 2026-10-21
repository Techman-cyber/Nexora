# Nexora website

A fast, static website (HTML, CSS, a little JavaScript). No build step.

## Before you publish
1. Open `site.js` and set `windowsUrl` to your installer download page (for example your GitHub Releases page) and `version`.
2. Open `privacy.html` and replace `privacy@YOUR-DOMAIN.com`.
3. Build the Windows installer from the app folder with `npm run dist:win` and upload the `.exe` from `dist/` to your release.

## Deploy free on Firebase Hosting (you already have the project)
```
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```
The site is served at `https://nexora-browser-app.web.app`. Add your own domain in Firebase Console > Hosting > Add custom domain.

## Other free options
- **GitHub Pages:** push this folder to a repository and enable Pages (Settings > Pages).
- **Netlify or Cloudflare Pages:** drag the folder into the dashboard.

## Files
- `index.html` home page, `privacy.html`, `404.html`
- `site.css`, `site.js`
- `assets/` logo, icon, screenshots (WebP) and `og.jpg` for link previews
