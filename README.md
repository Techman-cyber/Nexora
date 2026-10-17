# Nexora Browser — Official Website

A responsive product landing page for Nexora Browser, inspired by the editorial storytelling, large product visuals, feature showcases, and multi-platform download flow used by polished browser brands. This is an original Nexora design and does not use Opera branding or assets.

## Files
- `index.html` — website structure and product showcase
- `style.css` — responsive visual design, animation, and browser/device mockups
- `script.js` — mobile navigation and latest GitHub Release lookup
- `config.js` — GitHub repository and asset matching settings
- `assets/Nexora-mark.png` — circular-cropped version of your uploaded Nexora artwork used throughout the page and as the favicon
- `assets/Nexora-source-upload.png` — your original uploaded image, preserved unchanged for social previews or future edits
- `assets/Nexora.png` — copy of the circular logo for compatibility
- `assets/favicon.svg` — fallback vector favicon

## Publish with GitHub Pages
1. Download and extract this ZIP.
2. Upload the **contents** of the `Nexora-Download-Website` folder to the root of your website repository.
3. Commit and push the files.
4. In GitHub, open **Settings → Pages** and choose the correct branch and `/ (root)` if Pages is not already configured.

## Release downloads
The page checks the latest public release in `Techman-cyber/Nexora` and looks for an `.exe` file for Windows and an `.apk` file for Android. If no APK is present, the optional ZIP fallback may be shown and is explicitly labelled as a ZIP archive, not an installable package. Publish actual release assets to activate direct download buttons.

Update `config.js` if the release repository changes. This is a static website and does not deploy itself; publish the files to your website repository to make the changes live.


Brand assets: `assets/Nexora-source-upload.png` is the exact image you uploaded. `assets/Nexora-mark.png` is a circular-cropped rendering of that same artwork, so it is used consistently throughout the site without the surrounding rectangular canvas.
