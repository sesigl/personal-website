# Newsletter Batch Sending Implementation Plan

## Overview
Transform the current all-or-nothing newsletter sending system into a robust, resumable batch processing system using the existing Newsletter aggregate root with proper DDD principles.

## Current Issues
- **All-or-nothing failure**: If any batch fails, entire newsletter send fails
- **No resume capability**: Cannot continue from where a failed send stopped
- **No send tracking**: No database record of delivery progress
- **No progress reporting**: No feedback during long-running operations
- **Risk of duplicate sends**: No idempotency protection

## Solution Architecture

### Domain Design (DDD Principles)
- **Newsletter**: Existing aggregate root, enhanced with send tracking capabilities
- **EmailDelivery**: New value object/sub-entity to track individual email send status
- **Newsletter Repository**: Enhanced to support fine-grained progress updates

### Database Schema Changes
```sql
-- Enhanced newsletter campaigns (extends existing concept)
newsletter_campaigns (
  id UUID PRIMARY KEY,
  title VARCHAR UNIQUE NOT NULL,  -- Used as idempotency key
  subject VARCHAR NOT NULL,
  html_content TEXT NOT NULL,
  preview_text VARCHAR,
  status VARCHAR NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'failed'
  total_recipients INTEGER NOT NULL,
  processed_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP
);

-- Individual email delivery tracking
email_deliveries (
  id UUID PRIMARY KEY,
  campaign_id UUID REFERENCES newsletter_campaigns(id),
  recipient_email VARCHAR NOT NULL,
  unsubscribe_key UUID NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  sent_at TIMESTAMP,
  error_message TEXT,
  UNIQUE(campaign_id, recipient_email)
);
```

## Implementation Plan (TDD Approach)

### Phase 1: Enhance Newsletter Aggregate Root
**Goal**: Extend existing Newsletter entity with send tracking capabilities

#### Step 1.1: Newsletter Domain Enhancement
- **Test First**: Write tests for enhanced Newsletter aggregate
  - Newsletter creation with title as identifier
  - Email delivery tracking within Newsletter
  - Progress calculation methods
  - Status management (pending → in_progress → completed)

- **Implementation**: Enhance existing Newsletter class with delivery tracking
- **Refactor**: Extract EmailDelivery value object for clean separation
- **Verification**: Run `npm test` to ensure all Newsletter tests pass
- **Commit**: `git add . && git commit -m "feat: enhance Newsletter aggregate with delivery tracking"`

#### Step 1.2: Enhanced Newsletter Repository
- **Test First**: Write tests for repository enhancements
  - Find Newsletter by title (for resume capability)
  - Save/update Newsletter with delivery progress
  - Mark individual emails as sent/failed
  - Query pending deliveries for batch processing

- **Implementation**: Enhance existing Newsletter repository interface and PostgreSQL implementation
- **Refactor**: Optimize database queries and add proper indexes
- **Verification**: Run `npm test` to verify repository functionality
- **Commit**: `git add . && git commit -m "feat: enhance Newsletter repository with batch processing support"`

#### Step 1.3: Database Migration
- **Test First**: Write migration tests
  - Schema creation succeeds
  - Indexes are properly created
  - Foreign key constraints work correctly

- **Implementation**: Create Drizzle migration for new tables
- **Refactor**: Ensure migration is idempotent and reversible
- **Verification**: Run `npx drizzle-kit migrate` and verify schema changes
- **Commit**: `git add . && git commit -m "feat: add database migration for newsletter campaign tracking"`

### Phase 2: Batch Processing Logic
**Goal**: Implement resumable batch processing within Newsletter aggregate

#### Step 2.1: Newsletter Batch Processing Methods
- **Test First**: Write tests for Newsletter batch processing
  - Process next batch of pending deliveries
  - Update delivery status after sending
  - Calculate progress and completion status
  - Handle partial batch failures gracefully

- **Implementation**: Add batch processing methods to Newsletter aggregate
- **Refactor**: Extract batch size configuration and improve error handling
- **Verification**: Run `npm test` to ensure batch processing works correctly
- **Commit**: `git add . && git commit -m "feat: implement batch processing methods in Newsletter aggregate"`

#### Step 2.2: AWS SES Client Enhancement
- **Test First**: Write tests with fake AWS SES client
  - Process batches without sending real emails
  - Handle AWS SES responses properly
  - Update Newsletter delivery status correctly
  - Maintain existing template management

- **Implementation**: Enhance AwsSesNewsletterClient to work with Newsletter aggregate
- **Refactor**: Simplify template management and improve error reporting
- **Verification**: Run `npm test` with fake AWS SES to verify integration
- **Commit**: `git add . && git commit -m "feat: enhance AWS SES client for batch processing integration"`

### Phase 3: Application Service Integration
**Goal**: Maintain existing interface while adding resume capability

#### Step 3.1: Transparent Resume Logic
- **Test First**: Write tests for application service behavior
  - First call creates new Newsletter campaign
  - Subsequent calls with same title resume existing campaign
  - Test mode uses fake email client (no real emails)
  - Progress logging provides clear feedback

- **Implementation**: Enhance NewsletterApplicationService.sendNewsletter()
  - Check if Newsletter campaign exists by title
  - Resume from last processed batch if exists
  - Create new campaign if doesn't exist
  - Log progress clearly

- **Refactor**: Extract resume logic and improve logging
- **Verification**: Run `npm test` to verify resume functionality works
- **Commit**: `git add . && git commit -m "feat: implement transparent resume logic in application service"`

#### Step 3.2: Progress Tracking via Polling
- **Test First**: Write tests for progress tracking
  - Newsletter progress can be queried by title
  - Status and completion percentage available
  - Error information accessible when needed

- **Implementation**: Add progress query methods to application service
- **Refactor**: Optimize progress queries for performance
- **Verification**: Run `npm test` to verify progress tracking accuracy
- **Commit**: `git add . && git commit -m "feat: add progress tracking via polling to application service"`

### Phase 4: Admin Interface Enhancement
**Goal**: Provide simple progress feedback via polling

#### Step 4.1: Progress Polling Action
- **Test First**: Write tests for progress polling
  - Query Newsletter sending progress by title
  - Return structured progress information
  - Handle non-existent campaigns gracefully

- **Implementation**: Create Astro server action for progress polling
- **Refactor**: Structure response for easy frontend consumption
- **Verification**: Test action manually and verify response format
- **Commit**: `git add . && git commit -m "feat: add progress polling server action"`

#### Step 4.2: Simple Progress UI
- **Test First**: Write tests for progress display (if applicable)
  - Progress percentage displays correctly
  - Status updates reflect current state
  - Polling stops when completed

- **Implementation**: Enhance admin interface with simple polling-based progress
- **Refactor**: Clean up UI and improve user experience
- **Verification**: Manual testing of admin interface functionality
- **Commit**: `git add . && git commit -m "feat: enhance admin interface with progress tracking UI"`

### Phase 5: Integration Testing and Validation
**Goal**: Ensure system works end-to-end with comprehensive testing

#### Step 5.1: High-Level Integration Tests
- **Test First**: Write comprehensive integration tests
  - Full newsletter sending flow (fake emails only)
  - Resume interrupted newsletter sending
  - Handle various failure scenarios
  - Verify idempotency with duplicate titles

- **Implementation**: Create integration test suite using Testcontainers
- **Refactor**: Optimize test performance and reliability
- **Verification**: Run `npm test` to ensure all integration tests pass
- **Commit**: `git add . && git commit -m "test: add comprehensive integration tests for newsletter batch processing"`

#### Step 5.2: Application Service Test Coverage
- **Test First**: Focus on essential application service tests
  - Newsletter creation and resume scenarios
  - Batch processing edge cases
  - Error handling and logging
  - Test mode isolation (no real emails)

- **Implementation**: Complete application service test coverage
- **Refactor**: Remove redundant tests and focus on high-value scenarios
- **Verification**: Run `npm test:ci` to verify test suite stability
- **Commit**: `git add . && git commit -m "test: complete application service test coverage for newsletter batch processing"`

## Configuration and Environment

### Enhanced Environment Variables
```bash
# Existing variables remain unchanged
DATABASE_URL=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=...

# New batch processing configuration
NEWSLETTER_BATCH_SIZE=50  # Default batch size for processing
NEWSLETTER_TEST_MODE=true  # Use fake email client in tests
```

## Success Criteria

### Functional Requirements
- ✅ Newsletter sending preserves state across interruptions
- ✅ Resume capability works transparently through existing interface
- ✅ Database tracks all delivery attempts and progress
- ✅ No real emails sent during testing (fake client used)
- ✅ Progress feedback available via simple polling
- ✅ System handles large recipient lists efficiently

### Technical Requirements
- ✅ Existing Newsletter aggregate root enhanced (not replaced)
- ✅ Application service interface remains unchanged
- ✅ DDD principles followed with proper aggregate boundaries
- ✅ High-level tests enable refactoring flexibility
- ✅ Testcontainers used for database integration tests

### Quality Metrics
- **Test Coverage**: Essential paths covered at application service level
- **Test Isolation**: All tests use fake email client
- **Performance**: Handles 1000+ recipients without issues
- **Reliability**: Resume works correctly after any interruption
- **Simplicity**: No complex error recovery or real-time features

## Implementation Order
1. Enhance Newsletter aggregate root with delivery tracking
2. Update repository with batch processing support
3. Create database migrations and verify schema
4. Enhance application service with transparent resume
5. Add progress polling via Astro server actions
6. Create comprehensive integration tests
7. Validate complete system functionality

## Git Workflow
Each phase step includes a commit command to track progress. The commit messages follow conventional commit format:
- `feat:` for new features
- `test:` for adding tests
- `refactor:` for code refactoring
- `docs:` for documentation updates

Always run verification steps before committing and ensure all tests pass before proceeding to the next step.

## Key Principles Applied
- **DDD**: Newsletter remains the aggregate root, EmailDelivery is a sub-entity
- **Simplicity**: No complex error recovery, just restart and continue
- **Transparency**: Existing interface preserved, resume happens automatically
- **High-Level Testing**: Focus on application service tests, enable refactoring
- **Pragmatic**: Use polling instead of real-time, keep it simple and reliable

This plan ensures a robust, resumable newsletter sending system while maintaining the existing clean architecture and keeping complexity minimal.