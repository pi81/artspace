"use client";

import { htmlToReact, parseHtmlDocument } from "@/lib/cms/utils/html-to-react";

type PlainTextContentProps = {
  body: string;
};

export function PlainTextContent({ body }: PlainTextContentProps) {
  const trimmed = body.trim();
  if (!trimmed) return null;

  const document = parseHtmlDocument(trimmed);
  const html =
    document?.querySelector("*") === null
      ? trimmed.replace(/\r\n/g, "\n").replace(/\n/g, "<br>")
      : trimmed;

  return htmlToReact(html);
}
