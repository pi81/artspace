"use client";

import {
  customBlocks,
  customTags,
  parseBlocks,
  Provider,
} from "@frontkom/block-react-parser";
import { blockHandlers } from "../registry/blocks";
import "./install-frontkom-react-global";
import { mapBlockRegistryToFrontkomHandlers } from "./map-block-registry-to-frontkom";
import type { GutenbergParser } from "./types";

const handlers = customBlocks(
  mapBlockRegistryToFrontkomHandlers(blockHandlers),
);
const tags = customTags();

export const gutenbergParser: GutenbergParser = {
  render(html) {
    const blocks = parseBlocks(html);

    return (
      <Provider value={{ CustomBlocks: handlers, CustomTags: tags }}>
        {blocks}
      </Provider>
    );
  },
};

let parser: GutenbergParser | null = null;

export function getGutenbergParser(): GutenbergParser {
  if (!parser) parser = gutenbergParser;
  return parser;
}
