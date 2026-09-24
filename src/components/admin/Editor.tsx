// @ts-nocheck

import type { YooptaEmailEditor, YooptaEmailEditorOptions } from '@yoopta/email-builder';
import EmailBuilder, { createYooptaEmailEditor } from '@yoopta/email-builder';
import { actions } from 'astro:actions';
import { useEffect, useState } from 'react';

import newsletterFooter from './newsletterFooter';
import newsletterTemplateDefault from './newsletterTemplateDefault';
import ProgressTracker from './ProgressTracker';

// Constants for recommended lengths
const SUBJECT_LENGTH = {
  min: 20,
  max: 60,
  recommended: 40
};

const PREVIEW_LENGTH = {
  min: 40,
  max: 120,
  recommended: 80
};

interface CharacterCountProps {
  current: number;
  min: number;
  max: number;
  recommended: number;
}

function CharacterCount({ current, min, max, recommended }: CharacterCountProps) {
  const isRecommended = current >= min && current <= max;
  return (
    <span
      className="ss-field__hint"
      aria-live="polite"
      style={{
        color: isRecommended
          ? 'var(--status-success-fg)'
          : current === 0
            ? 'var(--text-muted)'
            : 'var(--status-danger-fg)',
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 500,
      }}
    >
      {current}/{recommended}
    </span>
  );
}

function sendNewsletter(
  campaignTitle: string,
  newsletterEmailHtml: string, 
  subject: string, 
  previewHeadline: string, 
  isTest: boolean = false
) {
  return actions.admin.sendNewsletter({
    campaignTitle,
    subject,
    previewHeadline,
    html: newsletterEmailHtml,
    test: isTest
  }).then((result) => {
    console.log('Newsletter send result:', result);
    return result;
  }).catch((error) => {
    console.error(error);
    throw error;
  });
}

// Define your email template options
async function getYooptaEmailEditorOptions(): Promise<YooptaEmailEditorOptions> {

  const newsletterFooterContent = await newsletterFooter();

  const yooptaEmailEditorOptions: YooptaEmailEditorOptions = {
    template: {
      head: {
        styles: [
          {
            id: 'email-reset',
            content: `
            table td { border-collapse: collapse; mso-line-height-rule: exactly; }
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
            * { font-family: Inconsolata,Arial,sans-serif; }
            table { border-collapse: collapse; border-spacing: 0; }
            button { border: 2px solid #000; }
          `,
          },
        ],
        meta: [
          { content: 'width=device-width, initial-scale=1.0', name: 'viewport' },
          { charset: 'UTF-8' },
        ],
      },
      body: {
        attrs: {
          style: {
            backgroundColor: '#fafafa',
            width: '100%',
            margin: '0 auto',
            padding: '0',
          },
        },
      },
      container: {
        attrs: {
          style: {
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
          },
        },
      },
      customTemplate: (content) => `${content}${newsletterFooterContent}`
    },
  };

  return yooptaEmailEditorOptions;
}

const STORAGE_KEYS = {
  EDITOR_CONTENT: 'newsletter-editor-content',
  SUBJECT: 'newsletter-subject',
  PREVIEW: 'newsletter-preview',
  CAMPAIGN_TITLE: 'newsletter-campaign-title'
} as const;

export default function EmailBuilderExample() {
  // Initialize the editor
  const [editor, setEditor] = useState<YooptaEmailEditor | null>(null);
  const [editorOptions, setEditorOptions] = useState<YooptaEmailEditorOptions | null>(null);
  const [subject, setSubject] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.SUBJECT) || ''
  );
  const [previewHeadline, setPreviewHeadline] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.PREVIEW) || ''
  );
  const [campaignTitle, setCampaignTitle] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.CAMPAIGN_TITLE) || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [trackingCampaign, setTrackingCampaign] = useState<string>('');
  const [isCurrentCampaignTest, setIsCurrentCampaignTest] = useState<boolean>(false);
  
  // Progress tracker will be handled by the component below

  // Update localStorage when form fields change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBJECT, subject);
  }, [subject]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PREVIEW, previewHeadline);
  }, [previewHeadline]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CAMPAIGN_TITLE, campaignTitle);
  }, [campaignTitle]);

  useEffect(() => {
    getYooptaEmailEditorOptions().then((yooptaEmailEditorOptions) => {
      setEditorOptions(yooptaEmailEditorOptions);
      setEditor(createYooptaEmailEditor(yooptaEmailEditorOptions));
    });
  }, []);

  // Initialize value from localStorage or use default
  const [value, setValue] = useState<any>(() => {
    const savedContent = localStorage.getItem(STORAGE_KEYS.EDITOR_CONTENT);
    return savedContent ? JSON.parse(savedContent) : newsletterTemplateDefault;
  });

  // Update localStorage when editor content changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EDITOR_CONTENT, JSON.stringify(value));
  }, [value]);

  const resetForm = () => {
    localStorage.removeItem(STORAGE_KEYS.SUBJECT);
    localStorage.removeItem(STORAGE_KEYS.PREVIEW);
    localStorage.removeItem(STORAGE_KEYS.CAMPAIGN_TITLE);
    localStorage.removeItem(STORAGE_KEYS.EDITOR_CONTENT);

    window.location.reload();
  };

  const handleSendNewsletter = async (isTest: boolean = false) => {
    if (editor && editorOptions) {
      if (!campaignTitle.trim()) {
        alert('Please enter a campaign title');
        return;
      }
      
      setIsLoading(true);
      
      try {
        const result = await sendNewsletter(
          campaignTitle,
          getEmailContent(), 
          subject, 
          previewHeadline, 
          isTest
        );
        
        // Start tracking progress for both test and production sends
        setTrackingCampaign(campaignTitle);
        setIsCurrentCampaignTest(isTest);
        
        if (isTest) {
          alert('Test newsletter sending started! Progress will be shown below.');
        } else {
          alert('Newsletter sending started! Progress will be shown below.');
        }
      } catch (error) {
        console.error('Failed to send newsletter:', error);
        alert('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const logTestNewsletter = () => {
    console.log('Test newsletter:', getEmailContent());
  }

  function getEmailContent() {
    let emailContentFromPlugin = editor?.getEmail(value, editorOptions?.template) || "";

    // Regular expression to find button tags and capture their content
    const buttonRegex = /<button(?:\s+[^>]*)?>(.*?)<\/button>/gs;

    let emailContentWithStyledDivs = emailContentFromPlugin.replace(buttonRegex, (match, buttonContent) => {
        // Define styles for the replacement div
        const divStyles = `margin-top: .5rem; margin-left: 0px; display: inline-flex; cursor: pointer; justify-content: center; border-radius: 0.375rem; transition: all 0.2s; border-width: 0px; background-color: #EF4444; color: #fff; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); padding: 0.5rem 1rem 0.5rem 1rem; font-size: 0.875rem;`;

        // Style the <a> tag inside the button content - simplified regex for debugging
        const styledButtonContent = buttonContent.replace(
            /<a(?:\s+[^>]*)?(href=["'][^"']*["'])(?:\s+[^>]*)?(style="([^"]*)")(.*?)>/g, // Regex to find <a> with href AND style - SIMPLIFIED
            (match_a_style_href, hrefAttribute, styleAttributeCapture, existingAStyle, restOfATag) => {
                return `<a ${hrefAttribute} style="color: #fff !important; text-decoration: none !important; ${existingAStyle}" ${restOfATag}>`;
            }
        ).replace(
            /<a(?:\s+[^>]*)?(href=["'][^"']*["'])(?:\s+[^>]*?)>/g, // Regex to find <a> with href but NO style - SIMPLIFIED
            (match_a_href_no_style, hrefAttribute) => {
                return `<a ${hrefAttribute} style="color: #fff !important; text-decoration: none !important;">`;
            }
        );


        return `<div class="js-button-div" style="${divStyles}">${styledButtonContent}</div>`;
    });

    return emailContentWithStyledDivs;
}

  return (
    <div>
      {
        editor !== null && editorOptions !== null && <>
          <main
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              padding: '40px 24px 64px',
              display: 'grid',
              gap: 32,
            }}
          >
            <section className="ss-stack-4" aria-labelledby="editor-h">
              <div className="ss-kicker">00 · Email body</div>
              <h1 id="editor-h" className="ss-h2">Newsletter editor</h1>
              <EmailBuilder
                editor={editor}
                value={value}
                onChange={setValue}
              />
            </section>

            <div
              style={{
                display: 'grid',
                gap: 32,
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))',
                alignItems: 'start',
              }}
            >
              <div className="ss-stack-4">
                <div className="ss-kicker">01 · Compose</div>
                <h2 id="compose" className="ss-h2">New campaign</h2>
                <div className="ss-field">
                  <div className="ss-field__row">
                    <label className="ss-field__label" htmlFor="campaign-title">
                      Campaign title
                    </label>
                  </div>
                  <input
                    id="campaign-title"
                    className="ss-input"
                    type="text"
                    value={campaignTitle}
                    onChange={(e) => setCampaignTitle(e.target.value)}
                    placeholder="e.g., weekly-update-2024-01"
                  />
                  <div className="ss-field__hint">Used for tracking and resuming a send.</div>
                </div>
                <div className="ss-field">
                  <div className="ss-field__row">
                    <label className="ss-field__label" htmlFor="newsletter-subject">
                      Newsletter subject
                    </label>
                    <CharacterCount
                      current={subject.length}
                      {...SUBJECT_LENGTH}
                    />
                  </div>
                  <input
                    id="newsletter-subject"
                    className="ss-input js-newsletter-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={`Recommended ${SUBJECT_LENGTH.recommended} characters`}
                  />
                </div>
                <div className="ss-field">
                  <div className="ss-field__row">
                    <label className="ss-field__label" htmlFor="newsletter-preview">
                      Preview text
                    </label>
                    <CharacterCount
                      current={previewHeadline.length}
                      {...PREVIEW_LENGTH}
                    />
                  </div>
                  <input
                    id="newsletter-preview"
                    className="ss-input js-newsletter-preview"
                    type="text"
                    value={previewHeadline}
                    onChange={(e) => setPreviewHeadline(e.target.value)}
                    placeholder={`Recommended ${PREVIEW_LENGTH.recommended} characters`}
                  />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <button
                    type="button"
                    className="ss-btn ss-btn--primary"
                    onClick={() => handleSendNewsletter(false)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending…' : 'Send'}
                  </button>
                  <button
                    type="button"
                    className="ss-btn ss-btn--secondary"
                    onClick={() => handleSendNewsletter(true)}
                    disabled={isLoading}
                  >
                    Send Test
                  </button>
                  <button
                    type="button"
                    className="ss-btn ss-btn--ghost"
                    onClick={() => logTestNewsletter()}
                  >
                    Log Test
                  </button>
                  <button
                    type="button"
                    className="ss-btn ss-btn--ghost"
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                </div>
              </div>

              <section className="ss-stack-4" aria-labelledby="progress-h">
                <div className="ss-kicker">02 · Delivery</div>
                <h2 id="progress-h" className="ss-h2">Status</h2>
                {trackingCampaign ? (
                  <ProgressTracker
                    campaignTitle={trackingCampaign}
                    autoStart={true}
                    pollInterval={2000}
                    testMode={isCurrentCampaignTest}
                  />
                ) : (
                  <div className="ss-alert ss-alert--neutral" role="status">
                    No campaign running. Send a test first — it goes to your own inbox only.
                  </div>
                )}
              </section>
            </div>
          </main>
        </>
      }
    </div>
  );
}