import React from "react";
import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";

/**
 * Stories render on the KakaoTalk chat background by default.
 *   parameters.phone = true   → wrap in a 390×844 iPhone frame (full screens)
 *   parameters.surface = "list" → white list background instead of chat bg
 *   parameters.bare = true    → no wrapper (the story lays out its own frames)
 */
const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals?.theme === "dark";
      const phone = context.parameters?.phone === true;
      const surface = context.parameters?.surface === "list" ? "bg-kk-list-bg" : "bg-kk-chat-bg";

      React.useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", isDark);
        root.setAttribute("data-theme", isDark ? "dark" : "light");
      }, [isDark]);

      // Reference pages lay out their own frames.
      if (context.parameters?.bare === true) return <Story />;

      if (phone) {
        return (
          <div className="flex min-h-screen items-center justify-center bg-neutral-200 p-6 dark:bg-neutral-900">
            <div className={`relative h-[844px] w-[390px] overflow-hidden rounded-[48px] border-[10px] border-neutral-900 ${surface} shadow-2xl`}>
              {/* status bar */}
              <div className="font-kk absolute inset-x-0 top-0 z-20 flex h-[44px] items-center justify-between px-[28px] text-[15px] font-semibold text-kk-text-primary">
                <span>9:41</span>
                <span className="h-[28px] w-[110px] rounded-full bg-neutral-900" aria-hidden />
                <span aria-hidden className="flex items-center gap-[5px]">
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
                  <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor" /><path d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4Z" fill="currentColor" opacity="0.4" /></svg>
                </span>
              </div>
              <div className="h-full pb-[22px] pt-[44px]">
                <Story />
              </div>
              {/* home indicator */}
              <div aria-hidden className="absolute bottom-[8px] left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-kk-text-primary" />
            </div>
          </div>
        );
      }

      return (
        <div className={`${surface} min-h-screen p-6`}>
          <div className="mx-auto w-full max-w-[390px]">
            <Story />
          </div>
        </div>
      );
    },
  ],
  parameters: {
    options: {
      storySort: {
        order: [
          "Kakao",
          [
            "Introduction",
            "Screens",
            "ChatBubble",
            "MessageGroup",
            "ProfileAvatar",
            "ChatHeader",
            "MessageInput",
            "DateSeparator",
            "SystemMessage",
            "ChatListItem",
            "BizMessage",
            ["BizButton", "AlimTalk", "BrandMessage"],
            "Tokens",
          ],
        ],
      },
    },
    backgrounds: { disable: true },
    layout: "fullscreen",
    a11y: { test: "todo" },
  },
};

export default preview;
