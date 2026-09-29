import { actions, isActionError } from "astro:actions";

/**
 * Wires one newsletter form root (see SubscribeForm.astro) to the
 * subscribeToNewsletter action. The root must contain a form, an email input,
 * a submit button, and a .js-newsletter-status panel.
 */
const STATUS_COPY = {
    success: {
        title: "Thanks for subscribing.",
        text: (email: string) => `${email} is on the list. New articles land in your inbox.`,
    },
    duplicate: {
        title: "Already subscribed.",
        text: (email: string) => `${email} is already on the list. No need to sign up again.`,
    },
    error: {
        title: "Something went wrong.",
        text: () => "Please try again.",
    },
} as const;

type StatusKind = keyof typeof STATUS_COPY;

export function setupNewsletterForm(root: HTMLElement) {
    const form = root.querySelector<HTMLFormElement>("form");
    const submitButton = root.querySelector<HTMLButtonElement>("button[type=submit]");
    const emailField = root.querySelector<HTMLInputElement>("input[type=email]");
    const status = root.querySelector<HTMLElement>(".js-newsletter-status");
    const statusTitle = root.querySelector<HTMLElement>(".js-newsletter-status-title");
    const statusText = root.querySelector<HTMLElement>(".js-newsletter-status-text");

    if (!form || !submitButton || !emailField || !status || !statusTitle || !statusText) {
        return;
    }

    const newsletterForm: HTMLFormElement = form;
    const emailInput: HTMLInputElement = emailField;
    const button: HTMLButtonElement = submitButton;
    const panel: HTMLElement = status;
    const title: HTMLElement = statusTitle;
    const detail: HTMLElement = statusText;
    const idleLabel = button.textContent ?? "Subscribe";

    button.addEventListener("click", handleNewsletterSignUp);

    async function handleNewsletterSignUp(event: Event) {
        if (newsletterForm.checkValidity() === false) {
            return;
        }

        event.preventDefault();

        const email = emailInput.value;

        if (!email) {
            return;
        }

        panel.hidden = true;
        button.disabled = true;
        button.textContent = "Subscribing…";

        const { error } = await actions.subscribeToNewsletter({
            email: email,
        });

        if (!error) {
            showStatus("success", email);
            return;
        }

        button.disabled = false;
        button.textContent = idleLabel;

        if (isDuplicateSubscription(error)) {
            showStatus("duplicate", email);
            return;
        }

        showStatus("error", email);
    }

    function showStatus(kind: StatusKind, email: string) {
        const copy = STATUS_COPY[kind];

        title.textContent = copy.title;
        detail.textContent = copy.text(email);
        panel.dataset.state = kind;
        panel.setAttribute("role", kind === "error" ? "alert" : "status");
        newsletterForm.hidden = kind !== "error";
        panel.hidden = false;
        panel.focus();
    }
}

function isDuplicateSubscription(error: { code?: string; message?: string }) {
    if (isActionError(error) && error.code === "CONFLICT") {
        return true;
    }

    return error.message === "Email already exists";
}
