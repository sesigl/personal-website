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
    await newsletterClient.createContact('akrillo89@gmail.com'); // Test user
  });

  describe('Transparent Resume Logic', () => {
    it('should create new campaign on first call', async () => {
      const result = await service.sendNewsletter(
        'weekly-update-2024-01',
        'Weekly Update',
        'Preview text',
        '<h1>Hello {{unsubscribeKey}}</h1>',
        'unsubscribeKey',
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
        'unsubscribeKey',
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
        'unsubscribeKey',
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
        'unsubscribeKey',
        true // test mode
      );

      expect(result.totalRecipients).toBe(1); // Only test email
      expect(result.status).toBe('completed');

      // Verify only test email was processed
      const newsletter = await newsletterRepository.findByTitle('test-campaign-2024');
      const deliveries = newsletter!.getEmailDeliveries();
      expect(deliveries).toHaveLength(1);
      expect(deliveries[0].recipientEmail).toBe('akrillo89@gmail.com');
    });

    it('should handle batch processing with proper logging', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const result = await service.sendNewsletter(
        'batch-test-2024',
        'Batch Test',
        'Preview',
        '<p>Content {{unsubscribeKey}}</p>',
        'unsubscribeKey',
        false
      );

      expect(result.status).toBe('completed');
      
      // Verify logging occurred
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Starting newsletter campaign')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('recipients')
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
        'unsubscribeKey',
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
        'unsubscribeKey',
        false
      );

      // Try to create with same title but different content
      const result = await service.sendNewsletter(
        'duplicate-test',
        'Second Campaign', // Different subject
        'Different Preview',
        '<p>Content 2</p>',
        'unsubscribeKey',
        false
      );

      // Should resume existing campaign, not create new one
      expect(result.isNewCampaign).toBe(false);
      
      // Original content should be preserved
      const newsletter = await newsletterRepository.findByTitle('duplicate-test');
      expect(newsletter!.getSubject()).toBe('First Campaign');
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
        'unsubscribeKey',
        false
      );

      expect(result.totalRecipients).toBe(3);
      expect(result.processedCount).toBe(2); // 2 successful, 1 failed
      expect(result.progressPercentage).toBe(67); // 2/3 = 66.67% rounded
      expect(result.status).toBe('failed');
      expect(result.hasFailures).toBe(true);
    });
  });
});