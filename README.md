# Personal Portfolio Website

A personal website built using Astro and the DevSpace design from Cruip (licensed for personal use). 
It includes features like in-memory search (Fuse.js), testing with Vite and Testcontainers, 
serverless Postgres via Drizzle (Neon), and secure newsletter management powered by AWS SES.

## Features
- ✅ [Astro](https://astro.build/) with MDX support
- ✅ [Tailwind CSS](https://tailwindcss.com/) for modern styling
- ✅ [Fuse.js](https://fusejs.io/) for in-memory search
- ✅ [Neon Database](https://neon.tech/) for serverless Postgres
- ✅ [Drizzle ORM](https://orm.drizzle.team/) data access
- ✅ [Date-fns](https://date-fns.org/) for date utilities
- ✅ Seamless React components courtesy of [React](https://react.dev/) and [React DOM](https://react.dev/)
- ✅ [Testcontainers](https://www.testcontainers.org/) and [Vite](https://vitejs.dev/) for testing
- ✅ [AWS SES](https://aws.amazon.com/ses/) triaged newsletter management
- ✅ [React Share](https://github.com/nygardk/react-share) for quick social integrations
- ✅ [Github Actions](https://github.com/features/actions) for CI/CD. Just going with vercel wont give you what you need (e.g. running testcontainers). GitHub Actions is the way to go for a deployment independent  and powerful CI/CD pipeline.

## Getting Started
1. Clone this repo.
2. Install dependencies: `npm install`.
3. Run locally: `npm run dev`.
4. Build for production: `npm run build`.

## Testing
- Run unit tests: `npm test`.
- Integration tests with Testcontainers.

### Env Variables
Astro comes with a built-in support for environment variables, which provides environment-specific resolultions on import. This comes with the caveat that tests fail when using `import.meta.env` in the test environment. To work around this, there is a `.env.test` which contains fake values for the test environment.

## License
The design is licensed for personal usage only, while the code is open for general use. 
Please respect the design license terms.

## Acknowledgments
If you find this project useful, a backlink to [https://www.sebastiansigl.com](https://www.sebastiansigl.com) 
or a small coffee donation (via my social links) is always appreciated.
