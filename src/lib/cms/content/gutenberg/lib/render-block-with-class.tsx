import { Block, type ParsedBlock } from "@frontkom/block-react-parser";
import { createElement, type ReactElement } from "react";
import { getBlockRootElement, renderWpBlockHtml } from "./wp-block-html";

export function renderBlockWithClass(block: ParsedBlock, blockClass: string): ReactElement {
  if (!block.innerBlocks.length) {
    return renderWpBlockHtml(block.innerHTML, blockClass);
  }

  const root = getBlockRootElement(block.innerHTML);
  if (!root) {
    return renderWpBlockHtml(block.innerHTML, blockClass);
  }

  root.classList.add("wp-block");
  root.classList.add(blockClass);

  return createElement(
    root.tagName.toLowerCase(),
    { className: root.getAttribute("class") ?? undefined },
    block.innerBlocks.map((inner, index) => createElement(Block, { block: inner, key: index })),
  ) as ReactElement;
}
