/* @ds-bundle: {"format":4,"namespace":"SebastianSiglDesignSystem_0b5f4d","components":[{"name":"Alert","sourcePath":"components/admin/Alert.jsx"},{"name":"CharacterCount","sourcePath":"components/admin/CharacterCount.jsx"},{"name":"ProgressTracker","sourcePath":"components/admin/ProgressTracker.jsx"},{"name":"ArticleHeader","sourcePath":"components/content/ArticleHeader.jsx"},{"name":"CheckList","sourcePath":"components/content/CheckList.jsx"},{"name":"ExperienceTimeline","sourcePath":"components/content/ExperienceTimeline.jsx"},{"name":"Hero","sourcePath":"components/content/Hero.jsx"},{"name":"MediaLinks","sourcePath":"components/content/MediaLinks.jsx"},{"name":"PostItem","sourcePath":"components/content/PostItem.jsx"},{"name":"ProjectCard","sourcePath":"components/content/ProjectCard.jsx"},{"name":"Prose","sourcePath":"components/content/Prose.jsx"},{"name":"ReadingProgress","sourcePath":"components/content/ReadingProgress.jsx"},{"name":"ShareButtons","sourcePath":"components/content/ShareButtons.jsx"},{"name":"TableOfContents","sourcePath":"components/content/TableOfContents.jsx"},{"name":"TalkCard","sourcePath":"components/content/TalkCard.jsx"},{"name":"TestimonialCard","sourcePath":"components/content/TestimonialCard.jsx"},{"name":"AvatarStack","sourcePath":"components/core/AvatarStack.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Highlight","sourcePath":"components/core/Highlight.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"MetaLine","sourcePath":"components/core/MetaLine.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"ThemeToggle","sourcePath":"components/core/ThemeToggle.jsx"},{"name":"BackButton","sourcePath":"components/navigation/BackButton.jsx"},{"name":"CategoryTabs","sourcePath":"components/navigation/CategoryTabs.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"SideNav","sourcePath":"components/navigation/SideNav.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"},{"name":"BookWidget","sourcePath":"components/widgets/BookWidget.jsx"},{"name":"NewsletterWidget","sourcePath":"components/widgets/NewsletterWidget.jsx"},{"name":"PopularPostsWidget","sourcePath":"components/widgets/PopularPostsWidget.jsx"},{"name":"SubscribeForm","sourcePath":"components/widgets/SubscribeForm.jsx"}],"sourceHashes":{"components/admin/Alert.jsx":"60030c330b4a","components/admin/CharacterCount.jsx":"387b8a592316","components/admin/ProgressTracker.jsx":"b8d3e56207c3","components/content/ArticleHeader.jsx":"d8275c3eecc3","components/content/CheckList.jsx":"19c96cc9b05a","components/content/ExperienceTimeline.jsx":"f9fce8d91a53","components/content/Hero.jsx":"4bb5ad91e247","components/content/MediaLinks.jsx":"87de62c8943c","components/content/PostItem.jsx":"90961a33e770","components/content/ProjectCard.jsx":"a86a3e75f71d","components/content/Prose.jsx":"15eccf2af841","components/content/ReadingProgress.jsx":"846857496b93","components/content/ShareButtons.jsx":"b2d4dc53a5cf","components/content/TableOfContents.jsx":"e6791092249a","components/content/TalkCard.jsx":"de74bb6d34de","components/content/TestimonialCard.jsx":"dd657e216d32","components/core/AvatarStack.jsx":"6a283660e943","components/core/Badge.jsx":"817e2fc2c999","components/core/Button.jsx":"b6a879470585","components/core/Card.jsx":"b6441afd6e08","components/core/Highlight.jsx":"0bf14d5b33b5","components/core/Icon.jsx":"d15a296d732f","components/core/IconButton.jsx":"fddd517bd8d7","components/core/Input.jsx":"30aeac5f0f92","components/core/MetaLine.jsx":"02aacb73b6e1","components/core/Tag.jsx":"7bfba413bf82","components/core/ThemeToggle.jsx":"00cd0d53e25f","components/navigation/BackButton.jsx":"1d78a2b2327d","components/navigation/CategoryTabs.jsx":"eae274ac5ae2","components/navigation/Footer.jsx":"68655ba4f008","components/navigation/SideNav.jsx":"77c3671734cc","components/navigation/TopBar.jsx":"c7540d155ef7","components/widgets/BookWidget.jsx":"2ea705964252","components/widgets/NewsletterWidget.jsx":"624fb59902a0","components/widgets/PopularPostsWidget.jsx":"943a6b0445c5","components/widgets/SubscribeForm.jsx":"2c245ee61820","explorations/home/shared.js":"f91f2d13187e","ui_kits/website/AdminScreen.jsx":"9ccae9f8c1e3","ui_kits/website/ArticleScreen.jsx":"3569b1389791","ui_kits/website/HomeScreen.jsx":"57e005ff0207","ui_kits/website/PageScreens.jsx":"3221779892fd","ui_kits/website/data.js":"bb70368473a9"},"inlinedExternals":[],"unexposedExports":[{"name":"formatDate","sourcePath":"components/core/MetaLine.jsx"}]} */

(() => {

const __ds_ns = (window.SebastianSiglDesignSystem_0b5f4d = window.SebastianSiglDesignSystem_0b5f4d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/admin/CharacterCount.jsx
try { (() => {
function CharacterCount({
  current = 0,
  min,
  max,
  recommended
}) {
  const ok = current >= min && current <= max;
  return /*#__PURE__*/React.createElement("span", {
    className: "ss-field__hint",
    "aria-live": "polite",
    style: {
      color: ok ? 'var(--status-success-fg)' : current === 0 ? 'var(--text-muted)' : 'var(--status-danger-fg)',
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 500
    }
  }, current, "/", recommended, /*#__PURE__*/React.createElement("span", {
    className: "ss-sr-only"
  }, ok ? ' characters, within recommended range' : ' characters, recommended ' + min + ' to ' + max));
}
Object.assign(__ds_scope, { CharacterCount });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/CharacterCount.jsx", error: String((e && e.message) || e) }); }

// components/content/CheckList.jsx
try { (() => {
function CheckList({
  items = []
}) {
  return /*#__PURE__*/React.createElement("ol", {
    className: "ss-checklist"
  }, items.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-checklist__n",
    "aria-hidden": "true"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", null, t))));
}
Object.assign(__ds_scope, { CheckList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CheckList.jsx", error: String((e && e.message) || e) }); }

// components/content/ExperienceTimeline.jsx
try { (() => {
function ExperienceTimeline({
  items = []
}) {
  return /*#__PURE__*/React.createElement("ol", {
    className: "ss-timeline"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "ss-timeline__item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-timeline__when"
  }, it.start, " \u2013 ", it.end), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ss-timeline__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-timeline__logo"
  }, it.logo ? /*#__PURE__*/React.createElement("img", {
    src: it.logo,
    alt: ""
  }) : null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "ss-timeline__role"
  }, it.role), /*#__PURE__*/React.createElement("div", {
    className: "ss-timeline__org"
  }, it.org))), it.description ? /*#__PURE__*/React.createElement("p", {
    className: "ss-timeline__desc"
  }, it.description) : null))));
}
Object.assign(__ds_scope, { ExperienceTimeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ExperienceTimeline.jsx", error: String((e && e.message) || e) }); }

// components/content/MediaLinks.jsx
try { (() => {
function MediaLinks({
  spotify,
  youtube,
  infographic,
  icons = {}
}) {
  const list = [spotify && spotify !== '#' && {
    href: spotify,
    src: icons.spotify,
    label: 'Podcast',
    sr: 'Listen on Spotify'
  }, youtube && youtube !== '#' && {
    href: youtube,
    src: icons.youtube,
    label: 'Video',
    sr: 'Watch on YouTube'
  }, infographic && infographic !== '#' && {
    href: infographic,
    src: icons.infographic,
    label: 'Infographic',
    sr: 'Open infographic'
  }].filter(Boolean);
  if (!list.length) return null;
  return /*#__PURE__*/React.createElement("ul", {
    className: "ss-media-links",
    "aria-label": "Also available as",
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, list.map(m => /*#__PURE__*/React.createElement("li", {
    key: m.label
  }, /*#__PURE__*/React.createElement("a", {
    className: "ss-media-link",
    href: m.href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, m.src ? /*#__PURE__*/React.createElement("img", {
    src: m.src,
    alt: "",
    width: "16",
    height: "16"
  }) : null, m.label, /*#__PURE__*/React.createElement("span", {
    className: "ss-media-link__ext",
    "aria-hidden": "true"
  }, "\u2197"), /*#__PURE__*/React.createElement("span", {
    className: "ss-sr-only"
  }, " \u2014 ", m.sr, " (opens in a new tab)")))));
}
Object.assign(__ds_scope, { MediaLinks });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/MediaLinks.jsx", error: String((e && e.message) || e) }); }

// components/content/Prose.jsx
try { (() => {
function Prose({
  children,
  as: Tag = 'div',
  className = ''
}) {
  return /*#__PURE__*/React.createElement(Tag, {
    className: 'ss-prose' + (className ? ' ' + className : '')
  }, children);
}
Object.assign(__ds_scope, { Prose });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Prose.jsx", error: String((e && e.message) || e) }); }

// components/content/ReadingProgress.jsx
try { (() => {
function ReadingProgress({
  targetId,
  label = 'Reading progress'
}) {
  const bar = React.useRef(null);
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const on = () => {
      const el = targetId ? document.getElementById(targetId) : document.documentElement;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      if (bar.current) bar.current.style.transform = 'scaleX(' + p + ')';
      setPct(Math.round(p * 100));
    };
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [targetId]);
  return /*#__PURE__*/React.createElement("div", {
    className: "ss-reading-progress",
    role: "progressbar",
    "aria-label": label,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": pct
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-reading-progress__bar",
    ref: bar
  }));
}
Object.assign(__ds_scope, { ReadingProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ReadingProgress.jsx", error: String((e && e.message) || e) }); }

// components/content/TableOfContents.jsx
try { (() => {
function TableOfContents({
  items = [],
  title = 'On this page',
  offset = 120
}) {
  const [active, setActive] = React.useState(items[0] && items[0].id);
  React.useEffect(() => {
    if (!items.length) return undefined;
    const on = () => {
      let cur = items[0].id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top - offset <= 0) cur = it.id;
      }
      setActive(cur);
    };
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    return () => window.removeEventListener('scroll', on);
  }, [items.map(i => i.id).join('|'), offset]);
  const go = id => e => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset + 24,
      behavior: 'smooth'
    });
    setActive(id);
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: "ss-toc",
    "aria-label": "Table of contents"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-kicker"
  }, title), /*#__PURE__*/React.createElement("ol", {
    className: "ss-toc__list"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: it.id
  }, /*#__PURE__*/React.createElement("a", {
    href: '#' + it.id,
    onClick: go(it.id),
    "aria-current": active === it.id ? 'true' : undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-toc__n"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", null, it.label))))));
}
Object.assign(__ds_scope, { TableOfContents });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TableOfContents.jsx", error: String((e && e.message) || e) }); }

// components/core/AvatarStack.jsx
try { (() => {
function AvatarStack({
  avatars = [],
  label,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'ss-avatars' + (className ? ' ' + className : ''),
    role: label ? 'img' : undefined,
    "aria-label": label
  }, avatars.map((src, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: src,
    width: "24",
    height: "24",
    alt: ""
  })));
}
Object.assign(__ds_scope, { AvatarStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/AvatarStack.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  tone = 'neutral',
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: 'ss-badge ss-badge--' + tone + (className ? ' ' + className : '')
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  href,
  disabled,
  type = 'button',
  children,
  className = '',
  ...rest
}) {
  const cls = ['ss-btn', 'ss-btn--' + variant, size === 'sm' && 'ss-btn--sm', size === 'lg' && 'ss-btn--lg', block && 'ss-btn--block', className].filter(Boolean).join(' ');
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement("span", {
    className: "ss-btn__spinner",
    "aria-hidden": "true"
  }) : null, children);
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: disabled ? undefined : href,
    "aria-disabled": disabled || undefined
  }, rest), content);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    disabled: disabled || loading,
    "aria-busy": loading || undefined
  }, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  href,
  tilt = false,
  as,
  children,
  className = '',
  ...rest
}) {
  const Tag = as || (href ? 'a' : 'div');
  const cls = ['ss-card', tilt && 'ss-tilt', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    href: href
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/ProjectCard.jsx
try { (() => {
function ProjectCard({
  title,
  description,
  logo,
  href,
  tilt
}) {
  let host = '';
  try {
    host = new URL(href).host.replace(/^www\./, '');
  } catch (e) {
    host = '';
  }
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    href: href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-project"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-project__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-project__logo"
  }, logo ? /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: ""
  }) : null), /*#__PURE__*/React.createElement("span", {
    className: "ss-project__arrow",
    "aria-hidden": "true"
  }, "\u2197")), /*#__PURE__*/React.createElement("div", {
    className: "ss-project__title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "ss-project__desc"
  }, description), host ? /*#__PURE__*/React.createElement("div", {
    className: "ss-project__foot"
  }, /*#__PURE__*/React.createElement("span", null, host)) : null), /*#__PURE__*/React.createElement("span", {
    className: "ss-sr-only"
  }, "(opens in a new tab)"));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/content/TestimonialCard.jsx
try { (() => {
function TestimonialCard({
  title,
  quote,
  author,
  avatar,
  tilt
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    as: "figure",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-quote"
  }, title ? /*#__PURE__*/React.createElement("div", {
    className: "ss-quote__title"
  }, title) : null, /*#__PURE__*/React.createElement("blockquote", {
    className: "ss-quote__text"
  }, "\u201C", quote, "\u201D"), /*#__PURE__*/React.createElement("figcaption", {
    className: "ss-quote__cite"
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    className: "ss-quote__avatar",
    src: avatar,
    width: "28",
    height: "28",
    alt: ""
  }) : null, author)));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Highlight.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Highlight({
  as: Tag = 'span',
  accent = true,
  hover = false,
  children,
  className = '',
  ...rest
}) {
  const cls = [hover ? 'ss-hl--hover' : 'ss-hl', !accent && !hover && 'ss-hl--plain', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Highlight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Highlight.jsx", error: String((e && e.message) || e) }); }

// components/content/Hero.jsx
try { (() => {
function Hero({
  kicker = 'Staff Engineer · Adevinta',
  avatarSrc,
  title,
  before = 'Notes on building software,',
  highlight = 'systems',
  after = 'and teams.',
  lede = 'Long-form articles on AI-augmented engineering, search, and technical leadership. Some come with a podcast, video or infographic.',
  stats,
  as: Tag = 'h1'
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "ss-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-hero__kicker"
  }, avatarSrc ? /*#__PURE__*/React.createElement("img", {
    className: "ss-hero__avatar",
    src: avatarSrc,
    width: "32",
    height: "32",
    alt: "Sebastian Sigl"
  }) : null, /*#__PURE__*/React.createElement("span", {
    className: "ss-kicker"
  }, kicker)), /*#__PURE__*/React.createElement(Tag, {
    className: "ss-display ss-hero__title"
  }, title || /*#__PURE__*/React.createElement(React.Fragment, null, before, " ", highlight ? /*#__PURE__*/React.createElement(__ds_scope.Highlight, null, highlight) : null, " ", after)), lede ? /*#__PURE__*/React.createElement("p", {
    className: "ss-lede ss-hero__lede"
  }, lede) : null, stats && stats.length ? /*#__PURE__*/React.createElement("dl", {
    className: "ss-hero__stats"
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    className: "ss-hero__stat",
    key: s.label
  }, /*#__PURE__*/React.createElement("dt", null, s.label), /*#__PURE__*/React.createElement("dd", null, s.value)))) : null);
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Hero.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
// Every path below is copied verbatim from the inline SVGs in sesigl/personal-website
// (Layout.astro, NavigationBlog.astro, FooterBlog.astro, ShareButtons.astro, Startpage.astro, subscribe.astro, BackButton.astro).
const ICONS = {
  search: {
    vb: '0 0 16 16',
    w: 16,
    h: 16,
    p: [['M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm8.707 12.293a.999.999 0 11-1.414 1.414L11.9 13.314a8.019 8.019 0 001.414-1.414l2.393 2.393z']]
  },
  sun: {
    vb: '0 0 16 16',
    w: 16,
    h: 16,
    p: [['M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z', .7], ['M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z']]
  },
  moon: {
    vb: '0 0 16 16',
    w: 16,
    h: 16,
    p: [['M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z'], ['M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z', .7]]
  },
  home: {
    vb: '0 0 21 19',
    w: 21,
    h: 19,
    p: [['M4 7v11h13V7l-6.5-5z', .16], ['m10.433 3.242-8.837 6.56L.404 8.198l10.02-7.44L20.59 8.194l-1.18 1.614-8.977-6.565ZM16 17V9h2v10H3V9h2v8h11Z']]
  },
  about: {
    vb: '0 0 20 20',
    w: 20,
    h: 20,
    p: [['M10 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z', .16], ['M9 5h2v2H9V5Zm0 4h2v6H9V9Zm1-9C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z']]
  },
  subscribe: {
    vb: '0 0 21 21',
    w: 21,
    h: 21,
    p: [['m13.4 18-3-7.4-7.4-3L19 2z', .16], ['M13.331 15.169 17.37 3.63 5.831 7.669l5.337 2.163 2.163 5.337Zm-3.699-3.801L.17 7.53 20.63.37l-7.161 20.461-3.837-9.463Z']]
  },
  arrowRight: {
    vb: '0 0 14 12',
    w: 14,
    h: 12,
    p: [['M9.586 5 6.293 1.707 7.707.293 13.414 6l-5.707 5.707-1.414-1.414L9.586 7H0V5h9.586Z']]
  },
  chevronLeft: {
    vb: '8 8 18 18',
    w: 18,
    h: 18,
    p: [['m16.414 17 3.293 3.293-1.414 1.414L13.586 17l4.707-4.707 1.414 1.414z']]
  },
  play: {
    vb: '14 13 14 14',
    w: 14,
    h: 14,
    p: [['m24.765 19.5-6.263-4.375a.626.626 0 0 0-1.002.5v8.75c0 .5.564.812 1.002.5l6.263-4.375a.65.65 0 0 0 0-1Z']]
  },
  check: {
    vb: '0 0 12 12',
    w: 12,
    h: 12,
    p: [['M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z']]
  },
  x: {
    vb: '0 0 300 271',
    w: 16,
    h: 16,
    p: [['m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z']]
  },
  instagram: {
    vb: '0 0 24 24',
    w: 16,
    h: 16,
    p: [['M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z']]
  },
  linkedin: {
    vb: '0 0 24 24',
    w: 16,
    h: 16,
    p: [['M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z']]
  },
  github: {
    vb: '8 8 16 16',
    w: 16,
    h: 16,
    p: [['M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z']]
  },
  patreon: {
    vb: '0 -4.5 256 256',
    w: 16,
    h: 16,
    p: [['M45.1355837,0 L45.1355837,246.35001 L0,246.35001 L0,0 L45.1355837,0 Z M163.657111,0 C214.65668,0 256,41.3433196 256,92.3428889 C256,143.342458 214.65668,184.685778 163.657111,184.685778 C112.657542,184.685778 71.3142222,143.342458 71.3142222,92.3428889 C71.3142222,41.3433196 112.657542,0 163.657111,0 Z']]
  },
  facebook: {
    vb: '8 8 16 16',
    w: 16,
    h: 16,
    p: [['M14.023 24 14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257Z']]
  },
  twitter: {
    vb: '8 8 16 16',
    w: 16,
    h: 16,
    p: [['M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z']]
  }
};
const ICON_NAMES = Object.keys(ICONS);
function Icon({
  name,
  size,
  title,
  className,
  style
}) {
  const def = ICONS[name];
  if (!def) return null;
  const w = size ?? def.w;
  const h = size ? size * (def.h / def.w) : def.h;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    style: style,
    width: w,
    height: h,
    viewBox: def.vb,
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": title ? undefined : true,
    role: title ? 'img' : undefined
  }, title ? /*#__PURE__*/React.createElement("title", null, title) : null, def.p.map(([d, o], i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d,
    fillOpacity: o
  })));
}
Object.assign(__ds_scope, { ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/admin/Alert.jsx
try { (() => {
function Alert({
  tone = 'info',
  title,
  children,
  busy = false
}) {
  const role = tone === 'danger' ? 'alert' : 'status';
  return /*#__PURE__*/React.createElement("div", {
    className: 'ss-alert ss-alert--' + tone,
    role: role
  }, busy ? /*#__PURE__*/React.createElement("span", {
    className: "ss-btn__spinner",
    "aria-hidden": "true",
    style: {
      marginTop: 3
    }
  }) : /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "about",
    size: 16
  }), /*#__PURE__*/React.createElement("div", null, title ? /*#__PURE__*/React.createElement("strong", null, title, " ") : null, children));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/Alert.jsx", error: String((e && e.message) || e) }); }

// components/admin/ProgressTracker.jsx
try { (() => {
const TONE = {
  pending: 'neutral',
  in_progress: 'info',
  completed: 'success',
  failed: 'danger'
};
const LABEL = {
  pending: 'Pending',
  in_progress: 'In progress',
  completed: 'Completed',
  failed: 'Failed'
};
function ProgressTracker({
  campaignTitle,
  status = 'pending',
  processedCount = 0,
  totalRecipients = 0,
  hasFailures = false,
  isTest = false,
  testRecipient
}) {
  const pct = totalRecipients ? Math.round(processedCount / totalRecipients * 100) : 0;
  const barTone = status === 'failed' ? ' ss-progress--danger' : status === 'completed' ? ' ss-progress--success' : '';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, isTest ? /*#__PURE__*/React.createElement(__ds_scope.Alert, {
    tone: "warning",
    title: "Test mode:"
  }, testRecipient ? 'Sending to ' + testRecipient + ' only.' : 'Simulating progress for demo purposes.') : null, /*#__PURE__*/React.createElement("section", {
    className: "ss-card",
    "aria-label": "Newsletter progress",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ss-meta"
  }, "Campaign"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 650,
      color: 'var(--text-strong)'
    }
  }, campaignTitle)), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: TONE[status]
  }, LABEL[status])), /*#__PURE__*/React.createElement("div", {
    className: 'ss-progress' + barTone,
    role: "progressbar",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": pct,
    "aria-label": "Delivery progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-progress__bar",
    style: {
      width: pct + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("span", null, processedCount.toLocaleString('en-US'), " / ", totalRecipients.toLocaleString('en-US'), " recipients"), /*#__PURE__*/React.createElement("span", null, pct, "%")), hasFailures ? /*#__PURE__*/React.createElement(__ds_scope.Alert, {
    tone: "danger"
  }, "Some deliveries failed.") : null));
}
Object.assign(__ds_scope, { ProgressTracker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/ProgressTracker.jsx", error: String((e && e.message) || e) }); }

// components/content/TalkCard.jsx
try { (() => {
function TalkCard({
  title,
  image,
  href,
  meta = 'YouTube',
  tilt
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: "ss-talk",
    href: href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-talk__media"
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    loading: "lazy"
  }) : null, /*#__PURE__*/React.createElement("span", {
    className: "ss-talk__play",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "play",
    size: 12
  }), "Watch")), /*#__PURE__*/React.createElement("span", {
    className: "ss-talk__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-talk__title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "ss-talk__meta"
  }, meta, " \u2197")), /*#__PURE__*/React.createElement("span", {
    className: "ss-sr-only"
  }, "(opens in a new tab)"));
}
Object.assign(__ds_scope, { TalkCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TalkCard.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon,
  label,
  variant = 'plain',
  size = 'md',
  href,
  className = '',
  iconSize,
  ...rest
}) {
  const cls = ['ss-icon-btn', variant === 'outlined' && 'ss-icon-btn--outlined', size === 'lg' && 'ss-icon-btn--lg', className].filter(Boolean).join(' ');
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: iconSize
  }), /*#__PURE__*/React.createElement("span", {
    className: "ss-sr-only"
  }, label));
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: href
  }, rest), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), inner);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/content/ShareButtons.jsx
try { (() => {
function ShareButtons({
  url,
  title = '',
  label = 'Share'
}) {
  const u = encodeURIComponent(url || ''),
    t = encodeURIComponent(title);
  const items = [{
    icon: 'twitter',
    label: 'Share on X',
    href: 'https://twitter.com/intent/tweet?url=' + u + '&text=' + t
  }, {
    icon: 'linkedin',
    label: 'Share on LinkedIn',
    href: 'https://www.linkedin.com/sharing/share-offsite/?url=' + u
  }, {
    icon: 'facebook',
    label: 'Share on Facebook',
    href: 'https://www.facebook.com/sharer/sharer.php?u=' + u
  }];
  return /*#__PURE__*/React.createElement("ul", {
    className: "ss-share",
    "aria-label": "Share this article"
  }, label ? /*#__PURE__*/React.createElement("li", {
    className: "ss-share__label",
    "aria-hidden": "true"
  }, label) : null, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it.icon
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: it.icon,
    label: it.label + ' (opens in a new tab)',
    href: it.href,
    target: "_blank",
    rel: "noopener noreferrer",
    iconSize: 15
  }))));
}
Object.assign(__ds_scope, { ShareButtons });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ShareButtons.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  id,
  label,
  hideLabel = false,
  icon,
  end,
  hint,
  error,
  size = 'md',
  shape,
  counter,
  className = '',
  ...rest
}) {
  const autoId = React.useId();
  const inputId = id || autoId;
  const describedBy = [hint && inputId + '-hint', error && inputId + '-err'].filter(Boolean).join(' ') || undefined;
  const cls = ['ss-input', size === 'lg' && 'ss-input--lg', className].filter(Boolean).join(' ');
  const {
    multiline,
    ...inputProps
  } = rest;
  const Tag = multiline ? 'textarea' : 'input';
  const field = /*#__PURE__*/React.createElement(Tag, _extends({
    id: inputId,
    className: cls,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    style: end ? {
      paddingRight: 44
    } : undefined
  }, inputProps));
  return /*#__PURE__*/React.createElement("div", {
    className: "ss-field"
  }, label ? /*#__PURE__*/React.createElement("div", {
    className: hideLabel ? 'ss-sr-only' : 'ss-field__row'
  }, /*#__PURE__*/React.createElement("label", {
    className: "ss-field__label",
    htmlFor: inputId
  }, label), counter && !hideLabel ? counter : null) : null, icon || end ? /*#__PURE__*/React.createElement("div", {
    className: "ss-input-wrap"
  }, icon ? /*#__PURE__*/React.createElement("span", {
    className: "ss-input-wrap__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  })) : null, field, end ? /*#__PURE__*/React.createElement("span", {
    className: "ss-input-wrap__end",
    "aria-hidden": "true"
  }, end) : null) : field, hint && !error ? /*#__PURE__*/React.createElement("div", {
    id: inputId + '-hint',
    className: "ss-field__hint"
  }, hint) : null, error ? /*#__PURE__*/React.createElement("div", {
    id: inputId + '-err',
    className: "ss-field__error",
    role: "alert"
  }, error) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/MetaLine.jsx
try { (() => {
function formatDate(d) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
function MetaLine({
  date,
  readingTime,
  children,
  dash = true,
  className = ''
}) {
  const iso = date ? typeof date === 'string' ? date : date.toISOString() : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: 'ss-meta' + (className ? ' ' + className : '')
  }, dash ? /*#__PURE__*/React.createElement("span", {
    className: "ss-meta__dash",
    "aria-hidden": "true"
  }) : null, date ? /*#__PURE__*/React.createElement("time", {
    dateTime: iso
  }, formatDate(date)) : null, readingTime ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ss-meta__dot",
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, readingTime, " min read")) : null, children);
}
Object.assign(__ds_scope, { formatDate, MetaLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MetaLine.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  href,
  variant = 'solid',
  children,
  className = '',
  ...rest
}) {
  const cls = ['ss-tag', variant === 'outline' && 'ss-tag--outline', variant === 'muted' && 'ss-tag--muted', className].filter(Boolean).join(' ');
  return href ? /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: href
  }, rest), children) : /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/content/ArticleHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ArticleHeader({
  title,
  description,
  date,
  readingTime,
  category,
  categoryHref,
  url,
  media,
  mediaIcons
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "ss-article-head"
  }, /*#__PURE__*/React.createElement(__ds_scope.MetaLine, {
    date: date,
    readingTime: readingTime
  }, category ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ss-meta__dot",
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    href: categoryHref
  }, category)) : null), /*#__PURE__*/React.createElement("h1", {
    className: "ss-h1 ss-article-head__title"
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    className: "ss-article-head__lede"
  }, description) : null, /*#__PURE__*/React.createElement("div", {
    className: "ss-article-head__bar"
  }, media ? /*#__PURE__*/React.createElement(__ds_scope.MediaLinks, _extends({}, media, {
    icons: mediaIcons
  })) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement(__ds_scope.ShareButtons, {
    url: url,
    title: title
  })));
}
Object.assign(__ds_scope, { ArticleHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ArticleHeader.jsx", error: String((e && e.message) || e) }); }

// components/content/PostItem.jsx
try { (() => {
const MEDIA = {
  spotify: 'Podcast',
  youtube: 'Video',
  infographic: 'Infographic'
};
function PostItem({
  title,
  description,
  date,
  readingTime,
  href = '#',
  image,
  thumbnail = false,
  category,
  media,
  index,
  showTags = true,
  headingLevel = 3,
  onOpen,
  onTag,
  tagHref
}) {
  const H = 'h' + headingLevel;
  const open = e => {
    if (onOpen) {
      e.preventDefault();
      onOpen();
    }
  };
  const formats = media ? Object.keys(MEDIA).filter(k => media[k] && media[k] !== '#') : [];
  const cls = ['ss-post', index == null && 'ss-post--no-index', thumbnail && image && 'ss-post--thumb'].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("article", {
    className: cls
  }, index != null && !(thumbnail && image) ? /*#__PURE__*/React.createElement("span", {
    className: "ss-post__n",
    "aria-hidden": "true"
  }, String(index).padStart(3, '0')) : null, /*#__PURE__*/React.createElement("time", {
    className: "ss-post__date",
    dateTime: date
  }, date), /*#__PURE__*/React.createElement("div", {
    className: "ss-post__body"
  }, /*#__PURE__*/React.createElement(H, {
    className: "ss-post__title"
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: open
  }, title)), description ? /*#__PURE__*/React.createElement("p", {
    className: "ss-post__desc"
  }, description) : null, showTags && (category || formats.length) ? /*#__PURE__*/React.createElement("div", {
    className: "ss-post__tags"
  }, category ? /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    href: tagHref || '/search?q=' + category + '&categoryOnly',
    onClick: e => {
      if (onTag) {
        e.preventDefault();
        onTag(category);
      }
    }
  }, category) : null, formats.map(f => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: f,
    variant: "muted"
  }, MEDIA[f]))) : null), thumbnail && image ? /*#__PURE__*/React.createElement("img", {
    className: "ss-post__thumb",
    src: image,
    width: "120",
    height: "80",
    alt: "",
    loading: "lazy"
  }) : null, /*#__PURE__*/React.createElement("span", {
    className: "ss-post__time"
  }, readingTime ? readingTime + ' min' : ''));
}
Object.assign(__ds_scope, { PostItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PostItem.jsx", error: String((e && e.message) || e) }); }

// components/core/ThemeToggle.jsx
try { (() => {
function ThemeToggle({
  theme = 'light',
  onChange
}) {
  const dark = theme === 'dark';
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ss-icon-btn",
    "aria-pressed": dark,
    onClick: () => onChange && onChange(dark ? 'light' : 'dark')
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: dark ? 'moon' : 'sun'
  }), /*#__PURE__*/React.createElement("span", {
    className: "ss-sr-only"
  }, dark ? 'Switch to light mode' : 'Switch to dark mode'));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BackButton.jsx
try { (() => {
function BackButton({
  href = '/',
  label = 'All articles',
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: "ss-back",
    href: href,
    onClick: e => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevronLeft",
    size: 12
  }), label);
}
Object.assign(__ds_scope, { BackButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BackButton.jsx", error: String((e && e.message) || e) }); }

// components/navigation/CategoryTabs.jsx
try { (() => {
function CategoryTabs({
  categories = [],
  active = 'all',
  onChange,
  counts,
  hrefFor = id => id === 'all' ? '/' : '/' + id,
  label = 'Filter articles by topic'
}) {
  const all = [{
    id: 'all',
    label: 'All'
  }, ...categories.map(c => typeof c === 'string' ? {
    id: c,
    label: c.charAt(0).toUpperCase() + c.slice(1)
  } : c)];
  return /*#__PURE__*/React.createElement("ul", {
    className: "ss-tabs",
    "aria-label": label
  }, all.map(c => {
    const n = c.count != null ? c.count : counts ? counts[c.id] : undefined;
    return /*#__PURE__*/React.createElement("li", {
      key: c.id
    }, /*#__PURE__*/React.createElement("a", {
      className: "ss-tab",
      href: hrefFor(c.id),
      "aria-current": active === c.id ? 'page' : undefined,
      onClick: e => {
        if (onChange) {
          e.preventDefault();
          onChange(c.id);
        }
      }
    }, c.label, n != null ? /*#__PURE__*/React.createElement("span", {
      className: "ss-tab__count",
      "aria-label": '(' + n + ' articles)'
    }, n) : null));
  }));
}
Object.assign(__ds_scope, { CategoryTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/CategoryTabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
const DEFAULT_SOCIAL = [{
  id: 'github',
  label: 'GitHub',
  href: 'https://github.com/sesigl'
}, {
  id: 'linkedin',
  label: 'LinkedIn',
  href: 'https://www.linkedin.com/in/sesigl/'
}, {
  id: 'x',
  label: 'X (Twitter)',
  href: 'https://twitter.com/sesigl'
}, {
  id: 'instagram',
  label: 'Instagram',
  href: 'https://www.instagram.com/sesigl89/'
}, {
  id: 'facebook',
  label: 'Facebook',
  href: 'https://www.facebook.com/profile.php?id=100086253756321'
}, {
  id: 'patreon',
  label: 'Patreon',
  href: 'https://patreon.com/SebastianSigl'
}];
function Footer({
  social = DEFAULT_SOCIAL,
  owner = 'Sebastian Sigl',
  imprintHref = '/imprint',
  onImprint,
  rssHref
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "ss-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-footer__inner"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ss-footer__copy"
  }, "\xA9 ", new Date().getFullYear(), " ", owner), /*#__PURE__*/React.createElement("ul", {
    className: "ss-footer__links",
    "aria-label": "Social and legal links"
  }, social.map(s => /*#__PURE__*/React.createElement("li", {
    key: s.id
  }, /*#__PURE__*/React.createElement("a", {
    className: "ss-icon-btn",
    href: s.href,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": s.label + ' (opens in a new tab)'
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: s.id,
    size: 16
  })))), /*#__PURE__*/React.createElement("li", {
    "aria-hidden": "true",
    className: "ss-footer__sep"
  }), rssHref ? /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "ss-footer__text",
    href: rssHref
  }, "RSS")) : null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "ss-footer__text",
    href: imprintHref,
    onClick: e => {
      if (onImprint) {
        e.preventDefault();
        onImprint();
      }
    }
  }, "Imprint")))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SideNav.jsx
try { (() => {
const DEFAULT_ITEMS = [{
  id: 'home',
  label: 'Writing',
  icon: 'home',
  href: '/'
}, {
  id: 'search',
  label: 'Search',
  icon: 'search',
  href: '/search'
}, {
  id: 'about',
  label: 'About',
  icon: 'about',
  href: '/about'
}, {
  id: 'subscribe',
  label: 'Subscribe',
  icon: 'subscribe',
  href: '/subscribe'
}];
function SideNav({
  active,
  items = DEFAULT_ITEMS,
  onNavigate,
  label = 'Primary'
}) {
  const go = it => e => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(it.id);
    }
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: "ss-rail",
    "aria-label": label
  }, /*#__PURE__*/React.createElement("ul", {
    className: "ss-rail__list"
  }, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it.id
  }, /*#__PURE__*/React.createElement("a", {
    className: "ss-rail__link",
    href: it.href,
    "aria-current": active === it.id ? 'page' : undefined,
    onClick: go(it)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: it.icon,
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    className: "ss-rail__label"
  }, it.label))))));
}
Object.assign(__ds_scope, { SideNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SideNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
const DEFAULT_NAV = [{
  id: 'home',
  label: 'Writing',
  href: '/'
}, {
  id: 'about',
  label: 'About',
  href: '/about'
}];
function TopBar({
  brand = 'sebastian.sigl',
  homeHref = '/',
  onHome,
  nav = DEFAULT_NAV,
  active,
  onNavigate,
  query = '',
  onSearch,
  searchAction = '/search',
  theme,
  onThemeChange,
  subscribeHref = '/subscribe',
  onSubscribe,
  shortcut = true
}) {
  const [q, setQ] = React.useState(query);
  const ref = React.useRef(null);
  React.useEffect(() => setQ(query), [query]);
  React.useEffect(() => {
    if (!shortcut) return undefined;
    const on = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        const el = document.getElementById('search');
        if (el) {
          e.preventDefault();
          el.focus();
          el.select();
        }
      }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [shortcut]);
  const nav$ = it => e => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(it.id);
    }
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "ss-topbar",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-topbar__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ss-brand",
    href: homeHref,
    onClick: e => {
      if (onHome) {
        e.preventDefault();
        onHome();
      }
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-brand__mark",
    "aria-hidden": "true"
  }), brand), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Primary"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "ss-topnav"
  }, nav.map(it => /*#__PURE__*/React.createElement("li", {
    key: it.id
  }, /*#__PURE__*/React.createElement("a", {
    href: it.href,
    "aria-current": active === it.id ? 'page' : undefined,
    onClick: nav$(it)
  }, it.label))))), /*#__PURE__*/React.createElement("form", {
    className: "ss-topbar__search",
    role: "search",
    method: "get",
    action: searchAction,
    onSubmit: e => {
      if (onSearch) {
        e.preventDefault();
        onSearch(q.trim());
      }
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: "search",
    type: "search",
    name: "q",
    icon: "search",
    label: "Search articles",
    hideLabel: true,
    placeholder: "Search articles",
    value: q,
    onChange: e => setQ(e.target.value),
    end: shortcut ? /*#__PURE__*/React.createElement("kbd", null, "\u2318K") : null
  })), /*#__PURE__*/React.createElement("div", {
    className: "ss-topbar__actions"
  }, /*#__PURE__*/React.createElement(__ds_scope.ThemeToggle, {
    theme: theme,
    onChange: onThemeChange
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    className: "ss-topbar__subscribe",
    href: subscribeHref,
    onClick: e => {
      if (onSubscribe) {
        e.preventDefault();
        onSubscribe();
      }
    }
  }, "Subscribe"))));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// components/widgets/BookWidget.jsx
try { (() => {
function BookWidget({
  title = 'Free Notion Templates',
  text = 'The templates I use to plan work, write and run 1:1s.',
  cover,
  href = 'https://sesigl.gumroad.com/'
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    as: "section"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ss-widget__book",
    href: href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, cover ? /*#__PURE__*/React.createElement("img", {
    className: "ss-widget__cover",
    src: cover,
    width: "72",
    height: "92",
    alt: ""
  }) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
    className: "ss-widget"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-kicker"
  }, "Free \xB7 Gumroad \u2197"), /*#__PURE__*/React.createElement("span", {
    className: "ss-widget__title",
    style: {
      fontSize: 'var(--fs-base)'
    }
  }, title), text ? /*#__PURE__*/React.createElement("span", {
    className: "ss-widget__text"
  }, text) : null), /*#__PURE__*/React.createElement("span", {
    className: "ss-sr-only"
  }, "(opens Gumroad in a new tab)")));
}
Object.assign(__ds_scope, { BookWidget });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/widgets/BookWidget.jsx", error: String((e && e.message) || e) }); }

// components/widgets/PopularPostsWidget.jsx
try { (() => {
function PopularPostsWidget({
  title = 'Popular',
  posts = [],
  onOpen
}) {
  const id = React.useId();
  return /*#__PURE__*/React.createElement("section", {
    className: "ss-widget",
    "aria-labelledby": id
  }, /*#__PURE__*/React.createElement("h2", {
    id: id,
    className: "ss-kicker"
  }, title), /*#__PURE__*/React.createElement("ol", {
    className: "ss-widget__list"
  }, posts.map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: p.href || '#',
    onClick: e => {
      if (onOpen) {
        e.preventDefault();
        onOpen(p, i);
      }
    }
  }, p.title)))));
}
Object.assign(__ds_scope, { PopularPostsWidget });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/widgets/PopularPostsWidget.jsx", error: String((e && e.message) || e) }); }

// components/widgets/SubscribeForm.jsx
try { (() => {
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function SubscribeForm({
  layout = 'stacked',
  onSubmit,
  status: controlled,
  placeholder = 'Your email…',
  buttonLabel = 'Subscribe'
}) {
  const [email, setEmail] = React.useState('');
  const [local, setLocal] = React.useState('idle');
  const [err, setErr] = React.useState('');
  const status = controlled || local;
  const id = React.useId();
  const submit = async e => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setErr('Please enter a valid email address.');
      return;
    }
    setErr('');
    setLocal('loading');
    try {
      await (onSubmit ? onSubmit(email) : new Promise(r => setTimeout(r, 900)));
      setLocal('success');
    } catch (x) {
      setLocal('error');
    }
  };
  if (status === 'success') {
    return /*#__PURE__*/React.createElement("p", {
      className: "ss-alert ss-alert--success",
      role: "status",
      style: {
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Thanks for subscribing!"));
  }
  const inline = layout === 'inline';
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    style: inline ? {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      maxWidth: 448
    } : {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: inline ? {
      flex: '1 1 220px'
    } : undefined
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: id,
    type: "email",
    autoComplete: "email",
    label: "Your email",
    hideLabel: true,
    placeholder: placeholder,
    size: inline ? 'lg' : 'md',
    value: email,
    onChange: e => {
      setEmail(e.target.value);
      if (err) setErr('');
    },
    error: err || undefined,
    required: true
  })), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    size: inline ? 'md' : 'sm',
    block: !inline,
    loading: status === 'loading',
    style: inline ? {
      minHeight: 40
    } : undefined
  }, status === 'loading' ? 'Subscribing…' : buttonLabel), status === 'error' ? /*#__PURE__*/React.createElement("p", {
    className: "ss-field__error",
    role: "alert",
    style: {
      flexBasis: '100%',
      textAlign: inline ? 'left' : 'center'
    }
  }, "Something went wrong. Please try again.") : null);
}
Object.assign(__ds_scope, { SubscribeForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/widgets/SubscribeForm.jsx", error: String((e && e.message) || e) }); }

// components/widgets/NewsletterWidget.jsx
try { (() => {
function NewsletterWidget({
  avatars = [],
  kicker = 'Newsletter',
  title = 'Big tech from the inside.',
  subtitle = 'New articles on engineering and leadership, straight to your inbox. No spam, unsubscribe anytime.',
  proof = 'Join 100K+ developers',
  onSubmit,
  status
}) {
  const id = React.useId();
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    as: "section",
    "aria-labelledby": id
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-widget"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-kicker"
  }, kicker), /*#__PURE__*/React.createElement("h2", {
    id: id,
    className: "ss-widget__title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "ss-widget__text"
  }, subtitle), /*#__PURE__*/React.createElement(__ds_scope.SubscribeForm, {
    onSubmit: onSubmit,
    status: status
  }), avatars.length ? /*#__PURE__*/React.createElement("div", {
    className: "ss-widget__foot"
  }, /*#__PURE__*/React.createElement(__ds_scope.AvatarStack, {
    avatars: avatars.slice(0, 4),
    label: "Newsletter readers"
  }), proof) : null));
}
Object.assign(__ds_scope, { NewsletterWidget });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/widgets/NewsletterWidget.jsx", error: String((e && e.message) || e) }); }

// explorations/home/shared.js
try { (() => {
// Shared helpers for the home-page direction explorations.
(function () {
  const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fmt = (d, style) => {
    const [y, m, day] = d.split('-');
    return style === 'iso' ? d : style === 'short' ? M[+m - 1] + ' ' + +day : M[+m - 1] + ' ' + +day + ', ' + y;
  };
  const media = p => Object.keys(p.media || {}).filter(k => p.media[k] && p.media[k] !== '#');
  const MEDIA_LABEL = {
    spotify: 'Podcast',
    youtube: 'Video',
    infographic: 'Infographic'
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  })[c]);
  function theme(key) {
    const root = document.documentElement;
    const saved = localStorage.getItem(key);
    const set = t => {
      root.dataset.theme = t;
      localStorage.setItem(key, t);
      document.querySelectorAll('[data-theme-toggle]').forEach(b => {
        b.setAttribute('aria-pressed', t === 'dark');
        b.querySelector('[data-theme-label]') && (b.querySelector('[data-theme-label]').textContent = t === 'dark' ? 'Dark' : 'Light');
      });
    };
    set(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-theme-toggle]');
      if (b) set(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }
  function filterable(render) {
    let cat = 'all',
      q = '';
    const run = () => render(SS_DATA.posts.filter(p => (cat === 'all' || p.category === cat) && (!q || (p.title + ' ' + p.description).toLowerCase().includes(q))), {
      cat,
      q
    });
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-cat]');
      if (!b) return;
      cat = b.dataset.cat;
      document.querySelectorAll('[data-cat]').forEach(x => x.setAttribute('aria-pressed', x.dataset.cat === cat));
      run();
    });
    document.addEventListener('input', e => {
      if (e.target.matches('[data-search]')) {
        q = e.target.value.trim().toLowerCase();
        run();
      }
    });
    document.addEventListener('submit', e => {
      if (e.target.matches('[data-sub]')) {
        e.preventDefault();
        const f = e.target;
        f.querySelector('[data-sub-msg]').textContent = 'Check your inbox to confirm.';
        f.reset();
      }
      if (e.target.matches('[data-search-form]')) e.preventDefault();
    });
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        const s = document.querySelector('[data-search]');
        if (s) {
          e.preventDefault();
          s.focus();
        }
      }
    });
    run();
  }
  window.HX = {
    fmt,
    media,
    MEDIA_LABEL,
    esc,
    theme,
    filterable,
    count: c => SS_DATA.posts.filter(p => c === 'all' || p.category === c).length
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/home/shared.js", error: String((e && e.message) || e) }); }

// ui_kits/website/AdminScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Newsletter admin — Editor.tsx + ProgressTracker.tsx (email body editor is Yoopta in production; simplified here).
const AD = window.SebastianSiglDesignSystem_0b5f4d;
const SUBJECT = {
  min: 20,
  max: 60,
  recommended: 40
};
const PREVIEW = {
  min: 40,
  max: 120,
  recommended: 80
};
function AdminScreen({
  go
}) {
  const [campaign, setCampaign] = React.useState('weekly-update-2026-09');
  const [subject, setSubject] = React.useState('MCP servers have a context cost');
  const [preview, setPreview] = React.useState('Some tools require MCP. Most don’t. Here’s how to tell the difference.');
  const [body, setBody] = React.useState('Hi there,\n\nI counted the tool definitions loaded into my agent’s context last week…');
  const [err, setErr] = React.useState('');
  const [run, setRun] = React.useState(null);
  const timer = React.useRef();
  React.useEffect(() => () => clearInterval(timer.current), []);
  const send = isTest => {
    if (!campaign.trim()) {
      setErr('Enter a campaign title to track and resume sending.');
      return;
    }
    setErr('');
    clearInterval(timer.current);
    const total = isTest ? 1 : 12480;
    setRun({
      isTest,
      status: 'pending',
      processed: 0,
      total
    });
    timer.current = setInterval(() => setRun(r => {
      if (!r) return r;
      const step = isTest ? 1 : Math.ceil(total / 6);
      const processed = Math.min(r.total, r.processed + step);
      const done = processed >= r.total;
      if (done) clearInterval(timer.current);
      return {
        ...r,
        processed,
        status: done ? 'completed' : 'in_progress'
      };
    }), 900);
  };
  const busy = run && run.status !== 'completed' && run.status !== 'failed';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    className: "ss-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-topbar__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ss-brand",
    href: "#/"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-brand__mark",
    "aria-hidden": "true"
  }), "sebastian.sigl"), /*#__PURE__*/React.createElement("span", {
    className: "ss-kicker"
  }, "/ newsletter"), /*#__PURE__*/React.createElement("span", {
    className: "ss-badge ss-badge--neutral"
  }, "Admin"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(AD.Button, {
    variant: "ghost",
    size: "sm",
    href: "#/"
  }, "View site"))), /*#__PURE__*/React.createElement("main", {
    id: "main",
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '40px 24px 64px',
      display: 'grid',
      gap: 32,
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("form", {
    className: "ss-stack-4",
    onSubmit: e => {
      e.preventDefault();
      send(false);
    },
    "aria-labelledby": "compose"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-kicker"
  }, "01 \xB7 Compose"), /*#__PURE__*/React.createElement("h1", {
    id: "compose",
    className: "ss-h2"
  }, "New campaign"), /*#__PURE__*/React.createElement(AD.Input, {
    label: "Campaign title",
    hint: "Used for tracking and resuming a send.",
    value: campaign,
    onChange: e => setCampaign(e.target.value),
    error: err || undefined,
    placeholder: "e.g., weekly-update-2024-01"
  }), /*#__PURE__*/React.createElement(AD.Input, {
    label: "Newsletter subject",
    value: subject,
    onChange: e => setSubject(e.target.value),
    placeholder: 'Recommended ' + SUBJECT.recommended + ' characters',
    counter: /*#__PURE__*/React.createElement(AD.CharacterCount, _extends({
      current: subject.length
    }, SUBJECT))
  }), /*#__PURE__*/React.createElement(AD.Input, {
    label: "Preview text",
    value: preview,
    onChange: e => setPreview(e.target.value),
    placeholder: 'Recommended ' + PREVIEW.recommended + ' characters',
    counter: /*#__PURE__*/React.createElement(AD.CharacterCount, _extends({
      current: preview.length
    }, PREVIEW))
  }), /*#__PURE__*/React.createElement(AD.Input, {
    label: "Email body",
    multiline: true,
    rows: 8,
    value: body,
    onChange: e => setBody(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(AD.Button, {
    type: "submit",
    loading: busy && !run.isTest,
    disabled: busy
  }, busy && !run.isTest ? 'Sending…' : 'Send'), /*#__PURE__*/React.createElement(AD.Button, {
    variant: "secondary",
    disabled: busy,
    onClick: () => send(true)
  }, "Send Test"), /*#__PURE__*/React.createElement(AD.Button, {
    variant: "ghost",
    onClick: () => console.log(body)
  }, "Log Test"), /*#__PURE__*/React.createElement(AD.Button, {
    variant: "ghost",
    onClick: () => {
      clearInterval(timer.current);
      setRun(null);
      setSubject('');
      setPreview('');
      setCampaign('');
    }
  }, "Reset"))), /*#__PURE__*/React.createElement("section", {
    className: "ss-stack-4",
    "aria-labelledby": "progress-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-kicker"
  }, "02 \xB7 Delivery"), /*#__PURE__*/React.createElement("h2", {
    id: "progress-h",
    className: "ss-h2"
  }, "Status"), run ? /*#__PURE__*/React.createElement(AD.ProgressTracker, {
    campaignTitle: campaign,
    status: run.status,
    processedCount: run.processed,
    totalRecipients: run.total,
    isTest: run.isTest,
    testRecipient: "your test inbox"
  }) : /*#__PURE__*/React.createElement(AD.Alert, {
    tone: "neutral"
  }, "No campaign running. Send a test first \u2014 it goes to your own inbox only."), run && run.status === 'completed' ? /*#__PURE__*/React.createElement(AD.Alert, {
    tone: "success",
    title: "Sent."
  }, run.total.toLocaleString('en-US'), " ", run.total === 1 ? 'recipient' : 'recipients', " received \u201C", subject, "\u201D.") : null)));
}
Object.assign(window, {
  AdminScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AdminScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ArticleScreen.jsx
try { (() => {
// Blog post — reading layout: progress bar, numbered TOC, masthead, prose, next article, sidebar.
const {
  ArticleHeader,
  Prose,
  NewsletterWidget: NW,
  PopularPostsWidget,
  BackButton: Back,
  TableOfContents,
  ReadingProgress,
  Tag: ATag,
  ShareButtons: Share,
  SubscribeForm: SF
} = window.SebastianSiglDesignSystem_0b5f4d;
const TOC = [{
  id: 'only-option',
  label: 'Where MCP is the only option'
}, {
  id: 'cli-first',
  label: 'When a CLI does the job'
}, {
  id: 'scope',
  label: 'Scope it per project, not globally'
}, {
  id: 'earn-it',
  label: 'Make every server earn its cost'
}];
function ArticleScreen({
  slug,
  go
}) {
  const D = window.SS_DATA;
  const post = D.posts.find(p => p.slug === slug) || D.posts[0];
  const i = D.posts.indexOf(post);
  const next = D.posts[(i + 1) % D.posts.length];
  const others = D.posts.filter(p => p.slug !== post.slug).slice(0, 4);
  const icons = {
    spotify: D.A + 'icons/spotify.svg',
    youtube: D.A + 'icons/youtube.svg',
    infographic: D.A + 'icons/infographic.svg'
  };
  const url = 'https://www.sebastiansigl.com/posts/' + post.slug;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ReadingProgress, {
    targetId: "article"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ss-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__col"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Back, {
    href: "#/",
    onClick: () => go('back')
  })), /*#__PURE__*/React.createElement("div", {
    className: "ss-article"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "ss-article__toc"
  }, /*#__PURE__*/React.createElement(TableOfContents, {
    items: TOC
  })), /*#__PURE__*/React.createElement("article", {
    id: "article",
    className: "ss-article__body"
  }, /*#__PURE__*/React.createElement(ArticleHeader, {
    title: post.title,
    description: post.description,
    date: post.date,
    readingTime: post.readingTime,
    category: post.category,
    categoryHref: '#/' + post.category,
    url: url,
    media: post.media,
    mediaIcons: icons
  }), /*#__PURE__*/React.createElement(Prose, null, /*#__PURE__*/React.createElement("p", null, "I counted the tool definitions loaded into my agent's context last week. 67,000 tokens. Before I typed a single prompt."), /*#__PURE__*/React.createElement("p", null, "Four MCP servers, 50+ tool definitions, most of which my agent never called. I removed three of them. Same workflow, same results. The difference was that my agent stopped losing track of the codebase context halfway through conversations."), /*#__PURE__*/React.createElement("p", null, "The problem is not MCP. The problem is using it where you do not need to."), /*#__PURE__*/React.createElement("h2", {
    id: "only-option"
  }, "Where MCP Is the Only Option"), /*#__PURE__*/React.createElement("p", null, "There is a category of tools where MCP is not a preference. It is the only viable architecture. ", /*#__PURE__*/React.createElement("strong", null, "Browser control is the clearest example."), " You cannot ", /*#__PURE__*/React.createElement("code", null, "gh browse"), " your way into a browser session."), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Browser control"), /*#__PURE__*/React.createElement("li", null, "Live research and fetch"), /*#__PURE__*/React.createElement("li", null, "Stateful database sessions")), /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("img", {
    src: D.A + 'images/posts/agentic-pair-programming.jpg',
    alt: "Illustration of an engineer pairing with an AI agent"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Fig. 1 \u2014 Every loaded tool definition competes with your code for the same context window.")), /*#__PURE__*/React.createElement("h2", {
    id: "cli-first"
  }, "When a CLI Does the Job"), /*#__PURE__*/React.createElement("p", null, "Most integrations already ship a command-line tool the agent can call directly. ", /*#__PURE__*/React.createElement("code", null, "gh"), ", ", /*#__PURE__*/React.createElement("code", null, "kubectl"), " and ", /*#__PURE__*/React.createElement("code", null, "aws"), " cost nothing until they are used, and their output is already shaped for a terminal."), /*#__PURE__*/React.createElement("h2", {
    id: "scope"
  }, "Scope It Per Project, Not Globally"), /*#__PURE__*/React.createElement("p", null, "The project-scoped ", /*#__PURE__*/React.createElement("code", null, ".mcp.json"), " is the one that matters most:"), /*#__PURE__*/React.createElement("pre", {
    "data-lang": "json"
  }, /*#__PURE__*/React.createElement("code", null, `{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-chrome-devtools"]
    }
  }
}`)), /*#__PURE__*/React.createElement("h2", {
    id: "earn-it"
  }, "Make Every Server Earn Its Cost"), /*#__PURE__*/React.createElement("blockquote", null, "The question is not whether to use MCP. The question is whether each server you have loaded is earning its context cost."), /*#__PURE__*/React.createElement("p", null, "Read more in ", /*#__PURE__*/React.createElement("a", {
    href: '#/blog/' + others[0].slug
  }, others[0].title), ".")), /*#__PURE__*/React.createElement("footer", {
    className: "ss-article-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-row",
    style: {
      justifyContent: 'space-between',
      paddingTop: 20,
      borderTop: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-row",
    style: {
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-kicker"
  }, "Filed under"), /*#__PURE__*/React.createElement(ATag, {
    href: '#/' + post.category
  }, post.category)), /*#__PURE__*/React.createElement(Share, {
    url: url,
    title: post.title
  })), /*#__PURE__*/React.createElement("a", {
    className: "ss-next",
    href: '#/blog/' + next.slug
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-kicker"
  }, "Next article \u2192"), /*#__PURE__*/React.createElement("span", {
    className: "ss-next__title"
  }, next.title), /*#__PURE__*/React.createElement("span", {
    className: "ss-muted",
    style: {
      fontSize: 'var(--fs-sm)'
    }
  }, next.readingTime, " min read")), /*#__PURE__*/React.createElement("section", {
    className: "ss-card",
    "aria-labelledby": "end-nl",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-kicker"
  }, "Newsletter"), /*#__PURE__*/React.createElement("h2", {
    id: "end-nl",
    className: "ss-h4"
  }, "Get the next article by email."), /*#__PURE__*/React.createElement(SF, {
    layout: "inline",
    placeholder: "you@company.com"
  })))))), /*#__PURE__*/React.createElement("aside", {
    className: "ss-page__aside",
    "aria-label": "Sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__sticky"
  }, /*#__PURE__*/React.createElement(NW, {
    avatars: D.avatars
  }), /*#__PURE__*/React.createElement(PopularPostsWidget, {
    posts: others.map(p => ({
      title: p.title,
      href: '#/blog/' + p.slug
    }))
  })))));
}
Object.assign(window, {
  ArticleScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ArticleScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Home (index), topic filter and search screens.
const {
  Hero,
  CategoryTabs,
  PostItem,
  TalkCard,
  ProjectCard,
  NewsletterWidget,
  BookWidget,
  BackButton,
  Input,
  Button
} = window.SebastianSiglDesignSystem_0b5f4d;
function fmtLong(d) {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
function PostList({
  posts,
  go,
  numbered = true,
  showTopic = true
}) {
  const D = window.SS_DATA;
  return /*#__PURE__*/React.createElement("ol", {
    className: "ss-post-list"
  }, posts.map(p => /*#__PURE__*/React.createElement("li", {
    key: p.slug
  }, /*#__PURE__*/React.createElement(PostItem, _extends({}, p, {
    index: numbered ? D.posts.length - D.posts.indexOf(p) : undefined,
    showTags: showTopic,
    href: '#/blog/' + p.slug,
    tagHref: '#/search?q=' + p.category + '&categoryOnly',
    onOpen: () => go('article', {
      slug: p.slug
    })
  })))));
}
function HomeScreen({
  category = 'all',
  go
}) {
  const D = window.SS_DATA;
  const posts = category === 'all' ? D.posts : D.posts.filter(p => p.category === category);
  const counts = {
    all: D.posts.length,
    tech: D.posts.filter(p => p.category === 'tech').length,
    leadership: D.posts.filter(p => p.category === 'leadership').length
  };
  const withMedia = D.posts.filter(p => p.media && Object.values(p.media).some(v => v && v !== '#')).length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    stats: [{
      label: 'Articles',
      value: String(D.posts.length).padStart(2, '0')
    }, {
      label: 'Latest',
      value: fmtLong(D.posts[0].date)
    }, {
      label: 'With podcast / video',
      value: String(withMedia).padStart(2, '0')
    }, {
      label: 'Topics',
      value: 'Tech · Leadership'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    className: "ss-page ss-page--home"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__col"
  }, /*#__PURE__*/React.createElement("section", {
    "aria-labelledby": "latest"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "latest",
    className: "ss-sr-only"
  }, "Articles"), /*#__PURE__*/React.createElement("div", {
    className: "ss-toolbar"
  }, /*#__PURE__*/React.createElement(CategoryTabs, {
    categories: ['tech', 'leadership'],
    active: category,
    counts: counts,
    hrefFor: c => c === 'all' ? '#/' : '#/' + c
  }), /*#__PURE__*/React.createElement("span", {
    className: "ss-toolbar__end",
    "aria-live": "polite"
  }, posts.length, " ", posts.length === 1 ? 'article' : 'articles')), /*#__PURE__*/React.createElement(PostList, {
    posts: posts,
    go: go
  })), /*#__PURE__*/React.createElement("section", {
    className: "ss-section",
    "aria-labelledby": "talks"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-section-head__n"
  }, "02"), /*#__PURE__*/React.createElement("h2", {
    id: "talks",
    className: "ss-section-title"
  }, "Talks"), /*#__PURE__*/React.createElement("span", {
    className: "ss-section-head__end"
  }, "Video")), /*#__PURE__*/React.createElement("div", {
    className: "ss-grid-2"
  }, D.talks.map(t => /*#__PURE__*/React.createElement(TalkCard, _extends({
    key: t.title
  }, t))))), /*#__PURE__*/React.createElement("section", {
    className: "ss-section",
    "aria-labelledby": "projects"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-section-head__n"
  }, "03"), /*#__PURE__*/React.createElement("h2", {
    id: "projects",
    className: "ss-section-title"
  }, "Projects"), /*#__PURE__*/React.createElement("span", {
    className: "ss-section-head__end"
  }, "Open source \xB7 Products")), /*#__PURE__*/React.createElement("div", {
    className: "ss-grid-2"
  }, D.projects.map(p => /*#__PURE__*/React.createElement(ProjectCard, _extends({
    key: p.title
  }, p)))))), /*#__PURE__*/React.createElement("aside", {
    className: "ss-page__aside",
    "aria-label": "Sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__sticky"
  }, /*#__PURE__*/React.createElement(NewsletterWidget, {
    avatars: D.avatars
  }), /*#__PURE__*/React.createElement(BookWidget, {
    cover: D.A + 'images/notion-templates-book.png'
  })))));
}
function SearchScreen({
  query = '',
  categoryOnly = false,
  go
}) {
  const D = window.SS_DATA;
  const [q, setQ] = React.useState(query);
  React.useEffect(() => setQ(query), [query]);
  const t = query.toLowerCase();
  const results = t ? D.posts.filter(p => categoryOnly ? p.category === t : (p.title + ' ' + p.description + ' ' + p.category).toLowerCase().includes(t)) : [];
  return /*#__PURE__*/React.createElement("div", {
    className: "ss-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-stack-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BackButton, {
    href: "#/",
    onClick: () => go('back')
  })), /*#__PURE__*/React.createElement("div", {
    className: "ss-stack-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-kicker"
  }, categoryOnly ? 'Topic' : 'Search'), /*#__PURE__*/React.createElement("h1", {
    className: "ss-h1",
    "aria-live": "polite"
  }, query ? categoryOnly ? /*#__PURE__*/React.createElement(React.Fragment, null, "Articles in \u201C", query, "\u201D") : /*#__PURE__*/React.createElement(React.Fragment, null, "Results for \u201C", query, "\u201D") : 'Search the archive'), /*#__PURE__*/React.createElement("form", {
    role: "search",
    onSubmit: e => {
      e.preventDefault();
      if (q.trim()) go('search', {
        query: q.trim()
      });
    },
    style: {
      display: 'flex',
      gap: 8,
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Input, {
    id: "search-page",
    type: "search",
    icon: "search",
    size: "lg",
    label: "Search articles",
    hideLabel: true,
    placeholder: "Try \u201Csearch\u201D, \u201CAI\u201D or \u201Cleadership\u201D",
    value: q,
    onChange: e => setQ(e.target.value)
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    size: "lg"
  }, "Search"))), /*#__PURE__*/React.createElement("div", null, query ? /*#__PURE__*/React.createElement("div", {
    className: "ss-toolbar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-kicker"
  }, results.length, " ", results.length === 1 ? 'article' : 'articles')) : null, results.length ? /*#__PURE__*/React.createElement(PostList, {
    posts: results,
    go: go,
    numbered: false
  }) : query ? /*#__PURE__*/React.createElement("div", {
    className: "ss-empty"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ss-h4"
  }, "No articles match \u201C", query, "\u201D."), /*#__PURE__*/React.createElement("p", null, "Try a broader term, or browse ", /*#__PURE__*/React.createElement("a", {
    href: "#/tech"
  }, "Tech"), " and ", /*#__PURE__*/React.createElement("a", {
    href: "#/leadership"
  }, "Leadership"), ".")) : null))), /*#__PURE__*/React.createElement("aside", {
    className: "ss-page__aside",
    "aria-label": "Sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__sticky"
  }, /*#__PURE__*/React.createElement(BookWidget, {
    cover: D.A + 'images/notion-templates-book.png'
  }))));
}
Object.assign(window, {
  HomeScreen,
  SearchScreen,
  PostList
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PageScreens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// About, Subscribe, Imprint, Unsubscribe, 404.
const DS = window.SebastianSiglDesignSystem_0b5f4d;
function SectionHead({
  n,
  id,
  children,
  end
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ss-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ss-section-head__n"
  }, n), /*#__PURE__*/React.createElement("h2", {
    id: id,
    className: "ss-section-title"
  }, children), end ? /*#__PURE__*/React.createElement("span", {
    className: "ss-section-head__end"
  }, end) : null);
}
function AboutScreen() {
  const D = window.SS_DATA;
  const L = (href, t) => /*#__PURE__*/React.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, t);
  return /*#__PURE__*/React.createElement("div", {
    className: "ss-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-stack-10"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ss-stack-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-kicker"
  }, "About"), /*#__PURE__*/React.createElement("h1", {
    className: "ss-display"
  }, "Hi. I'm Sebastian ", /*#__PURE__*/React.createElement(DS.Highlight, null, "@sesigl"), " Sigl."), /*#__PURE__*/React.createElement("p", {
    className: "ss-lede",
    style: {
      maxWidth: '60ch'
    }
  }, "Staff Engineer at Adevinta, supporting the teams behind search on Kleinanzeigen. 18+ years building high-load systems, data products and platforms."), /*#__PURE__*/React.createElement("img", {
    src: D.A + 'images/about.png',
    alt: "Sebastian Sigl speaking on stage",
    style: {
      width: '100%',
      borderRadius: 4,
      border: '1px solid var(--border-default)'
    }
  })), /*#__PURE__*/React.createElement("section", {
    "aria-labelledby": "bio",
    className: "ss-stack-4"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    n: "01",
    id: "bio"
  }, "Short Bio"), /*#__PURE__*/React.createElement("p", {
    className: "ss-muted",
    style: {
      maxWidth: '68ch'
    }
  }, "I am a seasoned software engineer with over 18 years of experience across various domains. In recent years, my focus has been on high-load server-side projects, data- and machine-learning-driven applications, and platform development, where I love tinkering with infrastructure, containers, and Cloud Native technologies.")), /*#__PURE__*/React.createElement("section", {
    "aria-labelledby": "career",
    className: "ss-stack-4"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    n: "02",
    id: "career"
  }, "Career"), /*#__PURE__*/React.createElement("p", {
    className: "ss-muted",
    style: {
      maxWidth: '68ch'
    }
  }, "As a Staff Engineer at Adevinta, I have the honor of supporting multiple teams dedicated to delivering the best possible content based on first and third-party data. I am privileged to empower multiple teams in ", L('https://www.kleinanzeigen.de/', 'Kleinanzeigen'), ", one of the largest and most renowned classifieds market in the world.")), /*#__PURE__*/React.createElement("section", {
    "aria-labelledby": "exp"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    n: "03",
    id: "exp",
    end: D.experience.length + ' roles'
  }, "Experience"), /*#__PURE__*/React.createElement(DS.ExperienceTimeline, {
    items: D.experience
  })), /*#__PURE__*/React.createElement("section", {
    "aria-labelledby": "connect",
    className: "ss-stack-4"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    n: "04",
    id: "connect"
  }, "Let's Connect"), /*#__PURE__*/React.createElement("p", {
    className: "ss-muted"
  }, "I'm excited to connect with others via ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:support@sebastiansigl.com"
  }, "email"), " and ", L('https://x.com/sesigl', 'X'), " to chat about projects and ideas.")))), /*#__PURE__*/React.createElement("aside", {
    className: "ss-page__aside",
    "aria-label": "Sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__sticky"
  }, /*#__PURE__*/React.createElement(DS.NewsletterWidget, {
    avatars: D.avatars
  }))));
}
function SubscribeScreen() {
  const D = window.SS_DATA;
  return /*#__PURE__*/React.createElement("div", {
    className: "ss-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-stack-10"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ss-stack-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-kicker"
  }, "Newsletter \xB7 Monthly"), /*#__PURE__*/React.createElement("h1", {
    className: "ss-display"
  }, "Never miss an update."), /*#__PURE__*/React.createElement("p", {
    className: "ss-lede",
    style: {
      maxWidth: '60ch'
    }
  }, "This newsletter is written by Sebastian Sigl, who works at Adevinta and previously worked at eBay and other successful companies. Here is what to expect by subscribing:"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement(DS.SubscribeForm, {
    layout: "inline",
    placeholder: "you@company.com"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ss-widget__foot",
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(DS.AvatarStack, {
    avatars: D.avatars,
    label: "Newsletter readers"
  }), "Join 100K+ developers. Unsubscribe anytime."))), /*#__PURE__*/React.createElement("section", {
    "aria-labelledby": "expect"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    n: "01",
    id: "expect"
  }, "What you get"), /*#__PURE__*/React.createElement(DS.CheckList, {
    items: ['Big tech from the inside.', 'Actionable advice for engineering managers, software engineers and tech workers.', 'A pulse on the tech market and scoop worth knowing.', 'An independent viewpoint.']
  })), /*#__PURE__*/React.createElement("section", {
    "aria-labelledby": "readers"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    n: "02",
    id: "readers"
  }, "What readers say"), /*#__PURE__*/React.createElement("div", {
    className: "ss-grid-2"
  }, D.testimonials.map(t => /*#__PURE__*/React.createElement(DS.TestimonialCard, _extends({
    key: t.author
  }, t))))))), /*#__PURE__*/React.createElement("aside", {
    className: "ss-page__aside",
    "aria-label": "Sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__sticky"
  }, /*#__PURE__*/React.createElement(DS.BookWidget, {
    cover: D.A + 'images/notion-templates-book.png'
  }))));
}
function ImprintScreen() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ss-page ss-page--single"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__col"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ss-stack-6 ss-page__narrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-kicker"
  }, "Legal \xB7 Published 3.3.2023"), /*#__PURE__*/React.createElement("h1", {
    className: "ss-h1"
  }, "Imprint"), /*#__PURE__*/React.createElement("p", {
    className: "ss-muted"
  }, "The responsible person/entity within the meaning of \xA7 5 of the Telemedia Act (Telemediengesetz, TMG) for the webpage sebastiansigl.com is:"), /*#__PURE__*/React.createElement("address", {
    className: "ss-card",
    style: {
      fontStyle: 'normal',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-sm)',
      lineHeight: 1.8
    }
  }, "Sebastian Sigl", /*#__PURE__*/React.createElement("br", null), "Roquettestr. 34", /*#__PURE__*/React.createElement("br", null), "01157 Dresden", /*#__PURE__*/React.createElement("br", null), "support [at] sebastiansigl.com"))));
}
function UnsubscribeScreen() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ss-page ss-page--single"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__col"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ss-stack-6 ss-page__narrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-kicker"
  }, "Newsletter"), /*#__PURE__*/React.createElement("h1", {
    className: "ss-h1"
  }, "Unsubscribe successful"), /*#__PURE__*/React.createElement(DS.Alert, {
    tone: "success"
  }, "You won't receive further emails."), /*#__PURE__*/React.createElement("div", {
    className: "ss-muted ss-stack-4"
  }, /*#__PURE__*/React.createElement("p", null, "You have successfully unsubscribed from my newsletter. Thank you for your support so far! If you have any questions or feedback, feel free to reach out at ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:feedback@sebastiansigl.com"
  }, "feedback@sebastiansigl.com"), " or connect with me on my social media pages listed below."), /*#__PURE__*/React.createElement("p", null, "I appreciate your time and hope to hear from you again.")), /*#__PURE__*/React.createElement("div", {
    className: "ss-row",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    variant: "secondary",
    href: "#/subscribe"
  }, "Resubscribe"), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "ghost",
    href: "#/"
  }, "Back to articles")))));
}
function NotFoundScreen() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ss-page ss-page--single"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-page__col"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ss-stack-6 ss-page__narrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ss-kicker"
  }, "Error 404"), /*#__PURE__*/React.createElement("h1", {
    className: "ss-h1"
  }, "Page not found"), /*#__PURE__*/React.createElement("p", {
    className: "ss-muted"
  }, "The page you are looking for doesn't exist or has moved."), /*#__PURE__*/React.createElement("div", {
    className: "ss-row",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    href: "#/"
  }, "Back to articles"), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "secondary",
    href: "#/search"
  }, "Search")))));
}
Object.assign(window, {
  AboutScreen,
  SubscribeScreen,
  ImprintScreen,
  UnsubscribeScreen,
  NotFoundScreen,
  SectionHead
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PageScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// Sample content lifted from sesigl/personal-website (src/content/blog frontmatter, about.astro, subscribe.astro).
(function () {
  const A = '../../assets/';
  window.SS_DATA = {
    A,
    avatars: [1, 2, 3, 4, 5].map(i => A + 'images/avatars/avatar-0' + i + '.jpg'),
    me: A + 'images/me.png',
    posts: [{
      slug: 'mcp-servers-context-cost',
      title: 'MCP Servers Have a Context Cost. Make Sure They Earn It.',
      description: "Some tools require MCP. Most don't. Here's how to tell the difference, scope servers per project, and avoid the context tax that degrades your agent's reasoning.",
      date: '2026-03-20',
      category: 'tech',
      readingTime: 7,
      image: A + 'images/posts/post-thumb-01.jpg',
      media: {
        infographic: 'https://www.sebastiansigl.com/infographics/mcp-servers-context-cost.html'
      }
    }, {
      slug: 'bounded-contexts-cognitive-boundaries-ai-humans',
      title: 'Bounded Contexts as Cognitive Boundaries for AI and Humans',
      description: 'Explores how bounded contexts from Domain-Driven Design serve as cognitive boundaries that improve signal-to-noise ratio for both humans and LLMs.',
      date: '2026-02-03',
      category: 'tech',
      readingTime: 12,
      image: A + 'images/posts/post-thumb-02.jpg'
    }, {
      slug: 'lessons-learned-from-building-search',
      title: 'After a Year Rebuilding Search, I Had to Rethink Everything',
      description: "A seasoned engineer's lessons from a year rebuilding a search system from the ground up, shifting from engineering-first to product-first thinking.",
      date: '2025-10-11',
      category: 'tech',
      readingTime: 7,
      image: A + 'images/posts/post-thumb-03.jpg',
      media: {
        spotify: 'https://open.spotify.com/episode/2HuiAEXbAQsl0NsLWBz3GK',
        infographic: 'https://www.sebastiansigl.com/infographics/search-5-lessons-learned.html',
        youtube: 'https://youtu.be/uPLnbPoHBtY'
      }
    }, {
      slug: 'llm-as-a-judge',
      title: 'The 5 Biases That Can Silently Kill Your LLM Evaluations (And How to Fix Them)',
      description: 'Your LLM-as-a-Judge system might be lying to you. This post uncovers 5 critical biases like positional, verbosity, and moderation bias that silently corrupt your AI evaluations.',
      date: '2025-09-19',
      category: 'leadership',
      readingTime: 11,
      image: A + 'images/posts/post-thumb-04.jpg',
      media: {
        spotify: 'https://open.spotify.com/episode/2Mt0aoBVL8x6iP7GoJPasO',
        infographic: 'https://www.sebastiansigl.com/infographics/llm-as-a-judge.html',
        youtube: 'https://youtu.be/C-r2POAIYgU'
      }
    }, {
      slug: 'python-testing-for-better-augmented-coding',
      title: 'Augmented Coding, Amplified Risk: Why Type-Safe Python Tests Matter More Than Ever',
      description: 'AI coding assistants are accelerating development—but also magnifying quality risks. Here’s how to write Python tests that survive refactors.',
      date: '2025-08-10',
      category: 'tech',
      readingTime: 15,
      image: A + 'images/posts/post-thumb-05.jpg',
      media: {
        spotify: 'https://open.spotify.com/episode/7JQcVfeGU5OhiyijMknXMA',
        infographic: 'https://www.sebastiansigl.com/infographics/type-safe-python-tests-in-the-age-of-ai-infographic.html'
      }
    }, {
      slug: 'disciplined-augmentation-augmented-coding-2',
      title: 'Why Most Teams Fail at AI Coding (And the Two Strategies That Actually Work)',
      description: "Most AI coding implementations fail because teams choose the wrong approach for their context. Here's how to pick the strategy that will actually give you a competitive advantage.",
      date: '2025-07-12',
      category: 'tech',
      readingTime: 12,
      image: A + 'images/posts/post-thumb-06.jpg'
    }, {
      slug: 'system-thinking-bathtube',
      title: 'Systems Thinking in Software Engineering: From Overflowing Bathtubs to Sustainable Systems',
      description: 'Stop firefighting software issues and start understanding the underlying system dynamics through Systems Thinking.',
      date: '2025-04-13',
      category: 'leadership',
      readingTime: 13,
      image: A + 'images/posts/post-thumb-07.jpg'
    }, {
      slug: 'separating-decision-gathering-from-decision-making',
      title: 'Separating Decision Gathering from Decision Making',
      description: 'Separating decision gathering from decision making enhances agility by allowing teams to collect diverse input without being slowed by the need for consensus.',
      date: '2024-10-20',
      category: 'leadership',
      readingTime: 8,
      image: A + 'images/posts/post-thumb-08.jpg'
    }],
    talks: [{
      title: 'Data Mesh',
      image: A + 'images/talk-data-mesh.webp',
      href: 'https://www.youtube.com/watch?v=_bmYXWCxF_Q'
    }, {
      title: 'Why Leaders Eat Last?',
      image: A + 'images/talk-why-leaders-eat-last.webp',
      href: 'https://www.youtube.com/watch?v=GE1w8OORirA'
    }],
    projects: [{
      title: 'Skill Match',
      description: 'Finde und buche Experten, Coaches und Trainer basierend auf Skills',
      logo: A + 'logos/skillmatch.svg',
      href: 'https://skillmatch.de/'
    }, {
      title: 'DDD Template for GoLang projects',
      description: 'Domain Driven Design (DDD) template for Golang to properly organize a project with many useful tools set up.',
      logo: A + 'logos/ddd_template_go_v2.png',
      href: 'https://github.com/sesigl/go-project-ddd-template'
    }],
    experience: [{
      start: 'Dec 2022',
      end: 'Present',
      role: 'MTS 2, Software Engineer',
      org: 'Adevinta',
      logo: A + 'logos/adevinta.png',
      description: 'As a Staff Engineer at Adevinta, I am responsible for creating an exceptional search experience for advertising in Germany, seamlessly integrated into Kleinanzeigen, the largest German marketplace, with millions of monthly active users.'
    }, {
      start: 'Oct 2018',
      end: 'Dec 2022',
      role: 'Classifieds Senior Full-Stack Engineer | Tech Lead Advertising',
      org: 'eBay',
      logo: A + 'logos/ebay.png',
      description: 'As a senior Full-Stack Engineer and later as a tech-lead for advertising, I had the privilege of leading a talented team in the development of a cutting-edge global advertising configuration management system.'
    }, {
      start: 'Oct 2016',
      end: 'Sep 2018',
      role: 'Senior Full-Stack Engineer',
      org: 'MisterSpex',
      logo: A + 'logos/mister-spex.png',
      description: 'One of our most noteworthy accomplishments was the creation of an innovative augmented reality application that enabled our customers to virtually try on glasses.'
    }, {
      start: 'Oct 2014',
      end: 'Sep 2016',
      role: 'Mid-Level Backend Engineer',
      org: 'Sopra Steria',
      logo: A + 'logos/sopra-steria.png',
      description: 'I had the opportunity to modernize a Java-Swing Application, extracting both frontend and backend components from a big monolith.'
    }, {
      start: 'Oct 2005',
      end: 'Sep 2014',
      role: 'High School, Computer Science Master & Freelancer',
      org: 'Self-Employed',
      logo: A + 'logos/freelance.png',
      description: 'From my teenage years onwards, coding has been my passion.'
    }],
    testimonials: [{
      title: 'Incredible Value',
      quote: "With Sebastian's help, I quickly acquired the essential skills to progress in my career, and I'm thankful for his resources. I would highly suggest him to others.",
      author: 'Mary Coyle',
      avatar: A + 'images/avatars/testimonial-01.jpg'
    }, {
      title: 'The Best Newsletter',
      quote: "Sebastian provided me with the necessary resources to swiftly acquire the skills needed for career advancement, and I'm grateful. I would definitely endorse him to anyone seeking similar assistance.",
      author: 'Daniel Burka',
      avatar: A + 'images/avatars/testimonial-02.jpg'
    }]
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.CharacterCount = __ds_scope.CharacterCount;

__ds_ns.ProgressTracker = __ds_scope.ProgressTracker;

__ds_ns.ArticleHeader = __ds_scope.ArticleHeader;

__ds_ns.CheckList = __ds_scope.CheckList;

__ds_ns.ExperienceTimeline = __ds_scope.ExperienceTimeline;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.MediaLinks = __ds_scope.MediaLinks;

__ds_ns.PostItem = __ds_scope.PostItem;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.Prose = __ds_scope.Prose;

__ds_ns.ReadingProgress = __ds_scope.ReadingProgress;

__ds_ns.ShareButtons = __ds_scope.ShareButtons;

__ds_ns.TableOfContents = __ds_scope.TableOfContents;

__ds_ns.TalkCard = __ds_scope.TalkCard;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

__ds_ns.AvatarStack = __ds_scope.AvatarStack;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Highlight = __ds_scope.Highlight;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.MetaLine = __ds_scope.MetaLine;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

__ds_ns.BackButton = __ds_scope.BackButton;

__ds_ns.CategoryTabs = __ds_scope.CategoryTabs;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.SideNav = __ds_scope.SideNav;

__ds_ns.TopBar = __ds_scope.TopBar;

__ds_ns.BookWidget = __ds_scope.BookWidget;

__ds_ns.NewsletterWidget = __ds_scope.NewsletterWidget;

__ds_ns.PopularPostsWidget = __ds_scope.PopularPostsWidget;

__ds_ns.SubscribeForm = __ds_scope.SubscribeForm;

})();
