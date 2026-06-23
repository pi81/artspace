import { getCmsProvider } from "@/api/get-cms";
import { withSignal } from "@/api/with-signal";

const provider = getCmsProvider();

export const ARTWORKS_QUERY_KEYS = {
  all: ["artworks"] as const,
  list: () => ["artworks", "list"] as const,
  detail: (slug: string) => ["artworks", "detail", slug] as const,
} as const;

export const ARTISTS_QUERY_KEYS = {
  all: ["artists"] as const,
  list: () => ["artists", "list"] as const,
  detail: (slug: string) => ["artists", "detail", slug] as const,
} as const;

export const EXHIBITIONS_QUERY_KEYS = {
  all: ["exhibitions"] as const,
  list: () => ["exhibitions", "list"] as const,
  detail: (slug: string) => ["exhibitions", "detail", slug] as const,
} as const;

export const artworksListQueryOptions = () => ({
  queryKey: ARTWORKS_QUERY_KEYS.list(),
  queryFn: withSignal((options) => provider.getArtworks(options)),
});

export const artworkDetailQueryOptions = (slug: string) => ({
  queryKey: ARTWORKS_QUERY_KEYS.detail(slug),
  queryFn: withSignal((options) => provider.getArtwork(slug, options)),
});

export const artistsListQueryOptions = () => ({
  queryKey: ARTISTS_QUERY_KEYS.list(),
  queryFn: withSignal((options) => provider.getArtists(options)),
});

export const artistDetailQueryOptions = (slug: string) => ({
  queryKey: ARTISTS_QUERY_KEYS.detail(slug),
  queryFn: withSignal((options) => provider.getArtist(slug, options)),
});

export const exhibitionsListQueryOptions = () => ({
  queryKey: EXHIBITIONS_QUERY_KEYS.list(),
  queryFn: withSignal((options) => provider.getExhibitions(options)),
});

export const exhibitionDetailQueryOptions = (slug: string) => ({
  queryKey: EXHIBITIONS_QUERY_KEYS.detail(slug),
  queryFn: withSignal((options) => provider.getExhibition(slug, options)),
});
