# kakao-ui — Design Spec

Date: 2026-10-11 · Status: approved (user directive via /goal)

## Goal

Open-source, **unofficial** shadcn/ui registry + Storybook of KakaoTalk mobile (iOS) UI
components, mirroring the structure of [`wa-ui`](https://github.com/froggy1014/wa-ui).
Purpose: OSS/portfolio. Demo domain: `https://kakao-ui.jeongmin.dev` (placeholder; may change).

Prior-art research (2026-10-11): no published KakaoTalk UI component library and no
reusable AlimTalk / Brand Message preview library exists. Teams rebuild
`AlimtalkPreview` ad hoc — that is the gap.

## Scope (v0.1)

- **A. Chat basics:** `chat-bubble`, `message-group`, `profile-avatar`, `chat-header`,
  `message-input`, `date-separator`, `system-message`, `chat-list-item`, `chat-room` (layout shell).
- **C. Kakao Biz Message:** `alimtalk-bubble`, `brand-message-bubble`, `biz-button`, `biz-limits` (lib).
- Deferred to v0.2: media bubbles (image grid, file, voice, emoticon), reactions,
  reply quote, typing indicator; brand message `WIDE_ITEM_LIST`, `COMMERCE`,
  `CAROUSEL_COMMERCE`, `PREMIUM_VIDEO`; PC KakaoTalk layout.

Reference version: KakaoTalk iOS 26.x (post 25.11.0 rollback of the friends-tab feed).

## Architecture

Same as wa-ui: Next.js 16 static export, Tailwind v4, `@base-ui/react`, shadcn registry
(`registry.json` → `/r/{name}.json` route), Storybook 10 (a11y, docs, vitest addons),
Docker → nginx → GHCR → k3s infra repo image bump.

```
components/ui/kakao/*.tsx              components
components/ui/kakao/styles/kakao.css   tokens (single source of truth)
lib/biz-limits.ts                      AlimTalk / Brand Message length limits + helpers
stories/kakao/*.stories.tsx
app/                                   landing + /r/* registry routes
```

## Tokens

`--kk-*` CSS vars, exposed to Tailwind as `--color-kk-*` via `@theme inline`; light + dark.
Token names follow the official KakaoTalk **theme slots** (chat room background,
send/receive bubble text, unread count, input bar, list title/description) so the
library is "theme-compatible". Each value is tagged in `DESIGN.md` with its evidence grade:

- **O** official (developers.kakao.com: `#FEE500`, label `#000` 85%, radius 12px)
- **T** official theme-creation spec (bubble 9-slice: first bubble has tail, follow-ups
  don't; text padding send `10 11 7 17`, receive `10 17 7 11`)
- **C** clone approximation (chat bg `#B2C7D9` majority, etc.)
- **M** to be measured on device (dark mode, unread badge red, AlimTalk header band, pt sizes)

Font: system stack (SF Pro / Apple SD Gothic Neo). Kakao fonts (OFL) are optional,
never bundled. Icons: inline SVG `currentColor`, downloaded/redrawn into repo — no CDN
PNGs, no Kakao logo / Kakao Friends characters.

## Component API (summary)

- `ChatBubble` — `variant: incoming|outgoing`, `showTail`, `timestamp`, `unreadCount`, `edited`.
- `MessageGroup` — `variant`, `sender {name, avatar}`; avatar+name on first, tail on first,
  timestamp/unread on last bubble only (children may override).
- `ProfileAvatar` — `src`, `name`, `size: xs|sm|md|lg`; squircle; default silhouette.
- `ChatHeader` — `title`, `memberCount`, `onBack`, `actions`.
- `MessageInput` — controlled/uncontrolled, `onSend`, plus/emoji/`#` buttons, yellow send when non-empty, autosize.
- `DateSeparator`, `SystemMessage`.
- `ChatListItem` — `avatar`, `name`, `memberCount`, `lastMessage`, `timestamp`, `unreadCount`, `muted`, `pinned`, `render`.
- `AlimtalkBubble` — mirrors API fields: `messageType BA|EX|AD|MI`,
  `emphasizeType NONE|TEXT|IMAGE|ITEM_LIST`, `title`, `subtitle`, `image`, `itemList`,
  `content`, `extra`, `adText`, `buttons` (≤5, codes WL AL DS BK MD BC BT AC BF TN P1-3),
  `quickReplies`, `headerLabel`, `limits`. The channel profile comes from the wrapping `MessageGroup`.
- `BrandMessageBubble` — `chatBubbleType TEXT|IMAGE|WIDE|CAROUSEL_FEED`, `isAd`,
  `content`, `image`, `header`, `carousel`, `coupon`, `buttons` (WL AL AC; vertical for
  TEXT/IMAGE, max 2 horizontal for WIDE/CAROUSEL), `limits`.
- `BizButton` — `type`, `name`, `render`.

Length limits are **configurable** (`limits` prop, defaults in `lib/biz-limits.ts`)
because sources disagree (AlimTalk body 1000 vs 1300). Over-limit text is truncated
visually with ellipsis and warned in dev (`console.warn`).

## Testing

- Unit (vitest, node): `lib/biz-limits.ts` — limits, truncation, coupon title format.
- Stories (vitest + playwright via Storybook addon): every story renders without errors.
- Visual fidelity: `Reference` stories for side-by-side comparison with device captures.

## Legal

README + footer: "Unofficial. Not affiliated with or endorsed by Kakao Corp."
No Kakao logo, characters, or font files. MIT.

## Open items

- Device captures (light/dark) to replace grade **C/M** values.
- Final domain + k3s manifest path.
