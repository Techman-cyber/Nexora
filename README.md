# Nexora Browser download website

## Important: connect the download buttons
1. Open `config.js`.
2. Replace `YOUR_GITHUB_USERNAME` and `YOUR_NEXORA_REPOSITORY` with the owner and repository name for your browser project.
3. Make the repository public for public downloads.
4. Publish the Windows `.exe` and Android `.apk` as assets in a GitHub **Release**.

The website checks the latest public release and automatically links the matching EXE/APK files. GitHub Actions workflow artifacts are temporary and can require sign-in, so a public release asset is the reliable option for a website download button. If you click a button before configuring the repo, it explains what is missing.

## Publish free using GitHub Pages
1. Create a GitHub repository for this website (e.g. `nexora-downloads`).
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, branch `main`, folder `/ (root)`, then save.
5. Use the URL shown in Pages settings.

When you publish a new release with updated EXE/APK assets, the website picks up the latest assets automatically. The included favicon is a temporary website mark; replace `assets/favicon.svg` with your own existing Nexora icon if desired. This does not change your browser app icon.
