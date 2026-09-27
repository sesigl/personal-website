# Sebastian Sigl — Design System ("Index")

Design system for **sebastiansigl.com**, the personal site, blog and newsletter of Sebastian Sigl, a staff-level software engineer (Adevinta / Kleinanzeigen, ex-eBay) who writes about coding, architecture, AI-assisted development and engineering leadership.

The site is one product with four surfaces:
1. **Blog**: article index with Tech / Leadership filters, article pages with podcast / video / infographic companions, full-text search.
2. **Profile**: About page with bio and career timeline; talks and open-source projects on the home page.
3. **Newsletter**: sidebar widget, Subscribe page, unsubscribe confirmation.
4. **Admin**: password-protected newsletter composer with send progress tracking.

## Sources
- GitHub: **https://github.com/sesigl/personal-website** (branch `main`): Astro 5 + MDX, Tailwind 3, React islands. Its visual base was Cruip's "DevSpace" template.
- Explore the repo for exact MDX content, infographic pages (`public/infographics/`) and remaining images when building new designs.

## Direction: a redesign, not a copy
The owner asked for a best-in-class, serious rework. Three directions were explored (`explorations/home/`); **A · Index** was chosen: technical, precise, engineering-flavoured. What changed against the source site:
- **Palette**: slate + sky replaced by warm **stone** neutrals and a single **signal-orange** accent.
- **Type**: Aspekta + Inter replaced by **Geist** (everything readable) and **Geist Mono** (meta, kickers, tags, numbers, code).
- **Structure from hairlines**: a 1200px frame with 1px edges; rows and columns separated by lines, not cards and shadows.
- **Navigation**: the left icon rail is gone. A sticky top bar carries wordmark, links, ⌘K search, theme and Subscribe; on mobile a labelled bottom tab bar takes over.
- **Article index**: rows with running number, ISO date, title, description, topic + format tags, reading time. The whole row is the link.
- **Reading** is the flagship: 2px progress bar, numbered sticky table of contents, 18px/1.72 prose at 68ch, numbered h2s (number in a column beside the heading on wide screens, above it on narrow ones), dark code blocks, companion-format buttons, next-article card, end-of-article signup.
- Removed: the ±1° tilted cards, the rotated highlighter swash, pill shapes, emoji in headlines.
- Kept from the rework before this one: AA contrast everywhere, real labels, skip link, visible focus, `aria-current`, 36–60px targets, reduced motion.

## CONTENT FUNDAMENTALS
- **Voice**: first person, direct, practitioner to practitioner. "I counted the tool definitions loaded into my agent's context last week. 67,000 tokens." Opinions stated plainly, then backed by experience.
- **Reader** is "you": engineers, EMs, tech workers. Newsletter promise: "Big tech from the inside.", "An independent viewpoint."
- **Rhythm**: short declaratives mixed with explanation; one-line paragraphs for emphasis.
- **Headlines**: Title Case, often a claim or a tension: "MCP Servers Have a Context Cost. Make Sure They Earn It."
- **UI copy**: terse. Title Case on buttons ("Subscribe", "Send Test"), sentence case elsewhere. Placeholders show an example ("you@company.com"). Status copy: "Thanks for subscribing!", "Something went wrong. Please try again."
- **Mono labels** are UPPERCASE and short: "NEWSLETTER", "ON THIS PAGE", "FILED UNDER", "NEXT ARTICLE →". Numbers are zero-padded (008, 01).
- **Dates**: ISO (`2026-03-20`) in index rows; `MAR 20, 2026` in meta lines.
- **Emoji**: none. Unicode used as UI: `·` separators, `→` / `↗` for navigation and external links, `⌘K`.

## VISUAL FOUNDATIONS
- **Colour**: stone neutrals + signal orange only. Text roles: strong (18:1), body, muted (7:1), faint (4.6:1, mono meta). Accent: `--accent` for marks, progress and focus; `--accent-text` for links and topic tags; the primary button is ink and turns orange on hover. Status colours are admin-only.
- **Dark mode**: equal care, not an inversion. Near-black stone-950 page, stone-50 ink, lighter signal-400 accent, own status tints. `data-theme="dark"` on `<html>`, persisted in `localStorage["dark-mode"]`, defaults to the OS preference.
- **Type**: Geist 600 for headings with tight tracking (display −0.035em), fluid sizes via `clamp()`. Geist Mono 11–13px for meta. Prose 18px / 1.72.
- **Signature motifs**: the 10px signal square (wordmark, meta lines); mono running numbers; the hairline frame; a single highlighted word per headline (accent text with a low marker band).
- **Backgrounds**: flat. No gradients, textures or full-bleed hero photos. The only translucency is the sticky header and mobile tab bar (86–92% page colour + 10px blur).
- **Imagery**: colourful illustrated post images and dark talk stills, always in 4px frames with a hairline border. Covers get the only drop shadow.
- **Layout**: 1200px framed column; content column + 300px sticky sidebar with a hairline between; hero on a 12-column grid. Under 960px the sidebar stacks; under 768px links move to the bottom tab bar.
- **Cards**: 1px hairline, 4px radius, 20px padding, no shadow. Link cards turn the border ink on hover.
- **Radii**: 2 / 3 / 4 / 6px. Round only for avatars.
- **Borders**: `--border-default` for structure, `--border-strong` for controls, `--border-ink` for hover/active.
- **Hover**: colour shifts to ink or accent, row background tint, arrow nudges 2px, talk image zooms 3%. **Press**: no shrink. **Focus**: 2px signal outline + 2px offset; inputs get a 3px soft ring.
- **Motion**: 120 / 160 / 240ms with `cubic-bezier(.2,0,0,1)`. No bounces or page transitions. Zeroed under reduced motion.

## ICONOGRAPHY
- The site's **own inline SVGs** (solid, `currentColor`, 12–18px) live in `components/core/Icon.jsx`, paths copied verbatim from the repo. No icon font, no CDN set.
- Brand/media icons as SVG files in `assets/icons/` (Spotify, YouTube, infographic), used at 16px inside labelled media buttons.
- Social icons in the footer and share row sit in 36px square targets.
- Unicode `→ ↗ ·` are used as text glyphs. No emoji.

## Logo
There is **no logo** in the source. The wordmark is a 10px signal-orange square plus "sebastian.sigl" in Geist Mono (`.ss-brand`). The portrait (`assets/images/me.png`) appears in the hero kicker and on About. Do not invent a logo.

## Fonts
- **Geist** 400–700 and **Geist Mono** 400/500 from Google Fonts (`tokens/fonts.css`). No self-hosted files ship; self-host the OFL woff2s for production if you prefer.

## Index
- `styles.css`: entry; imports everything in `tokens/`
- `tokens/`: `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`, `base.css` (element defaults, a11y), `components.css` + `layout.css` (the `ss-*` classes)
- `components/`: React components, one card per folder
- `guidelines/`: foundation specimen cards (Colors, Type, Spacing, Brand)
- `ui_kits/website/`: click-through site (home, topic, article, search, about, subscribe, imprint, unsubscribe, 404, admin)
- `explorations/home/`: the three home-page directions (A was chosen)
- `assets/`: portrait, post images, talk stills, avatars, company logos, media icons
- `SKILL.md`, `github.md`, `thumbnail.html`

## Components
**core/**: Button, IconButton, Icon, Input, Highlight, Tag, Badge, AvatarStack, Card, ThemeToggle, MetaLine
**navigation/**: TopBar, SideNav, Footer, CategoryTabs, BackButton
**content/**: Hero, PostItem, ArticleHeader, TableOfContents, ReadingProgress, Prose, MediaLinks, ShareButtons, TalkCard, ProjectCard, ExperienceTimeline, TestimonialCard, CheckList
**widgets/**: SubscribeForm, NewsletterWidget, BookWidget, PopularPostsWidget
**admin/**: CharacterCount, Alert, ProgressTracker

### Intentional additions
- **Icon**: wraps the inline SVGs that were duplicated across Astro files.
- **Badge**, **Alert**: replace ad-hoc Tailwind status boxes in the admin.
- **ThemeToggle**, **MetaLine**, **Hero**, **ArticleHeader**: extracted from inline markup.
- **TableOfContents**, **ReadingProgress**: new reading aids for long articles (the brief's top priority).
- **SideNav** now means the mobile bottom tab bar; desktop links live in **TopBar**.
