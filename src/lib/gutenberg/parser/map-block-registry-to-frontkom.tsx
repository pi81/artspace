import type { FrontkomBlock, FrontkomBlockHandler } from "@frontkom/block-react-parser";
import type { BlockHandler, BlockHandlerProps } from "../types/block-handler";

function mapInnerBlockToProps(block: FrontkomBlock): BlockHandlerProps {
  return {
    blockName: block.blockName ?? "unknown",
    attrs: (block.attrs ?? {}) as Record<string, unknown>,
    innerHtml: block.innerHTML ?? "",
    innerBlocks: block.innerBlocks.map(mapInnerBlockToProps),
  };
}

export function mapBlockRegistryToFrontkomHandlers(
  handlers: Record<string, BlockHandler>,
): Record<string, FrontkomBlockHandler> {
  return Object.fromEntries(
    Object.entries(handlers).map(([blockName, Handler]) => [
      blockName,
      ({ block }) => (
        <Handler
          blockName={block.blockName ?? blockName}
          attrs={(block.attrs ?? {}) as Record<string, unknown>}
          innerHtml={block.innerHTML ?? ""}
          innerBlocks={block.innerBlocks.map(mapInnerBlockToProps)}
        />
      ),
    ]),
  );
}
