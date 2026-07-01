import { getMessageText } from "@/lib/ai/get-message-text";
import type { UIMessage } from "ai";

export function getLastUserText(messages: UIMessage[]): string {
  const lastUser = [...messages].reverse().find((message) => message.role === "user");
  if (!lastUser) return "";

  return getMessageText(lastUser);
}
