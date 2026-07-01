import { getMessageText } from "@/lib/ai/get-message-text";
import type { UIMessage } from "ai";
import type { DialogMessage, DialogMessageRole, DialogMessageStatus } from "./types";

type MapFromUiMessageInput = {
  message: UIMessage;
  conversationId: string;
  sequence: number;
  status?: DialogMessageStatus;
  errorSummary?: string;
};

export function mapUiMessageToDialogMessage({
  message,
  conversationId,
  sequence,
  status = "completed",
  errorSummary,
}: MapFromUiMessageInput): DialogMessage | null {
  if (message.role !== "user" && message.role !== "assistant") {
    return null;
  }

  const role: DialogMessageRole = message.role;
  const content = getMessageText(message);
  if (!content && status === "completed") return null;

  return {
    id: message.id,
    conversationId,
    sequence,
    role,
    content,
    status,
    errorSummary,
    createdAt: new Date().toISOString(),
  };
}
