"use client";

import { getGutenbergParser } from "./parser/gutenberg-parser";

type GutenbergContentProps = {
  body: string;
};

export function GutenbergContent({ body }: GutenbergContentProps) {
  if (!body) return null;

  return getGutenbergParser().render(body);
}
