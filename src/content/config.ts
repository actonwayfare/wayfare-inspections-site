import { defineCollection, z } from 'astro:content';

/**
 * Each suburb gets a markdown file in src/content/locations/{slug}.md
 * The frontmatter is validated against this schema.
 */
const locations = defineCollection({
  type: 'content',
  schema: z.object({
    suburb: z.string(),
    postcode: z.string(),
    state: z.enum(['VIC', 'NSW']),
    tier: z.enum(['A', 'B']),
    driveMinutes: z.number(),
    headline: z.string().optional(),
    metaDescription: z.string(),
    summary: z.string(),
    localContext: z.string().optional(),
    commonDefects: z.array(z.string()).optional(),
    order: z.number().default(50),
  }),
});

export const collections = { locations };
