import { CMS_REVALIDATE_SECONDS, getWpRestBase } from "../config";
import { CmsNotFoundError } from "../errors";
import artistsFixture from "../fixtures/wordpress/artists.json";
import artworksFixture from "../fixtures/wordpress/artworks.json";
import exhibitionsFixture from "../fixtures/wordpress/exhibitions.json";
import { throwIfAborted } from "../signals";
import type { Artist, Artwork, CMSProvider, Exhibition } from "../types";
import { mapWpArtist, mapWpArtwork, mapWpExhibition } from "./map-wp-post";
import { WpPostsResponseSchema } from "./wp-raw-schemas";

const fixtureArtworks =
  WpPostsResponseSchema.parse(artworksFixture).map(mapWpArtwork);
const fixtureArtists =
  WpPostsResponseSchema.parse(artistsFixture).map(mapWpArtist);
const fixtureExhibitions =
  WpPostsResponseSchema.parse(exhibitionsFixture).map(mapWpExhibition);

async function wpFetch<T>(path: string, signal: AbortSignal): Promise<T> {
  const base = getWpRestBase();
  if (!base) {
    throw new Error("WordPress API is not configured (set WP_API_URL)");
  }

  const separator = path.includes("?") ? "&" : "?";
  const url = `${base}${path}${separator}_embed`;
  const response = await fetch(url, {
    signal,
    next: { revalidate: CMS_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`WP request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as T;
}

async function loadArtworks(signal: AbortSignal): Promise<Artwork[]> {
  if (!getWpRestBase()) {
    throwIfAborted(signal);
    return fixtureArtworks;
  }

  const raw = WpPostsResponseSchema.parse(await wpFetch("/artwork", signal));
  return raw.map(mapWpArtwork);
}

async function loadArtists(signal: AbortSignal): Promise<Artist[]> {
  if (!getWpRestBase()) {
    throwIfAborted(signal);
    return fixtureArtists;
  }

  const raw = WpPostsResponseSchema.parse(await wpFetch("/artist", signal));
  return raw.map(mapWpArtist);
}

async function loadExhibitions(signal: AbortSignal): Promise<Exhibition[]> {
  if (!getWpRestBase()) {
    throwIfAborted(signal);
    return fixtureExhibitions;
  }

  const raw = WpPostsResponseSchema.parse(await wpFetch("/exhibition", signal));
  return raw.map(mapWpExhibition);
}

async function loadArtworkBySlug(
  slug: string,
  signal: AbortSignal,
): Promise<Artwork> {
  if (!getWpRestBase()) {
    throwIfAborted(signal);
    const found = fixtureArtworks.find((artwork) => artwork.slug === slug);
    if (!found) throw new CmsNotFoundError("Artwork", slug);
    return found;
  }

  const raw = WpPostsResponseSchema.parse(
    await wpFetch(`/artwork?slug=${encodeURIComponent(slug)}`, signal),
  );
  const post = raw[0];
  if (!post) throw new CmsNotFoundError("Artwork", slug);
  return mapWpArtwork(post);
}

async function loadArtistBySlug(
  slug: string,
  signal: AbortSignal,
): Promise<Artist> {
  if (!getWpRestBase()) {
    throwIfAborted(signal);
    const found = fixtureArtists.find((artist) => artist.slug === slug);
    if (!found) throw new CmsNotFoundError("Artist", slug);
    return found;
  }

  const raw = WpPostsResponseSchema.parse(
    await wpFetch(`/artist?slug=${encodeURIComponent(slug)}`, signal),
  );
  const post = raw[0];
  if (!post) throw new CmsNotFoundError("Artist", slug);
  return mapWpArtist(post);
}

async function loadExhibitionBySlug(
  slug: string,
  signal: AbortSignal,
): Promise<Exhibition> {
  if (!getWpRestBase()) {
    throwIfAborted(signal);
    const found = fixtureExhibitions.find(
      (exhibition) => exhibition.slug === slug,
    );
    if (!found) throw new CmsNotFoundError("Exhibition", slug);
    return found;
  }

  const raw = WpPostsResponseSchema.parse(
    await wpFetch(`/exhibition?slug=${encodeURIComponent(slug)}`, signal),
  );
  const post = raw[0];
  if (!post) throw new CmsNotFoundError("Exhibition", slug);
  return mapWpExhibition(post);
}

export const wordpressCmsProvider: CMSProvider = {
  async getArtworks(options) {
    throwIfAborted(options.signal);
    return loadArtworks(options.signal);
  },
  async getArtwork(slug, options) {
    throwIfAborted(options.signal);
    return loadArtworkBySlug(slug, options.signal);
  },
  async getArtists(options) {
    throwIfAborted(options.signal);
    return loadArtists(options.signal);
  },
  async getArtist(slug, options) {
    throwIfAborted(options.signal);
    return loadArtistBySlug(slug, options.signal);
  },
  async getExhibitions(options) {
    throwIfAborted(options.signal);
    return loadExhibitions(options.signal);
  },
  async getExhibition(slug, options) {
    throwIfAborted(options.signal);
    return loadExhibitionBySlug(slug, options.signal);
  },
};
