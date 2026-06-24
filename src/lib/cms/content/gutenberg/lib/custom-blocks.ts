import { customBlocks } from "@frontkom/block-react-parser";
import { GalleryBlock } from "../blocks/GalleryBlock";
import { HeadingBlock } from "../blocks/HeadingBlock";
import { ImageBlock } from "../blocks/ImageBlock";
import { ListBlock } from "../blocks/ListBlock";
import { ParagraphBlock } from "../blocks/ParagraphBlock";
import { QuoteBlock } from "../blocks/QuoteBlock";

export const gutenbergBlocks = customBlocks({
  "core/paragraph": ParagraphBlock,
  "core/heading": HeadingBlock,
  "core/list": ListBlock,
  "core/image": ImageBlock,
  "core/gallery": GalleryBlock,
  "core/quote": QuoteBlock,
});
