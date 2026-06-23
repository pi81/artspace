import type { BlockHandlerProps } from "../types/block-handler";
import { renderWpBlockHtml } from "../wp-block-html";

export function ListBlock({ innerHtml }: BlockHandlerProps) {
  return renderWpBlockHtml(innerHtml, "wp-block-list");
}
