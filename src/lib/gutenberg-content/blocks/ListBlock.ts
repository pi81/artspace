import type { BlockHandlerProps } from "../types/block-handler";
import { renderWpBlockHtml } from "../utils/wp-block-html";

export function ListBlock({ innerHtml }: BlockHandlerProps) {
  return renderWpBlockHtml(innerHtml, "wp-block-list");
}
