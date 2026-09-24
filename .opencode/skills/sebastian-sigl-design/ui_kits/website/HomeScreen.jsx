// Home (index), topic filter and search screens.
const { Hero, CategoryTabs, PostItem, TalkCard, ProjectCard, NewsletterWidget, BookWidget, BackButton, Input, Button } = window.SebastianSiglDesignSystem_0b5f4d;

function fmtLong(d) { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }); }

function PostList({ posts, go, numbered = true, showTopic = true }) {
  const D = window.SS_DATA;
  return (
    <ol className="ss-post-list">
      {posts.map((p) => (
        <li key={p.slug}>
          <PostItem {...p} index={numbered ? D.posts.length - D.posts.indexOf(p) : undefined} showTags={showTopic} href={'#/blog/' + p.slug}
            tagHref={'#/search?q=' + p.category + '&categoryOnly'} onOpen={() => go('article', { slug: p.slug })} />
        </li>
      ))}
    </ol>
  );
}

function HomeScreen({ category = 'all', go }) {
  const D = window.SS_DATA;
  const posts = category === 'all' ? D.posts : D.posts.filter((p) => p.category === category);
  const counts = { all: D.posts.length, tech: D.posts.filter((p) => p.category === 'tech').length, leadership: D.posts.filter((p) => p.category === 'leadership').length };
  const withMedia = D.posts.filter((p) => p.media && Object.values(p.media).some((v) => v && v !== '#')).length;
  return (
    <>
      <Hero stats={[{ label: 'Articles', value: String(D.posts.length).padStart(2, '0') }, { label: 'Latest', value: fmtLong(D.posts[0].date) }, { label: 'With podcast / video', value: String(withMedia).padStart(2, '0') }, { label: 'Topics', value: 'Tech · Leadership' }]} />
      <div className="ss-page ss-page--home">
        <div className="ss-page__col">
          <section aria-labelledby="latest">
            <h2 id="latest" className="ss-sr-only">Articles</h2>
            <div className="ss-toolbar">
              <CategoryTabs categories={['tech', 'leadership']} active={category} counts={counts} hrefFor={(c) => (c === 'all' ? '#/' : '#/' + c)} />
              <span className="ss-toolbar__end" aria-live="polite">{posts.length} {posts.length === 1 ? 'article' : 'articles'}</span>
            </div>
            <PostList posts={posts} go={go} />
          </section>
          <section className="ss-section" aria-labelledby="talks">
            <div className="ss-section-head"><span className="ss-section-head__n">02</span><h2 id="talks" className="ss-section-title">Talks</h2><span className="ss-section-head__end">Video</span></div>
            <div className="ss-grid-2">{D.talks.map((t) => <TalkCard key={t.title} {...t} />)}</div>
          </section>
          <section className="ss-section" aria-labelledby="projects">
            <div className="ss-section-head"><span className="ss-section-head__n">03</span><h2 id="projects" className="ss-section-title">Projects</h2><span className="ss-section-head__end">Open source · Products</span></div>
            <div className="ss-grid-2">{D.projects.map((p) => <ProjectCard key={p.title} {...p} />)}</div>
          </section>
        </div>
        <aside className="ss-page__aside" aria-label="Sidebar">
          <div className="ss-page__sticky">
            <NewsletterWidget avatars={D.avatars} />
            <BookWidget cover={D.A + 'images/notion-templates-book.png'} />
          </div>
        </aside>
      </div>
    </>
  );
}

function SearchScreen({ query = '', categoryOnly = false, go }) {
  const D = window.SS_DATA;
  const [q, setQ] = React.useState(query);
  React.useEffect(() => setQ(query), [query]);
  const t = query.toLowerCase();
  const results = t ? D.posts.filter((p) => categoryOnly ? p.category === t : (p.title + ' ' + p.description + ' ' + p.category).toLowerCase().includes(t)) : [];
  return (
    <div className="ss-page">
      <div className="ss-page__col">
        <div className="ss-stack-6">
          <div><BackButton href="#/" onClick={() => go('back')} /></div>
          <div className="ss-stack-4">
            <div className="ss-kicker">{categoryOnly ? 'Topic' : 'Search'}</div>
            <h1 className="ss-h1" aria-live="polite">{query ? (categoryOnly ? <>Articles in “{query}”</> : <>Results for “{query}”</>) : 'Search the archive'}</h1>
            <form role="search" onSubmit={(e) => { e.preventDefault(); if (q.trim()) go('search', { query: q.trim() }); }} style={{ display: 'flex', gap: 8, maxWidth: 560 }}>
              <div style={{ flex: 1 }}><Input id="search-page" type="search" icon="search" size="lg" label="Search articles" hideLabel placeholder="Try “search”, “AI” or “leadership”" value={q} onChange={(e) => setQ(e.target.value)} /></div>
              <Button type="submit" size="lg">Search</Button>
            </form>
          </div>
          <div>
            {query ? <div className="ss-toolbar"><span className="ss-kicker">{results.length} {results.length === 1 ? 'article' : 'articles'}</span></div> : null}
            {results.length ? <PostList posts={results} go={go} numbered={false} /> : query ? (
              <div className="ss-empty">
                <p className="ss-h4">No articles match “{query}”.</p>
                <p>Try a broader term, or browse <a href="#/tech">Tech</a> and <a href="#/leadership">Leadership</a>.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <aside className="ss-page__aside" aria-label="Sidebar"><div className="ss-page__sticky"><BookWidget cover={D.A + 'images/notion-templates-book.png'} /></div></aside>
    </div>
  );
}

Object.assign(window, { HomeScreen, SearchScreen, PostList });
