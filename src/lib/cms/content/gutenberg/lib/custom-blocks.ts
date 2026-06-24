import { customBlocks } from "@frontkom/block-react-parser";
import { HeadingBlock } from "../blocks/HeadingBlock";
import { ListBlock } from "../blocks/ListBlock";
import { ParagraphBlock } from "../blocks/ParagraphBlock";

export const gutenbergBlocks = customBlocks({
  "core/paragraph": ParagraphBlock,
  "core/heading": HeadingBlock,
  "core/list": ListBlock,
});
