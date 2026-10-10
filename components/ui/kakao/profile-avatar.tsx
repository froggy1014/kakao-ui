import * as React from "react";
import { cn } from "@/lib/utils";
import { SilhouetteIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

const SIZES = {
  xs: 24,
  sm: 32,
  md: 38, // chat room
  lg: 48, // chat / friends list
  xl: 72, // profile card
} as const;

type AvatarSize = keyof typeof SIZES;

interface ProfileAvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Image URL, or several URLs for a group-chat composite (up to 4 are shown). */
  src?: string | (string | undefined)[];
  /** Used for alt text. */
  name?: string;
  size?: AvatarSize | number;
}

/** One squircle tile: the image, or the default silhouette when missing. */
function Tile({ src, alt, px }: { src?: string; alt: string; px: number }) {
  return (
    <span
      className="flex h-full w-full items-end justify-center overflow-hidden bg-kk-avatar-bg text-kk-avatar-fg"
      style={{ borderRadius: "var(--kk-radius-avatar)" }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <SilhouetteIcon size={Math.round(px * 0.82)} />
      )}
    </span>
  );
}

/** Tile positions for 2–4 member composites, as fractions of the avatar box. */
const LAYOUTS: Record<number, { x: number; y: number; s: number }[]> = {
  2: [
    { x: 0, y: 0, s: 0.6 },
    { x: 0.4, y: 0.4, s: 0.6 },
  ],
  3: [
    { x: 0.25, y: 0, s: 0.5 },
    { x: 0, y: 0.5, s: 0.5 },
    { x: 0.5, y: 0.5, s: 0.5 },
  ],
  4: [
    { x: 0, y: 0, s: 0.5 },
    { x: 0.5, y: 0, s: 0.5 },
    { x: 0, y: 0.5, s: 0.5 },
    { x: 0.5, y: 0.5, s: 0.5 },
  ],
};

const ProfileAvatar = React.forwardRef<HTMLSpanElement, ProfileAvatarProps>(
  ({ className, src, name = "", size = "md", style, ...props }, ref) => {
    const px = typeof size === "number" ? size : SIZES[size];
    const sources = Array.isArray(src) ? src.slice(0, 4) : [src];
    const layout = LAYOUTS[sources.length];

    return (
      <span
        ref={ref}
        role="img"
        aria-label={name ? `${name} 프로필` : "프로필"}
        className={cn("relative inline-block shrink-0", className)}
        style={{ width: px, height: px, ...style }}
        {...props}
      >
        {layout ? (
          sources.map((s, i) => {
            const p = layout[i];
            return (
              <span
                key={i}
                className="absolute"
                style={{
                  left: p.x * px,
                  top: p.y * px,
                  width: p.s * px - 1,
                  height: p.s * px - 1,
                }}
              >
                <Tile src={s} alt="" px={p.s * px} />
              </span>
            );
          })
        ) : (
          <Tile src={sources[0]} alt="" px={px} />
        )}
      </span>
    );
  }
);
ProfileAvatar.displayName = "ProfileAvatar";

export { ProfileAvatar, type ProfileAvatarProps, type AvatarSize };
