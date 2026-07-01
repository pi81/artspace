import { createTextUIMessageStreamResponse } from "@/lib/ai/create-text-ui-message-stream-response";
import { getLastUserText } from "@/lib/ai/get-last-user-text";
import type { LLMProvider } from "@/lib/ai/llm-provider";

export function createMockLlmProvider(buildReply: (userText: string) => string): LLMProvider {
  return {
    async streamChat({ messages }) {
      const userText = getLastUserText(messages);
      const reply = buildReply(userText);

      return createTextUIMessageStreamResponse({
        text: reply,
        originalMessages: messages,
        streaming: true,
      });
    },
  };
}
