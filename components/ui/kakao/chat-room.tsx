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
 */
const ChatRoom = React.forwardRef<HTMLDivElement, ChatRoomProps>(
  ({ className, header, input, background, children, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-kk flex h-full w-full flex-col overflow-hidden bg-kk-chat-bg", className)}
      style={{ ...(background ? { background } : null), ...style }}
      {...props}
    >
      {header && <div className="z-10 shrink-0">{header}</div>}
      <div
        role="log"
        aria-live="polite"
        className="flex min-h-0 flex-1 flex-col gap-[var(--kk-gap-group)] overflow-y-auto px-[10px] pb-[12px] pt-[4px] [scrollbar-width:none]"
      >
        {children}
      </div>
      {input && <div className="shrink-0">{input}</div>}
    </div>
  )
);
ChatRoom.displayName = "ChatRoom";

export { ChatRoom, type ChatRoomProps };
