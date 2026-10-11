import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/kakao/styles/kakao.css";

/**
 * Kakao Biz Message button types, using the codes the Biz Message APIs send
 * (NHN Cloud / Ncloud SENS / Solapi all share them).
 */
type BizButtonType =
  | "WL" // 웹링크
  | "AL" // 앱링크
  | "DS" // 배송조회
  | "BK" // 봇키워드
  | "MD" // 메시지전달
  | "BC" // 상담톡전환
  | "BT" // 봇전환
  | "AC" // 채널추가
  | "BF" // 비즈니스폼
  | "TN" // 전화
  | "P1"
  | "P2"
  | "P3"; // 플러그인

interface BizButtonData {
  type: BizButtonType;
  name: string;
  /** WL mobile link. */
  linkMo?: string;
  /** WL PC link. */
  linkPc?: string;
}

interface BizButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "name"> {
  type: BizButtonType;
  /** Button label, e.g. "주문 내역 보기". */
  name: string;
  /** Renders an `<a>` instead of a `<button>` (WL buttons). */
  href?: string;
  /** Override the root element (e.g. Next.js Link). */
  render?: React.ReactElement;
  /** Side-by-side layout used by WIDE / CAROUSEL brand messages. */
  compact?: boolean;
}

/** Speech bubble with a plus — an original glyph, not Kakao's channel icon. */
function ChannelAddIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <path
        d="M7 2.5C3.96 2.5 1.5 4.42 1.5 6.8c0 1.5.98 2.82 2.46 3.59l-.5 1.86a.25.25 0 0 0 .38.27l2.2-1.46c.31.04.63.06.96.06 3.04 0 5.5-1.92 5.5-4.32S10.04 2.5 7 2.5Z"
        fill="currentColor"
      />
      <path d="M13 9.5v5M10.5 12h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const BizButton = React.forwardRef<HTMLButtonElement, BizButtonProps>(
  ({ className, type, name, href, render, compact, ...props }, ref) => {
    const rootClassName = cn(
      "font-kk flex min-h-[40px] w-full items-center justify-center gap-[4px] rounded-[6px] px-[10px] py-[8px]",
      "text-center text-[14px] leading-[1.25] tracking-[-0.01em]",
      // 채널 추가 is the one yellow button (Kakao Business guide).
      type === "AC" ? "bg-kk-yellow text-kk-on-yellow" : "bg-kk-biz-button-bg text-kk-biz-button-fg",
      "outline-none transition-[filter] hover:brightness-95 active:brightness-90 focus-visible:ring-2 focus-visible:ring-kk-yellow",
      compact && "min-w-0 flex-1 text-[13px]",
      className
    );
    const dataProps = { "data-button-type": type } as Record<string, string>;
    const label =
      type === "AC" ? (
        <>
          <ChannelAddIcon />
          {name}
        </>
      ) : (
        name
      );

    if (render) {
      return React.cloneElement(
        render,
        {
          className: cn((render.props as { className?: string }).className, rootClassName),
          ...dataProps,
        } as React.HTMLAttributes<HTMLElement>,
        label
      );
    }
    if (href) {
      return (
        <a href={href} className={rootClassName} {...dataProps}>
          {label}
        </a>
      );
    }
    return (
      <button ref={ref} type="button" className={rootClassName} {...dataProps} {...props}>
        {label}
      </button>
    );
  }
);
BizButton.displayName = "BizButton";

export { BizButton, type BizButtonProps, type BizButtonType, type BizButtonData };
