import type { BlockHandlerProps } from "../types/block-handler";
import { renderWpBlockHtml } from "../utils/wp-block-html";

export function HeadingBlock({ innerHtml }: BlockHandlerProps) {
  return renderWpBlockHtml(innerHtml, "wp-block-heading");
}
