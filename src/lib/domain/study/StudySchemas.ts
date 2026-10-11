import { z } from "astro/zod";

// Study sets belong to exactly one blog post: the file name (without
// extension) must be the post's `slug`. The study pages fail the build when a
// study set has no matching post.

const text = z.string().trim().min(1);

export const flashcardSchema = z
	.object({
		front: text,
		back: text,
	})
	.strict();

export const flashcardDeckSchema = z
	.object({
		cards: z.array(flashcardSchema).min(3).max(60),
	})
	.strict()
	.superRefine((deck, ctx) => {
		const seen = new Set<string>();
		deck.cards.forEach((card, index) => {
			if (seen.has(card.front)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["cards", index, "front"],
					message: `Duplicate card front: "${card.front}"`,
				});
			}
			seen.add(card.front);
		});
	});

export const quizQuestionSchema = z
	.object({
		question: text,
		options: z.array(text).min(2).max(6),
		// The exact text of the correct option. Text instead of an index, so
		// reordering the options cannot silently change the right answer.
		answer: text,
		explanation: text,
	})
	.strict()
	.superRefine((item, ctx) => {
		if (new Set(item.options).size !== item.options.length) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["options"],
				message: `Options must be unique in question "${item.question}"`,
			});
		}
		if (!item.options.includes(item.answer)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["answer"],
				message: `Answer "${item.answer}" is not one of the options in question "${item.question}"`,
			});
		}
	});

export const quizSchema = z
	.object({
		questions: z.array(quizQuestionSchema).min(3).max(30),
	})
	.strict();

export type Flashcard = z.infer<typeof flashcardSchema>;
export type FlashcardDeck = z.infer<typeof flashcardDeckSchema>;
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type Quiz = z.infer<typeof quizSchema>;
