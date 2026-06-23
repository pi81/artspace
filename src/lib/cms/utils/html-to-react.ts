import { HTMLElement, NodeType, parse, TextNode, type Node } from "node-html-parser";
import { createElement, Fragment, type ReactNode } from "react";

const PARSE_OPTIONS = { lowerCaseTagName: true } as const;

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

export function parseHtmlDocument(html: string): HTMLElement | null {
  const trimmed = html.trim();
  if (!trimmed) return null;

  return parse(trimmed, PARSE_OPTIONS);
}

function htmlAttributesToReactProps(attributes: Record<string, string>): Record<string, string> {
  const props: Record<string, string> = {};

  for (const [key, value] of Object.entries(attributes)) {
    if (key === "class") props.className = value;
    else if (key === "for") props.htmlFor = value;
    else props[key] = value;
  }

  return props;
}

function nodeToReact(node: Node): ReactNode {
  if (node.nodeType === NodeType.TEXT_NODE) {
    const text = (node as TextNode).text;
    return text.length > 0 ? text : null;
  }

  if (node.nodeType !== NodeType.ELEMENT_NODE) return null;

  const element = node as HTMLElement;
  const tag = element.tagName.toLowerCase();
  const props = htmlAttributesToReactProps(element.attributes);

  if (VOID_TAGS.has(tag)) return createElement(tag, props);

  const children = element.childNodes
    .map(nodeToReact)
    .filter((child): child is ReactNode => child !== null && child !== false);

  return children.length > 0 ? createElement(tag, props, ...children) : createElement(tag, props);
}

export function htmlToReact(html: string): ReactNode {
  const document = parseHtmlDocument(html);
  if (!document) return null;

  const children = document.childNodes
    .map(nodeToReact)
    .filter((child): child is ReactNode => child !== null && child !== false);

  if (children.length === 0) return null;
  if (children.length === 1) return children[0];

  return createElement(Fragment, null, ...children);
}
