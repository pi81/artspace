import type { ContentParser } from "@/lib/cms/content/types";
import { htmlToReact } from "@/lib/cms/utils/html-to-react";
import { sanitizeHtml } from "./sanitize-html";

export const htmlContentParser: ContentParser = {
  render(body) {
    const sanitized = sanitizeHtml(body);
    if (!sanitized) return null;

    return htmlToReact(sanitized);
  },
};

let parser: ContentParser | null = null;

export function getHtmlContentParser(): ContentParser {
  if (!parser) parser = htmlContentParser;
  return parser;
}
