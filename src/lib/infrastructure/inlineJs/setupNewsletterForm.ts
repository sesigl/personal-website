import { actions } from "astro:actions";

/**
 * Wires one newsletter form root (see SubscribeForm.astro) to the
 * subscribeToNewsletter action. The root must contain:
 * a form, an email input, a submit button and the
 * .js-newsletter-success / .js-newsletter-error messages.
 */
export function setupNewsletterForm(root: HTMLElement) {
    const form = root.querySelector<HTMLFormElement>("form");
    const submitButton = root.querySelector<HTMLButtonElement>("button[type=submit]");
    const emailField = root.querySelector<HTMLInputElement>("input[type=email]");
    const successMessage = root.querySelector<HTMLElement>(".js-newsletter-success");
    const errorMessage = root.querySelector<HTMLElement>(".js-newsletter-error");

    if (!form || !submitButton || !emailField || !successMessage || !errorMessage) {
        return;
    }

    // Keep non-nullable references for the event handler closure.
    const newsletterForm: HTMLFormElement = form;
    const emailInput: HTMLInputElement = emailField;
    const success: HTMLElement = successMessage;
    const failure: HTMLElement = errorMessage;

    submitButton.addEventListener("click", handleNewsletterSignUp);

    async function handleNewsletterSignUp(event: Event) {
        if (newsletterForm.checkValidity() === false) {
            return;
        }

        event.preventDefault();

        const email = emailInput.value;

        if (!email) {
            return;
        }

        const { error } = await actions.subscribeToNewsletter({
            email: email,
        });

        if (!error) {
            success.classList.remove("hidden");
            failure.classList.add("hidden");
        } else {
            failure.classList.remove("hidden");
            failure.textContent = error.message;
            success.classList.add("hidden");
        }
    }
}
