/**
 * Newsletter send progress: campaign, status badge, bar, counts, failure notice.
 * @startingPoint section="Admin" subtitle="Campaign send progress" viewport="700x300"
 */
export interface ProgressTrackerProps {
  campaignTitle: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'failed';
  processedCount?: number;
  totalRecipients?: number;
  hasFailures?: boolean;
  isTest?: boolean;
  testRecipient?: string;
}
export declare function ProgressTracker(props: ProgressTrackerProps): JSX.Element;
