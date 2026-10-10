"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, HashIcon, PlusIcon, SmileIcon } from "./icons";
import "@/components/ui/kakao/styles/kakao.css";

interface MessageInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called with the trimmed text; uncontrolled inputs clear themselves afterwards. */
  onSend?: (text: string) => void;
  onAttach?: () => void;
  onEmoji?: () => void;
  /** The "#" button shown while the field is empty (KakaoTalk's in-chat search). */
  onHash?: () => void;
  /** Max visible lines before the field scrolls. */
  maxRows?: number;
}

const LINE_HEIGHT = 20;

const MessageInput = React.forwardRef<HTMLTextAreaElement, MessageInputProps>(
  (
    {
      className,
      value,
      defaultValue = "",
      onValueChange,
      onSend,
      onAttach,
      onEmoji,
      onHash,
      maxRows = 5,
      placeholder = "메시지 입력",
      disabled,
      ...props
    },
    ref
  ) => {
    const [inner, setInner] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const text = isControlled ? value : inner;
    const hasText = text.trim().length > 0;

    const localRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(ref, () => localRef.current as HTMLTextAreaElement);

    // Auto-grow up to maxRows, then scroll.
    React.useLayoutEffect(() => {
      const el = localRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, LINE_HEIGHT * maxRows + 16)}px`;
    }, [text, maxRows]);

    const update = (next: string) => {
      if (!isControlled) setInner(next);
      onValueChange?.(next);
    };

    const send = () => {
      if (!hasText || disabled) return;
      onSend?.(text.trim());
      update("");
    };

    return (
      <div
        className={cn(
          "font-kk flex w-full items-end gap-[8px] bg-kk-input-bar-bg px-[10px] py-[8px]",
          className
        )}
      >
        <button
          type="button"
          aria-label="첨부"
          onClick={onAttach}
          disabled={disabled}
          className="mb-[5px] flex h-[26px] w-[26px] shrink-0 items-center justify-center text-kk-input-icon outline-none hover:opacity-70 focus-visible:ring-2 focus-visible:ring-kk-yellow disabled:opacity-40"
        >
          <PlusIcon size={26} strokeWidth={1.6} />
        </button>

        <div className="flex min-w-0 flex-1 items-end rounded-[18px] bg-kk-input-field-bg pl-[14px] pr-[6px]">
          <textarea
            ref={localRef}
            rows={1}
            value={text}
            placeholder={placeholder}
            disabled={disabled}
            aria-label="메시지"
            onChange={(e) => update(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send();
              }
            }}
            className="min-h-[36px] flex-1 resize-none bg-transparent py-[8px] text-[15px] leading-[20px] text-kk-text-primary outline-none placeholder:text-kk-input-placeholder"
            {...props}
          />
          <button
            type="button"
            aria-label="이모티콘"
            onClick={onEmoji}
            disabled={disabled}
            className="mb-[6px] flex h-[24px] w-[24px] shrink-0 items-center justify-center text-kk-input-icon outline-none hover:opacity-70 focus-visible:ring-2 focus-visible:ring-kk-yellow disabled:opacity-40"
          >
            <SmileIcon size={22} strokeWidth={1.6} />
          </button>
        </div>

        {hasText ? (
          <button
            type="button"
            aria-label="전송"
            onClick={send}
            disabled={disabled}
            className="mb-[2px] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-kk-send-bg text-kk-send-fg outline-none transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-kk-gray-900"
          >
            <ArrowUpIcon size={18} strokeWidth={2.4} />
          </button>
        ) : (
          <button
            type="button"
            aria-label="샵검색"
            onClick={onHash}
            disabled={disabled}
            className="mb-[5px] flex h-[26px] w-[26px] shrink-0 items-center justify-center text-kk-input-icon outline-none hover:opacity-70 focus-visible:ring-2 focus-visible:ring-kk-yellow disabled:opacity-40"
          >
            <HashIcon size={22} strokeWidth={1.6} />
          </button>
        )}
      </div>
    );
  }
);
MessageInput.displayName = "MessageInput";

export { MessageInput, type MessageInputProps };
