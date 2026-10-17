# Nexora Browser — Official Website

A responsive product landing page for Nexora Browser, inspired by the editorial storytelling, large product visuals, feature showcases, and multi-platform download flow used by polished browser brands. This is an original Nexora design and does not use Opera branding or assets.

## Files
- `index.html` — website structure and product showcase
- `style.css` — responsive visual design, animation, and browser/device mockups
- `script.js` — mobile navigation and latest GitHub Release lookup
- `config.js` — GitHub repository and asset matching settings
- `assets/Nexora.png` — transparent Nexora logo and social-preview image
- `assets/favicon.png` and root `favicon.ico` — refreshed transparent favicon assets; `assets/favicon.svg` is the fallback

## Publish with GitHub Pages
1. Download and extract this ZIP.
2. Upload the **contents** of the `Nexora-Download-Website` folder to the root of your website repository.
3. Commit and push the files.
4. In GitHub, open **Settings → Pages** and choose the correct branch and `/ (root)` if Pages is not already configured.

## Release downloads
The page checks the latest public release in `Techman-cyber/Nexora` and looks for an `.exe` file for Windows and an `.apk` file for Android. If no APK is present, the optional ZIP fallback may be shown and is explicitly labelled as a ZIP archive, not an installable package. Publish actual release assets to activate direct download buttons.

Update `config.js` if the release repository changes. This is a static website and does not deploy itself; publish the files to your website repository to make the changes live.


Brand assets: `assets/Nexora.png` is the cleaned transparent 1024px mark/social-preview image; `assets/Nexora-mark.png` is the clean transparent 512px mark used around the site; `assets/Nexora-source-upload.png` preserves your original upload unchanged. `assets/favicon.png` and root `favicon.ico` contain the refreshed favicon.


## Search and AI workspaces
- **Web Suite:** Google, DuckDuckGo, Bing, Brave Search, and Ecosia.
- **AI Hub:** ChatGPT, Google Gemini, Claude, Microsoft Copilot, and Perplexity.
- **Nexora AI:** a separate personal-assistant concept for browser actions and local profile context. A generative model/API is not configured in this source build.

## Branding update
- The logo assets now use the supplied Nexora artwork with the charcoal background removed and transparent edges. The original upload is preserved as `assets/Nexora-source-upload.png`.
- The favicon is explicitly versioned as `assets/favicon.png?v=6` in `index.html`; if a browser still shows the old icon after deployment, hard refresh the page or clear that site’s cached favicon.
- A Web Suite section lists Google, DuckDuckGo, Bing, Brave Search, and Ecosia. It is separate from AI Hub and Nexora AI.
