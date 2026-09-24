// About, Subscribe, Imprint, Unsubscribe, 404.
const DS = window.SebastianSiglDesignSystem_0b5f4d;

function SectionHead({ n, id, children, end }) {
  return <div className="ss-section-head"><span className="ss-section-head__n">{n}</span><h2 id={id} className="ss-section-title">{children}</h2>{end ? <span className="ss-section-head__end">{end}</span> : null}</div>;
}

function AboutScreen() {
  const D = window.SS_DATA;
  const L = (href, t) => <a href={href} target="_blank" rel="noopener noreferrer">{t}</a>;
  return (
    <div className="ss-page">
      <div className="ss-page__col">
        <div className="ss-stack-10">
          <section className="ss-stack-6">
            <div className="ss-kicker">About</div>
            <h1 className="ss-display">Hi. I'm Sebastian <DS.Highlight>@sesigl</DS.Highlight> Sigl.</h1>
            <p className="ss-lede" style={{ maxWidth: '60ch' }}>Staff Engineer at Adevinta, supporting the teams behind search on Kleinanzeigen. 18+ years building high-load systems, data products and platforms.</p>
            <img src={D.A + 'images/about.png'} alt="Sebastian Sigl speaking on stage" style={{ width: '100%', borderRadius: 4, border: '1px solid var(--border-default)' }} />
          </section>
          <section aria-labelledby="bio" className="ss-stack-4">
            <SectionHead n="01" id="bio">Short Bio</SectionHead>
            <p className="ss-muted" style={{ maxWidth: '68ch' }}>I am a seasoned software engineer with over 18 years of experience across various domains. In recent years, my focus has been on high-load server-side projects, data- and machine-learning-driven applications, and platform development, where I love tinkering with infrastructure, containers, and Cloud Native technologies.</p>
          </section>
          <section aria-labelledby="career" className="ss-stack-4">
            <SectionHead n="02" id="career">Career</SectionHead>
            <p className="ss-muted" style={{ maxWidth: '68ch' }}>As a Staff Engineer at Adevinta, I have the honor of supporting multiple teams dedicated to delivering the best possible content based on first and third-party data. I am privileged to empower multiple teams in {L('https://www.kleinanzeigen.de/', 'Kleinanzeigen')}, one of the largest and most renowned classifieds market in the world.</p>
          </section>
          <section aria-labelledby="exp">
            <SectionHead n="03" id="exp" end={D.experience.length + ' roles'}>Experience</SectionHead>
            <DS.ExperienceTimeline items={D.experience} />
          </section>
          <section aria-labelledby="connect" className="ss-stack-4">
            <SectionHead n="04" id="connect">Let's Connect</SectionHead>
            <p className="ss-muted">I'm excited to connect with others via <a href="mailto:support@sebastiansigl.com">email</a> and {L('https://x.com/sesigl', 'X')} to chat about projects and ideas.</p>
          </section>
        </div>
      </div>
      <aside className="ss-page__aside" aria-label="Sidebar"><div className="ss-page__sticky"><DS.NewsletterWidget avatars={D.avatars} /></div></aside>
    </div>
  );
}

function SubscribeScreen() {
  const D = window.SS_DATA;
  return (
    <div className="ss-page">
      <div className="ss-page__col">
        <div className="ss-stack-10">
          <section className="ss-stack-6">
            <div className="ss-kicker">Newsletter · Monthly</div>
            <h1 className="ss-display">Never miss an update.</h1>
            <p className="ss-lede" style={{ maxWidth: '60ch' }}>This newsletter is written by Sebastian Sigl, who works at Adevinta and previously worked at eBay and other successful companies. Here is what to expect by subscribing:</p>
            <div style={{ maxWidth: 520 }}>
              <DS.SubscribeForm layout="inline" placeholder="you@company.com" />
              <div className="ss-widget__foot" style={{ marginTop: 16 }}><DS.AvatarStack avatars={D.avatars} label="Newsletter readers" />Join 100K+ developers. Unsubscribe anytime.</div>
            </div>
          </section>
          <section aria-labelledby="expect">
            <SectionHead n="01" id="expect">What you get</SectionHead>
            <DS.CheckList items={['Big tech from the inside.', 'Actionable advice for engineering managers, software engineers and tech workers.', 'A pulse on the tech market and scoop worth knowing.', 'An independent viewpoint.']} />
          </section>
          <section aria-labelledby="readers">
            <SectionHead n="02" id="readers">What readers say</SectionHead>
            <div className="ss-grid-2">{D.testimonials.map((t) => <DS.TestimonialCard key={t.author} {...t} />)}</div>
          </section>
        </div>
      </div>
      <aside className="ss-page__aside" aria-label="Sidebar"><div className="ss-page__sticky"><DS.BookWidget cover={D.A + 'images/notion-templates-book.png'} /></div></aside>
    </div>
  );
}

function ImprintScreen() {
  return (
    <div className="ss-page ss-page--single">
      <div className="ss-page__col">
        <section className="ss-stack-6 ss-page__narrow">
          <div className="ss-kicker">Legal · Published 3.3.2023</div>
          <h1 className="ss-h1">Imprint</h1>
          <p className="ss-muted">The responsible person/entity within the meaning of § 5 of the Telemedia Act (Telemediengesetz, TMG) for the webpage sebastiansigl.com is:</p>
          <address className="ss-card" style={{ fontStyle: 'normal', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-sm)', lineHeight: 1.8 }}>Sebastian Sigl<br />Roquettestr. 34<br />01157 Dresden<br />support [at] sebastiansigl.com</address>
        </section>
      </div>
    </div>
  );
}

function UnsubscribeScreen() {
  return (
    <div className="ss-page ss-page--single">
      <div className="ss-page__col">
        <section className="ss-stack-6 ss-page__narrow">
          <div className="ss-kicker">Newsletter</div>
          <h1 className="ss-h1">Unsubscribe successful</h1>
          <DS.Alert tone="success">You won't receive further emails.</DS.Alert>
          <div className="ss-muted ss-stack-4">
            <p>You have successfully unsubscribed from my newsletter. Thank you for your support so far! If you have any questions or feedback, feel free to reach out at <a href="mailto:feedback@sebastiansigl.com">feedback@sebastiansigl.com</a> or connect with me on my social media pages listed below.</p>
            <p>I appreciate your time and hope to hear from you again.</p>
          </div>
          <div className="ss-row" style={{ gap: 8 }}>
            <DS.Button variant="secondary" href="#/subscribe">Resubscribe</DS.Button>
            <DS.Button variant="ghost" href="#/">Back to articles</DS.Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function NotFoundScreen() {
  return (
    <div className="ss-page ss-page--single">
      <div className="ss-page__col">
        <section className="ss-stack-6 ss-page__narrow">
          <div className="ss-kicker">Error 404</div>
          <h1 className="ss-h1">Page not found</h1>
          <p className="ss-muted">The page you are looking for doesn't exist or has moved.</p>
          <div className="ss-row" style={{ gap: 8 }}><DS.Button href="#/">Back to articles</DS.Button><DS.Button variant="secondary" href="#/search">Search</DS.Button></div>
        </section>
      </div>
    </div>
  );
}

Object.assign(window, { AboutScreen, SubscribeScreen, ImprintScreen, UnsubscribeScreen, NotFoundScreen, SectionHead });
