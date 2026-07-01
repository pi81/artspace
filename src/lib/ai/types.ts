export type ContentRetriever = {
  buildContext(signal: AbortSignal): Promise<string>;
};

export type AssistantUiConfig = {
  title: string;
  openButtonLabel: string;
  welcomeMessage: string;
  suggestedPrompts: readonly string[];
  inputPlaceholder: string;
  avatarLabel: string;
};
