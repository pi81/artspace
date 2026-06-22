declare module "@frontkom/block-react-parser" {
  import type { ComponentType, ReactNode } from "react";

  export type FrontkomBlock = {
    blockName: string | null;
    attrs: Record<string, unknown> | null;
    innerHTML: string;
    innerBlocks: FrontkomBlock[];
    innerContent: string[];
  };

  export type FrontkomBlockHandlerProps = {
    block: FrontkomBlock;
  };

  export type FrontkomBlockHandler = ComponentType<FrontkomBlockHandlerProps>;

  export type FrontkomTagHandlerProps = {
    attribs: Record<string, string>;
  };

  export type FrontkomProviderValue = {
    CustomBlocks?: Record<string, FrontkomBlockHandler>;
    CustomTags?: Record<string, ComponentType<FrontkomTagHandlerProps>>;
  };

  export const Provider: ComponentType<{
    value: FrontkomProviderValue;
    children: ReactNode;
  }>;

  export function customBlocks(
    blocks?: Record<string, FrontkomBlockHandler>,
  ): Record<string, FrontkomBlockHandler>;

  export function customTags(
    tags?: Record<string, ComponentType<FrontkomTagHandlerProps>>,
  ): Record<string, ComponentType<FrontkomTagHandlerProps>>;

  export function parseBlocks(html: string): ReactNode[];
}
