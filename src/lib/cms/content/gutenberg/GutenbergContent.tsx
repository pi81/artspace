"use client";

import { parseBlocks, Provider } from "@frontkom/block-react-parser";
import * as React from "react";
import { gutenbergBlocks } from "./lib/custom-blocks";
import { gutenbergTags } from "./lib/custom-tags";

const scope = globalThis;
scope.React ??= React;

type GutenbergContentProps = {
  body: string;
};

export function GutenbergContent({ body }: GutenbergContentProps) {
  if (!body) return null;

  return (
    <Provider value={{ CustomBlocks: gutenbergBlocks, CustomTags: gutenbergTags }}>
      {parseBlocks(body)}
    </Provider>
  );
}
