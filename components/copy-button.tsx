"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      aria-label="Copy install command"
      className="relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-page-border text-page-muted hover:bg-page-card-hover active:scale-95 transition-[background-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-page-fg after:absolute after:-inset-1.5 after:content-['']"
    >
      {copied ? <Check size={14} className="text-page-fg" /> : <Copy size={14} />}
    </button>
  );
}
