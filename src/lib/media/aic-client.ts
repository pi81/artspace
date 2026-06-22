import { z } from "zod";

export const AIC_API_BASE = "https://api.artic.edu/api/v1";
export const AIC_IIIF_BASE = "https://www.artic.edu/iiif/2";
export const AIC_USER_AGENT = "ArtSpace (media-provider; portfolio project)";

const AicArtworkResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    title: z.string(),
    image_id: z.string().nullable(),
  }),
  config: z.object({
    iiif_url: z.string(),
  }),
});

export type AicArtworkImage = {
  imageId: string;
  iiifBase: string;
  title: string;
};

export async function fetchAicArtworkImage(
  aicArtworkId: number,
  signal?: AbortSignal,
): Promise<AicArtworkImage> {
  const url = `${AIC_API_BASE}/artworks/${aicArtworkId}?fields=id,title,image_id`;
  const response = await fetch(url, {
    signal,
    headers: { "AIC-User-Agent": AIC_USER_AGENT },
  });

  if (!response.ok) {
    throw new Error(
      `AIC request failed for artwork ${aicArtworkId}: ${response.status}`,
    );
  }

  const payload = AicArtworkResponseSchema.parse(await response.json());
  const imageId = payload.data.image_id;

  if (!imageId) {
    throw new Error(
      `Artwork ${aicArtworkId} (${payload.data.title}) has no image_id`,
    );
  }

  return {
    imageId,
    iiifBase: payload.config.iiif_url || AIC_IIIF_BASE,
    title: payload.data.title,
  };
}

export function buildAicIiifUrl(
  iiifBase: string,
  imageId: string,
  size: number | string = 843,
): string {
  return `${iiifBase}/${imageId}/full/${size},/0/default.jpg`;
}
