import { z } from "zod";

export const ImageSchema = z.object({
  url: z.url(),
  alt: z.string(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const ArtistSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  bodyHtml: z.string().default(""),
  birthYear: z.number().int().optional(),
  deathYear: z.number().int().optional(),
});

export const ArtworkSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  artist: z.string(),
  artistId: z.string().optional(),
  medium: z.string().default(""),
  year: z.number().int().optional(),
  images: z.array(ImageSchema),
  bodyHtml: z.string().default(""),
});

export const ExhibitionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string().default(""),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  artworkIds: z.array(z.string()).default([]),
  bodyHtml: z.string().default(""),
});

export const ArtworksSchema = z.array(ArtworkSchema);
export const ArtistsSchema = z.array(ArtistSchema);
export const ExhibitionsSchema = z.array(ExhibitionSchema);
