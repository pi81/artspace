import type { CmsRequestOptions } from "@/lib/cms/types";

/** Bridges TanStack Query's queryFn context to CMS fetchers that require `signal`. */
export const withSignal =
  <T>(fn: (options: CmsRequestOptions) => Promise<T>) =>
  ({ signal }: { signal: AbortSignal }) =>
    fn({ signal });
