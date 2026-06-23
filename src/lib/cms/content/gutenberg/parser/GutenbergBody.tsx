"use client";

import {
  customBlocks,
  customTags,
  parseBlocks,
  Provider,
  type FrontkomBlock,
  type FrontkomBlockHandler,
} from "@frontkom/block-react-parser";
import * as ReactNamespace from "react";
import { createElement } from "react";
import { blockHandlers } from "../registry/blocks";
import type { BlockHandler, BlockHandlerProps } from "../types/block-handler";

/** @frontkom/block-react-parser dist expects global React (legacy Babel output). */
const globalScope = globalThis as typeof globalThis & { React?: typeof ReactNamespace };

if (!globalScope.React) {
  globalScope.React = ReactNamespace;
}

type FrontkomBlockHostProps = BlockHandlerProps & {
  Handler: BlockHandler;
};

function FrontkomBlockHost({ Handler, ...props }: FrontkomBlockHostProps) {
  return <Handler {...props} />;
}

function mapInnerBlockToProps(block: FrontkomBlock): BlockHandlerProps {
  return {
    blockName: block.blockName ?? "unknown",
    attrs: (block.attrs ?? {}) as Record<string, unknown>,
    innerHtml: block.innerHTML ?? "",
    innerBlocks: block.innerBlocks.map(mapInnerBlockToProps),
  };
}

function mapBlockRegistryToFrontkomHandlers(
  handlers: Record<string, BlockHandler>,
): Record<string, FrontkomBlockHandler> {
  return Object.fromEntries(
    Object.entries(handlers).map(([blockName, Handler]) => [
      blockName,
      ({ block }) => {
        const props = mapInnerBlockToProps(block);

        return createElement(FrontkomBlockHost, {
          Handler,
          ...props,
          blockName: block.blockName ?? blockName,
        });
      },
    ]),
  );
}

const handlers = customBlocks(mapBlockRegistryToFrontkomHandlers(blockHandlers));
const tags = customTags();

type GutenbergBodyProps = {
  body: string;
};

export function GutenbergBody({ body }: GutenbergBodyProps) {
  const blocks = parseBlocks(body);

  return <Provider value={{ CustomBlocks: handlers, CustomTags: tags }}>{blocks}</Provider>;
}
