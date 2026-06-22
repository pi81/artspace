import type { LLMProvider } from "./llm-provider";
import { llmProvider } from "./llm-provider";

let provider: LLMProvider | null = null;

export function getLlmProvider(): LLMProvider {
  if (!provider) provider = llmProvider;
  return provider;
}
