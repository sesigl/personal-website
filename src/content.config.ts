import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { flashcardDeckSchema, quizSchema } from './lib/domain/study/StudySchemas';

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
		// Any podcast that is not on Spotify, e.g. a NotebookLM audio overview.
		podcastLink: z.optional(z.string().url()),
		infographicLink: z.optional(z.string()),
		// Interactive companion app for the post.
		appLink: z.optional(z.string().url()),
		youtubeLink: z.optional(z.string()),
		category: z.enum(['tech', 'leadership']),
	}),
});

// One file per post, named after the post's slug: src/content/flashcards/<slug>.yaml
const flashcards = defineCollection({
	loader: glob({ base: './src/content/flashcards', pattern: '*.{yaml,yml}' }),
	schema: flashcardDeckSchema,
});

// One file per post, named after the post's slug: src/content/quizzes/<slug>.yaml
const quizzes = defineCollection({
	loader: glob({ base: './src/content/quizzes', pattern: '*.{yaml,yml}' }),
	schema: quizSchema,
});

export const collections = { blog, flashcards, quizzes };
