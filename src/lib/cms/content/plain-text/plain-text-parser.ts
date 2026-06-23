import { htmlToReact, parseHtmlDocument } from "@/lib/cms/utils/html-to-react";
import type { ContentParser } from "../types";

export const plainTextParser: ContentParser = {
  render(body) {
    const trimmed = body.trim();
    if (!trimmed) return null;

    const document = parseHtmlDocument(trimmed);
    if (!document) return null;

    const html =
      document.querySelector("*") === null
        ? trimmed.replace(/\r\n/g, "\n").replace(/\n/g, "<br>")
        : trimmed;

    return htmlToReact(html);
  },
};

let parser: ContentParser | null = null;

export function getPlainTextParser(): ContentParser {
  if (!parser) parser = plainTextParser;
  return parser;
}
