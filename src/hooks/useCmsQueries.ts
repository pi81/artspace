import {
  artistDetailQueryOptions,
  artistsListQueryOptions,
  artworkDetailQueryOptions,
  artworksListQueryOptions,
  exhibitionDetailQueryOptions,
  exhibitionsListQueryOptions,
} from "@/api/queries/cms";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useArtworks = () => useSuspenseQuery(artworksListQueryOptions());

export const useArtwork = (slug: string) => useSuspenseQuery(artworkDetailQueryOptions(slug));

export const useArtists = () => useSuspenseQuery(artistsListQueryOptions());

export const useArtist = (slug: string) => useSuspenseQuery(artistDetailQueryOptions(slug));

export const useExhibitions = () => useSuspenseQuery(exhibitionsListQueryOptions());

export const useExhibition = (slug: string) => useSuspenseQuery(exhibitionDetailQueryOptions(slug));
