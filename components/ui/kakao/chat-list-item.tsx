import * as React from "react";
import { cn } from "@/lib/utils";
import { BellOffIcon, PinIcon } from "./icons";
import { ProfileAvatar } from "./profile-avatar";
import "@/components/ui/kakao/styles/kakao.css";

interface ChatListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** One URL, or several for a group-chat composite avatar. */
  avatar?: string | (string | undefined)[];
  /** Group chats show the member count after the name. */
  memberCount?: number;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  muted?: boolean;
  pinned?: boolean;
  /** Override the root element (e.g. Next.js Link, <a>, <button>). */
  render?: React.ReactElement;
}

const ChatListItem = React.forwardRef<HTMLDivElement, ChatListItemProps>(
  (
    {
      className,
      name,
      avatar,
      memberCount,
      lastMessage,
      timestamp,
      unreadCount,
      muted = false,
      pinned = false,
      render,
      ...props
    },
    ref
  ) => {
    const hasUnread = !!unreadCount && unreadCount > 0;
    const rootClassName = cn(
      "font-kk flex w-full cursor-pointer items-center gap-[12px] bg-kk-list-bg px-[16px] py-[8px] text-left outline-none transition-colors hover:bg-kk-list-pressed active:bg-kk-list-pressed focus-visible:bg-kk-list-pressed",
      className
    );

    const content = (
      <>
        <ProfileAvatar src={avatar} name={name} size="lg" />

        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <div className="flex min-w-0 items-center gap-[4px]">
            <span className="truncate text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] text-kk-list-title">
              {name}
            </span>
            {memberCount != null && (
              <span className="shrink-0 text-[14px] leading-[1.3] text-kk-list-meta">{memberCount}</span>
            )}
            {pinned && (
              <PinIcon size={13} strokeWidth={2} className="shrink-0 text-kk-list-meta" aria-label="고정됨" />
            )}
            {muted && (
              <BellOffIcon size={13} strokeWidth={2} className="shrink-0 text-kk-list-meta" aria-label="알림 꺼짐" />
            )}
          </div>
          {lastMessage && (
            <p className="line-clamp-2 text-[13px] leading-[1.35] text-kk-list-description">{lastMessage}</p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-[6px] self-start pt-[3px]">
          {timestamp && <span className="text-[11px] leading-none text-kk-list-meta">{timestamp}</span>}
          {hasUnread && (
            <span
              aria-label={`안 읽은 메시지 ${unreadCount}개`}
              className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-kk-badge px-[6px] text-[11px] font-bold leading-none text-kk-badge-fg"
            >
              {unreadCount! > 999 ? "999+" : unreadCount}
            </span>
          )}
        </div>
      </>
    );

    if (render) {
      return React.cloneElement(
        render,
        {
          ref,
          className: cn((render.props as { className?: string }).className, rootClassName),
          ...props,
        } as React.HTMLAttributes<HTMLElement>,
        content
      );
    }

    return (
      <div ref={ref} className={rootClassName} {...props}>
        {content}
      </div>
    );
  }
);
ChatListItem.displayName = "ChatListItem";

export { ChatListItem, type ChatListItemProps };
