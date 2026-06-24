/**
 * Gutenberg HTML aligned with real WordPress serialization (nested inner blocks).
 * @see WordPress Playground / content.rendered from block editor
 */

type WpImageInput = {
  id: number;
  src: string;
  alt: string;
  sizeSlug?: string;
  width?: number;
  height?: number;
  linkDestination?: "none" | "media" | "custom";
};

export function joinBlocks(...blocks: string[]): string {
  return blocks.filter(Boolean).join("\n\n");
}

export function wpParagraph(html: string): string {
  return `<!-- wp:paragraph -->
<p>${html}</p>
<!-- /wp:paragraph -->`;
}

export function wpHeading(level: 2 | 3 | 4, text: string): string {
  return `<!-- wp:heading {"level":${level}} -->
<h${level} class="wp-block-heading">${text}</h${level}>
<!-- /wp:heading -->`;
}

export function wpImage(input: WpImageInput): string {
  const attrs = JSON.stringify({
    id: input.id,
    sizeSlug: input.sizeSlug ?? "large",
    linkDestination: input.linkDestination ?? "none",
  });
  const sizeClass = input.sizeSlug ? ` size-${input.sizeSlug}` : " size-large";
  const dimensions =
    input.width !== undefined && input.height !== undefined
      ? ` width="${input.width}" height="${input.height}"`
      : "";

  return `<!-- wp:image ${attrs} -->
<figure class="wp-block-image${sizeClass}"><img src="${input.src}" alt="${input.alt}" class="wp-image-${input.id}"${dimensions}/></figure>
<!-- /wp:image -->`;
}

export function wpGallery(images: WpImageInput[], columns?: number): string {
  const galleryAttrs =
    columns !== undefined ? JSON.stringify({ columns, linkTo: "none" }) : '{"linkTo":"none"}';
  const columnClass = columns !== undefined ? ` columns-${columns}` : " columns-default";
  const nested = images.map((image) => wpImage(image)).join("\n\n");

  return `<!-- wp:gallery ${galleryAttrs} -->
<figure class="wp-block-gallery has-nested-images${columnClass} is-cropped">${nested}
</figure>
<!-- /wp:gallery -->`;
}

export function wpListItem(text: string): string {
  return `<!-- wp:list-item -->
<li>${text}</li>
<!-- /wp:list-item -->`;
}

export function wpList(items: string[], ordered = false): string {
  const tag = ordered ? "ol" : "ul";
  const opener = ordered ? '<!-- wp:list {"ordered":true} -->' : "<!-- wp:list -->";
  const nested = items.map((item) => wpListItem(item)).join("\n\n");

  return `${opener}
<${tag} class="wp-block-list">${nested}
</${tag}>
<!-- /wp:list -->`;
}

export function wpQuote(paragraph: string, cite: string): string {
  return `<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>${paragraph}</p>
<!-- /wp:paragraph -->
<cite>${cite}</cite></blockquote>
<!-- /wp:quote -->`;
}
