import type { ContentParser } from "@/lib/plain-content/types";
import { createElement } from "react";
import { GutenbergBody } from "./GutenbergBody";

export const gutenbergParser: ContentParser = {
  render(body) {
    if (!body) return null;

    return createElement(GutenbergBody, { body });
  },
};

let parser: ContentParser | null = null;

export function getGutenbergParser(): ContentParser {
  if (!parser) parser = gutenbergParser;
  return parser;
}
