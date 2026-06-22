/** Pass-through translator until i18n is wired. */
export function t(message: string, _values?: Record<string, string | number>): string {
  return message;
}
