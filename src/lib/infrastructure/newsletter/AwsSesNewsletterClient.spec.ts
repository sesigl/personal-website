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
          HtmlPart: '<p>Hello {{name}}!</p>'
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

    expect(mockSend).toHaveBeenCalledTimes(1);
  });
});