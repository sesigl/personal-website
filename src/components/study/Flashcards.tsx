import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Flashcard } from "../../lib/domain/study/StudySchemas";
import { InlineText, isTypingTarget, readStorage, shuffle, writeStorage } from "./studyUtils";

type Rating = "known" | "learning";
type Ratings = Record<string, Rating>;
type Mode = "all" | "learning";

interface Props {
	cards: Flashcard[];
	/** localStorage key; ratings are stored by card front, so edits to other cards keep progress. */
	storageKey: string;
	quizHref?: string;
	articleHref: string;
}

const SWIPE_THRESHOLD_PX = 60;

export default function Flashcards({ cards, storageKey, quizHref, articleHref }: Props) {
	const [order, setOrder] = useState<number[]>(() => cards.map((_, index) => index));
	const [position, setPosition] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const [ratings, setRatings] = useState<Ratings>({});
	const [mode, setMode] = useState<Mode>("all");
	const [finished, setFinished] = useState(false);
	const [shuffled, setShuffled] = useState(false);
	const swipeStart = useRef<{ x: number; y: number } | null>(null);
	const suppressClick = useRef(false);

	useEffect(() => {
		const stored = readStorage<Ratings>(storageKey);
		if (stored) {
			const fronts = new Set(cards.map((card) => card.front));
			setRatings(Object.fromEntries(Object.entries(stored).filter(([front]) => fronts.has(front))));
		}
	}, [cards, storageKey]);

	const card = cards[order[position]];
	const knownCount = cards.filter((c) => ratings[c.front] === "known").length;
	const learningCount = cards.filter((c) => ratings[c.front] === "learning").length;
	const unseenCount = cards.length - knownCount - learningCount;
	const learningIndices = useMemo(
		() => cards.flatMap((c, index) => (ratings[c.front] === "learning" ? [index] : [])),
		[cards, ratings],
	);

	const go = useCallback(
		(step: number) => {
			setFlipped(false);
			setPosition((current) => Math.min(Math.max(current + step, 0), order.length - 1));
		},
		[order.length],
	);

	const flip = useCallback(() => setFlipped((value) => !value), []);

	const rate = useCallback(
		(rating: Rating) => {
			if (!card) return;
			const next = { ...ratings, [card.front]: rating };
			setRatings(next);
			writeStorage(storageKey, next);
			setFlipped(false);
			if (position >= order.length - 1) setFinished(true);
			else setPosition(position + 1);
		},
		[card, ratings, storageKey, position, order.length],
	);

	const start = useCallback(
		(nextMode: Mode, nextShuffled = shuffled) => {
			const base = nextMode === "learning" ? learningIndices : cards.map((_, index) => index);
			if (base.length === 0) return;
			setMode(nextMode);
			setShuffled(nextShuffled);
			setOrder(nextShuffled ? shuffle(base) : base);
			setPosition(0);
			setFlipped(false);
			setFinished(false);
		},
		[cards, learningIndices, shuffled],
	);

	const resetProgress = useCallback(() => {
		setRatings({});
		writeStorage(storageKey, undefined);
		setMode("all");
		setOrder(cards.map((_, index) => index));
		setShuffled(false);
		setPosition(0);
		setFlipped(false);
		setFinished(false);
	}, [cards, storageKey]);

	useEffect(() => {
		function onKey(event: KeyboardEvent) {
			if (finished || event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) return;
			const onControl = event.target instanceof HTMLElement && event.target.closest("button, a");
			switch (event.key) {
				case "ArrowRight":
					event.preventDefault();
					go(1);
					break;
				case "ArrowLeft":
					event.preventDefault();
					go(-1);
					break;
				case " ":
				case "Enter":
					// A focused button or link handles Space and Enter itself.
					if (onControl) return;
					event.preventDefault();
					flip();
					break;
				case "1":
					if (flipped) rate("learning");
					break;
				case "2":
					if (flipped) rate("known");
					break;
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [finished, flipped, go, flip, rate]);

	function onPointerDown(event: React.PointerEvent) {
		swipeStart.current = { x: event.clientX, y: event.clientY };
	}

	function onPointerUp(event: React.PointerEvent) {
		const startPoint = swipeStart.current;
		swipeStart.current = null;
		if (!startPoint) return;
		const dx = event.clientX - startPoint.x;
		const dy = event.clientY - startPoint.y;
		if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
			suppressClick.current = true;
			go(dx < 0 ? 1 : -1);
		}
	}

	function onCardClick() {
		if (suppressClick.current) {
			suppressClick.current = false;
			return;
		}
		flip();
	}

	const progress = (
		<div className="ss-study-progress" aria-label="Deck progress">
			<div className="ss-study-progress__bar" aria-hidden="true">
				<span className="is-known" style={{ flexGrow: knownCount }} />
				<span className="is-learning" style={{ flexGrow: learningCount }} />
				<span className="is-unseen" style={{ flexGrow: unseenCount }} />
			</div>
			<p className="ss-study-progress__legend">
				<span><i className="is-known" aria-hidden="true" />{knownCount} known</span>
				<span><i className="is-learning" aria-hidden="true" />{learningCount} still learning</span>
				<span><i className="is-unseen" aria-hidden="true" />{unseenCount} not rated</span>
			</p>
		</div>
	);

	if (finished) {
		const allKnown = learningCount === 0 && unseenCount === 0;
		return (
			<section className="ss-study" aria-labelledby="flashcards-done">
				{progress}
				<div className="ss-study-done">
					<p className="ss-kicker">{mode === "learning" ? "Review round complete" : "Deck complete"}</p>
					<h2 id="flashcards-done" className="ss-h3">
						{allKnown
							? `You know all ${cards.length} cards.`
							: `${knownCount} of ${cards.length} known, ${learningCount} to review.`}
					</h2>
					<p className="ss-muted">
						{allKnown
							? "Check that it sticks: take the quiz, or come back tomorrow and go through the deck once more."
							: "Go through the cards you still learn once more. Repeat until they stick."}
					</p>
					<div className="ss-study-actions">
						{learningCount > 0 ? (
							<button type="button" className="ss-btn ss-btn--primary" onClick={() => start("learning")}>
								Review {learningCount} {learningCount === 1 ? "card" : "cards"}
							</button>
						) : null}
						{quizHref ? (
							<a className={`ss-btn ${learningCount > 0 ? "ss-btn--secondary" : "ss-btn--primary"}`} href={quizHref}>
								Take the quiz →
							</a>
						) : null}
						<button type="button" className="ss-btn ss-btn--secondary" onClick={() => start("all")}>
							Go through all cards
						</button>
						<a className="ss-btn ss-btn--ghost" href={articleHref}>Back to the article</a>
					</div>
				</div>
			</section>
		);
	}

	const rating = card ? ratings[card.front] : undefined;

	return (
		<section className="ss-study" aria-label="Flashcards">
			{progress}

			<div className="ss-study-toolbar">
				<span className="ss-kicker" aria-live="polite">
					{mode === "learning" ? "Review · " : ""}Card {position + 1} of {order.length}
					{rating ? <span className={`ss-study-chip is-${rating}`}>{rating === "known" ? "Known" : "Still learning"}</span> : null}
				</span>
				<span className="ss-study-toolbar__end">
					<button
						type="button"
						className="ss-btn ss-btn--ghost ss-btn--sm"
						aria-pressed={shuffled}
						onClick={() => start(mode, !shuffled)}
					>
						{shuffled ? "Shuffled" : "Shuffle"}
					</button>
					{knownCount + learningCount > 0 ? (
						<button type="button" className="ss-btn ss-btn--ghost ss-btn--sm" onClick={resetProgress}>
							Reset progress
						</button>
					) : null}
				</span>
			</div>

			<button
				type="button"
				className={`ss-flashcard${flipped ? " is-flipped" : ""}`}
				onClick={onCardClick}
				onPointerDown={onPointerDown}
				onPointerUp={onPointerUp}
				onPointerCancel={() => (swipeStart.current = null)}
			>
				<span className="ss-flashcard__inner">
					<span className="ss-flashcard__face ss-flashcard__face--front" aria-hidden={flipped}>
						<span className="ss-kicker">Question</span>
						<span className="ss-flashcard__text"><InlineText text={card.front} /></span>
						<span className="ss-flashcard__hint">Tap or press Space to flip</span>
					</span>
					<span className="ss-flashcard__face ss-flashcard__face--back" aria-hidden={!flipped}>
						<span className="ss-kicker">Answer</span>
						<span className="ss-flashcard__text ss-flashcard__text--answer"><InlineText text={card.back} /></span>
						<span className="ss-flashcard__hint">How well did you know it?</span>
					</span>
				</span>
			</button>
			<p id="flashcard-live" className="ss-sr-only" aria-live="polite">
				{flipped ? `Answer: ${card.back}` : `Question: ${card.front}`}
			</p>

			<div className="ss-study-rate" hidden={!flipped}>
				<button type="button" className="ss-btn ss-btn--secondary ss-btn--lg ss-study-rate__learning" onClick={() => rate("learning")}>
					Still learning <kbd>1</kbd>
				</button>
				<button type="button" className="ss-btn ss-btn--primary ss-btn--lg" onClick={() => rate("known")}>
					I knew it <kbd>2</kbd>
				</button>
			</div>
			<div className="ss-study-nav" hidden={flipped}>
				<button type="button" className="ss-btn ss-btn--secondary" onClick={() => go(-1)} disabled={position === 0}>
					← Previous
				</button>
				<button type="button" className="ss-btn ss-btn--primary" onClick={flip}>
					Show answer
				</button>
				<button
					type="button"
					className="ss-btn ss-btn--secondary"
					onClick={() => go(1)}
					disabled={position >= order.length - 1}
				>
					Next →
				</button>
			</div>

			<p className="ss-study-keys">
				<kbd>Space</kbd> flip · <kbd>←</kbd> <kbd>→</kbd> move · <kbd>1</kbd> still learning · <kbd>2</kbd> I knew it ·
				swipe on touch screens
			</p>
		</section>
	);
}
