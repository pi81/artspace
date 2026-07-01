import { getLlmProvider } from "@/lib/ai/get-llm-provider";
import { buildGallerySystemPrompt, galleryContentRetriever } from "@project/active";
import type { UIMessage } from "ai";

export const runtime = "nodejs";

type ChatRequestBody = {
  messages: UIMessage[];
};

export async function POST(request: Request) {
  const { messages } = (await request.json()) as ChatRequestBody;
  const context = await galleryContentRetriever.buildContext(request.signal);
  const system = buildGallerySystemPrompt(context);

  return getLlmProvider().streamChat({
    system,
    messages,
    signal: request.signal,
  });
}
