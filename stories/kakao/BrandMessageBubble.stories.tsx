import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { BrandMessageBubble, adSenderName } from "@/components/ui/kakao/brand-message-bubble";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { CHANNELS, IMG } from "./fixtures";

const meta: Meta<typeof BrandMessageBubble> = {
  title: "Kakao/BizMessage/BrandMessage",
  component: BrandMessageBubble,
  args: { timestamp: "오전 11:00", onButtonClick: fn() },
  argTypes: {
    chatBubbleType: { control: "inline-radio", options: ["TEXT", "IMAGE", "WIDE", "CAROUSEL_FEED"] },
  },
  decorators: [
    (Story, { args }) => (
      <MessageGroup
        sender={args.isAd ? { ...CHANNELS.shop, name: adSenderName(CHANNELS.shop.name) } : CHANNELS.shop}
      >
        <Story />
      </MessageGroup>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof BrandMessageBubble>;

export const Text: Story = {
  args: {
    chatBubbleType: "TEXT",
    content: "가을 맞이 신상품이 입고되었어요 🍂\n이번 주 일요일까지 신상품 전 품목 무료배송!",
    buttons: [{ type: "WL", name: "신상품 보러가기" }],
  },
};

/** Ads show "(광고)" before the sender name and the opt-out line under the bubble. */
export const TextAdWithCoupon: Story = {
  args: {
    chatBubbleType: "TEXT",
    isAd: true,
    content: "미리마켓 가을 정기 세일이 시작됐어요!\n최대 50% 할인에 쿠폰까지 챙겨가세요.",
    coupon: { title: "3,000원 할인 쿠폰", description: "5만원 이상 구매 시" },
    buttons: [
      { type: "WL", name: "세일 상품 보기" },
      { type: "AC", name: "채널 추가" },
    ],
  },
};

export const Image: Story = {
  args: {
    chatBubbleType: "IMAGE",
    isAd: true,
    image: IMG("banner-sale"),
    imageAlt: "가을 정기 세일 배너",
    content: "가을 정기 세일 D-1! 내일 오전 10시에 오픈합니다.",
    buttons: [{ type: "WL", name: "알림 신청하기" }],
  },
};

/** IMAGE allows ratios from 2:1 to 3:4. */
export const ImagePortrait: Story = {
  args: {
    chatBubbleType: "IMAGE",
    image: IMG("photo-1"),
    imageRatio: "3 / 4",
    content: "이번 주 룩북을 확인해보세요.",
    buttons: [{ type: "WL", name: "룩북 보기" }],
  },
};

/** WIDE — wider card, 76-char body, max 2 compact buttons side by side. */
export const Wide: Story = {
  args: {
    chatBubbleType: "WIDE",
    isAd: true,
    image: IMG("wide-coffee"),
    content: "달콤한 단호박 라떼가 돌아왔어요. 오늘부터 전 매장에서 만나보세요!",
    buttons: [
      { type: "WL", name: "메뉴 보기" },
      { type: "AL", name: "앱 주문" },
    ],
  },
};

export const WideWithCoupon: Story = {
  args: {
    chatBubbleType: "WIDE",
    image: IMG("wide-coffee"),
    content: "첫 주문 고객님께 드리는 선물 🎁",
    coupon: { title: "아메리카노 무료 쿠폰", description: "앱 첫 주문 시 사용 가능" },
    buttons: [{ type: "AL", name: "쿠폰 받기" }],
  },
};

/** CAROUSEL_FEED — 2–6 swipeable cards, each with up to 2 buttons. */
export const CarouselFeed: Story = {
  args: {
    chatBubbleType: "CAROUSEL_FEED",
    isAd: true,
    carousel: [
      { image: IMG("card-1"), header: "제주 3박 4일 특가", content: "항공+숙소 묶음 최대 30% 할인. 10월 출발 한정!", buttons: [{ type: "WL", name: "예약하기" }] },
      { image: IMG("card-2"), header: "캠핑 장비 기획전", content: "텐트, 체어, 랜턴까지 한 번에.", buttons: [{ type: "WL", name: "구경하기" }, { type: "AL", name: "앱에서" }] },
      { image: IMG("card-3"), header: "가을 니트 컬렉션", content: "부드러운 램스울 니트 신상 12종.", buttons: [{ type: "WL", name: "보러가기" }] },
      { image: IMG("card-4"), header: "얼리버드 콘서트", content: "연말 공연 얼리버드 예매 오픈.", buttons: [{ type: "WL", name: "예매하기" }] },
    ],
  },
};

/** Coupon titles must use one of five formats; others warn in dev. */
export const CouponFormats: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {["3,000원 할인 쿠폰", "10% 할인 쿠폰", "배송비 할인 쿠폰", "아메리카노 무료 쿠폰", "사이즈 UP 쿠폰"].map((title) => (
        <BrandMessageBubble key={title} {...args} chatBubbleType="TEXT" content={`쿠폰 형식: ${title}`} coupon={{ title, description: "10월 31일까지" }} />
      ))}
    </div>
  ),
};

export const OverLimit: Story = {
  args: {
    chatBubbleType: "WIDE",
    image: IMG("wide-coffee"),
    content:
      "와이드 이미지형은 본문이 76자로 제한돼요. 이 문장은 그 제한을 넘기기 위해 일부러 길게 쓴 문장이라서 끝부분이 말줄임표로 잘려 보여야 합니다. 정말이에요.",
    buttons: [
      { type: "WL", name: "버튼 이름이 여덟 글자를 넘어요" },
      { type: "AL", name: "두번째" },
      { type: "WL", name: "세번째는 안 보여요" },
    ],
  },
};
