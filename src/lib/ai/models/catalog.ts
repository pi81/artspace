import { gatewayProvider, googleProvider } from "./providers";

export const CHAT_MODELS = {
  "gpt-5-nano": {
    provider: gatewayProvider,
    modelId: "openai/gpt-5-nano",
  },
  "gpt-5-mini": {
    provider: gatewayProvider,
    modelId: "openai/gpt-5-mini",
  },
  "claude-haiku-4.5": {
    provider: gatewayProvider,
    modelId: "anthropic/claude-haiku-4.5",
  },
  "gemini-2.5-flash-lite": {
    provider: googleProvider,
    modelId: "gemini-2.5-flash-lite",
  },
  "gemini-2.5-flash": {
    provider: googleProvider,
    modelId: "gemini-2.5-flash",
  },
} as const;

export type ChatModelId = keyof typeof CHAT_MODELS;
