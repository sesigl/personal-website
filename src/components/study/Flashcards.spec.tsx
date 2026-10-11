/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Flashcards from "./Flashcards";

expect.extend(matchers);

const cards = [
	{ front: "What is `NDCG`?", back: "Normalized discounted cumulative gain." },
	{ front: "What is MRR?", back: "Mean reciprocal rank." },
	{ front: "What is p95?", back: "The time 95% of requests finish within." },
];
const storageKey = "study:flashcards:test";

function renderDeck() {
	return render(<Flashcards cards={cards} storageKey={storageKey} quizHref="/quiz" articleHref="/post" />);
}

describe("Flashcards", () => {
	beforeEach(() => window.localStorage.clear());
	afterEach(cleanup);

	it("flips a card and renders inline code", async () => {
		const user = userEvent.setup();
		renderDeck();

		expect(screen.getByText("NDCG").tagName).toBe("CODE");
		await user.click(screen.getByRole("button", { name: "Show answer" }));

		expect(screen.getByRole("button", { name: "I knew it 2" })).toBeVisible();
		expect(screen.getByText("Answer: Normalized discounted cumulative gain.")).toBeInTheDocument();
	});

	it("rates every card, stores the ratings and offers to review the missed card", async () => {
		const user = userEvent.setup();
		renderDeck();

		await user.keyboard(" ");
		await user.keyboard("2");
		await user.keyboard(" ");
		await user.keyboard("1");
		await user.keyboard(" ");
		await user.keyboard("2");

		expect(screen.getByRole("heading", { name: "2 of 3 known, 1 to review." })).toBeInTheDocument();
		expect(JSON.parse(window.localStorage.getItem(storageKey) ?? "{}")).toEqual({
			"What is `NDCG`?": "known",
			"What is MRR?": "learning",
			"What is p95?": "known",
		});

		await user.click(screen.getByRole("button", { name: "Review 1 card" }));
		expect(screen.getByText(/Review · Card 1 of 1/)).toBeInTheDocument();
		expect(screen.getByText("What is MRR?")).toBeInTheDocument();
	});

	it("restores stored progress and ignores ratings of removed cards", () => {
		window.localStorage.setItem(storageKey, JSON.stringify({ "What is MRR?": "known", "Removed card": "learning" }));
		renderDeck();

		expect(screen.getByText("1 known")).toBeInTheDocument();
		expect(screen.getByText("0 still learning")).toBeInTheDocument();
	});
});
