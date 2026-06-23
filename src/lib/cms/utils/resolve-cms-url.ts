import type { CmsType } from "../types";

const CMS_BASE_BY_TYPE: Record<CmsType, string | undefined> = {
  wordpress: process.env.WP_API_URL,
  drupal: process.env.DRUPAL_BASE_URL,
};

function isAbsoluteUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

/** Resolves relative CMS media paths to absolute URLs. UI never guesses hosts. */
export function resolveCmsUrl(url: string, cmsType: CmsType = "wordpress"): string {
  if (!url || isAbsoluteUrl(url)) return url;

  const base = CMS_BASE_BY_TYPE[cmsType];
  if (!base) return url;

  try {
    return new URL(url, base.endsWith("/") ? base : `${base}/`).href;
  } catch {
    return url;
  }
}
