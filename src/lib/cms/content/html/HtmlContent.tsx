"use client";

import { getHtmlContentParser } from "./html-content-parser";

type HtmlContentProps = {
  body: string;
};

export function HtmlContent({ body }: HtmlContentProps) {
  if (!body) return null;

  return getHtmlContentParser().render(body);
}
