/** Stable API. Used by ContentRetriever (Stage 4) and optional search. */
export function extractPlainText(html: string): string {
  if (!html) return "";
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
