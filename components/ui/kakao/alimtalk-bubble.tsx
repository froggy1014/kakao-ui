import * as React from "react";
import { cn } from "@/lib/utils";
import { ALIMTALK_LIMITS, type AlimtalkLimits, clampList, clampText } from "@/lib/biz-limits";
import { BizButton, type BizButtonData } from "./biz-button";
import { BubbleRow, type BubbleRowProps } from "./chat-bubble";
import "@/components/ui/kakao/styles/kakao.css";

/** BA 기본형 · EX 부가정보형 · AD 채널추가형 · MI 복합형 */
type AlimtalkMessageType = "BA" | "EX" | "AD" | "MI";
/** 강조유형: 선택안함 · 강조표기형 · 이미지형 · 아이템리스트형 */
type AlimtalkEmphasizeType = "NONE" | "TEXT" | "IMAGE" | "ITEM_LIST";

interface AlimtalkItemList {
  /** 헤더 (≤16자) */
  header?: string;
  /** 아이템 하이라이트 */
  highlight?: { title: string; description?: string; thumbnail?: string };
  /** 아이템 리스트 (2–10개) */
  items?: { title: string; description: string }[];
  /** 아이템 요약 (숫자·통화기호만) */
  summary?: { title: string; description: string };
}

/** The fixed AD/MI channel-add notice (not editable in templates). */
const AD_TEXT = "채널 추가하고 이 채널의 마케팅 메시지 등을 카카오톡으로 받기";

interface AlimtalkBubbleProps extends Omit<BubbleRowProps, "title" | "content"> {
  messageType?: AlimtalkMessageType;
  emphasizeType?: AlimtalkEmphasizeType;
  /** 강조표기 타이틀 (TEXT) */
  title?: string;
  /** 강조표기 보조문구 (TEXT) */
  subtitle?: string;
  /** 이미지 URL (IMAGE, ITEM_LIST) — 2:1, 800×400 recommended. */
  image?: string;
  imageAlt?: string;
  itemList?: AlimtalkItemList;
  /** 본문 */
  content: string;
  /** 부가정보 (EX, MI) */
  extra?: string;
  /** 채널추가 안내 (AD, MI). Defaults to Kakao's fixed copy. */
  adText?: string;
  buttons?: BizButtonData[];
  /** 바로연결 chips rendered under the card. */
  quickReplies?: BizButtonData[];
  /** Band label. */
  headerLabel?: string;
  /**
   * The round "kakao" mark on the card's top-right corner. Rendered as plain
   * text, not Kakao's logotype; pass `false` to hide it.
   */
  badge?: boolean;
  /** Override default length limits (sources disagree on some). */
  limits?: Partial<AlimtalkLimits>;
  onButtonClick?: (button: BizButtonData, index: number) => void;
}

function Divider() {
  return <div className="h-px w-full bg-kk-divider" />;
}

function ItemList({ list, limits }: { list: AlimtalkItemList; limits: AlimtalkLimits }) {
  const thumb = !!list.highlight?.thumbnail;
  const items = clampList(list.items, limits.maxItems, "itemList.items");
  // Kakao guide: with a summary, item values are right-aligned.
  const alignEnd = !!list.summary;
  return (
    <div className="flex flex-col gap-[12px]">
      {list.header && (
        <>
          <p className="text-[15px] font-bold leading-[1.35]">
            {clampText(list.header, limits.itemListHeader, "itemList.header")}
          </p>
          <Divider />
        </>
      )}
      {list.highlight && (
        <>
          <div className="flex items-center gap-[10px]">
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-[16px] leading-[1.35]">
                {clampText(
                  list.highlight.title,
                  thumb ? limits.highlightTitleWithThumbnail : limits.highlightTitle,
                  "itemList.highlight.title"
                )}
              </p>
              {list.highlight.description && (
                <p className="mt-[2px] truncate text-[13px] text-kk-biz-muted">
                  {clampText(
                    list.highlight.description,
                    thumb ? limits.highlightDescriptionWithThumbnail : limits.highlightDescription,
                    "itemList.highlight.description"
                  )}
                </p>
              )}
            </div>
            {thumb && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={list.highlight.thumbnail}
                alt=""
                className="h-[44px] w-[44px] shrink-0 rounded-[6px] object-cover"
              />
            )}
          </div>
          <Divider />
        </>
      )}
      {items.length > 0 && (
        <dl className="flex flex-col gap-[4px] text-[13px] leading-[1.4]">
          {items.map((item, i) => (
            <div key={i} className="flex gap-[6px]">
              <dt className="w-[64px] shrink-0 text-kk-biz-muted">
                {clampText(item.title, limits.itemTitle, "itemList.items.title")}
              </dt>
              <dd className={cn("min-w-0 flex-1 break-words", alignEnd && "text-right")}>
                {clampText(item.description, limits.itemDescription, "itemList.items.description")}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {list.summary && (
        <>
          <div className="flex items-baseline gap-[6px]">
            <span className="w-[64px] shrink-0 text-[13px] text-kk-biz-muted">
              {clampText(list.summary.title, limits.summaryTitle, "itemList.summary.title")}
            </span>
            <span className="min-w-0 flex-1 text-right text-[18px] font-bold tracking-[-0.01em]">
              {clampText(list.summary.description, limits.summaryDescription, "itemList.summary.description")}
            </span>
          </div>
          <Divider />
        </>
      )}
    </div>
  );
}

const AlimtalkBubble = React.forwardRef<HTMLDivElement, AlimtalkBubbleProps>(
  (
    {
      messageType = "BA",
      emphasizeType = "NONE",
      title,
      subtitle,
      image,
      imageAlt = "",
      itemList,
      content,
      extra,
      adText = AD_TEXT,
      buttons,
      quickReplies,
      headerLabel = "알림톡 도착",
      badge = true,
      limits: limitOverrides,
      onButtonClick,
      variant = "incoming",
      ...rowProps
    },
    ref
  ) => {
    const hasExtra = messageType === "EX" || messageType === "MI";
    const hasAd = messageType === "AD" || messageType === "MI";
    const withItemList = emphasizeType === "ITEM_LIST" && !!itemList;
    // Body and extra-info limits shrink when an item list is present
    // (Kakao Business content guide: 1,300 → 1,000 and 500 → 200).
    const limits = {
      ...ALIMTALK_LIMITS,
      ...(withItemList && {
        content: ALIMTALK_LIMITS.contentWithItemList,
        extra: ALIMTALK_LIMITS.extraWithItemList,
      }),
      ...limitOverrides,
    };

    // AD/MI templates pin a "채널 추가" button to the first slot.
    const allButtons = React.useMemo(() => {
      const list = buttons ?? [];
      if (hasAd && !list.some((b) => b.type === "AC")) {
        return [{ type: "AC", name: "채널 추가" } as BizButtonData, ...list];
      }
      return list;
    }, [buttons, hasAd]);
    const shownButtons = clampList(allButtons, limits.maxButtons, "buttons");
    const shownQuickReplies = clampList(quickReplies, limits.maxButtons, "quickReplies");

    const showImage = (emphasizeType === "IMAGE" || emphasizeType === "ITEM_LIST") && image;

    return (
      <BubbleRow ref={ref} variant={variant} {...rowProps}>
        <div className="flex w-[var(--kk-biz-width)] max-w-[calc(100%-40px)] flex-col gap-[6px]">
          <div className="relative">
            {badge && (
              <span
                aria-hidden
                className="absolute -right-[13px] -top-[13px] z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-kk-biz-badge text-[8.5px] font-semibold tracking-[-0.02em] text-kk-biz-badge-fg"
              >
                kakao
              </span>
            )}
            <article
              aria-label={headerLabel}
              className="overflow-hidden rounded-[var(--kk-radius-biz)] bg-kk-biz-surface text-kk-biz-emphasis"
            >
              <header className="flex h-[40px] items-center bg-kk-biz-band px-[12px] text-[13px] font-medium text-kk-biz-band-fg">
                {headerLabel}
              </header>

              {showImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt={imageAlt} className="aspect-[2/1] w-full object-cover" />
              )}

              <div className="flex flex-col gap-[12px] p-[12px]">
                {emphasizeType === "TEXT" && (title || subtitle) && (
                  <>
                    <div>
                      {subtitle && (
                        <p className="text-[13px] leading-[1.35] text-kk-biz-muted">
                          {clampText(subtitle, limits.subtitle, "subtitle")}
                        </p>
                      )}
                      {title && (
                        <p className="mt-[2px] text-[20px] font-bold leading-[1.3] tracking-[-0.02em]">
                          {clampText(title, limits.title, "title")}
                        </p>
                      )}
                    </div>
                    <Divider />
                  </>
                )}

                {withItemList && <ItemList list={itemList} limits={limits} />}

                <p className="whitespace-pre-wrap break-words break-keep text-[15px] leading-[1.45]">
                  {clampText(content, limits.content, "content")}
                </p>

                {hasExtra && extra && (
                  <p className="whitespace-pre-wrap break-words break-keep text-[14px] leading-[1.45] text-kk-biz-muted">
                    {clampText(extra, limits.extra, "extra")}
                  </p>
                )}

                {hasAd && (
                  <p className="text-[14px] leading-[1.45] text-kk-biz-muted">
                    {clampText(adText, limits.adText, "adText")}
                  </p>
                )}

                {shownButtons.length > 0 && (
                  <div className="flex flex-col gap-[6px]">
                    {shownButtons.map((b, i) => (
                      <BizButton
                        key={i}
                        type={b.type}
                        name={clampText(b.name, limits.buttonName, "buttons.name")!}
                        href={b.type === "WL" ? b.linkMo : undefined}
                        onClick={onButtonClick ? () => onButtonClick(b, i) : undefined}
                      />
                    ))}
                  </div>
                )}
              </div>
            </article>
          </div>

          {shownQuickReplies.length > 0 && (
            <div className="flex gap-[6px] overflow-x-auto pb-[2px] [scrollbar-width:none]">
              {shownQuickReplies.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  data-button-type={q.type}
                  onClick={onButtonClick ? () => onButtonClick(q, i) : undefined}
                  className="font-kk shrink-0 rounded-full border border-kk-divider bg-kk-biz-surface px-[12px] py-[6px] text-[13px] text-kk-biz-emphasis outline-none hover:brightness-95 focus-visible:ring-2 focus-visible:ring-kk-yellow"
                >
                  {clampText(q.name, limits.buttonName, "quickReplies.name")}
                </button>
              ))}
            </div>
          )}
        </div>
      </BubbleRow>
    );
  }
);
AlimtalkBubble.displayName = "AlimtalkBubble";

export {
  AlimtalkBubble,
  AD_TEXT as ALIMTALK_AD_TEXT,
  type AlimtalkBubbleProps,
  type AlimtalkMessageType,
  type AlimtalkEmphasizeType,
  type AlimtalkItemList,
};
