import { createElement, type ReactElement } from "react";

const ROOT_ELEMENT_PATTERN = /^<([a-z][a-z0-9]*)\b([^>]*)\>([\s\S]*)<\/\1>$/i;

const ATTR_PATTERN =
  /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)')/g;

function parseAttributes(attrsHtml: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  let match: RegExpExecArray | null;

  ATTR_PATTERN.lastIndex = 0;
  while ((match = ATTR_PATTERN.exec(attrsHtml)) !== null) {
    const name = match[1];
    const value = match[3] ?? match[4] ?? "";
    if (name) attributes[name] = value;
  }

  return attributes;
}

function mergeClassNames(
  existing: string | undefined,
  classesToAdd: string[],
): string {
  const merged = (existing ?? "").split(/\s+/).filter(Boolean);

  for (const className of classesToAdd) {
    if (!merged.includes(className)) merged.push(className);
  }

  return merged.join(" ");
}

/** Inject wp-block classes on the root element; preserve other attrs and inner HTML. */
export function applyWpBlockClasses(
  innerHtml: string,
  blockClass: string,
): string {
  const trimmed = innerHtml.trim();
  if (!trimmed) return trimmed;

  return trimmed.replace(
    /^<([a-z][a-z0-9]*)\b([^>]*)>/i,
    (_match, tag: string, rawAttrs: string) => {
      const attributes = parseAttributes(rawAttrs);
      const className = mergeClassNames(attributes.class, [
        "wp-block",
        blockClass,
      ]);
      const attrsWithoutClass = Object.entries(attributes)
        .filter(([key]) => key !== "class")
        .map(([key, value]) => ` ${key}="${value}"`)
        .join("");

      return `<${tag} class="${className}"${attrsWithoutClass}>`;
    },
  );
}

function parseRootElement(innerHtml: string): {
  tag: string;
  attributes: Record<string, string>;
  innerContent: string;
} | null {
  const match = innerHtml.trim().match(ROOT_ELEMENT_PATTERN);
  if (!match?.[1]) return null;

  return {
    tag: match[1],
    attributes: parseAttributes(match[2] ?? ""),
    innerContent: match[3] ?? "",
  };
}

function attributesToReactProps(
  attributes: Record<string, string>,
  className: string,
): Record<string, string> {
  const props: Record<string, string> = { className };

  for (const [key, value] of Object.entries(attributes)) {
    if (key === "class") continue;
    props[key] = value;
  }

  return props;
}

export function renderWpBlockHtml(
  innerHtml: string,
  blockClass: string,
): ReactElement {
  const parsed = parseRootElement(innerHtml);

  if (!parsed) {
    return createElement("div", {
      dangerouslySetInnerHTML: {
        __html: applyWpBlockClasses(innerHtml, blockClass),
      },
    });
  }

  const className = mergeClassNames(parsed.attributes.class, [
    "wp-block",
    blockClass,
  ]);

  return createElement(parsed.tag, {
    ...attributesToReactProps(parsed.attributes, className),
    dangerouslySetInnerHTML: { __html: parsed.innerContent },
  });
}
