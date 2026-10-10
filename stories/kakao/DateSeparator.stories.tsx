import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DateSeparator, formatKakaoDate } from "@/components/ui/kakao/date-separator";

const meta: Meta<typeof DateSeparator> = {
  title: "Kakao/DateSeparator",
  component: DateSeparator,
  args: { date: "2026년 10월 11일 일요일" },
};
export default meta;
type Story = StoryObj<typeof DateSeparator>;

export const Default: Story = {};

export const WithoutIcon: Story = { args: { hideIcon: true } };

/** `formatKakaoDate(new Date())` produces the KakaoTalk format. */
export const FromDate: Story = {
  args: { date: formatKakaoDate(new Date(2026, 0, 1)) },
};
