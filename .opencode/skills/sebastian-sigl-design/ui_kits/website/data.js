// Sample content lifted from sesigl/personal-website (src/content/blog frontmatter, about.astro, subscribe.astro).
(function () {
  const A = '../../assets/';
  window.SS_DATA = {
    A,
    avatars: [1, 2, 3, 4, 5].map((i) => A + 'images/avatars/avatar-0' + i + '.jpg'),
    me: A + 'images/me.png',
    posts: [
      { slug: 'mcp-servers-context-cost', title: 'MCP Servers Have a Context Cost. Make Sure They Earn It.', description: "Some tools require MCP. Most don't. Here's how to tell the difference, scope servers per project, and avoid the context tax that degrades your agent's reasoning.", date: '2026-03-20', category: 'tech', readingTime: 7, image: A + 'images/posts/post-thumb-01.jpg', media: { infographic: 'https://www.sebastiansigl.com/infographics/mcp-servers-context-cost.html' } },
      { slug: 'bounded-contexts-cognitive-boundaries-ai-humans', title: 'Bounded Contexts as Cognitive Boundaries for AI and Humans', description: 'Explores how bounded contexts from Domain-Driven Design serve as cognitive boundaries that improve signal-to-noise ratio for both humans and LLMs.', date: '2026-02-03', category: 'tech', readingTime: 12, image: A + 'images/posts/post-thumb-02.jpg' },
      { slug: 'lessons-learned-from-building-search', title: 'After a Year Rebuilding Search, I Had to Rethink Everything', description: "A seasoned engineer's lessons from a year rebuilding a search system from the ground up, shifting from engineering-first to product-first thinking.", date: '2025-10-11', category: 'tech', readingTime: 7, image: A + 'images/posts/post-thumb-03.jpg', media: { spotify: 'https://open.spotify.com/episode/2HuiAEXbAQsl0NsLWBz3GK', infographic: 'https://www.sebastiansigl.com/infographics/search-5-lessons-learned.html', youtube: 'https://youtu.be/uPLnbPoHBtY' } },
      { slug: 'llm-as-a-judge', title: 'The 5 Biases That Can Silently Kill Your LLM Evaluations (And How to Fix Them)', description: 'Your LLM-as-a-Judge system might be lying to you. This post uncovers 5 critical biases like positional, verbosity, and moderation bias that silently corrupt your AI evaluations.', date: '2025-09-19', category: 'leadership', readingTime: 11, image: A + 'images/posts/post-thumb-04.jpg', media: { spotify: 'https://open.spotify.com/episode/2Mt0aoBVL8x6iP7GoJPasO', infographic: 'https://www.sebastiansigl.com/infographics/llm-as-a-judge.html', youtube: 'https://youtu.be/C-r2POAIYgU' } },
      { slug: 'python-testing-for-better-augmented-coding', title: 'Augmented Coding, Amplified Risk: Why Type-Safe Python Tests Matter More Than Ever', description: 'AI coding assistants are accelerating development—but also magnifying quality risks. Here’s how to write Python tests that survive refactors.', date: '2025-08-10', category: 'tech', readingTime: 15, image: A + 'images/posts/post-thumb-05.jpg', media: { spotify: 'https://open.spotify.com/episode/7JQcVfeGU5OhiyijMknXMA', infographic: 'https://www.sebastiansigl.com/infographics/type-safe-python-tests-in-the-age-of-ai-infographic.html' } },
      { slug: 'disciplined-augmentation-augmented-coding-2', title: 'Why Most Teams Fail at AI Coding (And the Two Strategies That Actually Work)', description: "Most AI coding implementations fail because teams choose the wrong approach for their context. Here's how to pick the strategy that will actually give you a competitive advantage.", date: '2025-07-12', category: 'tech', readingTime: 12, image: A + 'images/posts/post-thumb-06.jpg' },
      { slug: 'system-thinking-bathtube', title: 'Systems Thinking in Software Engineering: From Overflowing Bathtubs to Sustainable Systems', description: 'Stop firefighting software issues and start understanding the underlying system dynamics through Systems Thinking.', date: '2025-04-13', category: 'leadership', readingTime: 13, image: A + 'images/posts/post-thumb-07.jpg' },
      { slug: 'separating-decision-gathering-from-decision-making', title: 'Separating Decision Gathering from Decision Making', description: 'Separating decision gathering from decision making enhances agility by allowing teams to collect diverse input without being slowed by the need for consensus.', date: '2024-10-20', category: 'leadership', readingTime: 8, image: A + 'images/posts/post-thumb-08.jpg' },
    ],
    talks: [
      { title: 'Data Mesh', image: A + 'images/talk-data-mesh.webp', href: 'https://www.youtube.com/watch?v=_bmYXWCxF_Q' },
      { title: 'Why Leaders Eat Last?', image: A + 'images/talk-why-leaders-eat-last.webp', href: 'https://www.youtube.com/watch?v=GE1w8OORirA' },
    ],
    projects: [
      { title: 'Skill Match', description: 'Finde und buche Experten, Coaches und Trainer basierend auf Skills', logo: A + 'logos/skillmatch.svg', href: 'https://skillmatch.de/' },
      { title: 'DDD Template for GoLang projects', description: 'Domain Driven Design (DDD) template for Golang to properly organize a project with many useful tools set up.', logo: A + 'logos/ddd_template_go_v2.png', href: 'https://github.com/sesigl/go-project-ddd-template' },
    ],
    experience: [
      { start: 'Dec 2022', end: 'Present', role: 'MTS 2, Software Engineer', org: 'Adevinta', logo: A + 'logos/adevinta.png', description: 'As a Staff Engineer at Adevinta, I am responsible for creating an exceptional search experience for advertising in Germany, seamlessly integrated into Kleinanzeigen, the largest German marketplace, with millions of monthly active users.' },
      { start: 'Oct 2018', end: 'Dec 2022', role: 'Classifieds Senior Full-Stack Engineer | Tech Lead Advertising', org: 'eBay', logo: A + 'logos/ebay.png', description: 'As a senior Full-Stack Engineer and later as a tech-lead for advertising, I had the privilege of leading a talented team in the development of a cutting-edge global advertising configuration management system.' },
      { start: 'Oct 2016', end: 'Sep 2018', role: 'Senior Full-Stack Engineer', org: 'MisterSpex', logo: A + 'logos/mister-spex.png', description: 'One of our most noteworthy accomplishments was the creation of an innovative augmented reality application that enabled our customers to virtually try on glasses.' },
      { start: 'Oct 2014', end: 'Sep 2016', role: 'Mid-Level Backend Engineer', org: 'Sopra Steria', logo: A + 'logos/sopra-steria.png', description: 'I had the opportunity to modernize a Java-Swing Application, extracting both frontend and backend components from a big monolith.' },
      { start: 'Oct 2005', end: 'Sep 2014', role: 'High School, Computer Science Master & Freelancer', org: 'Self-Employed', logo: A + 'logos/freelance.png', description: 'From my teenage years onwards, coding has been my passion.' },
    ],
    testimonials: [
      { title: 'Incredible Value', quote: "With Sebastian's help, I quickly acquired the essential skills to progress in my career, and I'm thankful for his resources. I would highly suggest him to others.", author: 'Mary Coyle', avatar: A + 'images/avatars/testimonial-01.jpg' },
      { title: 'The Best Newsletter', quote: "Sebastian provided me with the necessary resources to swiftly acquire the skills needed for career advancement, and I'm grateful. I would definitely endorse him to anyone seeking similar assistance.", author: 'Daniel Burka', avatar: A + 'images/avatars/testimonial-02.jpg' },
    ],
  };
})();
