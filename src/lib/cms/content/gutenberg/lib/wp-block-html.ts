import { htmlToReact, parseHtmlDocument } from "@/lib/cms/utils/html-to-react";
import type { HTMLElement } from "node-html-parser";
import type { ReactElement } from "react";

export function getBlockRootElement(innerHtml: string): HTMLElement | null {
  const document = parseHtmlDocument(innerHtml.trim());
  if (!document) return null;

  return document.querySelector("*");
}

export function renderWpBlockHtml(innerHtml: string, blockClass: string): ReactElement {
  const target = getBlockRootElement(innerHtml);
  if (!target) {
    throw new Error(`renderWpBlockHtml: empty HTML for block "${blockClass}"`);
  }

  target.classList.add("wp-block");
  target.classList.add(blockClass);

  const reactElement = htmlToReact(target.toString());
  if (!reactElement) {
    throw new Error(`renderWpBlockHtml: failed to convert HTML for block "${blockClass}"`);
  }

  return reactElement as ReactElement;
}
