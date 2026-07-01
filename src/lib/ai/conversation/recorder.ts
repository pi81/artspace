import { generateId } from "ai";
import { createTransportErrorEvent } from "./create-conversation-event";
import { toUserErrorMessage } from "./to-user-error-message";
import type { ConversationEvent, DialogMessage } from "./types";

export type ConversationRecorder = {
  recordDialogMessage(message: DialogMessage): void | Promise<void>;
  recordEvent(event: ConversationEvent): void | Promise<void>;
};

export const noopConversationRecorder: ConversationRecorder = {
  recordDialogMessage() {},
  recordEvent() {},
};

let recorder: ConversationRecorder = noopConversationRecorder;
let sequence = 0;

export function getConversationRecorder(): ConversationRecorder {
  return recorder;
}

export function setConversationRecorder(next: ConversationRecorder): void {
  recorder = next;
  sequence = 0;
}

type RecordChatErrorInput = {
  conversationId: string;
  error: Error;
  relatedMessageId?: string;
};

/** Client-side hook for `useChat.onError` — ready for a DB-backed recorder later. */
export function recordChatTransportError({
  conversationId,
  error,
  relatedMessageId,
}: RecordChatErrorInput): void {
  const event = createTransportErrorEvent({
    id: generateId(),
    conversationId,
    sequence: sequence++,
    relatedMessageId,
    data: {
      message: toUserErrorMessage(error),
    },
  });

  void recorder.recordEvent(event);
}
