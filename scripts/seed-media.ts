import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import {
  AIC_API_BASE,
  AIC_IIIF_BASE,
  AIC_USER_AGENT,
  FIXTURE_DIRS,
  IIIF_SIZES,
  SEED_MEDIA_ARTWORKS,
  type IiifSize,
} from "./seed-media.config";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");

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

const IIIF_URL_PATTERN =
  /https:\/\/www\.artic\.edu\/iiif\/2\/([^/]+)\/full\/(\d+),\/0\/default\.jpg/g;

type SizeUrlMap = Partial<Record<IiifSize, string>>;

async function fetchAicImageId(aicArtworkId: number): Promise<{
  imageId: string;
  iiifBase: string;
  title: string;
}> {
  const url = `${AIC_API_BASE}/artworks/${aicArtworkId}?fields=id,title,image_id`;
  const response = await fetch(url, {
    headers: { "AIC-User-Agent": AIC_USER_AGENT },
  });

  if (!response.ok) {
    throw new Error(`AIC request failed for artwork ${aicArtworkId}: ${response.status}`);
  }

  const payload = AicArtworkResponseSchema.parse(await response.json());
  const imageId = payload.data.image_id;

  if (!imageId) {
    throw new Error(`Artwork ${aicArtworkId} (${payload.data.title}) has no image_id`);
  }

  return {
    imageId,
    iiifBase: payload.config.iiif_url || AIC_IIIF_BASE,
    title: payload.data.title,
  };
}

function buildIiifUrl(iiifBase: string, imageId: string, size: IiifSize): string {
  return `${iiifBase}/${imageId}/full/${size},/0/default.jpg`;
}

function collectKnownIdentifiers(content: string): Set<string> {
  const identifiers = new Set<string>();

  for (const match of content.matchAll(IIIF_URL_PATTERN)) {
    const identifier = match[1];
    if (identifier) identifiers.add(identifier);
  }

  return identifiers;
}

function replaceIiifUrls(
  content: string,
  replacements: Map<string, SizeUrlMap>,
): { content: string; replacements: number } {
  let count = 0;

  const updated = content.replace(IIIF_URL_PATTERN, (fullMatch, identifier: string, size: string) => {
    const sizeMap = replacements.get(identifier);
    const nextUrl = sizeMap?.[size as IiifSize];

    if (!nextUrl || nextUrl === fullMatch) return fullMatch;

    count += 1;
    return nextUrl;
  });

  return { content: updated, replacements: count };
}

async function buildReplacementMap(): Promise<Map<string, SizeUrlMap>> {
  const replacements = new Map<string, SizeUrlMap>();

  for (const artwork of SEED_MEDIA_ARTWORKS) {
    const { imageId, iiifBase, title } = await fetchAicImageId(artwork.aicArtworkId);

    const sizeUrls: SizeUrlMap = {};
    for (const size of IIIF_SIZES) {
      sizeUrls[size] = buildIiifUrl(iiifBase, imageId, size);
    }

    replacements.set(String(artwork.aicArtworkId), sizeUrls);
    replacements.set(imageId, sizeUrls);

    console.log(
      `  ${artwork.slug}: AIC #${artwork.aicArtworkId} "${title}" → image_id ${imageId}`,
    );
  }

  return replacements;
}

async function seedFixtureFile(
  filePath: string,
  replacements: Map<string, SizeUrlMap>,
): Promise<number> {
  const absolutePath = path.join(projectRoot, filePath);
  const original = await readFile(absolutePath, "utf8");

  if (!original.includes("artic.edu/iiif")) {
    return 0;
  }

  const knownIds = collectKnownIdentifiers(original);
  const hasMappedId = [...knownIds].some((id) => replacements.has(id));

  if (!hasMappedId) {
    return 0;
  }

  const { content, replacements: count } = replaceIiifUrls(original, replacements);

  if (count === 0) {
    console.log(`  ${filePath}: already up to date`);
    return 0;
  }

  await writeFile(absolutePath, content, "utf8");
  console.log(`  ${filePath}: updated ${count} URL(s)`);
  return count;
}

async function main(): Promise<void> {
  console.log("Fetching AIC image metadata…");
  const replacements = await buildReplacementMap();

  console.log("\nUpdating fixture files…");
  let total = 0;

  for (const dir of FIXTURE_DIRS) {
    for (const file of ["artworks.json"] as const) {
      total += await seedFixtureFile(path.join(dir, file), replacements);
    }
  }

  console.log(`\nDone. Refreshed ${total} IIIF URL(s) in CMS fixtures.`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`seed:media failed: ${message}`);
  process.exit(1);
});
