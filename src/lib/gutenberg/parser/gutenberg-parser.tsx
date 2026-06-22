"use client";

import {
  customBlocks,
  customTags,
  parseBlocks,
  Provider,
} from "@frontkom/block-react-parser";
import { ReactNode } from "react";
import { blockHandlers } from "../registry/blocks";
import "./install-frontkom-react-global";
import { mapBlockRegistryToFrontkomHandlers } from "./map-block-registry-to-frontkom";

const handlers = customBlocks(
  mapBlockRegistryToFrontkomHandlers(blockHandlers),
);
const tags = customTags();

type GutenbergParser = {
  render(html: string): ReactNode;
};

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
