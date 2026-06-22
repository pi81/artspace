import { z } from "zod";

/** WordPress REST API — single post (simplified, realistic subset). */
export const WpRenderedFieldSchema = z.object({
  rendered: z.string(),
});

export const WpFeaturedMediaSchema = z.object({
  source_url: z.string().url(),
  alt_text: z.string().default(""),
});

export const WpPostRawSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: WpRenderedFieldSchema,
  content: WpRenderedFieldSchema,
  excerpt: WpRenderedFieldSchema.optional(),
  type: z.string(),
  meta: z
    .object({
      artist: z.string().optional(),
      medium: z.string().optional(),
      year: z.number().int().optional(),
      birth_year: z.number().int().optional(),
      death_year: z.number().int().optional(),
      summary: z.string().optional(),
      start_date: z.string().optional(),
      end_date: z.string().optional(),
      artwork_ids: z.array(z.number()).optional(),
    })
    .optional(),
  _embedded: z
    .object({
      "wp:featuredmedia": z.array(WpFeaturedMediaSchema).optional(),
    })
    .optional(),
});

export const WpPostsResponseSchema = z.array(WpPostRawSchema);

export type WpPostRaw = z.infer<typeof WpPostRawSchema>;
