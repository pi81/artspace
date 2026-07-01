import { createTextUIMessageStreamResponse } from "@/lib/ai/create-text-ui-message-stream-response";
import {
  convertToModelMessages,
  generateText,
  streamText,
  type LanguageModel,
  type UIMessage,
} from "ai";

export type LLMProvider = {
  streamChat(input: {
    system: string;
    messages: UIMessage[];
    signal?: AbortSignal;
  }): Promise<Response>;
};

export function createStreamingLlmProvider(model: LanguageModel): LLMProvider {
  return {
    async streamChat({ system, messages, signal }) {
      const result = streamText({
        model,
        system,
        messages: await convertToModelMessages(messages),
        abortSignal: signal,
      });

      return result.toUIMessageStreamResponse({ originalMessages: messages });
    },
  };
}

export function createBufferedLlmProvider(model: LanguageModel): LLMProvider {
  return {
    async streamChat({ system, messages, signal }) {
      const { text } = await generateText({
        model,
        system,
        messages: await convertToModelMessages(messages),
        abortSignal: signal,
      });

      return createTextUIMessageStreamResponse({
        text,
        originalMessages: messages,
        streaming: false,
      });
    },
  };
}
