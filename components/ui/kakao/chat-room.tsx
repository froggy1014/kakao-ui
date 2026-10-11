import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/kakao/styles/kakao.css";

interface ChatRoomProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Usually a `<ChatHeader />`. */
  header?: React.ReactNode;
  /** Usually a `<MessageInput />`. */
  input?: React.ReactNode;
  /** Override the chat background (color or image), e.g. a custom theme. */
  background?: string;
}

/**
 * Chat room shell: header, scrollable message area on the chat background,
 * and the input bar. Fills its parent's height.
 *
 * As in KakaoTalk on iOS 26, the header floats over the messages (they scroll
 * under its glass pills) and the input pill sits on the chat background.
 */
const ChatRoom = React.forwardRef<HTMLDivElement, ChatRoomProps>(
  ({ className, header, input, background, children, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-kk relative flex h-full w-full flex-col overflow-hidden bg-kk-chat-bg", className)}
      style={{ ...(background ? { background } : null), ...style }}
      {...props}
    >
      {header && <div className="absolute inset-x-0 top-0 z-10">{header}</div>}
      <div
        role="log"
        aria-live="polite"
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-[var(--kk-gap-group)] overflow-y-auto px-[10px] pb-[8px] [scrollbar-width:none]",
          header ? "pt-[calc(var(--kk-header-height)+4px)]" : "pt-[4px]"
        )}
      >
        {children}
      </div>
      {input && <div className="shrink-0">{input}</div>}
    </div>
  )
);
ChatRoom.displayName = "ChatRoom";

export { ChatRoom, type ChatRoomProps };
