import { createDrupalCmsProvider } from "@/lib/cms/drupal/drupal-cms-provider";
import type { CMSProvider, CmsType } from "@/lib/cms/types";
import { withValidatedContent } from "@/lib/cms/validate-cms";
import { createWordpressCmsProvider } from "@/lib/cms/wordpress/wordpress-cms-provider";
import { artspaceCmsFixtures } from "./cms-fixtures";

const DEFAULT_TYPE: CmsType = "wordpress";

function resolveCmsType(): CmsType {
  const raw = process.env.CMS_TYPE;
  if (raw === "drupal") return "drupal";
  if (raw === "wordpress") return "wordpress";
  return DEFAULT_TYPE;
}

export function createArtspaceCmsProvider(): CMSProvider {
  const cmsType = resolveCmsType();

  switch (cmsType) {
    case "wordpress":
      return withValidatedContent(createWordpressCmsProvider(artspaceCmsFixtures.wordpress));
    case "drupal":
      return withValidatedContent(createDrupalCmsProvider(artspaceCmsFixtures.drupal));
    default: {
      const _exhaustive: never = cmsType;
      return _exhaustive;
    }
  }
}
