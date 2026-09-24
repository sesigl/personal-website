repo: sesigl/personal-website
branch: main

## Last sync
date: 2026-09-24T15:46:10Z

### Updated in this project
- Tokens, fonts and component classes rebuilt from Tailwind config + style.css
- 35 React components covering every site feature, AA-contrast accent
- Website UI kit: home, article, search, about, subscribe, imprint, unsubscribe, admin

## Screen map
| Screen | Repo files |
|---|---|
| Shell (rail, top bar, footer) | src/layouts/Layout.astro, src/components/NavigationBlog.astro, src/components/FooterBlog.astro |
| Home / category | src/layouts/Startpage.astro, src/pages/index.astro, src/pages/[category].astro, src/components/post/PostItem.astro |
| Article | src/layouts/BlogPost.astro, src/components/post/ShareButtons.astro, src/components/post/BackButton.astro, src/components/WidgetPosts.astro |
| Search | src/pages/search.astro |
| About | src/pages/about.astro |
| Subscribe | src/pages/subscribe.astro, src/components/WidgetNewsletter.astro, src/components/WidgetBook.astro |
| Imprint / Unsubscribe | src/pages/imprint.astro, src/pages/newsletter/unsubscribe/[unsubscribeKey].astro |
| Admin newsletter | src/components/admin/Editor.tsx, src/components/admin/ProgressTracker.tsx |
| Tokens | tailwind.config.mjs, src/styles/style.css, src/styles/additional-styles/*.css |
