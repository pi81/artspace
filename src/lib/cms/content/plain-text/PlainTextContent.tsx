"use client";

import { getPlainTextParser } from "./plain-text-parser";

type PlainTextContentProps = {
  body: string;
};

export function PlainTextContent({ body }: PlainTextContentProps) {
  if (!body) return null;

  return getPlainTextParser().render(body);
}
