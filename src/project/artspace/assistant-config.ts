import type { AssistantUiConfig } from "@/lib/ai/types";

const galleryAssistantSystemPrompt =
  "You are the ArtSpace gallery assistant. Answer only from the provided gallery " +
  "context. If the answer is not in the context, say you don't have that information. " +
  "Be concise and friendly.";

export function buildGallerySystemPrompt(context: string): string {
  return `${galleryAssistantSystemPrompt}\n\nGALLERY CONTEXT:\n${context}`;
}

export const galleryAssistantUiConfig = {
  title: "Gallery assistant",
  openButtonLabel: "Ask the gallery",
  welcomeMessage:
    "Ask about artworks, artists, and exhibitions. I answer from the gallery catalogue only.",
  suggestedPrompts: [
    "What's on show right now?",
    "Show works from the 1990s.",
    "Who painted the oldest piece?",
  ],
  inputPlaceholder: "What's on show right now?",
  avatarLabel: "A",
} as const satisfies AssistantUiConfig;

export function buildGalleryMockReply(userText: string): string {
  return (
    `Demo assistant. You asked: "${userText}". ` +
    "I can help you explore artworks, artists, and exhibitions in the gallery."
  );
}
