import React from "react";
import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";

/**
 * Stories render on the KakaoTalk chat background by default.
 *   parameters.phone = true   → wrap in a 390×844 iPhone frame (full screens)
 *   parameters.surface = "list" → white list background instead of chat bg
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

      if (phone) {
        return (
          <div className="flex min-h-screen items-center justify-center bg-neutral-200 p-6 dark:bg-neutral-900">
            <div className={`relative h-[844px] w-[390px] overflow-hidden rounded-[48px] border-[10px] border-neutral-900 ${surface} shadow-2xl`}>
              {/* status bar */}
              <div className="font-kk absolute inset-x-0 top-0 z-20 flex h-[44px] items-center justify-between px-[28px] text-[15px] font-semibold text-kk-text-primary">
                <span>9:41</span>
                <span className="h-[28px] w-[110px] rounded-full bg-neutral-900" aria-hidden />
                <span aria-hidden>●●●</span>
              </div>
              <div className="h-full pt-[44px]">
                <Story />
              </div>
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
