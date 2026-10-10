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

const BizButton = React.forwardRef<HTMLButtonElement, BizButtonProps>(
  ({ className, type, name, href, render, compact, ...props }, ref) => {
    const rootClassName = cn(
      "font-kk flex min-h-[38px] w-full items-center justify-center rounded-[6px] bg-kk-biz-button-bg px-[10px] py-[8px]",
      "text-center text-[14px] font-medium leading-[1.25] tracking-[-0.01em] text-kk-biz-button-fg",
      "outline-none transition-[filter] hover:brightness-95 active:brightness-90 focus-visible:ring-2 focus-visible:ring-kk-yellow",
      compact && "min-w-0 flex-1 text-[13px]",
      className
    );
    const dataProps = { "data-button-type": type } as Record<string, string>;

    if (render) {
      return React.cloneElement(
        render,
        {
          className: cn((render.props as { className?: string }).className, rootClassName),
          ...dataProps,
        } as React.HTMLAttributes<HTMLElement>,
        name
      );
    }
    if (href) {
      return (
        <a href={href} className={rootClassName} {...dataProps}>
          {name}
        </a>
      );
    }
    return (
      <button ref={ref} type="button" className={rootClassName} {...dataProps} {...props}>
        {name}
      </button>
    );
  }
);
BizButton.displayName = "BizButton";

export { BizButton, type BizButtonProps, type BizButtonType, type BizButtonData };
