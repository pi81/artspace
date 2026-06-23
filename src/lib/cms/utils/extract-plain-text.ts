import { parse } from "node-html-parser";

/** Stable API. Used by ContentRetriever (Stage 4) and optional search. */
export function extractPlainText(html: string): string {
  if (!html) return "";

  const document = parse(html.trim(), { lowerCaseTagName: true });
  return document.textContent.replace(/\s+/g, " ").trim();
}
