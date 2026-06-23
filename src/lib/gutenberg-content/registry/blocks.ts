import { HeadingBlock } from "../blocks/HeadingBlock";
import { ListBlock } from "../blocks/ListBlock";
import { ParagraphBlock } from "../blocks/ParagraphBlock";
import type { BlockHandler } from "../types/block-handler";

export const blockHandlers: Record<string, BlockHandler> = {
  "core/paragraph": ParagraphBlock,
  "core/heading": HeadingBlock,
  "core/list": ListBlock,
};
