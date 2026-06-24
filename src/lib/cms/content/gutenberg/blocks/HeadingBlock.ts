import type { BlockHandlerProps } from "@frontkom/block-react-parser";
import { renderBlockWithClass } from "../lib/render-block-with-class";

export function HeadingBlock({ block }: BlockHandlerProps) {
  return renderBlockWithClass(block, "wp-block-heading");
}
