import { z } from "zod";

/** Drupal JSON:API — node resource (simplified, realistic subset). */
export const DrupalBodyFieldSchema = z.object({
  value: z.string(),
  processed: z.string(),
  format: z.string().optional(),
});

export const DrupalImageFieldSchema = z.object({
  uri: z.string().url(),
  alt: z.string().default(""),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const DrupalNodeAttributesSchema = z.object({
  title: z.string(),
  body: DrupalBodyFieldSchema.optional(),
  field_summary: DrupalBodyFieldSchema.optional(),
  field_artist: z.string().optional(),
  field_medium: z.string().optional(),
  field_year: z.number().int().optional(),
  field_birth_year: z.number().int().optional(),
  field_death_year: z.number().int().optional(),
  field_start_date: z.string().optional(),
  field_end_date: z.string().optional(),
  field_artwork_ids: z.array(z.string()).optional(),
  field_image: DrupalImageFieldSchema.optional(),
  path: z
    .object({
      alias: z.string().nullable(),
    })
    .optional(),
});

export const DrupalNodeResourceSchema = z.object({
  type: z.string(),
  id: z.string(),
  attributes: DrupalNodeAttributesSchema,
});

export const DrupalCollectionResponseSchema = z.object({
  data: z.array(DrupalNodeResourceSchema),
});

export type DrupalNodeResource = z.infer<typeof DrupalNodeResourceSchema>;
