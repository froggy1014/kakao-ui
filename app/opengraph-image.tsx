import { ImageResponse } from "next/og";
import { BRAND, logoDataUri } from "@/lib/brand";
import { getRegistryItems } from "@/lib/registry";

// Required by `output: "export"` — generated image routes must be prerendered.
export const dynamic = "force-static";

export const alt = "Katok UI — unofficial KakaoTalk UI components for shadcn/ui";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const count = getRegistryItems().length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: BRAND.bg,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: BRAND.accent,
            }}
          >
            <img src={logoDataUri({ size: 40 })} width={40} height={40} alt="" />
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: BRAND.fg }}>Katok UI</div>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              marginLeft: 6,
              borderRadius: 999,
              border: `1px solid ${BRAND.accent}55`,
              color: BRAND.accent,
              fontSize: 22,
            }}
          >
            {count} components · unofficial
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: BRAND.fg }}>
            KakaoTalk UI components
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: BRAND.accent }}>
            for shadcn/ui
          </div>
          <div style={{ marginTop: 26, fontSize: 30, color: BRAND.muted, lineHeight: 1.4 }}>
            Chat bubbles, chat list, AlimTalk and Brand Message previews.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "18px 26px",
            borderRadius: 14,
            border: `1px solid ${BRAND.accent}33`,
            background: "rgba(255,255,255,0.06)",
            color: BRAND.accent,
            fontSize: 24,
          }}
        >
          npx shadcn@latest add katok-ui.jeongmin.dev/r/alimtalk-bubble.json
        </div>
      </div>
    ),
    { ...size },
  );
}
