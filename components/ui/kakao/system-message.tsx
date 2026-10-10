import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/kakao/styles/kakao.css";

interface SystemMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional trailing action, e.g. "초대 거부" link in a group invite notice. */
  action?: React.ReactNode;
}

/** Centered notice: joins, leaves, invites, deleted messages. */
const SystemMessage = React.forwardRef<HTMLDivElement, SystemMessageProps>(
  ({ className, action, children, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={cn("font-kk flex w-full justify-center py-[6px]", className)}
      {...props}
    >
      <span className="max-w-[85%] rounded-[12px] bg-kk-chat-pill-bg px-[12px] py-[5px] text-center text-[length:var(--kk-text-pill)] leading-[1.45] text-kk-chat-pill-fg">
        {children}
        {action && <span className="ml-[6px] font-semibold underline underline-offset-2">{action}</span>}
      </span>
    </div>
  )
);
SystemMessage.displayName = "SystemMessage";

export { SystemMessage, type SystemMessageProps };
