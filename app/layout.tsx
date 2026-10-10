import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/brand";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Katok UI — KakaoTalk (카카오톡) UI components for shadcn/ui";
const DESCRIPTION =
  "Unofficial Kakao / KakaoTalk (카카오톡) mobile UI components for React — chat bubbles, chat list, message input, and Kakao AlimTalk (알림톡) / Brand Message (브랜드메시지) previews. Tailwind CSS v4, light and dark mode.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "kakao ui",
    "kakaotalk ui",
    "카카오 ui",
    "카톡 ui",
    "katok-ui",
    "카카오톡 ui",
    "알림톡 미리보기",
    "alimtalk preview",
    "브랜드메시지",
    "kakao chat ui react",
    "shadcn registry",
    "react chat ui",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Katok UI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Runs before first paint so a saved theme never flashes. Kept in sync with
// the class/attribute pair ThemeToggle writes. Defaults to dark.
const themeBootScript = `try{var t=localStorage.getItem("theme");var d=t!=="light";var r=document.documentElement;r.classList.toggle("dark",d);r.setAttribute("data-theme",d?"dark":"light")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${mono.variable} dark h-full antialiased`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        {children}
      </body>
    </html>
  );
}
