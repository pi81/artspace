import type {
  ConversationEvent,
  ProviderErrorPayload,
  SystemPromptAppliedPayload,
  TransportErrorPayload,
} from "./types";

type CreateEventInput = {
  id: string;
  conversationId: string;
  sequence: number;
  relatedMessageId?: string;
  createdAt?: string;
};

export function createSystemPromptAppliedEvent(
  input: CreateEventInput & { data: SystemPromptAppliedPayload },
): ConversationEvent {
  return {
    id: input.id,
    conversationId: input.conversationId,
    sequence: input.sequence,
    type: "system_prompt_applied",
    relatedMessageId: input.relatedMessageId,
    createdAt: input.createdAt ?? new Date().toISOString(),
    payload: { type: "system_prompt_applied", data: input.data },
  };
}

export function createProviderErrorEvent(
  input: CreateEventInput & { data: ProviderErrorPayload },
): ConversationEvent {
  return {
    id: input.id,
    conversationId: input.conversationId,
    sequence: input.sequence,
    type: "provider_error",
    relatedMessageId: input.relatedMessageId,
    createdAt: input.createdAt ?? new Date().toISOString(),
    payload: { type: "provider_error", data: input.data },
  };
}

export function createTransportErrorEvent(
  input: CreateEventInput & { data: TransportErrorPayload },
): ConversationEvent {
  return {
    id: input.id,
    conversationId: input.conversationId,
    sequence: input.sequence,
    type: "transport_error",
    relatedMessageId: input.relatedMessageId,
    createdAt: input.createdAt ?? new Date().toISOString(),
    payload: { type: "transport_error", data: input.data },
  };
}
