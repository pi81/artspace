import type { Artist, Artwork, Exhibition } from "../types";
import { resolveCmsUrl } from "../utils/resolve-cms-url";
import { slugFromAlias } from "../wordpress/map-wp-post";
import type { DrupalNodeResource } from "./drupal-raw-schemas";

export function mapDrupalArtwork(node: DrupalNodeResource): Artwork {
  const slug = slugFromAlias(node.attributes.path?.alias ?? undefined, node.id);
  const image = node.attributes.field_image;

  return {
    id: node.id,
    slug,
    title: node.attributes.title,
    artist: node.attributes.field_artist ?? "Unknown artist",
    medium: node.attributes.field_medium ?? "",
    year: node.attributes.field_year,
    images: image
      ? [
          {
            url: resolveCmsUrl(image.uri, "drupal"),
            alt: image.alt || node.attributes.title,
            width: image.width,
            height: image.height,
          },
        ]
      : [],
    bodyHtml: node.attributes.body?.processed ?? "",
  };
}

export function mapDrupalArtist(node: DrupalNodeResource): Artist {
  const slug = slugFromAlias(node.attributes.path?.alias ?? undefined, node.id);

  return {
    id: node.id,
    slug,
    name: node.attributes.title,
    bodyHtml: node.attributes.body?.processed ?? "",
    birthYear: node.attributes.field_birth_year,
    deathYear: node.attributes.field_death_year,
  };
}

export function mapDrupalExhibition(node: DrupalNodeResource): Exhibition {
  const slug = slugFromAlias(node.attributes.path?.alias ?? undefined, node.id);

  return {
    id: node.id,
    slug,
    title: node.attributes.title,
    summary: node.attributes.field_summary?.processed ?? "",
    startDate: node.attributes.field_start_date,
    endDate: node.attributes.field_end_date,
    artworkIds: node.attributes.field_artwork_ids ?? [],
    bodyHtml: node.attributes.body?.processed ?? "",
  };
}
