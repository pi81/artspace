import { createCmsProvider } from "@/lib/cms/create-cms-provider";
import type { CMSProvider } from "@/lib/cms/types";

let cmsProvider: CMSProvider | undefined;

export function getCmsProvider(): CMSProvider {
  if (!cmsProvider) {
    cmsProvider = createCmsProvider();
  }
  return cmsProvider;
}
