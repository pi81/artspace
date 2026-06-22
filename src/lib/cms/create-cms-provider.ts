import { drupalCmsProvider } from "./drupal/drupal-cms-provider";
import type { CMSProvider, CmsType } from "./types";
import { withValidatedContent } from "./validate-cms";
import { wordpressCmsProvider } from "./wordpress/wordpress-cms-provider";

const DEFAULT_TYPE: CmsType = "wordpress";

function resolveCmsType(): CmsType {
  const raw = process.env.CMS_TYPE;
  if (raw === "drupal") return "drupal";
  if (raw === "wordpress") return "wordpress";
  return DEFAULT_TYPE;
}

export function createCmsProvider(): CMSProvider {
  const cmsType = resolveCmsType();

  switch (cmsType) {
    case "wordpress":
      return withValidatedContent(wordpressCmsProvider);
    case "drupal":
      return withValidatedContent(drupalCmsProvider);
    default: {
      const _exhaustive: never = cmsType;
      return _exhaustive;
    }
  }
}
