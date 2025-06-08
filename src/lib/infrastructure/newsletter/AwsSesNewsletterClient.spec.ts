import { beforeEach, describe, it, expect, vi } from 'vitest';

const mockSend = vi.fn();

vi.mock('@aws-sdk/client-ses', () => {
  // Use a factory function to ensure no top-level variable usage inside vi.mock
  class MockSESClient {
    send = mockSend;
  }
  class MockCreateTemplateCommand {
    constructor(public input: any) { }
  }
  class MockDeleteTemplateCommand {
    constructor(public input: any) { }
  }
  class MockSendBulkTemplatedEmailCommand {
    constructor(public input: any) { }
  }
  return {
    SESClient: MockSESClient,
    CreateTemplateCommand: MockCreateTemplateCommand,
    DeleteTemplateCommand: MockDeleteTemplateCommand,
    SendBulkTemplatedEmailCommand: MockSendBulkTemplatedEmailCommand
  };
});

import AwsSesNewsletterClient from './AwsSesNewsletterClient';
import Newsletter from '../../domain/newsletter/Newsletter';

describe('AwsSesNewsletterClient', () => {
  const config = {
    region: 'eu-central-1',
    sourceEmail: 'newsletter@sebastiansigl.com',
    maxBatchSize: 50
  };

  beforeEach(() => {
    mockSend.mockClear();
    mockSend.mockResolvedValue({});
  });

  it('should send newsletter email with correct template and recipients', async () => {
    // Arrange
    const client = new AwsSesNewsletterClient(config);
    const newsletter = new Newsletter(
      'Test Newsletter',
      'preview text',
      '<p>Hello {{name}}!</p>',
      [{
        email: 'test@example.com',
        placeholders: { name: 'Test User' }
      }]
    );

    await client.sendEmails(newsletter);

    const calls = mockSend.mock.calls;
    expect(calls).toHaveLength(3);

    // 1) CreateTemplateCommand
    const [createTemplateCommand] = calls[0];
    expect(createTemplateCommand).toMatchObject({
      input: {
        Template: {
          TemplateName: expect.any(String), // generated in the AwsSesNewsletterClient
          SubjectPart: 'Test Newsletter',
          HtmlPart: expect.stringContaining('<p>Hello {{name}}!</p>')
        }
      }
    });

    // 2) SendBulkTemplatedEmailCommand
    const [sendBulkEmailArgs] = calls[1];
    expect(sendBulkEmailArgs.input).toMatchObject({
      Source: config.sourceEmail,
      Template: expect.any(String),
      Destinations: [
        {
          Destination: { ToAddresses: ['test@example.com'] },
          ReplacementTemplateData: JSON.stringify({ name: 'Test User' })
        }
      ]

    });

    // 3) DeleteTemplateCommand
    const [deleteTemplateArgs] = calls[2];
    expect(deleteTemplateArgs.input).toHaveProperty('TemplateName');
    expect(deleteTemplateArgs.input.TemplateName).toBe(createTemplateCommand.input.Template.TemplateName);
  });

  it('should handle errors during template creation', async () => {
    const client = new AwsSesNewsletterClient(config);
    const newsletter = new Newsletter(
      'Test Subject',
      'preview text', 
      '<p>Hello {{name}}!</p>',
      [{
        email: 'test@example.com',
        placeholders: { name: 'Test User' }
      }]
    );
    mockSend.mockRejectedValueOnce(new Error('Template creation failed'));

    await expect(client.sendEmails(newsletter))
      .rejects.toThrow('Failed to create email template');

    expect(mockSend).toHaveBeenCalledTimes(1); // CreateTemplate fails, DeleteTemplate not called
  });

  describe('Batch Processing Integration', () => {
    it('should send batch of emails and return success results', async () => {
      const client = new AwsSesNewsletterClient(config);
      const recipients = [
        { email: 'user1@example.com', templateData: { name: 'User1' } },
        { email: 'user2@example.com', templateData: { name: 'User2' } }
      ];
      const template = {
        subject: 'Test Subject',
        htmlContent: '<p>Hello {{name}}!</p>'
      };

      // Mock successful AWS SES response
      mockSend.mockResolvedValue({
        MessageId: 'message-id',
        Status: [
          { Status: 'Success', MessageId: 'msg-1' },
          { Status: 'Success', MessageId: 'msg-2' }
        ]
      });

      const results = await client.sendBatch(recipients, template);

      expect(results).toHaveLength(2);
      expect(results[0]).toEqual({
        email: 'user1@example.com',
        success: true
      });
      expect(results[1]).toEqual({
        email: 'user2@example.com',
        success: true
      });

      // Should have called: CreateTemplate, SendBulkEmail, DeleteTemplate
      expect(mockSend).toHaveBeenCalledTimes(3);
    });

    it('should handle partial batch failures and return mixed results', async () => {
      const client = new AwsSesNewsletterClient(config);
      const recipients = [
        { email: 'user1@example.com', templateData: { name: 'User1' } },
        { email: 'invalid-email', templateData: { name: 'User2' } },
        { email: 'user3@example.com', templateData: { name: 'User3' } }
      ];
      const template = {
        subject: 'Test Subject',
        htmlContent: '<p>Hello {{name}}!</p>'
      };

      // Mock AWS SES response with partial failures
      mockSend.mockResolvedValueOnce({}); // CreateTemplate success
      mockSend.mockResolvedValueOnce({
        MessageId: 'batch-message-id',
        Status: [
          { Status: 'Success', MessageId: 'msg-1' },
          { Status: 'MessageRejected', MessageId: 'msg-2', Error: 'Email address not verified' },
          { Status: 'Success', MessageId: 'msg-3' }
        ]
      }); // SendBulkEmail with failures
      mockSend.mockResolvedValueOnce({}); // DeleteTemplate success

      const results = await client.sendBatch(recipients, template);

      expect(results).toHaveLength(3);
      expect(results[0]).toEqual({
        email: 'user1@example.com',
        success: true
      });
      expect(results[1]).toEqual({
        email: 'invalid-email',
        success: false,
        error: 'Email address not verified'
      });
      expect(results[2]).toEqual({
        email: 'user3@example.com',
        success: true
      });
    });

    it('should handle AWS SES batch send failure gracefully', async () => {
      const client = new AwsSesNewsletterClient(config);
      const recipients = [
        { email: 'user1@example.com', templateData: { name: 'User1' } }
      ];
      const template = {
        subject: 'Test Subject',
        htmlContent: '<p>Hello {{name}}!</p>'
      };

      // Suppress console.error during this test to avoid stderr output
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Mock: CreateTemplate succeeds, SendBulkEmail fails, DeleteTemplate succeeds
      mockSend.mockResolvedValueOnce({}); // CreateTemplate
      mockSend.mockRejectedValueOnce(new Error('AWS SES service unavailable')); // SendBulkEmail
      mockSend.mockResolvedValueOnce({}); // DeleteTemplate

      const results = await client.sendBatch(recipients, template);

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual({
        email: 'user1@example.com',
        success: false,
        error: 'AWS SES service unavailable'
      });

      // Should still clean up template
      expect(mockSend).toHaveBeenCalledTimes(3);

      // Restore console.error
      consoleErrorSpy.mockRestore();
    });

    it('should handle empty batch gracefully', async () => {
      const client = new AwsSesNewsletterClient(config);
      const recipients: { email: string; templateData: Record<string, string> }[] = [];
      const template = {
        subject: 'Test Subject',
        htmlContent: '<p>Hello!</p>'
      };

      const results = await client.sendBatch(recipients, template);

      expect(results).toHaveLength(0);
      expect(mockSend).not.toHaveBeenCalled();
    });

    it('should respect batch size configuration', async () => {
      const smallBatchConfig = { ...config, maxBatchSize: 2 };
      const client = new AwsSesNewsletterClient(smallBatchConfig);
      const recipients = [
        { email: 'user1@example.com', templateData: { name: 'User1' } },
        { email: 'user2@example.com', templateData: { name: 'User2' } },
        { email: 'user3@example.com', templateData: { name: 'User3' } },
        { email: 'user4@example.com', templateData: { name: 'User4' } }
      ];
      const template = {
        subject: 'Test Subject',
        htmlContent: '<p>Hello {{name}}!</p>'
      };

      // Mock successful responses for multiple batches
      mockSend.mockResolvedValue({
        Status: [
          { Status: 'Success', MessageId: 'msg-1' },
          { Status: 'Success', MessageId: 'msg-2' }
        ]
      });

      const results = await client.sendBatch(recipients, template);

      expect(results).toHaveLength(4);
      expect(results.every(r => r.success)).toBe(true);

      // Should call: CreateTemplate, SendBulkEmail (batch 1), SendBulkEmail (batch 2), DeleteTemplate
      expect(mockSend).toHaveBeenCalledTimes(4);
    });
  });
});