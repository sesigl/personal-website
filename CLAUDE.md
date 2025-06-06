# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Basic Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Testing
- `npm test` - Run unit tests with Vitest in watch mode (interactive)
- `npm run test:ci` - Run tests in CI mode (non-interactive, single run)
- **Important**: Use `npm run test:ci` for verification steps in development to avoid watch mode
- Tests use Testcontainers for integration testing with PostgreSQL
- Tests run sequentially (threads: false) to avoid testcontainer conflicts
- Test setup includes database initialization via `src/test/setup/setupTestDatabase.ts`

### Database
- `npx drizzle-kit generate` - Generate migrations
- `npx drizzle-kit migrate` - Run migrations
- Database schema is in `src/lib/infrastructure/db/schema.ts`
- Uses Neon Database (serverless Postgres) via Drizzle ORM

## Architecture Overview

This is an Astro-based personal website with a clean domain-driven architecture:

### Core Stack
- **Astro** with MDX for static site generation
- **React** components for interactive elements
- **Tailwind CSS** for styling
- **Drizzle ORM** with PostgreSQL (Neon Database)
- **AWS SES** for newsletter functionality

### Domain Architecture
The codebase follows domain-driven design patterns:

```
src/lib/
├── domain/           # Core business logic
│   ├── article/      # Blog post management
│   ├── newsletter/   # Newsletter contacts and sending
│   └── user/         # User management
├── application/      # Application services
└── infrastructure/   # External integrations (DB, AWS SES)
```

### Key Components
- **Newsletter System**: Full-featured newsletter with AWS SES integration, contact management, and unsubscribe functionality
- **Blog**: MDX-based blog posts with search via Fuse.js
- **Admin Interface**: Protected admin panel for newsletter management (password: ADMIN_PASSWORD env var)

### Environment Variables
Required environment variables (defined in `astro.config.mjs`):
- `DATABASE_URL` - Neon database connection
- `USER_SECRET_KEY` - User data encryption
- `ADMIN_PASSWORD` - Admin panel access
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` - AWS SES credentials

### Testing Strategy
- Uses `.env.test` for test environment variables to work around Astro's `import.meta.env` limitations
- Testcontainers for PostgreSQL integration tests
- 120s timeout for tests due to container startup time

### Content Management
- Blog posts in `src/content/blog/` as MDX files
- Images organized in `src/images/` and `public/images/`
- Content config in `src/content.config.ts`

## Development Best Practices

### Domain-Driven Design (DDD) Principles
- **Reuse Existing Aggregate Roots**: Before creating new aggregates, enhance existing ones
- **Aggregate Boundaries**: Keep related data and behavior within the same aggregate
- **Sub-entities and Value Objects**: Use these for internal aggregate state rather than new aggregates
- **Repository Pattern**: Provide fine-grained updates at the aggregate level while maintaining encapsulation

### Testing Strategy
- **High-Level Integration Tests**: Focus on application service level for maximum refactoring flexibility
- **Fake External Dependencies**: Mock only external services (AWS SES, APIs), use real implementations for internal dependencies
- **Testcontainers for Database**: Use real PostgreSQL in tests via Docker for authentic integration testing
- **Essential Test Coverage**: Cover key use cases and edge cases, avoid over-testing low-level details
- **Test Isolation**: Ensure tests never send real emails or affect external systems

### TDD and Development Process
- **Test-Driven Development**: Write tests first, implement minimum code, then refactor
- **Verification Steps**: Each implementation phase must include explicit verification (running tests)
- **Git Workflow**: Commit after each completed step with conventional commit messages (feat:, test:, refactor:, docs:)
- **Phase-by-Phase Development**: Complete each phase fully before moving to the next
- **Interface Preservation**: Avoid changing existing application service interfaces unless absolutely necessary

### Git Workflow and Progress Tracking
- **Conventional Commits**: Use conventional commit messages to track implementation progress
- **Check Implementation Progress**: Before starting work, check git history to determine progress:
  ```bash
  git log --oneline --grep="feat:" --grep="test:" --grep="refactor:" --since="1 week ago"
  ```
- **Resume Work**: Look for specific feature-related commit messages to determine where to continue implementation
- **Commit Granularity**: Commit after each completed step to enable easy progress tracking

### TypeScript and Astro Development
- **Type Safety**: Leverage TypeScript's type system for compile-time error detection
- **Server Actions**: Use Astro's server actions for backend functionality rather than complex real-time solutions
- **Polling over Real-time**: Simple polling approaches are preferred over WebSockets for progress tracking
- **Environment Configuration**: Use environment variables for configuration, maintain backward compatibility

### Architecture and Simplicity Principles
- **KISS (Keep It Simple, Stupid)**: Avoid over-engineering solutions
- **Restart-Resume Pattern**: For long-running processes, design for simple restart and resume rather than complex error recovery
- **Progressive Enhancement**: Build basic functionality first, add sophistication in refactoring steps
- **Database as State Store**: Leverage database persistence for reliability rather than complex in-memory patterns
- **Transparent Functionality**: Enhanced features should work transparently with existing interfaces

### Error Handling Philosophy
- **Fail Fast**: Detect and report errors early in the process
- **Simple Recovery**: Design for restart and resume rather than complex error recovery mechanisms
- **State Preservation**: Ensure no state is lost during failures, everything should be recoverable from database
- **Clear Logging**: Provide clear, actionable log messages for debugging and monitoring

### Performance and Scalability
- **Batch Processing**: Handle large datasets in configurable batches
- **Database Optimization**: Use proper indexes and efficient queries
- **Resource Management**: Clean up resources (templates, connections) properly
- **Configuration-Driven**: Make batch sizes and limits configurable rather than hardcoded