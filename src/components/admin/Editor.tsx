// @ts-nocheck

import type { YooptaEmailEditor, YooptaEmailEditorOptions } from '@yoopta/email-builder';
import EmailBuilder, { createYooptaEmailEditor } from '@yoopta/email-builder';
import { actions } from 'astro:actions';
import { useEffect, useState } from 'react';

import newsletterFooter from './newsletterFooter';
import newsletterTemplateDefault from './newsletterTemplateDefault';

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
    <span style={{ color: isRecommended ? '#22c55e' : '#ef4444' }}>
      {current}/{recommended}
    </span>
  );
}

function sendNewsletter(
  campaignTitle: string,
  newsletterEmailHtml: string, 
  subject: string, 
  previewHeadline: string, 
  isTest: boolean = false,
  onProgress?: (progress: any) => void
) {
  return actions.admin.sendNewsletter({
    campaignTitle,
    subject,
    previewHeadline,
    html: newsletterEmailHtml,
    test: isTest
  }).then((result) => {
    console.log('Newsletter send result:', result);
    
    // Start polling for progress if not a test
    if (!isTest && onProgress) {
      pollNewsletterProgress(campaignTitle, onProgress);
    }
    
    return result;
  }).catch((error) => {
    console.error(error);
    throw error;
  });
}

function pollNewsletterProgress(campaignTitle: string, onProgress: (progress: any) => void) {
  const poll = () => {
    actions.admin.getNewsletterProgress({ campaignTitle })
      .then((progress) => {
        onProgress(progress);
        
        // Continue polling if not completed
        if (progress && progress.status !== 'completed' && progress.status !== 'failed') {
          setTimeout(poll, 2000); // Poll every 2 seconds
        }
      })
      .catch((error) => {
        console.error('Error polling progress:', error);
      });
  };
  
  poll();
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
  const [progress, setProgress] = useState<any>(null);

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
      setProgress(null);
      
      try {
        const result = await sendNewsletter(
          campaignTitle,
          getEmailContent(), 
          subject, 
          previewHeadline, 
          isTest,
          (progressData) => {
            setProgress(progressData);
          }
        );
        
        if (isTest) {
          alert('Test email sent!');
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
          <EmailBuilder
            editor={editor}
            value={value}
            onChange={setValue}
          />
          <div className="space-y-4">
            <div>
              <label htmlFor="campaign-title" className="block mb-2 font-medium">
                Campaign Title (for tracking and resume)
              </label>
              <input 
                id="campaign-title"
                type="text" 
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                placeholder="e.g., weekly-update-2024-01" 
                className="w-full p-2 border" 
              />
            </div>
            <div>
              <label htmlFor="newsletter-subject" className="block mb-2 font-medium">
                Newsletter Subject
              </label>
              <input 
                id="newsletter-subject"
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={`Recommended ${SUBJECT_LENGTH.recommended} characters`} 
                className="js-newsletter-subject w-full p-2 border" 
              />
              <CharacterCount 
                current={subject.length}
                {...SUBJECT_LENGTH}
              />
            </div>
            <div>
              <label htmlFor="newsletter-preview" className="block mb-2 font-medium">
                Preview Text
              </label>
              <input 
                id="newsletter-preview"
                type="text"
                value={previewHeadline}
                onChange={(e) => setPreviewHeadline(e.target.value)}
                placeholder={`Recommended ${PREVIEW_LENGTH.recommended} characters`}
                className="js-newsletter-preview w-full p-2 border"
              />
              <CharacterCount 
                current={previewHeadline.length}
                {...PREVIEW_LENGTH}
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleSendNewsletter(false)}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
              <button 
                onClick={() => handleSendNewsletter(true)}
                disabled={isLoading}
                className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
              >
                Send Test
              </button>
              <button 
                onClick={() => logTestNewsletter()}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Log Test
              </button>
              <button 
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Reset
              </button>
            </div>
            
            {/* Progress tracking section */}
            {progress && (
              <div className="mt-4 p-4 border rounded bg-gray-50">
                <h3 className="font-medium mb-2">Newsletter Progress</h3>
                <div className="space-y-2">
                  <div>
                    <strong>Campaign:</strong> {progress.campaignTitle}
                  </div>
                  <div>
                    <strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      progress.status === 'completed' ? 'bg-green-200 text-green-800' :
                      progress.status === 'failed' ? 'bg-red-200 text-red-800' :
                      progress.status === 'in_progress' ? 'bg-blue-200 text-blue-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {progress.status}
                    </span>
                  </div>
                  <div>
                    <strong>Progress:</strong> {progress.processedCount}/{progress.totalRecipients} ({progress.progressPercentage}%)
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress.progressPercentage}%` }}
                    ></div>
                  </div>
                  {progress.hasFailures && (
                    <div className="text-red-600">
                      ⚠️ Some deliveries failed
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      }
      ----
      {JSON.stringify(value)}
    </div>
  );
}