export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type LLMProvider = {
  streamChat(input: {
    system: string;
    messages: ChatMessage[];
    signal?: AbortSignal;
  }): Promise<ReadableStream<Uint8Array>>;
};

/** Mock LLM stream until the chat assistant ships. */
export const llmProvider: LLMProvider = {
  async streamChat({ messages }) {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const reply = `Demo assistant. You asked: "${lastUser?.content ?? ""}".`;

    return new ReadableStream<Uint8Array>({
      start(controller) {
        const encoder = new TextEncoder();
        const tokens = reply.split(" ");

        tokens.forEach((token, index) => {
          const chunk = index === tokens.length - 1 ? token : `${token} `;
          controller.enqueue(encoder.encode(chunk));
        });

        controller.close();
      },
    });
  },
};
