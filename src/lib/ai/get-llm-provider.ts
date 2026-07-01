import { activeModelId, responseMode } from "@/lib/ai/models/active-model";
import { CHAT_MODELS } from "@/lib/ai/models/catalog";
import { galleryMockLlmProvider } from "@tenant/mock-llm";
import {
  createBufferedLlmProvider,
  createStreamingLlmProvider,
  type LLMProvider,
} from "./llm-provider";

let provider: LLMProvider | null = null;

const providerFactories = {
  stream: createStreamingLlmProvider,
  buffer: createBufferedLlmProvider,
} as const;

export function getLlmProvider(): LLMProvider {
  if (!provider) {
    const entry = CHAT_MODELS[activeModelId];

    if (!entry.provider.isConfigured()) {
      provider = galleryMockLlmProvider;
    } else {
      const model = entry.provider.createModel(entry.modelId);
      provider = providerFactories[responseMode](model);
    }
  }

  return provider;
}
