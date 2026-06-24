declare module "@frontkom/block-react-parser" {
  import type { ComponentType, ReactNode } from "react";

  export type ParsedBlock = {
    blockName: string | null;
    attrs: Record<string, unknown> | null;
    innerHTML: string;
    innerBlocks: ParsedBlock[];
    innerContent: (string | null)[];
  };

  export type BlockHandlerProps = {
    block: ParsedBlock;
  };

  export type BlockHandler = ComponentType<BlockHandlerProps>;

  export type TagHandlerProps = {
    attribs: Record<string, string>;
  };

  export type ParserProviderValue = {
    CustomBlocks?: Record<string, BlockHandler>;
    CustomTags?: Record<string, ComponentType<TagHandlerProps>>;
  };

  export const Provider: ComponentType<{
    value: ParserProviderValue;
    children: ReactNode;
  }>;

  export function customBlocks(blocks?: Record<string, BlockHandler>): Record<string, BlockHandler>;

  export function customTags(
    tags?: Record<string, ComponentType<TagHandlerProps>>,
  ): Record<string, ComponentType<TagHandlerProps>>;

  export function parseBlocks(html: string): ReactNode[];

  export const Block: ComponentType<BlockHandlerProps>;
}
