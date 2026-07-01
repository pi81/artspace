import { getMessageText } from "@/lib/ai/get-message-text";
import type { ChatStatus, UIMessage } from "ai";
import { toUserErrorMessage } from "./to-user-error-message";
import type { DialogMessage } from "./types";

export type ChatTimelineItem =
  | { kind: "user"; id: string; text: string }
  | { kind: "assistant"; id: string; text: string }
  | { kind: "assistant_thinking" }
  | { kind: "error"; id: string; message: string };

type BuildChatTimelineFromUiInput = {
  messages: UIMessage[];
  status: ChatStatus;
  error?: Error;
  errorItemId: string;
};

export function buildChatTimelineFromUi({
  messages,
  status,
  error,
  errorItemId,
}: BuildChatTimelineFromUiInput): ChatTimelineItem[] {
  const items: ChatTimelineItem[] = [];

  for (const message of messages) {
    const text = getMessageText(message);
    if (!text) continue;

    if (message.role === "user") {
      items.push({ kind: "user", id: message.id, text });
      continue;
    }

    if (message.role === "assistant") {
      items.push({ kind: "assistant", id: message.id, text });
    }
  }

  const isResponding = status === "submitted" || status === "streaming";
  const lastItem = items.at(-1);

  if (isResponding && lastItem?.kind !== "assistant") {
    items.push({ kind: "assistant_thinking" });
  }

  if (error) {
    items.push({ kind: "error", id: errorItemId, message: toUserErrorMessage(error) });
  }

  return items;
}

/** Maps persisted dialog rows to the same timeline shape used by the live UI. */
export function buildChatTimelineFromDialog(messages: DialogMessage[]): ChatTimelineItem[] {
  const items: ChatTimelineItem[] = [];

  for (const message of messages) {
    if (message.role === "user") {
      items.push({ kind: "user", id: message.id, text: message.content });
      continue;
    }

    if (message.status === "failed" && message.errorSummary) {
      items.push({ kind: "error", id: message.id, message: message.errorSummary });
      continue;
    }

    if (message.content) {
      items.push({ kind: "assistant", id: message.id, text: message.content });
    }
  }

  return items;
}
