import type { ChatModelId } from "./catalog";

export const activeModelId: ChatModelId = "gpt-5-nano";
// export const activeModelId: ChatModelId = "gemini-2.5-flash-lite";

export type ResponseMode = "stream" | "buffer";

export const responseMode: ResponseMode = "stream";
