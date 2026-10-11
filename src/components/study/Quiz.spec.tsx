/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Quiz from "./Quiz";

expect.extend(matchers);

const questions = [
	{ question: "2 + 2?", options: ["3", "4", "5"], answer: "4", explanation: "Basic sum." },
	{ question: "Capital of France?", options: ["Paris", "Rome"], answer: "Paris", explanation: "Paris is the capital." },
	{ question: "Gain of Exact?", options: ["3", "7"], answer: "7", explanation: "`2^3 - 1` is 7." },
];
const storageKey = "study:quiz:test";

function renderQuiz() {
	return render(<Quiz questions={questions} storageKey={storageKey} flashcardsHref="/cards" articleHref="/post" />);
}

async function answer(user: ReturnType<typeof userEvent.setup>, text: string) {
	await user.click(screen.getByRole("button", { name: new RegExp(`^${text.replace(/[+?]/g, "\\$&")}`) }));
}

describe("Quiz", () => {
	beforeEach(() => window.localStorage.clear());
	afterEach(cleanup);

	it("shows feedback with the explanation and locks the question after an answer", async () => {
		const user = userEvent.setup();
		renderQuiz();
		await user.click(screen.getByRole("button", { name: "Start quiz" }));

		await answer(user, "3");

		expect(screen.getByRole("status")).toHaveTextContent("Not quite. Basic sum.");
		expect(screen.getByRole("button", { name: /^4/ })).toHaveTextContent("Correct");
		expect(screen.getByRole("button", { name: /^5/ })).toBeDisabled();
	});

	it("scores the run, saves the best score and retries only missed questions", async () => {
		const user = userEvent.setup();
		renderQuiz();
		await user.click(screen.getByRole("button", { name: "Start quiz" }));

		await answer(user, "4");
		await user.click(screen.getByRole("button", { name: "Next question →" }));
		await answer(user, "Rome");
		await user.click(screen.getByRole("button", { name: "Next question →" }));
		await answer(user, "7");
		await user.click(screen.getByRole("button", { name: "See your score" }));

		expect(screen.getByRole("heading", { name: "2 / 3" })).toBeInTheDocument();
		expect(JSON.parse(window.localStorage.getItem(storageKey) ?? "{}")).toMatchObject({ correct: 2, total: 3 });

		await user.click(screen.getByRole("button", { name: "Retry 1 missed question" }));
		expect(screen.getByText(/Retry · Question 1 of 1/)).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Capital of France?" })).toBeInTheDocument();
	});

	it("answers with the keyboard", async () => {
		const user = userEvent.setup();
		renderQuiz();
		await user.click(screen.getByRole("button", { name: "Start quiz" }));

		await user.keyboard("1");

		expect(screen.getByRole("status")).not.toBeEmptyDOMElement();
		expect(screen.getByRole("button", { name: "Next question →" })).toBeVisible();
	});
});
