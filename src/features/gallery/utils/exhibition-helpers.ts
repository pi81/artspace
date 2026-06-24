import type { Artwork, Exhibition } from "@/lib/cms/types";

export function pickArtworksByIds(artworks: Artwork[], ids: string[]): Artwork[] {
  const byId = new Map(artworks.map((artwork) => [artwork.id, artwork]));

  return ids
    .map((id) => byId.get(id))
    .filter((artwork): artwork is Artwork => artwork !== undefined);
}

export function exhibitionCoverImage(
  exhibition: Exhibition,
  artworks: Artwork[],
): Artwork["images"][number] | null {
  const [firstArtwork] = pickArtworksByIds(artworks, exhibition.artworkIds);
  return firstArtwork?.images[0] ?? null;
}

export function formatExhibitionDates(startDate?: string, endDate?: string): string | null {
  if (!startDate && !endDate) return null;

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (startDate && endDate) {
    return `${formatter.format(new Date(startDate))} – ${formatter.format(new Date(endDate))}`;
  }

  if (startDate) return formatter.format(new Date(startDate));
  return endDate ? formatter.format(new Date(endDate)) : null;
}
