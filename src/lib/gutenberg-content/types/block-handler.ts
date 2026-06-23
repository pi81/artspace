import type { ComponentType } from "react";

export type BlockHandlerProps = {
  blockName: string;
  attrs: Record<string, unknown>;
  innerHtml: string;
  innerBlocks?: BlockHandlerProps[];
};

export type BlockHandler = ComponentType<BlockHandlerProps>;
