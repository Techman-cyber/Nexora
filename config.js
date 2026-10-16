/* Nexora website download configuration. Public release assets are fetched from this repo. */
window.NEXORA_CONFIG = {
  owner: "Techman-cyber",
  repo: "Nexora",
  // Windows installer/application asset in the latest public release.
  desktopAssetPattern: /\.exe$/i,
  // Prefer an installable APK. If no APK is attached, the website can offer an Android ZIP as fallback.
  androidAssetPattern: /\.apk$/i,
  androidZipFallback: true
};
