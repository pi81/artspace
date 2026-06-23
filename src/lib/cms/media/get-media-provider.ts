import { mediaProvider } from "./media-provider";
import type { MediaProvider } from "./types";

let provider: MediaProvider | null = null;

export function getMediaProvider(): MediaProvider {
  if (!provider) provider = mediaProvider;
  return provider;
}
