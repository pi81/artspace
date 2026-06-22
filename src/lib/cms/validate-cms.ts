import {
  ArtistSchema,
  ArtistsSchema,
  ArtworkSchema,
  ArtworksSchema,
  ExhibitionSchema,
  ExhibitionsSchema,
} from "./schemas";
import type { CMSProvider } from "./types";

/** Validates domain model at the adapter boundary. */
export function withValidatedContent(provider: CMSProvider): CMSProvider {
  return {
    async getArtworks(options) {
      const result = await provider.getArtworks(options);
      return ArtworksSchema.parse(result);
    },
    async getArtwork(slug, options) {
      const result = await provider.getArtwork(slug, options);
      return ArtworkSchema.parse(result);
    },
    async getArtists(options) {
      const result = await provider.getArtists(options);
      return ArtistsSchema.parse(result);
    },
    async getArtist(slug, options) {
      const result = await provider.getArtist(slug, options);
      return ArtistSchema.parse(result);
    },
    async getExhibitions(options) {
      const result = await provider.getExhibitions(options);
      return ExhibitionsSchema.parse(result);
    },
    async getExhibition(slug, options) {
      const result = await provider.getExhibition(slug, options);
      return ExhibitionSchema.parse(result);
    },
  };
}
