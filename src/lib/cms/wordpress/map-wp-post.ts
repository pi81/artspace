import { resolveCmsUrl } from "../media/resolve-cms-url";
import type { Artist, Artwork, Exhibition } from "../types";
import type { WpPostRaw } from "./wp-raw-schemas";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function slugFromAlias(alias: string | undefined, fallback: string): string {
  if (!alias) return fallback;
  const parts = alias.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? fallback;
}

export function mapWpArtwork(post: WpPostRaw): Artwork {
  const featured = post._embedded?.["wp:featuredmedia"]?.[0];

  return {
    id: String(post.id),
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    artist: post.meta?.artist ?? "Unknown artist",
    medium: post.meta?.medium ?? "",
    year: post.meta?.year,
    images: featured
      ? [
          {
            url: resolveCmsUrl(featured.source_url, "wordpress"),
            alt: featured.alt_text || stripHtml(post.title.rendered),
          },
        ]
      : [],
    bodyHtml: post.content.rendered,
  };
}

export function mapWpArtist(post: WpPostRaw): Artist {
  return {
    id: String(post.id),
    slug: post.slug,
    name: stripHtml(post.title.rendered),
    bodyHtml: post.content.rendered,
    birthYear: post.meta?.birth_year,
    deathYear: post.meta?.death_year,
  };
}

export function mapWpExhibition(post: WpPostRaw): Exhibition {
  return {
    id: String(post.id),
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    summary: post.meta?.summary ?? stripHtml(post.excerpt?.rendered ?? ""),
    startDate: post.meta?.start_date,
    endDate: post.meta?.end_date,
    artworkIds: post.meta?.artwork_ids?.map(String) ?? [],
    bodyHtml: post.content.rendered,
  };
}

export { slugFromAlias, stripHtml };
