import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { PEOPLE } from "./fixtures";

const meta: Meta<typeof MessageGroup> = {
  title: "Kakao/MessageGroup",
  component: MessageGroup,
};
export default meta;
type Story = StoryObj<typeof MessageGroup>;

export const Incoming: Story = {
  render: () => (
    <MessageGroup sender={PEOPLE.minji} timestamp="오후 12:03">
      <ChatBubble>점심 뭐 먹어?</ChatBubble>
      <ChatBubble>회사 앞 새로 생긴 덮밥집 가볼래?</ChatBubble>
      <ChatBubble>웨이팅 있을 수도 있음</ChatBubble>
    </MessageGroup>
  ),
};

export const Outgoing: Story = {
  render: () => (
    <MessageGroup variant="outgoing" timestamp="오후 12:04" unreadCount={1}>
      <ChatBubble>좋아</ChatBubble>
      <ChatBubble>12시 10분에 1층에서 봐</ChatBubble>
    </MessageGroup>
  ),
};

/** Without a photo the default silhouette is shown. */
export const NoProfilePhoto: Story = {
  render: () => (
    <MessageGroup sender={PEOPLE.noPhoto} timestamp="오전 9:30">
      <ChatBubble>안녕하세요, 택배 기사입니다.</ChatBubble>
      <ChatBubble>문 앞에 두고 갈게요.</ChatBubble>
    </MessageGroup>
  ),
};

export const HiddenAvatar: Story = {
  render: () => (
    <MessageGroup sender={PEOPLE.junho} hideAvatar timestamp="오후 7:00">
      <ChatBubble>아바타 없이 이름만 보여요</ChatBubble>
    </MessageGroup>
  ),
};

/** A group chat: senders alternate, each group gets its own avatar and name. */
export const GroupChat: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--kk-gap-group)]">
      <MessageGroup sender={PEOPLE.minji} timestamp="오후 8:01" unreadCount={2}>
        <ChatBubble>이번 주말 등산 가는 사람?</ChatBubble>
      </MessageGroup>
      <MessageGroup sender={PEOPLE.junho} timestamp="오후 8:02" unreadCount={1}>
        <ChatBubble>저요 🙋</ChatBubble>
        <ChatBubble>북한산?</ChatBubble>
      </MessageGroup>
      <MessageGroup sender={PEOPLE.seoyeon} timestamp="오후 8:05">
        <ChatBubble>저는 일요일만 돼요</ChatBubble>
      </MessageGroup>
      <MessageGroup variant="outgoing" timestamp="오후 8:06">
        <ChatBubble>그럼 일요일 아침 8시 구파발역!</ChatBubble>
      </MessageGroup>
    </div>
  ),
};

/** Per-bubble props still win over the group's injected ones. */
export const PerBubbleOverrides: Story = {
  render: () => (
    <MessageGroup variant="outgoing">
      <ChatBubble timestamp="오후 11:58">자정 전에 보낸 메시지</ChatBubble>
      <ChatBubble timestamp="오전 12:01" unreadCount={1}>
        자정 넘어 보낸 메시지
      </ChatBubble>
    </MessageGroup>
  ),
};
