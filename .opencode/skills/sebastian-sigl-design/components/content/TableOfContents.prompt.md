Numbered, sticky table of contents for long articles — use in the left column of the article layout (`.ss-article__toc`).

```jsx
<aside className="ss-article__toc"><TableOfContents items={[{ id: 'where-mcp', label: 'Where MCP is the only option' }, { id: 'scope', label: 'Scope it per project' }]} /></aside>
```

- Give each Prose `<h2>` the matching `id`; numbers line up with the Prose h2 counters.
- Hidden under 1100px by the article grid.
