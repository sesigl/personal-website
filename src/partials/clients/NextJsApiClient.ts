export default class NextJsApiClient {
  async subscribeToNewsletter(email: string): Promise<Response> {
    return await fetch("/api/addUserToNewsletter", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
