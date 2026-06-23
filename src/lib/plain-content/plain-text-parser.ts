import { createElement } from "react";
import { PlainTextBody } from "./PlainTextBody";
import type { ContentParser } from "./types";

const HTML_TAG_PATTERN = /<[a-z][\s\S]*>/i;

function normalizePlainBody(body: string): string {
  if (!body) return "";

  const trimmed = body.trim();
  if (!HTML_TAG_PATTERN.test(trimmed)) return trimmed;

  return trimmed
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const plainTextParser: ContentParser = {
  render(body) {
    const text = normalizePlainBody(body);
    if (!text) return null;

    return createElement(PlainTextBody, { text });
  },
};

let parser: ContentParser | null = null;

export function getPlainTextParser(): ContentParser {
  if (!parser) parser = plainTextParser;
  return parser;
}
