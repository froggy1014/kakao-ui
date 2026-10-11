/**
 * Brand constants shared by the icon and social image routes.
 *
 * These hardcode colors instead of reading CSS tokens — icons and OG images
 * render outside the document, so CSS variables resolve to nothing.
 * The mark is an original bot-face glyph, not a Kakao logo.
 */
export const BRAND = {
  accent: "#fee500",
  onAccent: "#191919",
  bg: "#141414",
  fg: "#ededed",
  muted: "#8e8e8e",
} as const;

export const SITE_URL = "https://katok-ui.jeongmin.dev";
export const REPO_URL = "https://github.com/froggy1014/katok-ui";

/**
 * Bot face: a square speech bubble with two eyes (shared with kakao-bot).
 * The eyes are holes (even-odd), so the tile color shows through.
 * Deliberately unlike KakaoTalk's rounded "TALK" bubble.
 */
export const LOGO_VIEWBOX = "10 12.5 44 44";
export const LOGO_PATH =
  "M14 18h36v25H32L21 51v-8h-7zM22 30a3 3 0 1 0 6 0a3 3 0 1 0-6 0zM36 30a3 3 0 1 0 6 0a3 3 0 1 0-6 0z";

export function logoSvg({ size, fill = BRAND.onAccent }: { size: number; fill?: string }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${LOGO_VIEWBOX}" fill="${fill}"><path fill-rule="evenodd" d="${LOGO_PATH}"/></svg>`;
}

export function logoDataUri(opts: { size: number; fill?: string }) {
  return `data:image/svg+xml;base64,${Buffer.from(logoSvg(opts)).toString("base64")}`;
}
