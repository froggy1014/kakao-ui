import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AlimtalkBubble } from "@/components/ui/kakao/alimtalk-bubble";
import { BrandMessageBubble } from "@/components/ui/kakao/brand-message-bubble";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { ChatListItem } from "@/components/ui/kakao/chat-list-item";
import { ChatRoom } from "@/components/ui/kakao/chat-room";
import { DateSeparator } from "@/components/ui/kakao/date-separator";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { MessageInput } from "@/components/ui/kakao/message-input";
import { SystemMessage } from "@/components/ui/kakao/system-message";
import { CHANNELS, IMG, PEOPLE } from "./fixtures";

/** Full screens assembled from the components, inside an iPhone frame. */
const meta: Meta = {
  title: "Kakao/Screens",
  parameters: { phone: true },
};
export default meta;
type Story = StoryObj;

export const OneOnOneChat: Story = {
  render: () => (
    <ChatRoom header={<ChatHeader title={PEOPLE.minji.name} unreadTotal={4} />} input={<MessageInput />}>
      <DateSeparator date="2026년 10월 11일 일요일" />
      <MessageGroup sender={PEOPLE.minji} timestamp="오후 12:03">
        <ChatBubble>점심 뭐 먹어?</ChatBubble>
        <ChatBubble>회사 앞 새로 생긴 덮밥집 가볼래?</ChatBubble>
      </MessageGroup>
      <MessageGroup variant="outgoing" timestamp="오후 12:04">
        <ChatBubble>좋아 좋아</ChatBubble>
        <ChatBubble>12시 10분에 1층에서 봐</ChatBubble>
      </MessageGroup>
      <MessageGroup sender={PEOPLE.minji} timestamp="오후 12:05">
        <ChatBubble>ㅇㅋ 👍</ChatBubble>
      </MessageGroup>
      <MessageGroup variant="outgoing" timestamp="오후 12:30" unreadCount={1}>
        <ChatBubble edited>나 5분 늦을 듯 ㅠㅠ 먼저 줄 서 있어줘</ChatBubble>
      </MessageGroup>
    </ChatRoom>
  ),
};

export const GroupChat: Story = {
  render: () => (
    <ChatRoom
      header={<ChatHeader title="주말 등산 모임" memberCount={6} unreadTotal={23} />}
      input={<MessageInput defaultValue="좋아요 그럼 일요일에" />}
    >
      <DateSeparator date="2026년 10월 10일 토요일" />
      <SystemMessage>박서연님이 최도현님, 정하은님을 초대했습니다.</SystemMessage>
      <MessageGroup sender={PEOPLE.minji} timestamp="오후 8:01" unreadCount={3}>
        <ChatBubble>이번 주말 등산 가는 사람?</ChatBubble>
      </MessageGroup>
      <MessageGroup sender={PEOPLE.junho} timestamp="오후 8:02" unreadCount={2}>
        <ChatBubble>저요 🙋</ChatBubble>
        <ChatBubble>북한산 어때요?</ChatBubble>
      </MessageGroup>
      <MessageGroup sender={PEOPLE.seoyeon} timestamp="오후 8:05" unreadCount={1}>
        <ChatBubble>저는 일요일만 돼요</ChatBubble>
      </MessageGroup>
      <SystemMessage>정하은님이 나갔습니다.</SystemMessage>
      <MessageGroup variant="outgoing" timestamp="오후 8:06">
        <ChatBubble>그럼 일요일 아침 8시 구파발역!</ChatBubble>
      </MessageGroup>
      <MessageGroup sender={PEOPLE.dohyun} timestamp="오후 8:07">
        <ChatBubble>콜 🏔️</ChatBubble>
      </MessageGroup>
    </ChatRoom>
  ),
};

export const ChatsTab: Story = {
  parameters: { surface: "list" },
  render: () => (
    <div className="flex h-full flex-col bg-kk-list-bg">
      <ChatHeader variant="main" title="채팅" />
      <div className="flex-1 overflow-y-auto">
        <ChatListItem name="엄마" avatar={PEOPLE.haeun.avatar} pinned lastMessage="밥은 먹었어?" timestamp="오후 6:02" unreadCount={1} />
        <ChatListItem
          name="주말 등산 모임"
          memberCount={6}
          avatar={[PEOPLE.minji.avatar, PEOPLE.junho.avatar, PEOPLE.seoyeon.avatar, PEOPLE.dohyun.avatar]}
          lastMessage="최도현: 콜 🏔️"
          timestamp="오후 8:07"
          unreadCount={23}
        />
        <ChatListItem name={PEOPLE.minji.name} avatar={PEOPLE.minji.avatar} lastMessage="나 5분 늦을 듯 ㅠㅠ 먼저 줄 서 있어줘" timestamp="오후 12:30" />
        <ChatListItem name={CHANNELS.shop.name} avatar={CHANNELS.shop.avatar} lastMessage="결제가 완료되었습니다. 감사합니다." timestamp="오전 9:12" unreadCount={1} />
        <ChatListItem name="회사 공지방" memberCount={214} muted lastMessage="10월 사내 행사 안내" timestamp="어제" unreadCount={128} />
        <ChatListItem name={PEOPLE.junho.name} avatar={PEOPLE.junho.avatar} lastMessage="사진을 보냈습니다." timestamp="10월 9일" />
        <ChatListItem name={CHANNELS.bank.name} avatar={CHANNELS.bank.avatar} lastMessage="[포근은행] 인증번호 [482910]" timestamp="10월 8일" />
        <ChatListItem name={PEOPLE.seoyeon.name} avatar={PEOPLE.seoyeon.avatar} lastMessage="고마워!" timestamp="10월 7일" />
      </div>
    </div>
  ),
};

/** A business channel room receiving AlimTalk notices. */
export const AlimtalkChannel: Story = {
  render: () => (
    <ChatRoom header={<ChatHeader title={CHANNELS.shop.name} />} input={<MessageInput disabled placeholder="채널에 메시지를 보낼 수 없습니다" />}>
      <DateSeparator date="2026년 10월 11일 일요일" />
      <MessageGroup sender={CHANNELS.shop}>
        <AlimtalkBubble
          emphasizeType="ITEM_LIST"
          image={IMG("banner-order")}
          itemList={{
            header: "결제 완료",
            highlight: { title: "러닝화 외 1건", description: "미리마켓 공식몰", thumbnail: IMG("thumb-shoes") },
            items: [
              { title: "주문번호", description: "20261011-0042" },
              { title: "결제수단", description: "카카오페이머니" },
            ],
            summary: { title: "총 결제", description: "38,900원" },
          }}
          content="결제가 완료되었습니다. 감사합니다."
          buttons={[{ type: "WL", name: "주문 내역 보기" }]}
          timestamp="오전 9:12"
        />
      </MessageGroup>
      <MessageGroup sender={CHANNELS.shop}>
        <AlimtalkBubble
          emphasizeType="TEXT"
          subtitle="배송 출발 안내"
          title="내일 도착 예정"
          content={"주문하신 상품이 배송을 시작했습니다.\n\n▶ 택배사: 미리택배\n▶ 송장번호: 1234-5678-9012"}
          buttons={[{ type: "DS", name: "배송 조회" }]}
          quickReplies={[
            { type: "BK", name: "배송 문의" },
            { type: "BK", name: "교환/반품" },
          ]}
          timestamp="오후 3:40"
        />
      </MessageGroup>
    </ChatRoom>
  ),
};

/** A brand channel room receiving Brand Messages (ads). */
export const BrandMessageChannel: Story = {
  render: () => (
    <ChatRoom header={<ChatHeader title={CHANNELS.shop.name} />} input={<MessageInput />}>
      <DateSeparator date="2026년 10월 11일 일요일" />
      <MessageGroup sender={CHANNELS.shop}>
        <BrandMessageBubble
          chatBubbleType="WIDE"
          isAd
          image={IMG("wide-coffee")}
          content="달콤한 단호박 라떼가 돌아왔어요. 오늘부터 전 매장에서 만나보세요!"
          buttons={[
            { type: "WL", name: "메뉴 보기" },
            { type: "AL", name: "앱 주문" },
          ]}
          timestamp="오전 11:00"
        />
      </MessageGroup>
      <MessageGroup sender={CHANNELS.shop}>
        <BrandMessageBubble
          chatBubbleType="CAROUSEL_FEED"
          isAd
          carousel={[
            { image: IMG("card-1"), header: "제주 3박 4일 특가", content: "항공+숙소 묶음 최대 30% 할인.", buttons: [{ type: "WL", name: "예약하기" }] },
            { image: IMG("card-2"), header: "캠핑 장비 기획전", content: "텐트, 체어, 랜턴까지 한 번에.", buttons: [{ type: "WL", name: "구경하기" }] },
            { image: IMG("card-3"), header: "가을 니트 컬렉션", content: "램스울 니트 신상 12종.", buttons: [{ type: "WL", name: "보러가기" }] },
          ]}
          timestamp="오후 6:00"
        />
      </MessageGroup>
    </ChatRoom>
  ),
};

/** Theme slots let the room take a custom background, like KakaoTalk themes. */
export const CustomThemeBackground: Story = {
  render: () => (
    <ChatRoom
      background="linear-gradient(180deg, #ffe5ec 0%, #ffc2d1 100%)"
      header={<ChatHeader title={PEOPLE.seoyeon.name} className="bg-transparent" />}
      input={<MessageInput />}
    >
      <MessageGroup sender={PEOPLE.seoyeon} timestamp="오후 9:00">
        <ChatBubble>테마 바꿨어?</ChatBubble>
      </MessageGroup>
      <MessageGroup variant="outgoing" timestamp="오후 9:01">
        <ChatBubble>ChatRoom의 background prop 하나로 바꿀 수 있어</ChatBubble>
      </MessageGroup>
    </ChatRoom>
  ),
};
