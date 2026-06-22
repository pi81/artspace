import { resolveCmsUrl } from "@/lib/cms/media/resolve-cms-url";
import { buildAicIiifUrl, fetchAicArtworkImage } from "./aic-client";
import type { MediaProvider, ResolveImageUrlInput } from "./types";

const IIIF_URL_PATTERN =
  /^https:\/\/www\.artic\.edu\/iiif\/2\/([^/]+)\/full\/(\d+),\/0\/default\.jpg$/;

function resolveIiifSize(width?: number): number {
  if (!width) return 843;
  if (width <= 600) return 600;
  return 843;
}

function resizeIiifUrl(url: string, width?: number): string {
  const match = url.match(IIIF_URL_PATTERN);
  if (!match) return url;

  const [, imageId, currentSize] = match;
  const targetSize = String(resolveIiifSize(width));

  if (currentSize === targetSize) return url;

  return buildAicIiifUrl(
    "https://www.artic.edu/iiif/2",
    imageId ?? "",
    targetSize,
  );
}

async function resolveFromUrl(
  input: ResolveImageUrlInput,
): Promise<string | null> {
  if (!input.url) return null;

  const absoluteUrl = resolveCmsUrl(input.url);
  return resizeIiifUrl(absoluteUrl, input.width);
}

async function resolveFromAic(
  input: ResolveImageUrlInput,
): Promise<string | null> {
  if (input.aicArtworkId === undefined) return null;

  const { imageId, iiifBase } = await fetchAicArtworkImage(
    input.aicArtworkId,
    input.signal,
  );
  return buildAicIiifUrl(iiifBase, imageId, resolveIiifSize(input.width));
}

/** Resolves CMS media URLs and optional AIC open-access IIIF endpoints. */
export const mediaProvider: MediaProvider = {
  async resolveImageUrl(input) {
    if (input.aicArtworkId !== undefined) {
      return resolveFromAic(input);
    }

    return resolveFromUrl(input);
  },
};
