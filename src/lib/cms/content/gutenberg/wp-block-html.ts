import { htmlToReact, parseHtmlDocument } from "@/lib/cms/utils/html-to-react";
import type { ReactElement } from "react";

export function renderWpBlockHtml(innerHtml: string, blockClass: string): ReactElement {
  const document = parseHtmlDocument(innerHtml);
  if (!document) {
    throw new Error(`renderWpBlockHtml: empty HTML for block "${blockClass}"`);
  }

  const target = document.querySelector("*");
  if (!target) {
    throw new Error(`renderWpBlockHtml: no element in HTML for block "${blockClass}"`);
  }

  target.classList.add("wp-block");
  target.classList.add(blockClass);

  const reactElement = htmlToReact(document.toString());
  if (!reactElement) {
    throw new Error(`renderWpBlockHtml: failed to convert HTML for block "${blockClass}"`);
  }

  return reactElement as ReactElement;
}
