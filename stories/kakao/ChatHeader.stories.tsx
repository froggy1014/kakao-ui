import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { SettingsIcon, SearchIcon } from "@/components/ui/kakao/icons";

const meta: Meta<typeof ChatHeader> = {
  title: "Kakao/ChatHeader",
  component: ChatHeader,
  args: { title: "김민지", onBack: fn(), onSearch: fn(), onMenu: fn() },
  argTypes: { variant: { control: "inline-radio", options: ["chat", "main"] } },
};
export default meta;
type Story = StoryObj<typeof ChatHeader>;

export const OneOnOne: Story = {};

export const GroupChat: Story = {
  args: { title: "주말 등산 모임", memberCount: 6 },
};

/** iOS shows the total unread chats next to the back chevron. */
export const WithUnreadTotal: Story = {
  args: { title: "주말 등산 모임", memberCount: 6, unreadTotal: 23 },
};

export const LongTitleTruncates: Story = {
  args: {
    title: "2026 하반기 신규 서비스 런칭 TF (디자인·개발·마케팅)",
    memberCount: 128,
    unreadTotal: 1200,
  },
};

export const MainTab: Story = {
  args: { variant: "main", title: "채팅" },
  parameters: { surface: "list" },
};

export const MainTabCustomActions: Story = {
  args: {
    variant: "main",
    title: "친구",
    actions: (
      <>
        <button type="button" aria-label="검색" className="p-2">
          <SearchIcon size={22} strokeWidth={1.8} />
        </button>
        <button type="button" aria-label="설정" className="p-2">
          <SettingsIcon size={22} strokeWidth={1.8} />
        </button>
      </>
    ),
  },
  parameters: { surface: "list" },
};
