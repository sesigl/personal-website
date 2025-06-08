import { beforeEach, describe, it, expect, vi } from 'vitest';
import NewsletterApplicationService from './NewsletterApplicationService';
import NewsletterFakeSender from '../../test/fake/newsletterClient/NewsletterFakeSender';
import PostgresNewsletterRepository from '../infrastructure/newsletter/PostgresNewsletterRepository';
import PostgresContactsRepository from '../infrastructure/newsletter/PostgresContactsRepository';
import { setupTestDatabase } from '../../test/testDatabase';
import { emailDeliveriesTable, newsletterCampaignsTable, usersTable } from '../../test/setup/testTables';
import type { Database } from '../infrastructure/db';

describe('NewsletterApplicationService', () => {
  let service: NewsletterApplicationService;
  let fakeSender: NewsletterFakeSender;
  let newsletterRepository: PostgresNewsletterRepository;
  let newsletterClient: PostgresContactsRepository;
  let db: Database;

  const { getDb } = setupTestDatabase(emailDeliveriesTable, newsletterCampaignsTable, usersTable);

  beforeEach(async () => {
    db = getDb();
    
    // Setup test dependencies
    fakeSender = new NewsletterFakeSender();
    newsletterRepository = new PostgresNewsletterRepository(db);
    newsletterClient = new PostgresContactsRepository(db);
    
    // Create service with test dependencies
    service = new NewsletterApplicationService(
      newsletterClient,
      fakeSender,
      newsletterRepository
    );

    // Setup test contacts
    await newsletterClient.createContact('user1@example.com');
    await newsletterClient.createContact('user2@example.com');
    await newsletterClient.createContact('test@example.com'); // Test user
  });

  describe('Transparent Resume Logic', () => {
    it('should create new campaign on first call', async () => {
      const result = await service.sendNewsletter(
        'weekly-update-2024-01',
        'Weekly Update',
        'Preview text',
        '<h1>Hello {{unsubscribeKey}}</h1>',
        false // production mode
      );

      expect(result.isNewCampaign).toBe(true);
      expect(result.status).toBe('completed');
      expect(result.totalRecipients).toBe(3); // All test contacts
      expect(result.processedCount).toBe(3);
      expect(result.progressPercentage).toBe(100);

      // Verify newsletter was persisted
      const savedNewsletter = await newsletterRepository.findByTitle('weekly-update-2024-01');
      expect(savedNewsletter).not.toBeNull();
      expect(savedNewsletter!.getStatus()).toBe('completed');
    });

    it('should resume existing campaign on subsequent call', async () => {
      // Create initial campaign with some failures
      fakeSender.setShouldFailEmails(['user2@example.com']);
      
      const firstResult = await service.sendNewsletter(
        'resume-test-2024',
        'Resume Test',
        'Preview',
        '<p>Content {{unsubscribeKey}}</p>',
        false
      );

      expect(firstResult.isNewCampaign).toBe(true);
      expect(firstResult.status).toBe('failed');
      expect(firstResult.progressPercentage).toBeLessThan(100);

      // Reset fake sender to succeed
      fakeSender.setShouldFailEmails([]);
      fakeSender.clearLogs();

      // Resume the campaign
      const resumeResult = await service.sendNewsletter(
        'resume-test-2024', // Same title
        'Resume Test',
        'Preview',
        '<p>Content {{unsubscribeKey}}</p>',
        false
      );

      expect(resumeResult.isNewCampaign).toBe(false);
      expect(resumeResult.status).toBe('completed');
      expect(resumeResult.progressPercentage).toBe(100);

      // Should only send to remaining recipients
      const logs = fakeSender.getLogs();
      expect(logs.some(log => log.includes('user2@example.com'))).toBe(true);
      expect(logs.some(log => log.includes('user1@example.com'))).toBe(false); // Already sent
    });

    it('should use test mode with limited recipients', async () => {
      const result = await service.sendNewsletter(
        'test-campaign-2024',
        'Test Newsletter',
        'Test preview',
        '<h1>Test {{unsubscribeKey}}</h1>',
        true // test mode
      );

      expect(result.totalRecipients).toBe(1); // Only test email
      expect(result.status).toBe('completed');

      // Verify only test email was processed
      const newsletter = await newsletterRepository.findByTitle('test-campaign-2024');
      const deliveries = newsletter!.getEmailDeliveries();
      expect(deliveries).toHaveLength(1);
      expect(deliveries[0].recipientEmail).toBe('test@example.com');
    });

    it('should handle batch processing with proper logging', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const result = await service.sendNewsletter(
        'batch-test-2024',
        'Batch Test',
        'Preview',
        '<p>Content {{unsubscribeKey}}</p>',
        false
      );

      expect(result.status).toBe('completed');
      
      // Verify logging occurred
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Starting newsletter campaign')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Processing batch of')
      );

      consoleSpy.mockRestore();
    });

    it('should handle campaign with no recipients gracefully', async () => {
      // Clear all contacts
      await db.delete(usersTable);

      const result = await service.sendNewsletter(
        'empty-campaign-2024',
        'Empty Test',
        'Preview',
        '<p>Content</p>',
        false
      );

      expect(result.totalRecipients).toBe(0);
      expect(result.status).toBe('completed');
      expect(result.progressPercentage).toBe(100);
    });

    it('should handle duplicate campaign titles gracefully', async () => {
      // Create first campaign
      await service.sendNewsletter(
        'duplicate-test',
        'First Campaign',
        'Preview',
        '<p>Content 1</p>',
        false
      );

      // Try to create with same title but different content
      const result = await service.sendNewsletter(
        'duplicate-test',
        'Second Campaign', // Different subject
        'Different Preview',
        '<p>Content 2</p>',
        false
      );

      // Should resume existing campaign, not create new one
      expect(result.isNewCampaign).toBe(false);
      
      // Original content should be preserved
      const newsletter = await newsletterRepository.findByTitle('duplicate-test');
      expect(newsletter!.getSubject()).toBe('First Campaign');
    });
  });

  describe('End-to-End Integration Tests', () => {
    it('should handle complete newsletter workflow with resume and progress tracking', async () => {
      // Create contacts for more realistic batch testing
      await newsletterClient.createContact('user3@example.com');
      await newsletterClient.createContact('user4@example.com');
      await newsletterClient.createContact('user5@example.com');
      
      // Setup to fail some emails initially
      fakeSender.setShouldFailEmails(['user2@example.com', 'user4@example.com']);
      
      // Start first campaign
      const firstResult = await service.sendNewsletter(
        'integration-test-campaign',
        'Integration Test Newsletter',
        'Testing the complete workflow',
        '<h1>Newsletter Content {{unsubscribeKey}}</h1>',
        false
      );

      expect(firstResult.isNewCampaign).toBe(true);
      expect(firstResult.status).toBe('failed');
      expect(firstResult.totalRecipients).toBe(6); // All contacts
      expect(firstResult.processedCount).toBe(4); // 4 successful, 2 failed
      expect(firstResult.hasFailures).toBe(true);

      // Check progress using progress tracking
      const progressAfterFirst = await service.getNewsletterProgress('integration-test-campaign');
      expect(progressAfterFirst).not.toBeNull();
      expect(progressAfterFirst!.status).toBe('failed');
      expect(progressAfterFirst!.processedCount).toBe(4);
      expect(progressAfterFirst!.hasFailures).toBe(true);

      // Fix the fake sender and resume
      fakeSender.setShouldFailEmails([]);
      fakeSender.clearLogs();

      // Resume the campaign - should only process failed emails
      const resumeResult = await service.sendNewsletter(
        'integration-test-campaign', // Same title
        'Different Subject', // This should be ignored for existing campaign
        'Different Preview',
        '<p>Different Content</p>',
        false
      );

      expect(resumeResult.isNewCampaign).toBe(false);
      expect(resumeResult.status).toBe('completed');
      expect(resumeResult.totalRecipients).toBe(6);
      expect(resumeResult.processedCount).toBe(6); // All successful now
      expect(resumeResult.progressPercentage).toBe(100);
      expect(resumeResult.hasFailures).toBe(false);

      // Verify progress tracking shows completion
      const finalProgress = await service.getNewsletterProgress('integration-test-campaign');
      expect(finalProgress!.status).toBe('completed');
      expect(finalProgress!.processedCount).toBe(6);

      // Verify only failed emails were retried
      const logs = fakeSender.getLogs();
      expect(logs.filter(log => log.includes('user2@example.com'))).toHaveLength(1);
      expect(logs.filter(log => log.includes('user4@example.com'))).toHaveLength(1);
      expect(logs.filter(log => log.includes('user1@example.com'))).toHaveLength(0); // Already sent
    });

    it('should handle large batch processing with proper batching', async () => {
      // Create many test contacts
      const batchSize = 15;
      for (let i = 10; i < 10 + batchSize; i++) {
        await newsletterClient.createContact(`user${i}@example.com`);
      }

      const result = await service.sendNewsletter(
        'large-batch-test',
        'Large Batch Newsletter',
        'Testing batch processing',
        '<p>Batch content {{unsubscribeKey}}</p>',
        false
      );

      expect(result.status).toBe('completed');
      expect(result.totalRecipients).toBe(batchSize + 3); // Original 3 + new batch
      expect(result.processedCount).toBe(batchSize + 3);
      expect(result.progressPercentage).toBe(100);

      // Verify batch processing occurred
      const logs = fakeSender.getLogs();
      expect(logs.length).toBeGreaterThan(1); // Should have multiple batch logs
    });

    it('should maintain idempotency for duplicate campaign titles', async () => {
      // Create initial campaign
      const firstResult = await service.sendNewsletter(
        'idempotency-test',
        'First Campaign',
        'First Preview',
        '<h1>First Content</h1>',
        false
      );

      expect(firstResult.isNewCampaign).toBe(true);
      expect(firstResult.status).toBe('completed');

      // Try to create campaign with same title
      const secondResult = await service.sendNewsletter(
        'idempotency-test',
        'Second Campaign', // Different content
        'Second Preview',
        '<h1>Second Content</h1>',
        false
      );

      expect(secondResult.isNewCampaign).toBe(false);
      expect(secondResult.status).toBe('completed');

      // Verify original content was preserved
      const newsletter = await newsletterRepository.findByTitle('idempotency-test');
      expect(newsletter!.getSubject()).toBe('First Campaign');
    });

    it('should handle test mode isolation correctly', async () => {
      const testResult = await service.sendNewsletter(
        'test-mode-campaign',
        'Test Mode Newsletter',
        'Testing isolation',
        '<p>Test content {{unsubscribeKey}}</p>',
        true // Test mode
      );

      expect(testResult.totalRecipients).toBe(1); // Only test email
      expect(testResult.status).toBe('completed');

      // Verify no progress tracking needed for test mode
      const progress = await service.getNewsletterProgress('test-mode-campaign');
      expect(progress!.totalRecipients).toBe(1);
    });
  });

  describe('Progress Tracking', () => {
    it('should provide accurate progress information', async () => {
      fakeSender.setShouldFailEmails(['user2@example.com']);

      const result = await service.sendNewsletter(
        'progress-test-2024',
        'Progress Test',
        'Preview',
        '<p>Content {{unsubscribeKey}}</p>',
        false
      );

      expect(result.totalRecipients).toBe(3);
      expect(result.processedCount).toBe(2); // 2 successful, 1 failed
      expect(result.progressPercentage).toBe(67); // 2/3 = 66.67% rounded
      expect(result.status).toBe('failed');
      expect(result.hasFailures).toBe(true);
    });

    it('should query newsletter progress by title', async () => {
      // Create a campaign
      await service.sendNewsletter(
        'query-progress-test',
        'Query Progress Test',
        'Preview',
        '<p>Content {{unsubscribeKey}}</p>',
        false
      );

      // Query progress
      const progress = await service.getNewsletterProgress('query-progress-test');

      expect(progress).not.toBeNull();
      expect(progress!.campaignTitle).toBe('query-progress-test');
      expect(progress!.status).toBe('completed');
      expect(progress!.totalRecipients).toBe(3);
      expect(progress!.processedCount).toBe(3);
      expect(progress!.progressPercentage).toBe(100);
      expect(progress!.hasFailures).toBe(false);
      expect(progress!.isNewCampaign).toBe(false);
    });

    it('should return null for non-existent campaign', async () => {
      const progress = await service.getNewsletterProgress('non-existent-campaign');
      expect(progress).toBeNull();
    });

    it('should track progress for partially completed campaigns', async () => {
      // Setup to fail some emails
      fakeSender.setShouldFailEmails(['user1@example.com']);

      // Start campaign
      const result = await service.sendNewsletter(
        'partial-progress-test',
        'Partial Progress Test',
        'Preview',
        '<p>Content {{unsubscribeKey}}</p>',
        false
      );

      expect(result.status).toBe('failed');

      // Query progress
      const progress = await service.getNewsletterProgress('partial-progress-test');

      expect(progress).not.toBeNull();
      expect(progress!.status).toBe('failed');
      expect(progress!.totalRecipients).toBe(3);
      expect(progress!.processedCount).toBe(2); // 2 successful, 1 failed
      expect(progress!.progressPercentage).toBe(67);
      expect(progress!.hasFailures).toBe(true);
    });
  });
});