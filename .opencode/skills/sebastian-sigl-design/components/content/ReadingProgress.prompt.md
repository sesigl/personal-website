Thin reading-progress bar pinned above the sticky header — mount once on article pages.

```jsx
<ReadingProgress targetId="article" />
<article id="article">…</article>
```

- Exposes role="progressbar" with aria-valuenow; motion is a transform only.
