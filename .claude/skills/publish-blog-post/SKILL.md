---
name: publish-blog-post
description: Publish a blog post on sebastiansigl.com (this Astro repo) with all its companion formats - hero and inline images, podcast, YouTube, infographic, flashcards and quiz. Use when the user wants to add, import, move or publish a blog post, attach a podcast/infographic/flashcards/quiz to a post, or asks why a post, image or study link does not show on the homepage or in the post.
---

# Publish a blog post

A post is one MDX file plus optional companion files. Everything in `src/content/blog/` is published on the next deploy. There is no draft flag.

## 1. Files and locations

| What | Location | Notes |
|---|---|---|
| Post | `src/content/blog/<slug>.mdx` | Name the file like the `slug`. |
| Images | `src/images/blog/posts/<post-folder>/` | Must be under `src/images/` (optimized by Astro). Not `public/`. |
| Infographic | `public/infographics/<slug>.html` (+ image next to it) | Static page, opens in a new tab. |
| Flashcards | `src/content/flashcards/<slug>.yaml` | File name must equal the post `slug`. |
| Quiz | `src/content/quizzes/<slug>.yaml` | File name must equal the post `slug`. |

## 2. Frontmatter

```yaml
---
title: "The Search Evolution Ladder, Part 0: Measure Before You Rank"
description: "One or two sentences. Shows on the homepage, in search and as meta description."
pubDate: "2026-09-26"            # homepage sorts newest first
heroImage: "/src/images/blog/posts/search-evolution/00-evaluation/hero.png"
slug: "search-evolution-ladder-0-measure-before-you-rank"   # URL: /blog/<slug>
category: "tech"                 # only "tech" or "leadership"
readingTimeInMinutes: 7          # default 10 when missing
podcastLink: "https://..."       # optional, any podcast host (NotebookLM etc.). Must be a full URL.
spotifyLink: "https://open.spotify.com/episode/..."   # optional
youtubeLink: "https://youtu.be/..."                   # optional
infographicLink: "/infographics/<slug>.html"          # optional
slugAlternative: "old-slug"      # optional, second URL with canonical link to the main one
---
```

- The schema is in `src/content.config.ts`. An unknown `category` or a missing required field fails the build.
- Remove tracking parameters (`utm_*`) from podcast and video links.
- `/posts/<slug>` redirects to `/blog/<slug>`. Use `/blog/<slug>` for links.

## 3. Images

There are two different path styles. Use the correct one, or the build fails or the image does not show.

- **`heroImage` (frontmatter)**: absolute path that starts with `/src/images/...`. It is the social preview image (Open Graph). `src/components/BaseHead.astro` resolves it with a glob and **throws at build time** when the file does not exist. The homepage list does not show images.
- **Inline images (MDX body)**: relative path from the MDX file: `![Alt text](../../images/blog/posts/<post-folder>/file.png)`. Astro optimizes them to WebP and lazy-loads them.
- The hero does **not** show in the article automatically. To show it, add it as the first image of the body (all recent posts do this).
- Write alt text that tells what the image shows. Put a caption in italics on the next line when the reader must inspect something: `*The same four products ...*`.
- Keep a source image below ~1.5 MB. Delete `*.provenance.json` and other side files; copy only images the post uses.

## 4. Companion formats in the article header

`src/components/ArticleHeader.astro` → `MediaLinks.astro` shows one button per format that exists. The homepage (`src/layouts/Startpage.astro` → `PostItem.astro`) shows the same formats as tags.

| Format | Source | Opens |
|---|---|---|
| Podcast | `podcastLink` or `spotifyLink` | new tab |
| Video | `youtubeLink` | new tab |
| Infographic | `infographicLink` | new tab |
| Flashcards | `src/content/flashcards/<slug>.yaml` exists | `/blog/<slug>/flashcards` |
| Quiz | `src/content/quizzes/<slug>.yaml` exists | `/blog/<slug>/quiz` |

When flashcards or a quiz exist, the article also shows a "Test yourself" box at the end.

### Infographic

- An HTML infographic: copy it to `public/infographics/<slug>.html`. Make it self-contained (inline CSS, or CDN only).
- An image infographic: convert it to WebP and wrap it in a small HTML page with a back link to the article and a text version for screen readers. Example: `public/infographics/search-evolution-ladder-0-measure-before-you-rank.html`.
  ```sh
  cwebp -q 88 infographic.png -o public/infographics/<slug>.webp   # 2.7 MB PNG -> ~360 KB
  ```
- Files in `public/` are not optimized. Keep them small.

### What to ask in flashcards and quizzes

Test the ideas a reader should keep after a week, not details they can look up.

- Ask about concepts, decisions and reasons: "why", "when", "what do you do first", "what is the risk".
- Prefer scenarios: "Your team wants to add X. What do you do first?" A scenario tests if the reader can apply the idea.
- Do not ask the reader to recall exact numbers from the article (dataset sizes, scores, worked-example results). A number is acceptable inside a scenario, or in a small exercise the reader can reason through without the article.
- One card or question per key idea. Cover the whole article, not one section.
- Quiz options: keep all options about the same length. The correct option must not be the longest or the most detailed one. Every wrong option must be a real misconception, not a joke.

### Flashcards (strict format)

```yaml
# src/content/flashcards/<slug>.yaml
cards:
  - front: What gains do those grades become?
    back: "`2^grade - 1` gives Exact 7, Partial 1, and Irrelevant 0."
```

Rules (schema: `src/lib/domain/study/StudySchemas.ts`):
- 3 to 60 cards. Only the keys `front` and `back`. No empty text. Each `front` is unique.
- Progress is stored per browser by the `front` text. If you change a `front`, its rating resets.
- Only formatting: `` `inline code` ``. No Markdown, no HTML.
- Quote a value when it contains `: `, starts with a backtick or `"`, or is only a number.

### Quiz (strict format)

```yaml
# src/content/quizzes/<slug>.yaml
questions:
  - question: What is NDCG in the four-product example?
    options: ["5.35", "8.13", "0.66", "0.393"]
    answer: "0.66"          # exact text of the correct option
    explanation: 5.35 / 8.13 = 0.66. The first two numbers are DCG and IDCG.
```

Rules:
- 3 to 30 questions. Each has 2 to 6 unique options and exactly one correct answer.
- `answer` is the **exact text** of one option, not an index. The build fails when it does not match.
- `explanation` is required. It shows after each answer and in the final review. Tell why the answer is correct.
- Options are shuffled per run. Do not write "All of the above" or refer to an option position.
- Write wrong options that are plausible. Use numbers and misunderstandings from the article.
- Formatting: only `` `inline code` ``.

## 5. Other content features

- Footnotes: `[^1]` in the text, definitions after a final `---`. They render as a "Footnotes" section in the table of contents.
- Mermaid: a ` ```mermaid ` code block renders as a diagram.
- Table of contents: built from `##` headings. Use `##` for sections.

## 6. Verify before you commit

```sh
npx astro sync && npx tsc --noEmit
npx vitest run src/lib/domain/study src/components/study    # no Docker needed
npm run build      # validates frontmatter, YAML, image paths and slug matching
npm run dev
```

- `npm run build` needs all variables from `astro.config.mjs` in `.env`. If only `AWS_REGION` is empty locally, use `AWS_REGION=eu-central-1 npm run build`.
- `npm run test:ci` also runs database tests and needs Docker.
- In the browser, check:
  1. `/` - the post is in the list with the correct date and tags (Podcast, Infographic, Flashcards, Quiz).
  2. `/blog/<slug>` - header buttons, hero, every inline image loads (scroll down; images are lazy), footnotes, the "Test yourself" box.
  3. `/blog/<slug>/flashcards` - flip (click / Space), rate (1 / 2), finish the deck.
  4. `/blog/<slug>/quiz` - start, answer, see the score and the review.
  5. The infographic and podcast links open.
  6. Light and dark theme (toggle in the top bar).

## Common errors

| Symptom | Cause |
|---|---|
| Build error `"/src/images/..." does not exist in glob` | `heroImage` path is wrong or the file is not under `src/images/`. |
| Build error `src/content/quizzes: no blog post with slug "..."` | The YAML file name is not the post `slug`. |
| Build error `Answer "..." is not one of the options` | `answer` text differs from the option (spaces, quotes, `→` vs `->`). |
| Inline image missing | Path not relative (`../../images/...`), or the file is in `public/`. |
| No Flashcards/Quiz button | File name does not match the slug, or the file has a `.yml`/`.yaml` typo in the folder name. |
| Post at the wrong position on the homepage | `pubDate` sorts the list. |

## Import from the search-evolution repo

Source: `~/Private/Workspace/search-evoluation--app-wands/content/`.

| Source | Target |
|---|---|
| `blog/NN-<name>.mdx` | `src/content/blog/<slug>.mdx` (slug from frontmatter) |
| `images/blog/posts/search-evolution/NN-<topic>/` | `src/images/blog/posts/search-evolution/NN-<topic>/` (used images only) |
| `infographics/NN-<name>-learn.png` (the study sheet, matches the `.html`) | `public/infographics/<slug>.webp` + wrapper HTML |
| `study/NN-<name>-flashcards.html` (`cards` array) | `src/content/flashcards/<slug>.yaml` |
| `study/NN-<name>-quiz.html` (`items`: question, options, answer index, explanation) | `src/content/quizzes/<slug>.yaml`; convert the index to the option text |
| `podcasts/NN-<name>-notebooklm.md` `podcast_url` | `podcastLink` |

The source frontmatter already uses website paths (`/src/images/...` and `../../images/...`), so do not change the image paths.
