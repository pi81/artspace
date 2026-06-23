import type { ContentParser } from "@/lib/plain-content/types";
import { createElement } from "react";
import { HtmlBody } from "./HtmlBody";
import { sanitizeHtml } from "./sanitize-html";

export const htmlContentParser: ContentParser = {
  render(body) {
    const sanitized = sanitizeHtml(body);
    if (!sanitized) return null;

    return createElement(HtmlBody, { html: sanitized });
  },
};

let parser: ContentParser | null = null;

export function getHtmlContentParser(): ContentParser {
  if (!parser) parser = htmlContentParser;
  return parser;
}
