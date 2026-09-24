// Blog post — reading layout: progress bar, numbered TOC, masthead, prose, next article, sidebar.
const { ArticleHeader, Prose, NewsletterWidget: NW, PopularPostsWidget, BackButton: Back, TableOfContents, ReadingProgress, Tag: ATag, ShareButtons: Share, SubscribeForm: SF } = window.SebastianSiglDesignSystem_0b5f4d;

const TOC = [
  { id: 'only-option', label: 'Where MCP is the only option' },
  { id: 'cli-first', label: 'When a CLI does the job' },
  { id: 'scope', label: 'Scope it per project, not globally' },
  { id: 'earn-it', label: 'Make every server earn its cost' },
];

function ArticleScreen({ slug, go }) {
  const D = window.SS_DATA;
  const post = D.posts.find((p) => p.slug === slug) || D.posts[0];
  const i = D.posts.indexOf(post);
  const next = D.posts[(i + 1) % D.posts.length];
  const others = D.posts.filter((p) => p.slug !== post.slug).slice(0, 4);
  const icons = { spotify: D.A + 'icons/spotify.svg', youtube: D.A + 'icons/youtube.svg', infographic: D.A + 'icons/infographic.svg' };
  const url = 'https://www.sebastiansigl.com/posts/' + post.slug;
  return (
    <>
      {ReadingProgress ? <ReadingProgress targetId="article" /> : null}
      <div className="ss-page">
        <div className="ss-page__col">
          <div style={{ marginBottom: 24 }}><Back href="#/" onClick={() => go('back')} /></div>
          <div className="ss-article">
            <aside className="ss-article__toc">{TableOfContents ? <TableOfContents items={TOC} /> : null}</aside>
            <article id="article" className="ss-article__body">
              <ArticleHeader title={post.title} description={post.description} date={post.date} readingTime={post.readingTime} category={post.category} categoryHref={'#/' + post.category} url={url} media={post.media} mediaIcons={icons} />
              <Prose>
                <p>I counted the tool definitions loaded into my agent's context last week. 67,000 tokens. Before I typed a single prompt.</p>
                <p>Four MCP servers, 50+ tool definitions, most of which my agent never called. I removed three of them. Same workflow, same results. The difference was that my agent stopped losing track of the codebase context halfway through conversations.</p>
                <p>The problem is not MCP. The problem is using it where you do not need to.</p>
                <h2 id="only-option">Where MCP Is the Only Option</h2>
                <p>There is a category of tools where MCP is not a preference. It is the only viable architecture. <strong>Browser control is the clearest example.</strong> You cannot <code>gh browse</code> your way into a browser session.</p>
                <ul><li>Browser control</li><li>Live research and fetch</li><li>Stateful database sessions</li></ul>
                <figure><img src={D.A + 'images/posts/agentic-pair-programming.jpg'} alt="Illustration of an engineer pairing with an AI agent" /><figcaption>Fig. 1 — Every loaded tool definition competes with your code for the same context window.</figcaption></figure>
                <h2 id="cli-first">When a CLI Does the Job</h2>
                <p>Most integrations already ship a command-line tool the agent can call directly. <code>gh</code>, <code>kubectl</code> and <code>aws</code> cost nothing until they are used, and their output is already shaped for a terminal.</p>
                <h2 id="scope">Scope It Per Project, Not Globally</h2>
                <p>The project-scoped <code>.mcp.json</code> is the one that matters most:</p>
                <pre data-lang="json"><code>{`{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-chrome-devtools"]
    }
  }
}`}</code></pre>
                <h2 id="earn-it">Make Every Server Earn Its Cost</h2>
                <blockquote>The question is not whether to use MCP. The question is whether each server you have loaded is earning its context cost.</blockquote>
                <p>Read more in <a href={'#/blog/' + others[0].slug}>{others[0].title}</a>.</p>
              </Prose>
              <footer className="ss-article-foot">
                <div className="ss-row" style={{ justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid var(--border-default)' }}>
                  <div className="ss-row" style={{ gap: 6 }}><span className="ss-kicker">Filed under</span><ATag href={'#/' + post.category}>{post.category}</ATag></div>
                  <Share url={url} title={post.title} />
                </div>
                <a className="ss-next" href={'#/blog/' + next.slug}><span className="ss-kicker">Next article →</span><span className="ss-next__title">{next.title}</span><span className="ss-muted" style={{ fontSize: 'var(--fs-sm)' }}>{next.readingTime} min read</span></a>
                <section className="ss-card" aria-labelledby="end-nl" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="ss-kicker">Newsletter</div>
                  <h2 id="end-nl" className="ss-h4">Get the next article by email.</h2>
                  <SF layout="inline" placeholder="you@company.com" />
                </section>
              </footer>
            </article>
          </div>
        </div>
        <aside className="ss-page__aside" aria-label="Sidebar">
          <div className="ss-page__sticky">
            <NW avatars={D.avatars} />
            <PopularPostsWidget posts={others.map((p) => ({ title: p.title, href: '#/blog/' + p.slug }))} />
          </div>
        </aside>
      </div>
    </>
  );
}

Object.assign(window, { ArticleScreen });
