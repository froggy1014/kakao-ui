import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AlimtalkBubble } from "@/components/ui/kakao/alimtalk-bubble";
import { BrandMessageBubble, adSenderName } from "@/components/ui/kakao/brand-message-bubble";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { ChatHeader } from "@/components/ui/kakao/chat-header";
import { ChatRoom } from "@/components/ui/kakao/chat-room";
import { MessageGroup } from "@/components/ui/kakao/message-group";
import { MessageInput } from "@/components/ui/kakao/message-input";
import { CHANNELS, IMG, PEOPLE } from "./fixtures";

/**
 * Side by side with Kakao's own published imagery — App Store screenshots and
 * the Kakao Business content guides. The images belong to Kakao Corp., so they
 * are not in the repository: run `pnpm refs:fetch` to download them into
 * `public/reference/` (git-ignored, never deployed).
 *
 * Drop your own device screenshots in the same folder as `device-light.png` /
 * `device-dark.png` to compare against them too.
 */
const meta: Meta = {
  title: "Kakao/Reference",
  parameters: { bare: true, layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

const REF = (name: string) => `/reference/${name}`;

function Missing({ file }: { file: string }) {
  return (
    <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500">
      <p>
        <code>public/reference/{file}</code> not found.
      </p>
      <p>
        Run <code className="rounded bg-neutral-200 px-1">pnpm refs:fetch</code> locally. Kakao&apos;s images are
        not redistributed with this project.
      </p>
    </div>
  );
}

/** Shows a reference image, optionally cropped to a region given in image pixels. */
function RefImage({
  file,
  crop,
  width,
}: {
  file: string;
  crop?: { x: number; y: number; w: number; h: number; imageWidth: number };
  width: number;
}) {
  const [missing, setMissing] = React.useState(false);
  if (missing) return <Missing file={file} />;
  if (!crop) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={REF(file)} alt="" style={{ width }} className="rounded-xl" onError={() => setMissing(true)} />;
  }
  const scale = width / crop.w;
  return (
    <div className="relative overflow-hidden rounded-[38px]" style={{ width, height: crop.h * scale }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={REF(file)}
        alt=""
        onError={() => setMissing(true)}
        className="absolute max-w-none"
        style={{ width: crop.imageWidth * scale, left: -crop.x * scale, top: -crop.y * scale }}
      />
    </div>
  );
}

function Phone({ children, height = 844 }: { children: React.ReactNode; height?: number }) {
  return (
    <div
      className="relative w-[390px] shrink-0 overflow-hidden rounded-[38px] bg-kk-chat-bg"
      style={{ height }}
    >
      <div className="font-kk flex h-[54px] items-center px-[32px] text-[16px] font-semibold text-kk-text-primary">
        9:41
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[54px]">{children}</div>
    </div>
  );
}

function Compare({ title, note, ours, reference }: {
  title: string;
  note?: React.ReactNode;
  ours: React.ReactNode;
  reference: React.ReactNode;
}) {
  return (
    <div className="font-kk min-h-screen bg-neutral-100 p-8 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <h1 className="text-xl font-bold">{title}</h1>
      {note && <p className="mt-1 max-w-[820px] text-sm text-neutral-500">{note}</p>}
      <div className="mt-6 flex flex-wrap items-start gap-8">
        <figure className="flex flex-col gap-2">
          <figcaption className="text-xs font-semibold uppercase tracking-wide text-neutral-500">katok-ui</figcaption>
          {ours}
        </figure>
        <figure className="flex flex-col gap-2">
          <figcaption className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Kakao (reference)
          </figcaption>
          {reference}
        </figure>
      </div>
    </div>
  );
}

const LIGHT = { globals: { theme: "light" } };
const DARK = { globals: { theme: "dark" } };

/** App Store screenshot 1 (iOS 26 chat room). Messages copied from it. */
export const ChatRoomLight: Story = {
  ...LIGHT,
  render: () => (
    <Compare
      title="Chat room — light"
      note="Reference: KakaoTalk App Store screenshot (KR), cropped to the phone screen. The shared video card is a media message (v0.2), so it is left out."
      ours={
        <Phone height={823}>
          <ChatRoom
            header={<ChatHeader title="대학교 친구들" memberCount={3} />}
            input={<MessageInput />}
          >
            <div className="h-[330px]" />
            <MessageGroup variant="outgoing" timestamp="오후 12:03">
              <ChatBubble>댕댕이 너무 귀여워</ChatBubble>
            </MessageGroup>
            <MessageGroup sender={{ name: "은정", avatar: IMG("avatar-haeun") }} timestamp="오후 12:03">
              <ChatBubble>귀 펄럭이는 것 좀 봐</ChatBubble>
            </MessageGroup>
            <MessageGroup sender={{ name: "수민", avatar: IMG("avatar-seoyeon") }} timestamp="오후 12:03">
              <ChatBubble>진짜 사랑스럽다</ChatBubble>
            </MessageGroup>
          </ChatRoom>
        </Phone>
      }
      reference={
        <RefImage
          file="appstore-01.png"
          width={390}
          crop={{ x: 161, y: 742, w: 922, h: 1946, imageWidth: 1242 }}
        />
      }
    />
  ),
};

/** Your own device screenshot, if you put one in public/reference/. */
export const DeviceDark: Story = {
  ...DARK,
  render: () => (
    <Compare
      title="Chat room — dark (your device)"
      note="Save an iPhone screenshot as public/reference/device-dark.png. Dark-mode tokens graded D were measured this way."
      ours={
        <Phone>
          <ChatRoom
            header={<ChatHeader title="주말 등산 모임" memberCount={6} unreadTotal={23} />}
            input={<MessageInput />}
          >
            <MessageGroup sender={PEOPLE.minji} timestamp="18:02" unreadCount={52}>
              <ChatBubble>서레 화이팅~</ChatBubble>
            </MessageGroup>
            <MessageGroup sender={PEOPLE.junho} timestamp="18:03" unreadCount={52}>
              <ChatBubble>여러분 진짜 서울레이스 열기가 가장뜨거운 거 아시죠?? 장난아닙니다!</ChatBubble>
            </MessageGroup>
            <MessageGroup variant="outgoing" timestamp="22:20" unreadCount={67}>
              <ChatBubble>핑</ChatBubble>
            </MessageGroup>
            <MessageGroup sender={PEOPLE.dohyun} timestamp="22:37" unreadCount={72}>
              <ChatBubble>퐁</ChatBubble>
            </MessageGroup>
          </ChatRoom>
        </Phone>
      }
      reference={<RefImage file="device-dark.png" width={390} />}
    />
  ),
};

const RYAN_ORDER = `에이프릴키친 입니다.
라이언님, 안녕하세요.

소중한 주문이 접수완료 되었습니다.

■ 주문일자: 2025.05.01(토) 11:55
■ 금액: 12,000원
■ 주문번호: 20210323-0003274`;

/** Kakao Business AlimTalk guide — the four message types. */
export const AlimtalkMessageTypes: Story = {
  ...LIGHT,
  render: () => (
    <Compare
      title="AlimTalk — message types (BA · EX · AD · MI)"
      note="Reference: Kakao Business AlimTalk content guide."
      ours={
        <div className="flex w-[390px] flex-col gap-[16px] rounded-[38px] bg-kk-chat-bg px-[10px] py-[20px]">
          <MessageGroup sender={{ name: "에이프릴키친", avatar: IMG("channel-shop") }}>
            <AlimtalkBubble
              messageType="BA"
              content={RYAN_ORDER}
              buttons={[{ type: "WL", name: "홈페이지 바로가기" }]}
              timestamp="오후 12:03"
            />
          </MessageGroup>
          <MessageGroup sender={{ name: "에이프릴키친", avatar: IMG("channel-shop") }}>
            <AlimtalkBubble
              messageType="AD"
              content={RYAN_ORDER}
              buttons={[{ type: "WL", name: "홈페이지 바로가기" }]}
              timestamp="오후 12:03"
            />
          </MessageGroup>
        </div>
      }
      reference={<RefImage file="alimtalk-01.png" width={760} />}
    />
  ),
};

/** Kakao Business AlimTalk guide — item list example 5 (header + highlight). */
export const AlimtalkItemList: Story = {
  ...LIGHT,
  render: () => (
    <Compare
      title="AlimTalk — item list"
      note="Reference: Kakao Business AlimTalk content guide, item list examples. With a summary, item values right-align (example 6)."
      ours={
        <div className="flex w-[390px] flex-col gap-[16px] rounded-[38px] bg-kk-chat-bg px-[10px] py-[20px]">
          <MessageGroup sender={{ name: "라이언카페", avatar: IMG("channel-shop") }}>
            <AlimtalkBubble
              emphasizeType="ITEM_LIST"
              itemList={{
                header: "웨이팅 접수완료",
                highlight: { title: "107번", description: "웨이팅 번호", thumbnail: IMG("thumb-shoes") },
                items: [
                  { title: "등록일시", description: "6월 10일 12:10" },
                  { title: "대기인원", description: "4명" },
                  { title: "대기시간", description: "약 30분" },
                  { title: "내앞 웨이팅", description: "6팀" },
                ],
              }}
              messageType="EX"
              content={"안녕하세요. 어피치님\n고객님의 웨이팅이 접수되었습니다."}
              extra="5분이내 미입장시 자동취소됩니다. 자동취소 후 입장 시 다시 웨이팅 하셔야 합니다."
              buttons={[{ type: "WL", name: "웨이팅 실시간 확인" }]}
              timestamp="오후 12:03"
            />
          </MessageGroup>
          <MessageGroup sender={{ name: "라이언차이나", avatar: IMG("channel-shop") }}>
            <AlimtalkBubble
              emphasizeType="ITEM_LIST"
              itemList={{
                highlight: { title: "찹쌀탕수육+짜장1+짬뽕1 세트", description: "주문메뉴" },
                items: [
                  { title: "도착시간", description: "약 50분 내" },
                  { title: "주문번호", description: "B0YB00E1E7" },
                  { title: "결제수단", description: "카카오페이머니" },
                ],
                summary: { title: "결제금액", description: "28,000원" },
              }}
              content={"안녕하세요. 어피치님\n고객님이 주문하신 음식이 약 50분 내에 도착할 예정입니다."}
              buttons={[{ type: "WL", name: "실시간 주문조회" }]}
              timestamp="오후 12:03"
            />
          </MessageGroup>
        </div>
      }
      reference={<RefImage file="alimtalk-07.png" width={760} />}
    />
  ),
};

/** Kakao Business Brand Message guide — text type with coupon. */
export const BrandMessageText: Story = {
  ...LIGHT,
  render: () => (
    <Compare
      title="Brand Message — text with coupon"
      note='Reference: Kakao Business Brand Message guide. "(광고)" sits before the sender name; the opt-out line sits under the bubble.'
      ours={
        <div className="w-[390px] rounded-[38px] bg-kk-chat-bg px-[10px] py-[20px]">
          <MessageGroup sender={{ ...CHANNELS.shop, name: adSenderName("카카오프렌즈") }}>
            <BrandMessageBubble
              isAd
              content={"[카카오프렌즈]\n추운겨울 ⛄ 카카오프렌즈로 따뜻한 겨울 나기 ❄️\n\n🔥 추운날! 손시릴 걱정 NO~ NO~ 나의 손을 데워줄 손난로"}
              buttons={[
                { type: "WL", name: "30% 할인전 바로가기" },
                { type: "WL", name: "따끈따끈 신상 아이템 보기" },
                { type: "WL", name: "라이언 혜택 받기" },
                { type: "WL", name: "더 많은 상품 보러가기" },
              ]}
              coupon={{ title: "10% 할인 쿠폰", description: "2026.5.25까지 사용" }}
              // Kakao's own example is 14 characters; vendors document 12.
              limits={{ couponDescription: 14 }}
              timestamp="오전 09:00"
            />
          </MessageGroup>
        </div>
      }
      reference={<RefImage file="brand-02.png" width={760} />}
    />
  ),
};
