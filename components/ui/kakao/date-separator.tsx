import * as React from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

interface DateSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Display text, e.g. "2026년 10월 11일 일요일". */
  date: string;
  /** Hide the calendar glyph. */
  hideIcon?: boolean;
}

const DateSeparator = React.forwardRef<HTMLDivElement, DateSeparatorProps>(
  ({ className, date, hideIcon, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-label={date}
      className={cn("font-kk flex w-full justify-center py-[10px]", className)}
      {...props}
    >
      <span className="inline-flex items-center gap-[4px] rounded-full bg-kk-chat-pill-bg px-[10px] py-[4px] text-[length:var(--kk-text-pill)] leading-[1.2] text-kk-chat-pill-fg">
        {!hideIcon && <CalendarIcon size={11} strokeWidth={2.2} />}
        {date}
      </span>
    </div>
  )
);
DateSeparator.displayName = "DateSeparator";

/** Formats a Date the way KakaoTalk does: "2026년 10월 11일 일요일". */
function formatKakaoDate(date: Date): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

export { DateSeparator, formatKakaoDate, type DateSeparatorProps };
