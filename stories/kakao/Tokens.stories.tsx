import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/**
 * Color tokens with their evidence grade:
 * O official · T theme-creation spec · S measured from Kakao's published imagery
 * (App Store screenshots, Kakao Business guide) · D measured on device ·
 * C clone approximation · M pending measurement. "S/D" = light from Kakao imagery,
 * dark measured on device.
 * Toggle the toolbar theme to see dark values.
 */
const meta: Meta = {
  title: "Kakao/Tokens",
  parameters: { surface: "list" },
};
export default meta;
type Story = StoryObj;

const GROUPS: { title: string; tokens: [string, string][] }[] = [
  {
    title: "Brand",
    tokens: [
      ["--kk-yellow", "O"],
      ["--kk-on-yellow", "O"],
      ["--kk-yellow-pressed", "M"],
      ["--kk-brown", "C"],
    ],
  },
  {
    title: "Chat room",
    tokens: [
      ["--kk-chat-bg", "S/D"],
      ["--kk-glass-bg", "S/D"],
      ["--kk-glass-border", "S/D"],
      ["--kk-chat-meta", "S/D"],
      ["--kk-chat-sender", "S/D"],
      ["--kk-chat-pill-bg", "C"],
      ["--kk-chat-pill-fg", "C"],
    ],
  },
  {
    title: "Bubbles",
    tokens: [
      ["--kk-bubble-outgoing", "O"],
      ["--kk-bubble-outgoing-fg", "T"],
      ["--kk-bubble-incoming", "S/D"],
      ["--kk-bubble-incoming-fg", "T"],
      ["--kk-unread", "D"],
    ],
  },
  {
    title: "Input bar",
    tokens: [
      ["--kk-input-bar-bg", "S/D"],
      ["--kk-input-border", "S/D"],
      ["--kk-input-button-bg", "S/D"],
      ["--kk-input-emoji-bg", "S/D"],
      ["--kk-input-icon", "S/D"],
      ["--kk-input-placeholder", "S/D"],
      ["--kk-send-bg", "O"],
    ],
  },
  {
    title: "Lists",
    tokens: [
      ["--kk-list-bg", "M"],
      ["--kk-list-title", "T"],
      ["--kk-list-description", "S"],
      ["--kk-list-meta", "S"],
      ["--kk-list-pressed", "T"],
      ["--kk-badge", "S"],
      ["--kk-divider", "T"],
    ],
  },
  {
    title: "Biz Message",
    tokens: [
      ["--kk-biz-band", "S"],
      ["--kk-biz-surface", "M"],
      ["--kk-biz-button-bg", "S"],
      ["--kk-biz-badge", "S"],
      ["--kk-biz-coupon-bg", "S"],
      ["--kk-biz-coupon-accent", "S"],
    ],
  },
];

const GRADE_STYLE: Record<string, string> = {
  O: "bg-emerald-100 text-emerald-800",
  T: "bg-sky-100 text-sky-800",
  C: "bg-amber-100 text-amber-800",
  M: "bg-rose-100 text-rose-800",
  D: "bg-violet-100 text-violet-800",
  S: "bg-teal-100 text-teal-800",
  "S/D": "bg-teal-100 text-teal-800",
};

export const Colors: Story = {
  render: () => (
    <div className="font-kk flex flex-col gap-6 text-kk-text-primary">
      {GROUPS.map((group) => (
        <section key={group.title}>
          <h2 className="mb-2 text-[13px] font-bold uppercase tracking-wide text-kk-text-secondary">{group.title}</h2>
          <div className="flex flex-col gap-1">
            {group.tokens.map(([name, grade]) => (
              <div key={name} className="flex items-center gap-3">
                <span
                  className="h-8 w-8 shrink-0 rounded-lg border border-kk-divider"
                  style={{ background: `var(${name})` }}
                />
                <code className="flex-1 text-[12px]">{name}</code>
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${GRADE_STYLE[grade]}`}>{grade}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
