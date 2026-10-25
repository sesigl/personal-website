---
name: blog-writing-style
description: Write or edit a blog post for sebastiansigl.com in Sebastian's voice. Use when drafting, rewriting, shortening or reviewing the text of a post, before publishing it with the publish-blog-post skill.
---

# Write a blog post in Sebastian's style

These rules come from the author's own edits to drafts (Search Evolution Ladder parts 0 and 1). When the author edits a draft, compare it with the previous version and add the new preference here.

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
- In the companion app, a chapter is `/search?level=<level-id>` (explanation, examples and a search box). `/level/<level-id>` is the annotated source code of that chapter. Link "the chapter" to the first, "the code" to the second.
- Check what a link shows, not only that it returns 200: open the page and confirm it is the thing the sentence names. For bot-blocked publisher sites, confirm the DOI's title and authors with `curl -s https://api.crossref.org/works/<doi>`.
## Footnotes

Write footnotes like a staff engineer cites a design doc: exact, verifiable, the same format every time.

- One footnote backs one claim. Put it right after the claim it supports, not at the start of the topic.
- Number them `[^1]`, `[^2]`, … in the order they first appear in the text, with no gaps.
- Use these formats exactly. List up to three authors with full names; for more, write the first author and "et al.".
  - Book: `Christopher D. Manning, Prabhakar Raghavan, Hinrich Schütze. *Introduction to Information Retrieval*. Cambridge University Press, 2008. §2.2.1 "Tokenization". https://doi.org/10.1017/CBO9780511809071`
  - Paper: `Kalervo Järvelin, Jaana Kekäläinen. "Cumulated gain-based evaluation of IR techniques". *ACM Transactions on Information Systems*, 2002. https://doi.org/10.1145/582415.582418`
  - Conference paper: `Yan Chen et al. "WANDS: Dataset for Product Search Relevance Assessment". In *ECIR 2022*. https://doi.org/10.1007/978-3-030-99736-6_9`
  - Same source again in the same post: `Manning et al. 2008, §2.4.2 "Positional indexes". https://doi.org/10.1017/CBO9780511809071`. Never write "ibid." or "the same book": footnotes get reordered.
  - A note that explains a choice in the post (not a source) is one plain sentence without a citation.
  - Several sources for further reading go in one footnote, separated by `;`.
- Point to the exact place: section number and title (`§1.3 "Processing Boolean queries"`) or chapter (`ch. 5 "Index compression"`), copied from the source's table of contents. Not "chapter 1 explains …".
- One link per source, a DOI when one exists. A dataset may add its data and license link.
- Never cite a section, year, page or DOI you haven't checked. Resolve every DOI (`curl -sI https://doi.org/<doi>`). If you can't confirm a detail, leave it out.
- Cite every technical claim a reader might want to check: data structures, algorithms, optimizations, metric definitions, datasets.

## Technical precision

- When a claim only holds under a condition, state the condition concretely, or drop the hedge if the condition doesn't matter for the post's point. Don't write a vague "assuming the same timestamp precision".
- Precision serves the main idea, it doesn't compete with it. Leave out edge cases that pull the reader away from the section's point, such as tie-breaking rules in a post about matching versus ordering.
- Name the mechanism that makes something cheap or correct: "postings lists are sorted by ID, so we walk both in one pass".
- Use the established term and then keep using it: "index time" and "query time", not "where the work happens".
- Before quoting a metric from the companion app, check how the app produces its inputs (synthetic data, fixed clocks, tie-breaking) and say what that means for the number: "the dates say nothing about relevance, so 0.393 mostly tells us how good our matching is".
- Don't overclaim. "Matches, and for the right reason", not "cannot go wrong".
- Use one name for one thing across the series: "Part 1" for posts, "chapter" only for the app.

## Flashcards and quizzes

Follow the format rules in the publish-blog-post skill. For the wording:

- Write full sentences that give the reason and the consequence: "A judged test set. … Without it, you cannot tell if a change made search better or worse."
- Ask "what do you do first", "why" and "what is the risk", not "what is 0.393" or "which dataset".
- Update the cards when the post changes. Delete a card whose section is gone, and change an example when the post's running example changes.
