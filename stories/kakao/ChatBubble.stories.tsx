import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { LONG_TEXT } from "./fixtures";

const meta: Meta<typeof ChatBubble> = {
  title: "Kakao/ChatBubble",
  component: ChatBubble,
  args: {
    variant: "incoming",
    showTail: true,
    timestamp: "오후 2:14",
    children: "점심 뭐 먹을까요?",
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["incoming", "outgoing"] },
    unreadCount: { control: { type: "number", min: 0 } },
  },
};
export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const Playground: Story = {};

export const Incoming: Story = {
  args: { variant: "incoming" },
};

export const Outgoing: Story = {
  args: { variant: "outgoing", children: "회사 앞 국밥집 어때요?", unreadCount: 1 },
};

/** Only the first bubble of a group carries the tail (theme spec 9-slice "…01"). */
export const TailVsNoTail: Story = {
  render: () => (
    <div className="flex flex-col gap-[4px]">
      <ChatBubble showTail>첫 말풍선은 꼬리가 있어요</ChatBubble>
      <ChatBubble timestamp="오후 2:14">이어지는 말풍선은 꼬리가 없어요</ChatBubble>
      <div className="h-3" />
      <ChatBubble variant="outgoing" showTail>보낸 첫 말풍선</ChatBubble>
      <ChatBubble variant="outgoing" timestamp="오후 2:15">이어지는 말풍선</ChatBubble>
    </div>
  ),
};

/** The yellow number counts members who haven't read the message yet. */
export const UnreadCount: Story = {
  render: () => (
    <div className="flex flex-col gap-[4px]">
      <ChatBubble variant="outgoing" showTail unreadCount={1} timestamp="오후 3:02">
        1:1 채팅 — 상대가 아직 안 읽음
      </ChatBubble>
      <ChatBubble variant="outgoing" unreadCount={5} timestamp="오후 3:02">
        단톡방 — 5명이 아직 안 읽음
      </ChatBubble>
      <ChatBubble variant="outgoing" timestamp="오후 3:03">
        모두 읽으면 숫자가 사라져요
      </ChatBubble>
      <ChatBubble showTail unreadCount={2} timestamp="오후 3:04">
        받은 메시지에도 표시돼요
      </ChatBubble>
    </div>
  ),
};

/** KakaoTalk 25.8+ lets senders edit within 24h; the meta shows "수정됨". */
export const Edited: Story = {
  render: () => (
    <div className="flex flex-col gap-[6px]">
      <ChatBubble variant="outgoing" showTail edited timestamp="오전 10:20">
        내일 10시 반으로 변경할게요
      </ChatBubble>
      <ChatBubble showTail edited timestamp="오전 10:21">
        넵 확인했습니다
      </ChatBubble>
    </div>
  ),
};

export const LongText: Story = {
  args: { children: LONG_TEXT, timestamp: "오후 6:40" },
};

export const Multiline: Story = {
  args: {
    variant: "outgoing",
    children: "준비물\n- 노트북\n- 충전기\n- 사원증",
    timestamp: "오전 8:12",
  },
};

export const ShortReplies: Story = {
  render: () => (
    <div className="flex flex-col gap-[4px]">
      <ChatBubble showTail>ㅋ</ChatBubble>
      <ChatBubble>ㅇㅇ</ChatBubble>
      <ChatBubble variant="outgoing" showTail timestamp="오후 1:01">
        👍
      </ChatBubble>
    </div>
  ),
};

export const UnbrokenUrl: Story = {
  args: {
    variant: "outgoing",
    children: "https://kakao-ui.jeongmin.dev/r/alimtalk-bubble.json?utm_source=kakaotalk&utm_medium=chat",
    timestamp: "오후 4:44",
  },
};
