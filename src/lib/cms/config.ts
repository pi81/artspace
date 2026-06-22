/** Next.js Data Cache TTL for live CMS adapter fetches. */
export const CMS_REVALIDATE_SECONDS = 3600;

function trimTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/** WordPress REST API base (`/wp-json/wp/v2`) when `WP_API_URL` is set. */
export function getWpRestBase(): string | undefined {
  const siteUrl = process.env.WP_API_URL;
  if (!siteUrl) return undefined;
  return `${trimTrailingSlash(siteUrl)}/wp-json/wp/v2`;
}

/** Drupal JSON:API base when `DRUPAL_BASE_URL` is set. */
export function getDrupalJsonApiBase(): string | undefined {
  const siteUrl = process.env.DRUPAL_BASE_URL;
  if (!siteUrl) return undefined;
  return `${trimTrailingSlash(siteUrl)}/jsonapi`;
}
