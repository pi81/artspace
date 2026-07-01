import { createMockLlmProvider } from "@/lib/ai/create-mock-llm-provider";
import { buildGalleryMockReply } from "./assistant-config";

export const galleryMockLlmProvider = createMockLlmProvider(buildGalleryMockReply);
