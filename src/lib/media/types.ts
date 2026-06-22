export type ResolveImageUrlInput = {
  url?: string;
  aicArtworkId?: number;
  width?: number;
  height?: number;
  signal?: AbortSignal;
};

export type MediaProvider = {
  resolveImageUrl(input: ResolveImageUrlInput): Promise<string | null>;
};
