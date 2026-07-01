import type { CMSProvider } from "@/lib/cms/types";
import { createArtspaceCmsProvider } from "@tenant/cms-provider";

let cmsProvider: CMSProvider | undefined;

export function getCmsProvider(): CMSProvider {
  if (!cmsProvider) {
    cmsProvider = createArtspaceCmsProvider();
  }
  return cmsProvider;
}
