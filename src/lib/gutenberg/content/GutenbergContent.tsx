"use client";

import { getGutenbergParser } from "../parser/gutenberg-parser";

type GutenbergContentProps = {
  html: string;
};

export function GutenbergContent({ html }: GutenbergContentProps) {
  if (!html) return null;

  const parser = getGutenbergParser();

  return <div className="gutenberg-content space-y-4">{parser.render(html)}</div>;
}
