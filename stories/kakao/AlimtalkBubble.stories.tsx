import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { AlimtalkBubble } from "@/components/ui/kakao/alimtalk-bubble";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { CHANNELS, IMG } from "./fixtures";

const meta: Meta<typeof AlimtalkBubble> = {
  title: "Kakao/BizMessage/AlimTalk",
  component: AlimtalkBubble,
  args: {
    messageType: "BA",
    emphasizeType: "NONE",
    content:
      "안녕하세요, 김민지 고객님.\n주문이 정상적으로 접수되었습니다.\n\n▶ 주문번호: 20261011-0042\n▶ 결제금액: 38,900원\n▶ 배송예정: 10월 13일(화)",
    buttons: [{ type: "WL", name: "주문 내역 보기", linkMo: "https://example.com/orders/42" }],
    timestamp: "오전 9:12",
    onButtonClick: fn(),
  },
  argTypes: {
    messageType: { control: "inline-radio", options: ["BA", "EX", "AD", "MI"] },
    emphasizeType: { control: "inline-radio", options: ["NONE", "TEXT", "IMAGE", "ITEM_LIST"] },
  },
  decorators: [
    (Story) => (
      <MessageGroup sender={CHANNELS.shop}>
        <Story />
      </MessageGroup>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof AlimtalkBubble>;

/** 기본형 (BA) — the most common order / reservation notice. */
export const Basic: Story = {};

/** 부가정보형 (EX) — extra info in muted text below the body. */
export const ExtraInfo: Story = {
  args: {
    messageType: "EX",
    extra: "※ 본 메시지는 고객님의 주문에 따라 발송되는 정보성 메시지입니다.\n문의: 1588-0000 (평일 09:00~18:00)",
  },
};

/** 채널추가형 (AD) — fixed channel-add notice and a pinned "채널 추가" button. */
export const ChannelAdd: Story = {
  args: { messageType: "AD" },
};

/** 복합형 (MI) — extra info and channel-add together. */
export const Mixed: Story = {
  args: {
    messageType: "MI",
    extra: "※ 주문 취소는 배송 시작 전까지 가능합니다.",
  },
};

/** 강조표기형 (TEXT) — large title with a muted subtitle above. */
export const EmphasizeText: Story = {
  args: {
    emphasizeType: "TEXT",
    subtitle: "배송 출발 안내",
    title: "오늘 도착 예정",
    content: "주문하신 상품이 배송을 시작했습니다.\n\n▶ 택배사: 미리택배\n▶ 송장번호: 1234-5678-9012",
    buttons: [{ type: "DS", name: "배송 조회" }],
  },
};

/** 이미지형 (IMAGE) — 2:1 image under the band (800×400 recommended). */
export const EmphasizeImage: Story = {
  args: {
    emphasizeType: "IMAGE",
    image: IMG("banner-order"),
    imageAlt: "주문 접수 안내 이미지",
  },
};

/** 아이템리스트형 (ITEM_LIST) — header, highlight with thumbnail, items, summary. */
export const EmphasizeItemList: Story = {
  args: {
    emphasizeType: "ITEM_LIST",
    image: IMG("banner-order"),
    itemList: {
      header: "결제 완료",
      highlight: { title: "러닝화 외 1건", description: "미리마켓 공식몰", thumbnail: IMG("thumb-shoes") },
      items: [
        { title: "주문번호", description: "20261011-0042" },
        { title: "결제수단", description: "카카오페이머니" },
        { title: "결제일시", description: "2026.10.11 09:10" },
        { title: "배송지", description: "서울시 강남구 테헤란로 123" },
      ],
      summary: { title: "총 결제", description: "38,900원" },
    },
    content: "결제가 완료되었습니다. 감사합니다.",
  },
};

export const ItemListWithoutImage: Story = {
  args: {
    emphasizeType: "ITEM_LIST",
    itemList: {
      header: "예약 확정",
      highlight: { title: "포근 헤어 강남점", description: "디자이너 수진" },
      items: [
        { title: "일시", description: "10월 15일(목) 오후 3:00" },
        { title: "메뉴", description: "커트 + 클리닉" },
      ],
    },
    content: "예약이 확정되었어요. 변경은 방문 하루 전까지 가능합니다.",
    buttons: [
      { type: "WL", name: "예약 변경" },
      { type: "BC", name: "상담톡 문의" },
    ],
  },
};

/** Up to 5 stacked buttons. */
export const ManyButtons: Story = {
  args: {
    buttons: [
      { type: "WL", name: "주문 내역 보기" },
      { type: "DS", name: "배송 조회" },
      { type: "BK", name: "교환/반품 문의" },
      { type: "MD", name: "메시지 전달" },
      { type: "TN", name: "고객센터 전화" },
    ],
  },
};

/** 바로연결 — chips under the card. */
export const QuickReplies: Story = {
  args: {
    quickReplies: [
      { type: "BK", name: "배송 문의" },
      { type: "BK", name: "교환/반품" },
      { type: "WL", name: "자주 묻는 질문" },
      { type: "BC", name: "상담원 연결" },
    ],
  },
};

/**
 * Over-limit text is cut with an ellipsis (and warned in dev). Here title is
 * 60+ chars against the 50-char limit, and 6 buttons against max 5.
 */
export const OverLimit: Story = {
  args: {
    emphasizeType: "TEXT",
    title: "이 강조 타이틀은 카카오 비즈메시지 콘텐츠 가이드의 50자 제한을 넘기기 위해 일부러 아주 길게 작성한 문장입니다",
    buttons: Array.from({ length: 6 }, (_, i) => ({ type: "WL" as const, name: `버튼 ${i + 1}` })),
  },
};

/** Sources disagree on some limits — override per template. */
export const CustomLimits: Story = {
  args: {
    limits: { content: 40 },
    content: "본문 제한을 40자로 낮추면 이 문장은 중간에서 잘리고 말줄임표가 붙습니다. 뒷부분은 보이지 않아요.",
  },
};

export const CustomHeaderLabel: Story = {
  args: { headerLabel: "알림톡 도착 · 보안 인증" , content: "[포근은행] 인증번호 [482910]을 입력해주세요. 타인에게 절대 알려주지 마세요." , buttons: [] },
};
