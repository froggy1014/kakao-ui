# Kakao UI — Design System

Reconstructed tokens for **KakaoTalk iOS 26.x** (after the 25.11.0 rollback of the
friends-tab feed). No official KakaoTalk design system is published, so every value
is graded by evidence. Replace **C** and **M** values as device measurements come in.

| Grade | Meaning | Source |
|---|---|---|
| **O** | Official | [Kakao Login design guide](https://developers.kakao.com/docs/latest/ko/kakaologin/design-guide) |
| **T** | Official theme-creation spec | KakaoTalk user theme guide (Android 26.1.0 PDF) and sample iOS theme CSS (25.8.0) |
| **C** | Clone approximation | Public KakaoTalk clones (majority value) |
| **D** | Measured on device | KakaoTalk iOS, iPhone @3x capture (dark mode), 2026-10 |
| **M** | Pending on-device measurement | Placeholder |

All tokens live in [`components/ui/kakao/styles/kakao.css`](./components/ui/kakao/styles/kakao.css)
as `--kk-*` variables, exposed to Tailwind as `bg-kk-*`, `text-kk-*`.

---

## Color

### Brand
| Token | Light | Grade | Note |
|---|---|---|---|
| `--kk-yellow` | `#FEE500` | O | Kakao Login container color |
| `--kk-on-yellow` | `#000` @ 85% | O | Login label |
| `--kk-brown` | `#3C1E1E` | C | |

### Chat room (`BackgroundStyle-ChatRoom`)
| Token | Light | Dark | Grade |
|---|---|---|---|
| `--kk-chat-bg` | `#B2C7D9` | `#080808` | C / D |
| `--kk-chat-pill-bg` | `rgba(0,0,0,.15)` | `rgba(255,255,255,.12)` | C |
| `--kk-chat-meta` (time) | `rgba(0,0,0,.45)` | `#9C9C9C` | M / D |
| `--kk-chat-sender` (name) | `rgba(0,0,0,.72)` | `#CFCFCF` | M / D |

Clone values for the chat background vary: `#B2C7D9` (majority), `#B2C7DA`, `#BACEE0`, `#9BBBD4`.

### Bubbles (`MessageCellStyle-Send` / `-Receive`)
| Token | Light | Dark | Grade |
|---|---|---|---|
| `--kk-bubble-outgoing` | `#FEE500` | `#FEE500` | O / C |
| `--kk-bubble-incoming` | `#FFFFFF` | `#282828` | C / D |
| `--kk-bubble-*-fg` | `#191919` | `#191919` / `#F2F2F2` | T / D |
| `--kk-unread` | `#FEE500` | `#FEE500` | C / D (theme slot `-ios-unread-text-color`) |

### Lists (`MainViewStyle-Primary`)
| Token | Light | Grade |
|---|---|---|
| `--kk-list-title` | `#191919` | T |
| `--kk-list-pressed` | `rgba(0,0,0,.05)` | T |
| `--kk-divider` | `rgba(0,0,0,.09)` | T |
| `--kk-badge` | `#FF5A3C` | M |

### Biz Message
`--kk-biz-band` (AlimTalk "알림톡 도착" band), `--kk-biz-button-bg`, `--kk-biz-coupon-*` — all **M**.
No public document specifies how Biz Messages render; values come from screenshots.

---

## Shape & size

| Token | Value | Grade | Note |
|---|---|---|---|
| Bubble tail | first bubble of a group only | T | Theme spec ships separate "first" / "following" 9-slice images |
| Tail shape | "ear" outside the rounded corner: tip 2px past the edge at y≈0.8, scooped notch to (4, 3.6) | D | Traced from device; path in `chat-bubble.tsx` |
| Bubble text padding | `10 11 7 17` send / `10 17 7 11` receive (incl. tail side) | T | Implemented as `8px 11px` + drawn tail |
| `--kk-radius-bubble` | `13px` | D | All four corners, including the tail corner |
| `--kk-radius-avatar` | `40%` squircle | C | |
| `--kk-avatar-chat` / `-list` | `34px` / `48px` | D / C | |
| `--kk-text-message` | `16px` / line `21px` | D | Default font-size setting; 1-line bubble is 35px tall |
| `--kk-text-meta` | `10px` | C | |
| `--kk-header-height` | `52px` | C | |
| `--kk-msg-max-width` | `min(70%, 264px)` | C | |

## Typography

System stack: `-apple-system`, `Apple SD Gothic Neo`, then Pretendard / Noto Sans KR.
Kakao's own fonts (카카오 큰글씨 / 작은글씨, OFL, June 2025) can be swapped in via
`--kk-font-family`; they are not bundled and not confirmed as the app UI font.

## Biz Message rules encoded

- AlimTalk: `messageType` BA / EX / AD / MI; `emphasizeType` NONE / TEXT / IMAGE / ITEM_LIST;
  AD and MI pin a "채널 추가" button first and show the fixed channel-add notice.
- Brand Message: only WL / AL / AC buttons; TEXT and IMAGE stack up to 5, WIDE and
  CAROUSEL place up to 2 side by side with 8-char names; coupon titles use five formats.
- Limits: [`lib/biz-limits.ts`](./lib/biz-limits.ts) — sources: NHN Cloud AlimTalk API v2.3,
  Kakao Business content guide, Ncloud SENS, Solapi (checked 2026-10-11).

## Principles

1. **Evidence over guesswork** — every token is graded; unknowns are marked, not invented.
2. **Theme-slot names** — tokens map to KakaoTalk theme slots.
3. **API-shaped props** — Biz Message props use the field names and codes senders already have.
4. **Light + dark** for every token.
5. **No trademarks** — no Kakao logo, characters, or fonts.
