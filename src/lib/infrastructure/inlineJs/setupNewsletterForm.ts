import { actions } from "astro:actions";

export function setupNewsletterForm(formSelector: string, buttonSelector: string, emailFieldSelector: string) {
    const newsletterForm = document.querySelector(formSelector)!! as HTMLFormElement;

    const newsletterSignUpButton = newsletterForm.querySelector(buttonSelector)!!;

    newsletterSignUpButton.addEventListener("click", handleNewsletterSignUp);

    async function handleNewsletterSignUp(event: Event) {

        if (newsletterForm.checkValidity() === false) {
            return;
        } else {
            event.preventDefault();
        }

        const email = ((document.querySelector(emailFieldSelector)!!) as HTMLInputElement).value;

        if (!email) {
            return;
        }

        const { error } = await actions.subscribeToNewsletter({
            email: email,
        });
        if (!error) {
            document.querySelector(".js-newsletter-success")!!.classList.remove("hidden");
            document.querySelector(".js-newsletter-error")!!.classList.add("hidden");
        } else {
            document.querySelector(".js-newsletter-error")!!.classList.remove("hidden");
            document.querySelector(".js-newsletter-error")!!.textContent = error.message;
            document.querySelector(".js-newsletter-success")!!.classList.add("hidden");
        }
    }
}