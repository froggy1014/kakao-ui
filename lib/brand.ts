/**
 * Brand constants shared by the icon and social image routes.
 *
 * These hardcode colors instead of reading CSS tokens — icons and OG images
 * render outside the document, so CSS variables resolve to nothing.
 * The mark is an original speech-bubble glyph, not a Kakao logo.
 */
export const BRAND = {
  accent: "#fee500",
  onAccent: "#191919",
  bg: "#141414",
  fg: "#ededed",
  muted: "#8e8e8e",
} as const;

export const SITE_URL = "https://kakao-ui.jeongmin.dev";
export const REPO_URL = "https://github.com/froggy1014/kakao-ui";

/** Rounded speech bubble with a tail, 24×24 viewBox. */
export const LOGO_PATH =
  "M12 3C6.75 3 2.5 6.36 2.5 10.5c0 2.62 1.7 4.92 4.27 6.26l-.9 3.3a.4.4 0 0 0 .6.45l3.86-2.56c.54.07 1.1.1 1.67.1 5.25 0 9.5-3.36 9.5-7.55S17.25 3 12 3Z";

export function logoSvg({ size, fill = BRAND.onAccent }: { size: number; fill?: string }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}"><path d="${LOGO_PATH}"/></svg>`;
}

export function logoDataUri(opts: { size: number; fill?: string }) {
  return `data:image/svg+xml;base64,${Buffer.from(logoSvg(opts)).toString("base64")}`;
}
