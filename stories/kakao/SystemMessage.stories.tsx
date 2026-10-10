import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SystemMessage } from "@/components/ui/kakao/system-message";

const meta: Meta<typeof SystemMessage> = {
  title: "Kakao/SystemMessage",
  component: SystemMessage,
};
export default meta;
type Story = StoryObj<typeof SystemMessage>;

export const Joined: Story = { args: { children: "김민지님이 들어왔습니다." } };

export const Left: Story = { args: { children: "이준호님이 나갔습니다." } };

export const Invited: Story = {
  args: {
    children: "박서연님이 최도현님, 정하은님을 초대했습니다.",
  },
};

export const InviteWithAction: Story = {
  args: {
    children: "초대받은 채팅방입니다. 원하지 않으면 나가기를 눌러주세요.",
    action: "초대 거부",
  },
};

export const Deleted: Story = { args: { children: "삭제된 메시지입니다." } };

export const LongNotice: Story = {
  args: {
    children:
      "이 채팅방은 운영정책 위반으로 일부 기능이 제한되었습니다. 자세한 내용은 고객센터 공지사항을 확인해주세요.",
  },
};
