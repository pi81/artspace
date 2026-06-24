import type { BlockHandlerProps } from "@frontkom/block-react-parser";
import { renderBlockWithClass } from "../lib/render-block-with-class";

export function ImageBlock({ block }: BlockHandlerProps) {
  return renderBlockWithClass(block, "wp-block-image");
}
