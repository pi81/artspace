import drupalArtists from "@data/artspace/cms/fixtures/drupal/artists.json";
import drupalArtworks from "@data/artspace/cms/fixtures/drupal/artworks.json";
import drupalExhibitions from "@data/artspace/cms/fixtures/drupal/exhibitions.json";
import wpArtists from "@data/artspace/cms/fixtures/wordpress/artists.json";
import wpArtworks from "@data/artspace/cms/fixtures/wordpress/artworks.json";
import wpExhibitions from "@data/artspace/cms/fixtures/wordpress/exhibitions.json";

/** ArtSpace tenant — CMS fixture payloads (separate from application code). */
export const artspaceCmsFixtures = {
  wordpress: {
    artists: wpArtists,
    artworks: wpArtworks,
    exhibitions: wpExhibitions,
  },
  drupal: {
    artists: drupalArtists,
    artworks: drupalArtworks,
    exhibitions: drupalExhibitions,
  },
} as const;
