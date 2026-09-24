# Website UI kit — sebastiansigl.com

Hi-fi click-through of the personal site built in `sesigl/personal-website` (Astro + Tailwind, Cruip "DevSpace" base), reworked for accessibility and mobile.

Open `index.html`. Use the rail, the search field, category tabs, post titles and the bottom-right **Screen** switcher.

| Screen | Source | File |
|---|---|---|
| Home / category | `src/layouts/Startpage.astro`, `pages/[category].astro` | `HomeScreen.jsx` |
| Search results | `src/pages/search.astro` | `HomeScreen.jsx` |
| Article | `src/layouts/BlogPost.astro` | `ArticleScreen.jsx` |
| About | `src/pages/about.astro` | `PageScreens.jsx` |
| Subscribe | `src/pages/subscribe.astro` | `PageScreens.jsx` |
| Imprint | `src/pages/imprint.astro` | `PageScreens.jsx` |
| Unsubscribe | `src/pages/newsletter/unsubscribe/[unsubscribeKey].astro` | `PageScreens.jsx` |
| Admin newsletter | `src/components/admin/Editor.tsx`, `ProgressTracker.tsx` | `AdminScreen.jsx` |

Routing is hash-based and mirrors the real paths (`#/`, `#/tech`, `#/blog/<slug>`, `#/search?q=…&categoryOnly`, `#/about`, `#/subscribe`, `#/imprint`, `#/unsubscribe`, `#/admin`), so every link is a real `<a href>`, browser back/forward works, links open in new tabs, and reloads keep the page. The back button uses history when available.

Shell (rail, top bar, footer) is composed in `index.html` from DS components. Content lives in `data.js`.

Not recreated: the Yoopta email-builder canvas (replaced by a plain textarea), RSS, sitemap, the password gate on `/admin`, the standalone infographic pages in `public/infographics/`.
