import { google } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

export type ModelProvider = {
  requiredEnv: string;
  isConfigured: () => boolean;
  createModel: (modelId: string) => LanguageModel;
};

export const gatewayProvider: ModelProvider = {
  requiredEnv: "AI_GATEWAY_API_KEY",
  isConfigured: () => Boolean(process.env.AI_GATEWAY_API_KEY),
  createModel: (modelId) => modelId,
};

export const googleProvider: ModelProvider = {
  requiredEnv: "GOOGLE_GENERATIVE_AI_API_KEY",
  isConfigured: () => Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY),
  createModel: (modelId) => google(modelId),
};
