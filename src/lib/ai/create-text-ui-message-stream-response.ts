import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateId,
  type UIMessage,
} from "ai";

type CreateTextUIMessageStreamResponseInput = {
  text: string;
  originalMessages?: UIMessage[];
  streaming?: boolean;
};

export function createTextUIMessageStreamResponse({
  text,
  originalMessages,
  streaming = false,
}: CreateTextUIMessageStreamResponseInput): Response {
  const stream = createUIMessageStream({
    originalMessages,
    execute: ({ writer }) => {
      const textId = generateId();

      writer.write({ type: "start" });
      writer.write({ type: "text-start", id: textId });

      if (streaming) {
        const tokens = text.split(" ");

        for (let index = 0; index < tokens.length; index++) {
          const chunk = index === tokens.length - 1 ? tokens[index] : `${tokens[index]} `;
          writer.write({ type: "text-delta", id: textId, delta: chunk ?? "" });
        }
      } else {
        writer.write({ type: "text-delta", id: textId, delta: text });
      }

      writer.write({ type: "text-end", id: textId });
      writer.write({ type: "finish", finishReason: "stop" });
    },
  });

  return createUIMessageStreamResponse({ stream });
}
