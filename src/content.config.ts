import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		slug: z.string(),
		slugAlternative: z.optional(z.string()),
		readingTimeInMinutes: z.optional(z.number()),
		spotifyLink: z.optional(z.string()),
		infographicLink: z.optional(z.string()),
		youtubeLink: z.optional(z.string()),
		category: z.enum(['tech', 'leadership']),
	}),
});

export const collections = { blog };
