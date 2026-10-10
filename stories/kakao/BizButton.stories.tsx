import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { BizButton, type BizButtonType } from "@/components/ui/kakao/biz-button";

const meta: Meta<typeof BizButton> = {
  title: "Kakao/BizMessage/BizButton",
  component: BizButton,
  args: { type: "WL", name: "주문 내역 보기", onClick: fn() },
  argTypes: {
    type: {
      control: "select",
      options: ["WL", "AL", "DS", "BK", "MD", "BC", "BT", "AC", "BF", "TN", "P1", "P2", "P3"],
    },
  },
  decorators: [(Story) => <div className="w-[240px]">{Story()}</div>],
};
export default meta;
type Story = StoryObj<typeof BizButton>;

export const Playground: Story = {};

const ALL: [BizButtonType, string][] = [
  ["WL", "웹링크"],
  ["AL", "앱링크"],
  ["DS", "배송 조회"],
  ["BK", "봇키워드"],
  ["MD", "메시지 전달"],
  ["BC", "상담톡 전환"],
  ["BT", "봇 전환"],
  ["AC", "채널 추가"],
  ["BF", "비즈니스폼"],
  ["TN", "전화하기"],
];

/** Every API button code renders the same; `data-button-type` keeps the code for styling/tests. */
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-[6px]">
      {ALL.map(([type, name]) => (
        <BizButton key={type} type={type} name={`${name} (${type})`} />
      ))}
    </div>
  ),
};

export const AsAnchor: Story = {
  args: { href: "https://example.com/orders", name: "웹에서 보기" },
};

/** WIDE / CAROUSEL brand messages place up to two compact buttons side by side. */
export const CompactPair: Story = {
  render: () => (
    <div className="flex gap-[6px]">
      <BizButton type="WL" name="자세히" compact />
      <BizButton type="AL" name="앱 열기" compact />
    </div>
  ),
};
