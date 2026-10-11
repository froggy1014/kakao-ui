/**
 * Kakao Biz Message length limits.
 *
 * Components take a partial `limits` override and fall back to these defaults.
 * The AlimTalk body limit depends on the template: 1,300 characters, or 1,000
 * when an item list is used (vendors that document "1,000" describe the latter).
 * Sources: NHN Cloud AlimTalk API v2.3, Kakao Business content guide,
 * Ncloud SENS, Solapi BMS guide (checked 2026-10-11).
 */

export const ALIMTALK_LIMITS = {
  /** 본문 — 1,300, or 1,000 with an item list */
  content: 1300,
  contentWithItemList: 1000,
  /** 강조표기 타이틀 / 서브타이틀 */
  title: 50,
  subtitle: 50,
  /** 아이템리스트 헤더 */
  itemListHeader: 16,
  /** 하이라이트 타이틀 (썸네일 있으면 21) */
  highlightTitle: 30,
  highlightTitleWithThumbnail: 21,
  /** 하이라이트 설명 (썸네일 있으면 13) */
  highlightDescription: 19,
  highlightDescriptionWithThumbnail: 13,
  itemTitle: 6,
  itemDescription: 23,
  summaryTitle: 6,
  summaryDescription: 14,
  /** 부가정보 (+ 채널추가 안내) — 500, or 200 with an item list */
  extra: 500,
  extraWithItemList: 200,
  /** 채널추가 안내 문구 */
  adText: 80,
  buttonName: 14,
  maxButtons: 5,
  minItems: 2,
  maxItems: 10,
} as const;

export const BRAND_MESSAGE_LIMITS = {
  textContent: 1300,
  imageContent: 400,
  wideContent: 76,
  carouselHeader: 20,
  carouselContent: 180,
  /** TEXT / IMAGE buttons (stacked) */
  buttonName: 14,
  /** WIDE / CAROUSEL buttons (side by side) */
  buttonNameCompact: 8,
  maxButtons: 5,
  maxButtonsCompact: 2,
  minCarouselCards: 2,
  maxCarouselCards: 6,
  /** Vendors document 12; Kakao's own guide example uses 14. */
  couponDescription: 12,
  couponDescriptionWide: 18,
} as const;

export type AlimtalkLimits = { -readonly [K in keyof typeof ALIMTALK_LIMITS]: number };
export type BrandMessageLimits = {
  -readonly [K in keyof typeof BRAND_MESSAGE_LIMITS]: number;
};

/** Character count as KakaoTalk counts it — by code point, not UTF-16 unit. */
export function charLength(text: string): number {
  return Array.from(text).length;
}

/**
 * Clamp `text` to `max` characters, appending an ellipsis when cut.
 * Warns in development so template authors notice before Kakao review does.
 */
export function clampText(
  text: string | undefined,
  max: number,
  field?: string
): string | undefined {
  if (text == null) return text;
  const chars = Array.from(text);
  if (chars.length <= max) return text;
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[katok-ui] ${field ?? "text"} exceeds ${max} characters (${chars.length}); truncated.`
    );
  }
  return chars.slice(0, Math.max(0, max - 1)).join("") + "…";
}

/** Keep the first `max` entries, warning when extras are dropped. */
export function clampList<T>(list: T[] | undefined, max: number, field?: string): T[] {
  if (!list) return [];
  if (list.length <= max) return list;
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[katok-ui] ${field ?? "list"} allows at most ${max} entries (${list.length}); extras dropped.`
    );
  }
  return list.slice(0, max);
}

/**
 * Brand Message coupon titles must use one of five fixed formats:
 * `{N}원 할인 쿠폰`, `{N}% 할인 쿠폰`, `배송비 할인 쿠폰`,
 * `{≤7자} 무료 쿠폰`, `{≤7자} UP 쿠폰`.
 */
export function isValidCouponTitle(title: string): boolean {
  if (/^[1-9](\d*|\d{0,2}(,\d{3})+)원 할인 쿠폰$/.test(title)) return true;
  if (/^([1-9]\d?|100)% 할인 쿠폰$/.test(title)) return true;
  if (title === "배송비 할인 쿠폰") return true;
  const free = title.match(/^(.+) 무료 쿠폰$/);
  if (free) return charLength(free[1]) <= 7;
  const up = title.match(/^(.+) UP 쿠폰$/);
  if (up) return charLength(up[1]) <= 7;
  return false;
}
