"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, MenuIcon, SearchIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

interface ChatHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /**
   * `chat` — inside a chat room (translucent over the chat background).
   * `main` — a tab's large-title header ("채팅", "친구").
   */
  variant?: "chat" | "main";
  title: React.ReactNode;
  /** Group chats show the member count next to the title. */
  memberCount?: number;
  /** Total unread chats, shown beside the back chevron. */
  unreadTotal?: number;
  onBack?: () => void;
  onSearch?: () => void;
  onMenu?: () => void;
  /** Replace the default trailing buttons. */
  actions?: React.ReactNode;
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-[36px] w-[36px] items-center justify-center rounded-full outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-kk-yellow"
    >
      {children}
    </button>
  );
}

const ChatHeader = React.forwardRef<HTMLElement, ChatHeaderProps>(
  (
    { className, variant = "chat", title, memberCount, unreadTotal, onBack, onSearch, onMenu, actions, ...props },
    ref
  ) => {
    const trailing = actions ?? (
      <>
        <IconButton label="검색" onClick={onSearch}>
          <SearchIcon size={22} strokeWidth={1.8} />
        </IconButton>
        <IconButton label="메뉴" onClick={onMenu}>
          <MenuIcon size={22} strokeWidth={1.8} />
        </IconButton>
      </>
    );

    if (variant === "main") {
      return (
        <header
          ref={ref}
          className={cn(
            "font-kk flex h-[var(--kk-header-height)] w-full items-center justify-between bg-kk-list-bg px-[16px] text-kk-list-title",
            className
          )}
          {...props}
        >
          <h1 className="text-[22px] font-bold tracking-[-0.02em]">{title}</h1>
          <div className="flex items-center gap-[2px]">{trailing}</div>
        </header>
      );
    }

    return (
      <header
        ref={ref}
        className={cn(
          "font-kk flex h-[var(--kk-header-height)] w-full items-center gap-[2px] bg-kk-chat-header-bg px-[6px] text-kk-chat-header-fg backdrop-blur-md",
          className
        )}
        {...props}
      >
        <button
          type="button"
          aria-label="뒤로"
          onClick={onBack}
          className="flex h-[36px] items-center rounded-full pr-[4px] outline-none hover:opacity-70 focus-visible:ring-2 focus-visible:ring-kk-yellow"
        >
          <ChevronLeftIcon size={26} strokeWidth={1.8} />
          {!!unreadTotal && unreadTotal > 0 && (
            <span className="-ml-[3px] text-[15px] font-medium">
              {unreadTotal > 999 ? "999+" : unreadTotal}
            </span>
          )}
        </button>
        <h1 className="flex min-w-0 flex-1 items-baseline gap-[5px] px-[2px] text-[16px] font-semibold tracking-[-0.01em]">
          <span className="truncate">{title}</span>
          {memberCount != null && (
            <span className="shrink-0 text-[15px] font-normal opacity-50">{memberCount}</span>
          )}
        </h1>
        <div className="flex shrink-0 items-center">{trailing}</div>
      </header>
    );
  }
);
ChatHeader.displayName = "ChatHeader";

export { ChatHeader, type ChatHeaderProps };
