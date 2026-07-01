import { buildChatTimelineFromUi } from "@/lib/ai/conversation/build-chat-timeline";
import { ChatAssistantMessage } from "@assistant/components/ChatAssistantMessage";
import { ChatErrorMessage } from "@assistant/components/ChatErrorMessage";
import { ChatUserMessage } from "@assistant/components/ChatUserMessage";
import { ChatWelcome } from "@assistant/components/ChatWelcome";
import type { ChatStatus, UIMessage } from "ai";
import { useEffect, useRef } from "react";

type ChatMessagesProps = {
  messages: UIMessage[];
  status: ChatStatus;
  error?: Error;
  errorItemId: string;
  welcomeMessage: string;
  suggestedPrompts: readonly string[];
  avatarLabel: string;
  onSelectPrompt: (prompt: string) => void;
};

export function ChatMessages({
  messages,
  status,
  error,
  errorItemId,
  welcomeMessage,
  suggestedPrompts,
  avatarLabel,
  onSelectPrompt,
}: ChatMessagesProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const isResponding = status === "submitted" || status === "streaming";

  const timeline = buildChatTimelineFromUi({ messages, status, error, errorItemId });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    list.scrollTop = list.scrollHeight;
  }, [timeline, status]);

  return (
    <div className="flex-1 overflow-y-auto p-3">
      {messages.length === 0 && !error ? (
        <ChatWelcome
          welcomeMessage={welcomeMessage}
          suggestedPrompts={suggestedPrompts}
          onSelectPrompt={onSelectPrompt}
          disabled={isResponding}
        />
      ) : (
        <ul ref={listRef} className="space-y-3 text-sm">
          {timeline.map((item) => {
            if (item.kind === "user") {
              return <ChatUserMessage key={item.id} text={item.text} />;
            }

            if (item.kind === "assistant") {
              return (
                <ChatAssistantMessage key={item.id} avatarLabel={avatarLabel} text={item.text} />
              );
            }

            if (item.kind === "assistant_thinking") {
              return <ChatAssistantMessage key="thinking" avatarLabel={avatarLabel} thinking />;
            }

            return <ChatErrorMessage key={item.id} message={item.message} />;
          })}
        </ul>
      )}
    </div>
  );
}
