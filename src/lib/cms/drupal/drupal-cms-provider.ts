import { CMS_REVALIDATE_SECONDS, getDrupalJsonApiBase } from "../config";
import { CmsNotFoundError } from "../errors";
import { throwIfAborted } from "../signals";
import type { Artist, Artwork, CMSProvider, Exhibition } from "../types";
import { DrupalCollectionResponseSchema } from "./drupal-raw-schemas";
import { mapDrupalArtist, mapDrupalArtwork, mapDrupalExhibition } from "./map-drupal-node";

export type DrupalCmsFixtures = {
  artists: unknown;
  artworks: unknown;
  exhibitions: unknown;
};

export function createDrupalCmsProvider(fixtures: DrupalCmsFixtures): CMSProvider {
  const fixtureArtworks = DrupalCollectionResponseSchema.parse(fixtures.artworks).data.map(
    mapDrupalArtwork,
  );
  const fixtureArtists = DrupalCollectionResponseSchema.parse(fixtures.artists).data.map(
    mapDrupalArtist,
  );
  const fixtureExhibitions = DrupalCollectionResponseSchema.parse(fixtures.exhibitions).data.map(
    mapDrupalExhibition,
  );

  async function drupalFetch<T>(path: string, signal: AbortSignal): Promise<T> {
    const base = getDrupalJsonApiBase();
    if (!base) {
      throw new Error("Drupal API is not configured (set DRUPAL_BASE_URL)");
    }

    const response = await fetch(`${base}${path}`, {
      signal,
      next: { revalidate: CMS_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`Drupal request failed: ${response.status} ${path}`);
    }

    return (await response.json()) as T;
  }

  async function loadArtworks(signal: AbortSignal): Promise<Artwork[]> {
    if (!getDrupalJsonApiBase()) {
      throwIfAborted(signal);
      return fixtureArtworks;
    }

    const raw = DrupalCollectionResponseSchema.parse(await drupalFetch("/node/artwork", signal));
    return raw.data.map(mapDrupalArtwork);
  }

  async function loadArtists(signal: AbortSignal): Promise<Artist[]> {
    if (!getDrupalJsonApiBase()) {
      throwIfAborted(signal);
      return fixtureArtists;
    }

    const raw = DrupalCollectionResponseSchema.parse(await drupalFetch("/node/artist", signal));
    return raw.data.map(mapDrupalArtist);
  }

  async function loadExhibitions(signal: AbortSignal): Promise<Exhibition[]> {
    if (!getDrupalJsonApiBase()) {
      throwIfAborted(signal);
      return fixtureExhibitions;
    }

    const raw = DrupalCollectionResponseSchema.parse(await drupalFetch("/node/exhibition", signal));
    return raw.data.map(mapDrupalExhibition);
  }

  function findBySlug<T extends { slug: string }>(items: T[], slug: string, resource: string): T {
    const found = items.find((item) => item.slug === slug);
    if (!found) throw new CmsNotFoundError(resource, slug);
    return found;
  }

  async function loadArtworkBySlug(slug: string, signal: AbortSignal): Promise<Artwork> {
    if (!getDrupalJsonApiBase()) {
      throwIfAborted(signal);
      return findBySlug(fixtureArtworks, slug, "Artwork");
    }

    const artworks = await loadArtworks(signal);
    return findBySlug(artworks, slug, "Artwork");
  }

  async function loadArtistBySlug(slug: string, signal: AbortSignal): Promise<Artist> {
    if (!getDrupalJsonApiBase()) {
      throwIfAborted(signal);
      return findBySlug(fixtureArtists, slug, "Artist");
    }

    const artists = await loadArtists(signal);
    return findBySlug(artists, slug, "Artist");
  }

  async function loadExhibitionBySlug(slug: string, signal: AbortSignal): Promise<Exhibition> {
    if (!getDrupalJsonApiBase()) {
      throwIfAborted(signal);
      return findBySlug(fixtureExhibitions, slug, "Exhibition");
    }

    const exhibitions = await loadExhibitions(signal);
    return findBySlug(exhibitions, slug, "Exhibition");
  }

  return {
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
}
