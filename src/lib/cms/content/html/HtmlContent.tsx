"use client";

import { htmlToReact } from "@/lib/cms/utils/html-to-react";
import DOMPurify from "isomorphic-dompurify";

function sanitizeHtml(html: string): string {
  if (!html) return "";

  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
}

type HtmlContentProps = {
  body: string;
};

export function HtmlContent({ body }: HtmlContentProps) {
  if (!body) return null;

  const sanitized = sanitizeHtml(body);
  if (!sanitized) return null;

  return htmlToReact(sanitized);
}
