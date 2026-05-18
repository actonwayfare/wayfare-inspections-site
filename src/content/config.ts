import { defineCollection, z } from 'astro:content';

/**
 * Each suburb gets a markdown file in src/content/locations/{slug}.md
 * The frontmatter is validated against this schema, so you can't ship
 * a broken location page by accident.
 */
const locations = defineCollection({
  type: 'content',
  schema: z.object({
    suburb: z.string(),
    postcode: z.string(),
    state: z.enum(['VIC', 'NSW']),
    tier: z.enum(['A', 'B']),
    /** Drive-time from Mildura in minutes — used in copy. */
    driveMinutes: z.number(),
    /** Short headline override; falls back to template if omitted. */
    headline: z.string().optional(),
    /** SEO meta description for this suburb page. */
    metaDescription: z.string(),
    /** A short pithy summary used in cards / hubs. */
    localContext: z.string().optional(),
    /** 2–3 short paragraphs of GENUINELY local content. The unique-content moat. */
    localContext: z.string().optional(),
    /** Optional list of common defects worth flagging for this suburb. */
    commonDefects: z.array(z.string()).optional(),
    /** Published order for the hub page (lower = earlier). */
    order: z.number().default(50),
  }),
});

export const collections = { locations };
