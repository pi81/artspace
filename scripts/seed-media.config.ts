/** Maps gallery fixture slugs to open-access AIC artwork IDs. */
export const SEED_MEDIA_ARTWORKS = [
  { slug: "starry-night-study", aicArtworkId: 27992 },
  { slug: "water-lilies-reflection", aicArtworkId: 16568 },
  { slug: "composition-viii", aicArtworkId: 59944 },
  { slug: "american-gothic", aicArtworkId: 6565 },
  { slug: "nighthawks", aicArtworkId: 111628 },
  { slug: "the-bedroom", aicArtworkId: 28560 },
  { slug: "paris-street-rainy-day", aicArtworkId: 20684 },
  { slug: "the-childs-bath", aicArtworkId: 111442 },
] as const;

export const AIC_API_BASE = "https://api.artic.edu/api/v1";
export const AIC_IIIF_BASE = "https://www.artic.edu/iiif/2";
export const AIC_USER_AGENT = "ArtSpace (seed-media; portfolio project)";

/** IIIF sizes used in fixtures — keep in sync with Gutenberg HTML. */
export const IIIF_SIZES = ["843", "600"] as const;

export type IiifSize = (typeof IIIF_SIZES)[number];

export const FIXTURE_DIRS = [
  "data/artspace/cms/fixtures/wordpress",
  "data/artspace/cms/fixtures/drupal",
] as const;
