import * as React from "react";
import { cn } from "@/lib/utils";
import {
  BRAND_MESSAGE_LIMITS,
  type BrandMessageLimits,
  clampList,
  clampText,
  isValidCouponTitle,
} from "@/lib/biz-limits";
import { BizButton, type BizButtonData } from "./biz-button";
import { BubbleMeta, BubbleRow, type BubbleRowProps } from "./chat-bubble";
import { DownloadIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

/**
 * Brand Message bubble types supported in v0.1. FriendTalk (친구톡) ended
 * 2025-12-31; its requests are delivered as Brand Message 자유형.
 */
type BrandMessageType = "TEXT" | "IMAGE" | "WIDE" | "CAROUSEL_FEED";

/** WL 웹링크 · AL 앱링크 · AC 채널추가 — the only codes Brand Message accepts. */
type BrandButtonData = BizButtonData & { type: "WL" | "AL" | "AC" };

interface BrandCoupon {
  /** Must match one of five fixed formats, e.g. "3,000원 할인 쿠폰". */
  title: string;
  description?: string;
  onClick?: () => void;
}

interface BrandCarouselCard {
  image: string;
  imageAlt?: string;
  header?: string;
  content?: string;
  buttons?: BrandButtonData[];
}

interface BrandMessageBubbleProps extends Omit<BubbleRowProps, "content"> {
  chatBubbleType?: BrandMessageType;
  /**
   * Advertising message: shows the opt-out line under the bubble. KakaoTalk
   * puts "(광고)" before the sender name — pass it in `MessageGroup`'s
   * `sender.name` (see `adSenderName`).
   */
  isAd?: boolean;
  content?: string;
  image?: string;
  imageAlt?: string;
  /** Image aspect ratio. IMAGE allows 2:1–3:4, WIDE 2:1–1:1. */
  imageRatio?: string;
  /** CAROUSEL_FEED cards (2–6). */
  carousel?: BrandCarouselCard[];
  coupon?: BrandCoupon;
  buttons?: BrandButtonData[];
  /** Ad opt-out line. Kakao appends it to ad messages. */
  optOutText?: string;
  limits?: Partial<BrandMessageLimits>;
  onButtonClick?: (button: BrandButtonData, index: number, cardIndex?: number) => void;
}

const AD_PREFIX = "(광고)";
const DEFAULT_OPT_OUT = "수신거부 | 홈 > 채널 차단";

function CouponBox({ coupon, wide, limits }: { coupon: BrandCoupon; wide: boolean; limits: BrandMessageLimits }) {
  if (process.env.NODE_ENV !== "production" && !isValidCouponTitle(coupon.title)) {
    console.warn(`[katok-ui] coupon.title "${coupon.title}" doesn't match a Brand Message coupon format.`);
  }
  return (
    <button
      type="button"
      onClick={coupon.onClick}
      className="relative flex w-full overflow-hidden rounded-[8px] border border-kk-biz-coupon-border bg-kk-biz-surface text-left outline-none focus-visible:ring-2 focus-visible:ring-kk-yellow"
    >
      <span className="min-w-0 flex-1 px-[12px] py-[9px]">
        <span className="block truncate text-[15px] leading-[1.35] text-kk-biz-emphasis">{coupon.title}</span>
        {coupon.description && (
          <span className="block truncate text-[13px] leading-[1.35] text-kk-biz-muted">
            {clampText(
              coupon.description,
              wide ? limits.couponDescriptionWide : limits.couponDescription,
              "coupon.description"
            )}
          </span>
        )}
      </span>
      {/* ticket stub: dashed tear line, notches, download panel */}
      <span
        aria-hidden
        className="flex w-[44px] shrink-0 flex-col items-center justify-center gap-[2px] border-l border-dashed border-kk-biz-coupon-border bg-kk-biz-coupon-bg text-kk-biz-coupon-accent"
      >
        <DownloadIcon size={18} strokeWidth={2} />
        <span className="text-[7px] font-bold tracking-[0.08em]">COUPON</span>
      </span>
      <span aria-hidden className="absolute -top-[5px] right-[39px] h-[10px] w-[10px] rounded-full border border-kk-biz-coupon-border bg-kk-chat-bg" />
      <span aria-hidden className="absolute -bottom-[5px] right-[39px] h-[10px] w-[10px] rounded-full border border-kk-biz-coupon-border bg-kk-chat-bg" />
    </button>
  );
}

function Buttons({
  buttons,
  compact,
  limits,
  onClick,
}: {
  buttons: BrandButtonData[];
  compact: boolean;
  limits: BrandMessageLimits;
  onClick?: (b: BrandButtonData, i: number) => void;
}) {
  const shown = clampList(buttons, compact ? limits.maxButtonsCompact : limits.maxButtons, "buttons");
  if (shown.length === 0) return null;
  return (
    <div className={cn("flex gap-[6px]", compact ? "flex-row" : "flex-col")}>
      {shown.map((b, i) => (
        <BizButton
          key={i}
          type={b.type}
          compact={compact}
          name={clampText(b.name, compact ? limits.buttonNameCompact : limits.buttonName, "buttons.name")!}
          href={b.type === "WL" ? b.linkMo : undefined}
          onClick={onClick ? () => onClick(b, i) : undefined}
        />
      ))}
    </div>
  );
}

/** KakaoTalk shows ad messages under "(광고) {channel name}". */
function adSenderName(name: string) {
  return name.startsWith(AD_PREFIX) ? name : `${AD_PREFIX} ${name}`;
}

const BrandMessageBubble = React.forwardRef<HTMLDivElement, BrandMessageBubbleProps>(
  (
    {
      chatBubbleType = "TEXT",
      isAd = false,
      content,
      image,
      imageAlt = "",
      imageRatio,
      carousel,
      coupon,
      buttons = [],
      optOutText = DEFAULT_OPT_OUT,
      limits: limitOverrides,
      onButtonClick,
      variant = "incoming",
      ...rowProps
    },
    ref
  ) => {
    const limits = { ...BRAND_MESSAGE_LIMITS, ...limitOverrides };
    const isWide = chatBubbleType === "WIDE";

    if (chatBubbleType === "CAROUSEL_FEED") {
      const cards = clampList(carousel, limits.maxCarouselCards, "carousel");
      return (
        <BubbleRow ref={ref} variant={variant} {...rowProps}>
          <div
            role="list"
            aria-label="캐러셀"
            className="flex min-w-0 flex-1 snap-x snap-mandatory gap-[8px] overflow-x-auto pb-[2px] [scrollbar-width:none]"
          >
            {cards.map((card, ci) => (
              <article
                role="listitem"
                key={ci}
                className="flex w-[232px] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--kk-radius-biz)] bg-kk-biz-surface text-kk-biz-emphasis"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.imageAlt ?? ""}
                  className="w-full object-cover"
                  style={{ aspectRatio: imageRatio ?? "2 / 1" }}
                />
                <div className="flex flex-1 flex-col gap-[10px] p-[12px]">
                  {card.header && (
                    <p className="line-clamp-2 text-[15px] font-bold leading-[1.3]">
                      {clampText(card.header, limits.carouselHeader, "carousel.header")}
                    </p>
                  )}
                  {card.content && (
                    <p className="line-clamp-4 flex-1 whitespace-pre-wrap text-[13px] leading-[1.45] text-kk-biz-muted">
                      {clampText(card.content, limits.carouselContent, "carousel.content")}
                    </p>
                  )}
                  <Buttons
                    buttons={card.buttons ?? []}
                    compact
                    limits={limits}
                    onClick={onButtonClick ? (b, i) => onButtonClick(b, i, ci) : undefined}
                  />
                </div>
              </article>
            ))}
          </div>
        </BubbleRow>
      );
    }

    const contentLimit =
      chatBubbleType === "WIDE"
        ? limits.wideContent
        : chatBubbleType === "IMAGE"
          ? limits.imageContent
          : limits.textContent;
    const ratio = imageRatio ?? (isWide ? "4 / 3" : "2 / 1");

    const { timestamp, unreadCount, edited, showTail, className, ...restRowProps } = rowProps;
    const optOut = isAd && optOutText && (
      <p className="text-[11px] leading-[1.4] text-kk-biz-opt-out">{optOutText}</p>
    );

    const card = (
      <article
        className={cn(
          "flex flex-col overflow-hidden rounded-[var(--kk-radius-biz)] bg-kk-biz-surface text-kk-biz-emphasis",
          isWide ? "w-full" : "w-[var(--kk-biz-width)] max-w-[calc(100%-40px)]"
        )}
      >
        {(chatBubbleType === "IMAGE" || isWide) && image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={imageAlt} className="w-full object-cover" style={{ aspectRatio: ratio }} />
        )}
        <div className="flex flex-col gap-[12px] p-[12px]">
          {content && (
            <p className="whitespace-pre-wrap break-words break-keep text-[15px] leading-[1.45]">
              {clampText(content, contentLimit, "content")}
            </p>
          )}
          <Buttons
            buttons={buttons}
            compact={isWide}
            limits={limits}
            onClick={onButtonClick ? (b, i) => onButtonClick(b, i) : undefined}
          />
          {coupon && <CouponBox coupon={coupon} wide={isWide} limits={limits} />}
        </div>
      </article>
    );

    // WIDE fills the row, so the opt-out line and the time drop below it.
    if (isWide) {
      return (
        <div
          ref={ref}
          className={cn("font-kk flex w-full flex-col items-start gap-[3px]", className)}
          {...restRowProps}
        >
          {card}
          {optOut}
          <BubbleMeta variant={variant} timestamp={timestamp} unreadCount={unreadCount} edited={edited} />
        </div>
      );
    }

    return (
      <div className={cn("flex w-full flex-col gap-[4px]", className)}>
        <BubbleRow
          ref={ref}
          variant={variant}
          timestamp={timestamp}
          unreadCount={unreadCount}
          edited={edited}
          showTail={showTail}
          {...restRowProps}
        >
          {card}
        </BubbleRow>
        {optOut}
      </div>
    );
  }
);
BrandMessageBubble.displayName = "BrandMessageBubble";

export {
  BrandMessageBubble,
  adSenderName,
  type BrandMessageBubbleProps,
  type BrandMessageType,
  type BrandButtonData,
  type BrandCoupon,
  type BrandCarouselCard,
};
