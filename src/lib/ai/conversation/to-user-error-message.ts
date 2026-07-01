const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

/** Maps thrown/stream errors to text safe for UI and `DialogMessage.errorSummary`. */
export function toUserErrorMessage(error: Error): string {
  const message = error.message.trim();
  if (!message) return DEFAULT_ERROR_MESSAGE;

  // Avoid leaking raw provider JSON or stack traces in the UI layer.
  if (message.startsWith("{") || message.includes("\n    at ")) {
    return DEFAULT_ERROR_MESSAGE;
  }

  return message;
}
