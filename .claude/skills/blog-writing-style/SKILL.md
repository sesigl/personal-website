---
name: blog-writing-style
description: Write or edit a blog post for sebastiansigl.com in Sebastian's voice. Use when drafting, rewriting, shortening or reviewing the text of a post, before publishing it with the publish-blog-post skill.
---

# Write a blog post in Sebastian's style

These rules come from the author's own edits to drafts (Search Evolution Ladder parts 0 and 1). When he edits a draft, compare it with the previous version and add the new preference here.

## Voice

- Talk to the reader: "we", "let's", "you". Use contractions.
- Use everyday phrases that sound spoken: "The devil is in the detail", "our search starts to feel broken".
- Link every technical consequence to what the user experiences. Write "our search starts to feel broken", not only "we can miss matches".
- Say the idea plainly. Name the concept, then use it: "So we operate on sets and can use set operations."
- Introduce an optimization by what it is: "one smart optimization is starting with the rarest word".

## Structure

- In a series opener, start with your own experience and why you write about it ("Since 2025 I have been working on search systems…").
- Start with a scenario the reader knows, such as checking a marketplace every morning. Bring in the theory after it.
- Use one running example through the whole post, such as "blue sofa". Add a new example only when it shows something the running example can't.
- Give the scale first, so the reader feels the problem: "Consider having millions of listings in our catalog."
- Make section headings questions or short claims: "What does 'contains the words' actually mean?"
- Use short paragraphs. Put a key sentence on its own line, in bold.
- End with "What's next", a link to the companion app and "Happy searching :)" (for the search series).

## Examples

- Every example must be complete inside the post. Don't refer to items that exist only in the app or the dataset, such as "listing 12" or "the 97 judged products". A reader can't make that connection.
- Show an example as the reader would meet it: a listing title, a description, a query.
- When an example goes wrong, name why: "a very different search intent", "only one is a blue sofa".
- Prefer a picture over a code snippet for a simple idea. Show code only when the reader learns from the code itself.

## Keep it concise

- Say each point once. If a later section repeats an earlier point (synonyms, for example), delete the repetition.
- Don't let a caption repeat the paragraph next to it. Use a caption only when the reader needs a hint to read the image.
- Delete caveats that nobody expects, such as "this score doesn't tell us the real business value" for a learning example.
- Delete sections that only state the obvious or wander away from the key topic. Keep the post on its main idea.
- Leave out statistics that only matter in the app (counts, IDs). Keep the headline metric, for example "NDCG@10 of 0.393".

## Links and sources

- Link the companion app where the text first mentions it, not only at the end.
- Check that every link opens before you publish. If a source site is down, cite a stable identifier such as a DOI instead.
- Link app pages that do what the text says. If the text says "search for couch", link the search for "couch", not a page without a search box.
- Keep footnotes short: author, title, chapter or section, and one link.

## Flashcards and quizzes

Follow the format rules in the publish-blog-post skill. For the wording:

- Write full sentences that give the reason and the consequence: "A judged test set. … Without it, you cannot tell if a change made search better or worse."
- Ask "what do you do first", "why" and "what is the risk", not "what is 0.393" or "which dataset".
- Update the cards when the post changes. Delete a card whose section is gone, and change an example when the post's running example changes.
