import { defineMiddleware } from "astro/middleware";
import { ADMIN_PASSWORD } from "astro:env/server";

export const onRequest = defineMiddleware((context, next) => {

    if (
        !context.request.url.includes("/admin/") // pages
        && !context.request.url.includes("/admin.") // api
    ) {
        return next();
    }

    const basicAuth = context.request.headers.get("authorization");

    if (basicAuth) {
        const authValue = basicAuth.split(" ")[1] ?? `admin:password`;

        // Decode the Base64 encoded string via atob (https://developer.mozilla.org/en-US/docs/Web/API/atob)
        // Get the username and password. NB: the decoded string is in the form "username:password"
        const [username, pwd] = atob(authValue).split(":");

        if (username === "admin" && pwd === ADMIN_PASSWORD) {
            return next();
        }
    }

    return new Response("Auth required", {
        status: 401,
        headers: {
            "WWW-authenticate": 'Basic realm="Secure Area"',
        },
    });
});