import { getCollection, type CollectionEntry } from "astro:content";

export type StudyLinks = { flashcards?: string; quiz?: string };

export const flashcardsPath = (postSlug: string) => `/blog/${postSlug}/flashcards`;
export const quizPath = (postSlug: string) => `/blog/${postSlug}/quiz`;

export default class StudyRepository {
	async findFlashcardDecks(): Promise<CollectionEntry<"flashcards">[]> {
		return getCollection("flashcards");
	}

	async findQuizzes(): Promise<CollectionEntry<"quizzes">[]> {
		return getCollection("quizzes");
	}

	/** Study links per post slug, for the article header and the post lists. */
	async findLinksByPostSlug(): Promise<Map<string, StudyLinks>> {
		const [decks, quizzes] = await Promise.all([this.findFlashcardDecks(), this.findQuizzes()]);
		const links = new Map<string, StudyLinks>();
		for (const deck of decks) {
			links.set(deck.id, { ...links.get(deck.id), flashcards: flashcardsPath(deck.id) });
		}
		for (const quiz of quizzes) {
			links.set(quiz.id, { ...links.get(quiz.id), quiz: quizPath(quiz.id) });
		}
		return links;
	}

	async findLinks(postSlug: string): Promise<StudyLinks> {
		return (await this.findLinksByPostSlug()).get(postSlug) ?? {};
	}

	/**
	 * Fails fast when a study file name does not match a blog post slug, so a
	 * typo breaks the build instead of silently hiding the flashcards or quiz.
	 */
	assertEveryStudySetHasAPost(
		studySetIds: string[],
		posts: CollectionEntry<"blog">[],
		collection: "flashcards" | "quizzes",
	): void {
		const postSlugs = new Set(posts.map((post) => post.data.slug));
		const orphans = studySetIds.filter((id) => !postSlugs.has(id));
		if (orphans.length) {
			throw new Error(
				`src/content/${collection}: no blog post with slug ${orphans
					.map((id) => `"${id}"`)
					.join(", ")}. Name the file exactly like the post's \`slug\` frontmatter.`,
			);
		}
	}
}
