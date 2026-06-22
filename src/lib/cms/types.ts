import type { z } from "zod";
import {
  ArtistSchema,
  ArtworkSchema,
  ExhibitionSchema,
  ImageSchema,
} from "./schemas";

export type Image = z.infer<typeof ImageSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
export type Artwork = z.infer<typeof ArtworkSchema>;
export type Exhibition = z.infer<typeof ExhibitionSchema>;

/** Required on every CMS request — supplied by TanStack Query (`withSignal`) or route handlers (Stage 4). */
export type CmsRequestOptions = {
  signal: AbortSignal;
};

export type CMSProvider = {
  getArtworks(options: CmsRequestOptions): Promise<Artwork[]>;
  getArtwork(slug: string, options: CmsRequestOptions): Promise<Artwork>;
  getArtists(options: CmsRequestOptions): Promise<Artist[]>;
  getArtist(slug: string, options: CmsRequestOptions): Promise<Artist>;
  getExhibitions(options: CmsRequestOptions): Promise<Exhibition[]>;
  getExhibition(slug: string, options: CmsRequestOptions): Promise<Exhibition>;
};

export type CmsType = "wordpress" | "drupal";
