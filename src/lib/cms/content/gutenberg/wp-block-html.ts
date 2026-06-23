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

  console.log("Log 1", document);

  const react = htmlToReact(document.toString());
  if (!react) {
    throw new Error(`renderWpBlockHtml: failed to convert HTML for block "${blockClass}"`);
  }

  return react as ReactElement;
}
