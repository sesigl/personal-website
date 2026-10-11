import { Fragment } from "react";

/** Fisher–Yates shuffle that returns a new array. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
	const result = [...items];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

// Browser storage can be missing or throw (private mode, blocked site data).
// Progress is a convenience, so every failure falls back to "nothing stored".
export function readStorage<T>(key: string): T | undefined {
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : undefined;
	} catch {
		return undefined;
	}
}

export function writeStorage(key: string, value: unknown): void {
	try {
		if (value === undefined) window.localStorage.removeItem(key);
		else window.localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Ignore: progress is not persisted in this browser.
	}
}

/** True when a key press comes from a control that handles keys itself. */
export function isTypingTarget(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/** Renders `inline code` spans; everything else stays plain text. */
export function InlineText({ text }: { text: string }) {
	const parts = text.split(/(`[^`]+`)/g);
	return (
		<>
			{parts.map((part, index) =>
				part.startsWith("`") && part.endsWith("`") && part.length > 2 ? (
					<code key={index}>{part.slice(1, -1)}</code>
				) : (
					<Fragment key={index}>{part}</Fragment>
				),
			)}
		</>
	);
}
