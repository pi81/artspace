"use client";

import { focusRingClass, transitionClass } from "@/components/ui/interactive";
import { recordChatTransportError } from "@/lib/ai/conversation/recorder";
import type { AssistantUiConfig } from "@/lib/ai/types";
import { useChat } from "@ai-sdk/react";
import { ChatAvatar } from "@assistant/components/ChatAvatar";
import { ChatBubbleIcon } from "@assistant/components/ChatBubbleIcon";
import { ChatComposer } from "@assistant/components/ChatComposer";
import { ChatMessages } from "@assistant/components/ChatMessages";
import clsx from "clsx";
import { useId, useState } from "react";

type ChatWidgetProps = {
  config: AssistantUiConfig;
};

export function ChatWidget({ config }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const errorItemId = useId();
  const {
    id: conversationId,
    messages,
    sendMessage,
    status,
    error,
    clearError,
  } = useChat({
    onError: (chatError) => {
      const lastUser = [...messages].reverse().find((message) => message.role === "user");
      recordChatTransportError({
        conversationId,
        error: chatError,
        relatedMessageId: lastUser?.id,
      });
    },
  });

  const isResponding = status === "submitted" || status === "streaming";

  const handleSend = (text: string) => {
    clearError();
    void sendMessage({ text });
  };

  return (
    <div className="fixed right-4 bottom-4 z-20 bg-white">
      {open ? (
        <section
          aria-label={config.title}
          className="bg-background flex h-160 w-96 flex-col rounded-xl border border-muted/40 shadow-xl"
        >
          <header className="flex items-center justify-between gap-2 border-b border-muted/40 p-3">
            <div className="flex items-center gap-2.5">
              <ChatAvatar label={config.avatarLabel} />
              <h2 className="m-0 text-sm leading-none font-medium">{config.title}</h2>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className={clsx(
                "hover:text-foreground rounded-md px-2 py-1 text-2xl leading-none text-muted",
                focusRingClass,
              )}
            >
              ×
            </button>
          </header>

          <ChatMessages
            messages={messages}
            status={status}
            error={error}
            errorItemId={errorItemId}
            welcomeMessage={config.welcomeMessage}
            suggestedPrompts={config.suggestedPrompts}
            avatarLabel={config.avatarLabel}
            onSelectPrompt={handleSend}
          />
          <ChatComposer
            disabled={isResponding}
            placeholder={config.inputPlaceholder}
            onSend={handleSend}
          />
        </section>
      ) : (
        <button
          type="button"
          aria-label={config.openButtonLabel}
          onClick={() => setOpen(true)}
          className={clsx(
            transitionClass,
            "bg-accent text-white shadow-lg hover:opacity-90 active:scale-[0.98] motion-reduce:active:scale-100",
            "inline-flex size-14 items-center justify-center rounded-full",
            focusRingClass,
          )}
        >
          <ChatBubbleIcon className="size-7" />
        </button>
      )}
    </div>
  );
}
