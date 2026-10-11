import { describe, expect, it } from "vitest";
import { flashcardDeckSchema, quizSchema } from "./StudySchemas";

const card = (front: string) => ({ front, back: `Answer to ${front}` });
const question = (overrides: Record<string, unknown> = {}) => ({
	question: "What is NDCG in the example?",
	options: ["5.35", "8.13", "0.66"],
	answer: "0.66",
	explanation: "5.35 / 8.13 = 0.66.",
	...overrides,
});

describe("flashcardDeckSchema", () => {
	it("accepts a deck with at least three cards", () => {
		expect(flashcardDeckSchema.safeParse({ cards: [card("a"), card("b"), card("c")] }).success).toBe(true);
	});

	it("rejects too few cards, duplicate fronts, empty text and unknown fields", () => {
		expect(flashcardDeckSchema.safeParse({ cards: [card("a"), card("b")] }).success).toBe(false);
		expect(flashcardDeckSchema.safeParse({ cards: [card("a"), card("a"), card("b")] }).success).toBe(false);
		expect(flashcardDeckSchema.safeParse({ cards: [card("a"), card("b"), { front: " ", back: "x" }] }).success).toBe(false);
		expect(flashcardDeckSchema.safeParse({ cards: [card("a"), card("b"), { ...card("c"), hint: "x" }] }).success).toBe(false);
	});
});

describe("quizSchema", () => {
	it("accepts questions whose answer is one of the options", () => {
		expect(quizSchema.safeParse({ questions: [question(), question(), question()] }).success).toBe(true);
	});

	it("rejects an answer that is not an option, duplicate options and a missing explanation", () => {
		const parse = (q: Record<string, unknown>) => quizSchema.safeParse({ questions: [question(), question(), q] });

		const wrongAnswer = parse(question({ answer: "0.67" }));
		expect(wrongAnswer.success).toBe(false);
		expect(wrongAnswer.error?.issues[0].message).toContain('Answer "0.67" is not one of the options');

		expect(parse(question({ options: ["0.66", "0.66", "1"] })).success).toBe(false);
		const { explanation: _omitted, ...withoutExplanation } = question();
		expect(parse(withoutExplanation).success).toBe(false);
	});
});
