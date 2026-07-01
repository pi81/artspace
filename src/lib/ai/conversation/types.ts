/** Dialog turns persisted for UI replay (table: messages). */
export type DialogMessageRole = "user" | "assistant";

export type DialogMessageStatus = "completed" | "failed";

export type DialogMessage = {
  id: string;
  conversationId: string;
  sequence: number;
  role: DialogMessageRole;
  content: string;
  status: DialogMessageStatus;
  /** User-safe summary when `status` is `failed`. */
  errorSummary?: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  tenantId: string;
  /** Reference to tenant prompt config — not the full prompt text per turn. */
  systemPromptVersion?: string;
  createdAt: string;
  updatedAt: string;
};

export type ConversationEventType = "system_prompt_applied" | "provider_error" | "transport_error";

export type SystemPromptAppliedPayload = {
  promptVersion?: string;
  contextByteLength?: number;
};

export type ProviderErrorPayload = {
  code?: string;
  message: string;
  provider?: string;
  modelId?: string;
};

export type TransportErrorPayload = {
  message: string;
  statusCode?: number;
};

export type ConversationEventPayload =
  | { type: "system_prompt_applied"; data: SystemPromptAppliedPayload }
  | { type: "provider_error"; data: ProviderErrorPayload }
  | { type: "transport_error"; data: TransportErrorPayload };

/** Operational / audit log (table: conversation_events). Not rendered as chat bubbles. */
export type ConversationEvent = {
  id: string;
  conversationId: string;
  sequence: number;
  type: ConversationEventType;
  relatedMessageId?: string;
  payload: ConversationEventPayload;
  createdAt: string;
};
