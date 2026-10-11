import { useCallback, useEffect, useRef, useState } from "react";
import type { QuizQuestion } from "../../lib/domain/study/StudySchemas";
import { InlineText, isTypingTarget, readStorage, shuffle, writeStorage } from "./studyUtils";

type Phase = "intro" | "question" | "result";
type RoundItem = { question: QuizQuestion; options: string[] };
type Answer = { item: RoundItem; chosen: string; correct: boolean };
type BestScore = { correct: number; total: number; at: string };

interface Props {
	questions: QuizQuestion[];
	/** localStorage key for the best score of a full run. */
	storageKey: string;
	flashcardsHref?: string;
	articleHref: string;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function verdict(ratio: number): string {
	if (ratio === 1) return "Perfect score. You can explain this topic to someone else.";
	if (ratio >= 0.75) return "Strong result. Review the misses below and the topic is yours.";
	if (ratio >= 0.5) return "Good start. Read the explanations below, then retry the questions you missed.";
	return "Worth another pass. Skim the article or the flashcards, then retry the questions you missed.";
}

export default function Quiz({ questions, storageKey, flashcardsHref, articleHref }: Props) {
	const [phase, setPhase] = useState<Phase>("intro");
	const [round, setRound] = useState<RoundItem[]>([]);
	const [isFullRun, setIsFullRun] = useState(true);
	const [index, setIndex] = useState(0);
	const [chosen, setChosen] = useState<string | null>(null);
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [best, setBest] = useState<BestScore | undefined>(undefined);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);

	useEffect(() => setBest(readStorage<BestScore>(storageKey)), [storageKey]);

	// Move focus to the new question so screen readers and keyboards follow along.
	useEffect(() => {
		if (phase !== "intro") headingRef.current?.focus();
	}, [phase, index]);

	const start = useCallback((subset: QuizQuestion[], fullRun: boolean) => {
		// Options are shuffled per round, so the position of the right answer is no hint.
		setRound(subset.map((question) => ({ question, options: shuffle(question.options) })));
		setIsFullRun(fullRun);
		setIndex(0);
		setChosen(null);
		setAnswers([]);
		setPhase("question");
	}, []);

	const choose = useCallback(
		(option: string) => {
			if (chosen !== null) return;
			const item = round[index];
			setChosen(option);
			setAnswers((previous) => [...previous, { item, chosen: option, correct: option === item.question.answer }]);
			requestAnimationFrame(() => nextRef.current?.focus());
		},
		[chosen, round, index],
	);

	const next = useCallback(() => {
		if (chosen === null) return;
		if (index < round.length - 1) {
			setIndex(index + 1);
			setChosen(null);
			return;
		}
		const correct = answers.filter((answer) => answer.correct).length;
		if (isFullRun && (!best || correct / round.length > best.correct / best.total)) {
			const score = { correct, total: round.length, at: new Date().toISOString() };
			setBest(score);
			writeStorage(storageKey, score);
		}
		setPhase("result");
	}, [chosen, index, round.length, answers, isFullRun, best, storageKey]);

	useEffect(() => {
		if (phase !== "question") return;
		function onKey(event: KeyboardEvent) {
			if (event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) return;
			const options = round[index]?.options ?? [];
			const key = event.key.toUpperCase();
			const byNumber = Number.parseInt(key, 10) - 1;
			const byLetter = LETTERS.indexOf(key);
			const choice = byNumber >= 0 ? byNumber : byLetter;
			if (chosen === null && choice >= 0 && choice < options.length) {
				event.preventDefault();
				choose(options[choice]);
			} else if (chosen !== null && event.key === "ArrowRight") {
				event.preventDefault();
				next();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [phase, round, index, chosen, choose, next]);

	if (phase === "intro") {
		return (
			<section className="ss-study" aria-labelledby="quiz-intro">
				<div className="ss-study-done">
					<p className="ss-kicker">
						{questions.length} questions · about {Math.max(1, Math.round(questions.length * 0.4))} min
					</p>
					<h2 id="quiz-intro" className="ss-h3">Check what you remember.</h2>
					<p className="ss-muted">
						One question at a time. You see right away if your answer is correct and why. At the end, you can retry only
						the questions you missed.
					</p>
					{best ? (
						<p className="ss-study-best">
							Your best score: <strong>{best.correct} of {best.total}</strong>
						</p>
					) : null}
					<div className="ss-study-actions">
						<button type="button" className="ss-btn ss-btn--primary ss-btn--lg" onClick={() => start(questions, true)}>
							Start quiz
						</button>
						{flashcardsHref ? (
							<a className="ss-btn ss-btn--secondary ss-btn--lg" href={flashcardsHref}>Practice with flashcards first</a>
						) : null}
					</div>
				</div>
			</section>
		);
	}

	const correctCount = answers.filter((answer) => answer.correct).length;

	if (phase === "result") {
		const missed = answers.filter((answer) => !answer.correct);
		const ratio = correctCount / round.length;
		return (
			<section className="ss-study" aria-labelledby="quiz-result">
				<div className="ss-study-done">
					<p className="ss-kicker">{isFullRun ? "Your score" : "Retry score"}</p>
					<h2 id="quiz-result" ref={headingRef} tabIndex={-1} className="ss-study-score">
						{correctCount}<span> / {round.length}</span>
					</h2>
					<p className="ss-muted">{verdict(ratio)}</p>
					{best && isFullRun ? (
						<p className="ss-study-best">Best score: <strong>{best.correct} of {best.total}</strong></p>
					) : null}
					<div className="ss-study-actions">
						{missed.length ? (
							<button
								type="button"
								className="ss-btn ss-btn--primary"
								onClick={() => start(missed.map((answer) => answer.item.question), false)}
							>
								Retry {missed.length} missed {missed.length === 1 ? "question" : "questions"}
							</button>
						) : null}
						<button
							type="button"
							className={`ss-btn ${missed.length ? "ss-btn--secondary" : "ss-btn--primary"}`}
							onClick={() => start(questions, true)}
						>
							Retake the full quiz
						</button>
						{flashcardsHref ? <a className="ss-btn ss-btn--secondary" href={flashcardsHref}>Flashcards</a> : null}
						<a className="ss-btn ss-btn--ghost" href={articleHref}>Back to the article</a>
					</div>
				</div>

				<h3 className="ss-kicker ss-study-review-title">Review</h3>
				<ol className="ss-study-review">
					{answers.map((answer, i) => (
						<li key={i} className={answer.correct ? "is-right" : "is-wrong"}>
							<p className="ss-study-review__q">
								<span className="ss-study-review__mark" aria-hidden="true">{answer.correct ? "✓" : "✕"}</span>
								<span className="ss-sr-only">{answer.correct ? "Correct: " : "Missed: "}</span>
								<InlineText text={answer.item.question.question} />
							</p>
							{answer.correct ? null : (
								<p className="ss-study-review__a">
									Your answer: <InlineText text={answer.chosen} />
								</p>
							)}
							<p className="ss-study-review__a">
								Correct answer: <strong><InlineText text={answer.item.question.answer} /></strong>
							</p>
							<p className="ss-study-review__why"><InlineText text={answer.item.question.explanation} /></p>
						</li>
					))}
				</ol>
			</section>
		);
	}

	const item = round[index];
	const answered = chosen !== null;
	const isRight = answered && chosen === item.question.answer;

	return (
		<section className="ss-study" aria-label="Quiz">
			<div className="ss-study-steps" aria-hidden="true">
				{round.map((_, i) => {
					const answer = answers[i];
					const state = answer ? (answer.correct ? "is-right" : "is-wrong") : i === index ? "is-current" : "";
					return <span key={i} className={state} />;
				})}
			</div>
			<p className="ss-kicker">
				{isFullRun ? "" : "Retry · "}Question {index + 1} of {round.length}
				<span className="ss-study-toolbar__end">{correctCount} correct</span>
			</p>
			<h2 ref={headingRef} tabIndex={-1} className="ss-h3 ss-study-question">
				<InlineText text={item.question.question} />
			</h2>

			<ul className="ss-study-options" role="list">
				{item.options.map((option, i) => {
					const state = !answered
						? ""
						: option === item.question.answer
							? "is-right"
							: option === chosen
								? "is-wrong"
								: "is-dimmed";
					return (
						<li key={option}>
							<button
								type="button"
								className={`ss-study-option ${state}`}
								onClick={() => choose(option)}
								disabled={answered}
								aria-describedby={answered ? "quiz-feedback" : undefined}
							>
								<span className="ss-study-option__key" aria-hidden="true">{LETTERS[i]}</span>
								<span className="ss-study-option__text"><InlineText text={option} /></span>
								{state === "is-right" ? <span className="ss-study-option__mark">Correct</span> : null}
								{state === "is-wrong" ? <span className="ss-study-option__mark">Your answer</span> : null}
							</button>
						</li>
					);
				})}
			</ul>

			<div id="quiz-feedback" className="ss-study-feedback" role="status" aria-live="polite">
				{answered ? (
					<div className={isRight ? "is-right" : "is-wrong"}>
						<strong>{isRight ? "Correct." : "Not quite."}</strong> <InlineText text={item.question.explanation} />
					</div>
				) : null}
			</div>

			<div className="ss-study-nav ss-study-nav--end">
				<button
					type="button"
					ref={nextRef}
					className="ss-btn ss-btn--primary"
					onClick={next}
					hidden={!answered}
				>
					{index < round.length - 1 ? "Next question →" : "See your score"}
				</button>
			</div>

			<p className="ss-study-keys">
				<kbd>1</kbd>–<kbd>{item.options.length}</kbd> or <kbd>A</kbd>–<kbd>{LETTERS[item.options.length - 1]}</kbd> choose ·{" "}
				<kbd>Enter</kbd> or <kbd>→</kbd> next
			</p>
		</section>
	);
}
