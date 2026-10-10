import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { ChatBubble } from "@/components/ui/kakao/chat-bubble";
import { MessageInput } from "@/components/ui/kakao/message-input";

const meta: Meta<typeof MessageInput> = {
  title: "Kakao/MessageInput",
  component: MessageInput,
  args: { onSend: fn(), onAttach: fn(), onEmoji: fn(), onHash: fn() },
};
export default meta;
type Story = StoryObj<typeof MessageInput>;

/** Empty: the right button is "#" (in-chat search). */
export const Empty: Story = {};

/** With text: "#" becomes the yellow send button. */
export const WithText: Story = {
  args: { defaultValue: "지금 출발해요" },
};

export const AutoGrow: Story = {
  args: {
    defaultValue: "첫째 줄\n둘째 줄\n셋째 줄\n넷째 줄\n다섯째 줄\n여섯째 줄은 스크롤돼요",
  },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "메시지를 보낼 수 없는 채팅방입니다" },
};

/** Enter sends (IME-safe for Hangul), Shift+Enter adds a line. */
export const TypeAndSend: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole("textbox", { name: "메시지" });
    await userEvent.type(field, "안녕하세요");
    await userEvent.click(canvas.getByRole("button", { name: "전송" }));
    await expect(args.onSend).toHaveBeenCalledWith("안녕하세요");
    await expect(field).toHaveValue("");
  },
};

function LiveChat() {
  const [messages, setMessages] = React.useState<string[]>(["메시지를 입력하고 Enter를 눌러보세요"]);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-[4px]">
        {messages.map((m, i) => (
          <ChatBubble key={i} variant={i === 0 ? "incoming" : "outgoing"} showTail={i <= 1} timestamp="지금">
            {m}
          </ChatBubble>
        ))}
      </div>
      <MessageInput onSend={(t) => setMessages((prev) => [...prev, t])} />
    </div>
  );
}

export const Controlled: Story = {
  render: () => <LiveChat />,
};
